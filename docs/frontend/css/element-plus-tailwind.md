---
title: 探討 element Plus 與 tailwind css 合併的可行性
description: 若想同時使用 element ui 以及 Tailwindcss 但同時使用這兩者會有 element ui 樣式被覆蓋的問題？
tags: ['前端','element-plus','element-ui','Tailwindcss','css框架']
date: 2024-03-05
type: doc
publish: true
---
# 探討 element Plus 與 tailwind css 合併的可行性


## 一、前言

### 1-1. 研究初衷

雖說 Tailwind 本身是主打 Utility First 的 CSS 框架，他本身提供許多已定義好以及分子化的 CSS class 樣式，因此我們不需要再特別想 css 的 class 名稱再自行定義，就可以直接於 HTML 標籤上直接使用樣式，其爽感不下於寫行內樣式，但卻沒有行內樣式等權重過大且不好調整的問題，因此開發上更靈活也更加快速，在維護上也更加容易，但考量到 element ui 是目前公司常用的 CSS 框架，團隊在這框架上已累積不少經驗，換掉著實可惜。而一般同個專案內基本上是不建議裝兩套 CSS 框架的，因為樣式上的衝突是難免，而除錯上也不易，但用過 Tailwind 後就如瑞凡般真的不願意再回去想那些莫名其妙的 class 名稱了…  那是否有兩全其美的方案呢? 

仔細想來雖說 element ui 以及 Tailwindcss 皆是前端框架，但是其主要的面向已及功能性是有差異的，我們在使用 element ui 圖的是其已預先包裝好的元件，畢竟隨套即用不用再從頭造輪子，而我們在使用 Tailwind 更多的場景在於自己手刻的 css 部分，這兩功能其實雖說都有牽涉到樣式，但面向不同，那在同一個專案中，我是否只要將兩者使用場景分開就能夠較為順利的同時使用這兩個工具了呢? 此篇研究主要針對此點作為探討

### 1-2. 預計研究方式

在談及測試方法前，筆者先交代下前提背景，筆者之前在寫個人練習的專案時，曾嘗試以 element ui 以及 Tailwind 於 Nuxt 結合，但 element ui 的樣式皆消失，筆者曾嘗試了多種方式也無果

後來發現 element ui 雖是不錯但是相對舊版本的 CSS 框架，其特色是元件完整度很足夠，類別很多，也就是說比較肥的 CSS 框架，他有個升級版，也就是 element plus，它剃除了較少用的元件，並新增了部分組件以及功能，所以容量相對來說較輕量。另外其還有另一個好處，它更新的更加頻繁，所以對於較新的技術也會有較好的支援。 ( 這點也可以從官網看出來 element ui 只說其較好的支援 webpack 但卻隻字未提其它的包裝工具，而 element plus 則有提及 webpack 外也提及主流打包工具 vite 的設定方法 )

考量於此，此次筆者就以 element plus 替代 element ui 進行之後的測試

而為簡化環境的複雜性，在初始測試的方式，會以建立空專案結合 element plus 以及 tailwind 的方式進行測試，預計先從結構較簡單的 vue 專案開始，若順利則測試 Nuxt 專案

初步構思研究&測試方式如下

- Vue 預計測試方式
    - 以 vite 起一個 Vue 的空專案
    - 安裝 & 配置 Tailwind
    - 安裝 & 配置 element plus
    - 觀察 & 調整 可能的樣式衝突
    - 使用建議

- Nuxt 測試基本上也是與 Vue 是同樣的方式，只是因為 Nuxt 相對複雜會待 Vue 研究完成後再進行

## **二、Vue 環境的雙 CSS 框架結合測試**

- 筆者使用版本
    - element-plus 2.5.6
    - tailwindcss 3.4.1
    - vite 5.1.4
    - vue 3.4.21

實際建立步驟

使用 node 18.19.0 

### 2-1. 以 vite 起一個 Vue 的空專案

