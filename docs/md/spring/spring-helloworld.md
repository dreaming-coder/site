# Spring 基础 - Hello World

> 本文转自 [Spring简单例子引入Spring要点](https://www.pdai.tech/md/spring/spring-x-framework-helloworld.html)。 —— @pdai

## 1. Spring 框架如何应用

> 上文中，我们展示了 Spring Framework 的组件, 这里对于开发者来说有几个问题：
>
> 1. 首先，对于 Spring 进阶，直接去看 IOC 和 AOP，存在一个断层，所以需要整体上构建对 Spring 框架认知上进一步深入，这样才能构建知识体系。
> 2. 其次，很多开发者入门都是从 Spring Boot 开始的，对 Spring 整体框架底层，以及发展历史不是很了解； 特别是对于一些老旧项目维护和底层 bug 分析没有全局观。
> 3. 再者，Spring 代表的是一种框架设计理念，需要全局上理解 Spring Framework 组件是如何配合工作的，需要理解它设计的初衷和未来趋势。

如下是官方在解释 Spring 框架的常用场景的图：

![](/imgs/spring/helloworld-1.png)

## 2. Spring 版 Hello World

> 结合上面的使用场景，**设计一个查询用户的案例的两个需求**，来看 Spring 框架帮我们简化了什么开发工作:
>
> 1. **查询用户数据** - 来看 DAO + POJO -> Service 的初始化和装载
> 2. **给所有Service的查询方法记录日志**

> 本部分代码见 [**spring-framework-demo-helloworld-xml**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-helloworld-xml)。

- **引入 Spring 框架的 POM 依赖，以及查看这些依赖之间的关系**{.ul-title}

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <project xmlns="http://maven.apache.org/POM/4.0.0"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <parent>
          <artifactId>ice-spring-demos</artifactId>
          <groupId>com.ice</groupId>
          <version>1.0-SNAPSHOT</version>
      </parent>
      <modelVersion>4.0.0</modelVersion>
  
      <artifactId>spring-framework-demo-helloworld-xml</artifactId>
  
      <properties>
          <maven.compiler.source>8</maven.compiler.source>
          <maven.compiler.target>8</maven.compiler.target>
          <spring.version>5.3.20</spring.version>
          <aspectjweaver.version>1.9.9.1</aspectjweaver.version>
      </properties>
  
      <dependencies>
          <dependency>
              <groupId>org.springframework</groupId>
              <artifactId>spring-context</artifactId>
              <version>${spring.version}</version>
          </dependency>
          <dependency>
              <groupId>org.springframework</groupId>
              <artifactId>spring-core</artifactId>
              <version>${spring.version}</version>
          </dependency>
          <dependency>
              <groupId>org.springframework</groupId>
              <artifactId>spring-beans</artifactId>
              <version>${spring.version}</version>
          </dependency>
          <dependency>
              <groupId>org.aspectj</groupId>
              <artifactId>aspectjweaver</artifactId>
              <version>${aspectjweaver.version}</version>
          </dependency>
      </dependencies>
  </project>
  ```

  ![](/imgs/spring/helloworld-2.png)

- **POJO - User**{.ul-title}

  ```java
  package com.ice.springframework.entity;
  
  public class User {
      private String name;
      private int age;
  
      public User(String name, int age) {
          this.name = name;
          this.age = age;
      }
  
      public String getName() {
          return name;
      }
  
      public void setName(String name) {
          this.name = name;
      }
  
      public int getAge() {
          return age;
      }
  
      public void setAge(int age) {
          this.age = age;
      }
  }
  ```

- **DAO 获取 POJO， UserDaoServiceImpl (mock 数据)**{.ul-title}

  ```java
  package com.ice.springframework.dao;
  
  import com.ice.springframework.entity.User;
  
  import java.util.Collections;
  import java.util.List;
  
  public class UserDaoImpl {
      public UserDaoImpl() {
      }
  
      public List<User> findUserList() {
          return Collections.singletonList(new User("ice", 16));
      }
  }
  ```

- **业务层 UserServiceImpl（调用DAO层）**{.ul-title}

  ```java
  package com.ice.springframework.service;
  
  import com.ice.springframework.dao.UserDaoImpl;
  import com.ice.springframework.entity.User;
  
  import java.util.List;
  
  public class UserServiceImpl {
      private UserDaoImpl userDao;
  
      public void setUserDao(UserDaoImpl userDao) {
          this.userDao = userDao;
      }
  
      public UserServiceImpl() {
      }
  
      public List<User> findUserList() {
          return this.userDao.findUserList();
      }
  }
  ```

- **拦截所有 service 中的方法，并输出记录**{.ul-title}

  ```java
  package com.ice.springframework.aspect;
  
  import org.aspectj.lang.ProceedingJoinPoint;
  import org.aspectj.lang.annotation.Around;
  import org.aspectj.lang.annotation.Aspect;
  import org.aspectj.lang.reflect.MethodSignature;
  
  import java.lang.reflect.Method;
  
  @Aspect
  public class LogAspect {
      /**
       * aspect for every methods under service package.
       */
      @Around("execution(* com.ice.springframework.service.*.*(..))")
      public Object businessService(ProceedingJoinPoint pjp) throws Throwable {
          // get attribute through annotation
          Method method = ((MethodSignature) pjp.getSignature()).getMethod();
          System.out.println("execute method: " + method.getName());
  
          // continue to process
          return pjp.proceed();
      }
  }
  ```

- **创建 spring.xml**{.ul-title}

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:context="http://www.springframework.org/schema/context"
         xmlns:aop="http://www.springframework.org/schema/aop"
         xsi:schemaLocation="
              http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
              http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
              http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
  
      <!--  注册 bean  -->
      <bean id="userDao" class="com.ice.springframework.dao.UserDaoImpl"/>
  
      <bean id="userService" class="com.ice.springframework.service.UserServiceImpl">
          <property name="userDao" ref="userDao"/>
      </bean>
  
      <bean id="logAspect" class="com.ice.springframework.aspect.LogAspect"/>
  
      <!--  开启包扫描  -->
      <context:component-scan base-package="com.ice.springframework"/>
  
      <!--  开启AOP  -->
      <aop:aspectj-autoproxy/>
  </beans>
  ```

- **组装App**{.ul-title}

  ```java
  package com.ice.springframework;
  
  import com.ice.springframework.entity.User;
  import com.ice.springframework.service.UserServiceImpl;
  import org.springframework.context.ApplicationContext;
  import org.springframework.context.support.ClassPathXmlApplicationContext;
  
  import java.util.List;
  
  public class App {
      public static void main(String[] args) {
          // create and configure beans
          ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
          // retrieve configured instance
          UserServiceImpl service = applicationContext.getBean("userService", UserServiceImpl.class);
          // use configured instance
          List<User> userList = service.findUserList();
          // print info from beans
          userList.forEach(a -> System.out.println(a.getName() + "," + a.getAge()));
      }
  }
  ```

- **整体结构和运行 App**{.ul-title}

  ![](/imgs/spring/helloworld-3.png)

## 3. Spring 核心要点

### 3.1 控制反转 - IOC

> 来看第一个需求：**查询用户**（service 通过调用 dao 查询 pojo)，本质上如何创建 User/Dao/Service 等。

