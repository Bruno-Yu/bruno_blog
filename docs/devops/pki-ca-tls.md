---
title: PKI、CA、TLS、信任鏈研究
description: 從 PKI、CA 到 TLS 握手——理解憑證信任鏈、CA Bundle、HTTPS 底層機制，以及 Windows SChannel 的角色。
tags: [資安, DevOps, TLS, PKI, 憑證]
date: 2024-10-05
type: doc
publish: true
---

## 概念

用 HTTPS 連線時，**SSL/TLS（實際是 TLS）負責「加密通訊」**；不同作業系統/程式會用不同的 TLS 實作（例如 Windows 常見 SChannel）來做**握手（handshake）**與**憑證驗證**；而「憑證驗證」的核心就是：**用 CA 建立信任鏈**，看伺服器憑證能不能一路鏈到你系統/程式信任的 Root CA（trust store 裡的信任錨）。

**CA bundle** 則是一組 CA 憑證集合，用來讓系統/程式知道「該信任誰」（用戶端驗證），或讓伺服器在握手時「把鏈送完整」（伺服器端提供 chain/fullchain）。

- **在伺服器端**常指 `fullchain`（網站憑證 + intermediate(s)）
- **在用戶端**常指「一包可用來驗證的 CA 憑證集合」（多為 root，有時也包含中繼但中繼不作為信任錨）

---

## 0. PKI（Public Key Infrastructure，公開金鑰基礎建設）

### 是什麼

PKI 不是單一技術或一台機器，而是一整套**用「非對稱式加密（公鑰/私鑰）」來管理身分與信任**的制度與系統集合。  
它把「誰是誰（身分）」與「哪把公鑰屬於誰」用**憑證（X.509 certificate）**的方式固定下來，並能透過 **CA 信任鏈**讓大量陌生的用戶端在網路上建立可驗證的信任。

> 簡化理解：**TLS/HTTPS 用 PKI 來做身分驗證（憑證/信任鏈），再用 TLS 來做加密通訊。**

### 做什麼（PKI 解決的核心問題）

- **身分綁定**：把「網域/組織/服務」與其「公鑰」綁定成憑證
- **發證與簽章**：由 CA/Intermediate CA 簽發憑證，提供可驗證的簽章
- **信任傳遞**：用戶端透過 Root CA（trust anchor）建立信任鏈，驗證憑證是否可信
- **憑證生命週期管理**：申請、簽發、更新（renew）、到期、撤銷（CRL/OCSP）、輪替金鑰等
- **安全治理與稽核**：規範金鑰保護、簽發流程、權限控管、事件處理（常搭配 HSM）

### PKI 的主要組成（常見元件）

- **Root CA / Intermediate CA**：信任錨與分層簽發
- **End-Entity Certificate**：終端實體憑證（例如網站/伺服器憑證、用戶端憑證、程式碼簽章憑證）
- **Registration Authority（RA，可選）**：負責身分審核/註冊流程
- **Repository / Distribution**：發佈憑證、CRL、OCSP 等資料的系統
- **Revocation 機制**：CRL（撤銷清單）、OCSP（線上狀態查詢）
- **Trust store（在用戶端）**：OS/瀏覽器/程式信任的 Root CA 集合（PKI 信任落地的地方）

### 你會在哪裡遇到

- **HTTPS/TLS**：伺服器身分驗證（最常見）
- **mTLS**：雙向驗證（伺服器也驗證用戶端憑證）
- **企業內部憑證**：內網服務、Wi-Fi 802.1X、VPN、內部代理等
- **程式碼簽章**：驗證程式/更新檔來源與完整性
- **文件/郵件簽署**：S/MIME、PDF 簽章等

---

## 1. SSL / TLS（Transport Layer Security）

### 是什麼

