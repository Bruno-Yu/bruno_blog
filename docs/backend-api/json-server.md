---
title: JSON server
description: 不會後端也能自己開 REST API
tags: ['前端', 'JSON server', 'DB']
date: 2022-09-10
type: doc
publish: true
---
# 不會後端也能自己開 REST API

學習目標：讓前端可以開自己的 API

- 概念: 就是 JSON 格式的 server
- 預設支援跨網域 CORS
- 每筆資料都有 id
- 根目錄新增 `public` ，可放靜態檔案
- **安裝只能在本地使用，若希望能夠遠端或在線上專案使用，則要將json-server部屬到遠端**
- json server本身就是用node.js的環境，所以可以直接deploy到heroku上
- json server無法取代資料庫，其有些侷限性
    - 沒有驗證的服務
        - 比如表格驗證、字數限制、登入驗證
- **但可以訓練開API以及開資料庫的結構**
    - 一頁依照不同的內容呈現會用到**多個**ajax
    - 所以設計時照層級思考就好，在想怎麼分類怎麼呈現
        - 比如漫畫頁，可能先撈到那本漫畫的介紹ajax，撈到後再照內部的對應章節id再撈到內部的章節資料 ( 這例子就有兩層ajax了 )
- 若要用json server做作品
    - watch 完db後可以在json server啟動後建立 **public** 資料夾
    - 所有做品內容ex: html, css放在 **public 資料夾**

