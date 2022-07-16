# 创建型 - 建造者模式

建造者模式实际上是常用的设计模式。顾名思义，builder 的意思是建造者或者建筑工人，谈到建造自然会想到楼房。楼房是千差万别的，楼房的外形、层数、内部房间的数量、房间的装饰等等都不一样，但是对于建造者来说，抽象出来的建筑流程是确定的，往往建筑一座楼房包括下面的步骤：（1）打桩，建立基础（2）建立框架等。

建造者模式的本质和建造楼房是一致的：即流程不变，但每个流程实现的具体细节则是经常变化的。建造者模式的好处就是保证了流程不会变化，流程即不会增加、也不会遗漏或者产生流程次序错误，这是非常重要的。我们熟知的楼歪歪事件，官方的解释就是由于先建立楼房后，再建设停车场造成的，这是典型的建造次序错乱。

> 建造者模式：是将一个复杂的对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

建造者模式通常包括下面几个角色：

- Builder：给出一个抽象接口，以规范产品对象的各个组成成分的建造。这个接口规定要实现复杂对象的哪些部分的创建，并不涉及具体的对象部件的创建。
- ConcreteBuilder：实现 Builder 接口，针对不同的商业逻辑，具体化复杂对象的各部分的创建。 在建造过程完成后，提供产品的实例。
- Director：调用具体建造者来创建复杂对象的各个部分，在指导者中不涉及具体产品的信息，只负责保证对象各部分完整创建或按某种顺序创建。
- Product：要创建的复杂对象（不是必须的，有些情况仅仅是流程）。

![](/imgs/design-pattern/builder-1.png)

## 示例 1

为了身体健康，我们每个人都断练过，而学生有男有女，由于身体差异，能做的动作也是迥然不同，但是都是有着先后顺序，假设我们锻炼都要做三组动作，而男女生的动作并不相同，我们在实现这个过程时可以让男女生分别实现锻炼这个接口，在自己的类中实现不同的锻炼动作。

【Builder】

```java
public interface Exercise {
    Exercise first();
    Exercise second();
    Exercise third();
}
```

【ConcreteBuilder 】

```java
public class Boy implements Exercise{
    @Override
    public Exercise first() {
        System.out.println("卧推");
        return this;
    }

    @Override
    public Exercise second() {
        System.out.println("高位下拉");
        return this;
    }

    @Override
    public Exercise third() {
        System.out.println("硬拉");
        return this;
    }
}
```

```java
public class Girl implements Exercise {
    @Override
    public Exercise first() {
        System.out.println("跑步机慢跑");
        return this;
    }

    @Override
    public Exercise second() {
        System.out.println("引体向上");
        return this;
    }

    @Override
    public Exercise third() {
        System.out.println("仰卧起坐");
        return this;
    }
}
```

【Director】

```java
public class Student {
    private Exercise exercise;

    public Student(Exercise exercise) {
        this.exercise = exercise;
    }

    public void doExercise() {
        exercise.first().second().third();
    }
}
```

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        Student girl = new Student(new Girl());
        girl.doExercise();
        System.out.println("===========================");
        Student boy = new Student(new Boy());
        boy.doExercise();
    }
}
```

输出结果：

```
跑步机慢跑
引体向上
仰卧起坐
===========================
卧推
高位下拉
硬拉
```

## 示例 2

下面我们看一个 KFC 点套餐的例子，我们点餐可以点一个汉堡和一个冷饮，汉堡可以是鸡肉汉堡、虾堡等等，是装在盒子中的，冷饮可以是可乐、雪碧等等，是装在瓶子中的。下面我们来用建造者模式对其进行组合，用户只需提交订单即可，UML 图如下：

![](/imgs/design-pattern/builder-2.png)

【Item 接口】

创建一个表示食物条目和食物包装的接口。

```java
public interface Item {

    //获取食物名称
    public String getName();
    //获取包装
    public Packing packing();
    //获取价格
    public float getPrice();

}
```

【可包装接口及其实现类】

Packable 接口的实现类。Wrapper 为纸盒包装，Bottle为瓶装。

```java
public interface Packable {

    //获取包装类型
    public String getPack();

}
```

```java
public class Wrapper implements Packable {

    @Override
    public String getPack() {
        return "纸盒";
    }

}
```

```java
public class Bottle implements Packable {

    @Override
    public String getPack() {
        return "纸杯";
    }

}
```

【食品类】

创建实现 Item 接口的抽象类。Burger 为汉堡，Drink 为饮品。

```java
public abstract class Burger implements Item {

    @Override
    public Packing packing() {
        return new Wrapper();
    }

    @Override
    public abstract float getPrice();

}
```

```java
public abstract class Drink implements Item {

    @Override
    public Packing packing() {
        return new Bottle();
    }

    @Override
    public abstract float getPrice();

}
```

【具体食品类】

创建扩展了 Burger 和 Drink 的具体实现类。这里简单的就设为 Burger1、Burger2、Drink1、Drink2。各写一个，多余的就不赘述了。

```java
public class Burger1 extends Burger {

    @Override
    public String getName() {
        return "汉堡1";
    }

    @Override
    public float getPrice() {
        return 25.0f;
    }

}
```

```java
public class Drink1 extends Drink {

    @Override
    public String getName() {
        return "饮品1";
    }

    @Override
    public float getPrice() {
        return 15.0f;
    }

}
```

【Meal 类】

```java
public class Meal {

    private List<Item> items = new ArrayList<>();

    public void addItem(Item item) {
        items.add(item);
    }

    //获取总消费
    public float getCost() {
        float cost = 0.0f;

        for (Item item : items) {
            cost += item.getPrice();
        }

        return cost;
    }

    public void showItem() {
        for (Item item : items) {
            System.out.print("餐品：" + item.getName());
            System.out.print("，包装：" + item.packing().getPack());
            System.out.println("，价格：￥" + item.getPrice());
        }
    }

}
```

【套餐类】

```java
public class Package {
    //套餐 1
    public Meal package1() {
        Meal meal = new Meal();
        meal.addItem(new Burger1());
        meal.addItem(new Drink1());

        return meal;
    }

    //套餐 2
    public Meal package2() {
        Meal meal = new Meal();
        meal.addItem(new Burger2());
        meal.addItem(new Drink2());

        return meal;
    }
}
```

【消费者】

```java
public class Consumer {
    public static void main(String[] args) {
        Package set = new Package();

        // 购买第一个套餐
        Meal order1 = set.package1();
        System.out.println("------order1------");
        order1.showItem();
        System.out.println("总额：￥" + order1.getCost());

        // 购买第二个套餐
        Meal order2 = set.package2();
        System.out.println("------order2------");
        order2.showItem();
        System.out.println("总额：￥" + order2.getCost());
    }
}
```

输出结果：

```java
------order1------
餐品：汉堡1，包装：纸盒，价格：￥25.0
餐品：饮品1，包装：纸杯，价格：￥15.0
总额：￥40.0
------order2------
餐品：汉堡2，包装：纸盒，价格：￥35.0
餐品：饮品2，包装：纸杯，价格：￥18.0
总额：￥53.0
```

