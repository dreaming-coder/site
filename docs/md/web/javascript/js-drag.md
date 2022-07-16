# JavaScript - 拖放
> 拖放是一种非常流行的用户界面模式。它的概念很简单：点击某个对象，并按住鼠标按钮不放，将鼠标移动到另一个区域，然后释放鼠标按钮将对象“放”在这里。拖放功能也流行到了 Web 上，成为了一些更传统的配置界面的一种候选方案。

> 我们通过 `draggable` 属性告诉浏览器文档里哪些元素可以被拖动，允许值为 `true`、`false`、`auto`。

## 1. 创建来源项目

以拖动图片为例，我们想把下面三个图片随便拖拽一幅到第四个框来填充：

::: normal-demo
```html
<div id="src-pre">
    <img draggable="true" id="img01-pre"
         src="/imgs/web/javascript/js-drag-1.webp" width="81px"
         alt="img1"/>
    <img draggable="true" id="img02-pre"
         src="/imgs/web/javascript/js-drag-2.webp" width="81px"
         alt="img2"/>
    <img draggable="true" id="img03-pre"
         src="/imgs/web/javascript/js-drag-3.webp" width="81px"
         alt="img3"/>
    <div id="target-pre">
        <p>Drop Here</p>
    </div>
</div>
```
```css
#src-pre > * {
    float: left;
}
#src-pre::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
#target-pre, #src-pre > img {
    border: thin solid black;
    padding: 2px;
    margin: 4px;
}
#target-pre {
    height: 81px;
    width: 81px;
    text-align: center;
    display: table;
}
#target-pre > p {
    display: table-cell;
    vertical-align: middle;
}
#target-pre > img {
    margin: 1px;
}
```
:::

这个例子里有三个 `img` 元素，每一个的 `draggable` 属性都被设为 `true`。我还创建了一个 `id` 为 `target` 的 `div` 元素，稍后将设置它用来接收我们拖动的 `img` 元素。我们不需要再做任何其他设置就能拖动图像，但浏览器会提示我们不能把它们释放到任何地方，通常的做法是展示一个禁止进入的标志作为光标。



## 2. 处理拖放事件

我们通过一系列事件来利用拖放功能。这些事件有的针对被拖动的元素，有的针对可能的释放区。其中被拖动元素的事件如下所示：

|   名  称    |         说  明         |
| :---------: | :--------------------: |
| `dragstart` | 在元素开始被拖动时触发 |
|   `drag`    | 在元素被拖放时反复触发 |
|  `dragend`  |  在拖放操作完成时触发  |

例如我们想在拖放时，最后一个 `div` 显示拖放的图片介绍：

style 要添加一个：

```css
// 这里注意，img和.dragged直接没有空格，不是后代选择器，而是指同时满足选择的元素
img.dragged {
    background-color: #37e33e;
}
```

然后给 `p `元素添加 `id='msg'`，其他 JavaScript 代码如下所示：

```javascript
let src = document.querySelector("#src");
let msg = document.querySelector("#msg");
src.ondragstart = e => e.target.classList.add("dragged");
src.ondragend = e => {
    e.target.classList.remove("dragged");
    msg.innerHTML = "Drop Here";
};
src.ondrag = e => msg.innerHTML = e.target.id; // 这里给图片的id已经重命名，便于演示识别
```

效果如下所示：
::: normal-demo
```html
<div id="src-1">
    <img draggable="true" id="流川枫"
         src="/imgs/web/javascript/js-drag-1.webp" width="81px"
         alt="流川枫"/>
    <img draggable="true" id="IU"
         src="/imgs/web/javascript/js-drag-2.webp" width="81px"
         alt="IU"/>
    <img draggable="true" id="动漫"
         src="/imgs/web/javascript/js-drag-3.webp" width="81px"
         alt="动漫"/>
    <div id="target-1">
        <p id="msg-1">Drop Here</p>
    </div>
</div>
```
```css
#src-1 > * {
    float: left;
}
#src-1::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
#target-1, #src-1 > img {
    border: thin solid black;
    padding: 2px;
    margin: 4px;
}
#target-1 {
    height: 81px;
    width: 81px;
    text-align: center;
    display: table;
}
#target-1 > p {
    display: table-cell;
    vertical-align: middle;
}
#target-1 > img {
    margin: 1px;
}
img.dragged {
    background-color: #37e33e;
}
```
```javascript
let src = document.querySelector("#src-1");
let msg = document.querySelector("#msg-1");
src.ondragstart = e => e.target.classList.add("dragged");
src.ondragend = e => {
    e.target.classList.remove("dragged");
    msg.innerHTML = "Drop Here";
};
src.ondrag = e => msg.innerHTML = e.target.id; // 这里给图片的id已经重命名，便于演示识别

```
:::


