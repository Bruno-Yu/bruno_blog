---
title: HackMD使用筆記
description: HackMD使用筆記雜記
tags: ['HackMD']
date: 2022-11-05
type: doc
publish: true
---
# HackMD 學習

### 資源彙整

- 官網介紹 ( [連結](https://hackmd.io/c/tutorials-tw/%2Fs%2Fquick-start-tw) )
- 功能總覽( [連結](https://hackmd.io/features-tw?both) )
- 量子能量塔部落格介紹 ( [連結](https://diabolo94.github.io/2017/11/18/hackmdio/) )
- 使用hackMD 進階功能筆記 ( [連結](https://hackmd.io/@chiaoshin369/Shinbook/https%3A%2F%2Fhackmd.io%2F%40chiaoshin369%2Fhackmd) )
- Markdown 語法大權 ( [連結](https://hackmd.io/@mrcoding/ryZE7k8cN#%E5%88%86%E9%9A%94%E7%B7%9A) )
- HackMD 教學([連結](https://hackmd.io/s/how-to-create-slide-deck-tw))
    
- YAML 語法 ( [連結](https://hackmd.io/yaml-metadata-tw?both#type) )
    - 設定meta
    - 設定簡報模式
    - 設定lang
    - 設定dir文字方向
- 書本模式教學 ( [連結](https://hackmd.io/c/tutorials-tw/%2Fs%2Fhow-to-create-book-tw) )
- 套用主題教學([連結](https://hackmd.io/c/tutorials-tw/https%3A%2F%2Fhackmd.io%2F%40docs%2Fhow-to-embed-note-2))
- 圖表做法 ( [連結](https://hackmd.io/c/tutorials-tw/%2Fs%2Fr1p_loXISn69k3t5cYMbtg) )

### 語法

- 尋找筆記`ctrl`+`shift`+`p`
- 換行`<br>`
- 換文字顏色 `<style>`與`<span>` 加class的型式
- 小區塊 ``...``
- 引用 `>`
- 列表 `-`
- 圖片 `!`
- 上標/下標
    
    ```markdown
    上標： 19^th^
    下標： H~2~O
    ```
    
- 程式碼區塊
    
    ```markdown
    ``` javascript
    程式碼寫在這
    ```
    ```
    
- 文字加底線
    
    ```markdown
    ++文字加底線++
    ```
    
- 粗體/斜體
    
    ```markdown
    *斜體*
    **粗體**
    ```
    
- 螢光筆效果
    - 把字串的前後標在四個等號中間 `==要標色的字==` 就會有螢光筆的效果
    
    ```markdown
    ==標記==
    ```
    
- 色塊做法
    - `:::success` 綠色色塊
    - `:::info` 藍色色塊
    - `:::warning` 黃色色塊
    - `:::danger` 紅色色塊
    - 放文字範例
        
        ```markdown
        :::danger
        danger 的紅色色塊文字，文字也還可以標**粗體**
        >或是引用
        - 或是項目符號
        :::
        ```
        
- 標題共6層
    
    ```
    # 第一層級標題
    ## 第二層級標題
    ### 第三層級標題
    #### 第四層級標題
    ##### 第五層級標題
    ###### 第六層級標題
    ```
    
- 加標籤`###### tags:`
    
    ```markdown
    ###### tags: `HackMD教學` `Disign`
    ```
    
    或使用YAML metadata加
    
    ```markdown
    ---
    tags: tag1, tag2, rage
    ---
    ```
    
- 表格
    
    ```markdown
    | 選項 | 描述 |
    | :------: | ----------- |
    | data   | path to data files to supply the data that will be passed into templates. |
    | engine | engine to be used for processing templates. Handlebars is the default. |
    | ext    | extension to be used for dest files. |
    ```