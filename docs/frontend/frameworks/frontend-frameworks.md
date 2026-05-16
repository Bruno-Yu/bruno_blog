---
title: 初探前端框架
description: 前端 js 框架這麼多，要怎麼挑呢？還是先看看數據吧！
tags: ['前端', 'Vue', 'React', 'Svelet']
date: 2023-05-05
type: doc
publish: true
---
# 初探前端框架



## **選題目的**

---

- 想了解目前受歡迎的前端框架有哪些及其對應的優劣
- 希望藉此分析 & 聚焦看哪個框架在使用上較有前景，以及了解目前各前端框架的使用趨勢

## **JavaScript 框架現行狀況**

---

以下分析會基於 [State of JS](https://stateofjs.com/en-US) 這個網站 所做的 [2022](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) 年調查報告出發，進行概況總覽與進一步延伸分析

( 2022 年的 "State of JavaScript" 的報告是由 Sacha Greif.以及 Eric Burel 參照了 39,472 位專業的開源項目開發者專業意見的調查結果 )

"State of JavaScript"它是一個由JavaScript社群推動的年度調查，旨在評估開發者對JavaScript語言、框架、工具和相關技術的看法和使用情況。其每年都會發布一次，以收集開發者社群的反饋和洞察。

調查的主要目的是了解JavaScript生態系統的動態，並追蹤JavaScript開發者對不同技術的態度。調查包括各種主題，例如最流行的JavaScript框架、庫、測試工具、前端技術，以及開發者的喜好和經驗。

其每份調查通常包括數千名全球開發者的參與，總的來說，State of JavaScript 是一個有助於JavaScript開發者了解行業趨勢並分享他們的觀點的重要報告，並為整個JavaScript生態系統提供了有價值的洞察。

---

而 [the state of js 2022 Front-end Frameworks report](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) 這份報告則是以以下四個衡量點進行各框架的評比

- **Retention ( 留存率** )
    - 意旨: 在使用過的該框架的使用者中，表達使用後會持續使用該框架的人數比例
    - 公式: 會再次使用 / (會再次使用+ 不再次使用)
- **Awareness ( 知名度** )
    - 意旨: 在所有參與調查者中，有多少有聽過該框架的比例
    - 公式: (所有參與者-沒聽過的參與者) / 所有參與者
- **Usage ( 使用率 )**
    - 意旨: 在參與調查的人中，有使用過此框架的人數比例
    - 公式: (會再次使用+ 不再次使用) / 所有參與者
- **Interest ( 有興趣 )**
    - 意旨: 在所有知道此框架的調查者中，有興趣使用&學習此技術的比例
    - 公式: 想學習者 / ( 想學習者 + 沒興趣者 )

接下來我們依據這四個評量點個別評選出的前五名框架看是否有交集，讓我們更能聚焦&收縮範圍，選出最有潛力進一步研究的框架技術

### Retention ( 留存率 )

取前五名個別是:  Solid(91%)、Svelte(90%)、Qwik(85%)、React(83%)、Vue(77%)

![https://i.imgur.com/ihqIqPZ.png](https://i.imgur.com/ihqIqPZ.png)

### Awareness ( 知名度 )

取前五名個別是:  React(100%)、Angular(100%)、Vue(100%)、Svelte(94%)、Ember(77%)

![https://i.imgur.com/maPmJWy.png](https://i.imgur.com/maPmJWy.png)

### Usage ( 知名度 )

取前五名個別是:  React(82%)、Angular(49%)、Vue(46%)、Svelte(21%)、Preact(13%)

![https://i.imgur.com/WWY4URv.png](https://i.imgur.com/WWY4URv.png)

### Interest ( 有興趣 )

取前五名個別是: Svelte(70%)、Qwik(67%)、 Solid(66%)、Vue(51%)、React(47%)

![https://i.imgur.com/OZbxhC1.png](https://i.imgur.com/OZbxhC1.png)

### 在各自的前五名中，同時符合 Retention ( 留存率 )、Awareness ( 知名度 )、Usage ( 知名度 )、Interest ( 有興趣 ) 的框架為 React、Vue、Svelte

接下來的介紹就會聚焦在這三個框架進行比較與分析

## **在 npm trend & Github 的數據觀察及其著名網站**

---

接下來我們針對這三個框架在 [npm trend](https://npmtrends.com/react-vs-svelte-vs-vue)  以及 Github 上進行進一步的比較與觀察

"NPM Trends" 是一個用於跟蹤 JavaScript 庫和框架在 npm（Node Package Manager）上的下載和使用趨勢的在線工具。它提供了有關特定 npm 庫或框架的關鍵指標，例如每日、每週、每月的下載數，以幫助開發者了解該項目的受歡迎程度和趨勢。

---

### NPM Trend ( [in past 2 years](https://npmtrends.com/react-vs-svelte-vs-vue) )

從下圖可以看出兩個結論

1. 下載數 React > Vue > Svelte => 從數字來看 React 的下載數為 5.47 倍的 Vue 等於 14.66 倍的 Svelte

2. 星星數 React > Svelte > Vue => 從數字上來看 React 的星星數是 3.06 倍的 Svelte 等於 5.56 倍的 Vue

但 React 是 2013 發明的; Vue 是 2014; 而 Svelte 是 2016，從這邊可以看出來 Svelte 是相對 React、Vue 還晚創建的框架，但其星星數(滿意度)卻已然大於 Vue 了

總的來說 React 可以說是下載數與星星數最多的框架，但 Svelte 亦是非常有潛力的後起之秀

![https://i.imgur.com/djurO3t.png](https://i.imgur.com/djurO3t.png)

### Github

直接在 Github 上搜索這三大框架

( 數據取自 2023 年4月份的  Github 數據)

|  | React | Vue.js | Svelte |
| --- | --- | --- | --- |
| Repo. | 3M+ | 123K | 48K |
| Code | 50.5M | 7M | 1.6M |
| Commits | 15M | 227K | 324K |
| Discussions | 47K | 2K | 3K |

其中關鍵字搜索不管在 Repo、code、Commits 中皆是 React >> Vue > Svelte

其中 Discussion 也可以當作活躍度的參考，而這點 Svelte 被提及的次數還高於 Vue，呈現 React >> Svelte > Vue

### 使用這三個框架技術做的著名網站如下

| 框架 | 著名網站 |
| --- | --- |
| React | Facebook , Instagram, Pinterest, Netflix, Twitter |
| Vue.js | Behance, GitLab, Trivago, Statista, 9CAG |
| Svelte | GoDaddy, Rakuten, The NewYork Times |

## **React, vue, svelte 三大框架的特點比較**

---

框架特點比較表

| 框架名稱 | 發明時間 | 概念 | 學習難度 | 線上資源 | 特性 |
| --- | --- | --- | --- | --- | --- |
| Svelte | 2016 | 編譯時框架 
( compiler Framework ) | 學習曲線相對較低 | 文檔資源還不夠豐富，但有很多社區維護的資源 | 編譯時框架、小巧的體積、較好的性能、自動化 DOM 操作 |
| Vue | 2014 | MVVM 框架 | 學習曲線相對較低，容易入門 | 豐富的官方文檔和社區資源 | 響應式數據、組件化開發、虛擬 DOM 技術、豐富的指令 |
| React | 2013 | 組件化框架 | 學習曲線較高，需要掌握 JSX 語法和較多的概念 | 豐富的官方文檔和社區資源 | 單向資料流、組件化開發、虛擬 DOM 技術、較好的性能 (僅專注於 UI) |

**Svelte**：

1. **編譯時框架**：Svelte 是一個編譯時框架，它在構建時將組件轉換為高效的JavaScript代碼，而不需要在運行時進行虛擬DOM操作。
2. **性能優化**：由於編譯時的特性，Svelte 在性能方面表現優越，它生成小巧的包並降低了初始載入時間。
3. **簡潔的語法**：Svelte使用簡單的模板語法，易於學習和使用。
4. **內建的狀態管理**：Svelte具有內建的狀態管理機制，使數據的管理和共享變得簡單。

**Vue**：

1. **MVVM框架**：Vue被歸類為MVVM（Model-View-ViewModel）框架，提供了雙向數據綁定和組件化開發。
2. **易學易用**：Vue的語法非常接近HTML和JavaScript，使其對初學者來說較容易學習。
3. **中規中矩的性能**：Vue使用虛擬DOM來優化性能
4. **狀態管理**：Vue提供了Vuex, Pinia等，強大的狀態管理工具，用於管理全局狀態。

**React**：

1. **組件化框架**：React是一個用於構建用戶界面的庫，它採用組件化開發方式，但它本身不是一個完整的框架。
2. **高性能**：React使用虛擬DOM（Virtual DOM）技術，以實現高效的界面更新，並且具有優異的性能。
3. **JSX語法**：React使用JSX語法，這是JavaScript的擴展，允許您在JavaScript代碼中嵌入HTML。
4. **社區支持和生態系統**：React擁有龐大的社區支持和豐富的生態系統，提供了許多第三方庫和工具。

總結來說，Svelte以其編譯時的優勢和出色的性能而脫穎而出，Vue提供了一個容易學習和使用的框架，React則以其組件化特性和龐大的生態系統而著名

### 框架寫法差異

**REACT Functional Component**

****Function Component 比 Class Component 簡潔許多，甚至少了一些艱深的語法，例如 ES6 Class、extends、constructor 以及最可怕的 this

```
function App (){
  const [count, setCount] = React.useState(0);

  function sayHi () {
    window.alert('Hello Ray.');
  }
  function handleClick() {
    setCount((prevState) => prevState += 1)
  }
  return (
    <div>
      <button type="button" onClick={ handleClick }>
        Count is: { count }
      </button>
      <hr />
      <button type="button" onClick={ sayHi }>打招呼</button>
    </div>
  )
}
const app = document.querySelector('#app');
const root = ReactDOM.createRoot(app);
root.render(<App />);
```

---

**VUE 3 COMPOSITION API**

Vue 作者也有說 Composition API 主要是受 React Hooks 的啟發，因此可以在 React 與 Vue 之間發現兩者的差異。

```
const { createApp, ref } = Vue;
 const app = createApp({
  setup() {
    const count = ref(0);
    const sayHi = () => {
      window.alert('Hello Ray.');
    };
      return {
      count,
      sayHi
    }
  },
});
app.mount('#app');
```

---

**SVELTE**

順便比較 SVELTE 的寫法，會發現其與 VUE3寫法也非常相近

```
<script>
 let count = 0
   function sayHi () {
    window.alert('Hello Ray.');
  }
  function handleClick() {
   count+=1
  }
</script>
<div>
 <button type="button" on:click={ handleClick }>
 Count is: { count }
</button>
 <hr />
 <button type="button" on:click={ sayHi }>打招呼</button>
</div>

```

---

## **程式碼範例參考**

---

若是讀到這邊還是觀念上還是有點模糊，建議還是自己動手做一個小專案 ( 有 CRUD 的較佳 ) 會對於各個框架的特性會有更深一層的體會喔!

以下是筆者做的 To do list，分別分享了 Github、CodeSandbox 的版本以供讀者作為閱讀時的參考

|  | Vue | React | SVELTE |
| --- | --- | --- | --- |
| GitHub | https://github.com/Bruno-Yu/todos_vue | https://github.com/Bruno-Yu/todos_react | https://github.com/Bruno-Yu/todos_svelte |
| CodeSandBox | https://codesandbox.io/p/github/Bruno-Yu/todos_vue/draft/agitated-mcnulty?workspaceId=e6a628c8-b920-47a3-a1e4-d608f3a3bb4a | https://codesandbox.io/p/github/Bruno-Yu/todos_react/main?layout=%257B%2522activeFilepath%2522%253A%2522%252FREADME.md%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522fullScreenDevtools%2522%253Afalse%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522vertical%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522DEVTOOLS_PANELS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clh5pdmh3000a356kokv599db%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clh5pdmh3000a356kokv599db%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clh5pdmh30008356kjy6gvq4t%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522start%2522%252C%2522port%2522%253A3000%252C%2522path%2522%253A%2522%252F%2522%257D%252C%257B%2522id%2522%253A%2522clh5pdmh30009356kmq4kl0w3%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522start%2522%257D%255D%252C%2522id%2522%253A%2522clh5pdmh3000a356kokv599db%2522%252C%2522activeTabId%2522%253A%2522clh5pdmh30008356kjy6gvq4t%2522%257D%257D%252C%2522showSidebar%2522%253Atrue%252C%2522showDevtools%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%252C%2522editorPanelSize%2522%253A48.333333333333336%252C%2522devtoolsPanelSize%2522%253A35%257D | https://codesandbox.io/p/github/Bruno-Yu/todos_svelte/main?layout=%257B%2522activeFilepath%2522%253A%2522%252FREADME.md%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522fullScreenDevtools%2522%253Afalse%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522vertical%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522DEVTOOLS_PANELS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clh8rxl610009356ke5yh0o78%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clh8rxl610009356ke5yh0o78%2522%253A%257B%2522id%2522%253A%2522clh8rxl610009356ke5yh0o78%2522%252C%2522activeTabId%2522%253A%2522clh8rxs0900b4356k8xggni3p%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clh8rxppj006l356k39rl9i7c%2522%257D%252C%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A5173%252C%2522id%2522%253A%2522clh8rxs0900b4356k8xggni3p%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%257D%257D%252C%2522showSidebar%2522%253Atrue%252C%2522showDevtools%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%252C%2522editorPanelSize%2522%253A48.333333333333336%252C%2522devtoolsPanelSize%2522%253A35%257D |
| 創建工具 | VUE CLI | CREATE REACT APP | SVELTE KIT |

## **下一步?**

---

感謝讀完關於前端框架粗淺的介紹，那你有甚麼想法呢? 歡迎提出討論

**推薦閱讀系列文: [〈Svelte 從小白到入門〉](https://editor.leonh.space/2021/svelte-quickstart-1/)**