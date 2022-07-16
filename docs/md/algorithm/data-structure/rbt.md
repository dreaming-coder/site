# 树 - 红黑树
## 1. 红黑树的定义

**红黑树是一种近似平衡的二叉查找树，它能够确保任何一个结点的左右子树的高度差不会超过二者中较低那个的一倍**。具体来说，红黑树是满足如下条件的二叉查找树(binary search tree)：

1. 每个结点要么是红色，要么是黑色
2. **根结点必须是黑色**
3. **红色结点不能连续**（红色结点的孩子和父亲都不能是红色）
4. **对于每个结点，从该结点至 `null`（叶子结点）的任何路径，都含有相同个数的黑色结点**

在树的结构发生改变时（插入或者删除操作），往往会破坏上述条件 3 或条件 4，需要通过调整使得查找树重新满足红黑树的约束条件。

:::tip

核心操作旋转与平衡二叉树中的旋转是一致的，由于平衡二叉树性价比不是那么好，因此放宽了一些要求形成了红黑树。

:::

## 2. 红黑树的结点

```java
private static final boolean RED = true;
private static final boolean BLACK = false;

private static class Node {
    public Node parent; // 这里多了一个父结点的指针，因为自平衡需要用到祖先结点，以空间换效率
    public Node left;
    public Node right;
    public boolean color;
    
    // 因为红黑树经常用于查找，一般存储的是键值对，这里暂用两个变量表示
    public int key;
    public int value;

    public Node(Node parent, int key, int value) {
        this.parent = parent;
        this.key = key;
        this.value = value;
        this.color = RED;
    }

    public Node(Node parent, Node left, Node right, int key, int value) {
        this.parent = parent;
        this.left = left;
        this.right = right;
        this.key = key;
        this.value = value;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Node.class.getSimpleName() + "[", "]")
            .add("color=" + color)
            .add("key=" + key)
            .add("value=" + value)
            .toString();
    }
}
```

与之相关的还有一些基本操作：

```java
private void setColor(Node node, boolean color) {
    if (node != null) {
        node.color = color;
    }
}

// 叶子结点（NULL结点）是黑色的
private boolean colorOf(Node node) {
    return node == null ? BLACK : node.color;
}
```

## 3. 红黑树的查找

```java
public final Node find(Integer key) {
    Node r = this.root;
    while (r != null) {
        int cmp = key.compareTo(r.key);
        if (cmp < 0) {
            r = r.left;
        } else if (cmp > 0) {
            r = r.right;
        } else {
            return r;
        }
    }
    return null;
}
```

## 4. 红黑树的插入

插入操作包括两部分工作：一查找插入的位置；二插入后自平衡。

插入的结点应该是什么颜色？答案是**红色**。理由很简单，红色在父结点（如果存在）为黑色结点时，红黑树的黑色平衡没被破坏，不需要做自平衡操作。但如果插入结点是黑色，那么插入位置所在的子树黑色结点总是多 $1$，必须做自平衡。红黑树插入结点后的自平衡情景主要有以下几种：

### 4.1 红黑树为空树

![](/imgs/algorithm/data-structure/rbt-insert-1.png) 

处理：插入结点的父结点为空，说明插入结点就是根结点，将结点设为黑色即可。

### 4.2 插入结点的 key 已存在

处理：更新键值对的 value 值即可。

### 4.3 插入结点的父结点为黑色结点

![](/imgs/algorithm/data-structure/rbt-insert-2.png)

:::tip

`I` 表示插入的结点。

:::

处理：由于插入的结点是红色的，当插入结点的父结点为黑色时，并不会影响红黑树的平衡，直接插入即可，无需做自平衡。

### 4.4 插入结点的父结点为红色结点

:::warning

我们已经知道，红黑树的根结点必然是黑色的，既然插入结点的父结点是红色结点，那么插入结点必然存在祖父结点（必然是黑色的，因为红色结点不能连续）。这点很重要，因为后续的旋转操作肯定需要祖父结点的参与。

:::

#### 4.4.1 叔叔结点存在且为红色结点

![](/imgs/algorithm/data-structure/rbt-insert-3.png)

处理：将插入结点的父结点和叔叔结点设为黑色，祖父结点设为红色即可，然后将祖父结点作为新的插入结点来判断。

:::tip

如果插入结点的父结点是黑色，那么无需再做任何处理；但**如果插入结点的父结点是红色，按照上述方法调整，但是祖父结点变为红色了，还可能出现连续的红色结点，相当于插入结点，所以还需要把祖父结点当作新的插入结点，继续做插入操作自平衡处理，直到平衡为止**。

:::

#### 4.4.2 叔叔结点不存在或为黑结点

:::tip

- 对 LL 旋转、RR 旋转、LR 旋转、RL 旋转不熟悉的先看看[平衡二叉树](/md/algorithm/data-structure/avl.html)。
- 结点不存在时也是黑色。
- 此种情况调整后一步到位，不存在传递的不平衡。

:::

此时对应有四种情况：

- **Case 1: 父结点是祖父结点的左孩子，插入结点是父结点的左孩子**

![](/imgs/algorithm/data-structure/rbt-insert-4.png)

处理步骤：

1. 父结点设为黑色，祖先结点设为红色
2. 对祖先结点进行 AVL 树中的 LL 旋转，这里即为右旋

- **Case 2: 父结点是祖父结点的左孩子，插入结点是父结点的右孩子**

![](/imgs/algorithm/data-structure/rbt-insert-5.png)

处理步骤：

1. 对父结点进行 AVL 树中的 RR 旋转（此时其实已经转换成上一种情况了）
2. 插入结点设为黑色，祖父结点设为红色
3. 对祖父结点进行 AVL 树中的 LL 旋转

:::tip

大致类似于 AVL 树中的 LR 旋转。

:::

- **Case 3: 父结点是祖父结点的右孩子，插入结点是父结点的右孩子**

![](/imgs/algorithm/data-structure/rbt-insert-6.png)

处理步骤：

1. 将父结点设为黑色，祖父结点设为红色
2. 对祖先结点进行 AVL 树中的 RR 旋转，这里即为左旋

- **Case 4: 父结点是祖父结点的右孩子，插入结点是父结点的左孩子**

![](/imgs/algorithm/data-structure/rbt-insert-7.png)

处理步骤：

1. 对父结点进行 AVL 树中的 LL 旋转（此时其实已经转换成上一种情况了）
2. 插入结点设为黑色，祖父结点设为红色
3. 对祖父结点进行 AVL 树中的 RR 旋转

:::tip

大致类似于 AVL 树中的 RL 旋转。

:::

### 4.5 代码实现

综上所述，考虑可读性和代码的简洁，我们仅将左旋与右旋抽象为基本操作封装为函数，其他逻辑在插入函数里体现。

- 旋转

