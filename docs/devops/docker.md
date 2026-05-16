---
title: Docker 基礎
description: Docker 核心概念（Container、Image、Registry、Compose）、常用 CLI 指令與 Dockerfile 語法參考。
tags: [docker, devops, container, docker-compose]
date: 2026-05-16
type: doc
publish: true
---

# Docker 基礎

## 為什麼需要 Docker

傳統部署常遇到作業系統版本、Kernel、環境變數設定不同而導致服務無法啟動的問題。Docker 讓程式在**隔離的容器**中執行，做到：

- **一致性**：開發、測試、生產環境行為相同
- **隔離性**：每個容器互相獨立，不影響主機
- **可移植性**：容器可在任何支援 Docker 的機器上執行

Docker 底層使用 Linux Kernel 的 **Namespace**（環境隔離）與 **Cgroup**（資源管理）實現。

---

## 核心概念

### Container vs VM

| | Container | 虛擬機（VM） |
|---|---|---|
| 隔離層 | 行程層（共用 Kernel） | 完整 OS + 自有 Kernel |
| 啟動速度 | 秒級 | 分鐘級 |
| 資源占用 | 輕量 | 較重 |
| 適合場景 | 多服務並行、微服務 | 完整系統隔離 |

### Image（映像檔）

Image 是容器的藍圖，由多個**不可變的 Layer** 堆疊而成。每個 Layer 對應 Dockerfile 的一條指令。同一 Layer 可被多個 Image 共用，節省儲存空間。

### Registry

儲存與分享 Image 的倉庫：

- **公開**：[Docker Hub](https://hub.docker.com/)、Amazon ECR、Google GCR、Azure ACR
- **私有**：Harbor、GitLab Container Registry、JFrog Artifactory

---

## 常用 CLI 指令

```bash
# === 容器操作 ===
docker run -d -p 8080:80 nginx          # 背景執行，本機 8080 → 容器 80
docker run -it ubuntu bash              # 互動模式進入容器
docker ps                               # 列出執行中的容器
docker ps -a                            # 列出所有容器（含停止的）
docker stop <container-id>             # 停止容器
docker rm <container-id>               # 刪除容器
docker rm -f <container-id>            # 強制刪除（含執行中）
docker logs <container-id>             # 查看容器日誌
docker exec -it <container-id> bash    # 進入執行中的容器

# === Image 操作 ===
docker images                           # 列出本地所有 image
docker pull nginx                       # 從 Docker Hub 拉取 image
docker build -t my-app:1.0 .           # 根據目前目錄的 Dockerfile 建置 image
docker tag my-app:1.0 user/my-app:1.0  # 加上 tag
docker push user/my-app:1.0            # 推送至 Docker Hub
docker rmi <image-id>                  # 刪除 image

# === 系統清理 ===
docker system prune                     # 清除無用的容器、網路、image
```

---

## Docker Compose

Compose 透過一個 YAML 檔定義多個服務，以 `docker compose up` 一鍵啟動整個應用程式環境。

```bash
docker compose up -d --build    # 背景啟動，並重新 build image
docker compose down             # 停止並移除容器與網路
docker compose down --volumes   # 同時清除 volume（資料庫資料）
docker compose logs -f          # 即時查看所有服務日誌
```

### Compose 檔範例（Node + MySQL）

```yaml
services:
  app:
    image: node:18-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:8.0
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:    # Volume 在 compose down 後預設保留，加 --volumes 才會一起刪除
```

---

## Dockerfile 語法

```dockerfile
FROM python:3.12                     # 基礎映像

WORKDIR /usr/local/app               # 工作目錄

COPY requirements.txt ./             # 複製檔案
RUN pip install --no-cache-dir -r requirements.txt  # 執行指令

COPY src ./src                       # 複製原始碼

ENV APP_ENV=production               # 設定環境變數

EXPOSE 8080                          # 宣告容器監聽的 port（不會自動發布）

RUN useradd app
USER app                             # 切換執行用戶（避免以 root 執行）

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### 常用指令說明

| 指令 | 說明 |
|---|---|
| `FROM` | 指定基礎 image |
| `WORKDIR` | 設定容器內工作目錄 |
| `COPY <host> <image>` | 從本機複製檔案到 image |
| `RUN` | 建置時執行命令（每條 `RUN` 產生一個 Layer） |
| `ENV` | 設定執行時環境變數 |
| `EXPOSE` | 宣告容器對外 port（文件用途，需配合 `-p` 才會實際映射） |
| `USER` | 設定執行用戶 |
| `CMD` | 容器啟動時執行的預設命令（可被 `docker run` 覆蓋） |
| `ENTRYPOINT` | 容器啟動固定命令（`CMD` 作為預設參數） |

---

## Image Layer 快取

- 每個 `COPY` / `RUN` 指令產生一個 Layer，Layer 內容未變則沿用快取
- 將**變動頻率低**的步驟（如安裝依賴）放在 Dockerfile 前面，**原始碼 COPY** 放最後，可最大化快取利用

```dockerfile
# 好的做法：先複製 requirements，再複製原始碼
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .   # 原始碼變動不會讓依賴層失效
```
