# MySQL - SQL 基础

::: tip SQL 通用语法

1. SQL 语句可以单行或多行书写，以分号结尾
2. SQL 语句可以使用空格或缩进来增强语句的可读性
3. MySQL 数据库的 SQL 语句不区分大小写，关键字建议使用大写
4. 注释：
   - 单行注释：`--注释内容` 或 `#注释内容`(MySQL 特有)
   - 多行注释：`/* 注释内容 */`
   :::

## 1. DDL

### 1.1 数据库操作

- 创建数据库

  ```sql:no-line-numbers
  CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集] [COLLATE 排序规则];
  ```
  > 数据库名直接写，不需要引号。

- 删除数据库

  ```sql:no-line-numbers
  DROP DATABASE [IF EXISTS] 数据库名;
  ```

- 使用数据库

  ```sql:no-line-numbers
  USE 数据库名;
  ```


- 查询

  - 查询所有数据库

    ```sql:no-line-numbers
    SHOW DATABASES;
    ```

  - 查询当前数据库

    ```sql:no-line-numbers
    SELECT DATABASE();
    ```

### 1.2 表操作

- 创建表

  ```sql
  CREATE TABLE 表名 (
  	字段1 字段1类型 [COMMENT 字段1注释],
      字段2 字段2类型 [COMMENT 字段2注释],
      字段3 字段3类型 [COMMENT 字段3注释],
      ...
      字段n 字段n类型 [COMMENT 字段n注释]
  ) COMMENT 表注释;
  ```


- 修改

  
  - 添加字段
  
    ```sql:no-line-numbers
    ALTER TABLE 表名 ADD 字段名 类型(长度) [COMMENT 注释] [约束];
    ```
  
  - 修改字段数据类型
  
    ```sql:no-line-numbers
    ALTER TABLE 表名 MODIFY 字段名 新数据类型(长度);
    ```
  
  - 修改字段名和数据类型
  
    ```sql:no-line-numbers
    ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型(长度) [COMMENT 注释] [约束];
    ```
  
  - 修改表名
  
    ```sql:no-line-numbers
    ALTER TABLE 表名 RENAME TO 新表名;
    ```
  
- 删除

  
  - 删除表
  
    ```sql:no-line-numbers
    DROP TABLE [IF EXISTS] 表名;
    ```
  
  - 删除指定表，并重新创建该表
  
    ```sql:no-line-numbers
    TRUNCATE TABLE 表名;
    ```
  
    > `TRUNCATE TABLE` 可以清空表，也就是删除所有行。
  
    ::: warning
  
    使用更新和删除操作时一定要用 `WHERE` 子句，不然会把整张表的数据都破坏。可以先用 `SELECT` 语句进行测试，防止错误删除。
    :::
  
    > `TRUNCATE` 比 `DELETE` 速度快，因为 `DELETE` 是一条条删除记录。
  
  - 删除字段
  
    ```sql:no-line-numbers
    ALTER TABLE 表名 DROP 字段名;
    ```
  
- 查询

  - 查询当前数据库所有表

    ```sql:no-line-numbers
    SHOW TABLES;
    ```

  - 查询表结构

    ```sql:no-line-numbers
    DESC 表名;
    ```

  - 查询指定表的建表语句

    ```sql:no-line-numbers
    SHOW CREATE TABLE 表名;
    ```

## 2. DML

### 2.1 添加记录

- 给指定字段添加数据

  ```sql:no-line-numbers
  INSERT INTO 表名(字段名1, 字段名2, ...) VALUES (值1, 值2, ...);
  ```

- 给全部字段添加数据

  ```sql:no-line-numbers
  INSERT INTO 表名 VALUES (值1, 值2, ...);
  ```

- 批量添加数据

  ```sql:no-line-numbers
  INSERT INTO 表名(字段名1, 字段名2, ...) VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);
  ```

  ```sql:no-line-numbers
  INSERT INTO 表名 VALUES (值1, 值2, ...), (值1, 值2, ...), (值1, 值2, ...);
  ```

