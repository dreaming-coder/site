# 开发工具 - Maven 详解

## 1. Maven 核心概念

### 1.1 坐标

Maven 中的坐标主要利用 3 个属性来唯一定位一个 jar 包

- `groupId`：公司或组织的 id，通常是公司或组织域名的倒序，如 `com.atguigu.mave`
- `artifactId`：一个项目或者是项目中的一个模块的 id，将来作为 Maven 工程的工程名
- `version`：版本号

:::tip

坐标和仓库中 jar 包的存储路径之间的对应关系：

```xml
  <groupId>javax.servlet</groupId>
  <artifactId>servlet-api</artifactId>
  <version>2.5</version>
```

上面坐标对应的 jar 包在 Maven 本地仓库中的位置：

```
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
```

:::

### 1.2 POM

POM：**P**roject **O**bject **M**odel，项目对象模型。

POM 表示将工程抽象为一个模型，再用程序中的对象来描述这个模型。这样我们就可以用程序来管理项目了。我们在开发过程中，最基本的做法就是将现实生活中的事物抽象为模型，然后封装模型相关的数据作为一个对象，这样就可以在程序中计算与现实事物相关的数据。

POM 理念集中体现在 Maven 工程根目录下 **pom.xml** 这个配置文件中。所以这个 **pom.xml** 配置文件就是 Maven 工程的核心配置文件。其实学习 Maven 就是学这个文件怎么配置，各个配置有什么用。

### 1.3 目录结构

```
project
   ├── src
   |	├── main
   |	|     ├── java （Java 源代码目录）
   |	|     └── resources （资源目录）
   |    └── test
   |          ├── java （Java 测试代码目录）
   |	      └── resources （测试资源目录）
   └── target （存放构建生成结果的目录）     
```

:::tip

**约定大于配置**，上述给定的目录是默认结构，虽然可以通过 **pom.xml** 进行默认目录的修改，但是不推荐。

:::

## 2. POM 详解

### 2.1 根元素和必要配置

```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
    http://maven.apache.org/xsd/maven-4.0.0.xsd">
 
    <!-- POM 版本 -->
    <modelVersion>4.0.0</modelVersion>
    
    <!-- 公司或者组织的唯一标志，也是打包成jar包路径的依据 -->
    <!-- 例如com.companyname.project-group，maven打包jar包的路径：/com/companyname/project-group -->
    <groupId>com.companyname.project-group</groupId>
 
    <!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
    <artifactId>project</artifactId>
 
    <!-- 项目当前版本，格式为:主版本.次版本.增量版本-限定版本号 -->
    <version>1.0</version>
 
    <!--项目产生的构件类型，包括jar、war、ear、pom等 -->
    <packaging>jar</packaging>
</project>
```

`project` 是pom文件的根元素，`project` 下有 `modelVersion`、`groupId`、`artifactId`、`version`、`packaging` 等重要的元素。其中，`groupId`、`artifactId`、`version` 三个元素用来定义一个项目的坐标，也就是说，一个 Maven 仓库中，完全相同的一组 `groupId`、`artifactId`、`version`，只能有一个项目。

- `project`：整个 POM 配置文件的根元素，所有的配置都是写在 `project` 元素里面的
- `modelVersion`：指定了当前 POM 模型的版本，对于 Maven 2 及 Maven 3 来说，它只能是4.0.0
- `groupId`：这是项目组的标识。它在一个组织或者项目中通常是唯一的
- `artifactId`：这是项目的标识，通常是工程的名称。它在一个项目组（group）下是唯一的
- `version`：这是项目的版本号，用来区分同一个 artifact 的不同版本
- `packaging`：这是项目产生的构件类型，即项目通过 Maven 打包的输出文件的后缀名，包括 `jar`、`war`、`ear`、`pom` 等

### 2.2 父项目和 parent 元素

```xml
    <!--父项目的坐标，坐标包括group ID，artifact ID和version。 -->
    <!--如果项目中没有规定某个元素的值，那么父项目中的对应值即为项目的默认值 -->
    <parent>
 
        <!--被继承的父项目的构件标识符 -->
        <artifactId>com.companyname.project-group</artifactId>
        <!--被继承的父项目的全球唯一标识符 -->
        <groupId>base-project</groupId>
        <!--被继承的父项目的版本 -->
        <version>1.0.1-RELEASE</version>
 
        <!-- 父项目的pom.xml文件的相对路径,默认值是../pom.xml。 -->
        <!-- 寻找父项目的pom：构建当前项目的地方--)relativePath指定的位置--)本地仓库--)远程仓库 -->
        <relativePath>../pom.xml</relativePath>
    </parent>
```

所有的 POM 都继承自一个父 POM（Super POM）。父 POM 包含了一些可以被继承的默认设置，如果项目的 POM 中没有设置这些元素，就会使用父 POM 中设置。例如，Super POM 中配置了默认仓库 `http://repo1.maven.org/maven2`，这样哪怕项目的 POM 中没有配置仓库，也可以去这个默认仓库中去下载依赖。实际上，Maven POM 文件约定大于配置的原则，就是通过在 Super POM 中预定义了一些配置信息来实现的。

