# 创建型 - 抽象工厂

> **抽象工厂模式**是一种创建型设计模式， 它能创建一系列相关的对象， 而无需指定其具体类。

![](/imgs/design-pattern/abstract-factory-1.png)

## 1. 问题提出

假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：

1. 一系列相关产品， 例如 `椅子` Chair 、  `沙发` Sofa 和 `咖啡桌` Coffee­Table 。
2. 系列产品的不同变体。 例如， 你可以使用 `现代` Modern 、  `维多利亚` Victorian 、  `装饰风艺术` Art­Deco 等风格生成 `椅子` 、  `沙发` 和 `咖啡桌` 。

![](/imgs/design-pattern/abstract-factory-2.png)

你需要设法单独生成每件家具对象， 这样才能确保其风格一致。 如果顾客收到的家具风格不一样， 他们可不会开心。

![](/imgs/design-pattern/abstract-factory-3.png)

此外， 你也不希望在添加新产品或新风格时修改已有代码。 家具供应商对于产品目录的更新非常频繁， 你不会想在每次更新时都去修改核心代码的。

## 2. 解决方案

每一个模式都是针对一定问题的解决方案。抽象工厂模式与工厂方法模式的最大区别就在于，工厂方法模式针对的是一个产品等级结构；而抽象工厂模式则需要面对多个产品等级结构。

在学习抽象工厂具体实例之前，应该明白两个重要的概念：产品族和产品等级。

所谓产品族，是指位于不同产品等级结构中，功能相关联的产品组成的家族。比如 AMD 的主板、芯片组、CPU 组成一个家族，Intel 的主板、芯片组、CPU 组成一个家族。而这两个家族都来自于三个产品等级：主板、芯片组、CPU。一个等级结构是由相同的结构的产品组成，示意图如下：

![](/imgs/design-pattern/abstract-factory-4.png)

显然，每一个产品族中含有产品的数目，与产品等级结构的数目是相等的。产品的等级结构与产品族将产品按照不同方向划分，形成一个二维的坐标系。横轴表示产品的等级结构，纵轴表示产品族，上图共有两个产品族，分布于三个不同的产品等级结构中。只要指明一个产品所处的产品族以及它所属的等级结构，就可以唯一的确定这个产品。

上面所给出的三个不同的等级结构具有平行的结构。因此，如果采用工厂方法模式，就势必要使用三个独立的工厂等级结构来对付这三个产品等级结构。由于这三个产品等级结构的相似性，会导致三个平行的工厂等级结构。随着产品等级结构的数目的增加，工厂方法模式所给出的工厂等级结构的数目也会随之增加。如下图：

![](/imgs/design-pattern/abstract-factory-5.png)

那么，是否可以使用同一个工厂等级结构来对付这些相同或者极为相似的产品等级结构呢？当然可以的，而且这就是抽象工厂模式的好处。同一个工厂等级结构负责三个不同产品等级结构中的产品对象的创建。

![](/imgs/design-pattern/abstract-factory-6.png)

下面回到家具的案例，我们有一个家具工厂，包含不同的生产线，每个生产线生产不同风格的产品，这样，客户购买时，选择风格后，会调用对应生产线生产对应风格的家具。

![](/imgs/design-pattern/abstract-factory-7.png)


1. 创建家具产品类及其子类

【Chair】

```java
public abstract class Chair{
    public abstract void info();
}
```

【ModernChair】

```java
public class ModernChair extends Chair{
    @Override
    public void info() {
        System.out.println("这是现代风格的椅子");
    }
}
```

【VictorianChair】

```java
public class VictorianChair extends Chair{
    @Override
    public void info() {
        System.out.println("这是维多利亚风格的椅子");
    }
}
```

【ArtDecoChair】

```java
public class ArtDecoChair extends Chair{
    @Override
    public void info() {
        System.out.println("这是装饰风艺术风格的椅子");
    }
}
```

【Sofa】

```java
public abstract class Sofa {
    public abstract void info();
}
```

【ModernSofa】

```java
public class ModernSofa extends Sofa{
    @Override
    public void info() {
        System.out.println("这是现代风格的沙发");
    }
}
```

【VictorianSofa】

```java
public class VictorianSofa extends Sofa{
    @Override
    public void info() {
        System.out.println("这是维多利亚风格的沙发");
    }
}
```

【ArtDecoSofa】

```java
public class ArtDecoSofa extends Sofa{
    @Override
    public void info() {
        System.out.println("这是装饰风艺术风格的沙发");
    }
}
```

