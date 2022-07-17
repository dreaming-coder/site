# Spring 基础 - Spring MVC

## 1. 什么是 MVC

> MVC英文是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计规范。本质上也是一种解耦。

用一种业务逻辑、数据、界面显示分离的方法，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC 被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。

![](/imgs/spring/mvc-1.png)

- **Model**（模型）是应用程序中用于处理应用程序数据逻辑的部分。通常模型对象负责在数据库中存取数据。
- **View**（视图）是应用程序中处理数据显示的部分。通常视图是依据模型数据创建的。
- **Controller**（控制器）是应用程序中处理用户交互的部分。通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据。

## 2. 什么是 Spring MVC

> 简单而言，Spring MVC 是 Spring 在 Spring Container Core 和 AOP 等技术基础上，遵循上述 Web MVC 的规范推出的 web 开发框架，目的是为了简化 Java 栈的 web 开发。

**相关特性如下**：

- 让我们能非常简单的设计出干净的 Web 层和薄薄的 Web 层；
- 进行更简洁的 Web 层的开发；
- 天生与 Spring 框架集成（如 IoC 容器、AOP 等）；
- 提供强大的约定大于配置的契约式编程支持；
- 能简单的进行 Web 层的单元测试；
- 支持灵活的 URL 到页面控制器的映射；
- 非常容易与其他视图技术集成，如 Velocity、FreeMarker 等等，因为模型数据不放在特定的 API 里，而是放在一个 Model 里（Map 数据结构实现，因此很容易被其他框架使用）；
- 非常灵活的数据验证、格式化和数据绑定机制，能使用任何对象进行数据绑定，不必实现特定框架的API；
- 提供一套强大的 JSP 标签库，简化 JSP 开发；
- 支持灵活的本地化、主题等解析；
- 更加简单的异常处理；
- 对静态资源的支持；
- 支持 Restful 风格。

## 3. Spring MVC 基本原理

Spring 的 web 框架围绕 `DispatcherServlet` 设计。`DispatcherServlet` 的作用是将请求分发到不同的处理器。从 Spring 2.5 开始，使用 Java 5 或者以上版本的用户可以采用基于注解的 `@Controller` 声明方式。

Spring MVC 框架像许多其他 MVC 框架一样, 以请求为驱动 , 围绕一个中心 `Servlet` 分派请求及提供其他功能，`DispatcherServlet` 实际上就是一个 `Servlet` (它继承自 `HttpServlet` 基类)。

![](/imgs/spring/mvc-4.png =70%x)

### 3.1 工作原理

当发起请求时被前置的控制器拦截到请求，根据请求参数生成代理请求，找到请求对应的实际控制器，控制器处理请求，创建数据模型，访问数据库，将模型响应给中心控制器，控制器使用模型与视图渲染视图结果，将结果返回给中心控制器，再将结果返回给请求者。

![](/imgs/spring/mvc-2.png =60%x)

### 3.2 执行流程

![](/imgs/spring/mvc-3.png =90%x)

### 3.3 主要组件

- **前端控制器（DispatcherServlet）**

  接收请求，响应结果，返回可以是 json，String 等数据类型，也可以是页面（Model）

- **处理器映射器（HandlerMapping）**

  Spring mvc 使用 `HandlerMapping` 来找到并保存 url 请求和处理函数间的 mapping 关系

  > 以 `DefaultAnnotationHandlerMapping` 为例来具体看` HandlerMapping` 的作用，`DefaultAnnotationHandlerMapping` 将扫描当前所有已经注册的 spring beans 中的`@RequestMapping` 注解以找出 url 和 handler method 处理函数的关系并予以关联。

- **处理器（Handler）**

  就是我们常说的 Controller 控制器啦，由程序员编写

- **处理器适配器（HandlerAdapter）**

  可以将处理器包装成适配器，这样一个适配器就可以支持多种类型的处理器，Spring MVC通过HandlerAdapter来实际调用处理函数

  > 以 `AnnotationMethodHandlerAdapter` 为例，`DispatcherServlet` 中根据 `HandlerMapping` 找到对应的 handler method 后，首先检查当前工程中注册的所有可用的 handlerAdapter，根据 handlerAdapter 中的 `supports()` 方法找到可以使用的 handlerAdapter。通过调用 handlerAdapter 中的 `handle()` 方法来处理及准备 handler method 中的参数及 annotation (这就是 spring mvc 如何将 reqeust 中的参数变成 handle method 中的输入参数的地方)，最终调用实际的 handle method。

  > **Spring 为什么要结合使用 HandlerMapping 以及 HandlerAdapter 来处理 Handler?**
  >
  > 符合面向对象中的单一职责原则，代码架构清晰，便于维护，最重要的是代码可复用性高。如 `HandlerAdapter` 可能会被用于处理多种 Handler。

- **视图解析器（ViewResovler）**

  进行视图解析，返回 view 对象（常见的有 JSP，FreeMark等）

## 4. Spring MVC 示例

> 本部分代码见 [**spring-mvc-demo-xml**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-xml) 和 [**spring-mvc-demo-annotation**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-annotation)。

### 4.1 pom.xml 主要配置

