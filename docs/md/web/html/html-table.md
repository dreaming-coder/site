# HTML - 表格
## 1. 基本表格结构

::: normal-demo

```html
<table>
        <caption>This is a HTML table</caption>
        <colgroup>
            <col span="2" class="c1">
            <col span="3" class="c2">
            <col span="1" class="c3">
        </colgroup>
        <thead>
            <tr>
                <th></th>
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>A1</td>
                <td>B1</td>
                <td>C1</td>
                <td>D1</td>
                <td>E1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>A2</td>
                <td>B2</td>
                <td>C2</td>
                <td>D2</td>
                <td>E2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>A3</td>
                <td>B3</td>
                <td>C3</td>
                <td>D3</td>
                <td>E3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td rowspan="2">Result</td>
                <td rowspan="2">哼哼</td>
                <td colspan="3">++++++</td>
                <td rowspan="2">哈哈</td>
            </tr>
            <tr>
                <td colspan="3">++++++</td>
            </tr>
        </tfoot>
    </table>
```

```css
table {
    margin: auto;
    border-collapse: collapse;
    text-align: center;
}

table>caption {
    height: 30px;
}

tr,
th,
td {
    border: 1px solid;
}

th,
td {
    width: 120px;
    height: 40px;
}

.c1 {
    background-color: aqua;
}

.c2 {
    background-color: chartreuse;
}

.c3 {
    background-color: dodgerblue;
}
```

:::


:::tip

这里为了便于识别，加了些样式，暂时不用管。

:::

## 2. 处理列

HTML 中的表格是基于行的。单元格的定义都要放在 `tr` 元素中，而表格则是一行一行地组建出来的。因此对列应用样式有点不方便，对于包含不规则单元格的表格更是如此。这个问题的解决办法是使用 `colgroup` 和 `col` 元素。`colgroup` 代表一组列。 

例如一个 4 × 5 的表格，有 4 行 5 列，我们可以通过 `colgroup` 来对列进行分组。

```html
<colgroup span="2" ></colgroup>  <!--前两列-->
<colgroup span="2" ></colgroup>  <!--三四列-->
<colgroup span="1" ></colgroup>  <!--第五列-->
```

或者有一种等价方式：

```html
<colgroup>
    <col span="2" />
    <col span="2" />
    <col span="1" />
</colgroup>
```

:::warning

不规则单元格计入其起始列。

:::

