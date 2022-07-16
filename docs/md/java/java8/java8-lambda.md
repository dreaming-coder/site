# Java 8 - 函数式编程

> 面向对象编程有时候比较冗余，我们有时候关注的仅仅是如何实现功能。

## 1. 函数式编程

在数学中，**函数**就是有输入量、输出量的一套计算方案，也就是“拿什么东西做什么事情”。相对而言，面向对象过分强调“必须通过对象的形式来做事情”，而函数式思想则尽量忽略面向对象的复杂语法——**强调做什么，而不是以什么形式做**。

- **面向对象的思想**:

 做一件事情，找一个能解决这个事情的对象，调用对象的方法，完成事情。

- **函数式编程思想**:

 只要能获取到结果，谁去做的，怎么做的都不重要，重视的是结果，不重视过程。

### 1.1 冗余的 Runnable 代码

以多线程为例，当需要启动一个线程去完成任务时，通常会通过 `java.lang.Runnable` 接口来定义任务内容，并使用 `java.lang.Thread` 类来启动该线程。代码如下：

```java
public class DemoRunnable {
	public static void main(String[] args) {
    	// 匿名内部类
		Runnable task = new Runnable() {
			@Override
			public void run() { // 覆盖重写抽象方法
				System.out.println("多线程任务执行！");
			}
		};
		new Thread(task).start(); // 启动线程
	}
}
```

本着“一切皆对象”的思想，这种做法是无可厚非的：首先创建一个 `Runnable` 接口的匿名内部类对象来指定任务内容，再将其交给一个线程来启动。

对于 `Runnable` 的匿名内部类用法，可以分析出几点内容：

- `Thread `类需要 `Runnable` 接口作为参数，其中的抽象 `run()` 方法是用来指定线程任务内容的核心；
- 为了指定 `run()` 的方法体，**不得不**需要 `Runnable` 接口的实现类；
- 为了省去定义一个 `RunnableImpl` 实现类的麻烦，**不得不**使用匿名内部类；
- 必须覆盖重写抽象 `run()` 方法，所以方法名称、方法参数、方法返回值**不得不**再写一遍，且不能写错；
- 而实际上，**似乎只有方法体才是关键所在**。

### 1.2 编程思想转换

- **做什么，而不是怎么做**

我们真的希望创建一个匿名内部类对象吗？不。我们只是为了做这件事情而**不得不**创建一个对象。我们真正希望做的事情是：将`run`方法体内的代码传递给`Thread`类知晓。

**传递一段代码**——这才是我们真正的目的。而创建对象只是受限于面向对象语法而不得不采取的一种手段方式。那，有没有更加简单的办法？如果我们将关注点从“怎么做”回归到“做什么”的本质上，就会发现只要能够更好地达到目的，过程与形式其实并不重要。

- **生活举例**

当我们需要从北京到上海时，可以选择高铁、汽车、骑行或是徒步。我们的真正目的是到达上海，而如何才能到达上海的形式并不重要，所以我们一直在探索有没有比高铁更好的方式——搭乘飞机。

而现在这种飞机（甚至是飞船）已经诞生：2014 年 3 月 Oracle 所发布的 Java 8（JDK 1.8）中，加入了 **Lambda 表达式**的重量级新特性，为我们打开了新世界的大门。

### 1.3 体验 Lambda 的更优写法

借助 Java 8 的全新语法，上述 `Runnable` 接口的匿名内部类写法可以通过更简单的 Lambda 表达式达到等效：

```java
public class DemoLambdaRunnable {
	public static void main(String[] args) {
		new Thread(() -> System.out.println("多线程任务执行！")).start(); // 启动线程
	}
}
```

这段代码和刚才的执行效果是完全一样的，可以在 1.8 或更高的编译级别下通过。从代码的语义中可以看出：我们启动了一个线程，而线程任务的内容以一种更加简洁的形式被指定。

不再有“不得不创建接口对象”的束缚，不再有“抽象方法覆盖重写”的负担，就是这么简单！

## 2. Lambda 标准格式

Lambda 省去面向对象的条条框框，格式由 3 个部分组成：

- **一些参数**
- **一个箭头**
- **一段代码**

Lambda表达式的**标准格式**为：

```java
(参数类型 参数名称) -> { 代码语句 }
```

> 格式说明：
>
> - **小括号内的语法与传统方法参数列表一致：无参数则留空；多个参数则用逗号分隔。**
> - `->` **是新引入的语法格式，代表指向动作。**
> - **大括号内的语法与传统方法体要求基本一致。**

### 2.1 无参数无返回值

给定一个厨子 `Cook` 接口，内含唯一的抽象方法 `makeFood()`，且无参数、无返回值。如下：

```java
public interface Cook {
    void makeFood();
}
```

在下面的代码中，使用 Lambda 的**标准格式**调用 `invokeCook()` 方法，打印输出“吃饭啦！”字样：

```java
public class DemoInvokeCook {
    public static void main(String[] args) {
        invokeCook(
            () -> {System.out.println("吃饭啦！");}
        );
    }

    private static void invokeCook(Cook cook) {
        cook.makeFood();
    }
}		
```

### 2.2 有参数有返回值

给定一个计算器`Calculator`接口，内含抽象方法`calc`可以将两个int数字相加得到和值：

```java
public interface Calculator {
    int calc(int a, int b);
}
```

在下面的代码中，请使用 Lambda 的**标准格式**调用 `invokeCalc()` 方法，完成 $120$ 和 $130$ 的相加计算：

