# MySQL - SQL 优化

## 1. insert 优化

- 批量插入

  > 减少单条数据插入的频繁的数据库连接

- 手动事务提交

  > 减少多次事务的提交

- 主键顺序插入

  > 主键顺序插入性能高于乱序插入

- 大批量插入数据

  如果一次性需要插入大批量数据，使用 insert 语句插入性能较低，此时可以使用 MySQL 数据库提供的 load 指令进行插入。

  ```shell
  # 客户端连接服务器时，加上参数 --local-infile
  mysql --local-infile -u root -p
  ```

  然后，

  ```sql
  # 设置全局参数local_infile为1，开启从本地加载文件导入数据的开关
  SET GLOBAL local_infile = 1;
  
  # 执行load指令将准备好的数据，加载到表结构中
  LOAD DATA LOCAL INFILE '文件地址' INTO TABLE 'tb_name' FIELDS TERMINATED BY '属性分隔符' LINES TERMINATED BY '记录分隔符';
  ```

## 2. 主键优化

> 首先要了解**页分裂**和**页合并**的概念。

**主键设计原则**：

- 满足业务需求的情况下，尽量降低主键的长度。{.design-item}
- 插入数据时，尽量选择顺序插入，选择使用 AUTO__INCREMENT 自增主键。(否则可能经常导致页分裂){.design-item}
- 尽量不要使用 UUID 做主键或者是其他自然主键，如身份证号。{.design-item}
- 业务操作时，避免对主键的修改。{.design-item}

## 3. limit 优化

一个常见又非常头疼的问题就是 `limit 2000000,10` ，此时需要 MySQL 排序前 2000010 记录，仅仅返回 2000000 - 2000010 的记录，其他记录丢弃，查询排序的代价非常大。

优化思路：一般分页查询时，通过创建覆盖索引能够比较好地提高性能，可以通过覆盖索引加子查询形式进行优化。

```sql
explain select * from tb_ sku t，(select id from tb_ sku order by id limit 200000,10) a wheret.id = a.id;
```

## 4. count 优化

- MyISAM 引擎把一 个表的总行数存在了磁盘上，因此执行 count(*) 的时候会直接返回这个数，效率很高，但是不能带 where
- InnoDB 引擎就麻烦了，它执行 count(*) 的时候，需要把数据一行一行地从引擎里面读出来,然后累积计数。

优化思路：自己计数，借助第三方如 Redis 来记录

## 5. update 优化

InnoDB 的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁。

