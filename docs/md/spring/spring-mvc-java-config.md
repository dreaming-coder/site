# Spring 基础 - 纯 Java 配置 Spring MVC

> 在之前的 [Spring 基础 - 控制反转 (IoC)](http://e-thunder.space/md/spring/spring-ioc.html) 中，已经介绍了如何利用 Java Config 的方式注册组件，这篇文章在这基础上将更为深入的介绍如何对 Spring MVC 项目进行 Java Config 改造。

> 特别地，Servlet 之前都在 web.xml 中进行配置，这里基于 Servlet 3.0 的 SPI 机制进行零配置实现。

## 1. DispatcherServlet

> 本部分引用自[官网](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#mvc-servlet)，仅做了解，方便后面理解为什么 SpringBoot 不需要 web.xml 就能启动。

```java
public class MyWebApplicationInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) {

        // Load Spring web application configuration
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(AppConfig.class);

        // Create and register the DispatcherServlet
        DispatcherServlet servlet = new DispatcherServlet(context);
        ServletRegistration.Dynamic registration = servletContext.addServlet("app", servlet);
        registration.setLoadOnStartup(1);
        registration.addMapping("/");
    }
}
```

这段代码替代了：

```xml
<web-app>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/app-context.xml</param-value>
    </context-param>

    <servlet>
        <servlet-name>app</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value></param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>app</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

或者还可以这么写：

```java
public class MyWebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    //加载Spring的配置类
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[] { RootConfig.class };
    }

    //加载mvc的配置类
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[] { App1Config.class };
    }

    //DispatcherServlet的作用范围
    @Override
    protected String[] getServletMappings() {
        return new String[] { "/app1/*" };
    }
    
    // 配置过滤器
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("utf-8");
        return new Filter[]{filter};
    }
}
```

它等价于：

```xml
<web-app>

    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/root-context.xml</param-value>
    </context-param>

    <servlet>
        <servlet-name>app1</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>/WEB-INF/app1-context.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>app1</servlet-name>
        <url-pattern>/app1/*</url-pattern>
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

</web-app>
```

## 2. WebMVC 配置

### 2.1 开启 MVC 配置

之前介绍过一般的 Spring 配置类使用的注解是 `@Configuration`。对于 SpringMVC 的配置文件，我们使用 `@EnableWebMvc` 注解。一般可以这么写：

```java
@EnableWebMvc
@ComponentScan("com.ice")
public class WebMVCConfig implements WebMvcConfigurer{
    
}
```

相当于在 xml 中这么配置：

```xml
<mvc:annotation-driven/>
```

### 2.2 配置视图解析器

```java
@Override
public void configureViewResolvers(ViewResolverRegistry registry) {
    registry.jsp("/META-INF/jsp/",".jsp");
}
```

相当于

```xml
<!-- 视图解析器 -->
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver"
      id="internalResourceViewResolver">
    <!-- 前缀 -->
    <property name="prefix" value="/WEB-INF/jsp/"/>
    <!-- 后缀 -->
    <property name="suffix" value=".jsp"/>
</bean>
```

### 2.3 配置视图控制器

```java
@Override
public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/index").setViewName("index");
}
```

适用于只返回视图，没有任何业务逻辑，等价于在 Controller 中这么配置：

```java
@RequestMapping("/index")
public String index() {
	return "index";
}
```

### 2.4 静态资源映射器

```java
@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/image/**")
        .addResourceLocations("classpath:/static/image/");
}
```

这样在浏览器输入 [**http://localhost:8080/image/1.png**](http://localhost:8080/image/1.png)，会去/static/image目录下寻找1.png文件。

### 2.5 Servlet 默认处理规则

```java
@Override
public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
}
```

所有没法处理的 URL 最后都会被这个默认的 Servlet 处理，这样配置后，所有的静态资源如 CSS 、JavaScript 等静态资源都能正常返回了。

相当于以前在 spring-mvc.xml 中这样配置：

```java
<mvc:default-servlet-handler/>
```

### 2.6 添加拦截器

```java
@Override
public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(new MyInterceptor());
}
```

> `MyInterceptor` 需要实现 `HandlerInterceptor` 接口。

相当于以前在 spring-mvc.xml 中这样配置：

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <bean class="com.ice.interceptor.MyInterceptor"/>
    </mvc:interceptor>
</mvc:interceptors>
```

### 2.7 其他配置

我们可以看到，`WebMvcConfigurer` 接口下还要U许多其他的方法，重写这些方法就能修改它的默认配置。

![](/imgs/spring/mvc-javaconfig-1.png)

**后面在看 SpringBoot 自动配置 SpringMVC 的 AutoConfigure 类时，会看到，它也是继承这个接口来扩展的。**

