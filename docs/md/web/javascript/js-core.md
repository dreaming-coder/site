# JavaScript - DOM、BOM 与事件
## 1. DOM

### 1.1 什么是 DOM

文档对象模型（Document Object Model，简称 DOM），是 W3C 组织推荐的处理可扩展标记语言的标准编程接口

W3C 已经定义了一系列的 DOM 接口，通过这些 DOM 接口可以改变网页的内容、结构和样式

### 1.2 DOM 树

![](/imgs/web/javascript/js-core-1.webp)

- 文档：一个页面就是一个文档，DOM 中使用 **document** 表示
- 元素：页面中所有的标签都是元素，DOM 中使用 **element** 表示
- 结点：网页中所有的内容都是结点（标签、属性、文本、注释等），DOM 中用 **node** 表示

### 1.3 获取元素

DOM 在我们实际开发过程中主要用来操作元素，获取页面中的元素可以使用以下几种方式：

- **根据 id 获取**

```javascript
var element = document.getElementById(id);   // id 是大小写敏感的字符串
```

:::tip

- 因为我们文档页面从上往下加载，所以先得有标签，我们 &lt;script&gt; 要写到标签下面。
- 返回的是一个 Element 对象。

- **根据标签名获取**。

:::

```javascript
var elements_set = document.getElementsByTagName(tagname);  // tagName 是字符串，标签名
```

:::tip

返回带有指定标签名的对象的集合，以伪数组的形式存储；即使没有该标签，返回的也是个空数组。

:::

如果想获得指定父元素下的子元素，可以如下语法实现：

```javascript
var lis = parentElement.getElementByTagName(tagname);   
```

- **通过 HTML5 新增的方法获取（推荐）**

```javascript
document.getElementsByClassName('类名');   // 根据类名返回元素对象集合

document.querySelector('选择器');          // 根据指定选择器返回第一个元素对象 

document.querySelectorAll('选择器');       // 根据指定选择器返回所有元素
```

- **特殊元素获取**

```javascript
var bd = document.body;             // 返回 body 元素对象
var ht = document.documentElement   // 返回 html 元素对象
```

### 1.4 事件基础

JavaScript 使我们有能力创建动态页面，而事件是可以被 JavaScript 侦测到的行为

简单理解：触发——响应机制

网页中每个元素都可以产生某些可以触发的 JavaScript 事件，例如点击提交按钮

**事件三要素**：

- **事件源**：事件被触发的对象，例如表单的提交按钮
- **事件类型**：如何触发，什么事件，例如提交按钮的单击事件
- **事件处理程序**：通过一个函数赋值的方式完成

**执行事件的步骤**：

1. 获取事件源
2. 注册事件（绑定事件）
3. 添加事件处理程序（采用函数赋值的形式）

**常见的事件：**

|   **事件**    | **触发条件** |
| :-----------: | :----------: |
|   `onclick`   |   单击事件   |
| `onmouseover` |   鼠标经过   |
| `onmouseout`  |   鼠标离开   |
|   `onfocus`   | 获得鼠标焦点 |
|   `onblur`    | 失去鼠标焦点 |
| `onmousemove` |   鼠标移动   |
|  `onmouseup`  | 鼠标弹起触发 |
| `onmousedown` | 鼠标按下触发 |

### 1.5 操作元素

JavaScript 的 DOM 操作可以改变网页内容、结构和样式，我们可以利用 DOM 操作元素来改变元素里面的内容 、属性等：

#### 1.5.1 修改元素内容

- 从起始位置到终止位置的内容, 但它**去除 html 标签**， 同时空格和换行也会去掉   IE

    ```javascript
    element.innerText
    ```
    
- 起始位置到终止位置的全部内容，**包括 html 标签**，同时保留空格和换行   W3C

    ```javascript
    element.innerHTML
    ```

#### 1.5.2 修改元素属性

例如 `src`、`href`、`id`、`alt`、`title` 等

修改元素内容用`元素名.属性 = ...`

#### 1.5.3 表单元素的属性操作

利用 DOM 可以操作如下表单元素的属性： `type`、`value`、`checked`、`selected`、`disabled`

#### 1.5.4 修改样式属性

