# CSS - 文本设置
## 1. 文本属性

### 1.1 文本对齐

`text-align` 属性用于设置元素内文本内容的水平对齐方式。

```css
div {
    text-align: center;  /* 居中 */
    text-align: left;    /* 左对齐（默认值） */
    text-align: right;   /* 右对齐 */
}
```

`vertical-align` 属性用于设置一个元素的垂直对齐方式，但是它只针对于**行内元素**或者行内块元素有效。

```css
td {
    vertical-align: baseline;     /* 默认值，元素基线对齐，就是写英文四线格第三线 */
    vertical-align: top;          /* 元素顶端对齐 */
    vertical-align: middle;       /* 元素垂直居中对齐 */
    vertical-align: bottom;       /* 元素底部对齐 */ 
}
```

:::tip

**【解决图片底部默认空白缝隙的问题】**

- 图片底侧会有一个空白缝隙，原因是行内块元素会和文字的基线对齐

:key: 主要的解决方法有两种：

1. 给图片添加 `vertical-align: middle | top | bottom` 等（提倡使用的）
2. 把图片转换为块级元素 `display: block;`

:::

### 1.2 处理空白

空白在 HTML 文档中通常是被压缩或者直接忽略掉。这允许你将 HTML 文档的布局跟页面的外观分离。浏览器遇到多个空格时，会将它们压缩为一个空格，而换行符等其他空白符则会直接被忽略。浏览器会自动处理文本换行，以便各行都能适应元素边界。

`white-space` 属性用于设置空白字符的处理方式。

```css
p {
    white-space: normal;    /* 默认值，空白字符被压缩，文本自动换行 */
    white-space: nowrap;    /* 空白符被压缩，文本不换行 */
    white-space: pre;       /* 空白符被保留，文本只在遇到换行符的时候换行 */
    white-space: pre-line;  /* 空白符被压缩，文本会在一行排满或遇到换行符的时候换行 */
    white-space: pre-wrap;  /* 空白符被保留，文本会在一行排满或遇到换行符的时候换行 */
}
```

### 1.3 文本方向

`direction` 属性告诉浏览器文本块的排列方向。

```css
p {
    direction: ltr;  /* 左对齐 */
    direction: rtl;  /* 右对齐 */
}
```

### 1.4 单词、字母和行间距

- `letter-spacing`：字母之间的间距
- `word-spacing`：单词之间的间距
- `line-height`：行间距

这些属性的取值一般是 `px` 为单位或者 `em` 单位，其中，行间距由如下三个部分组成。

![](/imgs/web/css/css-text-1.webp)

### 1.5 文本缩进

`text-indent` 属性用来指定文本的第一行的缩进，通常是将段落的首行缩进

```css
div {
    text-indent: 20px; /* 可以负值 */
}
```

通过设置该属性，所有元素的第一行都可以缩进一个给定的长度，甚至可以是负值

```css
p {
    text-indent: 2em;
}
```

`em` 是一个相对长度单位，`1em` 等于当前对象内文本的一个文字的字体尺寸。

### 1.6 文本装饰

`text-decoration` 属性规定添加到文本的修饰。可以给文本添加下划线、删除线、上划线等

```css
p {
    text-decoration: none;         /* 没有线 */
    text-decoration: underline;    /* 下划线 */
    text-decoration: line-through; /* 删除线 */
    text-decoration: overline;     /* 上划线 */
}
```

### 1.7 大小写转换

`text-transform` 属性可以对文本的大小写进行转换。

```css
p {
    text-transform: none;         /* 不做转换 */
    text-transform: capitalize;   /* 单词的首字母大写 */
    text-transform: uppercase;    /* 所有字母大写 */
    text-transform: lowercase;    /* 所有字母小写 */
}
```

### 1.8 文本阴影

在 CSS 3 中，我们可以使用 `text-shadow` 属性将阴影应用于文本

```css
p {
    text-shadow: h-shadow v-shadow blur color;
}
```

|    值    |              描述              |
| :------: | :----------------------------: |
| h-shadow | 必需，水平阴影的位置，允许负值 |
| v-shadow | 必需，垂直阴影的位置，允许负值 |
|   blur   |         可选，模糊距离         |
|  color   |        可选，阴影的颜色        |

### 1.9 颜色与透明度

一般使用 `color` 和 `opacity` 属性来控制元素的颜色和透明度，主要体现在元素内部文字的颜色和透明度，其中透明度是百分比表示。

## 2. 字体属性

### 2.1 字体系列

CSS 使用 `font-family` 属性定义文本的字体系列

```css
p {
    font-family: "微软雅黑";
}
div {
    font-family: Arial,"Microsoft Yahei","微软雅黑";
}
```

:::tip

- 多个字体用逗号分隔，按照顺序搜索字体，没找到则寻找后面一个
- 字体名由多个单词组成的使用引号引起来

:::

### 2.2 字体大小

CSS 使用 `font-size` 属性定义字体的大小

```css
p {
    font-size: 20px;
}
```

:::tip

字体大小除了给出具体的值，还可以使用预定义的一些值，从小到大依次为：

- `xx-small`、`x-small`、`small`、`medium`、`large`、`x-large`、`xx-large`

除此之外，还可以设置相对于父元素的字体大小：

- `smaller`、`larger`

这些字体大小的实现依赖浏览器，无法保证每个浏览器一致。

:::

### 2.3 字体粗细

CSS 使用 `font-weight` 属性定义字体的粗细

```css
p {
    font-weight: bold;
}
p {
    font-weight: 700; /* 和bold一样的效果 */
}
```

### 2.4 文字样式

CSS 使用 `font-style` 属性设置文字的风格

```css
p {
    font-style: normal; /* 默认值 */
    font-style: italic; /* 斜体 */
}
```

### 2.5 字体复合属性

```css
div {
    font-style: italic;
    font-weight: 700;
    font-size: 16px;
    font-family: 'Microsoft Yahei';
}
```

可以简写为：

```css
div {
    font: italic 700 16px 'Microsoft Yahei';
}
```

:::tip

合在一起书写有特定的顺序规定：`font: [font-style] [font-weight] font-size/line-height font-family;`

:::