# 排序算法 - 堆排序

学习堆排序之前，有必要了解堆！若读者不熟悉堆，建议先了解堆(建议可以通过二叉堆，左倾堆，斜堆，二项堆或斐波那契堆等文章进行了解)，然后再来学习本章。

我们知道，堆分为"最大堆"和"最小堆"。最大堆通常被用来进行"升序"排序，而最小堆通常被用来进行"降序"排序。 鉴于最大堆和最小堆是对称关系，理解其中一种即可。本文将对最大堆实现的升序排序进行详细说明。

最大堆进行升序排序的基本思想：

① 初始化堆：将数列 $a[1...n]$ 构造成最大堆。 

② 交换数据: 将 $a[1]$ 和 $a[n]$ 交换，使 $a[n]$ 是 $a[1...n]$ 中的最大值；然后将 $a[1...n-1]$ 重新调整为最大堆。 接着，将 $a[1]$ 和 $a[n-1]$ 交换，使 $a[n-1]$ 是 $a[1...n-1]$ 中的最大值；然后将 $a[1...n-2]$ 重新调整为最大值。 

依次类推，直到整个数列都是有序的。

![](/imgs/algorithm/sort/heap-sort-1.gif)

```java
public void heapSort(int[] ary) {
    // build max heap
    for (int i = (ary.length - 1) / 2; i >= 0; i--) {
        adjustHeap(ary, ary.length, i);
    }

    int n = ary.length;
    while (n-- > 0) {
        swap(ary, 0, n);
        adjustHeap(ary, n, 0);
    }
}

private void adjustHeap(int[] ary, int heapSize, int index) {
    int left = leftIndex(index);
    int right = rightIndex(index);
    int largest = index;
    if (left < heapSize && ary[left] > ary[index]) {
        largest = left;
    }
    if (right < heapSize && ary[right] > ary[largest]) {
        largest = right;
    }
    if (index != largest) {
        swap(ary, index, largest);
        adjustHeap(ary, heapSize, largest);
    }
}

private int leftIndex(int index) {
    return 2 * index + 1;
}

private int rightIndex(int index) {
    return 2 * index + 2;
}

private void swap(int[] ary, int i, int j) {
    int temp = ary[i];
    ary[i] = ary[j];
    ary[j] = temp;
}
```