- **如果没有 Spring 框架，我们需要自己创建 User/Dao/Service 等**，比如：

  ```java
  UserDaoImpl userDao = new UserDaoImpl();
  UserSericeImpl userService = new UserServiceImpl();
  userService.setUserDao(userDao);
  List<User> userList = userService.findUserList();
  ```

- **有了 Spring 框架，可以将原有 Bean 的创建工作转给框架，需要用时从 Bean 的容器中获取即可，这样便简化了开发工作**

  > Bean的创建和使用分离了。

  ```java
  // create and configure beans
  ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
  // retrieve configured instance
  UserServiceImpl service = applicationContext.getBean("userService", UserServiceImpl.class);
  // use configured instance
  List<User> userList = service.findUserList();
  ```

更进一步，**你便能理解为何会有如下的知识点了**：{.ul-title}

1. Spring 框架管理这些 Bean 的创建工作，即由用户管理 Bean 转变为框架管理 Bean，这个就叫**控制反转 - Inversion of Control (IoC)**
2. Spring 框架托管创建的 Bean 放在哪里呢？ 这便是 **IoC Container**
3. Spring 框架为了更好让用户配置 Bean，必然会引入**不同方式来配置 Bean？ 这便是 xml 配置，Java 配置，注解配置**等支持
4. Spring 框架既然接管了 Bean 的生成，必然需要**管理整个 Bean 的生命周期**等
5. 应用程序代码从 IoC Container 中获取依赖的 Bean，注入到应用程序中，这个过程叫 **依赖注入(Dependency Injection，DI)** ； 所以说控制反转是通过依赖注入实现的，其实它们是同一个概念的不同角度描述。通俗来说就是 **IoC 是设计思想，DI 是实现方式**
6. 在依赖注入时，有哪些方式呢？这就是构造器方式，`@Autowired`，`@Resource`，`@Qualifier`... 同时 Bean 之间存在依赖（可能存在先后顺序问题，以及**循环依赖问题**等）

