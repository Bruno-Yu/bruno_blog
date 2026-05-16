# Bruno's Notes

個人公開技術筆記，以 Docusaurus 3 建置，部署於 Cloudflare Pages。

**Live site**: [blog.jackhellowin.win](https://blog.jackhellowin.win)

---

## Stack

| 用途 | 技術 |
|---|---|
| 框架 | [Docusaurus 3](https://docusaurus.io/) |
| 搜尋 | `@easyops-cn/docusaurus-search-local`（本地索引，build 後生效）|
| 部署 | Cloudflare Pages |
| 筆記來源 | Obsidian vault（私有） |

---

## 本地開發

```bash
npm install
npm run start       # http://localhost:3000（dev 模式，搜尋不可用）
npm run build       # 正式 build（搜尋索引會產生）
npm run serve       # 預覽 build 結果（含搜尋功能）
```

> **搜尋注意**：dev server 下搜尋會顯示 "search index is only available when you run docusaurus build"，這是正常現象，`npm run build` 後才會有索引。

---

## 新增筆記（Obsidian → 公開發布）

### 1. 在 Obsidian 完成筆記

確認筆記已整理完成，且**不包含**以下內容：
- 公司內部資訊（伺服器名稱、帳號、連線字串）
- 僅適用於私有環境的設定值
- 引述自他人文章的大段落（版權疑慮）

---

### 2. 建立對應的 `docs/` 檔案

依照分類在 `docs/` 下建立對應的 `.md` 檔：

```
docs/
├── frontend/
│   ├── javascript/
│   ├── typescript/
│   ├── vue/
│   ├── css/
│   ├── libraries/
│   ├── frameworks/
│   └── web-apis/
├── tooling/
├── testing-performance/
├── web-platform/
├── backend-api/
├── devops/
├── dotnet/
└── analytics/
```

**Frontmatter 規格（每篇必填）：**

```yaml
---
title: 文章標題
description: 一兩句話概述，會出現在搜尋結果與 meta tag
tags: [tag1, tag2]
date: YYYY-MM-DD
type: doc
publish: true
---
```

---

### 3. 更新 `sidebars.ts`

在 `sidebars.ts` 的對應分類下加入新文章的路徑（不含 `.md`）：

```typescript
{
  type: 'category',
  label: 'Backend & API',
  collapsed: false,
  items: [
    'backend-api/json-server',
    'backend-api/messaging-systems',
    'backend-api/your-new-article',   // ← 新增這行
  ],
},
```

> 路徑格式：`<分類>/<slug>`，對應 `docs/<分類>/<slug>.md`

---

### 4. 本地確認

```bash
npm run start   # 確認文章出現在 sidebar、連結正常
npm run build   # 確認 build 無錯誤
```

---

### 5. 提交與部署

```bash
git add docs/path/to/new-article.md sidebars.ts
git commit -m "docs: add <文章名稱>"
git push
```

Push 後 Cloudflare Pages 會自動觸發 preview deployment，審核後 merge 到 main 上線。

---

## 分類 → 路徑對照表

| Sidebar 分類 | `docs/` 子目錄 |
|---|---|
| Frontend > JavaScript | `frontend/javascript/` |
| Frontend > TypeScript | `frontend/typescript/` |
| Frontend > Vue / Nuxt | `frontend/vue/` |
| Frontend > CSS / Layout | `frontend/css/` |
| Frontend > Libraries | `frontend/libraries/` |
| Frontend > Frameworks | `frontend/frameworks/` |
| Frontend > Web APIs | `frontend/web-apis/` |
| Tooling | `tooling/` |
| Testing & Performance | `testing-performance/` |
| Web Platform | `web-platform/` |
| Backend & API | `backend-api/` |
| DevOps | `devops/` |
| .NET / C# | `dotnet/` |
| Analytics | `analytics/` |

---

## 新增分類

若需要新增一個全新的頂層分類：

1. 在 `docs/` 下建立對應子目錄（如 `docs/ai/`）
2. 在 `sidebars.ts` 加入新的 `category` 區塊
3. 在 `docs/ai/` 下建立第一篇文章

---

## Deployment

詳見 `DEPLOYMENT.md`。

- Platform: Cloudflare Pages
- Build command: `npm run build`
- Output dir: `build`
- Production domain: `blog.jackhellowin.win`
