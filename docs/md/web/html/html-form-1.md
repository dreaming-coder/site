# HTML - 基本表单元素
## 1. 制作基本表单

::: normal-demo
```html
<form>
    <input type="text"/>
    <button>提交</button>
</form>
```
:::

- `form` 

  告诉浏览器处理的是表单

- `input`

  输入标签，可以配置多种输入方式

- `button`

  按钮，可以设置单击的效果

## 2. 配置表单

### 2.1 配置表单的 action 属性

`action` 属性说明了提交表单时浏览器应该把从用户收集的数据发送到什么地方。如果不设置 `form` 元素的 `action` 属性，那么浏览器会将表单数据发到用以加载该 HTML 文档的 URL。这看似毫无意义，其实不然，不少 Web 应用系统开发框架都依赖于这个特性。如果为 `action` 属性指定的是一个相对 URL，那么该值会被嫁接在当前页的 URL 的后面（如果指定了  `base` 元素，那么按照 `base` 指定的  URL 进行拼接）。

### 2.2 配置 HTTP 方法属性

`method` 属性指定了用来将表单数据发送到服务器的 HTTP 方法。允许的值有 `get` 和 `post` 这两个，它们分别对应于 HTTP 的 GET 和 POST 方法。未设置 `method` 属性时使用的默认值为 `get`。

一般而言，GET 请求应该用于获取只读信息，而 POST 请求则应该用于会改变应用程序状态的各种操作。使用恰当的请求很重要。如果拿不准该用哪个，宁可谨慎一点，就用 POST 方法好了。

### 2.3 配置数据编码

`enctype` 属性指定了浏览器对发送给服务器的数据采用的编码方式。该属性可用的值有三个：

- **`application/x-www-form-urlencoded`**

  这是未设置 `enctype` 属性时使用的默认编码方式，它不能用来将文件上传到服务器，每项数据的名称和值都与 URL 采用同样的编码方案。

- **`multipart/form-data`**

  该编码方式用于将文件上传到服务器

- **`text/plain`**

  该编码方式因浏览器而异，慎用

### 2.4 控制表单的自动填充

自动填充是通过 `autocomplete` 属性来完成的，他有两种属性值：`on` 和 `off`，如果不设置这个属性，默认值为 `on`。`form` 和 `input` 都有这个属性，区别只在于作用域不同。

### 2.5 指定表单反馈信息的目标显示位置

默认情况下浏览器会用提交表单后服务器反馈的信息替换表单所在的原页面。这可以用 `form` 元素的 `target` 属性予以改变。该属性的工作机制与 `a` 元素的 `target` 属性一样。

### 2.6 设置表单名称

`name` 属性可以用来为表单设置一个独一无二的标识符，以便使用 DOM ( Document Object Model，文档对象模型)时区分各个表单。`name` 属 性与全局属性 `id` 不是一回事。后者在 HTML 文档中多半用于 CSS 选择器。

> 提交表单时其 `name` 属性值不会被发送给服务器，所以该属性的用处仅限于 DOM 中,不像 `input` 元素的同名属性那么重要。要是 `input` 元素不设置 `name` 属性，那么用户在其中输入的数据在提交表单时不会被发送给服务器。


## 3. 在表单中添加说明标签

::: normal-demo
```html
<form>
    <p><label for="name">姓名：<input id="name" type="text"></label></p>
    <p><label for="age">年龄：<input id="age" type="text"></label></p>
</form>
```
:::

此例为每个 `input` 元素都配了一个 `label` 元素。注意，例中为 `input` 元素设置了 `id` 属性，并将相关 `label` 元素的 `for` 属性设置为这个 `id` 值。这样做即可将 `input` 元素和 `label` 元素关联起来。

> 此例在表单中添加了一些`p`元素，以便简单地设置一下表单的布局。

## 4. 自动聚焦到某个 input 元素

设计者可以让表单显示出来的时候即聚焦于某个 `input`元 素，这样用户就能直接在其中输人数据而不必先动手选择它。`autofocus` 属性的用途 就是指定这种元素。

::: normal-demo
```html
<form>
    <p><label for="name">姓名：<input id="name" type="text" autofocus /></label></p>
</form>
```
:::

