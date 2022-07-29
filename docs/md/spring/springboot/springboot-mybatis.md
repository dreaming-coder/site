# SpringBoot 集成 - MyBatis

> 本文代码见 [**ice-springboot-mybatis**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/ice-springboot-mybatis)。

## 1. 数据源的自动配置

### 1.1 导入 JDBC 场景

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```

### 1.2 分析自动配置类

- `DataSourceAutoConfiguration`：数据源的自动配置
  - 修改数据源相关的配置：`spring.datasource`
  - **数据库连接池的配置，是自己容器中没有 DataSource 才自动配置的**
  - 底层配置好的连接池是：**HikariDataSource**
- `DataSourceTransactionManagerAutoConfiguration`：事务管理器的自动配置
- `JdbcTemplateAutoConfiguration`：**JdbcTemplate** 的自动配置，可以对数据库进行 CRUD
  - 可以修改配置项 `spring.jdbc` 来修改 **JdbcTemplate**
- `JndiDataSourceAutoConfiguration`：jndi 的自动配置
- `XADataSourceAutoConfiguration`：分布式事务相关的

### 1.3 修改配置项

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jdbc
    username: root
    password: root
    type: com.zaxxer.hikari.HikariDataSource     # 默认就是这个数据源
    driver-class-name: com.mysql.cj.jdbc.Driver  # 驱动
  jdbc:
    template:
      query-timeout: 3                           # 单位：秒
```

### 1.4 测试

```java
@SpringBootTest
class IceSpringbootMybatisApplicationTests {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {
        Long aLong = jdbcTemplate.queryForObject("select count(*) from user", Long.class);
        System.out.println(aLong);
    }

}
```

## 2. 集成 MyBatis

引入 POM 依赖：

```xml
<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.2.2</version>
</dependency>
```

- 全局配置文件

- `SqlSessionFactory`: 自动配置好了

- `SqlSession`：自动配置了 `SqlSessionTemplate` 组合了 `SqlSession`

- `@Import(AutoConfiguredMapperScannerRegistrar.class)`

- Mapper： 只要我们写的操作 MyBatis 的接口标注了 `@Mapper` 就会被自动扫描进

```java
@EnableConfigurationProperties(MybatisProperties.class) // MyBatis 配置项绑定类
@AutoConfigureAfter({ DataSourceAutoConfiguration.class, MybatisLanguageDriverAutoConfiguration.class })
public class MybatisAutoConfiguration{}
```

```java
@ConfigurationProperties(prefix = "mybatis")
public class MybatisProperties{}
```

【MyBatis 配置】

```yaml
# 配置mybatis规则
mybatis:
  config-location: classpath:mybatis/mybatis-config.xml  # 全局配置文件位置
  mapper-locations: classpath:mybatis/mapper/*.xml       # sql映射文件位置
```

【UserMapper.xml】

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.icespringbootmybatis.mapper.UserMapper">
    <select id="getUsers" resultType="com.example.icespringbootmybatis.entity.User">
        select * from  user
    </select>
</mapper>
```

我们也可以不写全局配置文件，直接在用 SpringBoot 配置文件中配置

```java
@ConfigurationProperties(prefix = MybatisProperties.MYBATIS_PREFIX)
public class MybatisProperties {
    public static final String MYBATIS_PREFIX = "mybatis";
    // ...
    @NestedConfigurationProperty
    private Configuration configuration;
    // ....
}
```

可以看到，MyBatis 的配置都在 `mybatis.configuration.xxx`，可以直接去 `org.apache.ibatis.session.Configuration.java` 中寻找属性名，在配置文件里设置覆盖。

```yaml
# 配置mybatis规则
mybatis:
  # 此时就不需要编写全局配置文件，也就不用配置 config-location: classpath:mybatis/mybatis-config.xml
  mapper-locations: classpath:mybatis/mapper/*.xml
  configuration:
    map-underscore-to-camel-case: true
```

测试：

```java
@SpringBootTest
class IceSpringbootMybatisApplicationTests {
    
    @Autowired
    SqlSession session;

    @Test
    void testMyBatis(){
        UserMapper mapper = session.getMapper(UserMapper.class);
        mapper.getUsers().forEach(System.out::println);
    }
}
```

