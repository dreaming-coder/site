# CSS - 过渡、动画和变换
## 1. 过渡（transition）

过渡（transition）是 CSS 3 中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时，为元素添加效果

过渡动画：是从一个状态渐渐地过渡到另一个状态

我们经常和 `:hover` 一起搭配使用，**过渡属性写在起始元素的样式中，而不是最终要变换的样式中**。

```css
div {
    transition-delay: 0s;                /* 过渡开始之前的延迟时间 */
    transition-duration: 1s;             /* 过渡的持续时间 */
    transition-property: width;          /* 指定要过渡的属性 */
    transition-timing-function: linear;  /* 指定过渡的速度曲线 */
}
```

也可以统一写到一个属性中：

```css
div {
    transition: 要过渡的属性 花费时间 运动曲线 何时开始;
}
```

:::tip

- 属性：需要变化的 CSS 属性，宽度高度、背景颜色、内外边距都可以，如果想要所有的属性都变化过渡，写一个 `all` 就可以
- 花费时间：单位是**秒**（必须写单位），如：`0.5s`
- 速度曲线：默认是 `ease`，可以省略
- 何时开始：单位是**秒**（必须写单位），可以设置延迟触发时间，默认是 ` 0s`，可以省略不写

:::

**运动速度曲线**：

|           值            |                             描述                             |
| :---------------------: | :----------------------------------------------------------: |
|        `linear`         | 规定以相同速度开始至结束的过渡效果（等于 `cubic-bezier(0,0,1,1)`） |
|         `ease`          | 规定慢速开始，然后变快，然后慢速结束的过渡效果（`cubic-bezier(0.25,0.1,0.25,1)`） |
|        `ease-in`        | 规定以慢速开始的过渡效果（等于 `cubic-bezier(0.42,0,1,1)`）  |
|       `ease-out`        | 规定以慢速结束的过渡效果（等于 `cubic-bezier(0,0,0.58,1)`）  |
|      `ease-in-out`      | 规定以慢速开始和结束的过渡效果（等于 `cubic-bezier(0.42,0,0.58,1)`） |
| `cubic-bezier(n,n,n,n)` | 在 `cubic-bezier` 函数中定义自己的值。可能的值是 0 至 1 之间的数值 |

:::warning

如果想要过渡多个属性，每组过渡设置用逗号分隔。

:::


::: normal-demo 横向拉伸变换
```css
div {
    width: 100px;
    height: 100px;
    background: red;
    transition: width 1s linear 0s;
}

div:hover {
    width: 300px;
}
```
:::


## 2. 动画（animation）

CSS 动画本质上是增强的过渡。在如何从一种 CSS 样式过渡到另一种样式的过程中，你具有了更多选择、更多控制，以及更多灵活性。

制作动画分为两步：

1. 定义动画关键帧

2. 设置动画播放的属性

### 2.1 关键帧

使用 `@keyframes` 来定义动画的关键帧，设置动画序列的关键样式

```css
@keyframes 动画名称{
    0% {
        /* 样式 */
    }
    50% {
        /* 样式 */
    }
    100% {
        /* 样式 */
    }
}
```

:::tip

- `0%` 是动画的开始，`100%`是动画的完成。这样的规则就是动画序列。
- 在 `@keyframes` 中规定某项 CSS 样式，就能创建由当前样式逐渐改变为新样式的动画效果。
- 动画是使元素从一种样式逐渐变化为另一种样式的效果，可以改变任意多的样式任意次数。
- 请用百分比来表示变化发生的时间，活用关键词 `from` 和 `to`，等同于 `0%` 和 `100%`。

:::

### 2.2 动画属性

动画的常用属性如下所示：

|            属性             |                             描述                             |
| :-------------------------: | :----------------------------------------------------------: |
|      `animation-name`       |            设置要使用的的 `@keyframes` 名称，必填            |
|    `animation-duration`     |    设置动画完成一个周期所花费的时间（`s` 或 `ms`），必填     |
| `animation-timing-function` |              设置动画的速度曲线，默认是 `ease`               |
|      `animation-delay`      |                  设置动画开始之前的延迟时间                  |
| `animation-iteration-count` | 设置动画的播放次数 ，默认是 `1`，还可以设为无数次 `infinite` |
|    `animation-direction`    | 设置动画在下一周期是否逆向播放，默认 `normal`，`alternate` 逆播放 |
|   `animation-play-state`    |      设置动画是否正在运行（`running`）或暂停（`pause`）      |
|    `animation-fill-mode`    | 设置设置动画结束后状态，保持（`forwards`）还是回到起始(`backwards`) |