```java
public class Demo08InvokeCalc {
    public static void main(String[] args) {
        invokeCalc(
            120, 130, (int a, int b) -> {return a + b;}
        );
    }

    private static void invokeCalc(int a, int b, Calculator calculator) {
        int result = calculator.calc(a, b);
        System.out.println("结果是：" + result);
    }
}
```

### 2.3 Lambda 省略式

Lambda 强调的是“做什么”而不是“怎么做”，所以凡是可以根据上下文推导得知的信息，都可以省略。例如上例还可以使用Lambda的省略写法：

```java
public static void main(String[] args) {
  	invokeCalc(120, 130, (a, b) -> a + b);
}
```

在 Lambda 标准格式的基础上，使用省略写法的规则为：

1. 小括号内参数的类型可以省略；
2. 如果小括号内**有且仅有一个参数**，则小括号可以省略；
3. 如果大括号内**有且仅有一个语句**，则无论是否有返回值，都可以省略大括号、`return` 关键字及语句分号。

## 3. 函数式接口

函数式编程的核心是使用 Lambda 表达式，而使用 Lambda 表达式替代原来冗余的匿名内部类的前提条件，是这个匿名内部类实现的接口是一个函数式接口。

函数式接口在 Java 中是指：**有且仅有一个抽象方法的接口**。

> 函数式接口，即适用于函数式编程场景的接口。而 Java 中的函数式编程体现就是 Lambda，所以函数式接口就是可以适用于 Lambda 使用的接口。只有确保接口中有且仅有一个抽象方法，Java 中的 Lambda 才能顺利地进行推导。

### 3.1 函数式接口的定义

只要确保接口中有且仅有一个抽象方法即可：

```java
修饰符 interface 接口名称 {
    public abstract 返回值类型 方法名称(可选参数信息);
    // 其他非抽象方法内容
}
```

由于接口当中抽象方法的 `public abstract` 是可以省略的，所以定义一个函数式接口很简单：

```java
public interface MyFunctionalInterface {
    void myMethod();
}
```

除此之外，还可以使用 `@FunctionalInterface` 注解，编译器将会强制检查该接口是否确实有且仅有一个抽象方法，否则将会报错。

```java
@FunctionalInterface
public interface MyFunctionalInterface {
    void myMethod();
}
```

> 需要注意的是，即使不使用该注解，只要满足函数式接口的定义，这仍然是一个函数式接口，使用起来都一样。

### 3.2 常用函数式接口

JDK 提供了大量常用的函数式接口以丰富 Lambda 的典型使用场景，它们主要在 `java.util.function` 包中被提供。

#### 3.2.1 Supplier 接口

```java
@FunctionalInterface
public interface Supplier<T> {
    T get();
}
```

`java.util.function.Supplier<T>` 接口仅包含一个无参的方法： `T get()`。用来**获取一个泛型参数指定类型的对象数据**。由于这是一个函数式接口，这也就意味着对应的 Lambda 表达式需要“对外提供”一个符合泛型类型的对象数据。

> `Supplier<T>` 接口被称之为生产型接口，指定接口的泛型是什么类型，那么接口中的 `get()` 方法就会产生什么类型的数据，相当于一个对象工厂。

```java
import java.util.function.Supplier;

public class Demo {
    private static String getString(Supplier<String> function) {
        return function.get();
    }

    public static void main(String[] args) {
        String msgA = "Hello";
        String msgB = "World";
        System.out.println(getString(() -> msgA + msgB));
    }
}
```

```
输出结果：
HelloWorld
```

#### 3.2.2 Consumer 接口

```java
@FunctionalInterface
public interface Consumer<T> {

    void accept(T t);

    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

`java.util.function.Consumer<T>` 接口则正好与 `Supplier`接口相反，它不是生产一个数据，而是消费一个数据，其数据类型由泛型决定。

1. **抽象方法：`accept()`**

`Consumer` 接口中包含抽象方法 `void accept(T t)`，意为消费一个指定泛型的数据。

```java
import java.util.function.Consumer;

public class Demo {
    private static void consumeString(Consumer<String> function) {
        function.accept("Hello");
    }

    public static void main(String[] args) {
        consumeString(s -> System.out.println(s));
    }
}
```

```
输出结果：
Hello
```

2. **默认方法：`andThen()`**

如果一个方法的参数和返回值全都是 `Consumer` 类型，那么就可以实现效果：消费数据的时候，首先做一个操作，然后再做一个操作，实现组合。而这个方法就是`Consumer` 接口中的 `default` 方法 `andThen()` 。JDK 源码如下：

```java
default Consumer<T> andThen(Consumer<? super T> after) {
    Objects.requireNonNull(after);
    return (T t) -> { accept(t); after.accept(t); };
}
```

> `java.util.Objects` 的 `requireNonNull` 静态方法将会在参数为 `null` 时主动抛出 `NullPointerException` 异常。这省去了重复编写 `if` 语句和抛出空指针异常的麻烦。

要想实现组合，需要两个或多个 Lambda 表达式即可，而 `andThen()` 的语义正是“一步接一步”操作。例如两个步骤组合的情况：

```java
import java.util.function.Consumer;

public class Demo {
    private static void consumeString(Consumer<String> one, Consumer<String> two) {
        one.andThen(two).accept("Hello");
    }

