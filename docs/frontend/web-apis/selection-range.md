---
title: Selection & Range WebAPI 研究
description: 深入了解瀏覽器的 Selection 與 Range API——如何程式化地操作頁面選取範圍，實現自訂複製、標註與文字操作功能。
tags: [前端, JavaScript, WebAPI, DOM]
date: 2024-11-01
type: doc
publish: true
---

## Selection

`window.getSelection()` 會回傳一個 Selection 物件，代表「目前」頁面上被選取（反白）的內容。

**常見功能：**
- 取得目前選取的文字
- 指定選取內容
- 清除選取
- 監控選取變化

**常見屬性/方法：**

| 方法/屬性 | 說明 |
|---|---|
| `getSelection()` | 取得目前的 Selection 物件 |
| `selection.toString()` | 取得目前選取的文字內容 |
| `selection.removeAllRanges()` | 清除所有選取範圍 |
| `selection.addRange(range)` | 新增一個選取範圍（通常只會有一個）|

**應用情境：**
- 使用者複製文字時，預先幫他選好要複製的內容
- 製作自訂的文字標註、批註功能

---

## Range

`document.createRange()` 代表「文件中的一段區域」，可以是文字、節點、元素，甚至跨多個元素。

**常見屬性：**

- `startContainer`：範圍起點的節點（可以是元素節點或文字節點）
- `startOffset`：起點在節點內的位置（如果是文字節點，就是字元索引；如果是元素節點，就是子節點的索引）
- `endContainer`：範圍終點的節點
- `endOffset`：終點在節點內的位置

> 這四個屬性完全取決於你怎麼設定 range 的起點和終點（setStart、setEnd 設定位置）

```typescript
const demo = document.getElementById('demo');
const textNode1 = demo.firstChild; // "Hello "
const bNode = demo.childNodes[1];  // <b>
const textNode2 = bNode.firstChild; // "world"

const range = document.createRange();
range.setStart(textNode1, 4); // "Hello "[4] = "o"
range.setEnd(textNode2, 5);   // "world"[5] = 結束（索引 5 = "d"後面）
```

設定後：
- `startContainer`: textNode1 ("Hello ")
- `startOffset`: 4（"o"）
- `endContainer`: textNode2 ("world")
- `endOffset`: 5（"world"的結尾）

**常用方法：**

| 方法 | 說明 |
|---|---|
| `selectNode(node)` | 選取整個節點（包含自己）|
| `selectNodeContents(node)` | 選取節點的所有內容（不包含自己）|
| `setStart(node, offset) / setEnd(node, offset)` | 手動設定起點/終點 |
| `cloneContents()` | 複製範圍內的內容（回傳 DocumentFragment）|
| `deleteContents()` | 刪除範圍內的內容 |
| `extractContents()` | 剪下範圍內的內容 |

**應用情境：**
- 製作自訂的複製/貼上功能
- 製作文字標註、批註
- 自訂選取、刪除、複製、剪下文件中的某一段內容

---

## 實際應用範例：點擊儲存格自動選取內容

以下範例示範如何在點擊表格儲存格時，自動選取整個儲存格內的文字（常見於 AG Grid 等表格元件）：

```typescript
const onCellClicked = (event: CellClickedEvent) => {
  // event.event 是 PointerEvent
  const target = event.event.target as HTMLElement | null;
  if (!target) return;

  // 找到最近的 .ag-cell 元素
  const agCell = target.closest('.ag-cell') as HTMLElement | null;
  if (!agCell) return;

  // 建立 Range 並選取 cell 內容
  const range = document.createRange();
  range.selectNodeContents(agCell);

  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
```

**說明：**
- `range.selectNodeContents(agCell)` 會把 range 設定為 agCell 內的所有內容
- `window.getSelection()` 取得目前的選取物件，讓你可以操作選取範圍
- `selection.addRange(range)` 會讓 agCell 內容被反白選取

Range/Selection 是瀏覽器提供的強大 API，能讓你程式化地操作選取、複製、刪除、標註等功能。
