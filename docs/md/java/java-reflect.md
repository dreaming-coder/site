# Java 基础 - 反射机制

> JAVA 反射机制是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 Java 语言的反射机制。Java 反射机制在框架设计中极为广泛，需要深入理解。

## 1. 反射基础

RTTI（Run-Time Type Identification）运行时类型识别。在《Thinking in Java》一书第十四章中有提到，其作用是在运行时识别一个对象的类型和类的信息。主要有两种方式：一种是“传统的” RTTI，它假定我们在编译时已经知道了所有的类型；另一种是“反射”机制，它允许我们在运行时发现和使用类的信息。

> 反射就是把 Java 类中的各种成分映射成一个个的 Java 对象。

例如：一个类有：成员变量、方法、构造方法、包等等信息，利用反射技术可以对一个类进行解剖，把个个组成部分映射成一个个对象。

### 1.1 Class 类

`Class` 类是一个实实在在的类，存在于 JDK 的 java.lang 包中。`Class` 类的实例表示 Java 应用运行时的类 (class and enum) 或接口 (interface and annotation)（每个 Java 类运行时都在 JVM 里表现为一个 `Class` 对象，可通过`类名.class`、`类型.getClass()`、`Class.forName("类名")`等方法获取 `Class` 对象）。数组同样也被映射为 `Class` 对象的一个类，所有具有相同元素类型和维数的数组都共享该 `Class` 对象。基本类型 `boolean`，`byte`，`char`，`short`，`int`，`long`，`float`，`double` 和关键字 `void` 同样表现为 `Class`  对象。

```java
public final class Class<T> implements java.io.Serializable,
                              GenericDeclaration,
                              Type,
                              AnnotatedElement {
    private static final int ANNOTATION= 0x00002000;
    private static final int ENUM      = 0x00004000;
    private static final int SYNTHETIC = 0x00001000;

    private static native void registerNatives();
    static {
        registerNatives();
    }

    /*
     * Private constructor. Only the Java Virtual Machine creates Class objects.
     * This constructor is not used and prevents the default constructor being
     * generated.
     */
    private Class(ClassLoader loader) {
        // Initialize final field for classLoader.  The initialization value of non-null
        // prevents future JIT optimizations from assuming this final field is null.
        classLoader = loader;
    }
}
```

到这我们也就可以得出以下几点信息：

- `Class` 类也是类的一种，与 `class` 关键字是不一样的。
- 手动编写的类被编译后会产生一个 `Class` 对象，其表示的是创建的类的类型信息，而且这个 `Class` 对象保存在 `同名.class` 的文件中(字节码文件)。
- 每个通过关键字 `class` 标识的类，在内存中有且只有一个与之对应的 `Class` 对象来描述其类型信息，无论创建多少个实例对象，其依据的都是用一个 `Class` 对象。
- `Class` 类只存私有构造函数，因此对应 `Class` 对象只能有 JVM 创建和加载。
- `Class` 类的对象作用是运行时提供或获得某个对象的类型信息，这点对于反射技术很重要。

### 1.2 类加载

1. 类加载机制流程

![](/imgs/java/java-reflect-1.png)

2. 类的加载

![](/imgs/java/java-reflect-2.png)

## 2. 反射的使用

### 2.1 Class 类对象的获取

在类加载的时候，JVM 会创建一个 `Class` 对象。

`Class` 对象是可以说是反射中最常用的，获取 `Class `对象的方式的主要有三种：

- 根据类名：`类名.class`
- 根据对象：`对象.getClass()`
- 根据全限定类名：`Class.forName(全限定类名)`

 ```java
 public class Demo01 {
     public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
         User user = new User();
         System.out.println("根据类名:  \t\t" + User.class);
         System.out.println("根据对象:  \t\t" + user.getClass());
         System.out.println("根据全限定类名:\t" + Class.forName("com.ice.reflect.entity.User"));
         System.out.println("=====================================================");
         Class<User> userClass = User.class;
         System.out.println("获取全限定类名:\t" + userClass.getName());
         System.out.println("获取类名:\t\t" + userClass.getSimpleName());
         System.out.println("实例化:\t\t\t" + userClass.newInstance());
     }
 }
 ```