    public static void main(String[] args) {
        consumeString(
                s -> System.out.println(s.toUpperCase()),
                s -> System.out.println(s.toLowerCase())
        );
    }
}
```

```
输出结果：
HELLO
hello
```

#### 3.2.3 Predicate 接口

```java
@FunctionalInterface
public interface Predicate<T> {

    boolean test(T t);

    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }

    default Predicate<T> negate() {
        return (t) -> !test(t);
    }

    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }

    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
}
```

有时候我们需要对某种类型的数据进行判断，从而得到一个 `boolean` 值结果。这时可以使用 `java.util.function.Predicate<T>` 接口。

1. **抽象方法：`test()`**

`Predicate` 接口中包含一个抽象方法：`boolean test(T t)`。用于条件判断的场景：

```java
import java.util.function.Predicate;

public class Demo {
    private static void method(Predicate<String> predicate) {
        boolean veryLong = predicate.test("HelloWorld");
        System.out.println("字符串很长吗：" + veryLong);
    }

    public static void main(String[] args) {
        method(s -> s.length() > 5);
    }
}
```

2. **默认方法：`and()`**

既然是条件判断，就会存在**与**、**或**、**非**三种常见的逻辑关系。其中将两个 `Predicate` 条件使用“与”逻辑连接起来实现“并且”的效果时，可以使用 `default` 方法 `and()` 。其 JDK 源码为：

```java
default Predicate<T> and(Predicate<? super T> other) {
    Objects.requireNonNull(other);
    return (t) ‐> test(t) && other.test(t);
}
```

如果要判断一个字符串既要包含大写“H”，又要包含大写“W”，那么：

```java
import java.util.function.Predicate;

public class Demo {
    private static void method(Predicate<String> one, Predicate<String> two) {
        boolean isValid = one.and(two).test("Helloworld");
        System.out.println("字符串符合要求吗：" + isValid);
    }

    public static void main(String[] args) {
        method(s -> s.contains("H"), s -> s.contains("W"));
    }
}
```

```
输出结果：
字符串符合要求吗：false
```

3. **默认方法：`or()`**

与 `and()` 的“**与**”类似，默认方法 `or()` 实现逻辑关系中的“**或**”。JDK 源码为：

```java
default Predicate<T> or(Predicate<? super T> other) {
    Objects.requireNonNull(other);
    return (t) ‐> test(t) || other.test(t);
}
```

如果希望实现逻辑“字符串包含大写"H"或者包含大写W”，那么代码只需要将“and”修改为“or”名称即可，其他都不变：

```java
import java.util.function.Predicate;

public class Demo {
    private static void method(Predicate<String> one, Predicate<String> two) {
        boolean isValid = one.or(two).test("Helloworld");
        System.out.println("字符串符合要求吗：" + isValid);
    }

    public static void main(String[] args) {
        method(s -> s.contains("H"), s -> s.contains("W"));
    }
}
```

```
输出结果：
字符串符合要求吗：true
```

4. **默认方法：`negate()`**

“与”、“或”已经了解了，剩下的“非”（取反）也会简单。默认方法 `negate()` 的JDK源代码为：

```java
default Predicate<T> negate() {
    return (t) ‐> !test(t);
}
```

从实现中很容易看出，它是执行了 `test()` 方法之后，对结果 `boolean` 值进行 `!` 取反而已。一定要在 `test()` 方法调用之前调用 `negate()` 方法，正如 `and()`  和 `or()` 方法一样：

```java
import java.util.function.Predicate;

public class Demo {
    private static void method(Predicate<String> predicate) {
        boolean veryLong = predicate.negate().test("HelloWorld");
        System.out.println("字符串很长吗：" + veryLong);
    }

    public static void main(String[] args) {
        method(s -> s.length() < 5);
    }
}
```

```
输出结果：
字符串很长吗：true
```

#### 3.2.4 Function 接口

```java
@FunctionalInterface
public interface Function<T, R> {
    
    R apply(T t);

    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }

    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }

    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

`java.util.function.Function<T,R>` 接口用来根据一个类型的数据得到另一个类型的数据，前者称为前置条件，后者称为后置条件。

1. **抽象方法：`apply()`**

`Function` 接口中最主要的抽象方法为： `R apply(T t)` ，根据类型 `T` 的参数获取类型 `R` 的结果。

使用的场景例如：将`String`类型转换为`Integer`类型。

```java
import java.util.function.Function;

public class Demo {
    private static void method(Function<String, Integer> function) {
        int num = function.apply("10");
        System.out.println(num + 20);
    }
    public static void main(String[] args) {
        method(s -> Integer.parseInt(s));
    }
}
```

```
输出结果：
30
```

2. **默认方法：`andThen()`**

`Function` 接口中有一个默认的 `andThen()` 方法，用来进行组合操作。JDK 源代码如：

```java
default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
    Objects.requireNonNull(after);
    return (T t) ‐> after.apply(apply(t));
}
```

该方法同样用于“先做什么，再做什么”的场景，和 `Consumer` 中的 `andThen()` 差不多：

```java
import java.util.function.Function;

public class Demo {
    private static void method(Function<String, Integer> one, Function<Integer, Integer> after) {
        int num = one.andThen(after).apply("10");
        System.out.println(num + 20);
    }

    public static void main(String[] args) {
        method(str -> Integer.parseInt(str) + 10, i -> i *= 10);
    }
}
```

```
输出结果：
220
```

> 请注意，`Function`的前置条件泛型和后置条件泛型可以相同。

