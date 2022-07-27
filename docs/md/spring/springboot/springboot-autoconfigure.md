# SpringBoot 基础 - 自动配置

> 本文介绍 SpringBoot 在 Spring 和 Spring MVC 上新增的一些注解配置方法，需要参考前面 Spring 基础系列文章。

> 其他注解方法见 [Spring 基础 - 控制反转 (IoC)](/md/spring/spring-ioc.html)。

## 1. 组件注册

在 SpringBoot 中，主要对 `@Conditional` 注解进行了拓展，其继承树为：

![](/imgs/spring/springboot/springboot-autoconfigure-1.png)

> - `@ConditionalOnBean`：当容器中存在某些 bean 的时候才执行
> - `@ConditionalOnMissingBean`：当容器中没有某些 bean 的时候才执行
> - `@ConditionalOnClass`：当容器中有某个类的时候才执行
> - `@ConditionalOnMissingClass`：当容器中没有某个类的时候才执行
> - `@ConditionalOnResource`：当存在某些资源文件的时候才执行
> - `@ConditionalOnJava`：在指定的 Java 版本号下才执行
> - `@ConditionalOnWebApplication`：当项目是一个 web 应用的时候才执行
> - `@ConditionalOnNotWebApplication`：当项目不是一个 web 应用的时候才执行
> - `@ConditionalOnProperty`：当容器中存在某些属性的时候才执行
> - `@ConditionalOnSingleCandidate`：当某些 bean 是单实例或者多实例但是存在 `@Primary` 注解标注的 bean 的时候才执行

## 2. 配置绑定

这个比较重要，个人认为是 SpringBoot 简化的核心，它利用 SPI 机制加载预先配置好的组件。

### 2.1 @Component + @ConfigurationProperties

我们写一个 `Car` 类

```java
@Component  // 只有在容器中的组件，才会拥有 SpringBoot 容器提供的强大功能
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private Integer price;
}
```

配置文件这样写：

```yaml
mycar:
	brand: BYD
	price: 100000
```

上面的含义是，将 `Car` 类注册到容器中，并且通过注解 `@ConfigurationProperties` 绑定配置文件中前缀为 `mycar` 的属性值到该组件的属性中.

> 注意，配置文件中的前缀之后的属性名必须和类中的属性名一致！

我们编写一个 **Controller** 来测试一下：

```java
@RestController
public class CarController {
    @Autowired
    Car car;  // 因为上面已经通过注解将该组件注册到容器中了，所以可以直接取

    @RequestMapping("/car")
    public Car car() {
        return car;
    }
}
```

网页显示：

![](/imgs/spring/springboot/springboot-autoconfigure-2.png)

### 2.2 @EnableConfigurationProperties + @ConfigurationProperties

此时 Car 类这样写：

```java
@ConfigurationProperties(prefix = "mycar")
public class Car {
    private String brand;
    private Integer price;
}
```

配置文件需要加一个注解，来指定哪个类开启配置绑定功能：

```java
@Configuration
// 1. 开启 Car 配置绑定功能
// 2. 把 Car 组件注册到容器中
@EnableConfigurationProperties(Car.class)
public class MyConfig {

}
```

## 3. 静态资源访问

### 3.1 静态资源目录

SpringBoot 中的静态资源目录和 Spring MVC 中的不太一样，之前只能声明一个静态资源目录，而在 SpringBoot 中可以声明多个：**当前项目类路径下： `/static`、`/public`、`/resources`、`META/resources` 都默认作为静态资源目录**。

如下示例：

![](/imgs/spring/springboot/springboot-autoconfigure-3.png)

那如果静态资源路径和请求路径冲突时会如何？

```java
@RestController
public class HelloController {
    @RequestMapping("/bug.jpg")
    public String hello() {
        return "aaaaa";
    }
}
```

访问 http://localhost:8080/bug.jpg 时，界面如下：

![](/imgs/spring/springboot/springboot-autoconfigure-4.png)

> 动态请求默认也会拦截所有请求，请求进来，先去找 `Controller` 看能不能处理，不能处理的所有请求又都交给静态资源处理器。 静态资源就回去上面的四个静态目录中查找，静态资源也找不到，就会返回 404。

我们还可以改变默认的静态资源目录位置：

```yaml
spring:
  web:
    resources:
      static-locations: classpath:/haha
      # static-locations: [classpath:/haha, classpath:/hehe/] 设置多个静态资源目录时的列表写法
```

> 修改前缀要慎重，确保不影响正常请求访问

### 3.2 静态资源访问前缀

> 默认无前缀。

```yaml
spring:
  mvc:
    static-path-pattern: /res/**
```

以后访问地址就是： http://localhost:8080/res/bug.jpg

> 方便拦截器编写，放行带访问前缀的请求。

### 3.3 自定义 Favicon

将网站图标命名为 `favicon.ico` 放到静态资源目录中，会自动解析该图标为站点图标。

> 最好编译之前 maven clean 一下，不然有时候会有改了但是不起作用的情况

