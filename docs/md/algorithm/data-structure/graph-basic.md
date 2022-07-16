# 图 - 基础概念

## 1.  图的定义

图 $G$ 由顶点集 $V$ 和边集 $E$ 组成，记为 $G=(V,E)$，其中 $V(G)$ 表示图 $G$ 中顶点的有限非空集；$E(G)$ 表示图 $G$ 中顶点之间的关系（边）集合。若 $V=\{v_1,v_2,\cdots , v_n\}$，则 $|V|$ 表示图 $G$ 中顶点的个数，$E=\{(u,v)|u \in V,v \in V\}$，用 $|E|$ 表示图 $G$ 中边的条数。

> 图不能是空图，图的顶点集 $V$ 一定非空，此时图中只有顶点而没有边。

- **有向图**

若 $E$ 是有向边的有限集合时，则图 $G$ 为有向图。弧是顶点的有序对，记为 $<v,w>$，其中 $v,w$ 是顶点，$v$ 称为弧尾，$w$ 称为弧头， $<v,w>$ 称为从 $v$ 到 $w$ 的弧。

![](/imgs/algorithm/data-structure/graph-basic-1.png)

上图所示的有向图 $G_1$ 可表示为：
$$
G_1=(V_1,E_1) \\
V_1=\{1,2,3\} \\
E_1=\{<1,2>,<2,1>,<2,3>\}
$$

- **无向图**

若 $E$ 是无向边的有限集合时，则图 $G$ 为无向图。边是顶点的无序对，记为 $(v,w)$ 或 $(w,v)$。可以说 $w$ 和 $v$ 互为邻接点。边 $(v,w)$ 依附于 $w$ 和 $v$，或称边 $(v,w)$ 和 $v,w$ 相关联。

![](/imgs/algorithm/data-structure/graph-basic-2.png)

上图所示的无向图 $G_2$ 可表示为
$$
G_2 = (V_2,E_2) \\
V_2 = \{1,2,3,4\}\\
E_2 = \{(1,2),(1,2),(1,4),(2,3),(2,4),(3,4)\}
$$

- **简单图、多重图**

一个图 $G$ 如果满足：① 不存在重复边：② 不存在顶点到自身的边，那么称图 $G$ 为简单图。若图 $G$ 中某两个顶点之间的边数大于 $1$ 条，又允许顶点通过一条边和自身关联，则称图 $G$ 为多重图。多重图和简单图的定义是相对的。数据结构中仅讨论简单图。

- **完全图**

对于无向图，$|E|$ 的取值范围为 $0$ 到 $n(n -1)/2$，有 $n(n - 1)/2$ 条边的无向图称为完全图，在完全图中任意两个顶点之间都存在边。对于有向图，$|E|$ 的取值范围为 $0$ 到 $n(n -1)$，有 $n(n -1)$ 条弧的有向图称为有向完全图，在有向完全图中任意两个顶点之间都存在方向相反的两条弧。

- **子图**