```javascript
element.style.属性 = 值        // 行内样式操作
element.className = 新类名     // 类名样式操作，会覆盖原先的类名
```

### 1.6 自定义属性值

#### 1.6.1 获取自定义属性值

- `element.属性`
- `element.getAttribute('属性')`

:::tip

**区别：前者只能获得内置的属性值，自定义添加的属性的值只能通过第二种方法获取**。

:::

#### 1.6.2 设置自定义属性值

- `element.属性 = '值'`
- `element.setAttribute('属性', '值')`

:::tip

第二个主要针对自定义属性。

:::

#### 1.6.3 删除自定义属性

```javascript
element.removeAttribute('属性')
```

### 1.7 H5 自定义属性

#### 1.7.1 设置 H5 自定义属性

H5 规定自定义属性 `data-` 开头作为属性名并且赋值，例如：`<div data-index="1"></div>`

#### 1.7.2 H5 新增获取属性方法

- `element.getAttribute('data-index')`
- `element.dataset.index` 或 `element.dataset['index']`

:::tip

如果要获取这个属性：`<div data-list-name="eye"></div>`，可以用如下方法获取：

```javascript
var name = div.dataset.listName;
var name = div.dataset['listName'];
```

显然，多个连接线连接的单词，获取属性时用驼峰命名法获取。

:::

### 1.8 结点操作

#### 1.8.1 为什么学结点操作

获取元素通常使用两种方式：

1. 利用 DOM 提供的方法获取元素
   - `document.getElementById()`
   - `document.getElementsByTagName()`
   - `document.querySelector()` 等
   - 逻辑性不强、繁琐

2. 利用结点层级关系获取元素
   - 利用父子兄结点关系获取元素
   - 逻辑性强， 但是兼容性稍差

:::tip

这两种方式都可以获取元素节点，我们后面都会使用，但是结点操作更简单。

:::

#### 1.8.2 结点概述

一般地，结点至少拥有 **nodeType（结点类型）**、**nodeName（结点名称）** 和 **nodeValue（结点值）** 这三个基本属性。

- 元素结点 **nodeType** 为 **1**
- 属性结点 **nodeType** 为 **2**
- 文本结点 **nodeType** 为 **3** （文本结点包含文字、空格、换行等）

我们在实际开发中，结点操作主要操作的是**元素结点**

#### 1.8.3 结点层级

利用 DOM 树可以把结点划分为不同的层级关系，常见的是父子兄层级关系。

- **父级结点**

```javascript
var parent = node.parentNode;
```



> - `parentNode` 属性可返回某结点的父结点，注意是**最近的一个父结点**
> - 如果指定的结点没有父结点则返回 `null`


- **子结点**



```javascript
var nodes = node.childNodes;   // 返回所有子结点，包含元素结点、文本结点等等
var first = node.firstChild;   // 返回第一个子结点
var last = node.lastChild;     // 返回最后一个子结点
```

> 如果只想要获得里面的元素结点，则需要专门处理。 所以我们一般不提倡使用 `childNodes`。


获取子元素的结点应用如下方法：

```javascript
var children = node.children;         // 获取所有子元素的结点
var first = node.firstElementChild;   // 返回第一个子元素结点
var last = node.lastElementChild;     // 返回最后一个子元素结点
```

:::danger

后两个方法有兼容问题！

:::

实际开发的写法：

```javascript
var first = node.children[0];                       // 返回第一个子元素结点
var last = node.children[node.children.length - 1]; // 返回最后一个子元素结点
```

- **兄弟结点**

```javascript
var next = node.nextSibling;             // 获取当前元素的下一个兄弟结点，找不到则返回 null
var previous = node.previousSibling;     // 获取当前元素的上一个兄弟结点，找不到则返回 null
```

> 该方法也针对所有的类型的结点（元素结点、文本结点等）。

同样地，针对元素类型结点，有如下方法：

```javascript
var next = node.nextElementSibling;         // 获取当前元素的下一个元素类型的兄弟结点，找不到则返回 null
var previous = node.previousElementSibling; // 获取当前元素的上一个元素类型的兄弟结点，找不到则返回 null
```

#### 1.8.4 创建结点

```javascript
// 1. 创建元素结点
var childNode = document.createElement('tagName');  
// 2. 添加结点
parentNode.appendChild(childNode);     // 添加的结点是子级后面追加的元素        
```

