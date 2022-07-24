# MyBatis - 逆向工程

> 本文转自 [MyBatis Generator 超详细配置](https://juejin.cn/post/6844903982582743048)。

> 本部分代码见 [**mybatis-generator**](https://github.com/dreaming-coder/ice-mybatis-demos/tree/main/mybatis-generator)。

## 1. Maven 配置

大多数 Maven 项目依赖在 POM 文件的 `<dependencies>` 标签中已经引入：

![](/imgs/middleware/mybatis/mybatis-generator-1.png)

接下来需要在 POM 中引入 MyBatis Generator 插件

在 pom 的根节点下添加以下配置

```xml
<!-- 控制Maven在构建过程中相关配置 -->
<build>
    <!-- 构建过程中用到的插件 -->
    <plugins>
        <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.4.1</version>
            <configuration>
                <!--mybatis的代码生成器的配置文件-->
                <configurationFile>src/main/resources/generatorConfig.xml</configurationFile>
                <!--允许覆盖生成的文件-->
                <overwrite>true</overwrite>
                <!--将当前pom的依赖项添加到生成器的类路径中-->
                <includeCompileDependencies>true</includeCompileDependencies>
            </configuration>
        </plugin>
    </plugins>
</build>
```

> 这里注意，上面出现的 jar 包必须有，如果之前未配置，可以在 `<plugin>` 标签内配置。

## 2. 配置 generatorConfig.xml

MyBatis Generator 插件启动后，会根据你在 pom 中配置都路径找到该配置文件。

这个配置文件才是详细都配置 MyBatis Generator 生成代码的各种细节。

其中最重要的就是 **context** ，你的配置文件至少得包含一个 **context**

:::warning

该配置文件节点的相对顺序有要求，不能随意写！

:::

### 2.1 properties

```xml
<properties resource="db.properties"/>
```

可以将配置写入一个文件引入，利用 `${xxx}` 获取

### 2.2 context

注意是配置在 `<generatorConfiguration>` 下

```xml
<context id="DB2Tables" defaultModelType="flat" targetRuntime="MyBatis3Simple">

</context>
```

- **id**：随便填，保证多个 **context** id 不重复就行
- **defaultModelType**：可以不填，默认值 `conditional`，`flat` 表示一张表对应一个 PO
- **targetRuntime：可以不填，默认值** `MyBatis3`，常用的还有 `MyBatis3Simple`，这个配置会影响生成的 dao 和 mapper.xml 的内容

> `MyBatis3Simple` 生成的方法比较简洁，`MyBatis3` 生成的方法很多。

**context** 的子元素必须按照以下给出的个数、顺序配置：

1. **property** (0..N)
2. **plugin** (0..N)
3. **commentGenerator** (0 or 1)
4. **jdbcConnection** (需要connectionFactory 或 jdbcConnection)
5. **javaTypeResolver** (0 or 1)
6. **javaModelGenerator** (至少1个)
7. **javaModelGenerator** (至少1个)
8. **javaClientGenerator** (0 or 1)
9. **table** (1..N)

####  2.2.1property

这个一般放外面了，里面就不配了

#### 2.2.2 plugin

配置一个插件，例如

```xml
<plugin type="org.mybatis.generator.plugins.EqualsHashCodePlugin"/>
```

> 这个插件给生成的 Java 模型对象增加了 `equals` 和 `hashCode` 方法。

#### 2.2.3 commentGenerator

**commentGenerator** 用来配置生成的注释。默认是生成注释的，并且会生成时间戳，如下：

![](/imgs/middleware/mybatis/mybatis-generator-2.png)

如果你想要保留注释和时间戳，可以不配置 **commentGenerator**。

如果你不想保留时间戳，需要如下配置

```xml
<commentGenerator>
    <!-- 不希望生成的注释中包含时间戳 -->
    <property name="suppressDate" value="true"/>
</commentGenerator>
```

默认生成的注释是不会有 db 表中字段的注释，如果你想知道每个字段在数据库中的含义(前提是数据库中对应表的字段你添加了注释)，可以如下配置：

```xml
<commentGenerator>
    <!-- 添加 db 表中字段的注释 -->
    <property name="addRemarkComments" value="true"/>
</commentGenerator>
```

![](/imgs/middleware/mybatis/mybatis-generator-3.png)

但说实话，MyBatis Generator 生成注释无用信息太多了，所以一般都选择不生成注释

```xml
<commentGenerator>
    <!-- 是否不生成注释 -->
    <property name="suppressAllComments" value="true"/>
</commentGenerator>
```

#### 2.2.4 jdbcConnection

MyBatis Generator 需要链接数据库，所以需要配置 **jdbcConnection**，具体如下：

```xml
<jdbcConnection driverClass="${mysql.driver}"
                        connectionURL="${mysql.url}"
                        userId="${mysql.username}"
                        password="${mysql.password}">
    <!--高版本的 mysql-connector-java 需要设置 nullCatalogMeansCurrent=true-->
    <property name="nullCatalogMeansCurrent" value="true"/>
</jdbcConnection>
```

这里面值得注意的是 `<property name="nullCatalogMeansCurrent" value="true"/>`，因为我用的 **mysql-connector-java** 版本是 8.0.29，如果配置这一项，会找不到对应的数据库，[官网](https://link.juejin.cn/?target=http%3A%2F%2Fwww.mybatis.org%2Fgenerator%2Fusage%2Fmysql.html)对此的解释是：

![](/imgs/middleware/mybatis/mybatis-generator-4.png)

#### 2.2.5 javaTypeResolver

javaTypeResolver 是配置 JDBC 与 Java 的类型转换规则，或者你也可以不用配置，使用它默认的转换规则。

就算配置也只能配置 bigDecimal 类型和时间类型的转换

```xml
<javaTypeResolver>
    <!--是否使用 bigDecimal，默认false。
        false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer
        true，把JDBC DECIMAL 和 NUMERIC 类型解析为java.math.BigDecimal-->
    <property name="forceBigDecimals" value="true"/>
    <!--默认false
        false，将所有 JDBC 的时间类型解析为 java.util.Date
        true，将 JDBC 的时间类型按如下规则解析
            DATE	                -> java.time.LocalDate
            TIME	                -> java.time.LocalTime
            TIMESTAMP                   -> java.time.LocalDateTime
            TIME_WITH_TIMEZONE  	-> java.time.OffsetTime
            TIMESTAMP_WITH_TIMEZONE	-> java.time.OffsetDateTime
        -->
    <property name="useJSR310Types" value="true"/>
</javaTypeResolver>
```

#### 2.2.6 javaModelGenerator

配置 po 生成的包路径和项目路径，如下：

```xml
<javaModelGenerator targetPackage="com.ice.entity" targetProject="src/main/java">
    <!-- 是否让schema作为包的后缀，默认为false -->
    <property name="enableSubPackages" value="true" />
    <!-- 是否针对string类型的字段在set方法中进行修剪，默认false -->
    <property name="trimStrings" value="true" />
</javaModelGenerator>
```

#### 2.2.7 sqlMapGenerator

配置 Mapper.xml 文件的生成目录

```xml
<sqlMapGenerator targetPackage="com.ice.mapper" targetProject="src/main/resources">
	<property name="enableSubPackages" value="true" />
</sqlMapGenerator>
```

#### 2.2.8 javaClientGenerator

配置 XxxMapper.java 文件的生成目录

```xml
<javaClientGenerator type="XMLMAPPER" targetPackage="com.ice.mapper" targetProject="src/main/java">
	<property name="enableSubPackages" value="true" />
</javaClientGenerator>
```

`type="XMLMAPPER"` 会将接口的实现放在 mapper.xml中，也推荐这样配置。也可以设置 type 为其他值，比如 `type="ANNOTATEDMAPPER"`，接口的实现通过注解写在接口上面，如果采用这种方式，不会生成 mapper.xml 也不用配置 `<sqlMapGenerator>`，但是采用注解来实现接口应对简单查询还好，如果是复杂查询并不如 xml 方便，所以还是建议将 `type` 配置成 `XMLMAPPER`。

#### 2.2.9 table

一个 **table** 对应一张表，如果想同时生成多张表，需要配置多个 **table**

```xml
<!-- schema为数据库名，oracle需要配置，mysql不需要配置。
     tableName为对应的数据库表名，tableName设置为*号，可以对应所有表，此时不写domainObjectName
     domainObjectName 是要生成的实体类名(可以不指定)
     enableXXXByExample 默认为 true，为true会生成一个对应Example帮助类，帮助你进行条件查询，不想要可以设为false
     -->
<table schema="" tableName="user" domainObjectName="User"
       enableCountByExample="false" enableDeleteByExample="false" enableSelectByExample="false"
       enableUpdateByExample="false" selectByExampleQueryId="false">
    <!--是否使用实际列名,默认为false-->
    <!--<property name="useActualColumnNames" value="false" />-->
</table>
```

其中 **domainObjectName** 不配置时，它会按照帕斯卡命名法将表名转换成类名。

> - **enableXXXByExample** 默认为 `true`，但只有在 `targetRuntime="MyBatis3"` 时才生效，生效时，会在 po下多生成一个 `XxxExample.java` 的文件，很大，慎用。
> - 当 `targetRuntime="MyBatis3Simple"` 时，**enableXXXByExample** 不管为 `true`、还是 `false` 都不生效。

## 3. 完整配置

【POM 文件】

```xml
<!-- 控制Maven在构建过程中相关配置 -->
<build>
    <!-- 构建过程中用到的插件 -->
    <plugins>
        <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
        <plugin>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-maven-plugin</artifactId>
            <version>1.4.1</version>
            <configuration>
                <!--mybatis的代码生成器的配置文件-->
                <configurationFile>src/main/resources/generatorConfig.xml</configurationFile>
                <!--允许覆盖生成的文件-->
                <overwrite>true</overwrite>
                <!--将当前pom的依赖项添加到生成器的类路径中-->
                <includeCompileDependencies>true</includeCompileDependencies>
            </configuration>
        </plugin>
    </plugins>
</build>	
```

【generatorConfig 文件】

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>

    <!-- 引入配置文件 -->
    <properties resource="db.properties"/>

    <!-- 一个数据库一个context, context的子元素必须按照它给出的顺序
        1. property (0..N)
        2. plugin (0..N)
        3. commentGenerator (0 or 1)
        4. jdbcConnection (需要connectionFactory 或 jdbcConnection)
        5. javaTypeResolver (0 or 1)
        6. javaModelGenerator (至少1个)
        7. javaModelGenerator (至少1个)
        8. javaClientGenerator (0 or 1)
        9. table (1..N)
    -->
    <!--
      id：随便填，保证多个 context id 不重复就行
      defaultModelType：可以不填，默认值 conditional，flat表示一张表对应一个po
      targetRuntime：可以不填，默认值 MyBatis3，常用的还有 MyBatis3Simple，这个配置会影响生成的 dao 和 mapper.xml的内容
      -->
    <context id="DB2Tables" defaultModelType="flat" targetRuntime="MyBatis3Simple">
        <commentGenerator>
            <!-- 不希望生成的注释中包含时间戳 -->
            <property name="suppressDate" value="true"/>
            <!-- 添加 db 表中字段的注释 -->
            <property name="addRemarkComments" value="true"/>
            <!-- 是否不生成注释 -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="${mysql.driver}"
                        connectionURL="${mysql.url}"
                        userId="${mysql.username}"
                        password="${mysql.password}">
        </jdbcConnection>
        <javaTypeResolver>
            <!--是否使用 bigDecimal，默认false。
                false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer
                true，把JDBC DECIMAL 和 NUMERIC 类型解析为java.math.BigDecimal-->
            <property name="forceBigDecimals" value="true"/>
            <!--默认false
                false，将所有 JDBC 的时间类型解析为 java.util.Date
                true，将 JDBC 的时间类型按如下规则解析
                    DATE	                -> java.time.LocalDate
                    TIME	                -> java.time.LocalTime
                    TIMESTAMP                   -> java.time.LocalDateTime
                    TIME_WITH_TIMEZONE  	-> java.time.OffsetTime
                    TIMESTAMP_WITH_TIMEZONE	-> java.time.OffsetDateTime
                -->
            <property name="useJSR310Types" value="true"/>
        </javaTypeResolver>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="com.ice.entity" targetProject="src/main/java">
            <!-- 是否让schema作为包的后缀，默认为false -->
            <property name="enableSubPackages" value="true"/>
            <!-- 是否针对string类型的字段在set方法中进行修剪，默认false -->
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="com.ice.mapper" targetProject="src/main/resources">
            <property name="enableSubPackages" value="true"/>
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.ice.mapper" targetProject="src/main/java">
            <property name="enableSubPackages" value="true"/>
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

## 4. 使用 MyBatis Generator

如图所示，双击即可执行：

![](/imgs/middleware/mybatis/mybatis-generator-5.png)

一会就可以看到文件被生成出来了：

![](/imgs/middleware/mybatis/mybatis-generator-6.png)