## 3. 创建释放区

要让某个元素成为释放区,我们需要处理 `dragenter` 和 `dragover` 事件。它们是针对释放区的其中两个事件。完整的释放区事件如下所示：

|    名 称    |                    说 明                     |
| :---------: | :------------------------------------------: |
| `dragenter` | 当被拖动元素进入释放区所占据的屏幕空间时触发 |
| `dragover`  |       当被拖动元素在释放区内移动时触发       |
| `dragleave` |   当被拖动元素没有放下就离开 释放区时触发    |
|   `drop`    |       当被拖动元素在释放区的放下时触发       |

`dragenter` 和 `dragover` 事件的默认行为是拒绝接受任何被拖放的项目,因此我们必须要做的最重要的事就是防止这种默认行为被执行。

:::warning

**拖放功能的规范告诉我们还必须给想要成为释放区的元素应用 `dropzone` 属性，而且此属性的值应当包含我们愿意接受的操作与数据类型细节。浏览器实际上不是这么实现拖放功能的。在这介绍的是真正有效的法，而不是规范所指定的做法。**

:::

接着上面的例子， JavaScript 代码改写为：

```javascript
let src = document.querySelector("#src");
let target = document.querySelector("#target");
let msg = document.querySelector("#msg");

let draggedId; // 需要记录被拖放的元素的id，以备后用

// src
src.ondragstart = e => {
    draggedId = e.target.id;
    e.target.classList.add("dragged");
}
src.ondragend = e => {
    e.target.classList.remove("dragged");
    msg.innerHTML = "Drop Here";
};
src.ondrag = e => msg.innerHTML = e.target.id;

// dest
// 添加下面2行代码后，拖放至释放区时，鼠标的标志不再是禁止，而是可接受
target.ondragenter = e => e.preventDefault();
target.ondragover = e => e.preventDefault();

target.ondrop = e => {
    let newElement = document.getElementById(draggedId).cloneNode(false);
    target.innerHTML = "";
    target.appendChild(newElement);
    e.preventDefault();
};
```
修改后的示例为：
::: normal-demo
```html
<div id="src-2">
    <img draggable="true" id="流川枫"
         src="/imgs/web/javascript/js-drag-1.webp" width="81px"
         alt="流川枫"/>
    <img draggable="true" id="IU"
         src="/imgs/web/javascript/js-drag-2.webp" width="81px"
         alt="IU"/>
    <img draggable="true" id="动漫"
         src="/imgs/web/javascript/js-drag-3.webp" width="81px"
         alt="动漫"/>
    <div id="target-2">
        <p id="msg-2">Drop Here</p>
    </div>
</div>
```
```css
#src-2 > * {
    float: left;
}
#src-2::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
#target-2, #src-2 > img {
    border: thin solid black;
    padding: 2px;
    margin: 4px;
}
#target-2 {
    height: 81px;
    width: 81px;
    text-align: center;
    display: table;
}
#target-2 > p {
    display: table-cell;
    vertical-align: middle;
}
#target-2 > img {
    margin: 1px;
}
img.dragged {
    background-color: #37e33e;
}
```
```javascript
let src = document.querySelector("#src-2");
let target = document.querySelector("#target-2");
let msg = document.querySelector("#msg-2");

let draggedId; // 需要记录被拖放的元素的id，以备后用

// src
src.ondragstart = e => {
    draggedId = e.target.id;
    e.target.classList.add("dragged");
}
src.ondragend = e => {
    e.target.classList.remove("dragged");
    msg.innerHTML = "Drop Here";
};
src.ondrag = e => msg.innerHTML = e.target.id;

// dest
// 添加下面2行代码后，拖放至释放区时，鼠标的标志不再是禁止，而是可接受
target.ondragenter = e => e.preventDefault();
target.ondragover = e => e.preventDefault();

target.ondrop = e => {
    let newElement = document.getElementById(draggedId).cloneNode(false);
    target.innerHTML = "";
    target.appendChild(newElement);
    e.preventDefault();
};
```
:::

:::warning

在这个例子里，我阻止了 `drop` 事件的默认行为。如果不这么做，浏览器就可能会做出一些出人意料的事。举个例子，在这种情况下，Firefox 浏览器 会关闭网页，转而显示被拖动 `img` 元素 `src` 属性所引用的图像。

:::

## 4. 使用 DataTransfer 对象

与拖放操作所触发的事件同时派发的对象是 `DragEvent`，它派生于 `MouseEvent`。`DragEvent` 对象定义了 `Event` 与 `MouseEvent` 对象的所有功能，并额外增加了 `dataTransfer` 属性。

