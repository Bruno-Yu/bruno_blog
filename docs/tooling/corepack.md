---
title: Corepack
description: 用 Corepack 管理專案需要的套件管理器版本
tags: [node, tooling]
date: 2024-06-10
type: doc
publish: true
---

# Corepack

Corepack 的價值在於：讓專案能明確宣告自己需要哪一種 package manager 以及版本，減少「我這台可以跑、你那台不行」的落差。

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## 為什麼有用

- 專案可以固定 package manager 版本
- 團隊成員不需要各自手動安裝不同版本的工具
- 對 `pnpm`、`yarn` 這類多版本工具鏈特別實用

## 實務上我會怎麼用

搭配 `package.json` 的 `packageManager` 欄位，把團隊要使用的工具與版本一起納入版本控制。  
這種設定很小，但對多人協作的穩定性很有幫助。
