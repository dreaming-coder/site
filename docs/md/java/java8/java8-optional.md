# Java 8 - Optional

> 身为一名 Java 程序员，大家可能都有这样的经历：调用一个方法得到了返回值却不能直接将返回值作为参数去调用别的方法。我们首先要判断这个返回值是否为 `null`，只有在非空的前提下才能将其作为其他方法的参数。Java 8 引入了一个新的 `Optional` 类，这是一个可以为 `null` 的容器对象。如果值存在则 `isPresent()` 方法会返回 `true`，调用 `get()` 方法会返回该对象。

## 1. of

> 为非 `null` 的值创建一个 `Optional`。

`of` 方法通过工厂方法创建 `Optional` 类。需要注意的是，创建对象时传入的参数不能为 `null`。如果传入参数为 `null`，则抛出 `NullPointerException `。

```java
//调用工厂方法创建Optional实例
Optional<String> name = Optional.of("Sanaulla");
//传入参数为null，抛出NullPointerException.
Optional<String> someNull = Optional.of(null);
```

## 2. ofNullable

> 为指定的值创建一个 `Optional`，如果指定的值为 `null`，则返回一个空的 `Optional`。

`ofNullable` 与 `of` 方法相似，唯一的区别是可以接受参数为 `null` 的情况。示例如下:

```java
//下面创建了一个不包含任何值的Optional实例
//例如，值为'null'
Optional empty = Optional.ofNullable(null);
```

## 3. isPresent

> 如果值存在返回 `true`，否则返回 `false`。

```java
public boolean isPresent() {
    return value != null;
}
```

## 4. get

> 如果 `Optional` 有值则将其返回，否则抛出 `NoSuchElementException`。

```java
public T get() {
    if (value == null) {
        throw new NoSuchElementException("No value present");
    }
    return value;
}
```

## 5. ifPresent

> 如果 `Optional` 实例有值则为其调用 `consumer`，否则不做处理。

```java
public void ifPresent(Consumer<? super T> consumer) {
    if (value != null)
        consumer.accept(value);
}
```

要理解 `ifPresent` 方法，首先需要了解 `Consumer` 类。简答地说，`Consumer` 类包含一个抽象方法。该抽象方法对传入的值进行处理，但没有返回值。Java 8 支持不用接口直接通过 Lambda 表达式传入参数。

如果 `Optional` 实例有值，调用 `ifPresent()` 可以接受接口段或 Lambda 表达式。类似下面的代码：

```java
//ifPresent方法接受lambda表达式作为参数。
//lambda表达式对Optional的值调用consumer进行处理。
name.ifPresent((value) -> {
  System.out.println("The length of the value is: " + value.length());
});
```

## 6. orElse

> 如果有值则将其返回，否则返回指定的其它值。

```java
public T orElse(T other) {
    return value != null ? value : other;
}
```

如果 `Optional` 实例有值则将其返回，否则返回 `orElse` 方法传入的参数。示例如下：

```java
//如果值不为null，orElse方法返回Optional实例的值。
//如果为null，返回传入的消息。
//输出: There is no value present!
System.out.println(empty.orElse("There is no value present!"));
//输出: Sanaulla
System.out.println(name.orElse("There is some value!"));
```

## 7. orElseGet

> `orElseGet` 与 `orElse` 方法类似，区别在于得到的默认值。`orElse` 方法将传入的字符串作为默认值，`orElseGet` 方法可以接受 `Supplier` 接口的实现用来生成默认值。

```java
public T orElseGet(Supplier<? extends T> other) {
    return value != null ? value : other.get();
}
```

示例如下：

```java
//orElseGet与orElse方法类似，区别在于orElse传入的是默认值，
//orElseGet可以接受一个lambda表达式生成默认值。
//输出: Default Value
System.out.println(empty.orElseGet(() -> "Default Value"));
```

## 8. orElseThrow

> 如果有值则将其返回，否则抛出 `Supplier` 接口创建的异常。

```java
public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
    if (value != null) {
        return value;
    } else {
        throw exceptionSupplier.get();
    }
}
```

在 `orElseGet` 方法中，我们传入一个 `Supplier `接口。然而，在 `orElseThrow` 中我们可以传入一个 Lambda 表达式或方法，如果值不存在来抛出异常。

## 9. map

> 如果有值，则对其执行调用 `mapping` 函数得到返回值。如果返回值不为 `null`，则创建包含 `mapping` 返回值的 `Optional` 作为 `map` 方法返回值，否则返回空 `Optional`。

```java
public<U> Optional<U> map(Function<? super T, ? extends U> mapper) {
    Objects.requireNonNull(mapper);
    if (!isPresent())
        return empty();
    else {
        return Optional.ofNullable(mapper.apply(value));
    }
}
```

`map` 方法用来对 `Optional` 实例的值执行一系列操作。通过一组实现了 `Function` 接口的 Lambda 表达式传入操作。`map` 方法示例如下:

```java
//map方法执行传入的lambda表达式参数对Optional实例的值进行修改。
//为lambda表达式的返回值创建新的Optional实例作为map方法的返回值。
Optional<String> upperName = name.map((value) -> value.toUpperCase());
System.out.println(upperName.orElse("No value found"));
```

## 10. flatMap

> 如果有值，为其执行 `mapping` 函数返回 `Optional` 类型返回值，否则返回空 `Optional`。`flatMap` 与 `map(Funtion)` 方法类似，区别在于 `flatMap` 中的 `mapper` 返回值必须是 `Optional`。调用结束时，`flatMap` 不会对结果用 `Optional` 封装。

```java
public<U> Optional<U> flatMap(Function<? super T, Optional<U>> mapper) {
    Objects.requireNonNull(mapper);
    if (!isPresent())
        return empty();
    else {
        return Objects.requireNonNull(mapper.apply(value));
    }
}
```

## 11. filter

> 如果有值并且满足断言条件返回包含该值的 `Optional`，否则返回空 `Optional`。

```java
public Optional<T> filter(Predicate<? super T> predicate) {
    Objects.requireNonNull(predicate);
    if (!isPresent())
        return this;
    else
        return predicate.test(value) ? this : empty();
}
```

