---
title: SSH 研究
description: 啥是 SSH？為啥內部 Gitlab 上要用 SSH 下載專案？
tags: ['傳輸協議']
date: 2023-06-06
type: doc
publish: true
---
# SSH 研究

- 參考文章: [https://trunk-studio.com/ssh-for-windows/](https://trunk-studio.com/ssh-for-windows/)

### 1. 甚麼是 SSH

- SSH（Secure Shell）是一個用於在計算機**網絡上安全遠程管理**和**傳輸數據的協議**和工具集。
- SSH 旨在**保護遠程通信的隱私和安全性**，並**防止第三方在通信過程中截取或竊聽數據**。
- **PTY（Pseudo-Terminal）**: 提供了一個虛擬終端（或虛擬控制台），使得在遠程伺服器上運行的程序認為它們正在與一個本地終端進行交互。這使得在遠程伺服器上運行的命令和應用程序可以正確處理用戶輸入和顯示輸出，就像在本地終端中一樣。
    
    ( 用於處理遠程 shell 會話互動性的技術。當你使用 SSH 遠程連接時，PTY 負責為你提供互動式 shell 界面，讓你能夠有效地與遠程伺服器進行交互。 )
    
- SSH 客戶端和伺服器之間的通信通常需要一個 PTY 來處理互動性。當你通過 SSH 連接到遠程伺服器時，SSH 伺服器會創建一個虛擬終端（PTY），並將你的 shell 會話（例如 Bash、Zsh 等）連接到這個虛擬終端。這樣，你就可以在遠程伺服器上運行命令、輸入數據並查看結果，就像在本地終端中一樣。
- **SSH 與 SS L( Secure Sockets Layer )/TLS ( Transport Layer Security )的差異**
    - **SSH**：**SSH 主要用於遠程登錄和安全遠程管理**。它允許用戶在遠程計算機上安全運行命令，傳輸檔案，以及建立安全的遠程 shell 會話。 ( 這是**在應用層( application layer  )**他只是 用戶管理遠端 的一種加密方式 )
    - **SSL ( Secure Sockets Layer ) /TLS ( Transport Layer Security )**：SSL 和 TLS 主要操作在傳輸層（Transport Layer），為通信連接提供端到端的加密和安全。 ( 這是**傳輸層加密 ( transport layer )**，與 SSH 完全不同 )，通常在 Web 瀏覽器和 Web 伺服器之間建立安全的數據傳輸通道，以保護在網際網路上傳輸的敏感數據

### 2. SSH 於 GitHub 上的設定

- Github 目前有提供兩種方式進行遠端 repo 操作
    - HTTPS 每次 Push 都要輸入帳密
    - SSH 只要設定一次 Public Key 之後，任何操作就不用輸入帳密，讓 Git 操作更方便
- 檢查是否有 SSH Key 存在
    - 在 windows 中的話，使用 git Bash
        
        ```powershell
        $ ls -al ~/.ssh
        total 27
        drwxr-xr-x 1 Wonder4 197121    0 Sep 23 11:02 ./
        drwxr-xr-x 1 Wonder4 197121    0 Sep 22 16:04 ../
        -rw-r--r-- 1 Wonder4 197121 2610 Aug  2  2022 id_rsa
        -rw-r--r-- 1 Wonder4 197121  578 Aug  2  2022 id_rsa.pub
        -rw-r--r-- 1 Wonder4 197121  286 Jun 26 09:32 known_hosts
        -rw-r--r-- 1 Wonder4 197121  103 Jun 26 09:32 known_hosts.old
        
        # 通常預設的公共密鑰在已下文件中其一
        # id_dsa.pub
        # id_ecdsa.pub
        # id_ed25519.pub
        # d_rsa.pub
        
        # 使用 cat 查看
        $ cat ~/.ssh/id_rsa.pub
        ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDElHfXNZ4XgYnmk6W28N3zwUlrurWeeKfabkC4mmnwRC1h0SXxJ3cZDYZ8SpwP/NMcvouqdc1xVSMXfsj+oUZOwEXR0wzYBQs+u3ZFzldQFbapDd6JaP/8BBsEbVAPigSn9wTR+uatsafZ3rv+9PSKL2XGSzPyf5++s30i+JOR4u0QbjDX95Hpt6VOn4pqtVYZa46nT6/xG1ENIaaROygN5BUF9ObGQGgWWr3CWZ3pB9uuZPoxKGfzrRd45V8aCJPOuYFPnr5emXye6QpZbNVfLS4spSQzCNhunPWLfQdDEI0qc+q/5WX0QEt9jqAQZztgdaaNsQ1ZWMTFusJxMquB3z6lgUwncmlIhdJ5yFvR8ZpzxLJs48hqU+6oANB+gBOsYXOAP3/cWpX4/LXO9ifnznTQYf8P7J8mGvQNQlS12d3KA/2dApn54Vo1p/8Tg1WsO4XoU5sggk8wTPsDWx7EZPanYIZ9TcJBTOU94GDXRgs8x+LbCyvK+LQVuydJuoE= wonder4@DESKTOP-0VCAFU6
        ```
        
- **製作 SSH Key**
    
    使用 git bash 輸入以下指令
    
    ```powershell
    $ ssh-keygen -t rsa -b 4096 -C GitHub email address
    ```
    
    - 這個**`ssh-keygen`** 指令用於生成一對 RSA 密鑰（公鑰和私鑰），以供 SSH（Secure Shell）通信使用
        - **`ssh-keygen`** 這是 SSH 密鑰生成工具的名稱，它用於生成 SSH 密鑰對
        - **`-t rsa`** 這是選項，用於指定密鑰的類型。在這裡，它指定要生成 RSA 密鑰
        - **`-b 4096`** 用於指定密鑰的位元數（key length）。在這裡，它指定要生成的 RSA 密鑰的長度為 4096 位。長度較長的密鑰通常更安全，但也需要更多的計算資源
        - **`-C GitHub email address`** 這是選項 **`-C`**，用於添加一個註釋，通常用於識別這個密鑰的用途。在這裡，它將 "GitHub email address" 添加為該密鑰的註釋。
    - 執行這個指令後，它將生成一對 RSA 密鑰，其中包括一個私鑰（private key）和一個公鑰（public key）。這些密鑰文件通常存儲在使用者的家目錄下的 **`.ssh`** 目錄中（例如 **`~/.ssh`**）。私鑰應該妥善保管，而**公鑰可以提供給 SSH 服務器**，以便你可以使用**私鑰進行身份驗證**。
        - 注意，生成 SSH 密鑰是建立安全的 SSH 連接的一個重要步驟，請確保妥善保管私鑰，不要將其外洩
- **加入 SSH-Agent**
    
    接下來於 git bash 輸入
    
    ```powershell
    $ eval $(ssh-agent -s)
    ```
    
    - **`ssh-agent -s`**：這是一個用於啟動 SSH 代理的命令。
        
        SSH 代理是一個程序，它可以管理 SSH 密鑰，並在需要時提供這些密鑰以進行身份驗證。
        
        **`-s`** 選項用於輸出環境變數設定，這些設定將由後續的 **`eval`** 命令處理。
        
    - **`eval`**：這是一個 Bash 內建命令，它用於執行 shell 命令，並將其結果放回到當前 shell 會話中。在這個上下文中，**`eval`** 用於執行 **`ssh-agent -s`** 命令的輸出。
    
    這個命令的目的是在當前的 Bash 會話中**啟動 SSH 代理**，**並將相關的環境變數設定添加到該會話中**，以便該會話能夠使用 SSH 代理進行密鑰管理和身份驗證。這對於使用 SSH 進行安全連接至遠程伺服器非常有用，**因為它允許你在一次密鑰輸入之後多次使用密鑰，而無需每次都輸入密鑰密碼。**
    
- **將 SSH Key 加入 GitHub 帳號中**
    - 輸入以下指令，**複製 SSH Key 至剪貼簿**
        
        ```powershell
        $ clip < ~/.ssh/id_rsa.pub
        ```
        
        - **`clip`**：這是 Windows 命令，用於處理剪貼板的內容。它的作用是將輸入的數據複製到剪貼板中。
        - **`<`**：這是一個重定向符號，它將文件 **`~/.ssh/id_rsa.pub`** 的內容讀取並將其作為標準輸入傳遞給 **`clip`** 命令。換句話說，它將文件的內容送到 **`clip`** 命令，使 **`clip`** 命令將這些內容複製到剪貼板中
        
        執行這個命令後，你的 SSH 公鑰的內容將被複製到 Windows 系統的剪貼板中，以便你可以在其他應用程序中粘貼它
        
        1. 至 GitHub 頁面中，點選右上頭像旁的倒三角形，點選 Settings
        2. 在左側設定列表中點選 SSH and GPG keys
        3. 選擇 New SSH key
        4. 自行設定自己想要的名稱，把前面複製的 SSH Key 貼到中間框框裡，最後選擇 Add SSH Key
        5. 選擇 Add SSH Key 後，需要輸入 GitHub 密碼做確認，確認成功後就完成把 Key 放進 GitHub 中了！

- **測試 SSH Key 連接狀況**
    - 使用 Git Bash
    - 執行這個指令的主要目的是測試 SSH 連接到 GitHub 是否成功以及是否可以正確驗證你的 SSH 金鑰
    
    ```powershell
    $ ssh -T git@github.com
    
    # 倘若驗證成功則會回傳類似以下訊息
    Hi username! You've successfully authenticated, but GitHub does not provide shell access.
    # 這表示你已成功通過 SSH 連接到 GitHub，但由於使用了 -T 選項，它不會提供互動式 shell 介面，僅顯示驗證成功的消
    ```
    
    - **`ssh`**：這是 SSH（Secure Shell）客戶端命令，用於建立安全的遠程連接。
    - **`T`**：這是一個 SSH 客戶端的選項，用於指示 SSH 不要分配伯爵（pty）給遠程伺服器，這意味著不會啟動一個交互式終端，而僅僅是確立連接。
    - **`git@github.com`**：這是你要連接的遠程伺服器的地址。在這裡，**`git`** 是使用 SSH 協議的用戶名，而 **`github.com`** 是遠程伺服器的主機名。

- 補充: **OpenSSH** 和 **PuTTY**/**Plink** 比較與說明
    - 是兩種不同的 SSH 客戶端軟體，在功能與用法上有些許差異，取決於目前所使用的操作系統或用途
    - 如果你使用 Unix 或類 Unix 系統，通常會使用 OpenSSH。如果你在 Windows 上工作，且想要圖形界面，則 PuTTY 是一個常見的選擇。
    - **OpenSSH:**
        - **平台**：**OpenSSH 是一個開源的 SSH 客戶端和伺服器軟體**，通常在 **Unix**、**Linux** 和 **macOS** 等**類 Unix 系統**中預先安裝。你可以在終端中使用 **`ssh`** 命令來啟動 OpenSSH 客戶端。
        - **命令行使用**：OpenSSH 的客戶端使用命令行界面，你需要在終端中輸入命令，並提供必要的參數和選項
        - **金鑰格式**：OpenSSH 使用的金鑰格式通常是 OpenSSH 格式（例如 **`id_rsa`** 和 **`id_rsa.pub`**），這些金鑰格式在 Unix 系統中是標準的。
    - **PuTTY/Plink**：
        - **平台**：**PuTTY 是一個跨平台的 SSH 客戶端**，**最初設計用於 Windows**，但現在也有其他平台的移植版本。**Plink 是 PuTTY 的命令行版本，通常用於自動化和腳本編寫**。
        - **圖形用戶界面**：PuTTY 提供了圖形用戶界面，使其易於使用。對於不熟悉命令行的用戶來說，這是一個較友好的選擇。
        - **金鑰格式**：PuTTY 使用的金鑰格式通常是 PuTTY 格式（例如 **`.ppk`**），這些格式在 PuTTY 中是標準的。你可以使用 PuTTYgen 工具來生成和轉換金鑰。
