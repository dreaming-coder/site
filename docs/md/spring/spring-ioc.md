# Spring 基础 - 控制反转 (IoC)

## 1. 如何理解 IoC

### 1.1 Spring  Bean 是什么

> IoC Container 管理的是 Spring Bean， 那么 Spring Bean 是什么呢？

Spring 里面的 bean 就类似是定义的一个组件，而这个组件的作用就是实现某个功能的，这里所定义的 bean 就相当于给了你一个更为简便的方法来调用这个组件去实现你要完成的功能。

### 1.2 IoC 是什么

> Ioc—Inversion of Control，即“控制反转”，**不是什么技术，而是一种设计思想**。在 Java 开发中，IoC 意味着将你设计好的对象交给容器控制，而不是传统的在你的对象内部直接控制。

我们来深入分析一下：

- **谁控制谁，控制什么**？

传统 Java SE 程序设计，我们直接在对象内部通过 `new` 进行创建对象，是程序主动去创建依赖对象；而 IoC 是有专门一个容器来创建这些对象，即由 IoC 容器来控制对象的创建；谁控制谁？当然是 IoC 容器控制了对象；控制什么？那就是主要控制了外部资源获取（不只是对象包括文件等）。

- **为何是反转，哪些方面反转了**？

有反转就有正转，传统应用程序是由我们自己在对象中主动控制去直接获取依赖对象，也就是正转；而反转则是由容器来帮忙创建及注入依赖对象；为何是反转？因为由容器帮我们查找及注入依赖对象，对象只是被动的接受依赖对象，所以是反转；哪些方面反转了？依赖对象的获取被反转了。

- **用图例说明一下**？

传统程序设计下，都是主动去创建相关对象然后再组合起来：

![](/imgs/spring/ioc-basic-1.png)

当有了 IoC / DI 的容器后，在客户端类中不再主动去创建这些对象了，如图：

![](/imgs/spring/ioc-basic-2.png)

### 1.3 IoC 能做什么

> IoC **不是一种技术，只是一种思想**，一个重要的面向对象编程的法则，它能指导我们如何设计出松耦合、更优良的程序。

传统应用程序都是由我们在类内部主动创建依赖对象，从而导致类与类之间高耦合，难于测试；有了 IoC 容器后，**把创建和查找依赖对象的控制权交给了容器，由容器进行注入组合对象，所以对象与对象之间是松散耦合，这样也方便测试，利于功能复用，更重要的是使得程序的整个体系结构变得非常灵活**。

其实 IoC 对编程带来的最大改变不是从代码上，而是从思想上，发生了“主从换位”的变化。应用程序原本是老大，要获取什么资源都是主动出击，但是在 IoC / DI 思想中，应用程序就变成被动的了，被动的等待 IoC 容器来创建并注入它所需要的资源了。

IoC 很好的体现了面向对象设计法则之一—— **好莱坞法则：“别找我们，我们找你”**；即由 IoC 容器帮对象找相应的依赖对象并注入，而不是由对象主动去找。

### 1.4 IoC 和 DI 是什么关系

> 控制反转是通过依赖注入实现的，其实它们是同一个概念的不同角度描述。通俗来说就是 **IoC 是设计思想，DI 是实现方式**。

DI—Dependency Injection，即依赖注入：组件之间依赖关系由容器在运行期决定，形象的说，即由容器动态的将某个依赖关系注入到组件之中。依赖注入的目的并非为软件系统带来更多功能，而是为了提升组件重用的频率，并为系统搭建一个灵活、可扩展的平台。通过依赖注入机制，我们只需要通过简单的配置，而无需任何代码就可指定目标需要的资源，完成自身的业务逻辑，而不需要关心具体的资源来自何处，由谁实现。

我们来深入分析一下：

- **谁依赖于谁**？

当然是应用程序依赖于 IoC 容器；

- **为什么需要依赖**？

应用程序需要 IoC 容器来提供对象需要的外部资源；

- **谁注入谁**？

很明显是 IoC 容器注入应用程序某个对象，应用程序依赖的对象；

- **注入了什么**？

就是注入某个对象所需要的外部资源（包括对象、资源、常量数据）。

- **IoC 和 DI 由什么关系呢**？

其实它们是同一个概念的不同角度描述，由于控制反转概念比较含糊（可能只是理解为容器控制对象这一个层面，很难让人想到谁来维护对象关系），所以 2004 年大师级人物 Martin Fowler 又给出了一个新的名字：“依赖注入”，相对 IoC 而言，“依赖注入”明确描述了“被注入对象依赖 IoC 容器配置依赖对象”。通俗来说就是 **IoC 是设计思想，DI 是实现方式**。

## 2. Bean

### 2.1 基本配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    
    <!-- 配置 bean 到 Spring 容器中 -->
    <bean id="cat" class="com.ice.spring.entity.Cat" name="cat">
        <property name="age" value="13"/>
        <property name="name" value="Tom"/>
    </bean>
    <alias name="cat" alias="cat2"/>
</beans>
```

> - `id` 属性是 bean 的唯一表示，遵从小驼峰命名法
> - `name` 属性表示该 bean 的别名，可以有多个别名，分隔符可以是**空格**、**逗号**、**分号**，**允许混合同时使用**

### 2.2 实例化

#### 2.2.1 构造函数实例化

当通过构造方法创建一个 Bean 时，所有普通类都可以被 Spring 使用并兼容。也就是说，正在开发的类不需要实现任何特定的接口或以特定的方式进行编码。只需指定 Bean 类就足够了。但是，根据用于该特定 Bean 的 IoC 的类型，可能需要一个默认（空）构造函数。

Spring IoC 容器几乎可以管理您要管理的任何类。它不仅限于管理真正的 Java Bean。大多数 Spring 用户更喜欢实际的 Java Bean，它们仅具有默认的（无参数）构造函数，并具有根据容器中的属性建模的适当的 setter 和 getter。

```xml
<bean id="cat" class="com.ice.spring.entity.Cat" name="cat" />
<bean id="cat1" class="com.ice.spring.entity.Cat" name="cat">
    <constructor-arg name="age" value="13"/>
    <constructor-arg name="name" value="Tom"/>
</bean>
```

> 默认的 bean 就是构造函数来实例化的。

#### 2.2.2 静态工厂实例化

在定义使用静态工厂方法创建的 Bean 时，使用 **class** 属性指定包含 **static** 工厂方法的类，并使用 **factory-method** 属性来指定工厂方法本身的名称。您应该能够调用此方法（带有可选参数，如稍后所述）并返回一个活动对象，该对象随后将被视为已通过构造函数创建。

以下 Bean 定义指定通过调用工厂方法来创建 Bean。该定义不指定返回对象的类型（类），而仅指定包含工厂方法的类。在此示例中，该 `createInstance()` 方法必须是静态方法。

```xml
<bean id="dog" class="com.ice.spring.entity.DogConstructor" factory-method="createInstance"/>
<bean id="dog1" class="com.ice.spring.entity.DogConstructor" factory-method="createInstance">
    <property name="name" value="小黑"/>
    <property name="age" value="2"/>