```java
/**
  * @param root 红黑树的根结点
  * @param xp   不平衡点，一般就是插入结点的父结点，即xp
  * @return 调整后的根结点
  */
private static Node rotateLeft(Node root, Node xp) {
    /*
     * 注意，变量的命名是按照调整前的位置起的，方便理解变换过程
     * 【情况一】
     *              xpp                   xpp
     *              /                     /
     *            xp                     x
     *           / \        ====>       / \
     *         xpl  x                  xp  xr
     *             / \                /  \
     *            xl  xr             xpl  xl
     *
     * 【情况二】
     *        xpp                    xpp
     *           \                      \
     *            xp                     x
     *           / \        ====>       / \
     *         xpl  x                  xp  xr
     *             / \                /  \
     *            xl  xr             xpl  xl
     */

    Node x, xpp, xl;
    // 旋转首先要保证插入结点x和其父结点xp存在
    if (xp != null && (x = xp.right) != null) {
        // 将x的左孩子赋值给xp的右孩子
        if ((xl = xp.right = x.left) != null) {
            xl.parent = xp; // 结点不为空的情况下要重新赋值父结点的指向
        }
        // 如果xp是根结点，则旋转后，应当将新的根结点x颜色设为黑色
        if ((xpp = x.parent = xp.parent) == null) {
            setColor(root = x, BLACK);
        }
        // 对应注释里的情况一
        else if (xpp.left == xp) {
            xpp.left = x;
        }
        // 对应注释里的情况二
        else {
            xpp.right = x;
        }
        x.left = xp;
        xp.parent = x;
    }
    return root;
}

/**
  * @param root 红黑树的根结点
  * @param xp   不平衡点，一般就是插入结点的父结点，即xp
  * @return 调整后的根结点
  */
private static Node rotateRight(Node root, Node xp) {
    /*
     * 注意，变量的命名是按照调整前的位置起的，方便理解变换过程
     * 【情况一】
     *              xpp                   xpp
     *              /                     /
     *            xp                     x
     *           /  \        ====>      / \
     *          x   xpr                xl  xp
     *         / \                        /  \
     *       xl   xr                     xr  xpr
     *
     * 【情况二】
     *         xpp                    xpp
     *           \                      \
     *            xp                     x
     *           /  \        ====>      / \
     *          x   xpr                xl  xp
     *         / \                        /  \
     *       xl   xr                     xr  xpr
     */

    Node x, xpp, xr;
    // 旋转首先要保证插入结点x和其父结点xp存在
    if (xp != null && (x = xp.left) != null) {
        // 将x的右孩子赋值给xp的左孩子
        if ((xr = xp.left = x.right) != null) {
            xr.parent = xp; // 结点不为空的情况下要重新赋值父结点的指向
        }
        // 如果xp是根结点，则旋转后，应当将新的根结点x颜色设为黑色
        if ((xpp = x.parent = xp.parent) == null) {
            setColor(root = x, BLACK);
        }
        // 对应注释里的情况一
        else if (xpp.left == xp) {
            xpp.left = x;
        }
        // 对应注释里的情况二
        else {
            xpp.right = x;
        }
        x.right = xp;
        xp.parent = x;
    }
    return root;
}
```

- 插入

```java
/**
  * 红黑树的插入，分为两步：
  * 1. 遍历插入
  * 2. 自平衡调整
  *
  * @param k
  * @param v
  */
public void put(Integer k, Integer v) {
    Node node = this.root;
    // 红黑树为空，直接创建结点作为根结点
    if (node == null) {
        this.root = new Node(k, v);
        return;
    }
    Node parent = null;
    int cmp = 0;
    while (node != null) {
        parent = node;
        cmp = k.compareTo(node.key);
        if (cmp < 0) {
            node = node.left;
        } else if (cmp > 0) {
            node = node.right;
        } else {
            node.value = v;
            return;
        }
    }
    Node newNode = new Node(parent, k, v);
    if (cmp < 0) {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }

    root = balanceInsertion(root, newNode);
}
```

- 自平衡

```java
/**
  * 该函数用于结点插入完成后的平衡调整
  *
  * @param root 根结点
  * @param x    插入结点
  * @return 调整后的根结点
  *
  * 从下面的循环代码可以看出来，自平衡是从下往上调整的
  */
private static Node balanceInsertion(Node root, Node x) {
    setColor(x, RED); // 插入的结点都是红色结点
    for (Node xp, xpp, xppl, xppr; ; ) {
        // 对应 3.1 的情况
        // 如果插入结点的父结点为空，x结点就是根结点，直接变黑色返回
        if ((xp = x.parent) == null) {
            setColor(x, BLACK);
            return x;
        }
        // 对应 3.3 的情况
        // 如果插入结点的父结点是黑色或者插入结点的父结点就是根结点，则无需调整直接返回
        // 这里注意一下，后一个逻辑语句其实没啥意义，只是为了在父结点是红色情况下给xpp变量赋值
        // 因为红黑树的根结点必然是黑色的，既然插入结点的父结点是红色结点，那么插入结点必然
        // 存在祖父结点（必然是黑色的，因为红色结点不能连续）。
        else if (colorOf(xp) == BLACK || (xpp = xp.parent) == null) {
            setColor(root, BLACK);
            return root;
        }

        /* ------------------------------------------------------------ */
        /*                开始插入结点的父结点为红色的情况                  */
        /* ------------------------------------------------------------ */

        // 如果插入结点的父结点是祖先结点的左孩子
        if (xp == (xppl = xpp.left)) {
            // 对应 3.4.1 的情况
            // 如果叔叔结点存在，且颜色也为红色，则祖父变红色，父结点和叔叔结点变黑色，插入结点变为祖父结点
            if ((xppr = xpp.right) != null && colorOf(xppr) == RED) {
                setColor(xpp, RED);
                setColor(xp, BLACK);
                setColor(xppr, BLACK);
                x = xpp;
            }
            // 对应 3.4.2 的前两种情况
            else {
                // 父结点是祖父结点的左孩子，插入结点是父结点的右孩子
                // 此时需要先进行 RR 旋转（即左旋）
                if (x == xp.right) {
                    root = rotateLeft(root, x = xp);
                    // 这一步变换是为了统一代码格式，方便共用
                    // 上面x=xp了，左旋过程中xp.parent变成插入结点x，因此下面的xp实际上就是插入的结点x
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                // 父结点是祖父结点的左孩子，插入结点是父结点的左孩子
                // 此时直接进行 L了旋转（即右旋）
                if (xp != null) { // 例行避免空指针
                    setColor(xp, BLACK);
                    // 如果xp不是根结点
                    if (xpp != null) {
                        setColor(xpp, RED);
                        root = rotateRight(root, xpp);
                    }
                }
            }
        }
        // 如果插入结点的父结点是祖先结点的右孩子
        else {
            // 对应 3.4.1 的情况
            // 如果叔叔结点存在，且颜色也为红色，则祖父变红色，父结点和叔叔结点变黑色，插入结点变为祖父结点
            if (xppl != null && colorOf(xppl) == RED) {
                setColor(xppl, BLACK);
                setColor(xp, BLACK);
                setColor(xpp, RED);
                x = xpp;
            }
            // 对应 3.4.2 的后两种情况
            else {
                // 父结点是祖父结点的右孩子，插入结点是父结点的左孩子
                if (x == xp.left) {
                    root = rotateRight(root, x = xp);
                    // 这一步变换是为了统一代码格式，方便共用
                    // 上面x=xp了，左旋过程中xp.parent变成插入结点x，因此下面的xp实际上就是插入的结点x
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                // 父结点是祖父结点的右孩子，插入结点是父结点的右孩子
                // 此时直接进行 L了旋转（即右旋）
                if (xp != null) { // 例行避免空指针
                    setColor(xp, BLACK);
                    // 如果xp不是根结点
                    if (xpp != null) {
                        setColor(xpp, RED);
                        root = rotateLeft(root, xpp);
                    }
                }
            }
        }
    }
}
```

## 5. 红黑树的删除

将红黑树内的某一个结点删除。需要执行的操作依次是：首先，将红黑树当作一颗二叉查找树，将该结点从二叉查找树中删除；然后，通过"旋转和重新着色"等一系列来修正该树，使之重新成为一棵红黑树。详细描述如下：