參考自官網: [https://vitejs.dev/guide/](https://vitejs.dev/guide/)

```scss
yarn create vite my-vue-app
```

選擇  vue, typescript , yarn 後並執行安裝

### 2-2. 安裝 & 配置 Tailwind

參考自官網: [https://tailwindcss.com/docs/guides/vite#vue](https://tailwindcss.com/docs/guides/vite#vue)

```scss
yarn add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

並在 npx tailwindcss init 指令下後所產生的 tailwind.config.ts 中加上以下內容

```tsx
/** @type {import('tailwindcss').Config} */
export default {
  content: [ // 代表需要 tailwind 編譯的範疇
    "./index.html", // 加上
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 加上
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

因個人開發時較習慣寫 scss，所以安裝下 sass 套件

安裝 sass 套件

```tsx
yarn add sass
```

將原在 ./src/style.css 的內容改成 scss 後，放在 ./src/assets/styles 之下並改成 index.scss，並在 main.ts 中引入

```tsx
// src/main.ts
import { createApp } from 'vue'
import './assets/styles/index.scss' // 引入部分改成正確路徑
import App from './App.vue'

createApp(App).mount('#app')

```

在 ./src/assets/styles/index.scss 中加入 tailwind 的設定

```scss
// ./src/assets/styles/index.scss
@tailwind base;
@tailwind components;
@tailwind utilities;

 ....
```

### 2-3. 安裝 & 配置 element-plus

安裝 element-plus

```scss
yarn add element-plus
```

**2-3-1. 完整引入 ( tailwind + elementPlus 建議使用 )**

參考自官網: [https://element-plus.org/zh-CN/guide/quickstart.html#完整引入](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%AE%8C%E6%95%B4%E5%BC%95%E5%85%A5) 

在 main.ts 完整引入做法

注意: 這邊的完整引入或者是按需引入**擇一勿混用** ( 筆者在這邊犯蠢，完整引入後又安裝了 按需引入，導致後面的主題色無法更改，直至半天後才發現是這邊的問題 )

```scss
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // 預設樣式載入位置
import './assets/styles/index.scss' // 自身樣式的位置
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

若使用 Volar 套件的話記得在 tsconfig.json 中加入以下指令

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

**2-3-2. 完整引入樣式的修改方式**

- element-plus 可以修改樣式的變數 variable 檔案位置
    - **var.scss**
        
        以下內容是取自筆者 2.5.6 的 element-plus 版本
        
        檔案位置在 node_modules 內部可找到
        
        位置: **element-plus/theme-chalk/src/common/var.scss**  
        
        ```scss
        // var.scss
        /* Element Chalk Variables */
        @use 'sass:math';
        @use 'sass:map';
        
        @use '../mixins/function.scss' as *;
        
        // Special comment for theme configurator
        // type|skipAutoTranslation|Category|Order
        // skipAutoTranslation 1
        
        // types
        $types: primary, success, warning, danger, error, info;
        
        // Color
        $colors: () !default;
        $colors: map.deep-merge(
          (
            'white': #ffffff,
            'black': #000000,
            'primary': (
              'base': #409eff,
            ),
            'success': (
              'base': #67c23a,
            ),
            'warning': (
              'base': #e6a23c,
            ),
            'danger': (
              'base': #f56c6c,
            ),
            'error': (
              'base': #f56c6c,
            ),
            'info': (
              'base': #909399,
            ),
          ),
          $colors
        );
        
        $color-white: map.get($colors, 'white') !default;
        $color-black: map.get($colors, 'black') !default;
        $color-primary: map.get($colors, 'primary', 'base') !default;
        $color-success: map.get($colors, 'success', 'base') !default;
        $color-warning: map.get($colors, 'warning', 'base') !default;
        $color-danger: map.get($colors, 'danger', 'base') !default;
        $color-error: map.get($colors, 'error', 'base') !default;
        $color-info: map.get($colors, 'info', 'base') !default;
        
        // https://sass-lang.com/documentation/values/maps#immutability
        // mix colors with white/black to generate light/dark level
        @mixin set-color-mix-level(
          $type,
          $number,
          $mode: 'light',
          $mix-color: $color-white
        ) {
          $colors: map.deep-merge(
            (
              $type: (
                '#{$mode}-#{$number}':
                  mix(
                    $mix-color,
                    map.get($colors, $type, 'base'),
                    math.percentage(math.div($number, 10))
                  ),
              ),
            ),
            $colors
          ) !global;
        }
        
        // $colors.primary.light-i
        // --el-color-primary-light-i
        // 10% 53a8ff
        // 20% 66b1ff
        // 30% 79bbff
        // 40% 8cc5ff
        // 50% a0cfff
        // 60% b3d8ff
        // 70% c6e2ff
        // 80% d9ecff
        // 90% ecf5ff
        @each $type in $types {
          @for $i from 1 through 9 {
            @include set-color-mix-level($type, $i, 'light', $color-white);
          }
        }
        
        // --el-color-primary-dark-2
        @each $type in $types {
          @include set-color-mix-level($type, 2, 'dark', $color-black);
        }
        
        $text-color: () !default;
        $text-color: map.merge(
          (
            'primary': #303133,
            'regular': #606266,
            'secondary': #909399,
            'placeholder': #a8abb2,
            'disabled': #c0c4cc,
          ),
          $text-color
        );
        
        $border-color: () !default;
        $border-color: map.merge(
          (
            '': #dcdfe6,
            'light': #e4e7ed,
            'lighter': #ebeef5,
            'extra-light': #f2f6fc,
            'dark': #d4d7de,
            'darker': #cdd0d6,
          ),
          $border-color
        );
        
        $fill-color: () !default;
        $fill-color: map.merge(
          (
            '': #f0f2f5,
            'light': #f5f7fa,
            'lighter': #fafafa,
            'extra-light': #fafcff,
            'dark': #ebedf0,
            'darker': #e6e8eb,
            'blank': #ffffff,
          ),
          $fill-color
        );
        
        // Background
        $bg-color: () !default;
        $bg-color: map.merge(
          (
            '': #ffffff,
            'page': #f2f3f5,
            'overlay': #ffffff,
          ),
          $bg-color
        );
        
        // Border
        $border-width: 1px !default;
        $border-style: solid !default;
        $border-color-hover: getCssVar('text-color', 'disabled') !default;
        
        $border-radius: () !default;
        $border-radius: map.merge(
          (
            'base': 4px,
            'small': 2px,
            'round': 20px,
            'circle': 100%,
          ),
          $border-radius
        );
        
        // Box-shadow
        $box-shadow: () !default;
        $box-shadow: map.merge(
          (
            '': (
              0px 12px 32px 4px rgba(0, 0, 0, 0.04),
              0px 8px 20px rgba(0, 0, 0, 0.08),
            ),
            'light': (
              0px 0px 12px rgba(0, 0, 0, 0.12),
            ),
            'lighter': (
              0px 0px 6px rgba(0, 0, 0, 0.12),
            ),
            'dark': (
              0px 16px 48px 16px rgba(0, 0, 0, 0.08),
              0px 12px 32px rgba(0, 0, 0, 0.12),
              0px 8px 16px -8px rgba(0, 0, 0, 0.16),
            ),
          ),
          $box-shadow
        );
        
        // Typography
        $font-family: () !default;
        $font-family: map.merge(
          (
            // default family
            '':
              "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif"
          ),
          $font-family
        );
        
        $font-size: () !default;
        $font-size: map.merge(
          (
            'extra-large': 20px,
            'large': 18px,
            'medium': 16px,
            'base': 14px,
            'small': 13px,
            'extra-small': 12px,
          ),
          $font-size
        );
        
        // zIndex
        $z-index: () !default;
        $z-index: map.merge(
          (
            'normal': 1,
            'top': 1000,
            'popper': 2000,
          ),
          $z-index
        );
        
        // Disable default
        $disabled: () !default;
        $disabled: map.merge(
          (
            'bg-color': getCssVar('fill-color', 'light'),
            'text-color': getCssVar('text-color', 'placeholder'),
            'border-color': getCssVar('border-color', 'light'),
          ),
          $disabled
        );
        
        $common-component-size: () !default;
        $common-component-size: map.merge(
          (
            'large': 40px,
            'default': 32px,
            'small': 24px,
          ),
          $common-component-size
        );
        
        // overlay
        $overlay-color: () !default;
        $overlay-color: map.merge(
          (
            '': rgba(0, 0, 0, 0.8),
            'light': rgba(0, 0, 0, 0.7),
            'lighter': rgba(0, 0, 0, 0.5),
          ),
          $overlay-color
        );
        
        // mask
        $mask-color: () !default;
        $mask-color: map.merge(
          (
            '': rgba(255, 255, 255, 0.9),
            'extra-light': rgba(255, 255, 255, 0.3),
          ),
          $mask-color
        );
        
        // Components
        // ---
        // Checkbox
        // css3 var in packages/theme-chalk/src/checkbox.scss
        $checkbox: () !default;
        $checkbox: map.merge(
          (
            'font-size': 14px,
            'font-weight': getCssVar('font-weight-primary'),
            'text-color': getCssVar('text-color-regular'),
            'input-height': 14px,
            'input-width': 14px,
            'border-radius': getCssVar('border-radius-small'),
            'bg-color': getCssVar('fill-color', 'blank'),
            'input-border': getCssVar('border'),
            'disabled-border-color': getCssVar('border-color'),
            'disabled-input-fill': getCssVar('fill-color', 'light'),
            'disabled-icon-color': getCssVar('text-color-placeholder'),
            'disabled-checked-input-fill': getCssVar('border-color-extra-light'),
            'disabled-checked-input-border-color': getCssVar('border-color'),
            'disabled-checked-icon-color': getCssVar('text-color-placeholder'),
            'checked-text-color': getCssVar('color-primary'),
            'checked-input-border-color': getCssVar('color-primary'),
            'checked-bg-color': getCssVar('color-primary'),
            'checked-icon-color': getCssVar('color', 'white'),
            'input-border-color-hover': getCssVar('color-primary'),
          ),
          $checkbox
        );
        
        $checkbox-button: () !default;
        $checkbox-button: map.merge(
          (
            'checked-bg-color': getCssVar('color-primary'),
            'checked-text-color': getCssVar('color-white'),
            'checked-border-color': getCssVar('color-primary'),
          ),
          $checkbox-button
        );
        
        $checkbox-bordered-padding-left: () !default;
        $checkbox-bordered-padding-left: map.merge(
          (
            'large': 12px,
            'default': 10px,
            'small': 8px,
          ),
          $checkbox-bordered-padding-left
        );
        
        $checkbox-bordered-padding-right: () !default;
        $checkbox-bordered-padding-right: map.merge(
          (
            'large': 20px,
            'default': 16px,
            'small': 12px,
          ),
          $checkbox-bordered-padding-right
        );
        
        // Radio
        /// fontSize||Font|1
        $radio: () !default;
        $radio: map.merge(
          (
            'font-size': getCssVar('font-size-base'),
            'text-color': getCssVar('text-color-regular'),
            'font-weight': getCssVar('font-weight-primary'),
            'input-height': 14px,
            'input-width': 14px,
            'input-border-radius': getCssVar('border-radius-circle'),
            'input-bg-color': getCssVar('fill-color', 'blank'),
            'input-border': getCssVar('border'),
            'input-border-color': getCssVar('border-color'),
            'input-border-color-hover': getCssVar('color-primary'),
          ),
          $radio
        );
        
        $radio-height: () !default;
        $radio-height: map.merge($common-component-size, $radio-height);
        
        $radio-button: () !default;
        $radio-button: map.merge(
          (
            'checked-bg-color': getCssVar('color-primary'),
            'checked-text-color': getCssVar('color-white'),
            'checked-border-color': getCssVar('color-primary'),
            'disabled-checked-fill': getCssVar('border-color-extra-light'),
          ),
          $radio-button
        );
        
        $radio-disabled: () !default;
        $radio-disabled: map.merge(
          (
            'input-border-color': getCssVar('disabled-border-color'),
            'input-fill': getCssVar('disabled-bg-color'),
            'icon-color': getCssVar('disabled-bg-color'),
            'checked-input-border-color': getCssVar('disabled-border-color'),
            'checked-input-fill': getCssVar('disabled-bg-color'),
            'checked-icon-color': getCssVar('text-color-placeholder'),
          ),
          $radio-disabled
        );
        
        $radio-checked: () !default;
        $radio-checked: map.merge(
          (
            'text-color': getCssVar('color-primary'),
            'input-border-color': getCssVar('color-primary'),
            'icon-color': getCssVar('color-primary'),
          ),
          $radio-checked
        );
        
        $radio-bordered-input-height: () !default;
        $radio-bordered-input-height: map.merge(
          (
            'large': 14px,
            'default': 12px,
            'small': 12px,
          ),
          $radio-bordered-input-height
        );
        
        $radio-bordered-input-width: () !default;
        $radio-bordered-input-width: map.merge(
          (
            'large': 14px,
            'default': 12px,
            'small': 12px,
          ),
          $radio-bordered-input-width
        );
        
        // Select
        $select: () !default;
        $select: map.merge(
          (
            'border-color-hover': getCssVar('border-color-hover'),
            'disabled-border': getCssVar('disabled-border-color'),
            'font-size': getCssVar('font-size-base'),
            'close-hover-color': getCssVar('text-color-secondary'),
            'input-color': getCssVar('text-color-placeholder'),
            'multiple-input-color': getCssVar('text-color-regular'),
            'input-focus-border-color': getCssVar('color-primary'),
            'input-font-size': 14px,
            'width': 100%,
          ),
          $select
        );
        
        $select-option: () !default;
        $select-option: map.merge(
          (
            'text-color': getCssVar('text-color-regular'),
            'disabled-color': getCssVar('text-color-placeholder'),
            'height': 34px,
            'hover-background': getCssVar('fill-color', 'light'),
            'selected-text-color': getCssVar('color-primary'),
          ),
          $select-option
        );
        
        $select-group: () !default;
        $select-group: map.merge(
          (
            'text-color': getCssVar('color-info'),
            'height': 30px,
            'font-size': 12px,
          ),
          $select-group
        );
        
        $select-dropdown: () !default;
        $select-dropdown: map.merge(
          (
            'bg-color': getCssVar('bg-color', 'overlay'),
            'shadow': getCssVar('box-shadow-light'),
            'empty-color': getCssVar('text-color-secondary'),
            'max-height': 274px,
            'padding': 6px 0,
            'empty-padding': 10px 0,
            'header-padding': 10px,
            'footer-padding': 10px,
            'border': 1px solid getCssVar('border-color-light'),
          ),
          $select-dropdown
        );
        
        $select-wrapper-padding: () !default;
        $select-wrapper-padding: map.merge(
          (
            'large': 8px 16px,
            'default': 4px 12px,
            'small': 2px 8px,
          ),
          $select-wrapper-padding
        );
        
        $select-near-margin-left: () !default;
        $select-near-margin-left: map.merge(
          (
            'large': -8px,
            'default': -8px,
            'small': -6px,
          ),
          $select-near-margin-left
        );
        
        $select-item-gap: () !default;
        $select-item-gap: map.merge(
          (
            'large': 6px,
            'default': 6px,
            'small': 4px,
          ),
          $select-item-gap
        );
        
        // the same height of el-tag
        $select-item-height: () !default;
        $select-item-height: map.merge(
          (
            'large': 24px,
            'default': 24px,
            'small': 20px,
          ),
          $select-item-height
        );
        
        // Alert
        // css3 var in packages/theme-chalk/src/alert.scss
        $alert: () !default;
        $alert: map.merge(
          (
            'padding': 8px 16px,
            'border-radius-base': getCssVar('border-radius-base'),
            'title-font-size': 13px,
            'description-font-size': 12px,
            'close-font-size': 12px,
            'close-customed-font-size': 13px,
            'icon-size': 16px,
            'icon-large-size': 28px,
          ),
          $alert
        );
        
        // MessageBox
        // css3 var in packages/theme-chalk/src/message-box.scss
        $messagebox: () !default;
        $messagebox: map.merge(
          (
            'title-color': getCssVar('text-color-primary'),
            'width': 420px,
            'border-radius': 4px,
            'box-shadow': getCssVar('box-shadow'),
            'font-size': getCssVar('font-size-large'),
            'content-font-size': getCssVar('font-size-base'),
            'content-color': getCssVar('text-color-regular'),
            'error-font-size': 12px,
            'padding-primary': 12px,
            'font-line-height': getCssVar('font-line-height-primary'),
          ),
          $messagebox
        );
        
        // Message
        // css3 var in packages/theme-chalk/src/message.scss
        $message: () !default;
        $message: map.merge(
          (
            'bg-color': getCssVar('color', 'info', 'light-9'),
            'border-color': getCssVar('border-color-lighter'),
            'padding': 15px 19px,
            'close-size': 16px,
            'close-icon-color': getCssVar('text-color-placeholder'),
            'close-hover-color': getCssVar('text-color-secondary'),
          ),
          $message
        );
        
        // Notification
        // css3 var in packages/theme-chalk/src/notification.scss
        $notification: () !default;
        $notification: map.merge(
          (
            'width': 330px,
            'padding': 14px 26px 14px 13px,
            'radius': 8px,
            'shadow': getCssVar('box-shadow-light'),
            'border-color': getCssVar('border-color-lighter'),
            'icon-size': 24px,
            'close-font-size':
              var(
                #{getCssVarName('message-close-size')},
                map.get($message, 'close-size')
              ),
            'group-margin-left': 13px,
            'group-margin-right': 8px,
            'content-font-size': getCssVar('font-size-base'),
            'content-color': getCssVar('text-color-regular'),
            'title-font-size': 16px,
            'title-color': getCssVar('text-color-primary'),
            'close-color': getCssVar('text-color-secondary'),
            'close-hover-color': getCssVar('text-color-regular'),
          ),
          $notification
        );
        
        // Input
        // css3 var in packages/theme-chalk/src/input.scss
        $input: () !default;
        $input: map.merge(
          (
            'text-color': getCssVar('text-color-regular'),
            'border': getCssVar('border'),
            'hover-border': getCssVar('border-color-hover'),
            'focus-border': getCssVar('color-primary'),
            'transparent-border': 0 0 0 1px transparent inset,
            'border-color': getCssVar('border-color'),
            'border-radius': getCssVar('border-radius-base'),
            'bg-color': getCssVar('fill-color', 'blank'),
            'icon-color': getCssVar('text-color-placeholder'),
            'placeholder-color': getCssVar('text-color-placeholder'),
            'hover-border-color': getCssVar('border-color-hover'),
            'clear-hover-color': getCssVar('text-color-secondary'),
            'focus-border-color': getCssVar('color-primary'),
            'width': 100%,
          ),
          $input
        );
        
        $input-disabled: () !default;
        $input-disabled: map.merge(
          (
            'fill': getCssVar('disabled-bg-color'),
            'border': getCssVar('disabled-border-color'),
            'text-color': getCssVar('disabled-text-color'),
            'placeholder-color': getCssVar('text-color-placeholder'),
          ),
          $input-disabled
        );
        
        $input-font-size: () !default;
        $input-font-size: map.merge(
          (
            'large': 14px,
            'default': 14px,
            'small': 12px,
          ),
          $input-font-size
        );
        
        $input-height: () !default;
        $input-height: map.merge($common-component-size, $input-height);
        
        $input-line-height: () !default;
        $input-line-height: map.merge($common-component-size, $input-line-height);
        
        $input-number-width: () !default;
        $input-number-width: map.merge(
          (
            'large': 180px,
            'default': 150px,
            'small': 120px,
          ),
          $input-number-width
        );
        
        $input-padding-horizontal: () !default;
        $input-padding-horizontal: map.merge(
          (
            'large': 16px,
            'default': 12px,
            'small': 8px,
          ),
          $input-padding-horizontal
        );
        
        // Cascader
        // css3 var in packages/theme-chalk/src/cascader.scss
        $cascader: () !default;
        $cascader: map.merge(
          (
            'menu-text-color': getCssVar('text-color-regular'),
            'menu-selected-text-color': getCssVar('color-primary'),
            'menu-fill': getCssVar('bg-color', 'overlay'),
            'menu-font-size': getCssVar('font-size-base'),
            'menu-radius': getCssVar('border-radius-base'),
            'menu-border': solid 1px getCssVar('border-color-light'),
            'menu-shadow': getCssVar('box-shadow-light'),
            'node-background-hover': getCssVar('fill-color', 'light'),
            'node-color-disabled': getCssVar('text-color-placeholder'),
            'color-empty': getCssVar('text-color-placeholder'),
            'tag-background': getCssVar('fill-color'),
          ),
          $cascader
        );
        //statistic
        // css3 var in packages/theme-chalk/src/statistic.scss
        $statistic: () !default;
        $statistic: map.merge(
          (
            'title-font-weight': 400,
            'title-font-size': getCssVar('font-size', 'extra-small'),
            'title-color': getCssVar('text-color', 'regular'),
            'content-font-weight': 400,
            'content-font-size': getCssVar('font-size', 'extra-large'),
            'content-color': getCssVar('text-color', 'primary'),
          ),
          $statistic
        );
        // Button
        // css3 var in packages/theme-chalk/src/button.scss
        $button: () !default;
        $button: map.merge(
          (
            'font-weight': getCssVar('font-weight-primary'),
            'border-color': getCssVar('border-color'),
            'bg-color': getCssVar('fill-color', 'blank'),
            'text-color': getCssVar('text-color', 'regular'),
            'disabled-text-color': getCssVar('disabled-text-color'),
            'disabled-bg-color': getCssVar('fill-color', 'blank'),
            'disabled-border-color': getCssVar('border-color-light'),
            'divide-border-color': rgba($color-white, 0.5),
            'hover-text-color': getCssVar('color-primary'),
            'hover-bg-color': getCssVar('color-primary', 'light-9'),
            'hover-border-color': getCssVar('color-primary-light-7'),
            'active-text-color': getCssVar('button-hover-text-color'),
            'active-border-color': getCssVar('color-primary'),
            'active-bg-color': getCssVar('button', 'hover-bg-color'),
            'outline-color': getCssVar('color-primary', 'light-5'),
            'hover-link-text-color': getCssVar('color-info'),
            'active-color': getCssVar('text-color', 'primary'),
          ),
          $button
        );
        
        $button-border-width: $border-width !default;
        
        // need mix, so do not use css var
        $button-hover-tint-percent: 20%;
        $button-active-shade-percent: 10%;
        
        $button-border-color: () !default;
        $button-bg-color: () !default;
        $button-text-color: () !default;
        
        @each $type in $types {
          $button-border-color: map.merge(
            (
              $type: map.get($colors, $type, 'base'),
            ),
            $button-border-color
          ) !global;
        
          $button-bg-color: map.merge(
            (
              $type: map.get($colors, $type, 'base'),
            ),
            $button-bg-color
          ) !global;
        }
        
        $button-font-size: () !default;
        $button-font-size: map.merge(
          (
            'large': getCssVar('font-size', 'base'),
            'default': getCssVar('font-size', 'base'),
            'small': 12px,
          ),
          $button-font-size
        );
        
        $button-border-radius: () !default;
        $button-border-radius: map.merge(
          (
            'large': getCssVar('border-radius', 'base'),
            'default': getCssVar('border-radius', 'base'),
            'small': calc(#{getCssVar('border-radius', 'base')} - 1px),
          ),
          $button-border-radius
        );
        
        $button-padding-vertical: () !default;
        $button-padding-vertical: map.merge(
          (
            'large': 13px,
            'default': 9px,
            'small': 6px,
          ),
          $button-padding-vertical
        );
        
        $button-padding-horizontal: () !default;
        $button-padding-horizontal: map.merge(
          (
            'large': 20px,
            'default': 16px,
            'small': 12px,
          ),
          $button-padding-horizontal
        );
        
        // Switch
        // css3 var in packages/theme-chalk/src/switch.scss
        $switch: () !default;
        $switch: map.merge(
          (
            'on-color': getCssVar('color-primary'),
            'off-color': getCssVar('border-color'),
          ),
          $switch
        );
        
        // Dialog
        // css3 var in packages/theme-chalk/src/dialog.scss
        $dialog: () !default;
        $dialog: map.merge(
          (
            'width': 50%,
            'margin-top': 15vh,
            'bg-color': getCssVar('bg-color'),
            'box-shadow': getCssVar('box-shadow'),
            'title-font-size': getCssVar('font-size-large'),
            'content-font-size': 14px,
            'font-line-height': getCssVar('font-line-height-primary'),
            'padding-primary': 16px,
            'border-radius': getCssVar('border-radius-small'),
          ),
          $dialog
        );
        
        // Tour
        // css3 var in packages/theme-chalk/src/tour.scss
        $tour: () !default;
        $tour: map.merge(
          (
            'width': 520px,
            'padding-primary': 12px,
            'font-line-height': getCssVar('font-line-height-primary'),
            'title-font-size': 16px,
            'title-text-color': getCssVar('text-color-primary'),
            'title-font-weight': 400,
            'close-color': getCssVar('color-info'),
            'font-size': 14px,
            'color': getCssVar('text-color-primary'),
            'bg-color': getCssVar('bg-color'),
            'border-radius': 4px,
          ),
          $tour
        );
        
        // Table
        // css3 var in packages/theme-chalk/src/table.scss
        $table: () !default;
        $table: map.merge(
          (
            'border-color': getCssVar('border-color-lighter'),
            'border': 1px solid getCssVar('table-border-color'),
            'text-color': getCssVar('text-color-regular'),
            'header-text-color': getCssVar('text-color-secondary'),
            'row-hover-bg-color': getCssVar('fill-color', 'light'),
            'current-row-bg-color': getCssVar('color-primary-light-9'),
            'header-bg-color': getCssVar('bg-color'),
            'fixed-box-shadow': getCssVar('box-shadow', 'light'),
            'bg-color': getCssVar('fill-color', 'blank'),
            'tr-bg-color': getCssVar('bg-color'),
            'expanded-cell-bg-color': getCssVar('fill-color', 'blank'),
            'fixed-left-column': inset 10px 0 10px -10px rgb(0 0 0 / 15%),
            'fixed-right-column': inset -10px 0 10px -10px rgb(0 0 0 / 15%),
            'index': getCssVar('index-normal'),
          ),
          $table
        );
        
        $table-font-size: () !default;
        $table-font-size: map.merge(
          (
            'large': getCssVar('font-size', 'base'),
            'default': 14px,
            'small': 12px,
          ),
          $table-font-size
        );
        
        $table-padding: () !default;
        $table-padding: map.merge(
          (
            'large': 12px 0,
            'default': 8px 0,
            'small': 4px 0,
          ),
          $table-padding
        );
        
        $table-cell-padding: () !default;
        $table-cell-padding: map.merge(
          (
            'large': 0 16px,
            'default': 0 12px,
            'small': 0 8px,
          ),
          $table-cell-padding
        );
        
        // Pagination
        // css3 var in packages/theme-chalk/src/pagination.scss
        $pagination: () !default;
        $pagination: map.merge(
          (
            'font-size': 14px,
            'bg-color': getCssVar('fill-color', 'blank'),
            'text-color': getCssVar('text-color-primary'),
            'border-radius': 2px,
            'button-color': getCssVar('text-color-primary'),
            'button-width': 32px,
            'button-height': 32px,
            'button-disabled-color': getCssVar('text-color-placeholder'),
            'button-disabled-bg-color': getCssVar('fill-color', 'blank'),
            'button-bg-color': getCssVar('fill-color'),
            'hover-color': getCssVar('color-primary'),
            'font-size-small': 12px,
            'button-width-small': 24px,
            'button-height-small': 24px,
            'item-gap': 16px,
          ),
          $pagination
        );
        
        // Popup
        // css3 var in packages/theme-chalk/src/popup.scss
        $popup: () !default;
        $popup: map.merge(
          (
            'modal-bg-color': getCssVar('color-black'),
            'modal-opacity': 0.5,
          ),
          $popup
        );
        
        // Popover
        // css3 var in packages/theme-chalk/src/popover.scss
        $popover: () !default;
        $popover: map.merge(
          (
            'bg-color': getCssVar('bg-color', 'overlay'),
            'font-size': getCssVar('font-size-base'),
            'border-color': getCssVar('border-color-lighter'),
            'padding': 12px,
            'padding-large': 18px 20px,
            'title-font-size': 16px,
            'title-text-color': getCssVar('text-color-primary'),
            'border-radius': 4px,
          ),
          $popover
        );
        
        // popper
        // Pay attention to the difference between 'popper' and 'popover'
        $popper: () !default;
        $popper: map.merge(
          (
            'border-radius': var(#{getCssVarName('popover-border-radius')}, 4px),
          ),
          $popper
        );
        
        // skeleton
        $skeleton: () !default;
        $skeleton: map.merge(
          (
            'color': getCssVar('fill-color'),
            'to-color': getCssVar('fill-color', 'darker'),
          ),
          $skeleton
        );
        
        // Tag
        // css3 var in packages/theme-chalk/src/tag.scss
        $tag: () !default;
        $tag: map.merge(
          (
            'font-size': 12px,
            'border-radius': 4px,
            'border-radius-rounded': 9999px,
          ),
          $tag
        );
        
        $tag-height: () !default;
        $tag-height: map.merge(
          (
            'large': 32px,
            'default': 24px,
            'small': 20px,
          ),
          $tag-height
        );
        
        $tag-padding: () !default;
        $tag-padding: map.merge(
          (
            'large': 12px,
            'default': 10px,
            'small': 8px,
          ),
          $tag-padding
        );
        
        $tag-icon-size: () !default;
        $tag-icon-size: map.merge(
          (
            'large': 16px,
            'default': 14px,
            'small': 12px,
          ),
          $tag-icon-size
        );
        
        // Text
        // css3 var in packages/theme-chalk/src/text.scss
        $text: () !default;
        $text: map.merge(
          (
            'font-size': getCssVar('font-size', 'base'),
            'color': getCssVar('text-color', 'regular'),
          ),
          $text
        );
        
        $text-font-size: () !default;
        $text-font-size: map.merge(
          (
            'large': getCssVar('font-size', 'medium'),
            'default': getCssVar('font-size', 'base'),
            'small': getCssVar('font-size', 'extra-small'),
          ),
          $text-font-size
        );
        
        // Tree
        // css3 var in packages/theme-chalk/src/tree.scss
        $tree: () !default;
        $tree: map.merge(
          (
            'node-content-height': 26px,
            'node-hover-bg-color': getCssVar('fill-color', 'light'),
            'text-color': getCssVar('text-color-regular'),
            'expand-icon-color': getCssVar('text-color-placeholder'),
          ),
          $tree
        );
        
        // Dropdown
        $dropdown: () !default;
        $dropdown: map.merge(
          (
            'menu-box-shadow': getCssVar('box-shadow-light'),
            'menuItem-hover-fill': getCssVar('color-primary-light-9'),
            'menuItem-hover-color': getCssVar('color-primary'),
            'menu-index': 10,
          ),
          $dropdown
        );
        
        // drawer
        $drawer: () !default;
        $drawer: map.merge(
          (
            'bg-color':
              var(#{getCssVarName('dialog', 'bg-color')}, #{getCssVar('bg-color')}),
            'padding-primary': var(#{getCssVarName('dialog', 'padding-primary')}, 20px),
          ),
          $drawer
        );
        
        // Badge
        // css3 var in packages/theme-chalk/src/badge.scss
        $badge: () !default;
        $badge: map.merge(
          (
            'bg-color': getCssVar('color-danger'),
            'radius': 10px,
            'font-size': 12px,
            'padding': 6px,
            'size': 18px,
          ),
          $badge
        );
        
        // Card
        $card: () !default;
        $card: map.merge(
          (
            'border-color': getCssVar('border-color', 'light'),
            'border-radius': 4px,
            'padding': 20px,
            'bg-color': getCssVar('fill-color', 'blank'),
          ),
          $card
        );
        
        // Slider
        // css3 var in packages/theme-chalk/src/slider.scss
        $slider: () !default;
        $slider: map.merge(
          (
            'main-bg-color': getCssVar('color-primary'),
            'runway-bg-color': getCssVar('border-color-light'),
            'stop-bg-color': getCssVar('color-white'),
            'disabled-color': getCssVar('text-color-placeholder'),
            'border-radius': 3px,
            'height': 6px,
            'button-size': 20px,
            'button-wrapper-size': 36px,
            'button-wrapper-offset': -15px,
          ),
          $slider
        );
        
        // Menu
        // css3 var in packages/theme-chalk/src/menu.scss
        $menu: () !default;
        $menu: map.merge(
          (
            'active-color': getCssVar('color-primary'),
            'text-color': getCssVar('text-color-primary'),
            'hover-text-color': getCssVar('color-primary'),
            'bg-color': getCssVar('fill-color', 'blank'),
            'hover-bg-color': getCssVar('color-primary-light-9'),
            'item-height': 56px,
            'sub-item-height': calc(#{getCssVar('menu-item-height')} - 6px),
            'horizontal-height': 60px,
            'horizontal-sub-item-height': 36px,
            'item-font-size': getCssVar('font-size-base'),
            'item-hover-fill': getCssVar('color-primary-light-9'),
            'border-color': getCssVar('border-color'),
            'base-level-padding': 20px,
            'level-padding': 20px,
            'icon-width': 24px,
          ),
          $menu
        );
        
        // Rate
        $rate: () !default;
        $rate: map.merge(
          (
            'height': 20px,
            'font-size': getCssVar('font-size-base'),
            'icon-size': 18px,
            'icon-margin': 6px,
            // seems not be used, to be removed
            // 'icon-color': getCssVar('text-color-placeholder),
            'void-color': getCssVar('border-color', 'darker'),
            'fill-color': #f7ba2a,
            'disabled-void-color': getCssVar('fill-color'),
            'text-color': getCssVar('text-color', 'primary'),
          ),
          $rate
        );
        
        // DatePicker
        // css3 var packages/theme-chalk/src/date-picker/var.scss
        $datepicker: () !default;
        $datepicker: map.merge(
          (
            'text-color': getCssVar('text-color-regular'),
            'off-text-color': getCssVar('text-color-placeholder'),
            'header-text-color': getCssVar('text-color-regular'),
            'icon-color': getCssVar('text-color-primary'),
            'border-color': getCssVar('disabled-border-color'),
            'inner-border-color': getCssVar('border-color-light'),
            'inrange-bg-color': getCssVar('border-color-extra-light'),
            'inrange-hover-bg-color': getCssVar('border-color-extra-light'),
            'active-color': getCssVar('color-primary'),
            'hover-text-color': getCssVar('color-primary'),
          ),
          $datepicker
        );
        
        $date-editor: () !default;
        $date-editor: map.merge(
          (
            'width': 220px,
            'monthrange-width': 300px,
            'daterange-width': 350px,
            'datetimerange-width': 400px,
          ),
          $date-editor
        );
        
        // Loading
        // css3 var in packages/theme-chalk/src/loading.scss
        $loading: () !default;
        $loading: map.merge(
          (
            'spinner-size': 42px,
            'fullscreen-spinner-size': 50px,
          ),
          $loading
        );
        
        // Scrollbar
        // css3 var in packages/theme-chalk/src/scrollbar.scss
        $scrollbar: () !default;
        $scrollbar: map.merge(
          (
            'opacity': 0.3,
            'bg-color': getCssVar('text-color-secondary'),
            'hover-opacity': 0.5,
            'hover-bg-color': getCssVar('text-color-secondary'),
          ),
          $scrollbar
        );
        
        // Carousel
        // css3 var in packages/theme-chalk/src/carousel.scss
        $carousel: () !default;
        $carousel: map.merge(
          (
            'arrow-font-size': 12px,
            'arrow-size': 36px,
            'arrow-background': rgba(31, 45, 61, 0.11),
            'arrow-hover-background': rgba(31, 45, 61, 0.23),
            'indicator-width': 30px,
            'indicator-height': 2px,
            'indicator-padding-horizontal': 4px,
            'indicator-padding-vertical': 12px,
            'indicator-out-color': getCssVar('border-color-hover'),
          ),
          $carousel
        );
        
        // Collapse
        // css3 var in packages/theme-chalk/src/collapse.scss
        $collapse: () !default;
        $collapse: map.merge(
          (
            'border-color': getCssVar('border-color-lighter'),
            'header-height': 48px,
            'header-bg-color': getCssVar('fill-color', 'blank'),
            'header-text-color': getCssVar('text-color-primary'),
            'header-font-size': 13px,
            'content-bg-color': getCssVar('fill-color', 'blank'),
            'content-font-size': 13px,
            'content-text-color': getCssVar('text-color-primary'),
          ),
          $collapse
        );
        
        // Transfer
        // css3 var in packages/theme-chalk/src/transfer.scss
        $transfer: () !default;
        $transfer: map.merge(
          (
            'border-color': getCssVar('border-color-lighter'),
            'border-radius': getCssVar('border-radius-base'),
            'panel-width': 200px,
            'panel-header-height': 40px,
            'panel-header-bg-color': getCssVar('fill-color', 'light'),
            'panel-footer-height': 40px,
            'panel-body-height': 278px,
            'item-height': 30px,
            'filter-height': 32px,
          ),
          $transfer
        );
        
        // Timeline
        // css3 var in packages/theme-chalk/src/timeline-item.scss
        $timeline: () !default;
        $timeline: map.merge(
          (
            'node-size-normal': 12px,
            'node-size-large': 14px,
            'node-color': getCssVar('border-color-light'),
          ),
          $timeline
        );
        
        // Tabs
        // css3 var in packages/theme-chalk/src/tabs.scss
        $tabs: () !default;
        $tabs: map.merge(
          (
            'header-height': 40px,
          ),
          $tabs
        );
        
        // Backtop
        // css3 var in packages/theme-chalk/src/backtop.scss
        $backtop: () !default;
        $backtop: map.merge(
          (
            'bg-color': getCssVar('bg-color', 'overlay'),
            'text-color': getCssVar('color-primary'),
            'hover-bg-color': getCssVar('border-color-extra-light'),
          ),
          $backtop
        );
        
        // Link
        // css3 var in packages/theme-chalk/src/link.scss
        $link: () !default;
        $link: map.merge(
          (
            'font-size': getCssVar('font-size-base'),
            'font-weight': getCssVar('font-weight-primary'),
            'text-color': getCssVar('text-color-regular'),
            'hover-text-color': getCssVar('color-primary'),
            'disabled-text-color': getCssVar('text-color-placeholder'),
          ),
          $link
        );
        
        $link-text-color: () !default;
        
        @each $type in $types {
          $link-text-color: map.merge(
            $link-text-color,
            (
              $type: map.get($colors, $type, 'base'),
            )
          ) !global;
        }
        
        // Calendar
        // css3 var in packages/theme-chalk/src/calendar.scss
        $calendar: () !default;
        $calendar: map.merge(
          (
            'border':
              var(
                #{getCssVarName('table-border')},
                1px solid #{getCssVar('border-color-lighter')}
              ),
            'header-border-bottom': getCssVar('calendar-border'),
            'selected-bg-color': getCssVar('color', 'primary', 'light-9'),
            'cell-width': 85px,
          ),
          $calendar
        );
        
        // Form
        // css3 var in packages/theme-chalk/src/form.scss
        $form: () !default;
        $form: map.merge(
          (
            'label-font-size': getCssVar('font-size-base'),
            'inline-content-width': 220px,
          ),
          $form
        );
        
        // Avatar
        // css3 var in packages/theme-chalk/src/avatar.scss
        $avatar: () !default;
        $avatar: map.merge(
          (
            'text-color': getCssVar('color-white'),
            'bg-color': getCssVar('text-color', 'disabled'),
            'text-size': 14px,
            'icon-size': 18px,
            'border-radius': getCssVar('border-radius-base'),
          ),
          $avatar
        );
        
        $avatar-size: () !default;
        $avatar-size: map.merge(
          (
            'large': 56px,
            'default': 40px,
            'small': 24px,
          ),
          $avatar-size
        );
        
        // Empty
        // css3 var in packages/theme-chalk/src/empty.scss
        $empty: () !default;
        $empty: map.merge(
          (
            'padding': 40px 0,
            'image-width': 160px,
            'description-margin-top': 20px,
            'bottom-margin-top': 20px,
            'fill-color-0': getCssVar('color-white'),
            'fill-color-1': #fcfcfd,
            'fill-color-2': #f8f9fb,
            'fill-color-3': #f7f8fc,
            'fill-color-4': #eeeff3,
            'fill-color-5': #edeef2,
            'fill-color-6': #e9ebef,
            'fill-color-7': #e5e7e9,
            'fill-color-8': #e0e3e9,
            'fill-color-9': #d5d7de,
          ),
          $empty
        );
        
        // Descriptions
        // css3 var in packages/theme-chalk/src/descriptions.scss
        $descriptions: () !default;
        $descriptions: map.merge(
          (
            'table-border': 1px solid getCssVar('border-color-lighter'),
            'item-bordered-label-background': getCssVar('fill-color', 'light'),
          ),
          $descriptions
        );
        
        // Result
        // css3 var in packages/theme-chalk/src/result.scss
        $result: () !default;
        $result: map.merge(
          (
            'padding': 40px 30px,
            'icon-font-size': 64px,
            'title-font-size': 20px,
            'title-margin-top': 20px,
            'subtitle-margin-top': 10px,
            'extra-margin-top': 30px,
          ),
          $result
        );
        
        // Upload
        // css3 var in packages/theme-chalk/src/upload.scss
        $upload: () !default;
        $upload: map.merge(
          (
            'dragger-padding-horizontal': 40px,
            'dragger-padding-vertical': 10px,
          ),
          $upload
        );
        
        // transition
        $transition: () !default;
        $transition: map.merge(
          (
            'all': all getCssVar('transition-duration')
              getCssVar('transition-function-ease-in-out-bezier'),
            'fade': opacity getCssVar('transition-duration')
              getCssVar('transition-function-fast-bezier'),
            'md-fade': (
              transform getCssVar('transition-duration')
                getCssVar('transition-function-fast-bezier'),
              opacity getCssVar('transition-duration')
                getCssVar('transition-function-fast-bezier'),
            ),
            'fade-linear': opacity getCssVar('transition-duration-fast') linear,
            'border': border-color getCssVar('transition-duration-fast')
              getCssVar('transition-function-ease-in-out-bezier'),
            'box-shadow': box-shadow getCssVar('transition-duration-fast')
              getCssVar('transition-function-ease-in-out-bezier'),
            'color': color getCssVar('transition-duration-fast')
              getCssVar('transition-function-ease-in-out-bezier'),
          ),
          $transition
        );
        
        $transition-duration: () !default;
        $transition-duration: map.merge(
          (
            '': 0.3s,
            'fast': 0.2s,
          ),
          $transition-duration
        );
        
        $transition-function: () !default;
        $transition-function: map.merge(
          (
            'ease-in-out-bezier': cubic-bezier(0.645, 0.045, 0.355, 1),
            'fast-bezier': cubic-bezier(0.23, 1, 0.32, 1),
          ),
          $transition-function
        );
        
        // header
        $header: () !default;
        $header: map.merge(
          (
            'padding': 0 20px,
            'height': 60px,
          ),
          $header
        );
        // main
        $main: () !default;
        $main: map.merge(
          (
            'padding': 20px,
          ),
          $main
        );
        // footer
        $footer: () !default;
        $footer: map.merge(
          (
            'padding': 0 20px,
            'height': 60px,
          ),
          $footer
        );
        
        // Break-point
        $sm: 768px !default;
        $md: 992px !default;
        $lg: 1200px !default;
        $xl: 1920px !default;
        
        $breakpoints: (
          'xs': '(max-width: #{$sm - 1})',
          'sm': '(min-width: #{$sm})',
          'md': '(min-width: #{$md})',
          'lg': '(min-width: #{$lg})',
          'xl': '(min-width: #{$xl})',
        ) !default;
        
        $breakpoints-spec: (
          'xs-only': '(max-width: #{$sm - 1})',
          'sm-and-up': '(min-width: #{$sm})',
          'sm-only': '(min-width: #{$sm}) and (max-width: #{$md - 1})',
          'sm-and-down': '(max-width: #{$md - 1})',
          'md-and-up': '(min-width: #{$md})',
          'md-only': '(min-width: #{$md}) and (max-width: #{$lg - 1})',
          'md-and-down': '(max-width: #{$lg - 1})',
          'lg-and-up': '(min-width: #{$lg})',
          'lg-only': '(min-width: #{$lg}) and (max-width: #{$xl - 1})',
          'lg-and-down': '(max-width: #{$xl - 1})',
          'xl-only': '(min-width: #{$xl})',
        ) !default;
        
        ```
        
- 在 src/assets/styles/element/index.scss 中加入我們想修改變數內容
    
    ```scss
    // src/assets/styles/element/index.scss
    @forward 'element-plus/theme-chalk/src/common/var.scss' with (
      $colors: (
        'primary': (
          'base': #003261,
        ),
        'success': (
          'base': #21ba45,
        ),
        'warning': (
          'base': #f2711c,
        ),
        'danger': (
          'base': #db2828,
        ),
        'error': (
          'base': #db2828,
        ),
        'info': (
          'base': #42b8dd,
        ),
      ),
      $button-padding-horizontal: (
        'default': 80px,
      )
    );
    // 功能 @use xxx as * 同等於 impport
    @use "element-plus/theme-chalk/src/index.scss" as *; // 這代表非上方定義的部分就以原本預設樣式導入 
    ```
    
- 我們將此修改檔與我們 tailwind 引入檔以及自訂的 root 檔引入統整於於 assets/styles/index.scss 中
    
    ```scss
    // src/assets/styles/index.scss 
    @use "./tailwind.scss" as *; // 此為優先，避免 element plus 的樣式被其覆蓋
    @use "./element/index.scss" as *; // 將剛才改的內容放在這邊 (要放在 tailwind 之後)
    @use "./root.scss" as *; // 自己定義 html, body 等全域樣式
    
    ```
    
- 再一同匯入 main.ts 中
    
    ```scss
    import { createApp } from 'vue'
    import ElementPlus from 'element-plus'
    import './assets/styles/index.scss' // 匯入已彙整的樣式
    import App from './App.vue'
    
    const app = createApp(App)
    
    app.use(ElementPlus)
    app.mount('#app')
    
    ```
    
- **補充: 按需引入樣式 ( tailwind + elementPlus 不建議使用 )**
    
    **說明:** 所謂按需使用，其實是個人較不建議的做法，其顧名思義就是只引入有使用到的套件，除了操作較繁瑣外，在使用時也容易漏掉應引入元件導致格式跑掉，再者，筆者在測試時是為了符合實戰需求，所以會加上主題更動，但在測試筆者在測試這部份時就算按照官方網站的做法中間也出了不少問題，要馬改不了主題，要馬中間因為 sass 重複載入 (@use xxx) 而出錯，導致中間也白花了不少時間
    
    以下為官網文章描述，這邊實際個人測試的想法會以 `⇒` 標示在其後
    
    ```tsx
    // vite.config.ts
    import path from 'path'
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    // 官網:你也可以使用 unplugin-vue-components =>筆者:不建議使用，因為樣式會跑掉 
    // import Components from 'unplugin-vue-components/vite'
    // import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
    
    //官網: 或者使用 unplugin-element-plus =>筆者:實質測試只有此方法樣式可用
    import ElementPlus from 'unplugin-element-plus/vite'
    
    // vite.config.ts
    export default defineConfig({
      resolve: {
        alias: {
          '~/': `${path.resolve(__dirname, 'src')}/`,
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@use "~/styles/element/index.scss" as *;`, => // 筆者:要特別注意這檔案的定義
          },
        },
      },
      plugins: [
        vue(),
        // use unplugin-vue-components
        // Components({
        //   resolvers: [
        //     ElementPlusResolver({
        //       importStyle: "sass",
        //       // directives: true,
        //       // version: "2.1.5",
        //     }),
        //   ],
        // }),
        // 官網:或者使用 unplugin-element-plus => 筆者:實質測試只有此方法樣式可用
        ElementPlus({
          useSource: true,
        }),
      ],
    })
    ```
    
    在手動載入時，我們需要特別注意我們客製化的主題樣式，我們只需定義要修改的部分並且絕對不要引入全部樣式的內容，會出錯!!!! (筆者在這邊卡很久)
    
    ```tsx
    // styles/element/index.scss
    /* 官網:只需要重写你需要的即可 */
    @forward 'element-plus/theme-chalk/src/common/var.scss' with (
      $colors: (
        'primary': (
          'base': green,
        ),
      ),
    );
    
    // 官網:如果只是按需导入，则可以忽略以下内容。=> 筆者:按需引入絕對不可以引入以下內容會出錯!!!!!!!
    // 官網:如果你想导入所有样式:
    // @use "element-plus/theme-chalk/src/index.scss" as *;
    ```
    
    若不小心將所有樣式引入，會出現類似下方這種錯誤
    
    ![https://i.imgur.com/qj3BGck.png[/img]](https://i.imgur.com/qj3BGck.png[/img])
    
    在使用時，只將有用到的元件引入使用
    
    ```tsx
    // src/components/HelloWorld.vue
    <script lang='ts'>
    import { defineComponent } from 'vue'
    import {
      ElCard,
      ElButton,
      ElForm,
      ElFormItem,
      ElInput} from 'element-plus'
      export default defineComponent({
      components: {
        ElCard,
        ElButton,
      ElForm,
      ElFormItem,
      ElInput,
      },
      })
    </script>
    
    <script setup lang="ts">
    ...
    </script>
    
    <template>
     
      <div class="card">
    		...
        <!-- element plus 的 form & button 組件 -->
        <el-button type="primary" class="bg-red-600 border-red-800 hover:bg-red-700 hover:border-red-800">Primary</el-button>
        <el-card>
          <el-form :model="form" label-width="120px">
    		 ...
      </el-form>
        </el-card>
      </div>
    	...
    </template>
    
    ```
    

**2-3-3. 呈現結果**

先將 Element plus 變更主題的樣式以及 Tailwindcss 個別設定的樣式分開，皆能正常呈現

為避免兩者 CSS 樣式互相影響，這邊先以分開的方式測試其呈現，範例如下

- **src/components/Helloworld.vue**
    
    ```tsx
    // src/components/Helloworld.vue
    <script setup lang="ts">
    ....
    </script>
    
    <template>
    	...
      <div class="card">
        <!-- tailwindcss 樣式測試 -->
        <button type="button" class="text-white bg-red-500" @click="count++">count is {{ count }}</button>
        <p class="text-indigo-500">
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
        <!-- element plus 的 form & button 組件 -->
        <el-button type="primary">Primary</el-button>
        <el-card>
          <el-form :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Activity zone">
          <el-select v-model="form.region" placeholder="please select your zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Activity time">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="Pick a date"
              class="w-full"
              style="width: 100%;"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-time-picker
              v-model="form.date2"
              placeholder="Pick a time"
              style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="form.delivery" />
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
          <el-radio-group v-model="form.resource">
            <el-radio label="Sponsor" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="form.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
        </el-card>
      </div>
    ...
    </template>
    
    ```
    

而實際畫面呈現如下，可以發現 element plus 修改主題色後的元件，以及 Tailwindcss 調整的按鈕樣式皆可各別完整呈現

![https://i.imgur.com/NgCNg7h.png](https://i.imgur.com/NgCNg7h.png)

### 2-4. 觀察 & 調整 可能的樣式衝突

嘗試在 element Plus 的元件上使用 Tailwind 調整其樣式

我們在上方範例中的名為 primary 的 el-button 中嘗試以 Tailwind 修改樣式，加上以 tailwindcss class 設定的按鈕背景色，hover 後的背景色樣式，測試程式碼如下

```tsx
 <el-button type="primary" class="bg-red-600 border-red-800 hover:bg-red-700 hover:border-red-800">Primary</el-button>
```

最後呈現的結果如下

- el-button 背景色 → 以 elementPlus 的背景色呈現
    
    觀察: tw (tailwind) 以及 el (elementPlus) 兩者樣式在這邊權重一樣 (皆單一 class)，但由於 引入時 el 較 tw 後引入，因此會以 el 為主
    
    ![https://i.imgur.com/OiMCngY.png](https://i.imgur.com/OiMCngY.png)
    
- el-button hover 後的背景色 → 以 Tailwind 的背景色呈現
    
    觀察: tw 權重較重 (  tw 有 .hover class 以及兩個偽類 ，而 el 只有一個 class 以及一個偽類)，所以會以 tw 的樣式呈現
    
    ![https://i.imgur.com/oQ0MNDN.png](https://i.imgur.com/oQ0MNDN.png)
    

### 2-5. 使用建議

筆者後續也陸續測試了不同的 elementPlus 元件 ex: el-form el-form-item 或是修改不同的樣式部分 el-button border 等，基本上可以得到以下結論

> **element-plus 相關的 component 樣式 與 tailwind 樣式需分開使用 & 各自管理，不要混用!**
> 

若有混用根本無法預期其最後呈現的狀況，要更動樣式更是不容易處理，elementPlus 樣式因應元件不同巢狀 & 階層邏輯不同皆會影響到其樣式的權重，此時若與 Tailwind 混雜，會變得極其不好維護

## **三、Nuxt 環境的雙 CSS 框架結合測試**

- 筆者測試時所使用版本
    - Node 18.19.0
    - @nuxtjs/tailwindcss 6.11.4
    - sass  1.71.1
    - nuxt 3.10.3
    - @element-plus/nuxt 1.0.7

### 3-1. 以 npx 起一個 Nuxt3 的空專案

```powershell
npx nuxi@latest init <project-name>
```

選擇 yarn 

### 3-2. 安裝 & 配置 Tailwind

@nuxt/tailwindcss 官網: [https://tailwindcss.nuxtjs.org/getting-started/installation](https://tailwindcss.nuxtjs.org/getting-started/installation)

我們使用已與 Nuxt 做整合的模組套件 [@nuxt/tailwindcss](https://nuxt.com/modules/tailwindcss) 而不是 tailwindcss ，主要是其已與 Nuxt 做較完善的嵌合，可以讓我們走較少的彎路 

安裝 

```tsx
yarn add --dev @nuxtjs/tailwindcss
```

在 nuxt.config.ts 配置

```tsx
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss'
  ]
})
```

使用以下指令建立 tailwind.config.js ( 這是為了自訂 tailwind 樣式使用，若想只使用預設樣式，此文件也可以不生成 )

```tsx
npx tailwindcss init
```

此時就會產生以下內容的 tailwind.config.ts ( 更多設定可參考 [tailwind/config](https://tailwindcss.nuxtjs.org/tailwind/config) )

```tsx
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [ // 不需要特別設置，因為若不特別設置其會使用預定設置
	],
  plugins: [],
  theme: {
  },
}

```

一般來說，content 欄位需要放入想讓 Tailwind 解析文件的範圍 & 位置，但這邊 nuxt/tailwind 模組以事先針對Nuxt 常用的檔案位置做預先設置，讓 Nuxt 啟動時若 **content 無自訂內容則自動套用預設設定內容如下** ( 擷取自[官網](https://tailwindcss.nuxtjs.org/tailwind/config) )

```tsx
// tailwind.config.js 預設內容
export default {
  theme: {},
  plugins: [],
  content: [
    `${srcDir}/components/**/*.{vue,js,ts}`,
    `${srcDir}/layouts/**/*.vue`,
    `${srcDir}/pages/**/*.vue`,
    `${srcDir}/composables/**/*.{js,ts}`,
    `${srcDir}/plugins/**/*.{js,ts}`,
    `${srcDir}/utils/**/*.{js,ts}`,
    `${srcDir}/App.{js,ts,vue}`,
    `${srcDir}/app.{js,ts,vue}`,
    `${srcDir}/Error.{js,ts,vue}`,
    `${srcDir}/error.{js,ts,vue}`,
    `${srcDir}/app.config.{js,ts}`
  ]
}
```

為確保筆者自身所建立的 tailwind.config.ts 的設定文件有被載入，筆者這邊添加了自訂主題顏色如下

```tsx
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: '#5c6ac4', // 自訂主題色
      }
    }
  },
  content: [
],
  plugins: [],
}

```

由於筆者較習慣使用 scss 來處理 css 文件，所以這邊安裝 sass

```tsx
yarn add sass
```

先建立我們要使用的全域 scss 樣式設定 ~/assets/scss/index.scss

```scss
// ~/assets/scss/index.scss
html,
body,
#app {
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
```

接下來我們建立 ~/assets/scss/tailwind.scss 並將 tailwind 基本設定引入 

```tsx
// assets/scss/tailwind.scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

接下來記得在 nuxt.config.ts 中設置這些變更對應的檔案位置 ( 更多設定可參考 [**Configuration**](https://tailwindcss.nuxtjs.org/getting-started/configuration#configpath) )

```tsx
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  // 載入自訂的 style
  css: ['~/assets/scss/index.scss'],
  tailwindcss: { // 自訂的 tailwindcss 設定設置位置
    cssPath: '~/assets/scss/tailwind.scss', // 這是自訂的 tailwind 引入路徑
  }
})
```

確保路徑位置有被 tailwindcss 解析( 是否有採用預設 content 值 ) & 這邊自訂的 tailwind.config.ts 有被正確載入，這邊將原 app.vue 刪掉，並替換為 ~pages/index.vue

```tsx
//pages/index.vue
<template>
  <div>
    <h2 class='text-red-400 font-bold'>這是測試</h2>
    <h3 class='text-primary'>自訂顏色引入</h3>
  </div>
</template>
```

確認顏色有正確載入，如下

![https://i.imgur.com/awDu746.png](https://i.imgur.com/awDu746.png)

### 3-3. 安裝 & 配置 element-plus

@element-plus/nuxt 官網: [https://nuxt.com/modules/element-plus](https://nuxt.com/modules/element-plus)

與 tailwindcss 一樣，我們找與 nuxt 本身整合較好的模組 @element-plus/nuxt 來進行我們的安裝

```tsx
yarn add element-plus @element-plus/nuxt -D
```

接下來我們建立 ~/assets/scss/element/index.scss 將我們想調整的樣式變數引入 ( 當然若想要使用預設樣式則不用這置這段 )

```scss
// assets/scss/element/index.scss 
$-colors: (
  'primary': (
    'base': rgba(107,33,168, 1),
  ),
  'success': (
    'base': #67c23a,
  ),
  'warning': (
    'base': #e6a23c,
  ),
  'danger': (
    'base': #f56c6c,
  ),
  'error': (
    'base': #f56c6c,
  ),
  'info': (
    'base': #909399,
  ),
);

@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: $-colors
);
```

在全域的樣式引用 element-plus 的樣式

```scss
// ~/assets/scss/index.scss
html,
body,
#app {
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

a {
  font-weight: 400;
  color: var(--el-color-primary); // 加入 element plus 的樣式
}

```

接下來記得在 nuxt.config.ts 中設置這些變更對應的檔案位置

```tsx
// nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/index.scss'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt'
  ],
  tailwindcss: {
    cssPath: '~/assets/scss/tailwind.scss',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: { // 要記得將自訂的 element var 內容引入
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    },
  },
  elementPlus: { // 在 elementPlus 要調整設定時的調整處
    icon: 'ElIcon',
    importStyle: 'scss', // 要記得將這邊設定成 scss 才會吃到我們在 vite 設定的引入樣式
  },
})

```

確保路徑位置 element-plus 有正常被載入 & tailwindcss 解析( 是否有採用預設 content 值 )解析正常，這邊將原 app.vue 刪掉，並替換為 ~pages/index.vue

```tsx
<template>
  <div>
    <h2 class='text-red-400 font-bold'>這是測試</h2>
    <h3 class='text-primary'>自訂顏色引入</h3>
    <a href="">連結顏色</a> // 確認全域樣式所引用的 element-plus 樣式是否能順利載入
    <el-button type="primary" @click="ElMessage('hello')">button</el-button> // 確認 el-button 能順利載入 
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton> // el-button &icon 能順利載入
    <LazyElButton type="warning">lazy button</LazyElButton>
  </div>
</template>

```

呈現結果如下，代表 element-plus 組件, element-plus 自訂主題色, element-icon, 全域引用的 element-plus 樣式, 以及 tailwindcss 皆能順利載入

![https://i.imgur.com/XF4PvHv.png[/img]](https://i.imgur.com/XF4PvHv.png[/img])

### 3-4. 觀察 & 調整 可能的樣式衝突

與我們在 vite 起的 vue 模板測試方式相同，但我們加上純 tailwindcss 刻的 button 樣式作對比

```tsx
// pages/index.vue
<template>
  <div>
    <a class='block' href="">tw & element ui 混用</a>
		<!--純 tailwindcss button-->
    <button type='button' class="rounded py-1 px-2 mx-1 bg-red-600 border-red-800 hover:bg-red-700 hover:border-red-800">tailwindcss</button>
    <!--element-plus 的 el-button 有 type 樣式 加上 tailwindcss 的樣式-->
		<el-button type="primary" class="bg-red-600 border-red-800 hover:bg-red-700 hover:border-red-800">Primary</el-button>
     <!--element-plus 的 el-button 無 type 樣式 加上 tailwindcss 的樣式-->
		<el-button class="bg-red-600 border-red-800 hover:bg-red-700 hover:border-red-800">Primary</el-button>
  </div>
</template>

```

呈現結果如下，基本上就算權重(element-plus 與 tailwindcss 皆單一 class 樣式)相同，但最終樣式呈現依舊以 element-plus 樣式作呈現，就算拿掉 el-button 的 type 樣式，結果仍相同，tailwindcss 也不會對 element-plus 的樣式造成影響

![https://i.imgur.com/61sNvyL.png](https://i.imgur.com/61sNvyL.png)

但使用 el-form 時，筆者發現使用 tailwindcss 更改 el-form 的邊框 & 背景，或 el-form-item 的邊框皆可以改的動，如下

![https://i.imgur.com/L3yRD4K.png](https://i.imgur.com/L3yRD4K.png)

### 3-5. 使用建議

雖說在 Nuxt 中的部分情況下 Tailwindcss 確實能更改 element-plus 的樣式，但考量到其情況也不穩定，在部分組件上如 el-button 又改不動，考量到這層因素也為方便開發者共同協作，建議 

> **element-plus 相關的 component 樣式 與 tailwind 樣式需分開使用 & 各自管理，不要混用!**
> 

## **四、參考資料來源**

- [https://tailwindcss.com/](https://tailwindcss.com/)
- [https://element-plus.org/zh-CN/guide/quickstart.html](https://element-plus.org/zh-CN/guide/quickstart.html)
- [https://nuxt.com/modules/tailwindcss](https://nuxt.com/modules/tailwindcss)
- [https://nuxt.com/modules/element-plus](https://nuxt.com/modules/element-plus)