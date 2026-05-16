---
title: 套件管理工具 npm、yarn、pnpm 比較研究
description: 為什麼套件管理工具有這麼多種？之間有什麼差異嗎？
tags: ['套件管理工具', 'node.js']
date: 2023-08-20
type: doc
publish: true
---
# Node 常見的套件管理工具 npm、yarn、pnpm 比較研究

- 參考文章:
    - [稀土掘金](https://juejin.cn/post/7098260404735836191)
    - [https://zhuanlan.zhihu.com/p/27449990](https://zhuanlan.zhihu.com/p/27449990)

- 大綱
    - 緣起 - 為何需要套件管理工具
        - 背景簡述
        - 目的 & 優勢
    - 常見的套件管理工具介紹 & 比較
        - npm
        - yarn
        - pnpm
        - 三者比較 & 總結
    - 三種套件管理工具的實作 & 範例

- 緣起
    - 套件管理工具是起源於 Node.js 的盛行，開始有活躍的社群以及套件陸續被開發出來，但接下來就遇到一個問題，這些開源的套件並沒有統一一套標準，且各套件間可能會有衝突或相容性或者安裝上的差異等問題，為解決這些問題最後在 Node.js 創立的隔年 ( 2010 年 ) 由 Isaac Z. Schlueter 創建了 npm ( 全名為 Node Package Manager 也就是 Node 的套件管理工具的意思 )，而自 npm 0.6 版本後，npm 也變成 Node.js 默認安裝的一部分，往後就更加普及
- 目的 & 好處
    - 而有了第三方套件建立了統一標準與提供對應的管理工具後，更帶來了以下好處
    1. 依賴管理:  幫助使用者自動安裝各種依賴，減少手動逐一下載的繁瑣性
    2. 版本控制:  可以指定符合特定版本的依賴，以避免版本間不兼容的情況
    3. 依賴關係:  可以明確依賴間的各種關係，也確保對應的依賴檔案能依照需求順序安裝
    4. 緩存套件: 可以使用本地緩存來減少重複下載依賴包，減少網路負荷
    5. 定義腳本 ( script ): 允許定義腳本指令，以方便執行建構、測試、部屬等任務，簡化開發流程
    6. 安全性: 可以幫忙檢測與修復項目中的已知漏洞，提供專案的安全性
    7. 共享套件: 方便開發者將自行開發的套件分享 & 發佈到公有或私有的儲存庫( repository ) 中，方便他人使用
    8. 豐富生態系: 藉由分享與取用開發者彼此的套件工具，豐富了 JavaScript 的開發生態圈，也使生態圈有更多的資源可以利用
    
    總而言之，套件管理工具不但簡化了 JavaScript 此語言對於依賴管理間的複雜性以及精簡了開發流程，幫助開發者更有效率的建構與維護專案，同時也提供了更好的版本控制以及安全性，是現行前端開發不可或缺的工具
    
- 常見的套件管理工具介紹 & 比較
    - **npm** ( Node Package Manager ): 最早被發明 ( 2010 ) 也是最普遍的套件管理工具，擁有豐富的開源社群生態，只要下載 Node 就會自動下載支援該版本對應的 npm 套件
        - 官網 ( [https://www.npmjs.com/about](https://www.npmjs.com/about) )
        
        ```powershell
        // 常見指令
        npm init # 建立 package.json
        npm install # 安裝 package.json 所列的套件 或是 後面接對應的套件名稱代表安專該套件
        
        ...
        ```
        
    - **yarn**: Facebook 於 2016 年發布開源的套件管理工具，其目的是為了解決當時 npm 版本的缺陷，其有著相較於 npm 更語意化的指令以及快速的安裝速度
        - 相較於 npm，yarn 的好處
            - 版本鎖定: 使用 yarn.lock 固定&紀錄套件的準確版本 ( npm 要到 npm5 後才有 )
            - 全域緩存: yarn 有全域儲存套件的特性，因此帶來了以下兩個好處
                - 安裝速度較 npm 快很多，同樣版本的套件不需要因為換專案而重複下載
                - 減少網路的負荷，甚至可以在離線中靠緩存來完成安裝
            - 更簡潔 & 語意化的指令  ( ex:  yarn add/remove )
            - 並行安裝: 支援同時多個套件同時下載與安裝，極大地加快了下載 & 安裝的效率與速度 ( npm 要到 npm7 後才支援 )
            - 支援工作區 ( workspace ) 的建立: 方便多個專案共用依賴/套件的管理
        - 官網 ( [https://yarnpkg.com/getting-started/install](https://yarnpkg.com/getting-started/install) )
        
        ```powershell
        # yarn 與 npm 命令比對
        npm install === yarn 
        npm install taco --save === yarn add taco
        npm uninstall taco --save === yarn remove taco
        npm install taco --save-dev === yarn add taco --dev
        ```
        
    - pnpm: 為 performant npm 的簡稱，意思為高性能的 node 套件管理工具，由 Zoltan Kochan 於 2017 年發佈，具有安裝速度快、節省磁碟空間等特點
        - 相較於 npm，pnpm 的好處
            - 減少硬碟儲存空間: 利用硬連結 ( hard link 類似於絕對位置的概念 ) 與符號連結 ( 類似於相對位置的概念 ) 概念，意味著同樣版本的依賴只會有一份，而不會因為專案不同而各下載一份，極大的縮小這些依賴佔磁碟的空間
            - 版本鎖定: 可以指令 package.json 中的版號 ( npm 要到 npm5 後才有 )
            - 全局緩存: 類似 yarn，pnpm 會在全局緩存已下載過的依賴/套件，減少重複下載的時間
            - 並行安裝: 支援同時多個套件同時下載與安裝，極大地加快了下載 & 安裝的效率與速度 ( npm 要到 npm7 後才支援 )
            - 支援工作區 ( workspace ) 的建立: 方便多個專案共用依賴/套件的管理
        - 官網 ( [https://pnpm.io/zh-TW/installation](https://pnpm.io/zh-TW/installation) )
        
        ```powershell
        # 若熟悉 npm 或 yarn 指令，可以很快上手 pnpm，這兩個指令有很大的相似性
        npm install === pnpm install
        npm install taco  === pnpm add taco  ===  pnpm install taco 
        npm uninstall taco === pnpm remove taco === npm uninstall taco
        npm install taco --save-dev  === pnpm remove -D taco === pnpm install taco --save-dev
        ```
        
- **三種套件管理工具的應用場景與使用指令**
    - npm 各種套件平台
    - npm ( [延伸閱讀](https://linyencheng.github.io/2022/09/27/relationships-between-frontend-and-backend/tool-npm/#google_vignette) )
        - 不須另外安裝，在安裝 Node 時就會自動安裝對應支援的 npm 版本
        - 初次建立專案
            
            ```powershell
            npm init # 建立 package.json
            npm install 套件名稱 # 縮寫是 npm i 套件名稱
            
            # 範例，以安裝 lodash 套件為例
            npm i lodash # 將套件安裝在專案環境
            npm i lodash -g # 將套件安裝在全域環境，g 是 global 的縮寫
            npm i lodash@4.17.1 # 安裝指定版本套件
            npm i lodash --save # 安裝並加入 dependencies
            npm i lodash --save-dev # 安裝並加入 devDependencies
            npm unistall lodash # 在專案環境將套件解除安裝
            ```
            
        - 從代碼託管平台 ( ex: GitHub, GitLab, Bitbucket … etc. ) 下載對應專案
            
            ```powershell
            git clone https://github.com/yarnpkg/berry.git #後面這串 url 改成你的目標 repo url
            npm install # 縮寫是 npm i 安裝 專案內 package.json 所列的套件
            npm run [script] # 執行 script 定義的指令 ex: 執行開發環境的 npm run dev
            ```
            
    - yarn ([延伸閱讀](https://classic.yarnpkg.com/en/docs/migrating-from-npm))
        - 安裝 yarn
            
            若未安裝 Node.js 先去安裝，待安裝後在終端機後逐一下以下指令
            
            ```powershell
            npm install -g yarn # 安裝 yarn 套件 (全域安裝)
            yarn --version # 查看 yarn 的版本，確定有安裝成功
            ```
            
        - 初次建立專案
            
            ```powershell
            yarn init # 功能同為 npm init
            yarn add 套件名稱 # 功能同 npm install 套件名稱
            
            # 範例，以安裝 lodash 套件為例
            yarn add lodash # 功能同 npm i lodash --save 代表安裝並加入 dependencies
            yarn add lodashh@4.17.1 #  功能同 npm i lodash@4.17.1 代表安裝指定版本套件
            yarn add lodash --dev # 功能同 npm i lodash --save-dev 代表安裝並加入 devDependencies
            yarn remove lodash # 功能同 npm unistall lodash 代表在專案環境將套件解除安裝
            ```
            
        - 從代碼託管平台 ( ex: GitHub, GitLab, Bitbucket … etc. ) 下載對應專案
            
            ```powershell
            git clone https://github.com/yarnpkg/berry.git #後面這串 url 改成你的目標 repo url
            yarn install # 縮寫是 yarn 安裝 專案內 package.json 所列的套件
            yarn run [script] # 同為 npm run [script] 代表執行 script 定義的指令
            ```
            
    - pnpm
        - 安裝 pnpm
            
            若未安裝 Node.js 先去安裝
            
            ```powershell
            npm install -g pnpm # 安裝 pnpm 套件 (全域安裝)，直接下的話以現有 pnpm 版本需要使用 Node.js 16.14 以上
            pnpm --version # 查看 pnpm 的版本，確定有安裝成功
            ```
            
        - 初次建立專案
            
            ```powershell
            pnpm init # 建立 package.json
            pnpm install 套件名稱 # 也可以用 pnpm add 套件名稱，縮寫是 pnpm i 套件名稱
            
            # 範例，以安裝 lodash 套件為例
            pnpm i lodash # 將套件安裝在專案環境
            pnpm i lodash -g # 將套件安裝在全域環境，g 是 global 的縮寫
            pnpm i lodash@4.17.1 # 安裝指定版本套件
            pnpm i lodash --save # 也可以用 pnpm add loadsh 代表安裝並加入 dependencies
            pnpm i lodash --save-dev # 也可以用 pnpm add -D loadsh 代表安裝並加入 devDependencies
            pnpm unistall lodash # 也可以用 pnpm remove lodash 在專案環境將套件解除安裝
            ```
            
        - 從代碼託管平台 ( ex: GitHub, GitLab, Bitbucket … etc. ) 下載對應專案
            
            ```powershell
            git clone https://github.com/yarnpkg/berry.git #後面這串 url 改成你的目標 repo url
            pnpm install # 代表安裝專案內 package.json 所列的套件
            pnpm run [script] # 同為 npm run [script] 代表執行 script 定義的指令
            ```
            

- 使用 ni 來代替 npm/yarn/pnpm
    - 看到以上的 npm / yarn /pnpm 指令介紹是否讓你覺得頭昏腦脹呢? 而 ni 就是知名大神 [antfu](https://github.com/antfu/ni)來解決這個問題，不論專案用哪一個套件管理工具，你都可以使用 ni 來還原專案
    - ni 會去檢查專案的 lockfile 來決定安裝模式，比如: 遇到 package.json 就用 npm，遇到 pnpm 就用 pnpm-lock.yaml …etc.
    - 安裝 ni
        
        ```powershell
        npm i -g @antfu/ni
        ```
        
    - 從代碼託管平台 ( ex: GitHub, GitLab, Bitbucket … etc. ) 下載對應專案
        
        ```powershell
        git clone https://github.com/yarnpkg/berry.git #後面這串 url 改成你的目標 repo url
        ni # 代表 install 意思，也就等於 npm install, yarn install, pnpm, install
        ni lodash # 代表安裝 lodash 套件
        nr [script] # 同為 npm run [script], yarn run [script], pnpm run [script] 代表執行 script 定義的指令
        nun lodash # 代表解除安裝 lodash 套件，同為 npm uninstall lodash, yarn remove lodash, pnpm remove loadsh
        nun -g lodash # 全域解除安裝 lodash 套件
        ```
        
    - 延伸閱讀: **[一個 ni 搞定安裝？！用 ni 來取代你的 npm/yarn/pnpm/bun 吧！](https://israynotarray.com/nodejs/20221127/2847196536/)**