- 一套讓網路連線加密的通訊協定。
- 歷史上叫 **SSL**（已過時/不建議），現代實際使用的是 **TLS**（例如 TLS 1.2/1.3）。
- **HTTPS = HTTP 跑在 TLS 上面**（也就是「HTTP over TLS」）。

### TLS 的三件事

- **加密（Confidentiality）**：防竊聽
- **完整性（Integrity）**：防竄改
- **身分驗證（Authentication）**：確認你連到的伺服器「真的是它宣稱的那個身分」
  - 主要靠「伺服器憑證」+「CA 信任鏈驗證」

---

## 2. TLS 握手時與 CA/憑證鏈的關係（概念流程）

當你連 `https://example.com` 時，大致會發生：

1. **ClientHello / ServerHello**：協商 TLS 版本、加密套件等
2. **伺服器送出憑證**：Server Certificate +（通常）Intermediate chain
3. **用戶端做驗證**：
   - 驗證伺服器憑證簽章、用途、有效期、主機名（SAN/CN 是否包含 example.com）
   - 把「伺服器憑證 → intermediate(s)」一路往上組成鏈
   - 最後看是否能鏈到本機 trust store 內某個 **Root CA（信任錨）**
4. 驗證通過後，完成金鑰交換與會談金鑰建立，開始加密傳輸

> 重點：TLS 負責加密與握手；「你該不該信這個伺服器」取決於憑證驗證，而憑證驗證靠 CA 信任鏈與 trust store / CA bundle。

---

## 3. CA（Certificate Authority，憑證機構）

### 3-1. 介紹

CA 是「簽發數位憑證」的實體/系統，負責把「某個主體（網域/組織/服務）」與其「公鑰」綁定成一張憑證（certificate），並用 CA 的私鑰簽名。

CA 可分兩大類：
- **公用 CA（Public CA）**：被作業系統/瀏覽器預設信任（內建於 trust store）
  - 例：DigiCert、GlobalSign、Let's Encrypt
- **私有 CA（Private / Internal CA）**：企業/組織自建，用於內網或公司設備
  - 不會被外部裝置預設信任，通常需要透過 IT 將企業 Root CA 佈署到員工裝置的 trust store

### 3-2. CA 的類型與信任鏈（Chain of Trust）

#### Root CA（根 CA）
- 信任鏈最上層的「信任錨（trust anchor）」
- **Root CA 憑證（公鑰）**通常被內建在 OS/瀏覽器的 **trust store**
- **Root 私鑰**必須高度保護，常見作法是離線保存、使用頻率極低（例如只用來簽 intermediate）

#### Intermediate CA（中繼 CA）
- 由 Root CA（或上層 intermediate）簽發的「CA 憑證」
- 用於日常大量工作：實際簽發網站/伺服器憑證、或再簽下一層 intermediate
- 目的：**降低 Root 私鑰曝露風險**、**分層管理/分權**、**出事時可撤銷/更換中繼而不動到 Root**

#### 常見鏈結長相

```
Root CA  →  Intermediate CA  →  Server Certificate（網站/伺服器憑證）

# 有時會多層中繼
Root → Intermediate A → Intermediate B → Server
```

### 3-3. Intermediate CA 是誰簽的？要用 Root 私鑰嗎？

關鍵規則：「某張憑證」一定是由它的 **Issuer（簽發者）**用 **Issuer 的私鑰**簽出來的。

因此：
- 若 intermediate 的 issuer 是 **Root CA**：就要用 **Root 私鑰**簽這張 intermediate（通常在高管控、低頻率情境執行）
- 若 intermediate 的 issuer 是 **上層 intermediate**：就用上層 intermediate 的私鑰簽

### 3-4. 瀏覽器 / 作業系統到底信任什麼？

#### Trust store（信任庫）

- OS/瀏覽器內建的「受信任 Root CA 清單」是核心（trust anchors）
- **重點**：公開可下載的是「Root 憑證（公鑰）」；真正能簽發的是「Root 私鑰」，私鑰不公開且受嚴格保護

