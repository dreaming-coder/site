# Nginx - 基础
## 1. 基本概念

### 1.1 反向代理

![](/imgs/nginx/nginx-1.png)

### 1.2 负载均衡

![](/imgs/nginx/nginx-2.png)

### 1.3 动静分离

![](/imgs/nginx/nginx-3.png)

## 2. Nginx 常用命令

:::tip
使用 Nginx 操作命令必须进入 Nginx 的目录！

![](/imgs/nginx/nginx-4.png)
:::



### 2.1 查看 Nginx 版本号

```bash
./nginx -v
```

![](/imgs/nginx/nginx-5.png)

### 2.2 启动 Nginx

```bash
./nginx 
```

![](/imgs/nginx/nginx-6.png)

### 2.3 关闭 Nginx

```bash
./nginx -s stop
```

![](/imgs/nginx/nginx-7.png)

### 2.4 重新加载 Nginx

```bash
./nginx -s reload
```

## 3. 使用 systemctl 管理 Nginx

首先执行：

```bash
cd /usr/lib/systemed/system
vim nginx.service
```

然后，文件里填入下面的内容：

```shell
[Unit]                                            // 对服务的说明
Description=nginx                                 // 描述服务
After=network.target                              // 描述服务类别

[Service]                                         // 服务的一些具体运行参数的设置
Type=forking                                      // 后台运行的形式
ExecStart=/usr/local/nginx/sbin/nginx             // 启动命令
ExecReload=/usr/local/nginx/sbin/nginx -s reload  // 重启命令
ExecStop=/usr/local/nginx/sbin/nginx -s stop      // 快速停止
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

然后重新启动 systemctl：

```bash
systemctl daemon-reload
```

设置 Nginx 开机自启：

```bash
systemctl enable nginx.service
```

之后 Nginx 可以使用 systemctl 管理了：

```bash
#启动nginx服务
systemctl start nginx.service
#停止nginx服务
systemctl stop nginx.service
#重启nginx服务
systemctl restart nginx.service
#重新读取nginx配置(这个最常用, 不用停止nginx服务就能使修改的配置生效)
systemctl reload nginx.service
```