>- 插入数据时，字段与值的位置是一一对应的。
>- 字符串与日期型数据应该包含在引号中。
>- 插入的数据大小，应该在字段的规定范围内。

### 2.2 修改记录

```sql:no-line-numbers
UPDATE 表名 SET 字段1=值1, 字段2=值2, ... [WHERE 条件];
```

### 2.3 删除记录

```sql:no-line-numbers
DELETE FROM 表名 [WHERE 条件];
```

## 3.DQL<Badge type="tip" text="重要" vertical="top" />

实际项目中用的最多的就是查询语句，其语法如下所示：

```sql
SELECT 
	字段列表
FROM
	表名列表
WHERE
	条件列表
GROUP BY
	分组字段列表
HAVING
	分组后条件列表
ORDER BY
	排序字段列表
LIMIT
	分页参数
```

下面针对子语句分别说明

### 3.1 基础查询

- 查询多个字段

  ```sql
  SELECT 字段1, 字段2, ... FROM 表名;
  SELECT * FROM 表名; # 查询所有字段
  ```

- 对查询返回的字段设置别名

  ```sql:no-line-numbers
  SELECT 字段1 [AS 别名1], 字段2 [AS 别名2], ... FROM 表名;
  ```

- 取出重复记录

   ```sql:no-line-numbers
   SELECT DISTINCT 字段列表 FROM 表名;
   ```

### 3.2 条件查询

```sql:no-line-numbers
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```

可以使用以下条件：

<MySQL-Condition></MySQL-Condition>

:::tip 模糊匹配规则

- `_` 匹配单个字符，`%` 匹配任意个字符
- `[ ]` 可以匹配集合内的字符，例如 `[ab]` 将匹配字符 `a` 或者 `b`。

- 用脱字符 `^` 可以对其进行否定，也就是不匹配集合内的字符。

:::

### 3.3 聚合函数

将一列数据作为一个整体，进行纵向计算。

- `count`：统计数量
- `max`：最大值
- `min`：最小值
- `avg`：平均值
- `sum`：求和

语法：

```sql:no-line-numbers
SELECT 聚合函数(字段) FROM 表名;
```

> `NULL` 值不参与所有聚合函数的运算。

### 3.4 分组查询

```sql:no-line-numbers
SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后过滤条件];
```

:::tip  where 和 having 的区别

- 执行时机不同：`where` 是分组之前进行过滤，不满足 `where` 条件，不参与分组；而 `having` 是分组之后对结果进行过滤。
- 判断条件不同：`where` 部门不能对聚合函数进行判断，而 `having` 可以。

:::

:::danger

分组之后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义。

:::

### 3.5 排序查询

```sql:no-line-numbers
SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1, 字段2 排序方式2;
```

> - `ASC`：升序(默认值)
> - `DESC`：降序

### 3.6 分页查询

```sql:no-line-numbers
SELECT 字段列表 FROM 表名 LIMIT 起始索引, 查询记录数;
```

> - 其实索引从 $0$ 开始，起始索引 = (查询页码 - 1) $\times$ 每页显示的记录数。
> - `LIMIT` 是 MySQL 的分页实现，其他数据库不一定。
> - 如果查询的是第一页数据，起始索引可以省略，直接简写为 `LIMIT 10`。

## 4. DCL

### 4.1 用户管理

- 创建用户

  ```sql:no-line-numbers
  CREATE USER '用户名'@'主机名' IDENTIFIED BY `密码`;
  ```

  > 主机名指你在哪个主机上访问数据库。

  > @ 两侧不能有空格。

  > 主机名可以使用 `%` 匹配任何主机。

- 查询用户

  ```sql
  USE mysql;
  SELECT * FROM user;
  ```

- 修改用户密码

  ```sql:no-line-numbers
  ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY `新密码`;
  ```

  > `mysql_native_password` 也可以是其他的身份验证方式，这个要根据实际情况是哪种类型。

- 删除用户

  ```sql:no-line-numbers
  DROP USER '用户名'@'主机名';
  ```

### 4.2 权限控制

