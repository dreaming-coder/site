# 树 - 二叉搜索树
## 1. 二叉搜索树的定义

![](/imgs/algorithm/data-structure/bst-1.png)

二叉搜索树或者是一棵空树，或者是具有下列特性的二叉树：

- 若左子树非空，则左子树上所有结点的值均小于根结点的值
- 若右子树非空，则右子树上所有结点的值均大于根结点的值
- 左右子树也分别是一棵二叉搜索树

:::tip

所以对二叉树进行中序遍历，可以得到一个递增的一个有序序列。

:::

## 2. 二叉搜索树结点类的定义

```java
private static class Node implements Comparable<Node> {
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

    @Override
    public int compareTo(Node node) {
        return data - node.data;
    }
}
```

## 3. 二叉搜索树的判定

- 迭代判断

```java
public static boolean isBinarySearchTree1(Node root) {

    if (root == null) return false;
    Deque<Node> deque = new LinkedList<>();
    Integer pre = null;
    Node node = root;
    while (node != null || !deque.isEmpty()) {
        while (node != null) {
            deque.push(node);
            node = node.left;
        }
        node = deque.pop();
        if (pre != null && node.data < pre) {
            return false;
        }
        pre = node.data;
        node = node.right;
    }
    return true;
}
```

- 递归判断

```java
public static boolean isBinarySearchTree(Node root) {
    return isBinarySearchTree(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private static boolean isBinarySearchTree(Node node, long lower, long upper) {
    if (node == null) return true;
    if (node.data <= lower || node.data >= upper) return false;
    return isBinarySearchTree(node.left, lower, node.data) && isBinarySearchTree(node.right, node.data, upper);
}
```

## 4. 二叉搜索树的遍历

中序遍历就是按照从小到大的顺序遍历：

