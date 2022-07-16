
# 关于文档 - 本文档的搭建 
[[TOC]]

## 1. 创建 VuePress 工程

- 步骤 1：创建一个新目录

```bash
mkdir site
```

- 步骤 2：初始化项目

```bash
git init
yarn init
```

- 步骤 3：将 VuePress 安装为本地依赖

```bash
yarn add -D vuepress
```

- 步骤 4：在 `package.json` 中添加一些 scripts

```json
{
  "scripts": {
      "docs:dev": "vuepress dev docs",
      "docs:build": "vuepress build docs"
  }
}
```

![](/imgs/about/vuepress-1.png)


- 步骤 5：将默认的临时目录和缓存目录添加到 `.gitignore` 文件中

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- 步骤6：创建你的第一篇文档

```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

- 步骤 7：在本地启动服务器来开发你的文档网站

```bash
yarn docs:dev
```

## 2. 配置

### 2.1 目录结构

VuePress 遵循 **“约定优于配置”** 的原则，推荐的目录结构如下：

```
.
├── docs
│   ├── .vuepress 
│   │   ├── public 
│   │   └── config.js 
│   │ 
│   ├── README.md
│   ├── md
│   │   └── 博客文档
│   └── config.md
│ 
└── package.json
```

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/public`: 静态资源目录，`public` 作为静态资源根目录。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 `YML` 或 `toml`。

