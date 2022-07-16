# 图 - 拓扑排序

## 1. AOV 网

若用 DAG 图表示-一个工程，其顶点表示活动，用有向边 $<V_i,V_j>$ 表示活动 $V_i$ 必须先于活动 $V_j$ 进行的这样一种关系， 则将这种有向图称为顶点表示活动的网络，记为 AOV 网。在 AOV 网中，活动 $V_i$ 是活动 $V_j$ 的直接前驱，活动 $V_j$ 是活动 $V_i$ 的直接后继，这种前驱和后继关系具有传递性，且任何活动 $V_i$ 不能以它自己作为自己的前驱或后继。

## 2. 拓扑排序的前提

拓扑排序：在图论中，由一个有向无环图的顶点组成的序列，当且仅当满足下列条件时，称为该图的一个拓扑排序：

① 每个顶点出现且只出现一次。

② 若顶点 $A$ 在序列中排在顶点 $B$ 的前面，则在图中不存在从顶点 $B$ 到顶点 $A$ 的路径。

或定义为：拓扑排序是对有向无环图的顶点的一种排序，它使得若存在一条从项点 $A$到顶点 $B$ 的路径，则在排序中顶点 $B$ 出现在顶点 $A$ 的后面。每个 AOV 网都有一个或多个拓扑排序序列。

## 3. 算法过程

对一个 AOV 网进行拓扑排序的算法有很多，下面介绍比较常用的一种方法的步骤:

① 从 AOV 网中选择一个没有前驱的顶点并输出。

② 从网中删除该顶点和所有以它为起点的有向边。

③ 重复 ① 和 ② 直到当前的 AOV 网为空或当前网中不存在无前驱的顶点为止。后一种情况说明有向图中必然存在环。

一个典型的拓扑排序过程如下所示：

![](/imgs/algorithm/data-structure/graph-topo-sort-1.png)

## 4. 代码实现

### 4.1 邻接矩阵

```java
public void topologicalSort(Consumer<V> consumer) {
    int[] inDegree = inDegree();
    Deque<Integer> stack = new LinkedList<>();
    for (int k = 0; k < inDegree.length; k++) {
        if (inDegree[k] == 0) stack.push(k);
    }
    int count = 0;
    while (!stack.isEmpty()) {
        int n = stack.pop();
        consumer.accept(this.vertexList.get(n));
        count++;
        for (int i = 0; i < this.vertices; i++) {
            if (this.edgeMatrix[n][i] != 0 && this.edgeMatrix[n][i] != Graph.INFINITY) {
                --inDegree[i];
                if (inDegree[i] == 0) {
                    stack.push(i);
                }
            }
        }
    }
    if (count < this.vertices){
        throw new RuntimeException("图中有环，拓扑排序存在环。");
    }
}

private int[] inDegree() {
    int[] inDegree = new int[this.vertices];
    for (int j = 0; j < this.vertices; j++) {
        for (int i = 0; i < this.vertices; i++) {
            if (i != j && this.edgeMatrix[i][j] != Graph.INFINITY) {
                inDegree[j]++;
            }
        }
    }
    return inDegree;
}
```

### 4.2 邻接表

```java
public void topologicalSort(Consumer<V> consumer) {
    Map<V, Integer> inDegree = inDegree();
    Deque<V> stack = new LinkedList<>();
    inDegree.forEach((k, v) -> {
        if (v == 0) stack.push(k);
    });
    int sorted = 0;
    while (!stack.isEmpty()) {
        V v = stack.pop();
        consumer.accept(v);
        sorted++;
        Arc<V> adj = this.vertexList.get(v).adj;
        while (adj != null) {
            inDegree.computeIfPresent(adj.adjvex.name, (vName, count) -> {
                if (count - 1 == 0) {
                    stack.push(vName);
                }
                return count - 1;
            });
            adj = adj.next;
        }
    }
    if (sorted < this.vertices) {
        throw new RuntimeException("图中有环，拓扑排序失败");
    }
}

private Map<V, Integer> inDegree() {
    Map<V, Integer> inDegree = this.vertexList.keySet().stream().collect(Collectors.toMap(k -> k, v -> 0));
    this.vertexList.values().forEach(vertex -> {
        Arc<V> adj = vertex.adj;
        while (adj != null) {
            inDegree.computeIfPresent(adj.adjvex.name, (vName, count) -> count + 1);
            adj = adj.next;
        }
    });

    return inDegree;
}
```

## 5. 代码测试

![](/imgs/algorithm/data-structure/graph-topo-sort-2.png)

### 5.1 邻接矩阵

```java
public static void testTopologicalSort() {
    MatrixDirectedGraph<Character> graph = new MatrixDirectedGraph<>(10);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'E');
    graph.addEdge('C', 'E');
    graph.addEdge('C', 'F');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'G');
    graph.addEdge('F', 'E');
    graph.addEdge('F', 'G');

    graph.topologicalSort(System.out::println);
}
```

输出结果：

```
A
D
B
C
F
E
G
```

### 5.2 邻接表

```java
public static void testTopologicalSort() {
    ListDirectedGraph<Character> graph = new ListDirectedGraph<>();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');
    graph.addVertex('G');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'E');
    graph.addEdge('C', 'E');
    graph.addEdge('C', 'F');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'G');
    graph.addEdge('F', 'E');
    graph.addEdge('F', 'G');

    graph.topologicalSort(System.out::println);
}
```

输出结果：

```
A
B
C
D
F
E
G
```