> `autofocus`属性只能用在一个`input`元素上。要是有几个元素都设置了这个属性，那么浏览器将会自动聚焦于其中的最后一个元素。


## 5. 禁用单个 input 元素

::: normal-demo
```html
<form>
    <p><label for="name">姓名：<input id="name" type="text" disabled /></label></p>
    <p><label for="age">年龄：<input id="age" type="text" disabled /></label></p>
</form>
```
:::

## 6. 对表单元素编组

::: normal-demo
```html
<form>
    <fieldset>
        <legend>学生</legend>
        <p><label for="name1">姓名1：<input id="name1" type="text" disabled /></label></p>
    	<p><label for="age1">年龄1：<input id="age1" type="text" disabled /></label></p>
    </fieldset>
    <br/>
    <fieldset disabled>
        <legend>老师</legend>
        <p><label for="name2">姓名2：<input id="name2" type="text" disabled /></label></p>
    	<p><label for="age2">年龄2：<input id="age2" type="text" disabled /></label></p>
    </fieldset>
</form>
```
:::

## 7.  使用 button 元素

`button` 元素其实比它的外表给人的感觉更灵活。该元素有三种用法，这些不同的操作模式通过具有三种值的 `type` 属性设定。

- `submit`

  表示按钮的用途是提交表单

- `reset`

  表示按钮的用途是重置表单

- `button`

  表示按钮没有具体语义

### 7.1 用 button元素提交表单

如果将 `button` 元素的 `type` 属性设置为 `submit`，那么按下该按钮会提交包含它的表单，这是未设置 `type` 属性的 `button `元素的默认行为。采用这种方法使用该元素时，它还有额外的一些属性可用。

<table class="ice-table">
	<caption>type 属性设置为 submit 时 button 元素的额外属性</caption>
    <thead>
    	<tr>
        	<th style="width:200px;">属 性</th>
            <th style="width:600px;">说 明</th>
        </tr>
    </thead>
    <tbody>
    	<tr>
        	<td>form</td>
            <td class="left">指定按钮关联的表单</td>
        </tr>
        <tr>
        	<td>formaction</td>
            <td class="left">覆盖 form 元素的 action 属性，另行指定表单将要提交到的 URL</td>
        </tr>
        <tr>
        	<td>formenctype</td>
            <td class="left">覆盖 form元素的 enctype 属性，另行指定表单的编码方式</td>
        </tr>
        <tr>
        	<td>formmethod</td>
            <td class="left">覆盖 form 元素的 method 属性</td>
        </tr>
        <tr>
        	<td>formtarget</td>
            <td class="left">覆盖 form 元素的 target 属性</td>
        </tr>
        <tr>
        	<td>formnovalidate</td>
            <td class="left">覆盖 form 元素的 novalidate 属性，表明是否应执行客户端数据有效性检查</td>
        </tr>
    </tbody>
</table>

:::tip

这些属性主要是用来覆盖或补充 `form` 元素上的设置，指定表单提交的 URL、使用的 HTTP 方法、编码方式、表单反馈信息的显示地点，以及控制客户端数据检查。它们是 HTML 5 中新增的属性。

:::

### 7.2 用 button 元素重置表单

如果将 `button` 元素的 `type` 属性设置为 `reset`，那么按下按钮会将表单中所有 `input` 元素重置为初始状态。这样使用该元素时，没有额外的属性可用。

### 7.3 把 button 作为一般元素使用

如果将 `button` 元素的 `type` 属性设置为 `button`，那么该 `button` 元素就仅仅是一个按钮。 它没有特别的含义，在按下时也不会做任何事情。

## 8. 使用表单外的元素

在 HTML 4 中，`input`、 `button` 和其他与表单相关的元素必须放在 `form` 元素中。在 HTML 5 中，这条限制不复存在，现在可以将这类元素与文档中任何地方的表单挂钩。`input`、`button` 元素以及其他与表单相关的元素都定义了一一个 `form` 属性，该属性正是用于这个目的。要将某个这类元素与并非其祖先元素的 `form` 元素挂钩，只需将其 `form` 属性设置为相关 `form` 元素的 `id` 属性值即可。