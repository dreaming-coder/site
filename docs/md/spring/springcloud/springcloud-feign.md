# Spring Cloud 组件 - Feign

## 1. 什么是 Feign

Feign 是 Netflix 开发的声明式、模板化的 HTTP 客户端，其灵感来自 Retrofit、JAXRS-2.0 以及 WebSocket。Feign 可帮助我们更加便捷、优雅地调用 HTTP API。

Feign支持多种注解，例如 Feign 自带的注解或者 JAX-RS 注解等。

**Spring Cloud OpenFeign 对 Feign 进行了增强，使其支持 Spring MVC 注解，另外还整合了 Ribbon 和 Nacos，从而使得 Feign 的使用更加方便。**

Feign 可以做到**使用  HTTP  请求远程服务时就像调用本地方法一样的体验**，开发者完全感知不到这是远程方法，更感知不到这是个 HTTP 请求。它像 Dubbo 一样，consumer 直接调用接口方法调用 provider，而不需要通过常规的 Http Client 构造请求再解析返回数据。它解决了让开发者调用远程接口就跟调用本地方法一样，无需关注与远程的交互细节，更无需关注分布式环境开发。

## 2. Spring Cloud Alibaba 整合 OpenFeign

### 2.1 消费者端引入依赖

```xml
<!-- openfeign 远程调用 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

### 2.2 编写调用接口 + @FeignClient 注解

```java
package com.ice.order.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;


// name：服务名；path：对应Controller的RequestMapping地址
@FeignClient(name = "stock-service", path = "/stock")
public interface StockClient {

    // 声明需要调用的rest接口对应的方法
    // 可服务提供者方法声明一致
    @GetMapping("/reduce")
    String reduce() ;

}
```

### 2.3 在启动类上添加@EnableFeignClients注解

```java
@SpringBootApplication
@EnableFeignClients
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
}
```

### 2.4 直接调用

```java
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private StockClient stockClient;

    @GetMapping("/add")
    public String add() {
        System.out.println("下单成功");
//        String msg = restTemplate.getForObject("http://stock-service/stock/reduce", String.class);
        String msg = stockClient.reduce();
        return "Hello Feign! " + msg;
    }
}
```

> 此时可以把配置类中的 RestTemplate 去除了，已经被 Feign 替代了。

## 3. 日志配置

有时候我们遇到 Bug，比如接口调用失败、参数没收到等问题，或者想看看调用性能，就需要配置 Feign 的日志了，以此让 Feign 把请求信息输出来。

**定义一个配置类，指定日志级别**：

```java
// 注意： 此处配置@Configuration注解就会全局生效，如果想指定对应微服务生效，就不能配置
public class FeignConfig {
    /**
     * 日志级别
     *
     * @return
     */
    @Bean
    public Logger.Level feignLoggerLevel() {
        return Logger.Level.FULL;
    }
}
```

通过源码可以看到日志等级有 4 种，分别是：

- **NONE**【性能最佳，适用于生产】：不记录任何日志（默认值）。
- **BASIC**【适用于生产环境追踪问题】：仅记录请求方法、URL、响应状态代码以及执行时间。
- **HEADERS**：记录 BASIC 级别的基础上，记录请求和响应的 header。
- **FULL**【比较适用于开发及测试环境定位问题】：记录请求和响应的 header、body 和元数据。

**如果希望进行局部配置，可以在 `@FeignClient` 注解中指定使用的配置类**：

![](/imgs/spring/springcloud/springcloud-feign-1.png)

**因为 spring Boot 默认的日志级别是 info，需要在 yaml 配置文件中执行 dubug 的日志级别才能正常输出日志**：

```yaml
logging:
  level:
    feignclient接口包路径: debug
```

