# 排序算法 - 概述

常见的一些排序算法及其复杂度如下表所示：

![](/imgs/algorithm/sort/sort-overview.png)

在不同情况下，排序算法的选择也不尽相同，下表给出了一些场景下，速度在前三名的算法：

|   排序场景    |                    排序效率                     |
| :-----------: | :---------------------------------------------: |
|    Random     |            Shell 排序 > 快排 > 归并             |
|  Few Unique   |               快排 > 希尔 > 归并                |
|   Reversed    |               快排 > 希尔 > 归并                |
| Almost sorted | 插入排序  > 基数排序 > 快排 > Shell 排序 > 归并 |

> 总结来看：快速排序和希尔排序在排序速度上表现是比较优秀的，而归并排序稍微次之。
