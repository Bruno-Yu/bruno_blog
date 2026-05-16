---
title: Base64 編碼轉換：TypeScript 與 C# 實作
description: 在瀏覽器、Node.js 和 C# 中正確處理 Base64 編碼與解碼，包含 UTF-8 字串的完整實作。
tags: [C#, TypeScript, Base64, 編碼]
date: 2024-12-10
type: doc
publish: true
---

Base64 是常見的二進位轉文字編碼方式，常用於在不支援二進位的場合（如 JSON、URL、HTTP Header）傳輸資料。以下整理在不同環境中的實作方式。

---

## TypeScript / JavaScript

### 瀏覽器環境

瀏覽器內建的 `btoa` / `atob` 只支援 ASCII，若要處理 **UTF-8 中文字串**，需要先過 `TextEncoder`：

```typescript
// 字串 → Base64（支援 UTF-8）
export function encodeBase64(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str); // Uint8Array
  let binary = "";
  utf8Bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

// Base64 → 字串（支援 UTF-8）
export function decodeBase64(base64: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}
```

### Node.js 環境

Node.js 有內建的 `Buffer`，處理 UTF-8 更簡潔：

```typescript
// 字串 → Base64
export function encodeBase64(str: string): string {
  return Buffer.from(str, "utf8").toString("base64");
}

// Base64 → 字串
export function decodeBase64(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf8");
}
```

---

## C#

使用 `Convert.ToBase64String` 搭配 `Encoding.UTF8`：

```csharp
using System;
using System.Text;

public static class Base64Helper
{
    // 字串 → Base64
    public static string EncodeBase64(string plainText)
    {
        if (plainText == null) throw new ArgumentNullException(nameof(plainText));

        byte[] bytes = Encoding.UTF8.GetBytes(plainText);
        return Convert.ToBase64String(bytes);
    }

    // Base64 → 字串
    public static string DecodeBase64(string base64)
    {
        if (base64 == null) throw new ArgumentNullException(nameof(base64));

        byte[] bytes = Convert.FromBase64String(base64);
        return Encoding.UTF8.GetString(bytes);
    }
}
```

---

## 注意事項

| 問題 | 說明 |
|---|---|
| 中文亂碼 | 記得指定 UTF-8 編碼，`btoa` 直接傳中文會出錯 |
| 體積膨脹 | Base64 編碼後體積約為原始大小的 4/3（約 33% 增加）|
| URL 安全 | 標準 Base64 含有 `+`、`/`、`=`，若用於 URL 需轉為 URL-safe 版本（`+` → `-`，`/` → `_`）|

### URL-safe Base64（Node.js）

```typescript
// URL-safe Base64 編碼
export function encodeBase64Url(str: string): string {
  return Buffer.from(str, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, ""); // 移除 padding
}
```