</bean>
```

该工厂类如下所示：

```java
public class DogConstructor {
    public static Dog createInstance(String name, int age) {
        return new Dog(name, age);
    }

    public static Dog createInstance(){
        return createInstance("旺财",3);
    }
}
```

> 一个工厂类也可以包含一个以上的工厂方法。

#### 2.2.3 实例工厂实例化

类似于通过静态工厂方法进行实例化，使用实例工厂方法进行实例化会从容器中调用现有 Bean 的非静态方法来创建新 Bean。要使用此机制，请将 **class** 属性留空，并在 **factory-bean** 属性中指定当前（或父容器或祖先容器）中包含要创建该对象的实例方法的 Bean 的名称。使用 **factory-method** 属性设置工厂方法本身的名称。

```xml
<bean id="catConstructor" class="com.ice.spring.entity.catConstructor" name="catConstructor"/>
<bean id="cat1" factory-bean="catConstructor" factory-method="createInstance">
    <property name="age" value="7"/>
    <property name="name" value="喵喵"/>
</bean>
```

该工厂类如下所示：

```java
public class CatConstructor {

    public Cat createInstance(String name, int age) {
        return new Cat(name, age);
    }

    public Cat createInstance() {
        return createInstance("HelloKitty", 3);
    }
}
```

> 一个工厂类也可以包含一个以上的工厂方法。

#### 2.2.4 延迟加载

有时我们不希望容器启动时就将 Bean 注册到容器中，或是希望延迟加载，我们可以在配置 Bean 时，设置 `lazy-init="true"`

```xml
<bean id="fish" class="com.ice.spring.entity.Fish" name="fish1" lazy-init="true">
    <property name="name" value="金鱼"/>
</bean>
```

#### 2.2.5 Bean 的作用域

|    类别     |                             说明                             |
| :---------: | :----------------------------------------------------------: |
| `singleton` | 在 Spring IoC 容器中仅存在一个 Bean 实例，Bean 以单例的方式存在，默认值 |
| `prototype` |        每次从容器中获取 Bean 时，都会返回一个新的实例        |
|  `request`  | 每次 HTTP 请求都会创建一个新的 Bean，该作用域仅适用于 WebApplicationContext 环境 |
|  `session`  | 同一个 HTTP Session 共享一个 Bean，不同 Session 使用不同 Bean，适用于 WebApplicationContext 环境 |

可以通过 **scope** 属性设置作用域，例如：

```xml
<bean id="fish" class="com.ice.spring.entity.Fish" name="fish" scope="prototype">
    <property name="name" value="金鱼"/>
</bean>
```

```java
ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring-ioc-annotation.xml");

Fish fish = applicationContext.getBean("fish", Fish.class);
Fish fish1 = applicationContext.getBean("fish", Fish.class);

System.out.println(fish == fish1); // false
```

### 2.3 依赖注入

这里就只关心属性也是 Bean 的情况了

#### 2.3.1 构造函数注入

- **构造函数参数名称注入**{.ul-title}

  ```xml
  <bean id="person" class="com.ice.spring.entity.Person" name="person">
      <constructor-arg name="age" value=" 18"/>
      <constructor-arg name="name" value="ice"/>
      <constructor-arg name="dog" ref="dog"/>
  </bean>
  ```

  > 如果引用已有的 Bean，用 **ref** 传递

- **构造函数参数类型匹配注入**{.ul-title}

  ```xml
  <bean id="person2" class="com.ice.spring.entity.Person" name="person2">
      <constructor-arg type="int" value=" 18"/>
      <constructor-arg type="java.lang.String" value="ice"/>
      <constructor-arg type="com.ice.spring.entity.Dog" ref="dog"/>
  </bean>
  ```

- **构造函数参数索引注入**{.ul-title}

  ```xml
  <bean id="person3" class="com.ice.spring.entity.Person" name="person3">
      <constructor-arg index="0" value="Job"/>
      <constructor-arg index="1" value="3"/>
      <constructor-arg index="2" ref="dog"/>
  </bean>	
  ```

  > - 除了解决多个简单值的歧义性外，指定索引还可以解决构造函数具有两个相同类型参数的歧义性
  >
  > - 索引从 $0$ 开始

#### 2.3.2 setter 注入

通过调用无参数构造函数或无参数 static 工厂方法实例化 Bean 后，容器在 Bean 上调用 setter 方法来实现基于 setter 的依赖注入 。

##### 2.3.2.1 简单类型

`<property/>` 元素的 **value** 属性将属性或构造函数参数指定为人类可读的字符串表示形式。Spring 的转换服务用于将这些值从字符串转换为属性或参数的实际类型。

```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="misterkaoli"/>
</bean>
```

> 这是一个常见的数据源的配置

##### 2.3.2.2 对其他 Bean 的引用

```xml
<bean id="person4" class="com.ice.spring.entity.Person" name="person4">
    <property name="name" value="Jerry"/>
    <property name="age" value="16"/>
    <property name="dog" ref="dog"/>
</bean>
```

##### 2.3.2.3 内部 Bean

`<property/>` 或 `<constructor-arg/>` 元素中的 `<bean/>` 元素定义了一个内部 Bean，如下面的示例所示：

```xml
<bean id="person5" class="com.ice.spring.entity.Person" name="person5">
    <property name="name" value="Jerry"/>
    <property name="age" value="16"/>
    <property name="dog">
        <bean class="com.ice.spring.entity.Dog">
            <property name="age" value="13"/>
            <property name="name" value="热狗"/>
        </bean>
    </property>
