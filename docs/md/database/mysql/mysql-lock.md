# MySQL - 锁

锁是计算机协调多个进程或线程并发访问某一资源的机制。 在数据库中，除传统的计算资源 (CPU、RAM、I/0) 的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

MySQL 中的锁，按照锁的粒度分，分为以下三类：

- 全局锁：锁定数据库中的所有表
- 表级锁：每次操作锁住整张表
- 行级锁：每次操作锁住对应的行数据

## 1. 全局锁

全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的 DML 的写语句，DDL 语句，已经更新操作的事务提交语句都将被阻塞。

其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。

![](/imgs/database/mysql/mysql-lock-1.png =70%x)

## 2. 表级锁

表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在 MyISAM、 InnoDB、BDB 等存储引擎中。

对于表级锁，主要分为以下三类：

- 表锁
- 元数据锁 (Meat Data Lock，MDL)
- 意向锁

### 2.1 表锁

对于表锁，分为两类：

- 表共享读锁（read lock）
- 表独占写锁（write lock）

```sql
--加锁
LOCK TABLES 表名... READ|WRITE;

--释放锁
UNLOCK TABLES; --或者客户端断开连接
```

![](/imgs/database/mysql/mysql-lock-2.png =70%x)

### 2.2 元数据锁 

MDL 加锁过程是系统自动控制，无需显式使用，在访问一张表的时候会自动加上。MDL 锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。**为了避免 DML 与 DDL 冲突，保证读写的正确性**{.red}。

在 MySQL 5.5 中引入了 MDL，当对一张表进行增删改查的时候，加 MDL 读锁(共享)；当对表结构进行变更操作的时候；加 MDL 写锁(排他)。

![](/imgs/database/mysql/mysql-lock-3.png )

> 查看元数据锁：
>
> ```sql:no-line-numbers
> SELECT object_type, object_schema, object_name,lock_type,lock_duration from performance_schema.metadata_locks;
> ```

### 2.3 意向锁

为了避免 DML 在执行时，加的行锁与表锁的冲突，在 InnoDB 中引入了 意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

- 意向共享锁 (IS)：由语句 select ... lock in share mode 添加。与表锁共享锁 (read) 兼容，与表锁排它锁 (write) 互斥。
- 意向排他锁 (IX)：由 insert、 update、delete、 select ... for update 添加。与表锁共享锁 (read) 及排它锁 (write) 都互斥。意向锁之间不会互斥。

> 查看意向锁及行锁的枷锁情况：
>
> ```sql:no-line-numbers
> SELECT object_schema, object_name, index_name, lock_type, lock_mode, lock_data from performance_schema.data_locks;
> ```

## 3. 行级锁

行级锁，每次操作锁住对应的行数据。锁定粒度最小，发生锁冲突的概率最低，并发度最高。应用在 InnoDB 存储引擎中。

InnoDB 的数据是基于索引组织的，行锁是通过对索引上的索引项加锁来实现的，而不是对记录加的锁。对于行级锁，主要分为以下三类：

- 行锁 (Record Lock)：锁定单个行记录的锁，防止其他事务对此行进行 update 和 delete。在 RC、RR 隔离级别下都支持。
- 间隙锁 (Gap Lock) ：锁定索引记录间隙 (不含该记录)，确保索引记录间隙不变，防止其他事务在这个间隙进行 insert，产生幻读。在 RR 隔离级别下都支持。
- 临键锁 (Next-Key Lock)：行锁和间隙锁组合，同时锁住数据，并锁住数据前面的间隙 Gap。在 RR 隔离级别下支持。

### 3.1 行锁

InnoDB 实现了以下两种类型的行锁：

- 共享锁 (S)：允许一个事务去读一行，阻止其他事务获得相同数据集的排它锁。
- 排它锁 (X)：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他锁。

![](/imgs/database/mysql/mysql-lock-4.png =50%x)

![](/imgs/database/mysql/mysql-lock-5.png =80%x)

默认情况下，InnoDB 在 REPEATABLE READ 事务隔离级别运行，InnoDB 使用 next-key 锁进行搜索和索引扫描，以防止幻读。

1. 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁。
2. InnoDB 的行锁是针对于索引加的锁，不通过索引条件检索数据，那么 InnoDB 将对表中的所有记录加锁，此时就会**升级为表锁**{.red}。

### 3.2 间隙锁和临键锁

同样需要注意的，默认情况下，InnoDB 在 REPEATABLE READ 事务隔离级别运行，InnoDB 使用 next-key 锁进行搜索和索引扫描，以防止幻读。

1. 索引上的等值查询 (唯一索引)，给不存在的记录加锁时，优化为间隙锁。
2. 索引上的等值查询 (普通索引)，向右遍历时最后一个值不满足查询需求时，next-key lock 退化为间隙锁。
3. 索引上的范围查询 (唯一索引)，会访问到不满足条件的第一个值为止。

> 注意：间隙锁唯一目的是防止其他事务插入间隙。间隙锁可以共存，一个事务采用的间隙锁不会阻止另一个事务在同一间隙上采用间隙锁。