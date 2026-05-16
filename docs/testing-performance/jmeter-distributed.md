---
title: JMeter 單體&分散式壓測筆記
description: 蛤？單體或分散測試要怎麼做？
tags: ['測試', '效能']
date: 2024-01-01
type: doc
publish: true
---
# JMeter 單體&分散式壓測筆記



### 好用工具網站

- DBeaver (DB GUI)
- [everything](https://www.voidtools.com/): window 系統查找資料神器
- [JMeter  CLASS](https://jmeter.apache.org/api/org/apache/jmeter/samplers/SampleResult.html)
- [java lang](https://docs.oracle.com/javase/7/docs/api/java/lang/Long.html#parseLong(java.lang.String))
- [JMeter GitHub](https://github.com/apache/jmeter)
- [JMeter GitHub Issues](https://github.com/apache/jmeter/issues/5153)
- [JMeter Best Practice](https://jmeter.apache.org/usermanual/best-practices.html)
- 開壓測規格可參考文章 [**如何利用JMeter模拟超过 5 万的并发用户**](https://www.cnblogs.com/felix-/p/4351112.html)

## 一、使用遠程伺服器管理的工具

- XShell: 遠程伺服器管理工具，也可以稱為 SSH（Secure Shell）Client ( 使用 CLI 與遠端的伺服器溝通 )
- Xftp: 遠程伺服器文件管理工具 ( 方便使用 GUI 介面直接傳輸 )
    - [XShell & Xftp official download link](https://www.netsarang.com/en/free-for-home-school/) ( Free for 7 days only )
- Terminus: 結合以上兩者的工具，其介面更美觀，使用者體驗更好，免費版就可以使用以上兩者的功能
    - [terminus download link](https://termius.com/free-ssh-client-for-windows)

類似 XShell, Xftp 的工具: Terminus

## 二、**測試前**須具備知識

- 在 Non-GUI 測試時，測試環境多是 Linux 所以要用 .sh 檔( ex: ./jmeter.bat) 作為執行檔，但在 windows 環境多用 .bat 檔作為執行檔 ( ex: ./jmeter.bat )
- **測試腳本以我們開發團隊來說都一致放在 JMeter 的 bin 資料夾下的 test_scripts 資料夾內**
- 由於伺服器多使用 Linux 環境，因此在操作時需要具備一定的 Linux 指令基礎
- 以下測試筆記有使用到的 Linux 指令操作 & 說明
    
    ```bash
    # 前往
    cd [相對或絕對位置] # ex: cd ~ 到根目錄
    
    # 列出目前位置下的所有文件名稱
    ls
    
    # 下載
    wget [url] #ex:wget https://mirrors.tuna.tsinghua.edu.cn/apache//jmeter/binaries/apache-jmeter-5.6.3.tgz
    # 註:  也可以用 curl -o [url]
    
    # 使環境變數生效 
    source [路徑] #ex: source ~/.bashrc 使根目錄的 bashrc 文件中的環境變數生效
    
    # 寫入
    echo [自訂子串] >> [對應位置的文件] #ex: echo 'export JAVA_HOME=/home/bruno/jdk-21.0.3' >> ~/.bashrc
    
    # 解壓縮 tar 壓縮類型，並下對應的參數 z(gzip算法),x(extract),v(verbose),f(file)
    tar zxvf [檔案名]
    # 註: tar 與 unzip 的差異在於解壓縮的檔案對象類型不同
    
    # 使用 root 權限執行指定指令
    sudo [指令]
    
    # 轉換 root 身份
    sudo -i
    #註: 轉換成 root 身分後預計會在 /root  目錄,但此非根目錄，而是類似 root 使用者的 home 層
    # 若要取得其他使用者的路徑的話要回到上一層 cd .. 再到 home 資料夾下尋找
    # 若要將他人使用者的資料進行複製，則需要用 chmod 去更改文件的使用權限
    #當轉回自己身份時所使用
    exit 
    
    # 可以從本地傳到遠端傳檔案使用，基於 ssh 封裝而成 (但也可以使用FTP的GUI軟體替代 ex: Xftp)
    scp 
    
    #查看當前路徑
    pwd
    
    # 查看目前路徑下檔案的權限
    ll
    
    # 查詢目前的 ip 地址 ( windows 是 ipconfig )
    ip addr
    
    #查詢目標主機是否連線正常
    # 主要向目標主機發送 ICMP(Internet Control Message Protocol),等待目標主機回復ICMP以確認正常
    # 可以用來檢查目標主機是否在線、網路延遲、丟包率等相關信息
    ping [選項] [目標主機IP]
    
    #複製指定文件進入指定路徑
    cp [目標文件路徑&名稱] [目的文件放置路徑]
    #註: 若要刪除原本的要加 -r 代表 remove
    
    touch 新建檔案
    
    mkdir 新建資料夾
    
    su 轉換使用者
    
    /etc/hosts #可察看目前 ip 本地指向
    
    htop #可以看目前硬體的狀態
    
    top #可以看目前硬體的狀態
    
    curl -s ifconfig.me #可以拿到自己外網的 IP
    ```
    
- Linux 中的編輯器 vim 相關的語法 ( [延伸閱讀](https://linux.vbird.org/linux_basic_train/centos8/unit03.php) )
    
    
    | 慣用的指令 | 說明 |
    | --- | --- |
    | i, [esc] | i 為進入編輯模式， [esc] 為離開編輯模式 |
    | G | 移動到這個檔案的最後一列 |
    | gg | 移動到這個檔案的第一列 |
    | nG | n 為數字，移動到這個檔案的第 n 列，例如 10G 為讓游標去到第 10 列 |
    | dd | dd 為刪除游標所在行，5dd 為刪除 5 行，ndd 為刪除 n 行 |
    | yy | yy 為複製游標所在行，5yy 為複製 5 行，nyy 為複製 n 行 |
    | p | 在游標底下貼上剛剛刪除/複製的資料 |
    | u | 復原前一個動作 |
    | :w | 將目前的資料寫入硬碟中 |
    | :q | 離開 vim |
    | :q! | 不儲存 (強制) 離開 vim |
- 提醒: 在 XShell 中的複製 & 貼上快捷鍵如下
    - 複製 ctrl + insert ( ctrl + shift + c  沒有作用，但使用 terminus 可以正常使用 )
    - 貼上 shift + insert ( ctrl + shift + v 沒有作用，但使用 terminus 可以正常使用 )

## 三、連結遠端伺服器

此步驟需要先下載遠程伺服器管理軟體，以此次操作則是以 XShell 搭配 Xftp 為例，但考量到費用問題，也補上 terminus 操作畫面做為參照

註: [XShell & Xftp official download link](https://www.netsarang.com/en/free-for-home-school/) ( Free for 7 days only ) 

- 若使用 XShell 程式後的畫面如下 ( 筆者是第 7 版 )
關掉工作階段視窗後，可以看到右側有可下 linux 指令的畫面
    
    ![https://i.imgur.com/Epg59sn.png](https://i.imgur.com/Epg59sn.png)
    
    若使用 terminus 則直接進左側工具欄的 Hosts 頁面
    
    ![https://i.imgur.com/hiEm3qr.png](https://i.imgur.com/hiEm3qr.png)
    
- 連結遠端已開好的測試伺服器指令 
此段須由對象伺服器提供可進入的使用者身份與與其連結的 IP 地址 ( 由於使用 ssh 連線，所以需要事先提供 ssh 公鑰給伺服器端已方便其在建立使用者時順便建立 ssh 連線 )
    
    ```bash
    # 連結 slave 對象 server
    ssh [user]@[ip address] #ex: ssh bruno@34.93.207.89
    ```
    
    若使用 terminus 這部分指令已由 GUI 做呈現，如下圖
    
    ![https://i.imgur.com/j7tViIO.png](https://i.imgur.com/j7tViIO.png)
    
- 通常第一次連線，當輸入後，伺服器端會要求核對 ssh，此時就需要提供 ssh 私鑰，以方便伺服器驗證身分
windows 本地中查找私鑰的位置在於使用者 .ssh 資料夾下的 id_rsa 檔
    
    ```bash
    # windows 存放 ssh 路徑
    C:\Users\[user名]\.ssh
    ```
    
    ![https://i.imgur.com/YTBes37.png](https://i.imgur.com/YTBes37.png)
    
    並將此檔匯入剛才 XShell 跳出的視窗後，就會出現以下的畫面，按下接受與存檔按鈕
    
    ![https://i.imgur.com/NCOefy0.png](https://i.imgur.com/NCOefy0.png)
    
    若使用 Terminus 也會跳一個類似的視窗，如下圖
    
    [https://i.imgur.com/Dh1G4Z4.png[/img]](https://i.imgur.com/Dh1G4Z4.png[/img])
    

## 四、壓測前環境準備

由於對象是新開的伺服器，其本身並沒有 JMeter，因此需要先安裝遠端伺服器的環境 

若使用 terminus 順利連入 Host 後也會看到 bash 介面，如下圖

[https://i.imgur.com/JNXAHoh.png[/img]](https://i.imgur.com/JNXAHoh.png[/img])

- 下載 JMeter & JDK

```bash
# 下載 linux 版的 JDK tar 壓縮檔，筆者範例是21版的 JDK ( JMeter 的 Java 運行環境 )
wget https://download.oracle.com/java/21/latest/jdk-21_linux-x64_bin.tar.gz
# 下載 JMeter tar 壓縮檔，筆者範例是5.6.3版
wget [https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.tgz](https://dlcdn.apache.org//jmeter/binaries/apache-jmeter-5.6.3.tgz)
```

- 檢查 & 解壓縮剛才下載的壓縮檔

```bash
# 檢查目前位置底下是否有剛才下載的檔案
ls
```

XShell 畫面

![https://i.imgur.com/EO151yq.png](https://i.imgur.com/EO151yq.png)

```bash
# 解壓縮&安裝剛才下載的檔案
tar zxvf jdk-21_linux-x64_bin.tar.gz
tar zxvf apache-jmeter-5.6.3.tgz
```

- 設定環境變數

```bash
# 寫入 JAVA 環境變數於 .bashrc 檔，這邊以筆者 bruno 為例 (此環境變數會存在使用者環境下)
echo 'export JAVA_HOME=/home/bruno/jdk-21.0.3' >> ~/.bashrc
echo 'export PATH=$PATH:/home/bruno/jdk-21.0.3/bin' >> ~/.bashrc

# 使環境變數生效
source ~/.bashrc
```

- 與遠端伺服器同步 JMeter 腳本 & 插件配置 ( 此次同步插件是使用 parallel, plugin manager )

註 : plugins 通常放在 JMeter 資料夾下 lib/ext 的位置

Terminus ( 同樣選擇需要傳遞的 server 名，並將對應的 JMeter 資料夾結構、plugins )

[https://i.imgur.com/3eTnsSY.png[/img]](https://i.imgur.com/3eTnsSY.png[/img])

## 五、開始測試

### 5-1. 單體測試

- **5-1-1. OS 配置測試目標**
    - **在 cli 中配置測試參數說明 ( 使用 Vim編輯器 )**
    
    ```bash
    # vim 中的搜尋指令是 / 
    # 找到後要按 Enter，若有多組沒找到需求位置，按 n 繼續往下匹配關鍵字
    /[關鍵字] #ex: /remote_hosts
    # vim 中的修改指令是 i ，找到關鍵字後按 i 就可以開始編輯，待編輯完後按 Esc 跳出編輯模式
    # vim 中存取退出指令是 :wq
    # vim 中的不存取退出的指令是 :!q
    ```
    
    ```bash
    # 以 vim 修改範例
    vim [修改目標檔路徑 & 檔名]
    # 範例 vim apache-jmeter-5.6.3/bin/test_script/merchant.jmx
    ```
    
    [https://i.imgur.com/8ghO7YG.png[/img]](https://i.imgur.com/8ghO7YG.png[/img])
    
    **補充**: **也可以用指令的方式進行 Thread Group 中參數的替換**
    
    執行下指令技巧
    
    ```bash
    NOGUI執行壓測時
    可以用 -G參數名=值 的格式
    
    例如
    ./jmeter -n -t test_script/hao188/hao188.jmx -r -l test_script/hao188/result_hao188_20016_10min.jtl -e -o test_script/hao188/Result_hao188_20016_10min -Gthreads=834 -Gduration=60
    ```
    
    需閱讀: [https://stackoverflow.com/questions/40766412/how-to-disable-thread-groups-externally-in-jmeter](https://stackoverflow.com/questions/40766412/how-to-disable-thread-groups-externally-in-jmeter)
    
    [https://i.imgur.com/EDFl7QZ.jpeg[/img]](https://i.imgur.com/EDFl7QZ.jpeg[/img])
    
    - **具體需配置事項說明**
    
    每次壓力測試基本上都會設置該次壓測的參數配置 ( 通常是 RD 給予壓測人員 )，常用設定參數位置通常在兩部分:
    
    - Thread Group - 設置總負載、爬坡、測試總時長
    - HTTP Request Defaults: 設置等待 api 回應的最長時間
    
    以下以從 JMeter 的 GUI 畫面對應的位置進行介紹以方便讀者理解，記住這些配置位置基本上就可以使用 GUI 或是 CLI 等方式來配置對應測試參數
    
    **Thread Group**
    
    ![https://i.imgur.com/qmDUPVY.png](https://i.imgur.com/qmDUPVY.png)
    
    **HTTP Request Defaults**
    
    [https://i.imgur.com/OiZZpVY.png[/img]](https://i.imgur.com/OiZZpVY.png[/img])
    
- **5-1-2. 開始測試**
    
    執行測試腳本要在 JMeter 的 bin 資料夾下
    
    ```bash
    cd apache-jmeter-5.6.3/bin
    
    # 運行腳本&輸出測試結果的jtl檔於指定位置 
    ./jmeter -n -t [jmx腳本路徑] -l [jtl壓測結果路徑]
    # 範例 ./jmeter -n -t test_script/merchant.jmx -l test_script/merchant/result.jtl
    ./jmeter -n -t test_script/cw_frontstage.jmx -l test_script/result.jtl
    
    # 運行腳本&輸出測試結果的jtl檔於指定位置 
    ./jmeter -n -t [jmx腳本路徑] -l [jtl壓測結果路徑&自訂檔名]
    # 範例 ./jmeter -n -t test_script/merchant.jmx -l test_script/merchant/result.jtl 
    
    # 運行腳本&輸出測試結果的jtl檔於指定位置 &輸出測試結果的HTML檔於指定位置 
    ./jmeter -n -t [jmx腳本路徑] -l [jtl壓測結果路徑&自訂檔名] -e -o  [html壓測結果路徑&自訂檔名]
    # 範例 ./jmeter -n -t test_script/cw_frontstage.jmx -l test_script/cw/result.jtl -e -o test_script/cw_report/Result
    
    # 不運行腳本，單純將 JML 檔轉換成 HTML 測試結果
    ./jmeter –g [jtl壓測結果路徑] -o [html壓測結果路徑&自訂檔名] 
    ```
    
    註: ./jmeter 代表在當前目錄下執行 名為 此執行指令同等於 “jmeter.bat(Windows)/jmeter.sh(Linux)” 也就是 jmeter 的執行腳本，他會自動調用 jmeter.bat(Windows)/jmeter.sh(Linux) 
    

### 5-2. 分佈式測試

- [jmeter 官網](https://jmeter.apache.org/usermanual/remote-test.html)
- **5-2-1. OS 配置**
    
    分佈式測試時， master 與 slaver 都需要安裝 JMeter 的環境 ( 有用到的 plugins 也要相同，若對 JMeter 以 cli 方式進行環境安裝不熟悉可以參考第四章節 )，而測試使用的測資對應、檔案結構在master 與 slaver 都要有，但與單體測試的配置不同點有三: 
    
    1. 只有 Master 需要放測試腳本 (JMX) 而 slaver 中不需要 ( 因為 slaver 的測試會由  master 分配，且 master 會接收由 slaver 測試後的結果 )
    2. Master  內不用放測試資料，但 Slavers 要，且若有多個 Slavers 其測試資料要分開 ( ex: 若目前有 3個 Slavers，總共有 1000 筆 users 的資料，要模擬 999 位 users 的負載測試，則 1000 筆 user 資料要拆成每個 slavers 333 筆，並且不能重複  )
    3. 配置與測試指令不同
    
    在 Master 與 Slaver 伺服器上也需要做對應的配置使其兩者能夠順利地溝通，以下就會以這些配置逐一展開說明
    
    - **JMeter 中添加所有 slaver 的 IP ( master )**
        - 在 Master server 中找到在安裝時安裝的 JMeter 資料夾位置，以筆者來說 JMeter 的資料夾檔名是  apache-jmeter-5.6.3
        - 在 JMeter  內的 bin 資料夾下，可以找到 jmeter.properties 此檔，使用 vim 開啟其進行編輯
        
        ```bash
        # 假設已在 jemter 內的 bin 資料夾的位置
        vim jmeter.properties
        ```
        
        - 找到關鍵字 remote_hosts 後，在  remote_hosts 等號後移除預設值，輸入 slaver 的**內網 IP**，若有多組 slaver IP 時，彼此間用逗號隔開，如下圖所示
            
            ![https://i.imgur.com/PSNQYMY.png](https://i.imgur.com/PSNQYMY.png)
            
            注意: 若在這邊輸入的是 slaver 的外網 IP 則會出現 master 無法順利匹配 slaver  的錯誤，如下圖片所示
            
            ![https://i.imgur.com/kpKRdAK.png](https://i.imgur.com/kpKRdAK.png)
            
    
    - **解決 SSL 憑證問題 ( master , slaver )**
        - 在 JMeter  內的 bin 資料夾下，可以找到 jmeter.properties 此檔，使用 vim 開啟其進行編輯
        - 找到關鍵字 server.rmi.ssl.disable  此關鍵字後，解開註解，並將值改成 true
        
        ![https://i.imgur.com/j4hlvFg.png](https://i.imgur.com/j4hlvFg.png)
        
    
    - **配置壓測時可使用的記憶體 ( master , slaver )**
        - 配置前可用 htop 指令，查看在該 server 下的記憶體容量
            
            ```bash
            #查看系統硬體配置與情況
            htop
            ```
            
            ![https://i.imgur.com/xFptJ5U.png](https://i.imgur.com/xFptJ5U.png)
            
        - 在 JMeter  內的 bin 資料夾下，可以找到 **jmeter** 此檔(無附檔名)，使用 vim 開啟其進行編輯
        - 找到以下文字 & 調整如下
            
            ```bash
            # Xms(代表最小) Xmx(最大)
            ${HEAP:="-Xms1g -Xmx1g -XX:MaxMetaspaceSize=256m"}
            
            #若以伺服器 8Gram 為例若在中建議 Xmx 可配到 6g，若以上的內存以等比例調整
            #但在 master 中由於有時 master 有被配置多台 slavers 可能不能分配那麼多則建議視情況調整
            ${HEAP:="-Xms1g -Xmx6g -XX:MaxMetaspaceSize=256m"}
            ```
            
    
    - **若伺服器有多網卡(可以使用不同的內網 IP 地址) 的情況下，需要設定自身測試所使用的內網 IP 地址  ( master , slaver )**
        - 在 JMeter  內的 bin 資料夾下，可以找到 system.properties 此檔，自行在最後一行加入自己的內網IP，一樣使用 vim 開啟其進行編輯
        
        ```bash
        java.rmi.server.hostname=[指定該台server所要使用的內網IP地址]
        ```
        
        [https://i.imgur.com/rxZP6Uy.png[/img]](https://i.imgur.com/rxZP6Uy.png[/img])
        
    
- **5-2-2. 測試目標設置**
    
    此部分配置與單體測試相同，同樣可以使用 GUI 或 CLI 的方式來調整測試配置，詳細的可參照單體測試介紹，這邊簡略以圖示代替說明如下
    
    **Thread Group**
    
    ![https://i.imgur.com/qmDUPVY.png](https://i.imgur.com/qmDUPVY.png)
    
    **HTTP Request Defaults**
    
    [https://i.imgur.com/OiZZpVY.png[/img]](https://i.imgur.com/OiZZpVY.png[/img])
    
- **5-2-3.開始測試**
    
    **slaver 端**: 先執行  JMeter  內的 bin 資料夾下的 jmeter-server 檔
    
    ```bash
    cd apache-jmeter-5.2.1/bin
    ./jmeter-server
    ```
    
    **master 端**: 在各個 slever 端皆執行以上指令後，最後在 mater 端  JMeter  內的 bin 資料夾內輸入以下指令
    
    ```bash
    # 運行腳本&輸出測試結果的jtl檔於指定位置 
    # 與單體測試不同的點在於需要加 -r 代表 remote 的意思
    ./jmeter -n -t [jmx腳本路徑] -r -l [jtl壓測結果路徑&自訂檔名]
    # 範例 ./jmeter -n -t test_script/merchant.jmx -r -l test_script/merchant/result.jtl 
    
    # 運行腳本&輸出測試結果的jtl檔於指定位置 &輸出測試結果的HTML檔於指定位置 
    ./jmeter -n -t [jmx腳本路徑] -r -l [jtl壓測結果路徑&自訂檔名] -e -o  [html壓測結果路徑&自訂檔名]
    # 範例 ./jmeter -n -t test_script/cw_frontstage.jmx -r -l test_script/cw/result.jtl -e -o test_script/cw_report/Result
    
    # 不運行腳本，單純將 JML 檔轉換成 HTML 測試結果
    ./jmeter –g [jtl壓測結果路徑] -o [html壓測結果路徑&自訂檔_名]
    ./jmeter -g test_script/fintech_0516__1138/result.jtl -o test_script/fintechReport
    
    # 只運行腳本，單純將 JML 檔轉換成 HTML 測試結果
    ./jmeter -n -t [jmx腳本路徑]
    ```
    
    注意: 每輪測試完成，**slaver 端也記得要關掉 ( ctrl + c )**，否則其會繼續跑測試，且若 master 要跑下一輪測試，slaver 也需要重新啟動 ( ./jmeter-server )
    

### 5-3. 測試結果說明

**Summariser**

在使用 CLI 的情況下，JMeter 在

調整位置: JMeter 資料夾下 /bin/jmeter.properties

```bash
# 直接取消註解打開 
summariser.name=summary 
# 設定多久要刷新畫面 
summariser.interval=30 
# 啟用 Log 
summariser.log=true 
# 把訊息輸出至 stdout 
summariser.out=true 
```

當開始測試時，會產生如下的 summary 測試結果，這邊以圖示搭配說明標註如下

![https://i.imgur.com/EnL95Ls.png](https://i.imgur.com/EnL95Ls.png)

其他測試報告說明

```bash
cwOrderId: 1305
receiptPhoto: (binary)

${phone}
${password}
```

## 六、遠端效能監控

閱讀文章: [https://www.bugraptors.com/blog/can-measure-performance-server-using-jmeter](https://www.bugraptors.com/blog/can-measure-performance-server-using-jmeter)

補充: 可安裝不同版本 java jdk 的工具網站  [adoptium](https://adoptium.net/)

- 可用工具:
    - JMeter 插件 [PerMon](https://jmeter-plugins.org/wiki/PerfMon/) ( 從 JMeter plugins Mnager 安裝 ): 是  Servers Performance Monitoring 的簡稱，需搭配 [serverAgent ( perform-agent )](https://github.com/undera/perfmon-agent/blob/master/README.md) 進行對象server監控
    - 使用 [VisualVM](https://visualvm.github.io/) 從本地監控遠端，需要下載 VisualVM & 設定遠端 server 中的 JMeter 設定檔 & 設定本地 VisualVM
    - gravana 可以監控遠端 server 內部的各項數據 ex: Nerwork usages, System Load, TCP currentEstablished…, 以及其有各項插件，方便各種目的的調用

根據 [stackoverflow](https://stackoverflow.com/questions/40119635/profile-performance-of-jmeter-when-running-running-as-a-remote-server) 文章內的敘述，以 JMeter 的 plugin PerMon 所能監測到的內容 & 參數會較 VusualVM 更具體且詳細，所以後續研究以 JMeter  的插件做為主要探討對象

這邊參考 [PerMon 的官方文檔](https://jmeter-plugins.org/wiki/PerfMon/)以及相[關的教學文章](https://dog0416.blogspot.com/2019/08/jmeter-jmeter-plugin-servers.html)，搭配實際上的使用，歸結出以下教程

- **事前準備 & 須知:**
    - 由於是藉由 serverAgent 監控被測試 os，而 serverAgent 本身預設是以 port 4444 作為預設，所以若是被監測的對象是遠端 server ，則需要請 SRE 或是自行在該遠端 server 建立 port 4444 的對外連結
    - 另外 [serverAgent](https://github.com/undera/perfmon-agent) 本身是相依於 SIGAR 這很久沒被維護的套件，因此在運行上可能會遇到些問題，請參考 [Github issue](https://github.com/undera/perfmon-agent/issues) ，這邊已有些解法
    - [PerMon](https://jmeter-plugins.org/wiki/PerfMon/) 其本身算是 JMeter 的 Listener，其本身只有在**其存在的 Test plan 運行**時才會運作 & 紀錄數值
        - 注意: 也就是說若想在本地以 JMeter 的 GUI 監測遠端 server 內的 JMeter 的實時 server 狀態，**在本地的 JMeter 亦也需要一個可以持續運行的 JMeter 腳本** ( 可以不用使用一樣的腳本，假的腳本也可以，目的只是需要其持續運行 )，在遠端 server 運行 JMeter 時，本地有裝 PerMon 插件的腳本也需要同時運行才能紀錄的到
        - 推測: 其本身是 Listener 正常使用應是被放在需要被運行的腳本上所以才被如此設計，但由於其 Listener 本身是藉由 IP 進行監測，所以才可以與被監測的對象分開使用

\<圖片 & 參數介紹\>

[https://i.imgur.com/D1bw0yL.png[/img]](https://i.imgur.com/D1bw0yL.png[/img])

cli 研究

## 七、測試 Q &A

- **6-1. Q: 用 cli 跑 jmx 腳本，是否需要關掉監聽器 ( Listener ex: View Result Tree )?**
    
    A. 建議要關閉，雖部會出錯，但會影響到整體 CPU 效能
    
- **6-2. Q: 如何實現邏輯並行?**
    
    A1. 利用 jmeter-parallel ( 利用 jmeter-plugins-manager 或直接安裝 jar 檔 在 lib/ext 中 ) ，但 jmeter-parallel 只能放在單層，若有兩個以上在不同層的 jmeter-parallel 邏輯，則只有最外層的  jmeter-parallel 能夠正常運作
    
    A2. 可在同個 Test plan 下建立多個 Threads group，如此設定既可以定義不同組的變數環境，當在同個 Test plan 底下也可以同步運行不同的腳本
    
- **6-3. Q: 運用 cli 運行 JMeter 時，summary 的內容有限，無法知道當前是哪個 API 產生錯誤，內容為何? 只有在產生最後報告 ( ex: 產生 HTML 檔時 ) 查詢內容才得以知曉，無法即時得知**
    
    A: 由於每次測試依照之前我們給的指定都會在指定路徑下產生對應的 jtl 測試結果檔，直接開啟&閱讀該檔內容，就可以得知即時的 API 錯誤詳盡信息
    
- **6-4. Q:  若有圖片上傳等 API sample 如何在 JMeter 中模擬?**
    
    A. 可參考 [**JMeter模拟上传](https://help.aliyun.com/zh/pts/use-jmeter-to-simulate-uploads)** 教學，本地文件引用與腳本放在同一個資料夾內，路徑可直接用檔名
    
- **6-5. Q: 若希望每頁的最大頁數是隨機變數，若寫在 user defined variables 中ex: max_pages $\{__Ramdom(1,5)\} 函數，不管放在外層或是每個頁面(simple controller) 內各放一個，只要有用相同的 key，每次 Thread 只會使用第一個變數 Random 出來的值，後面所有頁面在同個 Thread 中都套用相同的值**
    
    A. 可用  BeanShell PreProcessor 替代 user defined variables  解決此問題，以確保同個 Thread 不同simple controller 中的同個 key value 會不同
    
    ```bash
    vars.put("max_pages", "${__Random(1,5)}");
    ```
    
- **6-6. Q: 在 summary 報告中的 TPS 會隨著時間的延長(10~20分間)，數量會遞減 ( Active thread 數量沒有變 )，觀察 network io 提升，與現行 SRE,Backend 討論可能原因如下**
    
    A1. 檢查 Master 的硬體 ( memory  ) K8 直接開 ( CPU 和內存 < 80%(一次性峰值可以忽略) )
    
    A2. 檢查 DB 的硬體
    
    A3. 檢查 DB 的語法調用 (在常用的欄位上再上索引)
    
    A4. 最後找到是分散式與 Slave 的溝通方式 ( Master 與 Slavers 間的 IO 問題 )
    
    A5. 使用  [PerMon](https://jmeter-plugins.org/wiki/PerfMon/) 監測發現 master 與 slave 間的 network io 會隨時間延長而提升，甚至在 ramp up  到尖峰後，後續仍持續往上提升直至遇到硬體瓶頸，查詢 JMeter 官方 remote test 文章 sample test send 的章節中，調整 master/slave 的 jmeter.properties ( mode=Stripped, mode=standard ) 可以看到其會影響 network io 的增幅度，但基本上 network io 仍是不明原因而持續增幅，調整其雖可影響到達硬體瓶頸的時間長短，但基本整體仍會因為不明原因往上提升
    
    此問題筆者未解，所以後續改以單體執行後續測試 ( 若要繼續研究或許可以從  [statistical mode](https://www.apexon.com/blog/jmeter-mode-setting-helps-in-optimizing-the-load-generation/) 設置開始)
    
- **6-7. Q: 在測試時觀察，單體測試中其 Active 與 started / finished  的值不同，可能原因如下文章 ( 可能是 iteration 所致 )**
    
    [https://stackoverflow.com/questions/72266827/how-do-started-finished-threads-relate-to-virtual-users-in-jmeter](https://stackoverflow.com/questions/72266827/how-do-started-finished-threads-relate-to-virtual-users-in-jmeter)
    

## 八、指令補充 & 研究

### 8-1. JMeter 相關

在 bin 下 ，下./jmeter 執行命令，此同等為  jmeter.bat(Windows)/jmeter.sh(Linux) ，以下為對應的 options 指令

```bash
-h, --help
  打印使用訊息並退出
-v, --version
  打印版本訊息並退出
-p, --propfile <arg>
  要使用的JMeter屬性文件
-q, --addprop <arg>
  其他JMeter屬性文件
-t, --testfile <arg>
  要運行的JMeter測試(.jmx)文件
-l, --logfile <arg>
  結果寫入的日誌文件
-j, --jmeterlogconf <arg>
  JMeter日誌記錄配置文件(log4j2.xml)
-j, --jmeterlogfile <arg>
  JMeter運行日誌文件(jmeter.log)
-n, --nongui
  在非GUI模式下運行JMeter
-s, --server
  運行JMeter服務器
-H, --proxyHost <arg>
  設置JMeter使用的代理服務器
-P, --proxyPort <arg>
  設置代理服務器端口以供JMeter使用
-N, --nonProxyHosts <arg>
  設置非代理主機列表(例如.apache.org|localhost)
-u, --username <arg>
  設置JMeter使用的代理服務器的用戶名
-a, --password <arg>
  設置JMeter使用的代理服務器的密碼
-J, --jmeterproperty <arg>=<value>
  定義其他JMeter屬性
-G, --globalproperty <arg>=<value>
  定義全局屬性(發送到服務器)
  例如-Gport=123
--globalproperties <arg>
  定義全局屬性文件
-D, --systemproperty <arg>=<value>
  設置系統屬性
-S, --systemPropertyFile <arg>
  定義系統屬性文件
-f, --forceDeleteResultFile
  如果存在，強制刪除現有結果文件和Web報告文件夾
-L, --loglevel <arg>
  設置日誌級別，例如jorphan=INFO,jmeter.util=DEBUG或com.example.foo=WARN
-R, --runremote
  運行遠程服務器(在remote_hosts中定義)
-G, --remotestart <arg>
  開始這些遠程服務器，覆蓋remote_hosts
-d, --homedir <arg>
  選擇JMeter主目錄
-X, --remoteexit
  運行測試結束後退出遠程服務器(CLI模式)
-e, --reportonly <arg>
  運行測試結束後產生指定位址報告
-E, --reportatendofloadtests
  在測試結束時生成報告表格
-o, --reportoutputfolder <arg>
  報告儲存的輸出文件夾
```

執行下指令技巧

```bash
NOGUI執行壓測時
可以用 -G參數名=值 的格式

例如
./jmeter -n -t test_script/hao188/hao188.jmx -r -l test_script/hao188/result_hao188_20016_10min.jtl -e -o test_script/hao188/Result_hao188_20016_10min -Gthreads=834 -Gduration=60
```

需閱讀: [https://stackoverflow.com/questions/40766412/how-to-disable-thread-groups-externally-in-jmeter](https://stackoverflow.com/questions/40766412/how-to-disable-thread-groups-externally-in-jmeter)

[https://i.imgur.com/EDFl7QZ.jpeg[/img]](https://i.imgur.com/EDFl7QZ.jpeg[/img])