</bean>
```

>-  内部 Bean 定义不需要已定义的 **id** 或名称。如果指定了该值，则容器不会使用该值作为标识符
>
>- 容器在创建时也会忽略范围标记，因为内部 Bean 总是匿名的，并且总是与外部 Bean 一起创建
>
>- 不能独立访问内部 Bean，也不能将它们注入到协作 Bean中
>
>- 内部 Bean 通常只是共享它们所包含的 Bean 的范围

##### 2.3.2.4 复杂类型注入

- **Collections**{.ul-title}

  `<list/>`、`<set/>`、`<map/>`、`<props/> `元素分别设置了 Java 集合类型 `List`、`Set`、`Map` 和 `Properties` 的属性和参数。下面的官方示例演示如何使用它们：

	```xml
	<bean id="moreComplexObject" class="example.ComplexObject">
	    <!-- results in a setAdminEmails(java.util.Properties) call -->
	    <property name="adminEmails">
	        <props>
	            <prop key="administrator">administrator@example.org</prop>
	            <prop key="support">support@example.org</prop>
	            <prop key="development">development@example.org</prop>
	        </props>
	    </property>
	    <!-- results in a setSomeList(java.util.List) call -->
	    <property name="someList">
	        <list>
	            <value>a list element followed by a reference</value>
	            <ref bean="myDataSource" />
	        </list>
	    </property>
	    <!-- results in a setSomeMap(java.util.Map) call -->
	    <property name="someMap">
	        <map>
	            <entry key="an entry" value="just some string"/>
	            <entry key ="a ref" value-ref="myDataSource"/>
	        </map>
	    </property>
	    <!-- results in a setSomeSet(java.util.Set) call -->
	    <property name="someSet">
	        <set>
	            <value>just some string</value>
	            <ref bean="myDataSource" />
	        </set>
	    </property>
	    <property name="someNull">
	        <null />
	    </property>
	</bean>
	```

  > map 的键和值、set 的值可以是以下任何元素：`bean | ref | idref | list | set | map | props | value | null `

- **Collections 合并**{.ul-title}

  Spring 容器还支持合并集合。一个应用开发者可以定义一个父元素  `<list/>`， `<map/>`， `<set/>` 或 `<props/>`，并让子元素 `<list/>`，`<map/>`，`<set/>` 或 `<props/>` 继承和覆盖父元素集合中的值。也就是说，子集合的值是合并父集合和子集合的元素的结果，子集合元素覆盖父集合中指定的值。

  下面的例子演示了集合的合并:

	```xml
	<beans>
	    <bean id="parent" abstract="true" class="example.ComplexObject">
	        <property name="adminEmails">
	            <props>
	                <prop key="administrator">administrator@example.com</prop>
	                <prop key="support">support@example.com</prop>
	            </props>
	        </property>
	    </bean>
	    <bean id="child" parent="parent">
	        <property name="adminEmails">
	            <!-- the merge is specified on the child collection definition -->
	            <props merge="true">
	                <prop key="sales">sales@example.com</prop>
	                <prop key="support">support@example.co.uk</prop>
	            </props>
	        </property>
	    </bean>
	<beans>
	```

- **null 和字符串控制**{.ul-title}

  Spring 将属性之类的空参数视为空字符串。以下基于 XML 的配置元数据片段将 email 属性设置为空字符串值(`"`)。

  ```xml
  <bean class="ExampleBean">
    <property name="email" value=""/>
  </bean>
  ```

  `<null/>` 元素的作用是：处理 `null` 值。

	```xml
	<bean class="ExampleBean">
	  <property name="email">
	      <null/>
	  </property>
	</bean>
	```

##### 2.3.2.5 简写方式

- **p 命名空间注入**{.ul-title}

  下面的示例显示了两个 XML 片段(第一个使用标准 XML 格式，第二个使用 p-namespace)，它们解析为相同的结果：

	```xml
	<beans xmlns="http://www.springframework.org/schema/beans"
	    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	    xmlns:p="http://www.springframework.org/schema/p"
	    xsi:schemaLocation="http://www.springframework.org/schema/beans
	        https://www.springframework.org/schema/beans/spring-beans.xsd">
	
	    <bean name="classic" class="com.example.ExampleBean">
	        <property name="email" value="someone@somewhere.com"/>
	    </bean>
	
	    <bean name="p-namespace" class="com.example.ExampleBean"
	        p:email="someone@somewhere.com"/>
	</beans>	
	```

  该示例显示了 bean 定义中的 p-namespace 中的一个名为 email 的属性。这告诉 Spring 包含一个属性声明。如前所述，p-namespace 没有模式定义，因此可以将属性的名称设置为属性名。

  下一个示例包含了另外两个 bean 定义，它们都引用了另一个 bean:

	```xml
	<beans xmlns="http://www.springframework.org/schema/beans"
	    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	    xmlns:p="http://www.springframework.org/schema/p"
	    xsi:schemaLocation="http://www.springframework.org/schema/beans
	        https://www.springframework.org/schema/beans/spring-beans.xsd">
	
	    <bean name="john-classic" class="com.example.Person">
	        <property name="name" value="John Doe"/>
	        <property name="spouse" ref="jane"/>
	    </bean>
	
	    <bean name="john-modern"
	        class="com.example.Person"
	        p:name="John Doe"
	        p:spouse-ref="jane"/>
	
	    <bean name="jane" class="com.example.Person">
	        <property name="name" value="Jane Doe"/>
	    </bean>
	</beans>
	```

- **c 命名空间注入**{.ul-title}

	```xml
	<beans xmlns="http://www.springframework.org/schema/beans"
	    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	    xmlns:c="http://www.springframework.org/schema/c"
	    xsi:schemaLocation="http://www.springframework.org/schema/beans
	        https://www.springframework.org/schema/beans/spring-beans.xsd">
	
	    <bean id="beanTwo" class="x.y.ThingTwo"/>
	    <bean id="beanThree" class="x.y.ThingThree"/>
	
	    <!-- traditional declaration with optional argument names -->
	    <bean id="beanOne" class="x.y.ThingOne">
	        <constructor-arg name="thingTwo" ref="beanTwo"/>
	        <constructor-arg name="thingThree" ref="beanThree"/>
	        <constructor-arg name="email" value="something@somewhere.com"/>
	    </bean>
	
	    <!-- c-namespace declaration with argument names -->
	    <bean id="beanOne" class="x.y.ThingOne" c:thingTwo-ref="beanTwo"
	        c:thingThree-ref="beanThree" c:email="something@somewhere.com"/>
	
	</beans>
	```

#### 2.3.3 自动装配

- 自动装配是 Spring 满足 Bean 依赖的一种方式
- Spring 会在上下文中自动寻找，并自动给 Bean 装配属性

##### 2.3.3.1 byType 自动装配

该模式表示根据 property 的数据类型（Type）自动装配，Spring 会自动寻找与属性类型相同的 Bean，若一个 Bean 的数据类型，兼容另一个 Bean 中 property 的数据类型，则自动装配。

**注意：使用byType首先需要保证同一类型的对象，在spring容器中唯一，若不唯一会报不唯一的异常。**

```xml
<bean id="fish" class="com.ice.spring.entity.Fish" name="fish">
    <property name="name" value="金鱼"/>
</bean>
<bean id="fishWatcher" class="com.ice.spring.entity.FishWatcher" name="fishWatcher" autowire="byType"/>
```

