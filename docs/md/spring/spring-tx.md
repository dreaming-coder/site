# Spring 基础 - 事务管理

> 本部分代码见 [**spring-framework-demo-tx**](https://github.com/dreaming-coder/ice-spring-demos/tree/main/spring-framework-demo-tx)。

## 1. Spring 实现事务管理的两种方式

### 1.1 编程式事务

将事务管理代码嵌入到业务方法中来控制事务的提交和回滚，在编程式管理事务中，必须在每个事务操作中包含额外的事务管理代码。

### 1.2 声明式事务管理<Badge type="tip" text="推荐" vertical="top" />

大多数情况下比编程式事务管理更好用，它将事务管理代码从业务方法中分离出来，以声明的方式来实现事务管理，Spring 声明式事务管理建立在 AOP 基础之上，是一个典型的横切关注点，通过环绕增强来实现，其原理是对方法前后进行拦截，然后在目标方法开始之前创建或加入一个事务，在执行完毕之后根据执行情况提交或回滚事务，其模型如下：

```java
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
	try {
		//开启事务
		return joinPoint.proceed();
		//提交事务
	} catch (Throwable e) {
		//回滚事务
		throw e;
	}finally {
		//释放资源
	}
}
```

## 2. 实现声明式事务配置的步骤

### 2.1 添加 jar 包

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
    <version>5.3.22</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.3.22</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
    <version>5.3.22</version>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.29</version>
</dependency>
```

### 2.2 Spring 配置

#### 2.2.1 XML 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                           http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd
                           http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--  自动扫描包  -->
    <context:component-scan base-package="com.ice"/>

    <!--  自动为spring容器中那些配置@aspectJ切面的bean创建代理，织入切面 -->
    <!--  proxy-target-class为true表示cglib，false表示JDK动态代理  -->
    <aop:aspectj-autoproxy proxy-target-class="true"/>

    <!-- 配置数据源 -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://localhost:3306/mybatis?serverTimezone=GMT%2B8&amp;useSSL=true&amp;useUnicode=true&amp;characterEncoding=UTF-8"/>
        <property name="username" value="root"/>
        <property name="password" value="123456"/>
    </bean>

    <bean class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 配置事务管理器 -->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 启用事务注解 -->
    <tx:annotation-driven transaction-manager="transactionManager"/>

</beans>
```

#### 2.2.2 Java Config 配置

```java
@ComponentScan("com.ice")
@Configuration
@EnableTransactionManagement
public class TXConfig {

    @Bean
    public DriverManagerDataSource dataSource(){
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/mybatis?serverTimezone=GMT%2B8&useSSL=true&useUnicode=true&characterEncoding=UTF-8");
        dataSource.setUsername("root");
        dataSource.setPassword("123456");
        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(){
        return new JdbcTemplate(dataSource());
    }

    @Bean
    public DataSourceTransactionManager getDataSourceTransactionManager(){
        DataSourceTransactionManager dataSourceTransactionManager = new DataSourceTransactionManager(dataSource());
        return dataSourceTransactionManager;
    }
}
```

### 2.3 添加事务注解——@Transactional

```java
@Service
public class UserService {
    private UserDao userDao;

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public void showUsers(){
        userDao.selectAll().forEach(System.out::println);
    }

    @Transactional
    public void addUser(User user){
        userDao.addUser(user);
    }
}
```

> 不能在 `protected`、默认或者 `private` 的方法上使用 `@Transactional` 注解，否则无效。

> 在代码中，如果取消注释主动抛出除数为零的异常，则插入数据的操作不会成功。

## 3. @Transactional 注解属性

### 3.1 rollbackFor 和 rollbackForClassName

指定对哪些异常回滚事务。默认情况下，如果在事务中抛出了运行时异常（继承自 `RuntimeException` 异常类），则回滚事务；**如果没有抛出任何异常，或者抛出了检查时异常，则依然提交事**务。这种处理方式是大多数开发者希望的处理方式，也是 EJB 中的默认处理方式；但**可以根据需要人为控制事务在抛出某些运行时异常时仍然提交事务，或者在抛出某些检查时异常时回滚事**务。

```java
@Transactional(rollbackFor = NullPointerException.class)
@Transactional(rollbackFor = {ArithmeticException.class,NullPointerException.class})
@Transactional(rollbackForClassName = "java.lang.ArithmeticException")
```

### 3.2 noRollbackFor 和 noRollbackForClassName

与上面刚好相反

```java
@Transactional(noRollbackFor = NullPointerException.class)
@Transactional(noRollbackFor = {ArithmeticException.class,NullPointerException.class})
@Transactional(noRollbackForClassName = "java.lang.ArithmeticException")
```

### 3.3 readOnly

事务只读，指对事务性资源进行只读操作。所谓事务性资源就是指那些被事务管理的资源，比如数据源、 JMS 资源，以及自定义的事务性资源等等。如果确定只对事务性资源进行只读操作，那么可以将事务标志为只读的，以提高事务处理的性能。在 `TransactionDefinition` 中以 `boolean` 类型来表示该事务是否只读。由于只读的优化措施是在一个事务启动时由后端数据库实施的， 因此，只有对于那些具有可能启动一个新事务的传播行为（`PROPAGATION_REQUIRES_NEW`、`PROPAGATION_REQUIRED`、 `ROPAGATION_NESTED`）的方法来说，将事务声明为只读才有意义。

> 注：`@Transactional` 注解中添加了 `readOnly=true`，但 `@Transactional` 注解修饰的方法涉及数据的修改，因此抛出如下异常：
> Caused by: java.sql.SQLException: Connection is read-only. Queries leading to data modification are not allowed

### 3.4 timeout

设置一个事务所允许执行的最长时长（单位：秒），如果超过该时长且事务还没有完成，则自动回滚事务且出现 `org.springframework.transaction.TransactionTimedOutException` 异常。

## 4. 事务的传播机制

`propagation` 属性指定事务传播行为，一个事务方法被另一个事务方法调用时，必须指定事务应该如何传播，例如：方法可能继承在现有事务中运行，也可能开启一个新事物，并在自己的事务中运行。Spring 定义了如下 7 种事务传播行为：

- **`Propagation.REQUIRED`**

  默认值，如果有事务在运行，当前的方法就在这个事务内运行，否则，就启动一个新的事务，并在自己的事务内运行。

- **`Propagation.REQUIRES_NEW`**

  当前方法必须启动新事务，并在它自己的事务内运行，如果有事务在运行，则把当前事务挂起，直到新的事务提交或者回滚才恢复执行。

- **`Propagation.SUPPORTS`**

  如果有事务在运行，当前的方法就在这个事务内运行，否则以非事务的方式运行。

- **`Propagation.NOT_SUPPORTED`**

  当前的方法不应该运行在事务中，如果有运行的事务，则将它挂起。

- **`Propagation.NEVER`**

  当前方法不应该运行在事务中，否则将抛出异常。

- **`Propagation.MANDATORY`**

  当前方法必须运行在事务内部，否则将抛出异常。

- **`Propagation.NESTED`**

  如果有事务在运行，当前的方法在这个事务的嵌套事务内运行，否则就启动一个新的事务，并在它自己的事务内运行，此时等价于 `REQUIRED`。

  > 注意：对于 `NESTED` 内层事务而言，内层事务独立于外层事务，可以独立递交或者回滚,如果内层事务抛出的是运行异常，外层事务进行回滚，内层事务也会进行回滚。

## 5. 事务的隔离机制

`isolation` 属性指定事务隔离级别，Spring 定义了如下 5 种事务隔离级别：

- **`Isolation.DEFAULT`**

  默认值，表示使用底层数据库的默认隔离级别。对大部分数据库而言，通常为 `READ_COMMITTED`。

- **`Isolation.READ_UNCOMMITTED`**

  表示一个事务可以读取另一个事务修改但还没有提交的数据。该级别可能出现脏读、不可重复读或幻读，因此很少使用该隔离级别。

- **`Isolation.READ_COMMITTED`**

  表示一个事务只能读取另一个事务已经提交的数据。该级别可以防止脏读，但可能出现不可重复读或幻读，这也是大多数情况下的推荐值。

- **`Isolation.REPEATABLE_READ`**

  表示一个事务在整个过程中可以多次重复执行某个查询，且每次返回的记录都相同，除非数据被当前事务自生修改。即使在多次查询之间有新增的数据满足该查询，这些新增的记录也会被忽略。该级别可以防止脏读和不可重复读，但可能出现幻读。

- **`Isolation.SERIALIZABLE`**

  表示所有的事务依次逐个执行，事务之间互不干扰，该级别可以防止脏读、不可重复读和幻读，但是这将严重影响程序的性能，因此通常情况下也不会用到该级别。

