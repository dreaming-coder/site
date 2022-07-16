# JavaScript - 面向对象

## 1. JavaScript 面向对象

### 1.1 类和对象

- 创建类

```javascript
class Name{
// class body
}
```

- 创建实例

```javascript
var xx = new Name();
```

:::warning

类必须使用 `new` 实例化对象。

:::

### 1.2 类的构造函数

`constructor()` 方法是类的构造函数(默认方法)，用于传递参数，返回实例对象，通过 `new` 命令生成对象实例时，自动调用该方法。

如果没有显示定义，类内部会自动给我们创建一个 `constructor()`

```javascript
class Person {
    constructor(name, age) {   // constructor 构造方法或者构造函数
        this.name = name;
        this.age = age;
    }
}       

var ldh = new Person('刘德华', 18); 
console.log(ldh.name); 
```

### 1.3 类的共有方法

```javascript
class Person {
    constructor(name, age) {   // constructor 构造方法或者构造函数
        this.name = name;
        this.age = age;
    }
    sing(){
        console.log('我唱歌');
    }
} 

var ldh = new Person('刘德华', 18); 
ldh.sing();
```

### 1.4 类的继承

#### 1.4.1 调用父类构造函数

```javascript
class Father{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    sum(){
        return this.x + this.y;
    }
}

class Son extends Father{
    constructor(x, y){
        super(x, y);
    }
}

var son = new Son(1, 2);
son.sum();  // 3
```

#### 1.4.2 调用父类普通函数

```javascript
class Father {
    say(){
        return 'I am Father';
    }
}

class Son extends Father{
    say(){
        console.log('I am Son');
        console.log(super.say());
    }
}

var son = new Son();
son.say();   // I am Son   I am Father
```

#### 1.4.3 super 和 this 的顺序

```javascript
class Father{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    sum(){
        return this.x + this.y;
    }
}

class Son extends Father{
    constructor(x, y){
        super(x, y);   // 必须在 this 前使用
        this.x = x;
        this.y = y;
    }
    subtract(){
        console.log(this.x - this.y);
    }
}

var son = new Son(5, 3);
son.subtract();  // 2
```

### 1.5 使用类的注意点

- 必须先定义类，再实例化，因为 ES 6 中的类没有变量提升
- 成员方法要使用类的属性必须用 `this.属性` 调用
- 成员方法调用成员方法，也必须用 `this.成员方法()` 调用

### 1.6 类里面 this 的指向

```javascript
class Star {
    constructor(uname, age) {
        this.uname = uname;
        this.age = age;
        this.btn = document.querySelector('button');
        this.btn.onclick = this.sing;
    }
    sing(){
        console.log(this);
    }
}

bar ldh = new Star('刘德华', 18);
ldh.sing();
```


首先会执行代码 `ldh.sing()` 输出的 `this` 是 `Star` 的实例，然后单击 `button `之后，控制台输出的 `this` 是 `button` 对象。

![](/imgs/web/javascript/js-oop-1.png)

:::warning

**`constructor` 里面的 `this` 指向实例对象，方法里面的 `this` 指向这个方法的调用者。**

:::

## 2. 构造函数和原型

### 2.1 构造函数

**构造函数**是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 `new` 一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。

在 `JavaScript` 中，使用构造函数时要注意以下两点：

- 构造函数用于创建某一类对象，其**首字母要大写**
- 构造函数要和 `new` 一起使用才有意义

**`new`** **在执行时会做四件事情**：

1. 在内存中创建一个新的空对象

2. 让 `this` 指向这个新的对象

3. 执行构造函数里面的代码，给这个新对象添加属性和方法

4. 返回这个新对象（所以构造函数里面不需要 `return` ）

JavaScript 的构造函数中可以添加一些成员，可以在构造函数本身上添加，也可以在构造函数内部的 `this` 上添加。通过这两种方式添加的成员，就分别称为静态成员和实例成员。