##### 2.3.3.2 byName 自动装配

该模式表示根据 property 的 name 自动装配，如果一个 Bean 的 name，和另一个 Bean 中的 property 的 name 相同，则自动装配这个 Bean 到 property 中。

当一个 Bean 节点带有 `autowire="byName"` 的属性时，将查找其类中所有的 setter 方法名，获得将 set 去掉并且首字母小写的字符串，然后去 Spring 容器中寻找是否有此字符串名称 id 的对象。如果有，就取出注入；如果没有，就报空指针异常。

```xml
<bean id="person6" class="com.ice.spring.entity.Person" name="person6" autowire="byName"/>
```

## 3. 使用注解

### 3.1 开启注解

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                           http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 开启注解 -->
    <context:annotation-config/>

    <!-- 指定要扫描的包，这个包下的注解就会生效 -->
    <context:component-scan base-package="com.ice.spring.entity"/>

</beans>
```

### 3.2 组件扫描

`@Component` 用于声明一个类是一个组件，启动 Spring 容器的时候，会扫描指定包下的类，如果包含这个注解，则会在容器中为这个类注册一个 Bean。

```java
import org.springframework.stereotype.Component;

@Component(value = "Tom")
public class Cat {
    private String name;
    private int age;
    // ...
}
```

> `@Component` 注解有一个可选的参数，无参情况下，组件的在容器中的 name 为 cat，即被注解类的类名的小驼峰形式，如果传递了这个参数，则给组件的 name 就是手动指定的名称。

`@Component` 有三个衍生注解，为了更好的进行分层，Spring 可以使用其它三个注解，功能一样，目前使用哪一个功能都一样。

- `@Controller`：web 层
- `@Service`：service 层
- `@Repository`：dao 层

写上这些注解，就相当于将这个类交给 Spring 管理装配了！

### 3.3 属性注入

对于基本类型值的注入，我们可以使用 `@Value` 注解进行赋值，`@Value` 注解可以传下面几种值：

- 基本数值
- `#{}`：SpEL
- `${}`：取出配置文件中的值（在运行环境变量里面的值）

```java
@Component(value = "Tom")
public class Cat {
    @Value("${cat.name}")
    private String name;
    @Value("#{20-2}")
    private int age;
    // ...
}
```

### 3.4 自动装配

#### 3.4.1 @Autowired

这是最常用的自动装配的注解，可以用在属性、setter 方法及构造函数参数上，其中，**作用在属性和 setter 方法上时，必须要有无参构造函数**。

- 作用在属性上(不推荐)

	```java
	@Component
	public class Person {
	    private String name;
	    private int age;
	    
	    @Autowired
	    private Dog dog;
	    // ...
	}
	```

- 作用在 setter 方法上(解决循环依赖的一种方式)

	```java
	@Component
	public class Person {
	    private String name;
	    private int age;
	    
	    private Dog dog;
	    
	    @Autowired
	    public void setDog(Dog dog) {
	        this.dog = dog;
	    }
	    // ...
	}
	```

- 作用在构造函数上(推荐)

  **这是因为这种方式可以声明属性是 `final` 的，前面的方式本质上是先声明为 `null`，再赋值的。**

	```java
	@Autowired
	public Person(@Value("ice") String name, @Value("14") int age,  Dog dog) {
	    this.name = name;
	    this.age = age;
	    this.dog = dog;
	}
	
	
	public Person(@Value("ice") String name, @Value("14") int age, @Autowired Dog dog) {
	    this.name = name;
	    this.age = age;
	    this.dog = dog;
	}
	```

  上面两种方式都可以，只是，如果注解的是参数，那么创建 Bean 默认走无参构造函数，作用在构造函数上，创建 Bean 时自动走有参构造。

**`@Autowired` 注解是按照 byType 方式进行自动装配的，同时，它可以设置是否允许空值装配，即 `@Autowired(required = false)`**。

#### 3.4.2 @Qualifier

- `@Autowired` 是根据类型自动装配的，加上 `@Qualifier` 则可以根据 **byName** 的方式自动装配
- `@Qualifier` 不能单独使用。

```java
@Component
public class Person {
    private String name;
    private int age;
    
    private Dog dog;
    
    @Autowired
    @Qualifier("dog")
    public void setDog(Dog dog) {
        this.dog = dog;
    }
    // ...
}
```

有种特殊情况可以直接用，就是注解在构造函数参数上，但是**此时不能有无参构造函数**，否则创建 Bean 用的默认是无参构造函数：

```java
public Person(@Value("ice") String name, @Value("14") int age, @Qualifier("dog") Dog dog) {
    this.name = name;
    this.age = age;
    this.dog = dog;
}
```

#### 3.4.3 @Primary

除了每次用 `@Qualifier` 注解，指定类型相同时匹配的 bean 的名字，我们也可以使用 `@Primary` 注解指定默认 bean，**当有多个相同类型的 bean 时，首先用它**。

注意，**不能和 `@Qualifiler` 同时使用！**

```java
@Component
@Primary
public class Dog extends Animal{
    
}

@Component
public class Cat extends Animal{
    
}

@Component
public class Person{
    @Autowired
    private Animal pet;
}
```

> 此时，优先自动装配 `Dog` 类

#### 3.4.4 @Resource

- `@Resource` 如有指定的 name 属性，先按该属性进行 **byName** 方式查找装配；
- 其次再进行默认的 **byName** 方式进行装配；
- 如果以上都不成功，则按 **byType** 的方式自动装配；
- 都不成功，则报异常。

```java
@Component
public class Person {
    private String name;
    private int age;

    @Resource(name="dog")
    private Dog dog;
}
```

#### 3.4.5 @Inject

需要导入：

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

和 `@Autowired` 功能一样，但是 `@Inject` 没有参数：

```java
@Component
public class Person {
    private String name;
    private int age;
    
    private Dog dog;
    
    @Inject
    public void setDog(Dog dog) {
        this.dog = dog;
    }
    // ...
}
```

> 该注解无法作用于函数参数上！

## 4. 注解驱动开发

### 4.1 Java Config

Java Config 原来是 Spring 的一个子项目，它通过 Java 类的方式提供 Bean 的定义信息，在 Spring 4 的版本， Java Config 已正式成为 Spring 4 的核心功能 。

配置类最基础的两个注解为：`@Configuration` 和 `@ComponentScan`。

#### 4.1.1 @Configuration

`@Configuration` 注解用来声明这个类是一个 Java 配置类，其内部通过定义函数的方式来进行全局配置。

```java
@Configuration
public class Config {
	// 配置内容
}
```

