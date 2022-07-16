# CSS - Flex 布局

> 本文转载自 [Flex 布局语法教程](https://www.runoob.com/w3cnote/flex-grammar.html)

## 1. 基本概念

Flex 是 Flexible Box 的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 Flex 布局。

```css
.box {
  display: flex;
}
```

行内元素也可以使用 Flex 布局。

```css
.box {
  display: inline-flex;
}
```

:::warning

注意，设为 Flex 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

:::

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称”项目”。

![](/imgs/web/css/flex-1.png)

> - 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。
>
> - 项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

下面以 div 元素作为容器和项目进行示例，作为项目的 div 元素的部分样式如下所示：

:::normal-demo

```html
<div class=example-item></div>
```

```css
.example-item {
    width: 50px;
    height: 50px;
    border: 1px solid;
    background-color: #42b983;
}
```

:::

## 2. 容器的属性

### 2.1 flex-direction

`flex-direction` 属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

![](/imgs/web/css/flex-2.png)

它可能有 4 个值：

> - `row`（默认值）：主轴为水平方向，起点在左端。{.design-item }
> - `row-reverse`：主轴为水平方向，起点在右端。{.design-item }
> - `column`：主轴为垂直方向，起点在上沿。{.design-item }
> - `column-reverse`：主轴为垂直方向，起点在下沿。{.design-item }

:::normal-demo

```html
<div class="direction-1">
    <div class="example-item"></div>
    <div class="example-item"></div>
    <div class="example-item"></div>
    <div class="example-item"></div>
</div>
<div class="direction-2">
    <div class="example-item"></div>
    <div class="example-item"></div>
    <div class="example-item"></div>
    <div class="example-item"></div>
</div>
```

```css
.direction-1{
    float: left;
    margin-left: 20%;	
    display: flex;
    flex-direction: row;
    width: 300px;
    height: 70px;
    border: 1px solid;
    background-color: #17deeb;
}
.direction-2{	
    float: right;
    margin-right: 20%;
    display: flex;
    flex-direction: column;
    width: 70px;
    height: 300px;
    border: 1px solid;
    background-color: #17deeb;
}
.example-item {
    width: 50px;
    height: 50px;
    border: 1px solid;
    background-color: #42b983;
}
```

:::

### 2.2 flex-wrap

默认情况下，项目都排在一条线（又称”轴线”）上。``flex-wrap` 属性定义，如果一条轴线排不下，如何换行。

它可能取三个值。

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

（1）`nowrap`（默认）：不换行。

![](/imgs/web/css/flex-3.png)

（2）`wrap`：换行，第一行在上方。

![](/imgs/web/css/flex-4.jpg)

（3）`wrap-reverse`：换行，第一行在下方。

![](/imgs/web/css/flex-5.jpg)

### 2.3 flex-flow

`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为 `row nowrap`。

```css
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

### 2.4 justify-content

`justify-content` 属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

![](/imgs/web/css/flex-6.png)

它可能取 5 个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

> - `flex-start`（默认值）：左对齐{.design-item }
> - `flex-end`：右对齐{.design-item }
> - `center`： 居中{.design-item }
> - `space-between`：两端对齐，项目之间的间隔都相等。{.design-item }
> - `space-around`：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。{.design-item }

### 2.5 align-items

`align-items` 属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![](/imgs/web/css/flex-7.png)

它可能取 5 个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

> - `flex-start`：交叉轴的起点对齐。{.design-item }
>
> - `flex-end`：交叉轴的终点对齐。{.design-item }
> - `center`：交叉轴的中点对齐。{.design-item }
> - `baseline`：项目的第一行文字的基线对齐。{.design-item }
> - `stretch`（默认值）：如果项目未设置高度或设为 `auto`，将占满整个容器的高度。{.design-item }

### 2.6 align-content

`align-content` 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

> 这里针对的是出现换行的情况。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![](/imgs/web/css/flex-8.png)

该属性可能取 6 个值。

> - `flex-start`：与交叉轴的起点对齐。{.design-item }
> - `flex-end`：与交叉轴的终点对齐。{.design-item }
> - `center`：与交叉轴的中点对齐。{.design-item }
> - `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。{.design-item }
> - `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。{.design-item }
> - `stretch`（默认值）：轴线占满整个交叉轴。{.design-item }

## 3. 项目的属性

### 3.1 order

`order` 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

```css
.item {
  order: <integer>;
}
```

![](/imgs/web/css/flex-9.png)

### 3.2 flex-grow

`flex-grow` 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![](/imgs/web/css/flex-10.png)

如果所有项目的 `flex-grow` 属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为 2，其他项目都为 1，则前者占据的剩余空间将比其他项多一倍。

### 3.3 flex-shrink

`flex-shrink` 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![](/imgs/web/css/flex-11.jpg)

如果所有项目的 `flex-shrink` 属性都为 1，当空间不足时，都将等比例缩小。如果一个项目的 `flex-shrink` 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。

负值对该属性无效。

### 3.4 flex-basis

`flex-basis` 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟 `width` 或 `height` 属性一样的值（比如 350px），则项目将占据固定空间。

### 3.5 flex

`flex` 属性是 `flex-grow`, `flex-shrink` 和  `flex-basis` 的简写，默认值为 `0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：**auto (1 1 auto)** 和 **none (0 0 auto)**。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### 3.6 align-self

`align-self` 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 `align-items` 属性。默认值为 `auto`，表示继承父元素的 `align-items` 属性，如果没有父元素，则等同于 `stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![](/imgs/web/css/flex-12.png)

> 该属性可能取 6 个值，除了 `auto`，其他都与 `align-items` 属性完全一致。



[https://www.runoob.com/w3cnote/flex-grammar.html]: