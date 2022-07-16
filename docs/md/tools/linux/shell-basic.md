# Linux - Shell 初识
## 1. Shell 变量

Linux Shell 中的变量分为**系统变量**和**用户自定义变量**

系统变量如：`$HOME`、​`$PWD`、`$SHELL`、`$USER` 等，显示当前 shell 中所有变量：`set`

### 1.1 Shell 变量的定义

- 基本语法

  定义变量：`变量 = 值`

  撤销变量：`unset 变量`

  声明静态变量：`readonly 变量 = 值`，注意，不能 `unset`

- 定义变量的规则

  - 变量名称可以由字母、数字和下划线组成，但是不能数字开头
  - 等号两边不能有空格
  - 变量名称一般习惯为大写

- 将命令的返回值赋给变量

  -  方法一

    ```shell
    A=`ls -la`
    ```

  - 方法二

    ```shell
    A=$(ls -la)
    ```

### 1.2 设置环境变量

- 基本语法

  `export 变量名=变量值`：将 shell 变量输出为环境变量

  `source 配置文件`：让修改后的配置信息立即生效

  `echo $变量名`：查询环境变量的值

### 1.3 位置参数变量

当我们执行一个 shell 脚本时，如果希望获取到命令行的参数信息，就可以使用到位置参数变量

比如：`./myshell.sh 100 200`，这就是一个执行 shell 的命令，可以在 myshell 脚本中获取到参数信息

- 基本语法

  - `$n`：`n` 为数字，`$0`表示命令本身，`$1`-`$9`代表第一到第9个参数，十以上的参数需要用大括号包含，如`${10}`
  - `$*`：这个变量代表命令行中所有的参数，`$*`把所有的参数看成一个整体
  - `$@`：也代表命令行中所有的参数，但是把每个参数区分对待
  - `$#`：这个变量代表命令行中所有参数的个数

- 应用实例

  编写一个 shell 脚本 positionPara.sh，在脚本中获取到命令行的各个参数信息

  ```shell
  #!/bin/bash
  # 获取到各个参数
  echo "$0 $1 $2"
  echo "$*"
  echo "$@"
  echo "参数个数=$#"
  ```
  
  ![](/imgs/shell/shell-1.png)

### 1.4 预定义变量

- 基本语法
  - `$$`：当前进程的进程号
  - `$!`：后台运行的最后一个进程的进程号
  - `$?`：最后一次执行的命令的返回状态。如果这个变量的值为 0，证明上一个命令正确执行，如果这个变量的值为非零，则证明上一个命令执行不正确

## 2. 运算符

- 基本语法
  - `$((运算式))`或`$[运算式]`
  - `expr m + n`，注意 expr 运算符 间要有空格
  - `expr m - n`

## 3. 判断语句

- 基本语法

  `[ condition ] `：**注意 condition 前后要有空格**

  非空返回 true，可使用 `$?` 验证(0 为 true，> 1 为 false)

- 常用判断条件

  - 两个整数的比较
    - **`=`：字符串的比较**
    - `-lt`：小于
    - `-le`：小于等于
    - `-eq`：等于
    - `-gt`：大于
    - `-ge`：大于等于
    - `-ne`：不等于
  - 按照文件权限进行判断
    - `-r`：有读的权限
    - `-w`：有写的权限
    - `-x`：有执行的权限
  - 按照文件类型进行判断
    - `-f`：文件存在并且是一个常规的文件
    - `-e`：文件存在
    - `-d`：文件存在并且是一个目录

- 示例

  - “ok” 是否等于 “ok”

    ```shell
    #!/bin/bash
    if [ "ok" = "ok"] 
    then
    	echo "equal"
    fi	
    ```

  - 23 是否大于等于 22

    ```shell
    #!/bin/bash
    if [ 23 -gt 22 ]
    then 
    	echo "大于"
    fi
    ```

  - /root/study 目录中的文件是否存在 log.yaml 文件

    ```shell
    #!/bin/bash
    if [ -e /root/study/log.yaml ]
    then
    	exist "存在"
    fi
    ```

    > 判断权限也一样，先写 `-XXX` 后面跟文件地址

## 4. 流程控制

### 4.1 if 条件控制

