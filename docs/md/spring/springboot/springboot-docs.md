# SpringBoot 集成 - 生成接口文档

> 本文转自 [SpringBoot接口 - 如何生成接口文档之Swagger技术栈](https://www.pdai.tech/md/spring/springboot/springboot-x-interface-doc.html)。

> SpringBoot 开发 Restful 接口，有什么 API 规范吗？如何快速生成 API 文档呢？Swagger 是一个用于生成、描述和调用 RESTful 接口的 Web 服务。通俗的来讲，Swagger 就是将项目中所有（想要暴露的）接口展现在页面上，并且可以进行接口调用和测试的服务。本文主要介绍 OpenAPI 规范，以及 Swagger 技术栈基于 OpenAPI 规范的集成方案。 

## 1. 准备知识点

### 1.1 什么是 OpenAPI 规范（OAS)？

[OpenAPI 规范（OAS）](https://fishead.gitbook.io/openapi-specification-zhcn-translation/3.0.0.zhcn#revisionHistory)定义了一个标准的、语言无关的 RESTful API 接口规范，它可以同时允许开发人员和操作系统查看并理解某个服务的功能，而无需访问源代码，文档或网络流量检查（既方便人类学习和阅读，也方便机器阅读）。正确定义 OAS 后，开发者可以使用最少的实现逻辑来理解远程服务并与之交互。

此外，文档生成工具可以使用 OpenAPI 规范来生成 API 文档，代码生成工具可以生成各种编程语言下的服务端和客户端代码，测试代码和其他用例。

### 1.2 什么是 Swagger？

Swagger 是一个用于生成、描述和调用 RESTful 接口的 Web 服务。通俗的来讲，Swagger 就是将项目中所有（想要暴露的）接口展现在页面上，并且可以进行接口调用和测试的服务。

从上述 Swagger 定义我们不难看出 Swagger 有以下 3 个重要的作用：

- 将项目中所有的接口展现在页面上，这样后端程序员就不需要专门为前端使用者编写专门的接口文档；
- 当接口更新之后，只需要修改代码中的 Swagger 描述就可以实时生成新的接口文档了，从而规避了接口文档老旧不能使用的问题；
- 通过 Swagger 页面，我们可以直接进行接口调用，降低了项目开发阶段的调试成本。

Swagger3完全遵循了 OpenAPI 规范。Swagger 官网地址：[https://swagger.io/ ](https://swagger.io/)。 

### 1.3 Swagger 和 SpringFox 有啥关系？

Swagger 可以看作是一个遵循了 OpenAPI 规范的一项技术，而 springfox 则是这项技术的具体实现。 就好比 Spring 中的 IOC 和 DI 的关系 一样，前者是思想，而后者是实现。

### 1.4 什么是 Knife4J?  和 Swagger 什么关系？

> 本质是 Swagger 的增强解决方案，前身只是一个 SwaggerUI（swagger-bootstrap-ui）。

Knife4j 是为 Java MVC 框架集成 Swagger 生成 API 文档的增强解决方案，前身是 swagger-bootstrap-ui，取名 knife4j 是希望她能像一把匕首一样小巧，轻量，并且功能强悍！

Knife4j 的前身是 swagger-bootstrap-ui，为了契合微服务的架构发展，由于原来 swagger-bootstrap-ui 采用的是后端 Java 代码 + 前端 UI 混合打包的方式，在微服务架构下显的很臃肿，因此项目正式更名为 knife4j。

更名后主要专注的方面：

- 前后端 Java 代码以及前端 UI 模块进行分离，在微服务架构下使用更加灵活
- 提供**专注于 Swagger 的增强解决方案**,不同于只是改善增强前端 UI 部分

## 2. 实现案例之 Swagger3

> 本部分代码见 [**ice-springboot-swagger3**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/ice-springboot-swagger3)。

### 2.1 POM

根据上文介绍，我们引入 springfox 依赖包，最新的是 3.x.x 版本。和之前的版本比，只需要引入如下的 starter 包即可。

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
<!-- 引入swagger-bootstrap-ui包，优化UI页面，可不加 -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.6</version>
</dependency>
```

### 2.2 Swagger Config

我们在配置中还增加了一些全局的配置，比如全局参数等

```java
package com.ice.demo.config;

import io.swagger.annotations.ApiOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import springfox.documentation.builders.*;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.schema.ScalarType;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
@EnableOpenApi
public class SwaggerConfig {

    @Bean
    public Docket openApi(){
        return new Docket(DocumentationType.OAS_30)
                .groupName("Test group")
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build()
                .globalRequestParameters(getGlobalRequestParameters())
                .globalResponses(HttpMethod.GET, getGlobalResponse());
    }


    /**
     * @return global response code->description
     */
    private List<Response> getGlobalResponse() {
        return ResponseStatus.HTTP_STATUS_ALL.stream().map(
                        a -> new ResponseBuilder().code(a.getResponseCode()).description(a.getDescription()).build())
                .collect(Collectors.toList());
    }

    /**
     * @return global request parameters
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("AppKey")
                .description("App Key")
                .required(false)
                .in(ParameterType.QUERY)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());
        return parameters;
    }

    /**
     * @return api info
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Swagger API")
                .description("test api")
                .contact(new Contact("ice", "http://e-thunder.space", "644476114@qq.com"))
                .termsOfServiceUrl("http://xxxxxx.com/")
                .version("1.0")
                .build();
    }
}
```

### 2.3 Controller 接口

```java
package com.ice.demo.controller;


import com.ice.demo.entity.AddressVo;
import com.ice.demo.entity.UserParam;
import com.ice.demo.entity.UserVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@Api
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * http://localhost:8080/user/add .
     *
     * @param userParam user param
     * @return user
     */
    @ApiOperation("Add User")
    @PostMapping("add")
    @ApiImplicitParam(name = "userParam", type = "body", dataTypeClass = UserParam.class, required = true)
    public ResponseEntity<String> add(@RequestBody UserParam userParam) {
        return ResponseEntity.ok("success");
    }

    /**
     * http://localhost:8080/user/list .
     *
     * @return user list
     */
    @ApiOperation("Query User List")
    @GetMapping("list")
    public ResponseEntity<List<UserVo>> list() {
        List<UserVo> userVoList = Collections.singletonList(UserVo.builder().name("lei").age(18)
                .address(AddressVo.builder().city("NJ").zipcode("10086").build()).build());
        return ResponseEntity.ok(userVoList);
    }
}
```

### 2.4 运行测试

打开文档API网页 http://localhost:8080/swagger-ui/index.html#/

![](/imgs/spring/springboot/springboot-swagger3-1.png)

## 3. 实现案例之Knife4J

> 这里展示目前使用 Java 生成接口文档的最佳实现: SwaggerV3(OpenAPI）+ Knife4J。

> 本部分代码见 [**ice-springboot-swagger3-knife4j**](https://github.com/dreaming-coder/ice-springboot-demos/tree/main/ice-springboot-swagger3-knife4j)。

### 3.1 POM

```xml
<!-- https://mvnrepository.com/artifact/com.github.xiaoymin/knife4j-spring-boot-starter -->
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.3</version>
</dependency>
```

### 3.2  yaml 配置

```yaml
server:
  port: 8080
knife4j:
  enable: true
  documents:
    - group: Test Group
      name: My Documents
      locations: classpath:wiki/*
  setting:
    # default lang
    language: en-US
    # footer
    enableFooter: false
    enableFooterCustom: true
    footerCustomContent: MIT | [ice's blog](http://e-thunder.space)
    # header
    enableHomeCustom: true
    homeCustomLocation: classpath:wiki/README.md
    # models
    enableSwaggerModels: true
    swaggerModelName: My Models
```

### 3.3 注入配置

```java
package com.ice.doc.config;

import com.github.xiaoymin.knife4j.spring.extension.OpenApiExtensionResolver;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import springfox.documentation.builders.*;
import springfox.documentation.oas.annotations.EnableOpenApi;
import springfox.documentation.schema.ScalarType;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * swagger config for open api.
 */
@Configuration
@EnableOpenApi
public class OpenApiConfig {

    /**
     * open api extension by knife4j.
     */
    private final OpenApiExtensionResolver openApiExtensionResolver;

    @Autowired
    public OpenApiConfig(OpenApiExtensionResolver openApiExtensionResolver) {
        this.openApiExtensionResolver = openApiExtensionResolver;
    }

    /**
     * @return swagger config
     */
    @Bean
    public Docket openApi() {
        String groupName = "Test Group";
        return new Docket(DocumentationType.OAS_30)
                .groupName(groupName)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build()
                .globalRequestParameters(getGlobalRequestParameters())
                .globalResponses(HttpMethod.GET, getGlobalResponse())
                .extensions(openApiExtensionResolver.buildExtensions(groupName))
                .extensions(openApiExtensionResolver.buildSettingExtensions());
    }

    /**
     * @return global response code->description
     */
    private List<Response> getGlobalResponse() {
        return ResponseStatus.HTTP_STATUS_ALL.stream().map(
                        a -> new ResponseBuilder().code(a.getResponseCode()).description(a.getDescription()).build())
                .collect(Collectors.toList());
    }

    /**
     * @return global request parameters
     */
    private List<RequestParameter> getGlobalRequestParameters() {
        List<RequestParameter> parameters = new ArrayList<>();
        parameters.add(new RequestParameterBuilder()
                .name("AppKey")
                .description("App Key")
                .required(false)
                .in(ParameterType.QUERY)
                .query(q -> q.model(m -> m.scalarModel(ScalarType.STRING)))
                .required(false)
                .build());
        return parameters;
    }

    /**
     * @return api info
     */
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("My API")
                .description("test api")
                .contact(new Contact("ice", "http://e-thunder.sapce", "644476114@qq.com"))
                .termsOfServiceUrl("http://xxxxxx.com/")
                .version("1.0")
                .build();
    }
}
```

### 3.4 Controller 接口

```java
package com.ice.doc.controller;

import com.ice.doc.entity.AddressParam;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Address controller test demo.
 */
@RestController
@RequestMapping("/address")
public class AddressController {
    /**
     * http://localhost:8080/address/add .
     *
     * @param addressParam param
     * @return address
     */
    @ApiOperation("Add Address")
    @PostMapping("add")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "city", type = "query", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "zipcode", type = "query", dataTypeClass = String.class, required = true)
    })
    public ResponseEntity<String> add(AddressParam addressParam) {
        return ResponseEntity.ok("success");
    }
}
```

### 3.5 运行测试

打开 http://localhost:8080/doc.html

![](/imgs/spring/springboot/springboot-swagger3-2.png)

model模型

![](/imgs/spring/springboot/springboot-swagger3-3.png)