**第一步：将红黑树当作一棵二叉查找树，将结点删除。**

这和"删除常规二叉查找树中删除结点的方法是一样的"。分 3 种情况：

1. 被删除结点没有儿子，即为叶结点。那么，直接将该结点删除就 OK 了。

2. 被删除结点只有一个儿子。那么，直接删除该结点，并用该结点的唯一子结点顶替它的位置

3. 被删除结点有两个儿子。那么，先找出它的后继结点；然后把“它的后继结点的内容”复制给“该结点的内容”；之后，删除“它的后继结点”。在这里，后继结点相当于替身，在将后继结点的内容复制给"被删除结点"之后，再将后继结点删除。这样就巧妙的将问题转换为"删除后继结点"的情况了，下面就考虑后继结点。 在"被删除结点"有两个非空子结点的情况下，它的后继结点不可能是双子非空。既然"的后继结点"不可能双子都非空，就意味着"该结点的后继结点"要么没有儿子，要么只有一个儿子。若没有儿子，则按"情况 ① "进行处理；若只有一个儿子，则按"情况 ② "进行处理。

**第二步：通过"旋转和重新着色"等一系列来修正该树，使之重新成为一棵红黑树。**

因为"第一步"中删除结点之后，可能会违背红黑树的特性。所以需要通过"旋转和重新着色"来修正该树，使之重新成为一棵红黑树。

### 5.1 结点的删除

下面对代码的变量定义做一点说明：

![](/imgs/algorithm/data-structure/rbt-remove-1.png)

:::tip

**我们用 `p` 表示目标结点，用 `s` 表示真正要删除的结点，用 `replacement` 表示 `s` 删除后顶替其位置的结点，`s` 可能为 `null`。**

:::

首先来看看求后继结点的函数：

```java
// 查找以该结点为根的右子树中的最小结点
public static Node successor(Node node) {
    if (node.right == null) {
        return null;
    }
    node = node.right;
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```

下面来看下删除结点的逻辑，删除的时候先不用在意结点颜色，按照二叉搜索树的删除规律删除即可，最后根据真正删除结点的颜色，判断是否需要自平衡调整。

- `TreeMap` 源码风格

```java
public void remove(Integer key) {
    Node p = this.find(key);
    if (p == null) return;
    // 如果有2个子树，则用后继结点替代，否则要删除的就是该结点
    if (p.left != null && p.right != null) {
        Node s = successor(p);
        p.key = s.key;
        p.value = s.value;
        p = s;
    }
    /* 至此s结点最多只有一棵子树，是真正的删除结点 */
    Node replacement = p.left != null ? p.left : p.right;
    // 如果删除结点s不是叶子结点（单子树）
    if (replacement != null) {
        if ((replacement.parent = p.parent) == null)
            // 如果s就是根结点（说明p是单左子树的根结点）
            root = replacement;
        else if (p == p.parent.left)
            // 如果s父结点存在，且是其父结点的左子树
            p.parent.left = replacement;
        else
            // 如果s父结点存在，且是其父结点的右子树
            p.parent.right = replacement;
        // Null out links, so they are OK to use by fixAfterDeletion.
        p.left = p.right = p.parent = null;
    } else if (p.parent == null) { // return if we are the only node.
        // 如果删除结点s是叶子结点，且是根结点
        root = null;
    } else { //  No children. Use self as phantom replacement and unlink.
        replacement = p;
    }
    // 只有删除结点是黑色才会引起不平衡
    root = p.color == BLACK ? balanceDeletion(root, replacement) : root;

    // 对应传入的不是替代结点，而是删除结点的情况，需要清空
    if (p.parent != null) {
        if (p == p.parent.left) {
            p.parent.left = null;
        } else {
            p.parent.right = null;
        }
    }
}
```

- `HashMap` 源码风格

```java
public void remove2(Integer key) {
    Node p = this.find(key);
    if (p == null) return;
    Node pl = p.left, pr = p.right, replacement;
    // 如果有2个子树，则用后继结点替代，否则要删除的就是该结点
    if (pl != null && pr != null) {
        Node s = successor(p);
        assert s != null; // pr!=null，所以s!=null
        /*-------------------------交换结点开始----------------------------------*/
        swapColor(s, p); // 交换结点颜色
        Node sr = s.right, pp = p.parent;
        // 如果后继结点就是p的右孩子
        if (s == pr) {
            p.parent = s;
            s.right = p;
        } else {
            Node sp = s.parent;
            if ((p.parent = sp) != null) {
                if (s == sp.left)
                    sp.left = p;
                else
                    sp.right = p;
            }
            if ((s.right = pr) != null)
                pr.parent = s;
        }
        p.left = null;
        if ((p.right = sr) != null)
            sr.parent = p;
        if ((s.left = pl) != null)
            pl.parent = s;
        if ((s.parent = pp) == null)
            root = s;
        else if (p == pp.left)
            pp.left = s;
        else
            pp.right = s;
        /*-------------------------交换结点结束----------------------------------*/

        // 定义替代结点
        if (sr != null) {
            replacement = sr;
        } else {
            // 没有孩子，使用删除结点虚幻替代
            replacement = p;
        }
    } else if (pl != null) {
        replacement = pl;
    } else if (pr != null) {
        replacement = pr;
    } else {
        replacement = p;
    }

    // 在不是只有根结点的情况下，删除结点p
    // 注意，此时p已经是交换后的位置，就是真正要删除的位置
    if (replacement != p) {
        Node pp = replacement.parent = p.parent;
        if (pp == null)
            root = replacement;
        else if (p == pp.left)
            pp.left = replacement;
        else
            pp.right = replacement;
        p.left = p.right = p.parent = null;
    }

    // 只有删除结点是黑色才会引起不平衡
    root = colorOf(p) == BLACK ? balanceDeletion2(root, replacement) : root;

    // 保证该结点删除，快速被垃圾回收
    if (replacement == p) {
        Node pp = p.parent;
        p.parent = null;
        if (pp != null) {
            if (p == pp.left)
                pp.left = null;
            else if (p == pp.right)
                pp.right = null;
        }
    }
}
```

### 5.2 自平衡调整

下面对删除函数进行分析。在分析之前，我们再次温习一下红黑树的几个特性：

:::tip

1. 每个结点或者是**黑色**，或者是**红色**。
2. 根结点是**黑色**。
3. 每个叶子结点是**黑色**。 [注意：这里叶子结点，是指为空的叶子结点！]
4. 如果一个结点是**红色**的，则它的子结点必须是**黑色**的。
5. 对于每个结点，从该结点至 `null`（叶子结点）的任何路径，都含有相同个数的**黑色**结点。

:::

前面我们将红黑树的删除大致分为两步，在第一步中"将红黑树当作一颗二叉查找树，将结点删除"后，可能违反②、④、⑤三个特性。第二步需要解决上面的三个问题，进而保持红黑树的全部特性。

自平衡的逻辑有些复杂，我们可以用一个分析技巧：

我们从被删结点后来顶替它的那个结点（设该结点为 `x`）开始调整，并假设它有额外的一重黑色。可以认为这个额外的的黑色是从它的父结点被删除后继承给它的，它现在可以容纳两种颜色，如果它原来是红色，那么现在是红+黑，如果原来是黑色，那么它现在的颜色是黑+黑。有了这重额外的黑色，原红黑树性质 ⑤ 就能保持不变。现在只要恢复其它性质就可以了，做法还是尽量向根移动和穷举所有可能性。

