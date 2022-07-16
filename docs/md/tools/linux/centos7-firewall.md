# Linux - CentOS 7 防火墙与端口命令
## 1. 关闭防火墙

```bash
systemctl stop firewalld.service            # 停止 firewall
systemctl disable firewalld.service         # 禁止 firewall 开机启动
```
## 2. 开启某个端口（80）

```bash
firewall-cmd --zone=public --add-port=80/tcp --permanent
```
命令含义

- `–zone`：作用域

- `–add-port=80/tcp`：添加端口，格式为：`端口/通讯协议`
- `–permanent`：永久生效，没有此参数重启后失效

比如不拦截 Redis 的 6379 端口：

```bash
firewall-cmd --zone=public --add-port=6379/tcp --permanent
```
## 3. 重启防火墙

```bash
firewall-cmd --reload
```
## 4. 其他常用命令

```bash
firewall-cmd --state                           # 查看防火墙状态，是否是 running
firewall-cmd --reload                          # 重新载入配置，比如添加规则之后，需要执行此命令
firewall-cmd --get-zones                       # 列出支持的 zone
firewall-cmd --get-services                    # 列出支持的服务，在列表中的服务是放行的
firewall-cmd --query-service ftp               # 查看 ftp 服务是否支持，返回 yes 或者 no
firewall-cmd --add-service=ftp                 # 临时开放 ftp 服务
firewall-cmd --add-service=ftp --permanent     # 永久开放 ftp 服务
firewall-cmd --remove-service=ftp --permanent  # 永久移除 ftp 服务
firewall-cmd --add-port=80/tcp --permanent     # 永久添加 80 端口 
iptables -L -n                                 # 查看规则，这个命令是和 iptables 的相同的
man firewall-cmd                               # 查看帮助
```
更多命令，使用 `firewall-cmd --help` 查看帮助文件。

