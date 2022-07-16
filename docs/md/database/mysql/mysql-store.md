# MySQL - 存储对象

## 1. 视图

视图 (View) 是一种虚拟存在的表。视图中的数据并不在数据库中实际存在，行和列数据来自定义视图的查询中使用的表，并且是在使用视图时动态生成的。

通俗的讲，视图只保存了查询的 SQL 逻辑，不保存查询结果。所以我们在创建视图的时候，主要的工作就落在创建这条 SQL 查询语句上。

### 1.1 基本语法

- 创建

  ```sql
  CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT 语句 [WITH [CASCADE|LOCAL] CHECK OPTION];
  ```

- 查询

  - 查询创建视图语句

    ```sql
    SHOW CREATE VIEW 视图名称;
    ```

  - 查询视图数据

    ```sql
    SELECT * FROM 视图名称; --和普通表查询一样
    ```

- 修改

  ```sql
  ALTER VIEW 视图名称[(列名列表)] AS SELECT 语句 [WITH [CASCADE|LOCAL] CHECK OPTION];
  ```

- 删除

  ```sql
  DROP VIEW [IF EXISTS] 视图名称1, 视图名称2, ...;
  ```

### 1.2 检查选项

当使用 WITH CHECK OPTION 子句创建视图时，MySQL 会通过视图检查正在更改的每个行，例如插入，更新，删除，以使其符合视图的定义。MySQL 允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，MySQL 提供 了两个选项：CASCADED 和 LOCAL，默认值为 CASCADED。

:::tabs

@tab CASCADED

**如果一个视图使用了 CASCADED，则对该视图插入数据时，会递归检查这个视图及其所有依赖的视图的限制条件 ，保证数据的一致性。**{.em}

@tab LOCAL

**如果一个视图使用了 LOCAL，则对该视图插入数据时，会递归检查这个视图及其所有依赖的声明 LOCAL 选项的视图的限制条件 ，保证数据的一致性。**{.em }

:::

> 简单来说，CASCADED 具有传递性，LOCAL 只检查当下。

### 1.3 视图更新

要使视图可更新，视图中的行与基础表中的行之间必须存在一对一的关系。如果视图包含以下任何一项，则该视图不可更新：

1. **聚合函数或窗口函数 (SUM()、 MIN()、 MAX()、 COUNT() 等 )**{.design-item}
2. **DISTINCT**{.design-item}
3. **GROUP BY**{.design-item}
4. **HAVING**{.design-item}
5. **UNION 或者 UNION ALL**{.design-item}

## 2. 存储过程

存储过程是事先经过编译并存储在数据库中的一段 SQL 语句的集合，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。

特点：

- 封装、复用
- 可以接收参数，也可以返回数据
- 减少网络交互，效率提升

### 2.1 基本语法

- 创建

  ```sql
  CREATE PROCEDURE 存储过程名称([参数列表])
  BEGIN
  	-- SQL语句
  END;
  ```

- 调用

  ```sql
  CALL 名称([参数列表]);
  ```

- 查看

  ```sql
  SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = '数据库名'; --查询指定数据库的存储过程及状态信息
  SHOW CREATE PROCEDURE 存储过程名称; --查询某个存储过程的定义
  ```

- 删除

  ```sql
  DROP PROCEDURE [IF EXISTS] 存储过程名称;
  ```

> 注意：在命令行中，执行创建存储过程的 SQL 时，需要通过关键字 delimiter 指定 SQL 语句的结束符，如：`DELIMITER $$`。

### 2.2 变量

#### 2.2.1 系统变量

系统变量是 MySQL 服务器提供，不是用户定义的，属于服务器层面。分为全局变量 (**GLOBAL**{.red})、 会话变量 (**SESSION**{.red}) 。

- 查看系统变量

  ```sql
  SHOW [SESSION|GLOBAL] VARIABLES; --查看所有系统变量
  SHOW [SESSION|GLOBAL] VARIABLES LIKE '...'; --可以通过LIKE模糊匹配方式查找变量
  SELECT @@[SESSION|GLOBAL].系统变量名; --查看指定变量的值
  ```

- 设置系统变量

  ```sql
  SET [SESSION|GLOBAL] 系统变量名 = 值;
  SET @@[SESSION|GLOBAL].系统变量名 = 值;
  ```

:::danger

- 带有 `@@` 的语句，点号 `.` 不能丢！

:::

#### 2.2.2 用户定义变量

用户定义变量是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用 `@变量名` 使用就可以。其作用域为当前 SESSION。

- 赋值

  ```sql
  SET @var_name = expr [,@var_name = expr];
  SET @var_name := expr [,@var_name := expr];
  ```

  ```sql
  SELECT @var_name := expr [,@var_name := expr];
  SELECT 字段名 INTO @var_name FROM 表名;
  ```

- 使用

  ```sql
  SELECT @var_name;
  ```

  > 用户定义的变量无需对其进行声明或初始化，只不过获取到的值为 NULL。

#### 2.2.3 局部变量

局部变量是根据需要定义的在局部生效的变量，访问之前，需要 DECLARE 声明。可用作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的 BEGIN ... END 块。

- 声明

  ```sql
  DECLARE 变量名 变量类型 [DEFAULT ...];
  ```

  > 变量类型就是数据库字段类型：INT、 BIGINT、 CHAR、VARCHAR、DATE、 TIME 等。