输出结果：

```
根据类名:  		class com.ice.reflect.entity.User
根据对象:  		class com.ice.reflect.entity.User
根据全限定类名:	class com.ice.reflect.entity.User
=====================================================
获取全限定类名:	com.ice.reflect.entity.User
获取类名:		User
实例化:			com.ice.reflect.entity.User@1b6d3586
```

- 再来看看 **Class 类的方法**

|        方法名         |                             说明                             |
| :-------------------: | :----------------------------------------------------------: |
|      `getName()`      |           取全限定的类名(包括包名)，即类的完整名字           |
|   `getSimpleName()`   |                     获取类名(不包括包名)                     |
| `getCanonicalName()`  |                  获取全限定的类名(包括包名)                  |
|    `isInterface()`    |             判断 `Class` 对象是否是表示一个接口              |
|   `getInterfaces()`   | 返回 `Class` 对象数组，表示 `Class` 对象所引用的类所实现的所有接口 |
|   `getSupercalss()`   | 返回 `Class` 对象，表示 `Class` 对象所引用的类所继承的直接基类<br />应用该方法可在运行时发现一个对象完整的继承结构 |
|    `newInstance()`    | 返回一个 `Oject` 对象，是实现“虚拟构造器”的一种途径<br />使用该方法创建的类，必须带有无参的构造器 |
|     `getFields()`     | 获得某个类的所有的公共（`public`）的字段，包括继承自父类的所有公共字段 <br />类似的还有`getMethods()` 和 `getConstructors()` |
| `getDeclaredFields()` | 获得某个类的自己声明的字段，即包括 `public`、`private` 和 `proteced`，默认不包括父类声明的任何字段<br />类似的还有 `getDeclaredMethods()` 和 `getDeclaredConstructors()` |

```java
package com.ice.reflect.demo;

import java.lang.reflect.Field;

interface I1 {
}

interface I2 {
}

class Cell {
    public int mCellPublic;
}

class Animal extends Cell {
    private int mAnimalPrivate;
    protected int mAnimalProtected;
    int mAnimalDefault;
    public int mAnimalPublic;
    private static int sAnimalPrivate;
    protected static int sAnimalProtected;
    static int sAnimalDefault;
    public static int sAnimalPublic;
}

class Dog extends Animal implements I1, I2 {
    private int mDogPrivate;
    public int mDogPublic;
    protected int mDogProtected;
    private int mDogDefault;
    private static int sDogPrivate;
    protected static int sDogProtected;
    static int sDogDefault;
    public static int sDogPublic;
}

public class Demo02 {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException {
        Class<Dog> dog = Dog.class;

        //类名打印
        System.out.println(dog.getName()); // com.ice.reflect.demo.Dog
        System.out.println(dog.getSimpleName()); // Dog
        System.out.println(dog.getCanonicalName());// com.ice.reflect.demo.Dog

        //接口
        System.out.println(dog.isInterface()); // false
        for (Class<?> iI : dog.getInterfaces()) {
            System.out.println(iI);
        }
         /*
          interface com.ice.reflect.demo.I1
            interface com.ice.reflect.demo.I2
         */

        //父类
        System.out.println(dog.getSuperclass()); // class com.ice.reflect.demo.Animal

        //创建对象
        Dog d = dog.newInstance();

        // 父类的父类的公共字段也打印出来了
        for (Field f : dog.getFields()) {
            System.out.println(f.getName());
        }
        /*
            mDogPublic
            sDogPublic
            mAnimalPublic
            sAnimalPublic
            mCellPublic
         */

        System.out.println("---------");

        // 只有自己类声明的字段
        for (Field f : dog.getDeclaredFields()) {
            System.out.println(f.getName());
        }
        /*
         mDogPrivate
         mDogPublic
         mDogProtected
         mDogDefault
         sDogPrivate
         sDogProtected
         sDogDefault
         sDogPublic
         */
    }
}
```

