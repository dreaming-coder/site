# Java 基础 - 异常机制

> 本文转自 https://www.pdai.tech/md/java/basic/java-basic-x-exception.html


## 1. 异常的层次结构

异常指不期而至的各种状况，如：文件找不到、网络连接失败、非法参数等。异常是一个事件，它发生在程序运行期间，干扰了正常的指令流程。Java 通过 API 中 `Throwable` 类的众多子类描述各种不同的异常。因而，Java异常都是对象，是 `Throwable` 子类的实例，描述了出现在一段编码中的 错误条件。当条件生成时，错误将引发异常。

Java异常类层次结构图：

![](/imgs/java/java-basic-exception-1.png)

### 1.1 Throwable

`Throwable` 是 Java 语言中所有错误与异常的超类。

`Throwable` 包含两个子类：`Error`（错误）和 `Exception`（异常），它们通常用于指示发生了异常情况。

`Throwable` 包含了其线程创建时线程执行堆栈的快照，它提供了 `printStackTrace()` 等接口用于获取堆栈跟踪数据等信息。

### 1.2 Error (错误)

`Error` 类及其子类：程序中无法处理的错误，表示运行应用程序中出现了严重的错误。

此类错误一般表示代码运行时 JVM 出现问题。通常有 `Virtual MachineError`（虚拟机运行错误）、`NoClassDefFoundError`（类定义错误）等。比如 `OutOfMemoryError`：内存不足错误；`StackOverflowError`：栈溢出错误。此类错误发生时，JVM 将终止线程。

这些错误是不受检异常，非代码性错误。因此，当此类错误发生时，应用程序不应该去处理此类错误。按照 Java 惯例，我们是不应该实现任何新的 `Error` 子类的！

### 1.3 Exception (异常)

程序本身可以捕获并且可以处理的异常。`Exception` 这种异常又分为两类：运行时异常和编译时异常。

- **运行时异常**

都是 `RuntimeException` 类及其子类异常，如 `NullPointerException` (空指针异常)、`IndexOutOfBoundsException` (下标越界异常) 等，这些异常是不检查异常，程序中可以选择捕获处理，也可以不处理。这些异常一般是由程序逻辑错误引起的，程序应该从逻辑角度尽可能避免这类异常的发生。

运行时异常的特点是 Java 编译器不会检查它，也就是说，当程序中可能出现这类异常，即使没有用 `try-catch` 语句捕获它，也没有用 `throws` 子句声明抛出它，也会编译通过。

- **非运行时异常** （编译异常）

是 `RuntimeException` 以外的异常，类型上都属于 `Exception` 类及其子类。从程序语法角度讲是必须进行处理的异常，如果不处理，程序就不能编译通过。如 `IOException`、`SQLException` 等以及用户自定义的 `Exception` 异常，一般情况下不自定义检查异常。

### 1.4 可查的异常 (checked exceptions) 和不可查的异常 (unchecked exceptions)

- **可查异常**（编译器要求必须处置的异常）：

正确的程序在运行中，很容易出现的、情理可容的异常状况。可查异常虽然是异常状况，但在一定程度上它的发生是可以预计的，而且一旦发生这种异常状况，就必须采取某种方式进行处理。

除了 `RuntimeException` 及其子类以外，其他的 `Exception` 类及其子类都属于可查异常。这种异常的特点是 Java 编译器会检查它，也就是说，当程序中可能出现这类异常，要么用t `ry-catch` 语句捕获它，要么用 `throws` 子句声明抛出它，否则编译不会通过。

- **不可查异常**(编译器不要求强制处置的异常)

包括运行时异常（`RuntimeException` 与其子类）和错误（`Error`）。

## 2. 异常基础

### 2.1 异常关键字

- **try** – 用于监听。将要被监听的代码(可能抛出异常的代码)放在 `try` 语句块之内，当 `try` 语句块内发生异常时，异常就被抛出。
- **catch** – 用于捕获异常。`catch` 用来捕获 `try` 语句块中发生的异常。
- **finally** – `finally` 语句块总是会被执行。它主要用于回收在 `try` 块里打开的物理资源(如数据库连接、网络连接和磁盘文件)。只有 `finally` 块，执行完成之后，才会回来执行 `try` 或者 `catch` 块中的 `return` 或者 `throw` 语句，如果 `finally` 中使用了 `return` 或者 `throw` 等终止方法的语句，则就不会跳回执行，直接停止。
- **throw** – 用于抛出异常。
- **throws** – 用在方法签名中，用于声明该方法可能抛出的异常。

