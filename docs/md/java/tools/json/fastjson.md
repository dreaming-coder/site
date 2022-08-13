# Java 工具 - FastJson

[[TOC]]

## 1. JSON 语法规则

JSON 语法是 JavaScript 对象表示语法的子集。

- 数据在**名称/值**对中
- 数据由逗号 **,** 分隔
- 使用斜杆来转义 `\` 字符
- 大括号 `{}` 保存对象
- 中括号 `[]` 保存数组，数组可以包含多个对象

**JSON 的两种结构：**

- **对象：**大括号 `{}` 保存的对象是一个无序的**名称/值**对集合。一个对象以左括号 `{` 开始， 右括号 `}` 结束。每个"键"后跟一个冒号 `:`，**名称/值**对使用逗号 `,` 分隔。

![](/imgs/java/tools/json/fastjson/fastjson-1.png =60%x)

- **数组**：中括号 `[]` 保存的数组是值（value）的有序集合。一个数组以左中括号 `[` 开始， 右中括号 `]` 结束，值之间使用逗号 `,` 分隔。

![](/imgs/java/tools/json/fastjson/fastjson-2.png =60%x)

值（value）可以是双引号括起来的字符串（string）、数值(number)、true、false、 null、对象（object）或者数组（array），它们是可以嵌套的。

![](/imgs/java/tools/json/fastjson/fastjson-3.png =60%x)

> 遵循好的设计与编码风格，能提前解决 80% 的问题：[Google JSON风格指南](https://github.com/darcyliu/google-styleguide/blob/master/JSONStyleGuide.md)
>
> - 属性名和值都是用双引号，不要把注释写到对象里面，对象数据要简洁
> - 不要随意结构化分组对象，推荐是用扁平化方式，层次不要太复杂
> - 命名方式要有意义，比如单复数表示
> - 驼峰式命名，遵循 Bean 规范
> - 使用版本来控制变更冲突
> - 对于一些关键字，不要拿来做 `key`
> - 如果一个属性是可选的或者包含空值或 `null` 值，考虑从 JSON 中去掉该属性，除非它的存在有很强的语义原因
> - 序列化枚举类型时，使用 `name` 而不是 `value`
> - 日期要用标准格式处理
> - 设计好通用的分页参数
> - 设计好异常处理

## 2. FastJson 的引入

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>2.0.11</version>
</dependency>
```

## 3. 主要 API

### 3.1 基本使用

#### 3.1.1 序列化

```java
User ice = new User(123456789L, "ice", 18);
String s = JSON.toJSONString(ice);
System.out.println(s);
```

输出：

```json
{"age":18,"id":123456789,"name":"ice"}
```

#### 3.1.2 反序列化

- 单个对象

```java
String user = "{\"age\":18,\"id\":123456789,\"name\":\"ice\"}";
User u = JSON.parseObject(user, User.class);
System.out.println(u);
```

输出：

```
User{id=123456789, name='ice', age=18}
```

- 对象数组

```java
user = "[{\"age\":18,\"id\":123456789,\"name\":\"ice\"},{\"age\":16,\"id\":123548243,\"name\":\"yee\"}]";
List<User> users = JSON.parseArray(user, User.class);
users.forEach(System.out::println);
```

输出：

```
User{id=123456789, name='ice', age=18}
User{id=123548243, name='yee', age=16}
```

#### 3.2.3 综合示例

- 序列化

```java
User user1 = new User(1000L, "亚索", 32);
User user2 = new User(1001L, "瑞雯", 16);
User user3 = new User(1002L, "劫", 12);

Group group = new Group();
group.setId(9999L);
group.setName("管理员");
group.addUser(user1);
group.addUser(user2);
group.addUser(user3);

String jsonString = JSON.toJSONString(group);
System.out.println(jsonString);
```

```json
{"id":9999,"name":"管理员","users":[{"age":32,"id":1000,"name":"亚索"},{"age":16,"id":1001,"name":"瑞雯"},{"age":12,"id":1002,"name":"劫"}]}
```

- 反序列化

```java
String json = "{\"id\":9999,\"name\":\"管理员\",\"users\":[{\"age\":16,\"id\":1001,\"name\":\"瑞雯\"},{\"age\":12,\"id\":1002,\"name\":\"劫\"}]}";
Group group = JSON.parseObject(json, Group.class);
System.out.println(group);
```

```
Group{id=9999, name='管理员', users=[User{id=1001, name='瑞雯', age=16}, User{id=1002, name='劫', age=12}]}
```

- User

```java
public class User {
    private Long id;
    private String name;
    private Integer age;

    public User(Long id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

- Group

```java
import java.util.ArrayList;
import java.util.List;

public class Group {

    private Long id;
    private String name;
    private List<User> users = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user) {
        users.add(user);
    }
    
    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", users=" + users +
                '}';
    }
}
```

### 3.2 日期格式的处理

fastjson处理日期的API很简单，例如：

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd a HH:mm:ss.SSS");

Date startDate = new Date(16603970266L);
System.out.println(sdf.format(startDate));

Date endDate = new Date(1660397310266L);
System.out.println(sdf.format(endDate));

Order order = new Order(startDate, endDate);

String s = JSON.toJSONStringWithDateFormat(order, "yyyy-MM-dd a HH:mm:ss.SSS");
System.out.println(s);
```

