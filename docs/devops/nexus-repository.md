---
title: Nexus Repository OSS 私有套件倉庫研究
description: 用 Nexus Repository OSS 搭建私有套件倉庫：npm、Maven、PyPI、NuGet 的 Proxy、Host、Group 三種倉庫類型說明。
tags: [DevOps, npm, 套件管理, Nexus]
date: 2025-01-05
type: doc
publish: true
---

[Nexus Repository Manager](https://github.com/sonatype/nexus-public)（Sonatype）是企業常見的私有套件倉庫解決方案，分為：

- **Nexus Repository OSS（開源版）**：有公開原始碼、可自行部署，適合大多數企業場景。
- **Nexus Repository Pro（商業版）**：付費授權，功能更完整（進階治理/報表/權限整合等）。

---

## 可以拿來做什麼？

### 1. 私有套件倉庫（Host 私有 packages）

發佈公司/組織內部的套件，並控制存取權限（誰能讀/發佈）：

- npm 套件（前端/Node.js）
- Java 的 Maven artifacts
- PyPI 套件（Python）
- NuGet 套件（.NET）

### 2. 代理/快取公開 registry（Proxy + Cache）

代理 `registry.npmjs.org`、Maven Central 等公開 registry，好處：

- 加速下載（本地快取減少重複外網請求）
- 減少外網依賴（外部服務偶發故障時更穩定）
- 可做存取控管（只允許特定版本或來源）

### 3. 建立「群組倉庫」統一入口（Group）

把「私有 hosted + 公開 proxy」組成一個 URL。開發者只要設定一個 registry endpoint，就能同時拿到內部套件與外部套件：

```bash
# 將 npm registry 指向 Nexus 群組倉庫
npm config set registry=http://your-nexus-server/repository/npm-group/
npm config set strict-ssl=false  # 若使用內部自簽憑證
```

### 4. 做供應鏈與安全控管的基礎設施

搭配公司政策：
- 封鎖特定來源
- 只允許經過代理的下載
- 保留審計紀錄

（進階安全/風險治理通常在 Sonatype 的其他產品或 Pro 版本中更完整）

### 5. 管理 Docker/OCI 映像或其他二進位資產

也常被拿來當容器鏡像倉庫或一般二進位檔管理（依倉庫格式與配置）。

---

## 三種倉庫類型

| 類型 | 說明 | 典型用途 |
|---|---|---|
| **Hosted** | 你自己的私有倉庫 | 存放公司內部套件 |
| **Proxy** | 代理並快取外部 registry | 代理 npmjs.org、Maven Central |
| **Group** | 將多個倉庫合併成一個 URL | 開發者只需設定一個 endpoint |

---

## 快速設定 npm 指向 Nexus

```bash
# 查看目前 npm registry
npm config get registry

# 切換到 Nexus 代理
npm config set registry=http://your-nexus-server/repository/npm-proxy/

# 還原到官方 registry
npm config set registry=https://registry.npmjs.org/
```

也可以使用 `.npmrc` 檔案做 per-project 設定，避免影響全域配置：

```ini
# .npmrc（放在專案根目錄）
registry=http://your-nexus-server/repository/npm-group/
```
