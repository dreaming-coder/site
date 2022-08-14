# Java 工具 - Jackson

[[TOC]]

## 1. 简介

Jackson 是用来序列化和反序列化 JSON 的 Java 的开源框架。Spring MVC 的默认 JSON 解析器便是 Jackson。与其他 Java 的 JSON 的框架 Gson 等相比， Jackson 解析大的 JSON 文件速度比较快；Jackson 运行时占用内存比较低，性能比较好；Jackson 有灵活的 API，可以很容易进行扩展和定制。

Jackson 的 1.x 版本的包名是 org.codehaus.jackson ，当升级到 2.x 版本时，包名变为 com.fasterxml.jackson，本文讨论的内容是基于最新的 Jackson 的 2.13.3 版本。

Jackson 的核心模块由三部分组成。

- jackson-core，核心包，提供基于"流模式"解析的相关 API，它包括 JsonPaser 和 JsonGenerator。Jackson 内部实现正是通过高性能的流模式 API 的 JsonGenerator 和 JsonParser 来生成和解析 json。
- jackson-annotations，注解包，提供标准注解功能；
- jackson-databind ，数据绑定包， 提供基于"对象绑定" 解析的相关 API （ ObjectMapper ） 和"树模型" 解析的相关 API （JsonNode）；基于"对象绑定" 解析的 API 和"树模型"解析的 API 依赖基于"流模式"解析的 API。

## 2. 引入依赖

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind -->
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.13.3</version>
</dependency>
```

> `jackson-databind` 依赖 `jackson-core` 和 `jackson-annotations`，当添加 `jackson-databind` 之后， `jackson-core` 和 `jackson-annotations` 也随之添加到 Java 项目工程中。在添加相关依赖包之后，就可以使用 Jackson。

## 3. 快速入门

Jackson 最常用的 API 就是基于"对象绑定" 的 ObjectMapper。下面是一个 ObjectMapper 的使用的简单示例。

准备一个名称为 Person 的 Java 对象：

```java
public class Person {
    // 正常case
    private String name;
    // 空对象case
    private Integer age;
    // 日期转换case
    private Date date;
    // 默认值case
    private int height;
}
```

使用示例：

```java
ObjectMapper mapper = new ObjectMapper();
// 造数据
Person person = new Person();
person.setName("Tom");
person.setAge(40);
person.setDate(new Date());
System.out.println("序列化：");
String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(person);
System.out.println(jsonString);
System.out.println("反序列化：");
Person deserializedPerson = mapper.readValue(jsonString, Person.class);
System.out.println(deserializedPerson);
```

打印输出：

```json
序列化：
{
  "name" : "Tom",
  "age" : 40,
  "date" : 1660476787313,
  "height" : 0
}
反序列化：
Person{name='Tom', age=40, date=Sun Aug 14 19:33:07 CST 2022, height=0}
```

ObjectMapper 通过 writeValue 系列方法将 Java 对象序列化为 JSON，并将 JSON 存储成不同的格式，String（writeValueAsString），Byte Array（writeValueAsString），Writer， File，OutStream 和 DataOutput。

ObjectMapper 通过 readValue 系列方法从不同的数据源像 String ， Byte Array， Reader，File，URL， InputStream 将 JSON 反序列化为 Java 对象。

## 4. 统一配置

在调用 writeValue 或调用 readValue 方法之前，往往需要设置 ObjectMapper 的相关配置信息。这些配置信息应用 java 对象的所有属性上。示例如下：

```java
//在反序列化时忽略在 json 中存在但 Java 对象不存在的属性
mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
//在序列化时日期格式默认为 yyyy-MM-dd'T'HH:mm:ss.SSSZ
mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
//在序列化时自定义时间日期格式
mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
//在序列化时忽略值为 null 的属性
mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
//在序列化时忽略值为默认值的属性
mapper.setDefaultPropertyInclusion(JsonInclude.Include.NON_DEFAULT);
```

> 更多配置信息可以查看 Jackson 的 `DeserializationFeature`，`SerializationFeature` 和 `Include`。

```java
ObjectMapper mapper = new ObjectMapper();
mapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
mapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd a HH:mm:ss"));
// 造数据
Person person = new Person();
person.setName("Tom");
person.setAge(40);
person.setDate(new Date());
String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(person);