```json
1970-07-12 下午 12:12:50.266
2022-08-13 下午 21:28:30.266
{"endDate":"2022-08-13 下午 21:28:30.266","startDate":"1970-07-12 下午 12:12:50.266"}
```

反序列化能够自动识别如下日期格式：

- ISO-8601日期格式
- yyyy-MM-dd
- yyyy-MM-dd HH:mm:ss
- yyyy-MM-dd HH:mm:ss.SSS
- 毫秒数字
- 毫秒数字字符串
- .NET JSON日期格式
- new Date(198293238)

### 3.3 SerializerFeature 常见序列化特性

Fastjson 的序列化特性定义在枚举类 `com\alibaba\fastjson\serializer\SerializerFeature.java` 中，目前正好有 30 项。
可以通过设置多个特性到 FastjsonConfig 中全局使用，也可以在某个具体的 JSON.writeJSONString 时作为参数使用。

> 下面很多 feature 有些是针对类中的属性的，直接 Map 测试 put 进去有些看上去没起作用。

1. `QuoteFieldNames`： 输出 key 时使用双引号，默认开启

2. `UseSingleQuotes`：输出 key 时使用单引号

3. `WriteMapNullValue`：输出 Map 的 `null` 值，默认值为 `null` 值时该键值对不输出

4. `WriteEnumUsingToString`：枚举属性输出 `toString()` 的结果 

5. `WriteEnumUsingName`：枚举数据输出 name

6. `UseISO8601DateFormat`：使用 ISO-8601 日期格式

7. `WriteNullListAsEmpty`：`List` 为空则输出 `[]`

8. `WriteNullStringAsEmpty`：`String` 为空则输出 `“”`

9. `WriteNullNumberAsZero`：`Number` 类型为空则输出 `0`

10. `WriteNullBooleanAsFalse`：`Boolean` 类型为空则输出 `false`

11. `SkipTransientField`：忽略 `transient` 字段，默认即忽略

12. `SortField`：按字段名称排序后输出，默认为不开启

13. `WriteTabAsSpecial`：`Deprecated`

14. `PrettyFormat`,：格式化 JSON 缩进

15. `WriteClassName`：序列化时写入类型信息，默认为不开启，反序列化时需用到

16. `DisableCircularReferenceDetect`：消除对同一对象循环引用的问题，默认为不开启

17. `WriteSlashAsSpecial`：对斜杠 `/` 进行转义

18. `BrowserCompatible`：将中文都会序列化为 `\uXXXX` 格式，字节数会多一些，但是能兼容 IE 6，默认不开启

19. `WriteDateUseDateFormat`：全局修改日期格式，默认不开启

    > `JSON.DEFFAULT_DATE_FORMAT = “yyyy-MM-dd”;`
    >
    > `JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat);`

20. `NotWriteRootClassName`

21. `DisableCheckSpecialChar`

22. `BeanToArray`

23. `WriteNonStringKeyAsString`

24. `NotWriteDefaultValue`

25. `BrowserSecure`

26. `IgnoreNonFieldGetter`

27. `WriteNonStringValueAsString`

28. `IgnoreErrorGetter`

29. `WriteBigDecimalAsPlain`

30. `MapSortField`：转换 JSON 时，对属性进行排序

调用时使用：

```java
JSON.toJSONString(Object object, SerializerFeature... features)
```

### 3.4 JSONField 注解

#### 3.4.1 JSONField 介绍

> 注意：若属性是私有的，必须有 setter 方法。否则无法反序列化。

```java
package com.alibaba.fastjson.annotation;

public @interface JSONField {
    // 配置序列化和反序列化的顺序，1.1.42版本之后才支持
    int ordinal() default 0;

     // 指定字段的名称
    String name() default "";

    // 指定字段的格式，对日期格式有用
    String format() default "";

    // 是否序列化
    boolean serialize() default true;

    // 是否反序列化
    boolean deserialize() default true;
}
```

#### 3.4.2 JSONField 配置方式

##### 3.4.2.1 配置在 getter/setter 上

```java
 public class A {
      private int id;
 
      @JSONField(name="ID")
      public int getId() {return id;}
      @JSONField(name="ID")
      public void setId(int value) {this.id = id;}
 }
```

##### 3.4.2.2 配置在 field 上

```java
 public class A {
      @JSONField(name="ID")
      private int id;
 
      public int getId() {return id;}
      public void setId(int value) {this.id = id;}
 }
```

#### 3.4.3 使用 format 配置日期格式化

```java
 public class A {
      // 配置date序列化和反序列使用yyyyMMdd日期格式
      @JSONField(format="yyyyMMdd")
      public Date date;
 }
```

#### 3.4.4 使用 serialize/deserialize 指定字段不序列化

```java
 public class A {
      @JSONField(serialize=false)
      public Date date;
 }

 public class A {
      @JSONField(deserialize=false)
      public Date date;
 }
```

#### 3.4.5 使用 ordinal 指定字段的顺序

