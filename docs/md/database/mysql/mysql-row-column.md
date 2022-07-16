# MySQL - 行列转换

## 1. 行转列

- 建表

```sql
CREATE TABLE score
(
    stud_id INT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(10),
    subject   VARCHAR(20),
    goal    DOUBLE
) ENGINE = innoDB
  AUTO_INCREMENT = 1000;
```

![](/imgs/database/mysql/mysql-row-column-1.png)

- 方法一

```sql
SELECT name AS '姓名',
       GROUP_CONCAT(CASE subject WHEN '语文' THEN goal END SEPARATOR '') AS '语文',
       GROUP_CONCAT(CASE subject WHEN '数学' THEN goal END)              AS '数学',
       GROUP_CONCAT(CASE subject WHEN '英语' THEN goal END) AS '英语'
FROM score
GROUP BY name;
```

- 方法二

```sql
SELECT name AS '姓名',
       SUM(IF(subject = '语文', goal, 0)) AS '语文',
       SUM(IF(subject = '数学', goal, 0)) AS '数学',
       SUM(IF(subject = '英语', goal, 0)) AS '英语'
FROM score
GROUP BY name;
```

- 结果

![](/imgs/database/mysql/mysql-row-column-2.png)

## 2. 列转行

- 建表

```sql
CREATE TABLE score2
(
    stud_id INT PRIMARY KEY AUTO_INCREMENT,
    姓名      VARCHAR(20),
    语文      DOUBLE,
    数学      DOUBLE,
    英语      DOUBLE
) ENGINE = innoDB
  AUTO_INCREMENT = 1000;
```

![](/imgs/database/mysql/mysql-row-column-3.png)

- 方法

```sql
SELECT 姓名 AS name, '语文' AS subject, 语文 AS score
FROM score2
UNION ALL
SELECT 姓名 AS name, '数学' AS subject, 数学 AS score
FROM score2
UNION ALL
SELECT 姓名 AS name, '英语' AS subject, 英语 AS score
FROM score2
ORDER BY name ASC, subject DESC;
```

- 结果

![](/imgs/database/mysql/mysql-row-column-4.png)