```xml
<!-- 依赖 -->
<dependencies>
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-webmvc -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.20</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>4.0.1</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/javax.servlet/jstl -->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/taglibs/standard -->
    <dependency>
        <groupId>taglibs</groupId>
        <artifactId>standard</artifactId>
        <version>1.1.2</version>
    </dependency>
</dependencies>
<!-- 静态资源过滤 -->
<build>
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

### 4.2 配置版

#### 4.2.1 添加 web 支持

![](/imgs/spring/mvc-5.png =30%x)

![](/imgs/spring/mvc-6.png =40%x)

添加完成后，可以看到项目目录结构如下所示：

![](/imgs/spring/mvc-7.png)

#### 4.2.2 编写业务 Controller

```java
package com.ice.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class HelloController implements Controller {
    public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
        //ModelAndView 模型和视图
        ModelAndView mv = new ModelAndView();

        //封装对象，放在ModelAndView中。Model
        mv.addObject("msg", "HelloSpringMVC!");
        //封装要跳转的视图，放在ModelAndView中
        mv.setViewName("hello"); //: /WEB-INF/jsp/hello.jsp
        return mv;
    }
}
```

#### 4.2.3 编写 hello.jsp

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
${msg}
</body>
</html>
```

#### 4.2.4 编写 SpringMVC 的配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--  注册Bean  -->
    <bean id="/hello" class="com.ice.controller.HelloController"/>

    <!-- 添加映射处理器 -->
    <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>

    <!-- 添加处理适配器 -->
    <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter" />

    <!--视图解析器:DispatcherServlet给他的ModelAndView-->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver" >
        <!--前缀-->
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <!--后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>
    
</beans>
```

#### 4.2.5 配置 web.xml，注册 DispatcherServlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--1.注册DispatcherServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <!--启动级别-1-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!--/ 匹配所有的请求；（不包括.jsp）-->
    <!--/* 匹配所有的请求；（包括.jsp）-->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>

    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

#### 4.2.6 配置 Tomcat 测试

首先进行简单配置：

![](/imgs/spring/mvc-8.png =60%x)

> 这里注意有个坑，我用 Tomcat 10 怎么都启动不了，换成 Tomcat 9 自动就好了。

![](/imgs/spring/mvc-9.png =60%x)

然后对 IDEA 做点配置，打开 File -> Project Structure：

![](/imgs/spring/mvc-10.png =60%x)

启动 Tomcat，打开浏览器，输入 [localhost:8081/hello]()，可以看到服务启动成功：

![](/imgs/spring/mvc-11.png)

### 4.3 注解版

#### 4.3.1 添加 web 支持

这个同上

#### 4.3.2 编写业务 Controller

```java
package com.ice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/HelloController")
public class HelloController {

    //真实访问地址 : localhost:8081/hello
    @RequestMapping("/hello")
    public String sayHello(Model model){
        //向模型中添加属性msg与值，可以在JSP页面中取出并渲染
        model.addAttribute("msg","hello,SpringMVC Annotation!");
        //web-inf/jsp/hello.jsp
        return "hello";
    }

}
```

#### 4.3.3 编写 hello.jsp

```java
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>Hello Annotation</title>
</head>
<body>
${msg}
</body>
</html>
```

#### 4.3.4 编写 SpringMVC 配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- 自动扫描包，让指定包下的注解生效,由IOC容器统一管理 -->
    <context:component-scan base-package="com.ice.controller"/>
    <!-- 让Spring MVC不处理静态资源 -->
    <mvc:default-servlet-handler />
    <!--
    支持mvc注解驱动
        在spring中一般采用@RequestMapping注解来完成映射关系
        要想使@RequestMapping注解生效
        必须向上下文中注册DefaultAnnotationHandlerMapping
        和一个AnnotationMethodHandlerAdapter实例
        这两个实例分别在类级别和方法级别处理。
        而annotation-driven配置帮助我们自动完成上述两个实例的注入。
     -->
    <mvc:annotation-driven />

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
          id="internalResourceViewResolver">
        <!-- 前缀 -->
        <property name="prefix" value="/WEB-INF/jsp/" />
        <!-- 后缀 -->
        <property name="suffix" value=".jsp" />
    </bean>

</beans>
```