:::tip

`animation-timing-function`：可以不选给定的曲线类型，而传入状态转移需要多少步完成，使用`steps()` 这种离散的动作叠加成动画。

:::

也可以使用 `animation` 属性对上述多个属性进行简写：

```css
animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 动画起始或者结束状态;
```

:::tip

- 简写属性里欧面不包含 `animation-play-state`
- 暂停动画：`animation-play-state: paused;`，经常和鼠标经过等其他配合使用
- 需要动画走回来，而不是直接跳回来：`animation-direction: alternate;`
- 盒子动画结束后，停在结束位置：`animation-fill-mode: forwards;`

:::

示例：

::: normal-demo
```html
<div id="test-animation"></div>
```
```css
#test-animation {
    width: 100px;
    height: 100px;
    background: cyan;
    animation-name: stretch;
    animation-duration: 1s;
    animation-direction: alternate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-play-state: running;
}
@keyframes stretch {
    from {
        width: 100px;
    }
    25% {
        width: 200px;
    }
    50% {
        width: 300px;
    }
    75% {
        width: 400px;
    }
    to {
        width: 500px;
    }
}
#test-animation:hover {
    animation-play-state: paused;
}
```
:::


## 3. 变换（transform）

### 3.1 2D 变换

#### 3.1.1 二维坐标系

2D 转换是改变标签在二维平面上的位置和形状的一种技术，基于二维坐标系。

![](/imgs/web/css/css-dynamic-1.webp)

#### 3.1.2 平移（translate）

```css
div {
    transform: translate(x,y);    /* x，y 是相对原始状态移动的距离 */
    transform: translateX(n);
    transform: translateY(n);
}
```

:::tip

- `translate` 最大的优点是，不会影响到其他元素的位置
- `translate` 中的参数如果是百分比单位，则是相对于自身元素的尺寸计算的
- 对行内元素没有效果

:::

::: normal-demo
```html
<div class="translate-demo"></div>
```
```css
.translate-demo {
    width: 200px;
    height: 200px;
    background-color: #11ff00;
    transform: translateX(400px);
}
```
:::



#### 3.1.3 旋转（rotate）

2D 旋转是指让元素在二维平面内顺时针或逆时针旋转。

```css
div {
    transform: rotate(度数);     /* 顺时针为正 */
    transform: rotate(45deg);    /* 顺时针旋转45° */
}
```

::: normal-demo 
```html
<div class="rotate-demo"></div>
```
```css
.rotate-demo {
    margin-top: 15px;
    margin-left: 15px;
    margin-bottom: 15px;
    width: 150px;
    height: 150px;
    background-color: lime;
    transform: rotate(45deg);
}
```
:::

#### 3.1.4 放缩（scale）

```css
div {
    transform: scale(x,y);
}
```

:::tip

- `transform: scale(1,1);`：保持尺寸不变
- `transform: scale(2,2);`：宽高放大了 2 倍
- `transform: scale(2);`：只写一个参数，第二个参数默认一样，相当于`scale(2,2)`
- `scale` 缩放的最大优势是，可以设置转换中心点缩放，默认以中心点缩放的，而且不影响其他盒子

:::

::: normal-demo
```html
<div id="test-scale"></div>
```
```css
#test-scale {
    width: 200px;
    height: 200px;
    background-color: #14d5bb;
}

#test-scale:hover {
    transform: scale(2, 1);
    transform-origin: left top;
}
```
:::


#### 3.1.5 中心点

默认旋转和放缩中心是元素的中心点，可以使用 `transform-origin` 属性自定义中心点：

```css
div {
    transform-origin: x y;       /* 设置旋转中心 */
    transform-origin: 50% 50%；  /* 默认值 */
}
```

