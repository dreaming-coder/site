# MySQL - 索引

> **索引** (index) 是帮助 MySQL 高效获取数据的**数据结构(有序)**。在数据之外，数据库系统还维护着满足特定查找算法的数据结构，这些数据结构以某种方式引用 (指向) 数据，这样就可以在这些数据结构上实现高级查找算法，这种数据结构就是索引。

## 1. 索引的优势和劣势

- 优点

  提高数据检索效率，降低数据库的 IO 成本

  通过索引列对数据进行排序，降低数据的排序成本，降低了 CPU 的消耗

- 缺点

  实际上索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录，所以索引列也是要占用空间的

  虽然提高了查询速度，但是降低更新表的速度

## 2. 索引结构

MySQL 的索引是在存储引擎层实现的，不同的存储引擎有不同的结构，主要包含以下几种：

|       索引结构       |                           **描述**                           |
| :------------------: | :----------------------------------------------------------: |
|   **B+ Tree 索引**   |       **最常见的索引类型，大部分引擎都支持 B+ 树索引**       |
|      Hash 索引       | 底层数据结构是用哈希表实现的，只有精确匹配索引列的查询才有效不支持范围查询 |
|  R-Tree (空间索引)   | 空间索引是 MyISAM 引擎的一个特殊索引类型，主要用于地理空间数据类型，通常使用较少 |
| Full-Text (全文索引) | 是一种通过建立倒排索引，快速匹配文档的方式，类似于 Lucene，Solr，ES |

## 3. 索引分类

|   分类   |                         含义                         |            特点            |  关键字  |
| :------: | :--------------------------------------------------: | :------------------------: | :------: |
| 主键索引 |               针对于表中主键创建的索引               | 默认自动创建，只能用有一个 | PRIMARY  |
| 唯一索引 |           避免同一个表中某数据列中的值重复           |         可以有多个         |  UNIQUE  |
| 常规索引 |                   快速定位特定数据                   |         可以有多个         |          |
| 全文索引 | 全文索引查找的是文本中的关键词，而不是比较索引中的值 |         可以有多个         | FULLTEXT |

在 InnoDB 存储引擎中，根据索引的存储形式，又可以分为以下两种：

|            分类            |                            含义                            |         特点         |
| :------------------------: | :--------------------------------------------------------: | :------------------: |
| 聚集索引 (Clustered Index) | 将数据存储与索引放到了一块，索引结构的叶子结点保存了行数据 | 必须有，而且只有一个 |
| 二级索引 (Secondary Index) | 将数据与索引分开存储，索引结构的叶子结点关联的是对应的主键 |     可以存在多个     |

:::tip 聚集索引选取规则

- 如果存在主键，主键索引就是聚集索引。
- 如果不存在主键，将使用第一个唯一 (UNIQUE) 索引作为聚集索引。
- 如果表没有主键，或没有合适的唯一索引， 则 InnoDB 会自动生成一个 rowid 作为隐藏的聚集索引。

:::

## 4. 索引语法

- 创建索引

  ```sql
  CREATE [UNIQUE|FULLTEXT] INDEX index_name ON table_name(columnName_list);
  
  ALTER TABLE table_name ADD [UNIQUE|FULLTEXT] INDEX [index_name] ON (columnName_list);
  ```

- 查看索引

  ```sql
  SHOW INDEX FROM table_name;
  ```

- 修改索引

  - 添加一个主键，索引值必须唯一且不为 NULL

    ```sql
    ALTER TABLE table_name ADD PRIMARY KEY(columnName_list);
    ```

  - 创建唯一索引（除了 NULL，并且 NULL 可能出现多次)

    ```sql
    ALTER TABLE table_name ADD UNIQUE [index_name] ON (columnName_list);
    ```

  - 添加普通索引，索引值可重复

    ```sql
    ALTER TABLE table_name ADD INDEX [index_name] ON (columnName_list);
    ```

  - 全文索引

    ```sql
    ALTER TABLE table_name ADD FULLTEXT [index_name] ON (columnName_list);
    ```

- 删除索引

  ```sql
  DEOP INDEX index_name ON table_name;
  ```

## 5. SQL 性能分析

### 5.1 SQL 执行频率

可以通过如下命令，查看当前数据库的 INSERT、UPDATE、DELETE、SELECT 的访问你频次：

```sql
SHOW [GLOBAL|SESSION] STATUS LIKE 'Com_______'; -- 7个下划线
```

### 5.2 慢查询日志

慢查询日志记录了所有执行时间超过指定参数 (long_ query_ _time，单位：秒，默认 10 秒) 的所有 SQL 语句的日志。

MySQL 的慢查询日志默认没有开启，需要在 MySQL 的配置文件( /etc/my.cnf ) 中配置如下信息：

