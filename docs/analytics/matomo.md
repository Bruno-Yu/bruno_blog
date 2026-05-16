---
title: matomo研究
description: 使用 GA 分析總是要花錢，試試 matomo 吧
tags: ['前端', 'Nuxt3', '使用者分析', 'matomo', 'fingerprint']
date: 2024-08-01
type: doc
publish: true
---
# Matomo 整理筆記

## 一、使用者追蹤 / 埋點 ( 使用者指紋 )

現今，蒐集和分析用戶行為數據在數據驅動的策略中扮演著至關重要的角色。透過分析所收集的數據，開發人員和產品團隊可以深入了解用戶的行為模式、優化產品功能、改善用戶體驗，並針對不同用戶群體制定精準的營銷策略。具體細節如下：

1. **蒐集用戶行為數據**：透過在關鍵位置插入特徵代碼，可以蒐集用戶的行為數據，例如用戶訪問哪些頁面、點擊哪些按鈕、使用哪些功能等。
2. **分析用戶習慣**：透過分析蒐集的用戶行為數據，可以了解用戶的行為習慣，例如用戶喜歡使用哪些功能、訪問哪些頁面、以及在什麼時間段使用產品等。
3. **提供數據支持**：透過蒐集用戶行為數據，企業可以獲得更有價值的數據支持，從而制定更科學的產品策略、營銷策略和開發策略。
4. **優化產品體驗**：透過蒐集用戶行為數據，企業可以了解用戶在使用產品時的痛點和需求，從而有針對性地優化產品體驗，提高用戶滿意度。
5. **提高轉化率**：透過分析用戶的行為數據，可以找到影響用戶轉化的關鍵因素，從而對產品、頁面、營銷策略等進行優化，提高轉化率。

此外，瀏覽器指紋技術是數據分析中的一個重要工具，它通過收集用戶的瀏覽器特徵（如操作系統、瀏覽器版本、字體、插件等）來唯一識別用戶。這種技術不依賴於 cookie，可以在用戶多次訪問網站時保持一致性，有助於更準確地追踪和分析用戶行為，提升數據分析的精確度和可靠性。

## 二、matomo 環境建置 ( 本地測試 )

matomo 是開源專案，其對標的服務為 Google Analysis ( GA ) 其方便我們自行架設用於追蹤我們的產品網站，進而將該資訊拿來作為使用者行為分析，或是偵測異常操作等行為

### 2-1. docker 環境建置

為進行進一步研究，需先架設前端專案可連結的環境，這邊使用 docker 或是請公司 DevOpt 協助架一個 matomo 平台 ( matomo image 只能使用 MySQL，所以要 compose 的話也要用 MySQL )

這邊是使用 docker compose ，並搭配 MySQL 以及 matomo 官方 image 作為環境建置

對應的 **docker-compose.yml** 如下

**docker-compose.yml**

```jsx
// **docker-compose.yml**
version: '1'

services:
  db:  //服務名稱
    image: mysql:latest // 使用 image 若本地沒有會自動下載
    restart: always
    container_name: matomo_mysql // container 名稱
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: matomo
      MYSQL_USER: admin // 設置 SQL user name
      MYSQL_PASSWORD: 123456 // 設置 SQL user password
    volumes:
      - db_data:/var/lib/mysql  // 設置本地存取空間
    networks: // 設置連結網路
      - matomo_network

  matomo:
    image: matomo
    container_name: matomo
    restart: always
    ports:
      - 8080:80 // 設置建立服務的 port，所以此服務可以使用 localhost:8080 看到
    environment:
      - MATOMO_DATABASE_HOST=db  // 所依賴的 db 變數
      - MATOMO_DATABASE_USERNAME=admin  // 設置 matomo user name
      - MATOMO_DATABASE_PASSWORD=123456 // 設置 matomo user password
      - MATOMO_DATABASE_DBNAME=matomo // 對街 SQL db 名稱
    networks: // 設置連結網路
      - matomo_network
    depends_on:
      - db

networks:
  matomo_network:

volumes:
  db_data:，
```

接下來使用 docker 指令啟動環境

```jsx
docker-compose up -d
```

當跑完後，可以使用已下指令確認 docker 環境有正常運作

```powershell
#input
docker ps

# output example
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                  NAMES
abcd1234efgh   matomo:latest  "/entrypoint.sh apac…"   2 minutes ago    Up 2 minutes    0.0.0.0:8080->80/tcp   matomo
ijkl5678mnop   postgres:latest "/docker-entrypoint.…"   2 minutes ago    Up 2 minutes    5432/tcp               matomo_postgres
```

