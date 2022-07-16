# 排序算法 - 快速排序

它的基本思想是: 选择一个基准数，通过一趟排序将要排序的数据分割成独立的两部分；其中一部分的所有数据都比另外一部分的所有数据都要小。然后，再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

![](/imgs/algorithm/sort/quick-sort-1.gif)

```java
public void quickSort(int[] ary, int start, int end) {
    if (start < end) {
        int pivot = partition(ary, start, end);
        quicksort(ary, start, pivot - 1);
        quicksort(ary, pivot + 1, end);
    }
}

private int partition(int[] ary, int start, int end) {
    int i = start, j = end;
    int n = ary[start];
    while (true) {
        while (i <= j && ary[i] <= n) {
            i++;
        }
        while (i <= j && ary[j] > n) {
            j--;
        }
        if (i < j) {
            int temp = ary[i];
            ary[i] = ary[j];
            ary[j] = temp;
        } else {
            ary[start] = ary[j];
            ary[j] = n;
            return j;
        }
    }
}
```

