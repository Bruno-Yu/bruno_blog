---
title: TypeScript 研究
description: 不喜歡 JavaScript 的放蕩不羈，動不動就變心，不如來試試 TypeScript 吧～
tags: ['TypeScript']
date: 2023-11-03
type: doc
publish: true
---
## 一、甚麼是 TypeScript

TypeScript 是一種程式語言，同時也是 JavaScript 的超集 ( superset )，換句話說，任何有效的 JavaScript 都算是有效的 TypeScript 代碼。其也引入了靜態的型別檢查、型別定義，其也提供了介面提示、跳轉到定義等等功能。而這些也讓代碼更具有可讀性、可維護性。也由於引入了靜態類型，使它具有一些 JavaScript 不具備的編譯時檢測功能。因此，雖然它可以被視為 JavaScript 的超集，但同時它也是一種獨立的程式語言，擁有自己的語法和語意。

TypeScript 是由 Microsoft 開發並開源 ( [GitHub](https://github.com/Microsoft/TypeScript) ) ，其主要提供了型別系統外也支援 ES6 ，而除了在 Microsoft 內被廣泛使用外，Google 的 Angular2 也使用了 TypeScript 作為其開發語言，而後來出的 Vue3 與 Nuxt3 這些前端框架的底層也都使用 TypeScript 所撰寫，也因此這些框架也更好的支援 TypeScript 的運作。

```
所謂超集 ( superset )
是指一種語言包含另一種程式語言的所有特性，在這案例上 TypeScript 包含所有 JavaScript 的特性，因此被視為超集。
```

### 1-1. TypeScript 有甚麼好處?

**減少程式碼出錯的概率以及提高程式碼的可維護性**

- 型別註解其實也是最好的說明文件，大部分函式的功能可以藉由查看型別的註解而大致了解其功能
- 可以在開發前期的編譯階段就發現大部分的錯誤，有效減少後續的除錯時間
- 增強了 IDE 功能，比如型別提示、介面提示… etc. 等

**擁有高包容性與彈性**

- 即使 TypeScript 編譯時跳出型別錯誤提示，也可以正常產出 JavaScript 的檔案
- 即使不特別定義型別，期也能夠自動作出型別推論
- 可以定義從簡單到複雜幾乎一切的型別
- 與第三方函式庫相容性良好，即便其非 TS 所寫，也可以自行編寫型別檔案供 TypeScript 運作，但大部分的第三方函式庫都有提供給 TypeScript 的型別定義檔案

### 1-2. **安裝 TypeScript**

TypeScript 在 terminal 的安裝指令如下

```powershell
#在全域安裝 typescript
npm install -g typescript

#查看 typescript 版本
npm view typescript version
```

- 接下來隨意創一個專案新資料夾，並於其中創建一份 ts 檔，如下範例
    
    ```tsx
    
    // index.ts
    function helloWorld():string {
        return 'hello world';
    }
    const whatTheFuck:string = 'what the fuck is this world?'
    console.log(helloWorld(), whatTheFuck)
    ```
    
- 直接在terminal 中下， tsc 指令後接 ts 檔的名稱 ，則會將該 ts 檔進行編譯並產生對應的 js 檔
    
    ```powershell
    #將該 ts 檔編譯成 js
    tsc index.ts
    
    #若想指定編義的 js 版本可以下
    tsc index.ts -target es6
    ```
    
    - 編譯結果如下
        - 補充: typeScript 編譯完預設是 ES3 或 ES5 ( 但可以自訂 )，而 const 與 let 是 ES6 的語法，所以這邊會轉換成 var
    
    ```powershell
    function helloWorld() {
        return 'hello world';
    }
    var whatTheFuck = 'what the fuck is this world?';
    console.log(helloWorld(), whatTheFuck)
    ```
    

**TypeScript 會進行靜態檢查，若編譯時中間出現型別錯誤，也會報錯，但不會耽誤其產生編譯後的檔案。**

- ts 錯誤範例

```tsx
// index.ts

function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = [0, 1, 2];
// 將 array type 放入原為 string type 的 sayHello 函式
console.log(sayHello(user));
// 上面這段在 ts 編譯前的靜態檢查會如 eslint 中檢查錯誤般產生紅色毛毛蟲的以下訊息
//Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

- 若直接執行編譯成 js  的指令，也會出現以下錯誤信息

```
index.ts:7:22 - error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

- 雖然出現錯誤訊息，但 ts 還是會產生對應的 js 檔如下

```jsx
// index.js

function sayHello(person) {
    return 'Hello, ' + person;
}
var user = [0, 1, 2];
// 將 array type 放入原為 string type 的 sayHello 函式
console.log(sayHello(user));
```

結論是: TypeScript 編譯的時候即使報錯了，還是會產生編譯後的 js 結果，我們也可以正常的使用其編譯後的檔案

若要強行要求 ts 在編譯時遇到錯誤就終止 js 檔的產生 ，可以在 `tsconfig.json` 中配置 `noEmitOnError`

## 二、基礎語法

### 2-1. 原始資料型別

這邊主要介紹 javaScript 中的五種原始資料型別: boolean( 布林 ), number( 數值 ), string( 字串 ), null, undefined

- **布林值 ( boolean  )**
    
    ```tsx
    // boolean ts example
    let isGood: boolean = true;
    ```
    
    但須注意，若使用建構式 new Boolean 其所建立的型別並非布林值 ( 建構函式會返回一個物件 )
    
    ```tsx
    let builtByNewBoolean: boolean = new Boolean(-234)
    
    // 編譯時會出現以下錯誤
    // Type 'Boolean' is not assignable to type 'boolean'.
    //'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
    ```
    
    但不要與只加 Boolean 但沒有加建構函式的 new 結果搞混了
    
    ```tsx
    // 直接呼叫 Boolean 也可以返回一個 boolean 型別：
    let createdByBoolean: boolean = Boolean(1);
    ```
    
- **數值 ( number )**
    
    ```tsx
    // index.ts
    let decLiteral: number = 6; // 十進制的語法 js 一直都支援
    let hexLiteral: number = 0xf00d; // 十六進制的語法 js 一直都支援
    let binaryLiteral: number = 0b1010;//二進制的語法 ES6 之後才支援
    let octalLiteral: number = 0o744;//八進制的語法 ES6 之後才支援
    let notANumber: number = NaN;
    let infinityNumber: number = Infinity;
    ```
    
    - 編譯產生的 js 結果如下
    
    ```jsx
    // index.js
    var decLiteral = 6; // 十進位轉換沒問題
    var hexLiteral = 0xf00d; // 十六進位轉換沒有問題
    var binaryLiteral = 10; // 二進位會被轉換成十進位
    var octalLiteral = 484; // 八進位會被轉換成十進位
    var notANumber = NaN;
    var infinityNumber = Infinity;
    ```
    
- **字串 ( string )**
    
    ```tsx
    // index.ts
    let name: string = 'John';
    let age: number = 25;
    let literalTemplateExample = `My fuck up colleague ${name} is ${age}`; // 樣板字面值(ES6支援)
    ```
    
    - 編譯後
    
    ```jsx
    // index.js
    var name = 'John';
    var age = 25;
    var literalTemplateExample = "My fuck up colleague ".concat(name, " is ").concat(age); //樣板字面值 會被轉換
    ```
    
- **Null 和 Undefined**
    
    ```tsx
    // 在 ts 中 undfined 與 null 其本身就是型別
    let u:undefined = undefined;
    let n:null = null;
    ```
    
    - **undefined 與 null 比較特別是所有型別的子型別**，也就是若 undefined 型別的變數賦值給其他型別的變數不會出錯
        
        ```tsx
        let num: number = undefined;
        // 雖然會出現紅色毛毛蟲的警告 "Type 'undefined' is not assignable to type 'number'"
        // 但編譯時不會出錯
        
        // 若改為如下方這樣，則與上方的情況一樣
        let u: undefined;
        let num: number = u;
        // 雖然會出現紅色毛毛蟲的警告 "Type 'undefined' is not assignable to type 'number'"
        // 但編譯時不會出錯
        ```
        
        - 但若是 void 的話編譯時會報錯
        
        ```tsx
        let u: void;
        let num: number = u;
        // 除了會出現紅色毛毛蟲的警告 "Type 'void' is not assignable to type 'number'"
        // 編譯時也會出現錯誤 error TS2322: Type 'void' is not assignable to type 'number
        ```
        
- **void 值**
    
    在原生 JavaScript 中沒有 void 值的概念，而在 TypeScript 中，void 表示不返回任何值的函式
    
    ```tsx
    function alertNotice(): void {
        alert('My name is John Doe');
    }
    ```
    
    而 void 型別的變數只能被 undefined 或 null 賦值
    
    ```tsx
    let unusable: void = undefined;
    ```
    

### 2-2. 任意值 ( any )

any 型別，也就是該變數允許被任何型別所賦值

- **any 型別的變數，允許被任何型別的值所賦值** ( 一般來說在宣告時指定特定型別的變數，其後型別也不能改變 )
    
    如果是一般的型別，是不允許在賦值過程中改變變數的型別
    
    ```tsx
    let myLuckyNumber: string = 'seven';
    myLuckyNumber = 7
    // 編譯時會出錯 Type 'number' is not assignable to type 'string'.
    ```
    
    但若是 any 型別，則可被任何型別賦值
    
    ```tsx
    let myLuckyNumber: any = 'seven';
    myLuckyNumber = 7
    ```
    
- **any 型別可以呼叫方法或更改內部屬性也不會出現 ts 編譯錯誤情形**
    
    ```tsx
    let anyThing: any = 'hello';
    console.log(anyThing.myName);
    console.log(anyThing.myName.firstName)
    anyThing.setName('Jerry');
    anyThing.setName('Jerry').sayHello();
    ```
    
- **在變數宣告且未賦值時，若沒有特別為其定義型別，則會被 ts 自動判定為 any 型別**
    
    ```tsx
    let something; // 會被自動判定成 type any
    something = 'seven';
    something = 7;
    
    something.setName('Tom');
    // 上面代碼同等於下
    let something: any;
    something = 'seven';
    something = 7;
    
    something.setName('Tom');
    ```
    

### 2-3. 型別推論 ( Type Inference )

- 若宣告變數時沒有明確指定其對應的型別，那麼 TypeScript 會依照其對其初次所賦值的值來推論出對應的型別。
- 型別推論範例 & 說明
    
    ```tsx
    // 以下程式碼雖然沒有指定型別，但是會在編譯時報錯
    // 就是因為 ts 的型別推論，預判了 luckyNumber 只會是字串
    let luckyNumber = 'six';
    luckNumber = 6;
    
    // 編譯時會跳出錯誤信息
    // index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    
    // 換句話說，在 ts 的眼裡上方代碼與下方相等
    let luckyNumber:string = 'six';
    luckNumber = 6;
    ```
    
- 之前提到的若宣告時沒有賦值，則會被 typescript 認定其型別為 any 也是因為 typescript 中的型別推論 ( type inference ) 這特性所導致
    
    ```tsx
    let luckyNumber; // 變數只宣告不賦值，會被判定為 any 
    luckyNumber = 'six';
    luckyNumber = 6;
    
    // 上方代碼可以正常被編譯，因為 typescript 認定該型別為 any
    // 上方代碼在 typescript 眼中與下方相同
    let luckyNumber: any;
    luckyNumber = 'six';
    luckyNumber = 6;
    ```
    

### 2-4. **聯合型別 ( Union Type )**

所謂的聯合型別，是指同一變數可以賦予多種可能的型別，型別與型別間用 `|` 區隔

- 聯合型別範例
    
    ```tsx
    let unionTypeTest: void| boolean| number; 
    // 代表了 unionTypeTest 只能是 void 或 boolean 或 number 這三種型別
    unionTypeTest = 7; // 屬於上方三種型別內，所以編譯時不會跳錯
    unionTypeTest = 'seven'; // string 不屬於上方三種型別，所以編譯時會跳錯誤
    // 錯誤信息: Type '"seven"' is not assignable to type 'number | boolean | void'.
    ```
    
- 但需要注意使用聯合型別時其對應的屬性與方法
    
    ```tsx
    // 若是使用聯合型別內的共有方法則沒問題
    function getString(something: string | number): string {
        return something.toString(); // toString 是 string 與 number 所共有
    }
    
    // 但若該方法只有單一型別有，則 typescript 會報錯 情況一
    function getLength(something: string | number): number {
        return something.length;
    }
    
    // 編譯時會跳出以下錯誤
    // Property 'length' does not exist on type 'string | number'.
    // Property 'length' does not exist on type 'number'.
    
    // 但若該方法只有單一型別有，則 typescript 會報錯 情況二
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    console.log(myFavoriteNumber.length); // 5
    myFavoriteNumber = 7;
    // ------- 以上代碼在編譯時不會報錯
    console.log(myFavoriteNumber.length); 
    // 但由於 7 是 number，而 number 中沒有 length 方法，所以會報錯
    // ts 編譯時的錯誤訊息: error TS2339: Property 'length' does not exist on type 'number'.
    ```
    

### 2-5. 物件的型別 ( Interface )

在 typescript 中我們用介面 ( interface ) 來定義物件的形狀 ( 物件內部屬性的型別 )

**interface 的功能**:

- 抽象出類 ( classes ) 的型別，但具體邏輯仍是要具體撰寫 class 去實現
    - **說明範例**
        
        ```tsx
        // 基礎 class 使用 interface 範例
        interface Shape {
            area(): number;
        }
        
        // implements 是為 class 套用對應的型別，這裡的型別介面是 Shape
        class Circle implements Shape {
            constructor(private radius: number) {}
        	// 根據 Shape ineterface，此 class 內部要有 area() 函式並回傳 number 型別
            area(): number {
                return Math.PI * this.radius ** 2;
            }
        }
        
        // 若 class 內部有比 ineterface 定義的更多屬性 => 允許，typescript 編譯不會報錯
        class Circle implements Shape {
            constructor(private radius: number) {}
        
            area(): number {
                return Math.PI * this.radius ** 2;
            }
            amICute(): boolean { // 不在 Shape interface 中
                return true;
            }
            nameTag: string = 'circle'; // 不在 Shape interface 中
        }
        
        // 若 class 內部屬性與 ineterface 定義的型別屬性還要少 =>  不允許，編譯會報錯
        
        class Square implements Shape {
            constructor(private sideLength: number) {}
        
            amICute(): boolean {
                return true;
            }
        }
        // error TS2420: Class 'Square' incorrectly implements interface 'Shape'.
        // Property 'area' is missing in type 'Square' but required in type 'Shape'.
        
        // 若 class 內部屬性與 ineterface 定義的型別不同 =>  不允許，編譯會報錯
        class Square implements Shape {
            constructor(private sideLength: number) {}
        
            area(): string { // 此與 Shape interface 定義的 type number 不同
                return 'I like string';
            }
        }
        // 這邊的 Square 在 typescript 被編譯時會報錯，如下訊息
        // error TS2416: Property 'area' in type 'Square' is not assignable to the same property in base type 'Shape'
        // Type '() => string' is not assignable to type '() => number'.
        // Type 'string' is not assignable to type 'number'.
        
        ```
        
- 物件 ( object ) 的形狀 ，定義物件內的屬性該是甚麼型別，定義了該物件的結構
    - **說明範例**
        
        ```tsx
        // 基礎 object 使用 interface 範例
        interface Person {
            name: string;
            age: number;
        }
        //  使用範例
        let richard: Person  = {
            name: 'Richard',
            age: 40
        }
        
        // 若 object 內部有比 ineterface 定義的更多屬性 => 不允許，編譯會報錯
        let sam: Person = {
            name: 'Sam',
            age: 24,
            gender: undefined,
        };
        //  error TS2322: Type '{ name: string; age: number; gender: undefined; }' is not assignable to type 'Person'.
        // Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
        
        // 若 object 內部有比 ineterface 定義的更少的屬性 => 不允許，編譯會報錯
        let tom: Person = {
            name: 'Tom'
        };
        // error TS2741: Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
        
        //若 object 內部有與 ineterface 定義的型別不同 =>  不允許，編譯會報錯
        let barbie:Person = {
            name: 'barbie',
            age: 'twentyFive'
        }
        // Type 'string' is not assignable to type 'number'
        //  The expected type comes from property 'age' which is declared here on type 'Person'
        ```
        

**interface 內功能屬性寫法介紹**

- **可選屬性 (?)**
    
    當該屬性並非必要存在，則可用可選屬性的寫法 ( `?` )
    
    ```tsx
    interface Person {
        name: string;
        age?: number;
    }
    
    // 沒有 interface 的 age 也可以正常編譯
    let tom: Person = {
        name: 'Tom'
    };
    
    // 有 interface 的 age 仍可以正常編譯
    let sam: Person = {
        name: 'Sam',
    		age: 24,
    };
    ```
    
- **任意屬性 (**索引簽名**)**
    
    當我們希望介面中不要只受限於定義的屬性，而希望依具體情況進行擴充時可以使用
    
    ```tsx
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any; // 這寫法是 index Signature
    }
    ```
    
    ```
    補充說明: 索引簽名 ( index Signature )
    通常會用陣列的中括號將對應屬性括住，而其代表的是該屬性為動態的，不必具體列舉對應屬性與型別
    舉上方範例所使用的 [propName: string]: any 來說，括號內的 propName 為定自變數名稱，
    後方的 string 代表此屬性名稱的型別為字串，而陣列後的 any 代表其對應的值為 any
    ```
    
    另外要特別注意的是 index Signature 所對應值型別需涵蓋該 interface 內所定義屬性的所有類型否則在 typescript 編譯時會跳出錯誤信息，如下範例
    
    ```tsx
    interface Person {
        name: string;
        age: number;
        [propName: string]: string; // 若在 index signature 未涵蓋 age 的 number 型別
    }
    
    // 編譯時會出現以下錯誤信息
    //   error TS2411: Property 'age' of type 'number' is not assignable to 'string' index type 'string'.
    
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    
    // 編譯時會出現以下錯誤信息
    //  error TS2322: Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
    // Property 'age' is incompatible with index signature.
    // Type 'number' is not assignable to type 'string'.
    ```
    
- **唯讀屬性** ( readonly )
    
    若我們希望物件中的部分屬性只有在建立該物件時被賦值，其後不能更改或另行寫入的話，可以用這方法處理屬性
    
    ```tsx
    interface Person {
        readonly id: number;
        name: string;
    }
    
    let tom: Person = {
        id: 89757,
    };
    
    tom.id = 9527; // 編譯後會出現錯誤
    //  error TS2540: Cannot assign to 'id' because it is a read-only property.
    ```
    ### 2-6. 陣列的型別

註: 此章節所提到的泛型寫法後面會更深入地提及

- 同一型別的陣列
    
    ```tsx
    // 若是想建立只有 number 的陣列 (若有非 number的內容在編譯時就會跳錯)
    // 正確建法
    let allNumbersArray: number[] = [1, 2, 3, 4, 5];
    
    // 若中間有非 number 的值編譯時會跳錯
    let allNumbersArray: number[] = [1, 2, 3, 4, 5, 'six'];
    // error TS2322: Type 'string' is not assignable to type 'number'.
    
    // 若用 push 加入不同的型別於 number 的陣列中，同樣會跳錯
    allNumbersArray.push('six')
    // error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
    
    // 另一種寫法，使用 Array 的泛型寫法
    let allNumbersArray: Array<number> = [1,2,3,4,5]
    ```
    
- 不同型別的陣列
可以用聯合型別表示
    
    ```tsx
    // 若是想建立的陣列內有 數字與字串兩種類型
    // 使用聯合型別如下寫法
    let mixedArray: (number | string)[] = [1, "two", 3, "four", 5];
    
    // 也可以使用陣列泛型的寫法
    let mixedArray: Array<number | string> = [1, "two", 3, "four", 5];
    ```
    
- 多維陣列寫法
    
    ```tsx
    // 比如我們需要一個只有數字陣列的陣列
    // 讓我們拆解下與上方範例一樣 number[] 代表內含數字的數字陣列
    // 而 number[][] 就是內含數字陣列的陣列 
    let matrix: number[][] = [
    	[1, 2, 3],
    	[4, 5, 6],
    	[7, 8, 9]
    ]
    // 也可以使用泛型寫法
     let matrix: Array<Array<number>> = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    ```
    
- 若是不想限定陣列內值的類型一樣也可以用 any
    
    ```tsx
    let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
    ```
    
- 用介面 ( interface )  來表示陣列 ( 較少用 )
    
    ```tsx
    // 陣列還有一種較少使用的做法是用介面表示陣列型別，大部分使用在類陣列上
    // 比如若想要建立一個內部只有數字的陣列，可以這樣寫
    interface NumberArray {
    		// 這邊與 index signature 很像，差別是這邊的中括號內型別是 number
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 1, 2, 3, 5];
    ```
    

**補充: 類陣列型別**

在原生的 javaScript 中不止有陣列，也有類陣列的類型，而由於這些類陣列並非純陣列，因此並不適用正常陣列型別的定義方式，大都是以 interface 來定義的 ( 與上方使用 interface 來表示陣列型別寫法相近 )

而常用的類陣列 typescript 已幫我們定義了其型別介面 ex: IArguments, NodeList, HTMLCollection …

其中 `IArguments` 是 TypeScript 中定義好了的型別，它實際上就是：

```tsx
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

// 而 js 函式中代表帶入參數的關鍵字 arguments 就是屬於此類陣列類型，因此也可以這樣寫
function sum() {
	let args: IArguments = arguments;
}
```

### 2-7. 函式的型別

- **一般函式的 Typescript 寫法範例**
    
    一般函式的函式建立有兩種方式: 1. 函式宣告 ( function declaration ) 2. 函式表示式 ( function expression )
    
    ```tsx
    // 1. function declaration example
    function sum(x: number, y: number): number {
        return x + y;
    }
    
    // 正確寫法
    sum(1, 2);
    
    // 參數不能多帶，要與上方設置的函式一樣不然會編譯報錯
    sum(1, 2, 3);
    // error TS2554: Expected 2 arguments, but got 3.
    
    // 參數也不能少帶，要與上方設置的函式一樣不然會編譯報錯
    sum(1);
    // error TS2554: Expected 2 arguments, but got 1.
    
    // 2. function expression example
    
    let mySum = function (x: number, y: number): number {
        return x + y;
    };
    
    // 與 function declaration 相同，型別設定是兩個參數，則不能只帶一個或多帶
    mySum(1, 2); // 正確
    mySum(1, 2, 3); // 錯誤 error TS2554: Expected 2 arguments, but got 3.
    mySum(1); // 錯誤 error TS2554: Expected 2 arguments, but got 1.
    ```
    
    補充: 箭頭函式的寫法
    
    ```tsx
    
    // 型別與邏輯分開的寫法
    // 先定義型別
    type SumFunction = (x: number, y: number) => number;
    
    // 使用上寫法一
    let mySum: SumFunction = function (x, y) {
        return x + y;
    };
    //使用上寫法二
    let mySumArrow: SumFunction = (x, y) => x + y;
    
    // 型別與邏輯寫在一起
    let mySum: (x: number, y: number) => number = (x, y) => x + y;
    // 說明  (x: number, y: number) => number 是型別定義放在變數冒號後方
    // 後面這段是函式具體邏輯定義 (x, y) => x + y;
    
    ```
    
- 用 interface 的寫法來定義函式
    
    函式也可以用 interface 來定義，寫法範例如下
    
    ```tsx
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    
    let mySearch: SearchFunc = (source, subString)=> (source.search(subString)!== -1)
    
    mySearch('let get some food', 'food')
    ```
    

- **可選參數 ( optional parameter )**
    
    前面有提到，若函式定義參數 ( 引數 ) 後，所傳入的參數必須與型別定義的比數相同，但若要設定可有可無的參數的話，可以使用可選參數的型別寫法
    
    注意: 可選參數一定要放在必須參數後面
    
    ```tsx
    function returnFullName(firstName:string, lastName?:string):string {
        if(lastName){
            return `${firstName} ${lastName}`
        }
        return firstName
    }
    
    returnFullName('Jay') // 可以正常編譯
    
    returnFullName('Jay', 'chou') // 可以正常編譯
    
    returnFullName('Jay', 'chou', 'smart') // 會跳錯 error TS2554: Expected 1-2 arguments, but got 3
    
    returnFullName() // 會跳錯 error TS2554: Expected 1-2 arguments, but got 0.
    
    // 但若是將上方的範例改成必須參數放在可選參數的後面呢? 
    // 則會跳出編譯錯誤的信息
    function returnFullName(firstName?:string, lastName:string):string { 
    // 會跳錯 error TS1016: A required parameter cannot follow an optional parameter.   
    	 if(firstName){
            return `${firstName} ${lastName}`
        }
        return lastName
    }
    
    returnFullName('Jay') // Expected 2 arguments, but got 1.
    
    returnFullName('Jay', 'chou')
    ```
    
- 參數預設值
    
    在 javascript ( ES6 ) 中 我們可以在函式的參數部分帶入預設值，這在 typescript 中也是可以的
    
    ```tsx
    function returnFullName(firstName:string='John', lastName:string='Doe'):string {
        if(firstName){
            return `${firstName} ${lastName}`
        }
        return firstName
    }
    
    returnFullName('Jay') // 有設定預設值後，只帶一個參數亦可以正常編譯，不會報錯
    returnFullName( undefined, 'chou') // 只給第二個參數也 ok
    
    returnFullName('Jay', 'chou') // 帶入函式預設的兩個參數更沒問題
    ```
    
- **剩餘引數**
    
    在原生 javascript ( ES6 ) 可以使用 …rest 的方式從函式的帶入參數中獲取剩餘的參數 ( 引數 )，用此方法只要知道後續可能會有的參數型別，基本上若有多帶參數也不會有 ts 編譯上的問題
    
    ```tsx
    // 剩餘引數的範例
    // 需要特別注意剩餘引數部分是陣列
    function useRestParams(params1: string, ...restParams:any[]): void {
        console.log('params1', params1)
        console.log('restParams', restParams)
    }
    
    useRestParams('Marry', 'Candy', 'Sam', 'Judy') // 可以編譯
    // js 實際運作在 console 上顯示如下
    // params1 Marry
    // restParams ['Candy', 'Sam', 'Judy'] 可以看出剩餘參數是以陣列形式傳入函式中
    ```
    
- **過載 ( Function Overloading )**
    
    但若是一個函式，參數有不同型別，而最後的結果也預期會因為型別的不同而有所不同呢?
    
    - 利用聯合型別的寫法範例 ( 壞處，就是不夠具體 )
    
    ```tsx
    // 假設我們有一個函式它會將輸入的參數(可能是數值或是字串)反過來並依傳入型別輸出
    
    function reverseNumberOrString(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    // 但這作法有個壞處，就是不夠具體，因為我們這函式預計輸入與輸出的型別要是相同的
    // 而目前的作法若有 輸入數值 但輸出字串的情況下 ts 也不會報錯
    ```
    
    - 過載定義多個同樣名稱的函式
        
        ```tsx
        function reverse(x: number): number;
        function reverse(x: string): string;
        function reverse(x: number | string): number | string {
            if (typeof x === 'number') {
                return Number(x.toString().split('').reverse().join(''));
            } else if (typeof x === 'string') {
                return x.split('').reverse().join('');
            }
        	return 'only allowed type string or number'
        }
        
        // 但若換成如下方式則會跳錯
        // 對於型別 type，TypeScript 不允許在同一範疇（scope）中多次使用相同的名稱，否則會出現錯誤 TS2300: Duplicate identifier。
        type reverseType = (x:number) => number; //  error TS2300: Duplicate identifier 'reverseType'.
        type reverseType = (x:string) => string; //  error TS2300: Duplicate identifier 'reverseType'.
        let reverse: reverseType = (x) => {
            if (typeof x === 'number') {
                return Number(x.toString().split('').reverse().join(''));
            } else if (typeof x === 'string') {
                return x.split('').reverse().join(''); //  error TS2339: Property 'split' does not exist on type 'never'.
            }
            return 'only allowed type string or number'
        }
        
        // 若用 type 則不能用 overloading 的方式，需要分開 type
        
        type reverseType = (x: number) => number;
        type reverseTypeString = (x: string) => string;
        
        let reverse: reverseType | reverseTypeString = (x) => {
            if (typeof x === 'number') {
                return Number(x.toString().split('').reverse().join(''));
            } else if (typeof x === 'string') {
                return x.split('').reverse().join('');
            }
            return 'only allowed type string or number';
        };
        ```
        
        - 對於型別 type，TypeScript 不允許在同一範疇（scope）中多次使用相同的名稱，否則會出現錯誤 TS2300: Duplicate identifier。
        - 對於函式，TypeScript 允許函式重載  ( Function Overloading ) 的方式，即為同一函式提供多個不同的型別定義。這樣的函式重載允許根據不同的參數型別執行不同的邏輯，提供更靈活的函式使用方式。
        - 注意使用過載時，TypeScript 會優先從**最前面的函式定義開始匹配**，所以多個函式定義如果有包含關係，需要優先把精確的定義寫在前面。
### 2-8. 型別的斷言 ( Type Assertion / **Casting** )

型別斷言 ( Type Assertion ) 可以直接以此方式指定對應變數的型別

斷言有幾個特點，這邊歸結如下

1. 聯合型別可以被斷言成一中的一個型別
- 2. 父類 ( 涵蓋/型別定義較少 ) 可以被斷言成子類 ( 涵蓋/型別定義較父類多，且涵蓋父類所有項目 ) ( 若是 interface 可以不是 extends 的兩個獨立型別，但要求與前述相同 )
    
    ```tsx
    // example
    interface Animal {
      name: string
    }
    
    interface Cat {
      name: string
      run(): void
    }
    
    const animal: Animal = {
      name: 'tom'
    }
    
    let sam = animal as Cat // 可以斷言成 Cat ( 涵蓋了 Animal 所有的屬性與方法 )
    
    let tom: Cat = animal // 但不能宣告成 Cat,  ts 會編譯出錯，因為沒有 run 這函式  error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
    
    // 進一步說明: 斷言與宣告的差別
    // a 為斷言時，只要 b 涵蓋 a 所有的內容方法與內容，就可以斷言成 b ( b >= a )
    // a 為聲明/宣告時，b 與 a 要有全部一樣的方法與屬性，才可以宣告成 b (a == b )
    ```
    
1. any 可以被斷言成各種型別
2. 各種型別也可以被斷言成 any

**寫法範例**

```tsx
// 寫法一: <型別>變數
function getLength(something: string | number): number {
    return (<string>something).length; 
		// 注意: 這邊要括號喔! 因為斷言的對象只有 something 這變數
		// 若不括號的話代表你斷言 something.length 的值是 string 這會報錯
}

// 寫法二: as ( 注意: 在 react 中只能用這種)
function getLength(something: string | number): number {
    return (something as string).length; 
		// 注意: 這邊要括號喔! 因為斷言的對象只有 something 這變數
		// 若不括號的話代表你斷言 something.length 的值是 string 這會報錯
}
```

**說明:** 型別斷言**通常用於有聯合型別的參數函式內**，通常是調用該參數特定的型別方法時使用 ( 換句話說，**斷言無法使用在非聯合型別的型別範圍內** )

```tsx

// 正確寫法，斷言的型別在聯合型別內
function getLength(something: string | number): number {
    return (something as string).length; 
}

// 錯誤寫法，斷言的型別沒有在聯合型別內，ts 編譯會報錯
function getLength(something: string | number): number {
    return (something as boolean)? 5: 0;     
}
// ts 編譯錯誤 error TS2352: Conversion of type 'string | number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// Type 'number' is not comparable to type 'boolean'.
```

- **雙重斷言**
    
    利用 “**any 可以被斷言成各種型別; 各種型別也可以被斷言成 any 的特性**”，可以進行不同型別間的轉換，**但盡量不用因為可能會導致較多的錯誤**
    
    ```tsx
    interface Cat {
      run(): void
    }
    
    interface Fish {
      swim(): void
    }
    
    // 若沒有雙重轉換，直接替換型別會出錯 error TS2352: Conversion of type 'Cat' to type 'Fish' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
    function testCat( cat: Cat){
      return (cat as Fish)
    }
    
    // 寫成雙重斷言則沒有問題
    
    function testCat( cat: Cat){
      return (cat as any as Fish)
    }
    ```
    

### 2-9. 甚麼是宣告檔案

- **甚麼是宣告(註記)檔案**
    
    由於在使用外部的套件或是模組中，通常會有引入的套件方法或物件，而這邊方法或物件也都需要型別定義，而外部套件內所有方法與功能的型別定義就叫做宣告檔案，通常是以 ( .d.ts ) 作為檔案的結尾
    
    - **宣告檔案的程式碼範例**
        
        ```tsx
        // vue-router.d.ts
        
        import "vue-router" // 載入 vue-router 該套件原有的 type
        // 但若原套件本沒有 type 的話，則就不會有這個 import 了
        
        // 以下是將 vue-router 針對此專案的使用情境進行型別的擴寫(擴充)
        // 自訂套件型別，都是以 declare 開頭
        declare module "vue-router" {
          interface RouteMeta {
            /**
             * 设置该路由在侧边栏和面包屑中展示的名字
             */
            title?: string
            /**
             * 设置该路由的图标，记得将 svg 导入 @/icons/svg
             */
            svgIcon?: string
            /**
             * 设置该路由的图标，直接使用 Element Plus 的 Icon（与 svgIcon 同时设置时，svgIcon 将优先生效）
             */
            elIcon?: string
            /**
             * 默认 false，设置 true 的时候该路由不会在侧边栏出现
             */
            hidden?: boolean
            /**
             * 设置该路由进入的权限，支持多个权限叠加
             */
            roles?: string[]
            /**
             * 默认 true，如果设置为 false，则不会在面包屑中显示
             */
            breadcrumb?: boolean
            /**
             * 默认 false，如果设置为 true，它则会固定在 tags-view 中
             */
            affix?: boolean
            /**
             * 当一个路由下面的 children 声明的路由大于 1 个时，自动会变成嵌套的模式，
             * 只有一个时，会将那个子路由当做根路由显示在侧边栏，
             * 若想不管路由下面的 children 声明的个数都显示你的根路由，
             * 可以设置 alwaysShow: true，这样就会忽略之前定义的规则，一直显示根路由
             */
            alwaysShow?: boolean
            /**
             * 示例: activeMenu: "/xxx/xxx"，
             * 当设置了该属性进入路由时，则会高亮 activeMenu 属性对应的侧边栏。
             * 该属性适合使用在有 hidden: true 属性的路由上
             */
            activeMenu?: string
            /**
             * 是否缓存该路由页面
             * 默认为 false，为 true 时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
             */
            keepAlive?: boolean
          }
        }
        ```
        
    
    而套件定義型別的宣告檔案通常是由社群或是套件開發者所提供，但有些套件可能沒有完整的型別定義，在這種狀況下，則需要自己手動的去定義這些套件功能的型別，確保 typescript 能夠順利編譯
    
- **宣告檔案放置 & 設定位置**
    
    通常在專案中有安裝 typescript 套件，不管是用前端的哪套框架開發工具 ( vue cli, vite, nuxt…etc. )，皆會在該專案內生成 ts 的設定檔，檔名為 tsconfig.json，在其內設置 ts 需要編譯 ( include ) 的對象位置，以及不須編譯 ( exclude ) 的位置，而通常檔案配置位置如下範例
    
    ```
    # 檔案配置位置
    
    ├── src
    ├── types #自訂義型別的放置處，也是各種自訂宣告檔放置處
    |  ├── global.d.ts
    |  ├── index.d.ts
    |  └── vue-router.d.ts
    └── tsconfig.json
    ```
    
    ```json
    // tsconfig.json 中 include 與 exclude 的設定 代表需要/不需要 ts 編譯的範圍
    {
      ...
      "lib": ["dom", "esnext"],// ts 選定要使用的 ts 標準庫，dom 代表要包含 dom 的型別定義，esnext 代表須包含最新的 ES 定義
      "types": ["vite/client"], // 若有第三方提供的 type 放這邊  
    	"typeRoots": ["./node_modules/@types/", "./types"], // 這是 typescript 預設/內建 type放置位置，
      "include": [ //  ts 需要編譯的地方設置 
        "src/**/*.ts",
        "src/**/*.d.ts",
        "src/**/*.tsx",
        "src/**/*.vue",
        "types/**/*.d.ts",
        "types/**/*.ts",
        "config/**/*.ts",
        "config/**/*.d.ts",
        "vite.config.ts" //雖有 vite/client 的 type 配置，但其不涵蓋 vite.config.ts 的設置文件，所以要加入這項
      ],
    	// exclude ts 不需要編譯的地方設置
      "exclude": ["node_modules", "tests/server/**/*.ts", "dist", "**/*.js"]
    }
    ```
    
    - **較完整的 tsconfig.json 設置範例 & 說明** ( 參考自有 315顆星的 [vite-vue3-ts](https://github.com/JS-banana/vite-vue3-ts) )
        
        ```json
        {
          "compilerOptions": { // ts 編譯方式的設置
            "target": "esnext", // 代表被 ts 編譯後的 JS 是 ES 幾 ( 這裡設定的值是 esnext 代表最新的 ECMAScript )
            "module": "esnext", 
            "moduleResolution": "node",
            "strict": true, // 是否啟用 ts 的嚴格模式
            "forceConsistentCasingInFileNames": true, // 強制文件名設置的一致姓
            "allowSyntheticDefaultImports": true, // 允許沒有 export default 的模組默認導出
            "strictFunctionTypes": false,
            "jsx": "preserve", // 針對 jsx 的處理方式 ( 值 preserve 代表保留 )
            "baseUrl": ".", // 設置跟目錄的表現方式
            "allowJs": true, // 允許編譯 js 文件 ( 就是允許該專案中 ts 與 js 混雜的情形 )
            "sourceMap": true, //  是否需要生成 sourcemaps ( ts 如何對應到被編譯的 js )
            "esModuleInterop": true, // 是否啟用 commonJS 與 ES module 的混合操作模式
            "resolveJsonModule": true, // 是否允許 ts 引入 JSON 文件
            "noUnusedLocals": true, // 是否禁止未使用的局部變量
            "noUnusedParameters": true, // 是否禁止未使用的參數
            "experimentalDecorators": true,
            "lib": ["dom", "esnext"],// ts 選定要使用的 ts 標準庫，dom 代表要包含 dom 的型別定義，esnext 代表須包含最新的 ES 定義
            "types": ["vite/client"], // 指定要涵蓋的額外型別定義文件
            "typeRoots": ["./node_modules/@types/", "./types"], // 這是 typescript 預設/內建 type放置位置，
            "noImplicitAny": false, // 是否允許未聲明的 any 型別
            "skipLibCheck": true, // 是否不對 libraries 進行型別檢查
            "paths": { // 路徑映射設置
              "/@/*": ["src/*"],
              "/#/*": ["types/*"]
            }
          },
          "include": [
            "src/**/*.ts",
            "src/**/*.d.ts",
            "src/**/*.tsx",
            "src/**/*.vue",
            "types/**/*.d.ts",
            "types/**/*.ts",
            "config/**/*.ts",
            "config/**/*.d.ts",
            "mock/**/*.ts",
            "vite.config.ts"
          ],
          "exclude": ["node_modules", "tests/server/**/*.ts", "dist", "**/*.js"]
        }
        ```
        

### 2-10. 判斷官方提供的宣告檔案

一般來說，我們在專案中引入套件時 ( ex: import axios from ‘axios’ )，該套件官方或社群提供的 type 文件也會一同匯入

- 若需要尋找該套件所提供的官方或社群型別檔案，可以參考下面兩個檔案，但若以下這兩個方法都沒辦法找到對應的型別文件，就要自己寫了
    - **官方型別檔位置**: 在 node_modules 裡該套件的檔案內的 package.json 中的 types 欄位可以看到該檔案確切的位置，如下範例圖
        
        ![https://i.imgur.com/BeLXRcs.png[/img]](https://i.imgur.com/BeLXRcs.png[/img])
        
    - **社群型別檔案位置**: 同樣在 node_modules 內，官方沒有提供但社群有建置型別的檔案會放在這邊，如下範例圖
        
        ![https://i.imgur.com/RZmeKRr.png[/img]](https://i.imgur.com/RZmeKRr.png[/img])
        
        - 若在這邊沒有，也可以嘗試自行安裝確認下
            
            ```powershell
            #例如: 我們想安裝個 example 套件的 type，只要輸入如下指令，就可確認該套件型別社群是否有提供
            npm install @types/example --save-dev
            ```
            

### 2-11. 如何自訂套件的宣告檔案

- 若該套件既無官方或社群所提供的宣告檔，則需要自行為該套件定義宣告檔
- 替無型別的套件定義宣告檔，通常會分為全域定義以及模組化定義，其間的區別是
**1. 全域定義:** 會整個模組都會吃到該定義型別
**2. 模組化定義**: 通常要 export ，而型別使用要 import 才有效 ( 較不會有全域污染的問題 )
    
    **總的來說:** 替未有 types 的套件定義型別時，通常在 .d.ts 副檔名的檔案，並且以 declare 或是 export 做為開頭
    
- **全域定義方式**
    
    通常涵蓋 declare var, declare function, declare class, declare enum, declare namespace, interface 與 type 的宣告語法，以下則是分別介紹使用方式
    
    **注意: 通常要用到 declare 代表原本的內容 ( 實現 ) 已被定義在該套建中，所以在 d.ts 中只要定義型別。**
    
    - **declare var/let/const 宣告全域變數**
        
        宣告全域變數，可以定義該套件所用的全域變數的型別，但要特別注意的是由於在 d.ts 的文件只能定義型別，不允許有任何實現 ( ex: 賦予實際的值 ) ，若有在 ts 編譯時會跳錯誤 ( : Initializers are not allowed in ambient contexts )，而大部分套件中的變數( 通常是常數 )已在套件中被定義，所以使用 const 居多，但若需要後續在實使用上時改變其值，則可以 let 或 var 宣告，而此二者在實際運用時  ( 在 .ts 檔 ) 也只能被賦予同 d.ts 定義型別的值
        
        ```tsx
        // 假設 returnString 與 returnConstString 是來自某個套件的兩個全域變數
        
        // index.d.ts
        declare let returnString: string
        
        // 在 .d.ts 不允許實際實現
        declare const returnConstString: string =  '123' //ts 編譯跳錯 TS1039: Initializers are not allowed in ambient contexts.
        
        // index.ts
        returnString = '123'; // 正常編譯
        returnString = '567'; // 正常編譯
        returnString = 6; // ts 編譯跳錯 error TS2322: Type 'number' is not assignable to type 'string'.
        
        returnConstString = '345';// ts 編譯跳錯 error TS2588: Cannot assign to 'returnConstString' because it is a constant.
        ```
        
    - **declare function 宣告全域函式**
        
        `declare function` 是用來定義套件中全域函式的型別，範例如下
        
        ```tsx
        // 假設 returnString 是某個套件的函式
        // index.d.ts
        declare function returnString(param: string):string; // 正確使用方式
        
        ---------------------------------------------------------------
        
        // 但若在 ts 中重新用同個 function 名稱重新定義
        
        // index.d.ts
        // ts 編譯錯誤 error TS2384: Overload signatures must all be ambient or non-ambient.
        // 其表示若是要用型別過載，請以型別方式表示 
        declare function returnString(param: string):string;  
        
        //index.ts 
        // ts 編譯錯誤: error TS2394: This overload signature is not compatible with its implementation signature.
        // 這表示此過載表示方式與型別定義部分不相容
        function returnString(param:boolean):boolean{
          return param
        }
        ```
        
        - 使用型別過載定義函式
        
        ```tsx
        // 假設 returnString 是某個套件的函式
        // index.d.ts
        declare function returnString(param: string):string;  
        declare function returnString(param: number):number;
        declare function returnString(param: string|number):string|number;
        ```
        
    - **declare class 宣告全域類別**
        
        當套件中的全域變數是 class 時，我們可以使用 declare class 來定義
        
        ```tsx
        // index.d.ts
        // 假設 Animal 是某個套件的全域 class
        // 一樣 declare class 只能定義型別但不能定義實現
        declare class Animal {
            name: string;
            constructor(name: string);
            sayHi(): string;
        }
        
        //index.ts
        let cat = new Animal('Tom');
        ```
        
    - **declare enum 宣告全域列舉**
        
        當套件中的全域變數是 enum 時，我們可以使用 decalre enum 來告訴 ts 這是套件中的 enum
        
        ```tsx
        // index.d.ts
        // 假設 Color 是某個套件的全域 enum
        declare enum Color {
          Red,
          Green,
          Blue
        }
        
        // index.ts
        
        let myColor: Color = Color.Red;
        
        if (myColor === Color.Red) {
          console.log("The color is red!");
        } else if (myColor === Color.Green) {
          console.log("The color is green!");
        } else if (myColor === Color.Blue) {
          console.log("The color is blue!");
        }
        
        ```
        
    - **declare namespace 宣告全域名稱空間**
        
        declare namespace 是 ts 模組化的宣告型別解決方案，又稱為命名空間，在內部可以設定該模組對應的 function, const, enum, class ，型別宣告 ( 內部的宣告就不用再另外加 declare )，封裝在一個空間的好處是可以防止全域的變數名稱衝突，同樣的這通常使用在外部套件已定義的模組
        
        ```tsx
        // index.d.ts
        // 假設外部套件有一個模組名稱叫 MyLibrary
        declare namespace MyLibrary {
        	// 直接在內部將其模組的各種型別進行定義
          function greet(name: string): void;
          let version: string;
          class MyClass {
            constructor(value: number);
            getValue(): number;
          }
        }
        
        // index.ts
        // 實際使用時
        MyLibrary.greet("John");
        ```
        
        - 巢狀的模組使用範例
            
            ```tsx
            // index.d.ts
            declare namespace jQuery {
                function ajax(url: string, settings?: any): void;
                namespace fn { // 第二層 namespace
                    function extend(object: any): void;
                }
            }
            
            //index.ts
            // 實際使用時
            jQuery.fn.extend({
                check: function() {
                    return this.each(function() {
                        this.checked = true;
                    });
                }
            });
            ```
            
    - **interface 和 type 宣告全域型別 / 介面**
        
        但若不單是套件已定義的屬性或方法，這邊只為了在全域這邊定一個全域適用的介面或型別，則可以使用 interface 或 type 
        
        **注意 1: 這邊沒有 declare 這個詞加在前面**
        
        **注意 2:  須盡量減少使用這方式定義，因為容易會造成全域汙染**
        
        ```tsx
        // index.d.ts
        interface AjaxSettings {
            method?: 'GET' | 'POST'
            data?: any;
        }
        
        // index.ts
        let settings: AjaxSettings = {
            method: 'POST',
            data: {
                name: 'foo'
            }
        };
        ```
        
        當然若這介面或型別本身是該外部套件的一部分，也可以放在 declare namespace 中已減少全域汙染的可能性
        
        ```tsx
        // jQuery.d.ts
        
        declare namespace jQuery { //若是在 jQuery 這外部套件的 interface 或 type
            interface AjaxSettings {
                method?: 'GET' | 'POST'
                data?: any;
            }
            function ajax(url: string, settings?: AjaxSettings): void;
        }
        
        // index.ts
        // 但也要注意實際使用時由於型別定義在 jQuery這 namespace裡面，所以要寫成如下方
        // 型別使用時 以 jQuery.AjaxSettings
        let settings: jQuery.AjaxSettings = {
            method: 'POST',
            data: {
                name: 'foo'
            }
        };
        ```
        
    - **宣告合併寫法**
        
        也可以在同一個變數上 declare 多種型別
        
        ```tsx
        // 但若引入的這個套件它本身含有屬性，但直接呼叫時也是函式呢? 如 jQuery 範例
        // jQuery.d.ts
        declare function jQuery(selector: string): any;
        declare namespace jQuery {
            function ajax(url: string, settings?: any): void;
        }
        // 則具體只要是有宣告的型別，使用上則無問題
         
        // index.ts
        jQuery('#foo');
        jQuery.ajax('/api/get_something');
        ```
        
- **模組化定義方式**
    
    通常與全域定義的區別是有 export 與否
    
    - **export**
        
        只有在宣告檔案中使用 `export` 匯出，然後在使用方 `import` 匯入後，才會應用到這些型別宣告。
        
        ```tsx
        // types/foo/index.d.ts
        
        export const name: string;
        export function getName(): string;
        export class Animal {
            constructor(name: string);
            sayHi(): string;
        }
        export enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        export interface Options {
            data: any;
        }
        ```
        
    - **export 混用 declare**
        
        我們也可以使用 `declare` 先宣告多個變數，最後再用 `export` 一次性匯出。
        
        ```tsx
        // types/foo/index.d.ts
        
        declare const name: string;
        declare function getName(): string;
        declare class Animal {
            constructor(name: string);
            sayHi(): string;
        }
        declare enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        
        // 與全域變數的宣告檔案類似，interface 前是不需要 declare 的。
        interface Options {
            data: any;
        }
        
        export { name, getName, Animal, Directions, Options };
        ```
        
    - **export namespace**
        
        與 `declare namespace` 類似，`export namespace` 用來匯出一個擁有子屬性的物件
        
        ```tsx
        // types/foo/index.d.ts
        
        export namespace foo {
            const name: string;
            namespace bar {
                function baz(): string;
            }
        }
        ```
        
        實際使用上
        
        ```tsx
        // src/index.ts
        
        import { foo } from 'foo';
        
        console.log(foo.name);
        foo.bar.baz();
        ```
        
    - **export default**
        
        在 ES6 模組系統中，使用 `export default` 可以匯出一個預設值，使用方可以用 `import foo from 'foo'` 而不是 `import { foo } from 'foo'` 來匯入這個預設值
        
        ```tsx
        // types/foo/index.d.ts
        
        export default function foo(): string;
        ```
        
        使用時
        
        ```tsx
        // src/index.ts
        
        import foo from 'foo';
        
        foo();
        ```
        
        注意，只有 `function`、`class` 和 `interface` 可以直接預設匯出，其他的變數需要先定義出來，再預設匯出
        
        - 以下做法會產生錯誤
        
        ```tsx
        // types/foo/index.d.ts
        
        export default enum Directions {
        // ERROR: Expression expected.
            Up,
            Down,
            Left,
            Right
        }
        ```
        
        - 正確做法如下
        
        ```tsx
        // types/foo/index.d.ts
        
        declare enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        
        export default Directions;
        
        // 針對這種預設匯出，我們一般會將匯出語句放在整個宣告檔案的最前面
        
        export default Directions;
        
        declare enum Directions {
            Up,
            Down,
            Left,
            Right
        }
        ```
        

### 2-12. TS 的內建預設型別

- **ECMAScript 的內建物件**
    
    定義檔案，則在 [TypeScript 核心函式庫的定義檔案](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中可找到，而更多的 javaScript 內建物件，可以檢視 [MDN 的文件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。
    
    - typescript 也支援 ECMAScript 的內建物件 ex: Date, ERROR, RegExp, Map, Set, Promise, object…etc. 所以並不需要另外註記 & 定義型別
    - 另外要特別注意目前所設定 typescript 所編譯出的 ECMAScript 版本的設定 ( 通常設定位置在 tsconfig.json  ( compilerOptions 內的 target 中做設定 )) 因為有些物件/語法是自某個版本後才有的 ( ex: 如若無特別設定，typescript 預設編譯出 javascript 的版本是 ECMA2015，而這版本的 javascript 並不認得 ECMA2016 的 Map, Set, Promise 等物件 )，為防萬一可以在 tsconfig.json 中的 target 設定成 “esnext” 代表 ts 編譯成最新版本的 javascript 版本
    - 以下針對常見的幾個內建物件對應的 typescript 內建型別進行說明 & 對應的範例
        
        ```tsx
        // Date
        let today: Date = new Date();
        
        // Error
        try {
          // some code that might throw an error
        } catch (error: Error) {
          console.error(error.message);
        }
        
        // RegExp 正則
        let regex: RegExp = /[a-zA-Z]/;
        
        // Map 與 Set ( 注意:  這是 ECMA2016 後才有的語法 )
        let myMap: Map<string, number> = new Map();
        let mySet: Set<number> = new Set();
        
        // Promise
        let myPromise: Promise<string> = new Promise((resolve, reject) => {
          // some asynchronous operation
        });
        
        // Array
        let myArray: Array<number> = [1, 2, 3];
        
        // object，考量到維護性,可讀性, 擴展性上 並不建議直接使用，更建議用 interface 或 type 做物件型別定義
        let myObject: object = { key: 'value' };
        ```
        
- **WEB API 的內建物件**
    
    typescript 也有針對瀏覽器的 web api 進行支援 ex: DOM ( Document Object Model )  , BOM ( Browser Object Model ) , Canvas API, WebGL, Web Audio API, Geolocation API …etc.
    
    它們的定義檔案同樣在 [TypeScript 核心函式庫的定義檔案](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。
    
    - **DOM ( Document Object Model  ):**
        
        DOM 主要關注的是處理網頁的結構和內容。它提供了一個表示 HTML 或 XML 文檔結構的樹狀模型，每個節點都是文檔中的一個元素、屬性、文本等。JavaScript 可以使用 DOM 操作來選擇、讀取、修改、添加或刪除 HTML 元素，並且可以對這些元素應用事件處理。
        
        常用 DOM 語法，使用範例與說明
        
        ```tsx
        // EventTarget 型別
        // EventTarget 定義了事件的基本操作，例如添加事件監聽器 (addEventListener) 和觸發事件 (dispatchEvent) 
        // EventTarget 是一個通用的 DOM 型別，它是事件處理系統的基礎。
        // 任何能成為事件目標的對象都實現了 EventTarget 接口，這包括 Document、Element 以及其他一些 DOM 對象。
        let myEventTarget: EventTarget = document;
        
        // Document 型別
        // Document 是 EventTarget 的子類型，表示整個 HTML 文檔，而 EventTarget 是一個更通用的型別
        // 如果你只關心事件的基本操作，那麼使用 EventTarget 即可。
        // 如果你需要直接操作整個文檔，則使用 Document 更適合。
        let myDocument: Document = document;
        
        // Element 型別
        // Element 是 DOM 中的一個基本型別，代表著 DOM 中的一個通用元素。
        // 它只包含了通用的元素屬性和方法，但不包括特定於某種元素的屬性和方法。
        // 如果僅需代表一個通用的 DOM 元素，而不是對應的擴展屬性與方法 可以用 Element
        let myElement: Element = document.createElement('div');
        
        // HTMLElement 型別:
        // HTMLElement 是所有 HTML 元素的基類，它包含了通用的屬性和方法
        // HTMLElement 是 Element 的一個擴展型別，它包含了 Element 的所有屬性和方法，
        // 並添加了一些特定於 HTML 元素的屬性和方法。如果你需要訪問特定於 HTML 元素的屬性
        // （例如 innerHTML、style、className 等），則可以使用 HTMLElement 型別。
        let myElement: HTMLElement = document.createElement('div');
        
        // Event 型別
        // Event 型別表示事件對象，包括常見的屬性如 type 和 target。
        function handleEvent(event: Event) {
          console.log(event.type);
        }
        
        // Node 型別
        // Node 型別是所有 DOM 節點的基類，包括元素、屬性和文本節點等。
        let myNode: Node = document.createTextNode('Hello, World!');
        
        // Window 型別 ( 註: 其同時也屬於 BOM )
        // 物件是 DOM 的一部分，它代表整個瀏覽器窗口，提供了與整個文檔（document）互動的方法
        let myWindow: Window = window;
        
        ```
        
    - **BOM（Browser Object Model）:**
        
        BOM 與 DOM 不同，其不涉及處理網頁的具體結構與內容，主要關注的是處理瀏覽器本身的屬性以及與瀏覽器窗口互動的對象 ex: 瀏覽器的歷史紀錄、窗口的大小與位置、螢幕寬度等訊息 
        
        常用 BOM 語法，使用範例與說明
        
        ```tsx
        // Window 型別 ( 同時屬於 DOM )
        // Window 型別表示瀏覽器窗口，是 BOM 的核心。它包含了瀏覽器窗口的屬性和方法。
        let myWindow: Window = window;
        let checkInnerWidth: number = myWindow.innerWidth;
        
        // Navigator 型別:
        // Navigator 型別表示瀏覽器的信息，包括瀏覽器的名稱、版本、平台等。
        let myNavigator: Navigator = navigator;
        let userAgent: string = myNavigator.userAgent;
        
        // Location 型別:
        // Location 型別表示瀏覽器的網址欄信息，包括協議、主機、端口、路徑等。
        let myLocation: Location = location;
        let currentURL: string = myLocation.href;
        
        // History 型別:
        // History 型別表示瀏覽器的歷史記錄，允許操作前進和後退。
        let myHistory: History = history;
        myHistory.back(); // 返回上一頁
        
        // Screen 型別:
        // Screen 型別表示用戶屏幕的信息，如寬度、高度、顏色深度等。
        let myScreen: Screen = screen;
        let screenWidth: number = myScreen.width;
        
        // XMLHttpRequest 型別:
        // XMLHttpRequest 型別用於進行 HTTP 請求，通常用於實現 Ajax 操作。
        // 它主要是屬於瀏覽器提供的 API，而不是用於直接操作文檔結構的 DOM 物件，所以屬於 BOM
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', 'https://example.com/api/data', true);
        xhr.send();
        ```
        
    - 其他 (  Canvas API, WebGL, Web Audio API, Geolocation API…etc. )
        
        常用語法，使用範例與說明
        
        ```tsx
        // Canvas API:
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const context: (CanvasRenderingContext2D | null) = canvas.getContext('2d');
        
        // WebGL:
        const myCanvas: HTMLCanvasElement = document.createElement('canvas');
        const gl: (WebGLRenderingContext | null) = canvas.getContext('webgl');
        
        // Web Audio API:
        const audioContext = new (window.AudioContext)();
        
        //  Geolocation API:
        navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
          console.log(position.coords.latitude, position.coords.longitude);
        });
        ```
        
    - 補充: window 物件到底屬於 dom 還是 bom ?
        
        **`window`** 物件既屬於 DOM（Document Object Model），又屬於 BOM（Browser Object Model）。因此，**`window`** 物件被認為是 DOM 和 BOM 之間的橋樑。
        
        1. **DOM（Document Object Model）:**
            - **`window`** 物件是 DOM 的一部分，它代表整個瀏覽器窗口，提供了與整個文檔（document）互動的方法。例如，你可以透過 **`window`** 物件訪問和操作文檔中的元素，控制文檔的結構和內容。
        2. **BOM（Browser Object Model）:**
            - 同時，**`window`** 物件也是 BOM 的一部分。BOM 主要涉及與瀏覽器窗口和瀏覽器本身的屬性和方法有關，例如瀏覽器的歷史、瀏覽器視口的大小、定時器函式（**`setTimeout`**、**`setInterval`**）等。這些功能使 **`window`** 物件成為 BOM 的重要一環。
        
        總的來說，**`window`** 物件是 DOM 和 BOM 的結合體，既提供了與文檔結構和內容互動的方法，也提供了與瀏覽器窗口和瀏覽器本身互動的方法
        
- **核心函式庫的定義**
    
    typescript 在 [TypeScript 核心函式庫的定義檔案](https://github.com/Microsoft/TypeScript/tree/master/src/lib) 中也定義了各種 javascript 原內建的函式庫，所以當使用時， typescript 也會協助開發者判斷對應的型別
    
    ```tsx
    // example
    
    Math.pow(10, '2');
    
    // 出現錯誤 index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
    ```
    
    那是因為 typescript 內部已經有內建定義了 Math.pow 比須接受兩個 number 引數，其內建的定義型別如下
    
    ```tsx
    interface Math {
        /**
         * Returns the value of a base expression taken to a specified power.
         * @param x The base value of the expression.
         * @param y The exponent value of the expression.
         */
        pow(x: number, y: number): number;
    }
    ```
    ## 三、常用進階語法

### 3-1. 型別別名 ( Type Aliases )

用 type 來幫定義型別命名，方便用於聯合型別的應用

```tsx
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

### 3-2. **字串字面量型別 ( Template Literal Types )**

使用字串值或聯合字串型別來限制該型別只能符合設定字串

```tsx
type EventNames = 'click' | 'scroll' | 'mousemove';
// 上例中，我們使用 type 定了一個字串字面量型別 EventNames，它只能取三種字串中的一種。
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // ts 編譯沒問題
handleEvent(document.getElementById('world'), 'dbclick'); // ts 編譯報錯，event 不能為 'dbclick'
```

### 3-3. 元祖 ( Tuple )

tuple 是陣列中定義不同型別會用到

```tsx
let tom: [string, number];
// 正常用法
tom[0] = 'Tom'
tom[1] = 24

// 若只有賦予一值也允許
tom[0] = 'Tom'; // 允許

// 正常用法
tom = ['Tom', 12]

// 但若是這方式會出現編譯錯誤
tom = ['Tom'] //  錯誤 Type '[string]' is not assignable to type '[string, number]'.

```

- **越界元素:** 若當 push 入超出原定義型別的 array item 時，則多出來的 item 則會被原本陣列中定義的型別聯合限制

```tsx
let tom: [string, number];
tom = ['Tom', 25]
tom.push(26) // 符合 string | number 就行
tom.push('John') // 符合 string | number
tom.push(true) // 編譯出錯 error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.

// 也不能直接賦予大於型別訂定時的陣列內容
tom = ['Tom', 25 , 27] // error TS2322: Type '[string, number, number]' is not assignable to type '[string, number]'
```

### 3-4. 列舉 ( Enum )

列舉（Enum）型別用於取值被限定在一定範圍內的場景，比如一週只能有七天，顏色限定為紅綠藍等

- **基礎使用說明**
    
    在 typescript 使用 enum 開頭進行列舉撰寫，範例如下，
    
    ```tsx
    enum WeekDays { Sun, Mon, Tue, Wed, Thu, Fri, Sat, twoWeeks = 14, twoWeeknOne };
    ```
    
    而實際上對應的 js 編譯成如下
    
    ```jsx
    // javascript 實際編譯 & 運行結果如下
    
    var WeekDays;
    // 使用立即函式 (IIFE) 執行 
    (function (WeekDays) {
    		// WeekDays["Sun"] = 0 此賦值是表達式 也會回傳所賦的值，同等如下 
        WeekDays[WeekDays["Sun"] = 0] = "Sun";
    		// 上方這段等於下面兩者的結合
    		//  WeekDays[0] = "Sun"
    		//  WeekDays["Sun"] = 0
        WeekDays[WeekDays["Mon"] = 1] = "Mon";
        WeekDays[WeekDays["Tue"] = 2] = "Tue";
        WeekDays[WeekDays["Web"] = 3] = "Web";
        WeekDays[WeekDays["Thu"] = 4] = "Thu";
        WeekDays[WeekDays["Fri"] = 5] = "Fri";
        WeekDays[WeekDays["Sat"] = 6] = "Sat";
    		// 自訂的數值對應也可以
    		WeekDays[WeekDays["twoWeeks"] = 14] = "twoWeeks";
    		// 若無自訂數值，則依照上一個數值加 1
    		WeekDays[WeekDays["twoWeeknOne"] = 15] = "twoWeeknOne";
    })(WeekDays || (WeekDays = {}));
    ```
    
    如以上的編譯結果所執行一樣，所以 enum在 typescript 所執行結果如下
    也就是說在 enum 中若沒特別指定，則會從 0 開始設定逐步為 1 增長 
    
    注意 1: 每個數值與對應的值都要是唯一，避免前者被後者所替代( 理由如上方 javascript 實際執行的所示 )
    
    注意 2: 若第一個定義值 ( 依範例是 Sun ) 對應的為自訂數值 ex: 87，第二項後若無自訂也是逐步加 1 (88, 89…) 的方式成長
    
    - enum 的雙向映射
    
    ```tsx
    // enum 的雙向映射，只有發生在value 對 number 上
    
    enum WeekDays { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
    
    // 若 value 對應的 number 沒有自訂，則 enum 會自動從 0 開始逐步設置 ( 這邊的範例就是沒有自訂數值 )
    // 但若 value 有自訂的對應 number，則會以該自訂 number 與數值達成雙向對應的效果
    
    // value to number => true
    console.log(WeekDays["Sun"] === 0); // true
    console.log(WeekDays["Mon"] === 1); // true
    console.log(WeekDays["Tue"] === 2); // true
    console.log(WeekDays["Sat"] === 6); // true
    
    // number to value => true
    console.log(WeekDays[0] === "Sun"); // true
    console.log(WeekDays[1] === "Mon"); // true
    console.log(WeekDays[2] === "Tue"); // true
    console.log(WeekDays[6] === "Sat"); // true
    ```
    
    - enum 的單向映射
    
    ```tsx
    // 但若是 value 對 string 呢? 那 enum 只會有單向映射，如下
    enum WeekDays {Sun='sun', Mon ='mon', Tue='tue', Wed='wed', Thu='tue', Fri='fri', Sat='sat'}
    ```
    
    會被編譯成
    
    ```jsx
    var WeekDays;
    (function (WeekDays) {
    		// 注意: 這邊就沒有如數值時的賦值對應 WeekDays["Sun"] = 0 
        WeekDays["Sun"] = "sun";
        WeekDays["Mon"] = "mon";
        WeekDays["Tue"] = "tue";
        WeekDays["Wed"] = "wed";
        WeekDays["Thu"] = "tue";
        WeekDays["Fri"] = "fri";
        WeekDays["Sat"] = "sat";
    })(WeekDays || (WeekDays = {}));
    ```
    
    所以實際上呈現 & 執行的情況會如下方所示
    
    ```jsx
    // value to string => true
    console.log(WeekDays["Sun"] === 'sun'); // true
    console.log(WeekDays["Mon"] === 'mon'); // true
    console.log(WeekDays["Tue"] === 'tue'); // true
    console.log(WeekDays["Sat"] === 'sat'); // true
    
    // string to value => flase
    console.log(WeekDays['sun'] === "Sun"); // false
    console.log(WeekDays['mon'] === "Mon"); // false
    console.log(WeekDays['tue'] === "Tue"); // false
    console.log(WeekDays['sat'] === "Sat"); // false
    ```
    
- **實戰中使用**
    
    但在實戰中使用 enum 時，很多時候是有另外自訂的 key 對應各自獨特的 value，而這些 key 在很多時候是字串，那實際使用時要如何確保能雙向綁定呢? ( 方便有 key 時 找 value. 或只有 value 時找字串 )
    
    這時搭配 Map 來使用就很方便，例如以下是筆者在實務專案中，看到不錯的使用方式
    
    - **註 1: Map 物件可以用 get(key) 的方法取得對應的 value**
        
        ```tsx
        // 但需要注意的是 Map 中的 get 方法，目的是輸入 key 找對應 value，其 key 可以是數值或是字串 
        // ( enum 的話只能是數值，否則就會變成只有單向這邊與 Map 不同 )
        
        var first = new Map([
          [1, 'one'],
          [2, 'two'],
          [3, 'three'],
        ]);
        
        var second = new Map([
          [1, 'uno'],
          [2, 'dos'],
        ]);
        
        // 合併兩個 Map 時，後面的 Key 會覆蓋調前面的
        // 透過 Spread operator 可以將 Map 轉換成陣列
        var merged = new Map([...first, ...second]);
        
        console.log(merged.get(1)); // uno
        console.log(merged.get(2)); // dos
        console.log(merged.get(3)) // three
        
        console.log(merged.get('uno')) // undefined ，因為 Map get 只能拿 key 去尋 value
        
        // 但 map 的 key 可以是數值或是字串
        var doubledWay = new Map([
            [1, 'uno'],
            ['uno', 1]
        ])
        console.log(doubledWay.get('uno'))// 1
        
        var doubledNonWay = new Map([
            ['one', 'uno'],
            ['uno', 'one']
        ])
        console.log(doubledNonWay.get('uno')) // 'one'
        ```
        
    
    註 2: ES6 中**如果希望「陣列（Array）」的元素不會重複，可以使用 `Set`；如果是希望物件（Object）的鍵不會重複，則可以使用 `Map`**。
    
    ```tsx
    // 範例一
    // 這邊的 export 代表的是模組化，只有引入 (import) 時才起作用
    
    export enum RevenueTypeOption {
    	// 這邊的作法是 不讓 typecript 在編譯時加上在這裡沒有作用的數值 ( 若不自訂 string 的話會有這情形 )
    	// 但這問題的缺點是 只能單向對應 ex: RevenueTypeOption.港灣收入 = '港灣收入'
      '港灣收入' ='港灣收入',
      '棧埠收入' ='棧埠收入',
      '租賃收入' ='租賃收入',
      '其他收入'='其他收入'
    }
    export enum RevenueRadioItems {
      'coastRevenue' = 'coastRevenue', // 港灣
      'rentRevenue' = 'rentRevenue', // 租賃
      'portRevenue' = 'portRevenue', // 棧埠
      'otherRevenue' = 'otherRevenue' // 其他
    }
    
    // 解法是使用 Map 來達成雙向對應 ( Map 對於 key 是唯一，且 key 可以是除了數值外的值 )
    export const RevenueRadioItemsLabelMap = new Map([
    	// 正向對應
      [RevenueRadioItems.coastRevenue, RevenueTypeOption.港灣收入],
      [RevenueRadioItems.otherRevenue, RevenueTypeOption.其他收入],
      [RevenueRadioItems.portRevenue, RevenueTypeOption.棧埠收入],
      [RevenueRadioItems.rentRevenue, RevenueTypeOption.租賃收入],
    	// 反向對應
    	[RevenueTypeOption.港灣收入, RevenueRadioItems.coastRevenue],
    	[RevenueTypeOption.其他收入, RevenueRadioItems.otherRevenue],
    	[RevenueTypeOption.棧埠收入, RevenueRadioItems.portRevenue],
      [RevenueTypeOption.租賃收入, RevenueRadioItems.rentRevenue],
    ])
    
    // 範例二
    export enum InvestmentCompanyLabels { // 投資事業公司別
      '港勤'='港勤',
      '土開'='土開',
      '重工'='重工',
      '物流'='物流',
      '台源'='台源',
      '臺印'='臺印',
      '風訓'='風訓'
    }
    
    // Map 正向綁定
    export const InvestCompanyLabelCodeMap = new Map([
      [InvestmentCompanyLabels.土開, '1303010004'],
      [InvestmentCompanyLabels.台源, '1303010007'],
      [InvestmentCompanyLabels.物流, '1303010001'],
      [InvestmentCompanyLabels.重工, '1303010008'],
      [InvestmentCompanyLabels.風訓, '1303010005'],
      [InvestmentCompanyLabels.港勤, '1303010002'],
      [InvestmentCompanyLabels.臺印, '1303010006']
    ])
    
    // Map 反向綁定
    export const InvestCompanyCodeLabelMap = new Map([
      ['1303010004', InvestmentCompanyLabels.土開],
      ['1303010007', InvestmentCompanyLabels.台源],
      ['1303010001', InvestmentCompanyLabels.物流],
      ['1303010008', InvestmentCompanyLabels.重工],
      ['1303010005', InvestmentCompanyLabels.風訓],
      ['1303010002', InvestmentCompanyLabels.港勤],
      ['1303010006', InvestmentCompanyLabels.臺印]
    ])
    ```
    
- **常數項和計算所得項**
    
    在上方我們有提到 enum 對應的 number ( 可以自訂，若無預設也會自行生成 )，我們稱該自訂或預設的 number 為常數項 ( constant member )，而那位置若放表達式 ( 同樣是產生 number ) 那我們稱之為 計算所得項 ( computed  member )
    
    ```tsx
    // 舉例
    enum Color {Red, Green = 33, Blue = "blue".length};
    // 比如上方的 Red ( 預設對應 0 ) 以及 Green 的自訂 33 皆為常數項 ( constant member )
    // 而 Blue 後面設定的會產生 number 的表達式 ( "blue".length ) 為計算所得項 ( computed member )
    ```
    
    - **補充1 : 會被當作常數項的條件 ( 也有部分表達式 )**
        - 數字字面量
        - 參考之前定義的常數列舉成員（可以是在不同的列舉型別中定義的）如果這個成員是在同一個列舉型別中定義的，可以使用非限定名來參考
        - 帶括號的常數列舉表示式
        - `+`, `-`, `~` 一元運算子應用於常數列舉表示式
        - `+`, `-`, `*`, `/`, `%`, `<<`, `>>`, `>>>`, `&`, `|`, `^` 二元運算子，常數列舉表示式做為其一個操作物件。若常數列舉表示式求值後為 NaN 或 Infinity，則會在編譯階段報錯
    - **補充 2: 使用計算所得項 ( computed  member ) 的限制**
        
        enum 項目中 計算所得項  ( computed  member ) 後面只能接有自訂數值的項目，或乾脆放在最後一項，否則會因為無法獲得前一個數值而報錯 ( 因為 enum 在未自訂數值時，預設是以逐步加1 來設定數值，若無法取得前一項的數值，自然就會出錯 )
        
        ```tsx
        // 出錯範例
        enum Color {Red = "red".length, Green, Blue};
        // index.ts(1,33): error TS1061: Enum member must have initializer.
        // index.ts(1,40): error TS1061: Enum member must have initializer.
        ```
        
- **常數列舉 const enum**
    
    需要特別注意的是若 enum 使用 const 宣告，其編譯成 javascript 時會被整段刪除，如下範例
    
    ```tsx
    // ts
    const enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    ```
    
    編譯成 javascript 後 const enum 整個消失
    
    ```jsx
    // ts 編譯後
    // const enum 會在編譯階段被刪除
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    ```
    
    若 const enum 內的項目有 計算所得項 ( computed  member ) 則會出現 ts 編譯錯誤
    
    ```tsx
    const enum Color {Red, Green, Blue = "blue".length};
    
    // index.ts(1,38): error TS2474: In 'const' enum declarations member initializer must be constant expression.
    ```
    
- **外部列舉 ( Ambient Enums )**
    
    外部列舉通常是使用 declare enum 來定義，其目的多只用於編譯時的檢查，但在編譯後同 const enum 會被刪除，所以也可以使用 declare const enum 此二者編譯結果相同
    
    ```tsx
    // ts 
    // declare enum
    // 也可以使用 declare const enum 兩者編譯結果相同
    declare enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    ```
    
    編譯成 javascript 後
    
    ```jsx
    // declare enum 編譯結果
    var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    // declare const enum 編譯結果
    var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
    
    // 上方兩者本質上是相同的
    ```
    

### 3-5. 類別 ( Class )

- **class 類的介紹**
    - 類 ( class ): 定義了一件事物抽象的特點，包含了其屬性與方法
    - 對象 ( instance ): 類的實例透過 new 建構子所生成
    - 物件導向 ( OOP ) 的三大特性: 封裝、繼承、多態
        - **封裝 ( Encapsulation )**: 將對數據的操作細節隱藏起來，只暴露對外的接口，在外調用時不需要知道其中細節就能完成相對應的實例建立，同時保障了該實例內部的資料不會隨意被外部改變
        - **繼承 ( inheritance )**: 子類會繼承父類所有的特性，並且己身也有更具體的特性
        - **多態 ( polymorphism ):** 多種形態之意，也就是說同個類別及其延伸出多個子類的同個方法可以有不同的實現 ( 多態（polymorphism）是指同一個方法名稱在不同的類別中可以有不同的實現，這樣的設計允許在使用這些對象時保持統一的接口，同時根據實際的對象類型調用相對應的實現。 )
            - **範例**
                
                ```tsx
                class Shape {
                  area() {
                    return 0;
                  }
                }
                
                class Circle extends Shape {
                  constructor(radius) {
                    super();
                    this.radius = radius;
                  }
                
                  area() {
                    return Math.PI * Math.pow(this.radius, 2);
                  }
                }
                
                class Square extends Shape {
                  constructor(side) {
                    super();
                    this.side = side;
                  }
                
                  area() {
                    return Math.pow(this.side, 2);
                  }
                }
                
                function printArea(shape) {
                  console.log(`Area: ${shape.area()}`);
                }
                
                const circle = new Circle(5);
                const square = new Square(4);
                
                printArea(circle); // 输出 "Area: 78.53981633974483"
                printArea(square); // 输出 "Area: 16"
                ```
                
        - 存取器 ( getter & setter )
        - 修飾符 ( modifier ): ex: public , private, readonly, static
        - 抽象類 ( abstract ): 抽象類是其他類的基類，其特性是不許被實例化，抽象類內的方法必須在子類中被實現
        - 介面 / 接口 ( interfaces ): 不同的類之間若有共同的方法或屬性可以抽象成一個共用接口 ( interface ) ，接口可以被類實現 ( implements )。一個類可以繼承自另一個類，但一個類可以實現多個  interface
        
- class 是 js ES6 後才引入的概念，在這之前是使用建構函式搭配原型鍊繼承的概念來實現類似功能

typescript 在 class 內有三種修飾符可以使用，static 算是 ES7 就有的，所以算三個

**需注意: 由於 typescript 預設會編譯成 js ES5，而那時尚未有 class 的概念，因此有些不能讀取或取用的功能可能會在編譯後而消失，但不影響開發**

- **public**
    
    **public** ( 對應的是原 js ES6 中預設的 class 屬性 ): 基本上與 class 的預設屬性一樣，以下是範例與說明 ( 可以在 class 內部以及子類使用，而在其所創造的 instance 內可以讀取與取用 )
    
    ```tsx
    class Animal {
      public name: string;
      public star = '星星'; 
      public constructor(name) {
          this.name = name;
      };
      public printStar(){
        console.log(this.star) // 但可以在 class 內部被取用
      }
    }
    
    //  不可以直接在 class 外讀取 public 屬性
    console.log(Animal.star)  //  TS2339: Property 'star' does not exist on type 'typeof Animal'.
    
    // 可以在其產生的 instance 使用其屬性與方法
    const animal = new Animal('金剛')
    console.log(animal.star)// 星星，instance 可以讀取 public 屬性
    console.log(animal.name)// 金剛，instance 可以讀取 public 屬性
    console.log(animal.printStar()) // 星星，instance 可以使用 public 方法
    
    // 若是該 class 的子類
    
    class Dog extends Animal {
      public constructor(name) {
        super(name, star) 
    			// name ts 可以正常編譯
    			// star ts 會編譯錯誤 Cannot find name 'star'. Did you mean the instance member 'this.star'?
      }
    }
    
    const dog = new Dog('Alan')
    console.log(dog.name)// Alan 可以被子類繼承 子類創造的 instance 可以讀取
    console.log(dog.star)// 星星 雖然 ts 編譯錯誤 但仍可以被子類繼承 子類創造的 instance 可以讀取
    ```
    
- **private**
    
    private ( 對應的是原 js ES6 中的 # 符號 ): 與 js 的私有屬性一樣，以下是範例與說明 ( 只能在 class 內部使用，子類不能繼承，而在其所創造的 instance 內也不可以讀取與取用 )
    
    ```tsx
    class Animal {
      private name: string;
      private star = '星星'; 
      public constructor(name) {
          this.name = name;
      };
      private printStar(){
        console.log(this.star) // 但可以在 class 內部被取用
      }
    }
    
    const animal = new Animal('金剛')
    console.log(animal.printStar()) // instance 不可以使用 private 方法 error TS2341: Property 'printStar' is private and only accessible within class 'Animal'.
    console.log(animal.name) // instance 不可以讀取 private 屬性 error TS2341: Property 'name' is private and only accessible within class 'Animal'.
    console.log(Animal.star)  //  不可以直接在 class 外讀取 private 屬性 error TS2339: Property 'star' does not exist on type 'typeof Animal'.
    
    class Dog extends Animal {
      public constructor(name) {
        super(name, star) // private 無法被繼承 Cannot find name 'star'. Did you mean the instance member 'this.star'
      }
    }
    
    const dog = new Dog('Alan')
    console.log(dog.name)  // private 無法被繼承  error TS2341: Property 'name' is private and only accessible within class 'Animal'.
    console.log(dog.star) //   private 無法被繼承 error TS2341: Property 'star' is private and only accessible within class 'Animal'
    
    // 而若是 該 class 的 constructor 是用 private 修飾符，則連構建 instance 都不行
    class Animal {
      private name: string;
      private constructor(name) {
          this.name = name;
      };
    }
    const animal = new Animal('金剛') // 連 instance 都建不成 error TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.
    ```
    
- **protected**
    
    protected ( 原 js 沒有對應的 ): 與 private 相似，不同點是其子類可以繼承，但在其或棋子類所創造的 instance 內也不可以讀取與取用
    
    ```tsx
    class Animal {
      protected name: string;
      protected star = '星星'; 
      public constructor(name) {
          this.name = name;
      };
      protected printStar(){
        console.log(this.star)  // 但可以在 class 內部被取用
      }
    }
    
    console.log(Animal.star) // 不可以直接在 class 外讀取 protected 屬性 error TS2339: Property 'star' does not exist on type 'typeof Animal'. error TS2339: Property 'star' does not exist on type 'typeof Animal'.
    
    const animal = new Animal('金剛')
    console.log(animal.printStar()) // instance 不可以使用 protected 方法 error TS2445: Property 'printStar' is protected and only accessible within class 'Animal' and its subclasses
    console.log(animal.name) //  instance 不可以取用 protected 屬性  error TS2445: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
    
     
    
    class Dog extends Animal {
      public constructor(name) {
        super(name) 
      }
    }
    
    const dog = new Dog('Alan')
    console.log(dog.name)  // 子類 instance 不可以讀取 protected 屬性 error TS2445: Property 'name' is protected and only accessible within class 'Animal' and its subclasses.
    console.log(dog.star) // 子類 instance 不可以讀取 protected 屬性 error TS2445: Property 'star' is protected and only accessible within class 'Animal' and its subclasses.
    ```
    
- **static**
    
    static ( 屬於 ES7 js 的功能，TS 只是沿用 ):  class 內部可以被使用，子類可以繼承外，在 class 的外部可以直接讀取與寫入，但在其所創造的 instance 內也不可以讀取與取用
    
    ```tsx
    class Animal {
      static name: string; // error Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'Animal'.
      static star = '星星'; 
      public constructor(name) {
          this.name = name; // error TS2576: Property 'name' does not exist on type 'Animal'. Did you mean to access the static member 'Animal.name'
      };
      static printStar(){
        console.log(this.star) // 可以在class 內部被取用
      }
    }
    
    console.log(Animal.star) // 可以直接在 class 外讀取 static 屬性
    console.log(Animal.printStar()) // 可以直接在 class 外使用 static 方法
    
    const animal = new Animal('金剛')
    console.log(animal.printStar()) //  instance 不可以使用 static 方法 error TS2576: Property 'printStar' does not exist on type 'Animal'. Did you mean to access the static member 'Animal.printStar' instead?
    console.log(animal.name) // instance 不可以讀取 static 屬性 error TS2576: Property 'name' does not exist on type 'Animal'. Did you mean to access the static member 'Animal.name
    
    // static 子類可以繼承屬性與方法
    class Parent {
      static myMethod() {
        console.log('Parent');
      }
    }
    
    class Child extends Parent {
      static childMethod() {
        console.log('Child');
      }
    }
    
    console.log(Parent.myMethod()) // parent
    console.log(Child.myMethod()) //parent
    ```
    
- **readonly**
    
    若加上 readonly 在屬性上代表該屬性是唯獨的，也就是不能被重新賦值的 ( 也就是第一次在建構函式內被賦值是可以的 )，若與其他修飾符( ex: public, private, protected ) 連用，通常寫在其後
    
    ```tsx
    class Animal {
    	  public readonly name; // 若與其他修飾符( ex: public, private, protected ) 連用，通常寫在其後
        public constructor(name) {
            this.name = name;
        }
    }
    
    let a = new Animal('Jack');
    console.log(a.name); // Jack
    a.name = 'Tom'; // 唯獨屬性，匯出
    
    // index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
    ```
    
- **abstract class 抽象類別**
    
    **說明:** 抽象類別與一般類別的不同是其不能直接實例化 ( 產生 instance )，其通常是為了做為其子類繼承的存在，而類別內的屬性或方法若有 abstract 做修飾，則該屬性在該類別時則只能有型別定義，並在子類別繼承該類別時這些 abstract 做修飾的屬性與方法必須被具體實現
    
    ```tsx
    // 定義抽象類別 Role
    // 注意 abstract class 開頭就代表其不能直接產生 instance ( 繼承的 subclass 才行 )
    // 另外若拿掉 abstract 只有 class 的話就代表可以產生 instance
    abstract class Role {
        abstract name: string; // 抽象屬性，只定義型別，子類別必須實現
        abstract hp: number; // 抽象屬性，只定義型別，子類別必須實現
    
        protected position: { x: number, y: number } = { x: 0, y: 0 }; // 受保護的方法，可以在子類被繼承或調用
    
        constructor(name: string, hp: number) {
            this.name = name;
            this.hp = hp;
        }
    
    	// 一般方法預設為 public，可以在子類別中重寫
        move(x: number, y: number) {
            this.position.x = x;
            this.position.y = y;
            console.log(`${this.name} 移動到位置 (${x}, ${y})`);
        }
    
        abstract attack(): void; // 抽象方法，只定義型別，子類別必須實現
    }
    
    // 子類別 Warrior 繼承自 Role
    class Warrior extends Role {
        constructor() {
    			// subclass 中 constructor 內用 super 本質上用的是 parent constructor
    			// 實現 parent 中的 abstract 屬性 name 與 hp
            super("戰士", 100); // 呼叫父類別的構造函式
        }
    		// 實現 parent 中的 abstract 方法
        attack() {
            console.log(`${this.name} 發動攻擊！`);
        }
    }
    
    // 創建一個戰士角色
    const warrior = new Warrior();
    warrior.move(10, 20); // 移動到位置 (10, 20)
    warrior.attack(); // 戰士 發動攻擊！
    ```
    

### 3-6. 類別與介面 ( Class & Interface )

這章主要是來探討 class 與 interface 的異同，以及其間的混用方式

- **相同點**
    - class 與 interface 都能用來描述結構 ( 內部屬性與方法 ) 與型別
        
        ```tsx
        class Point {
            x: number;
            y: number;
        }
        
        interface Point3d extends Point {
            z: number;
        }
        ```
        
    - **同類 extends:** class 可以 extends ( 繼承 ) 另一個 class，interface 也可以 extends 另一個 interface
        
        ```tsx
        // class extends class
        
        // 基底類別
        class Animal {
          constructor(public name: string) {}
        
          // 基底類別的方法
          makeSound(): void {
            console.log('Generic animal sound');
          }
        }
        
        // 衍生類別
        class Dog extends Animal {
          // 衍生類別可以擁有自己的屬性
          breed: string;
        
          // 衍生類別的建構子
          constructor(name: string, breed: string) {
            // 使用 super 呼叫基底類別的建構子
            super(name);
            this.breed = breed;
          }
        
          // 衍生類別可以覆寫基底類別的方法
          makeSound(): void {
            console.log('Woof! Woof!');
          }
        
          // 衍生類別可以擁有自己的方法
          bark(): void {
            console.log('Barking...');
          }
        }
        ```
        
        ```tsx
        // interface extends interface
        
        interface Alarm {
            alert(): void;
        }
        
        interface LightableAlarm extends Alarm {
            lightOn(): void;
            lightOff(): void;
        }
        ```
        
- **相異點**
    - **implements 實現:** 只有 class 能夠實現 ( implements ) 1 個或多個 interface ( 但 interface 無法 implements class )
        
        ```tsx
        // 類別實現多個介面
        class Car implements Alarm, Light {
          alert() {
              console.log('Car alert');
          }
          lightOn() {
              console.log('Car light on');
          }
          lightOff() {
              console.log('Car light off');
          }
        }
        ```
        
    - **異類 extends:** interface 可以 extends class ( 但 class 不能 extends interface )
        
        ```tsx
        class Point {
            x: number;
            y: number;
        }
        
        interface Point3d extends Point {
            z: number;
        }
        
        let point3d: Point3d = {x: 1, y: 2, z: 3};
        ```
        
    - **建構子:** class 有建構子 ( 所以可以生成 instance )，但 interface 沒有 ( 所以無法生成 instance )
    - **執行代碼:** class 在運作時會編譯產生對應的 js 代碼，但 interface 不會 ( 其主要只用於型別檢查 )
    - **修飾符:** class 有存取修飾符( public, private, protected, static ) 但 interface 沒有
### 3-7. 泛型 ( Generics )

泛型的意思是在定義函式、介面、類別時，先不定義具體的型別，而是在使用時再自行指定型別

- **基本使用**
    
    ```tsx
    // 將以下 ts 邏輯換成泛型
    function createArray(length: number, value: any): Array<any> {
        let result = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    
    createArray(3, 'x'); // ['x', 'x', 'x']
    
    // 泛型寫法
    // 函式名後添加了 <T>，其中 T 用來指代任意輸入的型別
    function createArray<T>(length: number, value: T): Array<T> {
        let result = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }
    
    createArray(3, 'x'); // ['x', 'x', 'x']
    ```
	- **多種型別參數**
    
    泛型也可以一次定義多種型別的參數
    
    ```tsx
    // 範例
    function swap<T, U>(tupleArr: [T, U]): [U, T] {
    	return [tupleArr[1], tupleArr[0]]
    }
    
    swap([7, 'seven'])
    ```
	   
- **泛型約束**
    
    由於事先不知道它是哪種型別，所以不能隨意的操作它的屬性或方法，若不事先定義 ( 約束 ) 就會出現 ts 編譯錯誤
    
    ```tsx
    interface Lengthwise {
      length: number;
    }
    
    //  我們使用了 extends 約束了泛型 T 必須符合介面 Lengthwise 的形狀，也就是必須包含 length 屬性。
    function loggingIdentity<T extends Lengthwise>(arg:T): T {
      console.log(arg.length)
      return arg
    }
    loggingIdentity(['123', '456']) // 編譯成功
    
    //  由於事先不知道它是哪種型別，所以不能隨意的操作它的屬性或方法，若不事先定義(約束) 就會出現 ts 編譯錯誤
    function logging<T>(arg: T): T{
      console.log(arg.length) //  error TS2339: Property 'length' does not exist on type 'T'.
      return arg
    }
    ```
    
- **泛型介面**
    
    之前的章節也有提過，函式可以已介面的方式表示
    
    ```tsx
    interface checkStringFunc {
      (mainString: string, subString: string): boolean
    }
    
    let currentSearch: checkStringFunc;
    currentSearch = function(mainString, subString){
      return mainString.length >= subString.length
    }
    
    // 若使用泛型可以調整如下
    
    interface doHavesLength {
      length: number,
    }
    
    interface checkStringFunc {
      <T extends doHavesLength>(mainString: T, subString: T): boolean
    }
    
    // 或是
    // interface checkStringFunc<T extends doHavesLength>{
    //  (mainString: T, subString: T): boolean
    //}
    
    // 記住宣告型別時，要帶入要使用的型別，若沒帶入會出現錯誤 ( Generic type 'checkStringFunc<T>' requires 1 type argument(s). )
    let currentSearch: checkStringFunc<string>;
    currentSearch = function(mainString, subString){
      return mainString.length >= subString.length
    }
    
    // 或者可以使用預設型別的作法，就不一定要帶入型別 如下
    interface doHavesLength {
      length: number,
    }
    
    interface checkStringFunc  <T extends doHavesLength = string>{
      (mainString: T, subString: T): boolean
    }
    
    let currentSearch: checkStringFunc;
    currentSearch = function(mainString, subString){
      return mainString.length >= subString.length
    }
    ```
    - **泛型類別**
    
    ```tsx
    // index.ts
    class Animal {
      name: string; // 注意 這是 ts 才寫的喔，為方便 constructor 中的調用
      age: number;  // 注意 這是 ts 才寫的喔，為方便 constructor 中的調用
      category: string;  // 注意 這是 ts 才寫的喔，為方便 constructor 中的調用
      constructor(name:string, age: number, category:string ){
        this.name= name;
        this.age = age;
        this.category = category;
      }
      nameSpecies(): string {
        return `my specie is ${this.category}`
      }
    }
    
    const dog: Animal = new Animal('Dog', 2, 'Dog Category')
    console.log(dog.nameSpecies())
    
    // 若編譯成 js es6 會變成如下 ( 指令是 tsc index.ts -target es6 )
    class Animal {
        constructor(name, age, category) {
            this.name = name;
            this.age = age;
            this.category = category;
        }
        nameSpecies() {
            return `my specie is ${this.category}`;
        }
    }
    const dog = new Animal('Dog', 2, 'Dog Category');
    console.log(dog.nameSpecies());
    ```
- **函式的泛型參數**
    
    ```tsx
    function createSomeValueArray<T>(givenLength: number, inputValue: T):Array<T> {
      let returnArray: T[] =[];
      for(let i =0 ; i < givenLength ; i++) {
        returnArray.push(inputValue);
      }
      return returnArray;
    }
    
    console.log(createSomeValueArray(3, 2))
    
    // 也可帶入預設型別
    
    function createSomeValueArray<T=string>(givenLength: number, inputValue: T):Array<T> {
      let returnArray: T[] =[];
      for(let i =0 ; i < givenLength ; i++) {
        returnArray.push(inputValue);
      }
      return returnArray;
    }
    
    console.log(createSomeValueArray<number>(3, 2))
    ```
### 3-8. 宣告合併

在前面我們有講到 同名函式的宣告合併，也就是函式的過載，而同名的介面 ( interface ) 也有類似函式的過載現象 ( 但 class 沒有此現象 )

- **函式的過載**
    
    如前章節所述，這邊簡單舉個範例，若想看詳細部分請參考 2-7. 函式的型別
    
    ```tsx
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```
    
- **介面的宣告合併**
    
    同名的介面 ( interface ) 也有類似函式的過載現象
    
    ```tsx
    interface Alarm {
      price: number
    }
    
    interface Alarm {
      description: string
    }
    
    const newAlarm: Alarm = {
      price: 1000,
      description: 'this is a test alarm'
    }
    
    const alarm: Alarm = {
      description: 'this is a test alarm' // 編譯會出錯，因為沒有涵蓋 price  error TS2741: Property 'price' is missing in type '{ description: string; }' but required in type 'Alarm'.
    }
    
    // 也就是說上方的兩個 Alarm interface 在 ts 眼中同等於
     interface Alarm {
      price: number
    	description: string
    }
    ```
### 3-9.  keyof

typescript 中的 keyof 顧名思義就是指 將型別定義為某個 interface , class 內部屬性作為 字串字面量型別 ( **Template Literal Types )** 的聯合型別 **( union type )**

interface 與 class 搭配 keyof 的範例程式碼與說明如下

```tsx

// interface 與 keyof 的用法範例
interface Person {
  name: string;
  age: number;
  location: string;
}

// 使用 keyof Person 就等於 type k1 = "name" | "age" | "location"  也就是只能是這三個值
type K1 = keyof Person; // "name" | "age" | "location" 

// 所以在這個值之外會報編譯錯誤
let PersonTryK1: K1;
PersonTryK1 = '12345' // error TS2322: Type '"12345"' is not assignable to type 'keyof Person'.

// class 與 keyof 的用法範例
class Person {
  name: string = "Semlinker";
}

let sname: keyof Person; // 一樣會限縮值只能是 class 內的屬性 'name'
sname = "name"; // ok
sname = "age"; // error TS2322: Type '"age"' is not assignable to type 'keyof Person'.
```

- 但需要特別注意以下寫法所代表的意義

```tsx
interface Person {
  name: string;
  age: string;
  location: string;
}

type K2 = keyof Person[];  // number | "length" | "push" | "concat" | ...
// 注意這邊代表的結果是 type K2 的型別與值是 number 或 'length', 'push' 等等的聯合型別
// 而不是我們直覺認為的 'name', 'age', 'location' 等所組成的陣列
// 因為這邊 keyof 對應的是 Person 這個 array 所代表的原型物件
// 也就是說若取這原型物件的 key 的話會是數值索引，所以是 number 型別的值都可以接受
// 也會是原型方法的名稱 'length', 'push'...etc. 作為 Template literal type 的聯合型別

type K3 = keyof { [x: string]: Person };  // string | number
// 注意這邊代表的結果是 type K3 的型別可以是 string 或 number
// 而不是我們直覺認為的 'name', 'age', 'location' 等所組成的物件
// 也不是我們以為的 Person 內所有 key 的聯合型別 ( 若是的話就只有 string )
// 因為這邊 keyof 對應的是 Person 這個 object 所代表的原型物件
// 而在 js 的物件中其 key 可以是數值或是字串
// 所以這邊 type K3 會是字串或是數值的聯合型別

```

- 另外一個相對少見的用法是 keyof 與 index signatures 的配合

```tsx
// keyof with index signatures
type StringMap = { [key: string]: unknown }
// keyof StringMap 會抽出 StringMap 的 key 型別，而這邊範例同等是 'string'
function createStringPair(property: keyof StringMap, value: string): StringMap {
  return { [property]: value };
}
```

### 3-10. typeof

常寫前端的開發者對於 javascript 中的 typeof 應該不陌生，其運算子 (operator) 常被用來判定某麼變數所代表的型別，但在強調先定義型別的 typescript 中， typeof 有另外的用法，就是將型別推導 ( type inference ) 的變數 (具體實現非型別)，轉成對應的型別

```tsx
// 比如下方範例

// 透過 typescript 提示，當我們將滑鼠移到以下這段程式碼的上方時雖能夠呈現
// typescript 透過型別推論所對應的型別
// 但該型別是由 typescript 的型別推論的特性導出的，並不能被其他變數複用該型別
const conference = {
    name: 'MOPCON',
    year: 2021,
    isAddToCalendar: true,
    website: 'https://mopcon.org/2021/',
};

// 此時就可以藉由 typeof 將該變數轉化成型別方便讓其他變數複用
type Conference = typeof conference;

// 其同等如下
type Conference: {
  name: string;
  year: number;
  isAddToCalendar: boolean;
  website: string;
};

// 也可以搭配 keyof 使用，來限縮型別賦值的範圍
type ConferenceKeys = keyof typeof conference; //   "name" | "year" | "isAddToCalendar" | "website"
```

### 3-11. keyof 與 typeof 的連用

以下是 keyof 與 typeof 的常見到的使用方式，透過 typeof 先將 enum 變成型別後，再用 keyof 將 enum 所定義的 key 作為 Template Literal Types 聯集

```tsx
// 透過 Template Literal Types 把 enum 的 values 取出變成聯集
enum MANUFACTURE {
    APPLE = 'apple',
    SAMSUNG = 'samsung',
    GOOGLE = 'google',
    SONY = 'sony',
  }

  type Manufacture = `${MANUFACTURE}`; // "apple" | "samsung" | "google" | "sony"

// 若是需要將 enum 的 key 取出變成 union types 
enum MANUFACTURE {
  APPLE = 'apple',
  SAMSUNG = 'samsung',
  GOOGLE = 'google',
  SONY = 'sony',
}
type ManufactureKeys = keyof typeof MANUFACTURE; // "APPLE" | "SAMSUNG" | "GOOGLE" | "SONY"
```

## 四、工具型別 ( Utility Types )

官網: [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)

Typescript 也內建了些工具型別，以加速常見的型別轉換
### 4-1. Partial\<Type\>

建立一個型別將引入的 型別 內所設定的屬性皆設定成 optional

```tsx
interface Todo {
    title: string;
    description: string;
}

// Partial 將傳入的 Todo 內部屬性全設成 optional
function updateThisTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return {...todo, ...fieldsToUpdate}
}

const oldTodo = {
    title: '購買每月零食',
    description: '購買巧克力棒、無糖飲料、黑巧克力'
}

const newTodo = updateThisTodo(oldTodo, {
    description: '買奇多餅乾、多力多滋辣味'
})
```
### 4-2. Required\<Type\>

與 Partial 的功能相反，將傳入型別的內部所有屬性都設為必須

```tsx
// 我們使用稍早 Partial 的例子，但將其型別內部屬性都改成可選屬性
interface Todo {
    title?: string;
    description?: string;
}

// 但這邊第二個參數改成使用 Reqired 將傳入屬性的型別內部屬性全改成必須屬性
function updateThisTodo(todo: Todo, allUpdate: Required<Todo>) {
    return {...todo, ...allUpdate}
}

const oldTodo = {
    title: '購買每月零食',
    description: '購買巧克力棒、無糖飲料、黑巧克力'
}

// 若我們用 Partial 的寫法則會出現以下編譯錯誤
const newTodo = updateThisTodo(oldTodo, { // error
    description: '買奇多餅乾、多力多滋辣味'
})
// error TS2345: Argument of type '{ description: string; }' is not assignable to parameter of type 'Required<Todo>'.
// Property 'title' is missing in type '{ description: string; }' but required in type 'Required<Todo>'

// 正確寫法如下
const newRewriteTodo = updateThisTodo(oldTodo, { 
    title: '購買 11 月零食',
    description: '買奇多餅乾、多力多滋辣味'
})
```
### 4-3. Readonly\<Type\>

將傳入型別內部的所有屬性皆改成只能讀取不能寫入

```tsx
interface Todo {
    title: string;
    description: string;
}

const todo: Readonly<Todo> = {
    title: '購買每月零食',
    description: '購買巧克力棒、無糖飲料、黑巧克力'
}

todo.title = '11 月購買零食' //  error TS2540: Cannot assign to 'title' because it is a read-only property.
```

### 4-4. Record\<keys, Type\>

用來建立物件的型別，藉由傳入各兩種型別以分別約束 該物件 key 以及 value 的型別

註: 由於物件的 keys 大都是 string 型別，應此較常的做法是傳入**字串字面量型別 ( Template Literal Types )** 以做 key 的型別限制

```tsx
type CatName = '丁丁'| '拉拉'| '迪西'|'小波'; // keys type

interface CatInfo { // value type
    age: number;
    breed: string;
}

// 注意: Record 建立的該物件需涵蓋 該 key 傳入的 type 所有的 template Literal Types
// 否則編譯會跳錯
const myCats: Record<CatName, CatInfo> = {
    丁丁: {age: -20, breed: 'notHuman'},
    拉拉: { age: -15, breed: 'alien' },
    迪西: {age: -10, breed: 'sunny'},
    小波: {age: -5, breed: 'CBeebies'}
}
```
### 4-5. Pick\<Type, keys\>

從傳入的型別內挑選需要的屬性並另行建立成另一個型別

```tsx
type CatName = '丁丁'| '拉拉'| '迪西'|'小波'; 

interface CatDetailInfo { 
    name: CatName;
    age: number;
    breed: string;
    hobbies: string[];
}

type CatBasicInfo = Pick<CatDetailInfo, 'name'|'age'>

// 新建立的物件需涵蓋所有 Pick 的屬性否則會報錯
const myCat: CatBasicInfo = {
    name: '丁丁',
    age: -5,
}
```
### 4-6. Omit\<Type, keys\>

與 Pick 的概念相反，Pick 是挑出所需要的屬性; Omit 是挑出所不需要的屬性保留剩下的那部分

```tsx
type CatName = '丁丁'| '拉拉'| '迪西'|'小波'; 

interface CatDetailInfo { 
    name: CatName;
    age: number;
    breed: string;
    hobbies: string[];
}

type CatBasicInfo = Omit<CatDetailInfo, 'breed'|'hobbies'>

// 新建立的物件需包含 omit 掉剩下的所有屬性否則會報錯
const myCat: CatBasicInfo = {
    name: '丁丁',
    age: -5,
}
```
### 4-7. Exclude\<UnionType, ExcludedMembers\>

從傳入的聯合型別中建立一個排除指定型別的聯合型別

```tsx
type MyFriends = '丁丁'| '拉拉'| '迪西'|'小波'; 

type YourFriends = Exclude<MyFriends, '丁丁'> // "拉拉" | "迪西" | "小波"
type HisFriends =  Exclude<MyFriends, '丁丁'|'拉拉'> // "迪西" | "小波"

// 排除 Function 型別
type ExcludeFunction = Exclude<string| number| (()=> void), Function> // string | number

// 物件的聯合型別
type Shape = { kind: 'circle'; radius: number} | { kind: 'square'; radius: number} | { kind: 'triangle'; radius: number; y:number}

// 可以不用完成列出就可以排除
type square =Exclude<Shape, {kind:'circle'} | {kind:'triangle'}>  // type square = { kind: 'square'; radius: number;}
```
### 4-8. Extract\<Type, Union\>

取傳入兩個 ( 聯合 ) 型別的交集

```tsx
type MyFriends = '丁丁'| '拉拉'| '迪西'|'小波'; 

type YourFriends = Extract<MyFriends, '丁丁'|'拉希'> // type YourFriends = "丁丁"
type HisFriends =  Extract<MyFriends, '丁丁'|'迪西'> // type HisFriends = "丁丁" | "迪西"

// 取出 Function 型別
type ExcludeFunction = Extract<string| number| (()=> void), Function> // type ExcludeFunction = () => void

// 物件的聯合型別
type Shape = { kind: 'circle'; radius: number} | { kind: 'square'; radius: number} | { kind: 'triangle'; radius: number; y:number}

// 可以不用完成列出就可以包含
type square =Extract<Shape, {kind:'circle'} | {kind:'dot'}>  // type square = { kind: 'circle'; radius: number;}
```

### 4-9. **NonNullable\<Type\>**

將傳入的型別排除 null, undefined 這兩個型別後建立一個新型別

```tsx
type MyFriends = '丁丁'| '拉拉'| '迪西'|'小波' ;

type AllFriends = MyFriends[] | MyFriends | undefined | null

type RealFriends = NonNullable<AllFriends> // type RealFriends = "丁丁" | "拉拉" | "迪西" | "小波" | MyFriends[]
```

## 四、參考資料

此份文件是筆者針對主要以 [Typescript 新手指南](https://willh.gitbook.io/typescript-tutorial/) 這本書作為主要介紹框架，加上個人理解以及練習範例進行補充與括寫而成，若有對於內文有疑義處，歡迎與筆者聯繫! 

- [https://willh.gitbook.io/typescript-tutorial/](https://willh.gitbook.io/typescript-tutorial/)
- [https://www.typescriptlang.org/docs/handbook/intro.html](https://www.typescriptlang.org/docs/handbook/intro.html)
- [https://github.com/Microsoft/TypeScript/tree/main/src/lib](https://github.com/Microsoft/TypeScript/tree/main/src/lib)
- [https://www.bilibili.com/video/BV1Qa4y1U7wN?p=1&vd_source=d5c19045348d912b54a459183b1b13db](https://www.bilibili.com/video/BV1Qa4y1U7wN?p=1&vd_source=d5c19045348d912b54a459183b1b13db)
- [https://pjchender.dev/ironman-2021/ironman-2021-day13/?source=post_page-----92fb5566b9e6--------------------------------](https://pjchender.dev/ironman-2021/ironman-2021-day13/?source=post_page-----92fb5566b9e6--------------------------------)
- [https://juejin.cn/post/7023238396931735583?source=post_page-----92fb5566b9e6--------------------------------](https://juejin.cn/post/7023238396931735583?source=post_page-----92fb5566b9e6--------------------------------)
- [https://www.w3schools.com/typescript/typescript_keyof.php](https://www.w3schools.com/typescript/typescript_keyof.php)