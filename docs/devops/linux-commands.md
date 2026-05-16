---
title: Linux指令初探
description: 來探索看看這一直聽過卻是有點陌生的 linux 領域吧～
tags: ['Linux']
date: 2023-09-10
type: doc
publish: true
---
# Linux指令初探

- Linux 指令列表: [https://www.mediacollege.com/linux/command/linux-command.html](https://www.mediacollege.com/linux/command/linux-command.html)
- [鳥哥私房菜](https://linux.vbird.org/linux_basic_train/centos8/unit02.php)
- tty ( teletypewriter ) 就是指終端機也是指命令提示字元

```jsx
ls // 可以看到目前位置下面的檔案
ls -l // 看詳細資料含權限
ls -la// 看隱藏詳細
ls -a // 看隱藏資料

ll // 是 ls -l 命令的別名，部分版本不支持 ll 的命令
ll -d //用於顯示當前目錄（或指定的目錄）本身的詳細信息(含權限)，但不顯示該目錄中的檔案和子目錄
ll -d .*  // 特殊情境，.* 只會顯示隱藏檔
ex1. ll /etc/ | grep 'passwd' // ll代表了列出文件與目錄，| 表示將前面的輸出結果接上 grap 進行模式搜尋
grep '關鍵字' 文件名 // 可以查詢文件中的關鍵字元，但 grep 只能查詢純文本文件不能搜尋二禁制文件
grep -nr 檔案名 // r 代表 recursive 遞迴的意思， n 則代表 number of line 也就是行號
grep -a 可以將 binary 轉 unicode
grep -Eo 正則查詢 E (Expression) -o 完整匹配
grep -i 忽略大小寫

//  查詢該檔案下所有文件，並列出行號
wget //後接檔案位址 取得某一位址的檔案，可以按右鍵複製檔案連結位置，再用 wget
ex: $ wget https://mercury.picoctf.net/static/704f877da185904ec3992e7255a15c6c/flag
cat // 後接檔案名，可以輸出/印出檔案內容
python 檔名.py --help // 若是執行檔，後面可加 --help 看其功能說明
// 下載的檔案執行
./warm // warm 是檔案名
chmod +x ./warm // chmod 是改變檔案的存取權限使用 +/- 來增減，x(execute)/w(write)/r(read)
// 擁有者/ 我的群組/ 其他人的群組
// 766 是怎麼算的，為何只新增自己要用 766
clear // 清理
nc //後接伺服器的連結 ( 伺服器上的程式 )
// nc (netcat) 是一個linux 上的工具，可以與遠端的伺服器溝通的工具 ( TCP, UDP 協定 )
curl // 是協議可以連結不同 url 也稱為 httpget，後續可以接命令來操作
curl -o 檔案 網址 // 欲下載的檔案與網址
// curl -o duck.jpg https://im2.book.com.tw/image/getImage?i=https://www.books.com.twhttps://static.coderbridge.com/img/techbridge/images/N00/040/56/N000405619.jpg&v=522ff1cf&w=348&h=348
curl -O 網址
// curl -O https://im2.book.com.tw/image/getImage?i=https://www.books.com.twhttps://static.coderbridge.com/img/techbridge/images/N00/040/56/N000405619.jpg&v=522ff1cf&w=348&h=348
-i, --include Include protocol response headers in the output 在 output 顯示 response 的 header
-I, --head Show document info only 大I在輸出內容有差異，最主要不會顯示網頁內容
unzip // 解壓縮檔案
cd / //到上一層目錄
cd ~ //到根目錄
mv //移動資料夾
| //管線 (pipe) 將前一個指令輸出的資料，交由後面的指令來處理，並不是所也有指令都支持管線串接的
ex: echo "scale=10; 4*a(1)" | bc -l 
// 1. 先執行『echo "scale=10; 4*a(1)"』，就可以發現從螢幕上輸出『 scale=10; 4*a(1) 』的字樣 (echo 這個指令很單純的將後續的資料當成文字訊息輸出到螢幕上)
// 2. 這些資料之後被帶入到 bc 指令中，亦即直接在 bc 的環境中進行 scale=10; 4*a(1)
find // 搜尋指定檔名
ex 1.: find . -name gtwang.txt // 在當前葉面下搜尋名為 gtwang.txt 的檔案
// 輸出為 /home/gtwang/gtwang/gtwang.txt
ex 2.: find /home -iname gtwang.txt // 這裡的 -iname 是指不分名稱大小寫
// 輸出為
// /home/gtwang/gtwang/GTWang.txt
// /home/gtwang/gtwang/GTWANG.TXT
// /home/gtwang/gtwang/gtwang.txt

exit // 登出系統
logout // 登出系統
ctrl+ D //// 登出系統
w // 查閱目前有多個用戶在系統上

rm 檔案名 // 刪除對應檔案
rm -rf // r 是 recursive 的意思代表以遞迴的方式刪除目錄; f 代表 force 強制的意思

mkdir //建立新目錄
rmdir // 刪除空目錄
touch // 建立新檔案

man // manual 詳細的指令說明
// [enter]：向文件後面移動一行
// [PageUp]/[PageDown]：向文件前/後移動一頁
// 方向鍵上/下：向文件前/後移動一行
// g：移動到整份文件的第一行
// G：移動到整份文件的最後一行
// q：離開 man page

man man //取得更詳盡的說明
man -f 關鍵字 // 左側要完整符合才會列出
man -k 關鍵字 // 只要有關鍵字就會列出來

pwd // 列出當下工作目錄
whoami // 可以看現在使用者身分

su -v // 轉換成 root 身份

```

### 相對路徑與絕對路徑

- **絕對路徑：由根目錄(/)開始寫起的檔名或目錄名稱， 例如 /home/student/.bashrc；**
- **相對路徑：相對於目前路徑的檔名寫法。 例如 ./home/student 或 ../../home/student/ 等等。開頭不是 / 就屬於相對路徑的寫法**

| 目錄名稱 | 目錄意義 |
| --- | --- |
| / | 根目錄，從根目錄寫起的檔名只會存在一個 |
| ~ | 使用者的家目錄，不同用戶的家目錄均不相同 |
| . | 一個小數點，代表的是『本目錄』，亦即目前的工作目錄之意 |
| .. | 兩個小數點，代表的是『上一層目錄』 |
| - | 一個減號，代表『上一次的工作目錄』之意 |

### 萬用字元

| 符號 | 意義 |
| --- | --- |
| * | 代表『 0 個到無窮多個』任意字元 |
| ? | 代表『一定有一個』任意字元 |
| [ ] | 同樣代表『一定有一個在括號內』的字元(非任意字元)。例如 [abcd] 代表『一定有一個字元， 可能是 a, b, c, d 這四個任何一個』 |
| [ - ] | 若有減號在中括號內時，代表『在編碼順序內的所有字元』。例如 [0-9] 代表 0 到 9 之間的所有數字，因為數字的語系編碼是連續的！ |
| [ ^ ] | 若中括號內的第一個字元為指數符號 (^) ，那表示『反向選擇』，例如 [^abc] 代表 一定有一個字元，只要是非 a, b, c 的其他字元就接受的意思。 |

```bash
# 搭配查詢
[student@localhost ~]$ ll /etc/cron*
[student@localhost ~]$ ll -d /etc/cron*
```

- curl 指令 [教學](https://blog.techbridge.cc/2019/02/01/linux-curl-command-tutorial/)1 [教學2](https://www.cjkuo.net/linux-curl-detail/)
- find 指令 [教學](https://blog.gtwang.org/linux/unix-linux-find-command-examples/)

### **CP 複製指令**

- 複製個別檔案用法 cp
    
    ```powershell
    cp source_file destination_directory/
    解釋一下這個命令：
    
    -  source_file：這是你要複製的源檔案的路徑和名稱。
    - destination_directory：這是目標資料夾的路徑，你可以在這個資料夾中創建一個新的檔案副本。
    例如，假設你有一個檔案 file.txt，並且想要將它複製到名為 backup 的目錄中，你可以執行以下命令
    
    cp file.txt backup/
    
    -  這將複製 file.txt 到 backup 目錄中，並在目標資料夾中創建一個名為 file.txt 的副本。如果目標資料夾不存在，cp 命令將自動創建它。
    ```
    
- 複製整個資料夾用法
    
    如果你想要複製資料夾內涵的所有檔案和子資料夾，你可以使用 **`-r`** 或 **`-R`** 選項來遞迴地複製整個資料夾結構。下面是一個示例：
    
    ```bash
    bashCopy code
    cp -r source_directory/ destination_directory/
    
    # 或是複製該資料夾的內容到目的地
    # 開始嘗試將 /etc 檔名複製到本目錄 (.) 底下
    [student@localhost backup]$ cp /etc .
    
    # 先理解複製連結檔需要注意的事項：
    [student@localhost ~]$ cd /dev/shm
    [student@localhost shm]$ cp -r /etc/init.d  .
    [student@localhost shm]$ ll
    lrwxrwxrwx. 1 student student 11  3月 10 09:12 init.d -> rc.d/init.d
    # 由於這個 /etc/init.d 連結到的是一個目錄檔，因此，當你複製時，若結尾沒有加上 / 的話，
    # 就會像這個案例一樣，你只是複製連結檔本身，而不是原本實際的資料。
    
    [student@localhost shm]$ rm init.d
    [student@localhost shm]$ cp -r /etc/init.d/  .   <==結尾一定要加上斜線 /
    [student@localhost shm]$ ll
    drwxr-xr-x. 2 student student 80  3月 10 09:13 init.d   <==這樣就複製過來了。
    
    # 查看使用 -r 複製時，兩個目錄間的差異：
    [student@localhost shm]$ ll init.d /etc/init.d/
    /etc/init.d/:
    總計 24
    -rw-r--r--. 1 root root 18440  8月 23  2019 functions
    -rw-r--r--. 1 root root  1161 11月  9 07:13 README
    
    init.d:
    總計 24
    -rw-r--r--. 1 student student 18440  3月 10 09:13 functions
    -rw-r--r--. 1 student student  1161  3月 10 09:13 README
    # 因為我們用一般帳號嘗試複製，所以權限不同還 OK。問題是，怎麼連檔案的時間也不同？
    
    # 測試 -a 複製時，嘗試複製權限的行為狀態：
    [student@localhost shm]$ cp -a /etc/init.d/ init.d2
    [student@localhost shm]$ ll init.d2
    -rw-r--r--. 1 student student 18440  8月 23  2019 functions
    -rw-r--r--. 1 student student  1161 11月  9 07:13 README
    # 看起來時間參數就跟原本的相同了
    # 這就是 -r 與 -a 的差異。因此，當系統備份時，還是建議使用 -a 的。
    ```
    
    解釋這個命令：
    
    - **`source_directory/`**：這是你要複製的源資料夾的路徑，包括其內涵的所有檔案和子資料夾。
    - **`destination_directory/`**：這是目標資料夾的路徑，你想要將整個源資料夾複製到這個目標資料夾中。
    
    例如，如果你有一個名為 **`my_folder`** 的資料夾，並且想要複製它以及它內涵的所有檔案和子資料夾到名為 **`backup`** 的目錄中，你可以執行以下命令：
    
    ```bash
    bashCopy code
    cp -r my_folder/ backup/
    ```
    
    這將遞迴地複製 **`my_folder`** 及其內涵到 **`backup`** 目錄中，包括所有檔案和子資料夾。如果目標資料夾不存在，**`cp`** 命令將自動創建它。
    
- bc 用法
    
    ```jsx
    
    ```
    
- **`nano` 是一個輕量級的文本編輯器，常用於終端中編輯文本文件**
    
    ```jsx
    nano myfile.txt
    ```
    
    1. **編輯文件**：
    一旦文件在 **`nano`** 中打開，你可以使用鍵盤進行編輯。簡單的文本編輯操作如下：
        - 使用箭頭鍵移動游標。
        - 鍵入或刪除文本。
        - 使用快捷鍵 **`Ctrl`** + **`O`**（按住 **`Ctrl`** 鍵，然後按 **`O`**）保存文件。
        - 使用快捷鍵 **`Ctrl`** + **`X`** 退出 **`nano`** 編輯器。
    2. **其他操作**：
        - 若要取消操作或退出而不保存更改，按 **`Ctrl`** + **`C`** 或 **`Ctrl`** + **`X`**，然後按 **`N`**。
        - 若要查找文本，按 **`Ctrl`** + **`W`**，然後輸入要查找的關鍵字，按 **`Enter`**。
        - 若要替換文本，按 **`Ctrl`** + **`W`**，然後按 **`Ctrl`** + **`R`**。
        - 若要顯示行號，按 **`Ctrl`** + **`C`**，然後按 **`L`**。
    3. **保存和退出**：
    若要保存文件，按 **`Ctrl`** + **`O`**，然後按 **`Enter`**。
    若要退出 **`nano`**，按 **`Ctrl`** + **`X`**。如果文件已更改，**`nano`** 會要求你保存更改。
    
    這些是 **`nano`** 編輯器的一些基本操作。它是一個簡單易用的文本編輯工具，非常適合在終端中進行快速的文本編輯工作。
    

- **bvi 介紹**
    
    **`bvi`** 是一個以十六進制方式編輯二進制文件的終端應用程序。它允許你以十六進制表示方式查看和編輯文件，特別適用於編輯二進制文件，如可執行文件、配置文件等。以下是 **`bvi`** 的基本用法和一些常見功能：
    
    1. **安裝 `bvi`**：
    如果尚未安裝 **`bvi`**，你需要使用你的系統包管理器來安裝它。例如，在基於 Debian 的系統上，你可以運行：
        
        ```arduino
        sudo apt-get install bvi
        ```
        
    2. **打開文件**：
    使用 **`bvi`** 打開一個文件，只需在終端中運行以下命令：
        
        ```
        bvi 文件名
        ```
        
        這會將文件以十六進制格式打開，讓你查看和編輯它。
        
    3. **基本移動和編輯**：
        - 使用箭頭鍵來移動光標。
        - 使用 **`i`** 進入插入模式，以便在文件中插入數據。
        - 使用 **`x`** 刪除光標下的字符。
        - 使用 **`:`** 進入命令模式，以執行一些特殊命令。
    4. **保存和退出**：
        - 在命令模式下，你可以使用 **`:w`** 保存文件。
        - 使用 **`:q`** 退出 **`bvi`**。
        - 使用 **`:wq`** 同時保存並退出。
    5. **其他常見命令**：
        - **`:b`**：切換到二進制編輯模式，以便編輯二進制數據。
        - **`:d`**：切換到十進制編輯模式。
        - **`:o`**：切換到八進制編輯模式。
        - **`:q!`**：強制退出 **`bvi`**，丟棄所有更改。
    6. **查找和替換**：
        - 使用 **`/`** 進入查找模式，查找特定的十六進制字符串。
        - 使用 **`n`** 在文件中查找下一個匹配項。
        - 使用 **`:%s/old/new/g`** 在文件中進行全局替換。
    7. **顯示格式**：
        - 使用 **`.`** 進行細粒度調整顯示格式，如顯示字節、字、或四個字節。
        - 使用 **`z`** 進行顯示縮放。
    
    **`bvi`** 是一個功能強大的工具，但它可能對非開發人員或不熟悉十六進制編碼的用戶來說可能有點複雜。請謹慎使用，特別是在編輯關鍵文件時。
    

- **Burp Suite**
    - 介紹: Burp Suite主要用於測試Web應用程序的安全性，包括發現和利用漏洞，以幫助開發人員和測試人員確保Web應用程序的安全性。它包括一系列工具，可以協助測試人員執行各種Web應用程序測試，包括滲透測試、代理攻擊、網站映射、威脅擴展等。
    - **Burp Suite的主要組件：**
    1. **Proxy（代理）**：Burp的代理工具允許你攔截和修改Web請求和響應。這對於測試和修改應用程序的輸入和輸出非常有用，以檢測安全漏洞。
    2. **Scanner（掃描器）**：Burp的漏洞掃描器可以自動檢測Web應用程序中的漏洞，包括SQL注入、跨站腳本（XSS）、CSRF、文件包含等。
    3. **Repeater（重複器）**：重複器工具允許你重新發送已攔截的請求，並修改它們以測試應用程序的不同方面，以發現漏洞。
    4. **Sequencer（序列器）**：序列器工具用於分析Web應用程序中的隨機數生成，以幫助發現可能的漏洞。
    5. **Intruder（入侵者）**：入侵者工具用於執行字典攻擊、暴力攻擊和其他類型的攻擊，以測試應用程序的安全性。
    6. **Spider（蜘蛛）**：蜘蛛工具用於自動探測和映射Web應用程序的所有頁面和功能。
    7. **Decoder（解碼器）和Comparer（比較器）**：這些工具用於解析和比較請求和響應中的數據，以查找潛在的安全問題。
    
    **使用方法：**
    使用Burp Suite進行Web應用程序測試需要一些專業知識和技能。以下是一些基本的使用步驟：
    
    1. **設置代理**：在Burp Suite中設置代理，以便攔截和修改Web請求和響應。
    2. **開始攔截**：啟動Burp的代理，然後在瀏覽器中設置代理配置以將流量路由到Burp。
    3. **攔截請求**：當你訪問Web應用程序時，Burp將攔截請求，並允許你查看和修改它們。
    4. **測試漏洞**：使用不同的Burp工具，如Scanner、Repeater、Intruder等，測試應用程序以發現漏洞。
    5. **報告**：Burp Suite允許你生成報告，以便將測試結果和發現的漏洞報告給開發人員或管理人員。

- 如何判定是 base64 加密過 ( [連結](https://www.zhihu.com/question/20304015) )
    
    base64 是基於使用 64個字元來表示二進位的表示方法，每6個位元組為一個單元，對應某個可列印的字元 ( 一般文字是 8 個位元組為一個單位 )，空白的六個 0 為 = 
    
    1. 標準的 base64 只有64個字母
    2. 把3個字元變成4個可以打印的字符，所以base64 編碼後的字串一定可以被4整除
    3. 等号一定用作后缀，且数目一定是0个、1个或2个。这是因为如果原文长度不能被3整除，base64要在后面添加\0凑齐3n位。为了正确还原，添加了几个\0就加上几个等号。显然添加等号的数目只能是0、1或2；

不超過128

shell script input 

print-f 可以轉

### **特殊檔名處理方式**

- **空白字元的檔名**
    
    一般可以使用單引號或雙引號或反斜線 (\) 來處理這樣的檔名。例如建立一個名為『 class one 』的檔名時，可以這樣做：
    
    ```bash
    [student@localhost ~]$ cd /dev/shm
    [student@localhost shm]$ mkdir "class one" #使用雙引號
    [student@localhost shm]$ ll
    drwxrwxr-x. 2 student student 40  3月 10 09:55 'class one'
    # 在有特殊檔名的狀態下，會主動的在檔名左右兩側加上單引號～不過，這只是顯示的狀態而已， 事實上，這個檔名其實是沒有單引號的喔！
    ```
    
- 刪除此空白字元檔案
    
    ```bash
    [student@localhost shm]$ rmdir class one
    rmdir: failed to remove ‘class’: 沒有此一檔案或目錄
    rmdir: failed to remove ‘one’: 沒有此一檔案或目錄
    
    [student@localhost shm]$ rmdir class\ one # 補上反斜線 \
    # 其實，使用『 rmdir cla[tab] 』就可以讓 bash 自動幫你將檔名補齊喔！
    ```
    
- 加號或減號開頭的檔名
    
    ```bash
    [student@localhost shm]$ mkdir -newdir
    mkdir: 不適用的選項 -- n
    Try 'mkdir --help' for more information.
    # 此時會回報錯誤，若嘗試使用單引號來處理時，同樣回報錯誤！使用反斜線，同樣回報錯誤。
    
    [student@localhost shm]$ mkdir /dev/shm/-newdir  <==這是絕對路徑檔名
    [student@localhost shm]$ mkdir ./-newdir2        <==這是相對路徑檔名
    [student@localhost shm]$ ll -d ./*new*
    drwxrwxr-x. 2 student student 40  3月 10 10:28 ./-newdir
    drwxrwxr-x. 2 student student 40  3月 10 10:28 ./-newdir2
    
    # 這樣就可以建立開頭為 + 或 - 的檔名。刪除同樣得要使用這樣的檔名撰寫方式來處理。
    ```
    

### **觀察隱藏檔或觀察檔案類型**

- 觀察隱藏檔
    
    ```bash
    # 預設情境，亦即不顯示隱藏檔
    [student@localhost shm]$ cd
    [student@localhost ~]$ ll
    drwx------. 2 student student   6  3月  1 15:35 Desktop
    drwx------. 2 student student   6  3月  1 15:35 Documents
    drwx------. 2 student student   6  3月  1 15:35 Downloads
    .......
    
    # 同時顯示隱藏檔與正常檔案
    [student@localhost ~]$ ll -a
    drwx------. 15 student student 4096  3月 10 10:15 .
    drwxr-xr-x.  3 root    root      21  3月  8 00:15 ..
    -rw-------.  1 student student 3415  3月  8 00:14 .bash_history
    -rw-r--r--.  1 student student   18 11月  9 00:21 .bash_logout
    -rw-r--r--.  1 student student  141 11月  9 00:21 .bash_profile
    .......
    
    # 特殊情境，只會顯示隱藏檔
    [student@localhost ~]$ ll -d .*
    
    #由於隱藏檔是檔名開頭為小數點的檔名，因此可以透過 -a 來查詢所有的檔案，或者是透過 .* 來找隱藏檔而已。 不過得要加上 -d 的選項才行，否則會連同一堆目錄內容也被抓出來，畫面就太亂了。
    ```
    
- 觀察檔案類型
    
    ```bash
    [student@localhost ~]$ ll /etc/passwd /usr/bin/passwd
    -rw-r--r--. 1 root root  2433  3月  8 00:15 /etc/passwd
    -rwsr-xr-x. 1 root root 34928  5月 11  2019 /usr/bin/passwd
    
    [student@localhost ~]$ file /etc/passwd /usr/bin/passwd
    /etc/passwd:     ASCII text
    /usr/bin/passwd: setuid ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), 
     dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, 
     BuildID[sha1]=4ba7de752293f0c8e4a3547285ea1952492eb9e4, stripped
    
    # 讀者即可知道這兩個檔案分別是文字檔 (ASCII text) 及執行檔 (ELF 64-bit LSB...)。
    ```
    

### **大量建制空白檔案的方式**

```bash
# 創建檔案目錄可以用 mkdir ，但若要創建檔案可以用 touch
 [student@localhost ~]$ cd /dev/shm
[student@localhost shm]$ mkdir testdir
[student@localhost shm]$ touch testfile
[student@localhost shm]$ ll -d test*
drwxrwxr-x. 2 student student 40  3月 10 11:03 testdir
-rw-rw-r--. 1 student student  0  3月 10 11:03 testfile

# 若要創建較多的檔名，可以用大括號處理
[student@localhost shm]$ touch test{1,2,3,4}
[student@localhost shm]$ ll -d test?
-rw-rw-r--. 1 student student 0  3月 10 11:03 test1
-rw-rw-r--. 1 student student 0  3月 10 11:03 test2
-rw-rw-r--. 1 student student 0  3月 10 11:03 test3
-rw-rw-r--. 1 student student 0  3月 10 11:03 test4

# 假設由 1 到 10 這組數字，雖然能使用 {1,2,3,4,5,6,7,8,9,10} 來處理，然而輸入太繁瑣。
# 此時可以使用 {1..10} 中間放 2 個點來取代上述的輸出。若需要輸出 01, 02 這樣的字樣 {01..10} 來處理。
```

### **查看檔案內容**

- cat：將檔案內容全部列出
- head：預設只列出檔案最前面 10 行
- tail：預設只列出檔案最後面 10 行
- 如果資料量較大
    - more 預設會一頁一頁向後翻動
        - /關鍵字：可以查詢關鍵字
        - 空白鍵：可以向下/向後翻頁
        - q：結束離開不再查詢文件
    - 而 less 則可以向前、向後翻頁
        - /關鍵字：可以查詢關鍵字
        - 空白鍵：可以向下/向後翻頁
        - [pageup]：可以向前/向上翻頁
        - [pagedown]：可以向下/向後翻頁
        - g：直接來到第一行
        - G：直接來到最後一行
        - q：結束離開不再查詢文件
    
    ```bash
    more /etc/services
    less /etc/services
    ```
    

### **VIM 操作**

- **一般指令模式 (command mode)**：使用『 `vim filename` 』進入 vim 之後，最先接觸到的模式。 在這個模式底下使用者可以進行**複製、刪除、貼上、移動游標、復原**等任務。
- **編輯模式 (edit mode)**：在上述模式底下輸入『 `i` 』這個按鈕，就可以進入編輯模式，終於可以開始打字編輯文件了。
- **延伸指令列命令模式 (extended command mode)**：這個模式可以進行儲存、離開、強制離開、**搜尋與取代**等動作。
- **選取模式 (vitual mode)**：這個模式可以進行類似滑鼠圈選的選取模式，主要分為三種圈選方式：圈選完畢後，可以按下 `**y` 複製、可以按下 `d` 刪除**，然後在其他地方可以按下 `p` **貼**上喔！
    - `v` ：**字元**方式**圈選**；
    - `[shift]`+`v` ：以**整行**方式**圈選**
    - `[ctrl]`+`v` ：以**區塊**方式**圈選**
- `:!` 可以強制關閉 vi/vim 編輯器，後面再接linux指令，可以直接執行
- `:wq` 存取後離開

```bash
# 假設讀者想要嘗試編輯 /etc/services 這個檔案，可以這樣嘗試處理看看：
# 使用『 cd /dev/shm 』將工作目錄移動到記憶體當中
cd /dev/shm
# 使用『 cp /etc/services . 』將檔案複製一份到本目錄下
cp /etc/services .
# 使用『 vim services 』開始查閱 services 的內容，並請回答：
vim services

# 當查詢後最底下一行顯示的『 "services" 11473L, 692241C 』是什麼意思？
# (Ans: 代表檔名、行數(Line)、字元數(Character))

```

**要離開時，記得關鍵字是 quit，此時請按下『 `:q` 』並且按下 Enter**

**要存取時，按下『 `:w` 』儲存，**

- 以下為常用的 vim 指令列表

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

### **Linux 權限說明**

- **Linux 與 window 不同之處是，Linux 只要是有執行權限就能執行，但 window 則主要是看檔案的副檔名** ( ex: .exe .com .bat )
- Linux 的檔案權限在設定上，主要依據三種身份來決定，包括：
    - user / owner / 檔案擁有者 / 使用者：就是檔案所屬人
    - group / 群組：這個檔案附屬於那一個群組團隊
    - others / 其他人：不是 user 也沒加入 group 的帳號，就是其他人。

### 檔案權限觀察 ( ls -l 或 ll 來查閱 )

```bash
[student@localhost ~]$ ls -ld /var/spool/mail
drwxrwxr-x. 2 root mail 32    2月 26 09:10 /var/spool/mail
[    A    ][B][C ] [D ] [E ]  [    F     ] [    G        ]
```

**A.**  檔案類型與權限，第 1 個字元為檔案類型，後續 9 個字元每 3 個一組，共分 3 組，為三種身份的權限；

- **檔案類型**
    - `-` : 代表後面的檔名為一般檔案
    - `d`: 代表後面的檔名為目錄檔 (d 開頭，為 directory 的縮寫)
    - `l`: 代表後面的檔名為連結檔 (有點類似 windows 的捷徑概念) ( link )
    - `b`: 代表後面的檔名為一個裝置檔，該裝置主要為區塊裝置，亦即儲存媒體的裝置較多
    - `c`: 代表後面的檔名為一個週邊裝置檔，例如滑鼠、鍵盤等
- **權限**
    - **`r`: read，可讀的意思**
    - **`w`: write，可寫入/編輯/修改的意思**
    - **`x`: executable，可以執行的意思**
- **三組權限說明**
    - **第一組 為檔案擁有者的權限**
        - 擁有者為 root，root 具有 rwx 的權限
    - **第二組 為檔案擁有群組的權限**
        - 群組設定為 mail，則所有加入 mail 這個群組的帳號可以具有 rwx 的權限
    - **第三組 為不是擁有者也沒有加入該群組的其他人權限**
        - 不是 root 也沒有加入 mail 的其他人 (例如 student 這個帳號) 具有 rx 的權限

**B.** 檔案連結數，這與檔案系統有關，讀者可暫時略過；

**C.** 該檔案的擁有者，本例當中，擁有者身份為 root

**D**. 該檔案的所屬群組，本例當中這個檔案屬於 mail 這個群組底下

**E.** 這個檔案的容量

**F.** 該檔案最後一次被修改/修訂的日期時間

**G.** 這個檔案的檔名。

![https://linux.vbird.org/linux_basic_train/centos8/unit04/permission.jpg](https://linux.vbird.org/linux_basic_train/centos8/unit04/permission.jpg)

圖: 使用者、群組與權限的相關性

- **三組權限說明**
    - 第一組為檔案擁有者的權限
    - 第二組為檔案擁有群組的權限
    - 第三組為不是擁有者也沒有加入該群組的其他人權限
- **範例說明**
    
    ```bash
    實際練習：需要了解帳號本身與檔案權限的應用關係！很重要喔！
    帳號的前提假設情況：假設有帳號資料如下：
    帳號名稱  加入的群組
    test1     test1, testgroup
    test2     test2, testgroup
    test3     test3, testgroup
    test4     test4
    檔案的狀態：如果有下面兩個檔案，請分別說明 test1, test2, test3, test4 針對底下兩個檔案的權限各為何？
    -rw-r--r--  1 root     root          238 Jun 18 17:22 test.txt 
    -rwxr-xr--  1 test1    testgroup    5238 Jun 19 10:25 ping_tsai
    關於 test.txt 檔案權限與帳號間的關係：
    test.txt 為一般檔案 (-)，擁有者為 root，所屬群組為 root。
    權限方面，只有root這個帳號可以存取此檔案，其他人則僅能讀此檔案。
    由於 test1, test2, test3, test4 既不是 root 本人，也沒有加入 root 群組，因此四個人針對這個 test.txt 的檔案來說，都屬於其他人， 僅有可讀 (r) 的權限。
    關於 ping_tsai 檔案權限與帳號間的關係：
    ping_tsai 為一般檔案 (-)，擁有者為 test1，而所屬群組為 testgroup。
    權限方面，test1 本人具有可讀可寫可執行，加入 testgroup 的用戶可讀可執行，其他非 testgroup 帳號成員的其他人，僅具有唯讀
    test1 就是這個 ping_tsai 的擁有者，因此具有可讀、可寫、可執行的權力(rwx)
    test2 與 test3 都不是 test1，但是兩個都有加入 testgroup 群組，因此 test2 與 test3 參考的權限為群組權限，亦即可讀與可執行 (rx)，但不可修改 (沒有 w 的權限)
    test4 不是 test1 也沒有加入 testgroup 群組，因此 test4 參考其他人的權限，亦即可讀 (r)
    ```
    

### **觀察帳號與權限的相關指令**

- `**id**` 指令: 查詢帳號與權限
    - 可以了解到這個 id 所在的群組
    
    ```bash
    [student@localhost ~]$ id
    uid=1000(student) gid=1000(student) groups=1000(student) context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023
    [student@localhost ~]$ id student
    uid=1000(student) gid=1000(student) groups=1000(student)
    # 可以加上帳號在 id 後面喔！若是自己本身，則會列出 selinux 相關的資料！
    
    # gid 為所謂的『原生群組 (primary group)』
    # groups 則是所有支援的群組。
    
    ```
    
- 查詢檔案類型 ( 使用 `file` 與 `ls -l` 查看不同檔名的檔案類型 )
    - `ls -l` ( 同等於 `ll` )
        
        ```bash
        [student@localhost ~]$ ll /etc/init.d /etc/passwd /dev/vda /dev/zero
        brw-rw----. 1 root disk 252, 0  3月  9 16:21 /dev/vda
        crw-rw-rw-. 1 root root   1, 5  3月  9 16:21 /dev/zero
        lrwxrwxrwx. 1 root root     11  5月 11  2019 /etc/init.d -> rc.d/init.d
        -rw-r--r--. 1 root root   2433  3月  8 00:15 /etc/passwd
        
        # 前面第一個字元判斷， /dev/vda 為區塊裝置檔案、 /dev/zero 為週邊裝置檔案、 /etc/init.d 為連結檔案、/etc/passwd 為一般檔案。
        ```
        
    - 使用 `file` 查詢一下上述的檔名類型：
        
        ```bash
        [student@localhost ~]$ file /etc/init.d /etc/passwd /dev/vda /dev/zero
        /etc/init.d: symbolic link to rc.d/init.d
        /etc/passwd: ASCII text
        /dev/vda:    block special (252/0)
        /dev/zero:   character special (1/5)
        ```
        
    - `getfacl`  查詢檔案的相關屬性與權限
        
        ```bash
        [student@localhost ~]$ getfacl /var/spool/mail
        getfacl: Removing leading '/' from absolute path names
        # file: var/spool/mail   <==檔名
        # owner: root            <==檔案擁有者
        # group: mail            <==檔案群組
        user::rwx                <==使用者的權限
        group::rwx               <==同群組帳號的權限
        other::r-x               <==其他人的權限
        ```
        

### **檔案屬性與屬性修改方式**

- 以 `ls -l` ( `ll` ) 的輸出來說，修改的指令對照如下
    
    ```bash
    [student@localhost ~]$ cd /dev/shm/
    [student@localhost shm]$ touch checking
    [student@localhost shm]$ ls -l checking
    -rw-rw-r--. 1 student student 0  3月 14 21:45 checking
     [ chmod ]    [chown] [chgrp]    [   touch  ] [  mv  ]
    ```
    
- 不同身分能改的項目不同
    - **一般帳號** 僅能修改**自己**檔案的 **檔名**、**時間**與**權限**
    - root 可以改全部
- 切換成 root 權限 `su -`
    
    ```bash
    [student@localhost shm]$ su -
    password:
    [root@localhost ~] cd /dev/shm
    [root@localhost shm] ll checking
    -rw-rw-r--. 1 student student 0 Mar 14 21:45 checking
    
    # su - 切換成 root 權限
    ```
    
- 使用 `chown` 修改檔案**擁有者**
    
    ```bash
    # 查詢系統中是否有名為 daemon 的帳號，如果存在該帳號
    # 請將 checking 此檔案的使用者改為 daemon 所擁有
    [root@localhost shm] id daemon # 先查詢看系統是否有 daemon 這帳號
    uid=2(daemon) gid=2(daemon) groups=2(daemon)
    
    [root@localhost shm] chown daemon checking # chown 新的所有人 檔案名稱
    [root@localhost shm] ll checking
    -rw-rw-r--. 1 daemon student 0 Mar 14 21:45 checking # checking 檔擁有人已改變
    ```
    
- 使用 `chgrp` 修改檔案**擁有者的群組**
    
    ```bash
    # 系統的群組都紀錄在 /etc/group 檔案內
    # 若想要了解系統是否存在某個群組，可以使用 grep 這個關鍵字擷取指令來查詢。
    # grep 查詢群組名 /etc/group
    
    [root@localhost shm]# grep myname /etc/group
    # 不會出現任何資訊，因為沒有這個群組存在的意思。
    
    [root@localhost shm]# grep bin /etc/group
    bin:x:1:        <==代表確實有這個群組存在！
    
    [root@localhost shm]# chgrp bin checking #更改檔案所有者群組
    [root@localhost shm]# ll checking
    -rw-rw-r--. 1 daemon bin 0 Mar 14 21:45 checking
    ```
    
- 使用 `chmod` 搭配數字法修改權限
    - 可修改檔案/目錄權限
    - 使用 2 進位方式定義每種權限的數字
        - **r ==> read    ==> 2^2 ==> 4**
            - 檔案: 可以讀取該檔案
            - 目錄: 可以用 ls 看到該檔案底下的檔名資料
        - **w ==> write   ==> 2^1 ==> 2**
            - 檔案: 寫入/新增/編輯/修改，但不包含刪除
            - 目錄: 代表有異動該目錄&結構的權限，包含:
                - 建立新的檔案/目錄
                - 刪除已經存在的檔案/目錄 (且不論該檔案的權限為何)
                - 將已存在的檔案或目錄更名
                - 搬移該目錄內的檔案、目錄位置
        - **x ==> eXecute ==> 2^0 ==> 1**
            - 檔案: 是否可以執行該檔案的權限
            - 目錄: 目錄不能拿來被執行，目錄的 x 代表使用者是否能將該目錄作為自己的工作目錄，而所謂的工作目錄可經由 cd ( change directory ) 進行轉換 ( 所以對目錄來說就是: **進入該目錄的權限** )
        - 注意: 目錄權限設定，要開放目錄給任何人瀏覽時，**應該至少也要給予r及x的權限，但w權限不可隨便給**
        
        所以每種身分最低是 0 分，最高是 r+w+x 4+2+1 = 7
        
        所以依照 所有人/群組/其他人 設定 最高是 777 最低是 000
        
        ```bash
        # 以上述 checking (-rw-rw-r--)的分數來說，
        # 使用者為 rw=6, 群組為 rw=6，其他人為 r=4，亦即該檔案權限為 664。
        
        # 實際練習：讓 daemon 可讀、可寫、可執行 checking，讓加入 bin 群組的用戶可唯讀該檔案，讓其他人沒有權限！
        # 先分析應該完成的權限設計，基本上，應該會是『rwxr-----』，因為：
        # daemon 為使用者，可讀可寫可執行則為 rwx = 7
        # 加入 bin 的群組為唯讀，亦即為 r-- = 4
        # 其他人沒權限，因此為 --- = 0
        # 最終可以使用『 chmod 740 checking 』修改權限
        [root@localhost shm]# chmod 740 checking
        [root@localhost shm]# ll checking
        -rwxr-----. 1 daemon bin 0 Mar 14 21:45 checking
        ```
        
- 使用 `chmod` 搭配符號法修改權限
    - 讀者也能夠透過直觀的方式來進行權限的設定，亦即使用 `u`,`g`,`o` 代表使用者、群組與其他人( 還有一個 `a` 代表全部含蓋前三者的身份 )， 然後使用 `+`, `-`, `=` 來加入/減少/直接設定權限
        - `u` user
        - `g` group
        - `o` other
        - `a` all
        
        ```bash
        # 注意: 這邊u=rwx,g=rw,o=r 不同身份間的設定中間沒有空格也不能有空格
        [root@localhost shm]# chmod u=rwx,g=rw,o=r checking
        [root@localhost shm]# ll checking
        -rwxrw-r--. 1 daemon bin 0 Mar 14 21:45 checking
        
        # 同時設定兩種身份
        [root@localhost shm]# chmod u=rwx,go=r checking
        
        # 若想要在所有人中加入寫入 checking 的權限
        [root@localhost shm]# chmod a+w checking
        -rwxrw-rw-. 1 daemon bin 0 Mar 14 21:45 checking
        # 將所有人的執行權限都去掉 
        [root@localhost shm]# chmod a-x checking
        -rw-rw-rw-. 1 daemon bin 0 Mar 14 21:45 checking
        ```
        
    
- 其他屬性修改
    - 若要修改
        - `touch` 時間參數/創建新檔
            
            ```bash
            [root@localhost shm]# touch -t 01051200 checking
            # -t 代表要改的是時間戳記
            ```
            
        - `mv` 更改檔名或移動目錄
            
            ```bash
            # 將檔案從一個目錄移動到另一個目錄：
            # 這個命令將 file.txt 這個檔案移動到 /path/to/destination/ 目錄中。
            mv file.txt /path/to/destination/
            
            # 將檔案重新命名： 這個命令將 oldfile.txt 這個檔案重新命名為 newfile.txt。
            mv oldfile.txt newfile.txt
            
            # 將目錄重新命名：這個命令將 olddir 目錄重新命名為 newdir。
            mv olddir/ newdir/
            
            # 移動並重新命名檔案或目錄：
            # 這個命令將 oldfile.txt 移動到 /path/to/destination/ 目錄並同時重新命名為 newfile.txt。
            mv oldfile.txt /path/to/destination/newfile.txt
            ```
            
- **簡易帳號管理**
    - 要管理帳號其權限必須是 root
    
    ```bash
    # 使用 useradd 新增使用者帳號
    # 使用 passwd 新增使用者密碼
    
    [root@localhost ~]# useradd  myuser1
    [root@localhost ~]# passwd  myuser1
    Changing password for user myuser1.
    New password:          <==此處輸入密碼
    BAD PASSWORD: The password fails the dictionary check - it is based on a dictionary word
    Retype new password:   <==再輸入密碼一次
    passwd: all authentication tokens updated successfully.
    
    # id 指令 查看權限
    [root@localhost ~]# id myuser1
    uid=1014(myuser1) gid=1015(myuser1) groups=1015(myuser1)
    ```
    
    - 指令 `passwd` 注意點
        - 單純輸入 `passwd` 是修改自己的密碼 ( 因此要特別注意第一行是哪一個帳號 )
        - 若出現 `New` 的關鍵字則代表輸入新的密碼， `Retype` 出現時則表示剛剛輸入的密碼是可以被接受的
    - 建立群組
    
    ```bash
    [root@localhost ~]# groupadd progroup
    [root@localhost ~]# grep progroup /etc/group
    progroup:x:1001:    <==確定有 progroup 在設定檔當中了
    
    [root@localhost ~]# useradd -G progroup prouser1
    [root@localhost ~]# useradd -G progroup prouser2
    [root@localhost ~]# useradd -G progroup prouser3
    [root@localhost ~]# id prouser1
    uid=1001(prouser1) gid=1002(prouser1) groups=1002(prouser1),1001(progroup)
    
    [root@localhost ~]# echo mypassword
    mypassword    <== echo 會將訊息從螢幕上輸出
    
    [root@localhost ~]# echo mypassword | passwd --stdin prouser1
    Changing password for user prouser1.
    passwd: all authentication tokens updated successfully.
    [root@localhost ~]# echo mypassword | passwd --stdin prouser2
    [root@localhost ~]# echo mypassword | passwd --stdin prouser3
    # 使用 passwd --stdin 的方式來給予密碼時，密碼會紀錄到螢幕與 history 的環境中
    # 因此不見得適用於所有需要資安的系統中
    
    # 如果建立好帳號之後才想到要修改群組資源時，不需要刪除帳號再重建
    # 可以透過 usermod 來進行修改。舉例來說，當 prouser1 還需要加入 student 群組時， 可以使用 usermod -G 的方式來處理！不過需要留意到 -a 的選項才行。
    [root@localhost ~]# usermod -G student prouser1
    ＃ 使用 usermod -G student prouser1 將 prouser1 加入 student 群組的支援，並觀察次要群組支援的狀態
    ```
    

### **Linux 內檔案的種類**

查看檔案類型 可用 `ll` 或是 `ls -l`，第一個字元為檔案類型

- **正規檔案 ( regular file )** 字元呈現 `-` ex: rwxrwxrwx
    - **純文字檔 ( ASCII )**: 純文字檔的內容我們人類可以直接讀到，基本上可以用來做**設定檔**的都屬於這類型的檔案，可以下達 `cat` 直接來讀取檔案
    - **二進位檔 ( binary )**: 一般 Linux 內的**執行檔**都是這種格式，舉例來說 cat 就是一個 binary file
    - **資料格式檔( data )**: 是指程式運行時，有時會讀取的某些特定格式的檔案。 ex: Linux 在使用者等入時，都會在 /var/;og/wtmp 這個檔案紀錄，讀取這檔案無法直接用 cat讀出 ( 會出現亂碼 ) 需要搭配特殊指令 `last` 讀取
- **目錄 ( directory )** 字元呈現 `d` ex: drwxrwxrwx
- **連結檔 ( link )** 字元呈現 `l` ex: lrwxrwxrwx
    - 就是捷徑啦
- **設備與裝置檔 ( device )** 字元呈現 `b` / `c`
    
    與系統周邊或是存取的相關檔案通常都會放在 /dev 這個目錄下面，通常會分為兩種:
    
    - **區塊( block )設備檔**: 例如軟硬碟等提供系統隨機存取的資料，使用者可以在硬碟的不同區塊讀寫，這類型的裝置就是區塊裝置，可以用 `/dev/sda` 查看，通常是以字元 `b` 表示
    - 
- **資料接口檔( socket )** 字元呈現 `s`
    
    這類型的檔案通常被用在**網路上資料的承接**，我們考以啟用監聽 socket 來與**用戶端進行資料的溝通**，最常在 `/run` 或 `/tmp` 這些目錄看到這類型的檔案
    
- **資料輸送檔 ( FIFO, pipe )**: 字元呈現 `p`
    
    FIFO ( first-in-first-out )，是一種特殊的檔案類型，主要目的是解決多個程序同時存取同一個檔案所造成的問題
    

### **Linux 內檔案的副檔名**

雖說 **Linux 與 window 不同之處是，Linux 只要是有執行權限就能執行，但 window 則主要是看檔案的副檔名** ( ex: .exe .com .bat )，但能被執行與能否執行成功不同

- `.sh` : **腳本或批次檔(script)**，因為批次檔是使用 shell 寫的，所以附檔名就是 `.sh` 囉
- `*Z`, `*.tar`, `*.tar.gz`, `*.zip`, `*.tgz` : 經過打包的壓縮檔，因為不同的壓縮軟體，所以附檔名會有差異，例如 gunzip, tar…etc.
- `.html`, `*.php`：網頁相關檔案，分別代表 HTML 語法與 PHP 語法的網頁檔案囉

### **Linux 目錄配置的依據 — FHS ( Filesystem Hierarchy Standard )**

FHS Linux 內目錄配置的標準，**主要目標是希望讓使用者可以了解到以安裝的軟體通常放置於哪個目錄底下**

- 注意: 目前 FHS 是持續變動與改版的，目前可大致將目錄定義為以下四種交互型態

|  | 可分享的 ( shareable ) | 不可分享的 ( unshareable ) |
| --- | --- | --- |
| 不變的 ( static ) | /usr ( 軟體放置處 ) | /etc ( 設定檔 ) |
|  | /opt ( 第三方協力軟體 ) | /boot ( 開機與核心檔 ) |
| 可變動的 ( variable ) | /var/mail ( 使用者信箱郵件 ) | /var/run ( 程序相關 ) |
|  | /var/spool/news ( 新聞群組 ) | /var/lock ( 程序相關 ) |
- 四種類型 說明 & 介紹
    - **可分享的**: 可以分享給**其他系統掛載使用的目錄**，包含**執行檔**、**使用者郵件**等資料，能夠分享給網路上其他主機掛載使用
    - **不可分享的**: 自己系統上運作的**裝置檔**或是**與程式有關的 socket** 檔案等，**僅與自身機器運作有關**，故不適合分享
    - **不變的:** 有些資料很少變動，例如 函式庫、文件說明檔、系統管理員所管理的主機服務設定檔
    - **可變動的:** 經常改變的資料，例如 登入檔、一般用戶可以自行收受的新聞群組
- 但 **FHS** 指定義出以下**三層**目錄底下該放置甚麼資料而已，而其中每個目錄底下所要放置的目錄也都有特別的規定
    - `/` **root/根目錄**: 與開機系統有關;
    - `/usr` **unix software resource** : 與軟體**安裝/執行**有關;
    - `/var` **variable**: 與**系統運作**過程有關

注意: root 在 Linux 底下有許多種意義，

- 帳號角度: 系統管理員
- 目錄角度: 根目錄

### **根目錄 ( / )的意義與內容**

- **特點:**
    - 整個系統中最重要的目錄，**也是所有目錄的起點**
    - **開機/還原/系統修復** 有關: 由於系統開機需要特定的開機軟體、核心檔案、開機所需要的程式、函式庫等資料，還有若系統出現錯誤時所需要的修復檔
- **FHS 建議:**
    - **根目錄應越小越好** (  因為分割巢空間越大通常表示資料越多，也代表越容易出現錯誤 )
    - **應用程式所安裝的軟體不要與根目錄在同一個分割槽內**
    
    為了達到上述兩點目的，FHS 建議，要定義出根目錄(/) 底下的次目錄，就算沒有實體檔，至少還有連結的好
    
    | 目錄 | 應放置檔案的內容 |
    | --- | --- |
    |  | Part I : FHS 要求必須存在的目錄 |
    | /bin | 系統放置執行檔的目錄之一，但 /bin 只放置在單人維護模式下還能被操作的指令。在 /bin 底下的指令可以被 root/一般帳號 所使用
    ex: cat, chmod, chown, date, mv, mkdir, cp, bash …etc. |
    | /boot | 放置與系統開機有使用到的檔案，包括 Linux 核心檔案以及開機選單和開機所需的設定檔
    Linux kernel 常用的檔名: vmlinuz
    如果是用 grub2 管理開機，則還會有 /boot/grub2/這目錄 |
    | /dev | 在 Linux 系統上，任何裝置與周邊設備都是以檔案的型態存在於這目錄中，也就等於透過存取這目錄底下的某個檔案就是存取某個裝置囉~
    ex: /dev/null, /dev/zero/, /dev/tty/, /dev/loop*. /dev/sd* …etc. |
    | /etc | 系統主要 設定檔 存放處，FHS 建議不要在此目錄下放指執行檔 ( binary )
    ex: 人員的帳號密碼檔、各種服務起始檔
    一般來說，這個目錄底下是允許一般使用者查閱的，只有 root 才有權利修改
    FHS 規範以下幾個目錄要存在 /etc/目錄下
    1. 必較重要的檔案名稱: /etc/modprobe.d/, /etc/passwd, /etc/fstab,  /etc/issue
    2. /etc/opt ( 比要 ): 放置第三方協力軟體/opt相關設定檔
    3. /etc/x11/ ( 建議 ): 與 x sindow 有關的設定檔 ex: xorg.conf、X server 的設定檔
    4. /etc/sgml/ ( 建議 ): 與 SGML 格式有關的各項設定檔
    5. /etc/xml/ ( 建議 ): 與 XML 格式有關的各項設定檔 |
    | /lib | /lib 放置的是
    1. 系統開機時會用到的函式庫
    2. 在 /bin 或 /sbin 指令會呼叫的函式庫
    函式庫可以想像成外掛，系統需要這些外掛才能完成開機
    FHS 要求 /lib/modules/: 這個目錄下放置可抽換式的核心相關模組(驅動程式) |
    | /media | media 檔下所放置的就是可以移除的裝置 ex: 光碟、DVD 等掛載位置
    常見的檔名: /media/floppy ( 磁碟片 ), /media/cdrom ( CD 片 ) |
    | /mnt | 暫時掛載額外裝置所用 ( 以前功能與 media 相同，現在只用來掛載暫時的裝置 ) |
    | /opt | 第三方協力軟體的放置處 ex: KDE 桌面管理系統 |
    | /run | 放置在開機後系統所產生的各項資訊
    早期放置在 /var/run 新版 FHS 則規範放在 /run 底下，效能會較好 |
    | /sbin | 設定系統環境的指令，通常是 root 身分才能使用
    /sbin 中所放置的，主要是開機過程所需要的指令 ex: 開機、修復、還原系統等所需要的指令
    某些伺服器軟體，通常放在 /usr/sbin/
    至於自行安裝的軟體所產生的系統執行檔，則放在 /usr/local/sbin/ 中
    常見的指令: fdisk, fsck, ifconfig, mkfs …etc. |
    | /srv | service 的簡寫，指網路服務啟動之後，這些服務所需要取用的資料目錄
    ex WWW, FTP …etc.
    舉例來說，WWW 伺服器所需要的網頁資料就可以放在 srv/www/ 裡面
    但若系統的服務資料沒有要提供給他人，預設建議放在 var/lib 底下較妥 |
    | /temp | 一般使用者或正在執行的程式所放置的暫存檔的地方，重要的資料不可以放在這邊 |
    | /usr | 第二層 FHS 設定，後續介紹 |
    | /var | 第二層 FHS 設定，主要為放置變動性的資料，後續介紹 |
    |  | Par II : FHS 建議可以存放的目錄 |
    | /home | 系統預設使用者的家目錄 ( home directory )，預設的使用者目錄都會規範到這裡來
     ~: 代表目前使用者的家目錄
    ex: ~dmtsai: 代表是 dmtsai 的家目錄 |
    | /lib\<qual\> | 用來存放與 /lib 不同格式的二進位函式庫 ex: 支援 64 位元的 /lib64 |
    | /root | 系統管理員 ( root ) 的家目錄 |
    - 以下是 FHS 沒有特別規範，但同樣重要的目錄
    
    | 目錄 | 應放置檔案內容 |
    | --- | --- |
    | /lost+found | 目錄是使用標準的ext2/ext3/ext4檔案系統格式才會產生的一個目錄，目的在於當檔案系統發生錯誤時， 將一些遺失的片段放置到這個目錄下。不過如果使用的是 xfs 檔案系統的話，就不會存在這個目錄了！ |
    | /proc | 這個目錄本身是一個『虛擬檔案系統(virtual filesystem)』喔！他放置的資料都是在記憶體當中， 例如系統核心、行程資訊(process)、周邊裝置的狀態及網路狀態等等。因為這個目錄下的資料都是在記憶體當中， 所以本身不佔任何硬碟空間啊！比較重要的檔案例如：/proc/cpuinfo, /proc/dma, /proc/interrupts, /proc/ioports, /proc/net/* 等等。 |
    | /sys | 這個目錄其實跟/proc非常類似，也是一個虛擬的檔案系統，主要也是記錄核心與系統硬體資訊較相關的資訊。 包括目前已載入的核心模組與核心偵測到的硬體裝置資訊等等。這個目錄同樣不佔硬碟容量喔！ |

### **/usr 的意義與內容**

- FHS 定義為: 可分享 & 不可變動的 ( /usr 可以分享給區域網路內的其他主機使用 )
- usr 是 **Unix Software Resources** 的縮寫，也就是 Unix 作業系統軟體資源，不是指使用者資料
- 類似 windows 系統的 Windows 資料夾中的一部分以及 C 巢中的 Progrem files 中兩個目錄的集合體
- 通常系統剛安裝完，這個目錄會佔用最作的空間
- FHS 建議開發者，若在這邊安裝資料，要以底下的次目錄分類，而不是直接建立該軟體獨立的目錄

| 目錄 | 應放置檔案的內容 |
| --- | --- |
|  | Part I: FHS 要求必須要有的目錄 |
| /usr/bin/ | 所有一般用戶的指令都放在這裡，與根目錄的 /bin 內容相同，通常用 連結連結至此
FHS 要求此目錄下不該有其他的子目錄 |
| /usr/lib/ | 與 /lib 相同，同樣是用連結連結於此 |
| /usr/local/ | 系統管理員於本機自行安裝的軟體 ( 非 distribition 預設提供的 ) ex: 若想安裝新版的軟體又不想除舊版，就可以裝在這邊 |
| /usr/sbin/ | 與 /sbin 相同，同樣是用連結連結於此，系統正常運作所需要的指令 |
| /usr/share/ | 主要放置為架構的資料檔案，包含共享資料夾。
這裡放置的大都是不分硬體架構均可讀取的資料，因此幾乎都是文字檔
常見檔案如下
1. /usr/share/man 線上說明文件
2. /usr/share/doc: 軟體雜項的文件說明
3. /usr/share/zoneinfo: 與時區有關的時區檔案 |
|  | Part 2: FHS 建議可以存在的目錄 |
| /usr/games/ | 與遊戲比較有關的資料放置處 |
| /usr/include/ | c/c++等程式語言的檔頭(header)與包含檔(include)放置處，當我們以tarball方式 (*.tar.gz 的方式安裝軟體)安裝某些資料時，會使用到裡頭的許多包含檔喔！ |
| /usr/libexec/ | 某些不被一般使用者慣用的執行檔或腳本(script)等等，都會放置在此目錄中。例如大部分的 X 視窗底下的操作指令， 很多都是放在此目錄下的。 |
| /usr/lib\<qual\>/ | 與 /lib\<qual\>功能相同，因此目前 /lib\<qual\> 就是連結到此目錄中 |
| /usr/src/ | 一般原始碼建議放置到這裡，src有source的意思。至於核心原始碼則建議放置到/usr/src/linux/目錄下。 |

### **/var 的意義與內容**

如果/usr是安裝時會佔用較大硬碟容量的目錄，那麼**/var就是在系統運作後才會漸漸佔用硬碟容量的目錄**。

`/var`目錄主要針對常態性變動的檔案，包括**快取(cache)**、**登錄檔(log file)**以及**某些軟體運作**所產生的檔案， 包括**程序檔案(lock file, run file)**，或者例如**MySQL資料庫的檔案**等等

| 目錄 | 應放置檔案內容 |
| --- | --- |
|  | Part 1:FHS 要求必須要存在的目錄 |
| /var/cache/ | 應用程式本身運作過程中會產生的一些暫存檔 |
| /var/lib/ | 程式本身執行的過程中，需要使用到的資料檔案放置的目錄。在此目錄下各自的軟體應該要有各自的目錄。
舉例來說，MySQL的資料庫放置到/var/lib/mysql/
rpm的資料庫則放到/var/lib/rpm去 |
| /var/lock/ | 某些裝置或者是檔案資源一次只能被一個應用程式所使用，如果同時有兩個程式使用該裝置時， 就可能產生一些錯誤的狀況，因此就得要將該裝置上鎖(lock)，以確保該裝置只會給單一軟體所使用。
舉例來說，燒錄機正在燒錄一塊光碟，當第一個人在燒錄時該燒錄機就會被上鎖， 第二個人就得要該裝置被解除鎖定(就是前一個人用完了)才能夠繼續使用囉。目前此目錄也已經挪到 /run/lock 中！ |
| /var/log/ | 重要到不行！這是登錄檔放置的目錄！裡面比較重要的檔案如/var/log/messages, /var/log/wtmp(記錄登入者的資訊)等。 |
| /var/mail/ | 放置個人電子郵件信箱的目錄，不過這個目錄也被放置到/var/spool/mail/目錄中！ 通常這兩個目錄是互為連結檔啦！ |
| /var/run/ | 某些程式或者是服務啟動後，會將他們的PID放置在這個目錄下喔！
與 /run 相同，這個目錄連結到 /run 去了！ |
| /var/spool/ | 這個目錄通常放置一些佇列資料，所謂的『佇列』就是排隊等待其他程式使用的資料啦！ 這些資料被使用後通常都會被刪除。
舉例來說，系統收到新信會放置到/var/spool/mail/中， 但使用者收下該信件後該封信原則上就會被刪除。
信件如果暫時寄不出去會被放到/var/spool/mqueue/中， 等到被送出後就被刪除。
如果是工作排程資料(crontab)，就會被放置到/var/spool/cron/目錄中！ |

![https://linux.vbird.org/linux_basic/centos7/0210filepermission//centos7_0210filepermission_4.jpg](https://linux.vbird.org/linux_basic/centos7/0210filepermission//centos7_0210filepermission_4.jpg)

- **目錄樹 ( directory tree )**
    - 目錄樹的起始點為根目錄 ( / root )
    - 每一個目錄不只能使用本地端的檔案系統，也可透過網路掛載 filestsyem ex: Network File System ( NFS )
    - 每一個檔案在此目錄樹的檔名 ( 包含完整路徑 ) 都是獨一無二的

### **Linux 檔案與目錄管理**

- **絕對路徑：**路徑的寫法『**一定由根目錄 `**/` **寫起**』，例如： /usr/share/doc 這個目錄。
- **相對路徑**：路徑的寫法『**不是由** `/` **寫起**』，例如由 /usr/share/doc 要到 /usr/share/man 底下時，可以寫成： 『cd ../man』這就是相對路徑的寫法啦！相對路徑意指『相對於目前工作目錄的路徑！』
- 對於檔名的正確性來說，『**絕對路徑的正確度要比較好**～』如果是在寫程式 (shell scripts) 來管理系統的條件下，務必使用絕對路徑的寫法

### 基本操作 cd, pwd, mkdir, rmdir

```powershell
.         #代表此層目錄
..        #代表上一層目錄
-         #代表前一個工作目錄
~         #代表『目前使用者身份』所在的家目錄
~account  #代表 account 這個使用者的家目錄(account是個帳號名稱)

cd        # 全名是 change directory 變換目錄
pwd       # 顯示目前的目錄
mkdir     # 建立一個新的目錄
rmdir     # 刪除一個空的目錄
```

- `cd` change directory 變換目錄
    - 剛登入時會到自己的家目錄，而家目錄還有一個代碼，那就是『 ~ 』符號
    
    ```powershell
    [dmtsai@study ~]$ su -  # 先切換身份成為 root 看看！
    [root@study ~]# cd [相對路徑或絕對路徑]
    # 最重要的就是目錄的絕對路徑與相對路徑，還有一些特殊目錄的符號囉！
    [root@study ~]# cd ~dmtsai
    # 代表去到 dmtsai 這個使用者的家目錄，亦即 /home/dmtsai
    [root@study dmtsai]# cd ~
    # 表示回到自己的家目錄，亦即是 /root 這個目錄
    [root@study ~]# cd
    # 沒有加上任何路徑，也還是代表回到自己家目錄的意思喔！
    [root@study ~]# cd ..
    # 表示去到目前的上層目錄，亦即是 /root 的上層目錄的意思；
    [root@study /]# cd -
    # 表示回到剛剛的那個目錄，也就是 /root 囉～
    [root@study ~]# cd /var/spool/mail
    # 這個就是絕對路徑的寫法！直接指定要去的完整路徑名稱！
    [root@study mail]# cd ../postfix
    # 這個是相對路徑的寫法，我們由/var/spool/mail 去到/var/spool/postfix 就這樣寫！
    ```
    
- `pwd`  Print Working Directory 的縮寫，顯示目前所在的目錄
    
    ```powershell
    [root@study ~]# pwd [-P]
    選項與參數：
    -P  ：顯示出確實的路徑，而非使用連結 (link) 路徑。
    
    範例：單純顯示出目前的工作目錄：
    [root@study ~]# pwd
    /root   <== 顯示出目錄啦～
    
    範例：顯示出實際的工作目錄，而非連結檔本身的目錄名而已
    [root@study ~]# cd /var/mail   <==注意，/var/mail是一個連結檔
    [root@study mail]# pwd
    /var/mail         <==列出目前的工作目錄
    [root@study mail]# pwd -P
    /var/spool/mail   <==怎麼回事？有沒有加 -P 差很多～
    [root@study mail]# ls -ld /var/mail
    lrwxrwxrwx. 1 root root 10 May  4 17:51 /var/mail -> spool/mail
    # 看到這裡應該知道為啥了吧？因為 /var/mail 是連結檔，連結到 /var/spool/mail 
    # 所以，加上 pwd -P 的選項後，會不以連結檔的資料顯示，而是顯示正確的完整路徑啊！
    ```
    
- `mkdir` make directory 建立新的目錄
    
    ```powershell
    [root@study ~]# mkdir [-mp] 目錄名稱
    選項與參數：
    -m ：設定檔案的權限喔！直接設定，不需要看預設權限 (umask) 的臉色～
    -p ：幫助你直接將所需要的目錄(包含上層目錄)遞迴建立起來！
    
    範例：請到/tmp底下嘗試建立數個新目錄看看：
    [root@study ~]# cd /tmp
    [root@study tmp]# mkdir test    <==建立一名為 test 的新目錄
    [root@study tmp]# mkdir test1/test2/test3/test4
    mkdir: cannot create directory ‘test1/test2/test3/test4’: No such file or directory
    # 話說，系統告訴我們，沒可能建立這個目錄啊！就是沒有目錄才要建立的！見鬼嘛？
    [root@study tmp]# mkdir -p test1/test2/test3/test4
    # 原來是要建 test4 上層沒先建 test3 之故！加了這個 -p 的選項，可以自行幫你建立多層目錄！
    
    範例：建立權限為rwx--x--x的目錄
    [root@study tmp]# mkdir -m 711 test2
    [root@study tmp]# ls -ld test*
    drwxr-xr-x. 2 root   root  6 Jun  4 19:03 test
    drwxr-xr-x. 3 root   root 18 Jun  4 19:04 test1
    drwx--x--x. 2 root   root  6 Jun  4 19:05 test2
    # 仔細看上面的權限部分，如果沒有加上 -m 來強制設定屬性，系統會使用預設屬性。
    # 那麼你的預設屬性為何？這要透過底下介紹的 umask 才能瞭解喔！ ^_^
    ```
    
- `rmdir` remove directory 刪除空的目錄
    
    ```powershell
    [root@study ~]# rmdir [-p] 目錄名稱
    選項與參數：
    -p ：連同『上層』『空的』目錄也一起刪除
    
    範例：將於mkdir範例中建立的目錄(/tmp底下)刪除掉！
    [root@study tmp]# ls -ld test*   <==看看有多少目錄存在？
    drwxr-xr-x. 2 root   root  6 Jun  4 19:03 test
    drwxr-xr-x. 3 root   root 18 Jun  4 19:04 test1
    drwx--x--x. 2 root   root  6 Jun  4 19:05 test2
    [root@study tmp]# rmdir test   <==可直接刪除掉，沒問題
    [root@study tmp]# rmdir test1  <==因為尚有內容，所以無法刪除！
    rmdir: failed to remove ‘test1’: Directory not empty
    [root@study tmp]# rmdir -p test1/test2/test3/test4
    [root@study tmp]# ls -ld test*    <==您看看，底下的輸出中test與test1不見了！
    drwx--x--x. 2 root   root  6 Jun  4 19:05 test2
    # 瞧！利用 -p 這個選項，立刻就可以將 test1/test2/test3/test4 一次刪除～
    # 不過要注意的是，這個 rmdir 僅能『刪除空的目錄』喔！
    # 也就是 被刪除的目錄裡面必定不能存在其他的目錄或檔案，這也是所謂的空的目錄(empty directory)的意思啊
    # 如果要將所有目錄下的東西都殺掉呢？！ 這個時候就必須使用『 rm -r test 』囉！
    # 以 -p 的選項加入，來刪除上層的目錄喔！
    ```
    

### **關於執行檔路徑的變數: $PATH**

- 為什麼在任何目錄下輸入 bash 指令 ex: ls 就可以執行該指令而不用使用絕對路徑 /bin/ls 呢? 主因就是環境變數 PATH 的幫助
- 例如當我們執行利用 ls 的指令，系統就會找環境變數 PATH 的定義目錄，在下面搜尋名為 ls 的執行檔，若有多個 ls 執行檔，則會以先找到的那個先執行

```powershell
echo $PATH #echo有『顯示、印出』的意思; 而 PATH 前面加的 $ 表示後面接的是變數

範例：先用root的身份列出搜尋的路徑為何？
[root@study ~]# echo $PATH
/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin

範例：用dmtsai的身份列出搜尋的路徑為何？
[root@study ~]# exit    # 由之前的 su - 離開，變回原本的帳號！或再取得一個終端機皆可！
[dmtsai@study ~]$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/dmtsai/.local/bin:/home/dmtsai/bin
# 記不記得我們前一章說過，目前 /bin 是連結到 /usr/bin 當中的喔！
# PATH(一定是大寫)這個變數的內容是由一堆目錄所組成的
# 每個目錄中間用冒號(:)來隔開， 每個目錄是有『順序』之分的。
```

```powershell
例題：
假設你是root，如果你將ls由/bin/ls移動成為/root/ls(可用『mv /bin/ls /root』指令達成)，然後你自己本身也在/root目錄下， 請問(1)你能不能直接輸入ls來執行？(2)若不能，你該如何執行ls這個指令？(3)若要直接輸入ls即可執行，又該如何進行？
答：
由於這個例題的重點是將某個執行檔移動到非正規目錄去，所以我們先要進行底下的動作才行：(務必先使用 su - 切換成為root的身份)
[root@study ~]# mv /bin/ls /root
# mv 為移動，可將檔案在不同的目錄間進行移動作業
(1)接下來不論你在那個目錄底下輸入任何與ls相關的指令，都沒有辦法順利的執行ls了！ 也就是說，你不能直接輸入ls來執行，因為/root這個目錄並不在PATH指定的目錄中， 所以，即使你在/root目錄下，也不能夠搜尋到ls這個指令！

(2)因為這個ls確實存在於/root底下，並不是被刪除了！所以我們可以透過使用絕對路徑或者是相對路徑直接指定這個執行檔檔名， 底下的兩個方法都能夠執行ls這個指令：
[root@study ~]# /root/ls  <==直接用絕對路徑指定該檔名
[root@study ~]# ./ls      <==因為在 /root 目錄下，就用./ls來指定
(3)如果想要讓root在任何目錄均可執行/root底下的ls，那麼就將/root加入PATH當中即可。 加入的方法很簡單，就像底下這樣：
[root@study ~]# PATH="${PATH}:/root"
上面這個作法就能夠將/root加入到執行檔搜尋路徑PATH中了！不相信的話請您自行使用『echo $PATH』去查看吧！ 另外，除了 $PATH 之外，如果想要更明確的定義出變數的名稱，可以使用大括號 ${PATH} 來處理變數的呼叫喔！ 如果確定這個例題進行沒有問題了，請將ls搬回/bin底下，不然系統會掛點的！
[root@study ~]# mv /root/ls /bin
某些情況下，即使你已經將 ls 搬回 /bin 了，不過系統還是會告知你無法處理 /root/ls 喔！很可能是因為指令參數被快取的關係。 不要緊張，只要登出 (exit) 再登入 (su -) 就可以繼續快樂的使用 ls 了！
```

```powershell
例題：
如果我有兩個ls指令在不同的目錄中，例如/usr/local/bin/ls與/bin/ls那麼當我下達 ls 的時候，哪個ls會被執行？
答：
那還用說，就找出 ${PATH} 裡面哪個目錄先被查詢，則那個目錄下的指令就會被先執行了！所以用 dmtsai 帳號為例，他最先搜尋的是 /usr/local/bin， 所以 /usr/local/bin/ls 會先被執行喔！
```

```powershell
例題：
為什麼 ${PATH} 搜尋的目錄不加入本目錄(.)？加入本目錄的搜尋不是也不錯？
答：
如果在PATH中加入本目錄(.)後，確實我們就能夠在指令所在目錄進行指令的執行了。 但是由於你的工作目錄並非固定(常常會使用cd來切換到不同的目錄)， 因此能夠執行的指令會有變動(因為每個目錄底下的可執行檔都不相同嘛！)，這對使用者來說並非好事。

另外，如果有個壞心使用者在/tmp底下做了一個指令，因為/tmp是大家都能夠寫入的環境，所以他當然可以這樣做。 假設該指令可能會竊取使用者的一些資料，如果你使用root的身份來執行這個指令，那不是很糟糕？ 如果這個指令的名稱又是經常會被用到的ls時，那『中標』的機率就更高了！

所以，為了安全起見，不建議將『.』加入PATH的搜尋目錄中。
```

而由上面的幾個例題我們也可以知道幾件事情：

- 不同身份使用者預設的PATH不同，預設能夠隨意執行的指令也不同(如root與dmtsai)；
- PATH是可以修改的；
- 使用絕對路徑或相對路徑直接指定某個指令的檔名來執行，會比搜尋PATH來的正確；
- 指令應該要放置到正確的目錄下，執行才會比較方便；
- 本目錄(.)最好不要放到PATH當中。

### **檔案與目錄的檢視: ls**

```powershell
[root@study ~]# ls [-aAdfFhilnrRSt] 檔名或目錄名稱..
[root@study ~]# ls [--color={never,auto,always}] 檔名或目錄名稱..
[root@study ~]# ls [--full-time] 檔名或目錄名稱..
選項與參數：
-a  ：全部的檔案，連同隱藏檔( 開頭為 . 的檔案) 一起列出來(常用)
-A  ：全部的檔案，連同隱藏檔，但不包括 . 與 .. 這兩個目錄
-d  ：僅列出目錄本身，而不是列出目錄內的檔案資料(常用)
-f  ：直接列出結果，而不進行排序 (ls 預設會以檔名排序！)
-F  ：根據檔案、目錄等資訊，給予附加資料結構，例如：
      *:代表可執行檔； /:代表目錄； =:代表 socket 檔案； |:代表 FIFO 檔案；
-h  ：將檔案容量以人類較易讀的方式(例如 GB, KB 等等)列出來；
-i  ：列出 inode 號碼，inode 的意義下一章將會介紹；
-l  ：長資料串列出，包含檔案的屬性與權限等等資料；(常用)
	#註 ls -l 與 ll 是一樣的
-n  ：列出 UID 與 GID 而非使用者與群組的名稱 (UID與GID會在帳號管理提到！)
-r  ：將排序結果反向輸出，例如：原本檔名由小到大，反向則為由大到小；
-R  ：連同子目錄內容一起列出來，等於該目錄下的所有檔案都會顯示出來；
-S  ：以檔案容量大小排序，而不是用檔名排序；
-t  ：依時間排序，而不是用檔名。
--color=never  ：不要依據檔案特性給予顏色顯示；
--color=always ：顯示顏色
--color=auto   ：讓系統自行依據設定來判斷是否給予顏色
--full-time    ：以完整時間模式 (包含年、月、日、時、分) 輸出
--time={atime,ctime} ：輸出 access 時間或改變權限屬性時間 (ctime) 
                       而非內容變更時間 (modification time)
```

```powershell
範例一：將家目錄下的所有檔案列出來(含屬性與隱藏檔)
[root@study ~]# ls -al ~
total 56
dr-xr-x---.  5 root root 4096 Jun  4 19:49 .
dr-xr-xr-x. 17 root root 4096 May  4 17:56 ..
-rw-------.  1 root root 1816 May  4 17:57 anaconda-ks.cfg
-rw-------.  1 root root 6798 Jun  4 19:53 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-rw-rw-.  1 root root  176 Dec 29  2013 .bashrc
-rw-r--r--.  1 root root  176 Jun  3 00:04 .bashrc_test
drwx------.  4 root root   29 May  6 00:14 .cache
drwxr-xr-x.  3 root root   17 May  6 00:14 .config
# 這個時候你會看到以 . 為開頭的幾個檔案，以及目錄檔 (.) (..) .config 等等，
# 不過，目錄檔檔名都是以深藍色顯示，有點不容易看清楚就是了。

範例二：承上題，不顯示顏色，但在檔名末顯示出該檔名代表的類型(type)
[root@study ~]# ls -alF --color=never  ~
total 56
dr-xr-x---.  5 root root 4096 Jun  4 19:49 ./ #  F 顯示的 / 代表是目錄
dr-xr-xr-x. 17 root root 4096 May  4 17:56 ../
-rw-------.  1 root root 1816 May  4 17:57 anaconda-ks.cfg
-rw-------.  1 root root 6798 Jun  4 19:53 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-rw-rw-.  1 root root  176 Dec 29  2013 .bashrc
-rw-r--r--.  1 root root  176 Jun  3 00:04 .bashrc_test
drwx------.  4 root root   29 May  6 00:14 .cache/
drwxr-xr-x.  3 root root   17 May  6 00:14 .config/
# 注意看到顯示結果的第一行，嘿嘿～知道為何我們會下達類似 ./command 
# 之類的指令了吧？因為 ./ 代表的是『目前目錄下』的意思啊！至於什麼是 FIFO/Socket ？
# 請參考前一章節的介紹啊！另外，那個.bashrc 時間僅寫2013，能否知道詳細時間？

範例三：完整的呈現檔案的修改時間 (modification time)
[root@study ~]# ls -al --full-time  ~
total 56
dr-xr-x---.  5 root root 4096 2015-06-04 19:49:54.520684829 +0800 .
dr-xr-xr-x. 17 root root 4096 2015-05-04 17:56:38.888000000 +0800 ..
-rw-------.  1 root root 1816 2015-05-04 17:57:02.326000000 +0800 anaconda-ks.cfg
-rw-------.  1 root root 6798 2015-06-04 19:53:41.451684829 +0800 .bash_history
-rw-r--r--.  1 root root   18 2013-12-29 10:26:31.000000000 +0800 .bash_logout
-rw-r--r--.  1 root root  176 2013-12-29 10:26:31.000000000 +0800 .bash_profile
-rw-rw-rw-.  1 root root  176 2013-12-29 10:26:31.000000000 +0800 .bashrc
-rw-r--r--.  1 root root  176 2015-06-03 00:04:16.916684829 +0800 .bashrc_test
drwx------.  4 root root   29 2015-05-06 00:14:56.960764950 +0800 .cache
drwxr-xr-x.  3 root root   17 2015-05-06 00:14:56.975764950 +0800 .config
# 請仔細看，上面的『時間』欄位變了喔！變成較為完整的格式。
# 一般來說， ls -al 僅列出目前短格式的時間，有時不會列出年份，
# 藉由 --full-time 可以查閱到比較正確的完整時間格式啊！
```

### **複製 cp**

- **cp (複製檔案或目錄) copy 的簡寫**
    
    **複製時需注意**
    
    - 是否需要完整的保留來源檔案的資訊？
    - 來源檔案是否為連結檔 (symbolic link file)？
    - 來源檔是否為特殊的檔案，例如 FIFO, socket 等？
    - 來源檔是否為目錄？
    
    ```powershell
    [root@study ~]# cp [-adfilprsu] 來源檔(source) 目標檔(destination)
    [root@study ~]# cp [options] source1 source2 source3 .... directory
    選項與參數：
    -a  ：相當於 -dr --preserve=all 的意思，至於 dr 請參考下列說明；(常用)
    	# -a 檔案的所有特性都一起複製過來，包含權限以及建檔時間，若不加的話權限與建檔時間很可能會不同
    -d  ：若來源檔為連結檔的屬性(link file)，則複製連結檔屬性而非檔案本身；
    -f  ：為強制(force)的意思，若目標檔案已經存在且無法開啟，則移除後再嘗試一次；
    -i  ：若目標檔(destination)已經存在時，在覆蓋時會先詢問動作的進行(常用)
    -l  ：進行硬式連結(hard link)的連結檔建立，而非複製檔案本身；
    -p  ：連同檔案的屬性(權限、用戶、時間)一起複製過去，而非使用預設屬性(備份常用)；
    -r  ：遞迴持續複製，用於目錄的複製行為；(常用)
    -s  ：複製成為符號連結檔 (symbolic link)，亦即『捷徑』檔案；
    -u  ：destination 比 source 舊才更新 destination，或 destination 不存在的情況下才複製。
    --preserve=all ：除了 -p 的權限相關參數外，還加入 SELinux 的屬性, links, xattr 等也複製了。
    最後需要注意的，如果來源檔有兩個以上，則最後一個目的檔一定要是『目錄』才行！
    ```
    
    ```powershell
    範例一：用root身份，將家目錄下的 .bashrc 複製到 /tmp 下，並更名為 bashrc
    # 注意這邊直接以目標檔 /tmp/bashrc 做更改名稱
    # 若不用更改名稱，目標檔就以 /tmp/ 便可以
    [root@study ~]# cp ~/.bashrc /tmp/bashrc
    [root@study ~]# cp -i ~/.bashrc /tmp/bashrc
    cp: overwrite `/tmp/bashrc'? n  <==n不覆蓋，y為覆蓋
    # 重複作兩次動作，由於 /tmp 底下已經存在 bashrc 了，加上 -i 選項後，
    # 則在覆蓋前會詢問使用者是否確定！可以按下 n 或者 y 來二次確認呢！
    
    範例二：變換目錄到/tmp，並將/var/log/wtmp複製到/tmp且觀察屬性：
    [root@study ~]# cd /tmp
    [root@study tmp]# cp /var/log/wtmp . <==想要複製到目前的目錄，最後的 . 不要忘
    [root@study tmp]# ls -l /var/log/wtmp wtmp
    -rw-rw-r--. 1 root utmp 28416 Jun 11 18:56 /var/log/wtmp
    -rw-r--r--. 1 root root 28416 Jun 11 19:01 wtmp
    # 注意上面的特殊字體，在不加任何選項的情況下，檔案的某些屬性/權限會改變；
    # 這是個很重要的特性！要注意喔！還有，連檔案建立的時間也不一樣了！
    # 那如果你想要將檔案的所有特性都一起複製過來該怎辦？可以加上 -a 喔！如下所示：
    
    [root@study tmp]# cp -a /var/log/wtmp wtmp_2
    [root@study tmp]# ls -l /var/log/wtmp wtmp_2
    -rw-rw-r--. 1 root utmp 28416 Jun 11 18:56 /var/log/wtmp
    -rw-rw-r--. 1 root utmp 28416 Jun 11 18:56 wtmp_2
    # 瞭了吧！整個資料特性完全一模一樣ㄟ！真是不賴～這就是 -a 的特性！
    
    範例三：複製 /etc/ 這個目錄下的所有內容到 /tmp 底下
    [root@study tmp]# cp /etc/ /tmp
    cp: omitting directory `/etc'   <== 如果是目錄則不能直接複製，要加上 -r 的選項
    [root@study tmp]# cp -r /etc/ /tmp
    # 還是要再次的強調喔！ -r 是可以複製目錄，但是，檔案與目錄的權限可能會被改變
    # 所以，也可以利用『 cp -a /etc /tmp 』來下達指令喔！尤其是在備份的情況下！
    # 若是複製目標為目錄則結尾為 / ex:/etc/ ，且要用 -r 才能複製
    # 同樣複製目標為目錄，但可以將其視為單一檔 ex: /etc，所以可以用『 cp -a /etc /tmp 』來下達指令喔
    
    範例四：將範例一複製的 bashrc 建立一個連結檔 (symbolic link)
    [root@study tmp]# ls -l bashrc
    -rw-r--r--. 1 root root 176 Jun 11 19:01 bashrc  <==先觀察一下檔案情況
    [root@study tmp]# cp -s bashrc bashrc_slink
    [root@study tmp]# cp -l bashrc bashrc_hlink
    [root@study tmp]# ls -l bashrc*
    -rw-r--r--. 2 root root 176 Jun 11 19:01 bashrc         <==與原始檔案不太一樣了！
    -rw-r--r--. 2 root root 176 Jun 11 19:01 bashrc_hlink
    lrwxrwxrwx. 1 root root   6 Jun 11 19:06 bashrc_slink -> bashrc
    
    範例五：若 ~/.bashrc 比 /tmp/bashrc 新才複製過來
    [root@study tmp]# cp -u ~/.bashrc /tmp/bashrc
    # 這個 -u 的特性，是在目標檔案與來源檔案有差異時，才會複製的。
    # 所以，比較常被用於『備份』的工作當中喔！ ^_^
    
    範例六：將範例四造成的 bashrc_slink 複製成為 bashrc_slink_1 與bashrc_slink_2
    [root@study tmp]# cp bashrc_slink bashrc_slink_1
    [root@study tmp]# cp -d bashrc_slink bashrc_slink_2
    [root@study tmp]# ls -l bashrc bashrc_slink*
    -rw-r--r--. 2 root root 176 Jun 11 19:01 bashrc
    lrwxrwxrwx. 1 root root   6 Jun 11 19:06 bashrc_slink -> bashrc
    -rw-r--r--. 1 root root 176 Jun 11 19:09 bashrc_slink_1            <==與原始檔案相同
    lrwxrwxrwx. 1 root root   6 Jun 11 19:10 bashrc_slink_2 -> bashrc  <==是連結檔！
    # 這個例子也是很有趣喔！原本複製的是連結檔，但是卻將連結檔的實際檔案複製過來了
    # 也就是說，如果沒有加上任何選項時，cp複製的是原始檔案，而非連結檔的屬性！
    # 若要複製連結檔的屬性，就得要使用 -d 的選項了！如 bashrc_slink_2 所示。
    
    範例七：將家目錄的 .bashrc 及 .bash_history 複製到 /tmp 底下
    [root@study tmp]# cp ~/.bashrc ~/.bash_history /tmp
    # 可以將多個資料一次複製到同一個目錄去！最後面一定是目錄！
    ```
    
    ```powershell
    例題：
    你能否使用 dmtsai 的身份，完整的複製/var/log/wtmp檔案到/tmp底下，並更名為dmtsai_wtmp呢？
    答：
    實際做看看的結果如下：
    [dmtsai@study ~]$ cp -a /var/log/wtmp /tmp/dmtsai_wtmp
    [dmtsai@study ~]$ ls -l /var/log/wtmp /tmp/dmtsai_wtmp
    -rw-rw-r--. 1 dmtsai dmtsai 28416  6月 11 18:56 /tmp/dmtsai_wtmp
    -rw-rw-r--. 1 root   utmp   28416  6月 11 18:56 /var/log/wtmp
    由於 dmtsai 的身份並不能隨意修改檔案的擁有者與群組，因此雖然能夠複製wtmp的相關權限與時間等屬性， 但是與擁有者、群組相關的，原本 dmtsai 身份無法進行的動作，即使加上 -a 選項，也是無法達成完整複製權限的！
    ```
    

### **rm (移除檔案或目錄)**

```powershell
[root@study ~]# rm [-fir] 檔案或目錄
選項與參數：
-f  ：就是 force 的意思，忽略不存在的檔案，不會出現警告訊息；
-i  ：互動模式，在刪除前會詢問使用者是否動作
-r  ：遞迴刪除啊！最常用在目錄的刪除了！這是非常危險的選項！！！

範例一：將剛剛在 cp 的範例中建立的 bashrc 刪除掉！
[root@study ~]# cd /tmp
[root@study tmp]# rm -i bashrc
rm: remove regular file `bashrc'? y
# 如果加上 -i 的選項就會主動詢問喔，避免你刪除到錯誤的檔名！

範例二：透過萬用字元*的幫忙，將/tmp底下開頭為bashrc的檔名通通刪除：
[root@study tmp]# rm -i bashrc*
# 注意那個星號，代表的是 0 到無窮多個任意字元喔！很好用的東西！

範例三：將 cp 範例中所建立的 /tmp/etc/ 這個目錄刪除掉！
[root@study tmp]# rmdir /tmp/etc
rmdir: failed to remove '/tmp/etc': Directory not empty   <== 刪不掉啊！因為這不是空的目錄！
[root@study tmp]# rm -r /tmp/etc
rm: descend into directory `/tmp/etc'? y
rm: remove regular file `/tmp/etc/fstab'? y
rm: remove regular empty file `/tmp/etc/crypttab'? ^C  <== 按下 [ctrl]+c 中斷
.....(中間省略).....
# 因為身份是 root ，預設已經加入了 -i 的選項，所以你要一直按 y 才會刪除！
# 如果不想要繼續按 y ，可以按下『 [ctrl]-c 』來結束 rm 的工作。
# 這是一種保護的動作，如果確定要刪除掉此目錄而不要詢問，可以這樣做：
[root@study tmp]# \rm -r /tmp/etc
# 在指令前加上反斜線，可以忽略掉 alias 的指定選項喔！至於 alias 我們在bash再談！
# 拜託！這個範例很可怕！你不要刪錯了！刪除 /etc 系統是會掛掉的！

範例四：刪除一個帶有 - 開頭的檔案
[root@study tmp]# touch ./-aaa-  <==touch這個指令可以建立空檔案！
[root@study tmp]# ls -l 
-rw-r--r--. 1 root   root       0 Jun 11 19:22 -aaa-  <==檔案大小為0，所以是空檔案
[root@study tmp]# rm -aaa-
rm: invalid option -- 'a'                    <== 因為 "-" 是選項嘛！所以系統誤判了！
Try 'rm ./-aaa-' to remove the file `-aaa-'. <== 新的 bash 有給建議的
Try 'rm --help' for more information.
[root@study tmp]# rm ./-aaa-
```

### **mv ( 移動檔案與目錄，或更名 )**

```powershell
[root@study ~]# mv [-fiu] source destination
[root@study ~]# mv [options] source1 source2 source3 .... directory
選項與參數：
-f  ：force 強制的意思，如果目標檔案已經存在，不會詢問而直接覆蓋；
-i  ：若目標檔案 (destination) 已經存在時，就會詢問是否覆蓋！
-u  ：若目標檔案已經存在，且 source 比較新，才會更新 (update)

範例一：複製一檔案，建立一目錄，將檔案移動到目錄中
[root@study ~]# cd /tmp
[root@study tmp]# cp ~/.bashrc bashrc
[root@study tmp]# mkdir mvtest
[root@study tmp]# mv bashrc mvtest
# 將某個檔案移動到某個目錄去，就是這樣做！

範例二：將剛剛的目錄名稱更名為 mvtest2
[root@study tmp]# mv mvtest mvtest2 <== 這樣就更名了！簡單～
# 其實在 Linux 底下還有個有趣的指令，名稱為 rename ，
# 該指令專職進行多個檔名的同時更名，並非針對單一檔名變更，與mv不同。請man rename。

範例三：再建立兩個檔案，再全部移動到 /tmp/mvtest2 當中
[root@study tmp]# cp ~/.bashrc bashrc1
[root@study tmp]# cp ~/.bashrc bashrc2
[root@study tmp]# mv bashrc1 bashrc2 mvtest2
# 注意到這邊，如果有多個來源檔案或目錄，則最後一個目標檔一定是『目錄！』
# 意思是說，將所有的資料移動到該目錄的意思！
# 注意，這邊是多個檔案移動的範例
```

- **取得路徑檔案名稱與目錄名稱 ( basename / dirname )**
    
    ```powershell
    [root@study ~]# basename /etc/sysconfig/network
    network         <== 很簡單！就取得最後的檔名～
    [root@study ~]# dirname /etc/sysconfig/network
    /etc/sysconfig  <== 取得的變成目錄名了！
    ```
    

### **檔案內容查閱**

- **當查閱大型檔案資料時方便使用的指令**
    - `cat` 由第一行開始顯示檔案內容
    - `tac` 從最後一行開始顯示，可以看出 tac 是 cat 的倒著寫！
    - `nl` 顯示的時候，順道輸出行號！
    - `more` 一頁一頁的顯示檔案內容
    - `less` 與 more 類似，但是比 more 更好的是，他可以往前翻頁！
    - `head` 只看頭幾行
    - `tail` 只看尾巴幾行
    - `od` 以二進位的方式讀取檔案內容！

### cat**(concatenate) 連續**

- 指將內容連續的印在畫面上

```powershell
[root@study ~]# cat [-AbEnTv]
選項與參數：
-A  ：相當於 -vET 的整合選項，可列出一些特殊字符而不是空白而已；
-b  ：列出行號，僅針對非空白行做行號顯示，空白行不標行號！
-E  ：將結尾的斷行字元 $ 顯示出來；
-n  ：列印出行號，連同空白行也會有行號，與 -b 的選項不同；
-T  ：將 [tab] 按鍵以 ^I 顯示出來；
-v  ：列出一些看不出來的特殊字符

範例一：檢閱 /etc/issue 這個檔案的內容
[root@study ~]# cat /etc/issue
\S
Kernel \r on an \m

範例二：承上題，如果還要加印行號呢？
[root@study ~]# cat -n /etc/issue
     1  \S
     2  Kernel \r on an \m
     3
# 所以這個檔案有三行！看到了吧！可以印出行號呢！這對於大檔案要找某個特定的行時，有點用處！
# 如果不想要編排空白行的行號，可以使用『cat -b /etc/issue』，自己測試看看：

範例三：將 /etc/man_db.conf 的內容完整的顯示出來(包含特殊字元)
[root@study ~]# cat -A /etc/man_db.conf
# $
....(中間省略)....
MANPATH_MAP^I/bin^I^I^I/usr/share/man$
MANPATH_MAP^I/usr/bin^I^I/usr/share/man$
MANPATH_MAP^I/sbin^I^I^I/usr/share/man$
MANPATH_MAP^I/usr/sbin^I^I/usr/share/man$
.....(底下省略).....
# 上面的結果限於篇幅，鳥哥刪除掉很多資料了。另外，輸出的結果並不會有特殊字體，
# 鳥哥上面的特殊字體是要讓您發現差異點在哪裡就是了。基本上，在一般的環境中，
# 使用 [tab] 與空白鍵的效果差不多，都是一堆空白啊！我們無法知道兩者的差別。
# 此時使用 cat -A 就能夠發現那些空白的地方是啥鬼東西了！[tab]會以 ^I 表示，
# 斷行字元則是以 $ 表示，所以你可以發現每一行後面都是 $ 啊！不過斷行字元
# 在Windows/Linux則不太相同，Windows的斷行字元是 ^M$ 囉。
# 這部分我們會在第九章 vim 軟體的介紹時，再次的說明到喔！
```

### tac ( 反向顯示 )

- tac 恰好是 cat 的相反，代表反向輸出
- 注意是從**最後一行逐行輸出輸出**，而不是逐字反向輸出

```powershell
[root@study ~]# tac /etc/issue

Kernel \r on an \m
\S
# 嘿嘿！與剛剛上面的範例一比較，是由最後一行先顯示喔！
```

### nl ( 添加行號列印 )

- nl 可以將輸出的檔案內容自動的加上行號！其預設的結果與 cat -n 有點不太一樣， nl 可以將行號做比較多的顯示設計，包括位數與是否自動補齊 0 等等的功能呢

```powershell
[root@study ~]# nl [-bnw] 檔案
選項與參數：
-b  ：指定行號指定的方式，主要有兩種：
      -b a ：表示不論是否為空行，也同樣列出行號(類似 cat -n)；
      -b t ：如果有空行，空的那一行不要列出行號(預設值)；
-n  ：列出行號表示的方法，主要有三種：
      -n ln ：行號在螢幕的最左方顯示；
      -n rn ：行號在自己欄位的最右方顯示，且不加 0 ；
      -n rz ：行號在自己欄位的最右方顯示，且加 0 ；
-w  ：行號欄位的佔用的字元數。

範例一：用 nl 列出 /etc/issue 的內容
[root@study ~]# nl /etc/issue
     1  \S
     2  Kernel \r on an \m

# 注意看，這個檔案其實有三行，第三行為空白(沒有任何字元)，
# 因為他是空白行，所以 nl 不會加上行號喔！如果確定要加上行號，可以這樣做：

[root@study ~]# nl -b a /etc/issue
     1  \S
     2  Kernel \r on an \m
     3
# 呵呵！行號加上來囉～那麼如果要讓行號前面自動補上 0 呢？可這樣

[root@study ~]# nl -b a -n rz /etc/issue
000001  \S
000002  Kernel \r on an \m
000003
# 嘿嘿！自動在自己欄位的地方補上 0 了～預設欄位是六位數，如果想要改成 3 位數？

[root@study ~]# nl -b a -n rz -w 3 /etc/issue
001     \S
002     Kernel \r on an \m
003
# 變成僅有 3 位數囉～
```

### 翻頁檢視 ( more, less )

### **more**

- 一頁一頁翻動

```powershell
[root@study ~]# more /etc/man_db.conf
#
#
# This file is used by the man-db package to configure the man and cat paths.
# It is also used to provide a manpath for those without one by examining
# their PATH environment variable. For details see the manpath(5) man page.
#
.....(中間省略).....
--More--(28%)  <== 重點在這一行喔！你的游標也會在這裡等待你的指令
```

- 重點在最後一行，可以輸入指令
- 指令如下
    - **空白鍵 (`space`)**：代表向下翻一頁；
    - **`Enter`** ：代表向下翻『一行』；
    - **`/字串`** ：代表在這個顯示的內容當中，向下搜尋『字串』這個關鍵字；
        - **範例**
            
            ```powershell
            [root@study ~]# more /etc/man_db.conf
            #
            #
            # This file is used by the man-db package to configure the man and cat paths.
            # It is also used to provide a manpath for those without one by examining
            # their PATH environment variable. For details see the manpath(5) man page.
            #
            ....(中間省略)....
            /MANPATH   <== 輸入了 / 之後，游標就會自動跑到最底下一行等待輸入！
            ```
            
    - **`:f`** ：立刻顯示出檔名以及目前顯示的行數；
    - **`q`** ：代表立刻離開 more ，不再顯示該檔案內容。
    - **`b`** 或 `[ctrl]-b` ：代表往回翻頁，不過這動作只對檔案有用，對管線無用。

### less

- 一頁一頁翻動
- less 的用法比起 more 又更加的有彈性
    - 對比 more: 在 more 的時候，我們並沒有辦法向前面翻， 只能往後面看
- less 可以使用 [pageup] [pagedown] 等按鍵的功能來往前往後翻看文件
- less 的搜尋功能不只可以向下，也可以向上搜尋
- 指令 `man` 與 `less` 的功能相近，是因為指令 `man 文件` 就是呼叫 `less` 指令來查看文件內容

```powershell
[root@study ~]# less /etc/man_db.conf
#
#
# This file is used by the man-db package to configure the man and cat paths.
# It is also used to provide a manpath for those without one by examining
# their PATH environment variable. For details see the manpath(5) man page.
#
.....(中間省略).....
:   <== 這裡可以等待你輸入指令！
```

- less 中的相關指令
    - **空白鍵** ：向下翻動一頁；
    - **`[pagedown]`**：向下翻動一頁；
    - **`[pageup]`** ：向上翻動一頁；
    - **`/字串`** ：向下搜尋『字串』的功能；
    - **`?字串`** ：向上搜尋『字串』的功能；
    - **`n`** ：重複前一個搜尋 (與 / 或 ? 有關！)
    - **`N`** ：反向的重複前一個搜尋 (與 / 或 ? 有關！)
    - **`g`** ：前進到這個資料的第一行去；
    - **`G`** ：前進到這個資料的最後一行去 (注意大小寫)；
    - **`q`** ：離開 less 這個程式；

### 資料擷取: head ( 取出前面幾行 )、tail ( 取出後面幾行 )

- 須注意 不論 head 或 tail 都是以 **行** 為單位進行擷取

### head ( 取出前面幾行 )

- 若沒有加上 `-n` 這個選項時，預設只顯示**十行**，若只要一行呢？那就加入『 `head -n 1 filename` 』即可！

```powershell
[root@study ~]# head [-n number] 檔案 
選項與參數：
-n  ：後面接數字，代表顯示幾行的意思

[root@study ~]# head /etc/man_db.conf
# 預設的情況中，顯示前面十行！若要顯示前 20 行，就得要這樣：
[root@study ~]# head -n 20 /etc/man_db.conf

範例：**如果後面100行的資料都不列印**，只列印/etc/man_db.conf的前面幾行，該如何是好？
[root@study ~]# head -n -100 /etc/man_db.conf

# n 選項後面的參數較有趣，如果接的是負數
# 例如上面範例的-n -100時，代表列前的所有行數
# 但不包括後面100行。舉例來說 CentOS 7.1 的 /etc/man_db.conf 共有131行
# 則上述的指令『head -n -100 /etc/man_db.conf』 就會列出前面31行，後面100行不會列印出來了。
```

### tail ( 取出後面幾行 )

- 與 head 相反，顯示從後面算起的十行，若要指定行數，與 head 相同 是用 `tail -n number`

```powershell
[root@study ~]# tail [-n number] 檔案 
選項與參數：
-n  ：後面接數字，代表顯示幾行的意思
-f  ：**表示持續偵測後面所接的檔名**，要等到按下[ctrl]-c才會結束tail的偵測

[root@study ~]# tail /etc/man_db.conf
# 預設的情況中，顯示最後的十行！若要顯示最後的 20 行，就得要這樣：
[root@study ~]# tail -n 20 /etc/man_db.conf

範例一：如果不知道/etc/man_db.conf有幾行，卻**只想列出100行以後的資料時**？
[root@study ~]# tail -n +100 /etc/man_db.conf
# 其實與head -n -xx有異曲同工之妙。
# 當下達『tail -n +100 /etc/man_db.conf』 
# 代表該檔案從100行以後都會被列出來，
# 同樣的，在man_db.conf共有131行，因此第100~131行就會被列出來啦！ 
# 前面的99行都不會被顯示出來喔！

範例二：持續偵測/var/log/messages的內容
[root@study ~]# tail -f /var/log/messages
  <==要等到輸入[ctrl]-c之後才會離開tail這個指令的偵測！
```

### **非純文字檔： od**

- 以上提到的都是查閱文字檔的內容，若是非文字檔的內容 ex: binary file 使用上述指令讀取，則全是亂碼，這時就要用 od 這個指令來讀取
- 如果是存文字檔，使用 `od -t c` 也會轉換成 ASCII 字元喔

```powershell
[root@study ~]# od [-t TYPE] 檔案
選項或參數：
-t  ：後面可以接各種『類型 (TYPE)』的輸出，例如：
      a       ：利用預設的字元來輸出；
      c       ：使用 ASCII 字元來輸出
      d[size] ：利用十進位(decimal)來輸出資料，每個整數佔用 size bytes ；
      f[size] ：利用浮點數值(floating)來輸出資料，每個數佔用 size bytes ；
      o[size] ：利用八進位(octal)來輸出資料，每個整數佔用 size bytes ；
      x[size] ：利用十六進位(hexadecimal)來輸出資料，每個整數佔用 size bytes ；

範例一：請將/usr/bin/passwd的內容使用ASCII方式來展現！
[root@study ~]# od -t c /usr/bin/passwd
0000000 177   E   L   F 002 001 001  \0  \0  \0  \0  \0  \0  \0  \0  \0
0000020 003  \0   >  \0 001  \0  \0  \0 364   3  \0  \0  \0  \0  \0  \0
0000040   @  \0  \0  \0  \0  \0  \0  \0   x   e  \0  \0  \0  \0  \0  \0
0000060  \0  \0  \0  \0   @  \0   8  \0  \t  \0   @  \0 035  \0 034  \0
0000100 006  \0  \0  \0 005  \0  \0  \0   @  \0  \0  \0  \0  \0  \0  \0
.....(後面省略)....
# 最左邊第一欄是以 8 進位來表示bytes數。以上面範例來說，第二欄0000020代表開頭是
# 第 16 個 byes (2x8) 的內容之意。

範例二：請將/etc/issue這個檔案的內容以8進位列出儲存值與ASCII的對照表
[root@study ~]# od -t oCc /etc/issue
0000000 134 123 012 113 145 162 156 145 154 040 134 162 040 157 156 040
          \   S  \n   K   e   r   n   e   l       \   r       o   n
0000020 141 156 040 134 155 012 012
          a   n       \   m  \n  \n
0000027
# 如上所示，可以發現每個字元可以對應到的數值為何！要注意的是，該數值是 8 進位喔！
# 例如 S 對應的記錄數值為 123 ，轉成十進位：1x8^2+2x8+3=83。
```

### **修改檔案時間或建置新檔： touch**

- 在 Linux 系統中，檔案有三種代表不同意義的時間
    - **modification time ( mtime )**
        
        這是當檔案內容有變更就會更新的時間 ( 不含檔案權限或屬性的變更 )
        
    - **status time ( ctime )**
        
        檔案屬性或權限變更就會更新的時間 ( 不含檔案內容更新 )
        
    - **access time (atime )**
        
        當檔案內容備取用/讀取時，此時間就會被更新 ex: cat  指令讀取該文件
        

```powershell
[root@study ~]# date; ls -l /etc/man_db.conf ; ls -l --time=atime /etc/man_db.conf ; \
> ls -l --time=ctime /etc/man_db.conf # 這兩行其實是同一行喔！用分號隔開
Tue Jun 16 00:43:17 CST 2015  # 目前的時間啊！
-rw-r--r--. 1 root root 5171 Jun 10  2014 /etc/man_db.conf  # 在 2014/06/10 建立的內容(mtime)
-rw-r--r--. 1 root root 5171 Jun 15 23:46 /etc/man_db.conf  # 在 2015/06/15 讀取過內容(atime)
-rw-r--r--. 1 root root 5171 May  4 17:54 /etc/man_db.conf  # 在 2015/05/04 更新過狀態(ctime)
# 為了要讓資料輸出比較好看，所以鳥哥將三個指令同時依序執行，三個指令中間用分號 (;) 隔開即可。
# 反斜杠 \ 是一個轉義符號，它通常用於在命令行中表示命令在下一行繼續。它的作用是將多行命令合併成一行，以增加可讀性
# > 是一個重定向運算符，用於將命令的輸出保存到文件中，或者用於創建新文件並將輸出保存到該文件中。在這個上下文中，它被用來連接多個命令
# 用 ; 可以串接多個命令於同一行
```

- 在預設情況下，`ls` 顯示出來的是該檔案的 mtime，也就是這個檔案的內容上次被更動的時間
- 注意: 檔案的時間誤判的話，可能會造成某些程式無法順利的運作。
    
    萬一發現了一個檔案來自未來，該如何讓該檔案的時間變成『現在』的時刻呢？ 就用『`touch`』這個指令即可
    
- `touch` 最常使用的情境
    - 建立一個空的檔案；
    - 將某個檔案日期修訂為目前 (mtime 與 atime)
    
    ```powershell
    [root@study ~]# touch [-acdmt] 檔案
    選項與參數：
    -a  ：僅修訂 access time；
    -c  ：僅修改檔案的時間，若該檔案不存在則不建立新檔案；
    -d  ：後面可以接欲修訂的日期而不用目前的日期，也可以使用 --date="日期或時間"
    -m  ：僅修改 mtime ；
    -t  ：後面可以接欲修訂的時間而不用目前的時間，格式為[YYYYMMDDhhmm]
    
    範例一：新建一個空的檔案並觀察時間
    [dmtsai@study ~]# cd /tmp
    [dmtsai@study tmp]# touch testtouch
    [dmtsai@study tmp]# ls -l testtouch
    -rw-rw-r--. 1 dmtsai dmtsai 0 Jun 16 00:45 testtouch
    # 注意到，這個檔案的大小是 0 呢！在預設的狀態下，如果 touch 後面有接檔案，
    # 則該檔案的三個時間 (atime/ctime/mtime) 都會更新為目前的時間。
    # 若該檔案不存在，則會主動的建立一個新的空的檔案喔！例如上面這個例子！
    
    範例二：將 ~/.bashrc 複製成為 bashrc，假設複製完全的屬性，檢查其日期
    [dmtsai@study tmp]# cp -a ~/.bashrc bashrc
    [dmtsai@study tmp]# date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
    Tue Jun 16 00:49:24 CST 2015                         <==這是目前的時間
    -rw-r--r--. 1 dmtsai dmtsai 231 Mar  6 06:06 bashrc  <==這是 mtime
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 15 23:44 bashrc  <==這是 atime
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 16 00:47 bashrc  <==這是 ctime
    
    # 『ll』這個指令(兩個英文L的小寫)，這個指令其實就是『ls -l』的意思
    # 分號『 ; 』則代表連續指令的下達啦
    # 你可以在一行指令當中寫入多重指令， 這些指令可以『依序』執行
    
    範例三：修改案例二的 bashrc 檔案，將日期調整為兩天前
    [dmtsai@study tmp]# touch -d "2 days ago" bashrc
    [dmtsai@study tmp]# date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
    Tue Jun 16 00:51:52 CST 2015
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 14 00:51 bashrc
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 14 00:51 bashrc
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 16 00:51 bashrc
    # 跟上個範例比較看看，本來是 16 日變成 14 日了 (atime/mtime)～不過， ctime 並沒有跟著改變喔！
    
    範例四：將上個範例的 bashrc 日期改為 2014/06/15 2:02
    [dmtsai@study tmp]# touch -t 201406150202 bashrc
    [dmtsai@study tmp]# date; ll bashrc; ll --time=atime bashrc; ll --time=ctime bashrc
    Tue Jun 16 00:54:07 CST 2015
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 15  2014 bashrc
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 15  2014 bashrc
    -rw-r--r--. 1 dmtsai dmtsai 231 Jun 16 00:54 bashrc
    # 注意看看，日期在 atime 與 mtime 都改變了，但是 ctime 則是記錄目前的時間！
    ```
    
    要注意的是，即使我們複製一個檔案時，複製所有的屬性，但也沒有辦法複製 ctime 這個屬性的。 ctime 可以記錄這個檔案最近的狀態 (status) 被改變的時間
    

### 檔案預設權限: umask

- 呈現目前檔案預設權限目錄的預設值

```powershell
[root@study ~]# umask
0022             <==第一組是特殊權限用的, 與一般權限有關的是後面三個數字！
[root@study ~]# umask -S
u=rwx,g=rx,o=rx
# 加入 -S (Symbolic) 這個選項，就會以符號類型的方式來顯示出權限了
```

### 認識 Bash

- 其實管理整個電腦作業系統的核心 ( kernel )，這個核心是需要保護的，所以一般使用者只能透過 shell 跟核心溝通
    - kernel 不能隨便操作的原因: 所謂的作業系統這軟體是**控制整個系統**與**管理活動監測的，如果使用者隨意操作( 使用不當 )，將會導致系統崩潰**
- **硬體、核心與 Shell 的關係**
    
    舉例: 當電腦傳輸出來音樂時，電腦需要甚麼東西?
    
    1. **硬體**: 要有 “音效卡”
    2. **核心管理**: 要有這音效卡的驅動程式
    3. **應用程式 ( shell )**: 使用者輸入發出聲音的指令
    
    也就是我們需要透過 shell 來與核心管理程式 ( kernel ) 溝通，來讓硬體工作
    
- Linux ( 以 CentOS 7.x 為例 ) 內，有多少個 shell  可以供使用者使用?
    - 檢查 `/etc/shells` 這檔案下的資料
        - `/bin/sh` ( 已經被 /bin/bash ) 取代
        - `/bin/bash` ( 就是目前 Linux 預設的 shell )
        - `/bin/tcsh` ( 整合 C Shell，但提供更多個功能 )
            
            ( C Shell 寫法類似 C 語言，而 Linux 本身就是用 C 語言寫的 )
            
        - `/bin/csh` ( 已經被 /bin/tcsh 取代 )
    
     `/etc/shells` 這檔案存在的意義: 主要是在某些系統在運作的過程中會去檢查使用者能夠使用的 bash，所以才需要這樣的資料夾囉~
    
    ex: 比如某些 FTP ( File Transport Protocol ) 用於檔案傳輸與共享，若不想要使用者使用 FTP 以外的資源，則會給予該使用者一些奇怪名稱的 Shell ，使使用者無法登入主機 ( 奇怪名稱的 Shell 比如 CentOS 7.X 在 `/etc/shells` 裡頭就有個 `/sbin/nologin` )
    
- **Bash shell 的功能**
    - Linux distribution ( 指各種 Linux 版本 ) 的標準 Shell
    - 優點:
        - 相容於 sh
        - **有記憶使用過的指令能力** ( `~/.bash_history` )
        - **命令與檔案補全功能** ( `tab` 按鍵的好處 )
        - **命令別名設置的功能: alias**
            
            ```powershell
            alias lm='ls -al'
            
            #alias 是 bash 指令，可用來設定指令別名
            # 比如 上面指令的 lm 是自訂的 代表原指令 'ls -al' 的別名
            ```
            
        - **工作控制、前景背景控制 ( job control, foreground, background )**
            
            工作控制 ( job control ) 允許我們將工作丟到背景中執行，而不用擔心因誤觸 `ctrl`+`c` 不小心停掉該程序
            
        - **程式化腳本 ( shell script )**
            
            將平常管理系統要下的連續指令寫成一個檔案，也可藉由 shell 提供的環境變數及相關指令來設計，將近一個小的程式語言
            
        - **萬用字元 ( Wildcard )**
            
            bash 還支援許多的萬用字元來幫助使用者查詢與指令下達。
            
            ```powershell
            #ex: 以下方式就能知道 /usr/bin 底下有多少以 X 為開頭的檔案
            ls -l /usr/bin/X*
            ```
            
- **查詢指令是否為 Bash shell 的內建命令: type**
    
    為了方便 shell 操作，bash 本身已經”內建”許多的指令 ex: cd, umask…etc.
    
    - 使用 type 來觀察該指令是否是 bash 內建
    
    ```powershell
    [dmtsai@study ~]$ type [-tpa] name
    選項與參數：
        ：不加任何選項與參數時，type 會顯示出 name 是外部指令還是 bash 內建指令
    -t  ：當加入 -t 參數時，type 會將 name 以底下這些字眼顯示出他的意義：
          file    ：表示為外部指令；
          alias   ：表示該指令為命令別名所設定的名稱；
          builtin ：表示該指令為 bash 內建的指令功能；
    -p  ：如果後面接的 name 為外部指令時，才會顯示完整檔名；
    -a  ：會由 PATH 變數定義的路徑中，將所有含 name 的指令都列出來，包含 alias
    
    範例一：查詢一下 ls 這個指令是否為 bash 內建？
    [dmtsai@study ~]$ type ls
    ls is aliased to `ls --color=auto' <==未加任何參數，列出 ls 的最主要使用情況
    [dmtsai@study ~]$ type -t ls
    alias                              <==僅列出 ls 執行時的依據
    [dmtsai@study ~]$ type -a ls
    ls is aliased to `ls --color=auto' <==最先使用 aliase
    ls is /usr/bin/ls                  <==還有找到外部指令在 /bin/ls
    
    範例二：那麼 cd 呢？
    [dmtsai@study ~]$ type cd
    cd is a shell builtin              <==看到了嗎？ cd 是 shell 內建指令
    ```
    
- **指令的下達與快速編輯按鈕**
    
    ```powershell
    # 範例：如果指令串太長的話，如何使用兩行來輸出？ 使用反斜線\ 以及 >
    # 這個指令用途是將三個檔案複製到 /root 這個目錄下而已
    [dmtsai@study ~]$ cp /var/spool/mail/root /etc/crontab \
    > /etc/fstab /root
    ```
    
    - 利用『 `\[Enter]` 』來將 `[Enter]` 這個按鍵『跳脫！』開來，讓 [Enter] 按鍵不再具有『開始執行』的功能！好讓指令可以繼續在下一行輸入。 需要特別留意， `[Enter]` 按鍵是**緊接**著反斜線 (`\`) 的，**兩者中間沒有其他字元**。 因為 \ 僅跳脫『緊接著的下一個字符』而已！
        
        如果**順利跳脫** `[Enter]` 後，下一行最前面就會主動出現 `>` 的符號， 你可以繼續輸入指令囉！也就是說，那個 `>` **是系統自動出現的，你不需要輸入**。
        
    - 若需刪除長指令，除了使用刪除鍵逐一刪除外，也可使用以下指令
        
        
        | 組合鍵 | 功能與示範 |
        | --- | --- |
        | [ctrl]+u/[ctrl]+k | 分別是從游標處向前刪除指令串 ([ctrl]+u) 及向後刪除指令串 ([ctrl]+k)。 |
        | [ctrl]+a/[ctrl]+e | 分別是讓游標移動到整個指令串的最前面 ([ctrl]+a) 或最後面 ([ctrl]+e)。 |

### Shell 的變數功能

- 變數在 Shell 內的角色非常重要
    - 舉例: Linux 是多人多工的環境，每個人登入系統皆能取得一個 bash shell，每個人都能下達 mail 這指令來收郵件，但 mail 實際是來自哪個檔案則需要由 變數 來設置
    - 常見的環境變數: PATH, HOME, MAIL, SHELL ( 為了區別環境變數與自訂變數的差異，**環境變數皆是以大寫表示** )

### **變數的取用與設定: echo, 變數設定規則, unset**

- 使用 `echo` 可以讀取變數，但取用變數時，其變數前面要加上 `$`

```powershell
[dmtsai@study ~]$ echo $variable
[dmtsai@study ~]$ echo $PATH
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/dmtsai/.local/bin:/home/dmtsai/bin
[dmtsai@study ~]$ echo ${PATH}  
# 在變數名稱前面加上 $ ， 或者是以 ${變數} 的方式來取用
```

設定/修改 某個變數內容，用 等號(=) 連接即可

```powershell
[dmtsai@study ~]$ echo ${myname}
       <==這裡並沒有任何資料～因為這個變數尚未被設定！是空的！
[dmtsai@study ~]$ myname=VBird #設定變數對應的值
[dmtsai@study ~]$ echo ${myname}
VBird  <==出現了！因為這個變數已經被設定了！
```

- 需要注意每一種 shell 的語法都不相同，在變數的使用上，bash 在尚未設定的變數中強迫去 echo 讀取，出現的是空值，但若其他的 shell 語言，echo 不存在的變數是會出錯的

### **變數的設定規則**

- 變數與變數對應的值以 `=` 相連 ex: `myname=Bruno`
- 等號兩邊不能直接接空白字元，如範例皆是錯誤的變數賦值方式
    
    ```powershell
    # 錯誤範例 1: 等號兩邊出現空白
    myname = Bruno
    # 錯誤範例 2: 後面的值不能有空白
    myname=Bruno Yu
    ```
    
- 變數的名稱只能是**英文**字母與**數字**，但**開頭字元不能是數字**
    
    ```powershell
    # 錯誤範例
    1myname=Bruno
    ```
    
- 變數值內若有功能字元(含空白)，可以用**雙引號**或**單引號**框起來，但需要注意這兩者意義不同
    - 使用**雙引號**`” ”`框: 若雙引號內有框到特殊字元 ex: `$` 所代表的變數，**其可保留原本的特性，不會變成字串 ( 類似 js 中的 template literal 功能 )**
        
        ```powershell
        #舉例: 比如目前的變數 $LANG='zh_TW.UTF-8' 那以下變數
        var="lang is $LANG" 
        echo $var
        #回傳: lang is zh_TW.UTF-8
        ```
        
    - 使用單引號`' '` 框: 則被框的內部不管有沒有特殊字元一律皆會變成**純文字**
        
        ```powershell
        var='lang is $LANG'
        echo $var
        #回傳: lang is $LANG
        ```
        
- 可以用**跳脫字元**`\`將特殊符號(ex: `[Enter]`, `$`, `\`, `空白字元`, ‘ 等)變成一般字元
    
    ```powershell
    #比如下方範例使用跳脫字元跳脫空白字元
    myname=VBird\ Tsai
    ```
    
- 若變數內或在一連串指令中，需要其他指令來提供對應數值，可以在這指定的外面以反引號```` 或是 `$` 刮起來
    
    ```powershell
    version=$(uname -r);echo $version
    #回傳3.10.0-229.el7.x86_64
    ```
    
    - **範例**
        
        ```powershell
        例題：
        在指令下達的過程中，反單引號( ` )這個符號代表的意義為何？
        答：
        在一串指令中，在 ` 之內的指令將會被先執行，而其執行出來的結果將做為外部的輸入資訊！例如 uname -r 會顯示出目前的核心版本，而我們的核心版本在 /lib/modules 裡面，因此，你可以先執行 uname -r 找出核心版本，然後再以『 cd 目錄』到該目錄下，當然也可以執行如同上面範例六的執行內容囉。
        
        另外再舉個例子，我們也知道， locate 指令可以列出所有的相關檔案檔名，但是，如果我想要知道各個檔案的權限呢？舉例來說，我想要知道每個 crontab 相關檔名的權限：
        [dmtsai@study ~]$ ls -ld `locate crontab`
        [dmtsai@study ~]$ ls -ld $(locate crontab)
        ```
        
- 若需要擴展變數值，可用 `“$變數名稱”` 或 `${變數}` 進行累加
    
    ```powershell
    #"$變數名稱"範例
    PATH="$PATH":/home/bin
    
    #${變數}範例
    PATH=${PATH}:/home/bin
    ```
    
- 若需要該變數在其他子程序執行，需要以 `export` 來使變數變成環境變數
    
    ```powershell
    export PATH
    ```
    
    - **範例題**
        
        ```powershell
        範例五：如何讓我剛剛設定的 name=VBird 可以用在下個 shell 的程序？
        [dmtsai@study ~]$ name=VBird
        [dmtsai@study ~]$ bash        <==進入到所謂的子程序
        [dmtsai@study ~]$ echo $name  <==子程序：再次的 echo 一下；
               <==嘿嘿！並沒有剛剛設定的內容喔！
        [dmtsai@study ~]$ exit        <==子程序：離開這個子程序
        [dmtsai@study ~]$ export name
        [dmtsai@study ~]$ bash        <==進入到所謂的子程序
        [dmtsai@study ~]$ echo $name  <==子程序：在此執行！
        VBird  <==看吧！出現設定值了！
        [dmtsai@study ~]$ exit        <==子程序：離開這個子程序
        ```
        
- 通常**大寫字元為系統預設變數**，**自行設定變數可以使用小寫字元**，方便判斷
- **取消變數**的方法為 `unset 變數名稱`
    
    ```powershell
    # 取消 myname 這個變數
    unset myname
    ```
    
- **變數的應用，將常用的目錄路徑以變數命名**
    
    ```powershell
    例題：
    若你有一個常去的工作目錄名稱為：『/cluster/server/work/taiwan_2015/003/』，如何進行該目錄的簡化？
    答：
    在一般的情況下，如果你想要進入上述的目錄得要『cd /cluster/server/work/taiwan_2015/003/』， 
    [dmtsai@study ~]$ work="/cluster/server/work/taiwan_2015/003/"
    [dmtsai@study ~]$ cd $work
    未來我想要使用其他目錄作為我的模式工作目錄時，只要變更 work 這個變數即可！
    而這個變數又可以在 bash 的設定檔(~/.bashrc)中直接指定，
    那我每次登入只要執行『 cd $work 』
    ```
    

### 環境變數的功能

環境變數有許多功能 ex: 家目錄的更換、提示字元的顯示、執行檔的路徑搜尋…etc.

- 可以直接用 env 觀察

```powershell
範例一：列出目前的 shell 環境下的所有環境變數與其內容。
[dmtsai@study ~]$ env
HOSTNAME=study.centos.vbird    <== 這部主機的主機名稱
TERM=xterm                     <== 這個終端機使用的環境是什麼類型
SHELL=/bin/bash                <== 目前這個環境下，使用的 Shell 是哪一個程式？
HISTSIZE=1000                  <== 『記錄指令的筆數』在 CentOS 預設可記錄 1000 筆
OLDPWD=/home/dmtsai            <== 上一個工作目錄的所在
LC_ALL=en_US.utf8              <== 由於語系的關係，鳥哥偷偷丟上來的一個設定
USER=dmtsai                    <== 使用者的名稱啊！
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:
or=40;31;01:mi=01;05;37;41:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:
*.tar=01...                    <== 一些顏色顯示
MAIL=/var/spool/mail/dmtsai    <== 這個使用者所取用的 mailbox 位置
PATH=/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/dmtsai/.local/bin:/home/dmtsai/bin
PWD=/home/dmtsai               <== 目前使用者所在的工作目錄 (利用 pwd 取出！)
LANG=zh_TW.UTF-8               <== 這個與語系有關，底下會再介紹！
HOME=/home/dmtsai              <== 這個使用者的家目錄啊！
LOGNAME=dmtsai                 <== 登入者用來登入的帳號名稱
_=/usr/bin/env                 <== 上一次使用的指令的最後一個參數(或指令本身)
```

-