```javascript
function Star(uname, age) {
    // 实例成员
    this.uname = uname;
    this.age = age;
}
// 静态成员
Star.sec = '男';

var ldh = new Star('刘德华', 18);

console.log(ldh.uname); // 刘德华
console.log(ldh.sex);   // undefined
console.log(Star.sex);  // 男
```


:::warning

- **静态成员**：在构造函数本上添加的成员称为静态成员，**只能由构造函数本身来访问**
- **实例成员**：在构造函数内部创建的对象成员称为实例成员，**只能由实例化的对象来访问**

:::

### 2.2 构造函数的问题

```javascript
function Star(uname, age) {
    // 实例成员
    this.uname = uname;
    this.age = age;
    this.sing = function (){
        console.log('我会唱歌');
    }
}

var ldh = new Star('刘德华', 18);
vay zxy = new Star('张学友', 19);
```


![](/imgs/web/javascript/js-oop-2.webp)



:::warning

每个实例对象都会有类的成员函数的副本，造成内存浪费！

:::

### 2.3 构造函数原型 prototype

构造函数通过原型分配的函数是所有对象所**共享的**。

JavaScript 规定，每一个构造函数都有一个 `prototype` 属性，指向另一个对象。

> **这个 `prototype` 就是一个对象，这个对象的所有属性和方法，都会被构造函数所拥有**。


我们可以把那些不变的方法，直接定义在 `prototype` 对象上，这样所有对象的实例就可以共享这些方法。

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}
// 该函数被 Star 类的不同对象所拥有
Star.prototype.sing = function() {
    console.log('我会唱歌');
}
```

### 2.4 对象原型 _ _ proto _ _

对象都会有一个属性 `__proto__` 指向构造函数的 `prototype` 原型对象，之所以我们对象可以使用构造函数 `prototype` 原型对象的属性和方法，就是因为对象有 `__proto__` 属性的存在。

- `__proto__` 对象原型和原型对象 `prototype` 是等价的
- `__proto__` 对象原型的意义就在于为对象的查找机制提供一个方向，或者说一条路线，但是它是一个非标准属性，因此实际开发中，不可以使用这个属性，它只是内部指向原型对象 `prototype`

![](/imgs/web/javascript/js-oop-3.webp)


:::tip sing() 方法的查找规则：

- 首先看 `ldh` 对象上是否有 `sing()` 方法，如果有就执行这个对象上的 `sing()` 方法，如果没有，因为有 `__proto__` 的存在，就去构造函数原型对象 `prototype` 上查找这个方法。

:::

### 2.5 constructor 构造函数

对象原型（ `__proto__`）和构造函数原型对象（`prototype`）里面都有一个 `constructor` 属性 ，`constructor` 我们称为构造函数，因为它指回构造函数本身。`constructor` 主要用于记录该对象引用于哪个构造函数，它可以让原型对象重新指向原来的构造函数。

一般情况下，对象的方法都在构造函数的原型对象中设置。如果有多个对象的方法，我们可以给原型对象采取对象形式赋值，但是这样就会覆盖构造函数原型对象原来的内容，这样修改后的原型对象 `constructor`  就不再指向当前构造函数了。此时，我们可以在修改后的原型对象中，添加一个 `constructor` 指向原来的构造函数。

```javascript
function Star(uname, age) {
    this.uname = uname;
    this.age = age;
}

