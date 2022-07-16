# Spring 基础  - 面向切面 (AOP)

> 本文转自 [Spring 核心之面向切面编程 (AOP)](https://www.pdai.tech/md/spring/spring-x-framework-aop.html)。 —— @pdai

## 1. 如何理解 AOP

> AOP 的本质也是为了解耦，它是一种设计思想，在理解时也应该简化理解。

### 1.1 AOP 是什么

> AOP 为 Aspect Oriented Programming 的缩写，意为：面向切面编程。

AOP 最早是 AOP 联盟的组织提出的，指定的一套规范，Spring 将 AOP 的思想引入框架之中，通过**预编译方式**和**运行期间动态代理**实现程序的统一维护的一种技术。

先来看一个例子， 如何给如下 UserServiceImpl 中所有方法添加进入方法的日志：

```java
public class UserServiceImpl implements IUserService {

    /**
     * find user list.
     *
     * @return user list
     */
    @Override
    public List<User> findUserList() {
        System.out.println("execute method： findUserList");
        return Collections.singletonList(new User("pdai", 18));
    }

    /**
     * add user
     */
    @Override
    public void addUser() {
        System.out.println("execute method： addUser");
        // do something
    }
}
```

我们将记录日志功能解耦为日志切面，它的目标是解耦。进而引出 AOP 的理念：就是将分散在各个业务逻辑代码中相同的代码通过**横向切割**的方式抽取到一个独立的模块中！

![](/imgs/spring/aop-basic-1.png)

OOP 面向对象编程，针对业务处理过程的实体及其属性和行为进行抽象封装，以获得更加清晰高效的逻辑单元划分。而AOP则是针对业务处理过程中的切面进行提取，它所面对的是处理过程的某个步骤或阶段，以获得逻辑过程的中各部分之间低耦合的隔离效果。这两种设计思想在目标上有着本质的差异。

![](/imgs/spring/aop-basic-2.png)

### 1.2 AOP 术语

> 首先让我们从一些重要的 AOP 概念和术语开始。**这些术语不是 Spring 特有的**。

- **连接点（Jointpoint）**：表示需要在程序中插入横切关注点的扩展点，**连接点可能是类初始化、方法执行、方法调用、字段调用或处理异常等等**，Spring 只支持方法执行连接点，在 AOP 中表示为**在哪里干**。
- **切入点（Pointcut）**： 选择一组相关连接点的模式，即可以认为连接点的集合，Spring 支持 perl5 正则表达式和 AspectJ 切入点模式，Spring 默认使用 AspectJ 语法，在 AOP 中表示为**在哪里干的集合**。
- **通知（Advice）**：在连接点上执行的行为，通知提供了在 AOP 中需要在切入点所选择的连接点处进行扩展现有行为的手段；包括前置通知 (before advice)、后置通知 (after advice)、环绕通知 (around advice)，在 Spring 中通过代理模式实现 AOP，并通过拦截器模式以环绕连接点的拦截器链织入通知，在 AOP 中表示为**干什么**。
- **方面/切面（Aspect）**：横切关注点的模块化，比如上边提到的日志组件。可以认为是通知、引入和切入点的组合；在 Spring 中可以使用 XML Schema 和 `@AspectJ` 方式进行组织实现；在 AOP 中表示为**在哪干和干什么集合**。
- **引入（inter-type declaration）**：也称为内部类型声明，为已有的类添加额外新的字段或方法，Spring 允许引入新的接口（必须对应一个实现）到所有被代理对象（目标对象）, 在 AOP 中表示为**干什么（引入什么）**。
- **目标对象（Target Object）**：需要被织入横切关注点的对象，即该对象是切入点选择的对象，需要被通知的对象，从而也可称为被通知对象；由于 Spring AOP 通过代理模式实现，从而这个对象永远是被代理对象，在 AOP 中表示为**对谁干**。
- **织入（Weaving）**：把切面连接到其它的应用程序类型或者对象上，并创建一个被通知的对象。这些可以在编译时（例如使用 AspectJ 编译器），类加载时和运行时完成。Spring 和其他纯 Java AOP 框架一样，在运行时完成织入。在 AOP 中表示为**怎么实现的**。
- **AOP代理（AOP Proxy）**：AOP 框架使用代理模式创建的对象，从而实现在连接点处插入通知（即应用切面），就是通过代理来对目标对象应用切面。在 Spring 中，AOP 代理可以用 JDK 动态代理或 CGLIB 代理实现，而通过拦截器模型应用切面。在 AOP 中表示为**怎么实现的一种典型方式**。

> **通知类型**：

- **前置通知（Before advice）**：在某连接点之前执行的通知，但这个通知不能阻止连接点之前的执行流程（除非它抛出一个异常）。
- **后置通知（After returning advice）**：在某连接点正常完成后执行的通知：例如，一个方法没有抛出任何异常，正常返回。
- **异常通知（After throwing advice）**：在方法抛出异常退出时执行的通知。
- **最终通知（After (finally) advice）**：当某连接点退出的时候执行的通知（不论是正常返回还是异常退出）。
- **环绕通知（Around Advice）**：包围一个连接点的通知，如方法调用。这是最强大的一种通知类型。环绕通知可以在方法调用前后完成自定义的行为。它也会选择是否继续执行连接点或直接返回它自己的返回值或抛出异常来结束执行。

环绕通知是最常用的通知类型。和 AspectJ 一样，Spring 提供所有类型的通知，我们推荐你使用尽可能简单的通知类型来实现需要的功能。例如，如果你只是需要一个方法的返回值来更新缓存，最好使用后置通知而不是环绕通知，尽管环绕通知也能完成同样的事情。用最合适的通知类型可以使得编程模型变得简单，并且能够避免很多潜在的错误。比如，你不需要在 JoinPoint 上调用用于环绕通知的 `proceed()` 方法，就不会有调用的问题。

> 我们把这些术语串联到一起，方便理解。

![](/imgs/spring/aop-basic-3.png)

### 1.3  Spring AOP 和 AspectJ 是什么关系

- **首先AspectJ是什么**？{.ul-title}

AspectJ 是一个 Java 实现的 AOP 框架，它能够对 Java 代码进行 AOP 编译（一般在编译期进行），让 Java 代码具有 AspectJ 的 AOP 功能（当然需要特殊的编译器）。

可以这样说，AspectJ 是目前实现 AOP 框架中最成熟，功能最丰富的语言，更幸运的是，AspectJ 与 Java 程序完全兼容，几乎是无缝关联，因此对于有 Java 编程基础的工程师，上手和使用都非常容易。

- **其次，为什么需要理清楚 Spring AOP 和 AspectJ 的关系**？{.ul-title}

 我们看下 `@Aspect` 以及增强的几个注解，为什么不是 Spring 包，而是来源于 AspectJ 呢？

![](/imgs/spring/aop-basic-4.png)

- **Spring AOP 和 AspectJ 是什么关系**？{.ul-title}

1. AspectJ 是更强的 AOP 框架，是实际意义的 **AOP 标准**；
2. Spring 为何不写类似 AspectJ 的框架？ Spring AOP 使用纯 Java 实现，它不需要专门的编译过程，它一个**重要的原则就是无侵入性（non-invasiveness）**。 Spring 小组完全有能力写类似的框架，只是 Spring AOP 从来没有打算通过提供一种全面的 AOP 解决方案来与 AspectJ 竞争。Spring 的开发小组相信无论是基于代理（proxy-based）的框架如 Spring AOP 或者是成熟的框架如 AspectJ 都是很有价值的，他们之间应该是**互补而不是竞争的关系**。
3. Spring 小组喜欢 `@AspectJ` 注解风格更胜于 Spring XML 配置； 所以**在 Spring 2.0 使用了和 AspectJ 5 一样的注解，并使用 AspectJ 来做切入点解析和匹配**。**但是，AOP 在运行时仍旧是纯的 Spring AOP，并不依赖于 AspectJ 的编译器或者织入器（weaver）**。
4. Spring 2.5 对 AspectJ 的支持：在一些环境下，增加了对 AspectJ 的装载时编织支持，同时提供了一个新的 bean 切入点。

- **更多关于 AspectJ**？{.ul-title}

了解 AspectJ 应用到 Java 代码的过程（这个过程称为织入），对于织入这个概念，可以简单理解为 Aspect (切面) 应用到目标函数 (类) 的过程。

对于这个过程，一般分为**动态织入**和**静态织入**：

1. 动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的，如 Java JDK 的动态代理(Proxy，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)，Spring AOP 采用的就是基于运行时增强的代理技术。
2. ApectJ 采用的就是静态织入的方式。ApectJ 主要采用的是编译期织入，在这个期间使用 Aspect 的 acj 编译器(类似 javac)把 Aspect 类编译成 class 字节码后，在 Java 目标类编译时织入，即先编译 Aspect 类再编译目标类。

![](/imgs/spring/aop-basic-5.png)

## 2. AOP 的配置方式

> 这里注意下，XML Schema 配置和注解形式通知的执行顺序不一致，不同版本的 Spring jar 包顺序也不一定一致。

### 2.1 XML Schema 配置方式

Spring 提供了使用 "aop" 命名空间来定义一个切面，我们来看个例子：

> 本部分代码见 [**spring-framework-demo-aop-xml**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-aop-xml)。

- **定义目标类**

```java
package com.ice.springframework.service;

public class AopDemoServiceImpl {

    public void doMethod1() {
        System.out.println("AopDemoServiceImpl.doMethod1()");
    }

    public String doMethod2() {
        System.out.println("AopDemoServiceImpl.doMethod2()");
        return "hello world";
    }

    public String doMethod3() throws Exception {
        System.out.println("AopDemoServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```

- **定义切面类**

```java
package com.ice.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;

public class LogAspect {

    // 环绕通知
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object obj = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return obj;
    }

    // 前置通知
    public void doBefore() {
        System.out.println("前置通知");
    }

    // 后置通知
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    // 异常通知
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    // 最终通知
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```

- **XML 配置 AOP**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                        http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="com.ice.springframework"/>
    <aop:aspectj-autoproxy/>

    <!--  目标类  -->
    <bean id="demoService" class="com.ice.springframework.service.AopDemoServiceImpl">
        <!-- configure properties of bean here as normal -->
    </bean>

    <!-- 切面  -->
    <bean id="logAspect" class="com.ice.springframework.aspect.LogAspect">
        <!-- configure properties of aspect here as normal -->
    </bean>

    <aop:config>
        <!--  配置切面  -->
        <aop:aspect ref="logAspect">
            <!--  配置切入点  -->
            <aop:pointcut id="pointcutMethod" expression="execution(* com.ice.springframework.service.*.*(..))"/>
            <!--  环绕通知  -->
            <aop:around method="doAround" pointcut-ref="pointcutMethod"/>
            <!-- 前置通知 -->
            <aop:before method="doBefore" pointcut-ref="pointcutMethod"/>
            <!-- 后置通知；returning属性：用于设置后置通知的第二个参数的名称，类型是Object -->
            <aop:after-returning method="doAfterReturning" pointcut-ref="pointcutMethod" returning="result"/>
            <!-- 异常通知：如果没有异常，将不会执行增强；throwing属性：用于设置通知第二个参数的的名称、类型-->
            <aop:after-throwing method="doAfterThrowing" pointcut-ref="pointcutMethod" throwing="e"/>
            <!-- 最终通知 -->
            <aop:after method="doAfter" pointcut-ref="pointcutMethod"/>
        </aop:aspect>
    </aop:config>
</beans>
```

- **测试类**

```java
package com.ice.springframework;

import com.ice.springframework.service.AopDemoServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("aop.xml");
        AopDemoServiceImpl service = context.getBean("demoService", AopDemoServiceImpl.class);

        service.doMethod1();
        service.doMethod2();
        try {
            service.doMethod3();
        } catch (Exception e) {
            // e.printStackTrace();
        }
    }
}
```

- **输出结果**

```java
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod1()
环绕通知: 退出方法
最终通知
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod2()
环绕通知: 退出方法
后置通知, 返回值: hello world
最终通知
-----------------------
环绕通知: 进入方法
前置通知
AopDemoServiceImpl.doMethod3()
异常通知, 异常: some exception
最终通知
```

### 2.2 AspectJ 注解方式

基于 XML 的声明存在一些不足，需要在 Spring 配置文件配置大量的代码信息，为了解决这个问题，Spring 使用了 AspectJ 框架为 AOP 的实现提供了一套注解。

|     注解名称      |                             解释                             |
| :---------------: | :----------------------------------------------------------: |
|     `@Aspect`     |                      用来定义一个切面。                      |
|    `@pointcut`    |                    用于定义切入点表达式。                    |
|     `@Before`     |           用于定义前置通知，相当于 BeforeAdvice。            |
| `@AfterReturning` |       用于定义后置通知，相当于 AfterReturningAdvice。        |
|     `@Around`     |         用于定义环绕通知，相当于 MethodInterceptor。         |
| `@AfterThrowing`  | 用于定义异常通知来处理程序中未处理的异常，相当于 ThrowAdvice。 |
|     `@After`      |   用于定义最终 final 通知，不管是否异常，该通知都会执行。    |
| `@DeclareParents` | 用于定义引介通知，相当于 IntroductionInterceptor (不要求掌握)。 |

> Spring AOP 的实现方式是动态织入，动态织入的方式是在运行时动态将要增强的代码织入到目标类中，这样往往是通过动态代理技术完成的；**如 Java JDK 的动态代理(Proxy，底层通过反射实现)或者 CGLIB 的动态代理(底层通过继承实现)**，Spring AOP 采用的就是基于运行时增强的代理技术。所以我们看下如下的两个例子：
>
> - 基于 JDK 代理例子
> - 基于 Cglib 代理例子

> 本部分代码见 [**spring-framework-demo-aop-annotation**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-aop-annotation)。

#### 2.2.1 接口使用 JDK 代理

- **定义 service 接口**

```java
package com.ice.springframework.service;