3. 默认方法：`compose()`

这个方法与之前的 `andThen()` 正好相反

```java
import java.util.function.Function;

public class Demo {
    private static void method(Function<String, Integer> one, Function<String, String> before) {
        int num = one.compose(before).apply("10");
        System.out.println(num + 20);
    }

    public static void main(String[] args) {
        method(str -> Integer.parseInt(str) + 10, i -> i + "0");
    }
}
```

```
输出结果：
130
```

## 4. 方法引用

在使用 Lambda 表达式的时候，我们实际上传递进去的代码就是一种解决方案：拿什么参数做什么操作。那么考虑一种情况：如果我们在 Lambda 中所指定的操作方案，已经有地方存在相同方案，那是否还有必要再写重复逻辑？

```java
public class Demo {
    public static void printString(Printable p) {
        p.print("Hello World");
    }

    public static void main(String[] args) {
        printString(s -> System.out.println(s));
    }
}
```

```
输出结果：
Hello World
```

这段代码的问题在于，对字符串进行控制台打印输出的操作方案，明明已经有了现成的实现，那就是 `System.out` 对象中的 `println(String)`  方法。既然 Lambda 希望做的事情就是调用 `println(String)`方法，那何必自己手动调用呢？

```java
public class Demo {
    public static void printString(Printable p) {
        p.print("Hello World");
    }

    public static void main(String[] args) {
        printString(System.out::println);
    }
}
```

> 请注意其中的双冒号 `::` 写法，这被称为“**方法引用**”，而双冒号是一种新的语法。

### 4.1 方法引用符

双冒号 `::` 为**引用运算符**，而**它所在的表达式被称为方法引用**。如果 Lambda 要表达的函数方案已经存在于某个方法的实现中，那么则可以通过双冒号来引用该方法作为 Lambda 的替代者。

#### 4.1.1 语义分析

例如上例中， `System.out` 对象中有一个重载的 `println(String)` 方法恰好就是我们所需要的。那么对于 `printString()` 方法的函数式接口参数，对比下面两种写法，完全等效：

- Lambda 表达式写法：`s -> System.out.println(s);`
- 方法引用写法： `System.out::println`

第一种语义是指：拿到参数之后经 Lambda 之手，继而传递给 `System.out.println()` 方法去处理。

第二种等效写法的语义是指：直接让 `System.out` 中的 `println()` 方法来取代 Lambda。两种写法的执行效果完全一样，而第二种方法引用的写法复用了已有方案，更加简洁。

> Lambda 中传递的参数**一定是方法引用中的那个方法可以接收的类型，否则会抛出异常**。

#### 4.1.2 推导与省略

如果使用 Lambda，那么根据“可推导就是可省略”的原则，无需指定参数类型，也无需指定的重载形式——它们都将被自动推导。而如果使用方法引用，也是同样可以根据上下文进行推导。

函数式接口是 Lambda 的基础，而方法引用是 Lambda 的孪生兄弟。

下面这段代码将会调用`println()`方法的不同重载形式，将函数式接口改为`int`类型的参数：

```java
@FunctionalInterface
public interface Printable {
    void print(int s);
}
```

```java
public class Demo {
    public static void printString(Printable p) {
        p.print(323);
    }

    public static void main(String[] args) {
        printString(System.out::println);
    }
}
```

```
输出结果：
323
```

### 4.2 通过对象名引用成员方法

这是最常见的一种用法，与上例相同。如果一个类中已经存在了一个成员方法：

```java
public class MethodRefObject {
    public void printUpperCase(String str) {
        System.out.println(str.toUpperCase());
    }
}
```

函数式接口仍然定义为：

```java
@FunctionalInterface
public interface Printable {
    void print(String s);
}
```

那么当需要使用这个 `printUpperCase()` 成员方法来替代 `Printable` 接口的 Lambda 的时候，已经具有了 `MethodRefObject` 类的对象实例，则可以通过对象名引用成员方法，代码为：

```java
public class Demo {
    private static void printString(Printable lambda) {
        lambda.print("Hello");
    }

    public static void main(String[] args) {
        MethodRefObject obj = new MethodRefObject();
        printString(obj::printUpperCase);
    }
}
```

```
输出结果:
HELLO
```

### 4.3 通过类名称引用静态方法

由于在 `java.lang.Math` 类中已经存在了静态方法 `abs()`，所以当我们需要通过 Lambda 来调用该方法时，有两种写法。首先是函数式接口：

```java
@FunctionalInterface
public interface Calcable {
    int calc(int num);
}
```

第一种写法是使用 Lambda 表达式：

```java
public class Demo {
    private static void method(int num, Calcable lambda) {
        System.out.println(lambda.calc(num));
    }

    public static void main(String[] args) {
        method(-10, n -> Math.abs(n));
    }
}
```

但是使用方法引用的更好写法是：

```java
public class Demo {
    private static void method(int num, Calcable lambda) {
        System.out.println(lambda.calc(num));
    }

    public static void main(String[] args) {
        method(-10, Math::abs);
    }
}
```

### 4.4 通过 super 引用成员方法

如果存在继承关系，当 Lambda 中需要出现 `super()` 调用时，也可以使用方法引用进行替代。首先是函数式接口：

```java
@FunctionalInterface
public interface Greetable {
    void greet();
}
```

然后是父类 `Human` 的内容：

```java
public class Human {
    public void sayHello() {
        System.out.println("Hello!");
    }
}
```