### 2.2 异常的声明 (throws)

Java 中，当前执行的语句必属于某个方法，Java 解释器调用 `main` 方法执行开始执行程序。若方法中存在检查异常，如果不对其捕获，那必须在方法头中显式声明该异常，以便于告知方法调用者此方法有异常，需要进行处理。 在方法中声明一个异常，方法头中使用关键字 `throws`，后面接上要声明的异常。若声明多个异常，则使用逗号分割。如下所示：

```java
public static void method() throws IOException, FileNotFoundException{
    //something statements
}
```

> 注意：若是父类的方法没有声明异常，则子类继承方法后，也不能声明异常。

通常，应该捕获那些知道如何处理的异常，将不知道如何处理的异常继续传递下去。传递异常可以在方法签名处使用 `throws` 关键字声明可能会抛出的异常。

```java
private static void readFile(String filePath) throws IOException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = new BufferedReader(new FileReader(file));
    while((result = reader.readLine())!=null) {
        System.out.println(result);
    }
    reader.close();
}
```

Throws抛出异常的规则：

- 如果是不可查异常（unchecked exception），即 `Error`、`RuntimeException` 或它们的子类，那么可以不使用 `throws` 关键字来声明要抛出的异常，编译仍能顺利通过，但在运行时会被系统抛出。
- 必须声明方法可抛出的任何可查异常（checked exception）。即如果一个方法可能出现受可查异常，要么用 `try-catch` 语句捕获，要么用 `throws` 子句声明将它抛出，否则会导致编译错误。
- 仅当抛出了异常，该方法的调用者才必须处理或者重新抛出该异常。当方法的调用者无力处理该异常的时候，应该继续抛出，而不是囫囵吞枣。
- 调用方法必须遵循任何可查异常的处理和声明规则。若覆盖一个方法，则不能声明与覆盖方法不同的异常。声明的任何异常必须是被覆盖方法所声明异常的同类或子类。

### 2.3 异常的抛出 (throw)

如果代码可能会引发某种错误，可以创建一个合适的异常类实例并抛出它，这就是抛出异常。如下所示：

```java
public static double method(int value) {
    if(value == 0) {
        throw new ArithmeticException("参数不能为0"); // 抛出一个运行时异常
    }
    return 5.0 / value;
}
```

大部分情况下都不需要手动抛出异常，因为 Java 的大部分方法要么已经处理异常，要么已声明异常。所以一般都是捕获异常或者再往上抛。

有时我们会从 `catch` 中抛出一个异常，目的是为了改变异常的类型。多用于在多系统集成时，当某个子系统故障，异常类型可能有多种，可以用统一的异常类型向外暴露，不需暴露太多内部异常细节。

```java
private static void readFile(String filePath) throws MyException {    
    try {
        // code
    } catch (IOException e) {
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    }
}
```

### 2.4 异常的自定义

习惯上，定义一个异常类应包含两个构造函数，一个无参构造函数和一个带有详细描述信息的构造函数（`Throwable` 的 `toString` 方法会打印这些详细信息，调试时很有用）, 比如上面用到的自定义 `MyException`：

```java
public class MyException extends Exception {
    public MyException(){ }
    public MyException(String msg){
        super(msg);
    }
    // ...
}
```

### 2.5 异常的捕获

#### 2.5.1 try-catch