MySQL 中定义了很多种权限，但是常用的也就是以下几种：

|        权限         |        说明        |
| :-----------------: | :----------------: |
| ALL，ALL PRIVILEGES |      所有权限      |
|       SELECT        |      查询数据      |
|       INSERT        |      插入数据      |
|       UPDATE        |      修改数据      |
|       DELETE        |      删除数据      |
|        ALTER        |       修改表       |
|        DROP         | 删除数据库/表/视图 |
|       CREATE        |   创建数据库/表    |

权限控制的语法主要有以下三类;

- 授予权限

  ```sql:no-line-numbers
  GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
  ```

- 查询权限

  ```sql:no-line-numbers
  SHOW GRANTS FOR '用户名'@'主机名';
  ```

- 撤销权限

  ```sql:no-line-numbers
  REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
  ```

> 数据库名和表名可以用 `*` 匹配所有。

## 5. 函数

### 5.1 字符串函数

MySQL 中内置了很多字符串函数，常用的几个如下：

|             函数             |                             功能                             |
| :--------------------------: | :----------------------------------------------------------: |
|  `CONCAT(s1, s2, ..., sn)`   |                          字符串拼接                          |
|         `LOWER(str)`         |                            转小写                            |
|         `UPPER(str)`         |                            转大写                            |
|     `LPAD(str, n, pad)`      | 左填充，用字符串 pad 对 str 的左边进行填充，达到 n 个字符串长度 |
|     `RPAD(str, n, pad)`      | 右填充，用字符串 pad 对 str 的右边进行填充，达到 n 个字符串长度 |
|         `TRIM(str)`          |                  去掉字符串头部和尾部的空格                  |
| `SUBSTRING(str, start, len)` |    返回从字符串 str 从 start 位置起的 len 个长度的字符串     |
|      `CHAR_LENGTH(str)`      |                      返回字符串字符个数                      |
|        `LENGTH(str)`         |                       返回字符串字节数                       |
|        `REVERSE(str)`        |                          字符串逆序                          |

### 5.2 数值函数

常用的数值函数如下：

|                             函数                             |                   功能                   |
| :----------------------------------------------------------: | :--------------------------------------: |
|                          `CEIL(x)`                           |                 向上取整                 |
|                          `FLOOR(x)`                          |                 向下取整                 |
|                         `MOD(X, Y)`                          |             返回 x / y 的模              |
|                           `RAND()`                           |          返回 0~1 之间的随机数           |
|                        `ROUND(x, y)`                         | 求参数 x 的四舍五入后的值，保留 y 位小数 |
|                           `ABS(x)`                           |                 求绝对值                 |
|                            `PI()`                            |        圆周率，默认小数点后 6 位         |
|                          `SQRT(x)`                           |                  平方根                  |
|                          `SIGN(x)`                           |                 符号函数                 |
|                         `POW(x, y)`                          |               幂运算，x^y^               |
|                           `LOG(x)`                           |            对数函数，$\ln x$             |
|                          `LOG10(x)`                          |            对数函数，$\lg x$             |
| `SIN(x)`、`ASIN(x)`、`COS(x)`、`ACOS(x)`、`TAN(x)`、`ATAN(x)`、`COT(x)` |                 三角函数                 |

### 5.3 日期函数

常见的日期函数如下：

|                 函数                  |                             功能                             |
| :-----------------------------------: | :----------------------------------------------------------: |
|              `CURDATE()`              |                         返回当前日期                         |
|              `CURTIME()`              |                         返回当前时间                         |
|                `NOW()`                |                       返回当前日期时间                       |
|             `YEAR(date)`              |                     获取指定 date 的年份                     |
|             `MONTH(date)`             |                     获取指定 date 的月份                     |
|              `DAY(date)`              |                获取指定 date 是一个月的第几天                |
| `DATE_ADD(date, INTERVAL exper type)` | 返回一个日期值加上一个时间间隔 expr，时间间隔的单位 type 可以是年月日天等 |
|       `DATEDIFF(date1, date2)`        |        返回起始时间 date1 和结束时间 date2 之间的天数        |

