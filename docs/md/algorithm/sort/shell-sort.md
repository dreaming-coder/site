# 排序算法 - Shell 排序

希尔排序实质上是一种分组插入方法。它的基本思想是：对于 $n$ 个待排序的数列，取一个小于 $n$ 的整数 $gap$ ($gap$ 被称为步长) 将待排序元素分成若干个组子序列，所有距离为 $gap$ 的倍数的记录放在同一个组中；然后，对各组内的元素进行直接插入排序。 这一趟排序完成之后，每一个组的元素都是有序的。然后减小 $gap$ 的值，并重复执行上述的分组和排序。重复这样的操作，当 $gap=1$ 时，整个数列就是有序的。

![](/imgs/algorithm/sort/shell-sort-1.gif)

希尔排序是对直接插入排序的优化。当 $gap > 1$ 时都是预排序，目的是让数组更接近于有序。当 $gap = 1$ 时，数组已经接近有序的了，这样就会很快。这样整体而言，可以达到优化的效果。

```java
public void shellSort(int[] ary) {
    int gap = ary.length / 2;
    while (gap > 0) {
        for (int i = 0; i < gap; i++) {
            // 对每一组子数组进行插入排序
            for (int j = 0; j < ary.length; j += gap) {
                int current = ary[j];
                int k = j - gap;
                while (k >= 0 && ary[k] > current) {
                    ary[k + gap] = ary[k];
                    k -= gap;
                }
                ary[k + gap] = current;
            }
            gap /= 2;
        }
    }
}
```

