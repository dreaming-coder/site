# CSS - 盒子模型
## 1. 盒模型

CSS 中的一个基本概念是盒模型( box model)。如下图所示，可见元素会在页面中占据一个矩形区域，该区域就是元素的盒子( box)，由四部分组成。

![](/imgs/web/css/css-box-1.png)

元素盒子有两个部分是可见的：内容和边框。内边距是内容和边框之间的空间，外边距是边框和页面上其他元素之间的空间，理解这四部分之间的相互关系对于高效利用 CSS 至关重要。

## 2. 尺寸

### 2.1 元素的尺寸

依赖于 2 个属性的设置：

- `width`：设置元素的宽度
- `height`：设置元素的高度

:::tip

可以是绝对长度、百分比或者 `auto`。

:::

### 2.2 盒子的尺寸

盒子尺寸的计算方法与 `box-sizing` 属性的值有关

- `box-sizing: content-box` （默认值）

  盒子大小为 `width/height + padding + borderWidth`

- `box-sizing: border-box`

  盒子大小为 `width/height`，元素尺寸为 `width/height - borderWidth - padding`

## 3. 处理溢出内容

如果你尝试改变元素的尺寸，很快就会到达某一个点：内容太大，已经无法完全显示在元素的内容盒中。这时的默认处理方式是内容溢出，并继续显示。

::: normal-demo
```html
<div>
  <p>
    关关雎鸠，在河之洲。窈窕淑女，君子好逑。<br>
    参差荇菜，左右流之。窈窕淑女，寤寐求之。<br>
    求之不得，寤寐思服。悠哉悠哉，辗转反侧。<br>
    参差荇菜，左右采之。窈窕淑女，琴瑟友之。<br>
    参差荇菜，左右芼之。窈窕淑女，钟鼓乐之。
  </p>
</div>

```
```css
div{
  height: 200px;
}
p {
    width: 300px;
    height: 100px;
    border: medium double black;
}
```
:::


我们可以使用 `overflow` 属性改变这种行为：

- `overflow-x`：设置水平方向的溢出方式
- `overflow-y`：设置垂直方向的溢出方式
- `overflow`：将两个方向溢出方式简写到一个属性中

下表显示了这三个属性可能的取值：

![](/imgs/web/css/css-box-2.webp) 
 
## 4. 元素的可见性

可见性由 `visibility` 属性控制，其取值如下所示：

- `collapse`：元素不可见，且在页面布局中不占空间
- `hidden`：元素不可见，但在页面布局中占据空间
- `visible`：默认值，元素再页面上可见

::: normal-demo
```html
<table>
    <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Color</th>
        <th>Size</th>
    </tr>
    <tr id="first-choice">
        <th>Favorite:</th>
        <td>Apples</td>
        <td>Green</td>
        <td>Medium</td>
    </tr>
    <tr>
        <th>2nd Favorite:</th>
        <td>Oranges</td>
        <td>Orange</td>
        <td>Large</td>
    </tr>
</table>
<p>
    <button>Visible</button>
    <button>Collapse</button>
    <button>Hidden</button>
</p>
```

```css
tr > th {
    text-align: left;
    background: gray;
    color: white
}

tr > th:only-of-type {
    text-align: right;
    background: lightgray;
    color: gray
}

button:active {
    background-color: #11ff00;
}
```

```javascript
let btns = document.querySelectorAll("p > button");
console.log(btns)
btns[0].onclick = function (ev) {
  document.querySelector("#first-choice").style.visibility = 'visible';
};
btns[1].onclick = function (ev) {
  document.querySelector("#first-choice").style.visibility = 'collapse';
};
btns[2].onclick = function (ev) {
  document.querySelector("#first-choice").style.visibility = 'hidden';
};
```
:::

## 5. 边框（border）

### 5.1 定义边框宽度

`border-width` 属性用于控制边框的宽度，其值可以是绝对长度、相对长度，还可以是预设宽度：`thin`、`medium`、`thick`。

![](/imgs/web/css/css-box-3.webp)

### 5.2 定义边框样式

`border-style` 属性的值可以是下表中的任意一个。默认值是 `none`，即没有边框。

![](/imgs/web/css/css-box-4.webp)

![](/imgs/web/css/css-box-5.webp)

