# 创建型 - 原型模式

> 这部分示例参见小傅哥的 [重学Java设计模式——原型模式](https://bugstack.cn/md/develop/design-pattern/2020-05-28-%E9%87%8D%E5%AD%A6%20Java%20%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E3%80%8A%E5%AE%9E%E6%88%98%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F%E3%80%8B.html)

> **定义**：用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。

![](/imgs/design-pattern/prototype-1.png)

## 案例

每个人都经历过考试，从纸制版到上机答题，大大小小也有几百场。而以前坐在教室里答题身边的人都是一套试卷，考试的时候还能偷摸或者别人给发信息抄一抄答案。

但从一部分可以上机考试的内容开始，在保证大家的公平性一样的题目下，开始出现试题混排更有做的好的答案选项也混排。这样大大的增加了抄的成本，也更好的做到了考试的公平性。

**但如果这个公平性的考试需求交给你来完成，你会怎么做？**

因为需要实现一个上机考试抽题的服务，因此在这里建造一个题库题目的场景类信息，用于创建；`选择题`、`问答题`。

【选择题】

```java
public class ChoiceQuestion {
    private String name;
    private Map<String, String> option;
    private String key;

    public ChoiceQuestion(String name, Map<String, String> option, String key) {
        this.name = name;
        this.option = option;
        this.key = key;
    }

    public ChoiceQuestion() {
    }

    // getter and setter
}
```

【问答题】

```java
public class AnswerQuestion {
    private String name;  // 问题
    private String key;   // 答案

    public AnswerQuestion(String name, String key) {
        this.name = name;
        this.key = key;
    }

    public AnswerQuestion() {
    }

    // getter and setter
}
```

## 实现

原型模式主要解决的问题就是创建大量重复的类，而我们模拟的场景就需要给不同的用户都创建相同的试卷，但这些试卷的题目不便于每次都从库中获取，甚至有时候需要从远程的 RPC 中获取。这样都是非常耗时的，而且随着创建对象的增多将严重影响效率。

在原型模式中所需要的非常重要的手段就是克隆，在需要用到克隆的类中都需要实现 `implements Cloneable` 接口。

【题目选项乱序操作工具包】

``` java
public class TopicRandomUtil {
    /**
     * 乱序Map元素，记录对应答案key
     *
     * @param option 题目
     * @param key    答案
     * @return Topic 乱序后 {A=c., B=d., C=a., D=b.}
     */
    public static Topic random(Map<String, String> option, String key) {
        Set<String> keySet = option.keySet();
        List<String> keyList = new ArrayList<>(keySet);
        Collections.shuffle(keyList);
        Map<String, String> optionNew = new HashMap<>();
        int idx = 0;
        String keyNew = "";
        for (String next : keySet) {
            String randomKey = keyList.get(idx++);
            if (key.equals(next)) {
                keyNew = randomKey;
            }
            optionNew.put(randomKey, option.get(next));
        }
        return new Topic(optionNew, keyNew);
    }
}
```

【乱序后的选项】

```java
public class Topic {
    private Map<String, String> option;  // 选项；A、B、C、D
    private String key;           // 答案；B

    public Topic() {
    }

    public Topic(Map<String, String> option, String key) {
        this.option = option;
        this.key = key;
    }

    public Map<String, String> getOption() {
        return option;
    }

    public void setOption(Map<String, String> option) {
        this.option = option;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
```

【克隆对象处理类】

```java
public class QuestionBank implements Cloneable{
    private String candidate; // 考生
    private String number;    // 考号

    private ArrayList<ChoiceQuestion> choiceQuestionList = new ArrayList<ChoiceQuestion>();
    private ArrayList<AnswerQuestion> answerQuestionList = new ArrayList<AnswerQuestion>();

    public QuestionBank append(ChoiceQuestion choiceQuestion) {
        choiceQuestionList.add(choiceQuestion);
        return this;
    }

    public QuestionBank append(AnswerQuestion answerQuestion) {
        answerQuestionList.add(answerQuestion);
        return this;
    }

    @Override
    public Object clone() throws CloneNotSupportedException {
        QuestionBank questionBank = (QuestionBank) super.clone();
        questionBank.choiceQuestionList = (ArrayList<ChoiceQuestion>) choiceQuestionList.clone();
        questionBank.answerQuestionList = (ArrayList<AnswerQuestion>) answerQuestionList.clone();

        // 题目乱序
        Collections.shuffle(questionBank.choiceQuestionList);
        Collections.shuffle(questionBank.answerQuestionList);
        // 答案乱序
        ArrayList<ChoiceQuestion> choiceQuestionList = questionBank.choiceQuestionList;
        for (ChoiceQuestion question : choiceQuestionList) {
            Topic random = TopicRandomUtil.random(question.getOption(), question.getKey());
            question.setOption(random.getOption());
            question.setKey(random.getKey());
        }
        return questionBank;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @Override
    public String toString() {

        StringBuilder detail = new StringBuilder("考生：" + candidate + "\r\n" +
                "考号：" + number + "\r\n" +
                "--------------------------------------------\r\n" +
                "一、选择题" + "\r\n\n");

        for (int idx = 0; idx < choiceQuestionList.size(); idx++) {
            detail.append("第").append(idx + 1).append("题：").append(choiceQuestionList.get(idx).getName()).append("\r\n");
            Map<String, String> option = choiceQuestionList.get(idx).getOption();
            for (String key : option.keySet()) {
                detail.append(key).append("：").append(option.get(key)).append("\r\n");;
            }
            detail.append("答案：").append(choiceQuestionList.get(idx).getKey()).append("\r\n\n");
        }

        detail.append("二、问答题" + "\r\n\n");

        for (int idx = 0; idx < answerQuestionList.size(); idx++) {
            detail.append("第").append(idx + 1).append("题：").append(answerQuestionList.get(idx).getName()).append("\r\n");
            detail.append("答案：").append(answerQuestionList.get(idx).getKey()).append("\r\n\n");
        }

        return detail.toString();
    }
}
```

这里的主要操作内容有三个，分别是：

- 两个 `append()`，对各项题目的添加
- `clone()`，这里的核心操作就是对对象的复制，这里的复制不只是包括了本身，同时对两个集合也做了复制。只有这样的拷贝才能确保在操作克隆对象的时候不影响原对象
- 乱序操作，在 `list` 集合中有一个方法，`Collections.shuffle`，可以将原有集合的顺序打乱，输出一个新的顺序。在这里我们使用此方法对题目进行乱序操作

> 深拷贝与浅拷贝问题中，会发生深拷贝的有 Java 中的 8 种基本类型以及他们的封装类型，另外还有 String 类型，其余的都是浅拷贝。

【初始化试卷数据】

```java
public class QuestionBankController {
    private QuestionBank questionBank = new QuestionBank();

    public QuestionBankController() {

        Map<String, String> map01 = new HashMap<>();
        map01.put("A", "JAVA2 EE");
        map01.put("B", "JAVA2 Card");
        map01.put("C", "JAVA2 ME");
        map01.put("D", "JAVA2 HE");
        map01.put("E", "JAVA2 SE");

        Map<String, String> map02 = new HashMap<>();
        map02.put("A", "JAVA程序的main方法必须写在类里面");
        map02.put("B", "JAVA程序中可以有多个main方法");
        map02.put("C", "JAVA程序中类名必须与文件名一样");
        map02.put("D", "JAVA程序的main方法中如果只有一条语句，可以不用{}(大括号)括起来");

        Map<String, String> map03 = new HashMap<>();
        map03.put("A", "变量由字母、下划线、数字、$符号随意组成；");
        map03.put("B", "变量不能以数字作为开头；");
        map03.put("C", "A和a在java中是同一个变量；");
        map03.put("D", "不同类型的变量，可以起相同的名字；");

        Map<String, String> map04 = new HashMap<>();
        map04.put("A", "STRING");
        map04.put("B", "x3x;");
        map04.put("C", "void");
        map04.put("D", "de$f");

        Map<String, String> map05 = new HashMap<>();
        map05.put("A", "31");
        map05.put("B", "0");
        map05.put("C", "1");
        map05.put("D", "2");

        questionBank.append(new ChoiceQuestion("JAVA所定义的版本中不包括", map01, "D"))
                .append(new ChoiceQuestion("下列说法正确的是", map02, "A"))
                .append(new ChoiceQuestion("变量命名规范说法正确的是", map03, "B"))
                .append(new ChoiceQuestion("以下()不是合法的标识符",map04, "C"))
                .append(new ChoiceQuestion("表达式(11+3*8)/4%3的值是", map05, "D"))
                .append(new AnswerQuestion("小红马和小黑马生的小马几条腿", "4条腿"))
                .append(new AnswerQuestion("铁棒打头疼还是木棒打头疼", "头最疼"))
                .append(new AnswerQuestion("什么床不能睡觉", "牙床"))
                .append(new AnswerQuestion("为什么好马不吃回头草", "后面的草没了"));
    }

    public String createPaper(String candidate, String number) throws CloneNotSupportedException {
        QuestionBank questionBankClone = (QuestionBank) questionBank.clone();
        questionBankClone.setCandidate(candidate);
        questionBankClone.setNumber(number);
        return questionBankClone.toString();
    }
}
```

## 测试验证

```java
public class Test {
    public static void main(String[] args) throws CloneNotSupportedException {
        QuestionBankController questionBankController = new QuestionBankController();
        System.out.println(questionBankController.createPaper("花花", "1000001921032"));
        System.out.println(questionBankController.createPaper("豆豆", "1000001921051"));
        System.out.println(questionBankController.createPaper("大宝", "1000001921987"));
    }
}
```

```
考生：花花
考号：1000001921032
--------------------------------------------
一、选择题

第1题：以下()不是合法的标识符
A：STRING
B：de$f
C：void
D：x3x;
答案：C

第2题：表达式(11+3*8)/4%3的值是
A：31
B：0
C：2
D：1
答案：C

第3题：JAVA所定义的版本中不包括
A：JAVA2 EE
B：JAVA2 HE
C：JAVA2 SE
D：JAVA2 ME
E：JAVA2 Card
答案：B

第4题：变量命名规范说法正确的是
A：变量不能以数字作为开头；
B：变量由字母、下划线、数字、$符号随意组成；
C：A和a在java中是同一个变量；
D：不同类型的变量，可以起相同的名字；
答案：A

第5题：下列说法正确的是
A：JAVA程序的main方法中如果只有一条语句，可以不用{}(大括号)括起来
B：JAVA程序中类名必须与文件名一样
C：JAVA程序中可以有多个main方法
D：JAVA程序的main方法必须写在类里面
答案：D

二、问答题

第1题：什么床不能睡觉
答案：牙床

第2题：铁棒打头疼还是木棒打头疼
答案：头最疼

第3题：小红马和小黑马生的小马几条腿
答案：4条腿

第4题：为什么好马不吃回头草
答案：后面的草没了
```

## 总结

- 以上的实际场景模拟了原型模式在开发中重构的作用，但是原型模式的使用频率确实不是很高。如果有一些特殊场景需要使用到，也可以按照此设计模式进行优化。
- 另外原型设计模式的优点包括：便于通过克隆方式创建复杂对象、也可以避免重复做初始化操作、不需要与类中所属的其他类耦合等。但也有一些缺点如果对象中包括了循环引用的克隆，以及类中深度使用对象的克隆，都会使此模式变得异常麻烦。
- 终究设计模式是一整套的思想，在不同的场景合理的运用可以提升整体的架构的质量。永远不要想着去硬凑设计模式，否则将会引起过渡设计，以及在承接业务反复变化的需求时造成浪费的开发和维护成本。
- 初期是代码的优化，中期是设计模式的使用，后期是把控全局服务的搭建。不断的加强自己对全局能力的把控，也加深自己对细节的处理。可上可下才是一个程序员最佳处理方式，选取最合适的才是最好的选择。

