# SpringBoot 基础 - Banner 图

## 1. 什么是 Banner

我们在启动 SpringBoot 程序时，有如下 Banner 信息：

![](/imgs/spring/springboot/springboot-banner-1.png)

## 2. 如何更改 Banner

在 application.yaml 中添加配置

```yaml
spring:
  banner:
    charset: UTF-8
    location: classpath:banner.txt
```

在 resource 下创建 banner.txt，内容自定义：

```
----welcome----
http://e-thunder.space
---------------
```

修改后，重启的 App 的效果

![](/imgs/spring/springboot/springboot-banner-2.png)

## 3. 文字 Banner 的设计

可以通过这个网站进行设计：[patorjk Banner](http://patorjk.com/software/taag)

比如：

![](/imgs/spring/springboot/springboot-banner-3.png)

