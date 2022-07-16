# ECMAScript - Promise

## 1. Promise 的含义

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所谓 `Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

`Promise` 对象有以下两个特点：

- 对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 `Promise` 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise` 对象的状态改变，只有两种可能：从 `pending` 变为 `fulfilled` 和从 `pending` 变为 `rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 `Promise` 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了 `Promise` 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise` 对象提供统一的接口，使得控制异步操作更加容易。

`Promise` 也有一些缺点。

- 首先，无法取消 `Promise`，一旦新建它就会立即执行，无法中途取消。
- 其次，如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。
- 第三，当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 2. 基本用法

ES 6 规定，`Promise` 对象是一个构造函数，用来生成 `Promise` 实例。

下面代码创造了一个 `Promise` 实例。

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

> `Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`，它们是两个函数。

`resolve` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject` 函数的作用是，将 `Promise` 对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise` 实例生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

> `then `方法可以接受两个回调函数作为参数。第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用，第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。这两个函数都是可选的，不一定要提供。它们都接受 `Promise` 对象传出的值作为参数。

下面是一个 `Promise` 对象的简单例子。

```javascript
function p() {
    return new Promise((resolve, reject) => {
        console.log("我立马执行...");
        resolve("执行成功回调 then...");
        console.log("虽然在 resolve 之后，但我也立马执行...")
    });
}

p().then((value) => {
    console.log(value);
});
console.log("我在 then 之前执行...");
```

```
我立马执行...
虽然在 resolve 之后，但我也立马执行...
我在 then 之前执行...                 
执行成功回调 then...  
```

> 上面代码中，`p` 方法返回一个 `Promise` 实例，表示输出几句话以后才会发生的结果。当 `Promise` 实例内部所有逻辑执行完，回调 `resolve` 函数，使得 `Promise` 对象的状态从 `pending` 变为 `fulfilled` ，即已经 resolved，此时就会触发 `then` 方法绑定的回调函数。

> - Promise 新建后立即执行，所以首先输出的是 `我立马执行...`
> - `then` 方法指定的回调函数，将在**当前脚本所有同步任务执行完才会执行**，所以 `执行成功回调 then...  ` 最后输出

:::tip

简单来说，在 Promise 内部定义了一系列逻辑操作，这些操作会在 `resolve` 和 `reject` 函数之前执行 (不管 `resolve` 和 `reject` 是否代码在前)，因为这两个函数会根据这些逻辑执行的结果看是成功还是出错了，分别执行。此时只是改变 Promise 对象的状态，并将结果或是错误传出去，交由具体的回调函数执行。这里如果只执行 `p()`，那么 `resolve` 在改变 Promise 状态后就停止了，因为没指定成功后的操作，所以结束当前操作。

这就很明显，有个操作需要等结果要进一步处理，但是我又不想等了。在不影响后面逻辑的情况下，我们可以利用 Promise 将这个操作的处理过程押后，异步等待这个操作执行完再处理，转而继续执行主逻辑，提高了效率。

:::

下面是一个用 `Promise` 对象实现的 Ajax 操作的例子。

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

上面代码中，`getJSON`是对 `XMLHttpRequest` 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个 `Promise` 对象。需要注意的是，在 `getJSON` 内部，`resolve` 函数和 `reject` 函数调用时，都带有参数。

如果调用 `resolve` 函数和 `reject` 函数时带有参数，那么它们的参数会被传递给回调函数。`reject` 函数的参数通常是 `Error` 对象的实例，表示抛出的错误；`resolve` 函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```javascript
let storeElephant = () => new Promise(resolve => {
    console.log("第一步，把冰箱门打开...");
    return resolve(new Promise(resolve => {
        console.log("第二步，把大象放进去...");
        return resolve(new Promise(resolve => {
            console.log("第三步，把冰箱门带上...");
            return resolve("大哥，搞定！");
        }))
    }))
})

storeElephant().then(value => console.log(value));
```

```
第一步，把冰箱门打开...
第二步，把大象放进去...
第三步，把冰箱门带上...
大哥，搞定！
```

:::tip

