# HTML - 文档结构
一个最简单的 HTML 文档如下所示：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>
        Hello World!
    </p>
</body>
</html>
```

下面就此介绍 HTML 文档的基本构成。

## 1. 构筑基本的文档结构

- **`DOCTYPE` 元素**

  每一个 HTML 文档都必须以 `DOCTYPE` 元素开头，浏览器据此知道自己将要处理的是 HTML 内容。

- **`html` 元素**

  `html` 更恰当的名称是根元素，它包裹的是文档中 HTML 的内容。

- **`head` 元素**

  `head` 元素包含着文档的元数据。在 HTML 中，元数据向浏览器提供了有关文档内容和标记的信息，此外还可以包含脚本和对外部资源(比如 CSS 样式表)的引用。

- **`body` 元素**

  HTML 文档的元数据和文档信息包装在 `head` 元素中，文档的内容则包装在 `body` 元素中。`body` 元素总是紧跟在 `head` 元素之后，它是 `htm1` 元素的第二个子元素。

## 2. 用元数据元素说明文档



> - 元数据元素可以用来提供关于 HTML 文档的信息。它们本身不是文档内容，但提供了关于后面的文档内容的信息。
> - 元数据元素应放在 `head` 元素中。



### 2.1 title——设置文档标题

```html
<title>网页标题</title>
```

`title` 元素的作用是设置文档的标题或名称。浏览器通常将该元素的内容显示在其窗口顶部或标签页的标签上。



> 每个 HTML 文档都应该有且只有一个 `title` 元素，其开始标签和结束标签之间的文字在用户眼里应有实际意义。至少用户应能据此区分各个浏览器窗口或浏览器的各个标签页，并且知道哪个显示的才是你的 Web 应用系统。



### 2.2 base——设置相对 URL 的解析基准

```html
<base href="https://www.baidu.com" target="_blank"/>
```

`base` 元素可用来设置一个基准 URL，让 HTML 文档中的相对链接在此基础上进行解析。相对链接省略了 URL 中的协议、主机和端口部分，需要根据别的 URL (要么是 `base` 元素中指定的 URL，要么是用以加载当前文档的 URL)得出其完整形式。`base` 元素还能设定链接在用户点击时的打开方式，以及提交表单时浏览器如何反应。


> 如果不指定 `base` 元素，则默认把当前 URL 当作一个基准 URL。


- **`href` 属性**

  `href` 属性指定了解析文档此后部分中的相对 URL 要用到的基准 URL。

- **`target` 属性**

  `target` 属性告诉浏览器如何打开一个链接，如本页、或者新打开一个标签页等。

### 2.3 meta——用元数据说明文档

`meta` 元素可以用来定义文档的各种元数据。它有多种不同用法，而且一个 HTML 文档中可以包含多个 `meta` 元素。

下面介绍几种 `meta` 元素的用法。注意每个 `meta` 元素只能用于一种用途。如果在这些特性中想要使用的不止一个，那就应该在 `head` 元素中添加多个 `meta` 元素。

#### 2.3.1 指定名/值元数据对

`meta` 元素的第一个用途是用名/值对定义元数据，为此需要用到其 `name` 和 `content` 属性。

```html
<head>
    <title>Example</title>
    <meta name="author" content= "ice"/>
    <meta name="description" content="A simple example"/>
</head>
```

`meta` 元素使用的预定义的元数据类型如下所示：

<table class="ice-table">
	<caption>供 meta 元素使用的预定义元数据类型</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">元数据名称</th>
            <th style="width:400px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>application name</td>
            <td>当前页面所属web应用系统的名称</td>
        </tr>
        <tr>
        	<td>author</td>
            <td>当前页的作者名</td>
        </tr>
        <tr>
        	<td>description</td>
            <td>当前页面的说明</td>
        </tr>
        <tr>
        	<td>generator</td>
            <td>用来生成HTML的软件名称</td>
        </tr>
        <tr>
        	<td>keywords</td>
            <td>一批以逗号分开的字符串，用来描述页面内容</td>
        </tr>
    </tbody>
</table>


#### 2.3.2 声明字符编码

```html
<head>
    <title>Example</title>
    <meta charset="utf-8"/>
</head>
```

#### 2.3.3 模拟 HTTP 标头字段

`meta` 元素的最后一种 用途是改写 HTTP (超文本传输协议)标头字段的值。服务器和浏览器之间传输 HTML 数据时一般用的就是 HTTP。

```html
<head>
    <title> Example</title>
    <meta http-equiv="refresh" content="5" />
