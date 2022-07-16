# HTML - 嵌入内容
## 1. 嵌入图像

### 1.1 img 元素

::: normal-demo
```html
<img id="logo" src="https://v2.vuepress.vuejs.org/images/hero.png" alt="VuePress Logo" width="200px" height="200px"/>
```
:::



### 1.2 在超链接里嵌入图像

```html
<a><img src="" /></a>
```

把 `img` 元素嵌入到 `a` 元素里即可使点击图片就能跳转链接。

### 1.3 客户端分区响应图

我们可以创建一个客户端分区响应图，通过点击某张图像上的不同区域让浏览器导航到不同的 URL 上。这一过程不需要通过服务器引导，因此需要使用元素来定义图像上的各个区域以及它们所代表的行为。客户端分区响应图的关键元素是 `map`。`map` 元素包含一个或多个 `area` 元素，它们各自代表了图像上可被点击的一块区域。

`area` 元素的属性可以被分为两类，第一类处理的是 `area` 所代表的图像区域被用户点击后浏览器会导航到的 URL。

![](/imgs/web/html/html-embed-1.webp)

第二类则包含了更有意思的属性：`shape` 和 `coords` 属性。可以用这些属性来标明用户可以点击的各个图像区域。`shape ` 和 `coords` 属性是共同起作用的。`coords` 属性的意思根据 `shape` 属性的值而定。

![](/imgs/web/html/html-embed-2.webp)

例如：

```html
<p>
    <img src="pic.png" alt="替代图像" usemap="#mymap">
</p>
<map name= "mymap" >
    <area href="https://www.baidu.com" shape="rect" coords="3,5, 68,62" alt="Swimming"/>
    <area href="https://www.xbiquge.la" shape= "rect" coords=" 70,5,130,62" alt="Running"/>
    <area href="https://e-thunder.blog.csdn.net" shape="default" alt=" default"/>
</map>
```

注意给 `img` 元素添加的 `usemap` 属性。这个属性的值必须是一个**井号串名称引用**，意思是一个由 `#` 字符开头的字符串。这样你就能把 `map` 元素与图像关联起来。

## 2. 嵌入数字表现形式

### 2.1 显示进度

`progress` 元素可以用来表现某项任务逐渐完成的过程。`value` 属性定义了当前的进度，它位于 `0` 和 `max` 属性的值所构成的范围之间。当 `max` 属 性被省略时，范围是 `0` 至 `1`。用浮点数来表示进度，比如 `0.3` 代表 `30%`。

:::normal-demo
```html
<p><label for="my-progress">范围：<progress id="my-progress" value="85" max="100"></progress></p>
<p><label for="val">数值：<input id="val" disabled size="13"></label></p>
```
```javascript
let bar = document.querySelector('#my-progress');
var text = document.querySelector('#val');
text.value = bar.value;
bar.addEventListener('change',function (evt){
    text.value = bar.value;
},false);
```
:::


### 2.2 显示范围里的值

`meter` 元素显示了某个范围内所有可能值中的一个。min和max属性设定了可能值所处范围的边界，它们可以用浮点数来表示。`meter` 元素的显示可以分为三个部分：过低、过高和最佳。`low` 属性设置了一个值，在它之下的所有值都被认为是过低； `high` 属性设置了一个值，在它之上的所有值都被认为是过高；`optimum` 属性则指定 了“最佳”的值。

::: normal-demo
```html
<p><label for="my-meter-1">范围：<meter id="my-meter-1" value="5" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-1">数值：<input id="val-1" disabled size="13"></label></p>
<hr>
<p><label for="my-meter-2">范围：<meter id="my-meter-2" value="20" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-2">数值：<input id="val-2" disabled size="13"></label></p>
<hr>
<p><label for="my-meter-3">范围：<meter id="my-meter-3" value="50" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-3">数值：<input id="val-3" disabled size="13"></label></p>
<hr>
<p><label for="my-meter-4">范围：<meter id="my-meter-4" value="60" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-4">数值：<input id="val-4" disabled size="13"></label></p>
<hr>
<p><label for="my-meter-5">范围：<meter id="my-meter-5" value="90" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-5">数值：<input id="val-5" disabled size="13"></label></p>
<hr>
<p><label for="my-meter-6">范围：<meter id="my-meter-6" value="120" min="10" max="100" low="40" high="80" optimum="60" ></meter></progress></p>
<p><label for="val-6">数值：<input id="val-6" disabled size="13"></label></p>
<hr>
```
```javascript
let bar1 = document.querySelector('#my-meter-1');
let bar2 = document.querySelector('#my-meter-2');
let bar3 = document.querySelector('#my-meter-3');
let bar4 = document.querySelector('#my-meter-4');
let bar5 = document.querySelector('#my-meter-5');
let bar6 = document.querySelector('#my-meter-6');
var text1 = document.querySelector('#val-1');
var text2 = document.querySelector('#val-2');
var text3 = document.querySelector('#val-3');
var text4 = document.querySelector('#val-4');
var text5 = document.querySelector('#val-5');
var text6 = document.querySelector('#val-6');
text1.value = bar1.value;
text2.value = bar2.value;
text3.value = bar3.value;
text4.value = bar4.value;
text5.value = bar5.value;
text6.value = bar6.value;
bar1.addEventListener('change',function (evt){
    text1.value = bar1.value;
},false);
bar2.addEventListener('change',function (evt){
    text2.value = bar2.value;
},false);
bar3.addEventListener('change',function (evt){
    text3.value = bar3.value;
},false);
bar4.addEventListener('change',function (evt){
    text4.value = bar4.value;
},false);
bar5.addEventListener('change',function (evt){
    text5.value = bar5.value;
},false);
bar6.addEventListener('change',function (evt){
    text6.value = bar6.value;
},false);
```
:::
