---
title: GSAP 學習筆記
description: 動態網站做起來~
tags: ['前端','動畫']
date: 2024-06-01
type: doc
publish: true
---
# GSAP 學習筆記

URL:  [https://gsap.com/resources/get-started/](https://gsap.com/resources/get-started/)

**延伸閱讀**: [blender 建3D 模型 然後用 Three.js 導入](https://www.cnblogs.com/vivotech/p/17553122.html)


## 一、前言 & 資源

### 1-1. 前言

GSAP 全名是 Green Sock Animation Platform，是個強大的 JavaScript Library專門用來處理動態效果的函式庫，其有檔案小，瀏覽器支援度高等優點

### 1-2. 相關資源網站

- [GSAP 官方 install helper 介紹](https://gsap.com/docs/v3/Installation/?tab=cdn&module=esm&method=private+registry&tier=free&club=true&require=false&trial=true&ease=ExpoScaleEase,+SlowMo)
    - 有標註免費版 ( free ) 以及付費版 ( club )
    - 涵蓋 npm, CDN 等方式
    - 涵蓋 各種不同的 Plugins 下載 ex: Flip, ScrollTrigger, Observer…etc.
    - 涵蓋 各種不同的 Ease 引入方式 ( 有些需要自 core gsap 引入，有些需要藉由 plugin，而不同的安裝方式引用上也會有所不同 )
    
    [https://i.imgur.com/JuBND6s.png[/img]](https://i.imgur.com/JuBND6s.png[/img])
    

### 1-3. 筆者使用的安裝資源

**CDN**

```html
<!--Tailwind-->
<script src="https://cdn.tailwindcss.com"></script>
<!-- GSAP-->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
```

## 二、GSAP 入門

### 2-1. **tween ( method +target + vars object )**

**tween**

在 GSAP 中的動畫基本單位，基本上就是一組動畫設定，如下範例 & 說明

```html
<div class="test-box w-20 h-5 bg-green-400"></div>
```

```jsx
gsap.to(".test-box", { x: 200, y: 100 });

/**
* to 屬於 method
* .test-box 算是 targets ( 使用 CSS Selector 去指定對應 DOM )
* { x: 200, y: 100 } 屬於 vars object，定義動畫細節
*/
```

通常一個 tween 中會有 method, targets, vars object 來組成一組動畫

**The methods**

- **gsap.to()** 最常見的的 method: 該元件的目前狀態 →  vars 物件中所定義的狀態
- **gsap.from()** 基本上屬於 gasp.to() 的相反: vars 物件中所定義的狀態 → 該元件的目前狀態
- **gasp.fromTo()** 可以定義該元件**開始與結束**的狀態: 該元件的目前狀態 →  vars 物件中所定義的開始狀態 → vars 物件中所定義的結束狀態
    
    ```jsx
    gsap.fromTo(".test-box", { x: 100 }, { y: 200 });
    ```
    
- **gasp.set()** **立即設定該元件的狀態屬性**，中間沒有動畫過程，基本上可以當作 duration 為 0
    
    ```jsx
    gsap.set(".test-box", { x: 100, y: 200 });
    ```
    

**The target ( 也可以是 targets )**

- 可以使用 CSS selector 以字串呈現表示一個或多個 DOM
    
    ```jsx
    // CSS Selector 指定單一符合元素
    gsap.set(".test-box", { x: 100, y: 200 });
    // CSS Selector 指定多個符合元素
    gsap.set(".test-box, .test-box-2", { x: 100, y: 200 });
    ```
    
- 也可以直接放 DOM 元素，若要放多個則需要用陣列表示
    
    ```jsx
    const testBox = document.querySelector(".test-box");
    const testBox2 = document.querySelector(".test-box-2");
    // 單一元件
    gsap.to(testBox, { x: 100, y: 200 });
    // 多個元件使用陣列表示
    gsap.to([testBox, testBox2], { x: 100, y: 200 });
    ```
    

**The variables** 

定義 animation 樣式屬性的地方，或者定義會影響行為的特殊屬性 ex: duration, onComplete, repeat…etc.

```jsx
gsap.to(target, {
	x: 200,
	rotation: 360,
	duration: 2
})
```

### 2-2. vars object ( Properties & Special Properties )

GSAP 基本上可以設定任何 CSS properties, 可以是客製化的 object properties，甚至 CSS 變數，但最常見的使用方式是使用 transform 以及 opacity 

- **GSAP 使用 CSS 變數範例**
    
    ```css
    :root {
      --theme-color: Teal;
    }
    ```
    
    ```jsx
    const testBox = document.querySelector(".test-box");
    const testBox2 = document.querySelector(".test-box-2");
    
    // gsap.to(testBox, { x: 100, y: 200 });
    gsap.to([testBox, testBox2], {
      x: 100,
      y: 200,
      border: "1px dashed black",
      background: "var(--theme-color)" // 使用 var 包變數
    });
    
    ```
    

註: 官方建議多使用 transform 以及 opacity 來設定動畫，因為其不會導致頁面的重新布局 ( reflow )，所以會有更好的效能 ( 相較於頁面的 top, left, margin  ….etc. 改變都會，又比如 boxShadow 這種會影響 CPU 效能的 css 也盡量少用在動畫中 )

**GSAP 中的 Transform 縮寫 ( shorthand )**

GSAP 中提供 Transform 的縮寫，如下

```css
transform: rotate(360deg) translateX(10px) translateY(50%);
```

其同等與

```jsx
{ rotation: 360, x: 10, yPercent: 50 }
```

**GSAP 中的單位**

```jsx
x: 200, // 預設是 px (translateX 也是相對於原本位置)
x: "+=200", // 相對的數值
x: "40vw", // 或者用字串方式傳入不同的單位，讓 GSAP 進行後續的解析
y: () => window.innerHeight / 2, // 也可以用函式的方式進行計算

rotation: 360 // 預設單位是 degrees
```

- **補充: opacity 與 visibility 的差異**
    
    **顯示效果**
    
    - `opacity`: 元素透明度變化，0 為完全透明但**仍可點擊**，1 為完全不透明。
    - `visibility`: 元素完全隱藏，`hidden` 時不可見也**不可點擊**。
    
    **佔位:  兩者都保留元素的佔位空間**。
    
    **性能:** 
    
    - 兩者都不會觸發重新佈局（reflow），**但都會觸發重繪（repaint）**。
    - `opacity` 在某些情況下可以利用 GPU 加速來減少重繪開銷。

| GSAP | 原生 CSS |
| --- | --- |
| x: 100 | transform: translateX(100px) |
| y: 100 | transform: translateY(100px) |
| xPercent: 50 | transform: translateX(50%) |
| yPercent: 50 | transform: translateY(50%) |
| scale: 2 | transform: scale(2) |
| scaleX: 2 | transform: scaleX(2) |
| scaleY: 2 | transform: scaleY(2) |
| rotation: 90 | transform: rotate(90deg) |
| rotation: "1.25rad" | Using Radians - no CSS alternative |
| skew: 30 | transform: skew(30deg) |
| skewX: 30 | transform: skewX(30deg) |
| skewY: "1.23rad" | Using Radians - no CSS alternative |
| transformOrigin: "center 40%" | transform-origin: center 40% |
| opacity: 0 | adjust the elements opacity |
| autoAlpha: 0 | shorthand for opacity & visibility |
| duration: 1 | animation-duration: 1s |
| repeat: -1 | animation-iteration-count: infinite |
| repeat: 2 | animation-iteration-count: 2 |
| delay: 2 | animation-delay: 2 |
| yoyo: true | animation-direction: alternate |

**特殊屬性 Special Properties**

在 tween 中我們能使用特殊屬性去調整 tween 的行為，比如之前所提及的 duration
註: 也就是說定義動畫的行為的 properties 就算是 special properties

| Property | Description |
| --- | --- |
| duration | Duration of animation (seconds) Default: 0.5
動畫的持續時間，預設是 0.5 ( 秒 ) |
| delay | Amount of delay before the animation should begin (seconds)
動畫延遲觸發的時間，單位為秒 |
| repeat | How many times the animation should repeat.
動畫重複的次數 |
| repeatDelay | 動畫重複間的間隔秒數 ( 注意: 此時間不規範初次觸發延遲時間，初次觸發時間是由 delay 所控 ) |
| yoyo | If true, every other repeat the tween will run in the opposite direction. (like a yoyo) Default: false
預設是 false, 若是 true 的話，動畫會在下一次循環時以反方向進行 |
| stagger | Time (in seconds) between the start of each target's animation (if multiple targets are provided)
當 targets 有多個時，stagger 可以設定每個 target 間的動畫觸發間隔時間 |
| ease | Controls the rate of change during the animation, like the motion's "personality" or feel. Default: "power1.out”
ease 動畫運行速度的貝茲曲線 |
| onComplete | A function that runs when the animation completes
當動畫結束時觸發 hook |

### 2-3. 操縱 SVG, JS Object/Array ,Canvas

**操控 SVG 屬性**

如操縱 HTML 元素，SVG 亦然可以使用 GSAP 的 transform 縮寫，透過 attr 物件，也可以用來操作 SVG 內的屬性 ex: width, height, fill, stroke, cs ….etc.

- **操作 SVG 範例**
    
    ```html
      <svg class="cloud" width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="path" d="M10.5 21L12 18M14.5 21L16 18M6.5 21L8 18M8.8 15C6.14903 15 4 12.9466 4 10.4137C4 8.31435 5.6 6.375 8 6C8.75283 4.27403 10.5346 3 12.6127 3C15.2747 3 17.4504 4.99072 17.6 7.5C19.0127 8.09561 20 9.55741 20 11.1402C20 13.2719 18.2091 15 16 15L8.8 15Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    ```
    
    ```jsx
    // 範例
    gsap.to(".cloud", {
      duration: 2,
      x: 100,
      y: 100,
      yPercent: -50,
      xPercent: -50,
      attr: {
        fill: "yellow"
      }
    });
    
    gsap.to(".cloud>.path", {
      attr: {
        stroke: "orange"
      }
    });
    ```
    

**操控 object, array 內的數值轉變 ( 非畫面 )**

- 操作 object 數值範例
    
    ```html
    <div class="circle w-10 h-10 bg-gray-100 rounded-full"></div>
    ```
    
    ```jsx
    const circle = document.querySelector(".circle");
    
    let obj = { myNum: 10, myColor: "red", text: "hi" };
    circle.style.color = obj.myColor;
    circle.innerText = obj.text;
    
    gsap.to(obj, {
      duration: 2,
      myNum: 200,
      x: 100,
      y: 10,
      text: "bye",
      myColor: "blue",
      onUpdate: () => {
        circle.style.color = obj.myColor;
        circle.innerText = obj.text;
        console.log(obj.myNum, obj.myColor);
      }
    });
    ```
    

**與 Canvas 連用**

由於 GSAP 有以上操控數值的變化能力，所以 GSAP 也常與 Canvas, Pixi.js, Three.js 一起使用

如範例 

[https://codepen.io/GreenSock/pen/XWENapb](https://codepen.io/GreenSock/pen/XWENapb)

### 2-4. Easing 動畫行為

是動畫行為中最重要的設定，其有位動畫帶來生命產生畫龍點睛之效果，

可以參考官網中的 [Ease Visualizer](https://gsap.com/resources/getting-started/Easing) 其可以模擬各種效果的動畫可做為參考

Ease Visualizer: 可以藉由調整下方的呈現方式來了解不同類型的物件，所呈現的動畫效果，其右側為各種 GSAP 可以使用的 ease & types 對應的範例呈現，其分為幾類

- **Core** 在 GSAP 核心包就有不需要另外下載，為預設可用的 ease
- **Extra** 代表需要另外安裝相關的插件，才能使用其 ease 效果
- **Club** GSAP 付費的插件才能使用的 ease 效果

[https://i.imgur.com/NiUo5A5.png[/img]](https://i.imgur.com/NiUo5A5.png[/img])

**Ease Types** 
大部分 GSAP 的 ease 可以設定類型 type，其可以控制整個動畫行為的整體動能

- in : 很慢的開始，很快地結束
- out: 很快地開始，很慢的結束
- inOut: 很慢的開始，中間最快，很慢的結束

註: 筆者的記法，假設所有的動畫階段為 in → out，其 type 實為動畫階段的慢速點描述，其餘未提及的階段皆預設為快或明顯效果呈現

如下使用 “power1” 此 ease 來做範例

```jsx
// in 很慢的開始，很快地結束，就像是重物掉落
ease: "power1.in"
// out 很快地開始，很慢地結束，就像是正在棍動的圓球慢慢停止一樣
ease: "power1.out"
// inOut 很慢的開始，中間最快，很慢的結束，就像一輛車一開始正在加速，最後再逐漸減速
ease: "power1.inOut"
```

補充: 若針對 GSAP core 所提供的 ease 效果仍無法符合需求，可以參考需要以下 ease 效果，但需要注意的是有些是需要另外安裝插件，有些是需要付費的插件 ( 安裝方式可以參考 [GSAP install helper](https://gsap.com/docs/v3/Installation?tab=npm&module=esm&method=private+registry&tier=free&club=false&require=false&trial=true) )

[**"SlowMo"**](https://gsap.com/docs/v3/Eases/SlowMo) ease, [**"RoughEase"**](https://gsap.com/docs/v3/Eases/RoughEase), [**"ExpoScaleEase"**](https://gsap.com/docs/v3/Eases/ExpoScaleEase), and custom eases ([**"CustomEase"**](https://gsap.com/docs/v3/Eases/CustomEase), [**"CustomBounce"**](https://gsap.com/docs/v3/Eases/CustomBounce), and [**"CustomWiggle"](https://gsap.com/docs/v3/Eases/CustomWiggle))**

### 2-5. Staggers 操控多組 targets 動畫間的行為

當 tween 中，有綁定多個 DOM 對象時，stagger 是方便我們在 DOM 與 DOM 的動畫之間加上 delay 的時間

**注意:** 需要與 repeatDelay 作區別，repeatDelay 是針對**該 DOM 本身**的 repeat 間的 delay 時間，而 staggers 則是針對多個 DOM 而言，DOM 與 DOM 間的動畫觸發 delay 的時間，兩者概念相似，但針對的對象不同

[https://codepen.io/bruno-yu/pen/pomPwvb](https://codepen.io/bruno-yu/pen/pomPwvb)

而 stagger 的值不一定是數值，其也可以使用 物件或是函式做為其值以方便進行進階的設定

**stagger 的進階設定 - 物件**

如上所述在 tween 內，其 stagger 簡單的可以為數值，代表 DOM 與 DOM 之間動畫 delay 的秒數外，也可以使用 object 或是 function 作為其的進階設定

**stagger 以物件值範例**

```jsx
gsap.to('.box', {
    y: 100,
    stagger: {
        // wrap advanced options in an object
        each: 0.1,
        from: 'center',
        grid: 'auto',
        ease: 'power2.inOut',
        repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
    }
});
```

[https://codepen.io/bruno-yu/pen/JjqNJew?editors=1010](https://codepen.io/bruno-yu/pen/JjqNJew?editors=1010)

| Property | Description |
| --- | --- |
| amount | [Number]: 
The total amount of time (in seconds) that gets split among all the staggers. So if amount is 1 and there are 100 elements that stagger linearly, there would be 0.01 seconds between each sub-tween's start time. If you prefer to specify a certain amount of time between each tween, use the each property instead.
與 each 擇一使用就行，amount 代表的是動畫預計施行的整體時間( 單位秒 )，其會自行均分成個別 DOM 的動畫時間 |
| each | [Number]: 
The amount of time (in seconds) between each sub-tween's start time. So if each is 1 (regardless of how many elements there are), there would be 1 second between each sub-tween's start time. If you prefer to specify a total amount of time to split up among the staggers, use the amount property instead.
與 amount 擇一使用就行，each 是指定個別 DOM 的動畫時間 ( 單位秒 ) |
| from | [String | Integer | Array]: 
The position in the Array from which the stagger will emanate. To begin with a particular element, for example, use the number representing that element's index in the target Array. So from:4 begins staggering at the 5th element in the Array (because Arrays use zero-based indexes). The animation for each element will begin based on the element's proximity to the "from" value in the Array (the closer it is, the sooner it'll begin). You can also use the following string values: "start", "center", "edges", "random", or "end" ("random" was added in version 3.1.0). If you have a grid defined, you can specify decimal values indicating the progress on each axis, like [0.5,0.5] would be the center, [1,0] would be the top right corner, etc. Default: 0.
from 指的是動畫最先觸發的 DOM 地點，有以下幾種表示值 & 代表意思
1. 純數值: 指定該 INDEX 的 DOM 開始，然後從最近的 DOM 逐漸被觸發
2. 字串 "start", "center", "edges", "random", or "end" : 代表其動畫所ˋ開始觸發的位置
3. 陣列: 若我們的 stagger DOM 使用 grid 排列，則可以用軸向進度作為代表 [x軸, y軸] 例如 [0.5, 0.5] 代表置中而 [1,0] 代表右上方  |
| grid | [Array | "auto"]: 
If the elements are being displayed in a grid visually, indicate how many rows and columns there are (like grid:[9,15]) so that GSAP can calculate proximities accordingly. Or use grid:"auto" to have GSAP automatically calculate the rows and columns using element.getBoundingClientRect() (great for responsive layouts). Grids are assumed to flow from top left to bottom right layout-wise (like text that wraps at the right edge). Or if your elements aren't arranged in a uniform grid, check out the https://codepen.io/GreenSock/pen/gyWrPO?editors=0010 we created.
如果我們的 stagger DOM 是以 grid 設置，則可以用以下方法進行設置
grid: [ rows, columns ]: 代表我有多少 row 以及 columns 的 grid
grid: “auto” : 代表 GSAP 會自動去計算我們的 grid 範圍
若希望設置 RWD，可以搭配 element.getBoundingClientRect() 使用
而若是我們的 grid 並非規則排列，則可參考 GSAP 提供的 https://codepen.io/GreenSock/pen/gyWrPO?editors=0010 設置 |
| axis | [string]: 
If you define a grid, staggers are based on each element's total distance to the "from" value on both the x and y axis, but you can focus on just one axis if you prefer ("x" or "y"). Use the demo above to see the effect (it makes more sense when you see it visually).
可以是 "x" or "y" 值，因為 GSAP 在設置 from 後，會由其指定位置的 x 與 y 軸同時觸發，但可藉由指定 x 或 y 軸，使其只在單軸面相觸發後逐漸用單向軸向外擴散 |
| ease | [String | Function]: 
The ease that distributes the start times of the animations. So "power2" would start out with bigger gaps and then get more tightly clustered toward the end. Default: "none".
ease 從實做上來看，其控制的是 grid 動畫初始與結束覆蓋的 grid 數，若快則 grid 量少，若慢則量多 |

**stagger 的進階設定 - 函式**

通常使用在特定 DOM 的延遲時間不同時使用，需要回傳延遲的秒數(純數值)，此函數會有以下 3 個 參數

- index  : 此組 DOM 上第 index 個 element
- target: 目標 DOM element
- list: 目前綁定範圍內的 DOM array

範例

```jsx
gsap.to('.box', {
    y: 100,
    stagger: function (index, target, list) {
        // your custom logic here. Return the delay from the start (not between each)
        return index * 0.1;
    }
})
```

[https://codepen.io/bruno-yu/pen/xxNdraQ](https://codepen.io/bruno-yu/pen/xxNdraQ)

使用 stagger 時**需要注意將 repeat, yoyo 此兩個 property 放在 staggers 外層 tween 與 staggers 內層的差別**

- stagger 外層: 代表**所有 staggers 子層動畫照這個順序**重複呈現
- stagger 內層: 代表 stagger 內**個別 element** 重複動畫

### 2-6. Timelines

Timeline 通常用來表示有一整組的 tween ，需要照特定順序觸發時所使用 ( 與 stagger 不同，stagger 描述的是一樣的動畫效果的 DOM 彼此間觸發的行為，而 timeline 可以是不同的動畫效果，且可以確保依照指定順序進行觸發 )

範例使用方式如下

```jsx
// create a timeline
const tl = gsap.timeline()

tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });

// 可以縮寫成如下寫法(上下兩個寫法皆可)
tl.to(".green", { x: 600, duration: 2 })
	.to(".purple", { x: 600, duration: 1 })
	.to(".orange", { x: 600, duration: 1 });
```

**timeline 的第三個參數: Position Parameter**

- 整數數值，則從此 timeline 進行時指定的秒數觸發
- 若是使用字串表示相對數值 "+=" "-=" 則會根據目前原本要觸發的時間再做換算
    - 若是 "+=" 則類似 delay 的效果
    - 若是"-=" 則可以達到與上段動畫重疊的效果
    - 字串 "+=" 或 "-=" 除了可以接數值外，也可以用接 % 數 ex: "-=1", "-=50%”
- 若是使用 "\<" 則會與上一個動畫一同觸發 (註: 但 "\>" 並不會有與下一個動畫一同觸發的效果 )

```jsx
const tl = gsap.timeline()

// 第三個參數是整數，則該動畫會在此 timeline 的該秒數被觸發
tl.to(".green", { x: 600, duration: 2 }, 1);

// 第三個參數是 "<"，則該動畫會與前一個動畫同時被觸發
tl.to(".purple", { x: 600, duration: 1 }, "<");

// 第三個參數是"+=" "-=" 這種相對數值
// 正的數值會是間隔指定的秒數或 % 數觸發，類似 delay 的效果
// 負的數值則會與上一個動畫觸發時間部分重疊
tl.to(".orange", { x: 600, duration: 1 }, "+=1");
```

[https://codepen.io/bruno-yu/pen/GRamvaO](https://codepen.io/bruno-yu/pen/GRamvaO)

**timeline  Special Properties 預先設定**

timeline 可以預先設定共用的 special Properties

**注意: 此方法只能設定共用的 special Properties ，若要涵蓋非 special Properties 則需要用 defaults 預設來設定**

補充: 所謂的 special properties 定義的是動畫的行為而非呈現

```jsx
let tl = gsap.timeline({repeat: -1, repeatDelay: 1, yoyo: true})

tl.to(".green", { rotation: 360 });
tl.to(".purple", { rotation: 360 });
tl.to(".orange", { rotation: 360 });
```

**timeline Defaults 預先設定**

若希望設定預設的行為以避免重複的設定同樣的 properties，可以使用 defaults 在 timeline 創建時一同建立

若後續有個別設定與 defaults 中同樣的  property，則動畫會以後者個別設定的為主，並不會造成衝突

```jsx
const tf = gsap.timeline({
  defaults: {
    x: 500,
    rotation: 360,
    duration: 2,
    ease: "none",
    repeat: -1,
    yoyo: true
  }
});

tf.to(".box-1", { ease: "bounce.in" })
  .to(".box-2", { x: 600, ease: "bounce.inOut" })
  .to(".box-3", { x: 700, duration: 5, ease: "bounce.out" }, "-=3");
```

[https://codepen.io/bruno-yu/pen/qBGmPMP?editors=1010](https://codepen.io/bruno-yu/pen/qBGmPMP?editors=1010)