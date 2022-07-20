# Java 基础 - Servlet 3.0

> 基于 web.xml 的 servlet 已出现多年，这里无需赘述。随着 SpringBoot 的兴起，开发者普遍拥抱这个简单强大的开发框架，但它也绕不开基本的 servlet，之所以我们不用配置是因为框架开发者利用注解方式配置好了。

## 1. Servlet 3.0 概述

Servlet 3.0 作为 Java EE 6 规范体系中一员，随着 Java EE 6 规范一起发布。该版本在前一版本（Servlet 2.5）的基础上提供了若干新特性用于简化 Web 应用的开发和部署。其中有几项特性的引入让开发者感到非常兴奋。

1. 新增的注解支持：该版本新增了若干注解，用于简化 Servlet、过滤器（Filter）和监听器（Listener）的声明，这使得 web.xml 部署描述文件从该版本开始不再是必选的了。
2. 异步处理支持：有了该特性，Servlet 线程不再需要一直阻塞，直到业务处理完毕才能再输出响应，最后才结束该 Servlet 线程。在接收到请求之后，Servlet 线程可以将耗时的操作委派给另一个线程来完成，自己在不生成响应的情况下返回至容器。针对业务处理较耗时的情况，这将大大减少服务器资源的占用，并且提高并发处理速度。
3. 可插性支持：熟悉 Struts2 的开发者一定会对其通过插件的方式与包括 Spring 在内的各种常用框架的整合特性记忆犹新。将相应的插件封装成 JAR 包并放在类路径下，Struts2 运行时便能自动加载这些插件。现在 Servlet 3.0 提供了类似的特性，开发者可以通过插件的方式很方便的扩充已有 Web 应用的功能，而不需要修改原有的应用。

## 2. 新增的注解支持

Servlet 3.0 的部署描述文件 web.xml 的顶层标签 `<web-app>` 有一个 metadata-complete 属性，该属性指定当前的部署描述文件是否是完全的。如果设置为 `true`，则容器在部署时将只依赖部署描述文件，忽略所有的注解（同时也会跳过 web-fragment.xml 的扫描，亦即禁用可插性支持）；如果不配置该属性，或者将其设置为 `false`，则表示启用注解支持（和可插性支持）。

### 2.1 @WebServlet

`@WebServlet` 用于将一个类声明为 Servlet，该注解将会在部署时被容器处理，容器将根据具体的属性配置将相应的类部署为 Servlet。该注解具有下表给出的一些常用属性（以下所有属性均为可选属性，但是 `value` 或者 `urlPatterns` 通常是必需的，且二者不能共存，如果同时指定，通常是忽略 `value` 的取值）：

|      属性名      |      类型       |        标签         |                             描述                             |
| :--------------: | :-------------: | :-----------------: | :----------------------------------------------------------: |
|      `name`      |     String      |  `<servlet-name>`   | 指定 Servlet 的 `name` 属性。<br/>如果没有显式指定，则取值为该 Servlet 的完全限定名，即包名+类名。 |
|     `value`      |    String[]     |   `<url-pattern>`   | 该属性等价于 `urlPatterns` 属性，两者不能同时指定。<br/>如果同时指定，通常是忽略 `value` 的取值。 |
|  `urlPatterns`   |    String[]     |   `<url-pattern>`   |              指定一组 Servlet 的 URL 匹配模式。              |
| `loadOnStartup`  |       int       | `<load-on-startup>` |                  指定 Servlet 的加载顺序。                   |
|   `initParams`   | WebInitParam[ ] |   `<init-param>`    |                指定一组 Servlet 初始化参数。                 |
| `asyncSupported` |     boolean     | `<async-supported>` |             声明 Servlet 是否支持异步操作模式。              |
|  `description`   |     String      |   `<description>`   |                 指定该 Servlet 的描述信息。                  |
|  `displayName`   |     String      |  `<display-name>`   |                  指定该 Servlet 的显示名。                   |

### 2.2 @WebInitParam