在一个 `try-catch` 语句块中可以捕获多个异常类型，并对不同类型的异常做出不同的处理

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException e) {
        // handle FileNotFoundException
    } catch (IOException e){
        // handle IOException
    }
}
```

同一个 `catch` 也可以捕获多种类型异常，用 `|` 隔开：

```java
private static void readFile(String filePath) {
    try {
        // code
    } catch (FileNotFoundException | UnknownHostException e) {
        // handle FileNotFoundException or UnknownHostException
    } catch (IOException e){
        // handle IOException
    }
}
```

#### 2.5.2 try-catch-finally

- 常规语法

```java
try {                        
    //执行程序代码，可能会出现异常                 
} catch(Exception e) {   
    //捕获异常并处理   
} finally {
    //必执行的代码
}
```

- 执行的顺序

  -  **当 `try` 没有捕获到异常时**

    `try` 语句块中的语句逐一被执行，程序将跳过 `catch` 语句块，执行 `finally` 语句块和其后的语句。

  - **当 `try` 捕获到异常，`catch` 语句块里没有处理此异常的情况**

    当 `try` 语句块里的某条语句出现异常时，而没有处理此异常的 `catch` 语句块时，此异常将会抛给 JVM 处理，`finally` 语句块里的语句还是会被执行，但 `finally` 语句块后的语句不会被执行。

  - **当 `try` 捕获到异常，`catch` 语句块里有处理此异常的情况**

    在 `try` 语句块中是按照顺序来执行的，当执行到某一条语句出现异常时，程序将跳到 `catch` 语句块，并与 `catch` 语句块逐一匹配，找到与之对应的处理程序，其他的 `catch` 语句块将不会被执行，而 `try` 语句块中，出现异常之后的语句也不会被执行，`catch` 语句块执行完后，执行 `finally` 语句块里的语句，最后执行 `finally` 语句块后的语句。

![](/imgs/java/java-basic-exception-2.jpg)

- 一个完整的例子

```java
private static void readFile(String filePath) throws MyException {
    File file = new File(filePath);
    String result;
    BufferedReader reader = null;
    try {
        reader = new BufferedReader(new FileReader(file));
        while((result = reader.readLine())!=null) {
            System.out.println(result);
        }
    } catch (IOException e) {
        System.out.println("readFile method catch block.");
        MyException ex = new MyException("read file failed.");
        ex.initCause(e);
        throw ex;
    } finally {
        System.out.println("readFile method finally block.");
        if (null != reader) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

#### 2.5.3 try-finally

`try` 块中引起异常，异常代码之后的语句不再执行，直接执行 `finally` 语句。 `try` 块没有引发异常，则执行完 `try` 块就执行 `finally` 语句。

`try-finally` 可用在不需要捕获异常的代码，可以保证资源在使用后被关闭。例如 IO 流中执行完相应操作后，关闭相应资源；使用 `Lock` 对象保证线程同步，通过 `finally` 可以保证锁会被释放；数据库连接代码时，关闭连接操作等等。

```java
//以Lock加锁为例，演示try-finally
ReentrantLock lock = new ReentrantLock();
try {
    //需要加锁的代码
} finally {
    lock.unlock(); //保证锁一定被释放
}
```

`finally` 遇见如下情况不会执行

- 在前面的代码中用了 `System.exit()` 退出程序
- `finally` 语句块中发生了异常
- 程序所在的线程死亡
- 关闭CPU

#### 2.5.4 try-with-resource

> `try-with-resource` 是 Java 7 中引入的，很容易被忽略。

上面例子中，`finally ` 中的 `close` 方法也可能抛出 `IOException`，从而覆盖了原始异常。JAVA 7 提供了更优雅的方式来实现资源的自动释放，自动释放的资源需要是实现了 `AutoCloseable` 接口的类。

- 代码实现

```java
private  static void tryWithResourceTest(){
    try (Scanner scanner = new Scanner(new FileInputStream("c:/abc"),"UTF-8")){
        // code
    } catch (IOException e){
        // handle exception
    }
}
```

- 看下 `Scanner`

```java
public final class Scanner implements Iterator<String>, Closeable {
  // ...
}
public interface Closeable extends AutoCloseable {
    public void close() throws IOException;
}
```

`try` 代码块退出时，会自动调用 `scanner.close` 方法，和把 `scanner.close` 方法放在 `finally` 代码块中不同的是，若 `scanner.close` 抛出异常，则会被抑制，抛出的仍然为原始异常。被抑制的异常会由 `addSusppressed` 方法添加到原来的异常，如果想要获取被抑制的异常列表，可以调用 `getSuppressed` 方法来获取。

## 3. 异常实践

### 3.1 只针对不正常的情况才使用异常

> 异常只应该被用于不正常的条件，它们永远不应该被用于正常的控制流。《阿里手册》中：【强制】Java 类库中定义的可以通过预检查方式规避的 `RuntimeException` 异常不应该通过 `catch` 的方式来处理，比如：`NullPointerException`，`IndexOutOfBoundsException` 等等。

比如，在解析字符串形式的数字时，可能存在数字格式错误，不得通过 catch Exception 来实现

- 代码1

```java
if (obj != null) {
  //...
}
```

- 代码2

```java
try { 
  obj.method(); 
} catch (NullPointerException e) {
  //...
}
```

主要原因有三点：

- 异常机制的设计初衷是用于不正常的情况，所以很少有 JVM 实现试图对它们的性能进行优化。所以，创建、抛出和捕获异常的开销是很昂贵的。
- 把代码放在 `try-catch` 中返回阻止了 JVM 实现本来可能要执行的某些特定的优化。
- 对数组进行遍历的标准模式并不会导致冗余的检查，有些现代的 JVM 实现会将它们优化掉。

### 3.2 在 finally 块中清理资源或者使用 try-with-resource 语句

当使用类似 `InputStream` 这种需要使用后关闭的资源时，一个常见的错误就是在 `try` 块的最后关闭资源，应该把清理工作的代码放到 `finally` 里去，或者使用 `try-with-resource` 特性。

- 方法一：使用 `finally` 代码块

```java
public void closeResourceInFinally() {
    FileInputStream inputStream = null;
    try {
        File file = new File("./tmp.txt");
        inputStream = new FileInputStream(file);
        // use the inputStream to read a file
    } catch (FileNotFoundException e) {
        log.error(e);
    } finally {
        if (inputStream != null) {
            try {
                inputStream.close();
            } catch (IOException e) {
                log.error(e);
            }
        }
    }
}
```

- 方法二：Java 7 的 `try-with-resource` 语法

如果你的资源实现了 `AutoCloseable` 接口，你可以使用这个语法。大多数的 Java 标准资源都继承了这个接口。当你在 `try` 子句中打开资源，资源会在 `try` 代码块执行后或异常处理后自动关闭。

```java
public void automaticallyCloseResource() {
    File file = new File("./tmp.txt");
    try (FileInputStream inputStream = new FileInputStream(file);) {
        // use the inputStream to read a file
    } catch (FileNotFoundException e) {
        log.error(e);
    } catch (IOException e) {
        log.error(e);
    }
}
```

### 3.3 尽量使用标准异常

> 代码重用是值得提倡的，这是一条通用规则，异常也不例外。

重用现有的异常有几个好处：

- 它使得你的 API 更加易于学习和使用，因为它与程序员原来已经熟悉的习惯用法是一致的。
- 对于用到这些 API 的程序而言，它们的可读性更好，因为它们不会充斥着程序员不熟悉的异常。
- 异常类越少，意味着内存占用越小，并且转载这些类的时间开销也越小。

Java 标准异常中有几个是经常被使用的异常。如下表格：

|               异常                |                  使用场合                  |
| :-------------------------------: | :----------------------------------------: |
|    `IllegalArgumentException`     |               参数的值不合适               |
|      `IllegalStateException`      |              参数的状态不合适              |
|      `NullPointerException`       |      在null被禁止的情况下参数值为null      |
|    `IndexOutOfBoundsException`    |                  下标越界                  |
| `ConcurrentModificationException` | 在禁止并发修改的情况下，对象检测到并发修改 |
|  `UnsupportedOperationException`  |          对象不支持客户请求的方法          |

虽然它们是 Java 平台库迄今为止最常被重用的异常，但是，在许可的条件下，其它的异常也可以被重用。例如，如果你要实现诸如复数或者矩阵之类的算术对象，那么重用 `ArithmeticException` 和 `NumberFormatException` 将是非常合适的。如果一个异常满足你的需要，则不要犹豫，使用就可以，不过你一定要确保抛出异常的条件与该异常的文档中描述的条件一致。这种重用必须建立在语义的基础上，而不是名字的基础上。

### 3.4 对异常进行文档说明

> 当在方法上声明抛出异常时，也需要进行文档说明。目的是为了给调用者提供尽可能多的信息，从而可以更好地避免或处理异常。

在 Javadoc 添加 `@throws` 声明，并且描述抛出异常的场景。

```java
/**
* Method description
* 
* @throws MyBusinessException - businuess exception description
*/
public void doSomething(String input) throws MyBusinessException {
   // ...
}
```

同时，在抛出 `MyBusinessException ` 异常时，需要尽可能精确地描述问题和相关信息，这样无论是打印到日志中还是在监控工具中，都能够更容易被人阅读，从而可以更好地定位具体错误信息、错误的严重程度等。

### 3.5 优先捕获最具体的异常

```java
public void catchMostSpecificExceptionFirst() {
    try {
        doSomething("A message");
    } catch (NumberFormatException e) {
        log.error(e);
    } catch (IllegalArgumentException e) {
        log.error(e)
    }
}
```

### 3.6 不要捕获 Throwable 类

> `Throwable` 是所有异常和错误的超类。你可以在 `catch` 子句中使用它，但是你永远不应该这样做！

如果在 `catch` 子句中使用 `Throwable` ，它不仅会捕获所有异常，也将捕获所有的错误。JVM 抛出错误，指出不应该由应用程序处理的严重问题。 典型的例子是  `OutOfMemoryError `或者  `StackOverflowError `。两者都是由应用程序控制之外的情况引起的，无法处理。

所以，最好不要捕获 `Throwable `，除非你确定自己处于一种特殊的情况下能够处理错误。

### 3.7 不要忽略异常

> 很多时候，开发者很有自信不会抛出异常，因此写了一个 `catch` 块，但是没有做任何处理或者记录日志。

```java
public void doNotIgnoreExceptions() {
    try {
        // do something
    } catch (NumberFormatException e) {
        // this will never happen
    }
}
```

但现实是经常会出现无法预料的异常，或者无法确定这里的代码未来是不是会改动(删除了阻止异常抛出的代码)，而此时由于异常被捕获，使得无法拿到足够的错误信息来定位问题。

合理的做法是至少要记录异常的信息。

```java
public void logAnException() {
    try {
        // do something
    } catch (NumberFormatException e) {
        log.error("This should never happen: " + e); // see this line
    }
}
```

### 3.8 不要记录并抛出异常

> 这可能是本文中最常被忽略的最佳实践。

可以发现很多代码甚至类库中都会有捕获异常、记录日志并再次抛出的逻辑。如下：

```java
try {
    new Long("xyz");
} catch (NumberFormatException e) {
    log.error(e);
    throw e;
}
```

这个处理逻辑看着是合理的。但这经常会给同一个异常输出多条日志。如下：

```java
17:44:28,945 ERROR TestExceptionHandling:65 - java.lang.NumberFormatException: For input string: "xyz"
Exception in thread "main" java.lang.NumberFormatException: For input string: "xyz"
at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
at java.lang.Long.parseLong(Long.java:589)
at java.lang.Long.(Long.java:965)
at com.stackify.example.TestExceptionHandling.logAndThrowException(TestExceptionHandling.java:63)
at com.stackify.example.TestExceptionHandling.main(TestExceptionHandling.java:58)
```

如上所示，后面的日志也没有附加更有用的信息。如果想要提供更加有用的信息，那么可以将异常包装为自定义异常。

```java
public void wrapException(String input) throws MyBusinessException {
    try {
        // do something
    } catch (NumberFormatException e) {
        throw new MyBusinessException("A message that describes the error.", e);
    }
}
```

因此，仅仅当想要处理异常时才去捕获，否则只需要在方法签名中声明让调用者去处理。

### 3.9 包装异常时不要抛弃原始的异常

捕获标准异常并包装为自定义异常是一个很常见的做法。这样可以添加更为具体的异常信息并能够做针对的异常处理。 在你这样做时，请确保将原始异常设置为原因（注：参考下方代码 `NumberFormatException e` 中的原始异常 `e` ）。`Exception` 类提供了特殊的构造函数方法，它接受一个 `Throwable` 作为参数。否则，你将会丢失堆栈跟踪和原始异常的消息，这将会使分析导致异常的异常事件变得困难。

```java
public void wrapException(String input) throws MyBusinessException {
    try {
        // do something
    } catch (NumberFormatException e) {
        throw new MyBusinessException("A message that describes the error.", e);
    }
}
```

### 3.10 不要使用异常控制程序的流程

不应该使用异常控制应用的执行流程，例如，本应该使用 `if` 语句进行条件判断的情况下，你却使用异常处理，这是非常不好的习惯，会严重影响应用的性能。

###  3.11 不要在 finally 块中使用 return

`try` 块中的 `return` 语句执行成功后，并不马上返回，而是继续执行 `finally` 块中的语句，如果此处存在 `return` 语句，则在此直接返回，无情丢弃掉 `try` 块中的返回点。

如下是一个反例：

```java
private int x = 0;
public int checkReturn() {
    try {
        // x等于1，此处不返回
        return ++x;
    } finally {
        // 返回的结果是2
        return ++x;
    }
}
```

## 参考文章

- https://blog.csdn.net/MacWx/article/details/90204111
- https://blog.csdn.net/hguisu/article/details/6155636
- https://blog.csdn.net/ThinkWon/article/details/101681073
- https://www.cnblogs.com/skywang12345/p/3544287.html
- https://www.codercto.com/a/33350.html