接下來就到 matomo 平台進行設定 ( 由於上面我們是建立在 8080 port ，所以我們需到 [localhost:8080](http://localhost:8080) 去查看進一步的 matomo 安裝服務 )

若需要關閉這環境，可以下以下指令

```powershell
docker-compose stop #暫停
docker-compose down #直接關閉
```

### 2-2. matomo 安裝設定

本地環境建置後，接下來是到 matomo 的官方網頁進行設定

需要注意的是 matomo 是使用 MySQL 也就是連結的 db 也只能是 mySQL

注意: 初步建置階段，至少會 loading 一段時間 ( 至少 5分鐘 )，一開始會偵測目前本機配置等相關訊息

[https://i.imgur.com/VFVvdgX.png[/img]](https://i.imgur.com/VFVvdgX.png[/img])

生成需要埋在前端 header 中的代碼

[https://i.imgur.com/sVaP4PY.png[/img]](https://i.imgur.com/sVaP4PY.png[/img])

[https://i.imgur.com/jXSAP5j.png[/img]](https://i.imgur.com/jXSAP5j.png[/img])

生成 matomo 需要辨識前端網站的 **siteId**

[https://i.imgur.com/9OW2n8f.png[/img]](https://i.imgur.com/9OW2n8f.png[/img])

若埋點成功，就可以從你 dashboard 中看到你專案的情況

[https://i.imgur.com/3TnKGRx.png[/img]](https://i.imgur.com/3TnKGRx.png[/img])

### 2-3. 前端專案設置 ( 搭配 fingerprint.js )

接下來進行前端設置，我們需要埋 matomo 需要在專案 header 埋的追蹤碼，另外由於筆者是使用 Nuxt3 進行前端專案開發，所以也需要另外安裝 vue-matomo library 以確保 matomo 可以接收並辨識對應網頁使用者以及進行進一步相關的設定，另外我是用 fingerprint.js 這網站指紋生成套件來辨識目前使用者 ( 此套件會針對使用者硬體配置、螢幕解析度、瀏覽器套件、語言…etc. ) 來生成一段 sha key

- 需安裝 [vue-matomo npm](https://www.npmjs.com/package/vue-matomo)
- 亦安裝 [fingerprint.js 開源版 npm](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs)

由於是在 Nuxt3 安裝 vue 套件，我們可以在 plugins 中進行進一步的設置

建立 matomo.client.ts 確保以下內容只能在 client side 運作

```jsx
// matomo.client.ts
import VueMatomo from 'vue-matomo'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
	// 先進行 fingerprint 自訂方法，生成每個使用者獨立的 sha key 作為 matomo 的 userId
	async function getFingerprint() {
		const fp = await FingerprintJS.load()
		const options = {
			debug: true // 需要除錯再打開
		}
		// 此 result 中已包含 vistorId, confidence, components 三個元件
		const result = await fp.get(options)
		// 但由於我不希望不同螢幕設備就辨識為不同使用者 ( 筆者自己就有兩個螢幕 )
		// 可藉由以下設定來排除螢幕變數
		const { screenFrame, screenResolution, ...components } = result.components
		// 重新生成依照自己設定 components 變數的 visitorId
		const visitorId = FingerprintJS.hashComponents(components)
		return { visitorId, components } // components 中可以看到目前定義的變數以及 fingerprint 針對變數所偵測到的結果
	}
	const { visitorId, components } = await getFingerprint()
	console.log('fingerprint', components)
	nuxtApp.vueApp.use(VueMatomo, {
		router: nuxtApp.$router,
		host: 'http://localhost:8080/', // matomo 服務地址
		siteId: 1, // siteId 要從 matomo 平台生成
		enableLinkTracking: true,
		requireConsent: false,
		trackInitialView: true,
		disableCookies: false,
		requireCookieConsent: false,
		enableHeartBeatTimer: true,
		heartBeatTimerInterval: 5,
		trackerFileName: 'piwik',
		trackerUrl: 'http://localhost:8080.php', // matomo 服務地址
		trackerScriptUrl: 'http://localhost:8080/matomo.js', // matomo 服務地址
		userId: visitorId, // 放 fingerPrint 生成的 id ，當然若你有你的使用者 id 那更好
		preInitActions: [
			// ，陣列中的每一個項目都是一個包含 Matomo 設置動作的陣列。這些動作會在 Matomo 初始化之前被執行。這個特性通常用於在 Matomo 初始化之前自訂追蹤器的行為。
			['setCustomVariable', '1', 'VisitorType', 'Member'],
			['appendToTrackingUrl', 'new_visit=1']
		]
	})
})
```

接下來記得要在專案中塞入 matomo 生成的追蹤碼

筆者是在 app.vue 中使用 useHead 放入，可參考下方 code

```jsx
// app.vue
<script setup lang="ts">
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { onMounted } from 'vue';

useHead({
	htmlAttrs: {
		lang: currentLanguageCode.value,
		translate: 'no',
	},
	script: [
		{ // 將 matomo 建置的追蹤碼塞到這邊
			children: `
        var _paq = window._paq = window._paq || [];
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//localhost:8080/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `,
			type: 'text/javascript',
		},
	],
});

const trackSearch = () => {
// 若有順利塞成功，就可以使用 window.window._paq 來做與 matomo 溝通的埋點操作
	window.window._paq.push(['trackPageView']);
};
onMounted(() => {
	trackSearch();
});
</script>

<template>
	<div
		id="app"
		class="relative container max-w-screen-sm mx-auto unselectable"
	>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

```

**需要特別注意的是，matomo 的 \_paq 工具在 Nuxt3 內使用時，不是用 window 取出，而是以 `window.window._pad` 使用**

## 三、matomo 使用者追蹤設定

大致上可以分為幾個方式

- **手動埋點 ( 免費 )** : 在前端專案中，請前端在需要監測的按鈕或是 event 進行埋點，方便讓 matomo 進行偵測
- **啟動 Tag Manager（標籤管理器） ( 免費 )**: 要在不需要逐個埋點的情況下追蹤使用者在特定時間進入了哪些頁面並觸發了哪些自訂事件可以使用，此在 matomo 平台就可以操作
- **使用 matomo plugin** : 可以使用付費版插件 [**Heatmap & Session Recording**](https://matomo.org/guide/reports/session-recordings/) 其監測的範疇較為全面，包含使用者螢幕錄影等分析，可以知道頁面點擊率 & 並用熱圖的方式呈現，也會用 使用者 profile 的方式，紀錄該使用者點擊的內容以及對應行為，並可用影片呈現

### 3-1. 手動埋點範例

手動埋特定按鈕做為追蹤，可以參考如下

```jsx
<script lang='ts' setup>
...

// buy button
const buyButton = () => { // 埋點範例
	window.window._paq.push(['trackEvent', 'Button', 'click', 'Buy Button']);
	router.push('/Transaction');
};

...
</script>

```

若埋點成功，可以從 dashboard 的 Behavior 分類中的 Events 看到詳細情形

[https://i.imgur.com/Ptu9ayi.png[/img]](https://i.imgur.com/Ptu9ayi.png[/img])

### 3-2. **啟動 Tag Manager**

1.  **安裝 Matomo Tag Manager**：
    如果你還沒有使用 Matomo Tag Manager，請先安裝和設定。這通常在 Matomo 的管理界面中可以找到。
    若順利安裝後可以在下列位置設置對應的 Tag

        [https://i.imgur.com/rW6Mjp5.png[/img]](https://i.imgur.com/rW6Mjp5.png[/img])

2.  **在 Matomo 中創建一個新的 Container（容器）**：

    - 創建一個新的 Container，這將用於管理你的追蹤標籤和觸發條件。

    註: 通常有建立網站會有預設的 container 建立

    [https://i.imgur.com/Fxnn8M2.png[/img]](https://i.imgur.com/Fxnn8M2.png[/img])

3.  **設置觸發器 Triggers** ：

    - 在 Container 中，創建一個新的 Trigger。

    [https://i.imgur.com/VOifEdE.png[/img]](https://i.imgur.com/VOifEdE.png[/img])

    - 設置觸發的事件 ( ex: 點擊事件、進入頁面、滑鼠滑動、滾動行為…etc. )

    [https://i.imgur.com/qUj0uHr.png[/img]](https://i.imgur.com/qUj0uHr.png[/img])

    - 選擇後，就可以根據那 event 進一步設置觸發條件，以及設定 trigger 名稱
      [https://i.imgur.com/0L0KD9x.png[/img]](https://i.imgur.com/0L0KD9x.png[/img])

4.  **添加自動事件追蹤標籤 Tag**：

    - 在 Container 中，創建一個新的標籤。

    [https://i.imgur.com/F6uYbDx.png[/img]](https://i.imgur.com/F6uYbDx.png[/img])

    - 選擇「**自訂 HTML」標籤**」。

    [https://i.imgur.com/xcO0qxn.png[/img]](https://i.imgur.com/xcO0qxn.png[/img])

    - **在標籤設置中，加入自動追蹤 JavaScript 程式碼**。例如：

    此程式碼會自動追蹤點擊事件，並記錄元素的 ID 和類別。

    ```jsx
    // 需埋在前端專案 header 中
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        document.body.addEventListener('click', function(event) {
          var element = event.target;
          var elementId = element.id || element.tagName.toLowerCase();
          var elementClasses = element.className || 'no-class';

          // 發送自訂事件到 Matomo
          _paq.push(['trackEvent', 'DOM Interaction', 'Click', elementId + ' ' + elementClasses]);
        });
      });
    </script>

    ```

    - **在標籤設置中，設置觸發條件**

    選擇稍早建立的 trigger 器

    [https://i.imgur.com/QWxMFvR.png[/img]](https://i.imgur.com/QWxMFvR.png[/img])

    **發布並檢查追蹤結果**：

    - 保存並發布你的 Container。
    - 在 Matomo 後台的「事件」報告中檢查追蹤結果，查看自動收集的點擊事件資料。

接下來應就可以順利查看到我們在 DOM 中所埋的對應事件觸發結果

[https://i.imgur.com/m4ydKup.png[/img]](https://i.imgur.com/m4ydKup.png[/img])

- **檢查特定使用者在特定時間觸發 action**

可以藉由 Visitors 中的 Visits log 中找到對應數據

並且可以使用上方篩選進行特定使用者或特定條件進行結果篩選

[https://i.imgur.com/2B35lmU.png[/img]](https://i.imgur.com/2B35lmU.png[/img])

- **Visits log 中查找 Visitor profile 並查找特定時間軸與行為**

同樣在 Visits log 頁可查到 Visitor Profile 進入點如下

[https://i.imgur.com/GgqLfqj.png[/img]](https://i.imgur.com/GgqLfqj.png[/img])

- **Visitor profile 中重現使用者觸發 trigger tag 的行為**

[https://i.imgur.com/6E0wTfk.png[/img]](https://i.imgur.com/6E0wTfk.png[/img])

此時就可以進到目標網站，查看使用者當時的使用紀錄

[https://i.imgur.com/6MOzJXr.png[/img]](https://i.imgur.com/6MOzJXr.png[/img])

### 3-3. **使用 matomo plugin**

這邊沒有購買 [\*\*Heatmap & Session Recording](https://matomo.org/guide/reports/session-recordings/)\*\* 套件，但這邊稍微說明下套件的位置

**套件安裝 matomo market**

[https://i.imgur.com/iGM7hSc.png[/img]](https://i.imgur.com/iGM7hSc.png[/img])

**套件設定 ( 包含主題套件的更換 )**

[https://i.imgur.com/HGY0ww7.png[/img]](https://i.imgur.com/HGY0ww7.png[/img])

## 四、參考資料

- [**埋点是什么？有什么作用？前端如何埋点？**](https://blog.csdn.net/weixin_40381947/article/details/131443220)
- [**前端埋点的那些事**](https://www.imooc.com/article/27151)
- [**網站使用者行為追蹤與轉換分析 — GA4、實驗分析、CDP**](https://medium.com/3pm-lab/%E7%B6%B2%E7%AB%99%E4%BD%BF%E7%94%A8%E8%80%85%E8%A1%8C%E7%82%BA%E8%BF%BD%E8%B9%A4%E8%88%87%E8%BD%89%E6%8F%9B%E5%88%86%E6%9E%90-ga4-experiment-cdp-1770b1e174f6)
- [**Matomo 从了解到落地——页面流量统计与分析最佳实践**](https://kayosite.com/matomo-best-practices.html)
- [**Vue中使用matomo进行访问流量统计**](https://juejin.cn/post/6844903986638618632)
- [**How do I install the Matomo tracking code on websites that use Vue.js?**](https://matomo.org/faq/new-to-piwik/how-do-i-install-the-matomo-tracking-code-on-websites-that-use-vue-js/)
- [**VUE-MATOMO实现埋点**](https://www.cnblogs.com/zwbsoft/p/14777157.html)
- [Nuxt3 安裝方式](https://github.com/AmazingDreams/vue-matomo/issues/121)
- [matomo API Refernece](https://developer.matomo.org/api-reference/tracking-javascript)
- [**Single-Page Application/Progressive Web App Tracking**](https://developer.matomo.org/guides/spa-tracking#link-tracking)
