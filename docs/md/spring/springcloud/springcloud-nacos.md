# Spring Cloud 组件 - Nacos

## 1. 什么是 Nacos

官方：一个更易于构建云原生应用的动态**服务发现**（Nacos Discovery）、**配置管理**（Nacos Config）和服务管理平台。

Nacos 的关键特性包括：

- 服务发现和服务健康监测
- 动态配置服务
- 动态 DNS 服务
- 服务及其元数据管理

## 2. Nacos 注册中心

### 2.1 注册中心演变及其设计思想

![](/imgs/spring/springcloud/springcloud-nacos-1.png)

### 2.2 核心功能

[Nacos discovery](https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-discovery)

- **服务注册**：Nacos Client 会通过发送 REST 请求的方式向 Nacos Server 注册自己的服务，提供自身的元数据，比如ip地址、端口等信息。Nacos Server 接收到注册请求后，就会把这些元数据信息存储在一个双层的内存 Map 中。

- **服务心跳**：在服务注册后，Nacos Client 会维护一个定时心跳来持续通知 Nacos Server，说明服务一直处于可用状态，防止被剔除。默认 5s 发送一次心跳。

- **服务同步**：Nacos Server 集群之间会互相同步服务实例，用来保证服务信息的一致性。

- **服务发现**：服务消费者（Nacos Client）在调用服务提供者的服务时，会发送一个 REST 请求给 Nacos Server，获取上面注册的服务清单，并且缓存在 Nacos Client 本地，同时会在 Nacos Client 本地开启一个定时任务定时拉取服务端最新的注册表信息更新到本地缓存。

- **服务健康检查**：Nacos Server 会开启一个定时任务用来检查注册服务实例的健康情况，对于超过 15s 没有收到客户端心跳的实例会将它的 healthy 属性置为 false (客户端服务发现时不会发现)，如果某个实例超过 30s 没有收到心跳，直接剔除该实例(被剔除的实例如果恢复发送心跳则会重新注册)。

**主流的注册中心**：

> CAP：Consistency（**一致性**）、Availability（**可用性**）、Partition tolerance（**分区容错性**）。

![](/imgs/spring/springcloud/springcloud-nacos-2.png)

### 2.3 Nacos Server 部署

首先在 SpringCloud Alibaba 的 GitHub 仓库的 wiki 中查看对应的组件版本，然后从 Nacos 的发布版本中找寻下载

#### 2.3.1 单机模式

解压 Nacos 压缩包，进入 `nacos/bin` 文件夹中，执行 `startup.sh -m standalone` 单机启动 Nacos，也可以修改 startup.sh 中的默认启动方式：

![](/imgs/spring/springcloud/springcloud-nacos-3.png)

访问 Nacos 管理端：`http://xx.xx.xx.xx:8848/nacos`，默认的用户名密码是 `nocas`/`nocas`

![](/imgs/spring/springcloud/springcloud-nacos-4.png)

#### 2.3.2 Client

新建一个分支 `nacos-start-demo`，在两个模块的 POM 文件中，添加依赖：

```xml
<!-- Nacos 服务注册发现-->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

配置文件中添加（以 order 为例）：

```yaml
#应用名称（nacos会将该名称当成服务名称）
spring:
  application:
    name: order-service
  cloud:
    nacos:
      server-addr: xx.xx.xx.xx:8848
      # 这些即使不配也有默认值
      discovery:
        username: nacos
        password: nacos
        namespace: public
```

此时分别启动两个项目，刷新网页 Nacos 面板的服务列表，可以看到服务已经注册上去了：

![](/imgs/spring/springcloud/springcloud-nacos-5.png)

**修改服务调用方式**：

```java
@GetMapping("/add")
public String add() {
    System.out.println("下单成功");
    String msg = restTemplate.getForObject("http://stock-service/stock/reduce", String.class);
    return "Hello World! " + msg;
}
```

启动应用后，会报 500，要在 `RestTemplate` 上加上 `@LoadBalance` 注解：

```java
public class OrderConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        RestTemplate restTemplate = builder.build();
        return restTemplate;
    }
}
```

Nacos 默认的负载均衡使用的是 ribbon，负载均衡的方式是轮询。

开启两个 stock 服务，验证是否是轮询：

![](/imgs/spring/springcloud/springcloud-nacos-6.png)

![](/imgs/spring/springcloud/springcloud-nacos-7.png)

![](/imgs/spring/springcloud/springcloud-nacos-8.png)

![](/imgs/spring/springcloud/springcloud-nacos-9.png)

修改代码，看 order 服务调用的是哪一个服务：

```java
@RestController
@RequestMapping("/stock")
public class StockController {

    @Value("${server.port}")
    private String port;

    @GetMapping("/reduce")
    public String reduce() {
        System.out.println("扣减库存");
        return "扣减库存 " + port;
    }

}
```

重启所有服务，访问两次 http://127.0.0.1:8081/order/add，即可看到2个不同端口的返回结果。

## 3.







