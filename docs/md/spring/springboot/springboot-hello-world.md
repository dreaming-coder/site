# SpringBoot 基础 - Hello World

> 本部分代码见 [**springboot-demo-hello-world**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/springboot-demo-hello-world)。

> 这里对 MVC 架构进行了简化来演示示例，实际开发时应当遵守 MVC 分层操作。

## 1. 创建 SpringBoot Initializer

SpringBoot 官网提供了 创建 SpringBoot Initializer 的工具，我们可以访问网址 [https://start.spring.io/](https://start.spring.io/)，只要稍加选择配置即可初始化一个 SpringBoot 项目：

![](/imgs/spring/springboot/springboot-helloworld-1.png)

为快速进行开发，还是推荐使用 IDEA 这类开发工具，它将大大提升学习和开发的效率。

- **选择新建 SpringBoot Initializer**

![](/imgs/spring/springboot/springboot-helloworld-2.png)

![](/imgs/spring/springboot/springboot-helloworld-3.png)

注意，此时可能显示连接超时，我们需要对 IDEA 进行 HTTP 代理配置：

![](/imgs/spring/springboot/springboot-helloworld-4.png)

点击确认后弹出：

![](/imgs/spring/springboot/springboot-helloworld-5.png)

则说明连接成功，可以创建 SpringBoot Initializer 了。

初始化的项目结构如下：

![](/imgs/spring/springboot/springboot-helloworld-6.png)

> 这里对最内层包名进行了修改，方便查看。

- **.gitignore**

```bash
HELP.md
target/
!.mvn/wrapper/maven-wrapper.jar
!**/src/main/**/target/
!**/src/test/**/target/

### STS ###
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

### IntelliJ IDEA ###
.idea
*.iws
*.iml
*.ipr

### NetBeans ###
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/
!**/src/main/**/build/
!**/src/test/**/build/

### VS Code ###
.vscode/
```

- **pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ice</groupId>
    <artifactId>springboot-demo-hello-world</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>springboot-demo-hello-world</name>
    <description>springboot-demo-hello-world</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>2.7.2</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>

</project>
```

## 2. 给第一个应用添加包和代码

```java
package com.ice.hello;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class HelloApplication {

    public static void main(String[] args) {
        SpringApplication.run(HelloApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(){
        return "Hello World";
    }
}
```

## 3. 运行你的第一个程序

![](/imgs/spring/springboot/springboot-helloworld-7.png)

运行后，你将看到如下的信息：表明我们启动程序成功（启动了一个内嵌的 Tomca t容器，服务端口在 8080）

![](/imgs/spring/springboot/springboot-helloworld-8.png)

这时候我们便可以通过浏览器访问服务

![](/imgs/spring/springboot/springboot-helloworld-9.png)

## 4. 一些思考

### 4.1 为什么我们添加一个 starter-web 模块便可以了呢？

我们安装 Maven Helper 的插件，用来查看 spring-boot-starter-web 模块的依赖。我们看下这个模块的依赖，你便能初步窥探出模块支撑：

![](/imgs/spring/springboot/springboot-helloworld-10.png)

### 4.2 我们如何更改更多 Server 的配置呢？比如 Tomcat Server

为什么 Tomcat 默认端口是 8080？ 如前文所述，SpringBoot 最强大的地方在于约定大于配置，只要你引入某个模块的 xx-starter 包，它将自动注入配置，提供了这个模块的功能；比如这里我们在 POM 中添加了如下的包：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

它内嵌了 Tomcat 并且提供了默认的配置，比如默认端口是 8080。

我们可以在 application.properties 或者 application.yml 中配置

![](/imgs/spring/springboot/springboot-helloworld-11.png)

特别的，如果你添加了如下包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

并且你的 IDE 支持（比如 IDEA 商业版），软件在配置文件内可以自动给你配置提示，你也可以（Ctrl + 点击）进入具体的配置文件。

### 4.3 SpringBoot 还提供了哪些 starter 模块呢？

|               名称               |                             说明                             |
| :------------------------------: | :----------------------------------------------------------: |
|       spring-boot-starter        |  核心 POM，包含自动配置支持、日志库和对 YAML 配置文件的支持  |
|     spring-boot-starter-amqp     |                 通过 spring-rabbit 支持 AMQP                 |
|     spring-boot-starter-aop      |     包含 spring-aop 和 AspectJ 来支持面向切面编程（AOP）     |
|    spring-boot-starter-batch     |                支持 Spring Batch，包含 HSQLDB                |
|   spring-boot-starter-data-jpa   |   包含 spring-data-jpa、spring-orm 和 Hibernate 来支持 JPA   |
| spring-boot-starter-data-mongodb |           包含 spring-data-mongodb 来支持 MongoDB            |
|  spring-boot-starter-data-rest   | 通过 spring-data-rest-webmvc 支持以 REST 方式暴露 Spring Data 仓库 |
|     spring-boot-starter-jdbc     |                   支持使用 JDBC 访问数据库                   |
|   spring-boot-starter-security   |                     包含 spring-security                     |
|     spring-boot-starter-test     | 包含常用的测试所需的依赖，如 JUnit、Hamcrest、Mockito 和 spring-test 等 |
|   spring-boot-starter-velocity   |                支持使用 Velocity 作为模板引擎                |
|     spring-boot-starter-web      |         支持 Web 应用开发，包含 Tomcat 和 spring-mvc         |
|  spring-boot-starter-websocket   |             支持使用 Tomcat 开发 WebSocket 应用              |
|      spring-boot-starter-ws      |                   支持 Spring Web Services                   |
|   spring-boot-starter-actuator   |       添加适用于生产环境的功能，如性能指标和监测等功能       |
| spring-boot-starter-remote-shell |                      添加远程 SSH 支持                       |
|    spring-boot-starter-jetty     |        使用 Jetty 而不是默认的 Tomcat 作为应用服务器         |
|    spring-boot-starter-log4j     |                      添加 Log4j 的支持                       |
|   spring-boot-starter-logging    |           使用 Spring Boot 默认的日志框架 Logback            |
|    spring-boot-starter-tomcat    |        使用 Spring Boot 默认的 Tomcat 作为应用服务器         |

> 所有这些 POM 依赖的好处在于为开发 Spring 应用提供了一个良好的基础。Spring Boot 所选择的第三方库是经过考虑的，是比较适合产品开发的选择。但是 Spring Boot 也提供了不同的选项，比如日志框架可以用 Logback 或 Log4j，应用服务器可以用 Tomcat 或 Jetty。