该注解通常不单独使用，而是配合 `@WebServlet` 或者 `@WebFilter` 使用。它的作用是为 Servlet 或者过滤器指定初始化参数，这等价于 web.xml 中 `<servlet>` 和 `<filter> `的 `<init-param>` 子标签。`@WebInitParam` 具有下表给出的一些常用属性：

|    属性名     |  类型  | 是否可选 |                   描述                   |
| :-----------: | :----: | :------: | :--------------------------------------: |
|    `name`     | String |    否    | 指定参数的名字，等价于 `<param-name>`。  |
|    `value`    | String |    否    |  指定参数的值，等价于 `<param-value>`。  |
| `description` | String |    是    | 关于参数的描述，等价于 `<description>`。 |

### 2.3 @WebFilter

`@WebFilter` 用于将一个类声明为过滤器，该注解将会在部署时被容器处理，容器将根据具体的属性配置将相应的类部署为过滤器。该注解具有下表给出的一些常用属性 ( 以下所有属性均为可选属性，但是 `value`、`urlPatterns`、`servletNames` 三者必需至少包含一个，且 `value` 和 `urlPatterns` 不能共存，如果同时指定，通常忽略 `value` 的取值 )：

|      属性名       |      类型      |                             描述                             |
| :---------------: | :------------: | :----------------------------------------------------------: |
|   `filterName`    |     String     |       指定过滤器的 `name` 属性，等价于 `<filter-name>`       |
|      `value`      |    String[]    |  该属性等价于 `urlPatterns` 属性，但是两者不应该同时使用。   |
|   `urlPatterns`   |    String[]    | 指定一组过滤器的 URL 匹配模式。等价于 `<url-pattern>` 标签。 |
|  `servletNames`   |    String[]    | 指定过滤器将应用于哪些 Servlet。取值是 `@WebServlet` 中的 `name` 属性的取值，或者是 web.xml 中 `<servlet-name>` 的取值。 |
| `dispatcherTypes` | DispatcherType | 指定过滤器的转发模式。具体取值包括： `ASYNC`、`ERROR`、`FORWARD`、`INCLUDE`、`REQUEST`。 |
|   `initParams`    | WebInitParam[] |    指定一组过滤器初始化参数，等价于 `<init-param>` 标签。    |
| `asyncSupported`  |    boolean     | 声明过滤器是否支持异步操作模式，等价于 `<async-supported>` 标签。 |
|   `description`   |     String     |      该过滤器的描述信息，等价于 `<description>` 标签。       |
|   `displayName`   |     String     | 该过滤器的显示名，通常配合工具使用，等价于 `<display-name>` 标签。 |

### 2.4 @WebListener

该注解用于将类声明为监听器，被 `@WebListener` 标注的类必须实现以下至少一个接口：

- ServletContextListener
- ServletContextAttributeListener
- ServletRequestListener
- ServletRequestAttributeListener
- HttpSessionListener
- HttpSessionAttributeListener

| 属性名 |  类型  | 是否可选 |         描述         |
| :----: | :----: | :------: | :------------------: |
| value  | String |    是    | 该监听器的描述信息。 |

### 2.5 @MultipartConfig

该注解主要是为了辅助 Servlet 3.0 中 HttpServletRequest 提供的对上传文件的支持。该注解标注在 Servlet 上面，以表示该 Servlet 希望处理的请求的 MIME 类型是 `multipart/form-data`。另外，它还提供了若干属性用于简化对上传文件的处理。

常用属性：

|       属性名        |  类型  | 是否可选 |                             描述                             |
| :-----------------: | :----: | :------: | :----------------------------------------------------------: |
| `fileSizeThreshold` |  int   |    是    |            当数据量大于该值时，内容将被写入文件。            |
|     `location`      | String |    是    |                     存放生成的文件地址。                     |
|    `maxFileSize`    |  long  |    是    |     允许上传的文件最大值。默认值为` -1`，表示没有限制。      |
|  `maxRequestSize`   |  long  |    是    | 针对该 `multipart/form-data` 请求的最大数量，默认值为 `-1`，表示没有限制。 |

### 2.6 启动 Servlet

