# 结构型 - 组合模式

在现实生活中，存在很多“部分-整体”的关系，例如，大学中的部门与学院、总公司中的部门与分公司、学习用品中的书与书包、生活用品中的衣服与衣柜、以及厨房中的锅碗瓢盆等。在软件开发中也是这样，例如，文件系统中的文件与文件夹、窗体程序中的简单控件与容器控件等。对这些简单对象与复合对象的处理，如果用组合模式来实现会很方便。

## 1. 定义

组合模式，将对象组合成树形结构以表示‘部分-整体’的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。

![](/imgs/design-pattern/composite-1.jpg)

组合模式中的角色：

- **Component 抽象组件**：为组合中所有对象提供一个接口，不管是叶子对象还是组合对象。
- **Composite 组合结点对象**：实现了 Component 的所有操作，并且持有子结点对象。
- **Leaf 叶结点对象**：叶结点对象没有任何子结点，实现了 Component 中的某些操作。

组合模式的主要优点有：

1. 组合模式使得客户端代码可以一致地处理单个对象和组合对象，无须关心自己处理的是单个对象，还是组合对象，这简化了客户端代码
2. 更容易在组合体内加入新的对象，客户端不会因为加入了新的对象而更改源代码，满足“开闭原则”

其主要缺点是：

1. 设计较复杂，客户端需要花更多时间理清类之间的层次关系
2. 不容易限制容器中的构件
3. 不容易用继承的方法来增加构件的新功能

## 2. 组合模式的结构与实现

组合模式分为透明式的组合模式和安全式的组合模式。

### 2.1 透明方式

在该方式中，由于抽象构件声明了所有子类中的全部方法，所以客户端无须区别树叶对象和树枝对象，对客户端来说是透明的。但其缺点是：叶子构件本来没有 `add()`、`remove()` 及 `getChild()` 方法，却要实现它们（空实现或抛异常），这样会带来一些安全性问题。

![](/imgs/design-pattern/composite-2.gif)

### 2.2 安全方式

在该方式中，将管理子构件的方法移到树枝构件中，抽象构件和树叶构件没有对子对象的管理方法，这样就避免了上一种方式的安全性问题，但由于叶子和分支有不同的接口，客户端在调用时要知道树叶对象和树枝对象的存在，所以失去了透明性。

![](/imgs/design-pattern/composite-3.gif)

## 3. 使用场景

1. 在需要表示一个对象整体与部分的层次结构的场合
2. 要求对用户隐藏组合对象与单个对象的不同，用户可以用统一的接口使用组合结构中的所有对象的场合

## 4. 示例——公司管理系统

![](/imgs/design-pattern/composite-4.png)

【公司类——抽象类或接口】

```java
public abstract class Company {
    protected String name;

    public Company(String name) {
        this.name = name;
    }

    public abstract void add(Company c); // 增加

    public abstract void remove(Company c); // 移除

    public abstract void display(int depth); // 显示

    public abstract void lineOfDuty(); // 履行职责
}
```

【具体公司类——实现接口、树枝节点】

```java
public class ConcreteCompany extends Company {
    private final List<Company> children = new ArrayList<>();

    public ConcreteCompany(String name) {
        super(name);
    }

    @Override
    public void add(Company c) {
        children.add(c);
    }

    @Override
    public void remove(Company c) {
        children.remove(c);
    }

    @Override
    public void display(int depth) {
        super.display(depth);
        for (Company component : children) {
            component.display(depth + 2);
        }
    }

    @Override
    public void lineOfDuty() {
        for (Company component : children) {
            component.lineOfDuty();
        }
    }
}
```

【人力资源部】

```java
public class HRDepartment extends Company{

    public HRDepartment(String name) {
        super(name);
    }

    @Override
    public void add(Company c) {

    }

    @Override
    public void remove(Company c) {

    }

    @Override
    public void lineOfDuty() {
        System.out.println(name + "员工招聘培训管理");
    }
}
```

【财务部】

```java
public class FinanceDepartment extends Company{
    public FinanceDepartment(String name) {
        super(name);
    }

    @Override
    public void add(Company c) {

    }

    @Override
    public void remove(Company c) {

    }

    @Override
    public void lineOfDuty() {
        System.out.println(name + "公司财务收支管理");
    }
}
```

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        ConcreteCompany root = new ConcreteCompany("北京总公司");
        root.add(new HRDepartment("总公司人力资源部"));
        root.add(new FinanceDepartment("总公司财务部"));

        ConcreteCompany comp = new ConcreteCompany("上海华东分公司");
        comp.add(new HRDepartment("上海华东分公司人力资源部"));
        comp.add(new FinanceDepartment("上海华东分公司财务部"));
        root.add(comp);

        ConcreteCompany comp1 = new ConcreteCompany("南京办事处");
        comp1.add(new HRDepartment("南京办事处人力资源部"));
        comp1.add(new FinanceDepartment("南京办事处财务部"));
        comp.add(comp1);

        ConcreteCompany comp2 = new ConcreteCompany("杭州办事处");
        comp2.add(new HRDepartment("杭州办事处人力资源部"));
        comp2.add(new FinanceDepartment("杭州办事处财务部"));
        comp.add(comp2);

        System.out.println("\n结构图：");
        root.display(1);

        System.out.println("\n职责：");
        root.lineOfDuty();
    }
}
```

输出结果：

```
结构图：
-北京总公司
---总公司人力资源部
---总公司财务部
---上海华东分公司
-----上海华东分公司人力资源部
-----上海华东分公司财务部
-----南京办事处
-------南京办事处人力资源部
-------南京办事处财务部
-----杭州办事处
-------杭州办事处人力资源部
-------杭州办事处财务部

职责：
总公司人力资源部员工招聘培训管理
总公司财务部公司财务收支管理
上海华东分公司人力资源部员工招聘培训管理
上海华东分公司财务部公司财务收支管理
南京办事处人力资源部员工招聘培训管理
南京办事处财务部公司财务收支管理
杭州办事处人力资源部员工招聘培训管理
杭州办事处财务部公司财务收支管理
```