最后是子类 `Man` 的内容，其中使用了 Lambda 的写法

```java
public class Man extends Human {
    @Override
    public void sayHello() {
        System.out.println("大家好,我是Man!");
    }

    //定义方法method,参数传递Greetable接口
    public void method(Greetable g) {
        g.greet();
    }

    public void show() {
        //调用method方法,使用Lambda表达式
        method(() -> {
            //创建Human对象,调用sayHello方法
            new Human().sayHello();
        });
        //简化Lambda
        method(() -> new Human().sayHello());
        //使用super关键字代替父类对象
        method(() -> super.sayHello());
    }
}
```

但是如果使用方法引用来调用父类中的 `sayHello()` 方法会更好，例如另一个子类 `Woman` ：

```java
public class Woman extends Human {
    @Override
    public void sayHello() {
        System.out.println("大家好,我是Woman!");
    }

    //定义方法method,参数传递Greetable接口
    public void method(Greetable g) {
        g.greet();
    }

    public void show() {
        method(super::sayHello);
    }
}
```

### 4.5 通过 this 引用成员方法

`this` 代表当前对象，如果需要引用的方法就是当前类中的成员方法，那么可以使用 `this::成员方法` 的格式来使用方法引用。首先是简单的函数式接口：

```java
@FunctionalInterface
public interface Richable {
    void buy();
}
```

下面是一个丈夫`Husband`类：

```java
public class Husband {
    private void marry(Richable lambda) {
        lambda.buy();
    }

    public void beHappy() {
        marry(() -> System.out.println("买套房子"));
    }
}
```

开心方法 `beHappy()` 调用了结婚方法 `marry()` ，后者的参数为函数式接口 `Richable` ，所以需要一个 Lambda 表达式。但是如果这个 Lambda 表达式的内容已经在本类当中存在了，则可以对 `Husband` 丈夫类进行修改：

```java
public class Husband {
    private void buyHouse() {
        System.out.println("买套房子");
    }

    private void marry(Richable lambda) {
        lambda.buy();
    }

    public void beHappy() {
        marry(() -> this.buyHouse());
    }
}
```

如果希望取消掉 Lambda 表达式，用方法引用进行替换，则更好的写法为：

```java
public class Husband {
    private void buyHouse() {
        System.out.println("买套房子");
    }

    private void marry(Richable lambda) {
        lambda.buy();
    }

    public void beHappy() {
        marry(this::buyHouse);
    }
}
```

### 4.6 类的构造器引用

由于构造器的名称与类名完全一样，并不固定。所以构造器引用使用 `类名称::new` 的格式表示。首先是一个简单的 `Person` 类：

```java
public class Person {
    private String name;

    public Person(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

然后是用来创建 `Person` 对象的函数式接口：

```java
@FunctionalInterface
public interface PersonBuilder {
    Person buildPerson(String name);
}
```

要使用这个函数式接口，可以通过 Lambda 表达式：

```java
public class Demo {
    public static void printName(String name, PersonBuilder builder) {
        System.out.println(builder.buildPerson(name).getName());
    }

    public static void main(String[] args) {
        printName("赵丽颖", name -> new Person(name));
    }
}
```

但是通过构造器引用，有更好的写法：

```java
public class Demo {
    public static void printName(String name, PersonBuilder builder) {
        System.out.println(builder.buildPerson(name).getName());
    }

    public static void main(String[] args) {
        printName("赵丽颖", Person::new);
    }
}
```

### 4.7 数组的构造器引用

数组也是 `Object` 的子类对象，所以同样具有构造器，只是语法稍有不同。如果对应到 Lambda 的使用场景中时，需要一个函数式接口：

```java
@FunctionalInterface
public interface ArrayBuilder {
    int[] buildArray(int length);
}
```

在应用该接口的时候，可以通过`Lambda`表达式：

```java
public class Demo {
    private static int[] initArray(int length, ArrayBuilder builder) {
        return builder.buildArray(length);
    }

    public static void main(String[] args) {
        int[] array = initArray(10, length -> new int[length]);
    }
}
```

但是更好的写法是使用数组的构造器引用：

```java
public class Demo {
    private static int[] initArray(int length, ArrayBuilder builder) {
        return builder.buildArray(length);
    }

