---
title: js 核心篇筆記
description: javascript 中較抽象的領域初探筆記
tags: ['Javascript']
date: 2022-08-20
type: doc
publish: true
---
# Class 筆記


- class
    - 代表我們想創建物的藍圖
    - ES6 之前的 function constructor 建構物件的方法
        
        ```jsx
        let Person = function (data) {
          this.name = data.name;
          this.age = data.age;
          let profile = `${this.name}(${this.age})`; // 無法在實例中使用
          this.greeting = function () {
            console.log(`你的名字是${this.name}`); // 這個也無法使用 Person.greeting 讀取，但可以在 instance 中被使用
          };
        };
        // console.log(Person({ name: "Aron", age: 28 }).greeting());
        
        // 搭配 prototype 可以直接在物件上進行設置，功能同 上方 greeting 可以被 instance 呼叫
        Person.prototype.greet = function () {
          console.log(`Hello ${this.name}, my age`);
        };
        
        let Aaron = new Person({name:'Aaron', age: 28})
        console.log(Aaron) // 
        console.log(Aaron.greeting()) // "你的名字是Aaron"
        console.log(Aaron.greet()) // "Hello Aaron, my age"
        ```
        
    - ES6 後才有 class 的規範，
        
        ```jsx
        class Student {
          constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
          }
          getName() {
            return `${this.firstName} ${this.lastName}`;
          }
          check() {
            console.log("測試是否可以直接呼叫");
          } 
        }
        
        // console.log(Student.check()); // 使用 class 也無法直接在 class 中呼叫函式，但是逤加上 static 則可以
        aaron = new Student('Aron', 'Chen')
        console.log(aaron.check())
        console.log(aaron.getName())
        ```
        
    - 取代 proptotype 語法使用的不便性，將所有藍圖設定部分統一做管理 & 設定
    - 與 java 與 c++ 等 class 概念雷同
    - 是 語法糖的一種，等層邏輯仍是 OOP 原型繼承，而 class 的底層仍是 物件
- 優點: 將所有的 action, methods, state 歸類放在同一個地方
- instance 就是 使用 class 這個藍圖建構的實體物件 ex: `const Sam = new Elf(’Sam’, ‘fire’)`
    - `instanceof` 就是判斷該物件是否出自該class
        
        ```jsx
        console.log(Sam instanceof Elf) // true
        ```
        
    - new 建構子也稱為 extentiation 也就是延伸 ( extentiate ) 這個 class
