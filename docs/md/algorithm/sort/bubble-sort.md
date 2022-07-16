# 排序算法 - 冒泡排序

它是一种较简单的排序算法。它会遍历若干次要排序的数列，每次遍历时，它都会从前往后依次的比较相邻两个数的大小；如果前者比后者大，则交换它们的位置。这样，一次遍历之后，最大的元素就在数列的末尾！ 采用相同的方法再次遍历时，第二大的元素就被排列在最大元素之前。重复此操作，直到整个数列都有序为止！

![](/imgs/algorithm/sort/bubble-sort-1.gif)

```java
public void bubbleSort(int[] ary) {
    for (int i = 0; i < ary.length; i++) {
        for (int j = 0; j < ary.length - i - 1; j++) {
            if (ary[j] > ary[j + 1]) {
                int temp = ary[j];
                ary[j] = ary[j + 1];
                ary[j + 1] = temp;
            }
        }
    }
}
```

