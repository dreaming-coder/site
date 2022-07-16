# HTML - 文本标签
## 1. 超链接

超链接是 HTML 中的关键特性，是用户赖以在内容中(在同一文档中和不同页面间)导航的基础。超链接用 `a` 元素生成。`a` 元素定义了 6 个局部属性，如下表所示，其中最重要的是 `href`。

<table class="ice-table">
	<caption>a 元素的局部属性</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">属 性</th>
            <th style="width:400px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>href</td>
            <td>指定 a 元素所指 URL</td>
        </tr>
        <tr>
        	<td>hreflang</td>
            <td>说明所指链接资源使用的语言</td>
        </tr>
        <tr>
        	<td>media</td>
            <td>说明所关联的内容用于哪种设备</td>
        </tr>
        <tr>
        	<td>rel</td>
            <td>说明文档与所关联资源的关联类型</td>
        </tr>
        <tr>
        	<td>target</td>
            <td>指定用以打开链接资源的浏览环境</td>
        </tr>
        <tr>
        	<td>type</td>
            <td>说明所链接资源的 MIME 类型（比如 text/html）</td>
        </tr>
    </tbody>
</table>

- **生成指向外部的超链接**

```html
<a href="https://www.baidu.com">百度一下，你就知道</a>
```

- **使用相对 URL**

如果 `href` 属性值不是以类似 `http://` 这样的已知协议开头，那么浏览器会将该超链接视为相对引用。默认情况下，浏览器会假定目标资源与当前文档位于同一位置。

```html
<!-- 假定当前页面时 xxx.top，则该链接跳转为 xxx.top/test -->
<a href="test">相对链接</a> 
```

> 基准地址可以通过 `<base>` 元素来改变。

- **生成内部超链接——锚点**

首先需要对想要跳转位置的元素设置 `id` 属性，然后 `a` 元素的 `href` 属性填写 `#id` 即可。

```html
<h1 id="chapter">一级标题</h1>
<h2 id="section">二级标题</h2>
<a href="#chapter">跳转到一级标题</a>
```


>如果浏览器找不到具有指定 `id` 属性值的元素，那么它会再进行一次查找，试图找到一个 `name` 属性值与其匹配的元素。

- **设置浏览环境**

<table class="ice-table">
	<caption>供 a 元素的 target 属性使用的值</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">属性值</th>
            <th style="width:400px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>_blank</td>
            <td>在新窗口或标签页中打开文档</td>
        </tr>
        <tr>
        	<td>_parent</td>
            <td>在父窗框组（frameset）打开文档</td>
        </tr>
        <tr>
        	<td>_self</td>
            <td>在当前窗口中打开文档（这是默认行为）</td>
        </tr>
        <tr>
        	<td>_top</td>
            <td>在顶层窗口打开文档</td>
        </tr>
        <tr>
        	<td>&lt;frame>&gt;</td>
            <td>在指定窗框中打开文档</td>
        </tr>
    </tbody>
</table>

## 2. 文字元素

- **表示关键词和产品名称**

```html
<b>关键词</b>
```

- **表示强调**

```html
<em>强调</em>
```

- **表示外文词语或科技术语**

```html
<i>Deep Learning</i>
```

- **表示不准确或校正**

```html
<s>以前的删除线格式，现在用做语义</s>
```

- **表示重要的文字**

```html
<strong>这一句很重要</strong>
```

- **为文字添加下划线**

```html
<u>尽量避免用u元素，会和超链接搞混</u>
```

- **添加小号字体内容**

```html
<small>小号字</small>
```

- **添加上标与下标**

```html
<sub>下标</sub>
<sup>上标</sup>
```

## 3. 换行

有两个元素可以用来换行：`br` 和 `wbr` 元素。

- **强制换行**

```html
第一行内容<br/>第二行内容
```

:::warning

`br` 虽然强制换行，但是换行符也是内容的一部分，不可用来分节。

:::

- **指明可以安全换行的建议位置**

`wbr` 元素是 HTML 5 中新增的，用来表示长度超过当前浏览器窗口的内容适合在此换行，究竟换不换行由浏览器决定。`wbr` 元素只不过是对恰当的换行位置的建议而已。

```html
在这里建议换行<wbr>实际换不换行看浏览器
```

## 4. 表示输入和输出

有四个元素暴露了 HTML 的极客起源。它们代表的是计算机的输人和输出。它们都没有定义局部属性，都不是 HTML 5 中新增的，在 HTML 5 中也没有任何改变。

- **`code`**

  表示计算机中的代码片段

- **`var`**

  在编程语境中表示变量

- **`samp`**

  表示程序和计算机系统的输出

- **`kbd`**

  表示用户输入

## 5. 标题引用、引文、定义和缩写

- **表示缩写**

```html
<abbr>缩写</abbr>
```

- **定义术语**

```html
<dfn>专有名词</dfn>
```

- **引用来自他出的内容**

```html
<q cite="https://www.baidu.com">海内存知己，天涯若比邻</q>
```

- **引用其他作品的标题**

```html
<cite>安徒生童话</cite>
```

## 6. 其他文本元素

- **表示一段一般性的内容**

span 元素本身没有任何含义，它可以用来把一些全局属性应用到一段内容上

```html
这是<span>一般性内容</span>！
```

- **突出显示文本**

```html
<mark>闪亮登场</mark>
```

- **表示添加和删除的内容**

```html
<ins>添加的内容</ins>
<del>删除的内容</del>
```

