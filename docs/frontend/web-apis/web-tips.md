---
title: 網頁小知識：AI 爬蟲偵測與 SEO 優化
description: 如何從 HTTP Request Header 偵測 AI Agent 是否在爬你的網站，以及針對 AI 爬蟲的 Markdown 優化技巧。
tags: [前端, HTTP, AI爬蟲, WebAPI]
date: 2024-11-15
type: doc
publish: true
---

## AI 爬網站判斷（AI SEO 分析）

用 **HTTP Request Header** 來判斷若有以下特徵，可能是 AI Agent 在爬你的網站：

- **`user-agent` 是 `Claude-User`**
- **`accept` 裡面有 `text/markdown`**

**範例 Header：**

```json
{
  "host": "your-site.com",
  "user-agent": "Claude-User (claude-code/2.1.84; +https://support.anthropic.com/)",
  "accept": "text/markdown, text/html, */*",
  "accept-encoding": "gzip, compress, deflate, br",
  "x-forwarded-proto": "https"
}
```

---

## 針對 AI 爬蟲的優化技巧

**運用小技巧**：你可以針對 AI Agent 提供一個專屬版本的內容，而且**用 Markdown 格式**就好。

好處：
- **省下傳輸冗余 HTML 和 CSS 的時間**
- 這些 Agent 讀取你網頁的速度會更快
- Markdown 對 LLM 來說語意更清晰，有助於更準確地索引你的內容

實作思路：

```javascript
// 在 Next.js / Express 等框架中，偵測 AI Agent 並回傳 Markdown
app.get('/article/:slug', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  const accept = req.headers['accept'] || '';

  const isAiAgent = userAgent.includes('Claude-User') ||
                    accept.includes('text/markdown');

  if (isAiAgent) {
    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    return res.send(markdownContent); // 回傳 Markdown 版本
  }

  return res.send(htmlContent); // 回傳一般 HTML
});
```

---

## 延伸思考

隨著 AI Agent 越來越多，網站可以從「只優化給人看」轉變為「同時優化給人和 AI 看」：

- 提供 `/llms.txt` 檔案說明網站結構（類似 `robots.txt`）
- 對 AI 友好的 Markdown 端點，可減少 token 消耗
- 提供結構化的 JSON-LD schema，讓 AI 更容易理解你的內容