> `DATE_ADD()` 函数有点特别，这里给出一些示例：
>
> ```sql
> SELECT DATE_ADD(NOW(), INTERVAL 70 DAY);
> SELECT DATE_ADD(NOW(), INTERVAL 70 YEAR);
> SELECT DATE_ADD(NOW(), INTERVAL 70 MONTH);
> ```

### 5.4 流程函数

|                             函数                             |                             功能                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                      `IF(value, t, f)`                       |           如果 value 为 true，则返回 t，否则返回 f           |
|                   `IFNULL(value1, value2)`                   |     如果 value1 不为 NULL，返回 value1，否则返回 value2      |
|    `CASE WHEN [val1] THEN [res1] ... ELSE [default] END`     | 如果 val1 为 true，返回 res1， ...， 否则返回 default 默认值 |
| `CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END` | 如果 expr 的值等于 val1，返回 res1， ...，否则返回 default 默认值 |

## 6. 约束

> 约束是作用于表中字段上的规则，用于限制存储在表中的数据，目的是为了保证数据库中数据的正确、有效性和完整性。

|         约束         |                           描述                           |    关键字     |
| :------------------: | :------------------------------------------------------: | :-----------: |
|       非空约束       |               限制该字段的数据不能为 NULL                |  `NOT NULL`   |
|       唯一约束       |          保证该字段的所有数据都是唯一、不重复的          |   `UNIQUE`    |
|       主键约束       |         主键是一行记录的唯一标识，要求非空且唯一         | `PRIMARY KEY` |
|       默认约束       |      保存数据时，如果未指定该字段的值，则采用默认值      |   `DEFAULT`   |
| 检查约束(8.0.16之后) |                 保证字段值满足某一个条件                 |    `CHECK`    |
|       外键约束       | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | `FOREIGN KEY` |

这里强调下最麻烦的外键约束：

- 创建新表时指定

```sql:no-line-numbers
CREATE TABLE 表名 (
	字段名 数据类型,
    ...
    [CONSTRAINT] [外键名称] FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名)
);
```

- 修改表时添加外键

```sql:no-line-numbers
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表名(主表字段名);
```

- 删除外键

```sql:no-line-numbers
ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
```

外键由于关联了至少两张表，在更新或删除数据时需要考虑到数据的完整性与一致性。

外键中的删除和更新行为有如下几种：

 |    行为     |                             说明                             |
 | :---------: | :----------------------------------------------------------: |
 |  NO ACTION  | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与 RESTRICT 一致) |
 |  RESTRICT   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与 NO ACTION 一致) |
 |   CASCADE   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录 |
 |  SET NULL   | 当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为 null (这就要求该外键允许取 null) |
 | SET DEFAULT | 父表有变更时，子表将外键列设置成一个默认的值(Innodb 不支持)  |

我们可以通过下面的语法设置外键更新或删除行为的规则：

```sql
ALTER TABLE 表名 
	ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表名(主表字段名) 
	ON UPDATE 外键行为 
	ON DELETE 外键行为;
```

## 7. 多表查询

### 7.1 内连接

> 内连接是查询 2 张表的交集。

- 隐式内连接

  ```sql:no-line-numbers
  SELECT 字段列表 FROM 表1, 表2 WHERE 条件 ...;
  ```

- 显式内连接

  ```sql:no-line-numbers
  SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件 ...;
  ```

### 7.2 外连接

- 左外连接

  ```sql:no-line-numbers
  SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 连接条件 ...;
  ```

  > 左外连接以左表为主表，包含左表所有数据。

- 右外连接

  ```sql:no-line-numbers
  SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 连接条件 ...;
  ```

  > 右外连接以右表为主表，包含右表所有数据。

### 7.3 自连接

```sql:no-line-numbers
SELECT 字段列表 FROM 表1 别名1 JOIN 表1 别名2 ON 连接条件 ...;
```

### 7.4 联合查询

对于联合查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。