一般来说，调用 `resolve` 或 `reject` 以后，Promise 的使命就完成了，后继操作应该放到 `then` 方法里面，而不应该直接写在 `resolve` 或 `reject` 的后面。所以，最好在它们前面加上 `return` 语句，这样就不会有意外。

:::

## 3. 链式调用

### 3.1 then()

Promise 实例具有 `then` 方法，也就是说，`then` 方法是定义在原型对象 `Promise.prototype` 上的。它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，`then` 方法的**第一个参数是 `resolved` 状态的回调函数，第二个参数是 `rejected` 状态的回调函数**，它们都是可选的。

`then` 的语法为：

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post;
}).then(function(post) {
  // ...
});


// 箭头函数的写法
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```



```javascript
let fun = () => new Promise(resolve => {
    resolve(1);
})

fun().then(value => {
    console.log(value);
    return value;
})
.then(value => {
    console.log(value + 1);
    return value + 1;
}).then(value => console.log(value + 1));
```

```
1
2
3
```

> 采用链式的 `then`，可以指定一组按照次序调用的回调函数。这时，前一个回调函数，有可能返回的还是一个`Promise`对象（即有异步操作），这时后一个回调函数，就会等待该 `Promise` 对象的状态发生变化，才会被调用。

### 3.2 catch()

`Promise.prototype.catch() `方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

> 上面代码中，`getJSON() `方法返回一个 Promise 对象，如果该对象状态变为 `resolved`，则会调用 `then()` 方法指定的回调函数；如果异步操作抛出错误，状态就会变为 `rejected`，就会调用 `catch()` 方法指定的回调函数，处理这个错误。另外，`then() `方法指定的回调函数，如果运行中抛出错误，也会被 `catch()` 方法捕获。

```javascript
let fun = () => new Promise(resolve => {
    resolve(1);
})

fun().then(value => {
    console.log(value);
    throw new Error('test');
})
.catch(error => {
    console.log("出错了！")
    console.log(error);
});
```

```
1
出错了！                                              
Error: test                                           
    at xxx/xxx/test.js:7:11
```

> 一般来说，不要在 `then()` 方法里面定义 Reject 状态的回调函数（即 `then` 的第二个参数），总是使用 `catch` 方法。

### 3.3 finally()

`finally()` 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES 9 引入标准的。

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

上面代码中，不管`promise`最后的状态，在执行完 `then` 或 `catch` 指定的回调函数以后，都会执行 `finally` 方法指定的回调函数。

下面是一个例子，服务器使用 Promise 处理请求，然后使用 `finally` 方法关掉服务器。

```javascript
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);
```

**`finally `方法的回调函数不接受任何参数**，这意味着没有办法知道，前面的 Promise 状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally` 方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

## 4. allSettled

有时候，我们希望等到一组异步操作都结束了，不管每一个操作是成功还是失败，再进行下一步操作。但是，现有的 Promise 方法很难实现这个要求。

`Promise.all()` 方法只适合所有异步操作都成功的情况，如果有一个操作失败，就无法满足要求。

```javascript
const urls = [url_1, url_2, url_3];
const requests = urls.map(x => fetch(x));

try {
  await Promise.all(requests);
  console.log('所有请求都成功。');
} catch {
  console.log('至少一个请求失败，其他请求可能还没结束。');
}
```

上面示例中，`Promise.all()` 可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。

为了解决这个问题，ES 11 引入了 `Promise.allSettled()` 方法，用来确定一组异步操作是否都结束了（不管成功或失败）。所以，它的名字叫做”Settled“，包含了”fulfilled“和”rejected“两种情况。

`Promise.allSettled()` 方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。只有等到参数数组的所有 Promise 对象都发生状态变更（不管是 `fulfilled` 还是 `rejected`），返回的 Promise 对象才会发生状态变更。

```javascript
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

上面示例中，数组 `promises` 包含了三个请求，只有等到这三个请求都结束了（不管请求成功还是失败），`removeLoadingIndicator()` 才会执行。

该方法返回的新的 Promise 实例，一旦发生状态变更，状态总是 `fulfilled`，不会变成 `rejected`。状态变成 `fulfilled` 后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。

```javascript
const resolved = Promise.resolve(42);
const rejected = Promise.reject(-1);

