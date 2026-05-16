---
title: JWT 概念
description: JWT（JSON Web Token）的結構、驗證流程、Refresh Token 輪換機制說明。
tags: [jwt, auth, backend, security]
date: 2026-05-16
type: doc
publish: true
---

# JWT 概念

JWT（JSON Web Token）由三個 Base64URL 編碼的部分組成，以 `.` 連接：

```
Header.Payload.Signature
```

---

## 三個部分

### Header

```json
{ "alg": "HS256", "typ": "JWT" }
```

- `alg`：加密演算法（HMAC、SHA256、RSA）
- `typ`：固定為 `JWT`

### Payload（聲明 / Claims）

Payload 以 Base64 編碼（**非加密，可被解碼**），不應存放機密資料。

標準 Registered Claims：

| 欄位 | 說明 |
|---|---|
| `iss` | 簽發人 (issuer) |
| `exp` | 過期時間 (expiration time) |
| `sub` | 主題 (subject) |
| `aud` | 接收人 (audience) |
| `nbf` | 開始生效時間 (not before) |
| `iat` | 簽發時間 (issued at) |
| `jti` | JWT ID |

### Signature

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  your-256-bit-secret
)
```

Signature 用來驗證 Header + Payload 未被篡改。`secret` 存放於伺服器端，不對外暴露。

---

## 一般存取流程

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser/App
    participant API as API (Resource Server)
    participant AUTH as Auth Server

    Note over B,AUTH: 初次登入
    B->>AUTH: POST /login（帳密/2FA/裝置指紋…）
    AUTH-->>B: Access Token(短效, JWT)<br/>+ Refresh Token(長效, 只用於換票)

    Note over B,API: 一般存取
    B->>API: Authorization: Bearer <AccessToken>
    API-->>B: 200 OK（驗簽 JWT，不查 DB）

    Note over B,AUTH: Access Token 到期
    B->>AUTH: POST /refresh（附上 Refresh Token）
    AUTH->>AUTH: 驗證/查表（是否有效/未註銷/未重複使用）
    AUTH-->>B: 新 Access Token（可選：同時輪換新的 Refresh Token）
```

---

## Refresh Token 輪換（Rotate）與盜用偵測

```mermaid
sequenceDiagram
    autonumber
    participant B as Browser/App
    participant AUTH as Auth Server
    participant DB as Token Store/Blacklist

    Note over B,AUTH: 旋轉式 Refresh Token（Rotate）
    B->>AUTH: /refresh 舊RT
    AUTH->>DB: 驗證舊RT（有效且未使用過）
    DB-->>AUTH: OK
    AUTH->>DB: 將舊RT標記為已使用/失效
    AUTH-->>B: 新AT + 新RT

    Note over B,AUTH: 被盜用偵測（舊RT重複使用）
    B->>AUTH: /refresh 舊RT（已標失效）
    AUTH->>DB: 查詢：舊RT已用過
    DB-->>AUTH: 已用過 => 可能外洩
    AUTH-->>B: 401 / 撤銷該裝置會話
    AUTH->>DB: 將同一 Session 下其餘RT一併作廢（選擇性）
```
