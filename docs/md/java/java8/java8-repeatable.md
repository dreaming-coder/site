# Java 8 - 重复注解



## 什么是重复注解

允许在同一申明类型(类，属性，或方法)的多次使用同一个注解

### JDK 8 之前

Java 8 之前也有重复使用注解的解决方案，但可读性不是很好，比如下面的代码：

```java
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseOldVersion {

    @Authorities({@Authority(role="Admin"),@Authority(role="Manager")})
    public void doSomeThing(){
    }
}
```

由另一个注解来存储重复注解，在使用时候，用存储注解 Authorities 来扩展重复注解。

### JDK 8 重复注解

我们再来看看 Java 8 里面的做法：

```java
@Repeatable(Authorities.class)
public @interface Authority {
     String role();
}

public @interface Authorities {
    Authority[] value();
}

public class RepeatAnnotationUseNewVersion {
    @Authority(role="Admin")
    @Authority(role="Manager")
    public void doSomeThing(){ }
}
```

不同的地方是，创建重复注解 Authority 时，加上 `@Repeatable`，指向存储注解 Authorities，在使用时候，直接可以重复使用 Authority 注解。从上面例子看出，Java 8 里面做法更适合常规的思维，可读性强一点。