设有两个图 $G=(V,E)$ 和 $G'=(V',E')$，若 $V'$ 是 $V$ 的子集，且 $E'$ 是 $E$ 的子集，则称 $G'$ 是 $G$ 的子图。若有满足 $V(G')=V(G)$ 的子图 $G'$，则称其为 $G$ 的生成子图。

- **连通、连通图和连通分量**

在无向图中，若从顶点 $v$ 到顶点 $w$ 有路径存在，则称 $v$ 和 $w$ 是连通的。若图 $G$ 中任意两个顶点都是连通的，则称图 $G$ 为连通图，否则称为非连通图。无向图中的极大连通子图称为连通分量，在图(a)中，图 $G_4$ 有 $3$ 个连通分量如图(b)所示。假设一个图有 $n$ 个顶点，如果边数小于 $n -1$，那么此图必是非连通图。

![](/imgs/algorithm/data-structure/graph-basic-3.png)

- **强连通图、强连通分量**

在有向图中，如果有一对顶点 $v$ 和 $w$，从 $v$ 到 $w$ 和从 $w$ 到 $v$ 之间都有路径，则称这两个顶点是强连通的。若图中任何一对顶点都是强连通的，则称此图为强连通图。有向图中的极大强连通子图称为有向图的强连通分量。

> 在无向图中讨论连通性，在有向图中讨论强连通性。

- **生成树**

连通图的生成树是包含图中全部顶点的一个极小连通子图。若图中顶点数为 $n$，则它的生成树含有 $n-1$ 条边。包含图中全部顶点的极小连通子图，只有生成树满足这个极小条件，对生成树而言，若砍去它的一条边，则会变成非连通图，若加上一条边则会形成一个回路。

- **顶点的度、入度和出度**

在无向图，顶点 $v$ 的度是指依附于顶点 $v$ 的边的条数，记为 TD$(v)$ 。

在有向图中，顶点 $v$ 的度分为入度和出度，入度是以顶点 $v$ 为终点的有向边的数目，记为 ID$(v)$；而出度是以顶点 $v$ 为起点的有向边的数目，记为 OD$(v)$。

- **边的权和网**

在一个图中，每条边都可以标上具有某种含义的数值，该数值称为该边的权值。这种边上带有权值的图称为带权图，也称网。

- **稠密图、稀疏图**

边数很少的图称为稀疏图，反之称为稠密图。稀疏和稠密本身是模糊的概念，稀疏图和稠密图常常是相对而言的。一般当图 $G$ 满足 $|E|<|V|\log|V|$时，可以将 $G$ 视为稀疏图。

- **路径、路径长度和回路**

顶点 $v_p$ 到顶点 $v_q$ 之间的一条路径是指顶点序列 $v_p,v_{i_1},v_{i_2},\cdots,v_{i_m},v_q$，当然关联的边也可以理解为路径的构成要素。路径上边的数目称为路径长度。第一个顶点和最后一个顶点相同的路径称为回路或环。若有一个图有 $n$ 个顶点，并且有大于 $n-1$ 条边，则此图一定有环。

- **简单路径、简单回路**

在路径序列中，顶点不重复出现的路径称为简单路径。除第一个顶点和最后一个顶点外，其余顶点不重复出现的回路称为简单回路。

- **距离**

从顶点 $u$ 出发到顶点 $v$ 的最短路径若存在，则此路径的长度称为从 $u$ 到 $v$ 的距离。若从 $u $ 到 $ v$ 根本不存在路径，则记该距离为无穷($\infty$)。

- **有向树**

一个顶点的入度为 $0$，其余顶点的入度均为 $1$ 的有向图，称为有向树。

## 2. 图的存储结构

### 2.1 邻接矩阵法

所谓邻接矩阵存储，是指用一个一维数组存储图中顶点的信息，用一个二维数组存储图中边的信息(即各顶点之间的邻接关系)，存储顶点之间邻接关系的二维数组称为邻接矩阵。结点数为 $n$ 的图 $G=(V, E)$ 的邻接矩阵 $A$ 是 $n\times n$ 的。将 $G$ 的顶点编号为 $v_1,v_2,\cdots,v_n$，若 $(v_1,v_j)\in E$，则 $A[i][j]$= 1，否则$A[i][i]= 0$。
$$
A[i][j]=\begin{cases}
1, \quad if \;(v_i,v_j)\; or <v_i,v_j> \;\in E(G)  \\
0,\quad if\; (v_i,v_j)\; or <v_i,v_j> \;\notin E(G)
\end{cases}
$$
对于带权图而言,若顶点 $v_i$ 和 $v_j$ 之间有边相连，则邻接矩阵中对应项存放着该边对应的权值，若顶点 $v_i$ 和 $v_j$ 不相连，则用 $\infty$ 来代表这两个顶点之间不存在边：
$$
A[i][j]=\begin{cases}
w_{ij}, \;\;\,\quad\quad if \;(v_i,v_j)\; or <v_i,v_j> \;\in E(G) \\
0 \; or \; \infty, \quad if \;(v_i,v_j)\;  or <v_i,v_j> \;\notin E(G)
\end{cases}
$$
有向图、无向图和网对应的邻接矩阵示例如下所示：

![](/imgs/algorithm/data-structure/graph-basic-4.png)

### 2.2 邻接表法

当一个图为稀疏图时，使用邻接矩阵法显然要浪费大量的存储空间，而图的邻接表法结合了顺序存储和链式存储方法，大大减少了这种不必要的浪费。

所谓邻接表，是指对图 $G$ 中的每个顶点 $v_i$ 建立一个单链表，第 $i$ 个单链表中的结点表示依附于顶点 $v_i$ 的边(对于有向图则是以顶点 $v_i$ 为尾的弧)，这个单链表就称为顶点 $v_i$ 的边表(对于有向图则称为出边表)。边表的头指针和顶点的数据信息采用顺序存储(称为顶点表)，所以在邻接表中存在两种结点：顶点表结点和边表结点，如下图所示。

![](/imgs/algorithm/data-structure/graph-basic-5.png)

顶点表结点由顶点域(`data`)和指向第一条邻接边的指针(`firstarc`) 构成，边表(邻接表)结点由邻接点域(`adjvex`)和指向下一条邻接边的指针域(`nextarc`) 构成。

无向图和有向图的邻接表实例如下所示：

![](/imgs/algorithm/data-structure/graph-basic-6.png)

## 3. 相关实现

### 3.1 Graph 接口

```java
// V 表示结点的泛型
public interface Graph<V> {
    int INFINITY = Integer.MAX_VALUE;

    int edgeSize(); // 返回边的数量

    int verticesSize(); // 返回顶点的数量

    void addVertex(V v); // 增加一个顶点

    void addEdge(V from, V to); // 增加一条边

    void addEdge(V from, V to, int weight); // 增加一条带权值的边

    void removeEdge(V from, V to); // 删除一条边

    void removeVertex(V v); // 删除一个顶点

    int degree(V v); // 返回指定顶点的度
}
```

### 3.2 邻接矩阵实现无向图

```java
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class MatrixUndirectedGraph<V> implements Graph<V> {

    private final List<V> vertexList; // 保存顶点信息
    private final int[][] edgeMatrix; // 邻接矩阵
    private int edges; // 边的数量
    private int vertices; // 顶点数量
    private final int size; // 规模，最多几个顶点

    public MatrixUndirectedGraph(int size) {
        this.size = size;
        this.vertexList = new ArrayList<>();
        this.edgeMatrix = new int[size][size];
        initEdgeMatrix();
        this.edges = 0;
        this.vertices = 0;
    }

    private void initEdgeMatrix() {
        for (int i = 0; i < this.edgeMatrix.length; i++) {
            Arrays.fill(this.edgeMatrix[i], Graph.INFINITY);
            this.edgeMatrix[i][i] = 0;
        }
    }

    @Override
    public int edgeSize() {
        return this.edges;
    }

    @Override
    public int verticesSize() {
        return vertices;
    }

    @Override
    public void addVertex(V v) {
        if (this.vertices >= this.size) {
            throw new IndexOutOfBoundsException("存储空间不足");
        }
        this.vertexList.add(v);
        this.vertices++;
    }

    @Override
    public void addEdge(V from, V to) {
        this.addEdge(from, to, 1);
    }

    @Override
    public void addEdge(V from, V to, int weight) {
        int i = this.vertexList.indexOf(from);
        int j = this.vertexList.indexOf(to);
        if (i == -1 || j == -1) {
            throw new NullPointerException("顶点 " + from + " 或 " + to + " 不存在");
        }
        this.edgeMatrix[i][j] = weight;
        this.edgeMatrix[j][i] = weight;
        this.edges++;
    }

    @Override
    public void removeEdge(V from, V to) {
        int i = this.vertexList.indexOf(from);
        int j = this.vertexList.indexOf(to);
        if (i == -1 || j == -1) {
            throw new NullPointerException("顶点 " + from + " 或 " + to + " 不存在");
        }
        this.edgeMatrix[i][j] = Graph.INFINITY;
        this.edgeMatrix[j][i] = Graph.INFINITY;
        this.edges--;
    }

    @Override
    public void removeVertex(V v) {
        int index = this.vertexList.indexOf(v); // 找到待删除顶点的索引
        if (index == -1) {
            throw new RuntimeException("顶点 " + v + " 不存在");
        }
        this.vertexList.remove(v); // 删除结点

        // 顶点删除后，连接它的边也要删除
        for (int i = 0; i < this.vertices; i++) {
            if (this.edgeMatrix[index][i] != 0 && this.edgeMatrix[index][i] != Graph.INFINITY) {
                this.edges--;
            }
        }
        // 第n行之后前移一行
        for (int i = index; i < this.vertices - 1; i++) {
            if (this.vertices >= 0) {
                System.arraycopy(this.edgeMatrix[i + 1], 0, this.edgeMatrix[i], 0, this.vertices);
            }
        }
        // 第n列之后前移一列
        for (int i = 0; i < this.vertices; i++) {
            if (this.vertices - 1 - index >= 0) {
                System.arraycopy(this.edgeMatrix[i], index + 1, this.edgeMatrix[i], index, this.vertices - 1 - index);
            }
        }
        this.vertices--;
    }

    @Override
    public int degree(V v) {
        int index = this.vertexList.indexOf(v);
        if (index == -1) {
            throw new RuntimeException("顶点 " + v + " 不存在");
        }
        int count = 0;

        for (int i = 0; i < this.vertices; i++) {
            if (this.edgeMatrix[index][i] != 0 && this.edgeMatrix[index][i] != Graph.INFINITY) {
                count++;
            }
        }
        return count;
    }

    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("无向图（邻接矩阵）：")
                .add("  顶点：" + this.vertexList)
                .add("  邻接矩阵：");
        for (int i = 0; i < this.vertices; i++) {
            StringBuilder sb = new StringBuilder("    ");
            for (int j = 0; j < this.vertices; j++) {
                String s = this.edgeMatrix[i][j] == Graph.INFINITY ? "inf" : this.edgeMatrix[i][j] + "";
                String format = String.format("%4s", s);
                sb.append(format).append(" ");
            }
            joiner.add(sb);
        }
        joiner.add("共有" + this.vertices + "个顶点，" + this.edges + "条边");
        return joiner.toString();
    }
}
```

### 3.3 邻接表实现无向图

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class ListUndirectedGraph<V> implements Graph<V> {

    private final Map<V, Vertex<V>> vertexList;
    private int edges;
    private int vertices;

    public ListUndirectedGraph() {
        this.vertexList = new HashMap<>();
        this.edges = 0;
        this.vertices = 0;
    }

    @Override
    public int edgeSize() {
        return this.edges;
    }

    @Override
    public int verticesSize() {
        return this.vertices;
    }

    @Override
    public void addVertex(V v) {
        this.vertexList.putIfAbsent(v, new Vertex<>(v));
        this.vertices++;
    }

    @Override
    public void addEdge(V from, V to) {
        this.addEdge(from, to, 1);
    }

    @Override
    public void addEdge(V from, V to, int weight) {
        Vertex<V> begin = this.vertexList.get(from);
        Vertex<V> end = this.vertexList.get(to);
        Objects.requireNonNull(begin);
        Objects.requireNonNull(end);

        Arc<V> beginArc = new Arc<>(weight, end, begin.adj);
        Arc<V> endArc = new Arc<>(weight, begin, end.adj);
        begin.adj = beginArc;
        end.adj = endArc;
        this.edges++;
    }

    @Override
    public void removeEdge(V from, V to) {
        Vertex<V> begin = this.vertexList.get(from);
        Vertex<V> end = this.vertexList.get(to);
        Objects.requireNonNull(begin);
        Objects.requireNonNull(end);
        removeArc(begin, end);
        removeArc(end, begin);
        this.edges--;
    }

    private void removeArc(Vertex<V> v, Vertex<V> toRemove) {
        Arc<V> temp = v.adj;
        Arc<V> pre = null;
        while (temp != null && !toRemove.name.equals(temp.adjvex.name)) {
            pre = temp;
            temp = temp.next;
        }
        if (temp != null) {
            if (pre != null) {
                pre.next = temp.next;
            } else {
                v.adj = temp.next;
            }
        }
    }

    @Override
    public void removeVertex(V v) {
        Vertex<V> vertex = this.vertexList.get(v);
        if (vertex != null) {
            this.vertexList.values().forEach(from -> removeArc(from, vertex));
            int degree = degree(v);
            this.edges -= degree;
            this.vertexList.remove(v);
            this.vertices--;
        }
    }

    @Override
    public int degree(V v) {
        Vertex<V> vertex = this.vertexList.get(v);
        Objects.requireNonNull(vertex);
        int count = 0;
        Arc<V> arc = vertex.adj;
        while (arc != null) {
            count++;
            arc = arc.next;
        }
        return count;
    }

    protected static class Vertex<V> {
        V name; // 顶点名
        Arc<V> adj; // 邻接表

        public Vertex(V name) {
            this.name = name;
            this.adj = null;
        }

        @Override
        public String toString() {
            StringJoiner joiner = new StringJoiner("\n");
            joiner.add("  结点 " + this.name + " :");
            Arc<V> temp = this.adj;
            while (temp != null) {
                joiner.add("    " + temp);
                temp = temp.next;
            }
            return joiner.toString();
        }
    }

    protected static class Arc<V> {
        int weight;
        Vertex<V> adjvex;
        Arc<V> next;

        public Arc(int weight, Vertex<V> adjvex, Arc<V> next) {
            this.weight = weight;
            this.adjvex = adjvex;
            this.next = next;
        }

        @Override
        public String toString() {
            return new StringJoiner(", ", Arc.class.getSimpleName() + "[", "]")
                    .add("weight=" + weight)
                    .add("adjvex=" + adjvex.name)
                    .toString();
        }
    }

    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("无向图（邻接表）：");
        this.vertexList.values().forEach(vertex -> joiner.add(vertex.toString()));
        joiner.add("共有" + this.vertices + "个顶点，" + this.edges + "条边");
        return joiner.toString();
    }
}
```

### 3.4 邻接矩阵实现有向图

```java
import java.util.*;
import java.util.function.Consumer;