[https://i.imgur.com/yWnb74v.jpg%5B/img%5D](https://i.imgur.com/yWnb74v.jpg%5B/img%5D)

- JSON-server 就是充當伺服器這功能 ( Node.js + express )，而資料庫部分則是自己建立的 db.json 檔
    - 而伺服器在這邊會因應瀏覽器的請求，自 db.json ( 模擬資料庫 ) 取出對應資料存在伺服器的記憶體後回傳瀏覽器
- 記得若用 postman 記得傳送時要選擇 JSON 模式
- 若不是 postman 則記得傳送實 `Content-Type: application/json` 在 header中
- 常見的有 x-www-form-unrencoded , raw, JSON, 或者 form-data ( ex: 圖片格式、文件 )

### **db.sjon 架構設計**

- 外層是物件
- 內層的**第一層 屬性 同時也是 路由** ( 建議加 s 因為一般多筆資料 )
- 若有新增新的屬性，要重啟才能從本地伺服器介面看到新的屬性資料

```jsx
// 範例
{
	"users": [],
	"todos": [],
	"orders": [],
	"products": [],
}
```

## json-sever 操作流程

### 步驟一：安裝 [Node.js](https://nodejs.org/en/)

### 步驟二：安裝 NPM

- **注意: 這邊是裝在全域，只裝在專案可能沒用**

```powershell
npm install -g json-server
```

### 步驟三：新增一個 `db.json`

- 目前內部有三筆資料，posts, comments, 與profile
- 使用post 在寫入時 記得將body 部份轉成**x-www-form-unlencoded** 頁籤
- **陣列放同類型的資料，物件存放個別資料**
- 可以在網誌後面直接放id 就可以直接get 到單筆資料
    
    格式: `localhost:3000/posts/id` ex: `localhost:3000/posts/3`
    
- **注意: 相關資料是放在Body裡**
    
    

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

### 步驟四：啟動伺服器

```powershell
json-server --watch db.json
```

或者 ( 但以下指令 json server 不會即時更新，若有編輯需要重新啟動才能看到最新的資料 )

```jsx
json-server db.json
```

## Postman介紹

- **本軟體有提供各種Restful 語法**

[https://i.imgur.com/VSdgE9I.jpg%5B/img%5D](https://i.imgur.com/VSdgE9I.jpg%5B/img%5D)

- 使用 JSON server 時，在 postman 的 Body 要點選 `raw` 並且接收格式要改成 JSON
- 由於 JSON server 本身有寫好 post, get, patch, delete 等請求，因此開好後就可以直接進行 post 資料動作
    - get 的話，**需要在網址寫入 JSON 內的 對應資料路由 (key)** ，否則直接打網址抓到的是整個網頁
    - post 同樣是在 body 點選 raw 以及 接收檔案室是 JSON ，但是要記得屬性與值字串部分都要用雙引號包`”`，不能用單引號`’`
        - 打成功後 json-server 會自動加上 id 1, 2, 3…etc.
        - 若要取單筆資料，直接在 url 的最後直接加上 該 id 值
            
            ```jsx
            [http://localhost:3000/todo](http://localhost:3000/todo)/2 ( 2 是 id 值 )
            ```
            
        - 同理若想刪除也可以單筆刪除

## **RESTful API** 細節分享

- GET：取得資料
- POST ：新增資料
- PUT：修改資料 (完整) 要有id
    - 直接覆蓋指定id 所有資料
        - 若內部有title, money等參數沒設定到都會被清空
    - 若沒有該id 則json server會反傳空物件與404
- PATCH：修改資料 (局部) 要有id
    - 只要傳入局部修該資料就可以
        - 可以修改單筆參數資料，其他沒設定到的參數則照之前的資料內容
    - 若沒有該id 則json server會反傳空物件與404
- 新增一筆資料時，會固定附帶 id 值，他也會是 router 的條件

## json-server 功能

- 官方 [README](https://github.com/typicode/json-server) 說明

### filter 篩選資料

- `?屬性` 可以查詢該筆資料屬性值 ex: `GET / posts?name=Bruno`
    
    ```
    GET /posts?title=json-server&author=typicode
    GET /posts?id=1&id=2
    GET /comments?author.name=typicode
    ```
    
- 可以複選 `?A屬性=A值&B屬性=B值`  ex: `GET / posts?name=Bruno&money=50000`
- **注意: 在網址列的值不要再加 字串的雙引號，直接寫值就好**
- 若是要取物件內的屬性 則用 `.` 範例 `localhost:3000/products?language.zh-tw=C 產品`
    
    ```jsx
    [
    	{
        "name": "C 產品",
        "price": 500,
        "language": {
          "zh-tw": "C 產品",
          "en-us": "C product"
        },
        "id": 4
      }
    ]
    ```
    

### 一頁幾筆資料

- `_page` , `_limit` 可以規範目前位置在第幾頁，以及一頁有幾筆資料
    - 範例 : `localhost:3000/products?_page=2&_limit=2`
    - 優點: json-server 會自動將產品筆數順序自動排列，不用再手動調整

### 資料排序

- _sort, _order 排序
    - 以_sort 指定需要排序的屬性; 再以_order 指示要升序 asc 還是降序 desc
    - 範例: `localhost:3000/products?_sort=id&_order=asc`
    - 若有兩個屬性需要排序: 可以用 `,` 做區隔`localhost:3000/products?_sort=id,views&_order=asc`

### 區間資料搜尋

- _gte, _lte 以區間搜尋
    - _gte **大於等於**(數值)
    - _lte **小於等於** (數值)
    - 範例 `localhost:3000/products?id_gte=2&id_lte=5`

### 資料搜尋

- 以關鍵字搜尋 _like
    - 範例 `localhost:3000/products?name_like=B`
- 可以搜尋( 可以模糊搜尋、關鍵字搜尋 ) `?q=搜尋目標` ex:  `GET / posts?50000`
    - q：依照全文進行檢索
    - `?q=搜尋目標A&搜尋目標B`  可以搜尋多個條件
    - ex: youtube的 `results?search_query=搜尋目標` 或在google 網址列最後打`search?q=搜尋目標`
    - q, query為網址常見的參數
- limit 也是網址常見的參數代表最多幾筆 可以用&與q連用 `?q=搜尋目標&_limit=3`
    - 注意 JSON SERVER的規則limit要加下底線 `_limit`

### q = 搜尋全文

- filer：依照 key 去搜尋
- _ne **不等於** (數值)
- 可以做簡單的會員模擬註冊 ex: 確認account有沒有重複
    - 記得password 一般還要**加密**
- 另外建議使用JSON server時，若有做到對應頁，比如question與對應的Answer 頁，可以做個QuestionId在Answer頁做**對應ID**

## json-server 關聯資料教學

- 建議第一層屬性 ( 也就是資料表命名 ) 要用 複數 **s** 並用**陣列**呈現，而關聯的 id 則是以**小駝峰**呈現 ex: 想對應 users 資料表中的 id: 1 以**單數**寫 `userId: 1`
- 在使用 post json-server 會自動加上 id=1,2,3 …etc.
    - 一般實際的資料庫，id 可能是 UUID 但 json-server 算是練習用的資料庫，所以以較簡化的方式呈現
- 關聯 id 範例
    
    ```jsx
    {
      "users":[
        {
          "id": 1,
          "name": "Bruno"
        },
        {
          "id": 2,
          "name": "Yve"
        }
      ],
      "posts": [
        {
          "id": 1,
          "body": "json-server",
          "userId":1 // 關聯 資料表 users 中的id 1 此命名是 json-server 內的規則
        },
        {
          "id": 2,
          "body": "json-server",
          "userId":2 // 關聯 資料表 users 中的id 2 
        }
      ],
      "comments": [
        { "id":1, "body":"some comment", "postId":1 }  // 關聯 資料表 posts 中的id 1 
      ]
    }
    ```
    

### _expand 擴展關聯資料表中的資訊

- 範例: 若取上方資料中的 posts 想帶入 users 的資訊，則加入 `posts?_expand=user`
    - 注意: 這邊 expand 後帶的 user 是**單數**
    - 也可以用多筆資料關聯用 & 再加上其它筆 `posts?_expand=user&_expand=post`
    - 範例網址: `localhost:3000/posts?_expand=user`
    
    ```jsx
    // 得到結果
    
    [
      {
        "id": 1,
        "body": "json-server",
        "userId": 1, // json-server 會依照 關聯 id對應關聯資料表的資訊
        "user": { // 帶入的關聯資料 users
          "id": 1,
          "name": "Bruno"
        }
      },
      {
        "id": 2,
        "body": "json-server",
        "userId": 2,
        "user": {
          "id": 2,
          "name": "Yve"
        }
      }
    ]
    ```
    

### **如何取得(GET)、新增(POST) 留言資料**

- 若在資料庫將 comments 全放在 posts 資料表內，會有打一次 api 而因為資料量較大而需要等待情形，因此建議將 comments 與 posts 拆成不同的資料表，再用關聯 id 對應
- 可直接利用路由帶出關聯的資料表資訊
    - 範例 localhost:3000/**posts/1/comments ⇒ comments 中對應 postId: 1 的資訊**
    - 使用 expand 帶出 user 資料中對應的人名
        
        ```jsx
        // http://localhost:3000/posts/1/comments?_expand=user
        
        [
          {
            "id": 1,
            "body": "Bruno 的留言",
            "postId": 1,
            "userId": 1,
            "user": {
              "id": 1,
              "name": "Bruno"
            }
          },
        ]
        ```
        
    - 使用 post 新增
    
    ```jsx
    async function useAxios(method,url, route, params, headers) { 
      const response = await axios[method](url + route, params, headers);
      try {
        console.log('成功', response.data)
      }
      catch { 
        console.log('失敗', response.message)
    
      }
    }
    const headers = {'content-type': 'application/json'}
    const params = {
      body: "你最近過得好嗎?",
      userId: 2, // 可以少寫兩筆資料，因為路由已經指定 在post/1中新增，而id則會在新增厚自動生成
    }
    
    useAxios('post', API_URL, 'post/1/comments', params, headers); 
    ```
    
    - 此時 db.json 內
    
    ```jsx
    "comments": [
        {
          "id": 1,
          "body": "Bruno 的留言",
          "postId": 1,
          "userId": 1
        },
        {
          "id": 2,
          "body": "Yve 的留言",
          "postId": 1, // 這是原本的資料
          "userId": 2
        },
        {
          "body": "你最近過得好嗎?",
          "userId": 2,
          "postId": "1", // 藉由指定路由生成的 id 會是字串呈現，但不影響其功能
          "id": 3
        }
      ]
    ```
    

## 開API思考模式

- 核心目標
- 透過User Story(使用者故事)
    - 區分角色 - 管理者、使用者
        - 區分功能
- 使用者故事
    - 會員可以在平台上發文，而且是有標籤的
    - 使用者可以註冊會員
    - 管理者可以在後台刪除文章

## 部署細節

- 安裝 [Node](https://nodejs.org/en/)
- 安裝 [Git](https://git-scm.com/)
- 註冊 [heroku](https://www.heroku.com/)
- 安裝 [heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
    - NPM `npm install -g heroku`
    - 可以部屬node.js上去
- 部屬上去前先使用`json-server --watch db.json` 確保json server內的資料沒問題
- 使用heroku最重要的是package.json檔，因為有紀錄該專案有哪些套鍵、npm指令它需要依照其將環境build起來

### 查詢是否安裝成功

```
heroku --version
```

### 登入

```
heroku login
```

heroku是用git做版本控制，所以先移動到你的開發資料夾，並創建 git 空間，並 commit

```
git init
git add .
git commit -m 'update'
```

### heroku 創建空間

- create同時做兩件事
    - 在git config 裡新增一個ˊremot repo的 url
    - 在遠端heroku上開一個專案空間 ( 所以下這1指令就不用再跑到heroku上建立新空間 )

```
heroku create
```

### 部署到 heroku 空間

```
git push heroku master
```

### heroku 常見指令

- 開啟部署後的結果： `heroku open`
- **json server提供跨網域的搜尋模式，所以json server搭配heroku可以進行跨領域的使用**

## Q&A

Q：可以拿來當作真正的伺服器嗎？

A：不行，**他是記錄在記憶體上，而非複寫檔案**

Q：如何確保面試官看的內容都有資料？

A：一開始在 db.json 將全部資料寫上即可

## 常見業界範例

### 1.旅遊網

- 前台版型： [The F2E Filter](https://www.facebook.com/groups/173311386703334/learning_content/?filter=377909922704174&post=181532992547840)
- 後台版型：[admin order](https://www.facebook.com/groups/173311386703334/learning_content/?filter=377909922704174&post=184948512206288)
- API：[網址](https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97)
- 範例 heroku：[網址](https://obscure-crag-88418.herokuapp.com/)
- 前台資料接自己的 JSON 資料
- 尋找鼓山區裡面的兩筆資料

[http://127.0.0.1:3000/travel?Zone=%E9%BC%93%E5%B1%B1%E5%8D%80](http://127.0.0.1:3000/travel?Zone=%E9%BC%93%E5%B1%B1%E5%8D%80)

### 2.the F2E 文章

### 3.IT 邦幫忙

```
{
"articles": [
    {
"author": "gonsakon",
"title": "台北求才",
"tag": ["工作","新竹"],
"tab": "job"
    },
    {
"author": "casper",
"title": "高雄前端活動",
"tag": ["前端","新竹"],
"tab": "event"
    },
    {
"author": "juni",
"title": "高雄前端活動",
"tag": ["前端","新竹"],
"tab": "tech"
    },
    {
"author": "葉子",
"title": "彰化前端活動",
"tag": [
        "前端",
        "彰化"
      ],
"tab": "tech"
    }
  ]
}
```

# **json-server-auth 套件介紹**

- [GitHub 官網](https://github.com/jeremyben/json-server-auth)
- 用來模擬設權限與登入流程

### 安裝

```powershell
# NPM
npm install -D json-server json-server-auth

# Yarn
yarn add -D json-server json-server-auth
```

- **json-server-auth 此套件有要求，若要撰寫用戶權限紀錄 要記錄在 db.json 中的** users **屬性**

```jsx
{
  "users":[]
}
```

- 在專案中執行

```powershell
json-server db.json -m ./node_modules/json-server-auth
# with json-server installed globally and json-server-auth installed locally
```

- 但也可以在 global 中執行 ( 老師建議用這個 )
    - 因此要先在 global 安裝
    
    ```jsx
    npm install -g json-server json-server-auth
    ```
    

```powershell
json-server-auth db.json
# with json-server-auth installed globally
```

- 註: 需要在全域安裝 express 才會執行

### json-server-auth 權限圖示

- 使用 JWT 的技術跑認證流程

註: 登入後的 token 時限只有1小時，過後要重新登入

[https://i.imgur.com/UNfkcRb.jpg%5B/img%5D](https://i.imgur.com/UNfkcRb.jpg%5B/img%5D)

註: 一般營運網站不是註冊成功給予 token 而是登入後再給予 token ，而登入前會進行電話或email 驗證後才能開通帳號方能登入，登入後再給予 token，這邊算是 json_server_auth 的設定

- 支援註冊功能
    - **`POST /register`**
    - **`POST /signup`**
    - **`POST /users`**
- API 要求 params  ⇒ email, password
    
    ```powershell
    {
      "email": "olivier@mail.com",
      "password": "bestPassw0rd"
    }
    ```
    
- 註冊成功後，可以在 db.json 看到如下資訊
    - 注意 password，一般後端在存取使用者密碼時會進行加密 ( 若直接將加密部份貼上密碼欄也無法直接登入 )
    
    ```powershell
    {
      "users": [
        {
          "email": "olivier@mail.com",
          "password": "$2a$10$zGtZB3cPvA7Lq3B6/Jt6POwaCfBZArovxk3xkdaAh5wCsLt863anW",
          "nickName": "Bruno",
          "id": 1
        }
      ]
    }
    ```
    
    - 範例程式碼
        
        ```jsx
        function signUp(){
            //  註冊路由可以用 signup, users 都是 json-server-auth 所提供，db.json 那放 users就好
            axios.post('http://localhost:3000/signup',{
                "email": "olivier@mail.com",
                "password": "bestPassw0rd",
                "nickName": "Bruno",
            })
            .then(function(res){
              console.log(res);
            })
            .catch(function(err){
              console.log(err);
            })
          }
        ```
        

- 登入
    - 路由
    - **`POST /signin`**
    - **`POST /login`**
    
    回傳的內容如下
    
    - 每次登入每次回傳的 token 都不同
    - json-server-auth 的登入 token 是使用 JWT 做加密，只有 1 個小時的時效
    - token 建議存取在 1. localStorage 2. cookie
    
    ```powershell
    Object
    config: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
    data: 
    	accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE2NzA5NDE1NDAsImV4cCI6MTY3MDk0NTE0MCwic3ViIjoiMSJ9.JA7xWvhL1_o78sknolaq9tB8Az6Y1EPQQIgybq0MaHg"
    	user: {email: 'olivier@mail.com', nickName: 'Bruno', id: 1}
    	[[Prototype]]: Object
    headers: 
    i {cache-control: 'no-cache', content-length: '287', content-type: 'application/json; charset=utf-8', expires: '-1', pragma: 'no-cache'}
    request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
    status: 200
    statusText: "OK"
    [[Prototype]]: Object
    ```
    
    - 使用範例
    - 註: token 與 id 適合放在 localStorage
    
    ```jsx
    let id =''
    let token='';
    function login(){
        //  註冊路由可以用 signup, users 都是 json-server-auth 所提供，db.json 那放 users就好
        axios.post('http://localhost:3000/signin',{
            "email": "olivier@mail.com",
            "password": "bestPassw0rd",
        })
        .then(function(res){
          console.log(res.data);
          // 夾帶 token
          token = res.data.accessToken;
        })
        .catch(function(err){
          console.log(err.response);
        })
      }
    ```
    
- 更新密碼 ( 無權限 )
    - `patch /users/1` 編輯第一號使用者資料
    - 範例程式碼，編輯1號使用者密碼
    - 這是因為 json-server 是模擬伺服器才有這要減化的作法，實務上來做則多是夾帶 token 而非直接使用路由指定到個人資料
    - 進階用法，利用編輯個人資料的路由模擬權限設計
    
    ```jsx
    function updatePassword(){
        //  註冊路由可以用 signup, users 都是 json-server-auth 所提供，db.json 那放 users就好
        axios.patch('http://localhost:3000/users/1',{
            "password": "worstPassw0rd", // 只放需要更改的屬性與對應資訊
        })
        .then(function(res){
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.response);
        })
      }
    ```
    

- 更新密碼 ( 有權限 )
    - 直接透過路由來模擬不同的權限設定
        - 但 json-server-autth 無法區分最高管理者、商家，或一般使用者
        - 對應: 可以在 users 裡的 user 資料直接加上 身分別 ex: role=”admin” 依照身分別轉地址，或是複數的身分 “role”: [ “user”, “business” ]
        - 一般實務上從 token 就能判別身分別，不須透過這類方法轉址
    - 注意: 若要使用路由權限設定必須夾帶 header ( token )

[https://i.imgur.com/Js8hnA0.jpg%5B/img%5D](https://i.imgur.com/Js8hnA0.jpg%5B/img%5D)

- **範例程式碼**
    
    ```jsx
    function updatePassword(){
        //  註冊路由可以用 signup, users 都是 json-server-auth 所提供，db.json 那放 users就好
        axios.patch('http://localhost:3000/600/users/1',{
            "password": "bestPassw0rd",
        },{
          headers:{
            "authorization":`Bearer ${token}`
          }
        })
        .then(function(res){
          console.log(res.data);
        })
        .catch(function(err){
          console.log(err.response);
        })
      }
    ```
    
    註: 這邊使用 600 ，也就是若登入的是 user1 所給予的 token 只能更改 user1 的資料
    
    而 640 也就是 若登入的 user1 所給予的 token 可以更改 user2 乃至其他人的資料
    
    註: 這邊是 json-server-auth 畢竟是簡易模擬權限管理，所以若不加權限路由 ex: [http://localhost:3000/users](http://localhost:3000/users) 就能取得全部的資料 ( 實際上不會這麼做 )
    
- 新增貼文的寫法
    
    
    - 寫法 1
        
        ```jsx
        //  新增貼文
          // 由於使用權限 600 所以需要夾帶 header 放 token
          // 但若沒加 id 會跳錯: Private resource creation: request body must have a reference to the owner id
        
            function addPost(){
            axios.post('http://localhost:3000/600/posts',{
                "content": "啟用番茄鐘",
                "userId": id  // 注意 id 是放在 body中
            },{
              headers: {
                "authorization": `Bearer ${token}`,
              }
            })
            .then(function(res){
              console.log(res.data);
            })
            .catch(function(err){
              console.log(err.response);
            })
          }
        ```
        
    - 寫法 2
        - 注意: 以路由方式帶入 userId 存取貼文時，**userId 值的格式會是字串，不是數字**
        
        ```jsx
        //  新增貼文的另一種寫法，不用加 id，而 id 部份放在路由
          
            function addPost2(){
            axios.post(`http://localhost:3000/600/users/${id}/posts`,{
                "content": "測試id加在路由的寫法新增貼文",
            },{
              headers: {
                "authorization": `Bearer ${token}`,
              }
            })
            .then(function(res){
              console.log(res.data);
            })
            .catch(function(err){
              console.log(err.response);
            })
          }
        ```