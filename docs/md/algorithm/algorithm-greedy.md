# 算法思想 - 贪婪算法

所谓贪心算法是指，在对问题求解时，总是做出**在当前看来是最好的选择**。也就是说，不从整体最优上加以考虑，他所做出的仅是在某种意义上的**局部最优解**。

贪心算法没有固定的算法框架，算法设计的关键是贪心策略的选择。必须注意的是，贪心算法不是对所有问题都能得到整体最优解，选择的贪心策略必须具备无后效性，即某个状态以后的过程不会影响以前的状态，只与当前状态有关。

所以对所采用的贪心策略一定要**仔细分析其是否满足无后效性**。

**贪心算法的基本要素**：

- **贪心选择性质**

  所谓贪心选择性质是指所求问题的**整体最优解**可以通过一系列**局部最优**的选择，即贪心选择来达到。这是贪心算法可行的第一个基本要素，也是贪心算法与动态规划算法的主要区别。

  **动态规划算法**通常以**自底向上的方式**解各子问题，而贪心算法则通常以**自顶向下**的方式进行，以迭代的方式作出相继的贪心选择，每作一次贪心选择就将所求问题简化为规模更小的子问题。

  对于一个具体问题，要确定它是否具有贪心选择性质，必须证明每一步所作的贪心选择最终导致问题的整体最优解。

- **最优子结构性质**

  当**一个问题的最优解包含其子问题的最优解**时，称此问题具有最优子结构性质。**问题的最优子结构性质是该问题可用动态规划算法或贪心算法求解的关键特征**。

【例 1】给出 $n$ 个开区间 $(x,y)$，从中选择**尽可能多**的开区间，使得这些开区间两两没有交集. 例如对开区间 $(1,3)$、$(2,4)$、$(3,5)$、$(6,7)$.

【解】

设 $F(n)$ 表示 $n$ 个开区间的最大不相交区间，那么根据贪心策略，逐步局部最优得到最终结果，我们可以得到：
$$
F(n)=F(n-1)+l_n
$$
其中， $l_n$ 表示第 $n$ 步选择的区间. 

那么第 $n$ 步选择哪个区间呢？有三种情况，$l_n$ 加到已选区间的最左边，最右边以及已选区间的中间.

显然，$l_n$ 不能插入已选区间的中间，因为你的同时判断 $l_n$ 的起始端和中间端与已有区间的关系，问题较为复杂，所以我们应该选择的 $l_n$ 是直接插入已选区间对的一边.

也就是说，当 $l_n$ 是插入到 $F(n-1)$ 的左边时，选择的是结束最早的区间段；当 $l_n$ 是插入到 $F(n-1)$ 的右边时，选择的是开始最晚的区间段. 

以每步选择开始最晚的区间段为例，它的边界条件是啥呢？显然，$l_{n-1}$ 的结束端不能大于 $l_n$ 的起始端.

按照这个算法，该例可以用如下步骤解决：
$$
F(4)=F(3)+l_4=F(2)+l_3+l_4=l_1+l_3+l_4
$$
> 贪心策略适用范围并不是很广，在使用时一定要进行贪心策略的正确性证明！