这个注解有一个可选参数：`proxyBeanMethods`，默认为 `true`。

当 `proxyBeanMethods=true` 时，称作 Full 模式；当 `proxyBeanMethods=false` 时，称作 Lite 模式。

Full 模式下也就是说该配置类会被代理（CGLib），在同一个配置类中调用其它被 `@Bean` 注解标注的方法获取对象时会直接从 IoC 容器之中获取。如果设置为 Lite 模式，则该类每次都会调用方法创建新的 Bean。

可以验证，下面代码输出了 $2$ 次 "生了一只狗..."

```java
@Configuration(proxyBeanMethods = false)
public class Config {
    @Bean
    public Dog dog() {
        System.out.println("生了一只狗...")
        return new Dog("小黑", 3);
    }

    @Bean
    public Person person() {
        return new Person("ice", dog());
    }
}
```

```java
void test(){
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
    Dog dog = applicationContext.getBean("dog", Dog.class);
    Person person = applicationContext.getBean("person", Person.class);
}
```

#### 4.1.2 @ComponentScan

该注解用于指定扫指定包下的所以文件，如果有相应注解就进行处理：

```java
@Configuration
@ComponentScan("com.ice.spring.entity")
public class Config {
	// 配置内容
}
```

上面这种是最简单的用法，除此之外，还有过滤、排除等功能，下面是 `@ComponentScan` 的源码（省略了不常用的）：

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Documented
@Repeatable(ComponentScans.class)
public @interface ComponentScan {
	
    // 基本扫描包，全限定名
	@AliasFor("basePackages")
	String[] value() default {};

	@AliasFor("value")
	String[] basePackages() default {};

	// 基本扫描包，传入类所在的 package 被识别为基本扫描包
	Class<?>[] basePackageClasses() default {};

    // 指示是否应该启用 @Component @Repository、@Service或@Controller注释的类的自动检测
	boolean useDefaultFilters() default true;

	// 过滤规则，在 basePackages 中符合过滤规则的才被扫描
    // 注意，如果 useDefaultFilters 为 true，则此处除了你指定的，DefaultFilters 的类型也会被扫描
    // 如果 DefaultFilters 的有你不想要过滤的类型，必须设置 useDefaultFilters=false
	Filter[] includeFilters() default {};

	// 排除规则，是一个 Filter 数组，Filter 是该注解内部定义的一个注解
	Filter[] excludeFilters() default {};

    /******************************************************************************************/

	// 内部注解，定义过滤规则
	@Retention(RetentionPolicy.RUNTIME)
	@Target({})
	@interface Filter {

		// 设置按照什么过滤，默认是注解
		FilterType type() default FilterType.ANNOTATION;

		// 设置过滤的类（按照注解过滤就是 注解类.class，按照其他方式过滤，就是其他相关类.class）
		@AliasFor("classes")
		Class<?>[] value() default {};

		@AliasFor("value")
		Class<?>[] classes() default {};

		// 按照 AspectJ type pattern expression 或 正则表达式 过滤的 模式字符串
		String[] pattern() default {};
	}
}
```

下面再介绍下 `FilterType`：

- `FilterType.ANNOTATION`：按照注解类型

- `FilterType.ASSIGNABLE_TYPE`：按照指定类类型

- `FilterType.ASPECTJ`：按照 AspectJ 表达式

- `FilterType.REGEX`：按照正则表达式

- `FilterType.CUSTOM`：按照自定义规则

我们用如下测试代码来测试这些过滤、排除的功能：

```java
void testComponentScan() {
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
    String[] beanDefinitionNames = applicationContext.getBeanDefinitionNames();
    for (String beanDefinitionName : beanDefinitionNames) {
        System.out.println(beanDefinitionName);
    }
}
```

- 不指定规则

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring")
	public class Config {
	
	}
	```

  输出结果：

	```
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	cat
	dog
	person
	```

- `useDefaultFilter=false`

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring",useDefaultFilters = false)
	public class Config {
	
	}
	```

  输出结果：

	```
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	```

- 指定过滤规则(按照类型)

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring",useDefaultFilters = false,
	        includeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = {Dog.class,Person.class})})
	public class Config {
	
	}
	```

  输出结果：

	```
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	dog
	person
	```

- 指定过滤规则(按照注解类型)

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring", useDefaultFilters = false,
	        includeFilters = {@ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Mine.class)})
	public class Config {
		
	}
	```

  这里 `Mine` 是自定义注解，注解在 `Fish` 类上，输出结果为：

	```
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	fish
	```

- 指定排除规则

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring",
	        excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = Cat.class)})
	public class Config {
	
	}
	```

  输出结果：

	```
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	dog
	person
	```

- 按照自定义规则

  自定义的规则就是编写 `TypeFilter` 的实现类，重写 `match()` 方法，返回 `true` 表示匹配成功，`false` 表示匹配失败：
	
	```java
	public class MyTypeFilter implements TypeFilter {
	    
	    /**
	     * metadataReader：读取到的当前正在扫描的类的信息
	     * metadataReaderFactory：可以获取到其他任何类的信息
	     */
	    public boolean match(MetadataReader metadataReader, MetadataReaderFactory metadataReaderFactory) throws IOException {
	
	        // 获取当前类的注解的信息
	        AnnotationMetadata annotationMetadata = metadataReader.getAnnotationMetadata();
	
	        // 获取当前正在扫描的类的信息
	        ClassMetadata classMetadata = metadataReader.getClassMetadata();
	
	        String className = classMetadata.getClassName();
	
	        System.out.println("--->" + className);
	
	        if (className.contains("cat")) {
	            return true;
	        }
	
	        // 获取当前类的资源信息（类的路径）
	        Resource resource = metadataReader.getResource();
	        return false;
	    }
	}
	```

  此时配置类以这么写：

	```java
	@Configuration()
	@ComponentScan(basePackages = "com.ice.spring", useDefaultFilters = false,
	        excludeFilters = {@ComponentScan.Filter(type = FilterType.CUSTOM, classes = MyTypeFilter.class)})
	public class Config {
	
	}
	```
	
	输出结果：
	
	```
	--->com.ice.spring.ioc.IoCTest
	--->com.ice.spring.ioc.IoCTest2
	--->com.ice.spring.annotation.Mine
	--->com.ice.spring.config.MyTypeFilter
	--->com.ice.spring.entity.Cat
	--->com.ice.spring.entity.CatConstructor
	--->com.ice.spring.entity.Dog
	--->com.ice.spring.entity.DogConstructor
	--->com.ice.spring.entity.Fish
	--->com.ice.spring.entity.FishWatcher
	--->com.ice.spring.entity.Person
	org.springframework.context.annotation.internalConfigurationAnnotationProcessor
	org.springframework.context.annotation.internalAutowiredAnnotationProcessor
	org.springframework.context.annotation.internalCommonAnnotationProcessor
	org.springframework.context.event.internalEventListenerProcessor
	org.springframework.context.event.internalEventListenerFactory
	config
	```