```ini
# 开启MySQL慢查询日志开关
slow_query_log=1
# 设置慢日志时间为2秒，SQL语句执行时间超过2秒，就会视为慢查询，记录慢查询日志
long_query_time=2
```

> 修改完要重启 MySQL 服务。

可以通过下面你与去查看是否修改成功：

```sql
SHOW VARIABLES LIKE 'slow_query_%'; -- 此命令也可以查看慢查询日志存储地址，用于查看分析哪些SQL执行比较慢
SHOW VARIABLES LIKE 'long_query_time';
```

### 5.3 Show Profiles

show profiles 能够在做 SQL 优化时帮助我们了解时间都耗费到哪里去了。通过 have_profiling 参数，能够看到当前 MySQL 是否支持 profile 操作：

```sql
SELECT @@have_profiling; -- YES 表示支持，NO 表示不支持
```

默认 profiling 是关闭的，可以通过 set 语句开启 profiling：

```sql
SET [SESSION|GLOBAL] profiling = 1; -- 0 表示关闭
```

> 可以通过 `SELECT @@profiling;` 查询是否开启。

执行一系列的业务 SQL 的操作，然后通过如下指令查看指令的执行耗时：

```sql
-- 查看每一条 SQL 的耗时基本情况
SHOW PROFILES;

-- 查看指定 query_id 的 SQL 语句各个阶段的耗时情况
SHOW PROFILE FOR QUERY query_id;

-- 查看指定 query_id 的 SQL 语句 CPU 的使用情况
SHOW PROFILE CPU FOR QUERY query_id;
```

:::warning

SHOW PROFILES is deprecated and will be removed in a future release. Please use Performance Schema instead.

:::

### 5.4 Explain

EXPLAIN 或者 DESC 命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

```sql
-- 直接在 select 语句之前加上关键字 explain/desc
EXPLAIN SELECT 字段列表 FROM 表名 ...;
```

结果如图所示：

![](/imgs/database/mysql/mysql-index-1.png)

我们可以根据该结果得到如下信息：

- [x] 表的读取顺序

- [x] 数据读取操作的操作类型

- [x] 哪些索引可以使用

- [x] 哪些索引被实际使用

- [x] 每张表有多少行被优化器查询

**Explain 执行计划各字段含义**：

:::tabs

@tab id

id 表示 select 查询的序列号，包含一组数字，表示查询中执行 select 子句或操作表的顺序，有两种情况：

- id 相同，执行顺序由上至下
- id 不同，如果是子查询，id 的序号会递增，id 值越大，优先级越高，越先被执行

@tab select_type

select_type 表示 select 语句的查询类型，常用值有：

- **SIMPLE**：简单的 select 查询，查询中不包含子查询或者 UNION
- **PRIMARY**：查询中若包含任何复杂的子部分，最外层查询则被标记为 PRIMARY
- **SUBQUERY**：在 select 或 where 列表中包含了子查询
- **DERIVED**：在 from 列表中包含的子查询被标记为 DERIVED（衍生），MySQL 会递归执行这些子查询，把结果放在临时表里
- **UNION**：若第二个 select 出现在 UNION 之后，则被标记为 UNION，若 UNION 包含在 FROM 子句的子查询中，外层 SELECT 将被标记为 DERIVED
- **UNION RESULT**：从 UNION 表获取结果的 select

> 查询的类型主要是用于区别普通查询、联合查询、子查询等复杂查询。

@tab table

- 显示这一行的数据是关于哪张表的

@tab type

表示连接类型，性能由好到差的连接类型为 NULL、system、const、eq_ref、 ref、 range、index、all 。

> 一般来说，至少达到`range`或`ref`级别，最好达到`ref`。

- **NULL**：查询不涉及任何表，比如 `select 1;`
- **system**：表只有一行记录（等于系统表），这是 const 类型的特例，平时不会出现，可以忽略不计
- **const**：表示通过索引一次就找到了，const 用于比较 primary key 或者 unique 索引，因为只匹配一行数据，所以很快将主键置于 where 列表中，MySQL 就能将该查询转换为一个常量
- **eq_ref**：唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配，常见于主键或唯一索引扫描
- **ref**：非唯一性索引扫描，返回匹配某个单独值的所有行，本质上也是一种索引访问，它返回所有匹配某个单独值的行，然而，它可能会找到多个符合条件的行，所以他应该属于查找和扫描的混合体
- **range**：只检索给定范围的行，使用一个索引来选择行。key 列显示使用了哪个索引，一般就是在你的 where 语句中出现了 `between`、`<`、`>`、`in` 等的查询，这种范围扫描索引比全表扫描要好，因为它只需要开始于索引的某一点，而结束于另一点，不用扫描全部索引
- **index**：full index scan，index 与 ALL 的区别为 index 类型只遍历索引树。这通常比 ALL 快，因为索引文件通常比数据文件小
- **all**：全表扫描

