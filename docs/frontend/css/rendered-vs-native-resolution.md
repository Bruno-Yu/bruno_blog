---
title: 響應式知多少 - 渲染解析度與原生解析度的差異
description: 為何開發中寫的響應式解析度以及該裝置規格上的解析度會有差異? 比如在 Chrome 開發者工具中 iphone6 的解析度為 667 x 375pixels，但實際規格卻是 1,334 x 750pixels ?
tags: ['前端']
date: 2023-08-15
type: doc
publish: true
---
# 響應式知多少 - 渲染解析度與原生解析度的差異

**研究目的**

- 響應式問題 - 為何開發中寫的響應式解析度以及該裝置規格上的解析度會有差異? 比如在 Chrome 開發者工具中 iphone6 的解析度為 667 x 375pixels，但實際規格卻是 1,334 x 750pixels ?

**說明**

移動裝置 ( ex: 手機、平板 ) 在現代螢幕的畫素密度越來越高的情況下，已經無法單純地用 px 來區分移動裝置實際裝置像素大小

- 原生解析度 ( 又稱為 物理解析度、裝置解析度 英文是 native resolution 或是 screen resolution )

通常我們在前端專案 header 中的 meta 總會看到這段 \<meta name="viewport" ...\> 代表的意思是讓瀏覽器隨設備決定渲染解析度，其具體的意思與實際呈現如下:

- 意思: 要求該裝置瀏覽器的呈現不要以裝置解析度 ( 物理解析度 ) 呈現，而是改以渲染解析度呈現
- 實際呈現: 在排版上會選擇吃較低解析度的 “渲染解析度” ( 字也會相對應的變大 ) ，而內容呈現上則是吃高解析度的裝置原生解析度，以確保高可讀性，也同時有高畫質的呈現

```html
<!--具體範例-->
<meta name="viewport" content="width=device-width, initial-scale=1" >
<!-- 也就是說若沒有設定好這段，手機瀏覽器若直接用該裝置原生解析度( 物理解析度 ) 呈現的話很可能會是以電腦排版方式呈現 -->
```

**實際範例**

在 Chrome 的 開發者模式之下，可以看到模擬成各種手機尺寸的解析度瀏覽方式，這就是渲染解析度

|  | iPhone XR | iphone 6  | iphone SE |
| --- | --- | --- | --- |
| 原生解析度 ( 裝置本身的解析度 ) | 1792*828 | 750*1334 | 640*1136 |
| 渲染解析度 ( chrome 開發者模式 ) | 896*414 | 375*667 | 320*568 |

在以上範例中，可以理解到裝置本身的解析度每邊的解析度原生解析度在這案例中都洽是渲染解析度的 2 倍 ( ex: iphone XR 1792/896 = 2; 828/414 =2 )，這也補充說明了我們上述有提到，在行動裝置排版使用渲染解析度的情況，使用原生解析度呈現內容，也就是內容有 2 倍的細緻 ( 這邊也可以說 pixel ratio 為 2 )

可以參考 MDN 對於 ****[Window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio) 的定義:

 值為 1 代表典型的 96 DPI ( 在某些平台上是 76 DPI )，而對於 HiDPI/Retina 的期望值則常見為 2

```jsx
window.devicePixelRatio = 2
```

但需要注意的是，並非所有的 Retina 或是 HiDPI 都是 2，就算同樣的 iphone 系列的 iphone X ( 原生解析度:1125*2436 ; 渲染解析度 375*812; pixel ratio 為 3  )，也就依照裝置的不同，其換算方式會有差異，這邊提供兩種查詢渲染解析度的方式

1. Chrome 的開發者工具: 按 F12 後並點選響應式選項確認是否有對應的裝置型號
2.  [Responsive Tool](https://responsivechecker.net/responsive): 此網站為真真查到的工具網站，收錄了許多不同型號裝置的渲染解析度 

- **參考文章**
    - [https://dwatow.github.io/2017/12-12-iron-man-2018/iron-man-2018-day2/](https://dwatow.github.io/2017/12-12-iron-man-2018/iron-man-2018-day2/)
    - [https://dwatow.github.io/2017/06-29-for-designer/about-mobile-resolution/](https://dwatow.github.io/2017/06-29-for-designer/about-mobile-resolution/)
    - [https://nick-chen.medium.com/網頁前端優化-響應式圖片實作-3ab1989b9d9c](https://nick-chen.medium.com/%E7%B6%B2%E9%A0%81%E5%89%8D%E7%AB%AF%E5%84%AA%E5%8C%96-%E9%9F%BF%E6%87%89%E5%BC%8F%E5%9C%96%E7%89%87%E5%AF%A6%E4%BD%9C-3ab1989b9d9c)
