# MyBatis - 入门
## 1. 什么是 Mybatis

- MyBatis 是一款优秀的持久层框架
- 它支持自定义 SQL、存储过程以及高级映射
- MyBatis 免除了几乎所有的 JDBC 代码以及设置参数和获取结果集的工作
- MyBatis 可以通过简单的 XML 或注解来配置和映射原始类型、接口和 Java POJO（Plain Old Java Objects，普通老式 Java 对象）为数据库中的记录

## 2. 第一个 Mybatis 程序

### 2.0 Maven 依赖配置

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.29</version>
</dependency>
<dependency>
    <groupId>org.mybatis</groupId>
    <artifactId>mybatis</artifactId>
    <version>3.5.10</version>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.8.2</version>
    <scope>test</scope>
</dependency>
```

### 2.1 编写实体类

```java
public class User {
    private String id;
    private String name;
    private int age;

    public User() {
    }

    public User(String id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 2.2 编写 DAO 接口

```java
public interface UserMapper {
    List<User> getUserList();
}
```

### 2.3 编写 UserMapper.xml 文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- 绑定一个对应的DAO接口-->
<mapper namespace="com.ice.dao.UserMapper">
    <select id="getUserList" resultType="com.ice.entity.User">
        select * from user
    </select>
</mapper>
```

### 2.4 编写 Mybatis 配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
     <!-- 每一个XXXMapper.xml都与需要在核心配置文件中注册！！-->
    <mappers>
        <mapper resource="com/ice/dao/mappers/UserMapper.xml"/>
    </mappers>
</configuration>
```

### 2.5 编写 Mybatis 工具类

```java
// SqlSessionFactory--->SqlSession
public class MybatisUtil {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            // 获取 SqlSessionFactory 对象
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // 既然有了 SqlSessionFactory，顾名思义没我们就可以获得 SqlSession 对象了
    // SqlSession 包含了面向数据库执行SQL命令所需的所有方法
    public static SqlSession getSqlSession() {
        return sqlSessionFactory.openSession();
    }
}
```

### 2.6 添加文件过滤

```xml
<!--在父工程或者每个子模块的pom.xml配置文件中添加以下配置 。-->
<build>
    <!--说明，在进行模块化开发打jar包时，maven会将非java文件过滤掉，
        xml,properties配置文件等，但是这些文件又是必需的，
        使用此配置可以在打包时将不会过滤这些必需的配置文件。
     -->
    <resources>
        <resource>
            <directory>src/main/java</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.xml</include>
            </includes>
            <filtering>false</filtering>
        </resource>
    </resources>
</build>
```

> 这个必须有，否则 XXXMapper.xml 就无法识别了。

### 2.7 测试

```java
@Test
public void test() {
    try (SqlSession sqlSession = MybatisUtil.getSqlSession()) {
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        List<User> userList = mapper.getUserList();
        userList.forEach(System.out::println);
    }
}
```

输出结果：

```
User{id='10000000000', name='ice', age=18}
User{id='10000000001', name='亚索', age=38}
User{id='10000000002', name='瑞雯', age=14}
User{id='10000000003', name='劫', age=25}
User{id='10000000004', name='艾瑞莉娅', age=28}
User{id='10000000005', name='菲奥娜', age=16}
User{id='10000000006', name='易', age=24}
```

## 3. 对命名空间的一点补充<Badge type="tip" text="提示" vertical="top" />

在之前版本的 MyBatis 中，**命名空间**（Namespaces）的作用并不大，是可选的。 但现在，随着命名空间越发重要，你必须指定命名空间。

命名空间的作用有两个，一个是利用更长的全限定名来将不同的语句隔离开来，同时也实现了你上面见到的接口绑定。就算你觉得暂时用不到接口绑定，你也应该遵循这里的规定，以防哪天你改变了主意。 长远来看，只要将命名空间置于合适的 Java 包命名空间之中，你的代码会变得更加整洁，也有利于你更方便地使用 MyBatis。

**命名解析**：为了减少输入量，MyBatis 对所有具有名称的配置元素（包括语句，结果映射，缓存等）使用了如下的命名解析规则。

- 全限定名（比如 “com.mypackage.MyMapper.selectAllThings）将被直接用于查找及使用。
- 短名称（比如 “selectAllThings”）如果全局唯一也可以作为一个单独的引用。 如果不唯一，有两个或两个以上的相同名称（比如 “com.foo.selectAllThings” 和 “com.bar.selectAllThings”），那么使用时就会产生“短名称不唯一”的错误，这种情况下就必须使用全限定名。

## 4. 核心类

- **SqlSessionFactoryBuilder**

  这个类可以被实例化、使用和丢弃，**一旦创建了 `SqlSessionFactory`，就不再需要它了**。 因此 `SqlSessionFactoryBuilder` 实例的最佳作用域是方法作用域（也就是局部方法变量）。 你可以重用 `SqlSessionFactoryBuilder` 来创建多个 `SqlSessionFactory` 实例，但最好还是不要一直保留着它，以保证所有的 XML 解析资源可以被释放给更重要的事情。

- **SqlSessionFactory**

  **`SqlSessionFactory` 一旦被创建就应该在应用的运行期间一直存在，没有任何理由丢弃它或重新创建另一个实例**。 使用 `SqlSessionFactory` 的最佳实践是在应用运行期间不要重复创建多次，多次重建 `SqlSessionFactory` 被视为一种代码“坏习惯”。因此 `SqlSessionFactory` 的最佳作用域是应用作用域。 有很多方法可以做到，**最简单的就是使用单例模式或者静态单例模式**。

- **SqlSession**

  每个线程都应该有它自己的 `SqlSession` 实例。**`SqlSession` 的实例不是线程安全的，因此是不能被共享的，所以它的最佳的作用域是请求或方法作用域**。 绝对不能将 `SqlSession` 实例的引用放在一个类的静态域，甚至一个类的实例变量也不行。 也绝不能将 `SqlSession` 实例的引用放在任何类型的托管作用域中，比如 Servlet 框架中的 `HttpSession`。 如果你现在正在使用一种 Web 框架，考虑将 `SqlSession` 放在一个和 HTTP 请求相似的作用域中。 **换句话说，每次收到 HTTP 请求，就可以打开一个 `SqlSession`，返回一个响应后，就关闭它**。 这个关闭操作很重要，为了确保每次都能执行关闭操作，你应该把这个关闭操作放到 `finally` 块中。 下面的示例就是一个确保 SqlSession 关闭的标准模式：

  ```java
  try (SqlSession session = sqlSessionFactory.openSession()) {
    // 你的应用逻辑代码
  }
  ```











