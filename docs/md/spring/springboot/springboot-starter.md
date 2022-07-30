# SpringBoot 进阶 - 自定义 starter

> 本文代码见 [**demo-springboot-starter**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/demo-springboot-starter) 和 [**ice-springboot-starter**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/ice-springboot-starter)。

## 1. 思路

1. 创建一个 Demo Project，模拟一个需要被封装的 DemoModule 模块，其中核心方法为 exeModuleMethod
2. 通过 starter 封装可以直接初始化 DemoModule 的实例到 Spring 容器
3. 在 Maven 中引入starter，且在 yaml 中配置相应到参数即可直接初始化 DemoModule 的实例
4. 在应用中注入 DemoModule 即可使用其 exeModuleMethod 方法

## 2. 新建项目

创建一个普通的 maven 项目：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.ice</groupId>
    <artifactId>demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

</project>
```

创建一个测试模块：

```java
package com.ice.module;

public class DemoModule {

    private String version;

    private String name;

    public String exeModuleMethod() {
        return "Demo module, name = " + name + ", version = " + version;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

使用打包工具打包：

![](/imgs/spring/springboot/springboot-starter-1.png)

## 3. 封装 starter

- 创建项目 - pom.xml

> 这个需要借使用 Spring Initializr 了。

```xml
<dependencies>
    <dependency>
        <groupId>com.ice</groupId>
        <artifactId>demo</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-devtools</artifactId>
        <scope>runtime</scope>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-configuration-processor</artifactId>
        <optional>true</optional>
    </dependency>
</dependencies>
```

- Properties

```java
package com.ice.demospringbootstarter;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "com.ice")
public class DemoProperties {
    private String version;
    private String name;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

- AutoConfiguration

```java
package com.ice.demospringbootstarter;

import com.ice.module.DemoModule;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties(DemoProperties.class)
public class DemoAutoConfiguration {

    @Bean
    public DemoModule demoModule(DemoProperties properties){
        DemoModule demoModule = new DemoModule();
        demoModule.setName(properties.getName());
        demoModule.setVersion(properties.getVersion());
        return demoModule;
    }
}
```

- `spring.factories`

> 在 META-INF 下创建 spring.factories 文件

```bash
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
com.ice.demospringbootstarter.DemoAutoConfiguration
```

- install

![](/imgs/spring/springboot/springboot-starter-2.png)

## 4. 使用 starter

- POM

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>com.ice</groupId>
        <artifactId>demo-springboot-starter</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

- application.yaml

```yaml
com:
  ice:
    name: ice
    version: 1.0
```

- app

```java
package com.example.icespringbootstarter;

import com.ice.module.DemoModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class IceSpringbootStarterApplication {

    public static void main(String[] args) {
        SpringApplication.run(IceSpringbootStarterApplication.class, args);
    }

    @Autowired
    private DemoModule demoModule;

    @GetMapping("/starter")
    public String demo() {
        return demoModule.exeModuleMethod();
    }
}
```

- 输出

访问：http://localhost:8080/demo

```
Demo module, name = ice, version = 1.0
```

