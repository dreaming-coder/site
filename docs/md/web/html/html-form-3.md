# HTML - 其他表单元素
## 1. 生成下拉列表

::: normal-demo
```html
<form>
    请选择省份：
    <select name="province" id="province" >
        <option value="2">北京市</option>
        <option value="1" selected>江苏省</option>
        <option value="3" disabled>上海市</option>
        <option value="4">广东省</option>
    </select>
</form>
```
:::


除此之外，还可以使用 `multiple` 属性进行多选

::: normal-demo
```html
<form>
    请选择想要的水果：
    <select name="province" id="province" multiple>
        <option value="1" selected>香蕉</option>
        <option value="2">苹果</option>
        <option value="3">橘子</option>
        <option value="4">西瓜</option>
    </select>
</form>
```
:::


还可以使用 `optgroup` 对 `option` 进行分组：

::: normal-demo
```html
<form>
    请选择省市：
    <select name="province" id="province" >
        <optgroup label="江苏省">
            <option value="1">南京市</option>
            <option value="2">无锡市</option>
            <option value="3">徐州市</option>
        </optgroup>
        <optgroup label="广东省">
            <option value="4">广州市</option>
            <option value="5">深圳市</option>
            <option value="6">佛山市</option>
        </optgroup>
    </select>
</form>
```
:::

## 2. 输入多行文字

`textarea` 元素生成的是多行文本框，用户可以在里面输人多行文字。

::: normal-demo
```html
<form>
    <textarea name="content" id="content" cols="30" rows="5" wrap="hard">
    	多行文本
    </textarea>
</form>
```
:::


:::warning

`wrap` 属性用来控制当输入数据超过设定的列数自动换行时是否自动插入换行符，`hard` 表示自动插入换行符，`soft` 表示不插入(默认值)。

:::

## 3. 表示计算结果

::: normal-demo
```html
<form id="calculator" onsubmit="return false" oninput="res.value = a.valueAsNumber * b.valueAsNumber">
    <fieldset>
        <legend>计算器</legend>
        <input type="number" placeholder="Quantity" id="a" name="a"/> x
        <input type="number" placeholder="Price" id="b" name="b"/> =
        <output name="res" form="calculator" for="a b"></output>
    </fieldset>
</form>
```
:::



:::tip

- `form` 指向关联的 `form` 表单
- `for` 定义输出域相关的一个或多个元素

:::