> **getName、getCanonicalName 与 getSimpleName 的区别**：
>
> - getSimpleName：只获取类名；
> - getName：类的全限定名，JVM 中 Class 的表示，可以用于动态加载 Class 对象，例如 Class.forName；
> - getCanonicalName：返回更容易理解的表示，主要用于输出（toString）或 log 打印，大多数情况下和 getName 一样，但是在内部类、数组等类型的表示形式就不同了。

```java
public class Demo03 {
    private static class Inner {
    }

    public static void main(String[] args) throws ClassNotFoundException {
        //普通类
        System.out.println(Demo03.class.getSimpleName()); // Demo03
        System.out.println(Demo03.class.getName()); // com.ice.reflect.demo.Demo03
        System.out.println(Demo03.class.getCanonicalName()); // com.ice.reflect.demo.Demo03

        //内部类
        System.out.println(Inner.class.getSimpleName()); // Inner
        System.out.println(Inner.class.getName()); // com.ice.reflect.demo.Demo03$Inner
        System.out.println(Inner.class.getCanonicalName()); // com.ice.reflect.demo.Demo03$Inner

        //数组
        System.out.println(args.getClass().getSimpleName()); // String[]
        System.out.println(args.getClass().getName()); // [Ljava.lang.String;
        System.out.println(args.getClass().getCanonicalName()); // java.lang.String[]

        // 我们不能用getCanonicalName去加载类对象，必须用getName
        // Class.forName(Inner.class.getCanonicalName()); //报错
        Class.forName(Inner.class.getName());
    }
}
```

### 2.2 Constructor 类及其用法

> `Constructor` 类存在于反射包 (java.lang.reflect) 中，反映的是 `Class` 对象所表示的类的构造方法。

获取 `Constructor` 对象是通过 `Class` 类中的方法获取的，`Class` 类与 `Constructor` 相关的主要方法如下：

|     方法返回值     |                        方法名                        |                           方法说明                           |
| :----------------: | :--------------------------------------------------: | :----------------------------------------------------------: |
|     `Class<?>`     |          `Class.forName(String className)`           |   返回与带有给定字符串名的类或接口相关联的 `Class` 对象。    |
|   `Constructor`    |     `getConstructor(Class<?>... parameterTypes)`     |    返回指定参数类型、具有 `public` 访问权限的构造函数对象    |
| `Constructor<?>[]` |                 `getConstructors()`                  | 返回所有具有 `public` 访问权限的构造函数的 `Constructor` 对象数组 |
|   `Constructor`    | `getDeclaredConstructor(Class<?>... parameterTypes)` |  返回指定参数类型、所有声明的（包括 `private`）构造函数对象  |
| `Constructor<?>[]` |             `getDeclaredConstructors()`              |         返回所有声明的（包括 `private`）构造函数对象         |
|        `T`         |                   `newInstance()`                    |   调用无参构造器创建此 `Class` 对象所表示的类的一个新实例    |

下面看一个简单例子来了解 `Constructor` 对象的使用：