@tab possible_keys

显示可能应用在这张表中的索引，一个或多个

> 查询涉及到的字段上若存在索引，则该索引将被列出，**但不一定被查询实际使用**。

@tab key

实际使用的索引，如果为 NULL，则没有使用索引。

查询中若使用了覆盖索引，则该索引仅出现在 key 列表中。

> 查询的字段及顺序和你建立的索引刚好符合，这就是覆盖索引，MySQL 将直接从索引上扫描。

@tab key_len

表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度。在不损失精度的前提下，长度越短越好。

key_len 显示的值为索引字段的最大可能长度，**并非实际使用长度**{.red}，即 key_len 是根据表定义计算而得，不是通过表内检索出的。

@tab ref

显示索引的哪一列被使用了，有时候会是一个常量：表示哪些列或常量被用于用于查找索引列上的值。

@tab rows

根据表统计信息及索引选用情况，大致估算出找到所需的记录所需要读取的行数。

@tab filtered

表示返回结果的行数占需读取行数的百分比，filtered 的值越大越好。

@tab Extra

包含不适合在其他列中显示但十分重要的额外信息，下面只列出最主要的 3 种：

- **Using filesort**：九死一生。说明 MySQL 会对数据使用一个外部的索引排序，而不是按照表内的索引顺序进行读取。MySQL中无法利用索引完成的排序操作称为“文件排序”。
- **Using temporary**：十死无生。使用了临时表保存中间结果，MySQL 在对查询结果排序时使用临时表。常见于排序 order by 和分组查询  group by。
- **Using index**：发了。表示相应的 select 操作使用了覆盖索引，避免访问了表的数据行，效率不错！如果同时出现 Using where，表明索引被用来执行索引键值的查找，如果没有同时出现 Using where，表明索引用来读取数据而非执行查找动作。

:::

## 6. 索引使用原则

- **最左前缀法则**

  如果索引了多列 (联合索引)，要遵守最左前缀法则。最左前缀法则指的是查询从索引的最左列开始，并且不跳过索引中的列。

  > 如果跳跃某一列，**索引将部分失效 (后面的字段索引失效)**{.red}。

  > 对于 ref 及以上级别，查询的索引中的列的顺序无所谓，因为 MySQL 会优化查询语句。

- **范围查询**

  联合索弓|中，出现范围查询 (>，<)，范围查询右侧的列索引失效。

- **索引列运算**

  不要在索引列上进行运算操作，否则**索引将失效**{.red}。

- **字符串不加单引号**

  字符串类型字段使用时，不加引号，**索引将失效**{.red}。

- **模糊查询**

  如果仅仅是尾部模糊匹配，**索引不会失效**。如果是头部模糊匹配，**索引失效**{.red}。

- **or 连接的条件**

  用 or 分割开的条件，如果 or 前的条件中的列有索引，而后面的列中没有索引，那么涉及的索引都不会被用到。

- **数据分布影响**

  如果 MySQL 评估使用索引比全表更慢，则不使用索引。

- **SQL 提示**{.green}

  SQL 提示，是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的。

  - **use index**

    ```sql
    EXPLAIN SELECT * FROM tb_user USE INDEX(idx_user_pro) where profession = '软件工程';
    ```

  - **ignore index**

    ```sql
    EXPLAIN SELECT * FROM tb_user IGNORE INDEX(idx_user_pro) where profession = '软件工程';
    ```

  - **force index**

    ```sql
    EXPLAIN SELECT * FROM tb_user FORCE INDEX(idx_user_pro) where profession = '软件工程';
    ```

- **覆盖索引**{.green}

  尽量使用覆盖索引 (查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到)，减少 select * 。

- **前缀索引**

  当字段类型为字符串 (varchar，text 等) 时，有时候需要索引很长的字符串，这会让索引变得很大，查询时，浪费大量的磁盘 lO，影响查询效率。此时可以只将字符串的一部分前缀，建立索引，这样可以大大节约索引空间，从而提高索引效率。

  ```sql
  CREATE INDEX idx_name ON tb_name(column_name(n)); -- n表示用前n个字符建索引
  ```

## 7. 索引设计原则

1. 针对于数据量较大，且查询比较频繁的表建立索引。{.design-item}
2. 针对于常作为查询条件 (where) 、 排序 (order by)、 分组 (group by) 操作的字段建立索引。{.design-item}
3. 尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。{.design-item}
4. 如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。{.design-item}
5. 尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表,提高查询效率。{.design-item}
6. 要控制索引的数量，索引并不是多多益善，索引越多,惟护索引结构的代价也就越大，会影响增删改的效率。{.design-item}
7. 如果索引列不能存储 NULL 值，请在创建表时使用 NOT NULL 约束它。当优化器知道每列是否包含 NULL 值时，它可以更好地确定哪个索引最有效地用于查询。{.design-item}