现在，我们面临的问题，由解决"违反了特性 ②、④、⑤ 三个特性"转换成了"解决违反特性 ①、②、④ 三个特性"。`balanceDeletion()` 需要做的就是通过算法恢复红黑树的特性 ①、②、④ 。`balanceDeletion()` 的思想是：将 `x` 所包含的额外的黑色不断沿树上移(向根方向移动)，直到出现下面的情况之一：

<ol style="list-style-type:square">
    <li>
    	x 指向一个 “红 + 黑” 结点，此时将 x 设为一个黑结点即可
    </li>
    <li>
    	x 指向根结点，此时将 x 设为一个黑色结点即可
    </li>
    <li>
    	其他
    </li>
</ol>

据此可以概括为三种情况：

- 情况说明：x 是 “红 + 黑” 结点

  处理方法：直接把 x 设为黑色，此时红黑树性质全部恢复

- 情况说明：x 是 “黑 + 黑” 结点，且 x 是根

  处理方法：什么都不做，结束，此时红黑树性质全部恢复

- 情况说明：x 是 “黑 + 黑” 结点，且 x 不是根

  处理方法：此时分为四种子情况，如下表所示

:::tip

下面以 `x` 是 `xp` 的左孩子为例介绍处理方式，实际代码应该还有对称的方式。

:::

#### 5.2.1 Case 1: x 是"黑+黑"结点，x 的兄弟是红色结点

此时，由于 `x` 的兄弟结点 `s` 是红色结点，所以，`xp`  以及 `sl`、`sr` 都只能是黑色结点。

![](/imgs/algorithm/data-structure/rbt-remove-2.png)

处理策略：

1. 将 `xp`  设为红色， `s` 结点设为黑色
2. 对结点 `xp` 进行左旋
3. 此时情况转换为 `x` 是“黑+黑”结点的情况继续自平衡

#### 5.2.2 Case 2: x 是"黑+黑"结点，x 的兄弟是黑色结点，x 的兄弟结点的两个孩子都是黑色结点

![](/imgs/algorithm/data-structure/rbt-remove-3.png)

处理策略：

1. 将 `s` 结点设为红色
2. 设置 `xp` 结点为新的 `x` 结点

:::tip

这个情况的处理思想：是**将 `x` 中多余的一个黑色属性上移(往根方向移动)**。 `x` 是 “**黑** + **黑**” 结点，我们将 `x` 由 “**黑** + **黑**” 结点变成 “**黑**” 结点，多余的一个 “**黑**” 属性移到 `x` 的父结点中，即 `x` 的父结点多出了一个**黑**属性(若 `x` 的父结点原先是“**黑**”，则此时变成了“**黑**+**黑**”；若 `x` 的父结点原先是“**红**”，则此时变成了“**红** + **黑**”)。 

此时，需要注意的是：所有经过 `x` 的分支中**黑**结点个数没变化；但是，所有经过 `x` 的兄弟结点的分支中黑色结点的个数增加了 $1$ (因为 `x` 的父结点多了一个**黑色**属性)！为了解决这个问题，我们需要将所有经过 `x` 的兄弟结点的分支中黑色结点的个数减 $1$ 即可，那么就可以通过将 `x` 的兄弟结点由**黑色**变成**红色**来实现。

:::

:::warning

经过上面的步骤（将 `x` 的兄弟结点设为**红色**），多余的一个颜色属性(**黑色**)已经跑到 `x` 的父结点中。我们需要将 `x` 的父结点设为新的 `x` 结点进行处理。若新的 `x` 结点”是“**黑**+**红**”，直接将新的 `x` 结点设为**黑色**，即可完全解决该问题；若新的 `x` 结点是 “**黑** + **黑**”，则需要对新的 `x` 结点进行进一步处理。

:::

#### 5.2.3 Case 3: x 是"黑+黑"结点，x 的兄弟是黑色结点，x 的兄弟结点的左孩子是红色，右孩子是黑色

![](/imgs/algorithm/data-structure/rbt-remove-4.png)

处理策略：

1. 将 `sl` 结点设为黑色，`s` 结点设为红色
2. 对 `s` 结点进行右旋
3. 更新 `s` 结点，由于右旋，所以 `s` 的指向变化了

:::tip

我们处理 Case 3 的目的是为了将 Case 3 进行转换，转换成 Case 4，从而进行进一步的处理。转换的方式是对 `x` 的兄弟结点进行右旋；为了保证右旋后，它仍然是红黑树，就需要在右旋前将 `x` 的兄弟结点的左孩子设为**黑色**，同时将 `x` 的兄弟结点设为**红色**；右旋后，由于 `x` 的兄弟结点发生了变化，需要更新 `x` 的兄弟结点，从而进行后续处理。

:::

#### 5.2.4 Case 4: x 是"黑+黑"结点，x 的兄弟是黑色结点，x 的兄弟结点的右孩子是红色，左孩子任意颜色

![](/imgs/algorithm/data-structure/rbt-remove-5.png)

处理策略：

1. 将 `xp` 结点的颜色赋值给 `s` 结点
2. 将 `xp` 结点设为黑色
3. 将 `sr` 结点设为黑色
4. 对 `xp` 结点进行左旋
5. 将 `x` 指向根结点（为了退出循环，详见代码）

:::warning

我们处理 Case 4 的目的是：去掉 `x` 中额外的黑色，将 `x` 变成单独的黑色。处理的方式是：进行颜色修改，然后对 `x` 的父结点进行左旋。下面，我们来分析是如何实现的。

我们要对 `xp` 进行左旋。但在左旋前，我们需要调换 `xp` 和 `s` 的颜色，并设置 `sr` 为黑色。为什么需要这里处理呢？因为左旋后，`xp` 和 `sl` 是父子关系，而我们如果 `sl` 结点是红色，如果 `xp` 结点也是红色，则违背了特性 ④（不能有连续的红色结点）；为了解决这一问题，我们将 `xp` 设置为黑色。 但是，`xp` 设置为黑色之后，为了保证满足特性 ⑤（每个结点到 `null` 结点任何路径含义相同数目的黑色结点），即为了保证左旋之后：

1. 同时经过根结点和 `x` 结点的分支的黑色结点个数不变

   只需要 `x` 丢弃它多余的颜色即可。因为 `x` 的颜色是 “黑 + 黑”，而左旋后同时经过根结点和 `x` 的分支的黑色结点个数增加了 $1$；现在，只需将 `x` 由 “黑 + 黑” 变成单独的黑结点，即可满足这（1）。

2. 同时经过根结点和 `sl` 的分支的黑色结点数不变

   只需要将 `xp` 的原始颜色赋值给 `s` 即可。之前，我们已经将 `xp` 设置为黑色(将 `s` 的颜色"黑色"，赋值给 `xp`)。至此，我们算是调换了 `xp` 和 `s` 的颜色。

3. 同时经过根结点和 `sr` 的分支的黑色结点数不变

   在 （2） 已经满足的情况下，若要满足 （3），只需要将 `sr` 设置为黑色即可。

经过上面的处理之后，红黑树的特性全部得到的满足！接着，我们将 `x` 设为根结点，就可以跳出 `while` 循环（参考代码），即完成了全部处理。

:::

:::tip

**理解 Case 4 的核心，是了解如何去掉当前结点额外的黑色。**

:::

- `TreeMap` 源码风格