```java
package com.ice.reflect.demo;

import com.ice.reflect.entity.User;

import java.io.Serializable;
import java.lang.reflect.Constructor;

public class ConstructionTest implements Serializable {
    public static void main(String[] args) throws Exception {

        Class<?> clazz;

        // 获取Class对象的引用
        clazz = Class.forName("com.ice.reflect.entity.User");

        // 第一种方法，实例化默认构造方法，User必须无参构造函数,否则将抛异常
        User user = (User) clazz.newInstance();
        user.setAge(20);
        user.setName("Jack");
        System.out.println(user);

        System.out.println("--------------------------------------------");

        // 获取带String参数的public构造函数
        Constructor<?> cs1 = clazz.getConstructor(String.class);
        // 创建User
        User user1 = (User) cs1.newInstance("瑞雯");
        user1.setAge(22);
        System.out.println("user1:" + user1.toString());

        System.out.println("--------------------------------------------");

        // 取得指定带int和String参数构造函数,该方法是私有构造private
        Constructor<?> cs2 = clazz.getDeclaredConstructor(String.class, int.class);
        // 由于是private必须设置可访问
        cs2.setAccessible(true);
        // 创建user对象
        User user2 = (User) cs2.newInstance("劫", 21);
        System.out.println("user2:" + user2);

        System.out.println("--------------------------------------------");

        //获取所有构造包含private
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        // 查看每个构造方法需要的参数
        for (int i = 0; i < constructors.length; i++) {
            //获取构造函数参数类型
            Class<?>[] clazzs = constructors[i].getParameterTypes();
            System.out.println("构造函数[" + i + "]:" + constructors[i].toString());
            System.out.print("参数类型[" + i + "]:(");
            for (int j = 0; j < clazzs.length; j++) {
                if (j == clazzs.length - 1)
                    System.out.print(clazzs[j].getName());
                else
                    System.out.print(clazzs[j].getName() + ",");
            }
            System.out.println(")");
        }
    }
}
```

输出结果：

```
User{name='Jack', age=20}
--------------------------------------------
user1:User{name='瑞雯', age=22}
--------------------------------------------
user2:User{name='劫', age=21}
--------------------------------------------
构造函数[0]:private com.ice.reflect.entity.User(java.lang.String,int)
参数类型[0]:(java.lang.String,int)
构造函数[1]:public com.ice.reflect.entity.User(java.lang.String)
参数类型[1]:(java.lang.String)
构造函数[2]:public com.ice.reflect.entity.User()
参数类型[2]:()
```

关于 **Constructor 类本身一些常用方法**如下(仅部分，其他可查 API)

|  方法返回值  |             方法名称              |                           方法说明                           |
| :----------: | :-------------------------------: | :----------------------------------------------------------: |
|   `Class`    |       `getDeclaringClass()`       | 返回 `Class` 对象，该对象表示声明由此 `Constructor` 对象表示的构造方法的类，其实就是返回真实类型（不包含参数） |
|   `Type[]`   |   `getGenericParameterTypes()`    | 按照声明顺序返回一组 `Type` 对象，返回的就是 `Constructor` 对象构造函数的形参类型，显示更友好 |
|   `String`   |            `getName()`            |               以字符串形式返回此构造方法的名称               |
| `Class<?>[]` |       `getParameterTypes()`       | 按照声明顺序返回一组 `Class` 对象，即返回 `Constructor` 对象所表示构造方法的形参类型 |
|     `T`      | `newInstance(Object... initargs)` |     使用此 `Constructor` 对象表示的构造函数来创建新实例      |
|   `String`   |        `toGenericString()`        |     返回描述此 `Constructor` 的字符串，其中包括类型参数      |

### 2.3 Field 类及其用法

> `Field` 提供有关类或接口的单个字段的信息，以及对它的动态访问权限。反射的字段可能是一个类（静态）字段或实例字段。

同样的道理，我们可以通过 `Class` 类的提供的方法来获取代表字段信息的 `Field` 对象，`Class` 类与 `Field` 对象相关方法如下：

| 方法返回值 |            方法名称             |                           方法说明                           |
| :--------: | :-----------------------------: | :----------------------------------------------------------: |
|  `Field`   | `getDeclaredField(String name)` | 获取指定 name 名称的(包含 `private` 修饰的)字段，不包括继承的字段 |
| `Field[]`  |      `getDeclaredFields()`      | 获取 `Class` 对象所表示的类或接口的所有(包含 `private` 修饰的)字段，不包括继承的字段 |
|  `Field`   |     `getField(String name)`     |  获取指定 name 名称、具有 `public` 修饰的字段，包含继承字段  |
| `Field[]`  |          `getFields()`          |          获取修饰符为 `public` 的字段，包含继承字段          |

下面的代码演示了上述方法的使用过程：

