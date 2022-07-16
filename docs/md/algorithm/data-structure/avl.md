# 树 - 平衡二叉树
## 1. 平衡二叉树的定义

![](/imgs/algorithm/data-structure/avl-1.png)

为避免树的高度增长过快，降低二叉搜索树的性能，规定在插入和删除二叉树结点时，要保证任意结点的左、右子树高度差的绝对值不超过 $1$，将这样的二叉树称为**平衡二叉树**(Balanced Binary Tree)， 简称平衡树。定义结点左子树与右子树的高度差为该结点的平衡因子，则平衡二叉树结点的平衡因子的值只可能是 $-1$、$0$ 或 $1$。

- 平衡二叉树可以是一棵空树
- 平衡二叉树左子树和右子树都是平衡二叉树，且左右子树的高度差的绝对值不超过 $1$

## 2. 平衡二叉树结点

```java
private static class Node implements Comparable<Node> {
    public int data;
    public int height;
    public Node left;
    public Node right;

    public Node(int data) {
        this(data, null, null);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Node.class.getSimpleName() + "[", "]")
            .add("data=" + data)
            .toString();
    }

    public Node(int data, Node left, Node right) {
        this.data = data;
        this.left = left;
        this.right = right;
        this.height = 0;
    }

    @Override
    public int compareTo(Node node) {
        return data - node.data;
    }
}
```

## 3. 平衡二叉树的旋转

在说明旋转之前，首先要假定一个基本事实，即空结点的高度是 $0$，单结点高度为 $1$：

```java
private static int height(Node node) {
    return node == null ? 0 : node.height;
}
```

当平衡二叉树进行插入（或删除）一个结点时，将会导致子树的高度加 $1$ 或减 $1$，有可能造成平衡性的破坏，这时就要通过**旋转**来保证 AVL 树的平衡性，假设平衡性在 **A** 结点开始破坏，即 **A** 左右子树高度差为 $2$，主要有以下 4 种情况：

### 3.1 LL 旋转

![](/imgs/algorithm/data-structure/avl-2.png)

```java
private static Node LL(Node imbalance) {
    Node balance = imbalance.left;
    imbalance.left = balance.right;
    balance.right = imbalance;
    imbalance.height = Math.max(height(imbalance.left), height(imbalance.right)) + 1;
    balance.height = Math.max(height(balance.left), height(balance.right)) + 1;
    return balance;
}
```

### 3.2 RR 旋转

![](/imgs/algorithm/data-structure/avl-3.png)

```java
private static Node RR(Node imbalance) {
    Node balance = imbalance.right;
    imbalance.right = balance.left;
    balance.left = imbalance;
    imbalance.height = Math.max(height(imbalance.left), height(imbalance.right)) + 1;
    balance.height = Math.max(height(balance.left), height(balance.right)) + 1;
    return balance;
}
```

### 3.3 LR 旋转

![](/imgs/algorithm/data-structure/avl-4.png)

```java
private static Node LR(Node imbalance) {
    imbalance.left = RR(imbalance.left);
    return LL(imbalance);
}
```

### 3.4 RL 旋转

![](/imgs/algorithm/data-structure/avl-5.png)

```java
private static Node RL(Node imbalance) {
    imbalance.right = LL(imbalance.right);
    return RR(imbalance);
}
```

## 4. 平衡二叉树的插入

```java
public void insert(int key) {
    root = insert(root, key);
}

private static Node insert(Node root, int key) {
    if (root == null) {
        root = new Node(key);
    } else {
        if (key < root.data) {
            root.left = insert(root.left, key);
            if (height(root.left) - height(root.right) == 2) {
                root = key < root.left.data ? LL(root) : LR(root);
            }
        } else if (key > root.data) {
            root.right = insert(root.right, key);
            if (height(root.right) - height(root.left) == 2) {
                root = key < root.right.data ? RL(root) : RR(root);
            }
        } else {
            System.out.println("元素 " + key + " 插入失败");
        }
    }
    root.height = Math.max(height(root.left), height(root.right)) + 1;
    return root;
}
```

## 5. 平衡二叉树的删除

```java
public void remove(int key) {
    root = remove(root, key);
}

private static Node remove(Node root, int key) {
    if (root == null) {
        System.out.println("平衡二叉树空，无法删除！");
    } else {
        if (key < root.data) {
            root.left = remove(root.left, key);
            if (height(root.right) - height(root.left) == 2) {
                Node right = root.right;
                root = height(right.left) > height(right.right) ? RL(root) : RR(root);
            }
        } else if (key > root.data) {
            root.right = remove(root.right, key);
            if (height(root.left) - height(root.right) == 2) {
                Node left = root.left;
                root = height(left.left) > height(left.right) ? LL(root) : LR(root);
            }
        } else {
            if (root.left != null && root.right != null) {
                if (height(root.left) > height(root.right)) {
                    Node predecessor = predecessor(root);
                    root.data = predecessor.data;
                    root.left = remove(root.left, predecessor.data);
                } else {
                    Node successor = successor(root);
                    root.data = successor.data;
                    root.right = remove(root.right, successor.data);
                }
            } else {
                root = root.left == null ? root.right : root.left;
            }
        }
    }
    return root;
}

// 查找以该结点为根的左子树中的最大结点
private static Node predecessor(Node node) {
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
private static Node successor(Node node) {
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

## 6. 完整代码

输出结果：

```java
元素 23 插入失败
            45           
         /     \         
      17          65     
    /   \       /   \    
  9       23  53      78 
                       \ 
                        87
