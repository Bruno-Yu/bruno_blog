---
title: JMeter 壓力測試腳本撰寫
description: 蛤！壓力測試腳本要怎麼寫？？
tags: ['測試', '效能']
date: 2024-05-01
type: doc
publish: true
---
# JMeter 壓力測試腳本撰寫

### 好用工具網站

- [JMeter  CLASS](https://jmeter.apache.org/api/org/apache/jmeter/samplers/SampleResult.html)
- [java lang](https://docs.oracle.com/javase/7/docs/api/java/lang/Long.html#parseLong(java.lang.String))
- 壓測不錯的筆記: [https://hackmd.io/@osense-rd-public/jmeter](https://hackmd.io/@osense-rd-public/jmeter)

## 一、 使用 JMeter 的目的，何謂壓力測試

Apache JMeter 是一个開源的性能測試工具，主要用於對後端的 API 進行壓力測試、性能測試負載測試。它可以模拟大量用户同时訪問你的應用程式，從而評估應用程式在不同負載下的性能表現。

## 二、JMeter 的安裝

安裝 Jmeter  需要先安裝 JDK ( **Java Development Kit** )

- [Java 官網 JDK 下載頁面連結](https://www.oracle.com/java/technologies/downloads/#jdk22-windows) ( 筆者測試時使用的是 JDK 22 版本 )

補充: 可安裝不同版本 java jdk 的工具網站  [adoptium](https://adoptium.net/)

由於筆者是用 windows 系統，以下圖來說選擇 x64 installer  下載可以得到 JDK 執行安裝的 exe 檔，下載後直接點擊執行就會在環境中順利安裝該版本的 Java Development Kit

![https://i.imgur.com/7Xkpr4J.png](https://i.imgur.com/7Xkpr4J.png)

接下來到 Apache JMeter 官網下載 JMeter 最新版

- [Apache JMeter 官網](https://jmeter.apache.org/download_jmeter.cgi)  (筆者下載時其版本是 5.6.3 )

以筆者的 windows 系統為例，在 Binaries 類別中，選擇 zip 檔案連結如下圖示進行下載( 若是 Linux 系統需選擇 tgz )，並將其解壓縮後，放在你希望的位置

注意: JMeter 不用再另外安裝，只要解壓縮即可

[https://i.imgur.com/5ZXKDvv.png[/img]](https://i.imgur.com/5ZXKDvv.png[/img])

下載完 JDK & JMeter 後，接下來需要設定 windows 的系統環境變數

![https://i.imgur.com/F3FUsdR.png](https://i.imgur.com/F3FUsdR.png)

如下圖示中所示位置，點選環境變數後再點選新增

![https://i.imgur.com/E2Tj3di.png](https://i.imgur.com/E2Tj3di.png)

將變數名稱設為 JAVA_HOME，變數值則是放置稍早 JDK 所安裝的位置，設置完成後點選確定

[https://i.imgur.com/xuFsBpW.png[/img]](https://i.imgur.com/xuFsBpW.png[/img])

此時會回到環境變數頁面，這時選擇系統變數的 path 處按下編輯按鈕如下圖

![https://i.imgur.com/LAlIavh.png](https://i.imgur.com/LAlIavh.png)

此時會出現編輯環境變數彈窗，在右側按鈕點選新增，並於下列方框處填入 `%JAVA_HOME%\bin` 此意旨為稍早所設定的 JDK 路徑變數其底層 bin 資料夾位置，設定完後點選確定就可以

![https://i.imgur.com/k5CbjDH.png](https://i.imgur.com/k5CbjDH.png)

設定完成後就可以來啟動 JMeter 了，開啟 JMeter 的位置在我們稍早解壓縮完的 JMeter 檔案下的 bin 資料夾下的 jmeter.bat 檔案，點選後應就可以正常啟動

![https://i.imgur.com/WZXEwVn.png](https://i.imgur.com/WZXEwVn.png)

JMeter 順利啟動的畫面示意

[https://i.imgur.com/bhcqHZj.png[/img]](https://i.imgur.com/bhcqHZj.png[/img])

## 三、JMeter 各工具基本介紹

- Response Assertion
    
    使用方式介紹
    
    功能: 用来验证 JSON 响应中是否存在特定的路径，并且可选地验证该路径的值是否与预期值匹配
    
    [https://i.imgur.com/lLMcpcV.png[/img]](https://i.imgur.com/lLMcpcV.png[/img])
    

### 3-1. 總覽

基礎介紹

- **Test Plan 測試計畫**: 放在最外層，內部包含了所有的測試組件 ex: Thread group, Https Test Script Recorder…etc.
- **Thread Group 線程組**: 模擬用戶併發訪問應用程式
- **Sampler:** 整個測試計畫的最小單位， Sampler 代表了一個 request，可以是 HTTP, FTP, JDBC
- **Listener** **監聽器**: 用於監聽整個計畫的測試結果 & 產生對應報告 ex: result tree
- **Logic Controller 邏輯控制器**: 可以在測試計畫中設置撰寫 & 調控對應的測試邏輯 ex: Loop controller, if controller…etc.
- **Config Element:** 常用於配置測試中的各種參數與設置 ex: User Defined Variables, HTTP Header Manager, CSV Data Set Config…etc.
- **Pre-Processor ( 前置處理器 ):** 在 Sample 執行前，用於對指定參數修改或定義參數
- **Post-Processor ( 後置處理器 )**: 在 Sample 執行後，用於對指定參數調整或是依據運行後數據抽取特定的內容做為變數 ( ex: JSON Extrator )
- **Assertion ( 斷言 )**: 用於 API 回傳結果進行驗證，以確認 API 回覆結果看是否符合預期
- **Timer**: 常用於 sample (請求) 與 sample 間，用來添加延遲或是間隔時間，以模擬用戶的行為模式

![https://i.imgur.com/CgppwHu.png](https://i.imgur.com/CgppwHu.png)

添加方式如下，在需要使用的地方按下右鍵，會跳出添加 ( Add ) 選項可以添加以上提及的各種工具

![https://i.imgur.com/8RoJage.png](https://i.imgur.com/8RoJage.png)

### 3-2. **Thread Group**

- **說明:** 只可以在 Test Plan 層增加，可模擬用戶併發訪問的行為
- **添加位置**:  Threads ( Users ) / Thread Group

![https://i.imgur.com/VxL73s7.png](https://i.imgur.com/VxL73s7.png)

### 3-3. **User Defined Variables**

- **說明:** 訂定全域變數，若有多個且有同樣的變數名，則會以最靠近測試腳本的為主
- **添加位置**:  Config Element / User Defined Variables

[https://i.imgur.com/jZAtAby.png[/img]](https://i.imgur.com/jZAtAby.png[/img])

### 3-4. **CSV Data Config**

- **說明**: 常用於引入多筆測資 ( ex: user 的帳密 )
- **添加位置**:   Config Element / CSV Data Config

![https://i.imgur.com/sCnseej.png](https://i.imgur.com/sCnseej.png)

### 3-5. **HTTP Header Manager**

- **說明**: 訂定 sample 的 Header ( 範例位置是設置全域的，但也可以單獨設定單一 sample )
- **添加位置**:  Config Element / HTTP Header Manager

[https://i.imgur.com/EpbpBRR.png[/img]](https://i.imgur.com/EpbpBRR.png[/img])

### 3-6.  **Counter**

- **說明**:   每次執行時都會加指定數值，並且會匯出對應的變數名稱
- **添加位置**:  Config Element / Counter

[https://i.imgur.com/GRwjD7R.png[/img]](https://i.imgur.com/GRwjD7R.png[/img])

### 3-7.  **Simple Controller**

- **說明**:   包裝線性行為邏輯 ( 常使用來包裝某個行為腳本 )
- **添加位置**:  Logic Controller / Simple Controller

![https://i.imgur.com/Rk88i0D.png](https://i.imgur.com/Rk88i0D.png)

### 3-8.  **Loop Controller**

- **說明**:   用來重複執行其子層的腳本
- **添加位置**:  Logic Controller /  Loop Controller

![https://i.imgur.com/jWYsy9a.png](https://i.imgur.com/jWYsy9a.png)

### 3-9. **If Controller**

- **說明**:   用來設定須滿足特定條件才跑其底下的腳本
- **添加位置**:  Logic Controller /  If Controller

![https://i.imgur.com/UZAgMZb.png](https://i.imgur.com/UZAgMZb.png)

### 3-10. **While Controller**

- **說明**:   用來設定須滿足特定條件才跑其底下的腳本
- **添加位置**:  Logic Controller /  While Controller

[https://i.imgur.com/danA7p0.png[/img]](https://i.imgur.com/danA7p0.png[/img])

### 3-11.  **BeanShell** **PreProcessor**

- **說明**:   前處理邏輯撰寫，可以設在個別 sample 內或是特定行為內
- **添加位置**: Pre Processors /  BeanShell PreProcessor

[https://i.imgur.com/TZAj6ef.png[/img]](https://i.imgur.com/TZAj6ef.png[/img])

### 3-12. **JSON Extractor**

- **說明:** 後處理邏輯撰寫，可以抽出 API 的回應的內容並設定成自訂變數取用
- **添加位置**: Post Processors / JSON Extractor

[https://i.imgur.com/nStQE5f.png[/img]](https://i.imgur.com/nStQE5f.png[/img])

### 3-13.  **BeanShell** **PostProcessor**

- **說明**:   後處理邏輯撰寫，可以設在個別 sample 內或是特定行為內
- **添加位置**: Post Processors /  BeanShell PostProcessor
    
    [https://i.imgur.com/68d7j5q.png[/img]](https://i.imgur.com/68d7j5q.png[/img])
    

### 3-14. **Gaussian Random Timer**

- **說明:** 用來訂定隨機時間
- **添加位置**: Timer /  Gaussian Random Timer

[https://i.imgur.com/3vzE6w9.png[/img]](https://i.imgur.com/3vzE6w9.png[/img])

   

### 3-15.  **Constant Timer**

- **說明:** 用來訂定固定延遲多少時間
- **添加位置**: Timer /  Constant Timer

[https://i.imgur.com/4HBtB1T.png[/img]](https://i.imgur.com/4HBtB1T.png[/img])

### 3-16.  **View Result Tree**

- **說明:** 用來測試腳本執行 & 錄製執行過程/結果
- **添加位置**: Listener / View Result Tree

[https://i.imgur.com/clWzJzu.png[/img]](https://i.imgur.com/clWzJzu.png[/img])

### 3-17.  **View Result in Table**

- **說明:** 用來測試腳本執行 & 錄製執行過程/結果 (平均值顯示)
- **添加位置**: Listener / View Result in Table

[https://i.imgur.com/NS7Ja28.png[/img]](https://i.imgur.com/NS7Ja28.png[/img])

### 3-18. **Aggregate Report**

- **說明:** 用來測試腳本執行 & 錄製執行過程/結果 (彙整結果) 有更多參數
- **添加位置**: Listener / Aggregate Report

[https://i.imgur.com/FwmEgeQ.png[/img]](https://i.imgur.com/FwmEgeQ.png[/img])

### 3-19. **Http(s) Test Script  Recorder**

- **說明: 只能在 Test Plan 中新增，**用來錄製網站 API 行為的工具
- **添加位置**: Non-Test Elements / Http(s) Test Script  Recorder

[https://i.imgur.com/RJEYtoP.png[/img]](https://i.imgur.com/RJEYtoP.png[/img])

- JMeter Assertion 斷言說明
    
    功能: 用来验证 JSON 响应中是否存在特定的路径，并且可选地验证该路径的值是否与预期值匹配
    
    - 參考文章
        - [https://www.linkedin.com/pulse/jmeter-json-assertion-step-by-step-guide-part-33-aashi-soni](https://www.linkedin.com/pulse/jmeter-json-assertion-step-by-step-guide-part-33-aashi-soni)
        - [https://blog.csdn.net/qq_45138120/article/details/130994481](https://blog.csdn.net/qq_45138120/article/details/130994481)
        - [https://zhuanlan.zhihu.com/p/541971429](https://zhuanlan.zhihu.com/p/541971429)
    

- 參考資料
    - [**jmeter安装教程以及jdk环境配置_正版win10下载**](https://cloud.tencent.com/developer/article/2147371)
    - [**[JMeter]JMeter安裝與環境設定**](https://ithelp.ithome.com.tw/articles/10285271)

- 安裝教學文章: [https://ithelp.ithome.com.tw/articles/10285271](https://ithelp.ithome.com.tw/articles/10285271)
- 需先安裝  JDK ( Java development kit ):
- Apatch JMeter: [https://jmeter.apache.org/download_jmeter.cgi](https://jmeter.apache.org/download_jmeter.cgi)   ( 
 檔案解壓縮後，可放置於任意目錄下(不需安裝)。 )

## 四、搭配 Postman Record samples

目的: 搭配 postman 進行 JMeter 對應 API sample 的錄製

### **JMeter 處設置:**

JMeter 處至少需要需要配置如下(如圖中所示):

1. Thread Group ( 在 Test Plan 中 Threads (Users) 添加 )
2. Recording Controller ( 在 Thread Group 中 Logic Controller 添加 )
3. HTTP(S) Test Script Recorder ( 在 Test Plan 中 Non-Test Elements 添加 )

![https://i.imgur.com/1yZXpBt.png](https://i.imgur.com/1yZXpBt.png)

註: HTTP(S) Test Script Recorder 會起一個本地 server ( localhost ) 並使用指定 port 號(預設是8888)，在按 Start 後就會開始錄製

### **Postman 處的設置**:

先將線上 postman 的文件拉到本機 postman 應用，點擊 線上文件中的 **Run in Postman** 按鈕

![https://i.imgur.com/x3s7CUK.png](https://i.imgur.com/x3s7CUK.png)

接下來待 postman 線上文件成功匯入本地應用後，按下設定(如下圖箭頭所示)

![https://i.imgur.com/zBeTLuu.png](https://i.imgur.com/zBeTLuu.png)

接下來找到左邊欄位的 proxy 設定，將 custom proxy 開啟，並設置稍早在 JMeter 已設置的路由 ( 範例是 8888 )

![https://i.imgur.com/ozekoqa.png](https://i.imgur.com/ozekoqa.png)

### **開始錄製**:

此時回到 JMeter 的頁面，按下  HTTP(S) Test Script Recorder 中的 Start 鍵

![https://i.imgur.com/hGgnuZf.png](https://i.imgur.com/hGgnuZf.png)

此時會彈出以下視窗，此視窗的意思是 JMeter 會自動幫你產生你目前起的這個 server 的憑證(crt)並同時將此憑證存取在 apache-jmeter/bin 路徑底下，名為 ( ApacheJMeter )

![https://i.imgur.com/SKHlu81.png](https://i.imgur.com/SKHlu81.png)

按下ok或稍等待片刻後錄製就會開始，並彈出以下視窗

![https://i.imgur.com/mlnvAQu.png](https://i.imgur.com/mlnvAQu.png)

此時開始在 postman 操作 api 行為，錄製想錄製的 api 行為 ( 若稍早 proxy 有成功設定，此時從 postman 的 console 觀察，就可以看到打出的 API 內的 proxy 屬性，是我們早先設置的 localhost port 號 )

![https://i.imgur.com/k3mMvZd.png](https://i.imgur.com/k3mMvZd.png)

要結束時，同樣邏輯，在視窗中按下 Stop 按鈕如下所示，就會停止錄製

![https://i.imgur.com/mlnvAQu.png](https://i.imgur.com/mlnvAQu.png)

若錄製成功，你的 recorder controller 下層應會有類似下圖的情況，代表因打 api 所產生的 sample 有成功被錄製 

![https://i.imgur.com/aSnHSqi.png](https://i.imgur.com/aSnHSqi.png)

## 五、補充

jexl2 特殊語法補充

```bash
# UUID – 產生隨機產生一組 UUID
${__UUID} # ex:af3fb677-df67-4445-bf27-5713f76137b5

# intSum – 計算兩個或多個整數值總和
${__intSum([2個或多個數值])} #範例 ${__intSum(3,2,5)} 同等於 10

# isVarDefined – 變數存在時返回 True, 否則 False
${__isVarDefined([變數名])} #範例  ${__isVarDefined(thread)} 會回傳 True/False

# Time – 以各種格式返回當前時間
${__time([時間格式])} # ${__time(YMD, )}  等於 20211028 ; ${__time(dd/MM/yyyy,)}  等於 28/10/2021

# digest – 使用特定演算法加密 (返回加密值)
${__digest([加密算法], [輸入字串])} # ${__digest(MD5, input string)} 回傳 164c375b4a5df44a332ca34bda6cba9d

#changeCase - 大小寫轉換
${__changeCase([英文字串],[大小寫設定],)} # ${__changeCase(Hello,UPPER,)} 回傳 HELLO ; ${__changeCase(hello,CAPITALIZE,)} 回傳 Hello

#RandomString - 隨意長度的字串

${__RandomString([需要字串長度], random)} #${__RandomString(3, random)} 回傳 doa

```