```java
package com.ice.reflect.demo;

import java.lang.reflect.Field;

public class FieldTest {

    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException {
        Class<?> clazz = Class.forName("com.ice.reflect.demo.Student");
        // 获取指定字段名称的Field类,注意字段修饰符必须为public而且存在该字段,
        // 否则抛NoSuchFieldException
        Field field = clazz.getField("age");
        System.out.println("【field】: " + field);

        // 获取所有修饰符为public的字段,包含父类字段,注意修饰符为public才会获取
        Field[] fields = clazz.getFields();
        for (Field f : fields) {
            System.out.println("【public field】:" + f.getDeclaringClass());
        }

        System.out.println("================getDeclaredFields====================");
        // 获取当前类所字段(包含private字段),注意不包含父类的字段
        Field[] fields2 = clazz.getDeclaredFields();
        for (Field f : fields2) {
            System.out.println("【public or private field】:" + f.getDeclaringClass());
        }
        // 获取指定字段名称的Field类,可以是任意修饰符的字段,注意不包含父类的字段
        Field field2 = clazz.getDeclaredField("desc");
        System.out.println("【field】: " + field2);
    }
}

class Person {
    public int age;
    public String name;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

class Student extends Person {
    public String desc;
    private int score;

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
```

输出结果：

```
【field】: public int com.ice.reflect.demo.Person.age
【public field】:class com.ice.reflect.demo.Student
【public field】:class com.ice.reflect.demo.Person
【public field】:class com.ice.reflect.demo.Person
================getDeclaredFields====================
【public or private field】:class com.ice.reflect.demo.Student
【public or private field】:class com.ice.reflect.demo.Student
【field】: public java.lang.String com.ice.reflect.demo.Student.desc
```

上述方法需要注意的是，如果我们不期望获取其父类的字段，则需使用 `Class` 类的 `getDeclaredField()`/`getDeclaredFields()` 方法来获取字段即可，倘若需要连带获取到父类的字段，那么请使用 `Class` 类的 `getField()`/`getFields()`，但是也只能获取到 `public` 修饰的的字段，无法获取父类的私有字段。下面将通过 `Field` 类本身的方法对指定类属性赋值，代码演示如下：

```java
Class<?> clazz = Class.forName("com.ice.reflect.demo.Student");
Student st = (Student) clazz.newInstance();

//获取父类public字段并赋值
Field ageField = clazz.getField("age");
ageField.set(st, 18);
Field nameField = clazz.getField("name");
nameField.set(st, "Lily");

//只获取当前类的字段,不获取父类的字段
Field descField = clazz.getDeclaredField("desc");
descField.set(st, "I am student");
Field scoreField = clazz.getDeclaredField("score");
//设置可访问，score是private的
scoreField.setAccessible(true);
scoreField.set(st, 88);
System.out.println(st); // Student{desc='I am student', score=88, age=18, name='Lily'}

//获取字段值
System.out.println(scoreField.get(st)); // 88
```

其中的 `set(Object obj, Object value)` 方法是 `Field` 类本身的方法，用于设置字段的值，而 `get(Object obj)` 则是获取字段的值，当然关于 `Field` 类还有其他常用的方法如下：

| 方法返回值 |            方法名称             |                           方法说明                           |
| :--------: | :-----------------------------: | :----------------------------------------------------------: |
|   `void`   | `set(Object obj, Object value)` |  将指定对象变量上此 `Field` 对象表示的字段设置为指定的新值   |
|  `Object`  |        `get(Object obj)`        |           返回指定对象上此 `Field` 表示的字段的值            |
| `Class<?>` |           `getType()`           | 返回一个 `Class` 对象，它标识了此 `Field` 对象所表示字段的声明类型 |
| `boolean`  |       `isEnumConstant()`        | 如果此字段表示枚举类型的元素则返回 `true`；否则返回 `false`  |
|  `String`  |       `toGenericString()`       |       返回一个描述此 `Field`（包括其一般类型）的字符串       |
|  `String`  |           `getName()`           |             返回此 `Field` 对象表示的字段的名称              |
| `Class<?>` |      `getDeclaringClass()`      | 返回表示类或接口的 `Class` 对象，该类或接口声明由此 `Field` 对象表示的字段 |
|   `void`   |  `setAccessible(boolean flag)`  | 将此对象的 `accessible` 标志设置为指示的布尔值,即设置其可访问性 |

