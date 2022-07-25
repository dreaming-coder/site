# SpringBoot 基础 - SpringBoot 简介

> 本文转自 [SpringBoot入门 - SpringBoot简介](https://www.pdai.tech/md/spring/springboot/springboot-x-overview.html)

## 1. Spring Framework 解决了什么问题，没有解决什么问题？

### 1.1 Spring Framework 解决了什么问题？

Spring 是 Java 企业版（Java Enterprise Edition，JEE，也称J2EE）的轻量级代替品。无需开发重量级的 EnterpriseJavaBean（EJB），Spring 为企业级 Java 开发提供了一种相对简单的方法，通过依赖注入和面向切面编程，用简单的 Java 对象（Plain Old Java Object，POJO）实现了 EJB 的功能。

1. 使用 Spring 的 IOC 容器，将对象之间的依赖关系交给 Spring，降低组件之间的耦合性，让我们更专注于应用逻辑 
2. 可以提供众多服务，事务管理，WS 等。
3. AOP 的很好支持，方便面向切面编程
4. 对主流的框架提供了很好的集成支持，如 Hibernate，Struts2，JPA 等 
5. Spring DI 机制降低了业务对象替换的复杂性
6. Spring 属于低侵入，代码污染极低
7. Spring 的高度可开放性，并不强制依赖于 Spring，开发者可以自由选择 Spring 部分或全部

### 1.2 Spring Framework 没有解决了什么问题？

虽然 Spring 的组件代码是轻量级的，但它的配置却是重量级的。一开始，Spring 用 XML 配置，而且是很多 XML 配置。Spring 2.5 引入了基于注解的组件扫描，这消除了大量针对应用程序自身组件的显式 XML 配置。Spring 3.0 引入了基于 Java 的配置，这是一种类型安全的可重构配置方式，可以代替 XML。

所有这些配置都代表了开发时的损耗。因为在思考 Spring 特性配置和解决业务问题之间需要进行思维切换，所以编写配置挤占了编写应用程序逻辑的时间。和所有框架一样，Spring 实用，但与此同时它要求的回报也不少。

除此之外，项目的依赖管理也是一件耗时耗力的事情。在环境搭建时，需要分析要导入哪些库的坐标，而且还需要分析导入与之有依赖关系的其他库的坐标，一旦选错了依赖的版本，随之而来的不兼容问题就会严重阻碍项目的开发进度。

1. JSP 中要写很多代码、控制器过于灵活，缺少一个公用控制器
2. Spring 不支持分布式，这也是 EJB 仍然在用的原因之一

## 2. SpringBoot 概述

### 2.1 SpringBoo t解决上述 Spring 的缺点

SpringBoot 对上述 Spring 的缺点进行的改善和优化，基于约定优于配置的思想，可以让开发人员不必在配置与逻辑业务之间进行思维的切换，全身心的投入到逻辑业务的代码编写中，从而大大提高了开发的效率，一定程度上缩短了项目周期。

### 2.2 SpringBoot 的特点

1. 为基于 Spring 的开发提供更快的入门体验
2. 开箱即用，没有代码生成，也无需 XML 配置，同时也可以修改默认值来满足特定的需求
3. 提供了一些大型项目中常见的非功能性特性，如嵌入式服务器、安全、指标，健康检测、外部配置等

> SpringBoot 不是对 Spring 功能上的增强，而是提供了一种快速使用 Spring 的方式。

### 2.3 SpringBoot 的核心功能

- **起步依赖** 起步依赖本质上是一个 Maven 项目对象模型（Project Object Model，POM），定义了对其他库的传递依赖，这些东西加在一起即支持某项功能。

  > 简单的说，起步依赖就是将具备某种功能的坐标打包到一起，并提供一些默认的功能。

- 自动配置

  Spring Boot 的自动配置是一个运行时（更准确地说，是应用程序启动时）的过程，考虑了众多因素，才决定 Spring 配置应该用哪个，不该用哪个，该过程是 Spring 自动完成的。

## 参考文章

- [SpringBoot 官网](https://spring.io/projects/spring-boot)
- [SpringBoot 简介](https://www.jianshu.com/p/24add3c5fedb)
- [SpringBoot 是什么](https://www.cnblogs.com/luzhanshi/p/10592209.html)

​	