public interface JDKProxyService {
    void doMethod1();

    String doMethod2();

    String doMethod3() throws Exception;
}
```

- **定义 service 实现类**

```java
package com.ice.springframework.service;

import org.springframework.stereotype.Service;

@Service
public class JDKProxyServiceImpl implements JDKProxyService{
    @Override
    public void doMethod1() {
        System.out.println("JDKProxyServiceImpl.doMethod1()");
    }

    @Override
    public String doMethod2() {
        System.out.println("JDKProxyServiceImpl.doMethod2()");
        return "hello world";
    }

    @Override
    public String doMethod3() throws Exception {
        System.out.println("JDKProxyServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```

- **定义切面**

```java
package com.ice.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;


@EnableAspectJAutoProxy
@Component
@Aspect
public class LogAspect {

    @Pointcut("execution(* com.ice.springframework.service.*.*(..))")
    private void pointCutMethod() {
    }


    // 环绕通知
    @Around("pointCutMethod()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    // 前置通知
    @Before("pointCutMethod()")
    public void doBefore() {
        System.out.println("前置通知");
    }


    // 后置通知
    @AfterReturning(pointcut = "pointCutMethod()", returning = "result")
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    //异常通知
    @AfterThrowing(pointcut = "pointCutMethod()", throwing = "e")
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    // 最终通知
    @After("pointCutMethod()")
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```

- **输出**

```java
-----------------------
环绕通知: 进入方法
前置通知
JDKProxyServiceImpl.doMethod1()
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
JDKProxyServiceImpl.doMethod2()
后置通知, 返回值: hello world
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
JDKProxyServiceImpl.doMethod3()
异常通知, 异常: some exception
最终通知
```

#### 2.2.2 非接口使用 Cglib 代理

- **类定义**

```java
package com.ice.springframework.service;

import org.springframework.stereotype.Service;

@Service
public class CglibProxyServiceImpl {
    public void doMethod1() {
        System.out.println("CglibProxyServiceImpl.doMethod1()");
    }

    public String doMethod2() {
        System.out.println("CglibProxyServiceImpl.doMethod2()");
        return "hello world";
    }

    public String doMethod3() throws Exception {
        System.out.println("CglibProxyServiceImpl.doMethod3()");
        throw new Exception("some exception");
    }
}
```

- **切面定义** (同上)

```java
package com.ice.springframework.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;


@EnableAspectJAutoProxy
@Component
@Aspect
public class LogAspect {

    @Pointcut("execution(* com.ice.springframework.service.*.*(..))")
    private void pointCutMethod() {
    }


    // 环绕通知
    @Around("pointCutMethod()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("-----------------------");
        System.out.println("环绕通知: 进入方法");
        Object o = pjp.proceed();
        System.out.println("环绕通知: 退出方法");
        return o;
    }

    // 前置通知
    @Before("pointCutMethod()")
    public void doBefore() {
        System.out.println("前置通知");
    }


    // 后置通知
    @AfterReturning(pointcut = "pointCutMethod()", returning = "result")
    public void doAfterReturning(String result) {
        System.out.println("后置通知, 返回值: " + result);
    }

    //异常通知
    @AfterThrowing(pointcut = "pointCutMethod()", throwing = "e")
    public void doAfterThrowing(Exception e) {
        System.out.println("异常通知, 异常: " + e.getMessage());
    }

    // 最终通知
    @After("pointCutMethod()")
    public void doAfter() {
        System.out.println("最终通知");
    }
}
```

- **输出**

```
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyServiceImpl.doMethod1()
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyServiceImpl.doMethod2()
后置通知, 返回值: hello world
最终通知
环绕通知: 退出方法
-----------------------
环绕通知: 进入方法
前置通知
CglibProxyServiceImpl.doMethod3()
异常通知, 异常: some exception
最终通知
```

## 3. AOP 使用问题小结

### 3.1 切入点（pointcut）的申明规则?

Spring AOP 用户可能会经常使用 execution 切入点指示符。执行表达式的格式如下：

```java
execution（modifiers-pattern? ret-type-pattern declaring-type-pattern? name-pattern（param-pattern） throws-pattern?）
```

- `ret-type-pattern` 返回类型模式，`name-pattern` 名字模式和 `param-pattern` 参数模式是必选的， 其它部分都是可选的。返回类型模式决定了方法的返回类型必须依次匹配一个连接点。 你会使用的最频繁的返回类型模式是 `*`，**它代表了匹配任意的返回类型**。
- `declaring-type-pattern`，一个全限定的类型名将只会匹配返回给定类型的方法。
- `name-pattern` 名字模式匹配的是方法名。 你可以使用 `*` 通配符作为所有或者部分命名模式。
- `param-pattern` 参数模式稍微有点复杂：`()` 匹配了一个不接受任何参数的方法， 而 `(..)` 匹配了一个接受任意数量参数的方法（零或者更多）。 模式 `(*)` 匹配了一个接受一个任何类型的参数的方法。 模式 `(*,String)` 匹配了一个接受两个参数的方法，第一个可以是任意类型， 第二个则必须是 `String` 类型。

对应到我们上面的例子：

![](/imgs/spring/aop-basic-6.png)

除了最常用的 `execution`，还有两种切入点指示符：

- `within`

> 描述**包**和**类**，**包或类**中**所有方法**都切入。

```java
within(com.service.UserviceImpl)  类中的所有方法
within(com..UserServiceImpl) com包和com子包下的类中的所有方法
```

- `args`

> 描述**参数列表**，符合的方法都切入

```java
args(int, String, com.entity.User)  方法的参数表和指定参数一致的方法
```

- `this(表达式)`

> 表示代理对象必须实现指定类(族)的接口

- `target(表达式)`

> 表示被代理类必须是表达式指定的类(族)

```java
target(com.xyz.service.AccountService)  目标对象实现AccountService接口的任何连接点(
```

此外 Spring 支持如下三个逻辑运算符来组合切入点表达式：

- `&&`：要求连接点同时匹配两个切入点表达式
- `||`：要求连接点匹配任意个切入点表达式
- `!`：要求连接点不匹配指定的切入点表达式

### 3.2 多种增强通知的顺序？

如果有多个通知想要在同一连接点运行会发生什么？Spring AO P遵循跟 AspectJ 一样的优先规则来确定通知执行的顺序。 在“进入”连接点的情况下，最高优先级的通知会先执行（所以给定的两个前置通知中，优先级高的那个会先执行）。 在“退出”连接点的情况下，最高优先级的通知会最后执行。（所以给定的两个后置通知中， 优先级高的那个会第二个执行）。

当定义在不同的切面里的两个通知都需要在一个相同的连接点中运行， 那么除非你指定，否则执行的顺序是未知的。你可以通过指定优先级来控制执行顺序。 在标准的 Spring 方法中可以在切面类中实现 `org.springframework.core.Ordered` 接口或者用 **Order 注解**做到这一点。在两个切面中， `Ordered.getValue()` 方法返回值（或者注解值）较低的那个有更高的优先级。

当定义在相同的切面里的两个通知都需要在一个相同的连接点中运行， 执行的顺序是未知的（因为这里没有方法通过反射javac编译的类来获取声明顺序）。 考虑在每个切面类中按连接点压缩这些通知方法到一个通知方法，或者重构通知的片段到各自的切面类中 - 它能在切面级别进行排序。

### 3.3 Spring AOP 和 AspectJ 之间的关键区别？

AspectJ可以做Spring AOP干不了的事情，**它是AOP编程的完全解决方案，Spring AOP则致力于解决企业级开发中最普遍的AOP**（方法织入）。

下表总结了 Spring AOP 和 AspectJ 之间的关键区别：

|                    Spring AOP                    |                           AspectJ                            |
| :----------------------------------------------: | :----------------------------------------------------------: |
|                 在纯 Java 中实现                 |                 使用 Java 编程语言的扩展实现                 |
|               不需要单独的编译过程               |         除非设置 LTW，否则需要 AspectJ 编译器 (ajc)          |
|                只能使用运行时织入                |       运行时织入不可用。支持编译时、编译后和加载时织入       |
|           功能不强 - 仅支持方法级编织            | 更强大 - 可以编织字段、方法、构造函数、静态初始值设定项、最终类/方法等......。 |
|      只能在由 Spring 容器管理的 bean 上实现      |                    可以在所有域对象上实现                    |
|               仅支持方法执行切入点               |                        支持所有切入点                        |
| 代理是由目标对象创建的，并且切面应用在这些代理上 | 在执行应用程序之前 (在运行时) 前, 各方面直接在代码中进行织入 |
|                比 AspectJ 慢多了                 |                          更好的性能                          |
|                  易于学习和应用                  |                 相对于 Spring AOP 来说更复杂                 |

### 3.4 Spring AOP 还是完全用 AspectJ？

以下 Spring 官方的回答：（总结来说就是 **Spring AOP 更易用，AspectJ 更强大**）。

- Spring AOP 比完全使用 AspectJ 更加简单， 因为它不需要引入 AspectJ 的编译器／织入器到你开发和构建过程中。 如果你**仅仅需要在 Spring bean 上通知执行操作，那么 Spring AOP 是合适的选择**。
- 如果你需要通知 domain 对象或其它没有在 Spring 容器中管理的任意对象，那么你需要使用 AspectJ。
- 如果你想通知除了简单的方法执行之外的连接点（如：调用连接点、字段 ge t或 set 的连接点等等）， 也需要使用 AspectJ。

当使用 AspectJ 时，你可以选择使用 AspectJ 语言（也称为“代码风格”）或 @AspectJ 注解风格。 如果切面在你的设计中扮演一个很大的角色，并且你能在 Eclipse 等 IDE 中使用 AspectJ Development Tools (AJDT)， 那么首选 AspectJ 语言 ：因为该语言专门被设计用来编写切面，所以会更清晰、更简单。如果你没有使用 Eclipse 等 IDE，或者在你的应用中只有很少的切面并没有作为一个主要的角色，你或许应该考虑使用 @AspectJ 风格，并在你的 IDE 中附加一个普通的 Java 编辑器，并且在你的构建脚本中增加切面织入（链接）的段落。

## 参考文章

- http://shouce.jb51.net/spring/aop.html#aop-ataspectj

- https://www.cnblogs.com/linhp/p/5881788.html

- https://www.cnblogs.com/bj-xiaodao/p/10777914.html