public class MatrixDirectedGraph<V> implements Graph<V> {

    private final List<V> vertexList; // 保存顶点信息
    private final int[][] edgeMatrix; // 邻接矩阵
    private int edges; // 边的数量
    private int vertices; // 顶点数量
    private final int size; // 规模，最多几个顶点

    public MatrixDirectedGraph(int size) {
        this.size = size;
        this.vertexList = new ArrayList<>();
        this.edgeMatrix = new int[size][size];
        initEdgeMatrix();
        this.edges = 0;
        this.vertices = 0;
    }

    private void initEdgeMatrix() {
        for (int i = 0; i < this.edgeMatrix.length; i++) {
            Arrays.fill(this.edgeMatrix[i], Graph.INFINITY);
            this.edgeMatrix[i][i] = 0;
        }
    }

    @Override
    public int edgeSize() {
        return this.edges;
    }

    @Override
    public int verticesSize() {
        return vertices;
    }

    @Override
    public void addVertex(V v) {
        if (this.vertices >= this.size) {
            throw new IndexOutOfBoundsException("存储空间不足");
        }
        this.vertexList.add(v);
        this.vertices++;
    }

    @Override
    public void addEdge(V from, V to) {
        this.addEdge(from, to, 1);
    }

    @Override
    public void addEdge(V from, V to, int weight) {
        int i = this.vertexList.indexOf(from);
        int j = this.vertexList.indexOf(to);
        if (i == -1 || j == -1) {
            throw new NullPointerException("顶点 " + from + " 或 " + to + " 不存在");
        }
        this.edgeMatrix[i][j] = weight;
        this.edges++;
    }

