---
title: Ghostty 終端機設定
description: Ghostty 終端機的安裝、快捷鍵、config 設定與實用功能筆記。
tags: [ghostty, terminal, tooling, macos]
date: 2026-05-16
type: doc
publish: true
---

# Ghostty 終端機設定

## 安裝

推薦用 Homebrew 安裝（方便後續系統套件一起更新）：

```bash
brew install --cask ghostty
```

設定檔位置：`~/.config/ghostty/config`（若不存在可手動建立）

```bash
mkdir -p ~/.config/ghostty
```

---

## 快捷鍵

### 最重要的兩個

| 功能 | 快捷鍵 | 說明 |
|---|---|---|
| 命令面板 | `Cmd + Shift + P` | 搜尋所有指令，忘記按鍵時的救星 |
| 重新載入設定 | `Cmd + Shift + ,` | 修改 config 存檔後立即套用，免重開 App |

### 視窗與分頁管理

| 功能 | 快捷鍵 |
|---|---|
| 新建分頁 | `Cmd + T` |
| 關閉分頁/視窗 | `Cmd + W` |
| 切換分頁 | `Cmd + Shift + [` 或 `]`（或 `Cmd + 數字`）|
| 垂直分割（右側） | `Cmd + D` |
| 水平分割（下方） | `Cmd + Shift + D` |
| 切換分割焦點 | `Cmd + [` 或 `]` |
| 最大化當前窗格 | `Cmd + Shift + Enter` |
| 全螢幕切換 | `Cmd + Enter` |

---

## Config 設定範例

將以下內容寫入 `~/.config/ghostty/config`，按 `Cmd + Shift + ,` 套用：

```bash
# 查詢所有內建主題清單
ghostty +list-themes

# Dark:  Aizen Dark, Andromeda, Atom, Aura, Ayu
# Light: Bluloco Light, Builtin Light, Flexoki Light
```

```ini
# ===== 主題與字體 =====
theme = dracula
font-family = "JetBrains Mono"
font-size = 14

# ===== 視窗外觀 =====
background-opacity = 0.85       # 背景透明度 (0.0 ~ 1.0)
background-blur-radius = 20     # 毛玻璃模糊程度
window-decoration = false       # 隱藏 macOS 標題列（極簡模式）
window-padding-x = 10
window-padding-y = 10

# ===== 游標 =====
cursor-style = block            # block / bar / underline
cursor-blink = true
```

---

## 進階功能

### 快速終端機（Quake Mode）

任何畫面下透過全域快捷鍵彈出 Ghostty：

1. 在 `config` 加入：

   ```ini
   keybind = global:ctrl+space=toggle_quick_terminal
   ```

2. 前往 macOS **系統設定 → 隱私權與安全性 → 輔助使用**，將 Ghostty 加入授權清單。

### 標題列顯示當前路徑

在 `~/.zshrc` 底部加入：

```shell
function precmd() {
  # 傳送轉義序列更新標題列為目前路徑
  print -Pn "\e]2;%~\a"
}
```

執行 `source ~/.zshrc` 套用。需確保 config 中未設定 `window-decoration = false`（標題列要顯示才有效）。