### 4.2 组件注册

#### 4.2.1 显式注册 Bean

在配置类中，我们用如下方式注册一个 Bean 实例：

```java
@Configuration()
@ComponentScan(basePackages = "com.ice.spring")
public class Config {
    @Bean
    public Fish fish(){
        return new Fish();
    }
}
```

> 方法名就是 fish

也可以显示指定 beanName：

```java
@Bean("baby")
public Fish fish(){
    return new Fish();
}
```

#### 4.2.2 扫描注册

这里就是前面说的 `@Component`、`@Repository`、`@Service`、`@Controller` 等默认过滤规则的注解的类，会被 Spring 扫描并添加到 Bean 容器。

#### 4.2.3 @Import 注册

##### 4.2.3.1 直接导入

这种方式比较简单：

```java
@Configuration
@Import(Cat.class)
public class Config {
    
}
```

也可以同时导入多个类注册 Bean

```java
@Configuration
@Import({Dog.class, Person.class})
public class Config {

}
```

##### 4.2.3.2 ImportSelector

我们需要实现 `ImportSelector`  接口并实现接口中的抽象方法 `selectImports()`，然后用 `@Import` 接口引入，这样，`selectImports()` 方法返回的字符串数组中的每个元素所指向的类就会被注册到 Spring 容器中。

```java
public class MyImportSelector implements ImportSelector {
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"com.ice.spring.entity.Apple","com.ice.spring.entity.Banana"};
    }
}
```

```java
@Configuration
@Import(MyImportSelector.class)
public class Config {

}
```

##### 4.2.3.3 ImportBeanDefinitionRegistrar

这种方式需要实现 `ImportBeanDefinitionRegistrar ` 接口并实现 `registerBeanDefinitions()` 方法，这种方式是调用 `BeanDefinitionRegistry` 的 `registerBeanDefinition()` 方法来手工注册 Bean。

```java
public class MyImportBeanDefinitionRegistrar implements ImportBeanDefinitionRegistrar {
    /**
     * AnnotationMetadata：当前类的注解信息
     * BeanDefinitionRegistry：BeanDefinition 注册类
     *
     * 把所有需要添加到容器中的 bean，调用 BeanDefinitionRegistry.registerBeanDefinition 手工注册进来
     */
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        boolean dog = registry.containsBeanDefinition("com.ice.spring.entity.Dog");
        boolean person = registry.containsBeanDefinition("com.ice.spring.entity.Person");
        if (dog && person) {
            // 指定 bean 定义信息（bean 的类型、作用域等等）
            RootBeanDefinition apple = new RootBeanDefinition(Apple.class);
            // 注册一个 bean 的定义信息，并指定 bean 名
            registry.registerBeanDefinition("apple", apple);
        }
    }
}
```

```java
@Configuration
@Import({MyImportBeanDefinitionRegistrar.class,Dog.class,Person.class})
public class Config {

}
```

#### 4.2.4 FactoryBean 注册

我们创建一个类实现 `FactoryBean` 接口及其抽象方法就可以利用该类将 Bean 注册到容器中。

```java
public class BananaBean implements FactoryBean<Banana> {
    public Banana getObject() throws Exception {
        System.out.println("BananaBean 的 getObject() 方法");
        return new Banana();
    }

    public Class<?> getObjectType() {
        return Banana.class;
    }

    // 返回 true 说明 scope 是 singleton，否则是 prototype
    public boolean isSingleton() {
        return false;
    }
}
```

在配置类中，我们应该这么写：

```java
@Configuration
public class Config {
    @Bean
    public BananaBean bananaBean() {
        return new BananaBean();
    }
}
```

这次我要给出测试方法了，因为稍微和前面傻瓜式的不太一样：

```java
@Test
void test() {
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
    Banana banana = applicationContext.getBean(Banana.class);
    Banana banana1 = applicationContext.getBean(Banana.class);
    System.out.println(banana == banana1);
    System.out.println("===========================================================");
    Object bananaBean = applicationContext.getBean("bananaBean");
    System.out.println(bananaBean.getClass());  // 默认返回的是工厂方法注册的 bean
    Object bean = applicationContext.getBean("&bananaBean");
    System.out.println(bean.getClass()); // 如果要获取工厂 bean 本身在开头加 &
}
```

输出结果为：

```
BananaBean 的 getObject() 方法
BananaBean 的 getObject() 方法
false
===========================================================
BananaBean 的 getObject() 方法
class com.ice.spring.entity.Banana
class com.ice.spring.entity.BananaBean
```

#### 4.2.5 条件注册

使用 `@Conditional` 注解，可以按照一定的条件进行判断，满足条件给容器中注册 Bean

例如，我们现在有三个类，`Dog`、`Cat`、`Person`，我们想当容器中存在 `Dog` 类型的 Bean 时才注册 `Person` 类型 Bean 到容器中，`Cat` 则是当容器中没有 `Person` 类型的 Bean 才注册，我们该怎么写？

首先我们看看 `@Conditional` 注解的源码。

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Conditional {
	Class<? extends Condition>[] value();
}
```

需要在使用时传递条件值，是一个 `Condition` 数组，进入 `Condition` 接口中查看，可以发现是个函数式接口：

```java
@FunctionalInterface
public interface Condition {
    /**
     * ConditionContext：判断条件能使用的上下文环境（根据你注解的对象来决定是什么时候的环境）
     * AnnotatedTypeMetadata：当前标注了 @Conditional 注解的类或方法的注释信息
     */
	boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata);
}
```

我们只要实现 `matches()` 就完成一个条件。

下面我们来实现上面的要求。

```java
public class PersonCondition implements Condition {
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 1. 能获取到 IOC 使用的 BeanFactory
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        // 2. 获取该类的加载器
        ClassLoader classLoader = context.getClassLoader();
        // 3. 获取当前的环境信息
        Environment environment = context.getEnvironment();
        // 4. 获取到 bean 定义的注册类
        BeanDefinitionRegistry registry = context.getRegistry();

        return registry.containsBeanDefinition("dog");
    }
}
```

```java
public class CatCondition implements Condition {
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        // 1. 能获取到 IOC 使用的 BeanFactory
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        // 2. 获取该类的加载器
        ClassLoader classLoader = context.getClassLoader();
        // 3. 获取当前的环境信息
        Environment environment = context.getEnvironment();
        // 4. 获取到 bean 定义的注册类
        BeanDefinitionRegistry registry = context.getRegistry();

