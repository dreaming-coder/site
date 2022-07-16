# 设计模式 - 概述

设计模式是系统服务设计中针对常见场景的一种解决方案，可以解决功能逻辑开发中遇到的共性问题。

设计模式是一种开发指导思想，不要拘泥于某种已经存在的固定代码格式，而要根据实际的业务场景做出改变。

按照实现形式，设计模式可以分为三类：

- **创建型模式**

  提供创建对象的机制，提升已有代码的灵活性和可复用性。

<div style="display: flex; flex-wrap: wrap; align-items: center;">
   <Item href="factory-method.html" src="/imgs/design-pattern/logo/factory-method-mini.png" patternName="工厂方法" patternEnName="Factory Method"></Item>
   <Item href="abstract-factory.html" src="/imgs/design-pattern/logo/abstract-factory-mini.png" patternName="抽象工厂" patternEnName="Abstract Factory"></Item>
   <Item href="builder.html" src="/imgs/design-pattern/logo/builder-mini.png" patternName="建造者" patternEnName="Builder"></Item>
   <Item href="prototype.html" src="/imgs/design-pattern/logo/prototype-mini.png" patternName="原型" patternEnName="Prototype"></Item>
   <Item href="singleton.html" src="/imgs/design-pattern/logo/singleton-mini.png" patternName="单例" patternEnName="Singleton"></Item>
</div>

- **结构型模式**

  介绍如何将对象和类组装成较大的结构， 并同时保持结构的灵活和高效。

<div style="display: flex; flex-wrap: wrap; align-items: center;">
   <Item href="adapter.html" src="/imgs/design-pattern/logo/adapter-mini.png" patternName="适配器" patternEnName="Adapter"></Item>
   <Item href="bridge.html" src="/imgs/design-pattern/logo/bridge-mini.png" patternName="桥接" patternEnName="Bridge"></Item>
   <Item href="composite.html" src="/imgs/design-pattern/logo/composite-mini.png" patternName="组合" patternEnName="Composite"></Item>
   <Item href="decorator.html" src="/imgs/design-pattern/logo/decorator-mini.png" patternName="装饰" patternEnName="Decorator"></Item>
   <Item href="facade.html" src="/imgs/design-pattern/logo/facade-mini.png" patternName="外观" patternEnName="Facade"></Item>
   <Item href="flyweight.html" src="/imgs/design-pattern/logo/flyweight-mini.png" patternName="享元" patternEnName="Flyweight"></Item>
   <Item href="proxy.html" src="/imgs/design-pattern/logo/proxy-mini.png" patternName="代理" patternEnName="Proxy"></Item>
</div>

- **行为型模式**

  负责对象间的高效沟通和职责传递委派。

<div style="display: flex; flex-wrap: wrap; align-items: center;">
   <Item href="chain-of-responsibility.html" src="/imgs/design-pattern/logo/chain-of-responsibility-mini.png" patternName="责任链" patternEnName="Chain of Responsibility"></Item>
   <Item href="command.html" src="/imgs/design-pattern/logo/command-mini.png" patternName="命令" patternEnName="Command"></Item>
   <Item href="iterator.html" src="/imgs/design-pattern/logo/iterator-mini.png" patternName="迭代器" patternEnName="Iterator"></Item>
   <Item href="mediator.html" src="/imgs/design-pattern/logo/mediator-mini.png" patternName="中介者" patternEnName="Mediator"></Item>
   <Item href="memento.html" src="/imgs/design-pattern/logo/memento-mini.png" patternName="备忘录" patternEnName="Memento"></Item>
   <Item href="observer.html" src="/imgs/design-pattern/logo/observer-mini.png" patternName="观察者" patternEnName="Observer"></Item>
   <Item href="state.html" src="/imgs/design-pattern/logo/state-mini.png" patternName="状态" patternEnName="State"></Item>
   <Item href="strategy.html" src="/imgs/design-pattern/logo/strategy-mini.png" patternName="策略" patternEnName="Strategy"></Item>
   <Item href="template-method.html" src="/imgs/design-pattern/logo/template-method-mini.png" patternName="模板方法" patternEnName="Template Method"></Item>
   <Item href="visitor.html" src="/imgs/design-pattern/logo/visitor-mini.png" patternName="访问者" patternEnName="Visitor"></Item>
</div>

设计模式有六大设计原则：

1. **单一职责原则**

   **一个类应该只有一个发生变化的原因**。

2. **开闭原则**

   开闭原则规定软件对象中的对象、类、模块和函数对扩展应该是开放的，但是对于修改是封闭的。这意味着应该**用抽象定义结构，用具体实现扩展细节**，核心思想可以理解为**面向抽象编程**。

3. **里氏替换原则**

   > 如果 S 是 T 的子类型，那么所有 T 类型的对象都可以在不破坏程序的情况下被 S 类型的对象替换。

   简单来说，**子类可以扩展父类的功能，但不能改变父类原有的功能**。也就是说：当子类继承父类时，除添加新的方法且完成新的功能外，尽量不要重写父类的方法。这句话包括了四点含义：

   - 子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法
   - 子类可以增加自己特有的方法
   - 当子类的方法重载父类的方法时，方法的前置条件（即方法的输入参数）要比父类的方法更宽松
   - 当子类的方法实现父类的方法（重写、重载或实现抽象方法）时，方法的后置条件（即方法的输出或返回值）要比父类的方法更严格或与父类的方法相等

   > 里氏替换原则的作用：
   >
   > 1. 里氏替换原则是实现开闭原则的重要方式之一
   > 2. 解决了继承中重写父类造成的可复用性变差的问题
   > 3. 是动作正确性的保证，即类的扩展不会给已有的系统引入新的错误，降低了代码出错的可能性
   > 4. 加强程序的健壮性，同时变更时可以做到非常好的兼容性，提高程序的维护性、可扩展性，降低需求变更时引入的风险


4. **迪米特法则**

   迪米特法则又称为最小知道原则，是指一个对象类对于其他对象类来说，知道的越少越好。也就是说，两个类直接不要有过多的耦合关系，保持最少关联性。

5. **接口隔离原则**

   一个类对另一个类的依赖应该建立在最小的接口上

   接口隔离原则要求程序员尽量将臃肿庞大的接口拆分成更小的和更具体的接口，让接口中只包含客户感兴趣的方法。

   再具体应用接口隔离原则时，应根据以下几个规则衡量：

   - 接口尽量小，但是要有限度。一个接口只服务于一个子模块或业务逻辑。
   - 为依赖接口的类定制服务。只提供调用者需要的方法，屏蔽不需要的方法。
   - 了解环境，拒绝盲从。
   - 提高内聚，减少对外交互。

6. **依赖倒置原则**

   依赖倒置原则是指在设计代码架构时，高层模块不应该依赖于底层模块，二者都应该依赖于抽象。抽象不应该依赖于细节，细节应该依赖于抽象。

   依赖倒置原则是实现开闭原则的重要途径之一，它降低了类之间的耦合，提高了系统的稳定性和可维护性。