Maven 使用 effective POM（Super pom加上工程自己的配置）来执行相关的目标，它帮助开发者在 `pom.xml` 中做尽可能少的配置。当然，这些配置也可以被重写。

`parent` 元素可以指定父 POM。用户可以通过增加 `parent` 元素来自定义一个父 POM，从而继承该 POM 的配置。`parent` 元素中包含一些子元素，用来定位父项目和父项目的 POM 文件位置。

- `parent`：用于指定父项目
- `groupId`：`parent` 的子元素，父项目的 `groupId`，用于定位父项目
- `artifactId`：`parent` 的子元素，父项目的 `artifactId`，用于定位父项目
- `version`：`parent` 的子元素，父项目的 `version`，用于定位父项目
- `relativePath`：`parent` 的子元素，用于定位父项目 POM 文件的位置

### 2.3 项目构建需要的信息

> `build` 标签定义了构建项目需要的信息，这部分信息对于定制化项目构建是非常重要的。这里会根据 `build` 的子元素的特点，简单地分类讲解。

#### 2.3.1 路径管理

```xml
       <!--------------------- 路径管理（在遵循约定大于配置原则下，不需要配置） --------------------->
        <!--项目源码目录，当构建项目的时候，构建系统会编译目录里的源码。该路径是相对于pom.xml的相对路径。 -->
        <sourceDirectory />
        <!--该元素设置了项目单元测试使用的源码目录。该路径是相对于pom.xml的相对路径 -->
        <testSourceDirectory />
        <!--被编译过的应用程序class文件存放的目录。 -->
        <outputDirectory />
        <!--被编译过的测试class文件存放的目录。 -->
        <testOutputDirectory />        
        <!--项目脚本源码目录，该目录下的内容，会直接被拷贝到输出目录，因为脚本是被解释的，而不是被编译的 -->
        <scriptSourceDirectory />
```

#### 2.3.2 资源管理

```xml
        <!--------------------- 资源管理 --------------------->
        <!--这个元素描述了项目相关的所有资源路径列表，例如和项目相关的属性文件，这些资源被包含在最终的打包文件里。 -->
        <resources>
            <!--这个元素描述了项目相关或测试相关的所有资源路径 -->
            <resource>
                <!-- 描述了资源的目标输出路径。该路径是相对于target/classes的路径 -->
                <!-- 如果是想要把资源直接放在target/classes下，不需要配置该元素 -->
                <targetPath />
                <!--是否使用参数值代替参数名。参数值取自文件里配置的属性，文件在filters元素里列出 -->
                <filtering />
                <!--描述打包前的资源存放的目录，该路径相对POM路径 -->
                <directory />
                <!--包含的模式列表，例如**/*.xml，只有符合条件的资源文件才会在打包的时候被放入到输出路径中 -->
                <includes />
                <!--排除的模式列表，例如**/*.xml，符合的资源文件不会在打包的时候会被过滤掉 -->
                <excludes />
            </resource>
        </resources>
        <!--这个元素描述了单元测试相关的所有资源路径，例如和单元测试相关的属性文件。 -->
        <testResources>
            <!--这个元素描述了测试相关的所有资源路径，子元素说明参考build/resources/resource元素的说明 -->
            <testResource>
                <targetPath />
                <filtering />
                <directory />
                <includes />
                <excludes />
            </testResource>
        </testResources>
```

#### 2.3.3 插件管理

插件管理相关的元素有两个，包括 `pluginManagement` 和 `plugins`。`pluginManagement` 中有子元素 `plugins`，它和 `project` 下的直接子元素 `plugins` 的区别是，`pluginManagement` 主要是用来声明子项目可以引用的默认插件信息，这些插件如果只写在 `pluginManagement` 中是不会被引入的。`project` 下的直接子元素 `plugins` 中定义的才是这个项目中真正需要被引入的插件。