```shell
if [ 条件判断式 ]; then
	程序
fi
# 或者下面这种，推荐使用下面这种
if [ 条件判断式 ]
  then 
	程序
  elif [ 条件判断式 ]
    then
      程序
fi
```

### 4.2 case 条件控制

```shell
case ${变量名} in
	"值1")
	 # 程序1
	;;
	"值2")
	 # 程序2
	;;
	 # ......
	*)
	 # 默认执行程序
	;;
esac
```

### 4.3 for 循环控制

- 语法一

    ```shell
    for 变量 in 值1 值2 值3
        do
            程序
        done
    ```

- 语法二

  ```shell
  for((初始值;循环控制条件;变量变化))
  	do
  		程序
  	done
  ```

### 4.4 while 循环控制

```shell
while [ 条件判断式 ]
	do
  		程序
  	done
```

## 5. read 读取控制台输入

```shell
read [选项] [参数]
```

选项：

- `-p`：指定读取时的提示符
- `-t`：指定读取值时等待的时间（秒），如果没有在指定的时间内输入，就不再等待了

参数：

变量，指定读取值的变量名

【案例 】读取控制台输入一个 num 值，在 10 秒内输入

```shell
#!/bin/bash
read -t 10 -p "请输入一个数 num = " NUM
echo "你输入的值时num=$NUM"
```

## 6. 函数

shell 编程和其它编程语言一样，有系统函数，也可以自定义函数。

### 6.1 系统函数

- **basename**：返回完整路径最后 / 的部分，常用于获取文件名

```shell
basename [pathcname] [suffix]
basename [string] [suffix]  # basename命令会删掉所有的前缀包括最后一个 / 字符，然后将字符串显示出来
```

> suffix 为后缀，如果制定了 suffix，basename 会将pathname 或 string 中的 suffix 去掉

```shell
basename /home/aaa/test.txt .txt  # 输出test
```

- **dirname**：返回完整路径最后 / 的前面的部分，常用于返回路径部分

```shell
dirname /home/aaa/test.txt  # 输出/home/aaa
```

### 6.2 自定义函数

基本语法

```bash
[function] funname[()]{
	Action;
	[return int;]
}
```

> 调用使用 `funname [值]`

示例

```shell
#!/bin/bash
function getSum(){
	SUM=$[$n1+$n2]
	echo "SUM=$SUM"
}
read -p "请输入第一个数 n1：" n1
read -p "请输入第二个数 n2：" n2

getSum $n1 $n2
```

## 7. 综合案例

- 每天凌晨 2:10 备份数据库 myDB 到 /data/backup/db
- 备份开始和备份结束能够给出相应的提示信息
- 备份后的文件要求以备份时间为文件名，并打包成 `.tar.gz` 的形式，比如 *==2018-03-12_230201.tar.gz==*
- 在备份的同时，检查是否有十天前备份的数据库文件，如果有就将其删除

**【mysql_db_backup.sh】**

```shell
#!/bin/bash

# 完成数据库的定时备份
# 备份的路径
BACKUP=/data/backup/db
#当前的时间作为文件名
DATETIME=$(date +%Y_%m_%d_%H%M%S)

echo "===============开始备份==============="
echo "====备份的数据路径是 $BACKUP/$DATETIME.tar.gz"

# 主机
HOST=localhost
# 用户名
DB_USER=root
# 密码
DB_PWD=*********
# 数据库名
DATABASE=myDB

# 创建备份的路径
[ ! -d "$BACKUP/$DATETIME" ] && mkdir -p $BACKUP/$DATETIME


# 执行 mysql 的备份指令
mysqldump -u${DB_USER} -p${DB_PWD} --host=$HOST $DATABASE | gzip > $BACKUP/$DATETIME/$DATETIME.sql.gz

# 打包备份文件
cd $BACKUP
tar -zcvf $DATETIME.tar.gz $DATETIME

# 删除临时目录
rm -rf  $BACKUP/$DATETIME

# 删除 10 天前的备份文件
find $BACKUP -mtime +10 -name "*.tar.gz" -exec rm -rf {} \;

echo "=====备份成功"
```

然后执行：

```shell
crontab -e
```

里面编辑

```shell
10 2 * * * /usr/sbin/mysql_db_backup.sh
```

