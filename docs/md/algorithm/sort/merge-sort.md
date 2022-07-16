# 排序算法 - 归并排序

归并排序是一种典型的分治算法，将数据不停地分成两组知道有序，然后依次合并有序列表。

![](/imgs/algorithm/sort/merge-sort-1.gif)

```java
public void mergeSort(int[] ary, int start, int end) {
    if (start < end) {
        int middle = (start + end) / 2;
        mergeSort(ary, start, middle);
        mergeSort(ary, middle + 1, end);
        merge(ary, start, middle, end);
    }
}

private void merge(int[] ary, int start, int middle, int end) {
    int[] temp = new int[end - start + 1];
    int i = start, j = middle + 1, k = 0;
    while (i <= middle && j <= end) {
        if (ary[i] < ary[j]) {
            temp[k++] = ary[i++];
        } else {
            temp[k++] = ary[j++];
        }
    }
    while (i <= middle) {
        temp[k++] = ary[i++];
    }
    while (j <= end) {
        temp[k++] = ary[j++];
    }
    System.arraycopy(temp, 0, ary, start, end - start + 1);
}
```