```xml
        <!--------------------- 插件管理 --------------------->
        <!-- 子项目可以引用的默认插件信息。pluginManagement中的插件直到被引用时才会被解析或绑定到生命周期 -->
        <!-- 这里只是做了声明，并没有真正的引入。给定插件的任何本地配置都会覆盖这里的配置-->
        <pluginManagement>
            <!-- 可使用的插件列表 -->
            <plugins>
                <!--plugin元素包含描述插件所需要的信息。 -->
                <plugin>
                    <!--插件定位坐标三元素：groupId + artifactId + version -->
                    <groupId />
                    <artifactId />
                    <version />
                    <!-- 是否使用这个插件的Maven扩展(extensions)，默认为false -->
                    <!-- 由于性能原因，只有在真需要下载时，该元素才被设置成enabled -->
                    <extensions />
                    <!--在构建生命周期中执行一组目标的配置。每个目标可能有不同的配置。 -->
                    <executions>
                        <!--execution元素包含了插件执行需要的信息 -->
                        <execution>
                            <!--执行目标的标识符，用于标识构建过程中的目标，或者匹配继承过程中需要合并的执行目标 -->
                            <id />
                            <!--绑定了目标的构建生命周期阶段，如果省略，目标会被绑定到源数据里配置的默认阶段 -->
                            <phase />
                            <!--配置的执行目标 -->
                            <goals />
                            <!--配置是否被传播到子POM -->
                            <inherited />
                            <!--作为DOM对象的配置 -->
                            <configuration />
                        </execution>
                    </executions>
                    <!--项目引入插件所需要的额外依赖，参见dependencies元素 -->
                    <dependencies>
                            ......
                    </dependencies>
                    <!--任何配置是否被传播到子项目 -->
                    <inherited />
                    <!--作为DOM对象的配置 -->
                    <configuration />
                </plugin>
            </plugins>
        </pluginManagement>
        <!--使用的插件列表，这里是真正的引入插件。参见build/pluginManagement/plugins元素 -->
        <plugins>
            ......
        </plugins>
```

#### 2.3.4 构建扩展

`extensions` 是在此构建中使用的项目的列表，它们将被包含在运行构建的 `classpath` 中。这些项目可以启用对构建过程的扩展，并使活动的插件能够对构建生命周期进行更改。简而言之，扩展是在构建期间激活的 `artifacts`。扩展不需要实际执行任何操作，也不包含 Mojo。因此，扩展对于指定普通插件接口的多个实现中的一个是非常好的。

```xml
        <!--------------------- 构建扩展 --------------------->
        <!--使用来自其他项目的一系列构建扩展 -->
        <extensions>
            <!--每个extension描述一个会使用到其构建扩展的一个项目，extension的子元素是项目的坐标 -->
            <extension>
                <!--项目坐标三元素：groupId + artifactId + version -->
                <groupId />
                <artifactId />
                <version />
            </extension>
        </extensions>
```

#### 2.3.5 其他配置

```xml
        <!--------------------- 其他配置 --------------------->
        <!--当项目没有规定目标（Maven2 叫做阶段）时的默认值 -->
        <defaultGoal />
        <!--构建产生的所有文件存放的目录 -->
        <directory />
        <!--产生的构件的文件名，默认值是${artifactId}-${version}。 -->
        <finalName />
        <!--当filtering开关打开时，使用到的过滤器属性文件列表 -->
        <filters />
```

### 2.4 项目依赖相关信息

POM 文件中通过 `dependencyManagement` 来声明依赖，通过 `dependencies` 元素来管理依赖。`dependencyManagement` 下的子元素只有一个直接的子元素 `dependencice`，其配置和 `dependencies` 子元素是完全一致的；而 `dependencies` 下只有一类直接的子元素：`dependency`。一个 `dependency` 子元素表示一个依赖项目。

```xml
    <!--该元素描述了项目相关的所有依赖。 这些依赖自动从项目定义的仓库中下载 -->
    <dependencies>
        <dependency>
            <!------------------- 依赖坐标 ------------------->
            <!--依赖项目的坐标三元素：groupId + artifactId + version -->
            <groupId>org.apache.maven</groupId>
            <artifactId>maven-artifact</artifactId>
            <version>3.8.1</version>
 
            <!------------------- 依赖类型 ------------------->
            <!-- 依赖类型，默认是jar。通常表示依赖文件的扩展名，但有例外。一个类型可以被映射成另外一个扩展名或分类器 -->
            <!-- 类型经常和使用的打包方式对应，尽管这也有例外，一些类型的例子：jar，war，ejb-client和test-jar -->
            <!-- 如果设置extensions为true，就可以在plugin里定义新的类型 -->
            <type>jar</type>
            <!-- 依赖的分类器。分类器可以区分属于同一个POM，但不同构建方式的构件。分类器名被附加到文件名的版本号后面 -->
            <!-- 如果想将项目构建成两个单独的JAR，分别使用Java 4和6编译器，就可以使用分类器来生成两个单独的JAR构件 -->
            <classifier></classifier>
 
            <!------------------- 依赖传递 ------------------->
            <!--依赖排除，即告诉maven只依赖指定的项目，不依赖该项目的这些依赖。此元素主要用于解决版本冲突问题 -->
            <exclusions>
                <exclusion>
                    <artifactId>spring-core</artifactId>
                    <groupId>org.springframework</groupId>
                </exclusion>
            </exclusions>
            <!-- 可选依赖，用于阻断依赖的传递性。如果在项目B中把C依赖声明为可选，那么依赖B的项目中无法使用C依赖 -->
            <optional>true</optional>
            
            <!------------------- 依赖范围 ------------------->
            <!--依赖范围。在项目发布过程中，帮助决定哪些构件被包括进来
                - compile：默认范围，用于编译;  - provided：类似于编译，但支持jdk或者容器提供，类似于classpath 
                - runtime: 在执行时需要使用;   - systemPath: 仅用于范围为system。提供相应的路径 
                - test: 用于test任务时使用;    - system: 需要外在提供相应的元素。通过systemPath来取得 
                - optional: 当项目自身被依赖时，标注依赖是否传递。用于连续依赖时使用 -->
            <scope>test</scope>
            <!-- 该元素为依赖规定了文件系统上的路径。仅供scope设置system时使用。但是不推荐使用这个元素 -->
            <!-- 不推荐使用绝对路径，如果必须要用，推荐使用属性匹配绝对路径，例如${java.home} -->
            <systemPath></systemPath>
        </dependency>
    </dependencies>
 
    <!-- 继承自该项目的所有子项目的默认依赖信息，这部分的依赖信息不会被立即解析。 -->
    <!-- 当子项目声明一个依赖，如果group ID和artifact ID以外的一些信息没有描述，则使用这里的依赖信息 -->
    <dependencyManagement>
        <dependencies>
            <!--参见dependencies/dependency元素 -->
            <dependency>
                ......
            </dependency>
        </dependencies>
    </dependencyManagement>
```

