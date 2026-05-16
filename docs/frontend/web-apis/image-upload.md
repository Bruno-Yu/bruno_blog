---
title: 圖片資料怎麼送到伺服器
description: 從 JSON + base64 data URL 到 multipart/form-data——了解兩種圖片上傳方式的差異與為什麼要改用 multipart。
tags: [前端, 上傳, multipart, base64]
date: 2024-11-10
type: doc
publish: true
---

在處理圖片上傳時，常見有兩種做法：舊的 JSON + data URL 方式，以及現代推薦的 multipart 上傳。

---

## A. 以前：JSON + data URL

把圖片先轉成 base64 data URL 字串：

```
data:image/png;base64,iVBORw0KGgo...
```

然後把它塞進 JSON 裡一起送出。

**問題：**
- 圖片一多（多參考圖）、或編輯操作更複雜，JSON 會變很大
- base64 會膨脹體積（約 1/3），也更容易遇到長度限制、解析/序列化問題
- 某些後端/代理層對「超大的 JSON」不穩，導致「容易失敗」

---

## B. 現在：multipart 上傳

改用 HTTP 常見的檔案上傳格式：`multipart/form-data`。

圖片以「檔案欄位」的方式直接傳，不用塞進 JSON 字串。

```javascript
const formData = new FormData();
formData.append('image', imageFile);
formData.append('metadata', JSON.stringify({ title: 'example' }));

await fetch('/api/upload', {
  method: 'POST',
  body: formData,
  // 不需要設定 Content-Type，瀏覽器會自動帶上 boundary
});
```

**好處：**
- 更適合傳多張圖與大檔
- 比較不容易因為 payload 太大或格式處理而失敗
- 對「多參考圖的複雜編輯」穩定性通常會明顯提升

---

## 選擇依據

| 情境 | 建議方式 |
|---|---|
| 單張小圖（< 100KB）、資料簡單 | JSON + base64 仍可接受 |
| 多張圖、或圖片 > 200KB | 改用 multipart/form-data |
| 有代理/閘道器（API Gateway、Nginx）| 優先 multipart，避免 payload 大小限制 |
| 需要和其他欄位一起送 | multipart 更彈性（可混合文字欄位和檔案欄位）|