:::tip

取值可以是像素、百分比、方位名词（`top`、`bottom`、`left`、`right`、`center`）。

:::

::: normal-demo
```html
<div class="origin-demo"></div>
```
```css
.origin-demo {
    margin-left:120px;
    margin-bottom: 70px;
    width: 200px;
    height: 200px;
    background-color: lime;
    transform: rotate(30deg);
    transform-origin: left top;
}
```
:::


#### 3.1.6 2D 转换综合写法

- 同时使用多个转换，其格式为：`transform:translate() rotate() scale()...` 等
- 其顺序会影响转换的效果（先旋转会改变坐标轴方向）
- **当我们同时有位移和其他属性的时候，记得要将位移放到最前**

### 3.2 3D 变换

#### 3.2.1 三维坐标系
![](/imgs/web/css/css-dynamic-2.webp)

- x 轴：水平向右
- y 轴：垂直向下
- z 轴：垂直屏幕向外

#### 3.2.2 平移（translate3d）

```css
div {
    transform: translate3d(x,y,z);    /* x，y 是相对原始状态移动的距离 */
    transform: translateX(n);
    transform: translateY(n);
    transform: translateZ(n);       
}
```

#### 3.2.3 旋转（rotate3d）

```css
div {
    transform: rotateX(45deg);          /* 沿着 x 轴正方向旋转45° */
    transform: rotateY(45deg);          /* 沿着 y 轴正方向旋转45° */
    transform: rotateZ(45deg);          /* 沿着 z 轴正方向旋转45° */
    transform: rotate3d(x,y,z,deg);     /* 沿着自定义轴旋转 deg 角度 */
}
```

:::warning

自定义轴是原点和点 $(x,y,z)$ 组成的向量的方向。

:::

:::tip 【左手准则】

- 左手的手拇指指向坐标轴正方向
- 其余手指弯曲方向就是沿着该轴旋转的正方向

:::

::: normal-demo
```html
<div class="rotate-3d-demo"></div>
```
```css
.rotate-3d-demo {
    margin: 25px;
    width: 200px;
    height: 200px;
    text-align: center;
    vertical-align: center;
    background-color: #9145f8;
    transform: rotateZ(45deg);
}
```
:::



#### 3.2.4 透视（perspective）

`perspective` 属性指定了观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。**z&gt;0 的三维元素比正常大，而 z&lt;0 时则比正常小，大小程度由该属性的值决定。**

三维元素在观察者后面的部分不会绘制出来，即 z 轴坐标值大于 `perspective` 属性值的部分。

默认情况下，消失点位于元素的中心，但是可以通过设置 `perspective-origin: x y` 属性来改变其位置。

属性值为`0`或负值或 `none`（`none`是默认值）时，没有透视效果。

**镜头方向只能是平行 z 轴向屏幕内，也就是从屏幕正前方向里看**。可以调整镜头与平面位置：

1. `perspective` 属性设置镜头到元素平面的距离。所有元素都是放置在 z=0 的平面上。比如 `perspective(300px)` 表示，镜头距离元素表面的位置是 300 像素。
2. `perspective-origin` 属性规定了镜头在平面上的位置。默认是放在元素的中心。

::: normal-demo
```html
<div id="div1">
    <div id="div2">HELLO</div>
</div>
```

```css
#div1 {
    position: relative;
    height: 150px;
    width: 150px;
    margin: 20px;
    padding: 10px;
    border: 1px solid black;
    perspective: 150px;
}

#div2 {
    padding: 50px;
    position: absolute;
    border: 1px solid black;
    background-color: yellow;
    transform: rotateX(45deg);
}
```
:::


:::tip

`perspective` 的意义在于设置远近点大小的比例，让它产生 3D 感，但是并不改变物体在 `transform-origin` 处的大小。

:::

#### 3.2.5 3D 呈现（transform-style）

:::tip

- 控制子元素是否开启三维立体环境
- `transform-style: flat;`：表示所有子元素在 2D 平面呈现，默认值
- `transform-style: preserve-3d;`：表示所有子元素在 3D 空间中呈现
- `transform-style` 写在父级元素的样式中，但是影响的是子盒子

:::