### 2.5 生成文档相关的元素

```xml
    <!--项目的名称, Maven生成文档使用 -->
    <name>project-maven</name>
 
    <!--项目主页的URL, Maven生成文档使用 -->
    <url>http://123.a.b/nsnxs</url>
 
    <!-- 项目的详细描述, Maven生成文档使用。当这个元素能够用HTML格式描述时，不鼓励使用纯文本描述 -->
    <!--如果你需要修改生成的web站点的索引页面，你应该修改你自己的索引页文件，而不是调整这里的文档 -->
    <description>Description of this maven project</description>
```

> Maven 可以通过 `mvn site` 命令生成项目的相关文档。

### 2.6 远程仓库列表

远程仓库列表的配置，包括依赖和扩展的远程仓库配置，以及插件的远程仓库配置。在本地仓库找不到的情况下，Maven 下载依赖、扩展和插件就是从这里配置的远程仓库中进行下载。

需要注意的是 release 和 snapshot 两者的区别。release 是稳定版本，一经发布不再修改，想发布修改后的项目，只能升级项目版本再进行发布；snapshot 是不稳定的，一个 snapshot 的版本可以不断改变。项目在开发期间一般会使用 snapshot，更方便进行频繁的代码更新；一旦发布到外部，或者开发基本完成，代码迭代不再频繁，则推荐使用 release。
```xml
    <!--发现依赖和扩展的远程仓库列表。 -->
    <repositories>
        <!--包含需要连接到远程仓库的信息 -->
        <repository>
            <!--如何处理远程仓库里发布版本的下载 -->
            <releases>
                <!--值为true或者false，表示该仓库是否为下载某种类型构件（发布版，快照版）开启。 -->
                <enabled />
                <!--该元素指定更新发生的频率。Maven会比较本地POM和远程POM的时间戳 -->
                <!--选项：always，daily（默认），interval：X（X单位为分钟），或者never。 -->
                <updatePolicy />
                <!--当Maven验证构件校验文件失败时该怎么做。选项：ignore，fail，或者warn -->
                <checksumPolicy />
            </releases>
            <!-- 如何处理远程仓库里快照版本的下载 -->
            <!-- 有了releases和snapshots这两组配置，就可以在每个单独的仓库中，为每种类型的构件采取不同的策略 -->
            <snapshots>
                <enabled />
                <updatePolicy />
                <checksumPolicy />
            </snapshots>
 
            <!--远程仓库唯一标识符。可以用来匹配在settings.xml文件里配置的远程仓库 -->
            <id>nanxs-repository-proxy</id>
            <!--远程仓库名称 -->
            <name>nanxs-repository-proxy</name>
            <!--远程仓库URL，按protocol://hostname/path形式 -->
            <url>http://192.168.1.169:9999/repository/</url>
            <!-- 用于定位和排序构件的仓库布局类型。可以是default或者legacy -->
            <layout>default</layout>
        </repository>
    </repositories>
    
    <!--发现插件的远程仓库列表，这些插件用于构建和报表 -->
    <pluginRepositories>
        <!--包含需要连接到远程插件仓库的信息。参见repositories/repository元素 -->
        <pluginRepository>
            ......
        </pluginRepository>
    </pluginRepositories>
```

### 2.7 项目分发信息相关元素