#### 4.3.5 配置 web.xml，注册 DispatcherServlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--1.注册DispatcherServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <!--启动级别-1-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!--/ 匹配所有的请求；（不包括.jsp）-->
    <!--/* 匹配所有的请求；（包括.jsp）-->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <filter>
        <filter-name>encodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>UTF-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>

    <filter-mapping>
        <filter-name>encodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

#### 4.3.6 配置 Tomcat 测试

![](/imgs/spring/mvc-12.png)

## 5. 静态资源访问

### 5.1 配置 mvc:default-servlet-handler

这种方法需要在 Spring 配置文件中配置：

```xml
<mvc:default-servlet-handler/>
```

我们在网站的配置文件中设置 `url-pattern` 为 `/`，即中央调度器对全部的请求进行拦截。但是当设置了该标签后，当中央调度器遇到静态资源的访问时，会转由 Tomcat 的默认调度器进行处理。

> 使用这种方法，静态资源文件夹必须在 webapp 目录下，不可在 WEB-INF 下。

### 5.2 使用 mvc:resources

在 Spring 的配置文件中使用 `mvc:resources` 标签进行映射。

```xml
<mvc:resources location="/WEB-INF/" mapping="/**" />
<mvc:resources location="/WEB-INF/static/" mapping="/**" />
```

> - `/` 表示 webapp 的目录，但是 `/` 无法匹配，必须使用 `<mvc:default-servlet-handler/>`
> - `mvc:resources` 只能指定一个静态资源目录，以最先声明的为准
> - `mvc:resources` 的优先级比 `<mvc:default-servlet-handler/>` 高，所以不能同时使用

:::tip

目前我查阅的资料，无论配置文件版还是注解版，静态资源目录都是在配置文件配置的。

:::

## 6. RESTful

### 6.1 概念

RESTful 就是一个资源定位及资源操作的风格。不是标准也不是协议，只是一种风格。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。

**传统方式操作资源** ：通过不同的参数来实现不同的效果！方法单一，例如 post 和 get

- http://127.0.0.1/item/queryItem.action?id=1 查询，GET
- http://127.0.0.1/item/saveItem.action 新增，POST
- http://127.0.0.1/item/updateItem.action 更新，POST
- http://127.0.0.1/item/deleteItem.action?id=1 删除，GET 或 POST

**使用 RESTful 操作资源** ：可以通过不同的请求方式来实现不同的效果！如下：请求地址一样，但是功能可以不同！

- http://127.0.0.1/item/1 查询，GET
- http://127.0.0.1/item 新增，POST
- http://127.0.0.1/item 更新，PUT
- http://127.0.0.1/item/1 删除，DELETE

### 6.2 RESTful 架构风格的特点

#### 6.2.1 资源

所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在。资源总要通过某种载体反应其内容，文本可以用 txt 格式表现，也可以用 HTML 格式、XML 格式表现，甚至可以采用二进制格式；图片可以用 JPG 格式表现，也可以用 PNG 格式表现；JSON 是现在最常用的资源表示格式。 

资源是以 JSON（或其他 Representation ）为载体的、面向用户的一组数据集，资源对信息的表达倾向于概念模型中的数据：

- 资源总是以某种 Representation 为载体显示的，即序列化的信息
- 常用的 Representation 是 JSON（推荐）或者 xml（不推荐）等
- Represntation 是 REST 架构的表现层

#### 6.2.2 统一接口

RESTful 架构风格规定，数据的元操作，即 CRUD（Create，Retrieve，Update 和 Delete，即数据的增删查改）操作，分别对应于 HTTP 方法：GET 用来获取资源，POST 用来新建资源（也可以用于更新资源），PUT 用来更新资源，DELETE 用来删除资源，这样就统一了数据操作的接口，仅通过 HTTP 方法，就可以完成对数据的所有增删查改工作。即：

- **GET**（SELECT）：从服务器取出资源（一项或多项）。
- **POST**（CREATE）：在服务器新建一个资源。
- **PUT**（UPDATE）：在服务器更新资源（客户端提供完整资源数据）。
- **PATCH**（UPDATE）：在服务器更新资源（客户端提供需要修改的资源数据）。
- **DELETE**（DELETE）：从服务器删除资源。

#### 6.2.3 URI

可以用一个 URI（统一资源定位符）指向资源，即每个 URI 都对应一个特定的资源。要获取这个资源，访问它的 URI 就可以，因此 URI 就成了每一个资源的地址或识别符。

一般的，每个资源至少有一个 URI 与之对应，最典型的 URI 即 URL。

#### 6.2.4 无状态

所谓无状态的，即所有的资源，都可以通过 URI 定位，而且这个定位与其他资源无关，也不会因为其他资源的变化而改变。有状态和无状态的区别，举个简单的例子说明一下。如查询员工的工资，如果查询工资是需要登录系统，进入查询工资的页面，执行相关操作后，获取工资的多少，则这种情况是`有状态`的，因为查询工资的每一步操作都依赖于前一步操作，只要前置操作不成功，后续操作就无法执行；如果输入一个 url 即可得到指定员工的工资，则这种情况是`无状态`的，因为获取工资不依赖于其他资源或状态，且这种情况下，员工工资是一个资源，由一个 url 与之对应，可以通过 HTTP 中的 `GET` 方法得到资源，这是典型的 RESTful 风格。

## 7. 请求处理

> 本部分代码见 [**spring-mvc-demo-request-parameters**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-request-parameters)。

### 7.1 请求映射

#### 7.1.1 REST 请求实现

以前的方式是通过 URI 来区分请求的类别：

```
/getUser      获取用户     
/deleteUser   删除用户    
/editUser     修改用户       
/saveUser     保存用户
```

现在我们可以通过 HTTP 的请求方式来区分：

```
/user    GET-获取用户    
/user    DELETE-删除用户     
/user    PUT-修改用户      
/user    POST-保存用户
```

> 其核心是 `org.springframework.web.filter.HiddenHttpMethodFilter`，因为表单中的提交方法只有 GET 和 POST，如果想提交 PUT 和 DELETE，需要利用其它手段。

我们需要将这个过滤器类配置到 web.xml 中：

```xml
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

> 其他的配置同前面一样，`DispatcherServlet`、`CharacterEncodingFilter` 都要配置好。

我们以 User 的增删改查为例，示意 RESTful 风格的参数请求，我们首先定义一个 `UserController`：

```java
package com.ice.controller;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    @GetMapping("/user")
    public void getUser() {
        System.out.println("GET - 方法");
    }

    @PostMapping("/user")
    public void postUser() {
        System.out.println("POST - 方法");
    }

    @DeleteMapping("/user")
    public void deleteUser() {
        System.out.println("DELETE - 方法");
    }

    @PutMapping("/user")
    public void putUser() {
        System.out.println("PUT - 方法");
    }

    @PatchMapping("/user")
    public void patchUser() {
        System.out.println("PATCH - 方法");
    }
}
```

:::tip

以前用的一般都是 `RequestMapping`，要使用不同方法映射一般需要传入 `method` 参数：`@RequestMapping(value = "/user", method = RequestMethod.DELETE)`，略显麻烦，这里使用了 Spring MVC 提供的更为简化的注解。

:::

然后在 index.jsp 写入如下代码：

```html
<form action="/user" method="get">
    <input value="REST-GET 提交" type="submit"/>
</form>
<form action="/user" method="POST">
    <input value="REST-POST 提交" type="submit"/>
</form>
<form action="/user" method="post">
    <input name="_method" type="hidden" value="DELETE"/>
    <input value="REST-DELETE 提交" type="submit"/>
</form>
<form action="/user" method="post">
    <input name="_method" type="hidden" value="PUT"/>
    <input value="REST-PUT 提交" type="submit"/>
</form>
<form action="/user" method="post">
    <input name="_method" type="hidden" value="PATCH"/>
    <input value="REST-PATCH 提交" type="submit"/>
</form>
```

然后我们启动 TomCat 进行测试：

![](/imgs/spring/mvc-13.png)

:::warning

这里注意，验证的代码比较简陋，点击按钮后会 404，到时候后退即可，再试验其他按钮。

:::

依次从上到下都点击一遍，可以看到控制台输出如下：

![](/imgs/spring/mvc-14.png)

#### 7.1.2 REST 请求原理

> 虽然这里讲原理有点早，但这个比较简单。

我们首先看看之前提到的 Filter 类 `HiddenHttpMethodFilter ` 中处理 REST 请求的核心逻辑——`doFilterInternal` 方法：

```java
// HiddenHttpMethodFilter类
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException {

    // 原生 request
    HttpServletRequest requestToUse = request;

    // 请求是 POST 且没有错误
    if ("POST".equals(request.getMethod()) && request.getAttribute(WebUtils.ERROR_EXCEPTION_ATTRIBUTE) == null) {
        // 获取 _method 的值
        String paramValue = request.getParameter(this.methodParam);
        // 如果 _method 的值不为空
        if (StringUtils.hasLength(paramValue)) {
            // 转换大写
            String method = paramValue.toUpperCase(Locale.ENGLISH);
            // _method 的值在 PUT、DELETE 和 PATCH 之一时，执行包装方法
            if (ALLOWED_METHODS.contains(method)) {
                // 该包装方法将请求方式替换为 _method 里设置的方式
                requestToUse = new HttpMethodRequestWrapper(request, method);
            }
        }
    }

    // 此时继续执行的请求就是包装后的请求了
    filterChain.doFilter(requestToUse, response);
}
```

简单描述下：

- 表单提交会带上 `_method=PUT`
- 请求过来会被 `HiddenHttpMethodFilter` 拦截
- 判断请求是不是 POST 方式并且不包含错误
  - 如果都满足则可以获取到 _method 的值，如果该值有长度（就是不为空），则先将其全部转为大写字母
  - 兼容以下请求：PUT、DELETE、PATCH，当传入的请求在这三个允许的请求之一
  - 原生 request(post)，包装模式 `HttpMethodRequestWrapper` 重写了` getMethod` 方法，返回的是传入的值
  - 此后，包装过的请求的请求方式变成  `_method` 的传入的请求方式的值.

> GET 请求就是默认的，所以不做处理。

还有一个问题，如何改变默认的 `_method` 呢？例如改为 `_m` 也能实现一样的功能：

```html
<form action="/user" method="post">
    <input name="_m" type="hidden" value="PUT"/>
    <input value="REST-PUT 提交" type="submit"/>
</form>
```

再回头看看这个核心处理类，有这么一段代码：

```java
public static final String DEFAULT_METHOD_PARAM = "_method";

private String methodParam = DEFAULT_METHOD_PARAM;

public void setMethodParam(String methodParam) {
    Assert.hasText(methodParam, "'methodParam' must not be empty");
    this.methodParam = methodParam;
}
```

显然，我们可以通过依赖注入覆盖原来的默认值。

> 这里如果实现这个有点复杂，在后面 JavaConfig 方式配置时会相当简单。

### 7.2 请求参数

为了更加专注研究不同参数怎么处理，避免视图的影响，这里使用 `@RestController` 注解，使其返回的数据以 JSON 格式呈现。

```java
@RestController
public class RequestController {
   // 测试代码...
}
```

> `@RestController` 等价于 `@Controller` + `@ResponseBody`。

对于对象与  JSON 数据互转，一般使用 Jackson：

```xml
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.3</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-core</artifactId>
    <version>2.13.3</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-annotations</artifactId>
    <version>2.13.3</version>
</dependency>
```

#### 7.2.1 获取路径变量

这里需要用到注解 `@PathVariable` 来进行解析：

> - 用大括号包裹的路径称为路径变量，可以用 `@PathVariable` 注解绑定接收，类型框架会自动帮你转换。
> - 当路径变量名和参数变量名不一致时，可以给 `@PathVariable` 注解赋值，表示该参数绑定哪个路径变量。
> - 也可以直接用一个 `Map<String,String>` 接收所有 Rest 变量。

```java
@GetMapping("/car/{id}/owner/{username}")
public Map<String,Object> getCar(@PathVariable Integer id, @PathVariable("username") String name, 
                                 @PathVariable Map<String, String> kv) {
    Map<String, Object> map = new HashMap<>();
    map.put("id", id);
    map.put("name", name);
    map.put("kv", kv);
    return map;
}
```

输入 `localhost:8081/car/12/owner/ice` 可以看到，接口返回值为：

```json
{
	"name": "ice",
	"id": 12,
	"kv": {
		"id": "12",
		"username": "ice"
	}
}
```

#### 7.2.2 获取请求头

使用注解 `@RequestHeader` 来获取请求头的信息，如果要指定获得请求头哪个属性可以给 `@RequestHeader` 传递一个 key 值。

```java
@GetMapping("/car")
public Map<String, Object> getCar(@RequestHeader("User-Agent") String userAgent, @RequestHeader Map<String,String> header) { 
    Map<String, Object> map = new HashMap<>();
    map.put("userAgent", userAgent);
    map.put("header", header);
    return map;
}
```

输入 `localhost:8081/car` 可以看到，接口返回值为：

```json
{
	"header": {
		"accept": "*/*",
		"accept-encoding": "gzip, deflate, br",
		"user-agent": "ApiPOST Runtime +https://www.apipost.cn",
		"connection": "keep-alive",
		"host": "localhost:8081"
	},
	"userAgent": "ApiPOST Runtime +https://www.apipost.cn"
}
```

#### 7.2.3 获取请求参数

这个最经常用，比较简单，就是要 `@RequestParam` 来绑定，如果 name 不一样就价格参数，指定哪个变量和当前参数绑定。

> 对于一个 key 对应多个 value 的情况可以使用 `List` 来接收。

```java
@GetMapping("/user")
public Map<String, Object> getCar(@RequestParam("age") Integer age, @RequestParam("sex") String sex,
                                  @RequestParam("inters") List<String> inters,
                                  @RequestParam Map<String, String> params) {
    Map<String, Object> map = new HashMap<>();
    map.put("age", age);
    map.put("sex", sex);
    map.put("inters", inters);
    map.put("params", params);
    return map;
}
```

输入 `http://localhost:8081/info?age=18&sex=%E7%94%B7&inters=Basketball&inters=game` 可以看到，接口返回值为：