>  fastjson 序列化一个 java bean，是根据 fieldName 的字母序进行序列化的，你可以通过 ordinal 指定字段的顺序。这个特性需要 1.1.42 以上版本。

```java
public static class VO {
    @JSONField(ordinal = 3)
    private int f0;

    @JSONField(ordinal = 2)
    private int f1;

    @JSONField(ordinal = 1)
    private int f2;
}
```

### 3.5 SerializeFilter 定制序列化

通过 `SerializeFilter` 可以使用扩展编程的方式实现定制序列化。fastjson 提供了多种 `SerializeFilter`：

- `PropertyPreFilter` 根据 PropertyName 判断是否序列化
- `PropertyFilter` 根据 PropertyName 和 PropertyValue 来判断是否序列化
- `NameFilter` 修改 Key，如果需要修改 Key，process 返回值则可
- `ValueFilter` 修改 Value
- `BeforeFilter` 序列化时在最前添加内容
- `AfterFilter` 序列化时在最后添加内容

以上的 `SerializeFilter` 在 `JSON.toJSONString()` 中可以使用。

```java
  SerializeFilter filter = ...; // 可以是上面5个SerializeFilter的任意一种。
  JSON.toJSONString(obj, filter);
```

#### 3.5.1 PropertyFilter

```java
public interface PropertyFilter extends Filter {
    boolean applyObject object, String propertyName, Object propertyValue);
}
```

可以通过扩展实现根据 object 或者属性名称或者属性值进行判断是否需要序列化。例如：

```java
PropertyFilter filter = (Object source, String name, Object value) -> {
    if ("id".equals(name)) {
        int id = ((Integer) value).intValue();
        return id >= 100;
    }
    return false;
};

JSON.toJSONString(obj, filter); // 序列化的时候传入filter
```

#### 3.5.2 PropertyPreFilter

和 `PropertyFilter` 不同，只根据 object 和 name 进行判断，在调用 getter 之前，这样避免了 getter 调用可能存在的异常。

```java
public interface PropertyPreFilter extends Filter {
    boolean process(JSONWriter writer, Object source, String name);
}
```

#### 3.5.3 NameFilter

如果需要修改 Key，process 返回修改的值则可

```java
public interface NameFilter extends Filter {
    String process(Object object, String propertyName, Object propertyValue);
}
```

fastjson 内置一个 `PascalNameFilter`，用于输出将首字符大写的 Pascal 风格。 例如：

```java
import com.alibaba.fastjson.serializer.PascalNameFilter;

Object obj = ...;
String jsonStr = JSON.toJSONString(obj, new PascalNameFilter());
```

#### 3.5.4 ValueFilter

```java
public interface ValueFilter extends Filter {
    Object process(Object object, String propertyName, Object propertyValue);
}
```

#### 3.5.5 BeforeFilter

> 在序列化对象的所有属性之前执行某些操作，例如调用 `writeKeyValue` 添加内容

```java
public abstract class BeforeFilter implements SerializeFilter {
    protected final void writeKeyValue(String key, Object value) { ... }
    // 需要实现的抽象方法，在实现中调用writeKeyValue添加内容
    public abstract void writeBefore(Object object);
}
```

例如：

```java
User user1 = new User(1001L, "瑞雯", 16);
User user2 = new User(1002L, "劫", 12);

Group group = new Group();
group.setId(9999L);
group.setName("管理员");
group.addUser(user1);
group.addUser(user2);

BeforeFilter beforeFilter = new BeforeFilter() {
    @Override
    public void writeBefore(Object object) {
        writeKeyValue("key", "芝麻开门");
    }
};

String s = JSON.toJSONString(group, beforeFilter);
System.out.println(s);
```

输出：

```json
{"key":"芝麻开门","id":9999,"name":"管理员","users":[{"key":"芝麻开门","age":16,"id":1001,"name":"瑞雯"},{"key":"芝麻开门","age":12,"id":1002,"name":"劫"}]}
```

#### 3.5.6 AfterFilter

> 在序列化对象的所有属性之后执行某些操作，例如调用 `writeKeyValue` 添加内容

```java
public abstract class AfterFilter implements SerializeFilter {
    protected final void writeKeyValue(String key, Object value) { ... }
    // 需要实现的抽象方法，在实现中调用writeKeyValue添加内容
    public abstract void writeAfter(Object object);
}
```

例如：

```java
User user1 = new User(1001L, "瑞雯", 16);
User user2 = new User(1002L, "劫", 12);

Group group = new Group();
group.setId(9999L);
group.setName("管理员");
group.addUser(user1);
group.addUser(user2);

AfterFilter afterFilter = new AfterFilter() {
    @Override
    public void writeAfter(Object object) {
        writeKeyValue("key", "游戏结束");
    }
};

String s = JSON.toJSONString(group, afterFilter);
System.out.println(s);
```

输出：

```json
{"id":9999,"name":"管理员","users":[{"age":16,"id":1001,"name":"瑞雯","key":"游戏结束"},{"age":12,"id":1002,"name":"劫","key":"游戏结束"}],"key":"游戏结束"}
```