```xml
    <!--项目分发信息，在执行mvn deploy后表示要发布的位置。用于把网站部署到远程服务器或者把构件部署到远程仓库 -->
    <distributionManagement>
        <!--部署项目产生的构件到远程仓库需要的信息 -->
        <repository>
            <!-- 是分配给快照一个唯一的版本号 -->
            <uniqueVersion />
            <!-- 其他配置参见repositories/repository元素 -->
            <id>nanxs-maven2</id>
            <name>nanxsmaven2</name>
            <url>file://${basedir}/target/deploy</url>
            <layout />
        </repository>
        <!--构件的快照部署的仓库。默认部署到distributionManagement/repository元素配置的仓库 -->
        <snapshotRepository>
            <uniqueVersion />
            <id>nanxs-maven2</id>
            <name>Nanxs-maven2 Snapshot Repository</name>
            <url>scp://svn.baidu.com/nanxs:/usr/local/maven-snapshot</url>
            <layout />
        </snapshotRepository>
        <!--部署项目的网站需要的信息 -->
        <site>
            <!--部署位置的唯一标识符，用来匹配站点和settings.xml文件里的配置 -->
            <id>nanxs-site</id>
            <!--部署位置的名称 -->
            <name>business api website</name>
            <!--部署位置的URL，按protocol://hostname/path形式 -->
            <url>scp://svn.baidu.com/nanxs:/var/www/localhost/nanxs-web</url>
        </site>
        <!--项目下载页面的URL。如果没有该元素，用户应该参考主页 -->
        <!--本元素是为了帮助定位那些不在仓库里的构件(license限制) -->
        <downloadUrl />
        <!--如果构件有了新的group ID和artifact ID（构件移到了新的位置），这里列出构件的重定位信息 -->
        <relocation>
            <!--构件新的group ID -->
            <groupId />
            <!--构件新的artifact ID -->
            <artifactId />
            <!--构件新的版本号 -->
            <version />
            <!--显示给用户的，关于移动的额外信息，例如原因 -->
            <message />
        </relocation>
        <!-- 给出该构件在远程仓库的状态。本地项目中不能设置该元素，因为这是工具自动更新的 -->
        <!-- 有效的值有：none（默认），converted（仓库管理员从 Maven 1 POM转换过来），
            partner（直接从伙伴Maven 2仓库同步过来），deployed（从Maven 2实例部署），
            verified（被核实时正确的和最终的） -->
        <status />
    </distributionManagement>
```

### 2.8 报表规范

```xml
    <!-- 该元素描述使用报表插件产生报表的规范 -->
    <!-- 当用户执行"mvn site"，这些报表就会运行，在页面导航栏能看到所有报表的链接 -->
    <reporting>
        <!--网站是否排除默认的报表。这包括"项目信息"菜单中的报表。 -->
        <excludeDefaults />
        <!--所有产生的报表存放到哪里。默认值是${project.build.directory}/site。 -->
        <outputDirectory />
        <!--使用的报表插件和他们的配置。 -->
        <plugins>
            <!--plugin元素包含描述报表插件需要的信息 -->
            <plugin>
                <!--报表插件定位：groupId + artifactId + version -->
                <groupId />
                <artifactId />
                <version />
 
                <!--任何配置是否被传播到子项目 -->
                <inherited />
                <!--报表插件的配置 -->
                <configuration />
                <!-- 一组报表的多重规范，每个规范可能有不同的配置。一个规范（报表集）对应一个执行目标 -->
                <!-- 例如，有1~9这9个报表。1，2构成A报表集，对应一个执行目标；2，5构成B报表集，对应另一个执行目标 -->
                <reportSets>
                    <!--表示报表的一个集合，以及产生该集合的配置 -->
                    <reportSet>
                        <!--报表集合的唯一标识符，POM继承时用到 -->
                        <id />
                        <!--产生报表集合时，被使用的报表的配置 -->
                        <configuration />
                        <!--配置是否被继承到子POMs -->
                        <inherited />
                        <!--这个集合里使用到哪些报表 -->
                        <reports />
                    </reportSet>
                </reportSets>
            </plugin>
        </plugins>
    </reporting>
```

### 2.9 profile 配置