```java
public void inOrder(Consumer<Node> consumer) {
    if (root == null) return;
    Node node = root;
    Deque<Node> deque = new ArrayDeque<>();
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

## 5. 二叉搜索树的查找

就是在这种结构中查询某个元素是否在其中，递归算法比较简单，这里给出迭代算法

```java
public Node search(int key) {
    Node node = root;
    while (node != null && node.data != key) {
        node = key < node.data ? node.left : node.right;
    }
    return node;
}
```

## 6. 二叉搜索树结点的前驱与后继

```java
// 查找以该结点为根的左子树中的最大结点
public static Node predecessor(Node node) {
    if (node.left == null) {
        return null;
    }
    node = node.left;
    while (node.right != null) {
        node = node.right;
    }
    return node;
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
```

## 7. 二叉搜索树的插入

二叉排序树作为一种动态树表，其特点是树的结构通常不是一次生成的，而是在查找过程中，当树中不存在关键字值等于给定值的结点时再进行插入的。

插入结点的过程如下：若原二叉排序树为空，则直接插入结点；否则，若关键字 $k$ 小于根结点值，则插入到左子树，若关键字 $k$ 大于根结点值，则插入到右子树。插入的结点一定是一个新添加的叶结点，且是查找失败时的查找路径上访问的最后一个结点的左孩子或右孩子。

![](/imgs/algorithm/data-structure/bst-2.png)

```java
public void insert(int key) {
    Node newNode = new Node(key);
    if (root == null) {
        root = newNode;
        return;
    }
    Node parent = null;
    Node node = root;
    while (node != null) {
        // 元素已经存在，则插入失败
        if (node.compareTo(newNode) == 0) {
            return;
        }
        parent = node;
        node = node.compareTo(newNode) > 0 ? node.left : node.right;
    }
    if (parent.compareTo(newNode) > 0) {
        parent.left = newNode;
    } else {
        parent.right = newNode;
    }
}
```

## 8. 二叉搜索树的删除

被删除的结点有三种情况：

- 若被删除的结点是叶结点，则直接删除
- 若被删除的结点只有一颗左子树或右子树，则将它的子树的根结点直接移动到被删除结点的位置
- 若被删除的节点有两个子树，则用它的直接后继（或前驱）替代它，并将替代的结点删除

具体参照示例如下图所示：

![](/imgs/algorithm/data-structure/bst-3.png)


```java
public void remove(int key) {
    root = remove(root, key);
}

// 在根为 root 的二叉搜索树中删除值为 key 的结点，返回删除后重新构造的二叉搜索树的根
private static Node remove(Node root, int key) {
    // 空树，直接返回 null
    if (root == null) return null;
    // key 小于根结点的值，应该在左子树中删除该结点
    if (key < root.data) {
        root.left = remove(root.left, key);
    } 
    // key 大于根结点的值，应该在右子树中删除该结点
    else if (key > root.data) {
        root.right = remove(root.right, key);
    } 
    // root 就是要删除的结点
    else {
        // 左右子树均存在，取其后继结点赋值 root，转化为在右子树中删除 successor 的问题
        if (root.left != null && root.right != null) {
            Node successor = successor(root);
            root.data = successor.data;
            root.right = remove(root.right, successor.data);
        } else {
            // 叶子结点
            if (root.left == null && root.right == null) {
                return null;
            }
            // 仅有左子树
            if (root.left != null) {
                return root.left;
            }
            // 仅有右子树
            else {
                return root.right;
            }
        }
    }
    return root;
}
```

:::tip

非递归版本的删除代码见完整代码中的 `remove2()` 方法。

:::

## 9. 完整代码

输出结果：

```
            53           
         /     \         
      17          78     
    /   \       /   \    
  9       45  65      87 
         /               
        23               
==========================
            65           
         /     \         
      17          78     
    /   \           \    
  9       45          87 
         /               
        23               
==========================
            78           
         /     \         
      17          87     
    /   \                
  9       45             
         /               
        23   
```

源码：

```java
package com.ice.bst;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;
import java.util.StringJoiner;
import java.util.function.Consumer;

/**
 * @author ice
 * @blog https://blog.csdn.net/dreaming_coder
 * @description
 * @create 2022-02-23 15:49:36
 */
public class BST {

    public static void main(String[] args) {
        BST tree = new BST();
        tree.insert(53);
        tree.insert(17);
        tree.insert(9);
        tree.insert(45);
        tree.insert(23);
        tree.insert(78);
        tree.insert(65);
        tree.insert(87);
        show(tree.getRoot());
        System.out.println("===========");
        tree.remove(53);
        show(tree.getRoot());
        System.out.println("===========");
        tree.remove(65);

        show(tree.getRoot());

    }

    private Node root;

    public Node getRoot() {
        return root;
    }

    public static boolean isBinarySearchTree(Node root) {
        return isBinarySearchTree(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private static boolean isBinarySearchTree(Node node, long lower, long upper) {
        if (node == null) return true;
        if (node.data <= lower || node.data >= upper) return false;
        return isBinarySearchTree(node.left, lower, node.data) && isBinarySearchTree(node.right, node.data, upper);
    }

    public static boolean isBinarySearchTree1(Node root) {

        if (root == null) return false;
        Deque<Node> deque = new LinkedList<>();
        Integer pre = null;
        Node node = root;
        while (node != null || !deque.isEmpty()) {
            while (node != null) {
                deque.push(node);
                node = node.left;
            }
            node = deque.pop();
            if (pre != null && node.data < pre) {
                return false;
            }
            pre = node.data;
            node = node.right;
        }
        return true;
    }

    public void inOrder(Consumer<Node> consumer) {
        if (root == null) return;
        Node node = root;
        Deque<Node> deque = new ArrayDeque<>();
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

    public Node search(int key) {
        Node node = root;
        while (node != null && node.data != key) {
            node = key < node.data ? node.left : node.right;
        }
        return node;
    }

    private static Node[] searchWithParent(Node root, int key) {
        Node node = root;
        Node parent = null;
        while (node != null && node.data != key) {
            parent = node;
            node = key < node.data ? node.left : node.right;
        }
        if (node == null) return null;
        return new Node[]{parent, node};
    }

    public void insert(int key) {
        Node newNode = new Node(key);
        if (root == null) {
            root = newNode;
            return;
        }
        Node parent = null;
        Node node = root;
        while (node != null) {
            // 元素已经存在，则插入失败
            if (node.compareTo(newNode) == 0) {
                return;
            }
            parent = node;
            node = node.compareTo(newNode) > 0 ? node.left : node.right;
        }
        if (parent.compareTo(newNode) > 0) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
    }

    public void remove(int key) {
        root = remove(root, key);
    }

    // 在根为 root 的二叉搜索树中删除值为 key 的结点，返回删除后二叉搜索树的根
    private static Node remove(Node root, int key) {
        // 空树，直接返回 null
        if (root == null) return null;
        if (key < root.data) {
            root.left = remove(root.left, key);
        } else if (key > root.data) {
            root.right = remove(root.right, key);
        } else {
            // 左右子树均存在
            if (root.left != null && root.right != null) {
                Node successor = successor(root);
                root.data = successor.data;
                root.right = remove(root.right, successor.data);
            } else {
                // 叶子结点
                if (root.left == null && root.right == null) {
                    return null;
                }
                // 仅有左子树
                if (root.left != null) {
                    return root.left;
                }
                // 仅有右子树
                else {
                    return root.right;
                }
            }
        }
        return root;
    }

    public void remove2(int key) {
        // 空树，直接返回 null
        if (root == null) return;

        // 查找 key 对应结点及其父结点，如果找不到则返回 null
        Node[] nodes = searchWithParent(root, key);
        if (nodes == null) return;

        Node parent = nodes[0];
        Node node = nodes[1];

        // 查找目标结点的前驱和后继结点
        Node successor = successor(node);
        Node predecessor = predecessor(node);

        // 当目标结点是叶子结点时，直接删除该结点
        if (successor == null && predecessor == null) {
            if (parent == null) { // 如果目标结点是根结点，则将根结点置为 null
                root = null;
            } else if (parent.left == node) {
                parent.left = null;
            } else {
                parent.right = null;
            }
        }
        // 如果目标结点只有左子树，则将左子树顶替到目标结点位置
        else if (predecessor != null && successor == null) {
            if (parent.left == node) {
                parent.left = node.left;
            } else {
                parent.right = node.left;
            }
        }
        // 如果目标结点只有右子树，则将右子树顶替到目标结点位置
        else if (predecessor == null) {
            if (parent.left == node) {
                parent.left = node.right;
            } else {
                parent.right = node.right;
            }
        }
        // 如果目标结点左右子树都存在，则目标结点用其后继结点的值覆盖，转而删除后继结点
        else {
            node.data = successor.data;
            nodes = searchWithParent(node.right, successor.data);
            assert nodes != null;
            parent = nodes[0];
            // 后继结点只可能出现两种情况，一种是叶子结点，一种是只有右子树的结点
            if (parent == null) {
                node.right = successor.right;
            } else {
                parent.left = successor.right;
            }
        }
    }


    // 查找以该结点为根的左子树中的最大结点
    public static Node predecessor(Node node) {
        if (node.left == null) {
            return null;
        }
        node = node.left;
        while (node.right != null) {
            node = node.right;
        }
        return node;
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

    private static class Node implements Comparable<Node> {
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

        @Override
        public int compareTo(Node node) {
            return data - node.data;
        }
    }

    // 用于获得树的层数
    public static int getTreeDepth(Node root) {
        return root == null ? 0 : (1 + Math.max(getTreeDepth(root.left), getTreeDepth(root.right)));
    }

    private static void writeArray(Node currNode, int rowIndex, int columnIndex, String[][] res, int treeDepth) {
        // 保证输入的树不为空
        if (currNode == null) return;
        // 先将当前节点保存到二维数组中
        res[rowIndex][columnIndex] = String.valueOf(currNode.data);

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