```json
{
	"inters": [
		"Basketball",
		"game"
	],
	"sex": "男",
	"params": {
		"age": "18",
		"sex": "男",
		"inters": "Basketball"
	},
	"age": 18
}
```

:::warning

注意，使用 `Map` 整体接收参数时，`inters` 只保存了一个值。

:::

#### 7.2.4 获取 cookie

使用 `@CookieValue` 来接收 cookie 的值

```java
@GetMapping("/cookie")
public Map<String, Object> getCar(@CookieValue("_ga") String _ga,
                                  @CookieValue("_ga") Cookie cookie) {
    Map<String, Object> map = new HashMap<>();
    map.put("_ga", _ga);
    map.put("cookie", cookie);
    return map;
}
```

借用 Apipost，我们传入一个 cookie 的值：

![](/imgs/spring/mvc-15.png)

输出结果为：

```json
{
	"cookie": {
		"name": "_ga",
		"value": "ice",
		"version": 0,
		"comment": null,
		"domain": null,
		"maxAge": -1,
		"path": null,
		"secure": false,
		"httpOnly": false
	},
	"_ga": "ice"
}
```

#### 7.2.5 获取请求体

这个是针对 POST 请求的，使用 `@ResuestBody` 来获取：

```java
@PostMapping("/save")
public Map<String, Object> postMethod(@RequestBody String content) {
    Map<String, Object> map = new HashMap<>();
    map.put("content", content);
    return map;
}
```

