---
title: 導入 jest 單元測試
description: 但當專案邏輯越來越複雜，開發完成後新的需求卻陸續增加，難免會遇到修 A 壞 B ，以及碰到一推修不完的 bug，而在團隊開發時也常因為不了解前任開發者的撰寫邏輯而花上許多研究的時間成本，而導入單元測試能夠改善以上問題，降低專案開發與團隊協作的成本
tags: ['前端', '單元測試', 'jest']
date: 2023-10-20
type: doc
publish: true
---
# 導入 jest 單元測試

## 一、 前言: 前端為何也要做單元測試 ?

- 光是開發專案新需求都來不及了，為何還要再花時間再加入單元測試呢?
    
    確實在專案尚不複雜的時候，寫測試是件既花時間也看不出實際價值的事情，與其花時間寫測試，不如多加點客戶需求功能，公司也能多賺點錢，而且導入新的技術也是花成本，團隊要適應也是件要花時間的事，沒事幹嘛要搬石頭來砸自己的腳呢? 這是個常見且合理的想法，但當專案邏輯越來越複雜，開發完成後新的需求卻陸續增加，難免會遇到修 A 壞 B ，以及碰到一推修不完的 bug，而在團隊開發時也常因為不了解前任開發者的撰寫邏輯而花上許多研究的時間成本，而導入單元測試能夠改善以上問題，降低專案開發與團隊協作的成本。
    
    但工具終究是工具，是不是每個專案都有必要導入測試工具則是另一個課題，若導入後並沒有如預期降低團隊整體的開發成本，是否採用則須做詳細的評量與取捨。
    
- 導入單元測試對前端開發有哪些好處，這邊羅列如下
    1. 減少錯誤與漏洞
        
        說明: 透過定義期望的輸入與輸出結果，測試可以有效的幫助開發人員在開發初期即時的發現錯誤並修復，以確保程式碼符合目標的商業邏輯。
        
        例如: 開發新專案的購物車流程，透過單元測試可以有效的確認購物車的核心邏輯 ( 商品計量與計價的加總 )，且在每次修改後可自動運行，以防止錯誤的邏輯被上線。
        
    2. 增強團隊的代碼品質
        
        說明: 透過導入單元測試也等於變相鼓勵開發的成員寫出更整潔、模組化方便測試的模組，而這更有助於改善整體程式碼的質量，方便後續代碼的維護與擴展
        
    3. 提高代碼的可維護性
        
        說明: 單元測試可以確保代碼的穩定性，當後續維護時需要對於功能做調整時，也可透過測試套件，以確保新增的功能不會破壞原有的功能。而且當修改代碼並運行測試，測試未通過時也會立即知道出錯處所在，也方便後續修復
        
    4. 提高協作性
        
        說明: 測試用例可以作為代碼的文檔和示例，幫助其他開發者了解如何使用你的函數或類。這提供了代碼的實際使用案例，並幫助新人快速上手。
        
    5. 加速開發週期
        
        說明: 儘早發現並修復錯誤可以節省時間，減少延遲和重工。
        

- 導入單元測試的側重點
    - 確定測試範圍: 先確認目前要測試的目標範圍，是模塊或組件、還是整個應用程式
        
        建議一開始先將測試聚焦在較小的模組化部分，以確保測試的可讀與維護性，優先聚焦於較複雜與關鍵性的核心商業邏輯，因為這部分有更多潛在的錯誤風險，需要優先進行測試，其後逐漸擴大測試範圍，以期增加該專案的測試覆蓋率
        
    - 列出確切的功能以及預計行為: 對於目標範圍的組件，列出其預計的功能以及行為，這些功能或行為必須是具體的，可量化的 ex: 登入成功後，使用者應該要被導到首頁
    - 寫好測試腳本: 編寫具體、清晰、可讀性高的測試用例，確保它們獨立且簡單。使用適當的斷言函數來檢查預期的結果。
    - 盡量達到足夠的覆蓋率: 以確保你的測試涵蓋了代碼的大部分功能。達到高覆蓋率有助於減少未檢測到的錯誤。
    - 定期維護測試邏輯: 隨著代碼的變化而更新測試。測試應該是與代碼同步的，這樣它們才能保持有效。
    - 持續優化: 不斷改進目前的測試策略和流程，以期提高運作效率。