上述方法可能是较为常用的，事实上在设置值的方法上，`Field` 类还提供了专门针对基本数据类型的方法，如 `setInt()/getInt()`、`setBoolean()/getBoolean`、`setChar()/getChar()` 等等方法，这里就不全部列出了，需要时查 API 文档即可。需要特别注意的是被 `final` 关键字修饰的 `Field` 字段是安全的，**在运行时可以接收任何修改，但最终其实际值是不会发生改变的**。

### 2.4 Method 类及其用法

> `Method` 提供关于类或接口上单独某个方法（以及如何访问该方法）的信息，所反映的方法可能是类方法或实例方法（包括抽象方法）。

下面是 `Class` 类获取 `Method` 对象相关的方法：

| 方法返回值 |                           方法名称                           |                           方法说明                           |
| :--------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  `Method`  | `getDeclaredMethod(String name, Class<?>... parameterTypes)` | 返回一个指定参数的 `Method` 对象，该对象反映此 `Class` 对象所表示的类或接口的指定已声明方法 |
| `Method[]` |                    `getDeclaredMethods()`                    | 返回 `Method` 对象的一个数组，这些对象反映此 `Class` 对象表示的类或接口声明的所有方法，包括公共、保护、默认（包）访问和私有方法，但不包括继承的方法 |
|  `Method`  |     `getMethod(String name, Class<?>... parameterTypes)`     | 返回一个 `Method` 对象，它反映此 `Class` 对象所表示的类或接口的指定公共成员方法 |
| `Method[]` |                        `getMethods()`                        | 返回一个包含某些 `Method` 对象的数组，这些对象反映此 `Class` 对象所表示的类或接口（包括那些由该类或接口声明的以及从超类和超接口继承的那些的类或接口）的公共 member 方法 |

同样通过案例演示上述方法：

```java
package com.ice.reflect.demo;

import java.lang.reflect.Method;

public class MethodTest {


    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {

        Class<?> clazz = Class.forName("com.ice.reflect.demo.Circle");

        // 根据参数获取public的Method,包含继承自父类的方法
        Method method = clazz.getMethod("draw", int.class, String.class);

        System.out.println("method:" + method);

        // 获取所有public的方法:
        Method[] methods = clazz.getMethods();
        for (Method m : methods) {
            System.out.println("m::" + m);
        }

        System.out.println("=========================================");

        // 获取当前类的方法包含private,该方法无法获取继承自父类的method
        Method method1 = clazz.getDeclaredMethod("drawCircle");
        System.out.println("method1::" + method1);
        // 获取当前类的所有方法包含private,该方法无法获取继承自父类的method
        Method[] methods1 = clazz.getDeclaredMethods();
        for (Method m : methods1) {
            System.out.println("m1::" + m);
        }
    }
}

class Shape {
    public void draw() {
        System.out.println("draw");
    }

    public void draw(int count, String name) {
        System.out.println("draw " + name + ",count=" + count);
    }

}

class Circle extends Shape {

    private void drawCircle() {
        System.out.println("drawCircle");
    }

    public int getAllCount() {
        return 100;
    }
}
```

输出结果：

```
method:public void com.ice.reflect.demo.Shape.draw(int,java.lang.String)
m::public int com.ice.reflect.demo.Circle.getAllCount()
m::public void com.ice.reflect.demo.Shape.draw()
m::public void com.ice.reflect.demo.Shape.draw(int,java.lang.String)
m::public final void java.lang.Object.wait() throws java.lang.InterruptedException
m::public final void java.lang.Object.wait(long,int) throws java.lang.InterruptedException
m::public final native void java.lang.Object.wait(long) throws java.lang.InterruptedException
m::public boolean java.lang.Object.equals(java.lang.Object)
m::public java.lang.String java.lang.Object.toString()
m::public native int java.lang.Object.hashCode()
m::public final native java.lang.Class java.lang.Object.getClass()
m::public final native void java.lang.Object.notify()
m::public final native void java.lang.Object.notifyAll()
=========================================
method1::private void com.ice.reflect.demo.Circle.drawCircle()
m1::public int com.ice.reflect.demo.Circle.getAllCount()
m1::private void com.ice.reflect.demo.Circle.drawCircle()
```

