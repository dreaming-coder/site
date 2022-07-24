<template>
  <table>
    <caption v-if="caption">{{ caption }}</caption>
    <thead>
    <tr>
      <th class="head">属性</th>
      <th class="head">描述</th>
    </tr>
    </thead>
    <tbody>
      <tr  v-for="(item,index) of items" :key="index">
        <td class="column-1">{{item.field}}</td>
        <td>{{item.miaoshu}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Mybatis-Constructor",
  data(){
    return {
      caption: "",
      items: [
        {field:"column", miaoshu: "数据库中的列名，或者是列的别名。一般情况下，这和传递给 resultSet.getString(columnName) 方法的参数一样。"},
        {field:"javaType", miaoshu: "一个 Java 类的完全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。"},
        {field:"jdbcType", miaoshu: "JDBC 类型，所支持的 JDBC 类型参见这个表格之前的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可能存在空值的列指定这个类型。"},
        {field:"select", miaoshu: "用于加载复杂类型属性的映射语句的 ID，它会从 column 属性中指定的列检索数据，作为参数传递给此 select 语句。具体请参考关联元素。"},
        {field:"resultMap", miaoshu: "结果映射的 ID，可以将嵌套的结果集映射到一个合适的对象树中。 它可以作为使用额外 select 语句的替代方案。它可以将多表连接操作的结果映射成一个单一的 ResultSet。这样的 ResultSet 将会将包含重复或部分数据重复的结果集。为了将结果集正确地映射到嵌套的对象树中，MyBatis 允许你 “串联”结果映射，以便解决嵌套结果集的问题。想了解更多内容，请参考下面的关联元素。"},
        {field:"name", miaoshu: "构造方法形参的名字。从 3.4.3 版本开始，通过指定具体的参数名，你可以以任意顺序写入 arg 元素。参看上面的解释。"},
      ]
    }
  }

}
</script>

<style scoped>
caption {
  font-size: 1.2em;
  font-weight: bolder;
  margin-bottom: 0.5em;
}
.column-1 {
  text-align: center;
  white-space:nowrap;
  font-weight: bold;
}
td{
  height: 2em;
}
</style>