</head>
```

`http-equiv` 属性的用途是指定所要模拟的标头字段名称，字段值则由 `content` 属性指定。此例将标头字段 `refresh` 的值设置为 `5`,其作用是让浏览器每隔 `5` 秒就再次载入页面。

<table class="ice-table">
	<caption>meta 元素的 http-equiv 属性允许使用的值</caption>
    <thead>
    	<tr>
        	<th style="width:200px">属性值</th>
            <th style="width:50	0px">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>refresh</td>
            <td class="left">
            	以秒为单位指定一个时间间隔，在此时间过去之后将从服务器重新载人当前页面。也可以另行指定一个URL让浏览器载人。如<br>
<code>&lt;meta http-equiv="refresh" content="5; https://www. baidu.com"/&gt;</code>
            </td>
        </tr>
        <tr>
        	<td>default-style</td>
            <td  class="left">指定页面优先使用的样式表。对应的 content 属性值应与同一文档中某个 style 元素或 link 元素的 title 属性值相同</td>
        </tr>
        <tr>
        	<td>content-type</td>
            <td class="left">
                这是另一种声明HTML页面所用字符编码的方法。如 <code>&lt;meta http-equiv="content-type" content= "text/html charset=UTF-8"/&gt;</code>
			</td>
        </tr>
    </tbody>
</table>


### 2.4 style——定义 CSS 样式

`style` 元素可用来定义 HTML 文档内嵌的 CSS 样式( `link` 元素则是用来导人外部样式表中的样式)。

```html
<style type="text/css">
    a {
        background-color: grey;
        color: white;
        padding: 0. 5em;
    }
</sty1e>
```

`style`  元素可以出现在 HTML 文档中的各个部分。一个文档可包含多个 `style` 元素，因此不必把所有样式定义都塞进 `head` 部分。在使用模板引擎生成页面的情况下这个特性很有帮助，因为这样一来就可以用页面特有的样式为模板定义的样式提供补充。

- **指定样式类型**

`type` 属性可以用来将所定义的样式类型告诉浏览器。但是浏览器支持的样式机制只有 CSS 一种，所以这个属性的值总是 `text/css`。

- **指定样式作用范围**

如果 `style` 元素中有 `scoped` 属性存在，那么其中定义的样式只作用于该元素的父元素及所有兄弟元素。要是不用 `scoped` 属性的话，在 HTML 文档中任何地方用 `style` 元素定义的样式都将作用于整个文档。

- **指定样式适用的媒体**

`media` 属性可用来表明文档在什么情况下应该使用该元素中定义的样式，例如`media="screen"` 表示屏幕显示的时候，`media="print"` 表示打印时候的样式。

<table class="ice-table">
	<caption>供 style 元素的 media 属性用的规定设备值</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">设 备</th>
            <th style="width:400px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>all</td>
            <td class="left">将样式用于所有设备（默认值）</td>
        </tr>
        <tr>
        	<td>aural</td>
            <td class="left">将样式用于语音合成器</td>
        </tr>
        <tr>
        	<td>braille</td>
            <td class="left">将样式用于盲文设备</td>
        </tr>
        <tr>
        	<td>handled</td>
            <td class="left">将样式用于手持设备</td>
        </tr>
        <tr>
        	<td>projection</td>
            <td class="left">将样式用于投影机</td>
        </tr>
        <tr>
        	<td>print</td>
            <td class="left">将样式用于打印预览或打印页面时</td>
        </tr>
        <tr>
        	<td>screen</td>
            <td class="left">将样式用于计算机显示屏幕</td>
        </tr>
        <tr>
        	<td>tty</td>
            <td class="left">将样式用于电传打字机之类的等宽设备</td>
        </tr>
        <tr>
        	<td>tv</td>
            <td class="left">将样式用于电视机</td>
        </tr>
    </tbody>
</table>


### 2.5 link——指定外部资源

`link` 元素可用来在 HTML 文档和外部资源( CSS 样式表是最典型的情况)之间建立联系。`link` 元素定义了 6 个局部属性，如下表所示。这些属性中最重要的是 `rel`，它说明了 HTML 页与 `link` 元素所关联资源的关系类型。

<table class="ice-table">
	<caption>link 元素的局部属性</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">属 性</th>
            <th style="width:400px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>href</td>
            <td class="left">指定 link 元素指向的 URL</td>
        </tr>
        <tr>
        	<td>hreflang</td>
            <td class="left">说明所关联资源使用的语言</td>
        </tr>
        <tr>
        	<td>media</td>
            <td class="left">说明所关联的内容用于哪种设备</td>
        </tr>
        <tr>
        	<td>rel</td>
            <td class="left">说明文档与所关联资源的关联类型</td>
        </tr>
        <tr>
        	<td>sizes</td>
            <td class="left">指定图标的大小</td>
        </tr>
        <tr>
        	<td>type</td>
            <td class="left">指定所关联资源的 MIME 类型，如 text/css、image/x-icon</td>
        </tr>
    </tbody>
</table>


- **载入样式表**

```html
<link rel="stylesheet" type="text/css" href="style.css">
```

可以使用多个 `link` 元素载入多个外部资源。使用外部样式表的好处在于可以让多个文档使用同一套样式而不必将这些样式复制到每一个文档中。

- **为页面定义网站标志**

```html
<link rel="shortcut icon" href="favicon. ico" type= "image/x- icon" />
```

- **预先获取资源**

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>Example</title>
        <base href="http://titan/listings/"/>
        <meta name="author" content= "Adam Freeman"/>
        <meta name="description" content= "A simple example"/>
        <link re1="stylesheet" type="text/css" href="styles.css"/>
        <link rel="shortcut icon" href="favicon.ico" type="image/x- icon" />
        <link rel="prefetch" href="/page2.html"/>
    </head>
    <body>
        <p>
        	I like <code id=" applecode" >apples</code> and oranges .
        </p>
        <a href="http://apress.com" >Visit Apress. com</a>
        <a href="page2.html">Page 2</a>
    </body>
</html>
```