    @Override
    public void removeEdge(V from, V to) {
        int i = this.vertexList.indexOf(from);
        int j = this.vertexList.indexOf(to);
        if (i == -1 || j == -1) {
            throw new NullPointerException("顶点 " + from + " 或 " + to + " 不存在");
        }
        this.edgeMatrix[i][j] = Graph.INFINITY;
        this.edges--;
    }

    @Override
    public void removeVertex(V v) {
        int index = this.vertexList.indexOf(v); // 找到待删除顶点的索引
        if (index == -1) {
            throw new RuntimeException("顶点 " + v + " 不存在");
        }
        this.vertexList.remove(v); // 删除结点

        // 顶点删除后，连接它的边也要删除
        for (int i = 0; i < this.vertices; i++) {
            if (this.edgeMatrix[index][i] != 0 && this.edgeMatrix[index][i] != Graph.INFINITY
                    || this.edgeMatrix[i][index] != 0 && this.edgeMatrix[i][index] != Graph.INFINITY) {
                this.edges--;
            }
        }
        // 第n行之后前移一行
        for (int i = index; i < this.vertices - 1; i++) {
            if (this.vertices >= 0) {
                System.arraycopy(this.edgeMatrix[i + 1], 0, this.edgeMatrix[i], 0, this.vertices);
            }
        }
        // 第n列之后前移一列
        for (int i = 0; i < this.vertices; i++) {
            if (this.vertices - 1 - index >= 0) {
                System.arraycopy(this.edgeMatrix[i], index + 1, this.edgeMatrix[i], index, this.vertices - 1 - index);
            }
        }
        this.vertices--;
    }