```sql
SELECT 字段列表 FROM 表1 ...
UNION [ALL]
SELECT 字段列表 FROM 表2 ...;
```

:::tip

- 对于联合查询的多张表的列数必须保持一致， 字段类型也需要保持一致。
- `UNION ALL` 会将全部的数据直接合并在一起，`UNION` 会对合并之后的数据去重。

:::

### 7.5 子查询

- 概念：SQL 语句中嵌套 SELECT 语句，称为嵌套查询，又称子查询。

  ```sql:no-line-numbers
  SELECT * FROM t1 WHERE COLUMN1 = (SELECT COLUMN1 FROM t2);
  ```

- 根据子查询结果不同，分为：

  - 标量子查询（子查询结果为单个值）
  - 列子查询（子查询结果为一列）
  - 行子查询（子查询结果为一行）
  - 表子查询（子查询结果为多行多列）

#### 7.5.1 列子查询

常用的操作符有：

|  操作符  |                  描述                  |
| :------: | :------------------------------------: |
|   `IN`   |      在指定的集合范围之内，多选一      |
| `NOT IN` |         不在指定的集合范围之内         |
|  `ANY`   | 子查询返回的列表中，有任意一个满足即可 |
|  `SOME`  |                 同 ANY                 |
|  `ALL`   |    子查询返回列表的所有值都必须满足    |

> 这些操作符直接作用于子查询的结果，如：
>
>  ```sql:no-line-numbers
>  select * from emp where emp.salary > all (select salary from department where dept_id = '39300');
>  ```

#### 7.5.2 行子查询

常见的操作符是：`=`、`<>`、`IN`、`NOT IN`，如：

```sql:no-line-numbers
select * from emp where (salary, mangerid) = (select salary, managerid from emp where name = '张无忌');
```

#### 7.5.3 表子查询

常用操作符是 `IN`

```sql:no-line-numbers
select * from emp where (job, salary) in (select job, salary from emp where name = '鹿杖客' or name = '宋远桥' );
```

## 8. 事务

> 事务是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作**要么同时成功，要么同时失败**。

### 8.1 事务操作

- 查看/设置事务提交方式

  - 方式一

      ```sql
      SELECT @@autocommit; -- 查看事务设置，1 表示自动提交
      SET @@autocommit = 0; -- 设置事务手动提交
      ```
      
  - 方拾二

      ```sql:no-line-numbers
      START TRANSACTION; -- 或者 BEGIN;
      ```

- 提交事务

  ```sql:no-line-numbers
  COMMIT;
  ```

- 回滚事务

  ```sql:no-line-numbers
  ROLLBACK;
  ```

### 8.2 事务四大特性

:::tip 事务四大特性

- 原子性 (**A**tomicity) ：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。
- 一致性 (**C**onsistency) ：事务完成时，必须使所有的数据都保持一致状态。
- 隔离性 (**I**solation)：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。
- 持久性 (**D**urability) ：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

:::

### 8.3 并发事务问题

- 脏读：一个事务读到另外一个事务还没有提交的数据。
- 不可重复读：一个事务先后读取同一条记录，但两次读取的数据不同，称之为不可重复读。
- 幻读：一个事务按照条件查询数据时，没有对应的数据行，但是在插入数据时，又发现这行数据已经存在，好像出现了”幻影”。

### 8.4 事务隔离级别

|        隔离级别        | 脏读 | 不可重复读 | 幻读 |
| :--------------------: | :--: | :--------: | :--: |
|    Read uncommitted    |  √   |     √      |  √   |
|     Read committed     |  ×   |     √      |  √   |
| Repeatable Read (默认) |  ×   |     ×      |  √   |
|      Serializable      |  ×   |     ×      |  ×   |

> × 表示不会出现该问题。

- 查看事务隔离级别

  ```sql:no-line-numbers
  SELECT @@TRANSACTION_ISOLATION;
  ```

- 设置事务的隔离级别

  ```sql:no-line-numbers
  SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED|READ COMMITTED|REPEATABLE READ|SERIALIZABLE};
  ```

