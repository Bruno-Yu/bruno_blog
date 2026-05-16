---
title: Nginx 基礎與設定
description: Nginx 的核心概念、與 Apache 的差異、Windows 測試環境設定、nginx.conf 配置範例與常用指令。
tags: [nginx, devops, web-server, reverse-proxy]
date: 2026-05-16
type: doc
publish: true
---

# Nginx 基礎與設定

## 什麼是 Nginx

Nginx 原本是一個 Web 伺服器，現也廣泛作為**反向代理**、**負載均衡**、**HTTP Cache** 使用。設計初衷是處理高併發、高流量的網路服務需求。

### Nginx vs Apache

| | Nginx | Apache |
|---|---|---|
| **架構** | 事件驅動（Event-driven） | 基於行程/執行緒（Process/Thread）|
| **高併發** | 優秀，靜態內容傳輸效率高 | 高流量下效能較低 |
| **模組** | 編譯時加入，無法動態載入 | 支援動態載入模組（`mod_php` 等）|
| **設定** | 統一 conf 檔，簡潔直觀 | `.htaccess` 支援細粒度設定，但影響效能 |
| **PHP 支援** | 需透過 FastCGI（需額外設定） | 直接透過 `mod_php` 處理 |

---

## Windows 測試環境

1. 至 [Nginx 官網](https://nginx.org/en/download.html) 下載 Windows 版 zip，解壓縮至目標路徑。
2. 在 terminal 進入該資料夾後啟動：
   ```powershell
   start nginx
   ```
3. 開啟瀏覽器訪問 `http://localhost`，確認顯示 Nginx 歡迎頁即代表成功。

---

## nginx.conf 設定範例

主設定檔位於 `conf/nginx.conf`（Windows：`C:\nginx\conf\nginx.conf`）。

以下範例包含**靜態檔案服務**與**反向代理**：

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;
        server_name  localhost;

        # 靜態檔案
        location / {
            root   "C:/nginx/html";
            index  index.html;
        }

        # 反向代理
        location /api/ {
            proxy_pass https://jsonplaceholder.typicode.com/;

            # http → https 需加這兩行，否則 SSL 握手失敗
            proxy_ssl_server_name on;
            proxy_ssl_protocols TLSv1 TLSv1.1 TLSv1.2;

            proxy_set_header Host jsonplaceholder.typicode.com;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
```

---

## 常用指令

```powershell
# 確認版本
nginx -v

# 啟動
start nginx

# 停止（快速）
nginx -s stop

# 停止（處理完當前請求後）
nginx -s quit

# 重新載入設定（不重啟）
nginx -s reload

# 驗證設定檔語法
nginx -t
```

### Windows：處理殭屍行程

```powershell
# 查看所有 nginx 行程
tasklist | findstr nginx

# 強制終止所有 nginx 行程
taskkill /F /IM nginx.exe
```

### 確認目前服務狀態

```powershell
# 查看 HTTP headers（確認是哪個服務在回應）
curl -I http://localhost

# 取得指定頁面內容
curl http://localhost/index.html
```

---

## 常用內建變數

```nginx
$uri            # 當前請求的 URI（不含 query string）
$request_uri    # 完整原始請求 URI（含 query string）
$args           # query string 參數
$request_method # 請求方法（GET、POST 等）
$remote_addr    # 客戶端 IP
$http_user_agent # User-Agent
$http_referer   # 來源頁面
$server_name    # 伺服器名稱
$server_port    # 伺服器端口

# 常見用法：SPA history mode fallback
try_files $uri $uri/ /index.html;
```