- 開始著手單元測試須注意項目
    - **功能或方法**：通常，最小的測試單位是一個功能或方法。這可以是一個具體的 JavaScript 函式，一個類中的一個方法，或一個模組中的某個功能。
    - **獨立性**：確保測試單位是獨立的，它不依賴於其他部分。你應該能夠單獨測試這個功能或方法，而不需要運行整個應用程式。
    - **可重現性**：測試單位應該具有可重現性，也就是無論何時何地執行這個測試，它都應該具有一致的行為和結果。
    - **有限範圍**：測試單位的範圍應該有限。不要嘗試一次性測試整個應用程式，而是專注於測試特定功能或方法。
    - **專注於單一情境**：每個測試單位應該專注於測試一個特定用例或情況。這有助於確保測試是具體且易於理解。
    - **簡單性**：測試單位應該足夠簡單，以便容易理解和編寫測試。如果測試單位變得太複雜，可能需要分解為更小的部分。
    
    假設你正在開發一個函數來執行使用者登入驗證，這個函數可能是一個模組化測試的最小單位。建議可以編寫多個測試用例，以測試不同的登入情境，並確保這個函數以各種情況下都按預期運作。
    
    縮小模組化測試的最小單位有助於確保測試具有可讀性、可維護性，並能夠快速檢測和修復問題。每個測試單位都應該是一個獨立的測試用例，它可以獨立運行並提供明確的結果。
    