// 很多情况下，我们需要手动的利用constructor这个属性指回原来的构造函数
Star.prototype = {
    // 如果我们修改了原来的原型对象，给原型对象赋值的是一个对象的形式，
    // 则必须手动的利用constructor指回原来的构造函数，否则constructor将丢失
    constructor: Star,
    sing: function (){
          console.log('我会唱歌');
    },
    movie: function (){
        console.log('我会演电影');
    }
}
```


### 2.6 构造函数、实例、原型对象之间的关系

![](/imgs/web/javascript/js-oop-4.webp)

### 2.7 原型链

![](/imgs/web/javascript/js-oop-5.webp)

### 2.8 JavaScript 成员查找机制

1. 当访问一个对象的属性（包括方法）时，首先查找这个对象自身有没有该属性。

2. 如果没有就查找它的原型（也就是 `__proto__`指向的 `prototype` 原型对象）。 

3. 如果还没有就查找原型对象的原型（`Object` 的原型对象）。

4. 依此类推一直找到 `Object` 为止（`null`）。

5. `__proto__`对象原型的意义就在于为对象成员查找机制提供一个方向，或者说一条路线。

### 2.9 原型对象 this 指向

- 构造函数中，里面的 `this` 指向的是对象实例
- 原型对象函数里面的 `this` 指向的也是对象实例

> **一句话，谁调用，`this` 指向谁。**


## 3. 继承

ES 6 之前并没有给我们提供 `extends` 继承。我们可以通过**构造函数+原型对象**模拟实现继承，被称为组合继承。

### 3.1 call()

调用这个函数, 并且修改函数运行时的 this 指向  

```javascript
fun.call(thisArg, arg1, arg2, ...) 
```

- thisArg ：当前调用函数 `this` 的指向对象

- arg1，arg2：传递的其他参数

例如：

```javascript
function f(){
    console.log(this);
}
f.call();              // window 对象
var obj = {
    unamne: "压缩",
    age: 18
}
f.call(obj);           // obj 对象
```

### 3.2 借用构造函数继承父类型属性

> 核心原理： 通过 `call()` 把父类型的 `this` 指向子类型的 `this` ，这样就可以实现子类型继承父类型的属性

```javascript
// 父构造函数
function Father(uname, age){
    this.uname = uname;
    this.age = age;
}
// 子构造函数
function Son(uname, age){
    Father.call(this, uname, age);
}
```

### 3.3 借用原型对象继承父类型方法

一般情况下，对象的方法都在构造函数的原型对象中设置，通过构造函数无法继承父类方法。  

核心原理： 

- 将子类所共享的方法提取出来，让**子类的 prototype 原型对象 = new 父类()**  

- **本质：子类原型对象等于是实例化父类，因为父类实例化之后另外开辟空间，就不会影响原来父类原型对象**

- **将子类的 constructor 重新指向子类的构造函数**

```javascript
// 父构造函数
function Father(uname, age){
    this.uname = uname;
    this.age = age;
}
// 子构造函数
function Son(uname, age){
    Father.call(this, uname, age);
}
Son.prototype = new Father()
Son.prototype.constructor = Son
```

## 4. 类的本质

1. class 本质还是 function
2. 类的所有方法都定义在类的 `prototype` 属性上
3. 类创建的实例，里面也有 `__proto__` 指向类的 `prototype` 原型对象，所以 ES 6 的类它的绝大部分功能，ES 5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已，ES 6 的类其实就是语法糖

## 5. 函数进阶

### 5.1 函数的定义和调用

1. function 关键字 (命名函数)
2. 函数表达式 (匿名函数)
3. new Function()   

```javascript
var fn = new Function('参数1','参数2'..., '函数体')
```

- Function 里面参数都必须是字符串格式
- 第三种方式执行效率低，也不方便书写，因此较少使用
- 所有函数都是 Function 的实例(对象)  
- 函数也属于对象

![](/imgs/web/javascript/js-oop-6.webp)

### 5.2 函数的调用方式

1. 普通函数
2. 对象的方法
3. 构造函数
4. 绑定事件函数
5. 定时器函数
6. 立即执行函数

### 5.3 函数内部的 this 指向

这些 `this` 的指向，是当我们调用函数的时候确定的

调用方式的不同决定了 `this` 的指向不同，一般指向我们的调用者

| **调用方式** |               **this 指向**                |
| :----------: | :----------------------------------------: |
| 普通函数调用 |                   window                   |
| 构造函数调用 | 实例对象，原型对象里面的方法也指向实例对象 |
| 对象方法调用 |               该方法所属对象               |
| 事件绑定方法 |                绑定事件对象                |
|  定时器函数  |                   window                   |
| 立即执行函数 |                   window                   |

### 5.4 改变函数内部 this 指向

#### 5.4.1 call 方法

调用这个函数, 并且修改函数运行时的 this 指向  

```javascript
fun.call(thisArg, arg1, arg2, ...) 
```

- thisArg ：当前调用函数 `this` 的指向对象

- arg1，arg2：传递的其他参数

例如：

```javascript
function f(){
    console.log(this);
}
f.call();              // window 对象
var obj = {
    unamne: "压缩",
    age: 18
}
f.call(obj);           // obj 对象
```

#### 5.4.2 apply 方法

`apply()` 方法调用一个函数。简单理解为调用函数的方式，但是它可以改变函数的 `this` 指向

```javascript
fun.apply(thisArg, [argsArray])
```

- thisArg：在 fun 函数运行时指定的 `this` 值

- argsArray：传递的值，**必须包含在数组里面**

- 返回值就是函数的返回值，因为它就是调用函数

- 因此 `apply()` 主要跟数组有关系，比如使用 `Math.max.apply(Math, ary)` 求数组的最大值

#### 5.4.3 bind 方法

`bind()` 方法不会调用函数。但是能改变函数内部 `this` 指向 

```javascript
fun.bind(thisArg, arg1, arg2, ...) 
```

- thisArg：在 fun 函数运行时指定的 `this` 值

- arg1，arg2：传递的其他参数

- 返回由指定的 `this` 值和初始化参数改造的**原函数拷贝**

- 因此当我们只是想改变 `this` 指向，并且不想调用这个函数的时候，可以使用 `bind`

### 5.5 严格模式

严格模式可以应用到整个脚本或个别函数中。因此在使用时，我们可以将严格模式分为为脚本开启严格模式和为函数开启严格模式两种情况

#### 5.5.1 为脚本开启严格模式

为整个脚本文件开启严格模式，需要在所有语句之前放一个特定语句 `“use strict”;`或 `‘use strict’;`

```html
<script>
　　"use strict";
　　console.log("这是严格模式。");
</script>
```

#### 5.5.2 为函数开启严格模式

要给某个函数开启严格模式，需要把 `“use strict”; ` 或 `'use strict';`  声明放在函数体所有语句之前。

```javascript
function fn(){
　　"use strict";
　　return "这是严格模式。";
}
```

> 将 `"use strict"` 放在函数体的第一行，则整个函数以 "严格模式" 运行。

#### 5.5.3 严格模式中的变化

- <strong>变量规定</strong>
  1. 在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，变量都必须先用 `var` 命令声明，然后再使用
  2. 严禁删除已经声明变量。例如，`delete x; `语法是错误的

- <strong>严格模式下 <code>this</code> 指向问题</strong>
  1. 以前在全局作用域函数中的 `this` 指向 `window` 对象，严格模式下全局作用域中函数中的 `this` 是 `undefined`
  2. 以前构造函数不加 `new` 也可以 调用，当普通函数，`this` 指向全局对象，严格模式下，如果构造函数不加 `new` 调用，`this` 指向的是 `undefined` 如果给它赋值则会报错
  3. `new` 实例化的构造函数还是指向创建的对象实例
  4. 定时器 `this` 还是指向 `window` 
  5. 事件、对象还是指向调用者
- <strong>函数变化</strong>
  1. 函数不能有重名的参数
  2. 函数必须声明在顶层。新版本的 JavaScript 会引入“块级作用域”（ ES 6 中已引入）。为了与新版本接轨，不允许在非函数的代码块内声明函数

### 5.6 闭包

闭包（closure）指有权访问另一个函数作用域中变量的函数

```javascript
function fn1() {
    var num = 10;

    function fn2() {        // fn2 就是闭包函数
        console.log(num);
    }

    num += 10;
    return fn2;
}

var f = fn1();
f();   // 20，这里想想
```

:::tip

**闭包的作用是延伸变量的作用范围**。

:::