    @Override
    public int degree(V v) {
        int index = this.vertexList.indexOf(v);
        if (index == -1) {
            throw new RuntimeException("顶点 " + v + " 不存在");
        }
        int count = 0;

        for (int i = 0; i < this.vertices; i++) {
            if (this.edgeMatrix[index][i] != 0 && this.edgeMatrix[index][i] != Graph.INFINITY) {
                count++;
            }
        }
        return count;
    }

    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("有向图（邻接矩阵）：")
                .add("  顶点：" + this.vertexList)
                .add("  邻接矩阵：");
        for (int i = 0; i < this.vertices; i++) {
            StringBuilder sb = new StringBuilder("    ");
            for (int j = 0; j < this.vertices; j++) {
                String s = this.edgeMatrix[i][j] == Graph.INFINITY ? "inf" : this.edgeMatrix[i][j] + "";
                String format = String.format("%4s", s);
                sb.append(format).append(" ");
            }
            joiner.add(sb);
        }
        joiner.add("共有" + this.vertices + "个顶点，" + this.edges + "条边");
        return joiner.toString();
    }
}
```

### 3.5 邻接表实现有向图

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.StringJoiner;
import java.util.concurrent.atomic.AtomicInteger;

public class ListDirectedGraph<V> implements Graph<V> {

    private final Map<V, Vertex<V>> vertexList;
    private int edges;
    private int vertices;

    public ListDirectedGraph() {
        this.vertexList = new HashMap<>();
        this.edges = 0;
        this.vertices = 0;
    }

    @Override
    public int edgeSize() {
        return this.edges;
    }

    @Override
    public int verticesSize() {
        return this.vertices;
    }

    @Override
    public void addVertex(V v) {
        this.vertexList.putIfAbsent(v, new Vertex<>(v));
        this.vertices++;
    }

    @Override
    public void addEdge(V from, V to) {
        this.addEdge(from, to, 1);
    }

    @Override
    public void addEdge(V from, V to, int weight) {
        Vertex<V> begin = this.vertexList.get(from);
        Vertex<V> end = this.vertexList.get(to);
        Objects.requireNonNull(begin);
        Objects.requireNonNull(end);

        begin.adj = new Arc<>(weight, end, begin.adj);
        this.edges++;
    }

    @Override
    public void removeEdge(V from, V to) {
        Vertex<V> begin = this.vertexList.get(from);
        Vertex<V> end = this.vertexList.get(to);
        Objects.requireNonNull(begin);
        Objects.requireNonNull(end);
        removeArc(begin, end);
        this.edges--;
    }

    private void removeArc(Vertex<V> v, Vertex<V> toRemove) {
        Arc<V> temp = v.adj;
        Arc<V> pre = null;
        while (temp != null && !toRemove.name.equals(temp.adjvex.name)) {
            pre = temp;
            temp = temp.next;
        }
        if (temp != null) {
            if (pre != null) {
                pre.next = temp.next;
            } else {
                v.adj = temp.next;
            }
        }
    }

    @Override
    public void removeVertex(V v) {
        Vertex<V> vertex = this.vertexList.get(v);
        if (vertex != null) {
            int degree = degree(v);
            this.vertexList.values().forEach(from -> removeArc(from, vertex));
            this.edges -= degree;
            this.vertexList.remove(v);
            this.vertices--;
        }
    }

    @Override
    public int degree(V v) {
        Vertex<V> vertex = this.vertexList.get(v);
        Objects.requireNonNull(vertex);
        AtomicInteger count = new AtomicInteger();
        this.vertexList.values().forEach(vNode -> {
            Arc<V> adj = vNode.adj;
            while (adj != null) {
                if (adj.adjvex.name.equals(vertex.name)) {
                    count.getAndIncrement();
                }
                adj = adj.next;
            }
        });
        Arc<V> arc = vertex.adj;
        while (arc != null) {
            count.getAndIncrement();
            arc = arc.next;
        }
        return count.get();
    }

    protected static class Vertex<V> {
        V name; // 顶点名
        Arc<V> adj; // 邻接表

        public Vertex(V name) {
            this.name = name;
            this.adj = null;
        }

        @Override
        public String toString() {
            StringJoiner joiner = new StringJoiner("\n");
            joiner.add("  结点 " + this.name + " :");
            Arc<V> temp = this.adj;
            while (temp != null) {
                joiner.add("    " + temp);
                temp = temp.next;
            }
            return joiner.toString();
        }
    }

    protected static class Arc<V> {
        int weight;
        Vertex<V> adjvex;
        Arc<V> next;

        public Arc(int weight, Vertex<V> adjvex, Arc<V> next) {
            this.weight = weight;
            this.adjvex = adjvex;
            this.next = next;
        }

        @Override
        public String toString() {
            return new StringJoiner(", ", ListUndirectedGraph.Arc.class.getSimpleName() + "[", "]")
                    .add("weight=" + weight)
                    .add("adjvex=" + adjvex.name)
                    .toString();
        }
    }

    @Override
    public String toString() {
        StringJoiner joiner = new StringJoiner("\n");
        joiner.add("有向图（邻接表）：");
        this.vertexList.values().forEach(vertex -> joiner.add(vertex.toString()));
        joiner.add("共有" + this.vertices + "个顶点，" + this.edges + "条边");
        return joiner.toString();
    }
}
```