- 範例程式碼
    
    ```jsx
    class Elf {
      //   有 this.屬性 (state)部分放 constructor
      constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
      }
      attack() {
        return "attack with" + this.weapon;
      }
    }
    ```
    
    - 問題: 為何要將 attack 自 constructor 分開?
        
        說明: 因為 每個 class 創立的 instance 都有自己的名稱 ( 也就是每個instance都不同的部分
        
        - 所以不同的部分放在 constructor
        - 相同的部分比如 attack 拉出，就會是以繼承的方式而不佔該 instance 的內存
    

### Object.create() vs Class

- Object.create() 也可以做到原型繼承，因此與 class 是否可以互相取代與否則見仁見智

## extends

- extends 繼承原本 class 原型
- super 由於是繼承要新增自己的參數 type 所以才必須帶入 super 將 character 的屬性帶入

```jsx
class Character {
  //   有 this.屬性 (state)部分放 constructor
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with" + this.weapon;
  }
}

//  Elf 繼承自 character
// super 是指目前 extends的來源對象
class Elf extends Character {
  //   這裡的 constructor 只給這邊的 elf
  //   但由於要新增自己的參數 type 所以才必須帶入 super 將 character 的屬性帶入
  constructor(name, weapon, type) {
    super(name, weapon);
    this.type = type;
  }
}

const fiona = new Elf("Fiona", "ninja stars", "beauty");
console.log(fiona);
```

### 調用函式的方法 bind, Call, apply

- **bind: 可以將函式綁定物件，並將該函式的 this 指定到該物件上**
    
    ```jsx
    const obj = {
    		name: 'John'
    	}
    
    function sayName(){
    	console.log(this.name)
    }
    
    const sayNameFunction = sayName.bind(obj)
    sayNameFunction() // John
    ```
    

- call 與 apply 的差別是，call 是個別傳入參數，用`，`區隔，apply 則是直接用`陣列`傳入多個參數
- call / apply 與 bind 的差別是是否有傳入參數， bind 沒有傳入參數，而其餘兩者有
- **call: 第一個參數同 bind 為綁定的物件，第二個或第 n 個參數寫在後面**
    
    ```jsx
    const obj = {
    		name: 'John'
    	}
    function sayName(greeting){
    	console.log(greeting+' '+this.name)
    	}
    sayName.call(obj, 'hello') // hello John
    ```
    
- apply: **第一個參數同 bind 為綁定的物件，第二個或第 n 個參數以陣列寫在後面**
    
    ```jsx
    const numbers = [1,2,3]
    function sum(){
    	return this.reduce((acc, val)=> acc + val, 0)
    	}
    ```
    

**Public**, **Private**, **Static** 的差別：

- **Public variable**：**可以使用 instance 所存取和修改變數&方法** ( 不影響 class 中的設定 )，但其方法與變數**無法直接呼叫** `Class` 取用
    
    註: 在 js 中不標註 static 就是 public ，**不用特別標註 public，若加上了反而無法使用**
    
    - **範例**
        
        ```jsx
        class MyClass {
          publicProperty = 10;
          publicMethod() {
            return this.publicProperty;
          }
          public Property =15 // Uncaught SyntaxError: Unexpected identifier 'Property' 
        }
        
        const myObject = new MyClass();
        // public 只能在 instance 取用
        console.log(myObject.publicProperty); // 10
        console.log(myObject.publicMethod()); // 10
        // Class 取不到
        console.log(MyClass.publicProperty); // undefined
        console.log(MyClass.publicMethod()); // Uncaught TypeError: myObject.privateMethod is not a function
        ```
        
- **Private variable**：**不可以使用 instance 所存取和修改變數&方法**，且其方法與變數**無法直接呼叫** `Class` 取用，**只能在 class 內取用**
    
    註: 在 js/ts 中使用 # 代表 private 
    
    但可以使用 public 的 method 去取 private 的內容在 instance 中使用
    
    - **範例**
        
        ```jsx
        class MyClass {
          #privateProperty = 10;
        
          #privateMethod() {
            return this.#privateProperty;
          }
        
        // 但可以使用 public 的 method 去取 private 的內容在 instance 中使用
          getPrivateValue() {
            return this.#privateProperty;
          }
        // 使用 static 的 method 取不到
          static getPrivate() {
            return this.#privateProperty;
          }
        }
        
        const myObject = new MyClass();
        // 但可以使用 public 的 method 去取 private 的內容在 instance 中使用
        console.log(myObject.getPrivateValue()); // 10
        console.log(myObject.#privateProperty); // Uncaught SyntaxError: Private field '#privateProperty' must be declared in an enclosing class
        console.log(MyClass.#privateProperty);  // Uncaught SyntaxError: Private field '#privateProperty' must be declared in an enclosing class
        ```
        
- **Static variable / static method**：靜態表示該方法或變數，**需要透過呼叫** `Class` 才能取得或使用。
    - **範例**
        
        ```jsx
        class MyClass {
          static staticProperty = 10;
          static staticMethod() {
            return this.staticProperty;
          }
        }
        
        const myObject = new MyClass();
        // static 只能呼叫 class 取用
        console.log(MyClass.staticProperty); // 10
        console.log(MyClass.staticMethod()); // 10
        // instance 取不到
        console.log(myObject.staticProperty); // undefined
        console.log(myObject.staticMethod()); // Uncaught TypeError: myObject.privateMethod is not a function
        ```
        

### Static method ( 靜態方法 )

- static method 只存在 class 中，不能被 instance 所取用 ( 也就是只能在 class 中被取用，其製造的 instance 則不行 )
- class 中 的 static 的變數以及方法 可以被 class 取用，但無法被 instance 取用
- 呼叫靜態方法的方法
    - 若靜態方法中有 this 要用 call 去綁定
    - 若沒有 this 可用 參數代替要調整的對象

```jsx
class Bird {
	constructor({ color ='red' } ={}){
			this.color = color
		}
	// 使用 static 來建立 static method
	static changeColor(color){
	// this 原指 Bird 的這個 class
	// 但可以用 call 來改變 this 的指向
			this.color = color;
		}
	static noThisChangeColor(bird, color){
			bird.color = color
		}
	}
let redBird = new Bird()
// 若靜態方法中有 this 要用 call 去綁定
Bird.changeColor.call(redBird, 'blue')
// 若沒有 this 可用 參數代替要調整的對象
Bird.noThisChangeColor(redBird, 'blue')

```

### Setter 與 Getter

```jsx
class Person {
  constructor({ firstName, lastName, country = "Taiwan" }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.country = country;
  }
  // get method
  get name() {
    return this.firstName + " " + this.lastName;
  }
  // set method
  set name(string) {
    [this.firstName, this.lastName] = string.split(" ");
  }
}

const Bruno = new Person({ firstName: "Bruno", lastName: "Yu" });
console.log(Bruno.name); // Bruno Yu
Bruno.name = "Wilson Wu";
console.log(Bruno.name); //  Wilson Wu
```

### 子 class

- 繼承的關鍵字 `extends`
- 子class 的 method 是可以覆蓋掉原本繼承的 method
- super 就是呼叫 extend 來的父 class 並使用其 class 建構子或是方法

```jsx
class Person {
  constructor({ name, age }) {
    this.name = name;
    this.age = age;
  }
  core() {
    console.log("parent core" + `${this.name}`);
  }
}

class Student extends Person {
  constructor({ name, age, level }) {
    super({ name, age }); // super 等於呼叫 class person({name, age})，this.name, this.age 就會從 Person 繼承過來
    this.level = level;
  }
  getFullName() {
    return `${this.name} ${this.age}`;
  }
  // subclass 是可以覆蓋 父曾class 的 method
  core(judge) {
    if (judge) {
      super.core(); // super 等於呼叫 class person
    } else {
      return "children core" + `${this.level}`;
    }
  }
}

const Bruno = new Student({ name: "bruno", age: "32", level: 5 });
console.log(Bruno.getFullName()); // bruno 32
console.log(Bruno.core(true)); // "parent corebruno"
console.log(Bruno.core(false)); // "children core5"
```