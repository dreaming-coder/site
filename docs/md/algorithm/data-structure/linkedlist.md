# 线性表 - 链表

## 1. 链表的分类

顺序表可以随时存取表中的任意一-个元素，它的存储位置可以用一个简单直观的公式表示，但插入和删除操作需要移动大量元素。链式存储线性表时，不需要使用地址连续的存储单元，即不要求逻辑上相邻的元素在物理位置上也相邻，它通过“链”建立起数据元素之间的逻辑关系，因此插入和删除操作不需要移动元素，而只需修改指针，但也会失去顺序表可随机存取的优点。

链表可以分为单链表和双链表：

- 单链表：只有后继指针

![](/imgs/algorithm/data-structure/linkedlist-1.png)

- 双链表：既有后继指针，也有前驱指针

![](/imgs/algorithm/data-structure/linkedlist-2.png)

::: tip

除此之外，和可以区分有无头结点、是否是循环链表等等，不过最大的区别还是单链或者双链。

:::

## 2. 链表的基本操作

> 这里以单链表为例

### 2.1 头插法建立单链表

![](/imgs/algorithm/data-structure/linkedlist-3.png)

### 2.2 尾插法建立单链表

![](/imgs/algorithm/data-structure/linkedlist-4.png)

### 2.3 插入结点

![](/imgs/algorithm/data-structure/linkedlist-5.png)

### 2.4 删除结点

![](/imgs/algorithm/data-structure/linkedlist-6.png)

