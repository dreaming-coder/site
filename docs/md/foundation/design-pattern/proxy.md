# 结构型 - 代理模式

**代理模式**是一种结构型设计模式， 让你能够提供对象的替代品或其占位符。 代理控制着对于原对象的访问， 并允许在将请求提交给对象前后进行一些处理。

## 1. 静态代理

- 抽象角色：一般会使用接口或者抽象类来解决
- 真实角色：被代理的角色
- 代理角色：代理着你是角色，代理真实角色后，我们一般会做一些复数操作
- 客户：访问代理对象的人

以租房举例：

![](/imgs/design-pattern/proxy-1.png)

【抽象角色】

```java
public interface Rent {
    public void rent();
}
```

【真实角色】

```java
public class Host implements Rent{
    @Override
    public void rent() {
        System.out.println("房东要租房子了");
    }
}
```

【代理角色】

```java
public class Agent implements Rent{
    private Host host;

    public Agent(Host host) {
        this.host = host;
    }

    public void seeHouse(){
        System.out.println("中介带你看房");
    }

    public void fare(){
        System.out.println("收中介费");
    }

    @Override
    public void rent() {
        host.rent();
    }
}
```

【客户】

```java
public class Client {
    public static void main(String[] args) {
        Host host = new Host();
        Agent proxy = new Agent(host);
        proxy.seeHouse();
        proxy.rent();
        proxy.fare();
    }
}
```

输出结果：

```
中介带你看房
房东要租房子了
收中介费
```

**代理模式的优点：**

- 可以使真实角色的操作哦更加纯粹，不用去关注一些公共的业务
- 公共业务就交给代理角色，实现了业务的分工
- 公共业务扩展的时候，方便集中管理

**缺点**：

- 一个真实角色就会产生一个代理角色，代码量会翻倍

## 2. 动态代理

- 动态代理和静态代理角色一样
- 动态代理的代理类是动态生成的，不是我们直接写好的
- 动态代理分两大类：**基于接口的动态代理** 和 **基于类的动态代理**
  - 基于接口：JDK 动态代理
  - 基于类：cglib
  - java 字节码实现：javasist

还是以租房为例：

### 2.1 JDK 动态代理

需要了解两个类：`Proxy` 和 `InvocationHandler`

【代理角色】

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

// 这个类自动生成代理类
public class ProxyInvocationHandler implements InvocationHandler {

    // 被代理的接口
    private Rent rent;

    public void setRent(Rent rent) {
        this.rent = rent;
    }

    // 动态生成代理对象
    public Object getProxy() {
        return Proxy.newProxyInstance(this.getClass().getClassLoader(), rent.getClass().getInterfaces(), this);
    }

    @Override
    // 处理代理实例，并返回结果
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("代理中介带你看房");
        Object result = method.invoke(rent, args);
        System.out.println("收中介费");
        return result;
    }
}
```

【客户】

```java
public class Client2 {
    public static void main(String[] args) {
        // 真实角色
        Host host = new Host();
        // 代理角色：现在还没有
        ProxyInvocationHandler pih = new ProxyInvocationHandler();

        // 通过调用程序处理角色来处理我们要调用的接口对象
        pih.setRent(host);

        // 生成代理类实例，即代理对象
        Rent proxy = (Rent) pih.getProxy();
        proxy.rent();
    }
}
```

**通用动态代理处理类**

```java
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class ProxyHandler implements InvocationHandler {

    // 被动态代理的接口
    private Object target;

    public void setTarget(Object target) {
        this.target = target;
    }
	
    // 动态生成代理对象
    public Object getProxy() {
        return Proxy.newProxyInstance(this.getClass().getClassLoader(), target.getClass().getInterfaces(), this);
    }

    @Override
    // 处理代理实例，并返回结果
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // before call method do something
        Object result = method.invoke(target, args);
        // after call method do something

        return result;
    }
}
```

### 2.2 CGLib 动态代理

CGLib 采用了非常底层的字节码技术，其原理是通过字节码技术为一个类创建子类，并在子类中采用方法拦截的技术拦截所有父类方法的调用，顺势织入横切逻辑。JDK 动态代理与 CGLib 动态代理均是实现 Spring AOP 的基础。

【jar包】

```xml
<dependency>
    <groupId>cglib</groupId>
    <artifactId>cglib</artifactId>
    <version>3.3.0</version>
</dependency>
```

【代理类】

```java
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

import java.lang.reflect.Method;

public class CGLibDynamicProxy implements MethodInterceptor {
    @Override
    public Object intercept(Object o, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {

        if (method.getName().equals("rent")) {
            System.out.println("代理中介带你看房");
            methodProxy.invokeSuper(o, args);
            System.out.println("收中介费");
        }

        return null;
    }

    public Object getInstance(){
        Enhancer enhancer = new Enhancer();
        enhancer.setSuperclass(Host.class); // 这里不需要搞个接口了，cglib支持基于类的动态代理
        enhancer.setCallback(this);
        return enhancer.create();
    }
}
```

【客户】

```java
public class Client3 {
    public static void main(String[] args) {
        CGLibDynamicProxy proxy = new CGLibDynamicProxy();
        Rent rent = (Rent) proxy.getInstance();
        rent.rent();
    }
}
```