```xml
    <!--在列的项目构建profile，如果被激活，会修改构建处理 -->
    <profiles>
        <!--根据环境参数或命令行参数激活某个构建处理 -->
        <profile>
            <!--构建配置的唯一标识符。即用于命令行激活，也用于在继承时合并具有相同标识符的profile。 -->
            <id />
            <!--自动触发profile的条件逻辑。Activation是profile的开启钥匙，profile的力量来自于它 -->
            <!-- 能够在某些特定的环境中自动使用某些特定的值；这些环境通过activation元素指定。activation元素并不是激活profile的唯一方式 -->
            <activation>
                <!--profile默认是否激活的标志 -->
                <activeByDefault />
                <!--当匹配的jdk被检测到，profile被激活。例如，1.4激活JDK1.4，1.4.0_2，而!1.4激活所有版本不是以1.4开头的JDK -->
                <jdk />
                <!--当匹配的操作系统属性被检测到，profile被激活。os元素可以定义一些操作系统相关的属性。 -->
                <os>
                    <!--激活profile的操作系统的名字 -->
                    <name>Windows XP</name>
                    <!--激活profile的操作系统所属家族(如 'windows') -->
                    <family>Windows</family>
                    <!--激活profile的操作系统体系结构 -->
                    <arch>x86</arch>
                    <!--激活profile的操作系统版本 -->
                    <version>5.1.2600</version>
                </os>
                <!--如果Maven检测到某一个属性（其值可以在POM中通过${名称}引用），其拥有对应的名称和值，Profile就会被激活 -->
                <!--如果值字段是空的，那么存在属性名称字段就会激活profile，否则按区分大小写方式匹配属性值字段 -->
                <property>
                    <!--激活profile的属性的名称 -->
                    <name>mavenVersion</name>
                    <!--激活profile的属性的值 -->
                    <value>2.0.3</value>
                </property>
                <!--提供一个文件名，通过检测该文件的存在或不存在来激活profile。missing检查文件是否存在，如果不存在则激活profile -->
                <!--另一方面，exists则会检查文件是否存在，如果存在则激活profile -->
                <file>
                    <!--如果指定的文件存在，则激活profile。 -->
                    <exists>/usr/local/abcd/abcd-home/jobs/maven-guide-zh-to-production/workspace/
                    </exists>
                    <!--如果指定的文件不存在，则激活profile。 -->
                    <missing>/usr/local/abcd/abcd-home/jobs/maven-guide-zh-to-production/workspace/
                    </missing>
                </file>
            </activation>
 
            <!--构建项目所需要的信息。参见build元素 -->
            <build />
            <!--发现依赖和扩展的远程仓库列表。详情参见repositories元素 -->
            <repositories />
            <!--发现插件的远程仓库列表，这些插件用于构建和报表。详情参见pluginRepositories元素 -->
            <pluginRepositories />
            <!--该元素描述了项目相关的所有依赖。 详细配置参见dependencies -->
            <dependencies />
            <!--该元素包括使用报表插件产生报表的规范。当用户执行"mvn site"，这些报表就会运行。在页面导航栏能看到所有报表的链接。参见reporting元素 -->
            <reporting />
            <!--参见dependencyManagement元素 -->
            <dependencyManagement />
            <!--参见distributionManagement元素 -->
            <distributionManagement />
 
            <!--不赞成使用. 现在Maven忽略该元素. -->
            <reports />
            <!--模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径 -->
            <modules />
            <!--参见properties元素 -->
            <properties />
        </profile>
    </profiles>
```

### 2.10 邮件列表和持续集成配置

```xml
    <!--项目持续集成信息 -->
    <ciManagement>
        <!--持续集成系统的名字，例如continuum -->
        <system />
        <!--该项目使用的持续集成系统的URL（如果持续集成系统有web接口的话）。 -->
        <url />
        <!--构建完成时，需要通知的开发者/用户的配置项。包括被通知者信息和通知条件（错误，失败，成功，警告） -->
        <notifiers>
            <!--配置一种方式，当构建中断时，以该方式通知用户/开发者 -->
            <notifier>
                <!--传送通知的途径 -->
                <type />
                <!--发生错误时是否通知 -->
                <sendOnError />
                <!--构建失败时是否通知 -->
                <sendOnFailure />
                <!--构建成功时是否通知 -->
                <sendOnSuccess />
                <!--发生警告时是否通知 -->
                <sendOnWarning />
                <!--不赞成使用。通知发送到哪里 -->
                <address />
                <!--扩展配置项 -->
                <configuration />
            </notifier>
        </notifiers>
    </ciManagement>
 
    <!--项目相关邮件列表信息 -->
    <mailingLists>
        <!--该元素描述了项目相关的所有邮件列表。自动产生的网站引用这些信息。 -->
        <mailingList>
            <!--邮件的名称 -->
            <name>Demo</name>
            <!--发送邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <post>nanxs@123.com</post>
            <!--订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <subscribe>nanxs@123.com</subscribe>
            <!--取消订阅邮件的地址或链接，如果是邮件地址，创建文档时，mailto: 链接会被自动创建 -->
            <unsubscribe>nanxs@123.com</unsubscribe>
            <!--你可以浏览邮件信息的URL -->
            <archive>http:/a.b.c/nanxs/demo/dev/</archive>
        </mailingList>
    </mailingLists>
```

### 2.11 项目的描述性信息

