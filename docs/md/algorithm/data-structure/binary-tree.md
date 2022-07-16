# 树 - 二叉树

## 1. 树的定义

树是 $n~(n\ge 0)$ 个结点的有限集。当 $n=0$ 时，称为**空树**。在任意一棵非空树中应满足：

- 有且仅有一个特定的称为**根**的结点
- 当 $n\gt1$ 时，其余结点可分为 $m~(m \gt 0)$ 个互不相交的有限集 $T_1,T_2,\cdots,T_m$，其中每个集合本身又是一棵树，并且称为根的**子树**

## 2. 树的相关概念

![](/imgs/algorithm/data-structure/bt-1.png)

- **结点定义**

  考虑加点 $K$。根 $A$ 到结点 $K$ 的唯一路径上的任意结点，称为 $K$ 的**祖先**。如结点 $B$ 是结点 $K$ 的祖先，而结点 $K$ 是结点 $B$ 的**子孙**。其中，结点 $F$ 是结点 $K$ 的**双亲**，结点 $K$ 是结点 $F$ 的**孩子**。结点 $K$ 和结点 $L$ 有共同的双亲，因此称结点 $L$ 是结点 $K$ 的**兄弟**。

- **结点的度**

  树中一个结点的孩子个数称为该**结点的度**，如结点 $A$ 的度为 $3$，结点 $C$ 的度为 $1$。

- **树的度**

  树中结点的最大度数称为**树的度**，该树的度为 $3$。

- **分支结点与叶子结点**

  度大于 $0$ 的结点称为**分支结点**，度为 $0$ 的结点称为**叶子结点**。

- **结点的深度**、**高度和层次**

  结点的层次从树根开始定义，根结点为第 $1$ 层，它的子结点为第 $2$ 层，依次类推。双亲在同一层的结点互为堂兄弟。

  **结点的深度**是从根结点开始自顶向下逐层累加的。

  **结点的高度**是从叶结点开始自底向上逐层累加的。

- **有序树与无序树**

  树中结点的各子树从左到右是有次序的，不能互换，称该树为有序树，否则称为无序树。

- **路径和路径长度**

  树中两个结点之间的路径是由这两个结点之间所经过的结点序列构成的，而路径长度是路径上所经过的边的个数。

- **森林**

  森林是 $m~(m \ge 0)$ 棵互不相交的树的集合。

## 3. 二叉树

### 3.1 二叉树定义

二叉树是另一种树形结构，其特点是每个结点至多只有两棵子树（即二叉树中不存在度大于 $2$ 的结点），并且二叉树的子树有左右之分，其次序不能任意颠倒。

与树相似，二叉树也以递归的形式定义。二叉树是 $n~(n≥0)$ 个结点的有限集合：

- 或者为空二叉树，即 $n=0$
- 或者由一个根结点和两个互不相交的被称为根的左子树和右子树组成。左子树和右子树又分别是一棵二叉树

二叉树是有序树，若将其左、右子树颠倒，则成为另一棵不同的二叉树。二叉树的五种基本形态如下所示：

![](/imgs/algorithm/data-structure/bt-2.png)

### 3.2 几个特殊的二叉树

#### 3.2.1 满二叉树

![](/imgs/algorithm/data-structure/bt-3.png)

一棵高度为 $h$，且含有 $2^h - 1$ 个结点的二叉树称为满二叉树，如上图所示。满二叉树的叶子结点都集中在二叉树的最下一层，并且除叶子结点之外的每个结点度数均为 $2$。

:::tip

可以对满二叉树按层序编号：约定编号从根结点(根结点编号为 $1$)起，自上而下，自左向右。这样，每个结点对应一个编号，对于编号为 $i$ 的结点，若有双亲，则其双亲为$\displaystyle\lfloor \frac{i}{2}\rfloor$,若有左孩子，则左孩子为 $2i$；若有右孩子，则右孩子为 $2i+ 1$。

:::

#### 3.2.2 完全二叉树

![](/imgs/algorithm/data-structure/bt-4.png)

高度为 $h$、有 $n$ 个结点的二叉树，当且仅当其每个结点都与高度为 $h$ 的满二叉树中编号为 $1$ ~ $n$ 的结点一一对应时，称为完全二叉树，

#### 3.2.3 二叉搜索树（BST）

![](/imgs/algorithm/data-structure/bt-5.png)

左子树上所有结点的关键字均小于根结点的关键字，右子树上的所有结点的关键字均大于根结点的关键字，左子树和右子树又各是一棵二叉排序树。

#### 3.2.4 平衡二叉树（AVL）

![](/imgs/algorithm/data-structure/bt-6.png)

为避免树的高度增长过快，降低二叉排序树的性能，规定在插入和删除二叉树结点时，要保证任意结点的左、右子树高度差的绝对值不超过 $1$，将这样的二叉树称为**平衡二叉树**，简称平衡树。定义结点左子树与右子树的高度差为该结点的**平衡因子**，则平衡二叉树结点的平衡因子的值只能是 $-1$、$0$ 或 $1$。

