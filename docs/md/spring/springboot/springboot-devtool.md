# SpringBoot 基础 - 热部署

## 1. 准备知识点

### 1.1 什么是热部署和热加载？

> 热部署和热加载是在应用正在运行的时候，自动更新（重新加载或者替换 class 等）应用的一种能力。（PS：spring-boot-devtools 提供的方案也是要重启的，只是无需手动重启能实现自动加载而已。）

严格意义上，我们需要区分下热部署和热加载，对于 Java 项目而言：

- **热部署**
  - 在服务器运行时重新部署项目
  - 它是直接重新加载整个应用，这种方式会释放内存，比热加载更加干净彻底，但同时也更费时间。
- **热加载**
  - 在在运行时重新加载 class，从而升级应用。
  - 热加载的实现原理主要依赖 Java 的类加载机制，在实现方式可以概括为在容器启动的时候起一条后台线程，定时的检测类文件的时间戳变化，如果类的时间戳变掉了，则将类重新载入。
  - 对比反射机制，反射是在运行时获取类信息，通过动态的调用来改变程序行为； 热加载则是在运行时通过重新加载改变类信息，直接改变程序行为。

### 1.2 什么是 LiveLoad？

LiveLoad 是提供浏览器客户端自动加载更新的工具，分为 LiveLoad 服务器和 Liveload 浏览器插件两部分； devtools 中已经集成了 LiveLoad 服务器，所以如果我们开发的是 web 应用，并且期望浏览器自动刷新， 这时候可以考虑 LiveLoad。

## 2. 配置 devtools 实现热部署

### 2.1 POM 配置

添加 spring-boot-devtools 的依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <optional>true</optional> <!-- 可以防止将devtools依赖传递到其他模块中 -->
    </dependency>
</dependencies>
```

### 2.2  IDEA 配置

- 方式一： **无任何配置时，手动触发重启更新（<kbd>Ctrl</kbd> + <kbd>F9</kbd>）**

![](/imgs/spring/springboot/springboot-devtool-1.png)

- 方式二： **IDEA需开启运行时编译，自动重启更新**

**设置 1**：

File -> Settings -> Build,Execution,Deployment -> Compile

勾选：Make project automatically

![](/imgs/spring/springboot/springboot-devtool-2.png)

**设置 2**：

快捷键：<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd>

选择：Registry

勾选：compiler.automake.allow.when.app.running

新版本的 IDEA 可以在 File -> settings -> Advanced Setttings 里面的第一个设置：

![](/imgs/spring/springboot/springboot-devtool-3.png)

### 2.3 application.yaml 配置

```yaml
spring:
  devtools:
    restart:
      enabled: true  #设置开启热部署
      additional-paths: src/main/java #重启目录
      exclude: WEB-INF/**
  thymeleaf:
    cache: false #使用Thymeleaf模板引擎，关闭缓存
```

