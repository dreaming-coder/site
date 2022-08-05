# Spring Cloud 基础 - 环境搭建

## 1. 简单分布式项目搭建

> 本部分代码见 [**springcloud-distribution-demo**](https://github.com/dreaming-coder/springcloud-distribution-demo)。

### 1.1 新建父项目

![](/imgs/spring/springcloud/springcloud-demo-1.png)

### 1.2 POM 添加配置项

```xml
<packaging>pom</packaging>
```

> 因为是父项目，不需要打包

### 1.3 创建子项目

#### 1.3.1 创建订单模块

![](/imgs/spring/springcloud/springcloud-demo-2.png)

- POM

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

- application.yaml

```yaml
server:
  port: 8081
```

- `OrderConfig`

```java
package com.ice.order.config;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class OrderConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        RestTemplate restTemplate = builder.build();
        return restTemplate;
    }
}
```

- **OrderController**

```java
package com.ice.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/add")
    public String add() {
        System.out.println("下单成功");
        String msg = restTemplate.getForObject("http://localhost:8082/stock/reduce", String.class);
        return "Hello World! " + msg;
    }
}
```

#### 1.3.2 创建库存模块

![](/imgs/spring/springcloud/springcloud-demo-3.png)

- POM

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>
```

- application.yaml

```yaml
server:
  port: 8082
```

- **StockController**

```java
package com.ice.stock.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stock")
public class StockController {

    @GetMapping("/reduce")
    public String reduce() {
        System.out.println("扣减库存");
        return "扣减库存";
    }

}
```

### 1.4 启动测试

![](/imgs/spring/springcloud/springcloud-demo-4.png)

1. 启动库存模块
2. 启动订单模块

3. 浏览器访问 `http://localhost:8081/order/add`

可以看到，网页上显示：

![](/imgs/spring/springcloud/springcloud-demo-5.png)

控制台输出：

![](/imgs/spring/springcloud/springcloud-demo-6.png)

## 2. Spring Cloud Alibaba 环境搭建

> 本部分代码见 [**springcloud-distribution-demo**](https://github.com/dreaming-coder/springcloud-distribution-demo/tree/alibaba)。

我们在上面项目的基础上，默认使用 `parent` 标签作为默认的管理器，现在要引入uSpring Cloud Alibaba，需要用另一种方式同时使用这两个版本管理器。

直接新建一个分支 `alibaba`，在上面的项目基础上进行修改。

在父项目 POM 文件中添加如下配置：

```xml
<dependencyManagement>
    <dependencies>
        <!-- Spring Boot -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-parent</artifactId>
            <version>2.7.2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!-- Spring Cloud -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR12</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!-- Spring Cloud Alibaba-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.7.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

> 此时 `parent` 标签及其子标签可以删除了。

此时环境就搭建好了，下面只要引入各自依赖就好。

