# 排序算法 - 插入排序

直接插入排序 (Straight Insertion Sort) 的基本思想是：把 $n$ 个待排序的元素看成为一个有序表和一个无序表。开始时有序表中只包含 $1$ 个元素，无序表中包含有 $n-1$ 个元素，排序过程中每次从无序表中取出第一个元素，将它插入到有序表中的适当位置，使之成为新的有序表，重复 $n-1$ 次可完成排序过程。

![](/imgs/algorithm/sort/insertion-sort-1.gif)

```java
public void insertionSort(int[] ary) {
    for (int i = 0; i < ary.length; i++) {
        int current = ary[i];
        int j = i - 1;
        while (j >= 0 && ary[j] > current) {
            ary[j + 1] = ary[j--];
        }
        ary[j + 1] = current;
    }
}
```

