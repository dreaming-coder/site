# Spring Cloud 组件 - Ribbon

> 本文代码见 [**springcloud-distribution-demo**](https://github.com/dreaming-coder/springcloud-distribution-demo/tree/ribbon-demo)。

## 1. 什么是 Ribbon

目前主流的负载方案分为以下两种：

- 集中式负载均衡，在消费者和服务提供方中间使用独立的代理方式进行负载，有硬件的（比如 F5），也有软件的（比如 Nginx）。

- 客户端根据自己的请求情况做负载均衡，Ribbon 就属于客户端自己做负载均衡。

Spring Cloud  Ribbon 是基于 Netflix Ribbon 实现的一套客户端的负载均衡工具，Ribbon客户端组件提供一系列的完善的配置，如超时，重试等。通过 Load Balancer 获取到服务提供的所有机器实例，Ribbon 会自动基于某种规则(轮询，随机)去调用这些服务。Ribbon 也可以实现我们自己的负载均衡算法。

### 1.1 客户端的负载均衡

例如 Spring Cloud 中的 Ribbon，客户端会有一个服务器地址列表，在发送请求前通过负载均衡算法选择一个服务器，然后进行访问，这是客户端负载均衡；即在客户端就进行负载均衡算法分配。

![](/imgs/spring/springcloud/springcloud-ribbon-1.png)

### 1.2 服务端的负载均衡

例如 Nginx，通过 Nginx 进行负载均衡，先发送请求，然后通过负载均衡算法，在多个服务器之间选择一个进行访问；即在服务器端再进行负载均衡算法分配。

![](/imgs/spring/springcloud/springcloud-ribbon-2.png)

### 1.3  常见负载均衡算法

- 随机，通过随机选择服务进行执行，一般这种方式使用较少
- 轮询，负载均衡默认实现方式，请求来之后排队处理
- 加权轮询，通过对服务器性能的分型，给高配置，低负载的服务器分配更高的权重，均衡各个服务器的压力
- 地址 hash，通过客户端请求的地址的 hash 值取模映射进行服务器调度（ip --->hash）
- 最小连接数，即使请求均衡了，压力不一定会均衡，最小连接数法就是根据服务器的情况，比如请求积压数等参数，将请求分配到当前压力最小的服务器上。

## 2. Nacos 使用 Ribbon

1. **nacos-discovery 依赖了 ribbon，可以不用再引入 ribbon 依赖**

![](/imgs/spring/springcloud/springcloud-ribbon-3.png)

2. **添加 `@LoadBalanced` 注解**

```java
@Configuration
public class OrderConfig {
    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        RestTemplate restTemplate = builder.build();
        return restTemplate;
    }
}
```

3. **修改 Controller**

```java
@Autowired
private RestTemplate restTemplate;

@GetMapping("/add")
public String add() {
    System.out.println("下单成功");
    // 这里使用服务名 stock-service，负载均衡器来决定调用哪个
    String msg = restTemplate.getForObject("http://stock-service/stock/reduce", String.class);
    return "Hello World! " + msg;
}
```

## 3. Ribbon 负载均衡策略

![](/imgs/spring/springcloud/springcloud-ribbon-4.png)

- **IRule**

  这是所有负载均衡策略的父接口，里边的核心方法就是 `choose` 方法，用来选择一个服务实例。

- **AbstractLoadBalancerRule**

  `AbstractLoadBalancerRule` 是一个抽象类，里边主要定义了一个 `ILoadBalancer`，这里定义它的目的主要是辅助负责均衡策略选取合适的服务端实例。

- **RandomRule**

  看名字就知道，这种负载均衡策略就是**随机选择一个服务实例**，看源码我们知道，在 `RandomRule` 的无参构造方法中初始化了一个 `Random` 对象，然后在它重写的 `choose` 方法又调用了 `choose(ILoadBalancer lb, Object key)` 这个重载的 `choose` 方法，在这个重载的 `choose` 方法中，每次利用 `random` 对象生成一个不大于服务实例总数的随机数，并将该数作为下标所以获取一个服务实例。

- **RoundRobinRule**

  `RoundRobinRule` 这种负载均衡策略叫做线性**轮询负载均衡策略**。这个类的 `choose(ILoadBalancer lb, Object key)` 函数整体逻辑是这样的：开启一个计数器 count，在 while 循环中遍历服务清单，获取清单之前先通过 `incrementAndGetModulo` 方法获取一个下标，这个下标是一个不断自增长的数先加 1 然后和服务清单总数取模之后获取到的（所以这个下标从来不会越界），拿着下标再去服务清单列表中取服务，每次循环计数器都会加 1，如果连续 10 次都没有取到服务，则会报一个警告 No available alive servers after 10 tries from load balancer: XXXX。

- **RetryRule**（在轮询的基础上进行重试）

  看名字就知道这种负载均衡策略带有**重试**功能。首先 `RetryRule` 中又定义了一个 `subRule`，它的实现类是 `RoundRobinRule`，然后在 `RetryRule` 的 `choose(ILoadBalancer lb, Object key)` 方法中，每次还是采用 `RoundRobinRule` 中的 `choose` 规则来选择一个服务实例，如果选到的实例正常就返回，如果选择的服务实例为 `null` 或者已经失效，则在失效时间 deadline 之前不断的进行重试（重试时获取服务的策略还是 `RoundRobinRule` 中定义的策略），如果超过了 deadline 还是没取到则会返回一个 `null`。

- **WeightedResponseTimeRule**（权重 --- nacos 的 NacosRule ，Nacos 还扩展了一个自己的基于配置的权重扩展）

  `WeightedResponseTimeRule` 是 `RoundRobinRule` 的一个子类，在 `WeightedResponseTimeRule` 中对 `RoundRobinRule` 的功能进行了扩展，`WeightedResponseTimeRule` 中会根据每一个实例的运行情况来给计算出该实例的一个**权重**，然后在挑选实例的时候则根据权重进行挑选，这样能够实现更优的实例调用。`WeightedResponseTimeRule` 中有一个名叫 `DynamicServerWeightTask` 的定时任务，默认情况下每隔 30 秒会计算一次各个服务实例的权重，权重的计算规则也很简单，**如果一个服务的平均响应时间越短则权重越大，那么该服务实例被选中执行任务的概率也就越大**。

- **ClientConfigEnabledRoundRobinRule**

  `ClientConfigEnabledRoundRobinRule` 选择策略的实现很简单，内部定义了 `RoundRobinRule`，`choose` 方法还是采用了 `RoundRobinRule` 的 `choose` 方法，所以它的选择策略**和 `RoundRobinRule` 的选择策略一致**，不赘述。

- **BestAvailableRule**

  `BestAvailableRule` 继承自 `ClientConfigEnabledRoundRobinRule`，它在 `ClientConfigEnabledRoundRobinRule` 的基础上主要增加了根据 `loadBalancerStats` 中保存的服务实例的状态信息来**过滤掉失效的服务实例的功能，然后顺便找出并发请求最小的服务实例来使用。**然而 `loadBalancerStats` 有可能为 `null`，如果 `loadBalancerStats` 为 `null`，则 `BestAvailableRule` 将采用它的父类即 `ClientConfigEnabledRoundRobinRule` 的服务选取策略（线性轮询）。

- **ZoneAvoidanceRule** （**默认规则**，复合判断 server 所在区域的性能和 server 的可用性选择服务器。）

  `ZoneAvoidanceRule` 是 `PredicateBasedRule` 的一个实现类，只不过这里多一个过滤条件，`ZoneAvoidanceRule` 中的过滤条件是以 `ZoneAvoidancePredicate` 为主过滤条件和以 `AvailabilityPredicate` 为次过滤条件组成的一个叫做 `CompositePredicate` 的组合过滤条件，过滤成功之后，继续采用线性轮询(**`RoundRobinRule`**)的方式从过滤结果中选择一个出来。

- **AvailabilityFilteringRule**（先过滤掉故障实例，再选择并发较小的实例）

  过滤掉一直连接失败的被标记为 **circuit tripped** 的后端 Server，并过滤掉那些高并发的后端 Server 或者使用一个 `AvailabilityPredicate` 来包含过滤 server 的逻辑，其实就是检查 status 里记录的各个 Server 的运行状态。

## 4. 修改默认的负载均衡策略

在 nacos-start-demo 分支的基础上，新建一个分支 ribbon-demo。

- 方式一：**配置类**

```java
package com.ice.ribbon;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RandomRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RibbonRandomRuleConfig {

    @Bean
    public IRule iRule(){
        return new RandomRule();
    }
}
```

> **注意：此处有坑。**不能写在 `@SpringbootApplication` 注解的 `@CompentScan` 扫描得到的地方，否则自定义的配置类就会被所有的 `RibbonClients` 共享。 不建议这么使用，推荐 yaml 方式。

```java
@SpringBootApplication
@RibbonClients(value = {
    @RibbonClient(name = "stock-service", configuration = RibbonRandomRuleConfig.class)
})
public class OrderApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderApplication.class, args);
    }
}
```

- 方式二：**配置文件**

先注释掉 `@RibbonClients` 注解，避免冲突。

在配置文件中添加：

```yaml
stock-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule
```

然后重启服务即可。

## 5. 自定义负载均衡策略

```java
package com.ice.order.rule;

import com.netflix.client.config.IClientConfig;
import com.netflix.loadbalancer.AbstractLoadBalancerRule;
import com.netflix.loadbalancer.ILoadBalancer;
import com.netflix.loadbalancer.Server;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class CustomRule extends AbstractLoadBalancerRule {
    @Override
    public void initWithNiwsConfig(IClientConfig iClientConfig) {

    }

    @Override
    public Server choose(Object o) {
        // 获得当前请求服务的实例
        ILoadBalancer loadBalancer = this.getLoadBalancer();
        List<Server> reachableServers = loadBalancer.getReachableServers();
        // 生成随机数
        int random = ThreadLocalRandom.current().nextInt(reachableServers.size());
        // 获取指定的server
        Server server = reachableServers.get(random);
        
        return server;
    }
}
```

在 yaml 中配置全限定包名：

```yaml
stock-service:
  ribbon:
    NFLoadBalancerRuleClassName: com.ice.order.rule.CustomRule
```

## 6. 饥饿加载

在配置文件中配置：

```yaml
ribbon:
  eager-load:
    # 开启ribbon饥饿加载
    enabled: true
    # 配置stock-service使用ribbon饥饿加载，多个使用逗号分隔
    clients: stock-service
```