也可以插入结点到指定结点之前：

```html
<body>
    <ul>
        <div>123</div>
    </ul>
</body>
<script>
	var li = document.createElement('li');
    var ul = document.querySelector('ul');
    // parentNode.insertBefore(childNode, 指定结点)
    ul.insertBefore(li, ul.children[0]);
</script>
```

#### 1.8.5 删除结点

```javascript
var deleted = parentNode.removeChild(childNode);    // 返回被删除的结点
```

#### 1.8.6 复制结点

```javascript
node.cloneNode()            // 括号为空或者里面是 false，只复制标签不复制里面的内容
node.cloneNode(true)        // 括号为 true 是深拷贝，复制标签里面的内容
```

### 1.9 三种动态创建元素区别

- `document.write()`

  如果页面文档流加载完毕，再调用此方法会导致页面重绘

- `element.innerHTML`

  创建多个元素如果采用拼接字符串，效率低，所以采用数组方式拼接，结构稍复杂

- `document.createElement()`

  创建多个元素效率稍低，但是结构更清晰

## 2. 事件高级 

### 2.1 注册事件

给元素添加事件，称为注册事件或者绑定事件

注册事件有两种方式：传统方式和方法监听注册方式

- **传统注册方式**

  利用 on 开头的函数事件

  注册事件是唯一的，同一个元素同一个事件只能设置一个处理函数，最后注册的处理函数将会覆盖前面注册的处理函数

- **方法监听注册方式**

  W3C 标准推荐方式 `addEventListener()`

    ```javascript:no-line-numbers
    eventTarget.addEventListener(type, listner[, useCapture])
    ```

    `eventTarget.addEventListener()` 方法将指定的监听器注册到 `eventTarget`（目标对象）上，当该对象触发指定的事件时，就会执行事件处理函数。

    该方法接收三个参数：

  - `type`：事件类型字符串，比如 click、mouseover，主力，这里不要带 on
  - `listener`：事件处理函数，事件发生时，会调用该监听函数
  - `useCapture`：可选参数，是一个布尔值，默认是 false

### 2.2 删除事件

- **传统注册方式**

```javascript
eventTarget.onclick = null;
```

- **方法监听注册方式**

```javascript
eventTarget.removeEventListener(type, listener[, useCapture])
```

### 2.3 DOM 事件流

事件流描述的是从页面中接收事件的顺序

事件发生时会在元素节点之间按照特定的顺序传播，这个过程即 DOM 事件流

DOM 事件流分为 3 个阶段：

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段

![](/imgs/web/javascript/js-core-2.webp)

:::tip

- JavaScript 代码中只能执行捕获或者冒泡其中的一个阶段。
- `onclick` 和 `attachEvent` 只能得到冒泡阶段。
- `addEventListener(type, listener[, useCapture]) `第三个参数如果是 `true`，表示在事件捕获阶段调用事件处理程序；如果是 `false`（不写默认就是 `false`），表示在事件冒泡阶段调用事件处理程序。
- 实际开发中我们很少使用事件捕获，我们更关注事件冒泡。
- 有些事件是没有冒泡的，比如 `onblur`、`onfocus`、`onmouseenter`、`onmouseleave`。
- 事件冒泡有时候会带来麻烦，有时候又会帮助很巧妙的做某些事。

:::

### 2.4 事件对象

- event 就是一个事件对象，写到我们监听函数的小括号里面 ，当形参看


- 事件对象只有有了事件才会存在，它是系统自动创建的，不需要我们传递参数

```javascript
div.onclick = function(event){
  // 这个event 就是传进来的事件对象，event 可以是其他标识符，这里只是接收事件对象的形参  
};
```

- 事件对象是事件的一系列相关的数据的集合，根据不同的事件包含不同的信息

- 由于兼容性问题，可以这么写：`event = event || window.event;`，但是目前一般不考虑兼容问题

### 2.5 事件对象的常见属性和方法