#### 連線驗證時的流程（概念）

1. 伺服器提供：伺服器憑證（server cert）+ 通常還會提供 intermediate chain（中繼鏈）
2. 用戶端驗證：
   - 用 intermediate 驗證 server cert 的簽章
   - 再一路往上驗證 intermediate
   - 最終看能否鏈到自己 trust store 內某個 Root CA

> 注意：Intermediate 通常不是「被信任的根」，而是「用來補齊鏈的中繼」。

#### Git / curl / 其他程式的差異（易混淆點）

- 有些程式走 OS trust store（例如 Windows SChannel / macOS Keychain）
- 有些程式使用自己指定的 CA bundle 檔（例如 OpenSSL/cURL 指向某個 `cacert.pem`）
- 所以「用的是哪一套信任庫」需看你的環境與程式 SSL backend 設定

### 3-5. CA bundle、chain、fullchain、PEM/CRT 是什麼？

#### 先釐清：PEM/CRT 多半是「格式/副檔名」，不等於 bundle

- **PEM**：文字編碼格式，內容常見為：
  - `-----BEGIN CERTIFICATE-----` ... `-----END CERTIFICATE-----`
  - 一個 PEM 檔可以放 **1 張或多張**憑證（串接多段 certificate）
- **CRT**：常見副檔名，內容可能是 PEM（文字）或 DER（二進位）
  - 所以 `.crt` 不必然是 PEM，也不必然是 bundle

結論：
- **bundle / chain** 是「檔案內容是否包含多張憑證」的概念
- **pem/crt** 是「常見格式或副檔名」的概念
- 不要把「PEM/CRT」直接等同「CA bundle」

#### 常見名詞對照

- **Server certificate**：網站/伺服器那張憑證（對應你的網域）
- **Intermediate chain / chain file**：一或多張 intermediate 憑證（用來把 server 接到 root）
- **CA bundle**（語境依場景不同）：
  - 伺服器端：常指「中繼鏈檔」或「一包 CA 鏈」
  - 用戶端：常指「信任用 CA 憑證集合」（多為 root，信任錨仍是 root）
- **fullchain**：通常指「server cert + intermediate(s)」放在同一檔（常為 PEM 串接）

#### 伺服器端常見檔名（以 PEM 為例）

```
privkey.key      # 私鑰（不是憑證；不要外流）
cert.pem         # 伺服器憑證（單張）
chain.pem        # 中繼鏈（多張 intermediate）
fullchain.pem    # 伺服器憑證 + 中繼鏈（多張串接）
```

> Root CA 憑證通常不需要由網站送出，因為用戶端 trust store 內已經有（或應該有）。

### 3-6. 私鑰在哪裡？什麼是 HSM？

#### HSM（Hardware Security Module，硬體安全模組）

用來**產生、保存、使用**私鑰的高安全等級設備（或雲端 HSM 服務）。  
核心目標：讓私鑰「盡量出不去」，簽章/解密運算在 HSM 內完成。

HSM 常見能力：
- 私鑰不可匯出或匯出需嚴格控管
- 權限/角色控管、多人批准（M of N）
- 稽核紀錄（audit logs）
- 防拆/防竄改設計（依產品等級而不同）

CA 為何要用 HSM：CA（尤其 Root/Intermediate）的私鑰一旦外洩，攻擊者可簽出看似合法的憑證，HSM 用於把這類「高價值私鑰」保護到更高規格。

### 3-7. 總結

- **Root CA（信任錨）** 在用戶端 trust store；公開的是 root「憑證公鑰」，不是 root 私鑰
- **Intermediate CA（工作用 CA）** 負責大量簽發，降低 Root 私鑰曝露與提升管理彈性
- **CA bundle / chain / fullchain** 是「把多張憑證串在一起」的檔案概念；PEM/CRT 是格式/副檔名概念，不能畫上等號