System.out.println(jsonString);
```

输出结果：

```json
{
  "name" : "Tom",
  "age" : 40,
  "date" : "2022-08-14 下午 19:43:14",
  "height" : 0
}
```

## 5. 使用注解

Jackson 根据它的默认方式序列化和反序列化 java 对象，若根据实际需要，灵活的调整它的默认方式，可以使用 Jackson 的注解。常用的注解及用法如下。
<Jackson-Annotation></Jackson-Annotation>

使用示例：

```java
ObjectMapper mapper = new ObjectMapper();
// 造数据
Map<String, Object> map = new HashMap<>();
map.put("user_name", "Tom");
map.put("date", "2020-07-26 19:28:44");
map.put("age", 100);
map.put("demoKey", "demoValue");
String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map);
System.out.println(jsonString);
System.out.println("======反序列化======");
User user = mapper.readValue(jsonString, User.class);
System.out.println(user);
System.out.println("======序列化======");
jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
System.out.println(jsonString);
```

输出结果：

```json
{
  "date" : "2020-07-26 19:28:44",
  "demoKey" : "demoValue",
  "user_name" : "Tom",
  "age" : 100
}
======反序列化======
@JsonCreator 注解使得反序列化自动执行该构造方法 Tom
User(other={demoKey=demoValue}, userName=Tom, age=100, date=Sun Jul 26 19:28:44 CST 2020, height=0)
======序列化======
{
  "date" : "2020-07-26 19:28:44",
  "user_name" : "Tom",
  "age" : 100,
  "height" : 0,
  "demoKey" : "demoValue"
}
```

其中 User 类：

```java
// 用于类,指定属性在序列化时 json 中的顺序
@JsonPropertyOrder({"date", "user_name"})
// 批量忽略属性，不进行序列化
@JsonIgnoreProperties(value = {"other"})
// 用于序列化与反序列化时的驼峰命名与小写字母命名转换
@Data
public class User {
    @JsonIgnore
    private Map<String, Object> other = new HashMap<>();

    // 正常case
    @JsonProperty("user_name")
    private String userName;
    // 空对象case
    private Integer age;
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    // 日期转换case
    private Date date;
    // 默认值case
    private int height;

    public User() {
    }

    // 反序列化执行构造方法
    @JsonCreator
    public User(@JsonProperty("user_name") String userName) {
        System.out.println("@JsonCreator 注解使得反序列化自动执行该构造方法 " + userName);
        // 反序列化需要手动赋值
        this.userName = userName;
    }

    @JsonAnySetter
    public void set(String key, Object value) {
        other.put(key, value);
    }