| **事件对象属性方法**  |                           **说明**                           |
| :-------------------: | :----------------------------------------------------------: |
|      `e.target`       |                 **返回触发事件的对象，标准**                 |
|    `e.srcElement`     |           返回触发事件的对象，非标准，ie 6-8 使用            |
|       `e.type`        |   **返回事件的类型，比如 `click`，`mouseover`，不带 `on`**   |
|   `e.cancelBubble`    |             该属性阻止冒泡，非标准，ie 6-8 使用              |
|    `e.returnValue`    | 该属性阻止默认事件（默认行为） 非标准，ie 6-8 使用，比如不让链接跳转 |
| `e.preventDefault()`  |        **该方法阻止默认事件，标准，比如不让链接跳转**        |
| `e.stopPropagation()` |                      **阻止冒泡，标准**                      |

:::tip

- `e.target` 点击了哪个元素，就返回哪个元素；
- `this` 是哪个元素绑定了这个点击事件，那么就返回谁

:::

**【阻止默认行为】**

```javascript
var a = document.querySelector('a');
a.addEventListener('click', function(e){
    e.preventDefault();     // 这样单击超链接就不会跳转了
});
```

**【阻止事件冒泡】**

利用事件对象里面的 `stopPropagation()` 方法

```javascript
var son = document.querySelector('.son');
son.addEventListener('click', function(e){
    alert('son');
    e.stopPrapagation();
}, false);
```

### 2.6 事件委托

**原理：不是每个子结点单独设置事件监听器，而是事件监听器设置在其父结点上，然后利用冒泡原理影响设置每个子结点**

```javascript
function select(ev) {　　　　
    var ev = ev || window.event;　　　　
    var target = ev.target;　　　　
    if (target.nodeName.toLowerCase() == 'input') {
        alert("input");
    }　　
}

document.getElementById("tb").addEventListener('click', select, false);
```

### 2.7 常用鼠标事件

#### 2.7.1 禁止右键菜单

`contextmenu` 主要控制应该何时显示上下文菜单，主要用于程序员取消默认的上下文菜单

```javascript
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
})
```

#### 2.7.2 禁止鼠标选中

```javascript
document.addEventListener('selectstart', function(e){
    e.preventDefault();
})
```

#### 2.7.3 鼠标事件对象

event 对象代表事件的状态，跟事件相关的一系列信息的集合。鼠标事件对象是 `MouseEvent`

| **鼠标事件对象属性** |                    **说明**                     |
| :------------------: | :---------------------------------------------: |
|     `e.clientX`      |   返回鼠标相对于**浏览器窗口可视区**的 X 坐标   |
|     `e.clientY`      |   返回鼠标相对于**浏览器窗口可视区**的 Y 坐标   |
|      `e.pageX`       | 返回鼠标相对于**文档页面**的 X 坐标  IE 9+ 支持 |
|      `e.pageY`       | 返回鼠标相对于**文档页面**的 Y 坐标  IE 9+ 支持 |
|     `e.screenX`      |       返回鼠标相对于**电脑屏幕**的 X 坐标       |
|     `e.screenY`      |       返回鼠标相对于**电脑屏幕**的 Y 坐标       |

### 2.8 常用键盘事件

#### 2.8.1 按键/弹起

| **键盘事件** |                         **触发条件**                         |
| :----------: | :----------------------------------------------------------: |
|  `onkeyup`   |                   某个键盘按键被松开时触发                   |
| `onkeydown`  |                   某个键盘按键被按下时触发                   |
| `onkeypress` | 某个键盘按键被按下时触发，但是它**不能识别功能键**，如 Ctrl、Shift 等 |

:::tip

执行顺序：`keydown `> `keypress `> `keyup`

:::

#### 2.8.2 键盘事件对象

键盘事件对象是 `KeyboardEvent`，它有一个 `keyCode` 属性，返回按键的 ASCII 码值

:::tip

- `keyup` 和 `keydown` 事件不区分字母大小写， `a` 和 `A` 得到的都是 $65$
- `keypress` 事件区分大小写

:::

## 3. BOM

### 3.1 什么是 BOM

ECMAScript 是JavaScript 的核心，但如果要在 Web 中使用JavaScript，那么 BOM（浏览器对象模型）则无疑才是真正的核心。BOM 提供了很多对象，用于访问浏览器的功能，这些功能与任何网页内容无关。多年来，缺少事实上的规范导致 BOM 既有意思又有问题，因为浏览器提供商会按照各自的想法随意去扩展它。于是，浏览器之间共有的对象就成为了事实上的标准。