除此之外，还可以使用 `border-color` 属性对边框设置颜色。

### 5.3 为一条边应用边框样式

一个元素的边框可以分为 `left`、`top`、`right`、`bottom` 四个独立的边框线，特定边的属性可以通过 `border-边-属性` 来设置：

::: normal-demo
```html
<div class="border-demo"></div>
```
```css
.border-demo {
    display: block;
    width: 100px;
    height: 100px;

    border-left-color: red;
    border-left-width: 4px;
    border-left-style: solid;

    border-top-color: cyan;
    border-top-width: 5px;
    border-top-style: inset;

    border-right-color: blue;
    border-right-width: 6px;
    border-right-style: dashed;

    border-bottom-color: orange;
    border-bottom-width: 7px;
    border-bottom-style: dotted;
}
```
:::



### 5.4 简写属性

可以将三种属性设置写在一个属性值里：

- `border`
- `border-left`、`border-top`、`border-right`、`border-bottom`

一般书写顺序为：`width style color`

### 5.5 圆角边框

可以使用边框的 `radius` 特性创建圆角边框，与该功能相关的属性有 5 个：

- `border-radius`
- `border-top-left-radius`、`border-top-rigth-radius`、`border-bottom-left-radius`、`border-bottom-rigth-radius`

这里设定的是圆角的半径。

::: normal-demo
```html
<div class="radius-demo"></div>
```
```css
.radius-demo {
    display: block;
    width: 100px;
    height: 100px;
    border-width: 4px;
    border-style: solid;
    border-left-color: red;
    border-top-color: cyan;
    border-right-color: blue;
    border-bottom-color: orange;

    /* 下面四行可以简写为：border-radius: 15px 30px 45px 60px; */
    border-top-left-radius: 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 20px;
}
```
:::


### 5.6 轮廓线

轮廓对于边框来说是可选的。轮廓最有用的地方在于短时间抓住用户对某个元素的注意力，如必须按压的按钮或者数据输入中的错误。轮廓绘制在盒子边框的外面。边框和轮廓最大的区别是：轮廓不属于页面，因此应用轮廓不需要调整页面布局。

- `outline-color`：设置外围轮廓的颜色
- `outline-offset`：设置轮廓距离元素边框的偏移量
- `outline-style`：设置轮廓的样式，和 `boder-style` 取值一样
- `outline-width`：设置轮廓线宽度，可取 `thin`、`medium`、`thick` 或者长度值

也可以将属性复合简写到 `outline` 属性中：

```css
outline: 颜色 样式 宽度
```

:::tip

给表单 `input` 元素添加 `outline: 0;` 或者 `outline: none;` 样式之后，就可以去掉默认的蓝色边框。

:::

## 6. 背景（background）

### 6.1 设置背景颜色和图像

- `background-color`
- `background-image`

::: normal-demo
```html
<div class="div1"></div>
<div class="div2"></div>
```
```css
.div1, .div2 {
    float: left;
    margin-left: 40px;
    width: 200px;
    height: 200px;
    border-width: 2px;
    border-style: solid;
}

.div1 {
    background-color: cyan;
}

.div2 {
    background-image: url("/imgs/web/css/css-box-6.webp");
}
```
:::

### 6.2 设置背景图像平铺

通过 `background-repeat` 属性，设置背景图像的平铺效果

```css
div {
    background-repeat: no-repeat;  /* 不平铺 */
    background-repeat: repeat;     /* 平铺图片，默认值 */
    background-repeat: repeat-x;   /* 沿 x 平铺 */
    background-repeat: repeat-y;   /* 沿 y 平铺 */
}
```



::: normal-demo 以沿 x 平铺为例
```html
<div class="x-repeat-demo"></div>
```
```css
.x-repeat-demo {
    background-image: url("/imgs/web/css/css-box-6.webp");
    background-repeat: repeat-x;
    width: 300px;
    height: 300px;
    border: 1px solid;
}
```
:::


### 6.3 设置背景图像尺寸

```css
div {
    background-size: auto;      /* 默认值，图像完全显示 */
    background-size: 背景图片宽度 背景图片高度;
    background-size: 50%;
    background-size: cover;     /* 保持纵横比，放缩使完全覆盖盒子，可能溢出 */
    background-size: contain;   /* 保持纵横比，放缩使某一边覆盖盒子，此时另一边没覆盖也不再拉伸，可能有部分空白区域 */
}
```