```java
private static Node balanceDeletion(Node root, Node x) {
    while (x != root && colorOf(x) == BLACK) {
        // 如果x是xp的左孩子
        if (x == leftOf(parentOf(x))) {
            Node sib = rightOf(parentOf(x)); // 定义x的兄弟结点
            // Case 1：x是"黑+黑"结点，x的兄弟是红色结点
            if (colorOf(sib) == RED) {
                setColor(sib, BLACK);
                setColor(parentOf(x), RED);
                root = rotateLeft(root, parentOf(x));
                sib = rightOf(parentOf(x));
            }
            // Case 2：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的两个孩子都是黑色结点
            if (colorOf(leftOf(sib)) == BLACK && colorOf(rightOf(sib)) == BLACK) {
                setColor(sib, RED);
                x = parentOf(x);
            } else {
                // Case 3：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的左孩子是红色，右孩子是黑色
                if (colorOf(rightOf(sib)) == BLACK) {
                    setColor(leftOf(sib), BLACK);
                    setColor(sib, RED);
                    root = rotateRight(root, sib);
                    sib = rightOf(parentOf(x));
                }
                // Case 4：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的右孩子是红色，左孩子任意颜色
                setColor(sib, colorOf(parentOf(x)));
                setColor(parentOf(x), BLACK);
                setColor(rightOf(sib), BLACK);
                root = rotateLeft(root, parentOf(x));
                x = root;
            }
        }
        // symmetric
        else {
            Node sib = leftOf(parentOf(x));
            if (colorOf(sib) == RED) {
                setColor(sib, BLACK);
                setColor(parentOf(x), RED);
                root = rotateRight(root, parentOf(x));
                sib = leftOf(parentOf(x));
            }

            if (colorOf(rightOf(sib)) == BLACK &&
                colorOf(leftOf(sib)) == BLACK) {
                setColor(sib, RED);
                x = parentOf(x);
            } else {
                if (colorOf(leftOf(sib)) == BLACK) {
                    setColor(rightOf(sib), BLACK);
                    setColor(sib, RED);
                    root = rotateLeft(root, sib);
                    sib = leftOf(parentOf(x));
                }
                setColor(sib, colorOf(parentOf(x)));
                setColor(parentOf(x), BLACK);
                setColor(leftOf(sib), BLACK);
                root = rotateRight(root, parentOf(x));
                x = root;
            }
        }
    }
    setColor(x, BLACK);
    return root;
}
```

- `HashMap` 源码风格

```java
private static Node balanceDeletion2(Node root, Node x) {
    for (Node xp, xpl, xpr; ; ) {
        if (x == null || x == root) {
            return root;
        }
        // x指向根结点，此时将x设为一个黑色结点即可
        else if ((xp = x.parent) == null) {
            x.color = BLACK;
            return x;
        }
        // x是“红+黑”结点，直接把x设为黑色即可
        else if (x.color == RED) {
            x.color = BLACK;
            return root;
        } else if ((xpl = xp.left) == x) {
            /* -------- 因为x是xp的左孩子，所以xpr就是sibling -------- */
            // Case 1：x是"黑+黑"结点，x的兄弟是红色结点
            if ((xpr = xp.right) != null && xpr.color == RED) {
                xpr.color = BLACK;
                xp.color = RED;
                root = rotateLeft(root, xp);
                xpr = (xp = x.parent) == null ? null : xp.right;
            }
            if (xpr == null) {
                x = xp; // 画图很好理解，上浮了
            } else {
                Node sl = xpr.left, sr = xpr.right;
                // Case 2：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的两个孩子都是黑色结点
                if (colorOf(sr) == BLACK && colorOf(sl) == BLACK) {
                    xpr.color = RED;
                    x = xp;
                } else {
                    // Case 3：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的左孩子是红色，右孩子是黑色
                    if (colorOf(sr) == BLACK) {
                        if (sl != null) {
                            sl.color = BLACK;
                        }
                        xpr.color = RED;
                        root = rotateRight(root, xpr);
                        xpr = (xp = x.parent) == null ? null : xp.right;
                    }
                    // Case 4：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的右孩子是红色，左孩子任意颜色
                    if (xpr != null) {
                        xpr.color = colorOf(xp);
                        if ((sr = xpr.right) != null) {
                            sr.color = BLACK;
                        }
                    }
                    if (xp != null) {
                        xp.color = BLACK;
                        root = rotateLeft(root, xp);
                    }
                    x = root;
                }
            }
        }
        // symmetric
        else {
            if (xpl != null && xpl.color == RED) {
                xpl.color = BLACK;
                xp.color = RED;
                root = rotateRight(root, xp);
                xpl = (xp = x.parent) == null ? null : xp.left;
            }
            if (xpl == null) {
                x = xp;
            } else {
                Node sl = xpl.left, sr = xpl.right;
                if (colorOf(sl) == BLACK && colorOf(sr) == BLACK) {
                    xpl.color = RED;
                    x = xp;
                } else {
                    if (colorOf(sl) == BLACK) {
                        if (sr != null) {
                            sr.color = BLACK;
                        }
                        xpl.color = RED;
                        root = rotateLeft(root, xpl);
                        xpl = (xp = x.parent) == null ? null : xp.left;
                    }
                    if (xpl != null) {
                        xpl.color = colorOf(xp);
                        if ((sl = xpl.left) != null) {
                            sl.color = BLACK;
                        }
                    }
                    if (xp != null) {
                        xp.color = BLACK;
                        root = rotateRight(root, xp);
                    }
                    x = root;
                }
            }
        }
    }
}
```

## 6. 完整代码

输出结果：

```
            45           
         /     \         
      17         65    
    /   \       /   \    
  9       23  53      78 
 /         \           \ 
5         30         87
========================================
            45           
         /     \         
      17         65    
    /   \       /   \    
  9       23  53      78 
 /                     \ 
5                     87
========================================
            45           
         /     \         
      17         65    
    /   \       /   \    
  9       23  53      87 
 /                       
5                      
========================================
            53           
         /     \         
      17         65     
    /   \           \    
  9       23          87
 /                       
5                      
========================================
            65           
         /     \         
      17         87     
    /   \                
  9       23             
 /                       
5       
```

源码：