### 3.2 BOM 的构成

`window` 对象是**浏览器的顶级对象**，它具有双重角色

- 它是 JS 访问浏览器窗口的一个接口
- 它是一个全局对象。定义在全局作用域中的变量、函数都会变成 `window` 对象的属性和方法。

在调用的时候可以省略 `window`，前面学习的对话框都属于 `window` 对象方法，如 `alert()`、`prompt()` 等

:::tip

注意 `window` 下的一个特殊属性 `window.name`。

:::

### 3.3 window 对象常用事件

#### 3.3.1 窗口加载事件

```javascript
window.onload = function(){};
window.addEventListener('load', function(){});
```

> `window.onload` 是窗口加载事件，当文档内容完全加载完成时会触发该事件（包括图像、脚本文件、CSS 文件等），调用处理函数。



```javascript
document.addEventListener('DOMContentLoaded', function(){});
```

`DOMContentLoaded` 事件触发时，仅当 DOM 加载完成，不包括样式表、图片、flash 等， IE 9 以上支持

> 如果页面的图片很多的话, 从用户访问到 `onload` 触发可能需要较长的时间，交互效果就不能实现，必然影响用户的体验，此时用 `DOMContentLoaded` 事件比较合适。


#### 3.3.2 调整窗口大小事件

```javascript
window.onresize = function(){};
window.addEventListener('resize', function(){});
```

> 当调整窗口大小时会触发该事件。

### 3.4 定时器

window 对象给我们提供了 2 个非常好用的方法——定时器

- `setTimeout()`
- `setInterval()`

#### 3.4.1 setTimeout() 定时器

```javascript
var timer = window.setTimeout(调用函数[, 延迟的毫秒数]);
```

`setTimeout()` 方法用于设置一个定时器，该定时器在定时器到期后执行调用函数

 可以通过 `window.clearTimeout(timeoutID)` 停止定时器，所以一般要给定时器命名

#### 3.4.2 setInterval() 定时器

```javascript
window.setInterval(回调函数[, 间隔的毫秒数]);
```

`setInterval()` 方法重复调用一个函数，每隔这个时间，就去调用一次回调函数

因为定时器可能有很多，所以我们经常给定时器赋值一个标识符

可以通过 `window.clearInterval(intervalID)`方法停止 `setInterval()` 定时器 

### 3.5 JavaScript 执行机制

#### 3.5.1 JavaScript 是单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。这是因为 Javascript 这门脚本语言诞生的使命所致——JavaScript 是为处理页面中用户的交互，以及操作 DOM 而诞生的。比如我们对某个 DOM 元素进行添加和删除操作，不能同时进行。 应该先进行添加，之后再删除。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。这样所导致的问题是： 如果 JS 执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞的感觉。

#### 3.5.2 同步与异步

为了解决这个问题，利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程。于是，JS 中出现了同步和异步。

- 同步

  前一个任务结束后再执行后一个任务，程序的执行顺序与任务的排列顺序是一致的、同步的。比如做饭的同步做法：我们要烧水煮饭，等水开了（10分钟之后），再去切菜，炒菜。

- 异步

  你在做一件事情时，因为这件事情会花费很长时间，在做这件事的同时，你还可以去处理其他事情。比如做饭的异步做法，我们在烧水的同时，利用这10分钟，去切菜，炒菜。

:::warning

**本质区别： 这条流水线上各个流程的执行顺序不同。**

:::

**【同步任务】**

同步任务都在主线程上执行，形成一个执行栈

**【异步任务】**

JS 的异步是通过回调函数实现的。

一般而言，异步任务有以下三种类型:

- 普通事件，如 click、resize 等
- 资源加载，如 load、error 等
- 定时器，包括 setInterval、setTimeout 等

异步任务相关回调函数添加到任务队列中（任务队列也称为消息队列）

1. 先执行执行栈中的同步任务
2. 异步任务（回调函数）放入任务队列中
3. 一旦执行栈中的所有同步任务执行完毕，系统就会按次序读取任务队列中的异步任务，于是被读取的异步任务结束等待状态，进入执行栈，开始执行