借用 Apipost，我们模拟表单提交：

![](/imgs/spring/mvc-16.png)

输出结果为：

```json
{
	"content": "userName=ice&age=18"
}
```

#### 7.2.6 获取 request 域属性

这里使用 `@RequestAttribute` 注解

> 注意，我们用了转发将 request 对象传递出去。

```java
@Controller
public class RequestAttributesController {
    @GetMapping("/goto")
    public String goToPage(HttpServletRequest request) {
        request.setAttribute("msg", "成功了");
        request.setAttribute("code", 200);
        return "forward:/success";
    }

    @GetMapping("/success")
    @ResponseBody
    public Map<String, Object> success(@RequestAttribute("msg") String msg,
                                       @RequestAttribute("code") Integer code,
                                       HttpServletRequest request) {
        Object msg1 = request.getAttribute("msg");
        Object code1 = request.getAttribute("code");
        Map<String, Object> map = new HashMap<>();
        map.put("requestMethod_msg",msg1);
        map.put("annotation_msg",msg);
        map.put("requestMethod_code",code1);
        map.put("annotation_code",code);
        return map;
    }
}
```

输入 `localhost:8081/goto`，可以看到输出结果为：

```json
{
	"annotation_msg": "成功了",
	"requestMethod_msg": "成功了",
	"annotation_code": 200,
	"requestMethod_code": 200
}
```

#### 7.2.7 获取矩阵变量

这个也算路径变量的一种，需要手动开启支持，默认是不支持的：

```xml
<mvc:annotation-driven enable-matrix-variables="true"/>
```

> - 传统请求：`/cars/{path}?xxx=xxx&aaa=aaa`
>
> - 矩阵变量：`/cars/{path;low=34,brand=byd,audi,yd}`

```java
@GetMapping("/cars/{path}")
public Map carsSell(@MatrixVariable("low") String low,
                    @MatrixVariable("brand") List<String> brand,
                    @PathVariable("path") String path) {
    Map<String, Object> map = new HashMap<>();
    map.put("low", low);
    map.put("brand", brand);
    map.put("path", path);
    return map;
}
```

我们输入地址：`localhost:8081/cars/sell;low=34;brand=byd,audi,yd`，可以看到输出结果为：

```json
{
	"path": "sell",
	"low": "34",
	"brand": [
		"byd",
		"audi",
		"yd"
	]
}
```

还有一种麻烦的情况，访问：`localhost:8081/boss/1;age=20/2;age=10`，此时 Controller 应该这么写：

```java
@GetMapping("/boss/{bossId}/{empId}")
public Map boss(@MatrixVariable(value = "age", pathVar = "bossId") Integer bossAge,
                @MatrixVariable(value = "age", pathVar = "empId") Integer empAge) {
    Map<String, Object> map = new HashMap<>();
    map.put("bossAge", bossAge);
    map.put("empAge", empAge);

    return map;
}
```

