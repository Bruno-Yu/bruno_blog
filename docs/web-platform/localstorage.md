---
title: localStorage
description: webapi 雜散筆記
tags: ['Javascript','webapi']
date: 2022-07-07
type: doc
publish: true
---
# localStorage

- 參考自 [五倍紅寶石](https://5xruby.tw/posts/localstorage)
- [範例codepen](https://codepen.io/bruno-yu/pen/JjvLPJq?editors=0010)
- [Huli Session_Storage](https://blog.huli.tw/2020/09/05/session-storage-and-html-spec-and-noopener/)
- It 鐵人邦[https://ithelp.ithome.com.tw/m/articles/10268532](https://ithelp.ithome.com.tw/m/articles/10268532)

### Local Storage 介紹

- 在HTML 5 出來後，才有的功能
- 在之前只能將資料(最多4K)存在 Cookie中

### 優點

- 增加本地存取空間
- 存取資料格式 key 和 value，型態只能是 String

### 缺點

- value 型態只接受 String
- 無痕或隱私模式下無法讀取
- 資料量太多時，存取時，容易造成卡頓
- 較舊版本的瀏覽器 ( IE 8 以下 )沒有支援

### localStorage與sessionStorage的差異

- localStorage是永久存在的，唯有清除它才會消失
- sessionStorage當該網頁關閉時，就會清除

## localSrotage的使用方法

- `localStorage.setItem( 'key', value' )` 透過 `setItem()` 方法，將物件中的**屬性 key 與值value當成參數傳入**，就可以在`sotrage` 物件中看到屬性與內容
- `localStorage.getItem('key')`  方法，可以查詢指定key 的value
- `localStorage.key( )` 可以取得在storage中的依照順序回傳物件屬性，**回傳內容為陣列**，從0開始
- `localStorage.removeItem( )`，可以透過這方法將**指定的屬性**從storage中刪除
- `localStorage.clear( )` 透過 clear( )方法，將storage中的**所有屬性**皆刪除

- 可以在console主控台中，的application應用程式分頁找到 Local storage存取的地點如下圖

![https://i.imgur.com/n2MJKWL.gif](https://i.imgur.com/n2MJKWL.gif)

### 須注意部份

- 使用時機:
    - 此頁資料是必須帶往下一頁 & 離線狀態使用
- 忌存取重要資料，因為只要打開 dev tool就能夠看到，毫無安全性可言