### 3.6 location 对象

window 对象给我们提供了一个 `location` 属性用于获取或设置窗体的 URL，并且可以用于解析 URL 。 因为这个属性返回的是一个对象，所以我们将这个属性也称为 `location` 对象

#### 3.6.1 URL

统一资源定位符 (Uniform Resource Locator, URL) 是互联网上标准资源的地址

互联网上的每个文件都有一个唯一的 URL，它包含的信息指出文件的位置以及浏览器应该怎么处理它

URL 的一般语法格式为：

```
 protocol://host[:port]/path/[?query]#fragment
 
 http://www.itcast.cn/index.html?name=andy&age=18#link
```

| **组成** |                           **说明**                           |
| :------: | :----------------------------------------------------------: |
| protocol |              通信协议，如：http，ftp，maito 等               |
|   host   |               主机（域名），如：www.baidu.com                |
|   port   | 端口号（可选），省略时使用方案的默认端口，如 http 的默认端口 80 |
|   path   | 路径，由另个或多个 `/` 符号隔开的字符串，一般用来表示主机上的一个目录或文件地址 |
|  query   |         参数，以键值对的形式，通过 `&` 符号分隔开来          |
| fragment |             片段，`#` 后面内容。常见于链接，锚点             |

#### 3.6.2 location 对象的属性

|      **属性**       |              **返回值**               |
| :-----------------: | :-----------------------------------: |
|   `location.href`   |         获取挥着设置整个 URL          |
|   `location.host`   |    返回主机（域名） www.baidu.com     |
|   `location.port`   |  返回端口号，如果未写，返回空字符串   |
| `location.pathname` |               返回路径                |
|  `location.search`  |               返回参数                |
|   `location.hash`   | 返回片段，#后面内容，常见于链接，锚点 |

:::tip

重点记住 `href` 和 `search `。

:::

#### 3.6.3 location 对象的方法

|       **方法**       |                          **返回值**                          |
| :------------------: | :----------------------------------------------------------: |
| `location.assign()`  |          跟 href 一样，可以跳转页面（也称为重定向）          |
| `location.replace()` |        替换当前页面，因为不记录历史，所以不能后退页面        |
| `location.reload()`  | 重新加载页面，相对于刷新按钮或者 <kbd>F5</kbd> ，如果参数为 `true`，则表示强制刷新 <kbd>Ctrl</kbd> + <kbd>F5</kbd> |

### 3.7 history 对象

window 对象给我们提供了一个 `history` 对象，与浏览器历史记录进行交互，该对象包含用户（在浏览器窗口中）访问过的 URL

|  **方法**   |                           **作用**                           |
| :---------: | :----------------------------------------------------------: |
|  `back()`   |                         可以后退功能                         |
| `forward()` |                           前进功能                           |
| `go(参数)`  | 前进后退功能，如果参数是 1，就前进一个页面，参数是 -1，就后退一个页面 |

## 4. PC 端网页特效

### 4.1 元素偏移量 offset 系列

`offset `翻译过来就是偏移量， 我们使用 `offset `系列相关属性可以动态的得到该元素的位置（偏移）、大小等。

- 获得元素距离带有定位父元素的位置

- 获得元素自身的大小（宽度高度）
- 注意： 返回的数值都不带单位

`offset` 系列常用属性

![](/imgs/web/javascript/js-core-3.webp)

|        **属性**        |                           **作用**                           |
| :--------------------: | :----------------------------------------------------------: |
| `element.offsetParent` | 返回作为该元素带有定位的父级元素，如果父级都没有定位，则返回 `body` |
|  `element.offsetTop`   |           **返回元素相对带有定位父元素上方的偏移**           |
|  `element.offsetLeft`  |          **返回元素相对带有定位父元素左边框的偏移**          |
| `element.offsetWidth`  | **返回自身包括 padding、边框、内容区的宽度，返回数值不带单位** |
| `element.offsetHeight` | **返回自身包括 padding、边框、内容区的高度，返回数值不带单位** |

**【offset 与 style 的区别】**

![](/imgs/web/javascript/js-core-4.webp)

### 4.2 元素可视区 client 系列

`client` 翻译过来就是客户端，我们使用 `client` 系列的相关属性来获取元素可视区的相关信息。