const allSettledPromise = Promise.allSettled([resolved, rejected]);

allSettledPromise.then(function (results) {
  console.log(results);
});
// [
//    { status: 'fulfilled', value: 42 },
//    { status: 'rejected', reason: -1 }
// ]
```

`results` 的每个成员是一个对象，对象的格式是固定的，对应异步操作的结果。

```javascript
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
```

> 成员对象的 `status` 属性的值只可能是字符串 `fulfilled` 或字符串 `rejected`，用来区分异步操作是成功还是失败。如果是成功（`fulfilled`），对象会有 `value` 属性，如果是失败（`rejected`），会有 `reason` 属性，对应两种状态时前面异步操作的返回值。

:::tip

类似的几个有 `all`、`any` 方法，和 `allSettled` 方法类似，只是对应情况不同。

:::

## 5. 其他

### 5.1 Promise.resolve()

`Promise.resolve()` 等价于下面的写法。

```javascript
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))
```

**`Promise.resolve()` 方法的参数分成四种情况。**{.ul-title}

**（1）参数是一个 Promise 实例**

如果参数是 Promise 实例，那么 `Promise.resolve` 将不做任何修改、原封不动地返回这个实例。

**（2）参数是一个 `thenable` 对象**

`thenable` 对象指的是具有 `then` 方法的对象，比如下面这个对象。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};
```

`Promise.resolve()` 方法会将这个对象转为 Promise 对象，然后就立即执行 `thenable` 对象的 `then()` 方法。

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function (value) {
  console.log(value);  // 42
});
```

上面代码中，`thenable` 对象的 `then()` 方法执行后，对象 `p1` 的状态就变为 `resolved`，从而立即执行最后那个 `then()` 方法指定的回调函数，输出 42。

**（3）参数不是具有 `then()` 方法的对象，或根本就不是对象**

如果参数是一个原始值，或者是一个不具有 `then()` 方法的对象，则 `Promise.resolve()` 方法返回一个新的 Promise 对象，状态为 `resolved`。

```javascript
const p = Promise.resolve('Hello');

p.then(function (s) {
  console.log(s)
});
// Hello
```

上面代码生成一个新的 Promise 对象的实例 `p`。由于字符串 `Hello` 不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是 `resolved`，所以回调函数会立即执行。`Promise.resolve()` 方法的参数，会同时传给回调函数。

**（4）不带有任何参数**

`Promise.resolve()` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 Promise 对象。

所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用 `Promise.resolve()` 方法。

```javascript
const p = Promise.resolve();

p.then(function () {
  // ...
});
```

上面代码的变量 `p` 就是一个 Promise 对象。

需要注意的是，立即 `resolve()` 的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。

```javascript
setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
```

上面代码中，`setTimeout(fn, 0)` 在下一轮“事件循环”开始时执行，`Promise.resolve()` 在本轮“事件循环”结束时执行，`console.log('one')` 则是立即执行，因此最先输出。

### 5.2 Promise.reject() 

`Promise.reject(reason)` 方法也会返回一个新的 Promise 实例，该实例的状态为 `rejected`。

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

上面代码生成一个 Promise 对象的实例 `p`，状态为 `rejected`，回调函数会立即执行。

`Promise.reject()` 方法的参数，会原封不动地作为 `reject` 的理由，变成后续方法的参数。

```javascript
Promise.reject('出错了')
.catch(e => {
  console.log(e === '出错了')
})
// true
```

上面代码中，`Promise.reject() `方法的参数是一个字符串，后面 `catch()` 方法的参数 `e` 就是这个字符串。

### 5.3 Promise.try()

```javascript
try {
  database.users.get({id: userId})
  .then(...)
  .catch(...)
} catch (e) {
  // ...
}
```

上面这样的写法就很笨拙了，这时就可以统一用 `promise.catch()` 捕获所有同步和异步的错误。

```javascript
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

事实上，`Promise.try` 就是模拟 `try` 代码块，就像 `promise.catch` 模拟的是 `catch` 代码块。