# 结构型 - 外观模式

> 外观模式是一种使用频率非常高的结构型设计模式，它通过引入一个外观角色来简化客户端与子系统之间的交互，为复杂的子系统调用提供一个统一的入口，降低子系统与客户端的耦合度，且客户端调用非常方便。

外观模式又称为门面模式，它是一种对象结构型模式。外观模式是迪米特法则的一种具体实现，通过引入一个新的外观角色可以降低原有系统的复杂度，同时降低客户类与子系统的耦合度。

外观模式包含如下两个角色：

- **Facade（外观角色）**：在客户端可以调用它的方法，在外观角色中可以知道相关的（一个或者多个）子系统的功能和责任；在正常情况下，它将所有从客户端发来的请求委派到相应的子系统去，传递给相应的子系统对象处理。

- **SubSystem（子系统角色）**：在软件系统中可以有一个或者多个子系统角色，每一个子系统可以不是一个单独的类，而是一个类的集合，它实现子系统的功能；每一个子系统都可以被客户端直接调用，或者被外观角色调用，它处理由外观类传过来的请求；子系统并不知道外观的存在，对于子系统而言，外观角色仅仅是另外一个客户端而已。

外观模式的目的不是给予子系统添加新的功能接口，而是为了让外部减少与子系统内多个模块的交互，松散耦合，从而让外部能够更简单地使用子系统。

外观模式的本质是：**封装交互，简化调用**。

---

`SLF4J` 是简单的日志外观模式框架，抽象了各种日志框架例如 `Logback`、`Log4j`、`Commons-logging` 和 `JDK` 自带的 `logging` 实现接口。它使得用户可以在部署时使用自己想要的日志框架。

`SLF4J` **没有替代任何日志框架，它仅仅是标准日志框架的外观模式**。如果在类路径下除了 `SLF4J` 再没有任何日志框架，那么默认状态是在控制台输出日志。

> 日志处理框架 Logback 是 Log4j 的改进版本，原生支持 SLF4J（因为是同一作者开发的），因此 Logback＋SLF4J 的组合是日志框架的最佳选择，比 SLF4J + 其它日志框架 的组合要快一些。而且 Logback 的配置可以是 XML 或 Groovy 代码。

SLF4J 的 HelloWorld 如下：

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
    public static void main(String[] args) {
        Logger logger = LoggerFactory.getLogger(HelloWorld.class);
        logger.error("Hello World");
    }
}
```

如果添加的是 Logback 实现：

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

输出为：

```
14:09:45.561 [main] ERROR com.ice.structure.Facade.HelloWorld - Hello World
```

如果是 Log4j：

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.2</version>
</dependency>
```

需要有配置文件：

```properties
#日志级别大小： DEBUG < INFO < WARN < ERROR < FATAL
#log4j.rootLogger 配置的是大于等于当前级别的日志信息的输出
#log4j.rootLogger 用法:（注意appenderName可以是一个或多个）
#log4j.rootLogger = 日志级别,appenderName1,appenderName2,....
#log4j.appender.appenderName1定义的是日志的输出方式，有两种：一种是命令行输出或者叫控制台输出，另一种是文件方式保存
#                            1）控制台输出则应该配置为org.apache.log4j.PatternLayout
#                            2）文本方式保存应该配置为org.apache.log4j.DailyRollingFileAppender
#                            3）也可以自定义 Appender类
#log4j.appender.appenderName1.layout.ConversionPattern 定义的是日志内容格式
#log4j.appender.appenderName1.file 定义了该日志文件的文件名称
#log4j.appender.appenderName1.DatePattern 定义了日志文件重新生成的时间间隔，如果设置到天，则每天重新生成一个新的日志文件。
#                                         旧的日志文件则以新的文件名保存，文件名称 = log4j.appender.appenderName1.file + log4j.appender.appenderName1.DatePattern
#log4j.rootLogger = info,stdout,file
log4j.rootLogger = info,stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender 
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%p][%d{yyyy-MM-dd HH:mm:ss}][%C{1}:%L] - %m%n
#log4j.appender.file = org.apache.log4j.DailyRollingFileAppender
#log4j.appender.file.file=d\:\\log\\info(+).log
#log4j.appender.file.DatePattern= '.'yyyy-MM-dd
#log4j.appender.file.layout=org.apache.log4j.PatternLayout
#log4j.appender.file.layout.ConversionPattern=[%p][%d{yyyy-MM-dd HH:mm:ss}][%C{1}:%L] - %m%n


# log4j.logger 用法如下
#              1）log4j.logger.包名 = 日志级别 , appenderName1,appenderName2,....
#                 定义该包名下的所有类的日志输出
#              2）log4j.logger.类全名含包名 = 日志级别 , appenderName1,appenderName2,....
#                 定义指定类的日志输出
#              3) log4j.logger.日志对象Logger命名名称 = 日志级别 , appenderName1,appenderName2,....
#                 定义了某命名名称的日志的 输出，如:
#                 log4j.logger.Log1 就是指定义通过 Logger.getLogger("Log1") 获取的日志对象的日志输出

log4j.logger.edu.mvcdemo.controller = debug,controller_logfile
log4j.appender.controller_logfile = org.apache.log4j.DailyRollingFileAppender
log4j.appender.controller_logfile.file=d\:\\log\\controller_logfile.log
log4j.appender.controller_logfile.DatePattern= '.'yyyy-MM-dd
log4j.appender.controller_logfile.layout=org.apache.log4j.PatternLayout
log4j.appender.controller_logfile.layout.ConversionPattern=[%p][%d{yyyy-MM-dd HH:mm:ss}][%C{1}:%L] - %m%n
```

输出结果为：

```
[INFO][2021-10-30 14:22:34][HelloWorld:10] - Hello World
```

