# 排序算法 - 选择排序

它的基本思想是：首先在未排序的数列中找到最小(or最大)元素，然后将其存放到数列的起始位置；接着，再从剩余未排序的元素中继续寻找最小(or最大)元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。

![](/imgs/algorithm/sort/selection-sort-1.gif)

```java
public void selectionSort(int[] ary) {
    for (int i = 0; i < ary.length; i++) {
        int min = ary[i];
        int index = i;
        for (int j = i + 1; j < ary.length; j++) {
            if (ary[j] < min) {
                min = ary[j];
                index = j;
            }
        }
        int temp = ary[i];
        ary[i] = min;
        ary[index] = temp;
    }
}
```

