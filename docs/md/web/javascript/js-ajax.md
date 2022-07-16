# JavaScript - Ajax
## 1. 什么是 Ajax

Ajax = **A**synchronous **J**avaScript **A**nd **X**ML.

Ajax 并非编程语言。

Ajax 仅仅组合了：

- 浏览器内建的 `XMLHttpRequest` 对象（从 web 服务器请求数据）
- JavaScript 和 HTML DOM（显示或使用数据）

Ajax 是一个令人误导的名称。Ajax 应用程序可能使用 XML 来传输数据，但将数据作为纯文本或 JSON 文本传输也同样常见。

Ajax 允许通过与场景后面的 Web 服务器交换数据来异步更新网页。这意味着可以更新网页的部分，而不需要重新加载整个页面。

## 2. Ajax 工作原理

![](/imgs/web/javascript/java-ajax-1.webp)

1. 网页中发生一个事件（页面加载、按钮点击）
2. 由 JavaScript 创建 `XMLHttpRequest` 对象
3. `XMLHttpRequest` 对象向 web 服务器发送请求
4. 服务器处理该请求
5. 服务器将响应发送回网页
6. 由 JavaScript 读取响应
7. 由 JavaScript 执行正确的动作（比如更新页面）

## 3. XMLHttpRequest 对象

创建 `XMLHttpRequest` 对象的语法是：

```javascript
let xhr = new XMLHttpRequest();
```

老版本的 Internet Explorer（IE 5 和 IE 6）使用 `ActiveX` 对象：

```javascript
var xhr = new ActiveXObject("Microsoft.XMLHTTP");
```

下面从一个例子来看：
::: normal-demo
```html
<div id="xhr-div"></div>
```

```css
#xhr-div {
  margin: 5px auto;
  padding: 10px;
  width: 320px;
  height: 60px;
  background-color: #1eff65;
  font-size: larger;
  text-align: center;
}
```
```javascript
let div = document.querySelector("#xhr-div");

div.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            div.innerHTML = xhr.responseText;
        }
    };
    xhr.open("GET", "/poem.txt", true); // 相对当前地址
    xhr.send(null);
})
```
:::

## 4. Ajax 事件

建立和探索一个简单的示例之后，现在可以开始深人了解 `XMLHttpRequest` 对象支持的功能，以及如何在请求中使用它们了。

![](/imgs/web/javascript/java-ajax-2.png)

这些事件大多数会在请求的某一个特定时点上触发。`readystatechange` (之前介绍过)和 `progress` 这两个事件是例外，它们可以多次触发以提供进度更新。

调度这些事件时，浏览器会对 `readystatechange` 事件使用常规的 `Event` 对象，对其他事件则使用`ProgressEvent` 对象。`ProgressEvent` 对象定义了 `Event` 对象的所有成员，并增加了如下成员。

|       名称       |                 说明                 | 事件类型 |
| :--------------: | :----------------------------------: | :------: |
| lengthComputable | 如果能够计算数据流的总长度则返回true |  布尔值  |
|      loaded      |        返回当前已载入的数据量        |   数值   |
|      total       |          返回可用的数据总量          |   数值   |

## 5. 获取和设置标头

`XMLHttpRequest` 对象让你可以设置发送给服务器的请求标头( Header )和读取服务器响应里的标头。

- `setRequestHeader(<header>,<value>)`

  用指定值设置标头，返回 `void`

- `getResponseHeader(<header>)`

  获取指定的标头值，返回字符串

- `getAllResponseHeaders()`

  以单个字符串形式获取所有的标头

【例】

- **想利用 RestFul 风格接口增删改查时**

一般防火墙只接受 `GET` 或者 `POST` 请求，像 `PUT`、`DELETE` 等请求无法直接传递，可以利用标头 `X-HTTP-Method-Override` 设置成 `DELETE`、`PUT` 等。

:::warning

设置标头方法必须在 `open()` 方法之后，否则会报错。

:::

- **禁用内容缓存**

一些浏览器会缓存通过 Ajax 请求所获得的内容，在浏览会话期间不会再请求它。可以设置标头 `Cache-Control` 为 `no-cache` 来禁用缓存。

- **读取响应标头**

可以通过 `getResponseHeader` 和 `getAllResponseHeaders` 方法来读取服务器响应某个 Ajax 请求时发送的 HTTP 标头。在大多数情况下，你不需要关心标头里有什么，因为它们是浏览器和服务器之间交互事务的组成部分。

## 6. Ajax 跨域

默认情况下，浏览器限制脚本只能在它们所属文档的来源内生成 Ajax 请求。你应该还记得，来源由 URL 中的协议、主机名和端口号组成。这就意味着当我 `htp://titan` 载入一个文档后，文档内含的脚本通常无法生成对 `http:/itan:8080` 的请求，因为第二个 URL 的端口号是不同的，所以处于文档来源之外。从一个来源到另一个来源的 Ajax 请求被称为跨域请求( cross-origin request )。

这个策略的问题在于它一刀切地禁止了跨源请求。这就导致人们使用一些非常丑陋的手段来诱使浏览器生成违反这一策略的请求。幸好，跨源资源共享( Cross-Origin Resource Sharing, CORS )规范提供了一种合法的方式来生成跨源请求。

我们可以设置 `Access-Control-Allow-Origin` 标头来指定某个来源应当被允许对此文档生成跨源请求，如果标头里指定的来源与当前文档的来源匹配，浏览器就会加载和处理该响应所包含的数据，也可以设为 `*`，表示允许任意来源的跨域请求。

:::tip

**这是在服务端设置响应标头**！

:::

当我们使用 `PUT` 和 `DELETE` 这种复杂请求时，浏览器会先发送 `option`（预检）请求，与简单请求不同的是，option 请求多了 2 个字段：

- `Access-Control-Request-Method`：该次请求的请求方式
- `Access-Control-Request-Headers`：该次请求的自定义请求头字段

:::warning

**这部分先做个记录，知道有这么个玩意儿能解决跨域问题，需要时再深入补充。**

:::

## 7. 使用 FormData 发送表单数据

提交表单时，如果按照原始方式用键值对拼接起来有些复杂，目前主流浏览器都支持将表单数据封装到 FormData 数据类型中：

```javascript
let form = document.querySelector('form');
let formData = new FormData(form);
// 假定已经创建 XMLHttpRequest 对象
// ...
xhr.send(formData);
```

:::warning

其他需要注意的地方是我不再设置 `Content-Type` 标头的值了。如果使用 `FormData` 对象，数据总是会被编码为 `multipart/form-data`。

:::

另外，`FormData` 对象定义了一个方法，它允许你给要发送到服务器的数据添加自定义的键值对。

```javascript
formData.append("name","value");
```

### 7.1 发送 JSON 数据

JavaScript 原生支持 JSON 格式，因此使用比较简单。

```javascript
xhr.setRequestHeader("Content-Type", "application/json"); // 设置格式
xhr.send(JSON.stringify(formData)); // 发送JSON格式数据，这里将FormData转成JSON格式
```

### 7.2 发送文件

可以使用 `FormData` 对象和 `type` 属性为 `file` 的 `input` 元素向服务器发送文件。当表单提交时，`FormData` 对象会自动确保用户选择的文件内容与其他的表单值一同上传。
