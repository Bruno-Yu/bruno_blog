---
title: E-Charts 研究
description: 研究如何使用 E-Charts 繪製圖表
tags: ['前端', 'echarts']
date: 2023-07-15
type: doc
publish: true
---
# E-Charts 研究

- 教學文件 [連結](https://isoface.net/isoface/doc/echarts/basic-concept/#echarts%E5%AF%A6%E9%AB%94)
- 每個 Echart 中都可以建立多個圖表和坐標系

## 1. **系列 ( Series ):**

- 代表: 一組數組及他們所對應的圖表，也可理解為一系列的數據
- 須包含: 一組數值、圖表型別 ( series type )，以及這些數據如何對應成圖的參數
    - 圖表型別 ( series type ):
        - 折線圖 ( line )
        - 柱狀圖 ( bar )
        - 餅圖 ( pie )
        - 散點圖 ( scatter )
        - 關係圖 ( graph )
        - 樹圖 ( tree )

![https://i.imgur.com/1XfaV72.png](https://i.imgur.com/1XfaV72.png)

除了將系列數據分別在 series 內部放置外，也可以全都放在 dataset 中，再系列 series 中以 encode 指定各個圖表需對應的數組位置

![https://i.imgur.com/6HUDeVd.png](https://i.imgur.com/6HUDeVd.png)

## 2.元件 ( component ):

- 除了 series ( 系列外 ) echarts 還有其他的各種設定，這邊統稱為元件
- echarts 中常見的元件如下:
    - xAxis ( 直角坐標 x 軸 )
    - yAxis ( 直角坐標 y 軸 )
    - grid ( 直角坐標底板 )
    - angleAxis ( 極坐標系角度軸 )
    - radiusAxis ( 極坐標系半徑軸 )
    - polar ( 極坐標系底板 )
    - geo ( 地理坐標系 )
    - dataZoom ( 數據縮放元件 )
    - visualMap ( 視覺對應元件 )
    - tooltip ( 提示框元件 )
    - toolbar ( 工具欄元件 )
    - lengend component ( 數據圖示元件 )

![https://i.imgur.com/FWcpZuk.png[/img]](https://i.imgur.com/FWcpZuk.png[/img])

## 3. 用 option 描述圖表

- 功能: 使用者使用 option 來描述各種對圖表的各種需求

```jsx
// 建立 echarts 實體。
var dom = document.getElementById('dom-id');
var chart = echarts.init(dom);

// 用 option 描述 `數據`、`數據如何對映成圖形`、`互動行為` 等。
// option 是個大的 JavaScript 對象。
var option = {
    // option 每個屬性是一類元件。
    legend: {...},
    grid: {...},
    tooltip: {...},
    toolbox: {...},
    dataZoom: {...},
    visualMap: {...},
    // 如果有多個同類元件，那麼就是個陣列。例如這裡有三個 X 軸。
    xAxis: [
        // 陣列每項表示一個元件實體，用 type 描述「子型別」。
        {type: 'category', ...},
        {type: 'category', ...},
        {type: 'value', ...}
    ],
    yAxis: [{...}, {...}],
    // 這裡有多個系列，也是構成一個陣列。
    series: [
        // 每個系列，也有 type 描述「子型別」，即「圖表型別」。
        {type: 'line', data: [['AA', 332], ['CC', 124], ['FF', 412], ... ]},
        {type: 'line', data: [2231, 1234, 552, ... ]},
        {type: 'line', data: [[4, 51], [8, 12], ... ]}
    }]
};

// 呼叫 setOption 將 option 輸入 echarts，然後 echarts 渲染圖表。
chart.setOption(option);
```

相關資料 data 也可以放在 series 外，以 dataset 放置，並在 series 中 以 encode 只是需要對應哪個維度的數據 ( 注意: 此方法就可以不用在 xAxis 或 yAxis 中標示數據，但若需要標示 type ( category 或 value ) 則可放在 xAxis 或 yAxis 位置 )

```jsx
var option = {
    dataset: {
        source: [
            [121, 'XX', 442, 43.11],
            [663, 'ZZ', 311, 91.14],
            [913, 'ZZ', 312, 92.12],
            ...
        ]
    },
    xAxis: {},
    yAxis: {},
    series: [
        // 數據從 dataset 中取，encode 中的數值是 dataset.source 的維度 index 
				// 維度是列，而這邊 encode 的數值是行 以 index 作為指派
        {type: 'bar', encode: {x: 1, y: 0}},
        {type: 'bar', encode: {x: 1, y: 2}},
        {type: 'scatter', encode: {x: 1, y: 3}},
        ...
    ]
};
```

## 4. 元件的定位

- 定位方式與 CSS 中的絕對定位雷同，主要以 top / right / down / left /width / height 進行絕對定位，其位置是基於 exharts 綁定的 Dom 節點
    - 其設定方式
        - 以數值不加單位 ex: left 54 就等於 54 px
        - 以字串加 %  ex: right: 20%
    - 以下範例，是在 grid 元件 ( 直角坐標系的底板 ) 進行設定

![https://i.imgur.com/1Nod8HL.png[/img]](https://i.imgur.com/1Nod8HL.png[/img])

- 從上圖，可以區分為兩個類型 橫向與縱向，而只要橫向與縱向各設定一種，基本上圖形就能自動算出
    - 橫向: left, right, width
    - 縱向: top, bottom, height

## 5. 坐標系

- 在大部分的系列上都需要以座標來標示位置 ex: line ( 折線圖 )、bar ( 柱狀圖 )、scatter ( 散點圖 )、 heatmap ( 熱力圖 ) …etc. 除了 pie ( 餅圖 )、tree ( 樹圖 ) 等等可以不用座標而獨立存在，而 graph ( 關係圖 ) 則既可獨立存在也可布局在座標中

- scatter ( 散點體系 ): echart 自動關聯 data 內的陣列資料，以 data 中陣列的第一個數值為 x 另一個為 y 在 grid 上呈現

![https://i.imgur.com/Fm8zjdh.png[/img]](https://i.imgur.com/Fm8zjdh.png[/img])

- 在直角坐標系中，當有多個 y  軸要對應時，可以在 series 中 以 yAxisIndex 指派 y 軸內對應資料 ( 同理 反之也可使用 xAxisIndex 指定 x 軸資料 )

![https://i.imgur.com/NvhO4Ek.png[/img]](https://i.imgur.com/NvhO4Ek.png[/img])

- 當同一個 option 中 ( echart 實體 ) 有多張圖，可用 grid 分開
    - grid 中有兩張圖，標註顯示位置
    - xAxis  中使用 gridIndex 用以標示 此 x 軸對應 grid 中的哪張圖 ( yAxis 同理 )
    - series 則使用 xAxisIndex 與 xAxis 對應

![https://i.imgur.com/aKqnSKu.png[/img]](https://i.imgur.com/aKqnSKu.png[/img])

## 6. ECharts 中的樣式設置

- 種類分為
    - 顏色主題 ( Theme )
    - 調色盤
    - 直接樣式設定 ( itemStyle、lineStyle、areaStyle、label… )
    - 視覺對應 ( visualMap )

### 1. 顏色主題 ( Theme )

- 從 Echart 4 開始，除了預設主題外，還有兩套主題，分為為 ‘light’ 與 ‘dark’

```jsx

// light 主題
var chart = echarts.init(dom, 'light');

// dark 主題
var chart = echarts.init(dom, 'dark');
```

- 若以上主題皆不喜歡，可以到 [主題編輯器](https://echarts.apache.org/zh/theme-builder.htmlhttps://echarts.apache.org/zh/theme-builder.html) 自行定義主題，存為 JSON ，需要時再行載入

```jsx
// 假設主題名稱是 "vintage"
// 這是 jQuery 的寫法
$.getJSON('xxx/xxx/vintage.json', function (themeJSON) {
    echarts.registerTheme('vintage', JSON.parse(themeJSON))
    var chart = echarts.init(dom, 'vintage');
});
```

### 2. 調色盤

- 可在 option 中設定全域或各 series 自己的調色盤

```jsx
option = {
    // 全域性調色盤。
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

    series: [{
        type: 'bar',
        // 此係列自己的調色盤。
        color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
        ...
    }, {
        type: 'pie',
        // 此係列自己的調色盤。
        color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
        ...
    }]
}
```

### 3. **直接的樣式設定 itemStyle, lineStyle, areaStyle, label, ...**

- 是較常用的方式，在 option 中多處可設定 itemStyle, lineStyle, areaStyle, label…這些的地方可以直接設定圖形元素的顏色、線寬、點的大小、標籤的文字、標籤的樣式等等。

### 4. **高亮的樣式：emphasis**

- 在滑鼠 hover 在元素上方時的高亮樣式表現，預設情況下，高亮是自普通樣式產生的，但是可以自行定義

```jsx
option = {
    series: {
        type: 'scatter',

        // 普通樣式。
        itemStyle: {
            // 點的顏色。
            color: 'red'
        },
        label: {
            show: true,
            // 標籤的文字。
            formatter: 'This is a normal label.'
        },

        // 高亮樣式。
        emphasis: {
            itemStyle: {
                // 高亮時點的顏色。
                color: 'blue'
            },
            label: {
                show: true,
                // 高亮時標籤的文字。
                formatter: 'This is a emphasis label.'
            }
        }
    }
}
```

註: Echarts 4 之前的寫法與這不同

## 7. loading 動畫

- ECharts 預設有提供了一個簡單的載入動畫。只需要呼叫 **[showLoading](https://isoface.net/isoface/doc/%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BD/03.EChart/01.ECharts%E4%BD%BF%E7%94%A8%E8%AA%AA%E6%98%8E/api.html#echartsInstance.showLoading)** 方法顯示。數據載入完成後再呼叫 **[hideLoading](https://isoface.net/isoface/doc/%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BD/03.EChart/01.ECharts%E4%BD%BF%E7%94%A8%E8%AA%AA%E6%98%8E/api.html#echartsInstance.hideLoading)** 方法隱藏載入動畫。

```jsx
// 此為 jQuery 的寫法

myChart.showLoading();
$.get('data.json').done(function (data) {
    myChart.hideLoading();
    myChart.setOption(...);
});
```

模擬非同步的完整程式碼

```jsx
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="https://cdn.staticfile.org/echarts/5.1.2/echarts.min.js"></script>
</head>
<body>
    <!-- 為ECharts準備一個具備大小（寬高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基於準備好的dom，初始化echarts實體
        var myChart = echarts.init(document.getElementById('main'));
        var option;

        function fetchData(cb) {
            // 通過 setTimeout 模擬非同步載入
            setTimeout(function () {
                cb({
                    categories: ["襯衫","羊毛衫","雪紡衫","褲子","高跟鞋","襪子"],
                    data: [5, 20, 36, 10, 10, 20]
                });
            }, 3000);
        }

        // 初始 option
        option = {
            title: {
                text: '非同步數據載入示例'
            },
            tooltip: {},
            legend: {
                data:['銷量']
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '銷量',
                type: 'bar',
                data: []
            }]
        };

        myChart.showLoading(); // showLoading

        fetchData(function (data) {
            myChart.hideLoading(); // hideLoading
            myChart.setOption({
                xAxis: {
                    data: data.categories
                },
                series: [{
                    // 根據名字對應到相應的系列
                    name: '銷量',
                    data: data.data
                }]
            });
        });
        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
    </script>
</body>
</html>
```

- 及時更新的 echarts 寫法

```jsx
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="https://cdn.staticfile.org/echarts/5.1.2/echarts.min.js"></script>
</head>
<body>
    <!-- 為ECharts準備一個具備大小（寬高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基於準備好的dom，初始化echarts實體
        var myChart = echarts.init(document.getElementById('main'));
        var option;

        var base = +new Date(2014, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 150];
        var now = new Date(base);

        function addData(shift) { // 將新資料加入
            now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
            date.push(now);
            data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

            if (shift) {
                date.shift(); // 去掉最舊的一筆資料
                data.shift();
            }

            now = new Date(+new Date(now) + oneDay);
        }

        for (var i = 1; i < 100; i++) {
            addData();
        }

        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: date
            },
            yAxis: {
                boundaryGap: [0, '50%'],
                type: 'value'
            },
            series: [
                {
                    name:'成交',
                    type:'line',
                    smooth:true,
                    symbol: 'none',
                    stack: 'a',
                    areaStyle: {
                        normal: {}
                    },
                    data: data
                }
            ]
        };

        setInterval(function () {
            addData(true);
            myChart.setOption({ // 取到資料後設置 setOption
                xAxis: {
                    data: date
                },
                series: [{
                    name:'成交',
                    data: data
                }]
            });
        }, 500);
        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
    </script>
</body>
</html>
```

## 8. 使用 dataset 管理全部數據

- 從 Echart 4 開始支援將 所有的數據集集中一處好方便管理以及提高元件的複用性 ( 在 EChart 4 之前數據只能放在各個系列 series 中 )
- 原本 數據放在 series 中的寫法

```jsx
option = {
    xAxis: {
        type: 'category',
        data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            name: '2015',
            data: [89.3, 92.1, 94.4, 85.4]
        },
        {
            type: 'bar',
            name: '2016',
            data: [95.8, 89.4, 91.2, 76.9]
        },
        {
            type: 'bar',
            name: '2017',
            data: [97.7, 83.1, 92.5, 78.1]
        }
    ]
}
```

- 優點
    - 直觀易理解
- 缺點
    - 不利元件重複使用
- 而 Echart4 的數據集功能則可以解決上述缺點外，亦增加了以下優點
    - 可指定數據對應到的圖表內容
    - 配置與數據分開，較易於管理
    - 支援更多的數據格式 ex: 二維陣列、對象陣列

### 8.1. 基礎範例

```jsx
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="https://cdn.staticfile.org/echarts/5.1.2/echarts.min.js"></script>
</head>
<body>
    <!-- 為ECharts準備一個具備大小（寬高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基於準備好的dom，初始化echarts實體
        var myChart = echarts.init(document.getElementById('main'));
        var option;

        option = {
            legend: {},
            tooltip: {},
						// 'column': 預設值。系列被安放到 dataset 的行上面。
						// row': 系列被安放到 dataset 的列上面。
            dataset: {
                source: [
                    ['product', '2015', '2016', '2017'],
                    ['Matcha Latte', 43.3, 85.8, 93.7],
                    ['Milk Tea', 83.1, 73.4, 55.1],
                    ['Cheese Cocoa', 86.4, 65.2, 82.5],
                    ['Walnut Brownie', 72.4, 53.9, 39.1]
                ]
            },
				// // 聲明一個 X 軸，類目軸（category）。預設情況下，類目軸對應到 dataset 第一行。
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
						// 定義幾個數據系列，每一個都會被預設對映至相應的行
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        };
        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
    </script>
</body>
</html>
```

![https://i.imgur.com/QyxaYtS.png[/img]](https://i.imgur.com/QyxaYtS.png[/img])

### 8.2. 數據對應到圖形

- 指定 dataset 的行 (  column ) 列 ( row ) 對應為圖形系列 ( series )，可以使用 series.seriesLayoutBy 來指定，預設是照 行 ( column ) 來對應
- 指定對照的數據組，可以使用 series.encode 屬性去指定對應到的 x、y 軸或是使用 visualMap 元件來對應顏色大小等視覺元素
- **注意這裡的 seriesLayoutBy 是指定 維度 ( dimentsion )，也就是一組數據項 ( item ) 中有多少的維度 ( dimentsion)**
    - 其預設值 為 column，也就是以 行 ( column ) 作為 每個數據項 ( row/item ) 內含的 數據類別 ( column / dimension  )
        
        ex: 以下範例的圖表二，就是 每組數據 ( row/item ) 有 4個 類別 ( coulmn / dimension  )
        
    - 反之若設置是 seriesLayoutBy: row ，也就是以 列 ( row )，作為每個數據項 ( column / item ) 內含的類別 ( row / dimentsion  )
        
        ex: 以下範例的圖表一，就是 每組數據 ( column/item ) 有 3個 類別 ( row / dimension  )
        

```jsx
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="https://cdn.staticfile.org/echarts/5.1.2/echarts.min.js"></script>
</head>
<body>
    <!-- 為ECharts準備一個具備大小（寬高）的Dom -->
    <div id="main" style="width: 800px; height:600px;"></div>
    <script type="text/javascript">
        // 基於準備好的dom，初始化echarts實體
        var myChart = echarts.init(document.getElementById('main'));
        var option;

        option = {
            legend: {},
            tooltip: {},
            dataset: {
						// 由於 seriesLayoutBy: column 是預設值，所以這裡總共有 4 個維度 3筆資料 ( item )
						// 由於有 3 筆資料，因此 x 或 y 軸設定 category 則一致都會顯示 product 名
						// 也就是說預設的做法是將各個數據項 item 的類別寫在 array 的第一項
						// 第一列 (row) 的則是放 每個維度 數據所代表的 類別
                source: [
										// [ '', dimension, dimension, dimension , dimension ]
                    ['product', '2012', '2013', '2014', '2015'], 
                    ['Matcha Latte', 41.1, 30.4, 65.1, 53.3], // item
                    ['Milk Tea', 86.5, 92.1, 85.7, 83.1], // item
                    ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4] // item
                ]
            },
            xAxis: [
							// 
                {type: 'category', gridIndex: 0},
                {type: 'category', gridIndex: 1}
            ],
            yAxis: [
                {gridIndex: 0},
                {gridIndex: 1}
            ],
            grid: [
                {bottom: '55%'},
                {top: '55%'}
            ],
            series: [
                // 這幾個系列會在第一個直角座標系中，每個系列對應到 dataset 的每一列。預設是行
								// 所以數據  seriesLayoutBy: row 對應是直向的 ( 這邊是4個 也就是以 2012, 2013... 排列)
								// 也就是 不含標示的話， row 有3組 (3個維度)，column 有4組 ( 有4組 數據項 ) 
								// 第二張圖 seriesLayoutBy 預設是 column ( 橫向數據排列 )
								// 也就是 不含標示的話， column 有4組 (4個維度)，row 有3組 ( 有3組 數據項 ) 
								// xAxis/yAxis 對應的 是 grindIndex 其預設是 0 為第一張圖
								// 另外 xAxis/yAxis 預設 type 為 value 
							
								// xAxisIndex / yAxis 預設為 0
                {type: 'bar', seriesLayoutBy: 'row'},
                {type: 'bar', seriesLayoutBy: 'row'},
                {type: 'bar', seriesLayoutBy: 'row'},
                // 這幾個系列會在第二個直角座標系中，每個系列對應到 dataset 的每一行。
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
                {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
            ]
        };
        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
    </script>
</body>
</html>
```

![https://i.imgur.com/BFiYy0X.png[/img]](https://i.imgur.com/BFiYy0X.png[/img])

### 8.3 維度 ( dimension )

- 承上所述 **seriesLayoutBy 是指定 維度 ( dimentsion )，也就是一組數據項 ( item ) 中有多少的維度 ( dimentsion)**
    - 因此常見預設 ( coulumn ) 情況是將維度名的放在 dataset 的 第一列 ( row )
    - 反之亦然，若設置是 ( row ) 則須將維度名放在 dataset 的第一行 ( column )
    
    至於 dataset 是否含有維度名， echarts 會自動判斷，但也可以手動設定
    
    - `dataset.sourceHeader: true` 也就是第一行 ( 或列 ) 預設為維度名
    - `dataset.sourceHeader: false` 也就是第一行 ( 或列 ) 開始就是數據
- 維度也可以直接在 dataset 或是 series 中進行指定與設定

```jsx
var option1 = {
    dataset: {
        dimensions: [
						// 寫法1: 使用物件表示
            {name: 'score'},
            // 寫法2: 也可以簡寫為 string，表示維度名。
            'amount',
            // 在寫法1中，也可以在 type 中指定維度型別。
            {name: 'product', type: 'ordinal'}
        ],
        source: [...]
    },
    ...
};

var option2 = {
    dataset: {
        source: [...]
    },
    series: {
        type: 'line',
        // 在系列中設定的 dimensions 會更優先採納。
        dimensions: [
            null, // 可以設定為 null 表示不想設定維度名
            'amount',
            {name: 'product', type: 'ordinal'}
        ]
    },
    ...
};
```

- 在 diemension 中，可以設定 type 對應其數據類型
    - `number` 數值 此為預設
    - `ordinal` 對於文字、類目型別要在數軸上使用，須設定 ‘ordinal’ 型別，雖然 Echarts 本身會預設自動判斷這個型別，但保險起見使用者也可以自行設定
    - `time` 數據型別的時間戳
    - `float` 浮點數, `int` 整數型別，雖是 echart會自動辨別，但若有手動設置，有助於整體優化提升

### 8.4 數據到圖形的對應 ( series.encode )

- 了解 維度 ( dimension ) 與   數據組 ( item )  間的關係後，再來理解 encode 的用法會較好
- 如上所述，ecahrts 的 seriesLayoutBy 是 column 也就是會以列 ( row ) 為數組，且以第一列為此 dimension 的名稱，而 encode 對應的就是該維度 ( dimenson ) 要在 x 或 y軸 呈現的定義，如下

```jsx
var option = {
    dataset: {
        source: [
            ['score', 'amount', 'product'],
            [89.3, 58212, 'Matcha Latte'],
            [57.1, 78254, 'Milk Tea'],
            [74.4, 41032, 'Cheese Cocoa'],
            [50.1, 12755, 'Cheese Brownie'],
            [89.7, 20145, 'Matcha Cocoa'],
            [68.1, 79146, 'Tea'],
            [19.6, 91852, 'Orange Juice'],
            [10.6, 101852, 'Lemon Juice'],
            [32.7, 20112, 'Walnut Brownie']
        ]
    },
    xAxis: {},
    yAxis: {type: 'category'},
    series: [
// 由於預設是 seriesLayoutBy 是 column 也就是維度為 column 數組為 row
        {
            type: 'bar',
            encode: {
                // 將 "amount" 列對映到 X 軸。
                x: 'amount',
                // 將 "product" 列對映到 Y 軸。
                y: 'product'
            }
        }
    ]
};
```

- encode 的詳細設置說明

```jsx
// 在任何座標系和系列中，都支援：
encode: {
    // 使用 「名為 product 的維度」 和 「名為 score 的維度」 的值 在 tooltip 中顯示
    tooltip: ['product', 'score']
    // 使用 「維度 1」 和 「維度 3」 的維度名連起來作為系列名。（有時候名字比較長，這可以避免在 series.name 重複輸入這些名字）
    seriesName: [1, 3],
    // 表示使用 「維度2」 中的值作為 id。這在使用 setOption 動態更新數據時有用處，可以使新老數據用 id 對應起來，從而能夠產生合適的數據更新動畫。
    itemId: 2,
    // 指定數據項的名稱使用 「維度3」 在餅圖等圖表中有用，可以使這個名字顯示在圖例（legend）中。
    itemName: 3
}
```

- 直角坐標軸 ( grid/cattesian )

```jsx
// 直角座標系（grid/cartesian）特有的屬性：
encode: {
    // 代表 「維度1」、「維度5」、「名為 score 的維度」 等3個維度對映到 X 軸：
    x: [1, 5, 'score'],
    // 把「維度0」對映到 Y 軸。
    y: 0
}
```

- 單軸

```jsx
// 單軸（singleAxis）特有的屬性：
encode: {
    single: 3
}
```

- 於一些沒有座標系的圖表，例如餅圖、漏斗圖等，可以是：

```jsx
// 對於一些沒有座標系的圖表，例如餅圖、漏斗圖等，可以是：
encode: {
    value: 3
}
```

- 以下為結合以上較複雜的多圖範例

```jsx
var sizeValue = '57%';
            var symbolSize = 2.5;
            option = {
                legend: {},
                tooltip: {},
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {}
                    }
                },
                grid: [
							// 以 grid 設置位置，內部變數為 % 在上方已設置
                    {right: sizeValue, bottom: sizeValue},
                    {left: sizeValue, bottom: sizeValue},
                    {right: sizeValue, top: sizeValue},
                    {left: sizeValue, top: sizeValue}
                ],
                xAxis: [
									// 以 gridIndex 對應位置，可標示該軸名稱，也可指定該軸標籤樣式 ( 間格/是否旋轉 )
                    {type: 'value', gridIndex: 0, name: 'Income', axisLabel: {rotate: 50, interval: 0}},
                    {type: 'category', gridIndex: 1, name: 'Country', boundaryGap: false, axisLabel: {rotate: 50, interval: 0}},
                    {type: 'value', gridIndex: 2, name: 'Income', axisLabel: {rotate: 50, interval: 0}},
                    {type: 'value', gridIndex: 3, name: 'Life Expectancy', axisLabel: {rotate: 50, interval: 0}}
                ],
                yAxis: [
                    {type: 'value', gridIndex: 0, name: 'Life Expectancy'},
                    {type: 'value', gridIndex: 1, name: 'Income'},
                    {type: 'value', gridIndex: 2, name: 'Population'},
                    {type: 'value', gridIndex: 3, name: 'Population'}
                ],
                dataset: {
                    dimensions: [
                        'Income', // 每個維度的名稱定義
                        'Life Expectancy',
                        'Population',
                        'Country',
                        {name: 'Year', type: 'ordinal'} // 這邊也可簡寫為 'Year' 其意義不變
                    ],
                    source: data // 注意: data 這組數組是從此變數中來的
                },
                series: [
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        encode: {
                            x: 'Income',
                            y: 'Life Expectancy',
													// 需要在 tooltip 顯示的 維度
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        encode: {
                            x: 'Country',
                            y: 'Income',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        encode: {
                            x: 'Income',
                            y: 'Population',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    },
                    {
                        type: 'scatter',
                        symbolSize: symbolSize,
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        encode: {
                            x: 'Life Expectancy',
                            y: 'Population',
                            tooltip: [0, 1, 2, 3, 4]
                        }
                    }
                ]
            };

            myChart.setOption(option);
        });

        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
```

[https://i.imgur.com/Y0Yk18P.png[/img]](https://i.imgur.com/Y0Yk18P.png[/img])

### 8.5 **視覺通道（顏色、尺寸等）的對映**

- 視覺通道 ( `visualMap` ) 是一張長條圖，以圖形顏色變換來對應不同數字大小間的顏色 ( 有設置 visualMap 也會在 不同值的 bar 上看到不同的顏色 )

```jsx
option = {
            dataset: {
                source: [
                    ['score', 'amount', 'product'],
                    [89.3, 58212, 'Matcha Latte'],
                    [57.1, 78254, 'Milk Tea'],
                    [74.4, 41032, 'Cheese Cocoa'],
                    [50.1, 12755, 'Cheese Brownie'],
                    [89.7, 20145, 'Matcha Cocoa'],
                    [68.1, 79146, 'Tea'],
                    [19.6, 91852, 'Orange Juice'],
                    [10.6, 101852, 'Lemon Juice'],
                    [32.7, 20112, 'Walnut Brownie']
                ]
            },
            grid: {containLabel: true},
            xAxis: {name: 'amount'},
            yAxis: {type: 'category'},
            visualMap: {
                orient: 'horizontal', // 呈現方向
                left: 'center', // 示意圖位置
                min: 10, // 數值區間
                max: 100,
								// 需要顯示高低標示
                text: ['High Score', 'Low Score'],
                // Map the score column to color
                dimension: 0, // 對應的數值維度 ( 現在數據是 'score' 那欄 )
                inRange: {
								// 這些數值大小漸層色的設置
                    color: ['#65B581', '#FFCE34', '#FD665F']
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }
            ]
        };
        
        // 使用剛指定的配置項和數據顯示圖表。
        myChart.setOption(option);
```

![https://i.imgur.com/6FfjpNH.png[/img]](https://i.imgur.com/6FfjpNH.png[/img])

- 補充: 標籤的顯示 **[label.formatter](https://isoface.net/isoface/doc/%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BD/03.EChart/01.ECharts%E4%BD%BF%E7%94%A8%E8%AA%AA%E6%98%8E/option.html#series.label.formatter)**，現在支援引用特定維度的值，例如：
    - formatter 可以使用變數，對應的是該維度 ( dimesnion ) 裡的值

```jsx
series: {
    label: {
        // `'{@score}'` 表示 「名為 score」 的維度里的值。
        // `'{@[4]}'` 表示引用序號為 4 的維度里的值。
        formatter: 'aaa{@product}bbb{@score}ccc{@[4]}ddd'
    }
}
```

### 8.6 dataset 數據的各種格式

- 除了上述常用的二維陣列外，dataset 也支援如下面的 key-value 格式，但這類並不支援 seriesLayoutBy 參數
    - 另外 dataset.source 也可以吃 JSON 格式 ( 若導出為 csv 可以使用如 dsv 或 PapaParse 轉 csv 成 JSON )
    - 下方為 dataset 可接受的 key-value 類型
    
    ```jsx
    dataset: [{
        // 第一種: 按行的 key-value 形式（對像陣列），這是個比較常見的格式 ( 陣列包物件 )
        source: [
            {product: 'Matcha Latte', count: 823, score: 95.8},
            {product: 'Milk Tea', count: 235, score: 81.4},
            {product: 'Cheese Cocoa', count: 1042, score: 91.2},
            {product: 'Walnut Brownie', count: 988, score: 76.9}
        ]
    }, {
        // 第二種: 按列的 key-value 形式 (物件中包陣列)
        source: {
            'product': ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie'],
            'count': [823, 235, 1042, 988],
            'score': [95.8, 81.4, 91.2, 76.9]
        }
    }]
    ```
    

### 8.7 **[series.data](http://series.data) 與 dataset.source 的關係**

- series 中的 data ( ECharts3 中就有的 )，其權重會高於在 series 外的 dataset，也就是若該 series 中有設定 data 則會以該 data 數據為主，而不是 daraset

```jsx
{
    xAxis: {
        type: 'category'
        data: ['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']
    },
    yAxis: {},
    series: [{
        type: 'bar',
        name: '2015',
        data: [89.3, 92.1, 94.4, 85.4]
    }, {
        type: 'bar',
        name: '2016',
        data: [95.8, 89.4, 91.2, 76.9]
    }, {
        type: 'bar',
        name: '2017',
        data: [97.7, 83.1, 92.5, 78.1]
    }]
}
```

- Echarts 中有幾個情況不支援 dataset
    - treenap、graph、lines 現在不支援 dataset，仍只能用 series.data
    - 對於百萬筆以上的資料渲染，也不支援 dataset 需要使用 appendData 匯入資料
- 目前有支援 dataset 的圖表類型有: line、bar、pie 、scatter、 effectScatter、 parallel、 candlestick、 map、 funnel、 custom、多圖表

## 9. **使用transform進行數據轉換**

- Echart5  開始加入的新功能，可以用 特定的轉換方法 ( transform ) 轉換原本的數據集( dataset )並產生一個新的數據集
- 常見的 轉換方法 ( transform ) ex: filter、sort、regression、boxplot、cluster、aggregate
- 此功能優點
    - 可以將同分數據進行不同面向的展示
    - 可針對圖表做運算處理並進行展示
    - 進行數據排序
- 範例說明
    - echarts 中 transform 的結果也是依托於 dataset 中，以 設定 dataset.transform 呈現
    
    ```jsx
    var option = {
        dataset: [{
            // 這個 dataset 的 index 是 `0`。
            source: [
                ['Product', 'Sales', 'Price', 'Year'],
                ['Cake', 123, 32, 2011],
                ['Cereal', 231, 14, 2011],
                ['Tofu', 235, 5, 2011],
                ['Dumpling', 341, 25, 2011],
                ['Biscuit', 122, 29, 2011],
                ['Cake', 143, 30, 2012],
                ['Cereal', 201, 19, 2012],
                ['Tofu', 255, 7, 2012],
                ['Dumpling', 241, 27, 2012],
                ['Biscuit', 102, 34, 2012],
                ['Cake', 153, 28, 2013],
                ['Cereal', 181, 21, 2013],
                ['Tofu', 395, 4, 2013],
                ['Dumpling', 281, 31, 2013],
                ['Biscuit', 92, 39, 2013],
                ['Cake', 223, 29, 2014],
                ['Cereal', 211, 17, 2014],
                ['Tofu', 345, 3, 2014],
                ['Dumpling', 211, 35, 2014],
                ['Biscuit', 72, 24, 2014],
            ],
            // id: 'a'
        }, {
            // 這個 dataset 的 index 是 `1`。
            // 這個 `transform` 配置，表示，此 dataset 的數據，來自於此 transform 的結果。
            transform: {
                type: 'filter',
                config: { dimension: 'Year', value: 2011 }
            },
            // 我們還可以設定這些可選的屬性： `fromDatasetIndex` 或 `fromDatasetId`。
            // 這些屬性，指定了，transform 的輸入，來自於哪個 dataset。例如，
            // `fromDatasetIndex: 0` 表示輸入來自於 index 為 `0` 的 dataset 。又例如，
            // `fromDatasetId: 'a'` 表示輸入來自於 `id: 'a'` 的 dataset。
            // 當這些屬性都不指定時，預設認為，輸入來自於 index 為 `0` 的 dataset 。
        }, {
            // 這個 dataset 的 index 是 `2`。
            // 同樣，這裡因為 `fromDatasetIndex` 和 `fromDatasetId` 都沒有被指定，
            // 那麼輸入預設來自於 index 為 `0` 的 dataset 。
            transform: {
                // 這個型別為 "filter" 的 transform 能夠遍歷並篩選出滿足條件的數據項。
                type: 'filter',
                // 每個 transform 如果需要有配置參數的話，都須配置在 `config` 里。
                // 在這個 "filter" transform 中，`config` 用於指定篩選條件。
                // 下面這個篩選條件是：選出維度（ dimension ）'Year' 中值為 2012 的所有
                // 數據項。
                config: { dimension: 'Year', value: 2012 }
            }
        }, {
            // 這個 dataset 的 index 是 `3`。
            transform: {
                type: 'filter',
                config: { dimension: 'Year', value: 2013 }
            }
        }],
        series: [{
            type: 'pie', radius: 50, center: ['25%', '50%'],
            // 這個餅圖系列，引用了 index 為 `1` 的 dataset 。也就是，引用了上述
            // 2011 年那個 "filter" transform 的結果。
            datasetIndex: 1
        }, {
            type: 'pie', radius: 50, center: ['50%', '50%'],
            datasetIndex: 2
        }, {
            type: 'pie', radius: 50, center: ['75%', '50%'],
            datasetIndex: 3
        }]
    };
    ```
    

### 9.1 transform 的鏈式聲明

```jsx
option = {
    dataset: [{
        source: [ ... ] // 原始數據
    }, {
        // 幾個 transform 被聲明成 array ，他們構成了一個鏈，
        // 前一個 transform 的輸出是后一個 transform 的輸入。
				// 簡單來看可以將整體視為一組轉換後的數據
				// 下方範例是 將 原始數據 filter 後，再 sort
        transform: [{
            type: 'filter',
            config: { dimension: 'Product', value: 'Tofu' }
        }, {
            type: 'sort',
            config: { dimension: 'Year', order: 'desc' }
        }]
    }],
    series: {
        type: 'pie',
        // 這個系列引用上述 transform 的結果。
        datasetIndex: 1
    }
}
```

### 9.2 利用一個 transform 輸出多個 data

- 多數情況下，transform 只需輸出一組 data，但也有少數狀況需要輸出多個 data

```jsx
option = {
    dataset: [{
        // 這個 dataset 的 index 為 `0`。
        source: [...] // 原始數據
    }, {
        // 這個 dataset 的 index 為 `1`。
        transform: {
            type: 'boxplot'
        }
        // 這個 "boxplot" transform 產生了兩個數據：
        // result[0]: boxplot series 所需的數據。
        // result[1]: 離群點數據。
        // 當其他 series 或者 dataset 引用這個 dataset 時，他們預設只能得到
        // result[0] 。
        // 如果想要他們得到 result[1] ，需要額外聲明如下這樣一個 dataset ：
    }, {
        // 這個 dataset 的 index 為 `2`。
        // 這個額外的 dataset 指定了數據來源於 index 為 `1` 的 dataset。
        fromDatasetIndex: 1,
        // 並且指定了獲取 transform result[1] 。
        fromTransformResult: 1
    }],
    xAxis: {
        type: 'category'
    },
    yAxis: {
    },
    series: [{
        name: 'boxplot',
        type: 'boxplot',
        // Reference the data from result[0].
        // 這個 series 引用 index 為 `1` 的 dataset 。
        datasetIndex: 1
    }, {
        name: 'outlier',
        type: 'scatter',
        // 這個 series 引用 index 為 `2` 的 dataset 。
        // 從而也就得到了上述的 transform result[1] （即離群點數據）
        datasetIndex: 2
    }]
};
```

另外，**[dataset.fromTransformResult](https://isoface.net/isoface/doc/%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BD/03.EChart/01.ECharts%E4%BD%BF%E7%94%A8%E8%AA%AA%E6%98%8E/option.html#dataset.fromTransformResult)** 和 **[dataset.transform](https://isoface.net/isoface/doc/%E9%80%9A%E7%94%A8%E5%8A%9F%E8%83%BD/03.EChart/01.ECharts%E4%BD%BF%E7%94%A8%E8%AA%AA%E6%98%8E/option.html#dataset.transform)** 能同時出現在一個 dataset 中，這表示，這個 transform 的輸入，是上游的結果中以 `fromTransformResult` 獲取的結果。例如：

```jsx
{
    fromDatasetIndex: 1,
    fromTransformResult: 1,
    transform: {
        type: 'sort',
        config: { dimension: 2, order: 'desc' }
    }
}
```

### 9.3 Print transform **在開發環境中的 debug  神器**

- transform 可以設置 print ，其功能類似 console.log，方便 debug

```jsx
option = {
    dataset: [{
        source: [ ... ]
    }, {
        transform: {
            type: 'filter',
            config: { ... }
            // 配置為 `true` 后， transform 的結果
            // 會被 console.log 列印出來。
            print: true
        }
    }],
    ...
}
```

### 9.4 transform 中的 filter 用法

- 關於 transform type filter 中的 config 設定比較子的用法，其中小括號內的名稱是別名設定起來功能與比較子相同
    - `>`( gt ) 可以用符號 `>` 或是 文字 gt 表示為大於 ( 意為 greater than )
    - `>=` ( gte ) ( 意為 greater than equal )
    - `<` ( le ) ( 意為 lesser than  )
    - `<=` ( lte ) ( 意為 lesser than equal )
    - `=` ( eq ) ( 意為  equal )
    - `!=` ( ne、\<\> ) ( 意為 not equal )
    - `reg`
- 其比較的條件是設於大括號中，若有多個條件則使用 `,` 分開
    
    `ex: { dimension: 'Price', '>=': 20, '<': 30 }`
    
- 比較的 data 可以是下面幾種
    - 純數值
    - 類數值字串 ( numeris string ) ex: ‘123’ ，其在轉換時會被換成數值進行比較，若有多餘的空格會被 trim() 掉
    - 日期/時間 若需要比較 JS Date() 或是日期字串 ( ex: ‘2022-05-12’ ) 需要設定 `parser:'time'`
        
        ex: `config: { dimension: 3, lt: '2012-05-12', parser: 'time' }`
        
    - 純字串，只能用 `=` 或是 `!=` 其餘皆不能使用
    - reg 正規表示式篩選，比如 `{ dimension: 'Name', reg: /\s+Müller\s*$/ }` 能在 `'Name'` 維度上選出姓 `'Müller'` 的數據項

```jsx
// 範例
option = {
    dataset: [{
        source: [
            ['Product', 'Sales', 'Price', 'Year'],
            ['Cake', 123, 32, 2011],
            ['Latte', 231, 14, 2011],
            ['Tofu', 235, 5, 2011],
            ['Milk Tee', 341, 25, 2011],
            ['Porridge', 122, 29, 2011],
            ['Cake', 143, 30, 2012],
            ['Latte', 201, 19, 2012],
            ['Tofu', 255, 7, 2012],
            ['Milk Tee', 241, 27, 2012],
            ['Porridge', 102, 34, 2012],
            ['Cake', 153, 28, 2013],
            ['Latte', 181, 21, 2013],
            ['Tofu', 395, 4, 2013],
            ['Milk Tee', 281, 31, 2013],
            ['Porridge', 92, 39, 2013],
            ['Cake', 223, 29, 2014],
            ['Latte', 211, 17, 2014],
            ['Tofu', 345, 3, 2014],
            ['Milk Tee', 211, 35, 2014],
            ['Porridge', 72, 24, 2014]
        ]
    }, {
        transform: {
            type: 'filter',
						// 除了 = 外 也苦已使用>=、<、!= 等等
						// 也可以設定多個條件用 , 隔開 ex: { dimension: 'Price', '>=': 20, '<': 30 }
						// 這裡的 dimension 的值除了可以用維度名外，也可以用 index ex: config: { dimension: 3, '=': 2011 }
						// 比較除了數值外，也可以比較 類數值字串 ex: '123'，其比較時會自動轉換成數值，並 trim 掉不必要的空格
						// 如果要比較時間 ex: JS Date 或是 日期字串 ( '2022-05-12' )
            config: { dimension: 'Year', '=': 2011 }
            // 這個篩選條件表示，遍歷數據，篩選出維度（ dimension ）
            // 'Year' 上值為 2011 的所有數據項。
        }
    }],
    series: {
        type: 'pie',
        datasetIndex: 1 // 設定第一組數據
    }
};
```

**關於解析器 ( parser )**

- `parser: 'time'` 其會把原始值 ( JS `Date()` 或是時間字串 `'2023-05-22 03:11:22'`  ) 轉換成時間戳 timestamp 來做比較，若原始值式上述兩種外的型別則會被解析成 `NaN`
- `parser: 'trim'` 會將原始數值字串中的 **空格**、**換行符號** 去掉
- `parser: 'number'` 會將原始數據轉成數值，若不可轉則會被解析成 NaN 正常情況其預設就是數值不需要特別設定，但預設情況會較嚴格，無法解析字串如 `'30%'`、`'12px'` 這類的，此時就要手動設定成 `parser: 'number'` 使其套用較寬鬆的轉換

以下是使用 parser 作為時間比較的範例

```jsx
option = {
    dataset: [{
        source: [
            ['Product', 'Sales', 'Price', 'Date'],
            ['Milk Tee', 311, 21, '2012-05-12'],
            ['Cake', 135, 28, '2012-05-22'],
            ['Latte', 262, 36, '2012-06-02'],
            ['Milk Tee', 359, 21, '2012-06-22'],
            ['Cake', 121, 28, '2012-07-02'],
            ['Latte', 271, 36, '2012-06-22'],
            ...
        ]
    }, {
        transform: {
            type: 'filter',
            config: {
                { dimension: 'Date', '>=': '2012-05', '<': '2012-06', parser: 'time' }
            }
        }
    }]
}
```

### 關於邏輯比較

- Echarts 可以支援 and/or/not ，也可以巢狀 ( 其中 and 與 or 因為有多個條件，所以後續接陣列 `[ ]`， not 則後面接 物件 `{  }` )

```jsx
option = {
    dataset: [{
        source: [...]
    }, {
        transform: {
            type: 'filter',
            config: {
                // 使用 and 操作符。
                // 類似地，同樣的位置也可以使用 「or」 或 「not」。
                // 但是注意 「not」 后應該跟一個 {...} 而非 [...] 。
                and: [
                    { dimension: 'Year', '=': 2011 },
                    { dimension: 'Price', '>=': 20, '<': 30 }
                ]
            }
            // 這個表達的是，選出 2011 年價格大於等於 20 但小於 30 的數據項。
        }
    }],
    series: {
        type: 'pie',
        datasetIndex: 1
    }
};
```

若是巢狀

```jsx
transform: {
    type: 'filter',
    config: {
        or: [{
            and: [{
                dimension: 'Price', '>=': 10, '<': 20
            }, {
                dimension: 'Sales', '<': 100
            }, {
                not: { dimension: 'Product', '=': 'Tofu' }
            }]
        }, {
            and: [{
                dimension: 'Price', '>=': 10, '<': 20
            }, {
                dimension: 'Sales', '<': 100
            }, {
                not: { dimension: 'Product', '=': 'Cake' }
            }]
        }]
    }
}
```