========================================
            45           
         /     \         
      17          65     
    /           /   \    
  9           53      78 
                       \ 
                        87
========================================
      65     
    /   \    
  45      78 
 / \       \ 
9   53      87
```

源码：

```java
package com.ice.avl;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.StringJoiner;
import java.util.function.Consumer;

/**
 * @author ice
 * @blog https://yilei.space
 * @description
 * @create 2022-02-24 15:55:11
 */
public class AVL {

    public static void main(String[] args) {
        AVL tree = new AVL();
        tree.insert(53);
        tree.insert(17);
        tree.insert(9);
        tree.insert(45);
        tree.insert(23);
        tree.insert(23);
        tree.insert(78);
        tree.insert(65);
        tree.insert(87);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(23);
        show(tree.getRoot());
        System.out.println("========================================");
        tree.remove(17);
        show(tree.getRoot());

    }

    private Node root;

    public Node getRoot() {
        return root;
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

    public void remove(int key) {
        root = remove(root, key);
    }

    private static Node remove(Node root, int key) {
        if (root == null) {
            System.out.println("平衡二叉树空，无法删除！");
        } else {
            if (key < root.data) {
                root.left = remove(root.left, key);
                if (height(root.right) - height(root.left) == 2) {
                    Node right = root.right;
                    root = height(right.left) > height(right.right) ? RL(root) : RR(root);
                }
            } else if (key > root.data) {
                root.right = remove(root.right, key);
                if (height(root.left) - height(root.right) == 2) {
                    Node left = root.left;
                    root = height(left.left) > height(left.right) ? LL(root) : LR(root);
                }
            } else {
                if (root.left != null && root.right != null) {
                    if (height(root.left) > height(root.right)) {
                        Node predecessor = predecessor(root);
                        root.data = predecessor.data;
                        root.left = remove(root.left, predecessor.data);
                    } else {
                        Node successor = successor(root);
                        root.data = successor.data;
                        root.right = remove(root.right, successor.data);
                    }
                } else {
                    root = root.left == null ? root.right : root.left;
                }
            }
        }
        return root;
    }

    // 查找以该结点为根的左子树中的最大结点
    private static Node predecessor(Node node) {
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
    private static Node successor(Node node) {
        if (node.right == null) {
            return null;
        }
        node = node.right;
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    public void insert(int key) {
        root = insert(root, key);
    }

    private static Node insert(Node root, int key) {
        if (root == null) {
            root = new Node(key);
        } else {
            if (key < root.data) {
                root.left = insert(root.left, key);
                if (height(root.left) - height(root.right) == 2) {
                    root = key < root.left.data ? LL(root) : LR(root);
                }
            } else if (key > root.data) {
                root.right = insert(root.right, key);
                if (height(root.right) - height(root.left) == 2) {
                    root = key < root.right.data ? RL(root) : RR(root);
                }
            } else {
                System.out.println("元素 " + key + " 插入失败");
            }
        }
        root.height = Math.max(height(root.left), height(root.right)) + 1;
        return root;
    }

    private static int height(Node node) {
        return node == null ? 0 : node.height;
    }


    private static Node LL(Node imbalance) {
        Node balance = imbalance.left;
        imbalance.left = balance.right;
        balance.right = imbalance;
        imbalance.height = Math.max(height(imbalance.left), height(imbalance.right)) + 1;
        balance.height = Math.max(height(balance.left), height(balance.right)) + 1;
        return balance;
    }

    private static Node RR(Node imbalance) {
        Node balance = imbalance.right;
        imbalance.right = balance.left;
        balance.left = imbalance;
        imbalance.height = Math.max(height(imbalance.left), height(imbalance.right)) + 1;
        balance.height = Math.max(height(balance.left), height(balance.right)) + 1;
        return balance;
    }

    private static Node LR(Node imbalance) {
        imbalance.left = RR(imbalance.left);
        return LL(imbalance);
    }

    private static Node RL(Node imbalance) {
        imbalance.right = LL(imbalance.right);
        return RR(imbalance);
    }


    private static class Node implements Comparable<Node> {
        public int data;
        public int height;
        public Node left;
        public Node right;

        public Node(int data) {
            this(data, null, null);
        }

        @Override
        public String toString() {
            return new StringJoiner(", ", Node.class.getSimpleName() + "[", "]")
                    .add("data=" + data)
                    .toString();
        }

        public Node(int data, Node left, Node right) {
            this.data = data;
            this.left = left;
            this.right = right;
            this.height = 0;
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
        // 先将当前结点保存到二维数组中
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

        // 从根结点开始，递归处理整个树
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