- **Jest 介紹**
    - **什麼是 Jest？**
        
        [Jest](https://jestjs.io/) 是一個流行的 JavaScript 單元測試框架，特別適用於前端開發，但也可用於 JavaScript 開發的後端或通用項目。它由Facebook開發，以優化測試的編寫和運行流程，並提供一個全面的測試解決方案。
        
    - 主要特點
        
        Jest 提供了一系列強大的特點，使其成為眾多選擇中的首選：
        
        1. **易用性**：Jest 的設置簡單，並且具有合理的默認配置，這使初學者能夠快速入門。它支援多種測試語法，並附帶許多內建功能，如斷言函式、模擬工具和測試覆蓋率報告。
        2. **性能**：Jest 通常在執行速度和效能方面表現良好，這使其適用於大型專案，並且可以快速運行測試套件。
        3. **快照測試**：Jest 具有內建的快照測試功能，可用於驗證 UI 組件的渲染是否與預期一致。這有助於檢查視覺變化，並確保 UI 不會意外更改。
        4. **自動模擬**：Jest 具有內建的模擬工具，可以輕鬆模擬函數、模組或外部依賴，這有助於測試代碼的隔離性和可預測性。
        5. **測試覆蓋率報告**：Jest 提供了內建的測試覆蓋率報告，可幫助你了解代碼的測試覆蓋情況，確保你已經測試了足夠的代碼。
        6. **React 和 Vue 支援**：對於使用React和Vue.js等流行的前端框架的專案，Jest 提供了專門的測試工具，如React Testing Library和Vue Test Utils，使測試與這些框架無縫集成。
        
        總之，Jest 是一個全功能的 JavaScript 單元測試框架，具有易用性、高性能和強大的功能，使開發者能夠輕鬆編寫和運行測試，以確保代碼的正確性和穩定性。
        
- Vue Test Utils 與 jest 的關係
    
    Vue Test Utils 和 Jest 是兩個不同的工具，它們在Vue.js專案中通常一起使用，但有不同的職責和功能。
    
    - **Vue Test Utils:**
        - Vue Test Utils 是由 Vue.js 開發的，它是 Vue.js 官方團隊提供的工具庫，用於測試 Vue 組件的行為和渲染結果
        - 其提供了多組API，使你能夠測試Vue組件的行為和渲染結果
        - 可以用來創建、渲染和操作Vue組件，並提供斷言函數，以確保組件的行為是否符合預期。
    - Jest:
        - Jest 則是由 Facebook 開發的 JavaScript 測試框架，其提供了 JavaScript 代碼的測試框架，包括斷言函數、測試運行環境、測試套件組織等。
        - 提供了測試運行環境、斷言函數、測試套件組織等功能
    - 總的來說: Jest 是 js 的測試框架，而 Vue test Utils 是 Vue 為js測試框架能夠順利測試 Vue 組件所做的函式庫，其目的是為了增加 Vue 與測試框架的相容性

- 在 Vue Cli 中導入 jest
    
    補充: [Vue Test Utils 官網](https://test-utils.vuejs.org/installation/)
    
    **步驟 1：安裝測試相關的套件**
    
    ```powershell
    vue create jest_test
    yarn add --dev @vue/test-utils jest 
    vue add unit-jest 
    # vue add unit-jest 
    # 這會安裝對應 vue cli 版本的 @vue/cli-plugin-unit-jest，注意要用 vue add 
    # 若是用 yarn add @vue/cli-plugin-unit-jest 則非常有可能會安裝到不相符版本的組件導致運行不停出問題
    # 並且會自動設置以下步驟 2, 3 ，並會在 script 中增加 test 對應的指令
    # 會新增 jest.config.js 的文件
    ```
    
    補充 1:**[@vue/cli-plugin-unit-jest](https://cli.vuejs.org/core-plugins/unit-jest.html)**
    
    補充 2: 筆者使用的 Vue cli 版本是 5.0.8，請注意版本不同可能會有安裝上的些微差異
    
    ### **步驟 2：確認測試文件放置位置**
    
    通常，建議將測試文件放在專案的`tests`或`__tests__`文件夾中。你可以根據你的項目需求自定義文件夾結構。
    
    ### **步驟 3：撰寫測試用例**
    
    安裝好套件後，其也會在 tests 文件夾中會自動新增一個測試範例名為 example.spec.js 的測試其測試的目標為 HelloWorld.vue 此預設組件
    
    ```jsx
    // shallowMount 函式，功能: 用於渲染 Vue 組件
    import { shallowMount } from '@vue/test-utils'
    import HelloWorld from '@/components/HelloWorld.vue'
    
    // describe 這是 jest  中描述一組測試的函式，第一個參數的字串代表被測試的組件名稱
    describe('HelloWorld.vue', () => {
    // it 也是 jest 中的函式，第一個參數是描述測試場景 ( 當傳遞 msg 時，組件該如何渲染 )
      it('renders props.msg when passed', () => {
        const msg = 'new message'
    	// 使用 shallowMount 是 vue test utils 提供的 api 代表組件渲染時傳遞了上述定義的 msg 後
        const wrapper = shallowMount(HelloWorld, {
          props: { msg }
        })
    		// expect 是 jest 的斷言，其去判斷 wrapper.text() 渲染的文本內容是否符合(toMatch) msg 設定結果
        expect(wrapper.text()).toMatch(msg)
      })
    })
    ```
    
    - 補充 1: 在 jest 中其會自動查找文件中含 “spec” 或”test” 的文件來運行測試，這是約定俗成的命名方式，當然也可以更換此設定
    - 補充 2: 上述的寫法是測試整個元件 component ，但也可以測試單一函式
        
        範例 
        
        ```jsx
        // 先在  src 下創建 utils 並 export 兩個函式
        export const add = (a, b) => a + b;
        export const sub = (a, b) => a - b;
        ```
        
        - 回到測試檔案內容
        
        ```jsx
        import { add, sub } from '@/utils/math'
        describe('check function', () => {
          
          it('check add and substract', () => {
            expect(add(1,2)).toBe(3);
            expect(sub(2,1)).toBe(1);
          })
        })
        ```
        
    
    ### **步驟 4：運行測試**
    
    使用以下命令運行你的測試套件：
    
    ```jsx
    # npm
    npm run test:unit
     
    # yarn
    yarn test:unit
    ```
    

## 二、基本語法

在 jest 中，基本上有分成大小個測試單位

- Test Suite ( describe ) :  被 `describe()` 包起來的部分，群組化測試單元，讓程式看起來更有結構性
- Test Case ( test or it ) : 被 `test()` 或 `it( )` 包起來的部分，作為一個單元的測試

```jsx
// describe 群組化測試單元
describe('here is test suite', () => {
// 單元測試
  test('here is test case', () => {
    /* here is assertions */
  });

  test.todo('...');

  test.skip('here is test case', () => {
    /* assertions */
  });

  test.only('here is test case', () => {
    /* assertions */
  });

  test.failing('here is test case', () => {
    /* assertions */
  });

  // Vitest 的話是叫 fails
  test.fails('here is test case', () => {
    /* assertions */
  });
});
```

- 上述的 .todo(), skip(), only(), failing …etc. 都是 test 的修飾函數，其代表不同的功能
    - **`test.todo()` :**
        - 當運行測試時，此測試不會被執行，他只是提醒開發人員需要繼續編寫完這個測試用例
        - **如果還沒開始撰寫測試的細節，但知道要執行那些測試項目，可以使用** `test.todo(name)`。
    - test.skip( ) :
        - 當運行測試時，有標註 skip 函數的部分會被忽略不會被執行
        - 在 Jest 中可以使用 `describe.skip()` 或 `test.skip()` 就可以略過特定測試項目
        - `test.skip()` 等同於 `it.skip()`、`xit()`、`xtest()`
    - test.only( ):
        - 在一個測試作用域 ( test suite ) 通常會有多個 test ，而運行這個 describe的測試時，其只會運行有標註 only 的部分，這方便在開發時是否執行特定測試的調整
        - 一旦開發完成，記得去掉 only ，以避免其他的測試用例被忽略
        - 在 Jest 中可以使用 `describe.only()` 或 `test.only()`
        - `test.only()` 等同於 `it.only()`、`fit()`
    - test.failing() 或 test.fails()
        - 此修飾符是為了記錄一個失敗的測試用例
        - 也就是說就算其內定義的斷言可能成功，其也會被標示為失敗，使用目的通常是為了記錄測試失敗的案例，以方便後續的修復或追蹤
    

### 1. 常用的匹配 ( Common Matcher )

官方文件  [Using Matcher](https://jestjs.io/docs/en/using-matchers) 

**keywords: `toBe`, `toEqual`, `not.toBe`**

- [Using Matcher](https://jestjs.io/docs/en/using-matchers) @ Jest Docs > Introduction
- [Expect](https://jestjs.io/docs/expect) @ Jest API

- toBe: 比對值看是否相同

```jsx
// 功能類似 Object.is ，但不能用來比較物件內容 (傳參考)
test('one plus one is two', () => {
	expect(1 + 1).toBe(2)
})
```

- toEqual: 比較物件內容看是否相同

```jsx
test('object comparison', () => { 
	const person = { age: 18 } 
	expect(person).toEqual({age:18 })
})
```

- not: 是否不相同

```jsx
test('compare two numbers',() => {
	expect(1+1).not.toBe(4);
});
```

### 2. 布林比對 ( Truthiness )

**keywords: `toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeTruthy`, `toBeFalsy`**

- falsy value 中， undefined, null, 以及 false 其代表著不同的意義，若在寫測試時不想去區分他可以用 toBeTruthy() 或 toBeFalsy() 來判斷，或者用以下的方式判斷
    - toBeNull 只匹配 null
    - toBeUndefined 只匹配 undefined
    - toBeDefined 與 toBeUndefined 相反
    
    ```jsx
    test('null', () => {
      const n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
    });
    
    test('zero', () => {
      const z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
    });
    ```
    

### 3. 數值比對 ( Numbers )

**keywords: `toBeGreaterThan`, `toBeGreaterThanOrEqual`, `toBeLessThan`, `toBeLessThanOrEqual`, `toBeCloseTo`**

```jsx
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

注意: 對於浮點數 ( floating number ) 比較，要使用 `toBeCloseTo` 而不要用 `toBe` 或 `toEqual`，因為可能會有進位問題：

```jsx
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

### 4. 比對字串 ( Strings )

**keywords: `toMatch`, `not.toMatch`**

- 比較字串看是否符合某個正則表達式

```jsx
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

### 5. 比較陣列 ( Arrays and iterables )

**keywords: `toContain`**

- 可以藉由 `toContain` 去判斷該陣列是否涵蓋特定值

```jsx
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('the shopping list has milk on it', () => {
  expect(shoppingList).toContain('milk'); // Array
  expect(new Set(shoppingList)).toContain('milk'); // Set
});
```

### 6. 型別比較 ( 檢驗 )

**keywords: `expect.any()`, `expect.anyThing()`**

```jsx
expect.anything(); // 除了 null 或 undefined 的其他任何值皆會匹配
expect.any(Number); // 匹配任何值是該建構函式建構的值
```

實際比較時要使用 expect.toEqual() 的方法

```jsx
const number = 4;
expect(number).toEqal(expect.any(Number))
```

### 7. 比較物件 ( object )

**keywords: `toMatchObject(object)`, `objectContaining()`, `toEqual()`**

- **`toMatchObject(object)`:** 被匹配的物件有涵蓋**匹配物件中的所有屬性與值 ( 可以多 )**
- `toEqual`：被匹配物件中的屬性和值與匹配物件需要**完全相同 ( 不能多或少 )**
- **`objectContaining()`:** ( 較少被使用 ) ****分為兩個情況，物件內不含有物件以及物件內含有物件
    - **物件內不含物件**
        - 使用 `toMatchObject` 或 `object.containing()` 有一樣的效果
        - **只要匹配的物件 ( matched object) 的屬性與值都有列在被匹配的物件( expected object) 內即通過**：
        
        ```jsx
        const schema = {
        	// 這邊的寫法是以型別，當然也可以是固定的值
          gender: expect.any(String),
          age: expect.any(Number),
          phone: expect.anything(),
          interests: expect.any(Array),
        };
        
        test('object containing', () => {
          const data = {
            gender: 'female',
            age: 30,
            phone: '0987345672',
            interests: ['computer', 'guitar'],
            comments: 'Nothing to comment',
          };
        
        // 被匹配的 data 要涵蓋 匹配的 schema 內所有的屬性與值
          expect(data).toMatchObject(schema); // PASS
          expect(data).toEqual(expect.objectContaining(schema)); // PASS
        });
        ```
        
    - **物件內含物件**
        - `toMatchObject`  ( 較常被使用 ) 被匹配的物件有涵蓋**匹配物件中的所有屬性與值**
        - `objectContaining` 匹配的物件需要等於被匹配的物件的所有屬性與值，除非物件內再次用 `objectContaining` 去做比較
        
        ```jsx
        test('nested object', () => {
          /**
           * toMatchObject
           */
          // 通過：物件內還有物件，包含完整的 props/values
          expect({ position: { x: 0, y: 0 } }).toMatchObject({
            position: {
              x: expect.any(Number),
              y: expect.any(Number),
            },
          });
        
          // 主要差異處!!
          // 通過：物件內還有物件，只包含部分的 props/values
          expect({ position: { x: 0, y: 0 } }).toMatchObject({
            position: {
              x: expect.any(Number),
            },
          });
        
          /**
           * objectContaining
           */
          // 通過：物件內還有物件，包含完整的 props/values
          expect({ position: { x: 0, y: 0 } }).toEqual(
            expect.objectContaining({
              position: {
                x: expect.any(Number),
                y: expect.any(Number),
              },
            }),
          );
        
          // 主要差異處!!
          // 失敗：物件內還有物件，但只包含部分的 props/values，而沒有再定義 expect.objectContaining
          expect({ position: { x: 0, y: 0 } }).toEqual(
            expect.objectContaining({
              position: {
                x: expect.any(Number),
              },
            }),
          );
        
          // 通過：物件內還有物件，但物件屬性內又定義 objectContaining
          expect({ position: { x: 0, y: 0 } }).toEqual(
            expect.objectContaining({
              position: expect.objectContaining({
                x: expect.any(Number),
              }),
            }),
          );
        });
        ```
        
    

## 三、測試非同步程式碼 ( Testing Asynchronous Code )

- 官網: **[Testing Asynchronous Code](https://jestjs.io/docs/asynchronous)**

### Promise

- 使用 Promise 的話，要在 test 的測試函式中將之 return 出來，jest 會等其被 resolve 後再繼續，若該 Promise 被 reject ，則測試失敗

```jsx
const fetchData = require('./../modules/fetchData'); // 引入非同步涵式

const schema = {
  userId: expect.any(Number),
  id: expect.any(Number),
  title: expect.any(String),
  completed: expect.any(Boolean),
};

test('fetch data with json placeholder', () => {
	// promise 中用 return 將非同步涵式執行
  return fetchData('https://jsonplaceholder.typicode.com/todos/1').then((data) => {
    expect(data).toMatchObject(schema);
  });
});
```

### **Async/Await**

當然除了 Promise 也可以用 Async/Await 的語法，若使用 Async 則不用使用 return 

```jsx
test('the data is peanut butter', async () => {
	// async await
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
		// async await
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

## 四、測試作用域以及行為重複 ( Setup and Teardown )

官網: [setup and teardown](https://jestjs.io/docs/en/setup-teardown)

**keywords: `beforeEach`, `beforeAll`, `afterEach`, `afterAll`**

透過 `describe` 你可以把這些測試分成不同區塊的作用域 ( Scope )，而在作用域又可以分為每個 scope 中只執行一次，或者隨著 describe 內的 unit test 執行多次

- scope 內只執行一次 ( **`beforeAll`, `afterAll`** )
    - **`beforeAll`:** 在該 describe 內的 scope 第一個執行，且只執行一次
    - `afterAll`: 在該 describe 內的 scope 最後一個執行且只執行一次
- scope 內執行多次 ( **`beforeEach`, `afterEach`** )
    - **`beforeEach`:** 在 describe 中 每一次的 test 執行前會先執行。
    - **`afterEach`**: 在 describe 中 每一次的 test 執行後會馬上執行。

```jsx
describe('Check add', () => {
  beforeEach(() => {
    console.log('每次執行測試前執行哦');
  });

  afterAll(() => {
    console.log('所有測試結束後才看得見我');
  });

  test('Check the result of 5 + 2', () => {
    expect(5 + 2).not.toBe(8);
  });

  test('Check the result of 5 + 3', () => {
    expect(5 + 3).toBe(8);
  });
});
```

## 五、模擬函式 ( Mock Functions )

- 官網: **[Mock Functions](https://jestjs.io/docs/mock-functions)**
- 模擬函式在 jest 中是非常有用的功能，他能在測試中創建一個模擬函式藉以測試目標函式的行為 ( 其可以計算函式被調用的次數、確認函式的返回值、函式帶入的參數為何等等 ) 其核心是**降低測試目標函式對於外部代碼的依賴**，專注於測試的目標函式，藉此迴避掉不確定性
    - 只需透過 `jest.fn` 即可建立 Mock Functions
    - 透過此函式的 `mock` 屬性即可看和此函式有關的訊息

> `jest.fn(implementation)` 只是 `jest.fn().mockImplementation(implementation)` 的縮寫
> 
- 範例

```jsx
// 假設有一個 forEach 的函式定義 在 forEach.js 中
export function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
```

- 為了測試這個函式，我們可以建立一的 mock 函式，然後檢查 mock 函式如何在 forEach 中被調用

```jsx
// forEach.test.js

const forEach = require('./forEach');

// 用 jest.fn 建立 Mock Funcions 並取名為 mockCallback
const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
// 呼叫 forEach 函式，並帶入參數
  forEach([0, 1], mockCallback);

  // 檢查該函式被呼叫了幾次 
	// The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // 該函式第一次被呼叫時的第一個參數為 0  
	// The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);
	
	//  該函式第二次被呼叫時的第一個參數為 1
  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

	// 該函式第一次被呼叫時的回傳值是 42
  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

### .mock 屬性

所有模擬函式都有特殊的 .mock 屬性可以被調用，其保存了目前此模擬函式是如何被調用，以及被調用時所返回的訊息。而 .mock 屬性還能追蹤到每次調用的 this 的值，範例如下

- mock.instances 可以觀察到到模擬函式所建立的實例 ( instance )
- mock.contexts 則可以觀察到函式調用時所綁定的上下關係

補充: 若想要直接看 this，可以直接用 jest.fn().mockReturnThis()

```jsx
// 這裡不在 jest.fn 內設定具體函式，目的是簡化並觀察其函式被調用的訊息
const myMock1 = jest.fn();
// 使用 new 創建一個新對象 a ，
// 而 a 這個資料會被 myMock1 這個模擬函式透過 myMock1.mock.instance 記錄追蹤到
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
// 設定 bound 函式，將 myMock2 的 this 設為 b
const bound = myMock2.bind(b);
// 執行 bound 函式
bound();
// 使用 myMock2.mock.contexts 可以觀察到 myMock2 的 this b
console.log(myMock2.mock.contexts);
// > [ <b> ]

// 若想要直接查看 this 可以用 .mockReturnThis()
const myObj = {
  myMethod: jest.fn().mockReturnThis(),
};

// 與下方函式一樣
// is the same as

const otherObj = {
  myMethod: jest.fn(function () {
    return this;
  }),
};
```

- 而這 mock 屬性所涵蓋的功能協助我們追蹤函式是如何被調用、被調用了幾次，實例化的對象有哪些、甚至其所返回的值 等等

```jsx
// mock.calls, toHaveLength 可以了解到該模擬函式被調用的次數，以範例來說預期是 1 次
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// mock.calls 是一個 Array 數組，Array 中的每個 item 又代表了每次被調用的情形
// 每個 item 也是一個 Array 數組，其內涵蓋著該次被調用時的參數
// 所以下列 function.mock.calls[0][0] 代表的第一個[0]是 第一次被調用時的情形，第二個[0] 是第一次被調用時的第一個參數
// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');
// 所以下列 function.mock.calls[0][0] 代表的第一個[0]是 第一次被調用時的情形，第二個[1] 是第一次被調用時的第二個參數
// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// mock.results 所涵蓋的是一個陣列數組，其每個 item 代表每次呼叫該函式時所返回的情形
// 所以下方用 function.mock.results[0].value 代表的是第一次呼叫所返回的值
// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// mock.contexts 也是輸出一個數組，每個 item 代表其被綁定的對象
// 例如下方 function.mock.contexts[0] 就代表第一次綁定的對象
// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// mock.instances 也是數組，代表該模擬函式產生的實例對象
// 下方 function.mock.instances.length 可以看出該函式有產生過兩個實例 (instances)
// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// 呈上，若想要查看第一次產生的 instance 名稱，可以用 function.mock.instances[0].name
// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe('test');

// mock.lastCall 是數組，代表該模擬函式最後一次呼叫時所帶的參數
// 下方 function.mock.lastCall[0] 所代表的是該模擬函式最後一次被呼叫時所帶的第一個參數值為 'test'
// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```

**補充:** **jest.spyOn** 與 **jest.fn()** 所創建的函數名都可以用 .mock 屬性來追蹤與調用函數的行為，其區別在於其追蹤的對象，以及使用方式

- **jest.spyOn**: 其追蹤**已有的 object** 對象以及其內含的**方法**
- **jest.fn():** 創建一個**新的模擬函式**，我們可以追蹤這個**新的函式**行為

```jsx
// jest.spyOn
const myObject = {
  doSomething: () => {
    // 自訂
  },
};

// 使用 jest.spyOn 監視物件內的方法
const spy = jest.spyOn(myObject, 'doSomething');

// 調用物件的方法
myObject.doSomething();

// 檢查調用次數
expect(spy).toBeCalledTimes(1);
expect(spy.mock.calls.length).toBe(1);

// 檢查調用參數
expect(spy).toHaveBeenCalledWith(/* 期望的参数 */); 
expect(spy.mock.calls[0]).toEqual([]);

// 返回模擬值
spy.mockReturnValue('mocked result');
```

```jsx
// jest.fn()
// 創建一個模擬函式
const mockFunction = jest.fn();

// 調用模擬函式
mockFunction('arg1', 'arg2');

// 檢查被調用的次數
expect(mockFunction).toBeCalledTimes(1);
expect(mockFunction.mock.calls.length).toBe(1);

// 檢查被調用時所帶的參數
expect(mockFunction).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFunction.mock.calls[0]).toEqual(['arg1', 'arg2']);

// 模擬回傳的值
mockFunction.mockReturnValue('mocked result');
```

- jest.spyOn 延伸介紹

```jsx
// 不改變原本 method 的實作
const mockFn = jest.spyOn(object, methodName);

// 如果希望不要使用執行原本的方法，可以搭配 mockImplementation
const mockFn = jest.spyOn(object, methodName).mockImplementation(() => customImplementation);

// 或者改用 replaceProperty 也可以
const mockFn = jest.replaceProperty(
  object,
  methodName,
  jest.fn(() => customImplementation),
);
```

### 模擬函式設定回傳值 ( mock return values )

**keywords: `mockReturnValueOnce`, `mockReturnValue`,** `mockImplementation`、`mockImplementationOnce`

模擬函式也可以設定回傳值

- **`mockReturnValueOnce`:** 回傳一次自訂值，自訂值放在參數
- **`mockReturnValue`**: 總是回傳自訂值，自訂值放在參數

```jsx
const myMock = jest.fn();
console.log(myMock());
// 未設定具體的模擬函式，其預設回傳就是 undefined
// > undefined

// 下方函式的意思是
// 第一次回傳 10 ; 第二次回傳 'x'; 之後皆回傳 true
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

- 模擬函式設定回傳值給予了開發者很大的彈性，可以避免具體函是中間的複雜操作，直接將想要測試的值注入需要被測試的模組或函式內，取代原測試目標模組的依賴函式

```jsx
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

// 假設 result 就是目標模組
const result = [11, 12].filter(num => filterTestFn(num));

console.log(result); // 可以直接設定預計回傳內容 11
// > [11]
// 也可以透過 mock.calls 查看每次調用時所帶入的參數情形
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```

- 也可以使用  `mockImplementation`、`mockImplementationOnce`
    - `mockImplementationOnce`**:** 回傳一次自訂值，自訂**函式**放在參數
    - `mockImplementation`:  總是回傳自訂值，自訂**函式**放在參數

```jsx
const myMockFn = jest
  .fn()
  .mockImplementationOnce(cb => cb(null, true))
  .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
```

### 模擬引入的第三方套件 **（mocking modules）**

**keywords: `jest.mock(<package>)`, `__mocks__`**

假設我們只想模擬載入第三方套件的行為而不是想真的引進第三套件來做測試 ( 若是實際引入第三方套件，會導致測試的時間緩慢 )，此時我們就可以使用 `jest.mock(<package>)` 來模擬該套件的行為

**寫法1** **寫在同一份測試文件內 ( `jest.mock(<package>)` )**

**範例 1**

```jsx
// 假設我們要測試一個依賴於 axios 套件的 api 函式模組 users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

- 而我們導入測試可以這樣寫

```jsx
// users.test.js
import axios from 'axios';
import Users from './users';

// 使用 jest.mock 模擬 axios 套件載入
// 而此模擬的作用域只在該隻測試檔中，並不影響其他測試檔
jest.mock('axios');

test('should fetch users', () => {
	// 先設定預計 api 返回的 mock data 為 users
  const users = [{name: 'Bob'}];
	// 預計該 api 返回的內容是內含有 data 屬性的 resp 物件
  const resp = {data: users};
	// 使用 axios.get 方法加上 mockResolvedValue 來模擬預設 api 會回傳的物件
  axios.get.mockResolvedValue(resp);

	// 或者也可以用 mockImplentation 與 Promise 來設定以上的內容
  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))
	
	// 以此就可以測試 Users 中這個 all 的方法
  return Users.all().then(data => expect(data).toEqual(users));
});
```

**範例 2**

```jsx
// 假設我們使用 node-fetch 這個套件，並需要裡面的方法 fetch 
import fetch from 'node-fetch';

// 模擬 node-fetch 這個套件
jest.mock('node-fetch');

// 使用模擬後的 fetch 方法
it('mock modules and async', async () => {
	// 設定模擬的回傳值 users 
  const users = [{ name: 'Bob' }];

  // fetch 會自動 mock 成 jest.fn()，將可以使用所有 mockFn 提供的方法
  const fetchMock = fetch.mockResolvedValue(users);
  const response = await fetchMock(); // 記得要執行 fetchMock() 才會有值
  expect(response).toEqual(users);
});
```

- 也可以調整模擬套件輸出的行為

```jsx
// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

```jsx
// test.js 
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
	// 請注意: jest.requireActual 只能用在 node 開發而不是 browser
	// 其代表的是使用針時的套件內容，而不是模擬套件的內容
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
	// 調整模擬套件預計在測試中輸出的值
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```

- 也可以模擬套件中特定的方法
    - 全域/整個測試檔使用 ( 假設需要模擬 `next/router` 這個套件中的 `useRouter` 方法。 )
        
        ```jsx
        // useAutofillPromo.test.tsx
        // 由於我在 jest.mock 以模擬與設定 'next/router'這個套件以及預設了其預計載入後回傳的內容
        // 所以就不需要在 import 或 required 該套件了
        
        jest.mock('next/router', () => ({
          useRouter() {
            return {
              query: {
                PromoCode: 'foo',
              },
            };
          },
        }));
        
        describe(() => {
          /* ... */
        });
        ```
        
    - 如果是希望在不同的 test case 中有不同的 mock value 的話，可以改成下方這種方式
        
        ```jsx
        // useAutofillPromo.test.tsx
        // @ts-nocheck
        import * as nextRouter from 'next/router';
        
        // 模擬 nextRouter 中的 useRouter 方法
        // nextRouter.useRouter 將可以使用所有 mockFn 提供的方法
        nextRouter.useRouter = jest.fn();
        
        describe('useAutofillPromo', () => {
          afterEach(() => {
            // 使用 mockReset 可以把每次 mock 的 value 清空
            nextRouter.useRouter.mockReset();
          });
        
          it('get promoCode after invoking refreshAutofillPromo', () => {
            // mockImplementation 會把該 function 會回傳的值進行模擬
        		// 其回傳就會是 query: { PromoCode: 'foo' }
            nextRouter.useRouter.mockImplementation(() => ({
              query: {
                PromoCode: 'foo',
              },
            }));
        
            // 也可以使用 mockReturnValue()
            // nextRouter.useRouter.mockReturnValue({
            //  query: {
            //    PromoCode: 'foo',
            //  },
            // });
        
            // useAutofillPromo 中呼叫到的 useRouter 會是 mock 過的
            const { result } = renderHook(() => useAutofillPromo());
            // ...
          });
        });
        ```
        

**寫法2. 將 mock 套件統一放在與 src 平行階級的資料夾 __mocks__ 中**

也可以將所有 mock 的套件設定統一放在 與 src 平級的資料夾，該資料夾名稱需命名為 “__mocks__”

**範例階層如下**

```markdown
my-project/
  |- src/
  |   |- someModule.js
  |- __mocks__/
      |- someModule.js
	|- tests/
			| - someModule.test.js
  |- package.json
```

- 假設我們要測試 someModule.js 這組件中的 someFunction 函式，則在 __mocks__ 這資料夾內，創立同樣的套件名，名同為 someModule.js，如下範例
    
    ```jsx
    // __mocks__/someModule.js
    // 這模擬了 someModule.js 內的 sopmeFunction 函式行為
    module.exports = {
      someFunction: jest.fn(() => 'Mocked Value'),
    };
    ```
    
- 在測試的寫法則為正常引入套件的寫法就行，因為 **jest 會自動識別資料夾 __mocks__** 並直接引入對應套件，因此路徑上不用特別設定 __mocks__ 路徑
    
    ```jsx
    // tests/someModule.test.js
    
    // 引入要测试的模块，Jest 会自动使用模拟文件
    const someModule = require('../src/someModule');
    
    // 编写测试用例
    describe('someModule', () => {
      it('should return a mocked value', () => {
        // 使用模拟的 someFunction 函数
        expect(someModule.someFunction()).toBe('Mocked Value');
      });
    });
    ```
    

## 六、模擬時間 ( Mock Time )

官網: [fake-timers](https://jestjs.io/docs/jest-object#fake-timers)

```jsx
beforeEach(() => {
  // vi.setSystemTime(1687072779984);
  jest.useFakeTimers({
    now: 1687072779984,
  });
});

afterEach(() => {
  jest.useRealTimers();
});
```

## 七、模擬非同步回傳的結果 ( Mock Resolved Value )

- **`mockFn.mockResolvedValue(value)`:** 是 jest.fn().mockImplementation(() => Promise.resolve(value)); 的縮寫
- **`mockFn.mockResolvedValueOnce(value)`:** 是 jest.fn().mockImplementationOnce(() => Promise.resolve(value)); 的縮寫
- **`mockFn.mockRejectedValue(value)` :** 是  jest.fn().mockImplementation(() => Promise.reject(value)); 的縮寫
- **`mockFn.mockRejectedValueOnce(value)`:** 是 jest.fn().mockImplementationOnce(() => Promise.reject(value)); 的縮寫

```jsx
const fetch = require('node-fetch');

// 模擬 node-fetch 這個套件
jest.mock('node-fetch');

// 使用模擬後的 fetch 方法
it('mock modules and async', async () => {
  const users = [{ name: 'Bob' }];

  // 模擬後的 fetch 方法可以使用 mockResolvedValue 這個方法
  // 產生一個會回傳 Promise 的函式
  const fetchMock = fetch.mockResolvedValue(users);
  const response = await fetchMock(); // 記得要執行 fetchMock() 才會有值

  expect(response).toEqual(users);
});
```

## 八、參考資料來源

1. [https://jestjs.io/zh-Hans/docs/getting-started](https://jestjs.io/zh-Hans/docs/getting-started)
2. [https://test-utils.vuejs.org/installation/](https://test-utils.vuejs.org/installation/)
3. [https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options)
4. [https://pjchender.dev/npm/npm-jest/#基本使用](https://pjchender.dev/npm/npm-jest/#%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8)
5. [https://ithelp.ithome.com.tw/articles/10223012](https://ithelp.ithome.com.tw/articles/10223012)