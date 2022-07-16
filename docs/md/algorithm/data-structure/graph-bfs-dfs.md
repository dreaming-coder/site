# 图 - 遍历

> 本文图示部分转自 [https://www.pdai.tech/md/algorithm/alg-basic-graph-bfs-dfs.html](https://www.pdai.tech/md/algorithm/alg-basic-graph-bfs-dfs.html)

图的遍历是指从图中的某一顶点出发，按照某种搜索方法沿着图中的边对图中的所有顶点访问一次且仅访问一次。注意到树是一种特殊的图，所以树的遍历实际上也可视为一种特殊的图的遍历。图的遍历算法是求解图的连通性问题、拓扑排序和求关键路径等算法的基础。

图的遍历比树的遍历要复杂得多，因为图的任一顶点都可能和其余的顶点相邻接，所以在访问某个顶点后，可能沿着某条路径搜索又回到该顶点上。为避免同一顶点被访问多次，在遍历图的过程中，必须记下每个已访问过的顶点，为此可以设一个辅助数组 visited[] 来标记项点是否被访问过。图的遍历算法主要有两种：广度优先搜索和深度优先搜索。

## 1. 广度优先搜索

广度优先搜索算法(Breadth First Search)，又称为"宽度优先搜索"或"横向优先搜索"，简称 BFS。

它的思想是: 从图中某顶点 $v$ 出发，在访问了 $v$ 之后依次访问 $v$ 的各个未曾访问过的邻接点，然后分别从这些邻接点出发依次访问它们的邻接点，并使得“先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，直至图中所有已被访问的顶点的邻接点都被访问到。如果此时图中尚有顶点未被访问，则需要另选一个未曾被访问过的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。

换句话说，广度优先搜索遍历图的过程是以 $v$ 为起点，由近至远，依次访问和 $v$ 有路径相通且路径长度为 $1,2,\cdots$ 的顶点。

### 1.1 无向图的广度优先搜索

![](/imgs/algorithm/data-structure/graph-bfs-dfs-1.jpg)

- 第 1 步：访问 $A$
- 第 2 步：依次访问 $C,D,F$，在访问了 $A$ 之后，接下来访问 $A$ 的邻接点。
- 第 3 步：依次访问 $B,G$，在第 2 步访问完 $C,D,F$ 之后，再依次访问它们的邻接点。首先访问 $C$ 的邻接点 $B$，再访问 $F$ 的邻接点 $G$。
- 第 4 步：访问 $E$， 在第 3 步访问完 $B,G$ 之后，再依次访问它们的邻接点。只有 $G$ 有邻接点 $E$，因此访问 $G$ 的邻接点 $E$。

### 1.2 有向图的广度优先搜索

![](/imgs/algorithm/data-structure/graph-bfs-dfs-2.jpg)

- 第 1 步：访问 $A$
- 第 2 步：访问 $B$
- 第 3 步：依次访问 $C,E,F$， 在访问了 $B$ 之后，接下来访问B的出边的另一个顶点，即 $C,E,F$。
- 第 4 步：依次访问 $D,G$，在访问完 $C,E,F$ 之后，再依次访问它们的出边的另一个顶点。还是按照 $C,E,F$ 的顺序访问，$C$ 的已经全部访问过了，那么就只剩下 $E,F$；先访问 $E$ 的邻接点 $D$，再访问 $F$ 的邻接点 $G$。

## 2. 深度优先搜索

它的思想：假设初始状态是图中所有顶点均未被访问，则从某个顶点 $v$ 出发，首先访问该顶点，然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和 $v$ 有路径相通的顶点都被访问到。 若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。

显然，深度优先搜索是一个递归的过程。

### 2.1 无向图的深度优先搜索

![](/imgs/algorithm/data-structure/graph-bfs-dfs-3.jpg)

- 第 1 步：访问 $A$
- 第 2 步：访问 $C$ ($A$ 的邻接点) ， 在第 1 步访问 $A$ 之后，接下来应该访问的是 $A$ 的邻接点，即"$C,D,F$"中的一个
- 第 3 步：访问 $B$ ($C$ 的邻接点)， 在第 2 步访问 $C$ 之后，接下来应该访问 $C$ 的邻接点，即"$B$ 和 $D$"中一个($A$ 已经被访问过，就不算在内)
- 第 4 步：访问 $D$ ($C$ 的邻接点)， 在第 3 步访问了 $C$ 的邻接点 $B$ 之后，$B$ 没有未被访问的邻接点；因此，返回到访问 $C$ 的另一个邻接点 $D$
- 第 5 步：访问 $F$ ($A$ 的邻接点)， 前面已经访问了 $A$，并且访问完了"$A$ 的邻接点 $B$ 的所有邻接点(包括递归的邻接点在内)"；因此，此时返回到访问 $A$ 的另一个邻接点 $F$
- 第 6 步：访问 $G$ ($F$ 的邻接点)
- 第 7 步：访问 $E$ ($G$ 的邻接点)

### 2.2 有向图的深度优先搜索

![](/imgs/algorithm/data-structure/graph-bfs-dfs-4.jpg)

- 第 1 步：访问 $A$
- 第 2 步：访问 $B$，在访问了 $A$ 之后，接下来应该访问的是 $A$ 的出边的另一个顶点，即顶点 $B$
- 第 3 步：访问 $C$，在访问了 $B$ 之后，接下来应该访问的是B的出边的另一个顶点，即顶点 $C,E,F$
- 第 4 步：访问 $E$，接下来访问 $C$ 的出边的另一个顶点，即顶点 $E$
- 第 5 步：访问 $D$，接下来访问E的出边的另一个顶点，即顶点 $B,D$。顶点 $B$ 已经被访问过，因此访问顶点 $D$
- 第 6 步：访问 $F$，接下应该回溯"访问 $A$ 的出边的另一个顶点 $F$"。
- 第 7 步：访问 $G$

## 3. 相关实现

> 这里基于上一篇 [图 - 基础概念](http://e-thunder.space/md/algorithm/data-structure/graph-basic.html#_3-%E7%9B%B8%E5%85%B3%E5%AE%9E%E7%8E%B0) 中给出的实现添加遍历的函数。

> 需要注意的是，基于前文实现的图的类，每种图的实现方式对于有向图和无向图的遍历代码是一样的。

### 3.1 邻接矩阵

```java
public void bfs(Consumer<V> consumer) {
    if (this.vertices == 0) return;

    // 访问标记数组
    boolean[] visited = new boolean[this.vertices];

    // 辅助队列
    Queue<Integer> queue = new LinkedList<>();

    for (int i = 0; i < this.vertices; i++) {
        if (!visited[i]) {
            queue.offer(i);
            visited[0] = true;
        }
        while (!queue.isEmpty()) {
            int index = queue.poll();
            consumer.accept(this.vertexList.get(index));
            for (int j = 0; j < this.vertices; j++) {
                if (this.edgeMatrix[index][j] != Graph.INFINITY && this.edgeMatrix[index][j] != 0 && !visited[j]) {
                    queue.offer(j);
                    visited[j] = true;
                }
            }
        }
    }
}

public void dfs(Consumer<V> consumer) {
    if (this.vertices == 0) return;

    // 访问标记数组
    boolean[] visited = new boolean[this.vertices];
    for (int i = 0; i < this.vertices; i++) {
        if (!visited[i]) {
            dfs(i, visited, consumer);
        }
    }
}

private void dfs(int v, boolean[] visited, Consumer<V> consumer) {
    consumer.accept(this.vertexList.get(v));
    visited[v] = true;
    for (int i = 0; i < this.vertices; i++) {
        if (this.edgeMatrix[v][i] != Graph.INFINITY && this.edgeMatrix[v][i] != 0 && !visited[i]) {
            dfs(i, visited, consumer);
        }
    }
}
```

### 3.2 邻接表

```java
public void bfs(Consumer<Vertex<V>> consumer) {
    if (this.vertices == 0) return;

    // 访问标记数组
    Map<V, Boolean> visited = this.vertexList.keySet().stream().collect(Collectors.toMap(key -> key, value -> false));

    Queue<Vertex<V>> queue = new LinkedList<>();

    this.vertexList.forEach((k, v) -> {
                if (!visited.get(k)) {
                    queue.offer(v);
                    visited.put(k, true);
                }
                while (!queue.isEmpty()) {
                    Vertex<V> vertex = queue.poll();
                    consumer.accept(vertex);
                    Arc<V> adj = vertex.adj;
                    while (adj != null) {
                        if (!visited.get(adj.adjvex.name)) {
                            queue.offer(adj.adjvex);
                            visited.put(adj.adjvex.name, true);
                        }
                        adj = adj.next;
                    }
                }
            }
    );
}

public void dfs(Consumer<Vertex<V>> consumer) {
    if (this.vertices == 0) return;

    // 访问标记数组
    Map<V, Boolean> visited = this.vertexList.keySet().stream().collect(Collectors.toMap(key -> key, value -> false));
    this.vertexList.forEach((k, v) -> {
        if (!visited.get(k)) {
            dfs(v, visited, consumer);
        }
    });
}

private void dfs(Vertex<V> v, Map<V, Boolean> visited, Consumer<Vertex<V>> consumer) {
    consumer.accept(v);
    visited.put(v.name, true);
    Arc<V> adj = v.adj;
    while (adj != null) {
        if (!visited.get(adj.adjvex.name)) {
            dfs(adj.adjvex, visited, consumer);
        }
        adj = adj.next;
    }
}
```