        return !registry.containsBeanDefinition("dog");
    }
}
```

配置类如下：

```java
@Configuration
public class Config {
    @Bean
    public Dog dog() {
        return new Dog();
    }

    @Bean
    @Conditional(CatCondition.class)
    public Cat cat() {
        return new Cat();
    }

    @Bean
    @Conditional(PersonCondition.class)
    public Person person() {
        return new Person();
    }
}
```

此时， `Cat` 不会被注册到容器中，如果将 `Dog` 的 Bean 注册方法注释掉，则 `Person` 不会被注册到容器中。

#### 4.2.6 @Scope

就是 Bean 的作用域，可选的有四种：

- `singleton`
- `prototype`
- `request`
- `session`

主要有下面两种使用情况

```java
@Bean
@Scope("singleton")
public Dog dog() {
    return new Dog();
}
/*---------------------------------------------------------------------------------------------------*/
@Component
@Scope("prototype")
public class Apple {
}
```

#### 4.2.7 懒加载

有些时候，我们并不希望容器启动时候就注册 Bean 到 Spring 容器中，我们可以使用 `@Lazy` 注解来实现延迟注册。

```java
@Configuration
public class MainConfig {
    @Bean("person")
    @Lazy  // 懒加载
    public Person person() {
        return new Person("亚索", 20);
    }
}
```

#### 4.2.8 导入原生配置文件

有些时候，我们仍然会用到 XML 显式配置，如老项目的二次开发，很可能以前用的就是 XML配置，现在要用 JavaConfig 方式简化配置。我们只需要使用 `@ImportResource` 注解，就可以将指定路径的配置文件加载。

```java
@Configuration
@ImportResource("classpath:spring-ioc.xml")
public class Config {

}
```

### 4.3 生命周期切面方法

#### 4.3.1 initMethod 与 destroyMethod

我们可以在 Bean 的创建之前和销毁之前，切入自定义的方法来做一些处理。

例如如下类：

```java
@Getter
@Setter
@ToString
public class LifeStyle {
    @Value("18")
    private int age;


    public void init(){
        System.out.println("执行 init 方法");
    }

    public LifeStyle(){
        System.out.println("执行无参构造方法");
    }


    public LifeStyle(int age){
        System.out.println("执行有参构造方法");
    }

    public void destroy_bean(){
        System.out.println("执行 destroy_bean 方法");
    }
}
```

如何切入 `init()` 和 `destroy()` 方法呢？

传统的 XML 配置方式为：

```xml
<bean id="lifeStyle" class="com.ice.spring.entity.LifeStyle" 
      name="lifeStyle" init-method="init" destroy-method="destroy_bean"/>
```

JavaConfig 方式为：

```java
@Configuration
public class Config {
    @Bean(initMethod = "init",destroyMethod = "destroy_bean")
    public LifeStyle lifeStyle(){
        return new LifeStyle();
    }
}
```

我们执行如下测试方法：

```java
void test03(){
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
    LifeStyle bean = applicationContext.getBean("lifeStyle", LifeStyle.class);
    System.out.println(bean);
    applicationContext.close();
}
```

输出结果为：

```
执行无参构造方法
执行 init 方法
LifeStyle(age=18)
执行 destroy_bean 方法
```

> 注意多实例的情况，容器在多实例情况下不会管理这个 Bean，在第一次使用时创建实例，调用 `init()` 方法，容器不会调用 `destroy()` 方法。

#### 4.3.2 InitializingBean 与 DisposableBean

这种方式是实现 `InitializingBean` 和 `DisposableBean` 接口，实现 `afterPropertiesSet()` 和 `destroy()` 方法来实现方法的切入。

```java
@Getter
@Setter
@ToString
public class LifeStyle implements InitializingBean, DisposableBean {
    @Value("18")
    private int age;


    public void init(){
        System.out.println("执行 init 方法");
    }

    public LifeStyle(){
        System.out.println("执行无参构造方法");
    }


    public LifeStyle(int age){
        System.out.println("执行有参构造方法");
    }

    public void destroy_bean(){
        System.out.println("执行 destroy_bean 方法");
    }

    public void destroy() throws Exception {
        System.out.println("执行 destroy 方法");
    }

    public void afterPropertiesSet() throws Exception {
        System.out.println("执行 afterProperties 方法");
    }
}
```

这里我与前面的方法弄一起了，看看合在一起的执行顺序：

```
执行无参构造方法
执行 afterProperties 方法
执行 init 方法
LifeStyle(age=18)
执行 destroy 方法
执行 destroy_bean 方法
```

#### 4.3.3 @PostConstruc 与 @PreDestroy

这是 JSR 250 提供的注解，和前面两种方式作用类似，我们直接看看效果：

```java
package com.ice.spring.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Getter
@Setter
@ToString
public class LifeStyle implements InitializingBean, DisposableBean {
    @Value("18")
    private int age;


    public void init(){
        System.out.println("执行 init 方法");
    }

    public LifeStyle(){
        System.out.println("执行无参构造方法");
    }


    @PostConstruct
    public void postConstruct(){
        System.out.println("执行 postConstruct 方法");
    }

    @PreDestroy
    public void preDestroy(){
        System.out.println("执行 preDestroy 方法");
    }

    public void destroy_bean(){
        System.out.println("执行 destroy_bean 方法");
    }

    public void destroy() throws Exception {
        System.out.println("执行 destroy 方法");
    }

    public void afterPropertiesSet() throws Exception {
        System.out.println("执行 afterProperties 方法");
    }
}
```

此时的整体输出顺序为：

```
执行无参构造方法
执行 postConstruct 方法
执行 afterProperties 方法
执行 init 方法
LifeStyle(age=18)
执行 preDestroy 方法
执行 destroy 方法
执行 destroy_bean 方法
```

### 4.4 BeanPostProcessor

`BeanPostProcessor` 接口是 Spring 提供的众多接口之一，他的作用主要是如果我们需要在 Spring 容器完成 Bean 的实例化、配置和其他的初始化前后添加一些自己的逻辑处理，我们就可以定义一个或者多个 `BeanPostProcessor` 接口的实现，然后注册到容器中。

#### 4.4.1 Spring 中 Bean 的实例化的简要过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/ac906d60cc704c24834697ad40b8bd1e.jpg?#pic_center)


由图可以看出，Spring 中的 `BeanPostProcessor` 在实例化过程处于的位置分为两部分--前置处理和后置处理，而 `BeanPostProcessor` 接口也提供了两个可实现的方法，下面我们看一下源码：

```java
public interface BeanPostProcessor {