- 平衡二叉树可以是一棵空树
- 平衡二叉树左子树和右子树都是平衡二叉树，且左右子树的高度差的绝对值不超过 $1$。

#### 3.2.5 红黑树

![](/imgs/algorithm/data-structure/bt-7.png)

红黑树也是一种自平衡的二叉查找树。

- 每个结点要么是红的要么是黑的。
- 根结点是黑的。 
- 每个叶结点(叶结点即指树尾端 `NIL` 指针或 `NULL` 结点)都是黑的。 
- 如果一个结点是红的，那么它的两个儿子都是黑的。
- 对于任意结点而言，其到叶结点树尾端 `NIL` 指针的每条路径都包含相同数目的黑结点。

#### 3.2.6 哈夫曼树

哈夫曼树又称最优二叉树，是一种带权路径长度最短的二叉树。给定 $n$ 个权值分别为 $w_1,w_2,\cdots, w_n$ 的结点，一般可以按下面步骤构建:

1. 将这 $n$ 个结点分别作为 $n$ 棵仅含一个结点的二叉树，构成森林 $F$
2. 构造一个新的结点，从 $F$ 中选取两棵根结点权值最小的树作为新结点的左右子树，并且将新结点的权值置为左、右子树上根结点的权值之和
3. 从 $F$ 中删除刚才选出的两棵树，同时将新得到的树加入 $F$ 中
4. 重复步骤 2 和 3，直至 $F$ 中只剩下一棵树为止

从上述构造过程中可以看出哈夫曼树具有如下特点：

- 每个初始结点最终都成为叶结点，且权值越小的结点到根结点的路径长度越大
- 构造过程中共新建了 $n-1$ 个结点(双分支结点)，因此哈夫曼树的结点总数为 $2n-1$
- 每次构造都选择两棵树作为新结点的孩子，因此哈夫曼树中不存在度为 $1$ 的结点

例如，权值 $\{7, 5, 2, 4\}$ 的哈夫曼树的构造过程如下图所示：

![](/imgs/algorithm/data-structure/bt-8.png)

#### 3.2.7 B 树

B 树（B-Tree）是一种自平衡的树，能够保持数据有序。这种数据结构能够让查找数据、顺序访问、插入数据及删除的动作，都在对数时间内完成。B 树，概括来说是一种自平衡的 $m$ 阶树，与自平衡二叉查找树不同，B 树适用于读写相对大的数据块的存储系统，例如磁盘。

- 根结点至少有两个孩子
- 每个中间结点都包含 $k-1$ 个元素和 $k$ 个孩子，其中 $\displaystyle\frac{m}{2} \le k \le m$
- 每一个叶子结点都包含 $k-1$ 个元素，其中 $\displaystyle\frac{m}{2} \le k \le m$
- 所有的叶子结点都位于同一层
- 每个结点中的元素从小到大排列，结点当中 $k-1$ 个元素正好是 $k$ 个孩子包含的元素的值域分划

B-Tree 中的每个结点根据实际情况可以包含大量的关键字信息和分支，如下图所示为一个 3 阶的 B-Tree：

![](/imgs/algorithm/data-structure/bt-9.png)

#### 3.2.8 B+ 树

B+ 树是一种树数据结构，通常用于关系型数据库（如 MySQL）和操作系统的文件系统中。B+ 树的特点是能够保持数据稳定有序，其插入与修改拥有较稳定的对数时间复杂度。B+ 树元素自底向上插入，这与二叉树恰好相反。

在 B 树基础上，为叶子结点增加链表指针(**B 树** + **叶子有序链表**)，所有关键字都在叶子结点中出现，非叶子结点作为叶子结点的索引；B+ 树总是到叶子结点才命中。

B+ 树的非叶子结点不保存数据，只保存子树的临界值(最大或者最小)，所以同样大小的结点，B+ 树相对于 B 树能够有更多的分支，使得这棵树更加矮胖，查询时做的 IO 操作次数也更少。

将上面的的 B-Tree 优化，由于 B+ Tree 的非叶子结点只存储键值信息，假设每个磁盘块能存储 4 个键值及指针信息，则变成 B+ Tree 后其结构如下图所示：

![](/imgs/algorithm/data-structure/bt-10.png)

## 4. 二叉树的遍历

### 4.1二叉树的链式存储

```java
public class Node {
    public int data;
    public Node left;
    public Node right;

    public Node(int data) {
        this(data, null, null);
    }

    public Node(int data, Node left, Node right) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Node.class.getSimpleName() + "[", "]")
                .add("data=" + data)
                .toString();
    }
}
```

为方便测试验证，定义一个辅助类来根据列表序列字符串创建二叉树：

