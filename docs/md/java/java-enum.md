# Java 基础 - Enum

> 本文介绍的枚举基于 JDK 8，和之前的特性相比改进了很多。

> 本文代码见 [**java-demos-enum**](https://github.com/dreaming-coder/ice-java-demos/tree/main/java-demos-enum)

## 1. 枚举的定义

在 JDK 1.5 之前，我们定义常量都是： `public static final ... `。自从有了枚举，就可以把相关的常量分组到一个枚举类型里，而且枚举提供了比常量更多的方法。 

```java
public enum Color {
    RED, GREEN, BLUE
}
```

实际上，枚举只是一种语法糖，它的字节码如下所示，可以看到编译器在编译时候给枚举增加了许多方法：

```java
// class version 52.0 (52)
// access flags 0x4031
// signature Ljava/lang/Enum<Lcom/ice/enumeration/pojo/Color;>;
// declaration: com/ice/enumeration/pojo/Color extends java.lang.Enum<com.ice.enumeration.pojo.Color>

// 枚举也是一个类
public final enum com/ice/enumeration/pojo/Color extends java/lang/Enum {

  // compiled from: Color.java

  // access flags 0x4019
  public final static enum Lcom/ice/enumeration/pojo/Color; RED

  // access flags 0x4019
  public final static enum Lcom/ice/enumeration/pojo/Color; GREEN

  // access flags 0x4019
  public final static enum Lcom/ice/enumeration/pojo/Color; BLUE

  // access flags 0x101A
  private final static synthetic [Lcom/ice/enumeration/pojo/Color; $VALUES

  // access flags 0x9
  public static values()[Lcom/ice/enumeration/pojo/Color;
   L0
    LINENUMBER 3 L0
    GETSTATIC com/ice/enumeration/pojo/Color.$VALUES : [Lcom/ice/enumeration/pojo/Color;
    INVOKEVIRTUAL [Lcom/ice/enumeration/pojo/Color;.clone ()Ljava/lang/Object;
    CHECKCAST [Lcom/ice/enumeration/pojo/Color;
    ARETURN
    MAXSTACK = 1
    MAXLOCALS = 0

  // access flags 0x9
  public static valueOf(Ljava/lang/String;)Lcom/ice/enumeration/pojo/Color;
   L0
    LINENUMBER 3 L0
    LDC Lcom/ice/enumeration/pojo/Color;.class
    ALOAD 0
    INVOKESTATIC java/lang/Enum.valueOf (Ljava/lang/Class;Ljava/lang/String;)Ljava/lang/Enum;
    CHECKCAST com/ice/enumeration/pojo/Color
    ARETURN
   L1
    LOCALVARIABLE name Ljava/lang/String; L0 L1 0
    MAXSTACK = 2
    MAXLOCALS = 1

  // access flags 0x2
  // signature ()V
  // declaration: void <init>()
  private <init>(Ljava/lang/String;I)V
   L0
    LINENUMBER 3 L0
    ALOAD 0
    ALOAD 1
    ILOAD 2
    INVOKESPECIAL java/lang/Enum.<init> (Ljava/lang/String;I)V
    RETURN
   L1
    LOCALVARIABLE this Lcom/ice/enumeration/pojo/Color; L0 L1 0
    MAXSTACK = 3
    MAXLOCALS = 3

  // access flags 0x8
  static <clinit>()V
   L0
    LINENUMBER 4 L0
    NEW com/ice/enumeration/pojo/Color
    DUP
    LDC "RED"
    ICONST_0
    INVOKESPECIAL com/ice/enumeration/pojo/Color.<init> (Ljava/lang/String;I)V
    PUTSTATIC com/ice/enumeration/pojo/Color.RED : Lcom/ice/enumeration/pojo/Color;
    NEW com/ice/enumeration/pojo/Color
    DUP
    LDC "GREEN"
    ICONST_1
    INVOKESPECIAL com/ice/enumeration/pojo/Color.<init> (Ljava/lang/String;I)V
    PUTSTATIC com/ice/enumeration/pojo/Color.GREEN : Lcom/ice/enumeration/pojo/Color;
    NEW com/ice/enumeration/pojo/Color
    DUP
    LDC "BLUE"
    ICONST_2
    INVOKESPECIAL com/ice/enumeration/pojo/Color.<init> (Ljava/lang/String;I)V
    PUTSTATIC com/ice/enumeration/pojo/Color.BLUE : Lcom/ice/enumeration/pojo/Color;
   L1
    LINENUMBER 3 L1
    ICONST_3
    ANEWARRAY com/ice/enumeration/pojo/Color
    DUP
    ICONST_0
    GETSTATIC com/ice/enumeration/pojo/Color.RED : Lcom/ice/enumeration/pojo/Color;
    AASTORE
    DUP
    ICONST_1
    GETSTATIC com/ice/enumeration/pojo/Color.GREEN : Lcom/ice/enumeration/pojo/Color;
    AASTORE
    DUP
    ICONST_2
    GETSTATIC com/ice/enumeration/pojo/Color.BLUE : Lcom/ice/enumeration/pojo/Color;
    AASTORE
    PUTSTATIC com/ice/enumeration/pojo/Color.$VALUES : [Lcom/ice/enumeration/pojo/Color;
    RETURN
    MAXSTACK = 4
    MAXLOCALS = 0
}
```

## 2. 枚举常见方法

```java
import com.ice.enumeration.pojo.Color;

public class Demo01 {
    public static void main(String[] args) {
        Color red = Color.RED;
        Color green = Color.GREEN;
        Color blue = Color.BLUE;

        // 默认的toString()方法返回的是name的值
        System.out.println(red);  // RED
        System.out.println(green);  // GREEN
        System.out.println(blue);  // BLUE

        // name就是定义枚举是写的变量名
        System.out.println(red.name());  // RED
        System.out.println(green.name());  // GREEN
        System.out.println(blue.name());  // BLUE

        // 返回枚举定义时的下标，安装定义顺序从0开始递增
        System.out.println(red.ordinal());  // 0
        System.out.println(green.ordinal());  // 1
        System.out.println(blue.ordinal());  // 2

        // 枚举间比较
        System.out.println(red.compareTo(blue));  // -2
        System.out.println(red.compareTo(red));  // 0

        // 这里区分大小写
        System.out.println(Color.valueOf("RED"));  // RED
        System.out.println(Color.valueOf("GREEN"));  // GREEN
        System.out.println(Color.valueOf("BLUE"));  // BLUE
//        System.out.println(Color.valueOf("yellow"));  // java.lang.IllegalArgumentException, No enum constant com.ice.enumeration.pojo.Color.red
    }
}
```

```java
import com.ice.enumeration.pojo.Color;

public class Demo02 {
    public static void main(String[] args) {
        Color[] enumConstants = Color.class.getEnumConstants();
        for (Color enumConstant : enumConstants) {
            System.out.println(enumConstant);
        }

        boolean anEnum = Color.class.isEnum();
        System.out.println(anEnum);
    }
}
```

## 3. 枚举的进阶用法

### 3.1 向 enum 类添加方法与自定义构造函数

重新定义一个日期枚举类，带有 desc 成员变量描述该日期的对于中文描述，同时定义一个 getDesc 方法，返回中文描述内容，自定义私有构造函数，在声明枚举实例时传入对应的中文描述，代码如下：

```java
public enum Day {
    MONDAY("星期一"),
    TUESDAY("星期二"),
    WEDNESDAY("星期三"),
    THURSDAY("星期四"),
    FRIDAY("星期五"),
    SATURDAY("星期六"),
    SUNDAY("星期日");//记住要用分号结束

    private String desc;//中文描述

    /**
     * 私有构造,防止被外部调用
     */
    private Day(String desc){
        this.desc=desc;
    }

    /**
     * 定义方法,返回描述,跟常规类的定义没区别
     * @return desc
     */
    public String getDesc(){
        return desc;
    }
}
```

```java
public class Demo03 {
    public static void main(String[] args) {
        Arrays.stream(Day.values()).forEach(day -> {
            System.out.println("name:" + day.name() + ",desc:" + day.getDesc());
        });
    }
}
```

输出结果：

```
name:MONDAY,desc:星期一
name:TUESDAY,desc:星期二
name:WEDNESDAY,desc:星期三
name:THURSDAY,desc:星期四
name:FRIDAY,desc:星期五
name:SATURDAY,desc:星期六
name:SUNDAY,desc:星期日
```

### 3.2 覆盖 enum 类方法

父类 Enum 中的定义的方法只有 toString 方法没有使用 final 修饰，因此只能覆盖 toString 方法，如下通过覆盖 toString 省去了 getDesc 方法：

```java
public enum Day {
    // ...
    @Override
    public String toString() {
        return desc;
    }
}
```

### 3.3 enum 类中定义抽象方法

与常规抽象类一样，enum 类允许我们为其定义抽象方法，然后使每个枚举实例都实现该方法，以便产生不同的行为方式。

```java
public enum Order {
    FIRST{
        @Override
        public String getInfo() {
            return "FIRST TIME";
        }
    },
    SECOND{
        @Override
        public String getInfo() {
            return "SECOND TIME";
        }
    };

    /**
     * 定义抽象方法
     */
    public abstract String getInfo();
}
```

```java
public class Demo04 {
    public static void main(String[] args) {
        System.out.println("F:"+ Order.FIRST.getInfo());
        System.out.println("S:"+Order.SECOND.getInfo());
    }
}
```

输出结果：

```
F:FIRST TIME
S:SECOND TIME
```

通过这种方式展现出了多态的特性，所以可以将枚举作为方法的形参使用：

```java
public class Demo05 {
    public static void main(String[] args) {
        test(Order.FIRST);
        test(Order.SECOND);
    }

    static void test(Order order){
        System.out.println(order.getInfo());
    }
}
```

输出结果：

```
F:FIRST TIME
S:SECOND TIME
```

### 3.4 enum 类与接口

由于 Java 单继承的原因，enum 类并不能再继承其它类，但并不妨碍它实现接口，因此 enum 类同样是可以实现多接口的，如下：

```java
public interface Food {
    void eat();
}
```

```java
public interface Sport {
    void run();
}
```

```java
public enum Person implements Food, Sport{
    BlackMan,YellowMan, WhiteMan;

    @Override
    public void eat() {
        System.out.println("eat.....");
    }

    @Override
    public void run() {
        System.out.println("run.....");
    }
}
```

有时候，我们可能需要对一组数据进行分类，比如进行食物菜单分类而且希望这些菜单都属于 Food 类型，appetizer(开胃菜)、mainCourse(主菜)、dessert(点心)、Coffee 等，每种分类下有多种具体的菜式或食品，此时可以利用接口来组织，如下(代码引用自 Thinking in Java)：

```java
public interface Food2 {
    enum Appetizer implements Food2 {
        SALAD, SOUP, SPRING_ROLLS;
    }
    enum MainCourse implements Food2 {
        LASAGNE, BURRITO, PAD_THAI,
        LENTILS, HUMMOUS, VINDALOO;
    }
    enum Dessert implements Food2 {
        TIRAMISU, GELATO, BLACK_FOREST_CAKE,
        FRUIT, CREME_CARAMEL;
    }
    enum Coffee implements Food2 {
        BLACK_COFFEE, DECAF_COFFEE, ESPRESSO,
        LATTE, CAPPUCCINO, TEA, HERB_TEA;
    }
}
```

```java
public class Demo06 {
    public static void main(String[] args) {
        Food2 food = Food2.Appetizer.SALAD;
        food = Food2.MainCourse.LASAGNE;
        food = Food2.Dessert.GELATO;
        food = Food2.Coffee.CAPPUCCINO;
    }
}
```

通过这种方式可以很方便组织上述的情景，同时确保每种具体类型的食物也属于 Food，现在我们利用一个枚举嵌套枚举的方式，把前面定义的菜谱存放到一个 Meal 菜单中，通过这种方式就可以统一管理菜单的数据了。

```java
public enum Meal{
    APPETIZER(Food.Appetizer.class),
    MAINCOURSE(Food.MainCourse.class),
    DESSERT(Food.Dessert.class),
    COFFEE(Food.Coffee.class);
    private Food[] values;
    private Meal(Class<? extends Food> kind) {
        //通过class对象获取枚举实例
        values = kind.getEnumConstants();
    }

    public Food[] getValues() {
        return values;
    }

    public interface Food {
        enum Appetizer implements Food {
            SALAD, SOUP, SPRING_ROLLS;
        }
        enum MainCourse implements Food {
            LASAGNE, BURRITO, PAD_THAI,
            LENTILS, HUMMOUS, VINDALOO;
        }
        enum Dessert implements Food {
            TIRAMISU, GELATO, BLACK_FOREST_CAKE,
            FRUIT, CREME_CARAMEL;
        }
        enum Coffee implements Food {
            BLACK_COFFEE, DECAF_COFFEE, ESPRESSO,
            LATTE, CAPPUCCINO, TEA, HERB_TEA;
        }
    }

    public static List<Object> toList(){
        List<Object> list = new ArrayList<>();
        Arrays.stream(Meal.values()).forEach(type->{
            Food[] foods = type.getValues();
            list.add(Arrays.asList(foods));
        });
        return list;
    }
}
```

```java
public class Demo07 {
    public static void main(String[] args) {
        List<Object> list = Meal.toList();
        list.forEach(System.out::println);
    }
}
```

输出结果：

```
[SALAD, SOUP, SPRING_ROLLS]
[LASAGNE, BURRITO, PAD_THAI, LENTILS, HUMMOUS, VINDALOO]
[TIRAMISU, GELATO, BLACK_FOREST_CAKE, FRUIT, CREME_CARAMEL]
[BLACK_COFFEE, DECAF_COFFEE, ESPRESSO, LATTE, CAPPUCCINO, TEA, HERB_TEA]
```

## 4. 枚举与 switch

```java
enum Signal {  
    GREEN, YELLOW, RED  
}  
public class TrafficLight {  
    Signal color = Signal.RED;  
    public void change() {  
        switch (color) {  
        case RED:  
            color = Signal.GREEN;  
            break;  
        case YELLOW:  
            color = Signal.RED;  
            break;  
        case GREEN:  
            color = Signal.YELLOW;  
            break;  
        }  
    }  
}  
```

## 5. 枚举与单例模式

```java
public enum DBPool {
    CONNECTION;

    private DBConnection connection = null;

    private DBPool() {
        this.connection = new DBConnection("127.0.0.1", "3306");
    }

    public void getSession(){
        this.connection.getSession();
    }
}
```

```java
public class Demo08 {
    public static void main(String[] args) {
        DBPool.CONNECTION.getSession();
    }
}
```

输出结果：

```
127.0.0.1:3306
```

## 6. 关于枚举集合的使用

`java.util.EnumSet` 和 `java.util.EnumMap` 是两个枚举集合。`EnumSet` 保证集合中的元素不重复；`EnumMap` 中的 key 是 enum 类型，而 value 则可以是任意类型。关于这个两个集合的使用就不在这里赘述，可以参考 JDK 文档。