    public static void main(String[] args) {
        int[] array = initArray(10, int[]::new);
    }
}
```

## 5. 流式编程

### 5.1 流式思想概述

#### 5.1.1 传统集合的多步遍历代码

几乎所有的集合（如 `Collection` 接口或 `Map` 接口等）都支持直接或间接的遍历操作。而当我们需要对集合中的元素进行操作的时候，除了必需的添加、删除、获取外，最典型的就是集合遍历。例如：

```java
import java.util.ArrayList;
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("周芷若");
        list.add("赵敏");
        list.add("张强");
        list.add("张三丰");
        for (String name : list) {
            System.out.println(name);
        }
    }
}
```

```
输出结果：
张无忌
周芷若
赵敏
张强
张三丰
```

#### 5.1.2 循环遍历的弊端

Java 8 的 Lambda 让我们可以更加专注于**做什么**（What），而不是**怎么做**（How），这点此前已经结合内部类进行了对比说明。现在，我们仔细体会一下上例代码，可以发现：

- for 循环的语法就是“**怎么做**”
- for 循环的循环体才是“**做什么**”

为什么使用循环？因为要进行遍历。但循环是遍历的唯一方式吗？遍历是指每一个元素逐一进行处理，**而并不是从第一个到最后一个顺次处理的循环**。前者是目的，后者是方式。

试想一下，如果希望对集合中的元素进行筛选过滤：

1. 将集合 A 根据条件一过滤为**子集 B**；
2. 然后再根据条件二过滤为**子集 C**。

那怎么办？在 Java 8 之前的做法可能为：

```java
import java.util.ArrayList;
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("周芷若");
        list.add("赵敏");
        list.add("张强");
        list.add("张三丰");
        List<String> zhangList = new ArrayList<>();
        for (String name : list) {
            if (name.startsWith("张")) {
                zhangList.add(name);
            }
        }
        List<String> shortList = new ArrayList<>();
        for (String name : zhangList) {
            if (name.length() == 3) {
                shortList.add(name);
            }
        }
        for (String name : shortList) {
            System.out.println(name);
        }
    }
}
```

```
输出结果：
张无忌
张三丰
```

这段代码中含有三个循环，每一个作用不同：

1. 首先筛选所有姓张的人；
2. 然后筛选名字有三个字的人；
3. 最后进行对结果进行打印输出。

每当我们需要对集合中的元素进行操作的时候，总是需要进行循环、循环、再循环。这是理所当然的么？不是。循环是做事情的方式，而不是目的。另一方面，使用线性循环就意味着只能遍历一次。如果希望再次遍历，只能再使用另一个循环从头开始。

#### 5.1.3 Stream 的更有写法

```java
import java.util.ArrayList;
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("张无忌");
        list.add("周芷若");
        list.add("赵敏");
        list.add("张强");
        list.add("张三丰");
        list.stream()
                .filter(s -> s.startsWith("张"))
                .filter(s -> s.length() == 3)
                .forEach(System.out::println);
    }
}
```

```
输出结果：
张无忌
张三丰
```

直接阅读代码的字面意思即可完美展示无关逻辑方式的语义：**获取流**、**过滤姓张**、**过滤长度为 3**、**逐一打印**。代码中并没有体现使用线性循环或是其他任何算法进行遍历，我们真正要做的事情内容被更好地体现在代码中。

#### 5.1.4 流式思想

![](/imgs/java/java8/java8-lambda-1.png)

这张图中展示了过滤、映射、跳过、计数等多步操作，这是一种集合元素的处理方案，而方案就是一种“函数模型”。图中的每一个方框都是一个“流”，调用指定的方法，可以从一个流模型转换为另一个流模型。而最右侧的数字 $3$ 是最终结果。

这里的 `filter` 、`map` 、`skip` 都是在对函数模型进行操作，集合元素并没有真正被处理。只有当终结方法 `count` 执行的时候，整个模型才会按照指定策略执行操作。而这得益于 Lambda 的延迟执行特性。

Stream（流）是一个来自数据源的元素队列

- 元素是特定类型的对象，形成一个队列。 Java 中的 `Stream` 并不会存储元素，而是按需计算。
- **数据源**可以是集合，数组等。

和以前的 `Collection` 操作不同， `Stream` 操作还有两个基础的特征：

- **Pipelining**：中间操作都会返回流对象本身。 这样多个操作可以串联成一个管道， 如同流式风格（fluent style）。 这样做可以对操作进行优化， 比如延迟执行（laziness）和短路（short-circuiting）。
- **内部迭代**： 以前对集合遍历都是通过 `Iterator` 或者增强 `for` 的方式, 显式的在集合外部进行迭代， 这叫做外部迭代。 `Stream` 提供了内部迭代的方式，流可以直接调用遍历方法。

当使用一个流的时候，通常包括三个基本步骤：获取一个数据源（source）→ 数据转换→执行操作获取想要的结果，**每次转换原有 Stream 对象不改变，返回一个新的 Stream 对象**（可以有多次转换），这就允许对其操作可以像链条一样排列，变成一个管道。

### 5.2 获取流

`java.util.stream.Stream<T>` 是 Java 8 新加入的最常用的流接口。（这并不是一个函数式接口。）

获取一个流非常简单，有以下几种常用的方式：

- 所有的 `Collection` 集合都可以通过 `stream()` 或 `parallelStream()` 默认方法获取流；
- `Stream` 接口的静态方法 `of()` 可以获取数组对应的流。

```java
import java.util.*;
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        // 把集合转换为stream流
        List<String> list = new ArrayList<>();
        Stream<String> stream1 = list.stream();

        Set<String> set = new HashSet<>();
        Stream<String> stream2 = set.stream();

        Map<String, String> map = new HashMap<>();

        Set<String> keySet = map.keySet();
        Stream<String> stream3 = keySet.stream();

        Collection<String> values = map.values();
        Stream<String> stream4 = values.stream();

        Set<Map.Entry<String, String>> entries = map.entrySet();
        Stream<Map.Entry<String, String>> stream5 = entries.stream();

        // 把数组转换为stream
        Stream<Integer> stream6 = Stream.of(1, 2, 3, 4, 5);

        // 可变参数可以传递数组
        Integer[] arr = {1, 2, 3, 4, 5};
        Stream<Integer> stream7 = Stream.of(arr);
        String[] arr2 = {"a", "bb", "cc"};
        Stream<String> stream8 = Stream.of(arr2);
    }
}
```

#### 5.2.1 stream 和 parallelStream

每个 `Stream` 都有两种模式：顺序执行和并行执行。

顾名思义，当使用顺序方式去遍历时，每个 item 读完后再读下一个 item。而使用并行去遍历时，数组会被分成多个段，其中每一个都在不同的线程中处理，然后将结果一起输出。

大家对 Hadoop 有稍微了解就知道，里面的 MapReduce 本身就是用于并行处理大数据集的软件框架，其处理大数据的核心思想就是大而化小，分配到不同机器去运行 map，最终通过 reduce 将所有机器的结果结合起来得到一个最终结果，与 MapReduce 不同，Stream 则是利用多核技术可将大数据通过多核并行处理，而 MapReduce 则可以分布式的。

### 5.3 常用方法

流模型的操作很丰富，这里介绍一些常用的 API。这些方法可以被分成两种：

- **延迟方法**：返回值类型仍然是 `Stream` 接口自身类型的方法，因此支持链式调用。（除了终结方法外，其余方法均为延迟方法。）
- **终结方法**：返回值类型不再是 `Stream` 接口自身类型的方法，因此不再支持类似 `StringBuilder` 那样的链式调用。

> stream 流属于管道流，只能被消费（使用）一次，前一个 stream 流调用完方法，数据就会流转到下一个 stream 流上，而这时前一个 stream 流已经使用完毕，就会关闭了，所以不能再使用骗一个的 stream 流调用方法了。

#### 5.3.1 延迟方法

##### 5.3.1.1 filter

可以通过 `filter` 方法将一个流转换成另一个子集流。方法签名：

```java
Stream<T> filter(Predicate<? super T> predicate);
```

该接口接收一个 `Predicate` 函数式接口参数作为筛选条件。

![](/imgs/java/java8/java8-lambda-2.png)

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("张无忌", "张三丰", "周芷若", "赵敏", "张翠山");
        stream.filter(name -> name.startsWith("张")).forEach(System.out::println);
    }
}
```

