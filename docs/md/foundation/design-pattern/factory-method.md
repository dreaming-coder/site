# 创建型 - 工厂模式

> 工厂模式也称简单工厂模式，是创建型设计模式的一种，这种设计模式提供了按需创建对象的最佳方式。同时，这种创建方式不会对外暴露创建细节，并且会通过一个统一的接口创建所需对象。

## 1. 特点

1. **定义：定义一个工厂类，他可以根据参数的不同返回不同类的实例，被创建的实例通常都具有共同的父类。**
2. 在简单工厂模式中用于被创建实例的方法通常为**静态(static)方法**，因此简单工厂模式又被成为**静态工厂方法(Static Factory Method)**。
3. 需要什么，只需要传入一个正确的参数，就可以获取所需要的对象，而无需知道其实现过程。
4. 例如，我开一家披萨店，当客户需要某种披萨并且我这家店里也能做的时候，我就会为其提供所需要的披萨(当然是要钱的哈哈)，如果其所需的我这没有，则是另外的情况，后面会谈。这时候，我这家**披萨店就可以看做工厂(Factory)**，而生产出来的**披萨被成为产品(Product)**，**披萨的名称则被称为参数**，工厂可以根据参数的不同返回不同的产品，这就是**简单工厂模式**。

## 2. 问题提出

假设你正在开发一款物流管理应用。 最初版本只能处理卡车运输， 因此大部分代码都在位于名为 `卡车` 的类中。一段时间后， 这款应用变得极受欢迎。 你每天都能收到十几次来自海运公司的请求， 希望应用能够支持海上物流功能。

![](/imgs/design-pattern/factory-method-1.png)

这可是个好消息。 但是代码问题该如何处理呢？ 目前， 大部分代码都与 `卡车` 类相关。 在程序中添加 `轮船` 类需要修改全部代码。 更糟糕的是， 如果你以后需要在程序中支持另外一种运输方式， 很可能需要再次对这些代码进行大幅修改。

最后， 你将不得不编写繁复的代码， 根据不同的运输对象类， 在应用中进行不同的处理。

## 3. 解决方案

![](/imgs/design-pattern/factory-method-2.svg)

【运输工具】

```java
public interface Transport {
    void deliver();
}
```

【货车运输】

```java
public class Truck implements Transport {
    @Override
    public void deliver() {
        System.out.println("货车运输中...");
    }
}
```

【轮船运输】

```java
public class Ship implements Transport {
    @Override
    public void deliver() {
        System.out.println("轮船运输中...");
    }
}
```

![](/imgs/design-pattern/factory-method-3.svg)

【物流】

```java
public abstract class Logistics {
    protected Transport transport;
    protected abstract Transport createTransport();
    public void playDelivery(){
        System.out.println("物流开始....");
        transport.deliver();
        System.out.println("物流结束....");
    }
}
```

【陆路运输】

```java
public class RoadLogistics extends Logistics{

    public RoadLogistics() {
        super();
        this.transport = createTransport();
    }

    @Override
    protected Transport createTransport() {
        return new Truck();
    }
}
```

【水路运输】

```java
public class SeaLogistics extends Logistics{

    public SeaLogistics() {
        super();
        this.transport = createTransport();
    }

    @Override
    protected Transport createTransport() {
        return new Ship();
    }
}
```

![](/imgs/design-pattern/factory-method-4.png)

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("======第一次物流======");
        Logistics seaLogistics = new SeaLogistics();
        seaLogistics.playDelivery();
        System.out.println("======第二次物流======");
        Logistics roadLogistics = new RoadLogistics();
        roadLogistics.playDelivery();
    }
}
```

输出结果：

```
======第一次物流======
物流开始....
轮船运输中...
物流结束....
======第二次物流======
物流开始....
货车运输中...
物流结束....
```

