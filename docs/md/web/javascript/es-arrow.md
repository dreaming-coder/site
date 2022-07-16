# ECMAScript - 箭头函数

## 1. 基本用法

ES6 允许使用“箭头”（`=>`）定义函数。

```javascript
var f = v => v;

// 等同于
var f = function (v) {
  return v;
};
```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };


var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用 `return` 语句返回。

```javascript
var sum = (num1, num2) => { return num1 + num2; }
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```javascript
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```

箭头函数可以与变量解构结合使用。

```javascript
const full = ({ first, last }) => first + ' ' + last;

// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}
```

箭头函数使得表达更加简洁。

```javascript
const isEven = n => n % 2 === 0; // 如果箭头函数只有一行语句，且不需要返回值，可以不用写大括号
const square = n => n * n;
```

:::tip

- 箭头函数没有自己的 `this` 对象
- 不可以当作构造函数，也就是说，不可以对箭头函数使用 `new` 命令，否则会抛出一个错误。
- 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 `yield` 命令，因此箭头函数不能用作 Generator 函数。

:::

> 上面四点中，最重要的是第一点。对于普通函数来说，内部的 `this` 指向函数运行时所在的对象，但是这一点对箭头函数不成立。它没有自己的 `this` 对象，内部的 `this` 就是定义时上层作用域中的 `this`。也就是说，箭头函数内部的 `this` 指向是固定的，相比之下，普通函数的 `this` 指向是可变的。

> 箭头函数实际上可以让 `this` 指向固定化，绑定 `this` 使得它不再可变，这种特性很有利于封装回调函数。

除了 `this`，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`。

## 2. 不适用场合

由于箭头函数使得 `this` 从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

第一个场合是定义对象的方法，且该方法内部包括`this`。

```javascript
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```

上面代码中，`cat.jumps() `方法是一个箭头函数，这是错误的。调用 `cat.jumps()` 时，如果是普通函数，该方法内部的 `this` 指向 `cat`；如果写成上面那样的箭头函数，使得 `this` 指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致 `jumps` 箭头函数定义时的作用域就是全局作用域。

第二个场合是需要动态`this`的时候，也不应使用箭头函数。

```javascript
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```

上面代码运行时，点击按钮会报错，因为`button`的监听函数是一个箭头函数，导致里面的 `this` 就是全局对象。如果改成普通函数，`this` 就会动态指向被点击的按钮对象。

另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

