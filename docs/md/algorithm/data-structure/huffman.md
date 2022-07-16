# 树 - 哈夫曼树

> 本文转自 [https://www.pdai.tech/md/algorithm/alg-basic-tree-hafman.html](https://www.pdai.tech/md/algorithm/alg-basic-tree-hafman.html)

> 哈夫曼又称最优二叉树, 是一种带权路径长度最短的二叉树。

## 1. 哈夫曼树相关名词

先看一棵哈夫曼树： (哈夫曼树推理是通过叶子结点，所以理解的时候需要忽略非叶子结点，很多文章在这点上有误导)

![](/imgs/algorithm/data-structure/huffman-1.png)

- **路径与路径长度**：从树中一个结点到另一个结点之间的分支构成了两个结点之间的路径，路径上的分支数目称作路径长度。若规定根结点位于第一层，则根结点到第 $\mathcal{H}$ 层的结点的路径长度为 $\mathcal{H}-1$。如到 $40$ 的路径长度为 $1$；$30$ 的路径长度为 $2$；$20$ 的路径长度为 $3$。
- **结点的权**：将树中的结点赋予一个某种含义的数值作为该结点的权值，该值称为结点的权。
- **带权路径长度**：从根结点到某个结点之间的路径长度与该结点的权的乘积。例如上图结点 $10$ 的路径长度为 $3$，它的带权路径长度为 $10 \times 3 = 30$。
- **树的带权路径长度**：树的带权路径长度为所有叶子结点的带权路径长度之和，称为 $WPL$。上图的 $WPL = 1\times 40+2\times 30+3\times 10+3\times 20 = 190$，而哈夫曼树就是树的带权路径最小的二叉树。

## 2. 哈夫曼树的构建

假设有 $n$ 个权值，则构造出的哈夫曼树有 $n$ 个叶子结点。 $n$ 个权值分别设为 $w_1$、$w_2$、…、$w_n$，哈夫曼树的构造规则为：

- 将 $w_1$、$w_2$、…、$w_n$ 看成是有 $n$ 棵树的森林(每棵树仅有一个结点)；

- 在森林中选出根结点的权值最小的两棵树进行合并，作为一棵新树的左、右子树，且新树的根结点权值为其左、右子树根结点权值之和；

- 从森林中删除选取的两棵树，并将新树加入森林；
- 重复上面两步，直到森林中只剩一棵树为止，该树即为所求得的哈夫曼树。

上图中，它的叶子结点为 `{10，20，30，40}`，以这 $4$ 个权值构建哈夫曼树的过程为：

![](/imgs/algorithm/data-structure/huffman-2.png)

## 3. 哈夫曼编码

为 `{10，20，30，40}` 这四个权值构建了哈夫曼编码后，我们可以由如下规则获得它们的哈夫曼编码：

从根结点到每一个叶子结点的路径上，左分支记为 $0$，右分支记为 $1$，将这些 $0$ 与 $1$ 连起来即为叶子结点的哈夫曼编码。如下图：

| (字母)权值 | 编码 |
| :--------: | :--: |
|     10     | 100  |
|     20     | 101  |
|     30     |  11  |
|     40     |  0   |

由此可见，出现频率越高的字母(也即权值越大)，其编码越短。这便使编码之后的字符串的平均长度、期望值降低，从而达到无损压缩数据的目的。

具体流程如下：

![](/imgs/algorithm/data-structure/huffman-3.png)

## 4. 哈夫曼树的实现

哈夫曼树的重点是如何构造哈夫曼树。本文构造哈夫曼时，用到了"(二叉堆)最小堆"。下面对哈夫曼树进行讲解。

###  4.1 哈夫曼树结点

```java
public class HuffmanNode implements Comparable, Cloneable {

    protected int key;              // 权值
    protected HuffmanNode left;     // 左孩子
    protected HuffmanNode right;    // 右孩子
    protected HuffmanNode parent;   // 父结点

    public HuffmanNode(int key, HuffmanNode left, HuffmanNode right, HuffmanNode parent) {
        this.key = key;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }

    @Override
    public Object clone() {
        Object obj = null;

        try {
            obj = (HuffmanNode) super.clone();  // Object 中的clone()识别出你要复制的是哪一个对象。
        } catch (CloneNotSupportedException e) {
            System.out.println(e.toString());
        }
        return obj;
    }

    @Override
    public int compareTo(Object obj) {
        return this.key - ((HuffmanNode) obj).key;
    }
}
```

### 4.2 哈夫曼树

```java
import java.util.Comparator;
import java.util.Objects;
import java.util.PriorityQueue;

public class Huffman {

    private HuffmanNode mRoot;    // 根结点

    /**
     * 创建Huffman树
     *
     * @param keys 权值数组
     */
    public Huffman(int[] keys) {
        HuffmanNode parent = null;

        // 建立数组 elements 对应的最小堆
        PriorityQueue<HuffmanNode> minHeap = new PriorityQueue<>(Comparator.comparingInt(node -> node.key));
        for (int k : keys) {
            HuffmanNode node = new HuffmanNode(k, null, null, null);
            minHeap.offer(node);
        }

        for (int i = 0; i < keys.length - 1; i++) {

            HuffmanNode left = minHeap.poll();  // 最小结点是左孩子
            HuffmanNode right = minHeap.poll(); // 其次才是右孩子

            Objects.requireNonNull(left);
            Objects.requireNonNull(right);

            // 新建parent结点，左右孩子分别是left/right；
            // parent的大小是左右孩子之和
            parent = new HuffmanNode(left.key + right.key, left, right, null);
            left.parent = parent;
            right.parent = parent;

            // 将parent结点数据拷贝到"最小堆"中
            minHeap.offer(parent);
        }

        mRoot = parent;
    }

    /**
     * 前序遍历"Huffman树"
     */
    private void preOrder(HuffmanNode tree) {
        if (tree != null) {
            System.out.print(tree.key + " ");
            preOrder(tree.left);
            preOrder(tree.right);
        }
    }

    public void preOrder() {
        preOrder(mRoot);
    }

    /**
     * 中序遍历"Huffman树"
     */
    private void inOrder(HuffmanNode tree) {
        if (tree != null) {
            inOrder(tree.left);
            System.out.print(tree.key + " ");
            inOrder(tree.right);
        }
    }

    public void inOrder() {
        inOrder(mRoot);
    }


    /**
     * 后序遍历"Huffman树"
     */
    private void postOrder(HuffmanNode tree) {
        if (tree != null) {
            postOrder(tree.left);
            postOrder(tree.right);
            System.out.print(tree.key + " ");
        }
    }

    public void postOrder() {
        postOrder(mRoot);
    }

    /**
     * 销毁Huffman树
     */
    private void destroy(HuffmanNode tree) {
        if (tree == null)
            return;
        if (tree.left != null)
            destroy(tree.left);
        if (tree.right != null)
            destroy(tree.right);
        tree = null;
    }

    public void destroy() {
        destroy(mRoot);
        mRoot = null;
    }

    /**
     * 打印"Huffman树"
     * key        -- 结点的键值
     * direction  --  0，表示该结点是根结点;
     * -1，表示该结点是它的父结点的左孩子;
     * 1，表示该结点是它的父结点的右孩子。
     */
    private void print(HuffmanNode tree, int key, int direction) {

        if (tree != null) {

            if (direction == 0)    // tree是根结点
                System.out.printf("%2d is root\n", tree.key);
            else                // tree是分支结点
                System.out.printf("%2d is %2d's %6s child\n", tree.key, key, direction == 1 ? "right" : "left");

            print(tree.left, tree.key, -1);
            print(tree.right, tree.key, 1);
        }
    }

    public void print() {
        if (mRoot != null)
            print(mRoot, mRoot.key, 0);
    }
}
```

### 4.3 哈夫曼树测试

```java
public class HuffmanTest {

    private static final int[] a = {5, 6, 8, 7, 15};

    public static void main(String[] args) {
        int i;
        Huffman tree;

        System.out.print("== 添加数组: ");
        for (i = 0; i < a.length; i++)
            System.out.print(a[i] + " ");

        // 创建数组a对应的Huffman树
        tree = new Huffman(a);

        System.out.print("\n== 前序遍历: ");
        tree.preOrder();

        System.out.print("\n== 中序遍历: ");
        tree.inOrder();

        System.out.print("\n== 后序遍历: ");
        tree.postOrder();
        System.out.println();

        System.out.println("== 树的详细信息: ");
        tree.print();

        // 销毁二叉树
        tree.destroy();
    }
}
```

输出结果：

```
== 添加数组: 5 6 8 7 15 
== 前序遍历: 41 15 26 11 5 6 15 7 8 
== 中序遍历: 15 41 5 11 6 26 7 15 8 
== 后序遍历: 15 5 6 11 7 8 15 26 41 
== 树的详细信息: 
Disconnected from the target VM, address: '127.0.0.1:1290', transport: 'socket'
41 is root
15 is 41's   left child
26 is 41's  right child
11 is 26's   left child
 5 is 11's   left child
 6 is 11's  right child
15 is 26's  right child
 7 is 15's   left child
 8 is 15's  right child
```

## 5. 参考文章

- [https://www.cnblogs.com/QG-whz/p/5175485.html](https://www.cnblogs.com/QG-whz/p/5175485.html)

- [https://www.cnblogs.com/skywang12345/p/3706833.html](https://www.cnblogs.com/skywang12345/p/3706833.html)

- [http://c.biancheng.net/view/3398.html](http://c.biancheng.net/view/3398.html)