【CoffeeTable】

```java
public abstract class CoffeeTable{
    public abstract void info();
}
```

【ModernCoffeeTable】

```java
public class ModernCoffeeTable extends CoffeeTable{
    @Override
    public void info() {
        System.out.println("这是现代风格的咖啡桌");
    }
}
```

【VictorianCoffeeTable】

```java
public class VictorianCoffeeTable extends CoffeeTable{
    @Override
    public void info() {
        System.out.println("这是维多利亚风格的咖啡桌");
    }
}
```

【ArtDecoCoffeeTable】

```java
public class ArtDecoCoffeeTable extends CoffeeTable{
    @Override
    public void info() {
        System.out.println("这是装饰风艺术风格的咖啡桌");
    }
}
```

2. 定义风格枚举类

【FurnitureStyle】

```java
public enum FurnitureStyle {
    Modern,
    Victorian,
    ArtDeco
}
```

3. 创建家具工厂类（抽象工厂）

【FurnitureFactory】

```java
public interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
    CoffeeTable createCoffeeTable();
}
```

4. 创建各种风格生产线（具体工厂）

【ModernLine】

```java
public class ModernLine implements FurnitureFactory{

    @Override
    public Chair createChair() {
        return new ModernChair();
    }

    @Override
    public Sofa createSofa() {
        return new ModernSofa();
    }

    @Override
    public CoffeeTable createCoffeeTable() {
        return new ModernCoffeeTable();
    }
}
```

【VictorianLine】

```java
public class VictorianLine implements FurnitureFactory {

    @Override
    public Chair createChair() {
        return new VictorianChair();
    }

    @Override
    public Sofa createSofa() {
        return new VictorianSofa();
    }

    @Override
    public CoffeeTable createCoffeeTable() {
        return new VictorianCoffeeTable();
    }
}
```

【ArtDecoLine】

```java
public class ArtDecoLine implements FurnitureFactory {

    @Override
    public Chair createChair() {
        return new ArtDecoChair();
    }

    @Override
    public Sofa createSofa() {
        return new ArtDecoSofa();
    }

    @Override
    public CoffeeTable createCoffeeTable() {
        return new ArtDecoCoffeeTable();
    }
}
```

5. 创建客户（调用者）

【Client】

```java
public class Client {
    private FurnitureFactory factory;

    public Client(FurnitureStyle style) {
        if (style == FurnitureStyle.Modern) {
            this.factory = new ModernLine();
        } else if (style == FurnitureStyle.Victorian) {
            this.factory = new VictorianLine();
        } else if (style == FurnitureStyle.ArtDeco) {
            this.factory = new ArtDecoLine();
        } else {
            throw new NoSuchElementException("没有此种风格生产线");
        }
    }

    public void purchaseFurniture() {
        Chair chair = factory.createChair();
        Sofa sofa = factory.createSofa();
        CoffeeTable coffeeTable = factory.createCoffeeTable();
        chair.info();
        sofa.info();
        coffeeTable.info();
    }
}
```

6. 测试

```java
public class Test {
    public static void main(String[] args) {
        Client client = new Client(FurnitureStyle.Victorian);
        client.purchaseFurniture();
    }
}
```

输出结果：

```
这是装饰风艺术风格的椅子
这是装饰风艺术风格的沙发
这是装饰风艺术风格的咖啡桌
```

## 3. 使用场景

1. 一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节，这对于所有形态的工厂模式都是重要的；

2. 这个系统的产品有多于一个的产品族，而系统只消费其中某一族的产品；

3. 同属于同一个产品族的产品是在一起使用的，这一约束必须在系统的设计中体现出来；

4. 系统提供一个产品类的库，所有的产品以同样的接口出现，从而使客户端不依赖于实现。

## 4. 抽象工厂模式的优点

- **分离接口和实现**

  客户端使用抽象工厂来创建需要的对象，而客户端根本就不知道具体的实现是谁，客户端只是面向产品的接口编程而已。也就是说，客户端从具体的产品实现中解耦。

- **使切换产品族变得容易**

  因为一个具体的工厂实现代表的是一个产品族，比如上面例子的从 Intel 系列到 AMD 系列只需要切换一下具体工厂。

## 5. 抽象工厂模式的缺点

- **不太容易扩展新的产品**

  如果需要给整个产品族添加一个新的产品，那么就需要修改抽象工厂，这样就会导致修改所有的工厂实现类。