```xml
    <!--项目的问题管理系统(Bugzilla, Jira, Scarab,或任何你喜欢的问题管理系统)的名称和URL -->
    <issueManagement>
        <!--问题管理系统（例如jira）的名字， -->
        <system>jira</system>
        <!--该项目使用的问题管理系统的URL -->
        <url>http://jira.baidu.com/nanxs</url>
    </issueManagement>
 
    <!--项目创建年份，4位数字。当产生版权信息时需要使用这个值。 -->
    <inceptionYear />
 
    <!--项目开发者列表 -->
    <developers>
        <!--某个项目开发者的信息 -->
        <developer>
            <!--SCM里项目开发者的唯一标识符 -->
            <id>HELLO WORLD</id>
            <!--项目开发者的全名 -->
            <name>nanxs</name>
            <!--项目开发者的email -->
            <email>123@abc.com</email>
            <!--项目开发者的主页的URL -->
            <url />
            <!--项目开发者在项目中扮演的角色，角色元素描述了各种角色 -->
            <roles>
                <role>Project Manager</role>
                <role>Architect</role>
            </roles>
            <!--项目开发者所属组织 -->
            <organization>demo</organization>
            <!--项目开发者所属组织的URL -->
            <organizationUrl>http://a.b.com/nanxs</organizationUrl>
            <!--项目开发者属性，如即时消息如何处理等 -->
            <properties>
                <dept>No</dept>
            </properties>
            <!--项目开发者所在时区， -11到12范围内的整数。 -->
            <timezone>-5</timezone>
        </developer>
    </developers>
 
    <!--项目的其他贡献者列表 -->
    <contributors>
        <!--项目的其他贡献者。参见developers/developer元素 -->
        <contributor>
            <name />
            <email />
            <url />
            <organization />
            <organizationUrl />
            <roles />
            <timezone />
            <properties />
        </contributor>
    </contributors>
 
    <!--该元素描述了项目所有License列表。 应该只列出该项目的license列表，不要列出依赖项目的license列表 -->
    <!--如果列出多个license，用户可以选择它们中的一个而不是接受所有license -->
    <licenses>
        <!--描述了项目的license，用于生成项目的web站点的license页面，其他一些报表和validation也会用到该元素。 -->
        <license>
            <!--license用于法律上的名称 -->
            <name>Apache 2</name>
            <!--官方的license正文页面的URL -->
            <url>http://a.b.com/nanxs/LICENSE-1.0.txt</url>
            <!--项目分发的主要方式： repo，可以从Maven库下载 manual， 用户必须手动下载和安装依赖 -->
            <distribution>repo</distribution>
            <!--关于license的补充信息 -->
            <comments>A business-friendly OSS license</comments>
        </license>
    </licenses>
 
    <!--SCM(Source Control Management)标签允许你配置你的代码库，供Maven web站点和其它插件使用。 -->
    <scm>
        <!--SCM的URL,该URL描述了版本库和如何连接到版本库。该连接只读 -->
        <connection>scm:svn:http://a.b.com/nanxs</connection>
        <!--给开发者使用的，类似connection元素。即该连接不仅仅只读 -->
        <developerConnection>scm:svn:http://a.b.com/nanxs</developerConnection>
        <!--当前代码的标签，在开发阶段默认为HEAD -->
        <tag />
        <!--指向项目的可浏览SCM库（例如ViewVC或者Fisheye）的URL。 -->
        <url>http://a.b.com/nanxs</url>
    </scm>
 
    <!--描述项目所属组织的各种属性。Maven产生的文档用 -->
    <organization>
        <!--组织的全名 -->
        <name>demo</name>
        <!--组织主页的URL -->
        <url>http://a.b.com/nanxs</url>
    </organization>
```

### 2.12 其他配置

```xml
    <!--描述了这个项目构建环境中的前提条件。 -->
    <prerequisites>
        <!--构建该项目或使用该插件所需要的Maven的最低版本 -->
        <maven />
    </prerequisites>
 
    <!--模块（有时称作子项目） 被构建成项目的一部分。列出的每个模块元素是指向该模块的目录的相对路径 -->
    <modules />
 
    <!--以值替代名称，Properties可以在整个POM中使用，也可以作为触发条件（见settings.xml中activation元素的说明） -->
    <!-格式是<name>value</name>。 -->
    <properties />
 
    <!--不推荐使用，现在Maven忽略该元素. -->
    <reports></reports>
```

## 3. Maven 依赖原则

### 3.1 依赖路径最短优先原则

```
A -> B -> C -> X(1.0)
A -> D -> X(2.0)
```

> 由于 X(2.0) 路径最短，所以使用 X(2.0)。

### 3.2 声明顺序优先原则

```
A -> B -> X(1.0)
A -> C -> X(2.0)
```

> 在 POM 中最先声明的优先，上面的两个依赖如果先声明 B，那么最后使用 X(1.0)。

### 3.3 覆写优先原则

子 POM 内声明的依赖优先于父 POM 中声明的依赖。

## 4. Maven 继承

### 4.1 概念

Maven工程之间，A 工程继承 B 工程

- B 工程：父工程
- A 工程：子工程

本质上是 A 工程的 **pom.xml** 中的配置继承了 B 工程中 **pom.xml** 的配置。

### 4.2 作用

在父工程中统一管理项目中的依赖信息，具体来说是管理依赖信息的版本。

它的背景是：

- 对一个比较大型的项目进行了模块拆分。
- 一个 project 下面，创建了很多个 module。
- 每一个 module 都需要配置自己的依赖信息。

