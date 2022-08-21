# ♥Java 并发知识体系详解♥

> 本文转自 @pdai 的[博客](https://www.pdai.tech/)。

## 知识体系

![](/imgs/java/concurrent/overview-1.png)

## 相关主要内容

> **A. Java 进阶 - Java 并发之基础**：首先全局的了解并发的知识体系，同时了解并发理论基础和线程基础，并发关键字等，这些是你理解 Java 并发框架的基础。

- [Java 并发 - 理论基础]()

  - 多线程的出现是要解决什么问题的?

  - 线程不安全是指什么? 举例说明

  - 并发出现线程不安全的本质什么? 可见性，原子性和有序性。

  - Java 是怎么解决并发问题的? 3 个关键字，JMM 和 8 个 Happens-Before

  - 线程安全是不是非真即假? 不是

  - 线程安全有哪些实现思路?

  - 如何理解并发和并行的区别?

- [Java 并发 - 线程基础]()

  - 线程有哪几种状态? 分别说明从一种状态到另一种状态转变有哪些方式?

  - 通常线程有哪几种使用方式?

  - 基础线程机制有哪些?

  - 线程的中断方式有哪些?

  - 线程的互斥同步方式有哪些? 如何比较和选择?

  - 线程之间有哪些协作方式?

- [Java 并发 - Java 中所有的锁]()
  - Java 提供了种类丰富的锁，每种锁因其特性的不同，在适当的场景下能够展现出非常高的效率。本文旨在对锁相关源码、使用场景进行举例，为读者介绍主流锁的知识点，以及不同的锁的适用场景。

- [关键字: synchronized ]()

  - Synchronized 可以作用在哪里? 分别通过对象锁和类锁进行举例。

  - Synchronized 本质上是通过什么保证线程安全的? 分三个方面回答：加锁和释放锁的原理，可重入原理，保证可见性原理。

  - Synchronized 由什么样的缺陷?  Java Lock 是怎么弥补这些缺陷的。

  - Synchronized 和 Lock 的对比，和选择?

  - Synchronized 在使用时有何注意事项?

  - Synchronized 修饰的方法在抛出异常时,会释放锁吗?

  - 多个线程等待同一个 Synchronized 锁的时候，JVM 如何选择下一个获取锁的线程?

  - Synchronized 使得同时只有一个线程可以执行，性能比较差，有什么提升的方法?

  - 我想更加灵活地控制锁的释放和获取(现在释放锁和获取锁的时机都被规定死了)，怎么办?

  - 什么是锁的升级和降级? 什么是 JVM 里的偏斜锁、轻量级锁、重量级锁?

  - 不同的 JDK 中对 Synchronized 有何优化?

- [关键字: volatile]()

  - volatile 关键字的作用是什么?

  - volatile 能保证原子性吗?

  - 之前 32 位机器上共享的 long 和 double 变量的为什么要用 volatile? 现在 64 位机器上是否也要设置呢?

  - i++ 为什么不能保证原子性?

  - volatile 是如何实现可见性的?  内存屏障。

  - volatile 是如何实现有序性的?  happens-before 等

  - 说下 volatile 的应用场景?

- [关键字: final]()

  - 所有的 final 修饰的字段都是编译期常量吗?

  - 如何理解 private 所修饰的方法是隐式的 final?

  - 说说 final 类型的类如何拓展? 比如 String 是 final 类型，我们想写个 MyString 复用所有 String 中方法，同时增加一个新的 toMyString() 的方法，应该如何做?

  - final 方法可以被重载吗? 可以

  - 父类的 final 方法能不能够被子类重写? 不可以

  - 说说 final 域重排序规则?

  - 说说 final 的原理?

  - 使用 final 的限制条件和局限性?

> **B. Java 进阶 - Java 并发之 J.U.C 框架**：然后需要对 J.U.C 框架五大类详细解读，包括：Lock 框架，并发集合，原子类，线程池和工具类。

- [JUC - 类汇总和学习指南]()
  - JUC 框架包含几个部分?
  - 每个部分有哪些核心的类?
  - 最最核心的类有哪些?

> **B.1 Java 进阶 - Java 并发之 J.U.C 框架【1/5】：CAS 及原子类**：从最核心的 CAS, Unsafe 和原子类开始分析。

- [JUC 原子类: CAS, Unsafe 和原子类详解]()

  - 线程安全的实现方法有哪些?

  - 什么是 CAS?

  - CAS 使用示例，结合 AtomicInteger 给出示例?

  - CAS 会有哪些问题?

  - 针对这这些问题，Java 提供了哪几个解决的?

  - AtomicInteger 底层实现? CAS + volatile

  - 请阐述你对 Unsafe 类的理解?

  - 说说你对 Java 原子类的理解? 包含 13 个，4 组分类，说说作用和使用场景。

  - AtomicStampedReference 是什么?

  - AtomicStampedReference 是怎么解决 ABA 的? 内部使用 Pair 来存储元素值及其版本号

  - Java 中还有哪些类可以解决 ABA 的问题? AtomicMarkableReference

> **B.2 Java 进阶 - Java 并发之 J.U.C 框架【2/5】：锁**：然后分析 JUC 中锁。

- [JUC 锁: LockSupport]()

  - 为什么 LockSupport 也是核心基础类? AQS 框架借助于两个类：Unsafe (提供 CAS 操作)和 LockSupport (提供 park/unpark 操作)

  - 写出分别通过 wait/notify 和 LockSupport 的 park/unpark 实现同步?

  - LockSupport.park() 会释放锁资源吗? 那么 Condition.await() 呢?

  - Thread.sleep()、Object.wait()、Condition.await()、LockSupport.park() 的区别? 重点

  - 如果在 wait() 之前执行了 notify() 会怎样?

  - 如果在 park() 之前执行了 unpark() 会怎样?

- [JUC 锁: 锁核心类 AQS]()

  - 什么是 AQS? 为什么它是核心?

  - AQS 的核心思想是什么? 它是怎么实现的? 底层数据结构等

  - AQS 有哪些核心的方法?

  - AQS 定义什么样的资源获取方式? AQS 定义了两种资源获取方式：`独占`(只有一个线程能访问执行，又根据是否按队列的顺序分为`公平锁`和`非公平锁`，如 `ReentrantLock`) 和`共享`(多个线程可同时访问执行，如 `Semaphore`、`CountDownLatch`、 `CyclicBarrier` )。`ReentrantReadWriteLock` 可以看成是组合式，允许多个线程同时对某一资源进行读。

  - AQS 底层使用了什么样的设计模式? 模板

  - AQS 的应用示例?

- [JUC 锁: ReentrantLock]()

  - 什么是可重入，什么是可重入锁? 它用来解决什么问题?

  - ReentrantLock 的核心是 AQS，那么它怎么来实现的，继承吗? 说说其类内部结构关系。

  - ReentrantLock 是如何实现公平锁的?

  - ReentrantLock 是如何实现非公平锁的?

  - ReentrantLock 默认实现的是公平还是非公平锁?

  - 使用 ReentrantLock 实现公平和非公平锁的示例?

  - ReentrantLock 和 Synchronized 的对比?

- [JUC 锁: ReentrantReadWriteLock]()

  - 为了有了 ReentrantLock 还需要 ReentrantReadWriteLock?

  - ReentrantReadWriteLock 底层实现原理?

  - ReentrantReadWriteLock 底层读写状态如何设计的? 高 16 位为读锁，低 16 位为写锁

  - 读锁和写锁的最大数量是多少?

  - 本地线程计数器 ThreadLocalHoldCounter 是用来做什么的?

  - 缓存计数器 HoldCounter 是用来做什么的?

  - 写锁的获取与释放是怎么实现的?

  - 读锁的获取与释放是怎么实现的?

  - RentrantReadWriteLock 为什么不支持锁升级?

  - 什么是锁的升降级? RentrantReadWriteLock 为什么不支持锁升级?

> **B.3 Java 进阶 - Java 并发之 J.U.C 框架【3/5】：集合**：再理解 JUC 中重要的支持并发的集合。

- [JUC集合: ConcurrentHashMap]()

  - 为什么 HashTable 慢? 它的并发度是什么? 那么 ConcurrentHashMap 并发度是什么?

  - ConcurrentHashMap 在 JDK1.7 和 JDK1.8 中实现有什么差别? JDK1.8 解決了 JDK1.7 中什么问题

  - ConcurrentHashMap JDK1.7 实现的原理是什么? 分段锁机制

  - ConcurrentHashMap JDK1.8 实现的原理是什么? 数组+链表+红黑树，CAS

  - ConcurrentHashMap JDK1.7 中 Segment 数(concurrencyLevel)默认值是多少? 为何一旦初始化就不可再扩容?

  - ConcurrentHashMap JDK1.7 说说其 put 的机制?

  - ConcurrentHashMap JDK1.7 是如何扩容的? rehash (注：segment 数组不能扩容，扩容是 segment 数组某个位置内部的数组 HashEntry<K,V>[] 进行扩容)

  - ConcurrentHashMap JDK1.8 是如何扩容的? tryPresize

  - ConcurrentHashMap JDK1.8 链表转红黑树的时机是什么? 临界值为什么是8?

  - ConcurrentHashMap JDK1.8 是如何进行数据迁移的? transfer

- [JUC 集合: CopyOnWriteArrayList]()

  - 请先说说非并发集合中 Fail-fast 机制?

  - 再为什么说 ArrayList 查询快而增删慢?

  - 对比 ArrayList 说说 CopyOnWriteArrayList 的增删改查实现原理? COW 基于拷贝

  - 再说下弱一致性的迭代器原理是怎么样的? `COWIterator<E>`

  - CopyOnWriteArrayList 为什么并发安全且性能比 Vector 好?

  - CopyOnWriteArrayList 有何缺陷，说说其应用场景?

- [JUC 集合: ConcurrentLinkedQueue]()

  - 要想用线程安全的队列有哪些选择? Vector，`Collections.synchronizedList( List<T> list)`, ConcurrentLinkedQueue等

  - ConcurrentLinkedQueue 实现的数据结构?

  - ConcurrentLinkedQueue 底层原理?  全程无锁(CAS)

  - ConcurrentLinkedQueue 的核心方法有哪些? offer()，poll()，peek()，isEmpty() 等队列常用方法

  - 说说 ConcurrentLinkedQueue 的 HOPS (延迟更新的策略)的设计?

  - ConcurrentLinkedQueue 适合什么样的使用场景?

- [JUC 集合: BlockingQueue]()

  - 什么是 BlockingDeque?

  - BlockingQueue 大家族有哪些? ArrayBlockingQueue, DelayQueue, LinkedBlockingQueue, SynchronousQueue...

  - BlockingQueue 适合用在什么样的场景?

  - BlockingQueue 常用的方法?

  - BlockingQueue 插入方法有哪些? 这些方法(`add(o)`,`offer(o)`,`put(o)`,`offer(o, timeout, timeunit)`)的区别是什么?

  - BlockingDeque 与 BlockingQueue 有何关系，请对比下它们的方法?

  - BlockingDeque 适合用在什么样的场景?

  - BlockingDeque 大家族有哪些?

  - BlockingDeque 与 BlockingQueue 实现例子?

> **B.4 Java 进阶 - Java 并发之 J.U.C 框架【4/5】：线程池**：再者分析 JUC 中非常常用的线程池等。

- [JUC 线程池: FutureTask]()

  - FutureTask用来解决什么问题的? 为什么会出现?

  - FutureTask类结构关系怎么样的?

  - FutureTask的线程安全是由什么保证的?

  - FutureTask结果返回机制?

  - FutureTask内部运行状态的转变?

  - FutureTask通常会怎么用? 举例说明。

- [JUC 线程池: ThreadPoolExecutor]()

  - 为什么要有线程池?

  - Java是实现和管理线程池有哪些方式?  请简单举例如何使用。

  - 为什么很多公司不允许使用 Executors 去创建线程池? 那么推荐怎么使用呢?

  - ThreadPoolExecutor 有哪些核心的配置参数? 请简要说明

  - ThreadPoolExecutor 可以创建哪是哪三种线程池呢?

  - 当队列满了并且 worker 的数量达到 maxSize 的时候，会怎么样?

  - 说说 ThreadPoolExecutor 有哪些 RejectedExecutionHandler 策略? 默认是什么策略?

  - 简要说下线程池的任务执行机制? execute –> addWorker –>runworker (getTask)

  - 线程池中任务是如何提交的?

  - 线程池中任务是如何关闭的?

  - 在配置线程池的时候需要考虑哪些配置因素?

  - 如何监控线程池的状态?

- [JUC 线程池: ScheduledThreadPool]()

  - ScheduledThreadPoolExecutor 要解决什么样的问题?

  - ScheduledThreadPoolExecutor 相比 ThreadPoolExecutor 有哪些特性?

  - ScheduledThreadPoolExecutor 有什么样的数据结构，核心内部类和抽象类?

  - ScheduledThreadPoolExecutor 有哪两个关闭策略? 区别是什么?

  - ScheduledThreadPoolExecutor 中 scheduleAtFixedRate 和 scheduleWithFixedDelay 区别是什么?

  - 为什么 ThreadPoolExecutor 的调整策略却不适用于 ScheduledThreadPoolExecutor?

  - Executors 提供了几种方法来构造 ScheduledThreadPoolExecutor?

- [JUC 线程池: Fork/Join 框架]()

  - Fork/Join 主要用来解决什么样的问题?

  - Fork/Join 框架是在哪个 JDK 版本中引入的?

  - Fork/Join 框架主要包含哪三个模块? 模块之间的关系是怎么样的?

  - ForkJoinPool 类继承关系?

  - ForkJoinTask 抽象类继承关系? 在实际运用中，我们一般都会继承 RecursiveTask 、RecursiveAction 或 CountedCompleter 来实现我们的业务需求，而不会直接继承 ForkJoinTask 类。

  - 整个 Fork/Join 框架的执行流程/运行机制是怎么样的?

  - 具体阐述 Fork/Join 的分治思想和 work-stealing 实现方式?

  - 有哪些 JDK 源码中使用了 Fork/Join 思想?

  - 如何使用 Executors 工具类创建 ForkJoinPool?

  - 写一个例子: 用 ForkJoin 方式实现 1+2+3+...+100000?

  - Fork/Join 在使用时有哪些注意事项? 结合 JDK 中的斐波那契数列实例具体说明。

> **B.5 Java 进阶 - Java 并发之 J.U.C 框架【5/5】：工具类**：最后来看下 JUC 中有哪些工具类，以及线程隔离术 ThreadLocal。

- [JUC 工具类: CountDownLatch]()

  - 什么是 CountDownLatch?

  - CountDownLatch 底层实现原理?

  - CountDownLatch 一次可以唤醒几个任务? 多个

  - CountDownLatch 有哪些主要方法? await()，countDown()

  - CountDownLatch 适用于什么场景?

  - 写道题：实现一个容器，提供两个方法，add，size 写两个线程，线程 1 添加 10 个元素到容器中，线程 2 实现监控元素的个数，当个数到 5 个时，线程 2 给出提示并结束? 使用 CountDownLatch 代替 wait notify 好处。

- [JUC 工具类: CyclicBarrier]()

  - 什么是 CyclicBarrier?

  - CyclicBarrier 底层实现原理?

  - CountDownLatch 和 CyclicBarrier 对比?

  - CyclicBarrier 的核心函数有哪些?

  - CyclicBarrier 适用于什么场景?

- [JUC 工具类: Semaphore]()

  - 什么是 Semaphore?

  - Semaphore 内部原理?

  - Semaphore 常用方法有哪些? 如何实现线程同步和互斥的?

  - Semaphore 适合用在什么场景?

  - 单独使用 Semaphore 是不会使用到 AQS 的条件队列?

  - Semaphore 中申请令牌(acquire)、释放令牌(release)的实现?

  - Semaphore 初始化有 10 个令牌，11 个线程同时各调用 1 次 acquire 方法，会发生什么?

  - Semaphore 初始化有 10 个令牌，一个线程重复调用 11 次 acquire 方法，会发生什么?

  - Semaphore 初始化有 1 个令牌，1 个线程调用一次 acquire 方法，然后调用两次 release 方法，之后另外一个线程调用 acquire(2) 方法，此线程能够获取到足够的令牌并继续运行吗?

  - Semaphore 初始化有 2 个令牌，一个线程调用 1 次 release 方法，然后一次性获取 3 个令牌，会获取到吗?

- [JUC 工具类: Phaser]()

  - Phaser 主要用来解决什么问题?

  - Phaser 与 CyclicBarrier 和 CountDownLatch 的区别是什么?

  - 如果用 CountDownLatch 来实现 Phaser 的功能应该怎么实现?

  - Phaser 运行机制是什么样的?

  - 给一个 Phaser 使用的示例?

- [JUC 工具类: Exchanger]()

  - Exchanger 主要解决什么问题?

  - 对比 SynchronousQueue，为什么说 Exchanger 可被视为 SynchronousQueue 的双向形式?

  - Exchanger 在不同的 JDK 版本中实现有什么差别?

  - Exchanger 实现机制?

  - Exchanger 已经有了 slot 单节点，为什么会加入 arena node 数组? 什么时候会用到数组?

  - arena 可以确保不同的 slot 在 arena 中是不会相冲突的，那么是怎么保证的呢?

  - 什么是伪共享，Exchanger 中如何体现的?

  - Exchanger 实现举例

- [Java 并发 - ThreadLocal]()

  - 什么是ThreadLocal? 用来解决什么问题的?

  - 说说你对ThreadLocal的理解

  - ThreadLocal是如何实现线程隔离的?

  - 为什么ThreadLocal会造成内存泄露? 如何解决

  - 还有哪些使用ThreadLocal的应用场景?

> **C. Java 进阶 - Java 并发之本质与模式**：最后站在更高的角度看其本质(协作，分工和互斥)，同时总结上述知识点所使用的模式。

- Java 并发 - 并发的本质：协作、分工和互斥
- Java 并发 - 并发的模式梳理

## 参考文档

- 官方文档 https://docs.oracle.com/javase/specs/jls/se7/html/jls-17.html

- 并发官方教程 https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html

- Doug Lea 并发编程文章全部译文 http://ifeve.com/doug-lea/

- Java 并发知识点总结 https://github.com/CL0610/Java-concurrency

- 线程与多线程必知必会(基础篇) https://zhuanlan.zhihu.com/p/33616143

