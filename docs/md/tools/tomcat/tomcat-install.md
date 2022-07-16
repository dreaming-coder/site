# Tomcat - 安装
1. 去[官网](https://tomcat.apache.org/)下载 Tomcat  安装包

![](/imgs/tomcat/tomcat-install-1.png)

2. 上传到服务器 `/usr` 下并解压

```bash
cd /usr/
tar -zxvf apache-tomcat-9.0.59.tar.gz
```

3. 启动 Tomcat 测试

```bash
cd apache-tomcat-9.0.59/bin/
./startup.sh
```

浏览器输入 IP 地址，8080端口号应该能看到 Tomcat 已经被启动。

4. 使用 systemctl 管理 Tomcat

首先执行

```bash
cd /usr/lib/systemd/system
vim tomcat9.service
```

然后，文件里填入下面的内容：

```shell
[Unit]
Description=Apach Tomcat 9
After=syslog.target network.target

[Service]
Type=forking
ExecStart=/usr/tomcat/bin/startup.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/usr/tomcat/bin/shutdown.sh
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

然后重新启动 systemctl：

```bash
systemctl daemon-reload
```

之后 Tomcat 可以使用 systemctl 管理了：

```bash
#启动Tomcat服务
systemctl start tomcat9.service
#停止Tomcat服务
systemctl stop tomcat9.service
#重启Tomcat服务
systemctl restart tomcat9.service
```

:::warning

在使用 systemctl 启动 Tomcat 时，可能会遇到 `Neither the JAVA_HOME nor the JRE_HOME environment variable is defined` 的错误，我们可以做如下操作：

```bash
cd /usr/tomcat/bin/
vim setclasspath.sh
```

在文档中增加 Java 的环境变量：

![](/imgs/tomcat/tomcat-install-2.png)

:::

