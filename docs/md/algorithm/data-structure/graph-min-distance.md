# 图 - 最短路径

前述的广度优先搜索查找最短路径只是针对无权图而言的。当图是带权图时，把从一个顶点 $v_0$ 到图中其余任意一个顶点 $v_i$ 的一条路径（可能不止一条）所经过边上的权值之和，定义为该路径的带权路径长度，把带权路径长度最短的那条称为最短路径。

求解最短路径的算法通常都依赖于一种性质，即两点之间的最短路径也包含了路径上其他顶点间的最短路径（贪心策略）。带权有向图 $G$ 的最短路径问题一般可分为两类：一是单源最短路径，即求图中某一顶点到其他各顶点的最短路径，可通过 Dijkstra 算法求解；而是求每对顶点间的最短路径，可通过 Floyd 算法求解。

> 本章实现函数的类见 [图 - 基础概念](http://e-thunder.space/md/algorithm/data-structure/graph-basic.html)。

## 1. Dijkstra 算法

### 1.1 算法思想

设有两个顶点集合 $S$ 和 $T$，集合 $S$ 中存放图中已找到最短路径的顶点，集合 $T$ 存放图中剩余顶点。初始状态时，集合 $S$ 中只包含源点 $V_0$，然后不断从集合 $T$ 中选取到顶点 $V_0$ 路径长度最短的顶点 $v_u$ 并入到集合 $S$ 中。集合 $S$ 每并入一个新的顶点 $v_u$，都要修改顶点 $V_0$ 到集合 $T$ 中顶点的最短路径长度值。不断重复此过程，直到集合 $T$ 的顶点全部并入到 $S$ 中为止。

### 1.2 算法过程

引进 $3$ 个辅助数组 、${\text{dist}}[]$、${\text{path}}[]$ 和 ${\text{set}}[]$。

${\text{dist}}[v_i]$ 表示当前已找到的从 $v_0$ 到每个终点 $v_i$ 的最短路径的长度。它的初态为：若从 $v_0$ 到 $v_i$ 有边，则 ${\text{dist}}[v_i]$ 为边上的权值，否则置 ${\text{dist}}[v_i]$  为 $\infty$。

${\text{path}}[v_i]$ 中保存从 $v_0$ 到 $v_i$ 最短路径上 $v_i$ 的前一个顶点，假设最短路径上的项点序列为 $v_0,v_1,v_2,\cdots, v_{i-1},v_i$，则 ${\text{path}}[v_i]=v_{i-1}$**。 **${\text{path}}[]$ 的初态为：如果 $v_0$ 到 $v_i$ 有边， 则 ${\text{path}}[v_i]=v_{0}$， 否则 。${\text{path}}[v_i]=-1$

${\text{set}}[]$ 为标记数组，${\text{set}}[v_i]=0$ 表示 $v_i$ 在 $T$ 中，即没有被并入最短路径； ${\text{set}}[v_i]=1$ 表示 $v_i$ 在 $S$ 中，即已经被并入最短路径。${\text{set}}[]$ 的初态为：${\text{set}}[v_0]=1$，其余元素全为 $0$。

Dijkstra 算法的执行过程如下：

1. 从当前 ${\text{dist}}[]$ 数组中选出最小值，假设为 ${\text{dist}}[v_u]$，将 ${\text{set}}[v_u]$ 设置为 $1$，表示当前新并入的顶点为 $v_u$。
2. 循环扫描图中顶点，对每个顶点进行以下检测：
   假设当前顶点为 $v_j$，检测 $v_j$ 是否已经被并入 $S$ 中，即看是否 ${\text{set}}[v_j]=1$。 如果 ${\text{set}}[v_j]=1$， 则什么都不做；如果 ${\text{set}}[v_j]=0$，则比较 ${\text{dist}}[v_j]$ 和 ${\text{dist}}[v_j]+w$ 的大小，其中 $w$ 为边 $<v_u,v_j>$ 的权值。 这个比较就是要看 $v_0$ 经过旧的最短路径到达 $v_j$ 和 $v_0$ 经过含有 $v_u$ 的新的最短路径到达 $v_j$ 哪个更短,如果 ${\text{dist}}[v_j]>{\text{dist}}[v_u]+w$，则用新的路径长度来更新旧的，并把顶点 $v_u$ 加入路径中，且作为路径上 $v_j$ 之前的那个顶点，否则什么都不做。
3. 对前 $2$ 步循环执行 $n-1$ 次（$n$ 为图中顶点个数），即可得到 $v_0$ 到其余所有顶点的最短路径。

### 1.3 代码实现

#### 1.3.1 邻接矩阵

```java
public void dijkstra(V v) {
    int origin = this.vertexList.indexOf(v); // 查找起始点索引

    // 第一步，初始化辅助数组
    int[] dist = new int[this.vertices];
    int[] path = new int[this.vertices];
    boolean[] set = new boolean[this.vertices];
    set[origin] = true;
    for (int i = 0; i < this.vertices; i++) {
        int len = this.edgeMatrix[origin][i];
        if (len != 0 && len != Graph.INFINITY) {
            dist[i] = len;
            path[i] = origin;
        } else {
            dist[i] = set[i] ? 0 : Graph.INFINITY;
            path[i] = -1;
        }
    }

    int n = this.vertices - 1;
    while (n-- > 0) {
        // 选出当前 dist[] 中最小值
        int min = Graph.INFINITY;
        int u = 0;
        for (int i = 0; i < dist.length; i++) {
            if (!set[i] && min > dist[i]) {
                min = dist[i];
                u = i;
            }
        }
        if (min == Graph.INFINITY) break;
        set[u] = true;

        // 修正最短路径和前驱顶点
        for (int j = 0; j < this.vertices; j++) {
            if (!set[j]) {
                int w = this.edgeMatrix[u][j];
                if (w != Graph.INFINITY && dist[j] > dist[u] + w) {
                    dist[j] = dist[u] + w;
                    path[j] = u;
                }
            }
        }
    }

    // 结果处理
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < this.vertices; i++) {
        if (i != origin) {
            sb.append("顶点 ").append(v).append(" 到顶点 ").append(this.vertexList.get(i)).append(" 的最短路径为：[");
            if (dist[i] != Graph.INFINITY) {
                Deque<Integer> stack = new LinkedList<>();
                stack.push(i);
                int k = i;
                while (k != origin) {
                    stack.push(path[k]);
                    k = path[k];
                }
                sb.append(this.vertexList.get(stack.pop()));
                while (!stack.isEmpty()) {
                    sb.append(" -> ").append(this.vertexList.get(stack.pop()));
                }
            }
            sb.append("] 路径长度为：").append(dist[i] == Graph.INFINITY ? null : dist[i]).append("\n");
        }
    }
    System.out.print(sb);
}
```

#### 1.3.2 邻接表

```java
public void dijkstra(V v) {
    // 查找起始点
    Vertex<V> origin = this.vertexList.get(v);

    // 第一步，初始化辅助数据结构
    Map<V, Integer> dist = this.vertexList.keySet().stream().collect(
        Collectors.toMap(vName -> vName, vName -> {
            if (vName == v) return 0;
            Arc<V> adj = origin.adj;
            while (adj != null) {
                if (adj.adjvex.name == vName) {
                    return adj.weight;
                }
                adj = adj.next;
            }
            return Graph.INFINITY;
        })
    );

    Map<V, Optional<V>> path = this.vertexList.keySet().stream().collect(
        Collectors.toMap(vName -> vName, vName -> {
            if (dist.get(vName) != Graph.INFINITY) {
                return Optional.of(v);
            } else {
                return Optional.empty();
            }
        })
    );

    Map<V, Boolean> set = this.vertexList.keySet().stream().collect(
        Collectors.toMap(vName -> vName, vName -> vName == v)
    );

    int n = this.vertices - 1;
    while (n-- > 0) {
        // 选出当前 dist[] 中最小值
        Optional<Map.Entry<V, Integer>> min = dist.entrySet().stream()
            .filter(entry -> !set.get(entry.getKey()) && entry.getValue() != Graph.INFINITY)
            .min(Comparator.comparingInt(Map.Entry::getValue));
        if (!min.isPresent() || min.get().getValue() == Graph.INFINITY) {
            break;
        }
        Map.Entry<V, Integer> minEntry = min.get();
        set.put(minEntry.getKey(), true);

        // 修正最短路径和前驱顶点
        this.vertexList.values().stream().filter(node -> !set.get(node.name)).forEach(jNode -> {
            Arc<V> adj = this.vertexList.get(minEntry.getKey()).adj;
            while (adj != null) {
                if (adj.adjvex.name == jNode.name) {
                    int w = adj.weight;
                    if (dist.get(jNode.name) > dist.get(minEntry.getKey()) + w) {
                        dist.put(jNode.name, dist.get(minEntry.getKey()) + w);
                        path.put(jNode.name, Optional.of(minEntry.getKey()));
                    }
                    break;
                }
                adj = adj.next;
            }
        }
                                                                                     );
    }

    // 结果处理
    StringBuilder sb = new StringBuilder();
    this.vertexList.keySet().stream().filter(k -> k != v).forEach(k -> {
        sb.append("顶点 ").append(v).append(" 到顶点 ").append(k).append(" 的最短路径为：[");
        if (dist.get(k) != Graph.INFINITY) {
            Deque<V> stack = new LinkedList<>();
            stack.push(k);
            Optional<V> pre = path.get(k);
            while (pre.isPresent() && pre.get() != v) {
                stack.push(pre.get());
                pre = path.get(pre.get());
            }
            sb.append(v);
            while (!stack.isEmpty()) {
                sb.append(" -> ").append(stack.pop());
            }
        }
        sb.append("] 路径长度为：").append(dist.get(k) == Graph.INFINITY ? null : dist.get(k)).append("\n");
    }
                                                                 );
    System.out.print(sb);
}
```

### 1.4 代码测试

![](/imgs/algorithm/data-structure/graph-min-distance-1.png)

#### 1.4.1 邻接矩阵

```java
public static void testDijkstra() {
    MatrixDirectedGraph<Character> graph = new MatrixDirectedGraph<>(10);
        graph.addVertex('A');
        graph.addVertex('B');
        graph.addVertex('C');
        graph.addVertex('D');
        graph.addVertex('E');
        graph.addVertex('F');
        graph.addVertex('G');

        graph.addEdge('A', 'B', 4);
        graph.addEdge('A', 'C', 6);
        graph.addEdge('A', 'D', 6);
        graph.addEdge('B', 'C', 1);
        graph.addEdge('B', 'E', 7);
        graph.addEdge('C', 'E', 6);
        graph.addEdge('C', 'F', 4);
        graph.addEdge('D', 'C', 2);
        graph.addEdge('D', 'F', 5);
        graph.addEdge('E', 'G', 6);
        graph.addEdge('F', 'E', 1);
        graph.addEdge('F', 'G', 8);

        graph.dijkstra('A');
        System.out.println("=======================================================");
        graph.dijkstra('B');
        System.out.println("=======================================================");
        graph.dijkstra('C');
        System.out.println("=======================================================");
        graph.dijkstra('E');
        System.out.println("=======================================================");
        graph.dijkstra('G');
}
```

输出结果：

```
顶点 A 到顶点 B 的最短路径为：[A -> B] 路径长度为：4
顶点 A 到顶点 C 的最短路径为：[A -> B -> C] 路径长度为：5
顶点 A 到顶点 D 的最短路径为：[A -> D] 路径长度为：6
顶点 A 到顶点 E 的最短路径为：[A -> B -> C -> F -> E] 路径长度为：10
顶点 A 到顶点 F 的最短路径为：[A -> B -> C -> F] 路径长度为：9
顶点 A 到顶点 G 的最短路径为：[A -> B -> C -> F -> E -> G] 路径长度为：16
=======================================================
顶点 B 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 B 到顶点 C 的最短路径为：[B -> C] 路径长度为：1
顶点 B 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 B 到顶点 E 的最短路径为：[B -> C -> F -> E] 路径长度为：6
顶点 B 到顶点 F 的最短路径为：[B -> C -> F] 路径长度为：5
顶点 B 到顶点 G 的最短路径为：[B -> C -> F -> E -> G] 路径长度为：12
=======================================================
顶点 C 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 E 的最短路径为：[C -> F -> E] 路径长度为：5
顶点 C 到顶点 F 的最短路径为：[C -> F] 路径长度为：4
顶点 C 到顶点 G 的最短路径为：[C -> F -> E -> G] 路径长度为：11
=======================================================
顶点 E 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 C 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 F 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 G 的最短路径为：[E -> G] 路径长度为：6
=======================================================
顶点 G 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 C 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 E 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 F 的最短路径为：[] 路径长度为：null
```

#### 1.4.2 邻接表

```java
public static void testDijkstra() {
    ListDirectedGraph<Character> graph = new ListDirectedGraph<>();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');

    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 6);
    graph.addEdge('A', 'D', 6);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'E', 7);
    graph.addEdge('C', 'E', 6);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'C', 2);
    graph.addEdge('D', 'F', 5);
    graph.addEdge('E', 'G', 6);
    graph.addEdge('F', 'E', 1);
    graph.addEdge('F', 'G', 8);

    graph.dijkstra('A');
    System.out.println("=======================================================");
    graph.dijkstra('B');
    System.out.println("=======================================================");
    graph.dijkstra('C');
    System.out.println("=======================================================");
    graph.dijkstra('E');
    System.out.println("=======================================================");
    graph.dijkstra('G');
}
```

输出结果：

```
顶点 A 到顶点 B 的最短路径为：[A -> B] 路径长度为：4
顶点 A 到顶点 C 的最短路径为：[A -> B -> C] 路径长度为：5
顶点 A 到顶点 D 的最短路径为：[A -> D] 路径长度为：6
顶点 A 到顶点 E 的最短路径为：[A -> B -> C -> F -> E] 路径长度为：10
顶点 A 到顶点 F 的最短路径为：[A -> B -> C -> F] 路径长度为：9
顶点 A 到顶点 G 的最短路径为：[A -> B -> C -> F -> E -> G] 路径长度为：16
=======================================================
顶点 B 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 B 到顶点 C 的最短路径为：[B -> C] 路径长度为：1
顶点 B 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 B 到顶点 E 的最短路径为：[B -> C -> F -> E] 路径长度为：6
顶点 B 到顶点 F 的最短路径为：[B -> C -> F] 路径长度为：5
顶点 B 到顶点 G 的最短路径为：[B -> C -> F -> E -> G] 路径长度为：12
=======================================================
顶点 C 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 C 到顶点 E 的最短路径为：[C -> F -> E] 路径长度为：5
顶点 C 到顶点 F 的最短路径为：[C -> F] 路径长度为：4
顶点 C 到顶点 G 的最短路径为：[C -> F -> E -> G] 路径长度为：11
=======================================================
顶点 E 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 C 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 F 的最短路径为：[] 路径长度为：null
顶点 E 到顶点 G 的最短路径为：[E -> G] 路径长度为：6
=======================================================
顶点 G 到顶点 A 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 B 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 C 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 D 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 E 的最短路径为：[] 路径长度为：null
顶点 G 到顶点 F 的最短路径为：[] 路径长度为：null
```

## 2. Floyd 算法

### 2.1 算法思想

求所有顶点之间的最短路径问题描述如下：已知一个各边权值均大于 $0$ 的带权有向图,对任.意两个顶点 $v_i \neq v_j$，要求求出 $v_i$ 与 $v_j$ 之间的最短路径和最短路径长度。

Floyd 算法的基本思想是：递推产生一个 $n$ 阶方阵序列 $A^{(-1)},A^{(0)},\cdots,A^{(k)},\cdots,A^{(n-1)}$，其中 $A^{(k)}[i][j]$ 表示从顶点 $v_i$ 到顶点 $v_j$ 的路径长度， $k$ 表示绕行第 $k$ 个顶点的运算步骤。初始时，对于任意两个顶点 $v_i$ 和 $v_j$，若它们之间存在边，则以此边上的权值作为它们之间的最短路径长度；若它们之间不存在有向边，则以 $\infty$ 作为它们之间的最短路径长度。以后逐步尝试在原路径中加入顶点 $k(k=0,1,\cdots,n-1)$ 作为之间顶点。若增加中间顶点后，得到的路径比原来的路径长度减少了，则以此新路径代替原路径。

Floyd 算法是一个经典的动态规划算法。用通俗的语言来描述的话，首先我们的目标是寻找从点 $i$ 到点 $j$ 的最短路径。从动态规划的角度看问题，我们需要为这个目标重新做一个诠释。

从任意顶点 $i$ 到任意顶点 $j$ 的最短路径不外乎 $2$ 种可能，一是直接从 $i$ 到 $j$，二是从 $i$ 经过若干个顶点 $k$ 到 $j$。所以，我们假设 `Dis(i,j)` 为顶点 `u` 到顶点 `v` 的最短路径的距离，对于每一个顶点 `k`，我们检查 $Dis(i,k) + Dis(k,j) < Dis(i,j)$ 是否成立，如果成立，证明从 $i$ 到 $k$ 再到 $j$ 的路径比 $i$ 直接到 $j$ 的路径短，我们便设置 $Dis(i,j) = Dis(i,k) + Dis(k,j)$，这样一来，当我们遍历完所有顶点 $k$，$Dis(i,j)$ 中记录的便是 $i$ 到 $j$ 的最短路径的距离。

### 2.2 算法过程

1. 设置两个矩阵 $A$ 和 $Path$，从任意一条单边路径开始。所有两点之间的距离是边的权，如果两点之间没有边相连，则权为无穷大；对于邻接矩阵，$A$ 的初态是直接将交接矩阵赋值给它，$Path$ 的初态是元素全部置为 $-1$
2. 对于每一对顶点 $i$ 和 $j$，看看是否存在一个顶点 $k$ 使得从 $i$ 到 $k$ 再到 $j$ 比己知的路径更短。如果是则更新它。还是以邻接矩阵来说，对所有的顶点对 $\{i,j\}$ 进行如下检测与修改：如果 $A[i][j] > A[i][k] + A[k][j]$，则将 $A[i][j]$ 改为 $A[i][k] + A[k][j]$ 的值，将 $Path[i][j]$ 改为 $k$，否则什么都不做。

### 2.3 代码实现

#### 2.3.1 邻接矩阵

```java
public void floyd() {
    // 初始化辅助数据结构
    int[][] A = new int[this.vertices][this.vertices], path = new int[this.vertices][this.vertices];
    for (int i = 0; i < this.vertices; i++) {
        System.arraycopy(this.edgeMatrix[i], 0, A[i], 0, this.vertices);
        Arrays.fill(path[i], -1);
    }

    for (int k = 0; k < this.vertices; k++) {
        for (int i = 0; i < this.vertices; i++) {
            if (i == k || A[i][k] == Graph.INFINITY) continue;
            for (int j = 0; j < this.vertices; j++) {
                if (j != i && j != k && A[k][j] != Graph.INFINITY
                    && A[i][j] > A[i][k] + A[k][j]) {
                    A[i][j] = A[i][k] + A[k][j];
                    path[i][j] = k;
                }
            }
        }
    }

    // 处理结果
    for (int i = 0; i < this.vertices; i++) {
        System.out.println("============== 顶点 " + this.vertexList.get(i) + " 到各顶点的最短路径 ==============");
        StringBuilder sb = new StringBuilder();
        for (int j = 0; j < this.vertices; j++) {
            if (i != j) {
                sb.append("  ");
                sb.append(this.vertexList.get(i)).append(" to ").append(this.vertexList.get(j)).append("：[");
                String s = getPath(i, j, path, A);
                if (!"".equals(s)) {
                    sb.append(this.vertexList.get(i));
                }
                sb.append(s);
                sb.append("]").append(" 路径长度为：").append(A[i][j] == Graph.INFINITY ? null : A[i][j]).append('\n');
            }
        }
        System.out.print(sb);
    }
}

private String getPath(int u, int v, int[][] path, int[][] A) {
    if (A[u][v] == Graph.INFINITY) {
        return "";
    }
    int temp;
    if ((temp = path[u][v]) == -1) {
        return " -> " + this.vertexList.get(v);
    }
    String before = getPath(u, temp, path, A);
    String after = getPath(temp, v, path, A);
    return before + after;
}
```

#### 2.3.2 邻接表

```java
public void floyd() {

    // 第一步，初始化辅助数据结构
    Map<V, Map<V, Integer>> distance = new HashMap<>();

    this.vertexList.keySet().forEach(fromNodeName -> {
        Map<V, Integer> map = this.vertexList.keySet().stream().collect(
            Collectors.toMap(vName -> vName, vName -> {
                if (vName == fromNodeName) return 0;
                Arc<V> adj = this.vertexList.get(fromNodeName).adj;
                while (adj != null) {
                    if (adj.adjvex.name == vName) {
                        return adj.weight;
                    }
                    adj = adj.next;
                }
                return Graph.INFINITY;
            })
        );
        distance.put(fromNodeName, map);
    });


    Map<V, Map<V, Optional<V>>> path = this.vertexList.keySet().stream().collect(
        Collectors.toMap(k -> k, v -> this.vertexList.keySet().stream().collect(
            Collectors.toMap(k -> k, mid -> Optional.empty())
        ))
    );

    this.vertexList.keySet().forEach(
        temp -> this.vertexList.keySet().forEach(
            from -> {
                if (from == temp || distance.get(from).get(temp) == Graph.INFINITY) return;
                this.vertexList.keySet().forEach(
                    to -> {
                        if (to != from && to != temp
                            && distance.get(temp).get(to) != Graph.INFINITY
                            && distance.get(from).get(to) > distance.get(from).get(temp) + distance.get(temp).get(to)) {
                            distance.get(from).put(to, distance.get(from).get(temp) + distance.get(temp).get(to));
                            path.get(from).put(to, Optional.of(temp));
                        }
                    }
                );
            }
        )
    );

    this.vertexList.keySet().forEach(
        from -> {
            System.out.println("============== 顶点 " + from + " 到各顶点的最短路径 ==============");
            StringBuilder sb = new StringBuilder();
            this.vertexList.keySet().forEach(
                to -> {
                    if (from != to) {
                        sb.append("  ");
                        sb.append(from).append(" to ").append(to).append("：[");
                        String s = getPath(from, to, path, distance);
                        if (!"".equals(s)) {
                            sb.append(from);
                        }
                        sb.append(s);
                        int dist = distance.get(from).get(to);
                        sb.append("]").append(" 路径长度为：").append(dist == Graph.INFINITY ? null : dist).append('\n');
                    }
                }
            );
            System.out.print(sb);
        }
    );
}

private String getPath(V from, V to, Map<V, Map<V, Optional<V>>> path, Map<V, Map<V, Integer>> distance) {
    if (distance.get(from).get(to) == Graph.INFINITY) {
        return "";
    }
    Optional<V> temp = path.get(from).get(to);
    if (!temp.isPresent()) {
        return " -> " + to;
    }
    String before = getPath(from, temp.get(), path, distance);
    String after = getPath(temp.get(), to, path, distance);
    return before + after;
}
```

### 2.4 代码测试

![](/imgs/algorithm/data-structure/graph-min-distance-1.png)

#### 2.4.1 邻接矩阵

```java
public static void testFloyd(){
    MatrixDirectedGraph<Character> graph = new MatrixDirectedGraph<>(10);
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');

    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 6);
    graph.addEdge('A', 'D', 6);
    graph.addEdge('B', 'C', 1);
    graph.addEdge('B', 'E', 7);
    graph.addEdge('C', 'E', 6);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'C', 2);
    graph.addEdge('D', 'F', 5);
    graph.addEdge('E', 'G', 6);
    graph.addEdge('F', 'E', 1);
    graph.addEdge('F', 'G', 8);

    graph.floyd();
}
```

输出结果：

```
============== 顶点 A 到各顶点的最短路径 ==============
  A to B：[A -> B] 路径长度为：4
  A to C：[A -> B -> C] 路径长度为：5
  A to D：[A -> D] 路径长度为：6
  A to E：[A -> B -> C -> F -> E] 路径长度为：10
  A to F：[A -> B -> C -> F] 路径长度为：9
  A to G：[A -> B -> C -> F -> E -> G] 路径长度为：16
============== 顶点 B 到各顶点的最短路径 ==============
  B to A：[] 路径长度为：null
  B to C：[B -> C] 路径长度为：1
  B to D：[] 路径长度为：null
  B to E：[B -> C -> F -> E] 路径长度为：6
  B to F：[B -> C -> F] 路径长度为：5
  B to G：[B -> C -> F -> E -> G] 路径长度为：12
============== 顶点 C 到各顶点的最短路径 ==============
  C to A：[] 路径长度为：null
  C to B：[] 路径长度为：null
  C to D：[] 路径长度为：null
  C to E：[C -> F -> E] 路径长度为：5
  C to F：[C -> F] 路径长度为：4
  C to G：[C -> F -> E -> G] 路径长度为：11
============== 顶点 D 到各顶点的最短路径 ==============
  D to A：[] 路径长度为：null
  D to B：[] 路径长度为：null
  D to C：[D -> C] 路径长度为：2
  D to E：[D -> F -> E] 路径长度为：6
  D to F：[D -> F] 路径长度为：5
  D to G：[D -> F -> E -> G] 路径长度为：12
============== 顶点 E 到各顶点的最短路径 ==============
  E to A：[] 路径长度为：null
  E to B：[] 路径长度为：null
  E to C：[] 路径长度为：null
  E to D：[] 路径长度为：null
  E to F：[] 路径长度为：null
  E to G：[E -> G] 路径长度为：6
============== 顶点 F 到各顶点的最短路径 ==============
  F to A：[] 路径长度为：null
  F to B：[] 路径长度为：null
  F to C：[] 路径长度为：null
  F to D：[] 路径长度为：null
  F to E：[F -> E] 路径长度为：1
  F to G：[F -> E -> G] 路径长度为：7
============== 顶点 G 到各顶点的最短路径 ==============
  G to A：[] 路径长度为：null
  G to B：[] 路径长度为：null
  G to C：[] 路径长度为：null
  G to D：[] 路径长度为：null
  G to E：[] 路径长度为：null
  G to F：[] 路径长度为：null
```

#### 2.4.2 邻接表

```java
public static void testFloyd(){
    ListDirectedGraph<Character> graph = new ListDirectedGraph<>();
    graph.addVertex('0');
    graph.addVertex('1');
    graph.addVertex('2');
    graph.addVertex('3');

    graph.addEdge('0','1',5);
    graph.addEdge('0','3',7);
    graph.addEdge('1','2',4);
    graph.addEdge('1','3',2);
    graph.addEdge('2','0',3);
    graph.addEdge('2','1',3);
    graph.addEdge('2','3',2);
    graph.addEdge('3','2',1);

    graph.floyd();
}
```

输出结果：

```
============== 顶点 A 到各顶点的最短路径 ==============
  A to B：[A -> B] 路径长度为：4
  A to C：[A -> B -> C] 路径长度为：5
  A to D：[A -> D] 路径长度为：6
  A to E：[A -> B -> C -> F -> E] 路径长度为：10
  A to F：[A -> B -> C -> F] 路径长度为：9
  A to G：[A -> B -> C -> F -> E -> G] 路径长度为：16
============== 顶点 B 到各顶点的最短路径 ==============
  B to A：[] 路径长度为：null
  B to C：[B -> C] 路径长度为：1
  B to D：[] 路径长度为：null
  B to E：[B -> C -> F -> E] 路径长度为：6
  B to F：[B -> C -> F] 路径长度为：5
  B to G：[B -> C -> F -> E -> G] 路径长度为：12
============== 顶点 C 到各顶点的最短路径 ==============
  C to A：[] 路径长度为：null
  C to B：[] 路径长度为：null
  C to D：[] 路径长度为：null
  C to E：[C -> F -> E] 路径长度为：5
  C to F：[C -> F] 路径长度为：4
  C to G：[C -> F -> E -> G] 路径长度为：11
============== 顶点 D 到各顶点的最短路径 ==============
  D to A：[] 路径长度为：null
  D to B：[] 路径长度为：null
  D to C：[D -> C] 路径长度为：2
  D to E：[D -> F -> E] 路径长度为：6
  D to F：[D -> F] 路径长度为：5
  D to G：[D -> F -> E -> G] 路径长度为：12
============== 顶点 E 到各顶点的最短路径 ==============
  E to A：[] 路径长度为：null
  E to B：[] 路径长度为：null
  E to C：[] 路径长度为：null
  E to D：[] 路径长度为：null
  E to F：[] 路径长度为：null
  E to G：[E -> G] 路径长度为：6
============== 顶点 F 到各顶点的最短路径 ==============
  F to A：[] 路径长度为：null
  F to B：[] 路径长度为：null
  F to C：[] 路径长度为：null
  F to D：[] 路径长度为：null
  F to E：[F -> E] 路径长度为：1
  F to G：[F -> E -> G] 路径长度为：7
============== 顶点 G 到各顶点的最短路径 ==============
  G to A：[] 路径长度为：null
  G to B：[] 路径长度为：null
  G to C：[] 路径长度为：null
  G to D：[] 路径长度为：null
  G to E：[] 路径长度为：null
  G to F：[] 路径长度为：null
```

