# SpringBoot 基础 - 单元测试

> SpringBoot 采用 Junit 5 作为单元测试的框架。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## 1. JUnit 5 常用注解

- `@Test`

  表示方法是测试方法，但是与 JUnit 4 的 `@Test` 不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试

- `@ParameterizedTest`

  表示方法是参数化测试，下方会有详细介绍

- `@RepeatedTest`

  表示方法可重复执行，下方会有详细介绍

- `@DisplayName`

  为测试类或者测试方法设置展示名称

- `@BeforeEach`

  表示在每个单元测试之前执行

- `@AfterEach`

  表示在每个单元测试之后执行

- `@BeforeAll`

  表示在所有单元测试之前执行，必须 `static`

- `@AfterAll`

  表示在所有单元测试之后执行，必须 `static`

- `@Tag`

  表示单元测试类别

- `@Disabled`

  表示测试类或测试方法不执行

- `@Timeout`

  表示测试方法运行如果超过了指定时间将会返回错误

- `@RepeatedTest`

  表示可以重复测试

- `@ExtendWith`

  为测试类或测试方法提供扩展类引用

```java
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.TimeUnit;

//@SpringBootTest
@DisplayName("JUnit5功能测试类")
public class JUnit5Test {

    @Autowired
    Person person;

    @Test
    @DisplayName("测试DisplayName注解（1）")
    void testDisplayName1() {
        System.out.println("第一个testDisplayName()...");
        System.out.println(person);
    }

    @Test
    @DisplayName("测试DisplayName注解（2）")
    void testDisplayName2() {
        System.out.println("第二个testDisplayName()...");
    }

    @Test
    @Disabled
    @DisplayName("测试DisplayName注解（3）")
    void testDisplayName3() {
        System.out.println("第三个testDisplayName()...");
    }

    @Test
    @Timeout(value = 5, unit = TimeUnit.MILLISECONDS)
    @DisplayName("测试DisplayName注解（4）")
    void testDisplayName4() throws InterruptedException {
        Thread.sleep(10);
        System.out.println("第四个testDisplayName()...");
    }

    @RepeatedTest(3)
    void testRepeatedTest(){
        System.out.println("testRepeatedTest()....");
    }

    @BeforeEach
    void testBeforeEach() {
        System.out.println("测试要开始了...");
    }

    @AfterEach
    void testAfterEach() {
        System.out.println("测试结束了...");
    }

    @BeforeAll
    static void testBeforeAll() {
        System.out.println("所有测试都要开始了...");
    }

    @AfterAll
    static void testAfterAll() {
        System.out.println("所有测试都结束了...");
    }
}
```

![](/imgs/spring/springboot/springboot-test-1.png)

这里可以看到，打印的 `person` 是 `null`，因为此时找不到这个组件，需要把 `@SpringBootTest` 解除注释，此时再运行可以看到就有值了：

![](/imgs/spring/springboot/springboot-test-2.png)

## 2. 断言

断言（assertions）是测试方法中的核心部分，用来对测试需要满足的条件进行验证. 这些断言方法都是 `org.junit.jupiter.api.Assertions` 的静态方法。

**检查业务逻辑返回的数据是否合理**

**所有的测试运行结束以后，会有一个详细的测试报告**

### 2.1 简单断言

用来对单个值进行简单的验证，如：

|       方法        |                 说明                 |
| :---------------: | :----------------------------------: |
| `assertEquals()`  |  判断两个对象或两个原始类型是否相等  |
| `assertNotEquals` | 判断两个对象或两个原始类型是否不相等 |
|   `assertSame`    |  判断两个对象引用是否指向同一个对象  |
|  `assertNotSame`  |  判断两个对象引用是否指向不同的对象  |
|   `assertTrue`    |    判断给定的布尔值是否为 `true`     |
|   `assertFalse`   |    判断给定的布尔值是否为 `false`    |
|   `assertNull`    |   判断给定的对象引用是否为 `null`    |
|  `assertNotNull`  |  判断给定的对象引用是否不为 `null`   |

如下示例：

```java
public class JUnit5Test {
    // 业务逻辑
    int add(int i, int j) {
        return i + j;
    }

    @Test
    @DisplayName("测试简单断言")
    public void simple() {
        int sum = add(2, 3);
        Assertions.assertEquals(3, sum,"业务逻辑失败"); // 断言失败，后面不会执行了
        Object o1 = new Object();
        Object o2 = new Object();
        Assertions.assertSame(o1,o2,"不一致对象");
    }
}
```

> 如果一个测试方法有多个断言，则前面的断言失败，后面不会执行。

### 2.2 数组断言

通过 `assertArrayEquals` 方法来判断两个对象或原始类型的数组是否相等：

```java
@Test
@DisplayName("array assertion")
public void array() {
    Assertions.assertArrayEquals(new int[]{1, 2}, new int[] {1, 2});
}
```

### 2.3 组合断言

`assertAll` 方法接受多个 `org.junit.jupiter.api.Executable` 函数式接口的实例作为要验证的断言，可以通过 `lambda` 表达式很容易的提供这些断言。

`Executable` 接口源码如下：

```java
@FunctionalInterface
@API(status = STABLE, since = "5.0")
public interface Executable {

	void execute() throws Throwable;

}
```