    @JsonAnyGetter
    public Map<String, Object> any() {
        return other;
    }
    // 本文默认省略getter、setter方法
}
```

## 6. 日期处理

### 6.1 普通日期

对于日期类型为 `java.util.Calendar`, `java.util.GregorianCalendar`, `java.sql.Date`, `java.util.Date`, `java.sql.Timestamp`，若不指定格式，在 json 文件中将序列化为 `long` 类型的数据。显然这种默认格式，可读性差，转换格式是必要的。

JackSon 有很多方式转换日期格式。

- 注解方式，使用 `@JsonFormat` 注解指定日期格式。
- ObjectMapper 方式，调用 ObjectMapper 的方法 `setDateFormat`，将序列化为指定格式的 String 类型的数据。

### 6.2 Local 日期

对于日期类型为 java.time.LocalDate, java.time.LocalDateTime，还需要添加代码 `mapper.registerModule(new JavaTimeModule())`，同时添加相应的依赖 jar 包。

```xml
<!-- https://mvnrepository.com/artifact/com.fasterxml.jackson.datatype/jackson-datatype-jsr310 -->
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.13.3</version>
</dependency>
```

对于 Jackson 2.5 以下版本，需要添加代码 `mapper.registerModule(new JSR310Module ())`。

使用示例：

```java
@Data
public class Student {
    // 正常case
    private String name;
    // 日期转换case
    private LocalDateTime date;
}
```

```java
public class Demo04 {
    public static void main(String[] args) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        // 必须添加对LocalDate的支持
        mapper.registerModule(JavaTimeModule());
        // 造数据
        Student student = new Student();
        student.setName("Tom");
        student.setDate(LocalDateTime.now());
        System.out.println("序列化");
        String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(student);
        System.out.println(jsonString);
        System.out.println("反序列化");
        Student deserializedPerson = mapper.readValue(jsonString, Student.class);
        System.out.println(deserializedPerson);
    }


    private static Module JavaTimeModule() {
        JavaTimeModule module = new JavaTimeModule();
        String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
        String DATE_FORMAT = "yyyy-MM-dd";
        String TIME_FORMAT = "HH:mm:ss";
        module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT)));
        module.addSerializer(LocalDate.class, new LocalDateSerializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
        module.addSerializer(LocalTime.class, new LocalTimeSerializer(DateTimeFormatter.ofPattern((TIME_FORMAT))));
        module.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT)));
        module.addDeserializer(LocalDate.class, new LocalDateDeserializer(DateTimeFormatter.ofPattern(DATE_FORMAT)));
        module.addDeserializer(LocalTime.class, new LocalTimeDeserializer(DateTimeFormatter.ofPattern(TIME_FORMAT)));
        return module;

    }
}
```

打印输出：

```json
序列化
{
  "name" : "Tom",
  "date" : "2022-08-14 20:06:45"
}
反序列化
Student(name=Tom, date=2022-08-14T20:06:45)
```

## 7. 对象集合

### 7.1 List

对于 List 类型 ，可以调用 `constructCollectionType` 方法来序列化，也可以构造 `TypeReference` 来序列化。

```java
public static void main(String[] args) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    CollectionType javaType = mapper.getTypeFactory().constructCollectionType(List.class, Person.class);
    // 造数据
    List<Person> list = new ArrayList<>();
    for (int i = 0; i < 3; i++) {
        Person person = new Person();
        person.setName("Tom");
        person.setAge(new Random().nextInt(100));
        person.setDate(new Date());
        list.add(person);
    }
    System.out.println("序列化");
    String jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(list);
    System.out.println(jsonInString);
    System.out.println("反序列化：使用 javaType");
    List<Person> personList = mapper.readValue(jsonInString, javaType);
    System.out.println(personList);
    System.out.println("反序列化：使用 TypeReference");
    List<Person> personList2 = mapper.readValue(jsonInString, new TypeReference<List<Person>>() {
    });
    System.out.println(personList2);
}
```

打印输出：

```json
序列化
[ {
  "name" : "Tom",
  "age" : 16,
  "date" : 1660479012385,
  "height" : 0
}, {
  "name" : "Tom",
  "age" : 64,
  "date" : 1660479012385,
  "height" : 0
}, {
  "name" : "Tom",
  "age" : 57,
  "date" : 1660479012385,
  "height" : 0
} ]
反序列化：使用 javaType
[com.ice.jackson.entity.Person@5abca1e0, com.ice.jackson.entity.Person@2286778, com.ice.jackson.entity.Person@4e9ba398]
反序列化：使用 TypeReference
[com.ice.jackson.entity.Person@6d7b4f4c, com.ice.jackson.entity.Person@527740a2, com.ice.jackson.entity.Person@13a5fe33]
```

### 7.2 Map

```java
public static void main(String[] args) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    //第二参数是 map 的 key 的类型，第三参数是 map 的 value 的类型
    MapType javaType = mapper.getTypeFactory().constructMapType(HashMap.class, String.class, Person.class);
    // 造数据
    Map<String, Person> map = new HashMap<>();
    for (int i = 0; i < 3; i++) {
        Person person = new Person();
        person.setName("Tom");
        person.setAge(new Random().nextInt(100));
        person.setDate(new Date());
        map.put("key" + i, person);
    }
    System.out.println("序列化");
    String jsonInString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map);
    System.out.println(jsonInString);
    System.out.println("反序列化: 使用 javaType");
    Map<String, Person> personMap = mapper.readValue(jsonInString, javaType);
    System.out.println(personMap);
    System.out.println("反序列化: 使用 TypeReference");
    Map<String, Person> personMap2 = mapper.readValue(jsonInString, new TypeReference<Map<String, Person>>() {
    });
    System.out.println(personMap2);
}
```

输出结果：

```json
序列化
{
  "key1" : {
    "name" : "Tom",
    "age" : 62,
    "date" : 1660479249146,
    "height" : 0
  },
  "key2" : {
    "name" : "Tom",
    "age" : 12,
    "date" : 1660479249146,
    "height" : 0
  },
  "key0" : {
    "name" : "Tom",
    "age" : 32,
    "date" : 1660479249146,
    "height" : 0
  }
}
反序列化: 使用 javaType
{key1=com.ice.jackson.entity.Person@57536d79, key2=com.ice.jackson.entity.Person@3b0143d3, key0=com.ice.jackson.entity.Person@5a8e6209}
反序列化: 使用 TypeReference
{key1=com.ice.jackson.entity.Person@1f28c152, key2=com.ice.jackson.entity.Person@7d907bac, key0=com.ice.jackson.entity.Person@7791a895}
```

## 8. 属性可视化

JackSon 默认不是所有的属性都可以被序列化和反序列化。默认的属性可视化的规则如下：

- 若该属性修饰符是 public，该属性可序列化和反序列化。
- 若属性的修饰符不是 public，但是它的 getter 方法和 setter 方法是 public，该属性可序列化和反序列化。因为 getter 方法用于序列化， 而 setter 方法用于反序列化。
- 若属性只有 public 的 setter 方法，而无 public 的 getter 方 法，该属性只能用于反序列化。

若想更改默认的属性可视化的规则，需要调用 ObjectMapper 的方法 `setVisibility`。

下面的示例使修饰符为 protected 的属性 name 也可以序列化和反序列化。

```java
public static class People {
    public int age;
    protected String name;
}
 
