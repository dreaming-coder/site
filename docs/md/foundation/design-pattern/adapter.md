# 结构型 - 适配器模式

## 1. 定义

**适配器模式**：定义一个包装类，用于包装不兼容接口的对象

> 1. 包装类 = 适配器 Adapter；
> 2. 被包装对象 = 适配者 Adaptee = 被适配的类

![](/imgs/design-pattern/adapter-1.png)

## 2. 问题示例

- 背景：买了一个进口笔记本电脑
- 冲突：笔记本电脑需要的三项电源，和只提供的二项电源冲突
- 解决方案：设置一个适配器二项充电口转化为三项充电口

**Adaptee 原有的类 提供二项电**

```java
public class TwoPower {
    public void powerByTwo() {
        System.out.println("提供二项供电");
    }
}
```

**Target 目标类  能输出三项供电**

```java
public interface ThreePower {
    /**
     * 三项供电
     */
    void powerByThree();
}
```

**对象适配器，转换类 Adapter**

```java
public class TwoToThreeAdapter implements ThreePower{
    /**
     * 使用委托来完成适配
     */
    private final TwoPower twoPower;

    public TwoToThreeAdapter(TwoPower twoPower) {
        this.twoPower = twoPower;
    }


    @Override
    public void powerByThree() {
        System.out.println("借助组合适配器转化二项电");
        twoPower.powerByTwo();
    }
}
```

**类适配器 转换类 Adapter**

```java
public class TwoToThreeAdapter2 extends TwoPower implements ThreePower{
    @Override
    public void powerByThree() {
        System.out.println("借助继承适配器转化二项电");
        this.powerByTwo();
    }
}
```

**测试**

```java
/**
 * 笔记本电脑 这是使用组合模式的-适配器模式
 */
public class NoteBook {

    /**
     * 期望的三项供电接口
     */
    private final ThreePower threePower;

    public NoteBook(ThreePower threePower) {
        this.threePower = threePower;
    }


    public static void main(String[] args) {
        System.out.println("=============== 继承方式的适配器使用 类适配器 ===============");
        ThreePower threePower1 = new TwoToThreeAdapter2();
        NoteBook noteBook1 = new NoteBook(threePower1);
        noteBook1.recharge();
        noteBook1.work();

        System.out.println("=============== 组合方式的适配器使用 对象适配器 ===============");
        // 现在只有二项供电
        TwoPower twoPower = new TwoPower();
        ThreePower threePower = new TwoToThreeAdapter(twoPower);
        NoteBook noteBook = new NoteBook(threePower);
        // 1. 充电
        noteBook.recharge();
        // 2. 工作
        noteBook.work();
    }

    public void work() {
        System.out.println("笔记本电脑开始工作!");
    }

    public void recharge() {
        // 使用三项充电
        threePower.powerByThree();
    }
}
```

