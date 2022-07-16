# HTML - 文档分节
这里首先给出一般使用时的布局结构，然后再分别深入介绍

::: normal-demo 基本布局结构
```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="ice">
    <meta name="description" content="an example for text separation">
    <title>Text Separation</title>
</head>

<body>
    <header>
        <hgroup>
            <h1>把大象关进冰箱里需要几步？</h1>
            <h2>---三步搞定</h2>
        </hgroup>
        <address>
            Questions and Comments? <a href="#">Email me</a>
        </address>
        <nav>
            <a href="#">参考一</a>
            <a href="#">参考二</a>
            <a href="#">参考三</a>
        </nav>
    </header>
    <article>
        <header>
            <hgroup>
                <h1>文章一标题</h1>
                <h2>---文章一副标题</h2>
            </hgroup>
        </header>
        <section>
            <header>
                <h2>Chapter 1</h2>
            </header>
            <section>
                <header>Section 1.1</header>
            </section>
            <section>
                <header>Section 1.2</header>
            </section>
        </section>
        <aside>
            附注部分内容
        </aside>
        <section>
            <header>
                <h2>Chapter 2</h2>
            </header>
            <details>
                <summary>把大象关进冰箱里需要哪三步？</summary>
                <ol>
                    <li>把冰箱门打开</li>
                    <li>把大象放进去</li>
                    <li>把冰箱门带上</li>
                </ol>
            </details>
        </section>
        <footer>
            <a href="#">休息一下</a><br> =========================
        </footer>
    </article>
    <nav>
        More Information：
        <a href="https://www.baidu.com">百度一下，你就知道</a>
    </nav>
    <footer>
        作者：ice，联系方式：<a href="http://e-thunder.space">http://e-thunder.space</a>
    </footer>
</body>

</html>
```
:::

## 1. 基本标题

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

## 2.  隐藏子标题

有的时候除了标题之外，还列出了子标题。子标题一般比标题小一号，很容易和正常的缩进标题混在一起，无法用脚本处理，我们可以使用 `hgroup` 元素来将其作为一个整体处理。

```html
<hgroup>
    <h1>正常的标题</h1>
    <h2>副标题</h2>
</hgroup>
<h2>正常的章节</h2>
```

## 3.  生成节

`section` 元素是 HTML 5 中新增的。顾名思义，它表示的是文档中的一节。 使用标题元素的时候实际上也生成了隐含的节。用 `section` 元素则可以明确地生成节并且将其与标题分开。至于什么情况下应该使用 `section` 元素，并没有一个明确的规定。不过从经验上讲，`section` 元素用来包含的是那种应该列人文档大纲或目录中的内容。`section` 元素通常包含一个或多个段落及一个标题，不过标题并不是必需的。

:::warning

`section` 元素不能是 `address` 元素的后代元素。

:::

## 4. 添加首部和尾部

`header` 元素表示一节的首部。里面可以包含各种适合出现在首部的东西，包括刊头或徽标。在内嵌的元素方面， `header` 元素通常包含一个标题元素或一个 `hgroup` 元素，还可以包含该节的导航元素。

:::warning

`header` 元素不能是 `address`、`footer` 元素和其他 `header` 元素的后代元素。

:::

`footer` 元素是 `header` 元素的配套元素，表示一节的尾部。`footer` 通常包含着该节的总结信息，还可以包含作者介绍、版权信息、到相关内容的链接、徽标及免责声明等。

:::warning

`footer` 元素不能是 `address`、`header` 元素和其他 `footer` 元素的后代元素。

:::

## 5. 添加导航区域

`nav` 元素表示文档中的一个区域， 它包含着到其他页面或同一页面的其他部分的链接。显然,并非所有的超链接都要放到 `nav` 元素中。该元素的目的是规划出文档的主要导航区域。

:::warning

该元素不能是 `address` 元素的后代元素。

:::

## 6. 使用 article

`article` 元素代表 HTML 文档中一段独立成篇的内容，从理论上讲，可以独立于页面其余内容发布或使用(例如通过 RSS)。这不是说作者必须单独发布它，而是说判断是否使用该元素时要以独立性为依据。一篇新文章和博文条目都是这方面的典型例子。

:::warning

该元素不能是 `address` 元素的后代元素。

:::

## 7. 生成附注栏

`aside` 元素用来表示跟周边内容稍沾一点边的内容，类似于书籍或杂志中的侧栏。其内容与页面其他内容、 `article` 或 `section` 有点关系，但并非主体内容的一部分。它可能是一些背景信息、到相关文章的链接，诸如此类。

:::warning

该元素不能是 `address` 元素的后代元素。

:::

## 8. 提供联系信息

`address` 元素用来表示文档或 `article` 元素的联系信息。`address` 元素身为 `article` 元素的后代元素时，它提供的联系信息被视为该 `article` 的。否则，当 `address` 元素身为 `body` 元素的子元素时(在 `body` 元素和 `address` 元素之间没有隔着 `article` 元素)，它提供的联系信息被视为整个文档的。

`address` 元素不能用来表示文档或文章的联系信息之外的地址，例如，它不能用在文档内容中表示客户或用户的地址。

## 9. 生成详情区域

`details` 元素在文档中生成一个区域，用户可以展开它以了解关于某主题的更多详情。`details` 元素通常包含一个 `summary` 元素，后者的作用是为该详情区域生成一个说明标签或标题。

```html
<details>
	<summary>详情区域标题</summary>
    <!--详情内容-->
</details>
```