> 更详细的目录结构见 [https://www.vuepress.cn/guide/directory-structure.html](https://www.vuepress.cn/guide/directory-structure.html)。

### 2.2 默认页面路由

此处我们把 `docs` 目录作为 `targetDir`，对于上述的目录结构，默认页面路由地址如下：

| 文件的相对路径     | 页面路由地址   |
| ------------------ | -------------- |
| `/README.md`       | `/`            |
| `/guide/README.md` | `/guide/`      |
| `/config.md`       | `/config.html` |

### 2.3 配置文件

在 `.vuepress` 目录下新建 `config.js`，这个就是 VuePress 配置。

```javascript
const {mdEnhance} = require("vuepress-plugin-md-enhance");
module.exports = {
    lang: 'zh-CN',
    title: "ice's blog",
    description: '宁可累死自己，也要卷死别人',

    locales: {
        '/': {
            lang: 'zh-CN',
        },
    },

    plugins: [
        mdEnhance({
            // 启用代码块分组
            codegroup: true,
            // 启用下角标功能
            sub: true,
            // 启用上角标
            sup: true,
            // 启用自定义对齐
            align: true,
            // 开启标记
            mark: true,
            // 启用任务列表
            tasklist: true,
            // 启用 mermaid
            mermaid: true,
            // 启用 TeX 支持
            tex: true,
            // 启用代码演示
            demo: true,
        }),
        [
            "vuepress-plugin-clipboard",
            {
                staticIcon: false,
                color: '#3eaf7c',
            }
        ],
        [
            'vuepress-plugin-live2d-plus',
            {
                enable: true,
                model: {
                    url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/bilibili-33/index.json'
                },
                display: {
                    position: 'right',
                    width: '200px',
                    height: '320px',
                    xOffset: '20px',
                    yOffset: '5px'
                },
                mobile: {
                    show: true
                },
                react: {
                    opacity: 0.8
                }
            }
        ]
    ],


    themeConfig: {
        logo: '/avatar.png', // 左上角的 logo
        repo: 'dreaming-coder', // 此博客代码仓库地址
        navbar: getNavbar(),
        sidebar: getSidebar(),
        smoothScroll: true,
        editLink:false
    }
}
```

### 2.4 Frontmatter

#### 2.4.1 首页

```markdown
---
home: true
heroImage: /logo.gif
lang: zh-CN
actions:
- text: 快速开始
  link: /md/guide/
  type: primary
features:
- title: 沉淀
  details: 待到秋来九月八，我花开后百花杀。
- title: 分享
  details: 江南无所有，聊赠一枝春。
- title: 成长
  details: 春风得意马蹄疾，一日看尽长安花。
  footer: MIT Licensed | Copyright © 2022-present ice
  footerHtml: true
---
```

#### 2.4.2 普通页面

貌似不太需要配置…

## 3. Markdown 扩展

### 3.1 Emoji :tada:

可以在 Markdown 内容中输入 `:EMOJICODE:` 来添加 Emoji 表情。

输入

```markdown
:tada: ！
```

**输出**

:tada: ！

### 3.2 目录

**输入**

```markdown
[[toc]]
```

输出

[[toc]]

### 3.3 代码块

#### 3.3.1 行高亮

**输入**

````markdown
```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: '你好， VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```
````

**输出**

```ts{1,6-8}
import type { UserConfig } from '@vuepress/cli'

export const config: UserConfig = {
  title: '你好， VuePress',

  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
  },
}
```

行数范围标记的例子：

- 行数范围： `{5-8}`
- 多个单行： `{4,7,9}`
- 组合： `{4,7-13,16,23-27,40}`

#### 3.3.2 行号

默认启用，可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项中的设置。

````markdown
```ts:no-line-numbers
// 行号被禁用
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

#### 3.3.3 添加 v-pre

由于 模板语法可以在 Markdown 中使用，它也同样可以在代码块中生效。

为了避免你的代码块被 Vue 编译， VuePress 默认会在你的代码块添加 v-pre 指令。这一默认行为可以在配置中关闭。

你可以在代码块添加 `:v-pre` / `:no-v-pre` 标记来覆盖配置项中的设置。

````markdown
```md
<!-- 默认情况下，这里会被保持原样 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```
````
**示例**
```md
<!-- 默认情况下，这里会被保持原样 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- 这里会被 Vue 编译 -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```


### 3.4 在 Markdown 中使用 Vue

#### 3.4.1 模板语法

**输入**

```markdown
一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

**输出**

一加一等于： {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

#### 3.4.2 组件

可以在 Markdown 中直接使用 Vue 组件。

**输入**

```markdown
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />
```

**输出**

- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />

### 3.5 CodeGroup

**输入**

````markdown
:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::

````

**输出**
:::: code-group

::: code-group-item yarn

```bash
yarn add -D vuepress-theme-hope
```

:::

::: code-group-item npm:active

```bash
npm i -D vuepress-theme-hope
```

:::

::::




### 3.6 容器

**输入**

```markdown
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```

**输出**

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

也可以自定义块中的标题：

````markdown
::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::
````

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```js
console.log('你好，VuePress！')
```
:::

### 3.7 自定义对齐

**输入**

```markdown
::: right
右边
:::

::: center
中间
:::
```

**输出**

::: right
右边
:::

::: center
中间
:::

### 3.8 代码演示

#### 3.8.1 普通代码演示

**输入**

````markdown
::: demo Demo 演示

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```

:::
````

**输出**

::: demo Demo 演示

```html
<h1>Mr.Hope</h1>
<p><span id="very">十分</span> 帅</p>
```

```js
document.querySelector("#very").addEventListener("click", () => {
  alert("十分帅");
});
```

```css
span {
  color: red;
}
```

:::

#### 3.8.2 Vue 代码演示

**输入**

````markdown
::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
  methods: {
    handler() {
      alert(this.message);
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::
````

**输出**

::: demo [vue] 一个 Vue Demo

```vue
<template>
  <div class="box">
    Mr.Hope <span @click="handler">{{ message }}</span>
  </div>
</template>
<script>
export default {
  data: () => ({ message: "十分帅" }),
  methods: {
    handler() {
      alert(this.message);
    },
  },
};
</script>
<style>
.box span {
  color: red;
}
</style>
```

:::

### 3.9 角标
- 使用 `^ ^` 进行上角标标注。
- 使用 `~ ~` 进行下角标标注。

例子
- 19^th^
- H~2~O
```markdown:no-line-numbers
- 19^th^
- H~2~O
```

### 3.10 任务列表

- [ ] 一些文字
- [X] 一些文字

```markdown:no-line-numbers
- [ ] 一些文字
- [X] 一些文字
```

### 3.11 Tex 语法
- 单行公式

```markdown:no-line-numbers
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.
```
Euler’s identity $e^{i\pi}+1=0$ is a beautiful formula in $\mathbb{R}^2$.

- 多行公式

```markdown:no-line-numbers
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$
```
$$
\frac {\partial^r} {\partial \omega^r} \left(\frac {y^{\omega}} {\omega}\right)
= \left(\frac {y^{\omega}} {\omega}\right) \left\{(\log y)^r + \sum_{i=1}^r \frac {(-1)^i r \cdots (r-i+1) (\log y)^{r-i}} {\omega^i} \right\}
$$


