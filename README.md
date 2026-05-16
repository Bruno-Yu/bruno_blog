# Bruno's Notes

個人公開技術筆記，以 Docusaurus 3 建置，套用 **Phosphor** 視覺語言。

**Live site**: [blog.jackhellowin.win](https://blog.jackhellowin.win)

---

## Stack

| 用途 | 技術 |
|---|---|
| 框架 | [Docusaurus 3.10.1](https://docusaurus.io/) |
| 主題 | Phosphor — 自訂設計系統（暖米色 light / 深夜黑 dark） |
| 字型 | Manrope（body，自托管 woff2）、IBM Plex Mono（code/meta，自托管 woff2） |
| 搜尋 | [Algolia DocSearch](https://docsearch.algolia.com/)（crawler 索引）|
| 部署 | GitHub Pages（GitHub Actions 自動部署） |
| 筆記來源 | Obsidian vault（私有）|

---

## Phosphor 設計系統

### 色彩 Token

| Token | Light | Dark |
|---|---|---|
| bg | `#f3efe8` | `#0b0e12` |
| surface | `#e9e2d8` | `#10141a` |
| sidebar | `#ddd6ca` | `#0d1117` |
| accent | `#076e65` | `#2dd4bf` |
| text | `#111418` | `#ddd6cc` |
| muted | `#4e5664` | `#8a9099` |
| border | `rgba(17,20,24,0.13)` | `rgba(221,214,204,0.07)` |

### 已實作功能

- **Navbar** — 頂部 2.5px accent 線、backdrop-filter blur
- **Sidebar** — 分類標籤 monospace + 大寫 + 圓點指示器、file hover 左側 accent 邊線 (0.12s)、active 狀態、folder 箭頭旋轉 (0.20s)、巢狀連接線
- **TOC** — scroll-driven 閱讀進度條（swizzle wrap）、active 項目 accent 色
- **Code blocks** — macOS 紅黃綠三點 header、IBM Plex Mono 字型
- **Algolia modal** — `--docsearch-*` 變數全面 Phosphor 化
- **EmptyState 元件** — 空分類頁可用（accent 圖示 + CTA + 最近更新列表）
- **Accessibility** — `prefers-reduced-motion` 停用所有 transition/animation

### 關鍵檔案

```
src/
  css/custom.css              ← 所有 CSS（token、navbar、sidebar、TOC、code、algolia）
  theme/TOC/index.tsx         ← swizzle wrap：scroll 進度條
  components/EmptyState/
    index.tsx                 ← 可複用空分類頁元件
static/fonts/
  Manrope-*.woff2             ← 400 / 500 / 600 / 700（已有）
  IBMPlexMono-Regular.woff2   ← 新增
  IBMPlexMono-Medium.woff2    ← 新增
```

---

## 本地開發

```bash
npm install
npm run start       # http://localhost:3000（dev 模式，Algolia 搜尋需有效 API key）
npm run build       # 正式 build
npm run serve       # 預覽 build 結果
```

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

Push 後 GitHub Actions 會重新建置並部署 GitHub Pages。

---

更多內容規範與分類對照請見 `CONTENT_WORKFLOW.md`。

---

## 新增分類

若需要新增一個全新的頂層分類：

1. 在 `docs/` 下建立對應子目錄（如 `docs/ai/`）
2. 在 `sidebars.ts` 加入新的 `category` 區塊
3. 在 `docs/ai/` 下建立第一篇文章
4. 若分類為空，可在 `docs/ai/index.mdx` 引入 `EmptyState` 元件

---

## Deployment

- Platform: GitHub Pages
- Workflow: `.github/workflows/deploy.yml`
- Build command: `npm run build`
- Output dir: `build`
