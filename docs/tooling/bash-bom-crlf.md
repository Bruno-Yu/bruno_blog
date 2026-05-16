---
title: Bash 腳本被 BOM、CR 搞壞問題排查
description: 解析 Bash 腳本因 UTF-8 BOM 和 CRLF 換行符號導致執行錯誤的根本原因，以及三種防止方式。
tags: [Linux, Bash, 編碼, 開發工具]
date: 2025-01-15
type: doc
publish: true
---

## 1. 遇到的問題

在 Linux/遠端主機上執行看似正常的腳本，卻出現下列狀況：

- 第一行明明是 `set -e`，卻報錯：
  ```
  /usr/bin/bash: line 1: ﻿set: command not found
  ```
- 腳本解析異常、邏輯結構壞掉，或出現 `^M` 相關錯誤：
  ```
  set -euo^M
  '\r': command not found
  ```
  條件/迴圈/EOF 等語法錯誤（看起來「行都在」，但解釋器讀到的其實不一樣）
- 透過 `ssh "...echo $b64 | base64 -d | bash"` 這種方式執行時，偶發：
  - `unexpected end of file`
  - 遠端腳本內容缺字、斷行、或被拆段導致不可預期行為

---

## 2. 產生的原因

問題通常是「腳本內容在傳輸/產生過程被污染或截斷」，常見來源有兩類：

### 2.1 文字編碼/換行差異：BOM 與 CR

#### BOM（UTF-8 BOM）

UTF-8 BOM 是檔案開頭的 3 bytes：`EF BB BF`（文字層表示成 U+FEFF）。

它是**不可見字元**；某些 Windows 編輯器/產出流程會自動加在 UTF-8 文字最前面。

Bash 對第一行非常敏感：如果開頭變成 `<BOM>set -e`，bash 讀到的命令會變成「﻿set」（前面多一個不可見字元），因此：

```
﻿set: command not found
```

#### CR（Carriage Return，`\r`）/ Windows 換行

- Windows 換行是 CRLF：`\r\n`；Linux/Unix 是 LF：`\n`
- 含 CR 的腳本在 Linux 上被 bash 解析時，行尾的 `\r` 會干擾語法與命令解析，常以 `^M` 形式出現
- 結果是：你「看到」的文本行正常，但 bash 實際讀到的是「每行尾巴多一個 `\r`」

### 2.2 傳輸方式不穩：把整份 script/base64 塞進 ssh 命令列

常見但高風險的做法：

```sh
ssh user@host "echo $b64 | base64 -d | bash"
```

風險點：
- **命令列長度上限**：字串可能被截斷（不同 shell/ssh/系統上限不同）→ 解碼後腳本不完整 → `unexpected end of file`
- **多層 quoting/escape 解析**：PowerShell / YAML / ssh / 遠端 shell 連環處理，容易把字元吃掉或拆段
- **`echo` 跨平台不穩定**：對跳脫、長字串、特殊字元的處理差異容易引發隱性損壞

---

## 3. 避免方式

核心原則：**不要在命令列承載整份腳本**、**在進入 bash 前先淨化 BOM/CR**、**加上最小驗證避免 silent failure**。

### 3.1 改走 stdin：不要把整份 script/base64 放進 ssh 命令列

最穩定模式：遠端用 `bash -s`，腳本由 stdin 傳入：

```sh
<local-script> | ssh user@host "/usr/bin/bash -s"
```

好處：
- 避開命令列長度上限
- 大幅降低 quoting/escape 造成的變形
- 通常可直接不需要 base64（少一層轉碼少一層風險）

### 3.2 在「進入 bash 前」統一清掉 CR 與 BOM（遠端清理最保險）

在遠端 bash 前加一層 filter（stdin 串流處理）：
- `tr -d '\r'`：移除 CR（把 CRLF 清乾淨）
- `sed '1s/^\xEF\xBB\xBF//'`：只移除第一行開頭 BOM

```sh
<local-script> | ssh user@host "tr -d '\r' | sed '1s/^\xEF\xBB\xBF//' | /usr/bin/bash -s"
```

### 3.3 Windows/PowerShell 組腳本：用「逐行陣列」降低污染機率

避免 here-string/YAML 縮排或不可見字元混入，改用逐行累積再 join：
- 用 `$lines.Add(...)` 一行行組
- 最後 `-join "\n"` 統一輸出 LF

目的：
- 降低 YAML 縮排造成的意外空白
- 降低 here-string 容易混入 BOM/不可見字元的機率

---

## 快速診斷指令

```bash
# 檢查檔案換行符號（含 \r 的話會看到 ^M）
cat -A your-script.sh | head -5

# 用 file 指令確認
file your-script.sh
# 正常: "Bourne-Again shell script, ASCII text executable"
# 有問題: "... with CRLF line terminators" 或 "with BOM"

# 用 xxd 看前幾 bytes（BOM = ef bb bf）
xxd your-script.sh | head -1

# 轉換 CRLF → LF
dos2unix your-script.sh
# 或用 sed
sed -i 's/\r$//' your-script.sh
```