###  3.2 面向切面 - AOP

> 来看第二个需求：**给 Service 所有方法调用添加日志**（调用方法时)，本质上是解耦问题。

- **如果没有 Spring 框架，我们需要在每个 service 的方法中都添加记录日志的方法**

  ```java
  public List<User> findUserList() {
      System.out.println("execute method findUserList");
      return this.userDao.findUserList();
  }
  ```

- **有了 Spring 框架，通过 `@Aspect` 注解 定义了切面，这个切面中定义了拦截所有 service 中的方法，并记录日志；可以明显看到，框架将日志记录和业务需求的代码解耦了，不再是侵入式的了**

  ```java
  @Around("execution(* com.ice.springframework.service.*.*(..))")
  public Object businessService(ProceedingJoinPoint pjp) throws Throwable {
      // get attribute through annotation
      Method method = ((MethodSignature) pjp.getSignature()).getMethod();
      System.out.println("execute method: " + method.getName());
  
      // continue to process
      return pjp.proceed();
  }
  ```

更进一步，**你便能理解为何会有如下的知识点了**：{.ul-title}

1. Spring 框架通过定义切面，通过拦截切点实现了不同业务模块的解耦，这个就叫**面向切面编程 - Aspect Oriented Programming (AOP)**
2. 为什么 `@Aspect` 注解使用的是 aspectj 的 jar 包呢？这就引出了 **Aspect4J 和 Spring AOP 的历史渊源**，只有理解了 Aspect4J 和 Spring 的渊源才能理解有些注解上的兼容设计
3. 如何支持**更多拦截方式**来实现解耦， 以满足更多场景需求呢？ 这就是` @Around`， `@Pointcut`... 等的设计
4. 那么 Spring 框架又是如何实现 AOP 的呢？ 这就引入**代理技术，分静态代理和动态代理**，动态代理又包含 JDK 代理和 CGLIB 代理等

## 4. Spring 框架设计如何逐步简化开发的

> 通过上述的框架介绍和例子，已经初步知道了 Spring 设计的两个大的要点：IOC 和 AOP。从框架的设计角度而言，更为重要的是简化开发，比如提供更为便捷的配置 Bean 的方式，直至零配置（即约定大于配置）。这里我将通过 Spring 历史版本的发展，和 SpringBoot 的推出等，来帮你理解 Spring 框架是如何逐步简化开发的。

### 4.1 Java Config 改造

> 本部分代码见 [**spring-framework-demo-helloworld-java**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-helloworld-java)。

在前文的例子中， 是通过 xml 配置方式实现的，这种方式实际上比较麻烦，这里通过 Java Config 进行改造：

- User，UserDaoImpl, UserServiceImpl，LogAspect不用改
- 将原通过 .xml 配置转换为 Java Config

