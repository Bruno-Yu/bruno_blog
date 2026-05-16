---
title: Bootstrap5學習筆記
description: 第一個CSS框架就重Boostrap開始吧～
tags: ['css','bootstrap']
date: 2022-01-10
type: doc
publish: true
---
# 快速開始

## 環境建置

### 語系設置

- 檢索
    
    [](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
    
- 常用
    
    ```html
    <html lang="zh-TW">//台灣語系(瀏覽器會自動幫忙加Hant)
    <html lang="zh-Hant-TW">//台灣語系
    <html lang="zh-Hant-HK">//香港語系 (香港與台灣都是繁體，但寫法不同)
    <html lang="zh-Hant-CN">//簡體中文
    ```
    

### BS5 CDN

- BS5 CSS載入方式
    
    ```html
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    ```
    
- BS5 的JS插件的部分, 分為Bunddle & Seperate
    - Bunddle
        
        ```html
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
        ```
        
    - Seperate
        
        ```html
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
        ```
        
- class="data-bs" BS才能驅動
    
    ```html
    <button type="button" class="btn btn-primary" data-bs-toggle="button" autocomplete="off">Toggle button</button>
    ```
    

### 預設特性

- **Reboot重置 ([參考](https://github.com/twbs/bootstrap/blob/v5.1.0/dist/css/bootstrap-reboot.css)):**
    1.  類似CSS的Reset，將樣式重設，重點在於跨平台方便
    2. **BS預設變數** 都會以bs作為開頭 例: `--bs-primary` 
    3. 有加 **有加Reboot就不用另外加Reset了**
- **Box-sizing:**
    
     ****整體的 `box-sizing` 數值從 `content-box` 切換為 `border-box`。這就確保了 `padding` 不會影響元素最終的計算寬度
    
- **預設字體 ([參考](https://drive.google.com/file/d/1zIK08_uxlTa056gyDm1eTUQG0cNEp43d/view)):**
    1. BS內部預設的跨系統字體均為英文字體，**若需要中文字體，需要手動載入**
    2. 字體都使用英文名稱表示

### 全域變數 root:\{ \}

- 設置範例
    
    **BS預設變數** 都會以bs作為開頭 例: `--bs-primary` 
    
    ```html
    <style>
    :root{
        --primary: #69F0AE;
     }
     /* 在CSS字定義的變數放入class中，使用 **var()** 將CSS全域變數帶入 */
     .bg-primary{
         background-color:var(--primary);
     }
    </style>
    ```
    

## JavaScript

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/getting-started/javascript/) 、 [英文](https://getbootstrap.com/docs/5.1/getting-started/javascript/)**

### JS 啟用方式

### 啟用BS的JS CDN   `data-bs-...屬性`   `new bootsrap.元件名`

**注意1 : 兩種方法同一元件能調用的功能可能不同，並不能互相取代**

**注意2: 都需先放入BS的JS CDN**

- **BS的 JS CDN (Buddle版)**
    
    ```html
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
    ```
    

### 資料屬性直接調用 `data-bs-屬性名`

說明: 都要載入CDN，透過資料屬性(data-bs)可以直接調用功能外，資料屬性也可以調用物件元件選項(options)，其它(Modal的 methos, event)則要用原生JS搭配載入

```jsx
<div class="demo">
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="button" autocomplete="off">Toggle button</button>
</div>
```

### 搭配原生JS使用 `Option, method, events`

說明  都要載入CND，JS原生寫法搭配載入的有 Modal options, method, event

### 改變選項預設-BS物件實體化時執行

**創建新物件**: 在new創建新物件，賦予目標Dom元素 `boostrap.元件名` 功能 (若有需要修改的選項option功能可同時放入)

**技巧: 建議選項options直接使用 data-bs-屬性調整，method 再用 new創立新物件使用**

```jsx
var myModal = new bootstrap.Modal(document.getElementById('目標Modal id'), options)
```

範例:

```jsx
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})
```

### 使用BS的元素物件 method  `新物件.method()`

**先將BS物件實體化(創建新物件)，**在new創建新物件，賦予目標Dom元素 `boostrap.元素名`功能，直接以子物件函式的方式執行method

**注意: 方法dispose所有元素皆能使用的方法，可以卸載JS功能**

- 範例Modal元件:
    
    ```html
    <!-- Button trigger modal -->
      <!-- 新增案鈕功能 -->
      <button type="button" class="btn btn-primary" id="btnForModal">
        Launch demo modal
      </button>
    <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1"   aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <!-- 不要忘記加入 data-bs-dismiss="modal" -->
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
                   <!-- 不要忘記加入 data-bs-dismiss="modal" -->
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    ```
    
    JS區域
    
    ```jsx
    const modal = document.querySelector('#exampleModal'); // Modal
      const btn = document.querySelector('#btnForModal'); // 開啟 Modal 按鈕
    //  建立modal實體，說明: 賦予BS功能給新物件
    const bsModal= new bootstrap.Modal(modal, {});
    // 在按鈕建立觸發方式以及執行方法
    btn.addEventListener("click", (e)=>{
      bsModal.toggle();
    });
    ```
    

```jsx
var myModal = new bootstrap.Modal(document.getElementById('目標Modal id'), options)
myModal.method()
```

<aside>
💡 技巧: 可以寫console.log(新物件名)，在Devop tool中的conosole頁面，點擊呈現出的Madal下面的propotype可以看到可以應用的methods

</aside>

### 使用BS的元素物件 Events

BS有提供該元件物件的監視事件能觸發使用

```jsx
const myModalEl = document.querySelector('目標id名')
myModalEl.addEventListener('元素事件', function (event) {
  // do something...
})
```

### 使用模組的方式(ESM)導入

在Webpack 中，所有的 JS 都建議使用模組的方式引入

尚未整理，建議先看過官方Webpack文件理解Webpack再行描述

# Icons (連結)

### 在[BS Icons](https://icons.getbootstrap.com/) 尋找想要的樣式

### ICON FONT CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
```

### BS Icons加入方法

### SVG 直接加入法

找到ICON值的SVG接複製連結後加入程式碼

### Icon font加入法

1. 先貼入ICON 的CDN，於HTML

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
```

1. 複製該ICON提供的Icon font 程式碼
2. 調整的話可以使用通用類別的text調整

# Content & 基礎應用

## **Reboot重置**

- **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/content/reboot/) 、 [英文](https://getbootstrap.com/docs/5.1/content/reboot/)**
1.  類似CSS的Reset，將樣式重設，重點在於跨平台方便
2. **BS預設變數** 都會以bs作為開頭 例: `--bs-primary` 
3. 有加 **有加Reboot就不用另外加Reset了**

## **Typography**文字排版

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/content/typography/) 、 [英文](https://getbootstrap.com/docs/5.1/content/typography/)**

### **預設特性**

文字大小 `font-size`（一般為16px）

### **標題大小**

1.  `.h\{1-6\}` 
    
    ```html
    <p class="h1">h1. Bootstrap heading</p>
    ```
    
2. `.display-\{1-6\}`
    
    ```html
    <h1 class="display-1">Display 1</h1>
    ```
    

 3. 前導主體 `.lead`

```html
<!-- 前導主題 class="lead"，雖然內容沒有加粗，但字有加大 -->
<p class="lead">This is a lead paragraph. It stands out from regular paragraphs.</p>
```

### 行內文本元素 inline text element `<p></p>`

- 原HTML標籤
    - 斜體
        1.  `<em></em>`
        2. `<i></i>` 原語意: 語音，技術術語
    - 底線
        1.  `<ins><ins>`
        2. `<u></u>` 原語意 : 非文本注釋方式呈現
    - 刪除(中間橫線效果)
        1. `<del></del>` 
        2. `<s></s>` 原語意: 不再正確
    - 粗體`<b></b>` 語意: 突出顯示單詞或短語，而不會增加重要性
    - 標記 `<mark></mark>` 語意: 重點強調的文本，以供參考
    - 較大 `<strong></strong>` 語意: 強調
    - 較小`<small></small>` 語意: 旁註和小字體
- BS5 提供的樣式
    
    特點: 只有樣式沒有語意
    
    - 底線: `.text-decoration-underline`
    - 刪除: `.text-decoration-line-through`
    - 標記: `.mark`
    - 較小: `.small`
- 更多樣式
    
    功能: 改變文字對齊、變換、樣式、字重、行高、裝飾線、顏色
    
    1.  [文本 通用類別](https://bootstrap5.hexschool.com/docs/5.1/utilities/text/)
    2. [顏色 通用類別](https://bootstrap5.hexschool.com/docs/5.1/utilities/colors/)

### 特殊HTML標籤與BS 合用功能

- 縮寫 `<abbr> </abbr>`  `.initialism`
    - HTML標籤 `<abbr> </abbr>`  以 Hover 方式顯示縮寫的擴增內容。縮寫具有預設的底線和説明游標，透過懸停和輔助性技術幫助使用者提供額外的內容
    - BS功能: `.initialism`  可將字體略為縮小。
    - 範例
    
    ```html
    <!-- abbr縮寫說明標籤，若箭頭點選會出現詳細說明 -->
    <div class="demo">
      <p><abbr title="attribute">attr</abbr></p>
      <!-- 可用initialization屬性，字會較細 -->
      <p><abbr title="HyperText Markup Language" class="initialism">加入 initialism</abbr></p> 
    </div>
    ```
    
- 引用 `<blockquote> </blockquote>` `.blockquote`
    - 功能:  用於文件中引用來自另一個來源的內容
    - HTML標籤 `<blockquote> </blockquote>` 使用此標籤字體會變大
    - BS功能: `.blockquote`
    - 範例
    
    ```html
    <div class="demo">
      <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
      </blockquote>
    </div>
    ```
    
- 引用來源 `<figure></figure>`  `<figcaption><figcaption>` `.blocquote-footer`  `<cite></cite>`
    - 功能: 引用並提供來源歸屬
    - 範例
    
    ```html
    <figure>
      <blockquote class="blockquote">
        <p>A well-known quote, contained in a blockquote element.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Someone famous in <cite title="Source Title">Source Title</cite>
      </figcaption>
    </figure>
    ```
    
    - 對齊: 使用 文字通用類別 來對齊
        
        範例:
        
        ```html
        <figure class="text-center">
          <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
          </blockquote>
          <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </figcaption>
        </figure>
        ```
        

### 列表 `<ul></ul>` `<li></li>`

- 刪除預設樣式   **`.list-unstyled`**
    
    功能: 只限於第一層子項目列表
    
    範例
    
    ```html
    <ul class="list-unstyled">
      <li>This is a list.</li>
      <li>It appears completely unstyled.</li>
      <li>Structurally, it's still a list.</li>
      <li>However, this style only applies to immediate child elements.</li>
      <li>Nested lists:
        <ul>
          <li>are unaffected by this style</li>
          <li>will still show a bullet</li>
          <li>and have appropriate left margin</li>
        </ul>
      </li>
      <li>This may still come in handy in some situations.</li>
    </ul>
    ```
    
- 並列列表內容 (inline) `.list-inline` `.list-inline-item`
    
    功能: 變成並排行內，並加入間格 (margin)
    
    範例
    
    ```html
    <ul class="list-inline">
      <li class="list-inline-item">This is a list item.</li>
      <li class="list-inline-item">And another one.</li>
      <li class="list-inline-item">But they're displayed inline.</li>
    </ul>
    ```
    

### 表格 `.row` `.col`

- 文字截斷 `.text-truncate`
    
    功能: 避免文字過長
    
    範例:
    
    ```html
    <div class="demo">
      <dl class="row">
        <dt class="col-sm-3">Description lists</dt>
        <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
      
        <dt class="col-sm-3">Term</dt>
        <dd class="col-sm-9">
          <p>Definition for the term.</p>
          <p>And some more placeholder definition text.</p>
        </dd>
      
        <!-- 加入 text-truncate 避免文字過長 -->
        <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
        <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
      </dl>
    ```
    

## Images 圖片 `<img>`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/content/images/) 、 [英文](https://getbootstrap.com/docs/5.1/content/images/)**

### **響應式圖片 `.img-fluid`**

功能: 在視窗縮放時圖片會自動伸縮調整

**依父元素進行縮放**: `max-width: 100%;` 和 `height: auto`

範例:

```html
<div class="demo">
  <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="img-fluid" alt="...">
</div>
```

### 四角圓角效果 `.rounded`  `.img-thumbnail`

1.  通用類別-邊框-園角 `.round`
2. 圖片縮略圖 Image thumbnails : 讓圖片呈現圓角 1px 的邊框。

範例

```html
<div class="demo">
  <img src="https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" class="img-fluid rounded" alt="..." >
</div>
```

### 對齊 & 置中 圖片

圖片原屬性: inline-block

- 方法 1: 使用 `.float`    `.clearfix`
    
    功能: 對齊，使用class="float" ,要記得在父層級加上 class="clearfix
    
    ```html
    <div class="clearfix">
      <!-- 使用 clearfix 搭配 float 完成它 -->
      <div class="練習">
        <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="rounded float-start" alt="..." style="width: 200px; height: 200px; object-fit: cover;">
        <img src="https://images.unsplash.com/photo-1591133258306-db968099262d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" class="rounded float-end" alt="..." style="width: 200px; height: 200px; object-fit: cover;">
    ```
    
- 方法 2:  利用文字屬性 `.text-center`
    
    範例:
    
    **注意: 使用text-align: center置中圖片的方式，此屬性要放在父層**
    
    ```html
    <div class="demo">
      <!-- 使用 text-center 來置中對齊 -->
      <div class="text-center">
        <img src="https://images.unsplash.com/photo-1527777309916-b59323b01809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" class="rounded" alt="..." style="width: 200px; height: 200px; object-fit: cover;">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, blanditiis?</p>
      </div>
    </div>
    ```
    
- 方法 3:  改變圖片屬性  `.d-block` 使用 `.mx-auto`
    
    範例
    
    ```html
    <div class="demo">
      <!-- 加入 mx-auto 來置中對齊 -->
      <img src="https://images.unsplash.com/photo-1591133258306-db968099262d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" class="rounded mx-auto d-block" alt="..." style="width: 200px; height: 200px; object-fit: cover;">
    </div>
    ```
    

## Tables 表格 `<table></table>`   `.table`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/content/tables/) 、 [英文](https://getbootstrap.com/docs/5.1/content/tables/)**

### 原Html標籤結構&BS特性介紹

- **原HTML標籤**
    
    原則: 以列劃分，中間再放欄
    
    - 最外層`<table></table>`
        - 表格標題(不一定需要) `<caption></caption>`
        - 表頭
            
            外層`<thead></thead>` 
            
            中包`<tr></tr>` 原意: table row
            
            內包 `<th></th>`標題項目
            
        - 表身
            
            外層`<tbody></tbody>` 
            
            中包`<tr></tr>` 原意: table row
            
            內包  `<th></th>`標題項目 `<td></td>` 欄位內容
            
        - 表尾 (不一定需要)
            
            外層`<tfoot></tfoot>` 
            
            **不用**中包`<tr></tr>` 
            
            內包  `<td></td>` 欄位內容
            
        
        範例
        
        ```html
        <div class="demo">
          <div class="demo">
            <table class="table">
        			<caption>這是標題</caption>
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
              <tfoot>
                <td>Footer</td>
                <td>Footer</td>
                <td>Footer</td>
                <td>Footer</td>
              </tfoot>
            </table>
          </div>
        </div>
        ```
        
    
- BS特性: 不會繼承  所有表格樣式在 Bootstrap 中都不會繼承，意味著巢狀表格的樣式都是獨立於父表格。
- BS `.table` 有預設表格外觀
- BS表格樣式與顏色都可以混用

### 顏色套用 `.table-\{Theme colors\}`

格式:  `.table-\{Theme colors\}`

- 可在各別標籤套用
    
    on tables:  `<table class="table-primary">...</table>`
    
    on rows: `<tr class="table-primary">...</tr>`
    
    On cells (`td` or `th`) `<td class="table-primary">...</td>`
    
- 主題顏色 Theme Colors (8種)
    - BS主題藍 `primary`
    - 深灰 `secondary`
    - 綠色 `succeess`
    - 紅色 `danger`
    - 黃色 `warning`
    - 天空藍 `info`
    - 淺灰 `light`
    - 黑色 `dark`
    
    範例:
    
    ```html
    <table class="table-primary">...</table>
    <table class="table-secondary">...</table>
    <table class="table-success">...</table>
    <table class="table-danger">...</table>
    <table class="table-warning">...</table>
    <table class="table-info">...</table>
    <table class="table-light">...</table>
    <table class="table-dark">...</table>
    ```
    

### 表格樣式

- 標示標題 scope=”row”, scope=”col”
    
    範例
    
    ```html
    div class="demo">
      <table class="table">
        <thead>
          <tr>
            <!-- scope="col" 或"row"看起來只在標題加 -->
            <th scope="col">Class</th>
            <th scope="col">Heading</th>
            <th scope="col">Heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Default</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr>
            <th scope="row">Primary</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Secondary</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Success</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Danger</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Warning</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Info</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Light</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
          <tr 練習>
            <th scope="row">Dark</th>
            <td>Cell</td>
            <td>Cell</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 條紋行 Stripped rows  `<tbody></tbody>`  `.table-striped`
    
    範圍內任何表格行增加條紋樣式
    
    範例
    
    ```html
    <div class="demo">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 滑入效果 **Hoverable rows** `<tbody></tbody>`   `.table-hover`
    
    功能: 在點選文字上有顏色區分
    
    範例
    
    ```html
    <div class="demo">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 突顯表格 **Active tables**  `.table-active`
    
    功能: 突顯表格行或單獨的儲存格
    
    範例:
    
    ```html
    <h2>啟用樣式</h2>
    <h6>透過 <code>.table-active</code> 類別突顯表格行或單獨的儲存格。</h6>
    
    <div class="demo">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr class="table-active">
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2" class="table-active">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 帶框表格 `.table-bordered`
    
    顏色: 可用通用類別改變boder顏色，格式`border-\{Theme colors\}`
    
    範例: 
    
    ```html
    <div class="demo">
      <table class="table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 無框表格 `.table-borderless`
    
    範例:
    
    ```html
    <div class="demo">
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 小表格 `.table-sm`
    
    說明: 將儲存格 padding 縮減一半的方式讓表格更加精簡。
    
    範例: 
    
    ```html
    <div class="demo">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 垂直對齊 Vertical aligment `.align-\{top, middle, bottom\}`
    
    說明: `<thead></thead>`始終與底部對齊， 可使用垂直對齊類別來對齊表格內容
    
    範例:
    
    ```html
    <table class="table align-middle">
        <thead>
          <tr>
            <th scope="col" class="w-25">Heading 1</th>
            <th scope="col" class="w-25">Heading 2</th>
            <th scope="col" class="w-25">Heading 3</th>
            <th scope="col" class="w-25">Heading 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              This cell inherits <code>vertical-align: middle;</code> from the table
            </td>
            <td>
              This cell inherits <code>vertical-align: middle;</code> from the table
            </td>
            <td>
              This cell inherits <code>vertical-align: middle;</code> from the table
            </td>
            <td>
              This here is some placeholder text, intended to take up quite a bit of
              vertical space, to demonstrate how the vertical alignment works in the
              preceding cells.
            </td>
          </tr>
          <tr class="align-bottom">
            <td>
              This cell inherits <code>vertical-align: bottom;</code> from the table
              row
            </td>
            <td>
              This cell inherits <code>vertical-align: bottom;</code> from the table
              row
            </td>
            <td>
              This cell inherits <code>vertical-align: bottom;</code> from the table
              row
            </td>
            <td>
              This here is some placeholder text, intended to take up quite a bit of
              vertical space, to demonstrate how the vertical alignment works in the
              preceding cells.
            </td>
          </tr>
          <tr>
            <td>
              This cell inherits <code>vertical-align: middle;</code> from the table
            </td>
            <td>
              This cell inherits <code>vertical-align: middle;</code> from the table
            </td>
            <td class="align-top">This cell is aligned to the top.</td>
            <td>
              This here is some placeholder text, intended to take up quite a bit of
              vertical space, to demonstrate how the vertical alignment works in the
              preceding cells.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    
- 巢狀 Nesting
    
    **功能:** 在表格內的表格
    
    **特性:** 如果直接將 `<tr>` 作為表格的子代，則預設會將 `<tr>` 包裝在 `<tbody>` 中，從而使我們的選擇器按預期工作。
    
    範例:
    
    ```html
    div class="demo">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td colspan="4">
              <table class="table table-sm mb-0">
                <thead>
                  <tr>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                    <th scope="col">Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">A</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                  <tr>
                    <th scope="row">B</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                  <tr>
                    <th scope="row">C</th>
                    <td>First</td>
                    <td>Last</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
    ```
    

### 表格標題Captions  `<caption></caption>`  `.caption-top`

功能: 可將表格標題置頂

範例

```html
<div class="demo">
  <table class="table">
    <caption class="caption-top">
      List of users
    </caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Larry</td>
        <td>the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 響應式**Responsive**   `.table-responsive`

- **始終響應式Always Responsive `.table-responsive`**
    
    功能: 放在`<table></table>`父層，可讓表格水平卷軸，可左右滑動
    
    範例:
    
    ```html
    <div class="demo">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    ```
    
- **特定斷點Breakpoint specific**  `.table-responsive\{-sm|-md|-lg|-xl|-xxl\}`
    
    **特性**: 同樣放在table標籤父層，從該斷點開始，表格將正常運行並且不會水平滾動
    
    **注意**: **這些表格可能會跑版，直到它們的響應樣式應用於特定的視窗寬度。**
    
    範例
    
    ```html
    <div class="demo">
      <div class="table-responsive-xl">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
              <th scope="col">Heading</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    ```
    

## Figures 圖片區 `<figure></figure>`

  **使用時機**: 需要放入圖片，以及該圖片說明時，可以使用

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/content/figures/) 、 [英文](https://getbootstrap.com/docs/5.1/content/figures/)**

### 原HTML結構  `<figure></figure>`   `<figcaption></figcaption>`

**目的**: 建立圖片區，含說明

**圖片區** `<figure></figure>`: 包覆在外，內部含 圖片、備註區

**備註區** `<figcaption></figcaption>` :備註文字 並縮小成灰色

範例:

```html
<div class="demo">>
  <figure class="figure text-center">
    <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="figure-img img-fluid rounded" alt="..." style="width: 400px; height: 300px; object-fit: cover;">
    <figcaption class="figure-caption">A caption for the above image.</figcaption>
  </figure>
</div>
```

### 搭配BS圖片區 `<figcaption></figcaption>` `.figure-caption`

**建議: 若**圖片沒有明確尺寸，請務必在 `<img>` 標籤加上 `.img-fluid`

範例:

```html
<div class="demo">>
  <figure class="figure text-center">
    <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="figure-img img-fluid rounded" alt="..." style="width: 400px; height: 300px; object-fit: cover;">
    <figcaption class="figure-caption">A caption for the above image.</figcaption>
  </figure>
</div>
```

### 對齊圖片文字標題 `text-\{start, center, end\}`

搭配: 通用類別的text對齊功能 

範例

```html
<div class="demo">
  <!-- 使用 text-center, text-end 來對齊它 -->
  <figure class="figure  text-end">
    <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="figure-img img-fluid rounded " alt="..." style="width: 400px; height: 300px; object-fit: cover;">
    <figcaption class="figure-caption">A caption for the above image.</figcaption>
  </figure>
</div>
```

# Layout 排版

## 基本格線介紹

### 格線系統(圖)&名詞介紹

- 總寬度 Total Width (所有欄寬度+ Gutter on outside= 總寬度)
- 欄數目 Number of Columns: 預設12 (最多數字的公倍數)
- 欄寬度Column Width
- 格線 間 寬度 Gutter Width
- Gutter on outside: 寬度是內層Gutter的0.5倍
- 通常在設計時，其方框起始部分，是壓在格線上面的(不會壓在格間Gutter)

[格線系統.jpg](https://drive.google.com/file/d/1d8r5-0YWOg9rPYjZ_RwR7hKutGUcTzC4/view?usp=drivesdk)

### BS5格線系統特性

- 屬於彈性格線系統: 可調整
- 預設是12欄，可以使用等比欄
- 5種預設Gutter寬度

## Breakpoints 斷點 `sm` `md` `lg` `xl` `xxl`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/layout/breakpoints/) 、 [英文](https://getbootstrap.com/docs/5.1/layout/breakpoints/)**

### 核心觀念  行動版優先

- **斷點是響應式開發的基礎**
- **media queries 的斷點構建 CSS:** media queries 是 CSS 的一個特性，它允許您根據瀏覽器和操作系統参數有條件地套用樣式。我們最常在 media queries 中使用 `min-width`.
- **以行動版為優先**

### 預設斷點 `sm` `md` `lg` `xl` `xxl`   (`xs` 是預設，不寫)

預設為`xs` : **BS5的xs中斷點是省略的，若自行加入則不會顯示**

以下螢幕大小，皆為12的倍數

- `xs`   X-Small  < 576px
- `sm`  Small  ≥ 576px
- `md`  Medium  ≥ 768px
- `lg`   Large   ≥ 992px
- `xl`   Extra large  ≥ 1200px
- `xxl`   Extra extra large   ≥ 1400px

### 技巧&範例&工具

1. 順序: 先寫預計樣式(行動)，再寫觸發點，觸發之後都是維持該排版樣式
2. 不寫`xs`: **BS5的xs中斷點是省略的，若自行加入則不會顯示**
3. **先思考行動版，再來補桌面版的行為**

**工具**: 在**DevOp的左上角**，有可reponsive的選項，可以切換不同螢幕大小的頁面

**範例1:** 

- display 可以加入不同的中斷點
    - `.d-\{value\}`
    - `.d-\{breakpoint\}-\{value\}`
    - value=\{ `none`, `inline`, `inline-block`, `block`, `grid`, `tablet`, `table-cell` , `table-row`, `flex`,  `inline-flex`\}

```html
<h2>行動優先的中斷點設計</h2>

<div class="box d-none">d-none</div> //不顯示
<div class="box d-xl-none">d-xl-none</div> //在xl螢幕大小時不顯示
<div class="boxd-xxl-none">d-xxl-none</div>//在xxl螢幕大小時不顯示
```

範例二: 下列文字預設是靠左排列，行動版則是置中 `.text-\{breakpoint\}-\{side\}`

```html
<div class="demo text-center text-lg-start">
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat delectus non blanditiis hic explicabo, assumenda ducimus nemo minima doloribus dignissimos harum aperiam. Recusandae sapiente laborum, rem id maxime atque nulla.</p>
</div>
```

## Containers **容器 `.container`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/layout/containers/) 、 [英文](https://getbootstrap.com/docs/5.1/layout/containers/)**

### 注意事項

- **功能:** 放置內容的區塊，限制寬度，避免左右邊過長不好閱讀 (通常是置中) ; 若**沒套用**則會**貼齊左右邊框**
- **順序外到內**: Container→ row→col→content
- 預設為 **響應式容器**

### 預設容器 `.conatiner`

特性: BS的預設容器是**響應式**的，但寬度較`.container-fluid`窄

範例:

```html
<!-- 注意: 容器放在外層，放內層也有效，但主要看內容要有多少 -->
<div class="container">
  <div class="box ">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam reprehenderit mollitia doloremque quidem explicabo sit, inventore natus quibusdam perferendis nobis dignissimos facere temporibus ratione possimus. Ex vel quas minus neque?</p>
  </div>
</div>
```

### 限制寬度響應式**容器 `.container-\{breakpoint\}`**

特性: 到斷點前，都是響應式容器

範例:

```html
<div class="container-xl">
  <div class="box ">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam reprehenderit mollitia doloremque quidem explicabo sit, inventore natus quibusdam perferendis nobis dignissimos facere temporibus ratione possimus. Ex vel quas minus neque?</p>
  </div>
</div>
```

### 流體容器 `.container-fluid`

特性: 可以達到最大寬度的響應式容器，還是會留空，不會完全貼齊兩側

範例:

```html
<div class="container-fluid">
  <div class="box ">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam reprehenderit mollitia doloremque quidem explicabo sit, inventore natus quibusdam perferendis nobis dignissimos facere temporibus ratione possimus. Ex vel quas minus neque?</p>
  </div>
</div>
```

## Columns 欄 `.col`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/layout/columns/) 、 [英文](https://getbootstrap.com/docs/5.1/layout/columns/)**

### 注意事項

- **順序外到內**: Container→ row→col→content
- **Columns 的網格主要建立於 flexbox 上: 所以可以直接在 `.row` 直接加上flex用法而不用另外加 `.d-flex`**
- `.row` 內層不要加入 `.col`以外的元素，否則會沒辦法對齊
- **建立網格排版時，所有內容都是在 Columns 內層中:** 內容務必分開放在Column裡，不要放在Column的同一層，否則可能會產生錯誤
- **響應式排版的預設6個斷點**: `**.col-\{breakspoints\}-行數**`
- **預設欄數為1行12欄**

### Flexbox特性

特性由於 BS的網格系統是由flex所建，所以預設有flex特性，在 `.row` 不需要特別加 `.d-flex`

- **整列 垂直(交錯軸)對齊  `.row`   `.align-items-\{start, center, end\}`**
    
    範例
    
    ```html
    <div class="container">
      <div class="row align-items-start">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row align-items-end">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
    </div>
    ```
    
- **各别欄 垂直(交錯)對齊  `.col`  `.align-self-\{start, center, end\}`**
    
    範例
    
    ```html
    <div class="container">
      <div class="row">
        <div class="col align-self-start">
          One of three columns
        </div>
        <div class="col align-self-center">
          One of three columns
        </div>
        <div class="col align-self-end">
          One of three columns
        </div>
      </div>
    </div>
    ```
    
- **整列 水平(主軸)對齊 `.row`   `.justify-content-\{start, center, end, evenly, between, around\}`**
    
    範例:
    
    ```html
    <div class="container">
      <div class="row justify-content-start">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-around">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
    </div>
    ```
    
- **整列 水平(主軸)反轉 `.row` `.flex-row-reverse`**
    
    範例
    
    ```html
    <div class="row d-flex flex-row-reverse">
      <div class="col-6">
        <div class="box">1</div>
      </div>
      <div class="col-6">
        <div class="box">2</div>
      </div>
    </div>
    ```
    
- 置換主軸方向  `**.row` `.flex-column`**
- **整欄 垂直(交錯軸)反轉** `.row`  `.flex-column-reverse`

### 欄的排版

**順序外到內**: Container→ row→col→content

- 預設性質 `.col-12`
    
    功能: BS預設1列為12欄位，超過會自動換行，並由上往下排列
    
    範例: 
    
    ```html
    <!-- 超過12會換行 -->
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="box"></div>
        </div>
        <div class="col-4">
          <div class="box"></div>
        </div>
        <div class="col-4">
          <div class="box"></div>
        </div>
        <div class="col-4">
          <div class="box"></div>
        </div>
      </div>
    </div>
    
    <!-- 若沒設欄，由於預設col-12會佔滿欄寬，會由上而下排列 -->
    <div class="container">
      <div class="row">
        <div class="練習">
          <div class="box"></div>
        </div>
        <div class="練習">
          <div class="box"></div>
        </div>
        <div class="練習">
          <div class="box"></div>
        </div>
      </div>
      <hr>
    ```
    
- 等寬性質 `.col`
    
    特性: 若不設欄位寬度(欄位數)，則會依同列寬度，進行自動等寬匹配
    
    範例
    
    ```html
    <!-- 若確定欄位數量，可以不規範 欄位 寬度,會自動調整成 等寬 -->
      <div class="row">
        <div class="col-6">
          <div class="box"></div>
        </div>
        <div class="col">
          <div class="box"></div>
        </div>
        <div class="col">
          <div class="box"></div>
        </div>
        <div class="col">
          <div class="box"></div>
        </div>
      </div>
    </div>
    ```
    
- 彈性寬度 `.col-auto`
    
    功能: 會根據內容的多寡形成寬度(與 `.col` 根據所剩空間自動配置不同)
    
    範例
    
    ```html
    <!-- col與col-auto的差異 -->
    <!-- col會根據 所剩空間 自動調配寬度 -->
    <!-- col-auto會根據 內容 自動形成寬度 -->
    <p>加入 col-auto</p>
    
    <div class="container">
      <div class="row">
        <div class="col-6">
          <div class="box"></div>
        </div>
        <div class="col-auto">
          <div class="box">
            這裡有一句話
          </div>
        </div>
      </div>
    </div>
    ```
    
- 響應式寬度  `.col-\{ breakspoints \}-\{ Column_Numbers \}`
    
    功能: 根據螢幕大小進行寬度變化，記得行動版優先
    
    範例:
    
    ```html
    <div class="container">
      <div class="row">
        <div class="col-6 col-md-4 col-xl-3 mb-3">
          <div class="box"></div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mb-3">
          <div class="box"></div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mb-3">
          <div class="box"></div>
        </div>
        <div class="col-6 col-md-4 col-xl-3 mb-3">
          <div class="box"></div>
        </div>
      </div>
    </div>
    ```
    
- 巢狀 Nesting
    
    功能: 在格線中在加入格線系統，記得順序仍是row>col>content
    
    範例
    
    ```html
    <div class="container">
      <div class="row g-1">
        <div class="col-6">
          <div class="box">1</div>
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col">
              <div class="box">2</div>
            </div>
          </div>
          <!-- 在此加入另一個格線結構 -->
          <div class="row g-1">
            <div class="col">
              <div class="box">3</div>
            </div>
            <div class="col">
              <div class="box">4</div>
            </div>
            <div class="col">
              <div class="box">5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    ```
    
- 推移欄位 `.offset`    `.margin`
    1. `.offset-\{欄位數\}` 可以將物件向右推移(也可以透過Flexbox完成)
        
        範例
        
        ```html
        <div class="container">
          <div class="row">
            <div class="col-4 offset-3"><div class="box"></div></div>
          </div>
        </div>
        ```
        
    2. `.m-\{方向 s, e, t, b\}-\{距離\}` & 或用 `.m-\{方向\}-auto` 將其推到另一邊
        
        範例: 
        
        ```html
        <div class="container">
          <div class="row">
            <div class="col-md-4">.col-md-4</div>
            <div class="col-md-4 ms-auto">.col-md-4 .ms-auto</div>
          </div>
          <div class="row">
            <div class="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
            <div class="col-md-3 ms-md-auto">.col-md-3 .ms-md-auto</div>
          </div>
          <div class="row">
            <div class="col-auto me-auto">.col-auto .me-auto</div>
            <div class="col-auto">.col-auto</div>
          </div>
        </div>
        ```
        
- 欄位換行Column breaks  `.row`  `.w-100`
    
    兩個方式，1個是利用欄位本身特性12欄，2利用 `.row` 或 `w-100`
    
    範例
    
    ```html
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
        <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
    
        <!-- Force next columns to break to new line -->
        <div class="w-100"></div>
    
        <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
        <div class="col-6 col-sm-3">.col-6 .col-sm-3</div>
      </div>
    </div>
    
    <!-- 可搭配display來做響應式 -->
    <div class="container">
      <div class="row">
        <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
        <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
    
        <!-- Force next columns to break to new line at md breakpoint and up -->
        <div class="w-100 d-none d-md-block"></div>
    
        <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
        <div class="col-6 col-sm-4">.col-6 .col-sm-4</div>
      </div>
    </div>
    ```
    
- 欄位排序  `.order-\{1-5\}`   `.order-\{breakpoints\}-\{1-5\}`
    
    可控制順序，預設是由左到右，也可以使用 `.order-first` 或 `.order-last`
    
    範例
    
    ```html
    <div class="container">
      <div class="row">
        <div class="col">
          First in DOM, no order applied
        </div>
        <div class="col order-5">
          Second in DOM, with a larger order
        </div>
        <div class="col order-1">
          Third in DOM, with an order of 1
        </div>
      </div>
    </div>
    <!-- .order-first .order-last -->
    <div class="container">
      <div class="row">
        <div class="col order-last">
          First in DOM, ordered last
        </div>
        <div class="col">
          Second in DOM, unordered
        </div>
        <div class="col order-first">
          Third in DOM, ordered first
        </div>
      </div>
    </div>
    ```
    
- 行列式排版 `.row`   `.row-cols-\{1-12\}`
    
    功能: 行列式，在row就決定col的數量
    
    ```html
    <div class="container">
      <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Row column</div>
        </div>
      </div>
    </div>
    ```
    

## Gutters

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/layout/gutters/) 、 [英文](https://getbootstrap.com/docs/5.1/layout/gutters/)**

功能: Gutters 是在欄 (columns) 之間的 padding, 用來響應式的間隔和對齊 Bootstrap 網格系統

### 預設特性介紹

1.  **Gutters 是介於欄位之間的間隙，經水平方向的 padding 產生。** col預設為左右兩邊都有padding 
    
    `.col-*{padding-left:0.75rem ; padding-right:0.75rem}`
    
2.  最左邊以及最右邊的欄位padding則是由row以負的margin去抵銷:
    
    也因為有負值的margin所以會產生水平卷軸，也就是為什麼一**定要在外層加入container原因**，可以避免 **水平卷** 軸產生
    
    `.row-*{margin-left: -0.75rem ; margin-right: -0.75rem}`
    
3.  Gutters 的預設寬度為 **`1.5rem` (`24px`)。**Gutter就是由column內左右兩邊的padding產生的 (所以padding*2=gutter)
4. Gutter on outside，就是多的單一欄位的一側padding，是由是由row的`--bs-gutter-x`這變數產生的，因此若變更這變數，左右兩邊的數值也會改變

**注意: 也因如此，在實戰中只要在row調整`--bs-gutter-x`這變數就能調整Gutter值(ex: 在`class=”row gx-5”`)**

```html
.row{
--bs-gutter-x:1.5rem;
margin-left: calc(var(--bs-gutter-x)*-.5) ; 
margin-right: calc(var(--bs-gutter-x)*-.5):
}
<!--下方是col的css碼-->
<!--下方row的標示代表將row內部的所有元素選取 -->
.row > *{
padding-left: calc(var(--bs-gutter-x)*.5) ; 
padding-right: calc(var(--bs-gutter-x)*.5):
}
```

1. Gutters 可以進行響應式的調整，

### 水平排版 `.gx-{1-5}`

- 運用方式 `.row`
    
    注意: 由於gutter的寬度是row的定義而來，因此改在row，gx的x是x軸
    
    範例
    
    ```html
    <!-- 由於gutter的寬度是row的定義而來，因此改在row -->
    <!-- gx 的 g=gutter; x水平 -->
    <!-- 預設是1.5rem -->
    
    <div class="row gx-5">
      <div class="col-4"><div class="box"></div></div>
      <div class="col-4"><div class="box"></div></div>
      <div class="col-4"><div class="box"></div></div>
    </div>
    ```
    
- 寬Gutters要注意事項  `.container`   `.overflow-hidden`
    
    若使用大gutter要注意是否會溢出container，兩個方法可以避免
    
    1.  在父層`.container`加上padding ex `.px-4`
    2. 在父層 `.container` 加上 `.overflow-hidden`
    
    ```html
    
    <!--方法1 加padding -->
    <div class="container px-4">
      <div class="row gx-5">
        <div class="col">
         <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </div>
    <!--方法2 加.overflow-hidden -->
    <div class="container overflow-hidden">
      <div class="row gx-5">
        <div class="col">
         <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </div>
    ```
    

### 垂直排版 `.gy-{1-5}`

- 運用方式 `.row`
    
    注意: 由於gutter的寬度是row的定義而來，因此改在row，gy的y是y軸
    
    範例
    
    ```html
    <div class="row gy-5">
      <div class="col-12"><div class="box"></div></div>
      <div class="col-6"><div class="box"></div></div>
      <div class="col-6"><div class="box"></div></div>
    </div>
    ```
    
- 寬Gutters要注意事項 `.container` `.overflow-hidden`
    
    若使用大gutter要注意是否會溢出container避免方式在父層 `.container` 加上 `.overflow-hidden`
    
    ```html
    
    <!-- 加.overflow-hidden -->
    <div class="container overflow-hidden">
      <div class="row gy-5">
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </div>
    ```
    

### 垂直+水平 排版 `.g-{1-5}`

- 運用方式 `.row`
    
    注意: 由於gutter的寬度是row的定義而來，因此改在row
    
    範例
    
    ```html
    <div class="row g-5">
      <div class="col-12"><div class="box"></div></div>
      <div class="col-6"><div class="box"></div></div>
      <div class="col-6"><div class="box"></div></div>
    </div>
    ```
    
- 寬Gutters要注意事項 `.container` `.overflow-hidden`
    
    若使用大gutter要注意是否會溢出container避免方式在父層 `.container` 加上 `.overflow-hidden`
    
    ```html
    
    <!-- 加.overflow-hidden -->
    <div class="container overflow-hidden">
      <div class="row g-5">
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </div>
    ```
    

### No gutters 排版 `.g-0`

特性: 移除 .row本來的負值margin以及欄的水平padding，以前是用no-gutters

可以只刪水平或垂直軸 `.g-{x, y}-0`

- 運用方式 `.row`
    
    注意: 由於gutter的寬度是row的定義而來，因此改在row
    
    範例
    
    ```html
    <div class="row g-0">
      <div class="col-sm-6 col-md-8">.col-sm-6 .col-md-8</div>
      <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    </div>
    ```
    
- 寬Gutters要注意事項 `.container` `.overflow-hidden`
    
    若使用大gutter要注意是否會溢出container避免方式在父層 `.container` 加上 `.overflow-hidden`
    
    ```html
    
    <!-- 加.overflow-hidden -->
    <div class="container overflow-hidden">
      <div class="row g-5">
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
        <div class="col-6">
          <div class="p-3 border bg-light">Custom column padding</div>
        </div>
      </div>
    </div>
    ```
    

### 響應式Gutters `.g-{breakpoints}-{1-5}`

永遠**行動版**優先

範例

```html
<div class="row g-0 g-lg-2">
  <div class="col-6">
    <div class="box"></div>
  </div>
  <div class="col-6">
    <div class="box"></div>
  </div>
  <div class="col-6">
    <div class="box"></div>
  </div>
  <div class="col-6">
    <div class="box"></div>
  </div>
</div>
```

### 行列式Gutters `.row`   `.row-cols-{1-12}`

功能: 行列式，在row就決定col的數量，在`.row`  添加gutter

範例:

```html
<div class="container">
  <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
    <div class="col">
      <div class="p-3 border bg-light">Row column</div>
    </div>
  </div>
</div>
```

## Utilities for layout 排版與通用類的混合運用

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/layout/utilities/) 、 [英文](https://getbootstrap.com/docs/5.1/layout/utilities/)**

### Flexbox特性

特性由於 BS的網格系統是由flex所建，所以預設有flex特性，在 `.row` 不需要特別加 `.d-flex`

- **整列 垂直(交錯軸)對齊  `.row`   `.align-items-{start, center, end}`**
    
    範例
    
    ```html
    <div class="container">
      <div class="row align-items-start">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row align-items-center">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
      <div class="row align-items-end">
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
        <div class="col">
          One of three columns
        </div>
      </div>
    </div>
    ```
    
- **各别欄 垂直(交錯)對齊  `.col`  `.align-self-{start, center, end}`**
    
    範例
    
    ```html
    <div class="container">
      <div class="row">
        <div class="col align-self-start">
          One of three columns
        </div>
        <div class="col align-self-center">
          One of three columns
        </div>
        <div class="col align-self-end">
          One of three columns
        </div>
      </div>
    </div>
    ```
    
- **整列 水平(主軸)對齊 `.row`   `.justify-content-{start, center, end, evenly, between, around}`**
    
    範例:
    
    ```html
    <div class="container">
      <div class="row justify-content-start">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-around">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
      <div class="row justify-content-evenly">
        <div class="col-4">
          One of two columns
        </div>
        <div class="col-4">
          One of two columns
        </div>
      </div>
    </div>
    ```
    
- **整列 水平(主軸)反轉 `.row` `.flex-row-reverse`**
    
    範例
    
    ```html
    <div class="row d-flex flex-row-reverse">
      <div class="col-6">
        <div class="box">1</div>
      </div>
      <div class="col-6">
        <div class="box">2</div>
      </div>
    </div>
    ```
    
- 置換主軸方向  `**.row` `.flex-column`**
- **整欄 垂直(交錯軸)反轉** `.row`  `.flex-column-reverse`

### Margin跟padding (Spacing類別)

範例:

```html
<!--推移至另一端  -->
<div class="row">
  <div class="col-2">
    <div class="box"></div>
  </div>
  <div class="col-2">
    <div class="box"></div>
  </div>
  <div class="col-4 ms-auto">
    <div class="box"></div>
  </div>
</div>
<!-- 間距加入，可以用margin或gutter -->
<div class="row">
  <div class="col-6 g-1">
    <div class="box"></div>
  </div>
  <div class="col-6 g-1">
    <div class="box"></div>
  </div>
  <div class="col-6 g-1">
    <div class="box"></div>
  </div>
  <div class="col-6 g-1">
    <div class="box"></div>
  </div>
</div>
```

### order排序`.order-{1-5}`   `.order-{breakpoints}-{1-5}`

可控制順序，預設是由左到右，也可以使用 `.order-first` 或 `.order-last`

範例

```html
<div class="row">
  <div class="col-4 order-3">
    <div class="box">1</div>
  </div>
  <div class="col-4 order-1">
    <div class="box">2</div>
  </div>
  <div class="col-4 order-2">
    <div class="box">3</div>
  </div>
</div>
```

### 切換 display

### 切換 visibility

## Z-index

## CSS Grid

### 注意: 在格線系統，非必要不要調整 `.px-0` 會導致對齊問題

# Forms 表單

## HTML 原表單格式介紹

# HTML form表單 `<form></form>`

**參考自 [Fooish HTML介紹](https://www.fooish.com/html/form.html)**

### 範例

```html
<!-- 表單結構範例 外層用<form></form>標籤 -->
<form>
<!-- <fieldset></fieldset> 將表單內元件分組  -->
  <fieldset>
<!--   <legend></legend> 表單內群組元件明   -->
    <legend>Personal details</legend>
<!--   <label></label>標籤，在這裡是對應input 通常還會有for="id"對應  -->
    <label>Your name:</label> <input name="yourname">
    <label>Your age:</label> <input type="number" name="yourage">
  </fieldset>

  <fieldset>
    <legend>Your address</legend>
    <label>Street:</label> <input name="street">
    <label>Zip code / post code:</label> <input name="postcode">
  </fieldset>
</form>
```

**功能**: 用來讓使用者輸入資料，這些資料可以用來和使用者互動，例如表單內容填完後可以傳回遠端伺服器 (web server)

## form標籤屬性 Attribute `<form> </form>`

### **送出地址     `action=”URL”`**

功能:  當 user 按送出表單後，要將表格的內容送去指定位址 (URL) 。

範例:

```html
<form action="/formprocess.php" method="post">
  
  <!-- ....表單 HTMLs .... -->
  
</form>
```

### HTTP傳輸協議方法 `method=”{get, post...etc.}”`

1.  `get` : 通常是用來請求伺服器端資料，通常用在資料量較小或非敏感的資料，但因為資料會被放在 **網址** 中直接傳出，容易被直接看到資料。
2. `post`: 通常拿來傳送表單填寫資料，會將表單資料放在 HTTP 傳輸封包 body 中送出。post 通常用在表單資料量比較大、有夾帶檔案上傳 (file upload) 或隱私性考量的資料。

範例

```html
<form action="/formprocess.php" method="post">
  
  <!-- ....表單 HTMLs .... -->
  
</form>
```

### 共通屬性

所有的 HTML 表單元素都有下面這些常見的共通屬性

### **`name` 屬性**

指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值

```html
<input type="text" name="foo">
```

### **`autofocus` 屬性**

**設定當頁面載入後，將游標直接聚焦在該元素，是一個布林 (boolean) 屬性**

```html
<input type="text" autofocus>
```

### **`disabled` 屬性**

用來禁用該表單元素，是一個布林 (boolean) 屬性

```html
<input type="button" value="按鈕" disabled>
```

### **`value` 屬性**

指定表單元素的初始值 (default value)

```html
<input type="text" value="我的預設值">
```

## 常見放在表單的元素

## 表單控制 元件分組 **`\<fieldset\>\</fieldset\> , \<legend\>\</legend\>`**

- \<fieldset\> 標籤 (tag): 對[表單 (form)](https://www.fooish.com/html/form.html) 中的控制元件做分組 (group)
- \<legend\> 標籤: 通常是 \<fieldset\> 裡面作為該分組的標題(caption)。

範例

```html
<form>
  <fieldset>
    <legend>Personal details</legend>
    <label>Your name:</label> <input name="yourname">
    <label>Your age:</label> <input type="number" name="yourage">
  </fieldset>

  <fieldset>
    <legend>Your address</legend>
    <label>Street:</label> <input name="street">
    <label>Zip code / post code:</label> <input name="postcode">
  </fieldset>
</form>
```

## 輸入欄位`\<input\>`

### **功能與注意事項**

功能: 最常用的標籤，有許多不同的功能，根據`type`屬性區分

1.  **注意:** 要放對type屬性，因為呈現的功能與格式都不同
2. **注意:** \<input\> 是個[空元素](https://www.fooish.com/html/tag.html#empty-void-element)不需要 closing tag
3. 默認屬性為 `type=”text”`

### 屬性(attributes)

### **type屬性**

### **所有type屬性介紹**

[MDN介紹連結](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

- **text 文字輸入欄位 `\<input type="text"\>`**
- **passoword 密碼輸入欄位 (不以明碼顯示) `\<input type="password"\>`**
- **placeholder 提示訊息(會以淡色顯示於表格) `\<input placeholder="請輸入帳號"\>`**
- **checkbox 核取方塊(可多選) `\<input type="checkbox"\>`**
    - 功能: 讓使用者勾選某個選項是否成立，可以再搭配 `value` 屬性 (預設值是 "on") 來指定當使用者勾選此方塊時要傳送給遠端伺服器什麼值。
    - name: 可以一樣也可以不一樣
    - 有預設勾選功能 **`checked`**
    
    ```html
    <input type="checkbox" name="subscribe" value="html-newsletter"> Subscribe to HTML newsletter?<br>
    <input type="checkbox" name="subscribe" value="js-newsletter"> Subscribe to JavaScript newsletter?
    
    <input type="checkbox" checked> Subscribe to newsletter?
    ```
    
- **radio 選項方塊(只能單選) `<input type="radio">`**
    - 功能: 用來處理表單中有多選一時的情況，搭配 `value` 屬性 (預設值是 "on") 來指定當使用者選取此選項時要傳送給遠端伺服器什麼值。
    - 同一組選項，name要一樣
    - 有預設勾選功能 `checked`
    
    ```html
    <input type="radio" name="color" value="red"> red<br>
    <input type="radio" name="color" value="green"> green<br>
    <input type="radio" name="color" value="blue"> blue
    
    <input type="radio" name="color" value="blue" checked> blue
    
    ```
    
- **reset 重設表單 `<input type="reset" >`**
    
    功能: 讓使用者點了可以重設表單內容回到初始狀態，而 `value` 屬性可以設定 reset 按鈕的名稱。
    
    ```html
    <input type="reset" value="Reset">
    ```
    
- **hidden 隱藏表單 `<input type="hidden">`**
    
    功能: 想傳送一些值回遠端 server，但你不想或不需要讓使用者看見這些內容。
    
    ```html
    <input name="itemid" type="hidden" value="fwoxla">
    ```
    
- **submit 表單送出鈕 `<input type="submit">`**
    
    功能: 會送出表單給遠端的伺服器，用 `value` 屬性可以設定按鈕名稱。
    
    ```html
    <input type="submit" value="Send Request">
    ```
    
- **image 圖片送出鈕 `<input type="image">`**
    
    送出按鈕除了可以用前面提到的文字按鈕，也可以是圖片按鈕
    
    - 可以搭配圖片屬性
        - `src`: 指定圖片位址
        - `alt`: 指定當圖片下載失敗時的替代文字
        - `width`: 指定圖片顯示寬度
        - `height`: 指定圖片顯示高度
    
    範例
    
    ```html
    <input type="image"
           src="/media/examples/login-button.png"
           alt="Login"
           width="100" height="30">
    ```
    
- **file 檔案上傳 `<input type="file">`**
    
    功能: 讓使用者可以從本機端選擇檔案上傳
    
    - 屬性`accept`
        
        功能: 設定可接受的上傳檔案類型
        
        - `.檔案類型`: 例如 `.jpg`, `.pdf`, `.doc`
        - 明確指定 MIME type: 例如 `image/jpeg`, `image/png`
        - `audio/*`: 指任何聲音檔
        - `video/*`: 指任何影片檔
        - `image/*`: 指任何圖檔
    - 屬性 `multiple`
        
        功能: 可以接受同時多個檔案一次上傳
        
        ```html
        <input type="file" accept="image/*,.pdf" multiple>
        ```
        
    - 屬性 `capture`
        
        功能: 可以用來開啟使用手機的照相機鏡頭
        
        範例
        
        ```html
        <input type="file" capture>
        ```
        
        - 屬性值 前鏡頭  `user`  後鏡頭 `environment`
            
            功能: 還可以指定要開啟手機的前鏡頭或後鏡頭，設定 capture 的屬性值
            
            ```html
            front (user) - 前鏡頭
            <input type="file" accept="video/*" capture="user">
            
            back (environment) - 後鏡頭
            <input type="file" accept="video/*" capture="environment">
            ```
            
    
    範例
    
    ```html
    <input type="file" accept="image/*,.pdf">
    ```
    
- **button 表單按鈕  `<input type="button">`**
    
    功能: 通常用來搭配 [JavaScript](https://www.fooish.com/javascript/) 來動態操作表單內容。
    
    ```html
    <input type="button" value="Click Me">
    ```
    
- **search 搜尋欄位 `<input type="search">`**
    
    功能: 在語意上更明確，有些瀏覽器可能也會針對搜尋框顯示不同的樣式。
    
    ```html
    <input type="search" name="q">
    ```
    
- **tel 電話輸入欄 `<input type="tel">`**
    
    功能: 特定的 device 像是手機上會顯示針對電話號碼輸入的界面。
    
    ```html
    <input type="tel">
    ```
    
- **url 網址輸入欄位 `<input type="url">`**
    
    功能: 語意上更明確，且在送出表單之前，有支援的瀏覽器也會自動驗證 (validate) 使用者輸入的內容是不是合法的 URL。
    
    ```html
    <input type="url">
    ```
    
- **email 電子郵件輸入欄 `<input type="email">`**
    
    功能: 語意上更明確，且在送出表單之前，有支援的瀏覽器也會自動驗證 (validate) 使用者輸入的內容是不是合法的 email。
    
    - 屬性 `multiple`
        
        可以用逗號 `,` 分開輸入多組 email
        
        ```html
        <input type="email" multiple>
        ```
        
    
    ```html
    <input type="email">
    ```
    
- **date 日期輸入欄位 `<input type="date">`**
    
    功能: 日期的格式為 `yyyy-mm-dd`。
    
    屬性 `max` 可以輸入的最晚日期
    
    屬性 `min` 可以輸入的最早日期
    
    屬性 `step`  設定一個數字，用來控制日期元件一次跳動的幅度
    
    ```html
    <input type="date"
           value="2020-04-20"
           min="2020-04-01"
           max="2022-04-30"
           step="5">
    ```
    
- **time 時間輸入欄位 `<input type="time">`**
    
    功能:時間的格式為 24 小時制的 `hh:mm`
    
    屬性 `max` 可以輸入的最晚時間
    
    屬性 `min` 可以輸入的最早時間
    
    屬性 `step`  設定一個數字，用來控制時間元件一次跳動的幅度
    
    ```html
    <input type="time"
           value="06:00"
           min="02:00"
           max="22:00"
           step="5">
    ```
    
- **number 數字輸入欄位 `<input type="number">`**
    
    功能:數字輸入欄位只允許輸入數字
    
    屬性 `max` 可以輸入的最大值
    
    屬性 `min` 可以輸入的最小值
    
    屬性 `step`  設定一個數字，用來控制數字元件一次跳動的幅度
    
    ```html
    <input type="number"
           step="10"
           min="0"
           max="1000">
    ```
    
- **range 數字範圍滑動 `<input type="range">`**
    
    功能:讓使用者用滑動的方式在一個數字區間內選擇出一個值，可以應用在對數字精準度要求不高的場景，像是調整音量大小。
    
    屬性 `max` 可以輸入的最大值
    
    屬性 `min` 可以輸入的最小值
    
    屬性 `step`  設定一個數字，用來控制數字元件一次跳動的幅度
    
    ```html
    <input type="range" min="-10" max="10">
    ```
    
- **color 顏色選擇器 `<input type="color">`**
    
    功能: 讓使用者挑選顏色，顏色的格式為 `#rrggbb`。
    
    ```html
    <input type="color" value="#ff0000">
    ```
    

### pattern屬性 表格欄位驗證  `<input pattern="正規表達式">`

適用對象 type的: text, date, search, url, tel, email , password

方式: 輸入欄位可以利用 `pattern` 屬性搭配[正規表達式 (regular expression)](https://www.fooish.com/javascript/regexp/) 來做表單欄位驗證

功能: 使用者輸入的內容不符合 pattern，在表單送出去之前就會被瀏覽器驗證錯誤而擋下。

```html
<input type="text" pattern="[a-z]{4,8}">

<input type="time" pattern="[0-9]{2}:[0-9]{2}">

<input type="email" pattern=".+@beststartupever.com">
```

### name屬性 `<input name="myfield">`

功能: 用來指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值。

### value屬性 `<input value="我的初始值">`

功能: **指定初始值 (default value)**

### required屬性 `<input required>`

功能: 必填欄位提醒

### readonly屬性 `<input value="" readonly>`

功能: 只能閱讀，可以選取不能編輯

### disabled屬性 `<input disabled>`

功能: 只能閱讀，不可選取不能編輯

### autocomplete 屬性 `<input autocomplete="on">`

功能: **是否啟用瀏覽器自動完成功能，**值有 `on` 和 `off`，預設是 on

### autofocus屬性 `<input autofocus>`

功能: 瀏覽器會自動將畫面聚焦 (focus) 在該欄位上，但要注意，整個頁面所有的表單元件中只能有一個 autofocus 而已

## **多行文字輸入欄位 `<textarea></textarea>`**

- 範例
    
    ```html
    <textarea name="mytext"
              rows="6"
              cols="40"
              required>
    我是...
    多行....
    輸入框....
    </textarea>
    ```
    

### **功能與注意事項**

功能: 建立一個可以輸入多行文字的輸入框 (multi-line textbox)。

1.  **注意:** 如果要在 textarea 中設定預設文字，不是像 \<input\> 一樣用 `value` 屬性喔，是直接將文字放在 `<textarea>內容</textarea>` 標籤之間
2. **注意:** 內容文字的換行是使用一般的文字換行符號 `\n`，不是用 [\<br\>](https://www.fooish.com/html/br-tag.html)

### 屬性(attributes)

### name屬性

功能: 用來指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值。

### rows屬性

功能: 輸入數字，設定輸入框的高度是幾行文字 (lines)，預設是 2

### cols屬性

功能: 輸入數字，設定輸入框的寬度是多少文字 (characters)，預設是 20

### maxlength 屬性

功能: 輸入數字，設定限定輸入的文字長度上限是幾個字

### minlength 屬性

功能: 輸入數字，設定限定輸入的文字長度最少是幾個字

### placeholder屬性

功能: 輸入欄位中的提示訊息

### required屬性

功能: 必填欄位提醒，是一個布林 (boolean) 屬性

### readonly屬性 `<input value="" readonly>`

功能: 只能閱讀，可以選取不能編輯，是一個布林 (boolean) 屬性

### disabled屬性 `<input disabled>`

功能: 只能閱讀，不可選取不能編輯，是一個布林 (boolean) 屬性

## 下拉式選單 `<select></select>` **`<optgroup></optgroup>` `<option></option>`**

功能: 建立下拉式選單 (dropdown menu)，讓使用者可以從一堆選項中選擇出一個或多個選項。

```html
<!-- 下拉式結構範例 外層容器用<select></select>標籤 -->

<select name="catordog">
<!-- 若有分組選項(非必要)<optgroup></optgroup>標籤 -->
  <optgroup label="Cats">
<!-- 選項標籤<option></option>標籤 -->
    <option>Tiger</option>
    <option>Leopard</option>
    <option>Lynx</option>
  </optgroup>
  <optgroup label="Dogs">
    <option>Grey Wolf</option>
    <option>Red Fox</option>
    <option>Fennec</option>
  </optgroup>
</select>
```

### 選單容器屬性 `<select></select>`

- `name`: 聲明欄位名稱
- `disabled`: 將欄位設定為禁用的狀態，是一個布林 (boolean) 屬性
- `required`: 將欄位設定為必填，是一個布林 (boolean) 屬性

### **選單中的選項屬性 `<option></option>`**

- `value`: 指定如果選了該選項，表單要傳送什麼值給遠端伺服器，如果沒設定 value，預設是送 \<option\> 的內容
- `selected`: 設定預先選取此選項，是一個布林屬性
- `label`: 說明選項的含義，有設定時會被瀏覽器顯示為選項內容，通常用來當做簡短版的選項文字
- `disabled`: 將選項設定為不可選的狀態，是一個布林 (boolean) 屬性

### 多選選單的屬性 `multiple` `size=”4”`

功能: multiple 用來設定該選單中的選項可以被多選。

```html
<select name="cars" multiple>
  <option value="volvo">Volvo</option>
  <option value="bmw">BMW</option>
  <option value="saab">Saab</option>
  <option value="benz">Benz</option>
  <option value="audi">Audi</option>
</select>
```

`size` 屬性: 指定一次讓使用者看到幾個選項，預設值是 1；但如果有設定 multiple 時，預設值則是 4。

```html
<select name="cars" multiple size="5">
  <option value="volvo">Volvo</option>
  <option value="bmw">BMW</option>
  <option value="saab">Saab</option>
  <option value="benz">Benz</option>
  <option value="audi">Audi</option>
</select>
```

## **內嵌框架 (Inline Frame) `<iframe></iframe>`**

功能: 用來在一個 HTML 網頁裡面嵌入另外一個 HTML 網頁

[HTML 內嵌框架 Inline Frame - HTML 語法教學 Tutorial](https://www.fooish.com/html/iframe-tag.html)

## BS 表格概觀簡介Overview

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/overview/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/overview/)**

### BS 特性概要

- 若需要重置表單樣式，請參照 [我們的重置表單樣式](https://bootstrap5.hexschool.com/docs/5.1/content/reboot/#forms)
- 表格內的文字可以使用 **行內元素** 對應，排版可以使用 **Flexbox控制**
    - 範例
        
        ```html
        <div class="row g-3 align-items-center">
          <div class="col-auto">
            <label for="inputPassword6" class="col-form-label">Password</label>
          </div>
          <div class="col-auto">
            <input type="password" id="inputPassword6" class="form-control" aria-describedby="passwordHelpInline">
          </div>
          <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
              Must be 8-20 characters long.
            </span>
          </div>
        </div>
        ```
        
- 確保 **type屬性** 正確，因為BS根據不同的type都有作對應樣式，且有助於府器使用增加親和性([可參考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input))
- 由於 Bootstrap 在幾乎所有表單控制 (form control) 應用了 `display: block` 和 `width: 100%`，表單預設會垂直堆疊。可以另外加上其他類別以按表單調整排版。

範例: 

在原表單結構上放入BS屬性

- 步驟1: 確保type屬性與要輸入的屬性內容正確
- 步驟2: 確定 input 與 label 標籤的 id 對應
- 步驟3:依次放入
    - 在`<input>` 標籤內放入 `.form-control`
    - 在`<label></label>` 放入 `.form-label`
    - 在說明標籤上放入 `.form-text`

```html
<div class="demo">
  <form>
    <div class="mb-3">
      <!-- .form-label 放在label標籤  -->
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <!-- .form-control放在input標籤 -->
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
       <!-- .form-text放在說明文字標籤 -->
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <!-- .form-label 放在label標籤  -->
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <!-- .form-control放在input標籤 -->
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3">
         <!-- .form-label 放在label標籤  -->
      <label for="exampleInputTel" class="form-label">Tel</label>
       <!-- .form-control放在input標籤 -->
      <input type="tel" class="form-control" id="exampleInputTel">
    </div>
     <!-- .form-check 放在父層標籤  -->
    <div class="mb-3 form-check">
     <!-- .form-check-input 放在input標籤  -->
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
     <!-- .form-check-label 放在label標籤  -->
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="button" class="btn btn-primary">Submit</button>
    <button class="btn btn-primary">Button Type 的影響</button>
  </form>
</div>
```

### 親和屬性 accessibility  `aria-label=""`    `aria-describedby=""`

**功能**: 能夠讓需要輔具的不便人事(比如視覺障礙)能用輔具（例如螢幕閱讀器）將內容念出

方法: 

- **短說明文字使用`aria-label=""`**: 由於\<input\>表格通常都有使用id與`<label></label>`標籤對應，在input標籤裡放`aria-label`屬性
- **長說明文字使用 `aria-descripedby=""`** : 若是長說明文字，則利用\<input\> 的id和與其對應含有 `.form-text`的標籤，在在input標籤裡放`aria-descriptedby`屬性，後面描述的內容以id對應

範例: 

```html

<!-- 短說明文字 aria-label="描述" -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" aria-label="這是一個棒棒的 checkbox">
  <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
</div>
<!-- 長說明文字 aria-discribedby="id" -->
<label for="inputPassword5">假設這是一個密碼</label>
<input type="text" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
<small id="passwordHelpBlock" class="form-text text-muted">
  你的密碼需要 8 - 20 的字元長度，包含文字、數字，但不能有空白及特殊字元在內。
</small>
```

### 表單文字屬性 `.form-text`

目的: 主要為了親和性，放在對應的說明文字內容（且 id 與 input 屬性的 aria-describedby 進行對應)

範例

```html
<div class="demo">
  <label for="inputPassword5" class="form-label">Password</label>
  <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock">
  <div id="passwordHelpBlock" class="form-text">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
  </div>
</div>
```

### 禁用表格 `disabled`

功能: 禁止其對產生任何互動，不可選取，不可編輯

方法: 在單一標籤比如 input 加上布林屬性 `disabled` 以避免使用者操作並讓它看起來更淡，或在最外層`fieldset`標籤加入，可以進行全表單的disabled

```html
<input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled>
```

### Sass

## **Form controls 表單控制 `.form-control`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/form-control/) 、 [](https://getbootstrap.com/docs/5.1/forms/overview/)[英文](https://getbootstrap.com/docs/5.1/forms/form-control/)**

**功能**: 可以使用BS預設或自定義樣式，套用文本標籤，比如`<input>`、`<textarea></textarea>`

- **範例**
    
    ```html
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    ```
    

### 設定尺寸 `.form-control-{lg, sm}`

功能: 設定文字標籤高度 (注意: 這不是斷點)

```html
<input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" aria-label=".form-control-lg example">
<input class="form-control" type="text" placeholder="Default input" aria-label="default input example">
<input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example">
```

### 禁用 `disabled`

功能: 布林屬性，禁止其對產生任何互動，不可選取，不可編輯，使其外觀呈現灰色，並移除 pointer 事件

```html
<input class="form-control" type="text" placeholder="Disabled input" aria-label="Disabled input example" disabled>
<input class="form-control" type="text" value="Disabled readonly input" aria-label="Disabled input example" disabled readonly>
```

### 僅閱讀 `readonly`  `.form-control-plaintext`

- `**readonly**` 功能: 布林屬性，僅能閱讀的 input 顯示較淡（就像禁用的輸入），但保留標準游標。
    - 範例
        
        ```html
        <input class="form-control" type="text" value="Readonly input here..." aria-label="readonly input example" readonly>
        ```
        
- `**readonly`  `.form-control-plaintext` 搭配，可刪除預設表單樣式，達成純文字效果**

```html
<div class="mb-3 row">
    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
    </div>
  </div>
  <div class="mb-3 row">
    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword">
    </div>
  </div>
```

### 檔案上傳`<input type=”file”>`

範例

```html
<div class="mb-3">
  <label for="formFile" class="form-label">Default file input example</label>
  <input class="form-control" type="file" id="formFile">
</div>
<div class="mb-3">
  <label for="formFileMultiple" class="form-label">Multiple files input example</label>
  <input class="form-control" type="file" id="formFileMultiple" multiple>
</div>
<div class="mb-3">
  <label for="formFileDisabled" class="form-label">Disabled file input example</label>
  <input class="form-control" type="file" id="formFileDisabled" disabled>
</div>
<div class="mb-3">
  <label for="formFileSm" class="form-label">Small file input example</label>
  <input class="form-control form-control-sm" id="formFileSm" type="file">
</div>
<div>
  <label for="formFileLg" class="form-label">Large file input example</label>
  <input class="form-control form-control-lg" id="formFileLg" type="file">
</div>
```

### 顏色 `<input type=”file”>` `.form-control-color`

範例

```html
<label for="exampleColorInput" class="form-label">Color picker</label>
<input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
```

### 資料清單  `<datalist></datalist>`

功能: 創造一組可以在 input 內部被存取 (並自動補齊) 的 `<option>`。

方式:

1. 建立 datalist 結構（包含 datalist 及 option 元素）
2. datalist 補上 id，並與 input list 屬性進行對應

```html
<label for="exampleDataList" class="form-label">Datalist example</label>
<input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search...">
<datalist id="datalistOptions">
  <option value="San Francisco">
  <option value="New York">
  <option value="Seattle">
  <option value="Los Angeles">
  <option value="Chicago">
</datalist>
```

### Sass

## Select 選擇功能表 `<select></select>`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/select/) 、 [](https://getbootstrap.com/docs/5.1/forms/overview/)[英文](https://getbootstrap.com/docs/5.1/forms/select/)**

### 預設樣式 `.form-select`

BS提供的下拉表單預設樣式

```html
<select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

### 設定尺寸 `.form-select-{lg, sm}`

功能: 設定文字標籤高度 (注意: 這不是斷點)

```html
<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>

<select class="form-select form-select-sm" aria-label=".form-select-sm example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

支持`**multiple**`屬性

功能: 可以多選

```html
<select class="form-select" multiple aria-label="multiple select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

**支持 `size` 屬性**

功能: 可以藉此呈現表單想要的列數

```html
<select class="form-select" size="3" aria-label="size 3 select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

### 禁用 `disabled`

功能: 布林屬性，禁止其對產生任何互動，不可選取，不可編輯，使其外觀呈現灰色，並移除 pointer 事件

```html
<select class="form-select" aria-label="Disabled select example" disabled>
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

### Sass

## **Checks and radios 核取方塊和選項按鈕** `<input type=”checkbox, radio”>`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/checks-radios/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/checks-radios/)**

**注意: BS 認定，`<label></label>`與`<input>`為成對元素，因此一定要加id與兩個互相對應，BS樣式才能良好運作。**

## Chechks核取方塊`<input type=”checkbox”>`

### 預設樣式 `.form-check`  `.form-check-input` `.form-check-label`

BS提供的核取方塊預設樣式，注意id要對上，可多選

```html
div class="demo">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
    <label class="form-check-label" for="flexCheckDefault">
      Default checkbox
    </label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" value="" id="練習" checked>
    <label class="form-check-label" for="flexCheckChecked">
      Checked checkbox
    </label>
  </div>
</div>
```

### 預設堆疊

若有複數個核取方塊，預設呈現是垂直排列由上而下

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled>
  <label class="form-check-label" for="defaultCheck2">
    Disabled checkbox
  </label>
</div>
```

### 改成行內  `.form-check` `.form-check-inline`

將預設堆疊改成行內

```html
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">
  <label class="form-check-label" for="inlineCheckbox1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">
  <label class="form-check-label" for="inlineCheckbox2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" disabled>
  <label class="form-check-label" for="inlineCheckbox3">3 (disabled)</label>
</div>
```

### **Indeterminate 狀態未定  `<input>` `.indeterminate`**

功能: 會在和取方塊內放入橫槓效果，通過 JavaScript 手動的設定偽類 (因為沒有適合的 HTML 屬性可以用來指定它)

```html
<div class="demo">
  <div class="form-check">
    <input class="form-check-input indeterminate" type="checkbox" value="" id="flexCheckIndeterminate">
    <label class="form-check-label" for="flexCheckIndeterminate">
      Indeterminate checkbox
    </label>
  </div>
</div>

<!-- 以下JS為加入indeterminate的狀態，需事先加入 -->
<script>
const inputs = document.querySelectorAll('.indeterminate');
for(var i = 0; i < inputs.length; i++) {
  inputs[i].indeterminate = true;
}
</script>
```

### 禁用 `disabled`

功能: 布林屬性，禁止其對產生任何互動，不可選取，不可編輯，使其外觀呈現灰色，並移除 pointer 事件

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" disabled>
  <label class="form-check-label" for="flexCheckDisabled">
    Disabled checkbox
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled>
  <label class="form-check-label" for="flexCheckCheckedDisabled">
    Disabled checked checkbox
  </label>
</div>
```

### Switch 切換開關  `.form-switch`  `role="switch”`

功能: 能使用切換開關的效果，在外觀上在`<input>`加入`.form-switch` ，就有效果，但若要用在輔具或輔助技術，建議在input再加上 role屬性 switch

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
  <label class="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled>
  <label class="form-check-label" for="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckCheckedDisabled" checked disabled>
  <label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
</div>
```

### 沒有標籤的作法 `aria-label`

### 按鈕外型切換按鈕 `<label></label>` `.btn`

功能:使用 `.btn` 取代原 `.form-check-label` 可建立類似button外觀的按鈕，但本質上還是跟button標籤不同，對輔具來說仍是已勾選/未勾選的核取方塊

btn-check的運作機理:利用CSS中 clip屬性會影響到ckeckbox的呈現方式，在利用絕對定位隱藏checkbox

```html
<div class="demo">
  <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off">
  <label class="btn btn-outline-primary" for="btn-check">Single toggle</label>
  <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off">
  <label class="btn btn-outline-primary" for="btn-check-2">Checked</label>
  <input type="checkbox" class="btn-check" id="btn-check-3" autocomplete="off" disabled>
  <label class="btn btn-outline-primary" for="btn-check-3">Disabled</label>
</div>
```

### outline樣式顏色套用 `.btn-outline-{主題顏色}`

功能: 由於套入`.btn` 其框現顏色功能也是支持的

```html
<input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off">
<label class="btn btn-outline-primary" for="btn-check-outlined">Single toggle</label><br>

<input type="checkbox" class="btn-check" id="btn-check-2-outlined" checked autocomplete="off">
<label class="btn btn-outline-secondary" for="btn-check-2-outlined">Checked</label><br>
```

### Sass

## radio**選項按鈕**`<input type=”radio”>`

### 預設樣式 `.form-check`  `.form-check-input` `.form-check-label`

BS提供的核取方塊預設樣式，注意id要對上，另注意同組標籤，name要一致，且只能單選

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
  <label class="form-check-label" for="flexRadioDefault2">
    Default checked radio
  </label>
</div>
```

### 預設堆疊

若有複數個選項按鈕，預設呈現是垂直排列由上而下

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
  <label class="form-check-label" for="exampleRadios2">
    Second default radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled>
  <label class="form-check-label" for="exampleRadios3">
    Disabled radio
  </label>
</div>
```

### 改成行內  `.form-check` `.form-check-inline`

將預設堆疊改成行內

```html
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">1</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">2</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" disabled>
  <label class="form-check-label" for="inlineRadio3">3 (disabled)</label>
</div>
```

### 禁用 `disabled`

功能: 布林屬性，禁止其對產生任何互動，不可選取，不可編輯，使其外觀呈現灰色，並移除 pointer 事件

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" disabled>
  <label class="form-check-label" for="flexRadioDisabled">
    Disabled radio
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked disabled>
  <label class="form-check-label" for="flexRadioCheckedDisabled">
    Disabled checked radio
  </label>
</div>
```

### 沒有標籤的作法 `aria-label`

### 按鈕外型切換按鈕 `<label></label>` `.btn`

功能:使用 `.btn` 取代原 `.form-check-label` 可建立類似button外觀的按鈕，但本質上還是跟button標籤不同，對輔具來說仍是已勾選/未勾選的核取方塊

btn-check的運作機理:利用CSS中 clip屬性會影響到ckeckbox的呈現方式，在利用絕對定位隱藏checkbox

```html
<div class="demo">
  <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" checked>
  <label class="btn btn-outline-secondary" for="option1">Checked</label>

  <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off">
  <label class="btn btn-outline-secondary" for="option2">Radio</label>

  <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" disabled>
  <label class="btn btn-outline-secondary" for="option3">Disabled</label>

  <input type="radio" class="btn-check" name="options" id="option4" autocomplete="off">
  <label class="btn btn-outline-secondary" for="option4">Radio</label>
</div>
```

### outline樣式顏色套用 `.btn-outline-{主題顏色}`

功能: 由於套入`.btn` 其框現顏色功能也是支持的

```html
<input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked>
<label class="btn btn-outline-success" for="success-outlined">Checked success radio</label>

<input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off">
<label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label>
```

### Sass

## Range 範圍 `<input type="range">`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/range/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/range/)**

### 預設樣式 `.form-range`

BS提供的軌道表單預設樣式

```html
<label for="customRange1" class="form-label">Example range</label>
<input type="range" class="form-range" id="customRange1">
```

### 禁用 `disabled`

功能: 布林屬性，禁止其對產生任何互動，不可選取，不可編輯，使其外觀呈現灰色，並移除 pointer 事件

```html
<label for="disabledRange" class="form-label">Disabled range</label>
<input type="range" class="form-range" id="disabledRange" disabled>
```

### 設定最大最小範圍 `min=””  max=””`

功能: 預設值 `min` 和 `max, 0` 和 `100` 的區別，可以為 `min` 和 `max` 屬性賦予新的值

```html
<label for="customRange2" class="form-label">Example range</label>
<input type="range" class="form-range" min="0" max="5" id="customRange2">>
```

### 設定間距範圍steps `step=””`

功能: 預設的情況，範圍輸入會 “讀取” 整數值。可以使用 step 值來改變

```html
<label for="customRange3" class="form-label">Example range</label>
<input type="range" class="form-range" min="0" max="5" step="0.5" id="customRange3">
```

### Sass

## Input 群組 (Input group) `.input-group`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/input-group/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/input-group/)**

功能: 能在\<input\>標籤的type屬性功能，群組化文字、按鈕...等樣式

### 預設樣式 `.input-group`  `<input>` `<textarea></textarea>`

BS群組化範例，在 input 的任一側或兩側放置一個附加元件或按鈕

```html
div class="demo">
  <label for="basic-url" class="form-label">Your vanity URL</label>
  <!-- 用div 將群組包起，加入.input-group類別 -->
  <div class="input-group mb-3">
    <!-- 在文字標籤加入.input-group-text 使之能顯示於input標籤中 -->
    <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
    <!-- input標籤則除了原BS的 .form-control外，則不需另外加類別 -->
    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
  </div>

  <div class="input-group mb-3">
    <span class="input-group-text">$</span>
    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
    <span class="input-group-text">.00</span>
  </div>

  <div class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Username" aria-label="Username">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="Server" aria-label="Server">
  </div>

  <div class="input-group">
    <span class="input-group-text">With textarea</span>
      <!-- textarea標籤也能使用.input-group，則除了原BS的 .form-control外，則不需另外加類別 -->
    <textarea class="form-control" aria-label="With textarea"></textarea>
  </div>
</div>
```

### 換行Wrapping  `flex-wrap: wrap`   `.flex-nowrap`

功能: Input 群組透過預設的 `flex-wrap: wrap` 換行，可以使用 `.flex-nowrap` 禁用它。

```html
<!-- 注意加在父層 -->
<div class="demo">
  <div class="input-group flex-nowrap">
    <span class="input-group-text" id="addon-wrapping">@@@@@@@ @@@@@@</span>
    <input type="text" class="form-control" size="30" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
    <input type="text" class="form-control" size="30" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
    <input type="text" class="form-control" size="30" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
    <input type="text" class="form-control" size="30" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping">
  </div>
```

### 設定尺寸 `.input-group-{lg, sm}`

功能: 調整標籤高度 (注意: 這不是斷點) 裡面的內容將自動調整大小，**但不支援調整 input 群組中單一元素的大小**

```html
<div class="demo">
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
    
  <div class="input-group mb-3">
    <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
  </div>
    
  <div class="input-group input-group-lg">
    <span class="input-group-text" id="inputGroup-sizing-lg">Large</span>
    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
  </div>
</div>
```

### 加入各種元件方式

### 加入核取方塊或選項按鈕 `<input type=”checkbox, radio”>`  `.input-group-text`  `.form-check-input`

功能: 將任何核取方塊和選項按鈕放置在 input group 插件

如果輸入旁邊沒有可見的文字，建議將 `.mt-0` 添加到 `.form-check-input` 中。

```html
<div class="demo">
  <div class="input-group mb-3">
    <!-- 外層div放 input-group-text -->
    <div class="input-group-text">
          <!-- input放 input-check-input -->
          <!-- 若旁邊沒有可見的的文字 加入.mt-0 -->
      <input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input">
    </div>
    <input type="text" class="form-control" aria-label="Text input with checkbox">
  </div>
    
  <div class="input-group">
    <div class="input-group-text">
      <input class="form-check-input mt-0" type="radio" value="" aria-label="Radio button for following text input">
    </div>
    <input type="text" class="form-control" aria-label="Text input with radio button">
  </div>
</div>
```

### 加入 **按鈕 `<button></button>` `.btn`**

可搭配button標籤 (button本身有改變框現顏色功能 `.btn-outline-{主題色}` )

```html
<div class="input-group mb-3">
  <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
  <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
</div>

<div class="input-group mb-3">
  <button class="btn btn-outline-secondary" type="button">Button</button>
  <button class="btn btn-outline-secondary" type="button">Button</button>
  <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons">
</div>

<div class="input-group">
  <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons">
  <button class="btn btn-outline-secondary" type="button">Button</button>
  <button class="btn btn-outline-secondary" type="button">Button</button>
</div>
```

### 加入下拉式選單 按鈕  **`<button></button>` `.dropdown-toggle` `<ul></ul>` `.dropdown-menu` `<li></li>` `.dropdown-item`**

```html
<div class="input-group mb-3">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
  <input type="text" class="form-control" aria-label="Text input with dropdown button">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" aria-label="Text input with dropdown button">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>

<div class="input-group">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action before</a></li>
    <li><a class="dropdown-item" href="#">Another action before</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
  <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
```

### 加入分段 按鈕 **`<button></button>`**  `dropdown-toggle`   ****`dropdown-toggle-split`

```html
<div class="input-group mb-3">
  <button type="button" class="btn btn-outline-secondary">Action</button>
  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
</div>

<div class="input-group">
  <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
  <button type="button" class="btn btn-outline-secondary">Action</button>
  <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>
```

### 加入多個input標籤

功能: 可支援加入多個input標籤

**需注意**: 驗證時只支援1個input標籤

```html
<div class="input-group">
  <span class="input-group-text">First and last name</span>
  <input type="text" aria-label="First name" class="form-control">
  <input type="text" aria-label="Last name" class="form-control">
</div>
```

### 加入多個附加組件

- **能加入多個checkbox或radio  `.input-group-text`**
    - 範例
        
        ```html
        <div class="input-group mb-3">
          <span class="input-group-text">$</span>
          <span class="input-group-text">0.00</span>
          <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
          <span class="input-group-text">$</span>
          <span class="input-group-text">0.00</span>
        </div>
        ```
        
- **也能加入多個按鈕元件 `.btn`**
    - 範例
        
        ```html
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
          <input type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
        </div>
        
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>
        
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons">
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username with two button addons">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        ```
        
- **也能加入多個下拉選單   `.dropdown-menu`   `dropdown-item`**
    - 範例
        
        ```html
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
          <input type="text" class="form-control" aria-label="Text input with dropdown button">
        </div>
        
        <div class="input-group mb-3">
          <input type="text" class="form-control" aria-label="Text input with dropdown button">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </div>
        
        <div class="input-group">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action before</a></li>
            <li><a class="dropdown-item" href="#">Another action before</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
          <input type="text" class="form-control" aria-label="Text input with 2 dropdown buttons">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </div>
        ```
        
- **也能加入多的分段按鈕 `.dropdown-toggle-split`**
    - 範例
        
        ```html
        <div class="input-group mb-3">
          <button type="button" class="btn btn-outline-secondary">Action</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
          <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
        </div>
        
        <div class="input-group">
          <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
          <button type="button" class="btn btn-outline-secondary">Action</button>
          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Separated link</a></li>
          </ul>
        </div>
        ```
        
- **自訂選單`<select></select>`搭配 `.form-select`**
    - 範例
        
        ```html
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
          <select class="form-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        
        <div class="input-group mb-3">
          <select class="form-select" id="inputGroupSelect02">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <label class="input-group-text" for="inputGroupSelect02">Options</label>
        </div>
        
        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" type="button">Button</button>
          <select class="form-select" id="inputGroupSelect03" aria-label="Example select with button addon">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        
        <div class="input-group">
          <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <button class="btn btn-outline-secondary" type="button">Button</button>
        </div>
        ```
        

### 加入自定義表單

### **自定義選單樣式 `.form-select`**

### 自定義檔案上傳 `<input type=”file”> .form-control`

### Sass

## Floating label浮動標籤

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/floating-labels/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/floating-labels/)**

功能: 能夠在輸入格標籤上，做出輸入時以浮動在上方的提示樣式效果

可使用在: 帶有`.form-control` 的 `<input>`以及`<textarea></textarea>`上，或帶有`.form-select` 的`<select></select>`標籤，但select標籤不支援`multiple`以及`size`的運作

### 預設樣式 `.form-floating`

方式: 在一對`<input class="form-control">` 和 `<label>`的父層放`.form-floating`

注意: 

1. 每一個 `<input>` 都需要一個 `placeholder`
2. `<input>` 必須放在`<label>`前面

(帶有 `.form-control` 的`<textarea></textarea>`也能使用)

```html
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
  <label for="floatingInput">Email address</label>
</div>
<div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
  <label for="floatingPassword">Password</label>
```

### 特性介紹

1.  如果已經在input定義 value 顯示文字，則浮動標籤會自動調整至其位置上方
2. **注意:** 不要將 `**.form-floating**`加在有`**.col**`類別的標籤(放在子層ok)，會有問題
3. 驗證表單格式也能運作
    - 範例
        
        ```html
        <form class="form-floating">
          <input type="email" class="form-control is-invalid" id="floatingInputInvalid" placeholder="name@example.com" value="test@example.com">
          <label for="floatingInputInvalid">Invalid input</label>
        </form>
        ```
        
4.  **可以使用在`<textarea></textarea>`; 若要改變欄高，要使用height屬性，不要使用`row`屬性**
    - **範例**
        
        ```html
        <div class="form-floating">
          <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
          <label for="floatingTextarea2">Comments</label>
        </div>
        ```
        
5.  **Select標籤內的使用: 帶有`.form-select` 的`<select></select>`標籤，但select標籤不支援`multiple`以及`size`的運作**
    - 範例
        
        ```html
        <div class="form-floating">
          <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <label for="floatingSelect">Works with selects</label>
        </div>
        ```
        

### Sass

## Validation 驗證

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/validation/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/validation/)**

### 預設樣式

- **運行方式**: BS會查看父層 `.was-validated` 下的 `:invalid`、`:valid` 樣式，且通常應用於 `<form>`。否則，任何沒有值的必填區段在頁面加載時都將顯示為無效。
- **效果:** BS的驗證表單效果，需要搭配JS來驗證，若沒問題會是綠色，有問題會是紅色
- 啟用BS的JS驗證方式:
    1. 表單加入 novalidate 屬性
    2. 表單加入 needs-validation className(名稱可自訂)
    3. 加入 valid-feedback, invalid-feedback 回應結果
    4. 加入 JavaScript 驗證片段程式碼

```html
<div class="demo">
  <!-- 表單加入 novalidate  加入 needs-validation className(名稱可自訂)-->
  <form class="row g-3 needs-validation" novalidate>
    <div class="col-md-4">
      <label for="validationCustom01" class="form-label">First name</label>
      <input type="text" class="form-control" id="validationCustom01" value="Mark" required>
      <!-- 加入 valid-feedback, invalid-feedback 回應結果 -->
      <div class="valid-feedback">
        Looks good!
      </div>
      <div class="invalid-feedback">
        Looks bad!
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustom02" class="form-label">Last name</label>
      <input type="text" class="form-control" id="validationCustom02" value="Otto" required>
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4">
      <label for="validationCustomUsername" class="form-label">Username</label>
      <div class="input-group has-validation">
        <span class="input-group-text" id="inputGroupPrepend">@</span>
        <input type="text" class="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required>
        <div class="invalid-feedback">
          Please choose a username.
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <label for="validationCustom03" class="form-label">City</label>
      <input type="text" class="form-control" id="validationCustom03" required>
      <div class="invalid-feedback">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-3">
      <label for="validationCustom04" class="form-label">State</label>
      <select class="form-select" id="validationCustom04" required>
        <option selected disabled value="">Choose...</option>
        <option>...</option>
      </select>
      <div class="invalid-feedback">
        Please select a valid state.
      </div>
    </div>
    <div class="col-md-3">
      <label for="validationCustom05" class="form-label">Zip</label>
      <input type="text" class="form-control" id="validationCustom05" required>
      <div class="invalid-feedback">
        Please provide a valid zip.
      </div>
    </div>
    <div class="col-12">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
        <label class="form-check-label" for="invalidCheck">
          Agree to terms and conditions
        </label>
        <div class="invalid-feedback">
          You must agree before submitting.
        </div>
      </div>
    </div>
    <div class="col-12">
      <button class="btn btn-primary" type="submit">Submit form</button>
    </div>
  </form>
</div>

<!-- 加入JS -->
<script>
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (function () {
    'use strict';
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()
</script>
```

### 特性介紹

- 功能: 藉由瀏覽器預設的行為或自定義樣式和 JavaScript，可透過 HTML5 表單驗證為您的用戶提供可操作的反饋。
- 運作方式: HTML 表單驗證是透過 CSS 的兩個偽類，`:invalid` 和 `:valid` 來應用的。它適用於 `<input>`，`<select>` 和 `<textarea>` 元素。
- 所有現代瀏覽器都支持 [約束驗證 API](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api) ，一系列用於驗證表單控制元件的 JavaScript 方法。
- 瀏覽器預設樣式範例
    
    ```html
    <div class="demo">
      <form class="row g-3">
        <div class="col-md-4">
          <label for="validationDefault01" class="form-label">First name</label>
          <input type="text" class="form-control" id="validationDefault01" value="Mark" required>
        </div>
        <div class="col-md-4">
          <label for="validationDefault02" class="form-label">Last name</label>
          <input type="text" class="form-control" id="validationDefault02" value="Otto" required>
        </div>
        <div class="col-md-4">
          <label for="validationDefaultUsername" class="form-label">Username</label>
          <div class="input-group">
            <span class="input-group-text" id="inputGroupPrepend2">@</span>
            <input type="text" class="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required>
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationDefault03" class="form-label">City</label>
          <input type="text" class="form-control" id="validationDefault03" required>
        </div>
        <div class="col-md-3">
          <label for="validationDefault04" class="form-label">State</label>
          <select class="form-select" id="validationDefault04" required>
            <option selected disabled value="">Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="validationDefault05" class="form-label">Zip</label>
          <input type="text" class="form-control" id="validationDefault05" required>
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
            <label class="form-check-label" for="invalidCheck2">
              Agree to terms and conditions
            </label>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>
    </div>
    ```
    

### 伺服器端樣式

### **支持的元素** `<input>`，`<select>` 和 `<textarea>` 元素

驗證樣式可用於以下的表單控制元件和組件

- `<input>` 和帶有 `.form-control` 的 `<textarea>` (在 input 群組中最多包含一個 `.form-control`)
- 帶有 `.form-select` 的 `<select>`
- `.form-check`

`.was-validated` 是一個狀態，代表已經驗證過（但驗證狀態還是會依據用戶行為再次調整

```html
<form class="was-validated">
  <div class="mb-3">
    <label for="validationTextarea" class="form-label">Textarea</label>
    <textarea class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required></textarea>
    <div class="invalid-feedback">
      Please enter a message in the textarea.
    </div>
  </div>

  <div class="form-check mb-3">
    <input type="checkbox" class="form-check-input" id="validationFormCheck1" required>
    <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
    <div class="invalid-feedback">Example invalid feedback text</div>
  </div>

  <div class="form-check">
    <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required>
    <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
  </div>
  <div class="form-check mb-3">
    <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required>
    <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
    <div class="invalid-feedback">More example invalid feedback text</div>
  </div>

  <div class="mb-3">
    <select class="form-select" required aria-label="select example">
      <option value="">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <div class="invalid-feedback">Example invalid select feedback</div>
  </div>

  <div class="mb-3">
    <input type="file" class="form-control" aria-label="file example" required>
    <div class="invalid-feedback">Example invalid form file feedback</div>
  </div>

  <div class="mb-3">
    <button class="btn btn-primary" type="submit" disabled>Submit form</button>
  </div>
</form>
```

### **工具提示 `.{valid|invalid}-tooltip`**

功能: 加上工具提示的視覺效果

注意: 確保在父層有加入 `position: relative` 來為工具提示定位

方法: 使用 `.{valid|invalid}-tooltip` 類別來替換 `.{valid|invalid}-feedback`

```html
<form class="row g-3 needs-validation" novalidate>
  <div class="col-md-4 position-relative">
    <label for="validationTooltip01" class="form-label">First name</label>
    <input type="text" class="form-control" id="validationTooltip01" value="Mark" required>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>
  <div class="col-md-4 position-relative">
    <label for="validationTooltip02" class="form-label">Last name</label>
    <input type="text" class="form-control" id="validationTooltip02" value="Otto" required>
    <div class="valid-tooltip">
      Looks good!
    </div>
  </div>
  <div class="col-md-4 position-relative">
    <label for="validationTooltipUsername" class="form-label">Username</label>
    <div class="input-group has-validation">
      <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
      <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required>
      <div class="invalid-tooltip">
        Please choose a unique and valid username.
      </div>
    </div>
  </div>
  <div class="col-md-6 position-relative">
    <label for="validationTooltip03" class="form-label">City</label>
    <input type="text" class="form-control" id="validationTooltip03" required>
    <div class="invalid-tooltip">
      Please provide a valid city.
    </div>
  </div>
  <div class="col-md-3 position-relative">
    <label for="validationTooltip04" class="form-label">State</label>
    <select class="form-select" id="validationTooltip04" required>
      <option selected disabled value="">Choose...</option>
      <option>...</option>
    </select>
    <div class="invalid-tooltip">
      Please select a valid state.
    </div>
  </div>
  <div class="col-md-3 position-relative">
    <label for="validationTooltip05" class="form-label">Zip</label>
    <input type="text" class="form-control" id="validationTooltip05" required>
    <div class="invalid-tooltip">
      Please provide a valid zip.
    </div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```

### Sass

## Layout 排版

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/forms/layout/) 、 [英文](https://getbootstrap.com/docs/5.1/forms/layout/)**

**表單預設會 垂直堆疊**，由於 Bootstrap 在幾乎所有表單控制 (form control) 應用了 `**display: block**` 和 `**width: 100%**`，表單預設會垂直堆疊。

### 主要有3種方式 `格線系統` `通用Margin` `flexbox`

### 格線系統 row col gutter

透過加入 [gutter 調整類別](https://bootstrap5.hexschool.com/docs/5.1/layout/gutters/) 可以控制包括行內、區塊方向的 gutter 寬度。**也需要 `$enable-grid-classes` Sass 變數來啟用 (預設為啟用)**

注意: 通常混用時，表單放在格線系統的內層，不要放同層會有問題

範例

```html
<div class="row g-3">
  <div class="col">
    <input type="text" class="form-control" placeholder="First name" aria-label="First name">
  </div>
  <div class="col">
    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
  </div>
</div>
```

### 可以啟用網格Grid達成更複雜的排版

說明: Bootstrap 的網格 (Grid) 類別可以建立更複雜的表單。將它們用於需要多個欄位、不同寬度以及額外對齊選項的表單排版。**需要 `$enable-grid-classes` Sass 變數來啟用 (預設為啟用)**

```html
<form class="row g-3">
  <div class="col-md-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Password</label>
    <input type="password" class="form-control" id="inputPassword4">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" id="inputCity">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">State</label>
    <select id="inputState" class="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div class="col-md-2">
    <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" id="inputZip">
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck">
      <label class="form-check-label" for="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
```

### 通用類別margin

說明 使用margin, padding等

建議: `margin-bottom` 通用類別，並在整個表單使用單一方向推擠以符合一致性。

```html
<div class="mb-3">
  <label for="formGroupExampleInput" class="form-label">Example label</label>
  <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
</div>
<div class="mb-3">
  <label for="formGroupExampleInput2" class="form-label">Another label</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder">
</div>
```

### 使用flexbox排版

可以使用flexbox例如`.align-items-center` 將表單元素對齊至中間，使 `.form-checkbox` 正確的對齊。

```html
<form class="row row-cols-lg-auto g-3 align-items-center">
  <div class="col-12">
    <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
    <div class="input-group">
      <div class="input-group-text">@</div>
      <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username">
    </div>
  </div>

  <div class="col-12">
    <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
    <select class="form-select" id="inlineFormSelectPref">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>

  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="inlineFormCheck">
      <label class="form-check-label" for="inlineFormCheck">
        Remember me
      </label>
    </div>
  </div>

  <div class="col-12">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```

### 水平表單  `.row`   `.col-form-label`

- **說明: 由於本身BS預設是 `display: block` 會垂直堆疊，可透過將 `.row` 類別加入表單群組來建立使用網格系統的水平表單，在 `<label>` 添加 `.col-form-label` ，使它們與相關的表單控制垂直置中**
- **可指定寬度: 並使用 `.col-*-*` 類別來指定標籤和表單控制 (Form controls) 的寬度，若不加的話，除了對齊問題外，還有字體的大小可能不同**

```html
<div class="demo">
  <form>
    <div class="row mb-3">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3">
      </div>
    </div>
    <div class="row mb-3">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3">
      </div>
    </div>
    <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
      <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
        <label class="form-check-label" for="gridRadios1">
        First radio
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
        <label class="form-check-label" for="gridRadios2">
        Second radio
        </label>
      </div>
      <div class="form-check disabled">
        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
        <label class="form-check-label" for="gridRadios3">
        Third disabled radio
        </label>
      </div>
      </div>
    </fieldset>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1">
        <label class="form-check-label" for="gridCheck1">
        Example checkbox
        </label>
      </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Sign in</button>
  </form>
</div>
```

### 控制尺寸方式

### **水平表單標籤尺寸 `.col-form-label-{ sm, lg }`**

確保有在 `<label>` 或是 `<legend>` 使用

範例

```html
<div class="row mb-3">
  <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
  <div class="col-sm-10">
    <input type="email" class="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm">
  </div>
</div>
<div class="row mb-3">
  <label for="colFormLabel" class="col-sm-2 col-form-label">Email</label>
  <div class="col-sm-10">
    <input type="email" class="form-control" id="colFormLabel" placeholder="col-form-label">
  </div>
</div>
<div class="row">
  <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Email</label>
  <div class="col-sm-10">
    <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="col-form-label-lg">
  </div>
</div>
```

### 欄尺寸控制 `.row` `.col`

像是 `.col-sm-7` 這種指定的欄類別，而其餘剩下的 `.col` 則會平均的分配剩下寬度。

```html
<div class="row g-3">
  <div class="col-sm-7">
    <input type="text" class="form-control" placeholder="City" aria-label="City">
  </div>
  <div class="col-sm">
    <input type="text" class="form-control" placeholder="State" aria-label="State">
  </div>
  <div class="col-sm">
    <input type="text" class="form-control" placeholder="Zip" aria-label="Zip">
  </div>
</div>
```

### 自動調整尺寸 `.col-auto`

並將 `.col` 改為 `.col-auto` 來讓每一欄只會占用它所需的空間。

```html
<form class="row gy-2 gx-3 align-items-center">
  <div class="col-auto">
    <label class="visually-hidden" for="autoSizingInput">Name</label>
    <input type="text" class="form-control" id="autoSizingInput" placeholder="Jane Doe">
  </div>
  <div class="col-auto">
    <label class="visually-hidden" for="autoSizingInputGroup">Username</label>
    <div class="input-group">
      <div class="input-group-text">@</div>
      <input type="text" class="form-control" id="autoSizingInputGroup" placeholder="Username">
    </div>
  </div>
  <div class="col-auto">
    <label class="visually-hidden" for="autoSizingSelect">Preference</label>
    <select class="form-select" id="autoSizingSelect">
      <option selected>Choose...</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div class="col-auto">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="autoSizingCheck">
      <label class="form-check-label" for="autoSizingCheck">
        Remember me
      </label>
    </div>
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```

# Utilities 通用類別

- Utilities 通用類別，此為BS5中的通用類別，若熟悉Saas可允許擴充，其可針對元件部份提供微調修改，提供元件更符合個人開發需求
- helpers工具， 此為單一class屬性，其內容不可再自行擴充，皆為預設內容，但也同通用類別部份可以提供已設定好的套件方便使用者使用

## API

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/api/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/api/)**

## Background 背景 `.bg-{主題顏色}`  `.bg-gradient`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/background/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/background/)**

### 背景顏色 `.bg-{主題顏色}`

- **BS主色 藍色 `.bg-primary`**
    
    ```html
    <div class="p-3 mb-2 bg-primary text-white">.bg-primary</div>
    ```
    
- **深灰 `.bg-secondary`**
    
    ```html
    <div class="p-3 mb-2 bg-secondary text-white">.bg-secondary</div>
    ```
    
- **綠色 `.bg-success`**
    
    ```html
    <div class="p-3 mb-2 bg-success text-white">.bg-success</div>
    ```
    
- **紅色 `.bg-danger`**
    
    ```html
    <div class="p-3 mb-2 bg-danger text-white">.bg-danger</div>
    ```
    
- **黃色 `.bg-warning`**
    
    ```html
    <div class="p-3 mb-2 bg-warning text-dark">.bg-warning</div>
    ```
    
- **淡藍色 `.bg-info`**
    
    ```html
    <div class="p-3 mb-2 bg-info text-dark">.bg-info</div>
    ```
    
- **淺灰色 `.bg-light`**
    
    ```html
    <div class="p-3 mb-2 bg-light text-dark">.bg-light</div>
    ```
    
- **黑色 `.bg-dark`**
    
    ```html
    <div class="p-3 mb-2 bg-dark text-white">.bg-dark</div>
    ```
    
- **預設白 `.bg-body`**
    
    ```html
    <div class="p-3 mb-2 bg-body text-dark">.bg-body</div>
    ```
    
- **白色 `.bg-white`**
    
    ```html
    <div class="p-3 mb-2 bg-white text-dark">.bg-white</div>
    ```
    
- **透明 `.bg-transparent`**
    
    ```html
    <div class="p-3 mb-2 bg-transparent text-dark">.bg-transparent</div>
    ```
    

### 背景漸層色 `.bg-gradient`

可加上 .bg-gradient 套用漸層色。**注意：此功能預設不會開啟，需要調整Sass變數才能啟用。**

**注意: 若開啟漸層色，除了bg，其他在同層的所有元件其同名顏色都會附加漸層效果**

```html
<div class="demo">
  <div class="p-3 mb-2 bg-primary bg-gradient text-white">.bg-primary</div>
  <div class="p-3 mb-2 bg-secondary bg-gradient text-white">.bg-secondary</div>
</div>
```

## Borders 邊框 `.border` `.border-{sides, 0, 主題色, 寬度}`  `rounded-{sides, 0-3}`

功能: 可以使用class類別就迅速設定元素的 borders 或border-radius 

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/borders/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/borders/)**

### 增加 `.border` `.border-{sides}`

```html
<span class="border"></span>
<span class="border-top"></span>
<span class="border-end"></span>
<span class="border-bottom"></span>
<span class="border-start"></span>
```

### 減少 `.border-0` `.border-{sides}-0`

```html
<span class="border-0"></span>
<span class="border-top-0"></span>
<span class="border-end-0"></span>
<span class="border-bottom-0"></span>
<span class="border-start-0"></span>
```

### 顏色 `.border-{主題顏色}`

```html
<span class="border border-primary"></span>
<span class="border border-secondary"></span>
<span class="border border-success"></span>
<span class="border border-danger"></span>
<span class="border border-warning"></span>
<span class="border border-info"></span>
<span class="border border-light"></span>
<span class="border border-dark"></span>
<span class="border border-white"></span>
```

### 寬度 `.border-{1-5}`

```html
<span class="border border-1"></span>
<span class="border border-2"></span>
<span class="border border-3"></span>
<span class="border border-4"></span>
<span class="border border-5"></span>
```

### 圓角 `.round-{sides}`

原**Border-radius的功能**

(說明: .rounded-circle 其設定的css樣式是border-raduis:50% ,若遇到矩形則會變成橢圓形)

(說明: .round-pill 其設定的css樣式是border-radius:50rem，遠大於50% 會變成藥丸形狀)

```html
<img src="..." class="rounded" alt="...">
<img src="..." class="rounded-top" alt="...">
<img src="..." class="rounded-end" alt="...">
<img src="..." class="rounded-bottom" alt="...">
<img src="..." class="rounded-start" alt="...">
<img src="..." class="rounded-circle" alt="...">
<img src="..." class="rounded-pill" alt="...">
```

### 圓角尺寸 `.round-{0-3}`

使用縮放的 class 將圓角放大或縮小。尺寸的範圍為 `0` 到 `3`，可以透過通用類別的 API 進行配置。

```html
<img src="..." class="rounded" alt="...">
<img src="..." class="rounded-top" alt="...">
<img src="..." class="rounded-end" alt="...">
<img src="..." class="rounded-bottom" alt="...">
<img src="..." class="rounded-start" alt="...">
<img src="..." class="rounded-circle" alt="...">
<img src="..." class="rounded-pill" alt="...">
```

### Sass

## Colors 顏色 **`.text-{ 主題色彩 }`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/colors/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/colors/)**

### 文字顏色Colors **`.text-{ 主題色彩 }`**

使用 color 通用類別為文字上色，但沒有hover效果

**注意**: 如果要為連結上色，你可以使用 `[.link-*` helper classes](https://bootstrap5.hexschool.com/docs/5.1/helpers/colored-links/)。它們具有 `:hover` and `:focus` 的狀態。

```html
<p class="text-primary">.text-primary</p>
<p class="text-secondary">.text-secondary</p>
<p class="text-success">.text-success</p>
<p class="text-danger">.text-danger</p>
<p class="text-warning bg-dark">.text-warning</p>
<p class="text-info bg-dark">.text-info</p>
<p class="text-light bg-dark">.text-light</p>
<p class="text-dark">.text-dark</p>
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-white bg-dark">.text-white</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
```

## Display `.d-{value}  .d-{breakpoint}-{value}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/display/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/display/)**

### 使用方式

*value* 為以下其中一個：([功能介紹](https://www.w3schools.com/cssref/pr_class_display.asp) [操作範例](https://www.w3schools.com/cssref/playit.asp?filename=playcss_display&preval=contents)) 詳答 [參考1](https://www.w3.org/TR/CSS21/visuren.html) [參考2](https://www.w3.org/TR/CSS21/visudet.html)

- `none`  不顯示，可用來隱藏元素
- `inline`  行內元素 (不能設定margin)
- `inline-block`   可以設定margin
- `block` 區塊元素
- `grid`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

```html
<div class="d-inline p-2 bg-primary text-white">d-inline</div>
<div class="d-inline p-2 bg-dark text-white">d-inline</div>

<!--隱藏元素響應式做法-->
<div class="d-lg-none">hide on lg and wider screens</div>
<div class="d-none d-lg-block">hide on screens smaller than lg</div>
```

### Flex常見用法

功能: 原來元素預設都是以`.d-block` 或是`.d-inline`呈現，若要用flex，則比需於父層加入`.d-flex`

```html
<p><b>水平等距排列</b></p>
<div class="demo">
  <div class="d-flex justify-content-evenly">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box">3</div>
  </div>
</div>

<p><b>兩左一右</b></p>
<div class="demo">
  <div class="d-flex">
    <div class="box">1</div>
    <div class="box">2</div>
    <div class="box ms-auto">3</div>
  </div>
</div>
```

### 運用在列印的display

- `.d-print-none`
- `.d-print-inline`
- `.d-print-inline-block`
- `.d-print-block`
- `.d-print-grid`
- `.d-print-table`
- `.d-print-table-row`
- `.d-print-table-cell`
- `.d-print-flex`
- `.d-print-inline-flex`

## Flex

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/flex/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/flex/)**

### HTML Flex圖

[flex檢索.jpg](https://drive.google.com/file/d/11HeEtP8Iu53KU1wiCpRUI_dqZ58orJPe/view?usp=drivesdk)

圖片說明: **左邊都是外層屬性 ; 右邊都是內層屬性**

- 主軸: 預設由左(起點)到右(終點)
    
    使用 justify-content的方式調整主軸的對齊
    
- 交錯軸: 垂直相交於主軸，預設由上(起點)到下(終點)
    
    使用align-items的方式調整交錯軸的對齊
    

### 啟用flex   `.d-flex`   `d-inline-flex`

flex 包含行內及區塊兩種（大多實戰以區塊為主，行內則較少使用）

1. 第一種 `.d-flex` 與`.d-block`有點像，都是加入較寬的範圍 (較常用)

```html
<div class="d-flex p-2 box">I'm a flexbox container!</div>
```

1. 第二種 `d-inline-flex` 將其變成行間元素

```html
<div class="d-inline-flex p-2 box">I'm an inline flexbox container!</div>
```

### 改變軸方向性 `flex-direction`

- **水平調整 `.flex-row`   `.flex-row-reverse`**
    
    `.flex-row` 來設定水平的方向(瀏覽器預設值)，或是使用 `.flex-row-reverse` 來作水平方向的反轉。
    
    ```html
    <div class="d-flex flex-row bd-highlight mb-3">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div>
    <div class="d-flex flex-row-reverse bd-highlight">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div>
    ```
    
- **垂直調整 `.flex-column`  `.flex-column-reverse`**
    
    使用 `.flex-column` 設置垂直方向，或者使用 `.flex-column-reverse` 作垂直方向的反轉。
    
    ```html
    <div class="d-flex flex-column bd-highlight mb-3">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div>
    <div class="d-flex flex-column-reverse bd-highlight">
      <div class="p-2 bd-highlight">Flex item 1</div>
      <div class="p-2 bd-highlight">Flex item 2</div>
      <div class="p-2 bd-highlight">Flex item 3</div>
    </div>
    ```
    
- **響應式變化** `**.flex-{breakpoints}-{row, column}**`
    
    ```html
    .flex-row
    .flex-row-reverse
    .flex-column
    .flex-column-reverse
    .flex-sm-row
    .flex-sm-row-reverse
    .flex-sm-column
    .flex-sm-column-reverse
    .flex-md-row
    .flex-md-row-reverse
    .flex-md-column
    .flex-md-column-reverse
    .flex-lg-row
    .flex-lg-row-reverse
    .flex-lg-column
    .flex-lg-column-reverse
    .flex-xl-row
    .flex-xl-row-reverse
    .flex-xl-column
    .flex-xl-column-reverse
    .flex-xxl-row
    .flex-xxl-row-reverse
    .flex-xxl-column
    .flex-xxl-column-reverse
    ```
    

### 主軸多項調整 Justify content `.justify-content-{sides}`

**功能: 針對主軸 多個元素 做水平方向的排列 (**如果 `flex-direction: column` 則為 y 軸**)**

**注意: 放在父層**

### 響應式 `.justify-content-{breakpoints}-{sides}`

```html
<div class="d-flex justify-content-start">...</div>
<div class="d-flex justify-content-end">...</div>
<div class="d-flex justify-content-center">...</div>
<div class="d-flex justify-content-between">...</div>
<div class="d-flex justify-content-around">...</div>
<div class="d-flex justify-content-evenly">...</div>
```

```html
.justify-content-start
.justify-content-end
.justify-content-center
.justify-content-between
.justify-content-around
.justify-content-evenly
.justify-content-sm-start
.justify-content-sm-end
.justify-content-sm-center
.justify-content-sm-between...
```

### 交錯軸多項調整 align items  `.align-items-{sides}`

**功能: 針對交錯軸 多個元素 做垂直方向的排列 (**如果 `flex-direction: column` 則為 x軸**)**

**注意: 放在父層**

### 響應式 `.align-items-{breakpoints}-{sides}`

```html
<div class="d-flex align-items-start">...</div>
<div class="d-flex align-items-end">...</div>
<div class="d-flex align-items-center">...</div>
<div class="d-flex align-items-baseline">...</div>
<div class="d-flex align-items-stretch">...</div>
```

```html
.align-items-start
.align-items-end
.align-items-center
.align-items-baseline
.align-items-stretch
.align-items-sm-start
.align-items-sm-end
.align-items-sm-center
.align-items-sm-baseline
```

### 交錯軸單項調整 align self  `.align-self-{sides}`

**功能: 針對交錯軸 單個元素 做垂直方向的排列 (**如果 `flex-direction: column` 則為 x軸**)**

**注意: 放在子層**

### 響應式 `.align-self-{breakpoints}-{sides}`

```html
<div class="align-self-start">Aligned flex item</div>
<div class="align-self-end">Aligned flex item</div>
<div class="align-self-center">Aligned flex item</div>
<div class="align-self-baseline">Aligned flex item</div>
<div class="align-self-stretch">Aligned flex item</div>
```

```html
.align-self-start
.align-self-end
.align-self-center
.align-self-baseline
.align-self-stretch
.align-self-sm-start
.align-self-sm-end
.align-self-sm-center
.align-self-sm-baseline
.align-self-sm-stretch
```

### 調整多行內容 align content `.align-content-{sides}`

**功能: 針對橫軸 多行多個元素 做橫軸排列**

**注意: 此特性對於單行的 Flex 項目沒有作用。**

### 響應式 `.align-content-{breakpoints}-{sides}`

```html
<div class="d-flex align-content-start flex-wrap">...</div>
<div class="d-flex align-content-end flex-wrap">...</div>
<div class="d-flex align-content-center flex-wrap">...</div>
<div class="d-flex align-content-between flex-wrap">...</div>
<div class="d-flex align-content-around flex-wrap">...</div>
<div class="d-flex align-content-stretch flex-wrap">...</div>
```

```html
.align-content-start
.align-content-end
.align-content-center
.align-content-around
.align-content-stretch
.align-content-sm-start
.align-content-sm-end
.align-content-sm-center
.align-content-sm-around
.align-content-sm-stretch
```

### 填滿效果 fill `.flex-fill`

功能: 寬度與內容相等，同時佔用所有可用的水平空間。

### 響應式 `.flex-{breakpoints}-fill`

```html
<div class="d-flex bd-highlight">
  <div class="p-2 flex-fill bd-highlight">Flex item with a lot of content</div>
  <div class="p-2 flex-fill bd-highlight">Flex item</div>
  <div class="p-2 flex-fill bd-highlight">Flex item</div>
</div>
```

### 伸縮值 `.flex-grow-{0|1}` `.flex-shrink-{0|1}`

### 放大 `.flex-grow-{0|1}`

功能: 彈性增長、填充可用空間，1為開啟 0為關閉

```html
<div class="d-flex bd-highlight">
  <div class="p-2 flex-grow-1 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Third flex item</div>
</div>
```

### 縮小 `.flex-shrink-{0|1}`

第二個 flex 項目的文字內容會被強制換行，”收縮” 以允許另一個更有空間 1為開啟0為關閉

```html
<div class="d-flex bd-highlight">
  <div class="p-2 w-100 bd-highlight">Flex item</div>
  <div class="p-2 flex-shrink-1 bd-highlight">Flex item</div>
</div>
```

### 響應式 `.flex-{grow|shrink}-{0|1}`

### 混用Spacing Margin `.m-auto`

使用 margin auto 推移區塊

```html
<div class="d-flex bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
</div>

<div class="d-flex bd-highlight mb-3">
  <div class="me-auto p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
</div>

<div class="d-flex bd-highlight mb-3">
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="p-2 bd-highlight">Flex item</div>
  <div class="ms-auto p-2 bd-highlight">Flex item</div>
</div>
```

### 換行Wrap  `.flex-wrap`  `.flex-nowrap`  `.flex-wrap-reverse`

- `**.flex-wrap` 系統預設，自動換行**
- `**.flex-nowrap` 完全不換行**
- `**.flex-wrap-reverse` 反向換行**

### 響應式 `**.flex-{breakpoints}-{wrap|nowrap}**`

```html
<div class="demo">
  <div class="d-flex flex-wrap box">
    <div class="p-2 box">Flex item 1</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
    <div class="p-2 box">Flex item</div>
  </div>
</div>
```

### 排序order `.order-{0-5}`

### 響應式 `**.order-{breakpoints}-{0-5}**`

```html
<div class="d-flex flex-nowrap bd-highlight">
  <div class="order-3 p-2 bd-highlight">First flex item</div>
  <div class="order-2 p-2 bd-highlight">Second flex item</div>
  <div class="order-1 p-2 bd-highlight">Third flex item</div>
</div>
```

## Float 浮動

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/float/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/float/)**

功能: 向左、向右或禁用浮動。並包含了 `!important` 以避免權重問題。

請注意: 記得在在父層加上 `**.clearfix`** 

### 響應式 `**.float-{breakpoints}-{sides}**`

```html
<p class="small"><b>加上.clearfix，若不加br，才會正常</b></p>
<div class="demo clearfix">
  <div class="float-start">Float start on all viewport sizes</div>
  <!-- <br> -->
  <div class="float-end">Float end on all viewport sizes</div>
  <!-- <br> -->
  <div class="float-none">Don't float on all viewport sizes</div>
</div>
```

```html
<div class="float-start">Float start on all viewport sizes</div><br>
<div class="float-end">Float end on all viewport sizes</div><br>
<div class="float-none">Don't float on all viewport sizes</div>
```

### 重要範例: 文繞圖

注意: float放在**圖片**裡

```html
<div class="demo">
  <p>
    <img src="https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60" 
    class="float-start me-3 mb-3" alt="">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ut vitae eaque ipsa porro corporis ipsam in reiciendis, culpa repudiandae delectus natus incidunt. Doloremque rem culpa fugiat veritatis cumque quam.
    Atque minima excepturi nesciunt magni itaque nihil facere commodi, deleniti numquam dolore, doloremque modi quibusdam iure nobis sed exercitationem vel, eos suscipit quam! Totam sint quae, officiis sit harum modi.
    Vero ipsum, tempore unde nam deleniti laboriosam accusantium aliquid eos minima dicta id, aperiam reiciendis maiores porro quis obcaecati! Quasi quae, doloremque amet molestias rem sit ipsam necessitatibus consequatur id.</p>
</div>
<div class="demo">
  <p>
    <img src="https://images.unsplash.com/photo-1630343710506-89f8b9f21d31?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60" 
    class="float-end ms-3 mb-3" alt="">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ut vitae eaque ipsa porro corporis ipsam in reiciendis, culpa repudiandae delectus natus incidunt. Doloremque rem culpa fugiat veritatis cumque quam.
    Atque minima excepturi nesciunt magni itaque nihil facere commodi, deleniti numquam dolore, doloremque modi quibusdam iure nobis sed exercitationem vel, eos suscipit quam! Totam sint quae, officiis sit harum modi.
    Vero ipsum, tempore unde nam deleniti laboriosam accusantium aliquid eos minima dicta id, aperiam reiciendis maiores porro quis obcaecati! Quasi quae, doloremque amet molestias rem sit ipsam necessitatibus consequatur id.</p>
</div>

<h4>清除浮動</h4>
<p class="small">若沒加上.clearfix，元素會塌掉，為以下元素套用 clearfix</p>

<div class="demo clearfix">
  <div class="box float-start"></div>
  <div class="box float-end"></div>
</div>
```

## Interactions 互動 (針對滑鼠互動)

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/interactions/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/interactions/)**

功能: 可改變使用者如何與網頁內容互動的方式，比如`<a></a>`標籤

### 文字選擇  `.user-select-{none, auto, all}`

改變內容被選取的方式

```html
<p class="user-select-all">當使用者點選時，這個段落將會被全選。</p>
<p class="user-select-auto">這個段落具有預設的選取行為。</p>
<p class="user-select-none">當使用者點選的時候，此段落將不會被選取</p>
```

### 滑鼠互動  `.pe-{none, auto}`

Bootstrap 提供 `.pe-none` 與 `.pe-auto` (預設行為)類別，以移除、還原滑鼠的互動性。(缺點要移除鍵盤端的還要添加設置`tabindex="-1"`  `aria-disabled="true"`)

建議更好作法: 

1.  對於表單控制元件，添加 `disabled` HTML 屬性
2.  對於連結，移除 `href` 屬性，使其成為非交互式的錨點或是 placeholder 連結

```html
<p><a href="#" class="pe-none" tabindex="-1" aria-disabled="true">這個連結</a> 不可被點選</p>
<p><a href="#" class="pe-auto">這個連結</a> 可以被點選 (此為預設行為).</p>
<p class="pe-none"><a href="#" tabindex="-1" aria-disabled="true">
這個連結</a> 無法被點選，因為其 <code>pointer-events</code> 屬性繼承自父層。
然而 <a href="#" class="pe-auto">這個連結</a> 具有 <code>pe-auto</code> 類別，因此可以被點選。</p>
```

### Sass

## Opacity 透明度  `.opacity-{25, 50, 75, 100}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/opacity/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/opacity/)**

功能: 設置元素的不透明度，其中 `1` 一點都不透明，`.5` 表示 50% 可見，`0` 表示完全透明。

```html
<div class="opacity-100">...</div>
<div class="opacity-75">...</div>
<div class="opacity-50">...</div>
<div class="opacity-25">...</div>
```

## Overflow 溢出 `.overflow-{auto, hidden, visible, scroll}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/overflow/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/overflow/)**

使用四個預設的值與類別，即時的調整 `overflow` 屬性。預設情況下這些類別並非響應式的

### 介紹&實戰作法

overflow是原CSS的屬性

- `.overflow-auto`  超出的字體會變成卷軸，垂直滾動
- `.overflow-hidden` 超出的字會隱藏
- `.overflow-visible` 可以看到超出的字
- `.overflow-scroll` 超出的字會變成卷軸(水平及垂直)
    
    ```html
    <div class="demo d-flex">
      <div
        class="overflow-auto box">
        這個範例在本身就具有寬高的元素上設定
        <code>.overflow-auto</code>。透過設計，此內容將會垂直滾動。
      </div>
      <div
        class="overflow-hidden box">
        這個範例在本身就具有寬高的元素上設定 <code>.overflow-hidden</code>
      </div>
      <div
        class="overflow-visible box">
        這個範例在本身就具有寬高的元素上設定 <code>.overflow-visible</code>。
      </div>
      <div
        class="overflow-scroll box">
        這個範例在本身就具有寬高的元素上設定 <code>.overflow-scroll</code>。
      </div>
    </div>
    ```
    
    ### 實戰技巧
    
    使用 overflow-auto 製作水平滾動項目，常用來製作選單，若不用`.overflow-auto`下方選單切換成行動版會突出表單
    
    ```html
    <p>使用<code>.overflow-auto</code>效果</p>
    <p>在行動版上蠻受歡的使用方式</p>
    <div class="demo">
      <ul class="list-unstyled overflow-auto d-flex justify-content-between flex-nowrap">
        <li class="p-3 text-nowrap"><a href="#">Content</a></li>
        <li class="p-3 text-nowrap"><a href="#">Grid System</a></li>
        <li class="p-3 text-nowrap"><a href="#">Utilities</a></li>
        <li class="p-3 text-nowrap"><a href="#">Helper</a></li>
        <li class="p-3 text-nowrap"><a href="#">Forms</a></li>
        <li class="p-3 text-nowrap"><a href="#">Components</a></li>
      </ul>
    </div>
    ```
    

### Sass

## Position 位置

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/position/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/position/)**

### 定位值 `.position-{static, relative, absolute, fixed, sticky}`

最常使用 絕對定位&相對定位

```html
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>
```

### 排列元素 `.{top, start, bottom, end}-{0, 50, 100}`

你可以為元素加上 `.position-absolute`, `.position-relative` 改變定位形式，同時可透過 \{property\}-\{position\} 的形式加上定位

```html
<!-- 你可以為元素加上 position-absolute, position-relative 改變定位形式，同時可透過 {property}-{position} 的形式加上定位</p> -->
<!-- 記得使用絕對定位時，父層要加上相對定位 -->
<!--另外可以直接以<code>.{方向}-{數值}表示位置< -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box bottom-0 end-0"></div>
  </div>
</div>
<!-- 若在方向上加上100%，就會被推移出去 -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-100"></div>
  </div>
</div>
<!-- 中間不是真的中間，由於是從指定方向開始算，起始點未含物體本身寬度</p> -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50"></div>
  </div>
</div>
```

### 元素置中 `.translate-middle-{x, y}`

元素位置起使推移點會在元素中央位置，可在後方加入方向

```html
<p>元素置中<code>.translate-middle</code> </p>
<p>注意:此方式是轉變起始軸中心，因此還是要加.start-50 top-50</p>
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50 top-50 translate-middle"></div>
  </div>
</div>
<p>元素置中<code>.translate-middle-{方向x或y}</code> </p>
<p>注意:此方式是轉變起始軸中心，因此若只改變水平軸可加x 加.start-50 </p>
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50 translate-middle-x"></div>
  </div>
</div>
```

### 固定元素位置 `.fix-{top, bottom}`

**將元素固定在螢幕的頂端 `.fixed-top`  將元素固定在螢幕的底部 `.fixed-bottom`**

```html
<h6>將元素固定在螢幕的頂端 <code>.fixed-top</code></h6>

<div class="demo">
  <nav class="navbar navbar-light bg-light fixed-top mt-5">
    <div class="container-fluid">
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
    </div>
  </nav>
</div>

<h2>Fixed bottom</h2>
<h6>將元素固定在螢幕的底部 <code>.fixed-bottom</code></h6>

<div class="demo">
  <nav class="navbar navbar-light bg-light fixed-bottom ">
    <div class="container-fluid">
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
    </div>
  </nav>
</div>
```

### Sticky top  `.sticky-top`

功能: 滑動到該位置觸發，滑過後黏在頂上，黏到到div區快結束，不會在繼續下去

技巧: 可用`style`屬性，可以改變高度

注意: **`.sticky-top` 通用類別使用 CSS 的 `position: sticky`，並非所有瀏覽器都完全支持**

### 響應式 sticky top `.sticky-{breakpoints}-top`

### **`.sticky-top` 通用類別也支持響應式變化**

- `sticky-sm-top`
- `sticky-md-top`
- `sticky-lg-top`
- `sticky-xl-top`

```html
<div class="demo" style="height: 800px;">
  <div class="row h-100">
    <div class="col-4">
      <ul class="list-group sticky-top" style='top:120px' >
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
    <div class="col-8">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis accusantium voluptatum possimus dolorum praesentium debitis. Libero excepturi fugiat rem ducimus quod illo distinctio tempora nulla temporibus placeat ut, dolorum unde.
      Architecto suscipit ullam et consequuntur quae expedita deleniti doloremque! Aperiam inventore in culpa eveniet. Delectus enim odit dignissimos reiciendis velit sint commodi exercitationem ut quasi non. Facilis ea incidunt quis.
      Iste, debitis modi. Praesentium ipsum repellat quas eligendi similique nisi numquam sapiente architecto odit vero magnam sint beatae rem consequatur soluta, aspernatur, nostrum, quam quod? Sint ab debitis laudantium deleniti.</p>
    </div>
  </div>
</div>
```

### 實戰常用範例

1.  使用在訊息通知(右上角告知訊息數)
    
    ```html
    <button type="button" class="btn btn-primary position-relative">
      Mails <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span class="visually-hidden">unread messages</span></span>
    </button>
    
    <button type="button" class="btn btn-dark position-relative">
      Marker <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </button>
    
    <button type="button" class="btn btn-primary position-relative">
      Alerts <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
    </button>
    ```
    
2. 圓形進度條
    
    ```html
    <div class="position-relative m-4">
      <div class="progress" style="height: 1px;">
        <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">1</button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</button>
    </div>
    ```
    

### Sass

## Shadows 陰影 `.shadow-{none, sm, lg}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/shadows/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/shadows/)**

### 使用介紹

使用我們的 `box-shadow` 通用類別快速增加或移除陰影。包括對 `.shadow-none` 和其他三個預設大小的支持 (有相關的變數用以對應)。

注意: 不要加在格線系統上(row. cols)而是加在裡面的內容物件content

```html
<div class="shadow-none p-3 mb-5 bg-light rounded">No shadow</div>
<div class="shadow-sm p-3 mb-5 bg-body rounded">Small shadow</div>
<div class="shadow p-3 mb-5 bg-body rounded">Regular shadow</div>
<div class="shadow-lg p-3 mb-5 bg-body rounded">Larger shadow</div>
```

### Sass

## Sizing 尺寸 `.{w, h}-{auto ,25, 50, 75, 100}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/sizing/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/sizing/)**

### 相對於父元素 `.{w, h}-{auto ,25, 50, 75, 100}`  `.m{w,h}-100`

說明: w是width 寬度的縮寫; h是height高度的縮寫 auto則是回到預設值

功能: 可調整元素的寬高，可用Sass調整比例的代表值

```html
<div class="w-25 p-3" style="background-color: #eee;">Width 25%</div>
<div class="w-50 p-3" style="background-color: #eee;">Width 50%</div>
<div class="w-75 p-3" style="background-color: #eee;">Width 75%</div>
<div class="w-100 p-3" style="background-color: #eee;">Width 100%</div>
<div class="w-auto p-3" style="background-color: #eee;">Width auto</div>
```

### 最大寬度&高度 `.m{w, h}-100`

您還可以根據需求使用 `max-width: 100%;` 和 `max-height: 100%;` 通用類別

說明: 使用`.max-{寬或高}`，其能確保其內部的寬高都一定在容器中

```html
<img src="..." class="mw-100" alt="...">
<div style="height: 100px; background-color: rgba(255,0,0,.1);">
  <div class="mh-100" style="width: 100px; height: 200px; background-color: rgba(0,0,255,.1);">Max-height 100%</div>
</div>
```

### 相對於視窗  `.v{h,w}-{auto ,25, 50, 75, 100}`

功能: 需要跟使用者瀏覽器視窗做調整時

(說明: v代表視窗所以.vh-100代表視窗100%)

```html
<p class="bs-gray small">(說明: v代表視窗所以.vh-100代表視窗100%)</p>

<div class="demo vh-100">
  <div class="box bg-bs5 h-100"></div>
</div>
```

### Sass

## Spacing 間距 `.m{t, b, s, e, x, y}-{0-5, auto}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/spacing/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/spacing/)**

說明: Bootstrap 包括各種簡寫響應式 margin、padding 和間隔的通用類別，用來修改一個元素的外觀。

### 特性&符號說明

### 特性

- 賦予一個縮寫 class 使 `margin` 或 `padding` 值在一個元素上(包含響應式)
- 範圍從 `.25rem` 到 `3rem`
- Class 來自於 Sass map

### 符號 `.{m, p}{t, b, s, e, x, y}-{0-5, auto}`

### **使用固定格式 `{property}{sides}-{size}` 命名，對於 `sm、md、lg、xl` 和 `xxl`，使用格式 `{property}{sides}-{breakpoint}-{size}` 命名**

### ***property* 設定:**

- `m - margin`
- `p - padding`

### ***sides* 設定:**

- `t - top`
- `b - bottom`
- `s`（start） `- left`（LTR）`right`（RTL）
- `e`（end） `- right`（LTR）`left`（RTL）
- `x -` 同時設定 `-left` 和 `-right`
- `y -` 同時設定 `-top` 和 `-bottom`

### ***sizes* 設定:**

$spacer 預設為1rem，也就是16px

- `0 - margin、padding` 為 `0`
- `1 - $spacer * .25`（預設）
- `2 - $spacer * .5`（預設）
- `3 - $spacer`（預設）
- `4 - $spacer * 1.5`（預設）
- `5 - $spacer * 3`（預設）
- `auto - margin` 為 `auto`

### 水平置中 `.mx-auto`

用於將固定寬度的塊級內容水平置中 (也就是具有 `display: block` 、本身設有 `width` 的內容)

```html
<div class="mx-auto" style="width: 200px;">
  Centered element
</div>
```

### 負的margin `.m{t, b, s, e, x, y}-n{0-5, auto}`

負值的 margin 在**默認情況下是禁用的**，但可以通過在 Sass 中設置 `$enable-negative-margins: true` 以啟用。

用法: 語法與預設的、正值 margin 通用類別幾乎相同，在所需的大小前加入 `n`，以下為與 `.mt-1` 相反的範例：

```html
.mt-n1 {
  margin-top: -0.25rem !important;
}
```

### Gap `.d-grid`

display grid 適合排版極為複雜的格線，大部分的網頁運用建議還是以 Bootstrap 網格系統為主。

必須在display grid，(簡寫為 `.d-grid`) 才能使用

老師建議，grid不大適合做為平常排版使用(多使用在非常複雜的排版[範例](https://gridbyexample.com/examples/))，建議還是以BS的格線系統為主

```html
<div class="d-grid gap-3">
  <div class="p-2 bg-light border">Grid item 1</div>
  <div class="p-2 bg-light border">Grid item 2</div>
  <div class="p-2 bg-light border">Grid item 3</div>
</div>
```

### Sass

## Text 文字 `.text`  `.fs`  `.fw`  `.lh`  `.text-decoration`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/text/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/text/)**

### 文字對齊 `.text-{start, center, end}`  `.text-{breakpoints}-{start, center, end}`

```html
<p class="text-start">Start aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-end">End aligned text on all viewport sizes.</p>

<p class="text-sm-start">Start aligned text on viewports sized SM (small) or wider.</p>
<p class="text-md-start">Start aligned text on viewports sized MD (medium) or wider.</p>
<p class="text-lg-start">Start aligned text on viewports sized LG (large) or wider.</p>
<p class="text-xl-start">Start aligned text on viewports sized XL (extra-large) or wider.</p>
```

### 文字換行 `.text-{wrap, nowrap}`

```html
<div class="badge bg-primary text-wrap" style="width: 6rem;">
  This text should wrap.
</div>
<div class="text-nowrap bd-highlight" style="width: 8rem;">
  This text should overflow the parent.
</div>
```

### 文字斷行 `.text-break`

會直接從字為單位斷開，與換行的詞為單位不同

**使用 `.text-break` 設定 `word-wrap: break-word` 和 `word-break: break-word` 預防長文破壞元件的排版**

```html
<p class="text-break">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm</p>
```

### 文字大小 `.fs-{1-6}`

只會單純切換文字大小，與前面的h1~h6不同，他們會加padding與margin

```html
<div class="demo">
  <p class="fs-1">.fs-1 text</p>
  <p class="fs-2">.fs-2 text</p>
  <p class="fs-3">.fs-3 text</p>
  <p class="fs-4">.fs-4 text</p>
  <p class="fs-5">.fs-5 text</p>
  <p class="fs-6">.fs-6 text</p>
</div>
```

### 文字大小寫轉換 `.text-{lowercase, uppercase, capitalize}`

文字大小寫轉換

注意`.text-capitalize` 只有將第一個字母轉為大寫，而其他字母不受影響。

```html
<p class="text-lowercase">Lowercased text.</p>
<p class="text-uppercase">Uppercased text.</p>
<p class="text-capitalize">CapiTaliZed text.</p>
```

### 文字粗體與斜體 `.fw-{bold, bolder, normal, light, lighter}`  `.fst-{italic, normal}`

### 粗體 `.fw-{bold, bolder, normal, light, lighter}`

使用這些通用類別來快速地改變文字內容的 `font-weight`

```html
<p class="fw-bold">Bold text.</p>
<p class="fw-bolder">Bolder weight text (relative to the parent element).</p>
<p class="fw-normal">Normal weight text.</p>
<p class="fw-light">Light weight text.</p>
<p class="fw-lighter">Lighter weight text (relative to the parent element).</p>
```

### 斜體 `.fst-{italic, normal}`

`font-style` 通用類別的縮寫為 `.fst-*`

```html
<p class="fst-italic">Italic text.</p>
<p class="fst-normal">Text with normal font style</p>
```

### 文字顏色Colors **`.text-{ 主題色彩 }`**

使用 color 通用類別為文字上色，但沒有hover效果

**注意**: 如果要為連結上色，你可以使用 `[.link-*` helper classes](https://bootstrap5.hexschool.com/docs/5.1/helpers/colored-links/)。它們具有 `:hover` and `:focus` 的狀態。

```html
<p class="text-primary">.text-primary</p>
<p class="text-secondary">.text-secondary</p>
<p class="text-success">.text-success</p>
<p class="text-danger">.text-danger</p>
<p class="text-warning bg-dark">.text-warning</p>
<p class="text-info bg-dark">.text-info</p>
<p class="text-light bg-dark">.text-light</p>
<p class="text-dark">.text-dark</p>
<p class="text-body">.text-body</p>
<p class="text-muted">.text-muted</p>
<p class="text-white bg-dark">.text-white</p>
<p class="text-black-50">.text-black-50</p>
<p class="text-white-50 bg-dark">.text-white-50</p>
```

### 行高 `.lh-{1, sm, base, lg}`

使用 `.lh-*` 通用類別來改變行高。

(由於調整行高會影響閱讀體驗，因此除非特別需求否則不建議調整)

預設行高1.5

```html
<div class="demo">
  <p class="lh-1">This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.</p>
  <p class="lh-sm">This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.</p>
  <p class="lh-base">This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.</p>
  <p class="lh-lg">This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.</p>
</div>
```

### **文字裝飾** `.text-decoration-{underline, line-through, none}`

使用文字裝飾類別來裝飾元件中的文字。

```html
<p class="text-decoration-underline">This text has a line underneath it.</p>
<p class="text-decoration-line-through">This text has a line going through it.</p>
<a href="#" class="text-decoration-none">This link has its text decoration removed</a>
```

### 等寬字體 **Monospace** `.font-monospace`

選擇使用 `.font-monospace` 來更換為 monospace 字體堆疊。

```html
<p class="font-monospace">This is in monospace</p>
```

### **重置色彩** `.text-reset`

重置一個文字或連結色彩，以便它們繼承父層的顏色。

```html
<p class="text-muted">
  Muted text with a <a href="#" class="text-reset">reset link</a>.
</p>
```

### Sass

## Vertical align 垂直對齊 **`.align-{baseline, top, middle, bottom`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/vertical-align/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/vertical-align/)**

### 注意: 僅影響 inline、inline-block、inline-table、和 table 元素

### 若要使用於 非行內元素 調整可以使用[flex box 通用類別](https://bootstrap5.hexschool.com/docs/5.1/utilities/flex/#align-items)

### 搭配**table cell 元素 `.align-{baseline, top, middle, bottom, text-bottom , text-top}`**

這是實戰常用技巧，尤其是 align-middle

不管下在父元素或單一子元素都可運作

```html
<table style="height: 100px;">
  <tbody>
    <tr>
      <td class="align-baseline">baseline</td>
      <td class="align-top">top</td>
      <td class="align-middle">middle</td>
      <td class="align-bottom">bottom</td>
      <td class="align-text-top">text-top</td>
      <td class="align-text-bottom">text-bottom</td>
    </tr>
  </tbody>
</table>
```

### 搭配 inline 元素

註：inline 中不太建議調整 align-*，這會受到字體不同影響其結果。

(除了限制多外，目前在實戰中使用率低)

```html
<span class="align-baseline">baseline</span>
<span class="align-top">top</span>
<span class="align-middle">middle</span>
<span class="align-bottom">bottom</span>
<span class="align-text-top">text-top</span>
<span class="align-text-bottom">text-bottom</span>
```

### Sass

 

## Visibility 可視性 `.visible` `.invisible`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/utilities/visibility/) 、 [英文](https://getbootstrap.com/docs/5.1/utilities/visibility/)**

可視性通用類別控制元素的能見度，不需要修改元素的實際空間。

這完全不會改變 `display` 的值，也不影響佈局 - `.invisible` 元素仍會佔用頁面空間。

`.d-none`則不會佔有空間，可能會影響布局

```html
<div class="demo">
  <div class="box invisible"></div>
  <p>
    <div class="box float-end invisible"></div>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error eligendi magni molestiae non expedita exercitationem vero odio numquam assumenda esse sed quibusdam, aperiam, dicta iusto voluptates eius velit asperiores incidunt!
    Necessitatibus facilis error facere atque esse optio officia consequatur, possimus aliquid, odit autem quam soluta! Modi esse recusandae doloremque beatae voluptatum sit totam accusamus, nihil nisi fugit qui quasi incidunt?
    Quam pariatur mollitia rem dolorum amet ab vel accusamus non unde numquam voluptatem enim odit voluptatum quasi voluptas nisi aliquid, vero alias atque consectetur ipsam saepe iste. Praesentium, recusandae aspernatur.
    Atque aspernatur ullam, saepe maxime illum cupiditate cumque fugit. Animi quisquam necessitatibus repellendus veritatis neque omnis recusandae incidunt. Officiis cupiditate quo perferendis commodi eum iusto dolorum amet id nam quis.
  </p>
</div>
```

# Helpers 工具類別

- Utilities 通用類別，此為BS5中的通用類別，若熟悉Saas可允許擴充，其可針對元件部份提供微調修改，提供元件更符合個人開發需求
- helpers工具， 此為單一class屬性，其內容不可再自行擴充，皆為預設內容，但也同通用類別部份可以提供已設定好的套件方便使用者使用

## Clearfix 清除浮動  `.float`   `.clearfix`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/clearfix/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/clearfix/)**

### **透過將 `.clearfix` 添加到父元素之中 可以輕鬆的清除 `float` 所造成的副作用。**

(提醒 float的副作用，不會撐開外層空間，所以要記得在父層加.clearfix)

傳統作法是在最下面放一個div, 在其CSS裡放入clear: both

```html
<div class="bg-info clearfix ">
    <button type="button" class="btn btn-secondary float-start  ">Example Button floated left</button>
    <button type="button" class="btn btn-secondary float-end ">Example Button floated right</button>
</div>

```

## Colored Links 連結顏色 `.link-{主題色彩}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/colored-links/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/colored-links/)**

**你可以使用 `.link-*` 類別為連結著色。不同於 [.text-* 類別](https://bootstrap5.hexschool.com/docs/5.0/utilities/colors/#colors)， 這些類別具有 `:hover` 和 `:focus` 狀態**

hover, focus效果可以在Dev tool中，css右上角 :hov 鈕中開啟

```html
<div class="demo">
  <a href="#" class="link-primary">Primary link</a>
  <a href="#" class="link-secondary">Secondary link</a>
  <a href="#" class="link-success">Success link</a>
  <a href="#" class="link-danger">Danger link</a>
  <a href="#" class="link-warning">Warning link</a>
  <a href="#" class="link-info">Info link</a>
  <a href="#" class="link-light">Light link</a>
  <a href="#" class="link-dark">Dark link</a>
</div>
```

## Ratio 比例 `.ratio-{ 16x9, 1x1, 4x3, 21x9 }`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/ratio/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/ratio/)**

使用 ratio 工具來管理外嵌內容，例如 `<iframe>`、`<embed>`、`<video>` 和 `<object>`

可用於任何標準 HTML 子元素(例如：`<div>` 或 `<img>`)。 樣式會從 `.ratio` 類別直接應用於子項。

也允許 [自定義長寬比](https://bootstrap5.hexschool.com/docs/5.1/helpers/ratio/#custom-ratios)。

### 範例: 使用在影片

加入 `.ratio-{ 16x9, 1x1, 4x3, 21x9 }` 調整以下比例

縮放畫面會以等比例縮放，只有這4種比例，自行修改不會有效果

```html
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/gCd8Kg7avc0" title="YouTube video" allowfullscreen></iframe>
</div>
```

### 自訂比率大小

由於原本BS設定是以寬度為主，高度以寬度在乘與%數

例如 set `.ratio` 上設置 `-bs-aspect-ratio: 50%`。

```html
<div class="demo">
  <div class="ratio" style="--bs-aspect-ratio: 200%; display: inline-block; width: 10rem; background-color: #f8f9fa; border: 1px solid #dee2e6;">
    <div style="display: flex; justify-content: center; align-items: center;">2x1</div>
  </div>
</div>
```

## Position 位置

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/position/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/position/)**

### 定位值 `.position-{static, relative, absolute, fixed, sticky}`

最常使用 絕對定位&相對定位

```html
<div class="position-static">...</div>
<div class="position-relative">...</div>
<div class="position-absolute">...</div>
<div class="position-fixed">...</div>
<div class="position-sticky">...</div>
```

### 排列元素 `.{top, start, bottom, end}-{0, 50, 100}`

你可以為元素加上 `.position-absolute`, `.position-relative` 改變定位形式，同時可透過 \{property\}-\{position\} 的形式加上定位

```html
<!-- 你可以為元素加上 position-absolute, position-relative 改變定位形式，同時可透過 {property}-{position} 的形式加上定位</p> -->
<!-- 記得使用絕對定位時，父層要加上相對定位 -->
<!--另外可以直接以<code>.{方向}-{數值}表示位置< -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box bottom-0 end-0"></div>
  </div>
</div>
<!-- 若在方向上加上100%，就會被推移出去 -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-100"></div>
  </div>
</div>
<!-- 中間不是真的中間，由於是從指定方向開始算，起始點未含物體本身寬度</p> -->
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50"></div>
  </div>
</div>
```

### 元素置中 `.translate-middle-{x, y}`

元素位置起使推移點會在元素中央位置，可在後方加入方向

```html
<p>元素置中<code>.translate-middle</code> </p>
<p>注意:此方式是轉變起始軸中心，因此還是要加.start-50 top-50</p>
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50 top-50 translate-middle"></div>
  </div>
</div>
<p>元素置中<code>.translate-middle-{方向x或y}</code> </p>
<p>注意:此方式是轉變起始軸中心，因此若只改變水平軸可加x 加.start-50 </p>
<div class="demo p-5">
  <div class="position-relative" style="height: 100px; background-color: #F5F5F5;">
    <div class="position-absolute box start-50 translate-middle-x"></div>
  </div>
</div>
```

### 固定元素位置 `.fix-{top, bottom}`

**將元素固定在螢幕的頂端 `.fixed-top`  將元素固定在螢幕的底部 `.fixed-bottom`**

```html
<h6>將元素固定在螢幕的頂端 <code>.fixed-top</code></h6>

<div class="demo">
  <nav class="navbar navbar-light bg-light fixed-top mt-5">
    <div class="container-fluid">
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
    </div>
  </nav>
</div>

<h2>Fixed bottom</h2>
<h6>將元素固定在螢幕的底部 <code>.fixed-bottom</code></h6>

<div class="demo">
  <nav class="navbar navbar-light bg-light fixed-bottom ">
    <div class="container-fluid">
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
    </div>
  </nav>
</div>
```

### Sticky top  `.sticky-top`

功能: 滑動到該位置觸發，滑過後黏在頂上，黏到到div區快結束，不會在繼續下去

技巧: 可用`style`屬性，可以改變高度

注意: **`.sticky-top` 通用類別使用 CSS 的 `position: sticky`，並非所有瀏覽器都完全支持**

### 響應式 sticky top `.sticky-{breakpoints}-top`

### **`.sticky-top` 通用類別也支持響應式變化**

- `sticky-sm-top`
- `sticky-md-top`
- `sticky-lg-top`
- `sticky-xl-top`

```html
<div class="demo" style="height: 800px;">
  <div class="row h-100">
    <div class="col-4">
      <ul class="list-group sticky-top" style='top:120px' >
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        <li class="list-group-item">A fourth item</li>
        <li class="list-group-item">And a fifth one</li>
      </ul>
    </div>
    <div class="col-8">
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis accusantium voluptatum possimus dolorum praesentium debitis. Libero excepturi fugiat rem ducimus quod illo distinctio tempora nulla temporibus placeat ut, dolorum unde.
      Architecto suscipit ullam et consequuntur quae expedita deleniti doloremque! Aperiam inventore in culpa eveniet. Delectus enim odit dignissimos reiciendis velit sint commodi exercitationem ut quasi non. Facilis ea incidunt quis.
      Iste, debitis modi. Praesentium ipsum repellat quas eligendi similique nisi numquam sapiente architecto odit vero magnam sint beatae rem consequatur soluta, aspernatur, nostrum, quam quod? Sint ab debitis laudantium deleniti.</p>
    </div>
  </div>
</div>
```

### 實戰常用範例

1.  使用在訊息通知(右上角告知訊息數)
    
    ```html
    <button type="button" class="btn btn-primary position-relative">
      Mails <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">+99 <span class="visually-hidden">unread messages</span></span>
    </button>
    
    <button type="button" class="btn btn-dark position-relative">
      Marker <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
    </button>
    
    <button type="button" class="btn btn-primary position-relative">
      Alerts <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">unread messages</span></span>
    </button>
    ```
    
2. 圓形進度條
    
    ```html
    <div class="position-relative m-4">
      <div class="progress" style="height: 1px;">
        <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <button type="button" class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">1</button>
      <button type="button" class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill" style="width: 2rem; height:2rem;">2</button>
      <button type="button" class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill" style="width: 2rem; height:2rem;">3</button>
    </div>
    ```
    

### Sass

## Stacks 堆疊

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/stacks/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/stacks/)**

## Visually hidden 視覺隱藏 `.visually-hidden`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/visually-hidden/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/visually-hidden/)**

說明: 視覺隱藏，在視覺上隱藏元素，但仍允許其透過.visually-hidden呈現給輔助技術（例如螢幕閱讀器）。

若使用者想看到，可以透過滑鼠點擊後按TAB

通常是給有視覺辨識障礙者的內容

```html
<h2 class="visually-hidden">Title for screen readers</h2>
<a class="visually-hidden-focusable" href="#content">Skip to main content</a>
<div class="visually-hidden-focusable">A container with a <a href="#">focusable element</a>.</div>
```

## Stretched link 連結延伸 **`.stretched-link`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/stretched-link/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/stretched-link/)**

功能: 可以延伸連結點擊範圍到其他元素

注意: **因此必須添加 `position: relative`，避免連結延伸到父容器以外的地方。(BS的`卡片元件`已有預設`.position: relative`)**

原理: 這是透過 `::after` 虛擬元素達成的。在大多數的情況下，這意味著本身帶有 `position: relative;`，且內部包裝了具有 `.stretched-link` 類別之連結的元素將變得可點擊

```html
<div class="d-flex position-relative">
  <img src="..." class="flex-shrink-0 me-3" alt="...">
  <div>
    <h5 class="mt-0">Custom component with stretched link</h5>
    <p>This is some placeholder content for the custom component. It is intended to mimic what some real-world content would look like, and we're using it here to give the component a bit of body and size.</p>
    <a href="#" class="stretched-link">Go somewhere</a>
  </div>
</div>
```

### 需注意 containing block可能會導致的問題

**以下的 CSS 屬性將使一個元素成為 containing block。**

- `static` 以外的 `position` 值(比如: relative或absolute)
- `none` 以外的 `transform` 或 `perspective` 值
- 在 `transform` 或 `perspective` 使用 `will-change` 作為值
- `none` 以外的 `filter` 值，或是在 `filter` 使用 `will-change` 作為值 (只會在 Firefox 作用)

```html
<div class="demo">
    <div class="card" style="width: 18rem;">
        <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
          <h5 class="card-title">帶有延伸連結的卡片</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <p class="card-text">
            <a href="#" class="stretched-link text-danger" style="position: relative;">在此延伸連結不會運作，因為 <code>position: relative</code> 被添加在連結上</a>
          </p>
          <p class="card-text bg-light" style="transform: rotate(0);">
            此 <a href="#" class="text-warning stretched-link">延伸連結</a> 只會延伸至 <code>p</code> 標籤, 因為 <code>p</code> 標籤被添加了 transform。</p>
        </div>
    </div>
</div>
```

## Text truncation 文字溢出 **`.text-truncate`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/text-truncation/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/text-truncation/)**

功能:使用 刪節號 截斷較長的字串

注意 在元素**為 `display: inline-block` 或是 `display: block`，可以添加 `.text-truncate` 類別，以透過刪節號截斷文字。**

```html
<!-- Block level -->
<div class="row">
  <div class="col-2 text-truncate">
    This text is quite long, and will be truncated once displayed.
  </div>
</div>

<!-- Inline level -->
<span class="d-inline-block text-truncate" style="max-width: 150px;">
  This text is quite long, and will be truncated once displayed.
</span>
```

## Vertical rule `<hr>` `.vr`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/vertical-rule/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/vertical-rule/)**

# Components 元件類別

## 元件使用須知

### 元件結構

分為兩種類型

### 結構與樣式分離 `{模組名}` `{樣式}`

**結構為 `{模組名}` `{樣式}`**

- **結構類型:  `{模組名}`**
    
    說明: 為主要結構比如按鈕的外框圓角設置 ex: `.btn`
    
- **樣式類型:  `{樣式}`**
    - 主題色: \{模組名\}-\{主題色\}  ex: .btn-\{主題色\}
    - 樣式(2種):
        - 模組特別樣式 \{模組名\}-\{樣式\}
            
            ex: .btn-sm, .btn-lg
            
        - 通用類別樣式 \{通用類別\}
    - 狀態: \{狀態\} ex: disabled checked

### 容器元件類型 `{主結構}` `{次結構}` `{樣式}`

結構為 `{主結構}` `{次結構}` `{樣式}`

- 主結構 ex: -card
- 次結構 ex: -card-img-top
- 樣式 : 使用通用類別ex: -bg-primiary

### 元件與JS的互動`.data-bs-`  JS原生寫法

有兩種操作方式

1.  BS已撰寫好的 `data-bs-`...
- 範例
    
    ```html
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    ```
    
1. 透過原生JS寫法
    - 範例
        
        ```html
        <script>
        
          (() => {
            const myModal = new bootstrap.Modal(document.getElementById('sampleModal'));
            const btn = document.querySelector('#myBtn');
        
            btn.addEventListener('click', () => {
              myModal.show();
            });
          })();
        </script>
        ```
        

## **Accordion 手風琴 (可折疊表單)**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/accordion/) 、 [英文](https://getbootstrap.com/docs/5.1/components/accordion/)**

功能: 可收納式表單的折疊效果

### 相關JS步驟說明

**1. 載入 BS JS CDN**

**2. 最外層父層放入id, 子層header層內 在h2放入id，在內容處也放入id**

**3. 將`.accordion` 對應的類別放入**

**4. 互動JS的部分在`button按鍵`上以 `data-bs-toggle="collapse"` 以及 `data-bs-target="內容id`”**

**5. 在對應的伸縮內容上放入 `data-bs-parent="父層id”`**

### 範例說明

```html
<div class="demo">
  <!-- 最外面的父層放入 .accordion 跟id   -->
    <div class="accordion" id="accordionExample">
      <!-- 直接子層放 .accordion-item -->
        <div class="accordion-item">
          <!-- 子層header 放入id -->
          <!-- .accordion-header -->
          <h2 class="accordion-header" id="headingOne">
            <!-- 按鈕處放入  data-bs-toggle="collapse"  data-bs-target="對應子層id" -->
            <!--.accordion-button  -->
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <!-- 子層內容，需放入 data-bs-parent="對應最外父層id" -->
          <!-- 子層放入.accordion-collapse  .collaspse .show -->
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
    </div>
</div>
```

### Flush 將樣式移除

功能:將樣式移除，含 背景顏色、外框線、圓角

**方法`.accordion-flush` 放在父層**

```html
<div class="demo">
    <div class="accordion 練習" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
          </div>
        </div>
    </div>
</div>
```

### Always open (移除一次只開一層的功能)

移除只能一次開一層的功能(可手動收回)

**方法: 將內層內容上`data-bs-parent`移除**

```html
<div class="demo">
    <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Accordion Item #1
            </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne"
          data-bs-parent="#accordionPanelsStayOpenExample">
            <div class="accordion-body">
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo"
          data-bs-parent="#accordionPanelsStayOpenExample">
            <div class="accordion-body">
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree"
          data-bs-parent="#accordionPanelsStayOpenExample">
            <div class="accordion-body">
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </div>
        </div>
    </div>
</div>
```

### Sass

## **Alert 警報**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/alerts/) 、 [英文](https://getbootstrap.com/docs/5.1/components/alerts/)**

### 加入主題色 `.alert-{主題色}`

```html
<div class="alert alert-primary" role="alert">
  A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-secondary" role="alert">
  A simple secondary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-success" role="alert">
  A simple success alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-warning" role="alert">
  A simple warning alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-info" role="alert">
  A simple info alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-light" role="alert">
  A simple light alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
<div class="alert alert-dark" role="alert">
  A simple dark alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
</div>
```

### 套件類別 `.alert-heading` `.alert-link`

優點: 會自動套用主題色系，不需要在自己調整

### 在警告標題中放入 `.alert-heading`

 會自動於分隔線、段落、標題套用主題色系，不需要在自己調整

```html
<div class="demo">
  <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Well done!</h4>
    <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer
      so that you can see how spacing within an alert works with this kind of content.</p>
    <hr>
    <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
  </div>
</div>
```

### 在連結處放入 `.alert-link`

使用 alert-link 套用警告框內的連結色彩

```html
<div class="demo">
  <div class="alert alert-primary" role="alert">
    A simple primary alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
  <div class="alert alert-danger" role="alert">
    A simple danger alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
  </div>
</div>
```

### 加入ICON([搜尋連結](https://icons.getbootstrap.com/))  (SVG, ICON FONT)

### SVG

```html
<p>使用 Flex 重新對齊以下內容</p>

<div class="demo">
  <div class="alert alert-primary d-flex align-items-center" role="alert">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
      class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img"
      aria-label="Warning:">
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
    <div>
      An example alert with an icon
    </div>
  </div>
</div>
```

### ICON FONT

1. 載入 Bootstrap ICON CDN
2. 加入 ICON，並使用 utilities 調整大小、間距

```html
<div class="demo">
  <div class="alert alert-primary d-flex align-items-center" role="alert">
    <!-- 插入ICON FONT連結 -->
    <!-- 可用text大小調整大小 -->
    <i class="bi bi-exclamation-triangle-fill fs-2 me-2"></i>
    <div>
      An example alert with an icon
    </div>
  </div>
</div>
```

### 移除功能 `.alert-dismissible`  `data-bs-dismiss=”alert”`

- 在父層加入 `**.alert-dismissible**` 類別，使警報的右上角新增額外的關閉按鈕。
- 在關閉按鈕加上 `**data-bs-dismiss="alert**"` 屬性來觸發 JavaScript 函式。務必使用 `**<button>**` 元素，讓它可以跨裝置正常運行。
- 要以動態方式移除警報，可以使用 `**.fade**` 和 `**.show**` 類別。

```html
<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Holy guacamole!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
```

### Sass

## Badges **標籤** `<span></span>`   ** `.badge`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/badge/) 、 [英文](https://getbootstrap.com/docs/5.1/components/badge/)**

### 介紹 `<span></span>`

常與\<span\>標籤連用，標籤型元件，沒有 focus 或 hover 樣式，透過相對字體大小和 `em` 單位來縮放以符合直屬父元素的大小

```html
<h1>Example heading <span class="badge bg-secondary">New</span></h1>
<h2>Example heading <span class="badge bg-secondary">New</span></h2>
<h3>Example heading <span class="badge bg-secondary">New</span></h3>
<h4>Example heading <span class="badge bg-secondary">New</span></h4>
<h5>Example heading <span class="badge bg-secondary">New</span></h5>
<h6>Example heading <span class="badge bg-secondary">New</span></h6>
```

### 顏色調整 使用通用 `.bg-colors`

```html
<span class="badge bg-primary">Primary</span>
<span class="badge bg-secondary">Secondary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-warning text-dark">Warning</span>
<span class="badge bg-info text-dark">Info</span>
<span class="badge bg-light text-dark">Light</span>
<span class="badge bg-dark">Dark</span>
```

### **膠囊標籤做法**  `.rounded-pill`

使用 `.rounded-pill` 通用類別可以透過 `border-radius` 使標籤增加圓角。

```html
<span class="badge rounded-pill bg-primary">Primary</span>
<span class="badge rounded-pill bg-secondary">Secondary</span>
<span class="badge rounded-pill bg-success">Success</span>
<span class="badge rounded-pill bg-danger">Danger</span>
<span class="badge rounded-pill bg-warning text-dark">Warning</span>
<span class="badge rounded-pill bg-info text-dark">Info</span>
<span class="badge rounded-pill bg-light text-dark">Light</span>
<span class="badge rounded-pill bg-dark">Dark</span>
```

### 與按鈕混用，做計數器

```html
<button type="button" class="btn btn-primary">
  Notifications <span class="badge bg-secondary">4</span>
</button>
```

### 右上角訊息通知製作  .`position-{absolute, relative}`

使用通用類別，製作按鈕的額外提示效果

- 外層加入：position-relative
- 內層：position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger

```html
<button type="button" class="btn btn-primary position-relative">
  Profile
  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span>
</button>
```

## Breadcrumb **麵包屑** `.breadcrumb`  `.breadcrumb-item`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/breadcrumb/) 、 [英文](https://getbootstrap.com/docs/5.1/components/breadcrumb/)**

指示當前頁面在導航層次結構中的位置，該導航層次結構通過 CSS 自動添加分隔符

### 介紹 `<nav></nav>` `<ol></ol>`  `.breadcrumb`  `.breadcrumb-item`

功能: 指示當前頁面在導航層次結構中的位置，該導航層次結構通過 CSS 自動添加分隔符

```html
<div class="demo">
  <!-- 外層是nav的標籤 -->
    <nav aria-label="breadcrumb">
      <!-- 最外層加入.breadcrumb -->
        <ol class="breadcrumb">
          <!-- 內層物件上加入  .breadcrumb-item -->
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item"><a href="#">Library</a></li>
          <!-- .active 屬性會讓文字變較淺 -->
          <li class="breadcrumb-item active" aria-current="page">Data</li>
        </ol>
    </nav>
</div>
```

### 更改預設分隔符 `<nav></nav>`  `style="--bs-breadcrumb-divider: ""`

```html
<div class="demo">
  <!-- 在nav 標籤 放入style標籤 --bs-breadcrumb-divider:""加入自己想要的符號 -->
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
    </nav>
</div>
```

### 使用SVG圖示分隔

```html
<div class="demo">
    <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
    </nav>
</div>
```

### 移除分隔符 `-bs-breadcrumb-divider: ''`

```html
<nav style="--bs-breadcrumb-divider: '';" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>
```

### Sass

## Button **按鈕** `.btn` `.btn-{主題色}`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/buttons/) 、 [英文](https://getbootstrap.com/docs/5.1/components/buttons/)**

### 搭配不同主題色 `.btn` `.btn-{主題色}`

由於`.btn` 本身只是結構，沒有色彩，需要加上`.btn-{主題色}`才會有顏色，遲了點擊、hover會有顏色改變外，文字也會因為顏色的深淺而做轉換

```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button>
```

### 具有按鈕外觀的連結 `.btn`  `.btn-link`

```html
<!-- btn-link 是具有按鈕尺寸的連結樣式按鈕 -->
  <button type="button" class="btn btn-link">Link</button>
```

### 禁止按鈕內文字換行 `.text-nowrap`

### `.btn`可以使用的標籤  `<a></a>` `<input>` `<button></button>`

除了本來搭配的button標籤外，也可與a連結標籤以及input標籤搭配使用

**注意:** 若放在a連結標籤，但並非用於連結頁面，且用於有觸發頁面功能時，為了網頁親和性，需要加入 `role=”botton”`

```html
<a class="btn btn-primary" href="#" role="button">Link</a>
<button class="btn btn-primary" type="submit">Button</button>
<input class="btn btn-primary" type="button" value="Input">
<input class="btn btn-primary" type="submit" value="Submit">
<input class="btn btn-primary" type="reset" value="Reset">
```

### Outline外框按鈕樣式 `.btn-outline-{主題色}`

會有點擊以及hover顏色效果

注意: `.btn-outline-info` 這顏色文字特別淺，不適合用在淺色背景會看不清

```html
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
<button type="button" class="btn btn-outline-warning">Warning</button>
<button type="button" class="btn btn-outline-info">Info</button>
<button type="button" class="btn btn-outline-light">Light</button>
<button type="button" class="btn btn-outline-dark">Dark</button>
```

### 調整尺寸 `.btn-{sm, lg}`

```html
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-secondary btn-sm">Large button</button>
```

### 禁用狀態 `disabled`  `.disabled`

說明: 被禁用的按鈕具有 `pointer-events: none`，以防止觸發滑入以及啟用狀態。

### 注意: 使用 `<a>` 元素的禁用其行為與其他按鈕不同：

1.  `<a>` 不支援 `disabled` 屬性，所以你必須添加 `.disabled` 使它在視覺上看起來被禁用。
2. 禁用按鈕應包含 `aria-disabled="true"` 屬性來向輔助性技術指示元素的狀態。
3. 另外記得加上 `tabindex="-1”` 屬性，避免tab鍵點選到(原設定是`tabindex=”0”`)

```html
<button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
<button type="button" class="btn btn-secondary btn-lg" disabled>Button</button>
```

```html
<!-- a標籤禁用範例寫法，將入 .disabled, tabindex="-1", aria-disabled="true" -->
<a href="#" class="btn btn-primary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Primary link</a>
<a href="#" class="btn btn-secondary btn-lg disabled" tabindex="-1" role="button" aria-disabled="true">Link</a>
```

### 區塊按鈕及其響應式寫法

### 傳統寫法 `.w-100` `.mt-2`

搭配使用 width: 100%

缺點: 不好寫響應式呈現

```html
<div class="demo">
  <button class="btn btn-primary w-100" type="button">Button</button>
  <button class="btn btn-primary w-100 mt-2" type="button">Button</button>
</div>
```

### 搭配網格Display Grid  `.d-grid` `.gap-2`

```html
<div class="demo">
  <div class="d-grid gap-2">
    <button class="btn btn-primary" type="button">Button</button>
    <button class="btn btn-primary" type="button">Button</button>
  </div>
</div>
```

### 響應式寫法 `.d-grid .gap-2 .d-md-block`

說明: 從垂直堆疊的按鈕群組開始，直到遇到 `md` 斷點才會把 `.d-grid` 替換為 `.d-md-block`，進而使 `gap-2` 通用類別無效化。縮放瀏覽器的大小以觀察它們的改變。

```html
<div class="d-grid gap-2 d-md-block">
  <button class="btn btn-primary" type="button">Button</button>
  <button class="btn btn-primary" type="button">Button</button>
</div>
```

### 搭配格線調整寬度 `.col`

使用網格系統的欄 (column) 類別來調整區塊級別按鈕的寬度

```html
<div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-primary" type="button">Button</button>
  <button class="btn btn-primary" type="button">Button</button>
</div>
```

### 與flexbox搭配調整排版

添加通用類別來對齊、調整按鈕。

```html
<div class="d-grid gap-2 d-md-flex justify-content-md-end">
  <button class="btn btn-primary me-md-2" type="button">Button</button>
  <button class="btn btn-primary" type="button">Button</button>
</div>
```

### **按鈕插件-切換狀態**  `data-bs-toggle="button"`  `.active` `aria-pressed="true"`

可以使用按鈕插件建立簡單的 on/off 切換按鈕。

```html
<a href="#" class="btn btn-primary" role="button" data-bs-toggle="button">Toggle link</a>
<a href="#" class="btn btn-primary active" role="button" data-bs-toggle="button" aria-pressed="true">Active toggle link</a>
<a class="btn btn-primary disabled" aria-disabled="true" role="button" data-bs-toggle="button">Disabled toggle link</a>
```

### Sass

## Button group按鈕群組  `.btn-grou`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/button-group/) 、 [英文](https://getbootstrap.com/docs/5.1/components/button-group/)**

### 使用介紹 `.btn-group` `.btn-toolbar`

功能: 將按鈕群組化，可進行群組操作

### `.btn-group` 群組化按鈕

注意: 若有非button標籤的使用，比如div標籤...等，為方便辨識，請務必加上 `role=”group”` 

外觀上: 其群組會消除按鈕間的空細，只剩1px的邊框

方法: 在按鈕父層加上 `.btn-group`

```html
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>
```

### `.btn-toolbar` 群組化多個按鈕群組

注意: 若有非button標籤的使用，比如div標籤...等，為方便辨識，請務必加上 `role=”toolbar”` 

外觀上: 群組間的空細變小

方法: 在按鈕群組最外父層加上 `.btn-toolbar`

```html
<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-primary">1</button>
    <button type="button" class="btn btn-primary">2</button>
    <button type="button" class="btn btn-primary">3</button>
    <button type="button" class="btn btn-primary">4</button>
  </div>
  <div class="btn-group me-2" role="group" aria-label="Second group">
    <button type="button" class="btn btn-secondary">5</button>
    <button type="button" class="btn btn-secondary">6</button>
    <button type="button" class="btn btn-secondary">7</button>
  </div>
  <div class="btn-group" role="group" aria-label="Third group">
    <button type="button" class="btn btn-info">8</button>
  </div>
</div>
```

### 顏色設置 (同單一按鈕設置) `.btn-{主題色}`

注意: 直接在.btn-group 加顏色的話，是使用`.btn-{主題色}`，但其部會因為背景顏色而改變文字顏色，所以建議各別在按鈕標籤調整

方法: **各別在按鈕標籤內調整，可混色，可加入 .active等[.nav屬性](https://bootstrap5.hexschool.com/docs/5.1/components/navs-tabs/)**

```html
<div class="btn-group">
  <a href="#" class="btn btn-primary active" aria-current="page">Active link</a>
  <a href="#" class="btn btn-primary">Link</a>
  <a href="#" class="btn btn-secondary">Link</a>
</div>
```

### Outline 外框樣式 (同單一按鈕設置) `.btn-outline-{主題色}`

```html
<div class="btn-group" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-primary">Left</button>
  <button type="button" class="btn btn-outline-primary">Middle</button>
  <button type="button" class="btn btn-outline-primary">Right</button>
</div>
```

### Sizing 縮放 `.btn-group-{sm, lg}`

不必將按鈕尺寸調整類別套用在群組內的每一個按鈕上

```html
<div class="btn-group btn-group-lg" role="group" aria-label="...">...</div>
<div class="btn-group" role="group" aria-label="...">...</div>
<div class="btn-group btn-group-sm" role="group" aria-label="...">...</div>
```

### 垂直呈現 `.btn-group-vertical`

功能: 將一組按鈕垂直堆疊而不是水平呈現

注意: 此處不支援分割開下拉式功能表，會呈現再一起

- 範例
    
    ```html
    <div class="demo">
      <div class="btn-group-vertical">
        <button type="button" class="btn btn-primary">Button</button>
        <button type="button" class="btn btn-primary">Button</button>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
        <button type="button" class="btn btn-primary">Button</button>
        <button type="button" class="btn btn-primary">Button</button>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
        <div class="btn-group" role="group">
          <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </button>
          <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
            <li><a class="dropdown-item" href="#">Dropdown link</a></li>
          </ul>
        </div>
      </div>
    </div>
    ```
    

### 核取方塊、選項方塊，也可以使用

與核取方塊、選項方塊的核取模式，也可以使用`.btn-group-vertical`將其變成垂直

- 範例
    
    ```html
    <div class="demo">
      <div class="btn-group-vertical">
        <input type="radio" class="btn-check" name="btnradio" id="btnradioVertical1" autocomplete="off" checked>
        <label class="btn btn-outline-danger" for="btnradioVertical1">Radio 1</label>
        
        <input type="radio" class="btn-check" name="btnradio" id="btnradioVertical2" autocomplete="off">
        <label class="btn btn-outline-danger" for="btnradioVertical2">Radio 2</label>
        
        <input type="radio" class="btn-check" name="btnradio" id="btnradioVertical3" autocomplete="off">
        <label class="btn btn-outline-danger" for="btnradioVertical3">Radio 3</label>
      </div>
    </div>
    ```
    

### 與下拉式表單混合 Nesting `.btn-group`

當您想要下拉式功能表與按鈕群組混合時，只需要將`.btn-group`放在另一個`.btn-group`中即可

```html
<div class="demo">
  <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
    <button type="button" class="btn btn-primary">1</button>
    <button type="button" class="btn btn-primary">2</button>
    
    <div class="btn-group" role="group">
      <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      Dropdown
      </button>
      <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      <li><a class="dropdown-item" href="#">Dropdown link</a></li>
      </ul>
    </div>
  </div>
</div>
```

### 使用在核取&選項按鈕 `<input type={”checkbox”,”radio”}>`

1. input標籤 checkbox 需加上 `.btn-check`
2. 順序: input 在前、label 在後
3. label for 與 input id 需要對應

```html
<div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
  <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off">
  <label class="btn btn-outline-primary" for="btncheck1">Checkbox 1</label>

  <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off">
  <label class="btn btn-outline-primary" for="btncheck2">Checkbox 2</label>

  <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off">
  <label class="btn btn-outline-primary" for="btncheck3">Checkbox 3</label>
</div>
```

```html
<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
  <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
  <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
  <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
</div>
```

### 與input其他type分隔 `通用類別spacing`  `.btn-toolbar`

隨意將 input 群組與工具列中的按鈕群組進行混合。與上面的範例類似，您需要一些通用類別以適當的將這些的內容間隔開。

```html
<div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group me-2" role="group" aria-label="First group">
    <button type="button" class="btn btn-outline-secondary">1</button>
    <button type="button" class="btn btn-outline-secondary">2</button>
    <button type="button" class="btn btn-outline-secondary">3</button>
    <button type="button" class="btn btn-outline-secondary">4</button>
  </div>
  <div class="input-group">
    <div class="input-group-text" id="btnGroupAddon">@</div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
  </div>
</div>

<div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
  <div class="btn-group" role="group" aria-label="First group">
    <button type="button" class="btn btn-outline-secondary">1</button>
    <button type="button" class="btn btn-outline-secondary">2</button>
    <button type="button" class="btn btn-outline-secondary">3</button>
    <button type="button" class="btn btn-outline-secondary">4</button>
  </div>
  <div class="input-group">
    <div class="input-group-text" id="btnGroupAddon2">@</div>
    <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2">
  </div>
</div>
```

### flexbox排版

`.btn-group`,  `.btn-toolbar` 也是 flex 結構 ,所以使用時不用另外加d-flex

```html
<div class="demo">
  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group me-2" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary">1</button>
      <button type="button" class="btn btn-outline-secondary">2</button>
      <button type="button" class="btn btn-outline-secondary">3</button>
      <button type="button" class="btn btn-outline-secondary">4</button>
    </div>
    <div class="input-group">
      <div class="input-group-text" id="btnGroupAddon">@</div>
      <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
    </div>
  </div>
  <!-- .btn-toolbar 也是 flex 結構，可以使用 flex 語法進行對齊調整 -->
  <div class="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
    <div class="btn-group" role="group" aria-label="First group">
      <button type="button" class="btn btn-outline-secondary">1</button>
      <button type="button" class="btn btn-outline-secondary">2</button>
      <button type="button" class="btn btn-outline-secondary">3</button>
      <button type="button" class="btn btn-outline-secondary">4</button>
    </div>
    <div class="input-group">
      <div class="input-group-text" id="btnGroupAddon2">@</div>
      <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon2">
    </div>
  </div>
</div>
```

## Cards **卡片 `.card`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/card/) 、 [英文](https://getbootstrap.com/docs/5.1/components/card/)**

### 特性介紹 `.card`

**功能:** **卡片**是一個有彈性且可擴展的內容容器。它包含了頁首和頁尾的選項、多樣化的內容、上下文的背景顏色以及強大的展示選項。是BS4後才有個功能，且取代多項BS3的功能

**內容支援的內容**: 圖片、文字、清單群組、連結

**特性**: 

1.  預設為Flexbox系統
2. 預設為沒有Margin但還是可以使用通用類別 Spacing來增加
3. 預設卡片系統為 `.w-100` 也就是會自動填滿寬度，但可以透過Sizing調整

```html
<!--外層容器放.card  -->
<div class="card" style="width: 18rem;">
<!--  圖片有其類別樣式可調整位置 .card-img-{top, bottom}  -->
  <img src="..." class="card-img-top" alt="...">
<!--  各種Card套件可搭配 ex: .card-{body, title, header, text, footer}  -->
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 卡片文字結構套件 `.card-{header, body, title, subtitile, text, link, footer}`

功能: 套件組特性，不見得必要，但對於外觀跟整體性都有絕對的加分

### 頁首頁尾 `.card-header`, `.card-footer`

功能: 可以在卡片裡以 滿寬 區塊，建立出 頁首與頁尾 區域

樣式: 預設是灰色背景，但可以調整

應用標籤: div，但若要改文字大小可以放在`h{1-6}`標籤中

```html
<!-- 卡片本是flex所建，所以可以不用加d-flex -->
<div class="card text-center">
<!--  建立頁首獨立區域 .card-header  -->
  <div class="card-header">
    Featured
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
<!-- 建立頁尾獨立區域   -->
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
```

### 文字內容區域 `.card-body`

功能: 建構內容區使用，通常內部放置 文字區，按鈕(圖片、列表可以獨立放置)

外觀: 外觀上會補上間距，整體上不會那麼緊密

```html
<div class="card">
  <div class="card-body">
    This is some text within a card body.
  </div>
</div>
```

### 文字類型套組 `.card-\{titile, subtitile, text, link\}`

功能: 會微調內容，加些間距，使距離不會這麼緊密，會比較好看

外層 會以 `**.card-body**` 包覆

- 文字標題，通常放在\<h*\>標籤中 `**.card-titile**`
- 文字副標題，通常放在\<h*\>標籤中 `**.card-subtitile**`
- 文字內容: 通常放在\<p\>標籤中 `**.card-text**`
- 連結: 通常放在\<a\>標籤中 `**.card-link**`

```html
<div class="card" style="width: 18rem;">
<!-- 外層以 .card-body包覆   -->
  <div class="card-body">
<!--  文字標題 在h*標籤上放 .card-title    -->
    <h5 class="card-title">Card title</h5>
<!--  文字副標題，在h*標籤上放 .card-subtitile    -->
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
<!-- 文字內容，在p標籤上放 .card-text   -->
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
<!--  連結，在a標籤上放 .card-link    -->
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
```

### 圖片套件與排版 `.card-img`

注意: 由於都是樣式，所以不用像btn那樣，還要多寫結構btn 才能加上btn-\{樣式\}

### 圖片套件 `.card-img`

預設圖片置於上方

```html
<div class="card mb-3">
    <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" height="270" style="object-fit: cover;" 
class="card-img" alt="...">
    <!-- object-fit: cover; 是圖片的顯示屬性 -->
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
```

### 上下放置 `.card-img-\{top, bottom\}`

圖片: 通常放在文字內容的上下方

```html
<div class="card mb-3">
<!-- 放在文字內容上方，img標籤內部 .car-img-top   -->
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <!-- 放在文字內容下方，img標籤內部 .car-img-bottom   -->
  <img src="..." class="card-img-bottom" alt="...">
</div>
```

### 圖片轉成背景效果 `.card-img-overlay` `.card-img`

在**文字區** .card-body或是文字區外層，放上. `card-img-overlay`

在圖片img上放入 `.card-img`

```html
<div class="demo">
  <!-- 注意文字顏色調整，圖片可能會使文字不清 -->
  <div class="card bg-dark text-white">
    <!-- 在圖片標籤上放入 .card-img -->
    <img src="https://images.unsplash.com/photo-1527777309916-b59323b01809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" height="270" style="object-fit: cover;" class="card-img" alt="...">
    <!-- 在文字區放上 .card-img-overlay -->
    <div class="card-body card-img-overlay">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text">Last updated 3 mins ago</p>
    </div>
  </div>
</div>
```

### 響應式水平圖片效果-格線系統 `.row`  `.col-{breakpoints}-{欄數}`

注意卡片放在格線系統 **內部**

```html
<!-- 加 .row時記得把 gutter清掉 .g-0 -->
<!-- 圖片4欄 文字8欄 -->
<div class="demo">
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <!-- 記得加上img-fluid確保圖片大小自行收縮 -->
        <img src="https://images.unsplash.com/photo-1527777309916-b59323b01809?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 加入導覽欄  `.nav-{tabs,pills}`   `.card-header-{tab,pills}`

### Tab頁簽 `.nav`  `.nav-tabs`  `.card-header-tabs`  `.nav-item`

導覽頁簽 ul標籤加 `.nav .nav-tabs` li標籤加 `.nav-item`

頁簽樣式形式，可在ul標籤上加入`.card-header-tabs` 

```html
<div class="card text-center">
  <div class="card-header">
<!-- 加入導覽頁簽   -->
<!-- ul標籤加 .nav .nav-tabs li標籤加 .nav-item-->
<!--  ul標妻可加 .card-headers-tabs    -->
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
<!--    可補上狀態 .active      -->
        <a class="nav-link active" aria-current="true" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 圓角外型頁簽 `.nav` `.nav-pills`  `.card-header-pills`  `.nav-item`

導覽頁簽 ul標籤加 `.nav .nav-pills` li標籤加 `.nav-item`

頁簽樣式形式，可在ul標籤上加入`.card-header-pills`

```html
<!-- 可用 通用的文字部分進行文字排版  -->
<div class="card text-center">
  <div class="card-header">
<!-- 加入導覽頁簽   -->
<!-- ul標籤加 .nav .nav-pills li標籤加 .nav-item-->
<!--  ul標妻可加 .card-headers-pills    -->
    <ul class="nav nav-pills card-header-pills">
      <li class="nav-item">
<!--    可補上狀態 .active      -->
        <a class="nav-link active" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
<!--    可補上狀態 .disabled      -->
        <a class="nav-link disabled">Disabled</a>
      </li>
    </ul>
  </div>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 加入列表  `.list-group`  `.list-group-item`

列表外面不需要.`card-body`包覆，同img一樣，可以獨立放在.card內容，若要區分可在上面加`.card-header`

### 同樣可以使用 `.list-group-flush` 去除表列邊框

```html
<!-- 使用.list-group-flush 去除list與卡片造成的雙重邊框 -->
<div class="demo">
  <div class="card" style="width: 18rem;">
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
  </div>
</div>
```

```html
<div class="demo">
  <div class="card" style="width: 18rem;">
    <img src="https://images.unsplash.com/photo-1580912534328-fbc00d6f7e9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=747&q=80" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <!-- .list-group 直接放在.card-body也沒關係 -->
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
</div>
```

### 藉由限制寬度調整排版 `.row` `.col`  `.w-數值` `style="width:數值"`

### 格線系統調整排版  `.row` `.col`

注意: 預設滿寬形式w-100且內容一定加在格細線統的內層

```html
<div class="demo">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
   </div>
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 通用系統調整排版 `.w-數值`

```html
<div class="demo">
  <div class="card w-50">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
  
  <div class="card w-25">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Button</a>
    </div>
  </div>
</div>
```

### 使用傳統CSS限制寬度 `style="width:數值"`

直接使用 style 限制寬度也是沒問題的

```html
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 響應式卡片排版 `.row` `.col`

使用 BS的格線系統來控制每行應該顯示多少網格欄 (用於包裝卡片)。以下面的例子來說，`**.row-cols-1`** 將卡片佈置為一欄，而 `**.row-cols-md-2**` 將會從 `md` 的斷點後開始將四個卡片設置為等寬、跨多行。

依據需求使用網格系統，將卡片包裝於欄與列之中。

- 範例
    
    ```html
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col">
        <div class="card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
    </div>
    ```
    

### 需要相等高度時，加上`.h-100`

如果需要相等高度時，把 `.h-100` 添加於卡片上。如果希望卡片預設就是等高，可以在 Sass 設置 `$card-height: 100%`。

- 範例
    
    ```html
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a short card.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="..." class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
    </div>
    ```
    

### 卡片樣式調整 (文字對齊, 卡片顏色調整 `.text-{主題色}` `.bg-{主題色}` `.border-{主題色}` )

### 文字對齊 `通用類別文字`

```html
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<div class="card text-center" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<div class="card text-end" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

### 文字, 背景顏色調整 `.text-\{主題色\}` `.bg-\{主題色\}`

也可以依照需求更改卡片頁首、頁尾的邊框，並能使用 `bg-transparent` 來移除它們的 `background-color`。

```html
<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-white bg-secondary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Secondary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Danger card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-dark bg-warning mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Warning card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-dark bg-info mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Info card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Light card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

### 邊框顏色調整 `.border-{主題色}`

設置在父層中 `.card`的位置，除了邊框顏色外，`.text-{主題色}` 可以放在父層或各別文字標籤中

```html
<div class="card border-primary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body text-primary">
    <h5 class="card-title">Primary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card border-secondary mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body text-secondary">
    <h5 class="card-title">Secondary card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body text-success">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
```

### 卡片群組 `.card-group`

卡片群組後，各別卡片內側不會保留圓角

注意: 卡片群組是不支援響應式的

- 範例
    
    ```html
    <div class="card-group">
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
    ```
    

### 加上頁尾讓頁尾內容對齊 `.card-footer`

- 範例
    
    ```html
    <div class="card-group">
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>
    ```
    

### Sass

## Collapse **摺疊效果** `data-bs-toggle="collapse”`  `data-bs-target=”對應內容的id”`

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/collapse/) 、 [英文](https://getbootstrap.com/docs/5.1/components/collapse/)**

### 特性介紹 `data-bs-toggle="collapse”`  `data-bs-target=”對應內容的id”`

功能: 可以讓按鈕跟容器互動已摺疊效果的方式摺疊或呈現 

注意: 基於 CSS 處理動畫的方式，你不能在帶有 `.collapse` 的元素上使用 `padding` 所以建議將它獨立視為一個元素

### **原理說明**

`.collapse` 是bs提供的套裝js功能，藉由改變class將height變成0而實現

會經過class三個階段

- `.collapse` 隱藏內容。
- `.collapsing` 會在轉換的過程中被套用。
- `.collapse.show` 顯示內容。

### 可應用的標籤及各自用法 `<button></button> <a></a>`

### 按鈕標籤 button `<button></button>`  `data-bs-toggle="collapse”` `data-bs-target=”對應內容的id”`

語意上來說較為合適，使用上要加上兩個屬性 `data-bs-toggle="collapse”`   `data-bs-target=”對應內容的id”`

```html
<p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-bs-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div>
```

### a連結標籤 `<a></a>` `data-bs-toggle="collapse”`  `href=”對應內容的id”`  `role=”button”`

語意上不適合但也能使用，使用上要加上3個屬性 `**data-bs-toggle="collapse”`   `href=”對應內容的id”` `role=”button”`**

```html
<p>
    <!-- 可在a連結上，加入 data-bs-toggle="collapse" -->
    <!-- a連結可用href來對應目標id -->
    <!-- 記得a標籤要拿來當作button功能要加 role"button" -->
    <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
      aria-controls="collapseExample">
      Link with href
    </a>
    <!-- 或在button 標籤上加入 data-bs-toggle="collapse" -->
    <!-- 並在button標籤加入 data-bs-target來對應下方id -->
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
      aria-expanded="false" aria-controls="collapseExample">
      Button with data-bs-target
    </button>
  </p>
  <div class="collapse" id="collapseExample">
    <div class="card card-body">
      Some placeholder content for the collapse component. This panel is hidden by default but revealed when the
      user activates the relevant trigger.
    </div>
  </div>
</div>
```

### 預設打開 `.collapse.show`

在摺疊內容處加上 .show 改成預設開啟內容

```html
<div class="demo">
  <p>
    <!-- 可在a連結上，加入 data-bs-toggle="collapse" -->
    <!-- a連結可用href來對應目標id -->
    <!-- 記得a標籤要拿來當作button功能要加 role"button" -->
    <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
      aria-controls="collapseExample">
      Link with href
    </a>
    <!-- 或在button 標籤上加入 data-bs-toggle="collapse" -->
    <!-- 並在button標籤加入 data-bs-target來對應下方id -->
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample"
      aria-expanded="false" aria-controls="collapseExample">
      Button with data-bs-target
    </button>
  </p>
  <!-- 在內容處加上 .show 改成預設開啟內容 -->
  <div class="collapse show" id="collapseExample">
    <div class="card card-body">
      Some placeholder content for the collapse component. This panel is hidden by default but revealed when the
      user activates the relevant trigger.
    </div>
  </div>
</div>
```

### 多目標一鍵折疊 `data-bs-target=".multi-collapse”`  `.multi-collapse`

功能: 以一個按鈕對應多組內容同時折疊或呈現

說明: id只能對應單一值，所以對應多項用class name

方法: 在按鈕處加上 `data-bs-target=".multi-collapse”` ，並在多組內容處的class加上`.multi-collapse`

### 也可以在a標籤進行

```html
<!-- a標籤內target部分修正成 href=".multi-collapse" 記得放上role="button"  -->
  <a class="btn btn-primary" type="button" data-bs-toggle="collapse" href=".multi-collapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>

<div class="row">
  <div class="col">
<!--  在需要摺疊起的多項內容加入class="multi-collapse"     -->
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
  <div class="col">
    <!--  在需要摺疊起的多項內容加入class="multi-collapse"     -->
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
</div>
```

```html
<!-- button標籤內target部分修正成 data-bs-target=".multi-collapse"   -->
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Toggle both elements</button>

<div class="row">
  <div class="col">
<!--  在需要摺疊起的多項內容加入class="multi-collapse"     -->
    <div class="collapse multi-collapse" id="multiCollapseExample1">
      <div class="card card-body">
        Some placeholder content for the first collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
  <div class="col">
    <!--  在需要摺疊起的多項內容加入class="multi-collapse"     -->
    <div class="collapse multi-collapse" id="multiCollapseExample2">
      <div class="card card-body">
        Some placeholder content for the second collapse component of this multi-collapse example. This panel is hidden by default but revealed when the user activates the relevant trigger.
      </div>
    </div>
  </div>
</div>
```

### 改成水平折疊 `.collapse-horizontal`  `width`

Collapse 也支持水平折疊。添加 `.collapse-horizontal` 類別來轉換 `width` 而不是 `height`，並在子元素上設定 `width`。隨意撰寫你自己的自定義 Sass、使用行內樣式或是我們的 [width 通用類別](https://bootstrap5.hexschool.com/docs/5.1/utilities/sizing/).

```html
<p>
<!-- button處一樣加入 data-bs-toggle="collapse" data-bs-target="對應id名"  -->
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
    Toggle width collapse
  </button>
</p>
<div style="min-height: 120px;">
<!-- 在內容處加上.collapse-horizontal (還有原本的 .collapse)   -->
  <div class="collapse collapse-horizontal" id="collapseWidthExample">
<!-- 記得在內容的子元素上設定寬度     -->
    <div class="card card-body" style="width: 300px;">
      This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
    </div>
  </div>
</div>
```

### Sass

## Modal **互動視窗 `.modal` `.modal-dialog`  `.modal-content`**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/components/modal/) 、 [英文](https://getbootstrap.com/docs/5.1/components/modal/)**

功能: 利用BS JS的互動視窗模組來新增一個提示視窗，常用於用戶提示、燈箱、或自訂內容

### 特性介紹 **`.modal` `.modal-dialog`  `.modal-content`**

- 點擊互動視窗背景色backdrop(就是點選互動視窗的背景) 預設是關閉互動視窗
- BS只支援1次1個互動視窗(巢狀互動視窗體驗不佳)

### 結構

### **先確定觸發開啟方式 `data-bs-toggle="modal"`   `data-bs-target="id"`**

- **常用按鈕button開啟標籤   `data-bs-toggle="modal" data-bs-target="id"`**
- **若使用在a開啟標籤 `data-bs-toggle="modal" href="id"`**

### Modal BS套件容器結構 (細節調整參考下方完整範例)

**最外層: 容器上放 `.modal`**

**第二層: 放置對話框容器 `.modal-dialog`**

**第三層: 互動內容容器 `.modal-content`** 

**第四層:  `.modal-header`  `.modal-body`  `.modal-footer`  到這才開始放置內容**

**內容設置:** 

Modal 文字標題設置: 在`h*`標籤內使用 `.modal-titile`

刪除按鈕標籤，需放置屬性: `data-bs-dismiss="modal"`  但不需要`**data-bs-toggle="modal"**`

### **完整範例**

功能: 通過點擊按鈕切換動態視窗呈現。它將從頁面頂部向下滑動並淡入。

```html
<!-- Button trigger modal -->
<!-- 觸發方式，按鈕 -->
<!-- data-bs-toggle="modal" data-bs-target="id" -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<!-- 外層容器放入 .modal ，要加id-->
<!-- .fade是呈現與關閉的效果 -->
<!-- tanindex="-1"避免使用者按tab選取 -->
<!-- aria-hiddn="true"預設關閉 -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<!--  第二層 對話框容器 .modal-dialog  -->
  <div class="modal-dialog">
<!--  第三層 互動內容容器 .modal-content   -->
    <div class="modal-content">
<!--   第四層 .modal-header     -->
      <div class="modal-header">
<!--   標題可在h標籤用 .modal-title       -->
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
<!--    刪除按鈕記得加 data-bs-dismiss="modal"      -->
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
<!--   第四層 .modal-body     -->
      <div class="modal-body">
        ...
      </div>
<!--   第四層 .modal-footer     -->
      <div class="modal-footer">
<!--    刪除按鈕記得加 data-bs-dismiss="modal"      -->
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

### 靜態背景(更改backdrop預設) `data-bs-backdrop="static"`

當將背景設置為靜態時，互動視窗不會因為點擊背景而關閉。

**在外層容器 `.modal` 加上 `data-bs-backdrop="static"`**

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<!-- 在外層.modal 加上data-bs-backdrop="static"-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
```

### 添加滾動軸功能 `.modal-dialog-scrollable`

使用時機: 當使用者的動態視窗變得太長時，有時會超出頁面

功能: 加入滾動軸效果

**方法: 在 `.modal-dialog` 中加入 `.modal-dialog-scrollable`**

```html
<div class="demo">
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scrollModal">
    Launch demo modal
  </button>
  <div class="modal fade" id="scrollModal" tabindex="-1" aria-labelledby="scrollModalLabel" aria-hidden="true">
   
 <!-- 在 .modal-dialog 容器內添加 modal-dialog-scrollable  -->
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="scrollModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p style="min-height: 1500px;">
          This is some placeholder content to show the scrolling behavior for modals. We use repeated line breaks to demonstrate how content can exceed minimum inner height, thereby showing inner scrolling. When content becomes longer than the prefedined max-height of modal, content will be cropped and scrollable within the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 垂直置中視窗  `.modal-dialog-centered`

原BS預設是放置上方，但也可以改成將互動視窗置中

**方法: 在 `.modal-dialog` 中加入 `.modal-dialog-centered`**

```html
div class="demo">
  <!-- Vertically centered modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#centerModal">
    Vertically centered modal
  </button>
  <div class="modal fade" id="centerModal" tabindex="-1" aria-labelledby="centerModalLabel" aria-hidden="true">
    
		<!-- 在.modal-dialog 加入 .modal-dialog-centered-->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="centerModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
```

### 加入 彈出提示框 或 工具提示 `.popover-text`  `.tooltip-test`

可以根據需要放置在動態視窗。 當動態視窗關閉時，其中的任何工具提示和插件也將自動關閉。

```html
<div class="modal-body">
  <h5>Popover in a modal</h5>
<!--  加入彈出提示框 在button標籤內加入.popover-text與屬性 data-bs-content="提示內容  -->
  <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
  <hr>
  
  
  <h5>Tooltips in a modal</h5>
<!--  加入工具提示，加入.tooltip-test   -->
  <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> have tooltips on hover.</p>
  
  
</div>
```

### 限制視窗大小 `.modal-{sm, lg, xl}`

功能: 可以調整視窗呈現的 最大度寬度，在寬度以下會自動調整(有響應式功能)

注意: 預設的互動視窗沒有 “medium” 這個類別的大小

方法: 在`.modal-dialog` 加上 `.modal-{sm, lg, xl}`

- **大小對照表**
    
    對照表（原始 CSV 待重新整理）
    

```html
<!-- Extra large modal -->
  <div class="modal fade" id="xlSizeModal" tabindex="-1" aria-labelledby="xlSizeModalLabel" aria-hidden="true">
    <!-- 在modal-dialog加入 modal-{size} -->
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="xlSizeModalLabel">Extra large modal</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          ...
        </div>
      </div>
    </div>
  </div>
</div>
```

### 滿版互動視窗 `.modal-fullscreen`

功能: 跳出一個完全覆蓋用戶螢幕的互動視窗，本身是全寬度響應式

方法: 在`.modal-dialog` 加上 `.modal-fullscreen`

### 限制寬度呈現的滿版互動視窗  `.modal-fullscreen-{sm, lg, xl}-down`

功能: 在特定寬度下才運行滿版

方法: 在`.modal-dialog` 加上 `.modal-fullscreen-{sm, lg, xl}-down`

```html
<!-- Full screen -->
  <!-- 在.modal-dialog 加上 .modal-fullscreen 製作滿版 modal -->
  <div class="modal fade" id="fullModal" tabindex="-1" aria-labelledby="fullModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="fullModalLabel">Full screen</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Full screen below .. -->
  <div class="modal fade" id="fullsmdownModal" tabindex="-1" aria-labelledby="fullsmdownModal" aria-hidden="true">
    <!-- 使用 modal-fullscreen-{中斷點}-down 在特定寬度下才運行滿版 -->
    <div class="modal-dialog modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="fullsmdownModal">Full screen below sm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 切換多個視窗效果 `在按鈕刪除屬性加上開始屬性對應下頁id`

功能: 在多個單獨的互動視窗之間切換

常見應用: 從已經打開的登錄視窗中切換為重新設定密碼的視窗

方法: 在到下一個視窗的按鈕標籤上 加原本的刪除屬性外 在加上開啟按鈕的屬性對應第二視窗的id

**請注意不能同時打開多個互動視窗**

```html
<div class="demo">
  <!-- 按鈕標籤 對應第一個呈現的視窗id -->
  <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open first modal</a>
</div>
<!-- 對應第一個呈現的視窗 -->
<div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Modal 1</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Show a second modal and hide this one with the button below.
      </div>
      <div class="modal-footer">
        <!-- 在button標籤加入關閉屬性 data-bs-dismiss="modal"關閉第一個視窗 並加入開啟按鈕屬性 data-bs-target="第二個是窗的id" data-bs-toggle="modal"  -->
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
      </div>
    </div>
  </div>
</div>
<!-- 對應第二個呈現的視窗 -->
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Hide this modal and show the first with the button below.
      </div>
      <div class="modal-footer">
         <!-- 在button標籤加入關閉屬性 data-bs-dismiss="modal"關閉第一個視窗 並加入開啟按鈕屬性 data-bs-target="第一個視窗的id" data-bs-toggle="modal"  -->
        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
      </div>
    </div>
  </div>
</div>
```

### 多個內容及多個按鈕，但同個視窗 作法

### JS可互動選項作法

說明: 都要載入CND

### 資料屬性直接調用 `data-bs-{toggle, target, dismiss}`

說明: 都要載入CDN，透過資料屬性(data-bs)可以直接調用功能外，資料屬性也可以調用物件Modal選項(options)，其它(Modal的 methos, event)則要用原生JS搭配載入

### 啟動與指定 `data-bs-{toggle, target}`

說明: 在啟動標籤上(如:按鈕, a標籤)，設定`data-bs-toggle=”modal”` 以及`data-bs-target=”指定id”`

```html
<button type="button" data-bs-toggle="modal" data-bs-target="#myModal">Launch modal</button>
```

### 移除 `data-bs-{dismiss, target}`

按鈕在該視窗modal內，只需在該按鈕上加上`data-bs-dismiss`

```html
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
```

若按鈕在目標視窗外，除了 `data-bs-dismiss` 還要加上 `data-bs-target`

```html
<button type="button" class="btn-close" data-bs-dismiss="modal" data-bs-target="#my-modal" aria-label="Close"></button>
```

### Modal 選項options  `data-bs -{backdrop, keyboard, focus}`

### 資料屬性的Option列表

data-bs-（原始 CSV 待重新整理）

說明: 可以透過資料屬性或 JavaScript 傳遞選項。對於資料屬性，將選項名稱附加到 `data-bs`，如 `data-bs-backdrop=""`

方法: 加在 .modal 的容器上，原預設都是”true” 

- `**data-bs-backdrop={”true”, “false”, static}**`
    - true :預設，點擊背景可關閉
    - false: 無背景，點擊背景也不會關閉
    - static: 有背景，點擊背景不會關閉
    - 範例
        
        ```html
        <div class="modal fade" id="exampleModal" tabindex="-1"  data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ```
        
- `**data-bs-keyboard={”true”, “false”}**`
    - true :預設，點擊ESC會關閉
    - false: 點擊ESC不會關閉
- `**data-bs-focus={”true”, “false”}**`
    - true :預設
    - false

### 搭配原生JS使用 `Option, method, events`

說明  都要載入CND，JS原生寫法搭配載入的有 Modal options, method, event

### 改變選項預設-BS物件實體化時執行

**創建新物件**: 在new創建新物件，賦予目標Dom元素 boostrap.Modal功能 (若有需要修改的選項option功能可同時放入)

**技巧: 建議選項options直接使用 data-bs-屬性調整，method 再用 new創立新物件使用**

```jsx
var myModal = new bootstrap.Modal(document.getElementById('目標Modal id'), options)
```

- **資料屬性的Option列表**
    
    data-bs-（原始 CSV 待重新整理）
    

範例:

```jsx
var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
  keyboard: false
})
```

### 使用BS的物件Modal method  `新物件.method()`

**先將BS物件實體化(創建新物件)，**在new創建新物件，賦予目標Dom元素 boostrap.Modal功能，直接以子物件函式的方式執行method

**注意: 方法dispose所有元素皆能使用的方法，可以卸載JS功能**

- 範例:
    
    ```html
    <!-- Button trigger modal -->
      <!-- 新增案鈕功能 -->
      <button type="button" class="btn btn-primary" id="btnForModal">
        Launch demo modal
      </button>
    <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1"   aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <!-- 不要忘記加入 data-bs-dismiss="modal" -->
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
                   <!-- 不要忘記加入 data-bs-dismiss="modal" -->
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    ```
    
    JS區域
    
    ```jsx
    const modal = document.querySelector('#exampleModal'); // Modal
      const btn = document.querySelector('#btnForModal'); // 開啟 Modal 按鈕
    //  建立modal實體，說明: 賦予BS功能給新物件
    const bsModal= new bootstrap.Modal(modal, {});
    // 在按鈕建立觸發方式以及執行方法
    btn.addEventListener("click", (e)=>{
      bsModal.toggle();
    });
    ```
    

```jsx
var myModal = new bootstrap.Modal(document.getElementById('目標Modal id'), options)
myModal.method()
```

<aside>
💡 技巧: 可以寫console.log(新物件名)，在Devop tool中的conosole頁面，點擊呈現出的Madal下面的propotype可以看到可以應用的methods

</aside>

Methods比如: toggle切換視窗、show顯示視窗、hide隱藏視窗、dispose銷毀視窗...(其它的待整理)

### 使用BS的物件Modal Events

BS有提供該元件Modal的監視事件能觸發使用

- 可用Modal事件列表
    
    Modal 可用事件（原始 CSV 待重新整理）
    

```jsx
const myModalEl = document.querySelector('目標id名')
myModalEl.addEventListener('Modal事件', function (event) {
  // do something...
})
```

- 範例
    
    ```jsx
    
    ```
    

## **Accordion 手風琴**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/text-truncation/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/text-truncation/)**

## **Accordion 手風琴**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/text-truncation/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/text-truncation/)**

## **Accordion 手風琴**

### **官網介紹連結: [中文](https://bootstrap5.hexschool.com/docs/5.1/helpers/text-truncation/) 、 [英文](https://getbootstrap.com/docs/5.1/helpers/text-truncation/)**

# HTML form表單 `<form></form>`

**參考自 [Fooish HTML介紹](https://www.fooish.com/html/form.html)**

### 範例

```html
<!-- 表單結構範例 外層用<form></form>標籤 -->
<form>
<!-- <fieldset></fieldset> 將表單內元件分組  -->
  <fieldset>
<!--   <legend></legend> 表單內群組元件明   -->
    <legend>Personal details</legend>
<!--   <label></label>標籤，在這裡是對應input 通常還會有for="id"對應  -->
    <label>Your name:</label> <input name="yourname">
    <label>Your age:</label> <input type="number" name="yourage">
  </fieldset>

  <fieldset>
    <legend>Your address</legend>
    <label>Street:</label> <input name="street">
    <label>Zip code / post code:</label> <input name="postcode">
  </fieldset>
</form>
```

**功能**: 用來讓使用者輸入資料，這些資料可以用來和使用者互動，例如表單內容填完後可以傳回遠端伺服器 (web server)

## form標籤屬性 Attribute `<form> </form>`

### **送出地址     `action=”URL”`**

功能:  當 user 按送出表單後，要將表格的內容送去指定位址 (URL) 。

範例:

```html
<form action="/formprocess.php" method="post">
  
  <!-- ....表單 HTMLs .... -->
  
</form>
```

### HTTP傳輸協議方法 `method=”{get, post...etc.}”`

1.  `get` : 通常是用來請求伺服器端資料，通常用在資料量較小或非敏感的資料，但因為資料會被放在 **網址** 中直接傳出，容易被直接看到資料。
2. `post`: 通常拿來傳送表單填寫資料，會將表單資料放在 HTTP 傳輸封包 body 中送出。post 通常用在表單資料量比較大、有夾帶檔案上傳 (file upload) 或隱私性考量的資料。

範例

```html
<form action="/formprocess.php" method="post">
  
  <!-- ....表單 HTMLs .... -->
  
</form>
```

### 共通屬性

所有的 HTML 表單元素都有下面這些常見的共通屬性

### **`name` 屬性**

指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值

```html
<input type="text" name="foo">
```

### **`autofocus` 屬性**

**設定當頁面載入後，將游標直接聚焦在該元素，是一個布林 (boolean) 屬性**

```html
<input type="text" autofocus>
```

### **`disabled` 屬性**

用來禁用該表單元素，是一個布林 (boolean) 屬性

```html
<input type="button" value="按鈕" disabled>
```

### **`value` 屬性**

指定表單元素的初始值 (default value)

```html
<input type="text" value="我的預設值">
```

## 常見放在表單的元素

## 表單控制 元件分組 **`\<fieldset\>\</fieldset\> , \<legend\>\</legend\>`**

- \<fieldset\> 標籤 (tag): 對[表單 (form)](https://www.fooish.com/html/form.html) 中的控制元件做分組 (group)
- \<legend\> 標籤: 通常是 \<fieldset\> 裡面作為該分組的標題(caption)。

範例

```html
<form>
  <fieldset>
    <legend>Personal details</legend>
    <label>Your name:</label> <input name="yourname">
    <label>Your age:</label> <input type="number" name="yourage">
  </fieldset>

  <fieldset>
    <legend>Your address</legend>
    <label>Street:</label> <input name="street">
    <label>Zip code / post code:</label> <input name="postcode">
  </fieldset>
</form>
```

## 輸入欄位`<input>`

### **功能與注意事項**

功能: 最常用的標籤，有許多不同的功能，根據`type`屬性區分

1.  **注意:** 要放對type屬性，因為呈現的功能與格式都不同
2. **注意:** \<input\> 是個[空元素](https://www.fooish.com/html/tag.html#empty-void-element)不需要 closing tag
3. 默認屬性為 `type=”text”`

### 屬性(attributes)

### **type屬性**

### **所有type屬性介紹**

[MDN介紹連結](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input)

- **text 文字輸入欄位 `<input type="text">`**
- **passoword 密碼輸入欄位 (不以明碼顯示) `<input type="password">`**
- **placeholder 提示訊息(會以淡色顯示於表格) `<input placeholder="請輸入帳號">`**
- **checkbox 核取方塊(可多選) `<input type="checkbox">`**
    - 功能: 讓使用者勾選某個選項是否成立，可以再搭配 `value` 屬性 (預設值是 "on") 來指定當使用者勾選此方塊時要傳送給遠端伺服器什麼值。
    - name: 可以一樣也可以不一樣
    - 有預設勾選功能 **`checked`**
    
    ```html
    <input type="checkbox" name="subscribe" value="html-newsletter"> Subscribe to HTML newsletter?<br>
    <input type="checkbox" name="subscribe" value="js-newsletter"> Subscribe to JavaScript newsletter?
    
    <input type="checkbox" checked> Subscribe to newsletter?
    ```
    
- **radio 選項方塊(只能單選) `<input type="radio">`**
    - 功能: 用來處理表單中有多選一時的情況，搭配 `value` 屬性 (預設值是 "on") 來指定當使用者選取此選項時要傳送給遠端伺服器什麼值。
    - 同一組選項，name要一樣
    - 有預設勾選功能 `checked`
    
    ```html
    <input type="radio" name="color" value="red"> red<br>
    <input type="radio" name="color" value="green"> green<br>
    <input type="radio" name="color" value="blue"> blue
    
    <input type="radio" name="color" value="blue" checked> blue
    
    ```
    
- **reset 重設表單 `<input type="reset" >`**
    
    功能: 讓使用者點了可以重設表單內容回到初始狀態，而 `value` 屬性可以設定 reset 按鈕的名稱。
    
    ```html
    <input type="reset" value="Reset">
    ```
    
- **hidden 隱藏表單 `<input type="hidden">`**
    
    功能: 想傳送一些值回遠端 server，但你不想或不需要讓使用者看見這些內容。
    
    ```html
    <input name="itemid" type="hidden" value="fwoxla">
    ```
    
- **submit 表單送出鈕 `<input type="submit">`**
    
    功能: 會送出表單給遠端的伺服器，用 `value` 屬性可以設定按鈕名稱。
    
    ```html
    <input type="submit" value="Send Request">
    ```
    
- **image 圖片送出鈕 `<input type="image">`**
    
    送出按鈕除了可以用前面提到的文字按鈕，也可以是圖片按鈕
    
    - 可以搭配圖片屬性
        - `src`: 指定圖片位址
        - `alt`: 指定當圖片下載失敗時的替代文字
        - `width`: 指定圖片顯示寬度
        - `height`: 指定圖片顯示高度
    
    範例
    
    ```html
    <input type="image"
           src="/media/examples/login-button.png"
           alt="Login"
           width="100" height="30">
    ```
    
- **file 檔案上傳 `<input type="file">`**
    
    功能: 讓使用者可以從本機端選擇檔案上傳
    
    - 屬性`accept`
        
        功能: 設定可接受的上傳檔案類型
        
        - `.檔案類型`: 例如 `.jpg`, `.pdf`, `.doc`
        - 明確指定 MIME type: 例如 `image/jpeg`, `image/png`
        - `audio/*`: 指任何聲音檔
        - `video/*`: 指任何影片檔
        - `image/*`: 指任何圖檔
    - 屬性 `multiple`
        
        功能: 可以接受同時多個檔案一次上傳
        
        ```html
        <input type="file" accept="image/*,.pdf" multiple>
        ```
        
    - 屬性 `capture`
        
        功能: 可以用來開啟使用手機的照相機鏡頭
        
        範例
        
        ```html
        <input type="file" capture>
        ```
        
        - 屬性值 前鏡頭  `user`  後鏡頭 `environment`
            
            功能: 還可以指定要開啟手機的前鏡頭或後鏡頭，設定 capture 的屬性值
            
            ```html
            front (user) - 前鏡頭
            <input type="file" accept="video/*" capture="user">
            
            back (environment) - 後鏡頭
            <input type="file" accept="video/*" capture="environment">
            ```
            
    
    範例
    
    ```html
    <input type="file" accept="image/*,.pdf">
    ```
    
- **button 表單按鈕  `<input type="button">`**
    
    功能: 通常用來搭配 [JavaScript](https://www.fooish.com/javascript/) 來動態操作表單內容。
    
    ```html
    <input type="button" value="Click Me">
    ```
    
- **search 搜尋欄位 `<input type="search">`**
    
    功能: 在語意上更明確，有些瀏覽器可能也會針對搜尋框顯示不同的樣式。
    
    ```html
    <input type="search" name="q">
    ```
    
- **tel 電話輸入欄 `<input type="tel">`**
    
    功能: 特定的 device 像是手機上會顯示針對電話號碼輸入的界面。
    
    ```html
    <input type="tel">
    ```
    
- **url 網址輸入欄位 `<input type="url">`**
    
    功能: 語意上更明確，且在送出表單之前，有支援的瀏覽器也會自動驗證 (validate) 使用者輸入的內容是不是合法的 URL。
    
    ```html
    <input type="url">
    ```
    
- **email 電子郵件輸入欄 `<input type="email">`**
    
    功能: 語意上更明確，且在送出表單之前，有支援的瀏覽器也會自動驗證 (validate) 使用者輸入的內容是不是合法的 email。
    
    - 屬性 `multiple`
        
        可以用逗號 `,` 分開輸入多組 email
        
        ```html
        <input type="email" multiple>
        ```
        
    
    ```html
    <input type="email">
    ```
    
- **date 日期輸入欄位 `<input type="date">`**
    
    功能: 日期的格式為 `yyyy-mm-dd`。
    
    屬性 `max` 可以輸入的最晚日期
    
    屬性 `min` 可以輸入的最早日期
    
    屬性 `step`  設定一個數字，用來控制日期元件一次跳動的幅度
    
    ```html
    <input type="date"
           value="2020-04-20"
           min="2020-04-01"
           max="2022-04-30"
           step="5">
    ```
    
- **time 時間輸入欄位 `<input type="time">`**
    
    功能:時間的格式為 24 小時制的 `hh:mm`
    
    屬性 `max` 可以輸入的最晚時間
    
    屬性 `min` 可以輸入的最早時間
    
    屬性 `step`  設定一個數字，用來控制時間元件一次跳動的幅度
    
    ```html
    <input type="time"
           value="06:00"
           min="02:00"
           max="22:00"
           step="5">
    ```
    
- **number 數字輸入欄位 `<input type="number">`**
    
    功能:數字輸入欄位只允許輸入數字
    
    屬性 `max` 可以輸入的最大值
    
    屬性 `min` 可以輸入的最小值
    
    屬性 `step`  設定一個數字，用來控制數字元件一次跳動的幅度
    
    ```html
    <input type="number"
           step="10"
           min="0"
           max="1000">
    ```
    
- **range 數字範圍滑動 `<input type="range">`**
    
    功能:讓使用者用滑動的方式在一個數字區間內選擇出一個值，可以應用在對數字精準度要求不高的場景，像是調整音量大小。
    
    屬性 `max` 可以輸入的最大值
    
    屬性 `min` 可以輸入的最小值
    
    屬性 `step`  設定一個數字，用來控制數字元件一次跳動的幅度
    
    ```html
    <input type="range" min="-10" max="10">
    ```
    
- **color 顏色選擇器 `<input type="color">`**
    
    功能: 讓使用者挑選顏色，顏色的格式為 `#rrggbb`。
    
    ```html
    <input type="color" value="#ff0000">
    ```
    

### pattern屬性 表格欄位驗證  `<input pattern="正規表達式">`

適用對象 type的: text, date, search, url, tel, email , password

方式: 輸入欄位可以利用 `pattern` 屬性搭配[正規表達式 (regular expression)](https://www.fooish.com/javascript/regexp/) 來做表單欄位驗證

功能: 使用者輸入的內容不符合 pattern，在表單送出去之前就會被瀏覽器驗證錯誤而擋下。

```html
<input type="text" pattern="[a-z]{4,8}">

<input type="time" pattern="[0-9]{2}:[0-9]{2}">

<input type="email" pattern=".+@beststartupever.com">
```

### name屬性 `<input name="myfield">`

功能: 用來指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值。

### value屬性 `<input value="我的初始值">`

功能: **指定初始值 (default value)**

### required屬性 `<input required>`

功能: 必填欄位提醒

### readonly屬性 `<input value="" readonly>`

功能: 只能閱讀，可以選取不能編輯

### disabled屬性 `<input disabled>`

功能: 只能閱讀，不可選取不能編輯

### autocomplete 屬性 `<input autocomplete="on">`

功能: **是否啟用瀏覽器自動完成功能，**值有 `on` 和 `off`，預設是 on

### autofocus屬性 `<input autofocus>`

功能: 瀏覽器會自動將畫面聚焦 (focus) 在該欄位上，但要注意，整個頁面所有的表單元件中只能有一個 autofocus 而已

## **多行文字輸入欄位 `<textarea></textarea>`**

- 範例
    
    ```html
    <textarea name="mytext"
              rows="6"
              cols="40"
              required>
    我是...
    多行....
    輸入框....
    </textarea>
    ```
    

### **功能與注意事項**

功能: 建立一個可以輸入多行文字的輸入框 (multi-line textbox)。

1.  **注意:** 如果要在 textarea 中設定預設文字，不是像 \<input\> 一樣用 `value` 屬性喔，是直接將文字放在 `<textarea>內容</textarea>` 標籤之間
2. **注意:** 內容文字的換行是使用一般的文字換行符號 `\n`，不是用 [\<br\>](https://www.fooish.com/html/br-tag.html)

### 屬性(attributes)

### name屬性

功能: 用來指定送出去的該筆資料要用什麼名稱，目的是讓遠端伺服器才能透過明確定義好的名稱去取出對應的欄位值。

### rows屬性

功能: 輸入數字，設定輸入框的高度是幾行文字 (lines)，預設是 2

### cols屬性

功能: 輸入數字，設定輸入框的寬度是多少文字 (characters)，預設是 20

### maxlength 屬性

功能: 輸入數字，設定限定輸入的文字長度上限是幾個字

### minlength 屬性

功能: 輸入數字，設定限定輸入的文字長度最少是幾個字

### placeholder屬性

功能: 輸入欄位中的提示訊息

### required屬性

功能: 必填欄位提醒，是一個布林 (boolean) 屬性

### readonly屬性 `<input value="" readonly>`

功能: 只能閱讀，可以選取不能編輯，是一個布林 (boolean) 屬性

### disabled屬性 `<input disabled>`

功能: 只能閱讀，不可選取不能編輯，是一個布林 (boolean) 屬性

## 下拉式選單 `<select></select>` **`<optgroup></optgroup>` `<option></option>`**

功能: 建立下拉式選單 (dropdown menu)，讓使用者可以從一堆選項中選擇出一個或多個選項。

```html
<!-- 下拉式結構範例 外層容器用<select></select>標籤 -->

<select name="catordog">
<!-- 若有分組選項(非必要)<optgroup></optgroup>標籤 -->
  <optgroup label="Cats">
<!-- 選項標籤<option></option>標籤 -->
    <option>Tiger</option>
    <option>Leopard</option>
    <option>Lynx</option>
  </optgroup>
  <optgroup label="Dogs">
    <option>Grey Wolf</option>
    <option>Red Fox</option>
    <option>Fennec</option>
  </optgroup>
</select>
```

### 選單容器屬性 `<select></select>`

- `name`: 聲明欄位名稱
- `disabled`: 將欄位設定為禁用的狀態，是一個布林 (boolean) 屬性
- `required`: 將欄位設定為必填，是一個布林 (boolean) 屬性

### **選單中的選項屬性 `<option></option>`**

- `value`: 指定如果選了該選項，表單要傳送什麼值給遠端伺服器，如果沒設定 value，預設是送 \<option\> 的內容
- `selected`: 設定預先選取此選項，是一個布林屬性
- `label`: 說明選項的含義，有設定時會被瀏覽器顯示為選項內容，通常用來當做簡短版的選項文字
- `disabled`: 將選項設定為不可選的狀態，是一個布林 (boolean) 屬性

### 多選選單的屬性 `multiple` `size=”4”`

功能: multiple 用來設定該選單中的選項可以被多選。

```html
<select name="cars" multiple>
  <option value="volvo">Volvo</option>
  <option value="bmw">BMW</option>
  <option value="saab">Saab</option>
  <option value="benz">Benz</option>
  <option value="audi">Audi</option>
</select>
```

`size` 屬性: 指定一次讓使用者看到幾個選項，預設值是 1；但如果有設定 multiple 時，預設值則是 4。

```html
<select name="cars" multiple size="5">
  <option value="volvo">Volvo</option>
  <option value="bmw">BMW</option>
  <option value="saab">Saab</option>
  <option value="benz">Benz</option>
  <option value="audi">Audi</option>
</select>
```

## **內嵌框架 (Inline Frame) `<iframe></iframe>`**

功能: 用來在一個 HTML 網頁裡面嵌入另外一個 HTML 網頁

[HTML 內嵌框架 Inline Frame - HTML 語法教學 Tutorial](https://www.fooish.com/html/iframe-tag.html)
