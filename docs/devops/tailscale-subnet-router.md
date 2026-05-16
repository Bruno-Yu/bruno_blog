---
title: Tailscale Subnet Router 設定實務
description: 透過 Tailscale Subnet Router 實現跨網域內外網統一存取，包含 Synology NAS 與 macOS 的設定流程。
tags: [tailscale, networking, devops, vpn, nas]
date: 2026-05-16
type: doc
publish: true
---

# Tailscale Subnet Router 設定實務

## 核心目標

實現「內外網統一名稱存取」。透過將 NAS 或 Mac mini 設為 **Subnet Router（網段路由器）**，讓外部設備（手機/筆電）連上 Tailscale 後，能直接使用家中的內網 IP（如 `192.168.x.x`）存取 Gitea 或其他服務，無需手動切換網址。

---

## Synology NAS (DSM 6.2.4) 設定流程

### A. 解決驗證卡死（QuickConnect 限制）

- **問題**：透過 QuickConnect 登入 DSM 時，無法開啟 Tailscale 的驗證頁面。
- **解法**：改用「內網 IP」登入 DSM 網頁，或直接透過 SSH 執行驗證指令。

### B. SSH 登入與強制驗證

1. **開啟 SSH**：控制台 → 終端機和 SNMP → 啟動 SSH 服務（Port 22）
2. **連線指令**：
   ```bash
   ssh <your-username>@<nas-ip>
   ```
3. **執行 Subnet Router 指令**（含強制重新驗證）：
   ```bash
   sudo /var/packages/Tailscale/target/bin/tailscale up --force-reauth --advertise-routes=<your-subnet>/24
   ```
   > **注意 1**：DSM 6 環境下無法直接使用 `tailscale` 短指令，必須輸入完整路徑 `/var/packages/Tailscale/target/bin/tailscale`。
   >
   > **注意 2**：第一次使用 `sudo` 會觸發 Linux 安全警告，此時盲打密碼後按 Enter 即可（輸入時不會顯示任何字元）。

4. **驗證授權**：複製終端機輸出的 `https://login.tailscale.com/a/...` 至瀏覽器授權。

---

## Mac mini（macOS）設定流程

### A. 開啟封包轉發（IP Forwarding）

macOS 預設不允許轉發流量，必須手動開啟：

```bash
# 立即生效
sudo sysctl -w net.inet.ip.forwarding=1

# 永久生效（寫入系統設定）
echo 'net.inet.ip.forwarding=1' | sudo tee -a /etc/sysctl.conf
```

### B. 執行 Subnet Router 指令

若已有開啟其他參數（如 `--accept-routes`），需一併帶入，否則會報錯：

```bash
sudo /Applications/Tailscale.app/Contents/MacOS/Tailscale up \
  --advertise-routes=<your-subnet>/24 \
  --accept-routes
```

---

## Tailscale Admin Console 後台操作（關鍵步驟）

不論是 NAS 或 Mac mini，執行完指令後都必須在後台手動放行：

1. **Machines 頁面**：登入 [Tailscale 後台](https://login.tailscale.com/admin/machines)，找到該設備。
2. **Edit route settings**：在 Subnet routes 勾選你的網段（如 `192.168.x.0/24`）。
3. **Disable Key Expiry**：點擊設備右側 `...` 選擇此項，防止每 180 天金鑰過期導致斷連。

---

## 常見疑難排解

| 狀況 | 原因 | 對策 |
|---|---|---|
| `ssh: Connection refused` | NAS 的 SSH 服務未開啟 | 到 DSM 控制台開啟 SSH 服務 |
| 密碼輸入時沒反應 | Linux/macOS 安全機制 | 正常現象，盲打完按 Enter 即可 |
| `Error: changing settings via 'tailscale up'...` | 指令參數衝突 | 依錯誤提示補上遺漏的參數（如 `--accept-routes`）|
| 輸入密碼變明碼 | 不在密碼輸入狀態 | 按 `Ctrl + C` 取消，確認出現 `$` 後重新輸入指令 |

---

## 安全收尾

- **關閉 SSH**：設定完成後，務必回到 DSM 關閉 SSH 服務，減少資安風險。
- **服務根 URL**：若服務（如自架 Git）有設定 ROOT_URL，建議固定為內網 IP，確保 clone 連結在內外網皆能統一使用。