通过 `client` 系列的相关属性可以动态的得到该元素的边框大小、元素大小等

|        **属性**        |                           **作用**                           |
| :--------------------: | :----------------------------------------------------------: |
|  `element.clientTop`   |                     返回元素上边框的高度                     |
|  `element.clientLeft`  |                     返回元素左边框的宽度                     |
| `element.clientWidth`  | **返回自身包括 padding，内容区宽度，不含边框，返回单位不带数值** |
| `element.clientHeight` | **返回自身包括 padding，内容区高度，不含边框，返回单位不带数值** |

### 4.3 元素滚动 scroll 系列

scroll 翻译过来就是滚动的，我们使用 scroll 系列的相关属性可以动态的得到该元素的大小、滚动距离等

|        **属性**        |                           **作用**                           |
| :--------------------: | :----------------------------------------------------------: |
|  `element.scrollTop`   |          **返回被卷去的上侧距离，返回数值不带单位**          |
|  `element.scrollLeft`  |          **返回被卷去的左侧距离，返回数值不带单位**          |
| `element.scrollWidth`  | 返回自身包括 padding，内容区的宽度，不含边框，返回单位不带数值 |
| `element.scrollHeight` | 返回自身包括 padding，内容区的高度，不含边框，返回单位不带数值 |

![](/imgs/web/javascript/js-core-5.webp)

如果浏览器的高（或宽）度不足以显示整个页面时，会自动出现滚动条。当滚动条向下滚动时，页面上面被隐藏掉的高度，我们就称为页面被卷去的头部

滚动条在滚动时会触发 `onscroll` 事件

### 4.4 mouseenter 与 mouseover 区别

如果出现 `div` 套娃` div` ，且有重叠

- `mouseover`：当鼠标经过父盒子会触发，子盒子重叠部分也会触发
- `mouseenter`：重叠部分不会触发该事件，**因为 `mouseenter` 没有冒泡，相对应的有 `mouseleave` 事件也不会冒泡**

## 5. classdList 类名操作

::: normal-demo
```html
<div class="box"></div>
```
```css
.box {
    float: left;
    margin-left: 10px;
    width: 200px;
    height: 100px;
    border: 1px solid #666;
    background-color: #1dd1a1;
}

.bg {
    background-color: hotpink
}
```
```javascript
// classList 返回元素的类名
var div = document.querySelector('.box');
// 1. 添加类名  是在后面追加类名不会覆盖以前的类名 注意前面不需要加 "."
div.classList.add('three');
// 2. 删除类名
div.classList.remove('one');
// 3. 切换类
div.addEventListener('click', function() {
    // 如果classList中存在给定的值，删除它，否则，添加它；
    this.classList.toggle('bg');
})
```
:::

## 6. 本地存储

随着互联网的快速发展，基于网页的应用越来越普遍，同时也变的越来越复杂，为了满足各种各样的需求，会经常性在本地存储大量的数据，HTML 5 规范提出了相关解决方案

**本地存储特性**：

1、数据存储在用户浏览器中

2、设置、读取方便、甚至页面刷新不丢失数据

3、容量较大，sessionStorage 约 5M、localStorage 约 20M

4、只能存储字符串，可以将对象 JSON.stringify()  编码后存储

### 6.1 window.sessionStorage

1、生命周期为关闭浏览器窗口

2、在同一个窗口(页面)下数据可以共享

3、  以键值对的形式存储使用

- **存储数据**

```javascript
sessionStorage.setItem(key, value);
```

- **获取数据**

```javascript
sessionStorage.getItem(key);
```

- **删除数据**

```javascript
sessionStorage.removeItem(key);
```

- **清空数据**

```javascript
sessionStorage.clear();
```

### 6.2 window.localStorage

1、生命周期永久生效，除非手动删除，否则关闭页面也会存在

2、可以多窗口（页面）共享（同一浏览器可以共享）

3、以键值对的形式存储使用

- **存储数据**

```javascript
localStorage.setItem(key, value);
```

- **获取数据**

```javascript
localStorage.getItem(key);
```

- **删除数据**

```javascript
localStorage.removeItem(key);
```

- **清空数据**

```javascript
localStorage.clear();
```