- 赋值

  ```sql
  SET 变量名 = 值;
  SET 变量名 := 值;
  SELECT 字段名 INTO 变量名 FROM 表名;
  ```

### 2.3 IF 判断

```sql
IF 条件1 THEN
	...
ELSEIF 条件2 THEN
	...
ELSE
	...
END IF;
```

### 2.4 参数

| 类型  |                     含义                     | 备注 |
| :---: | :------------------------------------------: | :--: |
|  IN   |   该类参数作为输入，也就是需要调用时传入值   | 默认 |
|  OUT  | 该类参数作为输出，也就是该参数可以作为返回值 |      |
| INOUT |    既可以作为输入参数，也可以作为输出参数    |      |

用法：

```sql
CREATE PROCEDURE 存储过程名称([IN/OUT/INOUT 参数名 参数类型])
BEGIN
	-- SQL语句
END;
```

### 2.5 CASE

- 语法一

  ```sql
  CASE case_value
  	WHEN when_value1 THEN statement_list1
  	[WHEN when_value2 THEN statement_list2]...
  	[ELSE statement_list]
  END CASE;
  ```

- 语法二

  ```sql
  CASE
  	WHEN search_condition1 THEN statement_list1
  	WHEN search_condition2 THEN statement_list2...
  	[ELSE statement_list]
  END CASE;
  ```

### 2.6 循环

- WHILE

  ```sql
  WHILE 条件 DO
  	SQL 逻辑
  END WHILE;
  ```

- REPEAT

  ```sql
  REPEAT
  	SQL 逻辑
  	UNTIL 条件
  END REPEAT;
  ```

- LOOP

  LOOP 实现简单的循环，如果不在 SQL 逻辑中增加退出循环的条件，可以用其来实现简单的死循环。LOOP 可以配合以下两个语句使用：

  - LEAVE：配合循环使用，退出循环
  - ITERATE：必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环。

  ```sql
  [begin_label:] LOOP
  	SQL 逻辑
  END LOOP [end_label];
  
  LEAVE label;
  ITERATE label;
  ```

### 2.7 游标

游标 (CURSOR) 是用来存储查询结果集的数据类型，在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括游标的声明、OPEN、FETCH 和 CLOSE，其语法分别如下：

- 声明游标

  ```sql
  DECLARE 游标名称 CURSOR FOR 查询语句;
  ```

- 打开游标

  ```sql
  OPEN 游标名称;
  ```

- 获取游标记录

  ```sql
  FETCH 游标名称 INTO 变量1 [,变量2...];
  ```

- 关闭游标

  ```sql
  CLOSE 游标名称;
  ```

### 2.8 条件处理程序

条件处理程序 (Handler) 可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤。具体语法为:

```sql
DECLARE handler_action HANDLER FOR condition_value [,condition_value]... statement;
```

> **handler_action**：
>
> - CONTINUE：继续执行当前程序
> - EXIT：终止当前程序
>
> **condition_value**：
>
> - SQLSTATE sqlstate_value：状态码，如 02000
> - SQLWARNING：所有以 01 开头的 SQLSTATE 代码的简写
> - NOT FOUND：所有以 02 开头的 SQLSTATE 代码的简写
> - SQLEXCEPTION：所有没有被 SQLWARNING 或 NOT FOUND 捕获的 SQLSTATE 代码的简写

e.g.

```sql
DECLARE EXIT HANDLER FOR SQLSTATE '02000' close u_cursor;
```

## 3. 存储函数

存储函数是有返回值的存储过程，存储函数的参数只能是 IN 类型的。具体语法如下：

```sql
CREATE FUNCTION 存储函数名称([参数列表])
RETURNS type [characteristic...]
BEGIN
	SQL 语句...
	RETURN ...；
END;
```

> characteristic 说明：
>
> - DETERMINSTIC：相同的输入参数总是产生相同的结果
> - NO SQL：不包含 SQL 语句
> - READS SQL DATA：包含读取数据的语句，但不包含写入数据的语句

## 4. 触发器

触发器是与表有关的数据库对象，指在 insert/update/delete 之前或之后，触发并执行触发器中定义的 SQL 语句集合。触发器的这种特性可以协助应用在数据库端确保数据的完整性，日志记录，数据校验等操作。

使用别名 OLD 和 NEW 来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发。

|   触发器类型    |                       NEW 和 OLD                       |
| :-------------: | :----------------------------------------------------: |
| INSERT 型触发器 |             NEW 表示将要或者已经新增的数据             |
| UPDATE 型触发器 | OLD 表示修改之前的数据，NEW 表示将要或已经修改后的数据 |
| DELETE 型触发器 |             OLD 表示将要或者已经删除的数据             |

- 创建

  ```sql
  CREATE TRIGGER trigger_name
  BEFORE|AFTER  INSERT|UPDATE|DELETE
  ON table_name FOR EACH ROW  -- 行级触发器
  BEGIN
  	trigger_statement;
  END;
  ```

- 查看

  ```sql
  SHOW TRIGGERS;
  ```

- 删除

  ```sql
  DROP TRIGGER [schema_name.]trigger_name; --如果没有指定schema_ name，默认为当前数据库。
  ```

