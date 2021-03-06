# 结构型 - 桥接模式

## 1. 定义

桥接模式（Bridge Pattern），将抽象部分与它的实现部分分离，使它们都可以独立地变化。更容易理解的表述是：实现系统可从多种维度分类，桥接模式将各维度抽象出来，各维度独立变化，之后可通过聚合，将各维度组合起来，减少了各维度间的耦合。

## 2. 问题示例

我们都去买过手机，手机按照品牌分可以分为华为、小米、OPPO、vivo 等品牌，如果这些手机按照内存分又可以分为 4 G、6 G、8 G等等。假如我们每一种手机都想要玩一下，至少需要 4×3 个。这对我们来说这些手机也太多了，竟然有 12 个，最主要的是手机品牌和内存是放在一起的。现在有这样一种机制，手机牌品商是一个公司，做手机内存的是一个公司，想要做什么手机我们只需要让其两者搭配起来即可。有点类似于全球贸易分工明确的思想，这就是桥接模式，把两个不同维度的东西桥接起来。

从上面的例子我们可以看到，我们的手机可以从两个维度进行变化，一个是品牌，一个是内存。此时我们就可以通过桥接模式将这两个维度分离开来，每一个维度都可以独立扩展。比如说手机品牌，可以又出现了苹果、三星、锤子等等。内存方面又可以生产 10 G、16 G 的了。从专业的角度来看可以这样定义桥接模式：

> 桥接模式是一种很实用的结构型设计模式，如果软件系统中某个类存在两个独立变化的维度，通过该模式可以将这两个维度分离出来，使两者可以独立扩展，让系统更加符合“单一职责原则”。

上面的例子我们画一张类图来表示一下：

![](/imgs/design-pattern/bridge-1.jpeg)

基本上意思就是这，也就是我们买手机的时候有两个维度可供我们选择：一个是品牌一个是内存。

（1）Client：指的是我们买手机的人

（2）Abstraction（抽象类）：指的是手机抽象类

（3）Refined Abstraction（具体类）：指的是具体手机品牌

（4）Implementor：在这里相当于手机的其他组件，内存

（5）Concrete Implementor：具体的内存型号

## 3. 桥接实现

第一步：定义 Implementor，这里定义手机内存接口

```java
public interface Memory {
    void addMemory();
}
```

第二步：定义 Concrete Implementor，这里指具体的内存

内存这里定义了两种一种是 6 G，一种是 8 G

```java
public class Memory6G implements Memory{
    @Override
    public void addMemory() {
        System.out.println("手机安装了6G内存");
    }
}
// ---------------------------------------
public class Memory8G implements Memory{
    @Override
    public void addMemory() {
        System.out.println("手机安装了8G内存");
    }
}
```

第三步：定义 Abstraction 手机抽象类

```java
public abstract class Phone {
    protected Memory phoneMemory;

    public void setPhoneMemory(Memory phoneMemory) {
        this.phoneMemory = phoneMemory;
    }
    public abstract void buyPhone();
}
```

第四步：定义Refined Abstraction（具体的手机品牌）

首先是华为

```java
public class HuaWei extends Phone{
    @Override
    public void buyPhone() {
        phoneMemory.addMemory();
        System.out.println("购买华为手机");
    }
}
```

然后是小米

```java
public class Mi extends Phone{
    @Override
    public void buyPhone() {
        phoneMemory.addMemory();
        System.out.println("购买小米手机");
    }
}
```

第五步：测试一下

```java
public class Client {
    public static void main(String[] args) {
        // 华为8G手机
        System.out.println("====== 华为8G手机 ======");
        HuaWei huaWei = new HuaWei();
        huaWei.setPhoneMemory(new Memory8G());
        huaWei.buyPhone();
        // 小米6G手机
        System.out.println("====== 小米6G手机 ======");
        Mi mi = new Mi();
        mi.setPhoneMemory(new Memory6G());
        mi.buyPhone();
    }
}
```

```
====== 华为8G手机 ======
手机安装了8G内存
购买华为手机
====== 小米6G手机 ======
手机安装了6G内存
购买小米手机
```

从代码就可以看出，购买手机的时候，品牌和内存两个维度是分开的。下面我们分析一下这个桥接模式

## 4. 分析桥接模式

### 4.1 为什么使用桥接模式不使用继承呢？

继承是一种强耦合关系，子类与父类有非常紧密的依赖关系，父类的任何变化都会导致子类发生变化。因此才使用桥接模式，使用了桥接模式之后，我们的两个维度就像桥梁一样被链接了起来。体现了松耦合的特性。

### 4.2 桥接模式的优点

1. 分离抽象和实现部分：把手机、内存抽象出来。实现与之分离。
2. 松耦合：两个维度分开
3. 单一职责原则：每个维度各干各的活

关于桥接模式的使用场景我觉得你只需要知道他的思想，然后在遇到问题的时候能够想到这种模式即可。