```java
package com.ice.rbt;

import org.w3c.dom.Node;

import java.util.StringJoiner;

/**
 * @author ice
 * @blog https://yilei.space
 * @description
 * @create 2022-02-25 11:47:24
 */
public class RedBlackTree {

    public static void main(String[] args) {
        RedBlackTree tree = new RedBlackTree();
        tree.put(53, 53);
        tree.put(17, 17);
        tree.put(9, 9);
        tree.put(45, 45);
        tree.put(23, 23);
        tree.put(78, 78);
        tree.put(65, 65);
        tree.put(87, 87);
        tree.put(30, 30);
        tree.put(5, 5);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(30);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(78);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(45);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(53);
        show(tree.getRoot());
    }

    private static final boolean RED = true;
    private static final boolean BLACK = false;

    private Node root;

    public Node getRoot() {
        return root;
    }

    public final Node find(Integer key) {
        Node r = this.root;
        while (r != null) {
            int cmp = key.compareTo(r.key);
            if (cmp < 0) {
                r = r.left;
            } else if (cmp > 0) {
                r = r.right;
            } else {
                return r;
            }
        }
        return null;
    }

    /**
     * 红黑树的插入，分为两步：
     * 1. 遍历插入
     * 2. 自平衡调整
     *
     * @param k
     * @param v
     */
    public void put(Integer k, Integer v) {
        Node node = this.root;
        // 红黑树为空，直接创建结点作为根结点
        if (node == null) {
            this.root = new Node(k, v);
            return;
        }
        Node parent = null;
        int cmp = 0;
        while (node != null) {
            parent = node;
            cmp = k.compareTo(node.key);
            if (cmp < 0) {
                node = node.left;
            } else if (cmp > 0) {
                node = node.right;
            } else {
                node.value = v;
                return;
            }
        }
        Node newNode = new Node(parent, k, v);
        if (cmp < 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }

        root = balanceInsertion(root, newNode);
    }

    public void remove2(Integer key) {
        Node p = this.find(key);
        if (p == null) return;
        Node pl = p.left, pr = p.right, replacement;
        // 如果有2个子树，则用后继结点替代，否则要删除的就是该结点
        if (pl != null && pr != null) {
            Node s = successor(p);
            assert s != null; // pr!=null，所以s!=null
            /*-------------------------交换结点开始----------------------------------*/
            swapColor(s, p); // 交换结点颜色
            Node sr = s.right, pp = p.parent;
            // 如果后继结点就是p的右孩子
            if (s == pr) {
                p.parent = s;
                s.right = p;
            } else {
                Node sp = s.parent;
                if ((p.parent = sp) != null) {
                    if (s == sp.left)
                        sp.left = p;
                    else
                        sp.right = p;
                }
                if ((s.right = pr) != null)
                    pr.parent = s;
            }
            p.left = null;
            if ((p.right = sr) != null)
                sr.parent = p;
            if ((s.left = pl) != null)
                pl.parent = s;
            if ((s.parent = pp) == null)
                root = s;
            else if (p == pp.left)
                pp.left = s;
            else
                pp.right = s;
            /*-------------------------交换结点结束----------------------------------*/

            // 定义替代结点
            if (sr != null) {
                replacement = sr;
            } else {
                // 没有孩子，使用删除结点虚幻替代
                replacement = p;
            }
        } else if (pl != null) {
            replacement = pl;
        } else if (pr != null) {
            replacement = pr;
        } else {
            replacement = p;
        }

        // 在不是只有根结点的情况下，删除结点p
        // 注意，此时p已经是交换后的位置，就是真正要删除的位置
        if (replacement != p) {
            Node pp = replacement.parent = p.parent;
            if (pp == null)
                root = replacement;
            else if (p == pp.left)
                pp.left = replacement;
            else
                pp.right = replacement;
            p.left = p.right = p.parent = null;
        }

        // 只有删除结点是黑色才会引起不平衡
        root = colorOf(p) == BLACK ? balanceDeletion2(root, replacement) : root;

        // 保证该结点删除，快速被垃圾回收
        if (replacement == p) {
            Node pp = p.parent;
            p.parent = null;
            if (pp != null) {
                if (p == pp.left)
                    pp.left = null;
                else if (p == pp.right)
                    pp.right = null;
            }
        }
    }

    public void remove(Integer key) {
        Node p = this.find(key);
        if (p == null) return;
        // 如果有2个子树，则用后继结点替代，否则要删除的就是该结点
        if (p.left != null && p.right != null) {
            Node s = successor(p);
            p.key = s.key;
            p.value = s.value;
            p = s;
        }
        /* 至此s结点最多只有一棵子树，是真正的删除结点 */
        Node replacement = p.left != null ? p.left : p.right;
        // 如果删除结点s不是叶子结点（单子树）
        if (replacement != null) {
            if ((replacement.parent = p.parent) == null)
                // 如果s就是根结点（说明p是单左子树的根结点）
                root = replacement;
            else if (p == p.parent.left)
                // 如果s父结点存在，且是其父结点的左子树
                p.parent.left = replacement;
            else
                // 如果s父结点存在，且是其父结点的右子树
                p.parent.right = replacement;
            // Null out links, so they are OK to use by fixAfterDeletion.
            p.left = p.right = p.parent = null;
        } else if (p.parent == null) { // return if we are the only node.
            // 如果删除结点s是叶子结点，且是根结点
            root = null;
        } else { //  No children. Use self as phantom replacement and unlink.
            replacement = p;
        }
        // 只有删除结点是黑色才会引起不平衡
        root = p.color == BLACK ? balanceDeletion(root, replacement) : root;

        // 对应传入的不是替代结点，而是删除结点的情况，需要清空
        if (p.parent != null) {
            if (p == p.parent.left) {
                p.parent.left = null;
            } else {
                p.parent.right = null;
            }
        }
    }

    private static Node balanceDeletion2(Node root, Node x) {
        for (Node xp, xpl, xpr; ; ) {
            if (x == null || x == root) {
                return root;
            }
            // x指向根结点，此时将x设为一个黑色结点即可
            else if ((xp = x.parent) == null) {
                x.color = BLACK;
                return x;
            }
            // x是“红+黑”结点，直接把x设为黑色即可
            else if (x.color == RED) {
                x.color = BLACK;
                return root;
            } else if ((xpl = xp.left) == x) {
                /* -------- 因为x是xp的左孩子，所以xpr就是sibling -------- */
                // Case 1：x是"黑+黑"结点，x的兄弟是红色结点
                if ((xpr = xp.right) != null && xpr.color == RED) {
                    xpr.color = BLACK;
                    xp.color = RED;
                    root = rotateLeft(root, xp);
                    xpr = (xp = x.parent) == null ? null : xp.right;
                }
                if (xpr == null) {
                    x = xp; // 画图很好理解，上浮了
                } else {
                    Node sl = xpr.left, sr = xpr.right;
                    // Case 2：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的两个孩子都是黑色结点
                    if (colorOf(sr) == BLACK && colorOf(sl) == BLACK) {
                        xpr.color = RED;
                        x = xp;
                    } else {
                        // Case 3：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的左孩子是红色，右孩子是黑色
                        if (colorOf(sr) == BLACK) {
                            if (sl != null) {
                                sl.color = BLACK;
                            }
                            xpr.color = RED;
                            root = rotateRight(root, xpr);
                            xpr = (xp = x.parent) == null ? null : xp.right;
                        }
                        // Case 4：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的右孩子是红色，左孩子任意颜色
                        if (xpr != null) {
                            xpr.color = colorOf(xp);
                            if ((sr = xpr.right) != null) {
                                sr.color = BLACK;
                            }
                        }
                        if (xp != null) {
                            xp.color = BLACK;
                            root = rotateLeft(root, xp);
                        }
                        x = root;
                    }
                }
            }
            // symmetric
            else {
                if (xpl != null && xpl.color == RED) {
                    xpl.color = BLACK;
                    xp.color = RED;
                    root = rotateRight(root, xp);
                    xpl = (xp = x.parent) == null ? null : xp.left;
                }
                if (xpl == null) {
                    x = xp;
                } else {
                    Node sl = xpl.left, sr = xpl.right;
                    if (colorOf(sl) == BLACK && colorOf(sr) == BLACK) {
                        xpl.color = RED;
                        x = xp;
                    } else {
                        if (colorOf(sl) == BLACK) {
                            if (sr != null) {
                                sr.color = BLACK;
                            }
                            xpl.color = RED;
                            root = rotateLeft(root, xpl);
                            xpl = (xp = x.parent) == null ? null : xp.left;
                        }
                        if (xpl != null) {
                            xpl.color = colorOf(xp);
                            if ((sl = xpl.left) != null) {
                                sl.color = BLACK;
                            }
                        }
                        if (xp != null) {
                            xp.color = BLACK;
                            root = rotateRight(root, xp);
                        }
                        x = root;
                    }
                }
            }
        }
    }

    private static Node balanceDeletion(Node root, Node x) {
        while (x != root && colorOf(x) == BLACK) {
            // 如果x是xp的左孩子
            if (x == leftOf(parentOf(x))) {
                Node sib = rightOf(parentOf(x)); // 定义x的兄弟结点
                // Case 1：x是"黑+黑"结点，x的兄弟是红色结点
                if (colorOf(sib) == RED) {
                    setColor(sib, BLACK);
                    setColor(parentOf(x), RED);
                    root = rotateLeft(root, parentOf(x));
                    sib = rightOf(parentOf(x));
                }
                // Case 2：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的两个孩子都是黑色结点
                if (colorOf(leftOf(sib)) == BLACK && colorOf(rightOf(sib)) == BLACK) {
                    setColor(sib, RED);
                    x = parentOf(x);
                } else {
                    // Case 3：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的左孩子是红色，右孩子是黑色
                    if (colorOf(rightOf(sib)) == BLACK) {
                        setColor(leftOf(sib), BLACK);
                        setColor(sib, RED);
                        root = rotateRight(root, sib);
                        sib = rightOf(parentOf(x));
                    }
                    // Case 4：x是"黑+黑"结点，x的兄弟是黑色结点，x的兄弟结点的右孩子是红色，左孩子任意颜色
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(rightOf(sib), BLACK);
                    root = rotateLeft(root, parentOf(x));
                    x = root;
                }
            }
            // symmetric
            else {
                Node sib = leftOf(parentOf(x));
                if (colorOf(sib) == RED) {
                    setColor(sib, BLACK);
                    setColor(parentOf(x), RED);
                    root = rotateRight(root, parentOf(x));
                    sib = leftOf(parentOf(x));
                }

                if (colorOf(rightOf(sib)) == BLACK &&
                        colorOf(leftOf(sib)) == BLACK) {
                    setColor(sib, RED);
                    x = parentOf(x);
                } else {
                    if (colorOf(leftOf(sib)) == BLACK) {
                        setColor(rightOf(sib), BLACK);
                        setColor(sib, RED);
                        root = rotateLeft(root, sib);
                        sib = leftOf(parentOf(x));
                    }
                    setColor(sib, colorOf(parentOf(x)));
                    setColor(parentOf(x), BLACK);
                    setColor(leftOf(sib), BLACK);
                    root = rotateRight(root, parentOf(x));
                    x = root;
                }
            }
        }
        setColor(x, BLACK);
        return root;
    }

    private static void swapColor(Node a, Node b) {
        boolean color = a.color;
        a.color = b.color;
        b.color = color;
    }

    // 查找以该结点为根的右子树中的最小结点
    public static Node successor(Node node) {
        if (node.right == null) {
            return null;
        }
        node = node.right;
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }


    /**
     * 该函数用于结点插入完成后的平衡调整
     *
     * @param root 根结点
     * @param x    插入结点
     * @return 调整后的根结点
     * <p>
     * 从下面的循环代码可以看出来，自平衡是从下往上调整的
     */
    private static Node balanceInsertion(Node root, Node x) {
        setColor(x, RED); // 插入的结点都是红色结点
        for (Node xp, xpp, xppl, xppr; ; ) {
            // 对应 3.1 的情况
            // 如果插入结点的父结点为空，x结点就是根结点，直接变黑色返回
            if ((xp = x.parent) == null) {
                setColor(x, BLACK);
                return x;
            }
            // 对应 3.3 的情况
            // 如果插入结点的父结点是黑色或者插入结点的父结点就是根结点，则无需调整直接返回
            // 这里注意一下，后一个逻辑语句其实没啥意义，只是为了在父结点是红色情况下给xpp变量赋值
            // 因为红黑树的根结点必然是黑色的，既然插入结点的父结点是红色结点，那么插入结点必然
            // 存在祖父结点（必然是黑色的，因为红色结点不能连续）。
            else if (colorOf(xp) == BLACK || (xpp = xp.parent) == null) {
                setColor(root, BLACK);
                return root;
            }

            /* ------------------------------------------------------------ */
            /*                开始插入结点的父结点为红色的情况                  */
            /* ------------------------------------------------------------ */

            // 如果插入结点的父结点是祖先结点的左孩子
            if (xp == (xppl = xpp.left)) {
                // 对应 3.4.1 的情况
                // 如果叔叔结点存在，且颜色也为红色，则祖父变红色，父结点和叔叔结点变黑色，插入结点变为祖父结点
                if ((xppr = xpp.right) != null && colorOf(xppr) == RED) {
                    setColor(xpp, RED);
                    setColor(xp, BLACK);
                    setColor(xppr, BLACK);
                    x = xpp;
                }
                // 对应 3.4.2 的前两种情况
                else {
                    // 父结点是祖父结点的左孩子，插入结点是父结点的右孩子
                    // 此时需要先进行 RR 旋转（即左旋）
                    if (x == xp.right) {
                        root = rotateLeft(root, x = xp);
                        // 这一步变换是为了统一代码格式，方便共用
                        // 上面x=xp了，左旋过程中xp.parent变成插入结点x，因此下面的xp实际上就是插入的结点x
                        xpp = (xp = x.parent) == null ? null : xp.parent;
                    }
                    // 父结点是祖父结点的左孩子，插入结点是父结点的左孩子
                    // 此时直接进行 L了旋转（即右旋）
                    if (xp != null) { // 例行避免空指针
                        setColor(xp, BLACK);
                        // 如果xp不是根结点
                        if (xpp != null) {
                            setColor(xpp, RED);
                            root = rotateRight(root, xpp);
                        }
                    }
                }
            }
            // 如果插入结点的父结点是祖先结点的右孩子
            else {
                // 对应 3.4.1 的情况
                // 如果叔叔结点存在，且颜色也为红色，则祖父变红色，父结点和叔叔结点变黑色，插入结点变为祖父结点
                if (xppl != null && colorOf(xppl) == RED) {
                    setColor(xppl, BLACK);
                    setColor(xp, BLACK);
                    setColor(xpp, RED);
                    x = xpp;
                }
                // 对应 3.4.2 的后两种情况
                else {
                    // 父结点是祖父结点的右孩子，插入结点是父结点的左孩子
                    if (x == xp.left) {
                        root = rotateRight(root, x = xp);
                        // 这一步变换是为了统一代码格式，方便共用
                        // 上面x=xp了，左旋过程中xp.parent变成插入结点x，因此下面的xp实际上就是插入的结点x
                        xpp = (xp = x.parent) == null ? null : xp.parent;
                    }
                    // 父结点是祖父结点的右孩子，插入结点是父结点的右孩子
                    // 此时直接进行 L了旋转（即右旋）
                    if (xp != null) { // 例行避免空指针
                        setColor(xp, BLACK);
                        // 如果xp不是根结点
                        if (xpp != null) {
                            setColor(xpp, RED);
                            root = rotateLeft(root, xpp);
                        }
                    }
                }
            }
        }
    }

    /**
     * @param root 红黑树的根结点
     * @param xp   不平衡点，一般就是插入结点的父结点，即xp
     * @return 调整后的根结点
     */
    private static Node rotateLeft(Node root, Node xp) {
        /*
         * 注意，变量的命名是按照调整前的位置起的，方便理解变换过程
         * 【情况一】
         *              xpp                   xpp
         *              /                     /
         *            xp                     x
         *           / \        ====>       / \
         *         xpl  x                  xp  xr
         *             / \                /  \
         *            xl  xr             xpl  xl
         *
         * 【情况二】
         *        xpp                    xpp
         *           \                      \
         *            xp                     x
         *           / \        ====>       / \
         *         xpl  x                  xp  xr
         *             / \                /  \
         *            xl  xr             xpl  xl
         */

        Node x, xpp, xl;
        // 旋转首先要保证插入结点x和其父结点xp存在
        if (xp != null && (x = xp.right) != null) {
            // 将x的左孩子赋值给xp的右孩子
            if ((xl = xp.right = x.left) != null) {
                xl.parent = xp; // 结点不为空的情况下要重新赋值父结点的指向
            }
            // 如果xp是根结点，则旋转后，应当将新的根结点x颜色设为黑色
            if ((xpp = x.parent = xp.parent) == null) {
                setColor(root = x, BLACK);
            }
            // 对应注释里的情况一
            else if (xpp.left == xp) {
                xpp.left = x;
            }
            // 对应注释里的情况二
            else {
                xpp.right = x;
            }
            x.left = xp;
            xp.parent = x;
        }
        return root;
    }

    /**
     * @param root 红黑树的根结点
     * @param xp   不平衡点，一般就是插入结点的父结点，即xp
     * @return 调整后的根结点
     */
    private static Node rotateRight(Node root, Node xp) {
        /*
         * 注意，变量的命名是按照调整前的位置起的，方便理解变换过程
         * 【情况一】
         *              xpp                   xpp
         *              /                     /
         *            xp                     x
         *           /  \        ====>      / \
         *          x   xpr                xl  xp
         *         / \                        /  \
         *       xl   xr                     xr  xpr
         *
         * 【情况二】
         *         xpp                    xpp
         *           \                      \
         *            xp                     x
         *           /  \        ====>      / \
         *          x   xpr                xl  xp
         *         / \                        /  \
         *       xl   xr                     xr  xpr
         */


        Node x, xpp, xr;
        // 旋转首先要保证插入结点x和其父结点xp存在
        if (xp != null && (x = xp.left) != null) {
            // 将x的右孩子赋值给xp的左孩子
            if ((xr = xp.left = x.right) != null) {
                xr.parent = xp; // 结点不为空的情况下要重新赋值父结点的指向
            }
            // 如果xp是根结点，则旋转后，应当将新的根结点x颜色设为黑色
            if ((xpp = x.parent = xp.parent) == null) {
                setColor(root = x, BLACK);
            }
            // 对应注释里的情况一
            else if (xpp.left == xp) {
                xpp.left = x;
            }
            // 对应注释里的情况二
            else {
                xpp.right = x;
            }
            x.right = xp;
            xp.parent = x;
        }
        return root;
    }

    private static boolean colorOf(Node node) {
        return node == null ? BLACK : node.color;
    }

    private static void setColor(Node node, boolean color) {
        if (node != null) {
            node.color = color;
        }
    }

    private static Node leftOf(Node node) {
        return node == null ? null : node.left;
    }

    private static Node rightOf(Node node) {
        return node == null ? null : node.right;
    }

    private static Node parentOf(Node node) {
        return node == null ? null : node.parent;
    }

    private static class Node {
        public Node parent;
        public Node left;
        public Node right;
        public boolean color;
        public Integer key;
        public Object value;

        public Node(Integer key, Object value) {
            this.key = key;
            this.value = value;
            this.color = BLACK;
        }

        public Node(Node parent, Integer key, Object value) {
            this.parent = parent;
            this.key = key;
            this.value = value;
            this.color = BLACK;
        }

        @Override
        public String toString() {
            return new StringJoiner(", ", Node.class.getSimpleName() + "[", "]")
                    .add("color=" + color)
                    .add("key=" + key)
                    .add("value=" + value)
                    .toString();
        }
    }

    // 用于获得树的层数
    public static int getTreeDepth(Node root) {
        return root == null ? 0 : (1 + Math.max(getTreeDepth(root.left), getTreeDepth(root.right)));
    }

    /**
     * @param colour  颜色代号：背景颜色代号(41-46)；前景色代号(31-36)
     * @param type    样式代号：0无；1加粗；3斜体；4下划线
     * @param content 要打印的内容
     */
    private static String getFormatLogString(String content, int colour, int type) {
        boolean hasType = type != 1 && type != 3 && type != 4;
        if (hasType) {
            return String.format("\033[%dm%s\033[0m", colour, content);
        } else {
            return String.format("\033[%d;%dm%s\033[0m", colour, type, content);
        }
    }

    private static void writeArray(Node currNode, int rowIndex, int columnIndex, String[][] res, int treeDepth) {
        // 保证输入的树不为空
        if (currNode == null) return;
        // 先将当前节点保存到二维数组中
        // todo 颜色显示控制
        String s = String.valueOf(currNode.key);
        if (currNode.color == RED) {
            s = getFormatLogString(s, 31, 0);
        }
        res[rowIndex][columnIndex] = s;

        // 计算当前位于树的第几层
        int currLevel = (rowIndex + 1) / 2;
        // 若到了最后一层，则返回
        if (currLevel == treeDepth) return;
        // 计算当前行到下一行，每个元素之间的间隔（下一行的列索引与当前元素的列索引之间的间隔）
        int gap = treeDepth - currLevel - 1;

        // 对左儿子进行判断，若有左儿子，则记录相应的"/"与左儿子的值
        if (currNode.left != null) {
            res[rowIndex + 1][columnIndex - gap] = "/";
            writeArray(currNode.left, rowIndex + 2, columnIndex - gap * 2, res, treeDepth);
        }

        // 对右儿子进行判断，若有右儿子，则记录相应的"\"与右儿子的值
        if (currNode.right != null) {
            res[rowIndex + 1][columnIndex + gap] = "\\";
            writeArray(currNode.right, rowIndex + 2, columnIndex + gap * 2, res, treeDepth);
        }
    }

    /*
    树的结构示例：
              1
            /   \
          2       3
         / \     / \
        4   5   6   7
    */
    public static void show(Node root) {
        if (root == null) System.out.println("EMPTY!");
        // 得到树的深度
        int treeDepth = getTreeDepth(root);

        // 最后一行的宽度为2的（n - 1）次方乘3，再加1
        // 作为整个二维数组的宽度
        int arrayHeight = treeDepth * 2 - 1;
        int arrayWidth = (2 << (treeDepth - 2)) * 3 + 1;
        // 用一个字符串数组来存储每个位置应显示的元素
        String[][] res = new String[arrayHeight][arrayWidth];
        // 对数组进行初始化，默认为一个空格
        for (int i = 0; i < arrayHeight; i++) {
            for (int j = 0; j < arrayWidth; j++) {
                res[i][j] = " ";
            }
        }

        // 从根节点开始，递归处理整个树
        // res[0][(arrayWidth + 1)/ 2] = (char)(root.val + '0');
        writeArray(root, 0, arrayWidth / 2, res, treeDepth);

        // 此时，已经将所有需要显示的元素储存到了二维数组中，将其拼接并打印即可
        for (String[] line : res) {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < line.length; i++) {
                sb.append(line[i]);
                if (line[i].length() > 1 && i <= line.length - 1) {
                    i += line[i].length() > 4 ? 2 : line[i].length() - 1;
                }
            }
            System.out.println(sb);
        }
    }
}
```



