@Test
public void test() throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    // PropertyAccessor 支持的类型有 ALL,CREATOR,FIELD,GETTER,IS_GETTER,NONE,SETTER
    // Visibility 支持的类型有 ANY,DEFAULT,NON_PRIVATE,NONE,PROTECTED_AND_PUBLIC,PUBLIC_ONLY
    mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    // 造数据
    People people = new People();
    people.name = "Tom";
    people.age = 40;
    System.out.println("序列化");
    String jsonString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(people);
    System.out.println(jsonString);
    System.out.println("反序列化");
    People deserializedPerson = mapper.readValue(jsonString, People.class);
    System.out.println(deserializedPerson);
}
```

打印输出：

```json
序列化
{
  "age" : 40,
  "name" : "Tom"
}
反序列化
JackSonTest.People(age=40, name=Tom)
```

## 9. 属性过滤

在将 Java 对象序列化为 json 时 ，有些属性需要过滤掉，不显示在 json 中 ，除了使用 `@JsonIgnore` 过滤单个属性或用 `@JsonIgnoreProperties` 过滤多个属性之外， Jackson 还有通过代码控制的方式。

```java
@JsonFilter("myFilter")
public interface MyFilter {
}
```

```java
public static void main(String[] args) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    //设置 addMixIn
    mapper.addMixIn(Person.class, MyFilter.class);
    //调用 SimpleBeanPropertyFilter 的 serializeAllExcept 方法排除不想序列化的属性
    SimpleBeanPropertyFilter newFilter = SimpleBeanPropertyFilter.serializeAllExcept("age");
    //调用 SimpleBeanPropertyFilter 的 filterOutAllExcept 方法选择想要序列化的属性
    SimpleBeanPropertyFilter newFilter1 = SimpleBeanPropertyFilter.filterOutAllExcept("age");
    //或重写 SimpleBeanPropertyFilter 的 serializeAsField 方法
    SimpleBeanPropertyFilter newFilter2 = new SimpleBeanPropertyFilter() {
        @Override
        public void serializeAsField(Object pojo, JsonGenerator jgen,
                                     SerializerProvider provider, PropertyWriter writer)
            throws Exception {
            if (!writer.getName().equals("age")) {
                writer.serializeAsField(pojo, jgen, provider);
            }
        }
    };
    //设置 FilterProvider
    FilterProvider filterProvider = new SimpleFilterProvider().addFilter("myFilter", newFilter);
    // 造数据
    Person person = new Person();
    person.setName("Tom");
    person.setAge(40); // 该属性将被忽略
    person.setDate(new Date());
    // 序列化
    String jsonString = mapper.setFilterProvider(filterProvider).writeValueAsString(person);
    System.out.println(jsonString);
}
```

输出结果：

```json
{"name":"Tom","date":1660479588730,"height":0}
```

## 10. 树模型处理

Jackson 也提供了树模型(tree model)来生成和解析 json。若想修改或访问 json 部分属性，树模型是不错的选择。树模型由 JsonNode 节点组成。程序中常常使用 ObjectNode，ObjectNode 继承于 JsonNode，示例如下：

```java
public static void main(String[] args) throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    //构建 ObjectNode
    ObjectNode personNode = mapper.createObjectNode();
    //添加/更改属性
    personNode.put("name", "Tom");
    personNode.put("age", 40);
    ObjectNode addressNode = mapper.createObjectNode();
    addressNode.put("zip", "000000");
    addressNode.put("street", "Road NanJing");
    //设置子节点
    personNode.set("address", addressNode);
    System.out.println("构建 ObjectNode:\n" + personNode);
    //通过 path 查找节点
    JsonNode searchNode = personNode.path("name");
    System.out.println("查找子节点 name:\n" + searchNode.asText());
    //删除属性
    personNode.remove("address");
    System.out.println("删除后的 ObjectNode:\n" + personNode);
    //读取 json
    JsonNode rootNode = mapper.readTree(personNode.toString());
    System.out.println("Json 转 JsonNode:\n" + rootNode);
    //JsonNode 转换成 java 对象
    Person person = mapper.treeToValue(personNode, Person.class);
    System.out.println("JsonNode 转对象:\n" + person);
    //java 对象转换成 JsonNode
    JsonNode node = mapper.valueToTree(person);
    System.out.println("对象转 JsonNode:\n" + node);
}
```

输出结果：

```json
构建 ObjectNode:
{"name":"Tom","age":40,"address":{"zip":"000000","street":"Road NanJing"}}
查找子节点 name:
Tom
删除后的 ObjectNode:
{"name":"Tom","age":40}
Json 转 JsonNode:
{"name":"Tom","age":40}
JsonNode 转对象:
com.ice.jackson.entity.Person@5bcab519
对象转 JsonNode:
{"name":"Tom","age":40,"date":null,"height":0}
```