::: normal-demo 以 contain 为例
```html
<div class="contain-demo"></div>
```
```css
.contain-demo {
    background-image: url("/imgs/web/css/css-box-6.webp");
    background-size: contain;
    width: 300px;
    height: 200px;
}
```
:::



### 6.4设置背景图像的位置

利用 `background-position` 属性可以改变图片在背景中的位置，既可以设置绝对的位置，也可以设置预定义的值

```css
div {
    background-position: x y;
}
```

> 参数代表的意思是：x 坐标和 y 坐标，可以使用 **方位名词** 或者 **精确单位**，两者可以混合使用。

::: normal-demo 将图像贴附在右下角
```html
<div class="demo"></div>
```
```css
.demo {
    background-image: url("/imgs/web/css/css-box-6.webp");
    background-repeat: no-repeat;
    width: 300px;
    height: 300px;
    background-position: right bottom;
    border: 1px solid;
}
```
:::

### 6.5 设置背景图像的附着方式

`background-attachment` 属性设置背景图像是否固定或者随着页面的其余部分滚动，可用于视差滚动

```css
div {
    background-attachment: fixed;   /* 固定图片，无论怎么拖拽滚动条都没用 */
    background-attachment: local;   /* 图片相对元素本身滚动 */
    background-attachment: scroll;  /* 图片相对页面滚动，默认值 */
}
```

### 6.6 使用 background 简写属性

没有特定书写顺序，一般习惯约定如下：

```css
background: [背景颜色] [背景图片地址] [背景平铺] [背景图像附着方式] [背景图片位置];
```

## 7. 盒子阴影

```css
box-shadow: hoffset voffset [blur] [spread] [color] [inset];
```

![](/imgs/web/css/css-box-7.webp)

:::warning

- 没有 outset 这种写法，不写就代表外阴影了
- 盒子阴影不占用空间，不会影响其他盒子的排列

:::

## 8. 内边距（padding）

`padding` 属性用于设置内边距，即边框与内容直接的距离

- `padding-left`：左内边距
- `padding-right`：右内边距
- `padding-top`：上内边距
- `padding-bottom`：下内边距

复合写法为：

```css
div {
    padding: 1px;               /* 四个内边距都是1像素 */
    padding: 2px 4px;           /* 上下内边距2像素，左右内边距4像素 */
    padding: 2px 4px 6px;       /* 上内边距2像素，左右内边距4像素，下内边距6像素 */
    padding: 2px 4px 6px 8px;   /* 顺时针对应，上内边距2像素，右内边距4像素，下内边距6像素，左内边距8像素 */
}
```

## 9. 外边距（margin）

`margin` 属性用于设置外边距，即控制盒子和盒子之间的距离

- `margin-left`：左外边距
- `margin-right`：右外边距
- `margin-top`：上外边距
- `margin-bottom`：下外边距

> 可以给外边距赋值 `auto`。

复合写法为：

```css
div {
    margin: 1px;               /* 四个外边距都是1像素 */
    margin: 2px 4px;           /* 上下外边距2像素，左右外边距4像素 */
    margin: 2px 4px 6px;       /* 上外边距2像素，左右外边距4像素，下外边距6像素 */
    margin: 2px 4px 6px 8px;   /* 顺时针对应，上外边距2像素，右外边距4像素，下外边距6像素，左外边距8像素 */
}
```

## 10. 元素的显示模式

### 10.1 块级元素

常见的块元素有 `h1`~`h6`,、`p`、`div`、`ul`、`ol`、`li` 等，其中 `div` 标签是最典型的块元素。

块级元素有以下特点：

- 比较霸道，自己独占一行
- 高度、宽度、外边距以及内边距都可以控制
- 宽度默认是容器（父级宽度）的100%
- 是一个容器级盒子，里面可以放行内或者块级元素

:::warning

:bookmark_tabs: 文字类的元素不能使用块级元素

:bookmark_tabs: `p` 标签主要用于存放文字，因此不能存放块级元素，特别是不能放 `div`

:::

### 10.2 行内元素