	@Nullable
	default Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

	@Nullable
	default Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

}
```

由方法名字也可以看出，前者在实例化及依赖注入完成后、在任何初始化代码（比如配置文件中的 init-method）调用之前调用；后者在初始化代码调用之后调用。此处需要注意的是：接口中的两个方法都要将传入的 Bean 返回，而不能返回 `null`，如果返回的是 `null` 那么我们通过 `getBean()` 方法将得不到目标。

#### 4.4.2 自定义类来实现 BeanPostProcessor 接口

```java
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;


public class MyBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessBeforeInitialization...");
        System.out.println("    " + beanName + "=>" + bean);
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("postProcessAfterInitialization...");
        System.out.println("    " + beanName + "=>" + bean);
        return bean;
    }
}
```

看看它的效果：

```
postProcessBeforeInitialization...
    cat=>Cat{name='汤姆', age=0}
postProcessAfterInitialization...
    cat=>Cat{name='汤姆', age=0}
postProcessBeforeInitialization...
    dog=>Dog{name='black', age=12}
postProcessAfterInitialization...
```

> **Spring 底层大量使用 BeanPostProcessor，如 `@Autowired`、`@Async` 等等注解的解析使用。**

### 4.5 Aware 注入 Spring 底层组件

自定义组件想要使用 Spring 底层的一些组件（`ApplicationContext`，`BeanFactory`…）可以实现 `XXXXAware` 接口，其顶级接口为 `Aware`。

在创建对象的时候，会调用接口规定的方法注入相关组件。

`XXXXAware` 其实都是由 `ApplicationContextAwareProcessor` 后置处理器处理的，以回调方式传入底层组件。它重写了 `BeanPostProcessor`  后置处理器的 `postProcessBeforeInitialization()` 方法：

```java
class ApplicationContextAwareProcessor implements BeanPostProcessor{
    
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {

        // 这里就判断了，如果没有实现那些个 XXXAware 接口，则不处理，直接返回 bean
        if (!(bean instanceof EnvironmentAware || bean instanceof EmbeddedValueResolverAware ||
              bean instanceof ResourceLoaderAware || bean instanceof ApplicationEventPublisherAware ||
              bean instanceof MessageSourceAware || bean instanceof ApplicationContextAware ||
              bean instanceof ApplicationStartupAware)) {
            return bean;
        }

        AccessControlContext acc = null;

        if (System.getSecurityManager() != null) {
            acc = this.applicationContext.getBeanFactory().getAccessControlContext();
        }

        // invokeAwareInterfaces() 方法就是处理那些个 XXXAware 接口重写方法
        if (acc != null) {
            AccessController.doPrivileged((PrivilegedAction<Object>) () -> {
                invokeAwareInterfaces(bean);
                return null;
            }, acc);
        }
        else {
            invokeAwareInterfaces(bean);
        }

        return bean;
    }
	// ...
}
```

下面是 `invokeAwareInterfaces()` 的源码：

```java
private void invokeAwareInterfaces(Object bean) {
    if (bean instanceof EnvironmentAware) {
        ((EnvironmentAware) bean).setEnvironment(this.applicationContext.getEnvironment());
    }
    if (bean instanceof EmbeddedValueResolverAware) {
        ((EmbeddedValueResolverAware) bean).setEmbeddedValueResolver(this.embeddedValueResolver);
    }
    if (bean instanceof ResourceLoaderAware) {
        ((ResourceLoaderAware) bean).setResourceLoader(this.applicationContext);
    }
    if (bean instanceof ApplicationEventPublisherAware) {
        ((ApplicationEventPublisherAware) bean).setApplicationEventPublisher(this.applicationContext);
    }
    if (bean instanceof MessageSourceAware) {
        ((MessageSourceAware) bean).setMessageSource(this.applicationContext);
    }
    if (bean instanceof ApplicationStartupAware) {
        ((ApplicationStartupAware) bean).setApplicationStartup(this.applicationContext.getApplicationStartup());
    }
    if (bean instanceof ApplicationContextAware) {
        ((ApplicationContextAware) bean).setApplicationContext(this.applicationContext);
    }
}
```

下面我们自己写一个栗子：

```java
public class Red implements ApplicationContextAware, BeanNameAware, EmbeddedValueResolverAware {

    private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("传入的 IOC：" + applicationContext);
        this.applicationContext = applicationContext;
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("当前 bean 的名字：" + name);
    }

    @Override
    public void setEmbeddedValueResolver(StringValueResolver resolver) {
        String s = resolver.resolveStringValue("你好${os.name}，我是#{4*5}");
        System.out.println("解析的字符串：" + s);
    }
}
```

测试代码为：

```java
void test(){
    AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
    Red red = applicationContext.getBean("red", Red.class);
    System.out.println(red);
}
```

输出结果为：

```
当前 bean 的名字：red
解析的字符串：你好Windows 10，我是20
传入的 IOC：org.springframework.context.annotation.AnnotationConfigApplicationContext@548ad73b, started on Sun Aug 22 16:21:06 CST 2021
com.ice.spring.entity.Red@4d154ccd
```

### 4.6 Profile

`Profile` 是 Spring 为我们提供的，可以根据当前环境，动态的激活和切换一系列组件的功能。

`@Profile` 指定组件在哪个环境情况下才能被注册到容器中，不指定，等价于 `@Profile("default")`，任何环境下都能注册这个组件。

> `@Profile` 注解可以写在类上和方法上。

> 一个配置文件中有的标注 @Profile 注解，有的没有，那么没有标注的 Bean 任何时候都会被加载。

例如下面的配置。不同环境注册不同的 Bean：

```java
@Configuration
public class Config {
    @Bean
    @Profile("test")
    public Cat cat() {
        return new Cat();
    }

    @Bean
    @Profile("dev")
    public Person person() {
        return new Person();
    }

    @Bean
    public Dog dog() {
        return new Dog();
    }
}
```

测试方法：

1. 使用命令行动态传递参数

   ```java
   @Test
   public void test() {
       AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(Config.class);
       String[] beanDefinitionNames = applicationContext.getBeanDefinitionNames();
       Arrays.stream(beanDefinitionNames).forEach(System.out::println);
   }
   ```

   执行前要设置虚拟机参数：`spring.profiles.active` 指定是哪个环境

2. 代码方式激活

   ```java
   void test() {
       AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext();
       applicationContext.getEnvironment().setActiveProfiles("dev");
       applicationContext.register(Config.class);
       applicationContext.refresh();
       String[] beanDefinitionNames = applicationContext.getBeanDefinitionNames();
       Arrays.stream(beanDefinitionNames).forEach(System.out::println);
   }
   ```

   