### 3.6 代码测试

#### 3.6.1 无向图

![](/imgs/algorithm/data-structure/graph-basic-7.png)

- 邻接矩阵

```java
public static void testMatrixUDG() {
    MatrixUndirectedGraph<Character> graph = new MatrixUndirectedGraph<>(10);

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'E');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'F');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    
    System.out.println(graph);

    graph.removeEdge('A','B');
    graph.removeVertex('C');

    System.out.println(graph);
}
```

输出结果：

```
无向图（邻接矩阵）：
  顶点：[A, B, C, D, E, F]
  邻接矩阵：
       0    1  inf    1  inf  inf 
       1    0    1  inf    1  inf 
     inf    1    0    1  inf    1 
       1  inf    1    0  inf    1 
     inf    1  inf  inf    0    1 
     inf  inf    1    1    1    0 
共有6个顶点，8条边
无向图（邻接矩阵）：
  顶点：[A, B, D, E, F]
  邻接矩阵：
       0  inf    1  inf  inf 
     inf    0  inf    1  inf 
       1  inf    0  inf    1 
     inf    1  inf    0    1 
     inf  inf    1    1    0 
共有5个顶点，4条边
```

- 邻接表

```java
public static void testListUDG() {
    ListUndirectedGraph<Character> graph = new ListUndirectedGraph<>();

    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B');
    graph.addEdge('A', 'D');
    graph.addEdge('B', 'C');
    graph.addEdge('B', 'E');
    graph.addEdge('C', 'D');
    graph.addEdge('C', 'F');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');

    System.out.println(graph);

    graph.removeEdge('A','B');
    graph.removeVertex('C');

    System.out.println(graph);
}
```