常见的行内元素有 `a`、 `strong`、`b`、`em`、`i`、`del`、`s`、`ins`、`u`、`span`，`<span>` 标签是最典型的行内元素，有的地方也将行内元素称为内联元素。

行内元素有以下特点：

- 相邻元素在一行上，一行可以显示多个
- 高、宽直接设置是无效的
- 默认宽度就是它本身内容的宽度
- 行内元素只能容纳文本或其他行内元素
- `a` 比较特殊，不能嵌套 `a`，但是可以放块级元素

### 10.3 行内块元素

在行内元素中有几个特殊的标签——`img`、`input`、`td`，它们同时具有块元素和行内元素的特点，有些资料称它们为行内块元素。

行内块元素的特点：

- 和相邻行内元素（行内块）在一行上，但是他们之间会有空白缝隙，一行可以显示多个
- 默认宽度就是他们本身内容的宽度
- 高度、行高、外边距以及内边距都可以控制

### 10.4 元素显示模式转换

- 转换为块元素：`display: block;`
- 转换为行内元素：`display: inline;`
- 转换为行内块：`display: inline-block;`
- 隐藏对象（不占空间）：`display: none;`

## 11. 浮动（float）

### 11.1 传统网页布局的三种方式

网页布局的本质——用 CSS 来摆放盒子，把盒子摆放到相应的位置

CSS 提供了三种传统布局方式（简单说，就是盒子如何进行排列顺序）：

- 标准流（默认的，之前的写法都是标准流）
- 浮动
- 定位

### 11.2 什么是浮动

`float` 属性用于创建浮动框，将其移动到一边，直到左边缘或右边缘触及包含块或另一个浮动框的边缘

```css
div {
    float: none;  /* 默认值，元素不浮动 */
    float: left;  /* 元素向左浮动 */
    float: right  /* 元素向右浮动 */ 
}
```

### 11.3 浮动特性

设置了浮动的元素最重要的特性：

- 脱离标准流的控制移动到指定位置，**浮动的盒子不再保留原先的位置**

- 如果多个盒子都设置了浮动，则它们会按照属性值一行内显示并且顶端对齐排列

  > 如果父级元素宽度装不下这些浮动的盒子，多出的盒子会另起一行对齐。

- 浮动元素具有类似行内块元素的特性

  - 如果块级盒子没有设置宽度，默认宽度和父级一样宽，但是**添加浮动后，它的大小根据内容来决定**
  - 浮动的盒子中间是**没有缝隙**的，是紧挨着一起的
  - 行内元素同理

### 11.4 清除浮动

由于浮动不保留原来位置，可能导致父元素高度的塌陷，或者布局上的考虑等原因，我们又是需要清除浮动的设置，可以通过 `clear` 属性来清除浮动。

```css
div {
    clear: left;    /* 不允许左侧有浮动元素 */
    clear: right;   /* 不允许右侧有浮动元素 */
    clear: both;    /* 同时清除左右两侧浮动的影响 */ 
}
```

**清除浮动的方法**：

- **额外标签法，也称为隔墙法，是 W3C 推荐的做法**

  额外标签法会在浮动元素末尾添加一个空的标签，例如 `<div style="clear:both"></div>`，或者其他标签（如`<br />`等）

  :::warning

  注意，这个元素必须是块级元素

  :::

  优点：通俗易懂，书写方便

  缺点：添加许多无意义的标签，结构化较差

- **父级元素添加 `overflow` 属性**

  可以给父级元素添加 `overflow` 属性，将其属性值设置为 `hidden`、`auto` 或 `scroll`

  优点：代码简洁

  缺点：无法显示溢出的部分

- **父级添加 `after` 伪元素**

  额外标签法升级版，给父元素添加

  ```css
  .clearfix:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  
  .clearfix {
       *zoom: 1;  /* IE 6 / 专用 */
  }
  ```

- **父级添加双伪元素**

  也是给父元素添加

  ```css
  .clearfix:before,
  .clearfix:after {
      content: "";
      display: table
  }
  .clearfix:after {
      clear: both;
  }
  .clearfix {
      *zoom: 1;
  }
  ```

  优点：代码更简介

  缺点：不照顾低版本浏览器
  

## 12. 定位（location）

为什么需要定位：