输出结果为：

```json
{
	"bossAge": 20,
	"empAge": 10
}
```

#### 7.2.8 获取 Servlet API

`WebRequest`、`ServletRequest`、`MultipartRequest`、`HttpSession`、`javax.servlet.http.PushBuilder`、`Principal`、`InputStream`、`Reader`、`HttpMethod`、`Locale`、`TimeZone`、`ZoneId` 类型都可以得到支持，是在 `ServletRequestMethodArgumentResolver` 类的 `supportsParameter()` 方法判断的：

```java
public boolean supportsParameter(MethodParameter parameter) {
    Class<?> paramType = parameter.getParameterType();
    return (WebRequest.class.isAssignableFrom(paramType) ||
            ServletRequest.class.isAssignableFrom(paramType) ||
            MultipartRequest.class.isAssignableFrom(paramType) ||
            HttpSession.class.isAssignableFrom(paramType) ||
            (pushBuilder != null && pushBuilder.isAssignableFrom(paramType)) ||
            (Principal.class.isAssignableFrom(paramType) && !parameter.hasParameterAnnotations()) ||
            InputStream.class.isAssignableFrom(paramType) ||
            Reader.class.isAssignableFrom(paramType) ||
            HttpMethod.class == paramType ||
            Locale.class == paramType ||
            TimeZone.class == paramType ||
            ZoneId.class == paramType);
}
```

> 这些变量可以直接放到 Controller 的方法参数里，会自动注入的。

#### 7.2.9 获取自定义对象

这里我们需要新建一个实体类 `User`：