在通过 `getMethods()` 方法获取 `Method` 对象时，会把父类的方法也获取到，如上的输出结果，把 `Object` 类的方法都打印出来了。而 `getDeclaredMethod()/getDeclaredMethods()` 方法都只能获取当前类的方法。我们在使用时根据情况选择即可。下面将演示通过 `Method` 对象调用指定类的方法：

```java
Class<?> clazz = Class.forName("com.ice.reflect.demo.Circle");

//创建对象
Circle circle = (Circle) clazz.newInstance();

//获取指定参数的方法对象Method
Method draw = clazz.getMethod("draw",int.class,String.class);

//通过Method对象的invoke(Object obj,Object... args)方法调用
draw.invoke(circle,15,"圈圈");

//对私有无参方法的操作
Method drawCircle = clazz.getDeclaredMethod("drawCircle");
//修改私有方法的访问标识
drawCircle.setAccessible(true);
drawCircle.invoke(circle);

//对有返回值得方法操作
Method getAllCount =clazz.getDeclaredMethod("getAllCount");
Integer count = (Integer) getAllCount.invoke(circle);
System.out.println("count:"+count);
```

输出结果：

```
draw 圈圈,count=15
drawCircle
count:100
```

在上述代码中调用方法，使用了 `Method` 类的 `invoke(Object obj,Object... args)` 第一个参数代表调用的对象，第二个参数传递的调用方法的参数。这样就完成了类方法的动态调用。

|  方法返回值  |               方法名称               |                           方法说明                           |
| :----------: | :----------------------------------: | :----------------------------------------------------------: |
|   `Object`   | `invoke(Object obj, Object... args)` | 对带有指定参数的指定对象调用由此 `Method` 对象表示的底层方法 |
|  `Class<?>`  |          `getReturnType()`           | 返回一个 `Class` 对象，该对象描述了此 `Method` 对象所表示的方法的正式返回类型,即方法的返回类型 |
|    `Type`    |       `getGenericReturnType()`       | 返回表示由此 `Method` 对象所表示方法的正式返回类型的 `Type` 对象，也是方法的返回类型。 |
| `Class<?>[]` |        `getParameterTypes()`         | 按照声明顺序返回 `Class` 对象的数组，这些对象描述了此 `Method` 对象所表示的方法的形参类型，即返回方法的参数类型组成的数组 |
|   `Type[]`   |     `getGenericParameterTypes()`     | 按照声明顺序返回 `Type` 对象的数组，这些对象描述了此 `Method` 对象所表示的方法的形参类型的，也是返回方法的参数类型 |
|   `String`   |             `getName()`              | 以 `String` 形式返回此 `Method` 对象表示的方法名称，即返回方法的名称 |
|  `boolean`   |            `isVarArgs()`             | 判断方法是否带可变参数，如果将此方法声明为带有可变数量的参数，则返回 `true`；否则，返回 `false` |
|   `String`   |         `toGenericString()`          |          返回描述此 `Method` 的字符串，包括类型参数          |

`getReturnType()/getGenericReturnType()`都是获取 `Method` 对象表示的方法的返回类型，只不过前者返回的 `Class` 类型后者返回的 `Type` (前面已分析过)，`Type` 就是一个接口而已，在 Java 8 中新增一个默认的方法实现，返回的就参数类型信息

```java
public interface Type {
    // 1.8 新增
    default String getTypeName() {
        return toString();
    }
}
```

而 `getParameterTypes()` / `getGenericParameterTypes()` 也是同样的道理，都是获取 `Method` 对象所表示的方法的参数类型，其他方法与前面的 `Field` 和 `Constructor` 是类似的。