# Java 基础 - JDK 安装
Windows 下安装比较简单，这里介绍 Linux 下的安装

## 1. yum 安装

1. 查找 Java 相关的列表，选择一个进行下载

```bash
yum -y list java*
# 或者
yum search jdk
```

2. 安装 JDK 1.8

```java
yum install java-1.8.0-openjdk.x86_64
```

![](/imgs/java/jdk-install-1.png)

3. 验证安装成功

```bash
java -version
```

![](/imgs/java/jdk-install-2.png)

4. 通过 yum 安装的 JDK 默认路径为：`/usr/lib/jvm`

```bash
cd /usr/lib/jvm
```

![](/imgs/java/jdk-install-3.png)

5. 配置环境变量

```bash
vim /etc/profile
```

在文件最后添加：

```shell
#set java environment
JAVA_HOME=/usr/lib/jvm/Jdk安装路径
PATH=$PATH:$JAVA_HOME/bin
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export JAVA_HOME CLASSPATH PATH
```

然后执行 `source /etc/profile` 使其生效。

## 2. 解压安装

1. 去[官网](https://www.oracle.com/java/technologies/downloads/)下载 JDK 源码包，这里选择 JDK1.8

![](/imgs/java/jdk-install-4.png)

2. 上传到 `/usr/java` 目录下并解压

```bash
cd /usr
mkdir java
tar -zxvf jdk-8u321-linux-x64.tar.gz
```

3. 设置环境变量

```bash
vim /etc/profile
```

在文件末尾添加：

```shell
# set Java environment
JAVA_HOME=/usr/java/jdk1.8.0_321
JRE_HOME=$JAVA_HOME/jre
CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASSPATH PATH
```

执行 `source /etc/profile` 刷新配置。

## 3. RPM 安装

1. [官网](https://www.oracle.com/java/technologies/downloads/)下载 JDK 的 RPM 包

![](/imgs/java/jdk-install-5.png)

2. 检查环境

如果有安装 openjdk 则卸载，卸载完成后再安装：

```bash
[root@VM_0_4_centos ice]# java -version
java version "1.8.0_281"
Java(TM) SE Runtime Environment (build 1.8.0_281-b09)
Java HotSpot(TM) 64-Bit Server VM (build 25.281-b09, mixed mode)
# 检查
[root@VM_0_4_centos ice]# rpm -qa|grep jdk
jdk1.8-1.8.0_281-fcs.x86_64
# 卸载 -e --nodeps 强制删除
[root@VM_0_4_centos ice]# rpm -e --nodeps jdk1.8-1.8.0_281-fcs.x86_64
[root@VM_0_4_centos ice]# java -version
-bash: /usr/bin/java: No such file or directory  # OK
```

3. 安装 JDK

![](/imgs/java/jdk-install-6.png)

4. 配置环境变量

配置文件：**`/etc/profile`**，通过 Vim 进行编辑：`vim /etc/profile`

在文件末尾增加：

```bash
JAVA_HOME=/usr/java/jdk1.8.0_281-amd64
CLASSPATH=$JAVA_HOME/lib:$JAVA_HOME/jre/lib
PATH=$PATH:$JAVA_HOME/bin
export JAVA_HOME PATH CLASSPATH 
```

然后让这个配置文件生效：

```bash
source /etc/profile
```