我们可以用 `DataTransfer` 对象从被拖动元素传输任意数据到释放区元素上。`DataTransfer` 对象定义的属性和方法如下表所示。

|            名 称            |         说 明          |   返 回    |
| :-------------------------: | :--------------------: | :--------: |
|           `types`           |     返回的数据格式     | 字符串数组 |
|     `getData(<format>)`     |   返回指定格式的数据   |   字符串   |
| `setData(<format>, <data>)` |   设定指定格式的数据   |   `void`   |
|    `clearData(<format>)`    |   移除指定格式的数据   |   `void`   |
|           `files`           | 返回已被拖动文件的列表 | `FileList` |

在上一个例子里，我们克隆了元素本身。但 `DataTransfer` 对象允许我们使用一种更为复杂的方式。我们能做的第一件事是用 `DataTransfer` 对象从被拖动元素传输数据到释放区。

```javascript
src.ondragstart = e => {
    e.dataTransfer.setData("Text", e.target.id); // 设置要传递的数据
    e.target.classList.add("dragged");
}

target.ondrop = e => {
    let draggedId = e.dataTransfer.getData("Text"); // 获取传递的数据
    let newElement = document.getElementById(draggedId).cloneNode(false);
    target.innerHTML = "";
    target.appendChild(newElement);
    e.preventDefault();
};
```


> **`setData()` 方法第一个参数只支持两个值：`Text` 和 `Url`，但是只有 `Text` 获得了浏览器的可靠支持。**


:::tip

你可能会觉得奇怪：为什么这种方式比使用全局变量更好？答案是它能跨浏览器工作。我这么说的意思不是指跨同一个浏览器里的窗口或标签页，而是横跨不同类型的浏览器。这意味着我可以从 Chrome 浏览器的文档里拖动一个元素,然后在 Firefox 浏览器的文档里释放它，因为拖放功能的支持是集成在操作系统里的，有着相同的特性。如果你打开一个文本编辑器，输入单词`流川枫`，选中它然后拖动到浏览器的释放区，你就会看到`流川枫`的图像被显示出来，效果和我们拖动同一个文档里的某个 `img` 元素一样。

:::

## 5. 拖放文件

我们可以用 `DataTransfer` 来使用文件 API，例如：

::: normal-demo
```html
<div id="target">
    <p id="msg">Drop Files Here</p>
</div>
<table id="data"></table>
```

```css
#target, #data{
    float: left;
}
#target {
    border: medium double black;
    margin: 4px;
    height: 75px;
    width: 200px;
    text-align: center;
    display: table;
}
#target > p {
    display: table-cell;
    vertical-align: middle;
}
#data {
    margin: 4px;
    border: 1px solid;
    border-collapse: collapse;
}
th, td {
    padding: 4px;
    border: 1px solid;
}
```

```javascript
const target = document.querySelector("#target");
target.ondragenter = e => e.preventDefault();
target.ondragover = e => e.preventDefault();
target.ondrop = e => {
    // 获取拖放到指定区域的文件列表
    const files = e.dataTransfer.files;
    const tableElem = document.querySelector("#data");
    tableElem.innerHTML = " <tr><th>Name</th> <th> Type</th><th>Size</th></tr>";
    for(let file of files) {
        let row = "<tr><td>" + file.name + "</td><td>" +
            file.type + "</td><td>" +
            file.size + "字节</td></tr>";
        tableElem.innerHTML += row;
    }
    e.preventDefault();
};
```
:::



当用户把文件放入我们的释放区时，`DataTransfer` 对象的文件属性会返回一个 `Filelist` 对象。我们可以将它视为一个由 `File` 对象构成的数组，每个对象都代表用户释放的一个文件（用户可以选择多个文件然后一次性释放它们）。

| 名 称  |            说 明             | 返 回  |
| :----: | :--------------------------: | :----: |
| `name` |          获取文件名          | 字符串 |
| `type` | 获取文件类型，以MIME类型表示 | 字符串 |
| `size` |  获取文件大小（以字节计算）  |  数值  |

我们还可以结合拖放功能、文件 API 和 Ajax，让用户能从操作系统拖动想要在表单里提交的文件。释放区的创建和上面一样，当你拖放文件到指定区域时，文件流已经在内存中了，此时需要将其添加到要发送的数据中：

```javascript
// 假定之前拖放完成得到fileList，已经将表单的数据转为formData了
if (fileList || true) {
    for (let i = 0; i < filelist.length; i++) {
    formData. append("file" + i, filelist[i]);
}   
```