它背后的需求是：

- 在每一个 module 中各自维护各自的依赖信息很容易发生出入，不易统一管理。
- 使用同一个框架内的不同 jar 包，它们应该是同一个版本，所以整个项目中使用的框架版本需要统一。
- 使用框架时所需要的 jar 包组合（或者说依赖信息组合）需要经过长期摸索和反复调试，最终确定一个可用组合。这个耗费很大精力总结出来的方案不应该在新的项目中重新摸索。

通过在父工程中为整个项目维护依赖信息的组合既**保证了整个项目使用规范、准确的 jar 包**；又能够将**以往的经验沉淀**下来，节约时间和精力。

## 5. Maven 聚合

### 5.1 概念

使用一个“总工程”将各个“模块工程”汇集起来，作为一个整体对应完整的项目。

- 项目：整体
- 模块：部分

:::tip

概念的对应关系：

从继承关系角度来看：

- 父工程
- 子工程

从聚合关系角度来看：

- 总工程
- 模块工程

:::

### 5.2 作用

- 一键执行 Maven 命令：很多构建命令都可以在“总工程”中一键执行。

> 以 `mvn install` 命令为例：Maven 要求有父工程时先安装父工程；有依赖的工程时，先安装被依赖的工程。我们自己考虑这些规则会很麻烦。但是工程聚合之后，在总工程执行 `mvn install` 可以一键完成安装，而且会自动按照正确的顺序执行。

- 配置聚合之后，各个模块工程会在总工程中展示一个列表，让项目中的各个模块一目了然。

### 5.3 聚合的配置

在总工程中配置 modules 和 packaging 即可：

```xml
<modules>  
    <module>moduleA</module>
    <module>moduleB</module>
    <module>moduleC</module>
</modules>
<!-- 设置为pom表明不会打包成jar或war文件 -->
<packaging>pom</packaging>
```

> 打包时在总项目工程下执行 `mvn clean package` 即可，各个模块会自动按照依赖顺序打包。

### 5.4 循环依赖问题

如果 A 工程依赖 B 工程，B 工程依赖 C 工程，C 工程又反过来依赖 A 工程，那么在执行构建操作时会报下面的错误：

:::danger

[ERROR] [ERROR] The projects in the reactor contain a cyclic reference:

:::

## 6. Maven 生命周期

> Maven 从项目的三个不同的角度，定义了三套生命周期，三套生命周期是相互独立的，它们之间不会相互影响。

- **默认构建生命周期(Default Lifeclyle)**

  该生命周期表示这项目的构建过程，定义了一个项目的构建要经过的不同的阶段。

- **清理生命周期(Clean Lifecycle)**

  该生命周期负责清理项目中的多余信息，保持项目资源和代码的整洁性。一般拿来清空directory(即一般的target)目录下的文件。

- **站点管理生命周期(Site Lifecycle)**

  向我们创建一个项目时，我们有时候需要提供一个站点，来介绍这个项目的信息，如项目介绍，项目进度状态、项目组成成员，版本控制信息，项目javadoc索引信息等等。站点管理生命周期定义了站点管理过程的各个阶段。

![](/imgs/maven/maven-1.jpg)

### 6.1 Maven 对项目默认生命周期的抽象

Maven 根据一个项目的生命周期的每个阶段，将一个项目的生命周期抽象成了如下图所示的 23 个阶段。而每一个阶段应该干什么事情由用户决定。换句话说，Maven 为每一个阶段设计了接口，你可以为每一阶段自己定义一个接口，进而实现对应阶段应该有的行为。

![](/imgs/maven/maven-2.jpg)

在经历这些生命周期的阶段中，每个阶段会理论上会有相应的处理操作。但是，在实际的项目开发过程中， 并不是所有的生命周期阶段都是必须的。 基于类似的约定，Maven 默认地为一些不同类型的 Maven 项目生命周期的阶段实现了默认的行为。

### 6.2 Maven 各生命阶段行为绑定

Maven 会根据 Mojo 功能的划分，将具有相似功能的 Mojo 放到一个插件中。并且某一个特定的 Mojo 能实现的功能称为 goal，即目标，表明该 Mojo 能实现什么目标。

![](/imgs/maven/maven-3.jpg)

例如，我们项目生命周期有两个阶段：compile 和 test-compile，这两阶段都是需要将 Java 源代码编译成 class 文件中，相对应地，compile 和 test-compiler 分别被绑定到了org.apache.maven.plugin.compiler.CompilerMojo 和 org.apache.maven.plugin.compiler.TestCompilerMojo上：

![](/imgs/maven/maven-4.jpg)

## 参考文章

- https://www.pdai.tech/md/devops/tool/tool-maven.html
- https://blog.csdn.net/weixin_38569499/article/details/91456988
- http://heavy_code_industry.gitee.io/code_heavy_industry/pro002-maven/