> 本部分代码见 [**java-demo-servlet**](https://github.com/dreaming-coder/ice-java-demos/tree/main/java-demo-servlet)。

现在还剩最后一个也是最主要的问题，在注解配置的情况下如何启动 web 服务呢？

**在 web 容器启动时为提供给第三方组件机会做一些初始化的工作，例如注册 servlet 或者 filtes 等，servlet 规范中通过 `ServletContainerInitializer` 实现此功能。每个框架要使用 `ServletContainerInitializer` 就必须在对应的 jar 包的 `META-INF/services` 目录创建一个名为 `javax.servlet.ServletContainerInitializer` 的文件，文件内容指定具体的 `ServletContainerInitializer` 实现类，那么，当web容器启动时就会运行这个初始化器做一些组件内的初始化工作。**

> 这就是 SPI 机制的应用。

**一般伴随着 `ServletContainerInitializer` 一起使用的还有 `HandlesTypes` 注解**，通过 `HandlesTypes` 可以将感兴趣的一些类注入到 `ServletContainerInitializerde` 的 `onStartup` 方法作为参数传入。

:::tip

Tomcat 容器的 `ServletContainerInitializer` 机制的实现，主要交由 Context 容器和 ContextConfig 监听器共同实现，ContextConfig 监听器负责在容器启动时读取每个 web 应用的 `WEB-INF/lib` 目录下包含的 jar 包的 `META-INF/services/javax.servlet.ServletContainerInitializer`，以及 web 根目录下的 `META-INF/services/javax.servlet.ServletContainerInitializer`，通过反射完成这些 `ServletContainerInitializer` 的实例化，然后再设置到 Context 容器中，最后 Context 容器启动时就会分别调用每个 `ServletContainerInitializer` 的 `onStartup` 方法，并将感兴趣的类作为参数传入。

:::

至此，我们才总算搞清楚了这个非常重要的机制，总结一下就是，Servlet 容器在启动应用的时候，会扫描当前应用每一个 jar 包里面的 `META-INF/services/javax.servlet.ServletContainerInitializer` 文件中指定的实现类，然后，再运行该实现类中的方法。

接下来，我们就来测试一下该机制。

首先，还是要添加 web 支持，但是要做些修改，目录结构如下所示：

![](/imgs/java/java-servlet-1.png)

【启动类】

```java
@HandlesTypes(value = {HelloService.class})
public class MyServletContainerInitializer implements ServletContainerInitializer {

    /**
     * 应用启动的时候会加载运行
     *
     * @param c		集合中的类就是上面 @HandlesTypes 中指定类的子类或实现类
     * @param ctx 	当前 web 应用的 ServletContext
     */
    @Override
    public void onStartup(Set<Class<?>> c, ServletContext ctx) {
        for (Class<?> clazz : c) {
            System.out.println(clazz);
        }
    }
}
```

【Servlet】

```java
@WebServlet(name = "demoServlet", urlPatterns = {"/demo", "/test"}, loadOnStartup = 1,
        asyncSupported = true, description = "test servlet annotations", displayName = "iceServlet",
        initParams = {@WebInitParam(name = "麦当劳", value = "麦辣鸡腿汉堡", description = "init参数1"),
                @WebInitParam(name = "肯德基", value = "香辣鸡腿汉堡", description = "init参数2")})
public class DemoServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        System.out.println("doGet...");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        System.out.println("doPost...");
    }
}
```

【启动加载实验类】

```java
public interface HelloService {
}

// 子类
public interface HelloServiceExt extends HelloService {
}

// 抽象类
public abstract class AbstractHelloService implements HelloService {
}

// 实现类
public class HelloServiceImpl implements HelloService {
}
```

当我们启动  Tomcat 时，可以看到控制台输出了：

```
class com.ice.service.HelloServiceImpl
class com.ice.service.AbstractHelloService
interface com.ice.service.HelloServiceExt
```

说明 `HelloService` 及其子类由于 `@HandlesTypes`  注解的作用都加载进了内存。

我们再试试 `localhost:8081/demo` 和 `localhost:8081/test`，分别以 GET 和 POST 请求测验，可以看到依次执行了 `doGet()` 和 `doPost()` 方法。

## 3. 异步处理支持

在 Servlet 3.0 之前，一个普通 Servlet 的主要工作流程大致如下：

![](/imgs/java/java-servlet-2.png)

其中黄色阶段通常是最耗时的，因为业务处理一般涉及数据库操作，还会受到网络等的影响，而在此过程中，Servlet 线程一直处于阻塞状态，直到业务处理完毕。在处理业务的过程中，Servlet 资源一直被占用而得不到释放，对于并发较大的应用，这有可能造成性能的瓶颈。对此，在以前通常是采用私有解决方案来提前结束 Servlet 线程，并及时释放资源。

为解决这个问题，Servlet 3.0 就开始支持异步处理了，之前的 Servlet 处理流程可以调整为如下的过程：

![](/imgs/java/java-servlet-3.png)

首先，Servlet 接收到请求之后，可能首先需要对请求携带的数据进行一些预处理；接着，Servlet 线程将请求转交给一个异步线程来执行业务处理，线程本身返回至容器，此时 Servlet 还没有生成响应数据，异步线程处理完业务以后，可以直接生成响应数据（异步线程拥有 `ServletRequest` 和 `ServletResponse` 对象的引用），或者将请求继续转发给其它 Servlet。如此一来， Servlet 线程不再是一直处于阻塞状态以等待业务逻辑的处理，而是启动异步线程之后可以立即返回。

### 3.1 启用异步处理

异步处理特性可以应用于 Servlet 和过滤器两种组件。在默认情况下，Servlet 和过滤器并没有开启异步处理特性，因为异步处理的工作模式和普通工作模式在实现上有着本质的区别，因此如果希望使用该特性，则必须按照如下的方式启用：

- **在 web.xml 文件中启动**

Servlet 3.0 默认是没有 web.xml 文件的，但 Servlet 3.0 也是支持 web.xml 文件的，较 Servlet 之前的版本，Servlet 3.0 在  `<servlet>` 和 `<filter>` 标签中增加了 `<async-supported>` 子标签，该标签默认是 `false `。如果想启用异步支持，只需要置为 `true` 即可。例如：
```xml
<!-- servlet -->
<servlet> 
    <servlet-name>asynServlet</servlet-name> 
    <servlet-class>com.servlet.AsynServlet</servlet-class> 
    <async-supported>true</async-supported> 
</servlet>
<!-- Filter -->
<filter>
	<filter-name>asynFilter</filter-name>
	<filter-class>com.filter.AsynFilter</filter-class>
	<async-supported>true</async-supported>
</filter>
```

- **通过注解开启异步支持**

Servlet 3.0 提供的 `@WebServlet` 和 `@WebFilter` 进行 Servlet 或 Filter 配置的情况，这两个注解都提供了 `asyncSupported` 属性，默认该属性的取值为 `false`。如果想启用异步支持，只需要置为 `true` 即可。例如：

```java
@WebServlet(value="/asyn-servlet",asyncSupported=true)
public class ServletAsyn extends HttpServlet {...}
 
@WebFilter(value="/*",asyncSupported=true)
public class FilterAsyn implements Filter {...}
```

### 3.2 异步处理的代码实现方式

Servlet 和 Filter 使用异步支持的实现方式是一模一样的操作。这里只以 Servlet 的实现方式为例。

模拟注册发信息到邮件的简单的异步处理 Servlet 示例代码：

```java
@WebServlet(value="/asyn-servlet",asyncSupported=true)
public class ServletAsyn extends HttpServlet {
    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException {
		System.out.println("Servlet is start");
		
		//1.获得异步上下文对象
		AsyncContext ac = request.startAsync();
		//2.启动一个耗时的子线程
		ThreadTask tt = new ThreadTask(ac);
		//3.可设置异步超时对象，需在启动异步上下文对象前设置
		/*
		 * 设置超时后，在超时时间内子线程没有结束，主线程则会停止等待，继续往下执行
		 */
		ac.setTimeout(3000);
		//4.开启异步上下文对象
		ac.start(tt);
		
		//主线程结束向客户端发送消息
		System.out.println("Servlet is end");
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().append("信息已发送到邮箱");
	}
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
 
}
```

异步线程的执行类

```java
public class ThreadTask implements Runnable{
	private AsyncContext ac;  //定义一个异步上下文
	
	public ThreadTask(AsyncContext ac) {
		super();
		this.ac = ac;
	}
 
	@Override
	public void run() {
		/*
		 * 服务端异步典型应用是注册时向邮箱发送验证码
		 */
		try {
			//进行异步的一些处理
			HttpServletRequest requst = (HttpServletRequest) ac.getRequest();
			HttpSession session = requst.getSession();
			System.out.println("asyn-task start" + new Date());
			for(int i=5;i>0; i--) {
				System.out.println(i);
				Thread.sleep(1000);
			}
			//将结果放到session等方式
			session.setAttribute("message", "This is the result of asyn");
			System.out.println("asyn-task end" + new Date());
			
			//通知主线程已经处理完成
			/* 
			 * 除了使用 ac.complete() 方法通知主线程已经处理外
			 * 还可以使用 ac.dispatch() 方法重定向到一个页面
			 */
			ac.dispatch("/show.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
```

### 3.3 对异步处理过程的监听

除此之外，Servlet 3.0 还为异步处理提供了一个监听器，使用 `AsyncListener` 接口表示。它可以监控如下四种事件：

- 异步线程开始时，调用 `AsyncListener` 的 `onStartAsync(AsyncEvent event)` 方法；
- 异步线程出错时，调用 `AsyncListener` 的 `onError(AsyncEvent event)` 方法；
- 异步线程执行超时，则调用 `AsyncListener` 的 `onTimeout(AsyncEvent event)` 方法；
- 异步执行完毕时，调用 `AsyncListener` 的 `onComplete(AsyncEvent event)` 方法。

如果要注册一个 `AsyncListener`，只需将准备好的 `AsyncListener` 对象传递给 `AsyncContext` 对象的 `addListener()` 方法即可，如下所示：

```java
AsyncContext ac = request.startAsync();
ac.addListener(new AsyncListener() {
    @Override
    public void onComplete(AsyncEvent arg0) throws IOException {
        // TODO Auto-generated method stub
    }

    @Override
    public void onError(AsyncEvent arg0) throws IOException {
        // TODO Auto-generated method stub
    }

    @Override
    public void onStartAsync(AsyncEvent arg0) throws IOException {
        // TODO Auto-generated method stub
    }

    @Override
    public void onTimeout(AsyncEvent arg0) throws IOException {
        // TODO Auto-generated method stub
    }

});
```

## 4. HttpServletRequest 对文件上传的支持

此前，对于处理上传文件的操作一直是让开发者头疼的问题，因为 Servlet 本身没有对此提供直接的支持，需要使用第三方框架来实现，而且使用起来也不够简单。如今这都成为了历史，Servlet 3.0 已经提供了这个功能，而且使用也非常简单。为此，`HttpServletRequest` 提供了两个方法用于从请求中解析出上传的文件：

- `Part getPart(String name)`
- `Collection<Part> getParts()`

前者用于获取请求中给定 `name` 的文件，后者用于获取所有的文件。每一个文件用一个 `javax.servlet.http.Part` 对象来表示。该接口提供了处理文件的简易方法，比如 `write()`、`delete()` 等。至此，结合 `HttpServletRequest` 和 `Part` 来保存上传的文件变得非常简单，如下所示：

```java
Part photo = request.getPart("photo"); 
photo.write("/tmp/photo.jpg"); 
// 可以将两行代码简化为 request.getPart("photo").write("/tmp/photo.jpg") 一行。
```

另外，开发者可以配合前面提到的 `@MultipartConfig` 注解来对上传操作进行一些自定义的配置，比如限制上传文件的大小，以及保存文件的路径等。

需要注意的是，如果请求的 MIME 类型不是 `multipart/form-data`，则不能使用上面的两个方法，否则将抛异常。

