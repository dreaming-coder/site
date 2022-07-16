# Nginx - 安装
> Nginx 在 Windows 下的安装很简单，解压即用，下面记录下 Linux 下的安装。

1. 打开网址 [http://nginx.org/en/download.html](http://nginx.org/en/download.html)

![](/imgs/nginx/nginx-install-1.png)

2. 将下载的文件上传到 `/opt` 目录下

![](/imgs/nginx/nginx-install-2.png)

3. 解压该文件

执行命令：`tar -zxvf nginx-1.20.2.tar.gz`

![](/imgs/nginx/nginx-install-3.png)

4. 自动配置

进入解压目录，`cd nginx-1.20.2/`，执行 `./configure` 进行自动配置

![](/imgs/nginx/nginx-install-4.png)

看到上面结果，说明配置成功。如果报错，只需按照提示安装需要的包，再重新执行配置即可。

5. 编译

执行 `make && make install`，出现下面提示说明编译安装成功，地址在 `/usr/local/nginx`

![](/imgs/nginx/nginx-install-5.png)

6. 测试是否安装成功

按照下图所示，执行启动命令：

![](/imgs/nginx/nginx-install-6.png)

然后，输入 Linux 服务器地址：

![](/imgs/nginx/nginx-install-7.png)

出现上图界面说明启动成功。



