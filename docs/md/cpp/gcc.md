# Windows 下安装 GCC/G++

## 1. 下载 MinGW 64

:::tip

下载地址：[https://www.mingw-w64.org/downloads/](https://www.mingw-w64.org/downloads/)

:::
![](/imgs/cpp/gcc-1.webp)

![](/imgs/cpp/gcc-2.webp)

## 2. 安装 MinGW 64

### 2.1 双击文件开始安装

1. **选择版本**

   Version 指的是 GCC 的版本，如果没有特殊的需求，一般选择最高的版本号即可。

   ![](/imgs/cpp/gcc-3.webp)

2. **选择电脑系统架构**

   电脑系统是 64 位的，选择 x86_64；如果是 32 位系统，则选择 i686 即可。

   ![](/imgs/cpp/gcc-4.webp)

3. **选择操作系统接口协议**

   如果你想要开发 Windows 程序，需要选择 win32 ，而开发 Linux、Unix、Mac OS 等其他操作系统下的程序，则需要选择 posix 。

   ![](/imgs/cpp/gcc-5.webp)

4. **选择异常处理模型（64位）**

   异常处理在开发中非常重要，在开发的过程中，大部分的时间会耗在处理各种异常情况上。seh 是新发明的，而 sjlj 则是古老的。seh 性能比较好，但不支持 32 位。 sjlj 稳定性好，支持 3 2位。建议 64 位操作系统选择 seh。

   ![](/imgs/cpp/gcc-6.webp)

5. **更改路径，一路Next即可**

   注意，记录下你安装的文件夹地址，这里我的默认地址是：`C:\Program Files\mingw-w64\x86_64-8.1.0-win32-seh-rt_v6-rev0`

   ![](/imgs/cpp/gcc-7.webp)

### 2.2 配置环境变量

打开环境变量高级设置不用多说，找到 `Path`，

![](/imgs/cpp/gcc-8.webp)

点击 <kbd>编辑</kbd> 按钮，

![](/imgs/cpp/gcc-9.webp)

把安装地址中的 bin 文件夹地址新增进去：`C:\Program Files\mingw-w64\x86_64-8.1.0-win32-seh-rt_v6-rev0\mingw64\bin`，然后一路确认完成退出。

![](/imgs/cpp/gcc-10.webp)

### 2.3 验证安装

打开 CMD 窗口，执行 `gcc -v`，将会显示 MinGW-w64 的组件列表，

![](/imgs/cpp/gcc-11.webp)

再次输入 `g++ -v`，可以看到 G++ 同样一起安装配置完成，

![](/imgs/cpp/gcc-12.webp)

此时说明 C/C++ 编程环境已经配置完成。

# Linux 下安装 GCC/G++

> 这里就只介绍在线安装了，这年头应该都联网了吧。

```bash
yum -y install gcc
yum -y install gcc-c++
```