输出结果：

```
无向图（邻接表）：
  结点 A :
    Arc[weight=1, adjvex=D]
    Arc[weight=1, adjvex=B]
  结点 B :
    Arc[weight=1, adjvex=E]
    Arc[weight=1, adjvex=C]
    Arc[weight=1, adjvex=A]
  结点 C :
    Arc[weight=1, adjvex=F]
    Arc[weight=1, adjvex=D]
    Arc[weight=1, adjvex=B]
  结点 D :
    Arc[weight=1, adjvex=F]
    Arc[weight=1, adjvex=C]
    Arc[weight=1, adjvex=A]
  结点 E :
    Arc[weight=1, adjvex=F]
    Arc[weight=1, adjvex=B]
  结点 F :
    Arc[weight=1, adjvex=E]
    Arc[weight=1, adjvex=D]
    Arc[weight=1, adjvex=C]
共有6个顶点，8条边
无向图（邻接表）：
  结点 A :
    Arc[weight=1, adjvex=D]
  结点 B :
    Arc[weight=1, adjvex=E]
  结点 D :
    Arc[weight=1, adjvex=F]
    Arc[weight=1, adjvex=A]
  结点 E :
    Arc[weight=1, adjvex=F]
    Arc[weight=1, adjvex=B]
  结点 F :
    Arc[weight=1, adjvex=E]
    Arc[weight=1, adjvex=D]
共有5个顶点，4条边
```