```
输出结果：
张无忌
张三丰
张翠山
```

##### 5.3.1.2 map

如果需要将流中的元素映射到另一个流中，可以使用 `map` 方法。方法签名：

```java
<R> Stream<R> map(Function<? super T, ? extends R> mapper);
```

该接口需要一个`Function`函数式接口参数，可以将当前流中的`T`类型数据转换为另一种`R`类型的流。

![](/imgs/java/java8/java8-lambda-3.png)

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("1", "2", "3", "4", "5");
        stream.map(s -> Integer.parseInt(s)).forEach(System.out::println);
    }
}
```

```
输出结果：
1
2
3
4
5
```

##### 5.3.1.3 limit

`limit` 方法可以对流进行截取，只取用前 $n$ 个。方法签名：

```java
Stream<T> limit(long maxSize);
```

参数是一个 `long` 型，如果集合当前长度大于参数则进行截取；否则不进行操作。

![](/imgs/java/java8/java8-lambda-4.png)

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        String[] arr = {"美羊羊", "喜羊羊", "懒羊羊", "灰太狼", "红太狼"};
        Stream<String> stream = Stream.of(arr);
        stream.limit(3).forEach(System.out::println);
    }
}
```

```
输出结果：
美羊羊
喜羊羊
懒羊羊
```

##### 5.3.1.4 skip

如果希望跳过前几个元素，可以使用 `skip` 方法获取一个截取之后的新流：

```java
Stream<T> skip(long n);
```

如果流的当前长度大于 $n$，则跳过前 $n$ 个；否则将会得到一个长度为 $0$ 的空流。

![](/imgs/java/java8/java8-lambda-5.png)

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        String[] arr = {"美羊羊", "喜羊羊", "懒羊羊", "灰太狼", "红太狼"};
        Stream<String> stream = Stream.of(arr);
        stream.skip(3).forEach(System.out::println);
    }
}
```

```
输出结果：
灰太狼
红太狼
```

##### 5.3.1.5 distinct

去除流中重复的元素，其方法签名：

```java
Stream<T> distinct();
```

例如：

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(1, 1, 2, 3, 3, 4, 5, 5, 6);
        stream.distinct().forEach(System.out::println);
    }
}
```

```
输出结果：
1
2
3
4
5
6
```

##### 5.3.1.6 sorted

该方法用于对 stream 流中的元素排序，其方法签名：

```java
Stream<T> sorted();
Stream<T> sorted(Comparator<? super T> comparator);
```

如果流中的元素的类实现了 `Comparable` 接口，即有自己的排序规则，那么可以直接调用 `sorted()` 方法对元素进行排序

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(3, 7, 2, 9, 5, 8, 1);
        stream.distinct().sorted().forEach(System.out::println);
    }
}
```

```
输出结果：
1
2
3
5
7
8
9
```

如果没有实现`Comparable`接口，则需要传入比较规则：

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(3, 7, 2, 9, 5, 8, 1);
        stream.distinct().sorted((a, b) -> b - a).forEach(System.out::println);
    }
}
```

```
输出结果：
9
8
7
5
3
2
1
```

> 要知道重写的比较方法，默认情况下是`前者-后者`这种样式，表示顺序排序，反过来则是降序排序。

#### 5.3.2 终结方法

##### 5.3.2.1 forEach

虽然方法名字叫 `forEach` ，但是与 for 循环中的 for-each 不同。

```java
void forEach(Consumer<? super T> action);
```