可以看到， lambda 表达式是一个无参无返回值的函数，具体示例如下：

```java
@Test
@DisplayName("assert all")
public void all() {
    Assertions.assertAll("Math",
        () -> Assertions.assertEquals(2, 1 + 1),
        () -> Assertions.assertTrue(1 > 0)
    );
}
```

### 2.4 异常断言

JUnit 5 提供了一种新的断言方式 `Assertions.assertThrows()`，配合函数式编程就可以进行使用，用于断言一定会抛异常。

```java
@Test
@DisplayName("异常测试")
public void exceptionTest() {
    ArithmeticException exception = Assertions.assertThrows(
        // 扔出断言异常
        ArithmeticException.class, () -> System.out.println(1 % 0), "业务逻辑异常"
    );
}
```

### 2.5 超时断言

Junit 5还提供了 `Assertions.assertTimeout()` 为测试方法设置了超时时间。

```java
@Test
@DisplayName("超时测试")
public void timeoutTest() {
    //如果测试方法时间超过 1s 将会异常
    Assertions.assertTimeout(Duration.ofMillis(1000), () -> Thread.sleep(500));
}
```

### 2.6 快速失败

通过 `fail()` 方法直接使得测试失败

```java
@Test
@DisplayName("fail")
public void shouldFail() {
    fail("This should fail");
}
```

## 3. 前置条件

JUnit 5 中的前置条件（**assumptions【假设】**）类似于断言，不同之处在于**不满足的断言会使得测试方法失败**，而不满足的**前置条件只会使得测试方法的执行终止**。前置条件可以看成是测试方法执行的前提，当该前提不满足时，就没有继续执行的必要。

```java
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Objects;

import static org.junit.jupiter.api.Assumptions.*;


@DisplayName("JUnit5Test")
public class JUnit5Test {
    private final String environment = "DEV";

    @Test
    @DisplayName("simple")
    public void simpleAssume() {
        assumeTrue(Objects.equals(this.environment, "DEV"));
        assumeFalse(() -> Objects.equals(this.environment, "PROD"));
    }

    @Test
    @DisplayName("assume then do")
    public void assumeThenDo() {
        assumingThat(
                Objects.equals(this.environment, "DEV"),
                () -> System.out.println("In DEV")
        );
    }
}
```

`assumeTrue` 和 `assumFalse` 确保给定的条件为 `true` 或 `false`，不满足条件会使得测试执行终止。`assumingThat` 的参数是表示条件的布尔值和对应的 `Executable` 接口的实现对象。 只有条件满足时，`Executable` 对象才会被执行；当条件不满足时，测试执行并不会终止。

## 4. 嵌套测试

JUnit 5 可以通过 Java 中的内部类和 `@Nested` 注解实现嵌套测试，从而可以更好的把相关的测试方法组织在一起。 在内部类中可以使用 `@BeforeEach` 和 `@AfterEach` 注解，而且嵌套的层次没有限制。

**外层 test 不能驱动依赖内层 test的执行，但是内层 test 方法可以依赖外层的 test方法先执行！**

```java
import static org.junit.jupiter.api.Assertions.*;

import java.util.EmptyStackException;
import java.util.Stack;

import org.junit.jupiter.api.*;


@DisplayName("件套测试")
public class JUnit5Test {
    Stack<Object> stack;

    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }

    @Nested
    @DisplayName("when new")
    class WhenNew {

        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }

        @Test
        @DisplayName("is empty")
        void isEmpty() {
             assertTrue(stack.isEmpty());
        }

        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, stack::pop);
        }

        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, stack::peek);
        }

        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {

            String anElement = "an element";

            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }

            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }

            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```

## 5. 参数化测试

参数化测试是 JUnit 5 很重要的一个新特性，它使得用不同的参数多次运行测试成为了可能，也为我们的单元测试带来许多便利。

- `@ValueSource`

  为参数化测试指定入参来源，支持八大基础类以及 `String` 类型，`Class` 类型。

- `@NullSource`

  表示为参数化测试提供一个 `null` 的入参。

- `@EnumSource`

  表示为参数化测试提供一个枚举入参。

- `@CsvFileSource`

  表示读取指定 CSV 文件内容作为参数化测试入参。

- `@MethodSource`

  表示读取指定方法的返回值作为参数化测试入参(注意方法返回需要是一个流)。

> 它的真正强大之处的地方在于他可以支持外部的各类入参。如：CSV，YAML，JSON 文件甚至方法的返回值也可以作为入参，只需要去实现 `ArgumentsProvider` 接口，任何外部文件都可以作为它的入参。

```java
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.platform.commons.util.StringUtils;

import java.util.stream.Stream;


@DisplayName("参数化测试")
public class JUnit5Test {

    @ParameterizedTest
    @ValueSource(strings = {"one", "two", "three"})
    @DisplayName("参数化测试1")
    public void parameterizedTest1(String string) {
        System.out.println(string);
        Assertions.assertTrue(StringUtils.isNotBlank(string));
    }


    @ParameterizedTest
    @MethodSource("method")    //指定方法名
    @DisplayName("方法来源参数")
    public void testWithExplicitLocalMethodSource(String name) {
        System.out.println(name);
        Assertions.assertNotNull(name);
    }

    static Stream<String> method() {
        return Stream.of("apple", "banana");
    }
}
```