```java
public class TreeUtils {
    public static Node getTree(String[] values) {
        if (values == null || values.length == 0) return null;
        Node[] nodes = new Node[values.length];
        for (int i = 0; i < values.length; i++) {

            if (!"null".equals(values[i])) {
                nodes[i] = new Node(Integer.parseInt(values[i]));
            }
        }
        for (int i = 0; i <= (nodes.length - 1) / 2; i++) {
            if (2 * i + 1 <= nodes.length - 1) {
                nodes[i].left = nodes[2 * i + 1];
            }
            if (2 * i + 2 <= nodes.length - 1) {
                nodes[i].right = nodes[2 * i + 2];
            }
        }
        return nodes[0];
    }
	
    /*
     *      1      
     *    /   \    
     *  2       3  
     *         / \ 
     *        6   7
     */
    public static void main(String[] args) {
        String[] values = {"1", "2", "3", "null", "null", "6", "7"};
        Node tree = TreeUtils.getTree(values);
    }
}
```

### 4.2 先序遍历

先序遍历的操作过程如下：

- 若二叉树为空，则什么也不做

- 访问根结点
- 先序遍历左子树
- 先序遍历右子树

#### 4.2.1 递归实现

```java
void preOrder(Node root, Consumer<Node> consumer){
    if (root != null) {
        consumer.accept(root);
        preOrder(root.left,consumer);
        preOrder(root.right,consumer);
    }
}
```

#### 4.2.3 迭代实现

```java
// Deque<Node> deque = new ArrayDeque<>();
void preOrder2(Node root, Consumer<Node> consumer) {
    if (root == null) return;
    Node node = root;
    while (node != null || !deque.isEmpty()) {
        if (node != null) {
            consumer.accept(node);
            deque.push(node);
            node = node.left;
        } else {
            node = deque.pop();
            node = node.right;
        }
    }
}
```



### 4.3 中序遍历

中序遍历的操作过程如下：

- 若二叉树为空，则什么也不做

- 中序遍历左子树
- 访问根结点
- 中序遍历右子树

#### 4.3.1 递归实现

```java
void inOrder(Node root, Consumer<Node> consumer) {
    if (root != null) {
        inOrder(root.left, consumer);
        consumer.accept(root);
        inOrder(root.right, consumer);
    }
}
```

#### 4.3.2 迭代实现

```java
// Deque<Node> deque = new ArrayDeque<>();
void inOrder2(Node root, Consumer<Node> consumer) {
    if (root == null) return;
    Node node = root;
    while (node != null || !deque.isEmpty()) {
        while (node != null) {
            deque.push(node);
            node = node.left;
        }
        node = deque.pop();
        consumer.accept(node);
        node = node.right;
    }
}
```

### 4.4 后序遍历

#### 4.4.1 递归实现

后序遍历的操作过程如下：

- 若二叉树为空，则什么也不做

- 后序遍历左子树
- 后序遍历右子树
- 访问根结点

```java
void postOrder(Node root, Consumer<Node> consumer) {
    if (root != null) {
        postOrder(root.left, consumer);
        postOrder(root.right, consumer);
        consumer.accept(root);
    }
}
```

#### 4.4.2 迭代实现（单栈）

```java
// Deque<Node> deque = new ArrayDeque<>();
void postOrder2(Node root, Consumer<Node> consumer) {
    if (root == null) return;
    Node pre = null;
    Node node = root;
    while (node != null || !deque.isEmpty()) {
        while (node != null) { // 后序遍历仍然要先遍历左子树，所以如果有左子树，则当前结点先入栈，等待访问
            deque.push(node);
            node = node.left;
        }
        node = deque.peek(); // 不能直接出栈，因为如果右子树存在且没被遍历，还要先遍历右子树
        if (Objects.requireNonNull(node).right != null && node.right != pre) { // 如果右子树存在且没有被遍历过时
            node = node.right; // 先遍历右子树，也需要经过一开始的操作
        } else {
            node = deque.pop(); // 确认确实该遍历它了才出栈
            consumer.accept(node);
            pre = node; // 遍历之后对于下一个结点它就是前结点，记录一下
            node = null; // 后序遍历出栈的结点是子树的根结点，其左右子树已经遍历完成，所以应该重置为 null，避免重复遍历
        }
    }
}
```

#### 4.4.3 迭代实现（双栈）

```java
// Deque<Node> deque = new ArrayDeque<>();
// Deque<Node> deque2 = new ArrayDeque<>();
void postOrder3(Node root, Consumer<Node> consumer) {
    if (root == null) return;
    Node node = root;
    while (node != null || !deque.isEmpty()) {
        if (node != null) {
            deque2.push(node);
            deque.push(node);
            node = node.right;
        } else {
            node = deque.pop();
            node = node.left;
        }
    }
    while (!deque2.isEmpty()) {
        consumer.accept(deque2.pop());
    }
}
```

### 4.5 层次遍历

```java
// Deque<Node> deque = new ArrayDeque<>();
void levelOrder(Node root, Consumer<Node> consumer) {
    if (root == null) return;
    deque.offer(root);
    while (!deque.isEmpty()) {
        Node node = deque.poll();
        consumer.accept(node);
        if (node.left != null) {
            deque.offer(node.left);
        }
        if (node.right != null) {
            deque.offer(node.right);
        }
    }
}
```