```java
package com.ice.springframework.config;

import com.ice.springframework.aspect.LogAspect;
import com.ice.springframework.dao.UserDaoImpl;
import com.ice.springframework.service.UserServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class BeansConfig {

    @Bean("userDao")
    public UserDaoImpl userDao(){
        return new UserDaoImpl();
    }

    @Bean("userService")
    public UserServiceImpl userService(){
        UserServiceImpl userService = new UserServiceImpl();
        userService.setUserDao(userDao());
        return userService;
    }

    @Bean("logAspect")
    public LogAspect logAspect() {
        return new LogAspect();
    }
}
```

- **在 App 中加载 BeansConfig 的配置**

```java
package com.ice.springframework;

import com.ice.springframework.config.BeansConfig;
import com.ice.springframework.entity.User;
import com.ice.springframework.service.UserServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class App {
    public static void main(String[] args) {
        // create and configure beans
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeansConfig.class);
        // retrieve configured instance
        UserServiceImpl service = applicationContext.getBean("userService", UserServiceImpl.class);
        // use configured instance
        List<User> userList = service.findUserList();
        // print info from beans
        userList.forEach(a -> System.out.println(a.getName() + "," + a.getAge()));
    }
}
```

- **整体结构和运行 App**

![](/imgs/spring/helloworld-4.png)

### 4.2 注解驱动改造

更进一步，Java 5 开始提供注解支持，Spring 2.5 开始完全支持基于注解的配置并且也支持 JSR250 注解。在 Spring 后续的版本发展倾向于通过注解和 Java 配置结合使用。

> 本部分代码见 [**spring-framework-demo-helloworld-annotation**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-helloworld-annotation)。

- **BeanConfig 不再需要 Java 配置，但要添加扫描包的注解**

```java
package com.ice.springframework.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
@ComponentScan("com.ice.springframework")
public class BeansConfig {

}
```

- **UserDaoImpl 增加了 `@Repository` 注解**

```java
package com.ice.springframework.dao;

import com.ice.springframework.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository("userDao")
public class UserDaoImpl {
    public UserDaoImpl() {
    }

    public List<User> findUserList() {
        return Collections.singletonList(new User("ice", 16));
    }
}
```

- **UserServiceImpl 增加了 `@Service` 注解，并通过 `@Autowired` 注入 userDao**.

```java
package com.ice.springframework.service;

import com.ice.springframework.dao.UserDaoImpl;
import com.ice.springframework.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl {
    private UserDaoImpl userDao;

    public void setUserDao(@Autowired UserDaoImpl userDao) {
        this.userDao = userDao;
    }

    public UserServiceImpl() {
    }

    public List<User> findUserList() {
        return this.userDao.findUserList();
    }
}
```

- **LogAsdpect 增加了 `@Component` 注解**

```java
package com.ice.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Component
@Aspect
public class LogAspect {
    /**
     * aspect for every methods under service package.
     */
    @Around("execution(* com.ice.springframework.service.*.*(..))")
    public Object businessService(ProceedingJoinPoint pjp) throws Throwable {
        // get attribute through annotation
        Method method = ((MethodSignature) pjp.getSignature()).getMethod();
        System.out.println("execute method: " + method.getName());

        // continue to process
        return pjp.proceed();
    }
}
```

- **组装 App**

```java
package com.ice.springframework;

import com.ice.springframework.config.BeansConfig;
import com.ice.springframework.entity.User;
import com.ice.springframework.service.UserServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;


public class App {
    public static void main(String[] args) {
        // create and configure beans
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(BeansConfig.class);
        // retrieve configured instance
        UserServiceImpl service = applicationContext.getBean("userService",UserServiceImpl.class);
        // use configured instance
        List<User> userList = service.findUserList();
        // print info from beans
        userList.forEach(a -> System.out.println(a.getName() + "," + a.getAge()));
    }
}
```

- **整体结构和运行 App**

![](/imgs/spring/helloworld-4.png)

### 4.3 SpringBoot 托管配置

Springboot 实际上通过约定大于配置的方式，使用 xx-starter 统一的对 Bean 进行默认初始化，用户只需要很少的配置就可以进行开发了。

这个因为很多开发者都是从 SpringBoot 开始着手开发的，所以这个比较好理解。我们需要的是将知识点都串联起来，构筑认知体系。

### 4.4 Spring 系列发展历史

![](/imgs/spring/helloworld-5.png)