#### 3.6.2 有向图

![](/imgs/algorithm/data-structure/graph-basic-8.png)

- 邻接矩阵

```java
public static void testMatrixDG() {
    MatrixDirectedGraph<Character> graph = new MatrixDirectedGraph<>(10);
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'A');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'A');
    graph.addEdge('D', 'C');
    graph.addEdge('E', 'F');
    graph.addEdge('F', 'C');
    graph.addEdge('F', 'D');

    System.out.println(graph);

    graph.removeEdge('E', 'F');
    graph.removeVertex('D');

    System.out.println(graph);
}
```

输出结果：

```
有向图（邻接矩阵）：
  顶点：[A, B, C, D, E, F]
  邻接矩阵：
       0    1  inf  inf  inf  inf 
     inf    0  inf    1  inf  inf 
       1  inf    0  inf    1  inf 
       1  inf    1    0  inf  inf 
     inf  inf  inf  inf    0    1 
     inf  inf    1    1  inf    0 
共有6个顶点，9条边
有向图（邻接矩阵）：
  顶点：[A, B, C, E, F]
  邻接矩阵：
       0    1  inf  inf  inf 
     inf    0  inf  inf  inf 
       1  inf    0    1  inf 
     inf  inf  inf    0  inf 
     inf  inf    1  inf    0 
共有5个顶点，4条边
```

- 邻接表

```java
public static void testListDG() {
    ListDirectedGraph<Character> graph = new ListDirectedGraph<>();
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'A');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'A');
    graph.addEdge('D', 'C');
    graph.addEdge('E', 'F');
    graph.addEdge('F', 'C');
    graph.addEdge('F', 'D');

    System.out.println(graph);

    graph.removeEdge('E', 'F');
    graph.removeVertex('D');

    System.out.println(graph);
}
```

输出结果：

```
有向图（邻接表）：
  结点 A :
    Arc[weight=1, adjvex=B]
  结点 B :
    Arc[weight=1, adjvex=D]
  结点 C :
    Arc[weight=1, adjvex=E]
    Arc[weight=1, adjvex=A]
  结点 D :
    Arc[weight=1, adjvex=C]
    Arc[weight=1, adjvex=A]
  结点 E :
    Arc[weight=1, adjvex=F]
  结点 F :
    Arc[weight=1, adjvex=D]
    Arc[weight=1, adjvex=C]
共有6个顶点，9条边
无向图（邻接表）：
  结点 A :
    Arc[weight=1, adjvex=B]
  结点 B :
  结点 C :
    Arc[weight=1, adjvex=E]
    Arc[weight=1, adjvex=A]
  结点 E :
  结点 F :
    Arc[weight=1, adjvex=C]
共有5个顶点，4条边
```