此例将 `re1` 属性设置为 `prefetch`，并且要求载入 HTML 页面 page2.html，为用户点击某个链接以执行其他需要这个页面的操作做好准备。

## 3. 使用脚本元素

`script` 元素可以用来在页面中加入脚本，方式有在文档中定义脚本和引用外部文件中的脚本两种。

<table class="ice-table">
	<caption>script 元素的局部属性</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">属 性</th>
            <th style="width:600px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>type</td>
            <td class="left">表示所引用或定义的脚本的类型，对于 JavaScript 脚本这个属性可以省略</td>
        </tr>
        <tr>
        	<td>src</td>
            <td class="left">指定外部脚本的 URL</td>
        </tr>
        <tr>
        	<td>defer</td>
            <td rowspan="2" class="left">设定脚本的执行方式，这两个属性只能与 src 属性一同使用</td>
        </tr>
        <tr>
        	<td>async</td>
        </tr>
        <tr>
        	<td>charset</td>
            <td class="left">说明外部脚本文件所用字符编码，该属性只能与 src 属性一同使用</td>
        </tr>
    </tbody>
</table>

- **定义文档内嵌脚本**

```html
<script>
	// JS 脚本
</script>
```

- **载入外部脚本库**

```html
<script src="path/to/file.js"></script>
```

:::warning

设置了 **`src`** 属性的 **`script`** 标签不能有任何内容。

:::

- **推迟脚本的执行**

`defer` 属性告诉浏览器要等页面载人和解析完毕之后才能执行脚本。

```html
<script defer src="path/to/file.js"></script>
```

> HTML 页面没加载完毕之前，JavaScript 脚本可能找不到需要处理的元素。


- **异步执行脚本**

默认是顺序执行脚本，但有些时候，比如加载图片，可以异步加载，其他的该干嘛干嘛。

```html
<script async src="path/to/file.js"></script>
```

除了上述 `script` 以外，还有一种 `noscript` 标签，它用于在浏览器禁用 JavaScript 时，显示其内容。

:::tip

注意，常规的 HTML 标签会正常显示。

:::

除此之外还有一种选择是在浏览器不支持或禁用 JavaScript 时将其引至另一个 URL。这需要在 `noscript` 元素中加入一个 `meta` 元素。

```html
<!DOCTYPE HTML>
<html>
    <head>
        <title>Example</title>
        <script defer srC=" simple2. js' "></script>
        <noscript>
        	<meta http-equiv= "refresh" content="0; https://www.baidu.com"/>
        </noscript>
    </head>
    <body>
    <p>
    	I like <code id="applecode">apples</code> and oranges.
    </p>
	<a href="https://www.baidu.com">Visit Baidu.com</a>
    </body>
</html>
```

这段代码会在不支持 JavaScript 或禁用了 JavaScript 的浏览器试图载入页面时将用户引至  [www.baidu.com](https://www.baidu.com) 网站。