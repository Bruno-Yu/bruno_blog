---
title: Vue3 composition API 研究
description: 都寫 Vue3 了還能不用 Composition API 嗎？豈不是很虧？
tags: ['前端','JavaScript', 'Vue']
date: 2023-07-02
type: doc
publish: true
---
# Vue3 composition API 介紹

建議閱讀: [https://cn.vuejs.org/guide/introduction.html](https://cn.vuejs.org/guide/introduction.html)


## 一、 基本介紹

### 1-1. 甚麼是 composition api ?

Composition API 是 Vue 3 中引入的一種新的編寫方法，它提供了一種更靈活、模塊化的方式組織和重用組件的邏輯。傳統的 Vue 2.x 使用 Options API 來編寫組件，而 Composition API 的引入主要是為了解決在大型應用中組件邏輯變得複雜難以維護的問題。

### 1-2. **Composition API 的主要特點：**

1. **`setup` 函數 ( 更靈活的入口點 )：** Composition API 的核心是 **`setup`** 函數，它取代了 Vue 2.x 中的 **`data`**、**`methods`**、**`computed`** 等選項，並提供了一個更靈活的入口點，用於配置組件的狀態和邏輯。
2. **更直觀的代碼組織：** Composition API 允許**將相關的邏輯按功能或特性進行組織並放在一起 (** 而 option api 則不行，其必須依 data, methods…等分類分開放置 **)**，將其放入 **`setup`** 函數中。這使得代碼更加清晰和可讀，並且更容易進行模塊化的組合。
3. **模塊化和可重用：** Composition API 支持將組件邏輯模塊化，可以更輕鬆地抽取和共用代碼片段，這有助於減少代碼重複並提高代碼的可維護性。 ( 取代並解決到 原 option api 寫法中，因 mixin 導致命名與空間汙染等問題 )
4. **更好的支援 TypeScript：** Composition API 提供了更好的支援 TypeScript，能夠更容易地推斷和檢查類型，這在大型項目中尤為重要。
5. **更多的生命週期：** Composition API 引入了更多的生命週期鉤子，如 **`onMounted`**、**`onUpdated`**、**`onBeforeUnmount`** 等，使得開發者可以更靈活地處理組件的不同階段。

### 1-3. **為什麼 Vue 3 引入 Composition API：**

1. **解決代碼組織問題：** 在大型應用中，組件的邏輯變得複雜，而 Options API 的方式可能導致代碼組織困難，使得組件難以理解和維護。
2. **提高組件的可重用性和模塊性：** Composition API 使得組件的邏輯可以更容易地分離和重用，這有助於提高代碼的模塊性和可維護性。
3. **更好的支援 TypeScript：** Vue 3 的 Composition API 更好的支援 TypeScript ，使得在大型項目中使用 TypeScript 更為方便。
4. **跟隨 JavaScript 生態系統的趨勢：** Composition API 的設計更符合現代 JavaScript 生態系統的趨勢，尤其是與 React Hooks 等相似的概念。

總的來說，Composition API 的引入使得 Vue 更適合開發大型應用，提供了更強大、更靈活的組件編寫方式，有助於提高代碼的可維護性和可讀性。

### 1-4. **相較於 Option api, Composition API 寫法的缺點：**

1. **學習曲線較高：** 對於已經習慣 Options API 的開發者來說，適應 Composition API 可能需要些許的時間，而雖說其寫法較 Options API 自由 ( 不再分類 data, methods, 與生命週期，其寫法更像原生的 js 寫法 )，但同時也更要求開發者的培養良好的開發習慣，以及對於原生 JavaScript 有更深的掌握。
2. **需要Vue 3：** Composition API 只在 Vue 3 中引入，所以如果項目仍在使用 Vue 2，則無法直接使用。

### 1-5. 若後續有需要**過渡到 React 會比較好上手:**

1. **相似的語法：** Vue 3 Composition API 的語法在某些方面與 React Hooks 相似，例如 **`useState`** 對應於 **`reactive`** 和 **`ref`**，**`useEffect`** 對應於 Vue 3 的生命週期鉤子。
2. **React 生態系統的廣泛使用：** 如果你已經熟悉 Vue 3 Composition API，過渡到 React 會相對容易，因為你已經瞭解了許多相似的概念。
3. **更廣泛的資源和社區支持：** React 擁有更大規模的社區和豐富的資源，這使得在學習和使用 React 時能夠更容易找到幫助和解決問題的資源。

```jsx
// 使用 React Hook

import React, { useState, useEffect } from 'react';

function ReactComponent() {
  const [message, setMessage] = useState("Hello from React!");
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log("Component is mounted");
    return () => {
      console.log("Component will unmount");
    };
  }, []);

  return (
    <div>
      <p>{message}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default ReactComponent;
```

```jsx
// 使用 Vue Compositon api
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const message = ref("Hello from Vue!");
    const count = ref(0);

    const increment = () => {
      count.value++;
    };

    onMounted(() => {
      console.log("Component is mounted");
    });

    onBeforeUnmount(() => {
      console.log("Component will unmount");
    });

    return {
      message,
      increment,
    };
  },
};
</script>
```

## 二、 核心響應式語法介紹

**官網**: [https://vuejs.org/api/reactivity-core.html](https://vuejs.org/api/reactivity-core.html)

### 2-1. **使用 setup 取代 Options API 結構**

 Composition API 是用 **`setup`** 函數取代掉原  Vue 2.x 中的 **`data`**、**`methods`**、**`computed`** 等選項，而其內部的寫法更像原生的 JavaScript 使其更靈活，也讓相關聯商業邏輯代碼能夠被歸類再一起

- setup 中含有兩個參數，分別是 props 與 context
    - props 通過父層組件所傳入的物件，其是所有 prop 近來屬性的集合，每個物件屬性就是具體被傳入此組件的屬性與值
        
        ```jsx
        setup(props) {
          // 直接使用整個 props 對象
          console.log(props.propName);
        
          // 或者使用解構賦值提取單一的屬性
          const { propName } = props;
        }
        ```
        
    - context 其為物件功能為檢視該組件上下文的能力，其內部有四個屬性分別為
        - emit: ( 較常用 ) 同為 option api 中的 emit 功能，為自訂一事件
            
            ```jsx
            export default {
              setup(props, { emit }) {
                const handleClick = () => {
                  // 觸發一個自定義事件，通知父組件
                  emit('customEvent', 'Hello from child!');
                };
            
                return {
                  handleClick,
                };
              },
            };
            ```
            
        - attrs: 代表此組件中未被在該組件中聲明並使用到的 props 會在這邊
            
            ```jsx
            <!-- MyComponent.vue -->
            <template>
              <div>
                {{ message }}
              </div>
            </template>
            
            <script>
            export default {
              props: {
                message: String,
                additionalProp: String,
              },
              setup(props, context) {
                // 在這裡，additionalProp 就會包含在 context.attrs 中
                console.log(context.attrs.additionalProp);
            
                return {
                  // ...
                };
              },
            };
            </script>
            ```
            
        - slots: 代表此組件的所有插槽，可以通過該 命名的屬性找到相關的插槽內容
            
            ```jsx
            // 父組件
            <!-- ParentComponent.vue -->
            <template>
              <div>
                <ChildComponent>
                  <!-- 父組件插槽內容 -->
                  <p>Content from parent</p>
                </ChildComponent>
              </div>
            </template>
            
            <script>
            import ChildComponent from './ChildComponent.vue';
            
            export default {
              components: {
                ChildComponent,
              },
            };
            </script>
            
            // 子組件
            <!-- ChildComponent.vue -->
            <template>
              <div>
                <p>Child Component Content</p>
                <!-- 子組件插槽 -->
                <slot></slot>
              </div>
            </template>
            
            <script>
            export default {
              setup(_, context) {
                // 訪問父組件插槽的內容
                const parentSlotContent = context.slots.default();
            
                return {
                  parentSlotContent,
                };
              },
            };
            </script>
            ```
            
        - expose: 允許向父組件暴露此組件的 data 或 methods，方便父組件直接調用 ( 若沒用 expose 在 composition api  中無法直接在父層用 ref 來調用子元件的方法 )
            
            ```jsx
            // 子元件
            <!-- ChildComponent.vue -->
            <template>
              <div>
                <p>Internal Value: {{ internalValue }}</p>
                <button @click="increment">Increment in Child</button>
              </div>
            </template>
            
            <script setup>
            import { ref, defineExpose } from 'vue';
            
                const internalValue = ref(0);
            
                const increment = () => {
                  internalValue.value++;
                };
            
                // 將 increment 方法用 expose 暴露给父组件
            		defineExpose({ increment})
            
            </script>
            
            // 父元件
            <!-- ParentComponent.vue -->
            <template>
              <div>
                <ChildComponent ref="childRef" />
                <button @click="callChildIncrement">Call Child Increment</button>
              </div>
            </template>
            
            <script>
            import { ref } from 'vue';
            
            import ChildComponent from './ChildComponent.vue';
            
            export default {
              components: {
                ChildComponent,
              },
              setup() {
                // 获取子组件 instance 的 ref
                const childRef = ref(null);
            
                // 父组件調用子组件 expose 的 increment 方法
                const callChildIncrement = () => {
                  childRef.value.increment();
                };
            
                return {
                  childRef,
                  callChildIncrement,
                };
              },
            };
            </script>
            ```
            

**需要注意:** 

- 在setup 中沒有 this
- 所有的data 與 methods 要能夠與 template 響應的話，都必須要 return ，
    - 而需要在 template 中使用的響應資料在定義時是用 ref() ( ref 也有雙向綁定的效果 )，而 ref 定義的變數在 setup 中其它函式或生命週期在調用該變數時，是用 `變數.value`

補充: setup 簡寫方式

- 官網 ( [https://vuejs.org/api/sfc-script-setup.html](https://vuejs.org/api/sfc-script-setup.html) )

```jsx
// setup 原本寫法
<script>
export default {
	setup(){
		const user = reactive({
      name: 'John',
      age: 25,
    });
		
		return {
			user
		}
	}
}
</script>

// setup 的簡寫成
// 這樣寫法下，其內的所有宣告的變數或函式預設為 return，也就是說上下兩個寫法執行起來相同
<script setup>
	const user = reactive({
    name: 'John',
    age: 25,
  });
</script>
```

- 但需要注意的是在setup 簡寫的環境下，原先在 setup 中的參數 props 與 context 寫法
    - Props 的取用方式: 使用 defineProps()
        
        官網: [https://cn.vuejs.org/guide/components/props.html](https://cn.vuejs.org/guide/components/props.html)
        
        ```jsx
        // 使用物件形式可以定義行別
        // defineProps 是 vue3 內建的語法不需要引入，可以直接使用
        
        // 寫成物件可以定義傳入的型別
        const props = defineProps({
          foo: String
        })
        
        // 也可寫成陣列
        const props = defineProps(['foo'])
        
        // 在 template 中使用時可以用 props.foo 或直接是 foo
        // 但在 script 中使用的話要用 props.foo 不能用 foo
        // 另外 props 是只讀的
        ```
        
    - context 內原有的參數 emit, expose, slots , attr 則分別被拆分
        
        ```jsx
        <script setup>
        // emit 的寫法範例
        // 先定義 emit
        const emit = defineEmits(['customEvent', 'delete'])
        
        const handleClick = () => {
          // 正常使用
          emit('customEvent', 'Hello from child!');
        };
        
        // expose 寫法
        
        import { ref } from 'vue'
        
        const a = 1
        const b = ref(2)
        
        defineExpose({
          a,
          b
        })
        
        // slots 以及 attrs 取用的寫法
        
        import { useSlots, useAttrs } from 'vue'
        
        const slots = useSlots()
        const attrs = useAttrs()
        </script>
        ```
        
    - emit 的寫法補充
        
        官網: [https://cn.vuejs.org/guide/components/events.html](https://cn.vuejs.org/guide/components/events.html)
        
        ```jsx
        // script 中 scope 沒寫在一起
        export default {
          emits: ['inFocus', 'submit'], // emit 的聲明位置
          setup(props, ctx) {
            ctx.emit('submit')
          }
        } 
        
        // script 與 setup 寫在一起 ( <script setup> )
        <script setup>
        const emit = defineEmits(['inFocus', 'submit'])
        
        function buttonClick() {
          emit('submit')
        }
        </script>
        
        // 在 template 中被使用 直接用 $emit
        <button @click="$emit('increaseBy', 1)">
          Increase by 1
        </button>
        ```
        
- 補充 元件局部掛載 ( 局部註冊 ) 寫法
    
    官網: [https://cn.vuejs.org/guide/components/registration.html](https://cn.vuejs.org/guide/components/registration.html)
    
    ```jsx
    // script 中 scope 沒寫在一起
    import ComponentA from './ComponentA.js'
    
    export default {
      components: {
        ComponentA
      },
      setup() {
        // ...
      }
    }
    
    // script 與 setup 寫在一起 ( <script setup> )
    import ComponentA from './ComponentA.js'
    
    export default {
      components: {
        ComponentA
      },
      setup() {
        // ...
      }
    }
    ```
    

### 2-2. **使用 reactive 定義響應式資料**

**註: 所謂響應式，就是指該資料變化時，與該資料關聯的畫面會不會更新**

因為在 setup 中，撰寫基本上與原生 javaScript 雷同，而在這邊定義與宣告的資料為單向資料流，就算此時在 html 的 Input  設定 v-model 做連結，也是不會產生雙向綁定 

- 因此若需要雙向綁定對應資料，則要用 reactive 或是 ref 來綁定資料，ref 因為限制較少，所以在實戰中較常用
- 使用 Vue.reactive() 定義資料，使該宣告資料物件轉成 proxy 物件
    
    注意 : 也是因為轉換成標準的proxy物件，因此處理的參數(對象)**也必須是物件，若傳入純值會出現錯誤**
    

- **範例程式碼**
    
    ```jsx
    
    <template>
      <div>
        <p>{{ user.name }} is {{ user.age }} years old.</p>
      </div>
    </template>
    
    <script>
    import { reactive } from 'vue'; // 需先自 vue import 進來
    
    export default {
      setup() {
        // 在 setup 函數中使用 reactive 創建響應式對象
        const user = reactive({
          name: 'John',
          age: 25,
        });
    
    		const updateAge = () => {
          // 也可以直接修改 user 的屬性
          user.age += 1;
        };
    
        return {
          user,
        };
      },
    };
    </script>
    
    ```
    

### 2-3. **使用 ref 定義響應式資料**

**註: 所謂響應式，就是指該資料變化時，與該資料關聯的畫面會不會更新**

- 功能: 與 reactive 相似，都是為了用來雙向綁定對應資料
- 與 reactive 的差異，方法傳入的參數不一定要是物件，可以是**純值**，**也可以是物件 ( 若是多層物件一樣也可以運作 )**
    
    註: 雖說有些文章表示 reactive 用在複雜的物件且有深層監測的效果，而 ref 多用在純值得響應上，但筆者實際測試 ref 時，其也是能監測巢狀物件，而在 Vue Mastery 針對 ref 的介紹有一段是如此敘述的 ‘’If an object is assigned as a ref's value, the object is made deeply reactive with **[reactive()](https://vuejs.org/api/reactivity-core.html#reactive)**. This also means if the object contains nested refs, they will be deeply unwrapped. ” 也佐證了筆者的觀點
    
- ref 方法所傳出的 是 RefImpl 的物件 ( 不是proxy )，需要在 setup 中取其值的話，要使用 `物件.value` 取出
    - 註: 是在 **未return** 前取值的方式，**return 後就是正常取得物件值** ex: `物件.屬性`
    
    ```jsx
    <script>
    import { ref } from 'vue';
    
    export default {
      setup() {
        // 在 setup 函數中使用 ref 創建響應式對象
    	const count = ref(0);
        
    		const addCount = () => {
    			// ref 修改要用 .value 才能取到值
          coun.value++;
        };
    
        return {
    			count, 
    			addCount
        };
      },
    };
    </script>
    ```
    

### 2-4. 使用 computed 來定義關聯資料

- 功能: 與 option api 中的 computed 功能一樣，其只能回饋一個 readonly 的資料，並且會依照關聯的資料響應而改變

用法範例如下

```jsx
import { computed, onMounted } from 'vue';

export default {
  setup() {
	...
	const name = ref('Johnny')
	// 使用 computed 內包一個物件 裡面有 get 與 set 屬性
	const personSaid = computed({
    get: ()=>`${name.value} say hi`,
    set:(val) => {
      name.value = val;
    }
  })

// 若只有 get 可以寫成如下寫法
// const personSaid = computed(()=>`${name.value} say hi`)
	
		onMounted(() => {
		console.log(personSaid.value) // Johnny say hi
      name.value = 'wilson'
      console.log(name.value) // wilson
      personSaid.value ='Nike'
      console.log(name.value) // Nike
      console.log(personSaid.value) // Nike say hi
	})
}
```

### 2-5. 使用 readonly 來確認資料不被修改

功能: 在某些情況下，比如 prop 進來的數值不希望被子組件意外修改，或是全域共用的資料你不想其被意外修改，此時就能使用 readonly

```jsx
// 父组件
import { readonly } from 'vue';

const data = readonly({ propValue: 'Hello' });
```

### 2-6. 使用 watchEffect 作為監測資料變動時行為的設定

**功能:** 此功能與 React 中的 useEffect 很像，在該元件被渲染或是其內部資料有變動時，其都會自動執行

被監測的數值要求: 要是響應式的 ( 如:  getter, ref, reactive…etc. )

其有幾個特點:

- 在初次載入時就會先執行一次內部函式的內容
- 可以深層監聽數值
- 只有在其函式內部有使用到的值有更新才會被觸發
- watchEffect 可以被停止
- watch 與 watchEffect() 比較
    - watch 只能監聽特定變數 ( watchEffect 1個或多個 )
    - watch 的參數會含前一次的修改值 ( watchEffect 沒有 )

- **watchEffect( callback function, \{ flush: ‘pre’  \} ) 其內含兩個參數**
    1. callback function: 參數 1 是一個函式，其內容可以自訂，其會在該組件被重新渲染( 內部設定的數值有更新時也會觸發重新渲染 ) 前會執行 ( 預設情況下 )
    2.  flush: 在第二個參數內，其為物件中的其中之一個屬性，在預設情況下，flush 是 ‘pre’ 代表在組件渲染前執行，但也可以設定組件渲染後再執行 ‘post’。其還有一個值是 ‘sync’ 代表立即執行，但使用上需要小心 (  可能會有效能以及資料一致性的問題 )
    - **watchPostEffect()** 也就等於 watchEffect() 加上 flush: ‘post’ 的設定
    - **watchSyncEffect()** 也就等於 watchEffect() 加上 flush: ‘sync’ 的設定
    
    ```jsx
    // 範例
    const original = reactive({ count: 0 })
    
    const copy = readonly(original)
    
    watchEffect(() => {
      // works for reactivity tracking
      console.log(copy.count)
    })
    ```
    
    - watchEffect 可以停止監視
        - 注意: 必須將 watchEffect **先賦值到一個變數**上，需要停止時再使用該變數但不帶入參數的方式停止執行監聽
        - 因為當 watchEffect 被執行時，其函式會回傳一個停止監聽的函式，因此當我們使用變數接此停止監聽的函式並執行時，其就會停止此 watchEffect 的監聽
        
        ```jsx
        let num = ref(1) // 注意: 這邊要用 ref 或 reactive 否則 watchEffect 監聽不到
        
        setTimeout(()=>{
              console.log('有被觸發1',  num.value)
              return num.value+=1
            } , 1000)
            setTimeout(()=>{
              console.log('有被觸發2', num.value)
              return num.value+=1
            } , 2000)
            setTimeout(()=>{
              console.log('有被觸發3',  num.value)
              return num.value+=1
            } , 3000)
        
        const stopWatchEffect = watchEffect(() => {
              console.log('watchEffect', num.value);
              if (num.value === 2) { // 執行 監視 2 次就停止監視
                stopWatchEffect();
              }
            });
        
        // 回傳結果
        // watchEffect  1 => 初步渲染時觸發
        // 有被觸發1 1
        // watchEffect  2 => 觀察到 num 被改變了
        // 由於等於 2 就停止監視了 所以下方 num 變更就不會再觸發 watchEffect 了
        // 有被觸發2 2 
        // 有被觸發3 3 
        ```
        

### 2-7. 使用 watch 監視特定數據

功能: 與 option api 功能相同，都是監測特定值的變化再執行特定行為，但寫法不同

被監測的數值要求: 要是響應式的 ( 如:  getter, ref, reactive…etc. )

- **watch( ) 中有三個參數:**
    1. 被監視的對象
    2. 執行的函式 ( callback )
    3. 物件有以下三個屬性
        1. immediate: 在此 watcher 初步建立時就會被觸發 ( 舊值會是 undefined )
        2. deep: 是否要深層監視
        3. flush: callback 被執行的時機 ( 如 watchEffect，渲染前或渲染後 )
- 相較於 watchEffect，watch 的特性
    - 更專注與特定值的監聽
    - 同時有新舊值兩個值能取得

```jsx
// getter or 響應式物件內單一屬性
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)

// 監視純值
const count = ref(0)
watch(count, (count, prevCount) => {
  /* ... */
})

// 同時監視多值，用陣列 ( 或用 watchEffect )
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})

// 深層監視
const state = reactive({ count: 0 })
watch(
  () => state,
  (newValue, oldValue) => {
    // newValue === oldValue
  },
  { deep: true } // 加入 deep: true
)
```

- watch 可以停止監視 ( 同 watchEffect )
    - 注意: 必須將 watch **先賦值到一個變數**上，需要停止時再使用該變數但不帶入參數的方式執行停止監聽
    
    ```jsx
    let num = ref(1)
    
    setTimeout(()=>{
          console.log('有被觸發1', num.value)
          return num.value+=1
        } , 100)
        setTimeout(()=>{
          console.log('有被觸發2', num.value)
          return num.value+=1
        } , 2000)
        setTimeout(()=>{
          console.log('有被觸發3', num.value)
          return num.value+=1
        } , 3000)
    
    const stopWatchEffect = watch(num, (newVal, oldVal) => {
    			// 注意: 在 watch 內部 ref 帶入的參數 newVal, oldVal 不用再用 val
    			// 但若是不用參數而直接用 num 的話，ref 取值仍是以 num.value
    			console.log('watch', 'newVal', newVal, 'oldVal' ,oldVal)
          if (newVal === 2) { // 執行 監視 2 次就停止監視
            stopWatchEffect();
          }
        }, {immediate: true,});// 有沒有 immediate 的差異在於剛載入組件時此 watch 是否被觸發
    
    // watch newVal 1 oldVal undefined => 只有設 immediate 時會在一開始就觸發
    // 有被觸發1 1
    // watch newVal 2 oldVal 1 => watch 被觸發
    // 由於 num.value 等於 2 停止監視了 所以下方 num 變更就不會再觸發 watch 了
    // 有被觸發2 2
    // 有被觸發3 3
    ```
    

## 三、工具響應式語法介紹

**官網**: [https://vuejs.org/api/reactivity-core.html](https://vuejs.org/api/reactivity-utilities.html)

### 3-1. isRef()

確認該值是否是 ref 值，回傳是 boolean

```jsx
import { onMounted, isRef } from 'vue';

onMounted(()=>{
  console.log('isRef', isRef(num)) // isRef true
})
```

### 3-2. unref()

若參數本身是 ref 則返回其 value 值，若參數本身不是 ref 則返回其參數值

同等於 val = isRef(val) ? val.value : val

```jsx
import { onMounted, unref } from 'vue'

const num = ref(1)
const abc ='abc'

onMounted(()=>{
  console.log('unref ref', unref(num)) // unref ref  1
  console.log('unref not ref', unref(abc)) //  unref not ref abc

})
```

### 3-3. toRefs()

功能: 其可以將響應式 ( reactive ) 的物件中的每個屬性都轉化為 ref 物件 ( 若不是 reactive 的物件則需要轉換成 reactive 後才能使用 )

其功能等於是將 reactive 中每個屬性都用 toRef() 處理過一次

```jsx
import { ref, reactive, toRefs } from 'vue';

const person = {
      name: 'John',
      age: 30,
    };

// 若要使用 toRef 必須轉換成 reactive 物件
const reactivePerson = reactive(person);

// 使用 toRefs，讓響應式物件內的屬性都變成 ref 物件，使用解構將物件解開
 const { name, age } = toRefs(reactivePerson);

// 修改属性值
    const updatePerson = () => {
      name.value = 'Jane';
      age.value = 25;
    };
```

### 3-4. isProxy()

確認該目標是否為 proxy 物件，回傳 Boolean

註: 若是以 **`[reactive()](https://vuejs.org/api/reactivity-core#reactive)`**, **`[readonly()](https://vuejs.org/api/reactivity-core#readonly)`**, **`[shallowReactive()](https://vuejs.org/api/reactivity-advanced#shallowreactive)`** or **`[shallowReadonly()](https://vuejs.org/api/reactivity-advanced#shallowreadonly)`** 建立出來的值都是 Proxy 物件

```jsx
import { onMounted, reactive, isProxy } from 'vue';

const person = reactive({
      name: 'John',
      age: 30,
 });

onMounted(()=>{
	console.log(isProxy(person))// true
})

```

### 3-5. isReactive()

確認該目標是否為**`[reactive()](https://vuejs.org/api/reactivity-core#reactive)`** or **`[shallowReactive()](https://vuejs.org/api/reactivity-advanced#shallowreactive)`** 建立的 proxy 物件，回傳 Boolean

```jsx
import { onMounted, reactive,  isReactive} from 'vue';

const person = reactive({
      name: 'John',
      age: 30,
 });

onMounted(()=>{
	console.log(isReactive(person))// true
})
```

### 3-6. isReadonly()

確認該目標是否為 readonly 物件，在以下幾個狀況建立的 proxy 都是 readonly 物件

- 被 **`[readonly()](https://vuejs.org/api/reactivity-core#readonly)`** and **`[shallowReadonly()](https://vuejs.org/api/reactivity-advanced#shallowreadonly)`** 建立的對象都是
- `computed` 沒有 set function 也是

```jsx
import { onMounted, readonly, isReadonly} from 'vue';

const person = readonly({
      name: 'John',
      age: 30,
 });

onMounted(()=>{
	console.log(isReadonly(person))// true
})
```

### 3-7. toRef() ( vue 3.3+)

**註: 這是 Vue 3.3 版本後才有的功能**

toRef() 會轉變帶入的普通數值、reactive 數值，並**回傳成一個 ref 的數值**

```jsx
// 用 reactive object 結果也是相同的
const testToRef = {
  name: 'Kate'
}
const afterToRef = toRef(testToRef) // 注意: 是回傳，所以要用變數接
console.log(isRef( afterToRef)) // true
console.log(isRef( testToRef)) // false
```

- 另一種用法: 也可以用來作為簡化巢狀物件的目標內容，且仍保持雙向綁定的效果

```jsx
// 非常巢狀的響應式物件
// reactive
const testToRef = reactive({
  name: 'Kate',
  layerOne: {
    name: 'John',
    layerTwo: {
      name: 'Tom',
      layerThree: {
        name: 'inner_child'
      }
    }
  },
})

// 取最內層的 name 並用 toRef 做成 ref
// 此值會雙向綁定在 testToRef 最內層的 name
const afterToRef = toRef(testToRef.layerOne.layerTwo.layerThree, 'name') 
afterToRef.value ='changed_child' // 在 ref 改變值
console.log(testToRef.layerOne.layerTwo.layerThree.name) // 'changed_child' 原 reactive 物件內也被更新
testToRef.layerOne.layerTwo.layerThree.name ='shift_child'// 直接在 reactive 物件更改值
console.log(afterToRef.value) // 'shift_child' toRef 出來的物件也被更新

// 若用 ref 也是同樣的效果
const testToRef = ref({
  name: 'Kate',
  layerOne: {
    name: 'John',
    layerTwo: {
      name: 'Tom',
      layerThree: {
        name: 'inner_child'
      }
    }
  },
})
const afterToRef = toRef(testToRef.value.layerOne.layerTwo.layerThree, 'name')
afterToRef.value ='changed_child' // 在 ref 改變值
console.log(testToRef.value.layerOne.layerTwo.layerThree) // 'changed_child' 原 ref 物件內也被更新
testToRef.value.layerOne.layerTwo.layerThree.name ='shift_child'// 直接在 ref 物件更改值
console.log(afterToRef.value) // 'shift_child' toRef 出來的物件也被更新

// 單純物件也可以
const testToRef ={
  name: 'Kate',
  layerOne: {
    name: 'John',
    layerTwo: {
      name: 'Tom',
      layerThree: {
        name: 'inner_child'
      }
    }
  },
}
const afterToRef = toRef(testToRef.layerOne.layerTwo.layerThree, 'name')
afterToRef.value ='changed_child' // 在 ref 改變值
console.log(testToRef.layerOne.layerTwo.layerThree) // 'changed_child' 原物件內也被更新
testToRef.layerOne.layerTwo.layerThree.name ='shift_child'// 直接在物件更改值
console.log(afterToRef.value) // 'shift_child' toRef 出來的物件也被更新
```

### 3-8. toValue() ( vue 3.3+)

**註: 這是 Vue 3.3 版本後才有的功能**

功能是回傳純值，其與 unref 功能很像，但在於 getter 部分的解法不一樣 

( 但 ref 與 computed, unref 與 toValue 都可以解，reactive 不管哪一個都不能解(會返回 proxy 而非純值 ))

```jsx
const num = ref(2)
const testGetter = computed({
  get: () => num.value
})

	console.log('unref',  unref(testGetter)) // 2
  console.log('toValue', toValue(testGetter))//2
  num.value = 3 // 當 computed 改變時兩者都一樣會響應
  console.log('unref',  unref(testGetter)) //3
  console.log('toValue', toValue(testGetter)) //3

// 但用 getter 測試
  console.log('unref',  unref(()=>4)) // ()=>4 
  console.log('toValue', toValue(()=>4)) //4 只有 toValue 可以解
```

## 四、進階響應式語法介紹

**官網**: [https://vuejs.org/api/reactivity-advanced.html](https://vuejs.org/api/reactivity-advanced.html)

### 4-1. shallowRef()

說明: 相較於 ref() 的深層響應，shallowRef() 只能淺層，所以相較之下的影響是

- 物件內的屬性就算被修改也不會觸發畫面關聯的資訊更新
- 所以只有是純值，或是物件的整個指向參考被改變 ( 物件整個被重新賦值 ) 才會觸發畫面關聯資訊的更新

通常是用於大型數據的性能優化 ( 避免觸發太多次畫面更新而影響整體效能 ) 而使用

補充: 進階閱讀 **[指南 - 减少大型不可变结构的响应性开销](https://cn.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)**

```jsx
const state = shallowRef({ count: 1 })

// 改變物件內的屬性不會觸發畫面更新
state.value.count = 2

// 改變整個物件指向 ( 重新賦值 ) 會觸發畫面更新
state.value = { count: 2 }
```

### 4-2. triggerRef()

強制觸發 shallowRef() 的副作用 ( 比如對於 shallowRef 的對象物件進行屬性修改 ) 使其強制觸發對應的畫面更新

```jsx
const shallow = shallowRef({
  greet: 'Hello, world'
})

 
watchEffect(() => {
  // 第一次觸發會列印 'Hello, world'
	console.log(shallow.value.greet)
})

// 由於 shallowRef 是淺層響應，因此物件修改屬性值本不該觸發畫面關聯資料的更新
shallow.value.greet = 'Hello, universe'

// 使用 triggerRef 強制觸發淺層的 shallowRef 更新
triggerRef(shallow) // 因此會打印出修改後的 'Hello, universe'
```

### 4-3. shallowReactive()

相對於 reactive 對於物件的深層響應，這是相對於此概念的淺層響應

但需要注意的是: 由於 reactive 本身就是針對物件的響應式函式，因此其所謂的淺層響應是指該物件的第一層屬性是響應的，往下則不是 ( 相對於 shallowRef 其本身原針對純值，所以淺層響應的範圍在於替換純值與物件重新的指向不同 )

須小心使用，因為此函式有不一致的響應層級與對應的行為，容易造成混淆

```jsx
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改 reactive 第一層數行屬於響應式的
state.foo++

// 但往下的層級就不是響應式的了
isReactive(state.nested) // false

// 由於不是響應式的所以對應的畫面不會更新
state.nested.bar++
```

### 4-4. shallowReadonly()

相對於 readonly 的淺層響應函式

與 shallowReactive 的狀況雷同，其針對的是物件的第一層屬性為 readonly 但第二層以下就不是

須小心使用，因為此函式有不一致的響應層級與對應的行為，容易造成混淆

```jsx
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 第一層屬性因為是 readonly 所以更改會失敗
state.foo++

// 但是再往下一層就不是 readonly 了
isReadonly(state.nested) // false

// 第二層以下因為不再是 readonly 所以可以更改
state.nested.bar++
```

### 4-5. toRaw()

其可以返回由 reactive(), readonly(), shallowReactive(), shallowReadonly() 當時建立時所對應的代理對象

```jsx
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

### 4-6. **effectScope()**

創建一個 effect 作用域，其會捕捉其內設定的所有響應式行為 ( 比如響應式屬性與監聽器 )，如此方便這些響應式行為一起處理，比如一起停止響應式

```jsx
// template

	<button type='button' @click='addCounter' > counter 加 1 </button>

// script setup

const counter = ref(1)
scope.run(()=> {
  const doubled = computed(()=> counter.value*2)
  watch(doubled, ()=> console.log('watch',doubled.value))
  watchEffect(()=>console.log('counter.value' ,counter.value,'double.value', doubled.value))
})
const addCounter = function () {
  counter.value += 1
}

watchEffect(() => {
  if(counter.value >5){ // 設定停止響應 & 監聽的條件
    scope.stop() // 之後就不會有 scope 內的 響應式與監聽行為
  }
})

```

## 五、Composition API 的生命週期

**官網**: [https://vuejs.org/api/composition-api-lifecycle.html](https://vuejs.org/api/composition-api-lifecycle.html)

- 相較於option api  composition api 加入生命週期只要在該方法前面新增 **on** 就行
- 特色:  在同個 setup() 中能夠有**多個相同的生命週期** ex: onMounted *2 以上

以下圖表取自: **[重新認識 Vue.js | Kuro Hso](https://book.vue.tw/CH1/1-7-lifecycle.html)**

![https://i.imgur.com/JAaQy5d.jpg[/img]](https://i.imgur.com/JAaQy5d.jpg[/img])

### 5-1. setup

- 相等於 option api 中的  beforeCreate, created
- 此階段的 Vue 實體剛被建立，但尚未掛載 ( 但由於狀態與事件已初始化，所以可以取到 props, computed, data… )

```jsx
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
}
```

### 5-2. **`onBeforeMount` 和 `onMounted`**

- 相等於 option api 中的 beforeMount 與 mounted
- onBeforemount 尚未與 DOM 綁定
- onMounted 組件已掛載在 DOM 上

```jsx
import { onBeforeMount, onMounted } from 'vue';

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Component will mount soon');
    });

    onMounted(() => {
      console.log('Component is now mounted');
    });
  },
};
```

### 5-3. **`onBeforeUpdate` 和 `onUpdated`**

- 相等於 option api 中的 beforeUpdate 與 updated
- onBeforeUpdate 在狀態被更新前觸發
- onUpdated 在狀態更新後觸發

```jsx
import { onBeforeUpdate, onUpdated } from 'vue';

export default {
  setup() {
    onBeforeUpdate(() => {
      console.log('Component will update soon');
    });

    onUpdated(() => {
      console.log('Component is updated');
    });
  },
};
```

### 5-4. **`onBeforeUnmount` 和 `onUnmounted`**

- 相等於 option api 中的  beforeUnmount, unmounted ( 也等於 vue2 的 beforeDestroy, destroyed )
- onBeforeUnmount : 在 Vue 實體物件被銷毀前
- onUnmounted: 在 Vue 實體物件被銷毀後

```jsx
import { onBeforeUnmount, onUnmounted } from 'vue';

export default {
  setup() {
    onBeforeUnmount(() => {
      console.log('Component will be unmounted soon');
    });

    onUnmounted(() => {
      console.log('Component is now unmounted');
    });
  },
};
```

## 六、Composition API Injection 寫法

**官網**: [https://vuejs.org/api/composition-api-dependency-injection.html](https://vuejs.org/api/composition-api-dependency-injection.html)

官網: [https://cn.vuejs.org/guide/components/provide-inject.html](https://cn.vuejs.org/guide/components/provide-inject.html)

基本上 Composition api 中的 provide 與 inject 與 opsition api 一樣，基本上就是能夠從外層傳到目標層，也就是說能夠多層傳遞 ( 限制是不能平行傳遞，只能上下傳遞 )

![https://cn.vuejs.org/assets/provide-inject.3e0505e4.png](https://cn.vuejs.org/assets/provide-inject.3e0505e4.png)

- **Provide**
    - 在外層傳遞資料利用 provide 傳遞給所有子元件
    
    ```jsx
    import { provide } from 'vue';
    
    export default {
      setup() {
        const someData = 'Hello from parent!';
    		
    		// 參數 1:是字串作為 inject key
    		// 參數 2:是傳入內部的資料
        provide('someKey', someData);
    
        return {};
      },
    };
    ```
    
- **Inject**
    - 在內層用 inject 接收 provide 來的數據
    
    ```jsx
    import { inject } from 'vue';
    
    export default {
      setup() {
    		// 使用變數去接 inject 進來的資料
    		// inject 的參數帶與 parent (外層) 相同的 inject key
        const receivedData = inject('someKey');
    
        console.log(receivedData); // 输出：Hello from parent!
    
        return {};
      },
    };
    ```
    

## 七、組合式函數 ( Composables )

**官網:** [https://cn.vuejs.org/guide/reusability/composables.html](https://cn.vuejs.org/guide/reusability/composables.html)

此章節的目標是介紹 Composition API 如何透過封裝邏輯達到更好的元件模組化以及複用性，以及說明為何使用 Composition API 後就可以棄用 Option API 中的 Mixins 的主要原因

- composition api 可以建立有狀態 ( stateful ) 的共用邏輯: 在開發前端程式時，我們時常會將常用的工具邏輯抽取出來，或者是使用第三方的無狀態 ( stateless ) 邏輯的函式庫 ( ex: loadsh, date-fns…etc. ) 來輔助開發程式，而搭配 Vue3 的 composition api 也更容易將有狀態的共用邏輯抽取出來，以增加函式的複用性以及模組化更為方便後續的維護與管理。

 

<aside>
💡 Stateful logic ( 有狀態邏輯 ) & Stateless logic ( 無狀態邏輯 ) 說明:
1. **Stateful Logic（有狀態的邏輯）:** 
   **** 代表該函式內有直接引用外部的變數，這些外部變數可能包含會在函式執行時產生變化，進而影響外部變數的值與狀態，而這些所謂的外部變數通常是用來追蹤用戶行為 ( ex: 輸入… )、作為系統變量或者是紀錄 api 請求結果等

    ****特點 1. 執行過程中可能會導致外部狀態 ( 變數  ) 
    特點 2. 計算結果會因為所依賴的外部變數狀態的改變而改變
    特點 3. 因為以上特性所以更容易產生 side effect ( 副作用 )

ex: 
let counter = 0 // 外部變數
function incrementCounter() \{
  counter++ // 外部變數被改變狀態
\}

2. **Stateless Logic（無狀態的邏輯）：**
   是指不依賴外部變數，其輸出結果完全由輸入的參數決定，而這種函式因為相對獨立，且不依附於外部的邏輯，所以通常更容易測試與模組化作為共用的工具邏輯
註: 但並不是說無狀態邏輯就不能改變外部變數，若直接將其輸出結果在函式外部作為外部變數的賦值其也可以改變外部變數的狀態，其定義無狀態邏輯的特點是其函式內部定義並**沒有直接使用到外部的變數所為邏輯計算的過程**，而是藉由**參數的傳入**與外部作為互動，也因此輸出的結果更容易被測試與預測

****特點 1: 函式內部定義的邏輯不依賴外部的變數
特點 2: 輸出的結果完全由帶入的參數而定

****ex: 
function add(a, b) \{

  return a+b

**\}**

</aside>

<aside>
💡 **副作用 ( side effect ) 介紹**

所謂的副作用是指該函式的操作對於系統或外部變數產生預期外的影響，副作用包含但不限於以下情況
1. 修改外部的變數或狀態
2. 對於外部的系統調用 ( ex: 網路請求、數據庫操作 … )
3. 若該函式直接改變傳入的參數 ( 如物件的傳參考特性 )，而不是單純的產生一個新值，那也被認定為是有副作用的
4. 可能引發異常: 比如產生錯誤時沒有及時捕獲、產生的值型態不如預期( null, undefined )而沒有被妥善處理，而進而產生程式中斷 都算是

</aside>

而在 Option API 中有個 Mixins 的功能與我們即將介紹的 composition api 中抽出共用邏輯的部分相似，雖然 Mixins 可以很好的複用邏輯但也產生了非預期的問題
1. 全域變數的汙染: Mixins 的問題是當引入時是整包引入，而不能單純只引入想引入的目標邏輯，而導致的問題是這些非目標的變數與函式可能會造成與當前組件的變數名稱衝突或汙染，並產生非預期的結果
2. 呆板只能整包引入: 與 composition api 的共用邏輯不同，其不能只取用部分而是必須整包引入也減少了該組共用邏輯的複用性

3.除錯不易: 由於 Mixins 處會同時引入非目標的邏輯，導致出錯時因該邏輯或變數並沒有直接在該組件中被引用，因此在查找錯誤時更為不易 

### 7-1. 組合式函式範例

7**-1-1. 若我們需要在 vue 組件抽出並複用以下滑鼠追蹤功能的邏輯，我們要怎麼做呢 ?**

```jsx
// index.vue
<template>
...
	Mouse position is at: {{ x }}, {{ y }}
...
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
...
const x = ref(0)
const y = ref(0)
function update(event) {
  x.value = event.pageX
  y.value = event.pageY
}
...
onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
...
</script>

```

- 我們可以直接將該邏輯部分進行抽取成一份 js 文件
    - 若是使用 nuxt 做為開發的框架，我們可以在平行於 pages 的階層中，找到 composables 的資料夾，共用邏輯一般都存放在一起
    
    ```jsx
    // mouse.js
    import { ref, onMounted, onUnmounted } from 'vue'
    
    // 按照惯例，组合式函式的命名皆以 “use” 作為開頭
    export function useMouse() {
      // 被组合式函式封装和管理的狀態
      const x = ref(0)
      const y = ref(0)
    
      // 组合式函式的操作邏輯。
      function update(event) {
        x.value = event.pageX
        y.value = event.pageY
      }
    
      // 也可以掛載或卸載生命週期
      onMounted(() => window.addEventListener('mousemove', update))
      onUnmounted(() => window.removeEventListener('mousemove', update))
    
      // 通过回傳值來定義需要共用的狀態或函式
      return { x, y }
    }
    ```
    
- 以下是其他組件想要使用此邏輯的方式
    
    ```jsx
    // example.vue
    
    <template>
    ....
    Mouse position is at: {{ x }}, {{ y }}
    ....
    </template>
    
    <script setup>
    import { useMouse } from './mouse.js'
    
    const { x, y } = useMouse() 
    // 因為在定義時 x 與 y 都是 ref 響應式定義，因此直接解構出來仍可維持此特性
    </script>
    ```
    

7**-1-2. 而在被複用的邏輯中也可以引入其他複用的邏輯，實現更小且功能更清晰的模組化，更方便組件間的複用性**

- 舉例來說: 我們可以針對上述的共用邏輯範例中再抽出生命週期  ( 針對 DOM ) 的監聽行為
    
    ```jsx
    // event.js
    import { onMounted, onUnmounted } from 'vue'
    
    export function useEventListener(target, event, callback) {
      // 如果你想的话，
      // 也可以用字符串形式的 CSS 选择器来寻找目标 DOM 元素
      onMounted(() => target.addEventListener(event, callback))
      onUnmounted(() => target.removeEventListener(event, callback))
    }
    ```
    
- 然後在原本的共用邏輯 mouse.js 導入
    
    ```jsx
    // mouse.js
    import { ref } from 'vue'
    import { useEventListener } from './event' //被抽出的共用邏輯
    
    export function useMouse() {
      const x = ref(0)
      const y = ref(0)
    
    // event.js 定義的 useEventListener(target, event, callback)
      useEventListener(window, 'mousemove', (event) => {
        x.value = event.pageX
        y.value = event.pageY
      })
    
      return { x, y }
    }
    ```
    

<aside>
💡 在每一個組件中使用共用邏輯導入的變數 ( ex:  範例中的 x, y ) 其狀態 ( 值 ) 為該模組獨有，並不會因為模組間共用邏輯而互相影響 ( 若須共享狀態，請另外使用狀態管理工具 ex: Pinia, Vuex…etc. )

</aside>

### 7-2. 異步程式碼抽成共用邏輯範例

7-2-1. 但若我們想要抽取會賦值的異步程式碼共用部分呢 ? 原代碼如下

```jsx
// index.vue
<script setup>
import { ref } from 'vue'

const data = ref(null)
const error = ref(null)

fetch('...')
  .then((res) => res.json())
  .then((json) => (data.value = json))
  .catch((err) => (error.value = err))
</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div v-else-if="data">
    Data loaded:
    <pre>{{ data }}</pre>
  </div>
  <div v-else>Loading...</div>
</template>
```

- 若每次要獲取資料都要增加這些程式碼也是困擾，我們可以抽出共用部分如下

```jsx
// fetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  fetch(url)
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}
```

- 接下來在其他組件使用時可以以如下方式引入

```jsx
// example.vue

<script setup>
import { useFetch } from './fetch.js'

const { data, error } = useFetch('...')
</script>
```

- 若希望將此共用邏輯改成響應式的呢 ? 當帶入的參數 url 改變時，則會自動偵測並重新執行 ?

```jsx
// 在原本的共用邏輯 fetch.js 上改成如下

import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    // reset state before fetching..
    data.value = null
    error.value = null

		// unref 會將 ref 屬性轉成純值
    fetch(unref(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err))
  }

// watchEffect 會偵測其內部函式所帶入的參數改變而執行
  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
```

## 八、各種數據傳遞方式介紹

### emit 寫法

- vue2 在子組件中的 v-on 都是自訂事件，並非 DOM 的原生事件，因此要定義清楚 ( ex: 在子組件上的 @click 並不是原生 DOM 的點擊事件，需要自行定義 )，除非加上 .native 修飾
- vue3 在子組件的 v-on 可以是 DOM 的原生事件 ( ex:@click 就是 DOM 原生的點擊事件 )
    - event 在 vue 中取的補充
        
        在 template 中使用要加 $ 字號，$event
        
        注意: event 參數的寫法
        
        ```jsx
        <template>
            <div class="login">
                <div class="login-content">
                    <div class="login-form login-item">
                        <p class="login-title">電量智能監控</p>
                        <el-button type="primary"  @click="clickHandler(1,2,3, $event)">Primary</el-button>
                    </div>
                </div>
            </div>
        </template>
        
        <script lang='ts' setup>
        function clickHandler(a:number, b:number, c:number, $event):void{
            console.log(a, b,c, $event)
        }
        
        </script>
        ```
        

```jsx
// 父組件
<template>
    <div class="login">
        <div class="login-content">
            <div class="login-form login-item">
                <p class="login-title">電量智能監控</p>
                <!-- 原生 DOM 事件 -->
                <el-button type="primary"  @click="clickHandler(1,2,3, $event)">Primary</el-button>
                <!-- vue2 中子組件直接用 click 為自定義事件，但可以通過 .native 修飾符變為原生 DOM 事件 -->
                <!-- vue3 中 子組件直接用 click 即為 原生的 DOM 事件 ( 他是掛在該子組件的根節點( root node ) ) -->
                <!-- 範例如下，直接點即會有 click 事件為原生的 DOM 事件 -->
                <Event @click="clickHandler(1,2,3, $event)" />
                <!-- vue3 的自定義寫法 -->
                <Event2 @xxx='handler3' />
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive} from 'vue'

function clickHandler(a:number, b:number, c:number, $event):void{
    console.log(a, b,c, $event)
}

const handler3 = (param1: string)=>{
    console.log(param1 )
}

</script>
```

子組件

```jsx
//Event2

<template>
    <div class="son">
        <p>我是子組件 2</p>
        <el-button type="primary"  @click="handler">點擊我觸發子組件</el-button>
    </div>
</template>

<script lang="ts" setup>
// 利用 defineEmits 方法直接觸發自定義事件
// defineEmits 不需要引入使用

let $emit = defineEmits(['xxx'])

const handler = ()=>{
    // 第一個參數: 事件的類型，其後都是注入的數據
    $emit('xxx', '雄風飛彈')
}

</script>

<style scoped>
.son{
    width: 400px;
    height: 400px;
    background: pink;
}
</style>
```

### v-model 實現父子數據雙向綁定

可以用 v-model 來實現父子組件數據的雙向綁定，因為其同時是 props 以及 update 的簡寫方式

```jsx
// 父組件
<template>
    <div class="login">
        <h1>v-model</h1>
        <p>父組件錢數 {{money}}</p>
        <input type="text" v-model="info" />
        // props 父親給兒子的數據
        // 方法一 
        <child :modelValue="money" @update:modelValue="handler"/>
        // 方法二 只用 v-model
        // 上下兩個方法結果相同 
        // 因為 v-model 也就同等於 props[modelValue] 以及綁定了 update:modelValue 這兩個
        // 注意上方的名稱不能替換 
        <child v-model="money"/>
        <hr />

				// 父層傳遞多個 v-model
        <p>父層 pageNo {{ pageNo }}</p>
        <p>父層 pageSize {{ pageSize }}</p>
        <!-- 相當於給了 child 2 props[pageNo, pageSize] 以及 @update:pageNo 和 @update:pageSize -->
        <child2 v-model:pageNo="pageNo" v-model:pageSize="pageSize" />
    </div>
</template>

<script lang='ts' setup>
//  v-model 也可以實現父子組件的即時通訊
import child from './child.vue';
import child2 from './child2.vue';
import {ref} from 'vue';

let info = ref('')

//  父組件的數據
let money = ref(10000);

//  自定義事件的回調
const handler =(num) => {
    // 將來接受子組件傳遞過來的數據
    console.log(num)
    // 父曾利用自定義事件的回調接受同步子組件的更新
    money.value =num
}

// child2 多個 v-model 範例

let pageNo = ref(1);
let pageSize = ref(3);

</script>
```

方法 1 & 2 對應的子組件

```jsx
// child1

<template>
    <div class="son">
        <p>我是子組件</p>
        <p>子組件錢數{{modelValue}}</p>
        <el-button type="primary"  @click="handler">互動</el-button>
    </div>
</template>

<script lang="ts" setup>
// 接收 props 
let props = defineProps(['modelValue']);
let $emit = defineEmits(['update:modelValue'])

const handler = () => {
    // 觸發自定義事件
    // 此寫法變動是在子組件
    $emit('update:modelValue', props.modelValue+1000)
}

</script>

<style scoped>
.son{
    width: 400px;
    height: 400px;
    background: skyblue;
}
</style>
```

傳遞多個 v-model 對應的子組件範例

```jsx
// child2 

<template>
    <div class="son">
        <h1>同時綁定多個 v-model</h1>
        <p>我是子組件</p>
        <p>子層 pageNo {{ pageNo }}</p>
        <p>子層 pageSize {{ pageSize }}</p>

        <el-button type="primary"  @click="handler">pageNo互動</el-button>
        <el-button type="secondary"  @click="handler2">pageSize互動</el-button>
    </div>
</template>

<script lang="ts" setup>
// 接收 props 
let props = defineProps(['pageNo', 'pageSize']);
let $emit = defineEmits(['update:pageNo', 'update:pageSize'])

const handler = () => {
    // 觸發自定義事件
    // 此寫法變動是在子組件
    $emit('update:pageNo', props.pageNo+1)
}
const handler2 = ()=> {
    $emit('update:pageSize', props.pageSize+1)
}

</script>

<style scoped>
.son{
    width: 400px;
    height: 400px;
    background: hotpink;
}
</style>
```

### useAttrs 獲取組件身上的屬性與事件

useAttrs 可以取得父組件上的屬性與事件 ( 方法 )，但若有 props 接收同樣的屬性的話 那 useAttrs 就拿不到對應的屬性

```jsx
// 父組件範例
<template>
    <div>
        <h1>useAttrs</h1>
        <el-button type="primary" size="small" :icon="Edit">Primary</el-button>
        <!-- 自定義組件 -->
        <HintButton type="primary" size="small" :icon="Edit" title="編輯按鈕"></HintButton> 
    </div>
</template>

<script lang="ts" setup>
// vue3 提供了 useAttrs 可以用來取得組件內的屬性以及方法

// element-plus 內部的圖標組件
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

import HintButton from './HintButton.vue'

</script>
```

自定義組件寫法範例

```jsx
<template>
    <div :title="$attrs.title">
        <h1>自訂組件</h1> 
        <!-- <el-button :type="$attrs.type" :size="$attrs.size" :icon="$attrs.icon">自訂組件按鈕</el-button> -->
        <!-- 下面這寫法等於 a=1 b=2 -->
        <h2 :="{a:1, b:2}">123</h2>
        <!-- 所以上方 el-button 的寫法就可以縮寫如下 -->
        <el-button :="$attrs">自訂組件按鈕</el-button>

    </div>
</template>

<script setup lang="ts">
// 接收父組件傳遞過來的數據
// defineProps(['type', 'size', 'icon'])
// 引入 useAttrs 方法:獲取父組件標籤上屬性與事件(方法)
import {useAttrs} from "vue"
console.log('useAttrs', useAttrs)
// 此方法執行會返回一個對象
let $attrs = useAttrs() // 是 Proxy Object
console.log('$attrs', $attrs)
// 注意: $attrs 只會拿到沒有 props 進來的屬性，也就是說有 props 接受的話 $attrs 就會拿不到
</script>
```

### ref() 與 $parent

搭配 defineExpose 就可以

- 在父組件中使用 ref() 在父組件中拿到子組件內部的屬性與方法
- 在子組件中使用 $parent 就可以在子組件中取得父組件的屬性與方法

```jsx
// 父組件
<template>
    <div class="box">
        <h1>ref與$parent</h1>
        <h2>我是父親太陽，有資產 {{money}}</h2>
        <el-button type="warning" @click="handler">我與兒子丁丁借 10 塊錢</el-button>
        <hr />
				// Son 是使用 ref 的範例
        <Son ref="son" />
				// Dau 是使用 $parent 的範例
        <Dau ref="dau" />
    </div>
</template>

<script setup lang="ts">
//  ref: 可以獲取到真實 DOM 的節點，並可以獲取到子組件的實例 VC ( vue component )
// $parent: 可以在子組件的內部獲得父組件的實例 VC

import {ref} from 'vue'
import Son from './son.vue'
import Dau from './Daughter.vue'
let money = ref(10000000);
// 獲取子組件 vc
const son = ref()
const dau = ref()

// 父組件按鈕點擊回調
const handler = () => {
    money.value += 10
    console.log(son.value)
    // 兒子的錢數減去 10
    son.value.money -=10 
    son.value.fly()

}

// 父組件內部的屬性獲取對外是關閉的
// 若要暴露一樣要用 defineExpose

defineExpose({ money })
</script>

<style scoped>
.box {
    height: 500px;
    width: 500px;
    background: skyblue;
}

</style>
```

son 子組件 ( 搭配 ref 取子組件屬性範例 )

```jsx
// son.vue
<template>
    <div class="son">
        <h2>我是子組件: 丁丁 有資產:{{money}}</h2>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

let money = ref(666)

const fly = () => {
    console.log('我起飛了~')
}

// 子組件內部的數據是對外關閉的，別人不能訪問
// 如果想讓外部訪問需要通過 defineExpose 方法對外暴露
defineExpose({money, fly})

</script>

<style scoped>
.son{
    width: 400px;
    height: 200px;
    background: cyan;
}
</style>
```

dau 子組件 ( 搭配 $parent 範例 )

```jsx
// Daughter.vue

<template>
    <div class="dau">
        <h2>我是閨女: 拉拉 有資產:{{money}}</h2>
        <!-- $parent 可以獲取到父組件的內部資料 -->
        <el-button type="primary" @click="handler($parent)">點擊我爸爸給我 10000 元 </el-button>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';

let money = ref(9999999)

const fly = () => {
    console.log('我迫降了~')
}

const handler = ($parent) => {
    money.value +=10000;
    console.log('$parent', $parent)
    console.log('$parent.money', $parent.money)
    $parent.money -= 10000;
}

// 子組件內部的數據是對外關閉的，別人不能訪問
// 如果想讓外部訪問需要通過 defineExpose 方法對外暴露
defineExpose({money, fly})

</script>

<style scoped>
.dau{
    width: 400px;
    height: 200px;
    background: hotpink;
}
</style>
```

### provide & inject

vue3 提供 provide 與 inject 功能，可以實現隔多個組件傳遞的功能，並且可以實現數據的雙向連動 ( 若數據有被更改，其餘有用到的地方皆會一同被修改 )

```jsx
// 爺爺組件 provide 來源範例
<template>
    <div class="box">
        <h1>provide 與 inject</h1>
        <h2>以下是烏龜家庭</h2>
        <hr />
        <h3>爺爺有 {{car}}</h3>  
      <Child />
    </div>
</template>

<script setup lang="ts">
import Child from "./Child.vue"
//  vue3 提供 provide 與 inject 功能，可以實現隔多個組件傳遞的功能
import {ref, provide } from 'vue'
let car = ref('小摩托')

// provide 需要兩個參數
// 第一個參數: 提供對應數據的 key ( 用來辨識是哪組數據 )
// 第二個參數: 祖先提供的數據
provide('TOKEN', car)
</script>

<style scoped>
.box{
    width: 100vw;
    height: 600px;
    background: skyblue;
}
</style>
```

Child.vue 子組件，內掛載孫組件

```jsx
// Child.vue
<template>
    <div class="child">
        <h1>我是龜兒子</h1>
      <GrandChild />
    </div>
</template>

<script setup lang="ts">
import GrandChild from './GrandChild.vue';

</script>

<style scoped>

.child{
width: 300px;
height: 400px;
background: yellowgreen;
}

</style>
```

孫組件 GrandChild.vue

```jsx
<template>
    <div class="grand-child">
        <h1>龜孫子</h1>
        <h3>龜孫子繼承 {{car}}</h3>
        <el-button type="primary" @click="updateCar">更新龜爺爺數據</el-button>
    </div>
</template>

<script setup lang="ts">
import {inject} from 'vue'
// inject 傳入的為 provide 的 key，其返回的就是 provide 傳過來的數據
let car = inject('TOKEN')
console.log('car', car)

// 孫輩亦可變動傳入的數據 (祖輩的數據會被連動)
const updateCar = () => {
    car.value = '玩具車車'
}
</script>

<style scoped>
.grand-child{
    width: 200px;
    height: 200px;
    background: red;
}

</style>
```

### pinia

pinia 也是 vue 的狀態管理工具，與 vuex 的核心概念比較如下

vuex 核心概念: state、mutations、actions、getters、modules

pinia 核心概念: state、actions、getters

- 基本在 vue ( vite ) 中的配置
    
    ```
    // 安裝指令
    yarn add pinia
    ```
    
- 創建與 views 同一階層的資料夾並命名為 store，並在其內放入
    - **modules 資料夾**
        
        內放置各 repo 的具體配置，這邊以 info.ts為例
        
        - **option api 寫法**
            
            ```tsx
            // option api 的寫法
            // 定義小倉庫
            import {defineStore} from "pinia"
            
            //  第一個參數: 小倉庫的名字
            // 第二個參數: 小倉庫的具體配置
            // defineStore 方法執行會返回一個函數，函數作用就是可以讓組件獲取到倉庫的數據
            let useInfoStore = defineStore('info', {
                // 存取數據 state
                state: ()=>{
                    return {
                        count: 99,
                        arr: [1,5,10]
                    }
                },
                actions: {
                    // 注意相較於 vuex , pinia actions 中的參數沒有了 context 這參數
                    // 也不用 commit, mutation 去修改數據
                    // 而相較於 vuex 只能在 action 帶一個參數，pinia 可以帶多個參數 
                    updateNum(a:number, b: number){
                        console.log('updateNum', this, a, b)
                        // 可以用 this 調用自身其他的 state 或 actions
                        this.count++;
                    }
                },
                getters: {
                    total(): number{
                    let result = this.arr.reduce((prev:number, next:number):number=>{
                            return prev + next
                        },0)
                    return result
                    }
                }
            })
            
            // 對外輸出
            export default useInfoStore
            ```
            
        - **composition api 寫法**
            
            ```tsx
            // composition api 的寫法
            // 定義小倉庫
            import {defineStore} from "pinia"
            import {ref, computed} from 'vue'
            
            // 創建小倉庫
            let useTodoStore = defineStore('todo', ()=>{
                //  state 使用 ref
                let todos = ref([{id: 1, title: '吃飯'}, {id: 2, title: '睡覺'},   {id: 3, title: '打豆豆'}])
                // getters 使用 computed
                let arr =ref([1,5,10])
                const total = computed(()=>{
                    return arr.value.reduce((prev:number, next:number)=>prev+next,0)
                })
                // 務必要 return 一個 object 內含屬性與方法 
                return {
                    todos,
                    arr,
                    total,
                    // actions ( 也可以定義完後這邊方變數，結果是一樣的 )
                    updateTodos() {
                        todos.value.push({id: 4, title: '治療豆豆'})
                    }
                }
            })
            
            export default useTodoStore;
            ```
            
    - **index.ts**
        
        ```tsx
        import {createPinia} from 'pinia'
        // createPinia 可以被用於創建大倉庫
        let store = createPinia();
        // 對外暴露
        export default store;
        ```
        
- 在 main.ts 中掛載
    
    ```tsx
    import { createApp } from 'vue'
    import './style.scss'
    import App from './App.vue'
    import router from './router'
    import store from './store' // 掛載在這
    
    createApp(App).use(router).use(store).mount('#app')
    ```
    
- 實際在組件中使用範例 ( 示範修改數據的方法 )
    
    ```tsx
    <template>
        <div class="child">
            <h1>菠蘿孩子1</h1>
            <p>{{ infoStore.total }}</p>
            <p>{{ infoStore.count }}</p>
            <el-button type="primary" @click="updateCount">count 加加</el-button>
        </div>
    </template>
    
    <script setup lang="ts">
    import useInfoStore from '../../store/modules/info'
    console.log('useInfoStore', useInfoStore)
    let infoStore = useInfoStore()
    //  修改數據方法
    const updateCount = ()=> {
        // 1. 直接用 store.屬性
        // infoStore.count ++;
        // // 2. 也可以用 $patch
        // infoStore.$patch({
        //     count: 111111
        // })
        //  3. 也可以調用倉庫中的方法來改變倉庫數
        infoStore.updateNum(16, 20)
    
    }
    
    </script>
    
    <style scoped>
    .child{
        width: 200px;
        height: 200px;
        background: yellowgreen;
    }
    </style>
    ```
    

### slot 插槽

slot 常見的有三種用法

1. 默認插槽
2. 具名插槽
3. 作用域插槽:  可以傳遞數據的插槽，子組件可以藉此將數據回傳給父組件，由父組件決定所回傳的數據是以何種結構或是外觀在組件內部去展示
- **默認插槽 & 具名插槽範例** ( v-slot: 簡寫是 #  )
    
    ```tsx
    // 父組件
    <template>
        <div class="box">
            <h1>slot</h1>
            <SlotTest>
                <!-- 默認插槽填充法 -->
                <div>
                    <!-- 在 pre 內部會照原本原本呈現的內容呈現，若有空格或斷行也不需要空格或斷行符號就會照實呈現 -->
                    <pre>大江東去浪濤盡，千古風流人物</pre>
                </div>
                <!-- 具名插槽填充法 -->
                <template v-slot:a>
                    <div>
                        <pre>我是填充具名插槽的 a 結構</pre>
                    </div>
                </template>
                <!-- v-slot: 簡寫是 # -->
                <template #b>
                    <div>
                        <pre>我是填充具名插槽的 b 結構</pre>
                    </div>
                </template>
            </SlotTest>
        </div>
    </template>
    
    <script setup lang="ts">
    import SlotTest from './SlotTest.vue'
    
    </script>
    ```
    
    SlotTest 組件
    
    ```tsx
    <template>
        <div class="box">
            <h1>我是子組件默認插槽</h1>
            <!-- 默認插槽 -->
            <slot></slot>
            <h1>我是子組件默認插槽</h1>
            <!-- 具名插槽 -->
            <h1>具名插槽</h1>
            <slot name='a'></slot>
            <slot name='b'></slot>
            <h1>具名插槽</h1>
        </div>
    </template>
    
    <script setup lang="ts">
    
    </script>
    
    <style scoped>
    .box{
        width: 100vw;
        height: 600px;
        background: skyblue;
    }
    </style>
    ```
    
- **作用域插槽**
    
    這邊展示的用法是藉由父組件將資料傳入後，再由子組件將資料傳出，由父組件來定義樣式 ( 這在 element plus 這 css library 很常使用 )
    
    ```tsx
    // 父組件
    <template>
        <div class="box">
            <h1>slot</h1>
            <ScopeSlot :todos="todos">
                <template v-slot="{$row, $index}">
                    <p :style="{color:$row.done? 'green':'red'}">{{ $row.title }}--{{$index}}</p>
                </template>
            </ScopeSlot>
        </div>
    </template>
    
    <script setup lang="ts">
    import ScopeSlot from './ScopeSlot.vue'
    // 作用域插槽，就是指可以傳遞數據的插槽，子組件可以藉此將數據回傳給父組件
    // 由父組件決定所回傳的數據是以何種結構或是外觀在組件內部去展示
    import {ref} from 'vue'
    let todos = ref([
    {id: 1, title: '吃飯', done:true}, {id: 2, title: '睡覺', done: false},   {id: 3, title: '打豆豆', done: true}
    ])
    
    </script>
    ```
    
    作用域插槽的範例  
    
    ```
    <template>
        <div class="box">
            <h1>作用域插槽</h1>
            <p>{{ todos }}</p>
            <ul>
                <li  v-for="(item, index) in todos" :key="item.id">
                    <!-- 作用域插槽: 可以將數據回傳給父組件 -->
                    <slot :$row='item' :$index='index'></slot>
                </li>
            </ul>
        </div>
    </template>
    
    <script setup lang="ts">
    // 通過 props 去接受父組件傳遞的數據
    defineProps(['todos'])
    
    </script>
    
    <style scoped>
    .box{
        width: 100vw;
        height: 400px;
        background: hotpink;
    }
    </style>
    ```
    

### mitt 套件 ( event bus )

可以藉由安裝 mitt 套件 ( [連結](https://www.npmjs.com/package/mitt) ) 來實現 vue2 中原本的 event bus 功能，達成資料的橫向傳遞

- **在 vue ( vite ) 中的基本配置**
    
    ```powershell
    #安裝 mitt
    yarn add mitt
    ```
    
    在 src 資料夾中創建了 名為 bus 的資料夾內部放一個 index.ts，設置如下
    
    ```tsx
    //  引入 mitt 插件: mitt 一個方法，方法執行會返回 bus 對象
    import mitt from 'mitt';
    
    const $bus = mitt();
    
    export default $bus;
    ```
    
- **實際使用範例**
    
    假設我們要在 child2 組件中傳遞資料給 child1
    
    ```tsx
    // 父組件
    <template>
        <div class="box">
            <h1>mitt</h1>
            <p>全局事件總線 Eventbus $bus</p>
            <hr />
            <div class='container'>
                <Child1></Child1>
                <Child2></Child2>
            </div>
        </div>
    </template>
    
    <script setup lang="ts">
    import Child1 from "./child1.vue"
    import Child2 from "./child2.vue"
    
    </script>
    
    <style scoped>
    .box{
        width: 100vw;
        height: 600px;
        background: skyblue;
    }
    .container{
        display: flex;
    }
    </style>
    ```
    
    child1 組件
    
    ```tsx
    <template>
        <div class="child1">
            <h1>child1</h1>
        </div>
    </template>
    
    <script setup lang="ts">
    import $bus from '../../bus'
    import {onMounted} from 'vue'
    console.log('$bus', $bus)
    // mitt使用上先等組件掛載完畢後，將其綁定指定事件，方便後來接收組件傳遞的數據
    onMounted(()=>{
    		// on 為接收
        // 第一個參數是指定事件名稱
        // 第二個參數則為事件的回調
        $bus.on('car', (car)=>{
            console.log('car', car)
        })
    })
    </script>
    
    <style scoped>
    .child1{
        width: 400px;
        height: 400px;
        background: yellowgreen;
    }
    
    </style>
    ```
    
    child2 組件
    
    ```tsx
    <template>
        <div class="child2">
            <h1>child2</h1>
            <el-button type="primary" @click="handler">點擊後我給兄弟送禮品</el-button>
        </div>
    </template>
    
    <script setup lang="ts">
    import $bus from "../../bus"
    const handler = () => {
        $bus.emit('car', {
            car: '法拉利'
        })
    }
    
    </script>
    
    <style scoped>
    .child2{
        width: 400px;
        height: 400px;
        background: hotpink;
    }
    </style>
    ```
    

## 九、使用 vite 建立專案與各項配置

### 建立專案

- 使用 node 16 以上
- vite 建立新專案
    
    ```tsx
    yarn create vite
    ```
    
- 在 package.json 中
    
    ```tsx
    {
    ...
    "scripts": {
    		"dev": "vite --open" // 加上 --open字樣，會在專案啟動時順便開啟瀏覽器
    	}
    ...
    }
    ```
    

### 配置 eslint

- 加上 eslint
    
    ```tsx
    yarn add eslint -D
    ```
    
- 生成配置文件 eslint.cjs
    
    ```tsx
    npx eslint --init
    ```
    
    - 這會啟動 eslint 配置，包含設置 eslint 使用的目的選擇、確認目前要使用的程式語言，以及建議安裝的對應套件 ex: eslint-plugin-vue, typescript-eslint…etc.
    - eslint.cjs 內部配置的介紹
        
        ```tsx
        module.exports = {
            "env": { // eslint 工作的環境
                "browser": true, // 瀏覽器
                "es2021": true // eslint 的 es 版本語法
            },
            "extends": [ // 規則的延伸
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended", // 檢查 ts 的語法
                "plugin:vue/vue3-essential" // 檢查 vue3 的語法
            ],
            "overrides": [ // 要為特定類型的文件指定處理器
                {
                    "env": {
                        "node": true
                    },
                    "files": [
                        ".eslintrc.{js,cjs}"
                    ],
                    "parserOptions": {
                        "sourceType": "script"
                    }
                }
            ],
            "parserOptions": {
                "ecmaVersion": "latest", // ts 解析器 es 版本配置
                "parser": "@typescript-eslint/parser", // 指定解析器
                "sourceType": "module" // 有兩種 script 與 module，也就是會校驗 ESCMAScript 中的語法
            },
            "plugins": [ // 插件
                "@typescript-eslint",
                "vue"
            ],
        		// eslint 規則配置
            "rules": {
            }
        }
        ```
        
        註: parser 解析器有三種選項
        
        - Esprima 默認解析器
        - Babel-Eslint babel 解析器
        - @typescript-eslint/parser ts 解析器

- 安裝常用的 vue3 環境代碼插件
    
    ```powershell
    #讓所有與 prettier 規則存在衝突的 Eslint rule 失效，並使用 prettier 進行代碼檢查
    "eslint-config-prettier": "^8.6.0",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-node": "^11.1.0",
    #運行更漂亮的 Eslint，使 prettier 的規則優先級更高，Eslint 優先序較低
    "eslint-plugin-prettier": "^4.2.1",
    #vue.js 的 Eslint 插件 ( 查找 vue 語法錯誤，發現錯誤指令)
    "eslint-plugin-vue": "^9.9.0",
    #該解析器允許使用 Eslint  校驗所有 babel code
    "@babel/eslint-parser": "^7.19.1",
    ```
    
- 安裝指令
    
    ```powershell
    yarn add -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
    ```
    
- **修改 eslintrc.cjs 配置文件**
    
    ```jsx
    module.exports = {
        "env": {
            "browser": true,
            "es2021": true,
    				"node": true,
    				"jest": true,
        },
    		/* 继承已有的规则 */
        "extends": [
            "eslint:recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:vue/vue3-essential",
    				"plugin:prettier/recommended",
        ],
        "overrides": [
            {
                "env": {
                    "node": true
                },
                "files": [
                    ".eslintrc.{js,cjs}"
                ],
                "parserOptions": {
                    "sourceType": "script"
                }
            }
        ],
    		/* 指定如何解析语法 */
    		"parser": 'vue-eslint-parser',
    		/** 优先级低于 parse 的语法解析配置 */
        "parserOptions": {
            "ecmaVersion": "latest",
            "parser": "@typescript-eslint/parser",
            "sourceType": "module",
    				"jsxPragma": 'React',
    				"ecmaFeatures": {
    					"jsx": true,
    			},
        },
        "plugins": [
            "@typescript-eslint",
            "vue"
        ],
    		/*
       * "off" 或 0    ==>  关闭规则
       * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
       * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
       */
        "rules": {
    			// eslint（https://eslint.bootcss.com/docs/rules/）
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unexpected-multiline': 'error', // 禁止空余的多行
        'no-useless-escape': 'off', // 禁止不必要的转义字符
    
        // typeScript (https://typescript-eslint.io/rules)
        '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/semi': 'off',
    
        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
        },
    }
    ```
    
- 生成 **.eslintignore** 文件
    
    ```
    dist
    node_modules
    ```
    
- 運行腳本
    
    在 **package.json** 中新增兩個 script 指令
    
    ```
    "scripts": {
    	...
    	"lint": "eslint src", // 會自動跑過 src 資料夾並報出當中的 eslint 錯誤
    	"fix": "eslint src --fix" // 會直接幫忙修正 eslint 有問題的部分
    	...
    }
    ```
    

### 配置 Prettier

eslint 主要針對的是 javascript，他是一檢測工具，包含了 js 語法以及少部分的格式問題，在 eslint 看來，語法對了就能保證代碼正常運行，格式問題反而是其次

prettier 則較屬於格式化工具，主要的功能是統一格式碼書寫格式，其外 prettier 也支持包含 js 在內等多種語言

總結來說，eslint 與 prettier 一個管 js 程式碼的質量，另一個則是保證美觀

- **安裝依賴**
    
    ```
    yarn add -D eslint-plugin-prettier prettier eslint-config-prettier
    ```
    
- .**prettierrc.json** 規則的添加
    
    ```json
    {
    	"singleQuote": true, // 字串必是單引號
      "semi": false, // 分號需要與否
      "bracketSpacing": true,
      "htmlWhitespaceSensitivity": "ignore",
      "endOfLine": "auto",
      "trailingComma": "all",
      "tabWidth": 2 // 縮排的空格數
    }
    ```
    
- 新增 **.prettierignore** 忽略文件
    
    ```json
    /dist/*
    /html/*
    .local
    /node_modules/**
    **/*.svg
    **/*.sh
    /public/*
    ```
    

### 配置 stylelint

stylelint 為 css 的 lint 工具，可以格式化 css 代碼，檢查 css 錯誤或不合理的寫法，並指定 css 的書寫順序

```powershell
yarn add sass sass-loader stylelint postcss postcss-scss postcss-html postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

- .**stylelintrc.cjs 配置文件**

官網: [https://stylelint.io/](https://stylelint.io/)

```jsx
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

- 設置 **.stylelintignore**
    
    ```jsx
    /node_modules/*
    /dist/*
    /html/*
    /public/*
    ```
    
- 運行腳本
    
    在 **package.json** 中新增兩個 script 指令
    
    ```jsx
    "scripts": {
    	...
    		"format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
        "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
        "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
    	...
    }
    ```
    

### 配置 husky

husky 的功能是避免有人將沒有被格式化的程式碼推到 repo，利用這工具就能強制讓開發人員遵循代碼規範來提交代碼

要做到這件事，就要利用 husky 在代碼提交前觸發 git hook ( git 在客戶端的鉤子 )，然後執行 yarn run format 來自動格式化我們的代碼

安裝 ( **注意: 要先推上 git，husky 才有 git hook 可以抓，才會安裝成功** )

```jsx
yarn add -D husky
```

執行

```jsx
npx husky-init
```

執行後會在根目錄下生成一個 .husky 目錄，而這目錄下面會有一個 pre-commit 文件，而這文件的命令會在每次我們 commit 時就會執行

在 .husky/pre-commit 文件中添加如下命令:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

#在 commit 前格式化代碼
yarn run format
```

### 配置 commitlint

在希望團隊內部的成員統一 每次 commit 的格式 (及其需涵蓋的資訊)，此時就可以使用 commitlint 來實現

- 安裝

```bash
yarn add @commitlint/config-conventional @commitlint/cli -D
```

- 添加配置文件，新建 **commitlint.config.cjs**，然後在此檔案中添加以下配置

```jsx
module.exports = {
  extends: ['@commitlint/config-conventional'],
  //   校驗規則
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'pref',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
    'type-case': [0],
    'type-empty': [0],
    'scope-empty': [0],
    'scope-case': [0],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'always', 72],
  },
}
```

- 在 package.json 配置對應的 script 指令

```jsx
{
...
"scripts": {
	...
	"commitlint": "commitlint --config commitlint.config.cjs -e -V",
	...
	}
...
}
```

- 配置結束，當我們填寫 commit 時，前面就必帶下面主題 ( subject )

```
'feat', // 新特性, 新功能
'fix', //修改 bug
'docs', // 文檔修改
'style', // 這裡指的是代碼格式修改，不是 css 修改
'refactor', // 代碼重購
'pref', // 優化相關，比如提升性能、體驗
'test', // 測試用案例
'chore', // 其他修改，比如改變構建流程、或者增加依賴、工具等
'revert', // 回到上一個版本
'build', // 編譯相關的修改，例如版本發布、對項目構建或依賴的改動
```

- 配置 husky

```
npx husky add .husky/commit-msg
```

- 在新生成的 commit-msg 文件中添加以下指令

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

yarn commitlint
```

### 強制將 node  套件管理工具統一

因為團隊套件管理工具若不相同，其下載的依賴也可能會有不同，而最後產生出 bug 因此建議團隊要統一對應的包管理工具，這邊以 pnpm 作為範例

在專案跟目錄下建立 scripts/preinstall.js 文件，添加以下內容

```jsx
// !/pnpm/ 代表若包管理工具不是 pnpm 
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1) // 則直接結束，無法執行
}
```

配置命令，在 package.json 中加入

```jsx
{
...
"scripts": {
		...
		"preinstall": "node ./scripts/preinstall.js",
		...
	}
...
}
```

若這樣設定，當使用者下載並進行安裝時，若使用非 pnpm 的套件管理工具則都會出錯

### 安裝 element-plus 組件

官網: [https://element-plus.org/zh-CN/guide/quickstart.html#用法](https://element-plus.org/zh-CN/guide/quickstart.html#%E7%94%A8%E6%B3%95)

- 安裝
    
    ```jsx
    yarn add element-plus
    ```
    
- 在 main.js 做掛載
    
    ```jsx
    // main.ts
    import { createApp } from 'vue'
    import ElementPlus from 'element-plus' // 引入 element 插件
    import 'element-plus/dist/index.css' // 引入對應樣式
    import App from './App.vue'
    
    const app = createApp(App) // 獲取實例對象
    // 安裝 element-plus 插件
    app.use(ElementPlus)
    app.mount('#app') // 掛載
    ```
    
- 安裝 element-plus 對應的 icon 插件
    
    ```jsx
    yarn add @element-plus/icons-vue
    ```
    
- i18n 配置 ( [官網](https://element-plus.org/zh-CN/guide/i18n.html) )
    
    ```jsx
    import { createApp } from 'vue'
    import './style.css'
    import ElementPlus from 'element-plus' // 引入 element 插件
    import 'element-plus/dist/index.css' // 引入對應樣式
    // i18n 配置，但由於這段沒有 ts declare 的 型別，所以會有紅字
    // 而此時若運行 run build 也會因為期沒有對應的 ts declaration 而會打包失敗
    // 最簡便的解法是 使用 @ts-ignore 來忽略此項目沒有 type 的類型檢測，使用方式如下
    //@ts-ignore
    import zhTw from 'element-plus/dist/locale/zh-tw.mjs' 
    import App from './App.vue'
    
    const app = createApp(App)
    app.use(ElementPlus, {
     locale: zhTw, // 加入這段
    })
    app.mount('#app')
    ```
    
    註: 在 node_modules/element-plus/dist/locale 資料夾中，有各種語言 mjs 檔，若需要時也可一同引入
    

### src 路徑別名設置

如若沒有設置的現在，每每要寫 src 路徑時，都要使用 “../../” 等絕對路徑做設置，其實很麻煩，所以這邊的作法是將路徑設別名 ( alias ) 以避免後續的麻煩

```jsx
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // 引入 path ( node 提供的模塊，可以獲取到某個文件夾具體的路徑 ( 絕對路徑 或 相對路徑) )

export default defineConfig({
  plugins: [vue()],
	resolve: { alias: { '@': path.resolve('./src') } }, // 相對路徑別名配置，使用 @ 代替 src
})
```

typescript 編譯配置

```jsx
//tsconfig.json
{
  "compilerOptions": {
		...
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": {
      //路径映射，相对于baseUrl
      "@/*": ["src/*"]
    },
		...
	},
	...
}
```

註: 若這些都設定完後，在路徑的位置上還是有紅線，有可能是因為有安裝 Vetur 這插件，而這插件並不太支援 vue3 語法，所以將此插件卸載重啟即可 ( vue3 較推薦安裝的是 volar )

### 環境變量的設置

一般常見的環境有三種

- 開發環境: 開發使用環境，每位開發人員在各自的分支上進行開發最後合併
- 測試環境: 測試者使用的環境，一般來說是由測試組織部屬，通常此環境是用來代碼測試
- 生產環境: 正式對外環境，一般會關掉錯誤報告，打開錯誤日誌 ( 正是提供給客戶使用的環境 )

```
.env.developement
.env.production
.env.test
```

以下是 .env 中可放的變量範例

```
#在 vite 中，變量必須以 VITE_ 為前綴命名外部才能夠讀取
NODE_ENV = 'development'
VITE_APP_TITLE = '後臺營運平台'
VITE_APP_BASE_API = '/dev-api'
```

```
# production
NODE_ENV = 'production'
VITE_APP_TITLE = '後臺營運平台'
VITE_APP_BASE_API = '/prod-api'
```

```
# test
NODE_ENV = 'test'
VITE_APP_TITLE = '後臺營運平台'
VITE_APP_BASE_API = '/test-api'
```

- 在 package.json 去配置對應的運行命令

```json
{
	"scripts": {
		...
		"dev": "vite --open",
		"build:test": "vue-tsc && vite build --mode test", // 記得加 :test
    "build:pro": "vue-tsc && vite build --mode production", // 記得加 :pro
		...
	}
}
```

- 在文件的其他地方調用 env 內的變量，可以透過 **`import.meta.env`** 獲取

### SVG 圖標配置

**免費 SVG 資源網站 1**: [https://www.iconfont.cn/?spm=a313x.search_index.i3.d4d0a486a.4d513a81BewhXD](https://www.iconfont.cn/?spm=a313x.search_index.i3.d4d0a486a.4d513a81BewhXD) ( 需要綁手機號 )

**免費 SVG 資源網站 2**:[https://www.svgrepo.com/](https://www.svgrepo.com/)

使用 SVG 矢量圖，可以減上頁面上加載圖片資源的需求，進而提升頁面的效能

相較於圖片資源，SVG 的容量也相對的小了很多

```powershell
yarn add vite-plugin-svg-icons -D
```

- 在 vite.config.ts 中配置套件

```tsx
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
plugins: [
    vue(),
    createSvgIconsPlugin({
      // specify the icon folder to be cached svg 放置位置
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: { alias: { '@': path.resolve('./src') } },
})
```

- 在 main.ts 這入口文件去導入

```tsx
// svg插件需要配置代码
import 'virtual:svg-icons-register'
```

- 此時，只要確保我們的 svg 放置的位置在 src/assets/icons，我們就可以使用語法 **`#icon-圖標名稱`** 直接使用 svg 檔案

```tsx
<template>
  <div>
    <!-- svg: 是 svg 圖片的外層容器節點，內不需要搭配 use 標籤結合使用 -->
    <svg style="width:30px; height:30px">
      <!-- xlink:href 指定執行哪一個圖標其值務必以 使用 -->
      <!-- 在 use 中設置 fill 可以改變圖標的顏色 -->
      <!-- 要 fill 改顏色有用記得將 svg 中的 path 不能有 fill 屬性，這邊才改的動 -->
      <use xlink:href="#icon-phone" fill="red"></use>
    </svg>
  </div>
</template>
```

- 但每次要使用都要另外撰寫 svg 與 use tag 因此建議包成一個可複用的組件，這邊建立一個 名為 SvgIcon 的 vue 組件 components/SvgIcon/index.vue

```tsx
<script setup lang="ts">
// 接收父組件傳遞過來的參數
defineProps({
  // xlink:href 屬性值的前綴
  prefix: {
    type: String,
    default: '#icon-',
  },
  // 提供使用圖標名
  name: String,
  color: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <div>
    <!-- svg: 是 svg 圖片的外層容器節點，內不需要搭配 use 標籤結合使用 -->
    <svg :style="{ width, height }">
      <!-- xlink:href 指定執行哪一個圖標其值務必以 #icon-圖標名稱使用 -->
      <!-- 在 use 中設置 fill 可以改變圖標的顏色 -->
      <!-- 要 fill 改顏色有用記得將 svg 中的 path 不能有 fill 屬性，這邊才改的動 -->
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<style scoped></style>
```

- 若要使用時，先引入再傳入想設定的參數
- 此時若不想要每次要使用時都要另外引入，就可以將其作為全域組件在入口 main.ts 處掛載

```tsx
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus' 
import 'element-plus/dist/index.css' 
//@ts-ignore
import zhTw from 'element-plus/dist/locale/zh-tw.mjs' 
import App from '@/App.vue'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhTw,
})
// 一般 組件全局掛載的方式
app.component('SvgIcon', SvgIcon)
app.mount('#app')
```

如此在使用時就不用特別引入，但延伸了另一個問題，但問題是一次要掛載很多全域組件時這樣書寫太沒有效率

因此這邊有另一個掛載方式: 將所有全域組件包裝成一個插件，在入口 main.js 使用 app.use 安裝註冊，詳細寫法如下

- 在 **components** 資料夾中建立 **index.ts**
    
    ```tsx
    // 註冊成全域組件的方式
    import SvgIcon from './SvgIcon/index.vue'
    import Pagination from './Pagination/index.vue'
    
    // 整成一個對象
    const allGlobalComponent = { SvgIcon, Pagination }
    
    //  對外曝露插件對象
    export default {
      // 必須要叫 install
      // 其參數有 app 這參數，其內含 component 這方法，可以直接用此方法註冊
      install(app) {
        // install 內部的函式會在入口 main.ts 中掛載 (app.use) 時執行
        console.log(app, 123)
        // 逐個註冊項目
        Object.keys(allGlobalComponent).forEach((key) => {
          console.log(key)
          app.component(key, allGlobalComponent[key])
        })
      },
    }
    ```
    
- 在專案入口 **main.ts** 註冊使用
    
    ```tsx
    //  main.ts
    // 引入自定義插件對象: 註冊整個項目的全局組件
    import globalComponent from '@/components'
    // 安裝自訂義插件
    app.use(globalComponent)
    ```
    

### 集成 sass

目前此項目由於前面在配置 stylelint 時，就已經安裝過 sass 的套件 sass, sass-loader

- 在使用時記得加上 `lang = 'scss'`

```html
<style scoped lang="scss"></style>
```

- **設置全局樣式文件**
    
    在 src/styles 目錄下創建一個 index.scss 文件，當然項目中也要記得清除原默認的樣式設定，因此在 index.scss 引入 reset.scss
    
    - 在 main.js 入口文件中引入全局樣式
        
        ```jsx
        import '@/styles/index.scss'
        ```
        
- **清除默認樣式** **reset.scss**
    - 建立 styles/reset.scss 檔案
    - 在 npm 官網中，以關鍵字 reset.scss 尋找對應套件 ( **[連結](https://www.npmjs.com/package/reset.scss?activeTab=code)** ) 後，在 code 中找到以下 scss 配置程式碼，貼到我們在 styles 內創建對應的 reset.scss 檔中
        - **reset.scss**
            
            ```scss
            /**
             * ENGINE
             * v0.2 | 20150615
             * License: none (public domain)
             */
            
            *,
            *:after,
            *:before {
                box-sizing: border-box;
            
                outline: none;
            }
            
            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td,
            article,
            aside,
            canvas,
            details,
            embed,
            figure,
            figcaption,
            footer,
            header,
            hgroup,
            menu,
            nav,
            output,
            ruby,
            section,
            summary,
            time,
            mark,
            audio,
            video {
                font: inherit;
                font-size: 100%;
            
                margin: 0;
                padding: 0;
            
                vertical-align: baseline;
            
                border: 0;
            }
            
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            menu,
            nav,
            section {
                display: block;
            }
            
            body {
                line-height: 1;
            }
            
            ol,
            ul {
                list-style: none;
            }
            
            blockquote,
            q {
                quotes: none;
                &:before,
                &:after {
                    content: '';
                    content: none;
                }
            }
            
            sub,
            sup {
                font-size: 75%;
                line-height: 0;
            
                position: relative;
            
                vertical-align: baseline;
            }
            sup {
                top: -.5em;
            }
            sub {
                bottom: -.25em;
            }
            
            table {
                border-spacing: 0;
                border-collapse: collapse;
            }
            
            input,
            textarea,
            button {
                font-family: inhert;
                font-size: inherit;
            
                color: inherit;
            }
            
            select {
                text-indent: .01px;
                text-overflow: '';
            
                border: 0;
                border-radius: 0;
            
                -webkit-appearance: none;
                   -moz-appearance: none;
            }
            select::-ms-expand {
                display: none;
            }
            
            code,
            pre {
                font-family: monospace, monospace;
                font-size: 1em;
            }
            ```
            
    - 在 index.scss 中引入
        
        ```scss
        @import './reset.scss'
        ```
        
- **設置全域變數** **variable.scss**
    - 配置到上述階段，若想要使用全局變量 $，就算你有在 index.scss 中設定對應 **$變數**，你會發現在各元件實際撰寫 scss 時吃不到該全局變量的樣式 ( 會跳錯 )
    - 先建立 styles/**variable.scss**
    - **vite.config.ts** 做以下設置
        
        ```tsx
        import { defineConfig } from 'vite'
        import vue from '@vitejs/plugin-vue'
        import path from 'path'
        // https://vitejs.dev/config/
        export default defineConfig({
          plugins: [
            vue(),
            createSvgIconsPlugin({
              // specify the icon folder to be cached
              iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
              // specify symbolId format
              symbolId: 'icon-[dir]-[name]',
            }),
          ],
          resolve: { alias: { '@': path.resolve('./src') } },
        	// 新增以下 scss 全局變量的配置
        	css: {
              preprocessorOptions: {
                scss: {
                  javascriptEnabled: true,
                  additionalData: '@import "./src/styles/variable.scss";',
                },
              },
            },
        })
        ```
        
    

### mock 數據

在開發後台時在還沒有 api 提供數據時，難免需要些假數據來輔助前端開發

- **vite-plugin-mock 套件 npm 連結**: [https://www.npmjs.com/package/vite-plugin-mock](https://www.npmjs.com/package/vite-plugin-mock)
- **vite-plugin-mock 套件官網**:  **[vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)**

```bash
yarn add -D vite-plugin-mock@2.9.6 mockjs
```

**註: 若直接下  vite-plugin-mock 不指定版本的話，會因為不相容而報錯誤，使用 2.9.6 版本目前使用上沒有問題**

- 在 vite.config.ts 配置文件中，使用以下設置用以啟動插件

```tsx
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
		viteMockServe({
        localEnabled: command === 'serve',
      }),
  ],
})
```

- 在專案跟目錄上創建 mock 資料夾，用來作為 mock 數據對應的來源
- 在 mock 文件夾中建立一份 user.ts 文件
    - **user.ts**
        
        ```tsx
        // mock/user.ts
        // 用戶訊息數據
        // createUserList: 此函式執行回返回一個數組，數組內部包含兩個用戶信息
        function createUserList() {
          return [
            {
              userId: 1,
              avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
              username: 'admin',
              password: '123456',
              desc: '平台管理員',
              roles: ['平台管理員'],
              buttons: ['cuser.detail'],
              routes: ['home'],
              token: 'Admin Token',
            },
            {
              userId: 2,
              avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
              username: 'system',
              password: '123456',
              desc: '系统管理員',
              roles: ['系统管理員'],
              buttons: ['cuser.detail', 'cuser.user'],
              routes: ['home'],
              token: 'System Token',
            },
          ]
        }
        
        // 對外暴露一個數組，數組內部包含兩個 api 接口
        // 登入假的 api 接口
        // 獲取用戶信息的假的 api 接口
        export default [
          // 用户登入 api
          {
            url: '/api/user/login', 
            method: 'post', 
            response: ({ body }) => {
        			// 獲取 request body 帶過來的用戶名與密碼
              const { username, password } = body
              // 判斷是否有此用戶
              const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
              )
              //没有該用户返回失敗信息
              if (!checkUser) {
                return { code: 201, data: { message: '帳號或密碼不正确' } }
              }
              //如果有返回成功信息
              const { token } = checkUser
              return { code: 200, data: { token } }
            },
          },
          // 獲取用戶信息 api
          {
            url: '/api/user/info',
            method: 'get',
            response: (request) => {
        			// 獲取 request header 中所攜帶的 token
              const token = request.headers.token
              //查看用户信息是否包含有此 token 的用户
              const checkUser = createUserList().find((item) => item.token === token)
              //没有的話返回失敗的信息
              if (!checkUser) {
                return { code: 201, data: { message: '獲取用户信息失敗' } }
              }
              //如果有返回成功信息
              return { code: 200, data: { checkUser } }
            },
          },
        ]
        ```
        
- 測試目前 mock 設置的邏輯是否可以正常使用，先安裝 axios
    
    ```tsx
    yarn add axios
    ```
    
- 我們隨意在 main.js 中加入以下代碼來測試假 api 接口看是否可用
    
    ```tsx
    // 測試代碼，用來測試我們的假 api 接口能否使用
    import axios from 'axios'
    axios({
      url: '/api/user/login',
      method: 'post',
      data: {
        username: 'admin',
        password: '123456',
      },
    })
    ```
    
    若我們從 瀏覽器的開發者工具 ( F12 ) 中的 Network 分頁中，有看到對應的 login 請求發出且有正常被假 api 接口回應，就代表假 api 可以正常運作
    

### axios 的二次封裝

axios 可以簡化網路請求的寫法，而考量到其實用以及複用性，我們常將 axios 做二次封裝，好方便重複使用

封裝的好處，方便利用以下兩個功能

1. **請求攔截器:** 可以在請求發出前放些處理邏輯 ( ex: 開始進度條、request headers 中塞對應的公共參數如 token )
2. **響應攔截器:** 可以在 api 回應時可以事先做些處理 ( ex: 進度條結束、簡化 & 處理伺服器返回的數據、處理 http 網路錯誤 )
- **安裝 axios**
    
    ```tsx
    yarn add axios
    ```
    
- 在 **src** 目錄下創建 **utils/request.ts**
    - **request.ts**
        
        ```tsx
        // 二次封装 axios: 使用請求與響應式攔截器
        import axios from 'axios'
        import { ElMessage } from 'element-plus' // element 中用來呈現 api 訊息的組件
        // import useUserStore from '@/store/modules/user'
        // 第一步: 利用 axios 對象的 create 方法，去創建 axios 實例對象
        // 如此可方便些功能配置 ex: 基礎路徑、是否有超時
        const request = axios.create({
          // 配置基礎路徑
          baseURL: import.meta.env.VITE_APP_BASE_API, // 基礎路徑會協帶我們在 mock 創的 '/api'
          timeout: 5000, // 超時的時間設置 ( 限制在5秒內需處理完成 )
        })
        
        // 第二步: request 實例中添加請求攔截器
        // request.interceptors.request.use((config)=>{return config})
        request.interceptors.request.use(
          (config) => {
            // 使用配置對象 config
            // let userStore = useUserStore()
        
            //if (userStore.token) {
            // config 的 headers 屬性，通常給伺服器的公共參數可在這設置
            //config.headers.token = userStore.token
            //}
        
            return config // 必須記得要 return config 回來，否則可能請求連發都發不出去
          },
          (error) => {
            return Promise.reject(error)
          },
        )
        
        // 第三步: request 實例中添加響應攔截器
        // response 中要放兩個 callback 參數 第一個是成功的，第二個是失敗的
        // request.interceptors.response.use((repsone)=>{}, (error)=>{})
        request.interceptors.response.use(
          (response) => {
            // 解析 & 簡化數據
            if (response.status === 200) {
              return Promise.resolve(response.data)
            } else {
              return Promise.reject(response.data)
            }
          },
          (error) => {
            // 失敗的 callback 通常處理 http 網路錯誤
            // 定一個變量用來存儲網路錯誤的信息
            let message = ''
            // http 狀態碼
            const status = error.response.status
            switch (status) {
              // 401 token 過期
              case 401:
                message = 'token 過期'
                break
              case 403:
                message = '無權訪問'
                break
              case 404:
                message = '請求地址錯誤'
                break
              case 500:
                message = '伺服器出現問題'
                break
              default:
                message = '網路出現問題'
                // message = error.response.data.message
                break
            }
            // 提示的錯誤信息 ( 這邊使用 element plus 的套件 )
            ElMessage({
              type: 'error',
              message,
            })
            // 需 return 失敗的 Promise 來終結此 promise
            return Promise.reject(error)
          },
        )
        // 對外暴露
        export default request
        ```
        
        **註: 我們封裝的 axios 實例 request 實際上其與 axios 是相同的功能也相同，差別在於 request 中有我們預先設定的攔截器，方便我們針對 request 與 response 預先做處理**
        
- 實際使用 & 驗證是否可用的範例程式碼
    - **xxx.vue**
        
        ```tsx
        <script setup lang="ts">
        import request from '@/utils/request'
        import { onMounted } from 'vue'
        
        onMounted(() => {
          request({
            url: '/user/login',
            method: 'post',
            data: {
              username: 'admin',
              password: '123456',
            },
          }).then((res) => {
            console.log(res)
          })
        })
        </script>
        
        <template>
          <div>
            <h2>測試axios二次封裝</h2>
          </div>
        </template>
        ```
        

### API 接口邏輯統一管理

將各種 api 連接邏輯統一管理

創建 src/api 資料夾作為統一管理的所在

```
#教學中使用的分類邏輯
user #放置與用戶相關的 api 邏輯
product # 放置與產品相關的 api 邏輯
acl # 放置權限管理 api 邏輯
```

- 創建 src/api/user/index.ts 以及 src/api/user/type.ts 此兩者文件，index.ts 用來定義 api 邏輯，而 type.ts 則是定義 index.ts 中有用到的型別類型
- **src/api/user/index.ts**
    
    ```tsx
    // 統一管理用戶相關的 api 邏輯
    import request from '@/utils/request'
    import type { loginForm, loginResponseData, userResponseData } from './type'
    // import type 相較於 import 只會帶入類型信息，相較於使用 import, import type 可以帶來更好的性能與維護性
    // 統一管理接口
    enum API {
      LOGIN_URL = '/user/login',
      USERINFO_URL = '/user/info',
    }
    // 暴露請求函式
    // 登入 API 方法
    export const reqLogin = (data: loginForm) =>
      request.post<any, loginResponseData>(API.LOGIN_URL, data)
    // 獲取用戶信息 api 方法
    export const reqUserInfo = () =>
      request.get<any, userResponseData>(API.USERINFO_URL)
    ```
    
- **src/api/user/type.ts**
    
    ```tsx
    // 用戶相關的 api 邏輯型別聲明
    // 登入 API 邏輯型別
    export interface loginForm {
      username: string
      password: string
    }
    interface dataType {
      token: string
    }
    
    // 登入 api response 的數據型別
    export interface loginResponseData {
      code: number
      data: dataType
    }
    
    // 定義伺服器回傳與用戶相關的數據類型
    interface userInfo {
      userId: number
      avatar: string
      username: string
      password: string
      desc: string
      roles: string[]
      buttons: string[]
      routes: string[]
      token: string
    }
    
    interface user {
      checkUser: userInfo
    }
    
    export interface userResponseData {
      code: number
      data: user
    }
    ```
    
- 實際使用 & 驗證是否可用的範例程式碼
    - **xxx.vue**
        
        ```tsx
        <script setup lang="ts">
        import { onMounted } from 'vue'
        import { reqLogin } from './api/user'
        
        onMounted(() => {
          reqLogin({ username: 'admin', password: '123456' })
        })
        </script>
        
        <template>
          <div>
            <h2>測試axios二次封裝</h2>
          </div>
        </template>
        ```
        
        使用瀏覽器開發者工具觀察，就能驗證是否該 api 有正確打出
        
    

### 模板常見路由配置

以下是模板常見的路由配置

```tsx
# login 登入
# dashboard 展示
# 404 頁面
# 任意路由
```

- 安裝
    
    ```bash
    yarn add vue-router
    ```
    
- 在 src 目錄中新建 **views** 資料夾
- 建立路由預計會對應到到的 vue 頁面
    
    ```
    # login 登入 => src/views/login/index.vue
    # dashboard 展示 => src/views/home/index.vue
    # 404 頁面  => src/views/404/index.vue
    # 任意路由 => src/views/404/index.vue
    ```
    
- 在 src 目錄中新建 router 資料夾
    - 建立 **src/router/index.ts**
        
        ```tsx
        // 利用 vue-router 套件來實現模板路由配置
        // createWebHashHistory 對應 路由模式 hash
        // createWebHistory 對應 路由模式 history
        import { createRouter, createWebHashHistory } from 'vue-router'
        import { constantRoute } from './routes'
        // 創建路由器
        const router = createRouter({
          // 路由模式 hash 或是 history
          history: createWebHashHistory(),
          routes: constantRoute,
          // 滾動行為
          scrollBehavior() {
            return {
              left: 0,
              top: 0,
            }
          },
        })
        
        export default router
        ```
        
    - 建立 **src/router/routes.ts**
        
        ```tsx
        // 對外暴露的配置路由 ( 常量路由 )
        
        export const constantRoute = [
          {
            // 登入
            path: '/login',
            component: () => import('@/views/login/index.vue'),
            name: 'login', //命名路由
          },
          {
            // 登入成功後的 dashboard
            path: '/',
            component: () => import('@/views/home/index.vue'),
            name: 'home', //命名路由
          },
          {
            // 404
            path: '/404',
            component: () => import('@/views/404/index.vue'),
            name: '404', //命名路由
          },
          {
            // 任意路由
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: 'Any', //命名路由
          },
        ]
        ```
        
    - 在 App.vue 中放入 router-view 組件
        
        ```tsx
        <template>
          <div>
            <h1>我是 APP 根組件</h1>
            <router-view></router-view>
          </div>
        </template>
        ```
        