```java
package com.ice.entity;

public class User {
    private int id;
    private String name;
    private int age;

    public User(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

我们定义这样一个 Controller：

```java
@GetMapping("/addUser")
public User addUser(User user) {
    System.out.println(user);
    return user;
}
```

然后访问：

![](/imgs/spring/mvc-17.png)

可以看到控制台输出：

```
User{id=10086, name='ice', age=18}
```

接口返回：

```json
{
	"id": 10086,
	"name": "ice",
	"age": 18
}
```

> 自定义对象都是自动转换的，但是请求参数名要和类的属性对应且一致。

## 8. 内容协商

### 8.1 HTTP 内容协商

一个 URL 资源服务端可以以多种形式进行响应：即 MIME（MediaType）媒体类型。但对于某一个客户端（浏览器、APP、Excel 导出…）来说它只需要一种。这样客户端和服务端就得有一种机制来保证这个事情，这种机制就是内容协商机制。

HTTP 的内容协商方式大致有两种：

- 服务端将可用列表（自己能提供的 MIME 类型们）发给客户端，客户端选择后再告诉服务端。这样服务端再按照客户端告诉的 MIME 返给它。（缺点：多一次网络交互，而且使用对使用者要求高，所以此方式一般不用）

- （**常用**）客户端发请求时就指明需要的 MIME 们（比如 HTTP 头部的：Accept），服务端根据客户端指定的要求返回合适的形式，并且在响应头中做出说明（如：Content-Type）

  > 若客户端要求的 MIME 类型服务端提供不了，那就 406 错误吧~

:::tip 常用请求头、响应头

- **请求头**
  - `Accept`：告诉服务端需要的 MIME（一般是多个，比如 `text/plain`，`application/json` 等。`*/*` 表示可以是任何 MIME 资源）
  - `Accept-Language`：告诉服务端需要的语言（在中国默认是中文嘛，但浏览器一般都可以选择 N 多种语言，但是是否支持要看服务器是否可以协商）
  - `Accept-Charset`：告诉服务端需要的字符集
  - `Accept-Encoding`：告诉服务端需要的压缩方式（gzip, deflate, br）
- **响应头**
  - `Content-Type`：告诉客户端响应的媒体类型（如 `application/json`、`text/html` 等）
  - `Content-Language`：告诉客户端响应的语言
  - `Content-Charset`：告诉客户端响应的字符集
  - `Content-Encoding`：告诉客户端响应的压缩方式（gzip）

:::

> 有很多文章粗暴的解释：`Accept` 属于请求头，`Content-Type` 属于响应头，其实这是不准确的。在前后端分离开发成为主流的今天，你应该不乏见到前端的 request 请求上大都有 `Content-Type：application/json;charset=utf-8` 这个请求头，因此可见 `Content-Type` 并不仅仅是响应头。
>
> HTTP 协议规范的格式如下四部分：
>
> - ＜request-line＞(请求消息行)
> - ＜headers＞(请求消息头)
> - ＜blank line＞(请求空白行)
> - ＜request-body＞(请求消息体)
>
> `Content-Type` 指**请求消息体**的数据格式，因为**请求和响应中都可以有消息体**，所以它即可用在请求头，亦可用在响应头。

### 8.2 Spring MVC 内容协商

> 本部分代码见 [**spring-mvc-demo-content-negotiation**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-content-negotiation)。

Spring MVC 实现了 HTTP 内容协商的同时，又进行了扩展。它支持 2 种协商方式 (其他的好像被废弃了)：

- HTTP 头 Accept
- 固定类型（producers）

其中， xml 格式需要以下依赖支持：

```xml
<dependency>
    <groupId>com.fasterxml.jackson.dataformat</groupId>
    <artifactId>jackson-dataformat-xml</artifactId>
    <version>2.13.3</version>
</dependency>
```

在 Spring MVC 的配置文件中需要配置：

```xml
<mvc:annotation-driven content-negotiation-manager="contentNegotiationManager"/>

<bean id="contentNegotiationManager" class="org.springframework.web.accept.ContentNegotiationManagerFactoryBean">
    <property name="mediaTypes">
        <value>
            json=application/json
            xml=application/xml
        </value>
    </property>
</bean>
```

#### 8.2.1 方式一：HTTP 头 Accept

我们此时定义一个 `UserController`：

```java
@GetMapping("/user")
public User addUser(User user) {
    return user;
}
```

由于加载了转换 xml 的 jar 包，此时 Apipost 访问 `localhost:8081/addUser?id=10086&name=ice&age=18` 返回的默认就是 xml 格式：

![](/imgs/spring/mvc-18.png)

我们想要返回  JSON 格式数据就要在请求投中设置 `Accept=application/json`：

![](/imgs/spring/mvc-19.png)

这是由于 Spring MVC 内置的格式解析有顺序，默认如果找到处理的 jar 包，那就不会往后找了，直接处理。

> 该种方式 Spring MVC 默认支持且默认已开启。

**优缺点**：

- 优点：理想的标准方式
- 缺点：由于浏览器的差异，导致发送的 `Accept Header` 头可能会不一样，从而得到的结果不具备浏览器兼容性

#### 8.2.2 方式二：固定类型（produces）

它就是利用 `@RequestMapping` 注解属性 `produces`（可能你平时也在用，但并不知道原因）：

```java
@GetMapping(value = "/user2/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
public User addUser2(@PathVariable int id) {
    return new User(id,"亚索",18);
}
```

此时访问 `localhost:8081/user2/10086` 可以发现，返回的又是 JSON 格式数据了：

```json
{
	"id": 10086,
	"name": "亚索",
	"age": 18
}
```

> 它也有它很很很重要的一个注意事项：`produces` 指定的 MediaType 类型不能和其他方式同时存在。例如这里指定了 JSON 格式，如果你这么访问加上 `Accept=application/xml`将无法完成内容协商，HTTP 状态码为 406。

## 9. 拦截器

### 9.1 概述

Spring MVC 的处理器拦截器类似于 Servlet 开发中的过滤器 Filter，用于对处理器进行预处理和后处理。开发者可以自己定义一些拦截器来实现特定的功能。

**过滤器与拦截器的区别**：拦截器是AOP思想的具体应用。

**过滤器**

- servlet 规范中的一部分，任何 java web工程都可以使用
- 在 `url-pattern` 中配置了 `/*` 之后，可以对所有要访问的资源进行拦截

**拦截器**

- 拦截器是 SpringMVC 框架自己的，只有使用了 Spring MVC 框架的工程才能使用
- 拦截器只会拦截访问的控制器方法， 如果访问的是 jsp/html/css/image/js 是不会进行拦截的

### 9.2 自定义拦截器

> 本部分代码见 [**spring-mvc-demo-interceptor**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-interceptor)。

Spring MVC 拦截器的顶级接口是 `HandlerInterceptor`：

```java
public interface HandlerInterceptor {
    // 目标方法执行前执行
	default boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		return true;
	}
	
    // 目标方法执行完执行
    default void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
	}
    
    // 请求完成之后执行
    default void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
	}
}
```

想要自定义拦截器，必须实现 `HandlerInterceptor` 接口：

```java
public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("====处理前===");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("====处理后===");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("====请求完成后===");
    }
}
```

然后在配置文件中配置拦截器：

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <bean class="com.ice.interceptor.MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

我们编写一个 Controller，来测试一下：

```java
@RestController
public class TestController {

    @GetMapping("/test")
    public String test() {
        System.out.println("TestController ==》 test() 执行了");
        return "OK";
    }
}
```

访问 `localhost:8081/test` 可以看到控制台输出：

```
====处理前===
TestController ==》 test() 执行了
====处理后===
====请求完成后===
```

## 10. 文件上传

> 本部分代码见 [**spring-mvc-demo-file-upload**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-file-upload)。

我们需要在 Spring MVC 配置文件中注册文件上传的 Bean：

```xml
<bean id="multipartResolver" class="org.springframework.web.multipart.support.StandardServletMultipartResolver"/>
```

处理上传文件的 Controller 如下所示：

```java
package com.ice.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
public class FileUploadController {
    @PostMapping("/upload")
    public String upload(@RequestPart(value = "headerImage", required = false) MultipartFile headerImage,
                         @RequestPart(value = "photos", required = false) MultipartFile[] photos) throws IOException {
        String s = "";
        if (null != headerImage && !headerImage.isEmpty()) {
            String originalFilename = headerImage.getOriginalFilename();
            s += originalFilename + "\n";
            headerImage.transferTo(new File("E:/" + originalFilename));
        }
        if (null != photos && photos.length > 0) {
            for (MultipartFile photo : photos) {
                if (!photo.isEmpty()) {
                    String originalFilename = photo.getOriginalFilename();
                    s += originalFilename + "\n";
                    photo.transferTo(new File("E:/" + originalFilename));
                }
            }
        }
        return s;
    }
}
```

这里设置的可以上传单个文件，也可以上传多个文件，并将文件复制到 E 盘下，文件名也保持不变。

这里使用 Apipost 进行了测试：

![](/imgs/spring/mvc-20.png)

我们还可以在 web.xml 中对文件上传做更多的配置：

```xml
<servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--关联一个springmvc的配置文件:【servlet-name】-servlet.xml-->
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:file.xml</param-value>
    </init-param>
    <!--启动级别-1-->
    <load-on-startup>1</load-on-startup>
    <multipart-config>
        <!-- 临时路劲 -->
        <location>/tmp/test/uploads</location>
        <!-- 上传文件的最大值 -->
        <max-file-size>2097152</max-file-size>
        <!--请求的最大容量-->
        <max-request-size>4194304</max-request-size>
    </multipart-config>
</servlet>
```

## 11. 异常处理

> 本部分代码见 [**spring-mvc-demo-exception**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-mvc-demo-exception)。

### 11.1 @ControllerAdvice

在 Spring 3.2中，新增了 `@ControllerAdvice` 注解，可以用于定义 `@ExceptionHandler`、`@InitBinder`、`@ModelAttribute`，并应用到所有 `@RequestMapping` 中。例如：

```java
@ControllerAdvice
public class AspectController {

    // 应用到所有@RequestMapping注解方法，在其执行之前初始化数据绑定器
    @InitBinder
    public void initBinder(WebDataBinder binder) {
        System.out.println("ControllerAdvice下InitBinder注解的方法...");
    }

    // 把值绑定到Model中，使全局@RequestMapping可以获取到该值
    @ModelAttribute
    public void addAttributes(Model model) {
        model.addAttribute("author", "ice");
        System.out.println("ControllerAdvice下ModelAttribute注解的方法...");
    }

    // 全局异常捕捉处理
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public Map<String, Object> errorHandler(Exception ex) {
        Map<String, Object> map = new HashMap<>();
        map.put("code", 500);
        map.put("msg", ex.getMessage());
        System.out.println("ControllerAdvice下ExceptionHandler注解的方法...");
        return map;
    }
}
```

再定义一个 Controller 来测试：

```java
@RestController
public class TestController {
    @GetMapping("/home1")
    public String home(ModelMap modelMap) {
        System.out.println("/home1：" + modelMap.get("author"));
        return modelMap.get("author").toString();
    }

    //通过@ModelAttribute获取
    @GetMapping("/home2")
    public String home(@ModelAttribute("author") String author) {
        System.out.println("/home2：" + author);
        return author;
    }

    @GetMapping("/home3")
    public String home() {
        int a = 1 / 0;
        return "failed";
    }
}
```

- 访问：`localhost:8081/home1`

```
ControllerAdvice下ModelAttribute注解的方法...
/home1：ice
```

- 访问：`localhost:8081/home2`

```
ControllerAdvice下ModelAttribute注解的方法...
ControllerAdvice下InitBinder注解的方法...
/home2：ice
```

- 访问：`localhost:8081/home3`

```
ControllerAdvice下ModelAttribute注解的方法...
ControllerAdvice下ExceptionHandler注解的方法...
```

### 11.2 @ExceptionHandler

这个前面也有了例子，就不多说，主要是记住，该注解的属性是需要用该注解的方法处理的异常（集合）。

### 11.3 @ResponseStatus 自定义异常

```java
@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "your reason")  // 传入该异常的返回码以及原因
public class XException extends RuntimeException {

    public XException(String msg) {
        super(msg);
    }
}
```

然后我们再定义一个 `XException` 的异常处理器：

```java
// 指定异常处理
@ResponseBody
@ExceptionHandler(value = XException.class)
public void errorHandler2(Exception ex) {
    System.out.println(ex.getMessage());
}
```

在 Controller 中新定义一个控制器方法：

```java
@GetMapping("/home4")
public String excep(@RequestParam int n) {
    if (n >10){
        throw new XException("抛出人为异常");
    }
    return "success";
}
```

我们访问：`localhost:8081/home4?n=100` 时，控制台输出：

```
ControllerAdvice下ModelAttribute注解的方法...
ControllerAdvice下InitBinder注解的方法...
抛出人为异常
```

### 11.4 **自定义异常解析器 (定制错误页)**<Badge type="tip" text="推荐" vertical="top" />

这里需要把前面的全局异常处理给**注释掉**，不然这个处理完异常就没自定义啥事了：

```java
// 全局异常捕捉处理
@ResponseBody
@ExceptionHandler(value = Exception.class)
public Map<String, Object> errorHandler(Exception ex) {
    Map<String, Object> map = new HashMap<>();
    map.put("code", 500);
    map.put("msg", ex.getMessage());
    System.out.println("ControllerAdvice下ExceptionHandler注解的方法...");
    return map;
}
```

接下来我们首先写一个简单的自定义异常：

```java
@Component
public class CustomHandler implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e) {
        ModelAndView mv=new ModelAndView();
        if (e instanceof NullPointerException){
            mv.setViewName("4xx");
        }
        if(e instanceof  ArithmeticException){
            mv.setViewName("5xx");
        }
        mv.addObject("error",e.toString());
        return mv;
    }
}
```

再写个 Controller 来出发它：

```java
@Controller
public class ExceptionController {
    //空指针异常
    @RequestMapping("/custom1")
    public String pageJump() {
        String str = null;
        str.length();
        return "ok";
    }

    //算术异常
    @RequestMapping("/custom2")
    public String pageJump1() {
        int i = 3 / 0;
        return "ok";
    }
}
```

还要记得在 WEB-INF 目录下新建 jsp 文件夹，在jsp 文件夹里创建 `4xx.jsp` 和 `5xx.jsp`

> 按照你自己视图解析器的位置来。

- 访问：`http://localhost:8081/custom1`

![](/imgs/spring/mvc-21.png)

- 访问：`http://localhost:8081/custom2`

![](/imgs/spring/mvc-22.png)

## 12. 乱码问题

不得不说，乱码问题是在我们开发中十分常见的问题，也是让我们程序猿比较头大的问题！

以前乱码问题通过过滤器解决 , 而 SpringMVC 给我们提供了一个过滤器 , 可以在 web.xml 中配置。

```xml
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>encoding</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

