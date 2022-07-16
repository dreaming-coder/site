# 结构型 - 装饰模式

> 装饰器模式主要对现有的类对象进行包裹和封装，以期望在不改变类对象及其类定义的情况下，为对象添加额外功能。是一种对象结构型模式。需要注意的是，该过程是通过调用被包裹之后的对象完成功能添加的，而不是直接修改现有对象的行为，相当于增加了中间层。类似于 Python 中的 `@` 装饰器。

装饰器模式可以动态的为同一类的不同对象加以修饰以添加新的功能，灵活的对类对象功能进行扩展。

**优点：**

1. 相比较于类的继承来扩展功能，对对象进行包裹更加的灵活；
2. 装饰类和被装饰类相互独立，耦合度较低；

**缺点：**

1. 没有继承结构清晰
2. 包裹层数较多时，难以理解和管理

## 1. 应用场景

- 动态的增加对象的功能
- 不能以派生子类的方式来扩展功能
- 限制对象的执行条件
- 参数控制和检查等

## 2. 原理

![](/imgs/design-pattern/decorator-1.png)

**Component:**

　对象的接口类，定义装饰对象和被装饰对象的共同接口

**ConcreteComponent:**

　被装饰对象的类定义

**Decorator:**

　装饰对象的抽象类，持有一个具体的被修饰对象，并实现接口类继承的公共接口

**ConcreteDecorator:**

　具体的装饰器，负责往被装饰对象添加额外的功能

## 3. 示例

### 3.1 画图

系统中存在一个画圆的类，该类只是用来画圆，以及其他一些大小和位置等参数的控制。

**新加需求：**

- 可以对圆的边进行着色
- 可以对圆填充颜色
- 可以同时对边和内部着色

这个需求的常规方法实现可能如下：

1. 对画圆类进行迭代，以支持边和内部颜色填充 
2. 画圆类作为父类，分别定义三个子类，继承父类的画圆方法，子类分别实现对应的作色需求

上面的两个方法都是可行的，也是比较直观的，这里我们尝试使用装饰器模式来实现，作为以上两种方法的对比。

![](/imgs/design-pattern/decorator-4.png)

【接口类：shape】

```java
public interface Shape {
    void draw();
}
```

【 画圆类：Circle】

```java
public class Circle implements Shape {
    @Override
    public void draw() {
        System.out.print("a circle!");
    }
}
```

【抽象装饰器类：Decorator】

```java
public abstract class Decorator implements Shape {
    
    protected Shape circle;
    
    public Decorator(Shape shape) {
        circle = shape;
    } 
    
    public void draw() {
        circle.draw();
    }
}
```

【为圆边着色装饰器类：CircleEdge】

```java
public class CircleEdge extends Decorator {
    
    public CircleEdge(Shape circle) {
        super(circle);
    }
    
    private void setEdgeColor() {
        System.out.print(", edge with color");
    }
    
    public void draw() {
        circle.draw();
        setEdgeColor();
    }
}
```

【为圆填充颜色装饰器类：CircleEdge】

```java
public class CircleFill extends Decorator {
    
    public CircleFill(Shape circle) {
        super(circle);
    }
    
    private void setEdgeFill() {
        System.out.print(", content with color");
    }
    
    public void draw() {
        circle.draw();
        setEdgeFill();
    }
}
```

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        Shape circle = new Circle();
        circle.draw();
        System.out.println("");
        Decorator circleEdge = new CircleEdge(circle);
        circleEdge.draw();
        System.out.println("");
        Decorator circleFill = new CircleFill(circle);
        circleFill.draw();
        System.out.println("");
        Decorator circleEdgeFill = new CircleFill(circleEdge);
        circleEdgeFill.draw();
    }
}
```

输出结果：

```
a circle!
a circle!, edge with color
a circle!, content with color
a circle!, edge with color, content with color
```

### 3.2 网络数据报封装

接下来我们在使用网络数据传输的例子来体会一下装饰器模式，下图表示的是应用层的文件传输协议FTP通过TCP来传输数据：

![](/imgs/design-pattern/decorator-2.png)

虽然应用层可以越过传输层直接使用网络层进行数据发送(如，ICMP)，但多数都会使用传输层的TCP或者UDP进行数据传输的。

下面我们用装饰器模式来表示一下应用层数据通过传输层来发送数据，UML 类图如下：

![](/imgs/design-pattern/decorator-3.png)

上述图中表示了，应用层的数据通过添加 TCP 头或者 UDP 头，然后通过下面的网络层 send 数据。

【 数据报接口类：Datagram】

```java
public interface Datagram {
    void send();    // 通过网络层发送IP数据报
}
```

【应用层数据类：AppDatagram】

```java
public class AppDatagram implements Datagram {
    @Override
    public void send() {
        System.out.print("send IP datagram!");
    }
}
```

【传输层类（抽象装饰器）：TransportLayer】

```java
public abstract class TransportLayer implements Datagram {
    
    protected Datagram appData;
    
    public TransportLayer(Datagram appData) {
        this.appData = appData;
    } 
    
    public void send() {
        appData.send();
    }
}
```

【添加TCP头部类：UseTCP】

```java
public class UseTCP extends TransportLayer{
    public UseTCP(Datagram appData) {
        super(appData);
    }

    private void addHeader() {
        System.out.print("Appdata add TCP header, ");
    }

    public void send() {
        addHeader();
        appData.send();
    }
}
```

【添加TCP头部类：UseUDP】

```java
public class UseUDP extends TransportLayer{
    public UseUDP(Datagram appData) {
        super(appData);
    }

    private void addHeader() {
        System.out.print("Appdata add UDP header, ");
    }

    public void send() {
        addHeader();
        appData.send();
    }
}
```

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        Datagram appData = new AppDatagram();
        appData.send();
        System.out.println();
        TransportLayer tcpData = new UseTCP(appData);
        tcpData.send();
        System.out.println();
        TransportLayer udpData = new UseUDP(appData);
        udpData.send();
    }
}
```

输出结果：

```
send IP datagram!
Appdata add TCP header, send IP datagram!
Appdata add UDP header, send IP datagram!
```

## 4. 总结

其实所谓装饰器，本质上是对现有类对象的包裹，得到一个加强版的对象。

和 Python 中 @ 装饰器不同的是：

1. Python 中的装饰器是作用于函数或者类定义的，并直接覆盖掉了原来函数或者类的定义
2. 装饰器模式仅仅是修改了已经产生的对象的行为，和类定义没有半点关系

通过上面的两个例子，应该对装饰器模式有了一个简单的认识。

另外，要体会到什么时候用继承什么时候用装饰器。