该方法接收一个 `Consumer` 接口函数，会将每一个流元素交给该函数进行处理。

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<String> stream = Stream.of("张无忌", "张三丰", "周芷若");
        stream.forEach(name -> System.out.println(name));
    }
}
```

```
输出结果：
张无忌
张三丰
周芷若
```

##### 5.3.2.2 count

正如旧集合 `Collection` 当中的 `size()` 方法一样，流提供 `count()` 方法来数一数其中的元素个数：

```java
long count();
```

该方法返回一个`long`值代表元素个数（不再像旧集合那样是`int`值）

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.add(6);
        list.add(7);
        Stream<Integer> stream = list.stream();
        long count = stream.count();
        System.out.println(count);
    }
}
```

```
输出结果：
7
```

##### 5.3.2.3 reduce

用于组合流中的元素，如求和，求积，求最大值等，其方法签名：

```java
T reduce(T identity, BinaryOperator<T> accumulator);
Optional<T> reduce(BinaryOperator<T> accumulator);
<U> U reduce(U identity, BiFunction<U, ? super T, U> accumulator, BinaryOperator<U> combiner);
```

例如：

```java
import java.util.Optional;
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream1 = Stream.of(3, 7, 2, 9, 5, 8, 1);
        Stream<Integer> stream2 = Stream.of(3, 7, 2, 9, 5, 8, 1);

        Optional<Integer> reduce1 = stream1.reduce((a, b) -> a + b);
        Integer reduce2 = stream2.reduce(10, (a, b) -> a + b);
        
        System.out.println(reduce1);
        System.out.println(reduce2);
    }
}
```

```
输出结果：
Optional[35]
45
```

**至于第三种变体，如果你使用了 `parallelStream`， `reduce` 操作是并发进行的，为了避免竞争， 每个 `reduce` 线程都会有独立的 `result`。 `combiner` 的作用在于合并每个线程的 `result`， 得到最终结果。**

```java
import java.util.List;

public class Demo {
    public static void main(String[] args) {
        List<Integer> list = List.of(5, 3, 1, 7, 9, 6, 2, 4, 8);
        Integer p = list.parallelStream().reduce(0, (a, b) -> a + b, (m, n) -> m + n);
        System.out.println(p);
    }
}
```

> 这里每个线程先通过第二个参数传入的方法分别计算结果，然后通过第三个参数传入的方法来对每组结果进行处理。

> 简而言之，**第二个参数决定每个线程执行如何执行 `reduce` 操作，第三个参数决定的对每个线程 `reduce` 的结果如何执行 `reduce`**。

##### 5.3.2.4 anyMatch

流中元素是否存在至少一个元素满足要求

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(3, 7, 2, 9, 5, 8, 1);

        boolean b = stream.anyMatch(a -> a < 0);
        System.out.println(b);
    }
}
```

```
输出结果：
false
```

##### 5.3.2.5 allMatch

流中元素是否全部满足要求

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(3, 21, -2, 9, 5, 8, 1);

        boolean b = stream.allMatch(a -> a > 0);
        System.out.println(b);
    }
}
```

```
输出结果：
false
```

##### 5.3.2.6 noneMatch

流中是否没有元素满足要求

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(3, 21, 2, 9, 5, 8, 1);

        boolean b = stream.noneMatch(a -> a < 0);
        System.out.println(b);
    }
}
```

```
输出结果：
false
```

##### 5.3.2.7 findAny 和 findFirst

- `findAny()`：找到满足要求的一个元素 （使用 stream() 时找到的是第一个元素；使用 parallelStream() 并行时找到的是其中一个元素）
- `findFirst()`：找到满足要求的第一个元素

```java
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<Integer> stream1 = Stream.of(3, 21, -2, 9, 5, 8, 1);
        Stream<Integer> stream2 = Stream.of(7, 21, -2, 9, 5, 8, 1);

        Optional<Integer> first = stream1.findFirst();
        System.out.println(first);

        Optional<Integer> any = stream2.findAny();
        System.out.println(any);

        List<Integer> list = List.of(5, 3, 1, 7, 9, 6, 2, 4, 8);
        Optional<Integer> r = list.parallelStream().findAny();
        System.out.println(r);
    }
}
```

```
输出结果：
Optional[3]
Optional[7]
Optional[6]
```

#### 5.3.3 流转换方法

##### 5.3.3.1 concat

如果有两个流，希望合并成为一个流，那么可以使用 `Stream` 接口的静态方法 `concat()`：

```java
static <T> Stream<T> concat(Stream<? extends T> a, Stream<? extends T> b)
```

> 这是一个静态方法，与 `java.lang.String` 当中的 `concat()` 方法是不同的。

```java
import java.util.stream.Stream;

public class Demo {
    public static void main(String[] args) {
        Stream<String> stream1 = Stream.of("张无忌", "张三丰", "周芷若", "赵敏", "张翠山");
        Stream<String> stream2 = Stream.of("美羊羊", "喜羊羊", "懒羊羊", "灰太狼", "红太狼");
        Stream<String> concat = Stream.concat(stream1, stream2);
        concat.forEach(System.out::println);
    }
}
```

```
输出结果：
张无忌
张三丰
周芷若
赵敏
张翠山
美羊羊
喜羊羊
懒羊羊
灰太狼
红太狼
```

##### 5.3.3.2 boxed

将数值流转换为一般流

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Demo{
    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        IntStream stream = Arrays.stream(a);
        List<Integer> list = stream.map(n -> 10 - n).boxed().collect(Collectors.toList());
    }
}
```