- 定位可以让盒子自由的在某个盒子内移动位置或者固定屏幕中某个位置，并且可以压住其他盒子

:::warning

定位可以让盒子自由的在某个盒子内移动位置或者固定屏幕中某个位置，并且可以压住其他盒子。

:::

### 12.1 定位组成

定位：将盒子定在某一位置，所以定位也是怎么摆放盒子，按照定位的方式移动盒子

**定位 = 定位模式 + 边偏移**

:::warning

定位模式用于指定一个元素在文档中的定位方式，边偏移则决定了该元素的最终位置。

:::

#### 12.1.1 定位模式

通过 CSS 的 `position` 属性来设置，其值可以分为四个：

- **`static`：静态定位**

  默认定位方式，无定位的意思

  ```css
  div {
      position: static;
  }
  ```

- **`relative`：相对定位**

  相对定位是元素在移动位置的时候，是相对于它原来的位置来说的

  ```css
  div {
      position: relative;
  }
  ```

  :::warning

  其原来在标准流的位置继续占有，后面的盒子仍然以标准流的方式对待它。

  :::

- **`absolute`：绝对定位**

  绝对定位是元素在移动位置的时候，是相对于它祖先元素来说的

  ```css
  div {
      position: absolute;
  }
  ```

  绝对定位的特点：

  - 如果**没有祖先元素**或者**祖先元素没有定位**，则以浏览器为准定位（Document 文档）
  - 如果祖先元素有定位（相对、绝对、固定定位），则以**最近一级的有定位的祖先元素**为参考点移动位置
  - 绝对定位**不再占有原先的位置**

  :::danger

  子绝父相：子级使用绝对定位，父级则需要相对定位。

  :::

- **`fixed`：固定定位**

  固定定位是元素固定于浏览器的可视区的位置，主要使用场景为在浏览器页面滚动时元素的位置不会改变

  ```css
  div {
      position: fixed;
  }
  ```

  固定定位的特点：

  - **以浏览器的可视窗口为参照点**移动元素
  - 固定定位**不占有原先的位置**

  



> **固定定位小技巧 · 固定回到顶部按钮在版心右侧位置**
> 1. 让固定定位的盒子 `left: 50%`，走到浏览器可视区的一半位置；
> 2. 让固定定位的盒子 `margin-left: 版心宽度的一半距离`，多走版心宽度的一半位置。


- **`sticky`：粘性定位**

  可以认为是相对定位和固定定位的混合，设置了`sticky` 的元素，在屏幕范围时该元素的位置并不受到定位影响（设置的 `top`、`left` 等属性无效），当该元素的位置将要移出偏移范围时，定位又会变成 `fixed`，根据设置的 `left`、`top` 等属性成固定位置的效果。

  ```css
  div {
      position: sticky;
      top: 10px;
  }
  ```

  粘性定位的特点：

  - 以浏览器的可视窗口为参照标准移动元素（固定定位的特点）
  - 粘性定位占有原先的位置（相对定位的特点）
  - 必须添加 `top`、`left`、`right`、`bottom` 其中一个才有效

#### 12.1.2 边偏移

 有 `top`、`bottom`、`left`、`right` 四个属性来控制定位的偏移

| 边偏移属性 |      示例       |                     描述                     |
| :--------: | :-------------: | :------------------------------------------: |
|    top     |  `top: 80px;`   | 顶端偏移量，定义元素相对其父元素上边线的距离 |
|   bottom   | `bottom: 80px;` | 底部偏移量，定义元素相对其父元素下边线的距离 |
|    left    |  `left: 80px;`  | 左侧偏移量，定义元素相对其父元素左边线的距离 |
|   right    | `right: 80px;`  | 右侧偏移量，定义元素相对其父元素右边线的距离 |

### 12.2 定位的叠放顺序

在使用定位布局时，可能出现盒子重叠的情况，此时，可以使用 `z-index` 来控制盒子的前后次序(z 轴)

```css
div {
    z-index: 1;
}
```

:::danger

- 数值可以使正整数、负整数或 $0$，默认是 `auto`，数值越大，盒子越靠上；
- 如果属性值相同，则按照书写顺序，后来居上；
- 数字后面不能加单位；
- 只有定位的盒子才有 `z-index` 属性。

:::



