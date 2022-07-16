# 行为型 - 命令模式

## 1. 模式定义

**命令（Command）模式**的定义如下：将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开。这样两者之间通过命令对象进行沟通，这样方便将命令对象进行储存、传递、调用、增加与管理。

命令模式的主要优点如下。

1. 通过引入中间件（抽象接口）降低系统的耦合度。
2. 扩展性良好，增加或删除命令非常方便。采用命令模式增加与删除命令不会影响其他类，且满足“开闭原则”。
3. 可以实现宏命令。命令模式可以与组合模式结合，将多个命令装配成一个组合命令，即宏命令。
4. 方便实现 Undo 和 Redo 操作。命令模式可以与后面介绍的备忘录模式结合，实现命令的撤销与恢复。
5. 可以在现有命令的基础上，增加额外功能。比如日志记录，结合装饰器模式会更加灵活。

其缺点是：

1. 可能产生大量具体的命令类。因为每一个具体操作都需要设计一个具体命令类，这会增加系统的复杂性。
2. 命令模式的结果其实就是接收方的执行结果，但是为了以命令的形式进行架构、解耦请求与实现，引入了额外类型结构（引入了请求方与抽象命令接口），增加了理解上的困难。不过这也是设计模式的通病，抽象必然会额外增加类的数量，代码抽离肯定比代码聚合更加难理解。

## 2. 模式结构

![](/imgs/design-pattern/command-1.gif)

命令模式包含以下主要角色。

1. 抽象命令类（Command）角色：声明执行命令的接口，拥有执行命令的抽象方法 execute()。
2. 具体命令类（Concrete Command）角色：是抽象命令类的具体实现类，它拥有接收者对象，并通过调用接收者的功能来完成命令要执行的操作。
3. 实现者/接收者（Receiver）角色：执行命令功能的相关操作，是具体命令对象业务的真正实现者。
4. 调用者/请求者（Invoker）角色：是请求的发送者，它通常拥有很多的命令对象，并通过访问命令对象来执行相关请求，它不直接访问接收者。

## 3. 应用示例

【抽象命令】

```java
public interface Command {
    void execute();
}
```

【调用者】

```java
public class Invoker {
    private Command command;

    public Invoker(Command command) {
        this.command = command;
    }

    public void setCommand(Command command) {
        this.command = command;
    }

    public void call(){
        System.out.println("调用者执行命令command...");
        command.execute();
    }
}
```

【接受者】

```java
public class Receiver {
    public void action(){
        System.out.println("接受者的action()方法被调用...");
    }
}
```

【具体命令】

```java
public class ConcreteCommand implements Command{

    private Receiver receiver;

    public ConcreteCommand(Receiver receiver) {
        this.receiver = receiver;
    }

    @Override
    public void execute() {
        receiver.action();
    }
}
```

【测试类】

```java
public class Test {
    public static void main(String[] args) {
        Receiver receiver = new Receiver();
        ConcreteCommand cmd = new ConcreteCommand(receiver);
        Invoker invoker = new Invoker(cmd);
        System.out.println("客户访问调用者的call()方法...");
        invoker.call();
    }
}
```

输出结果：

```
客户访问调用者的call()方法...
调用者执行命令command...
接受者的action()方法被调用...
```

