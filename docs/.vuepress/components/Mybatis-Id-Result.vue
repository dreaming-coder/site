<template>
  <table>
    <caption>{{ caption }}</caption>
    <thead>
    <tr>
      <th class="head">属性</th>
      <th class="head">描述</th>
    </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) of items" :key="index">
        <td class="column-1">{{item.field}}</td>
        <td>{{item.miaoshu}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Mybatis-Id-Result",
  data(){
    return {
      caption: "id 和 result 的属性",
      items: [
        {field:"property", miaoshu: "映射到列结果的字段或属性。如果 JavaBean 有这个名字的属性（property），会先使用该属性。否则 MyBatis 将会寻找给定名称的字段（field）。 无论是哪一种情形，你都可以使用常见的点式分隔形式进行复杂属性导航。 比如，你可以这样映射一些简单的东西：“username”，或者映射到一些复杂的东西上：“address.street.number”。"},
        {field: "column",miaoshu: "数据库中的列名，或者是列的别名。一般情况下，这和传递给 resultSet.getString(columnName) 方法的参数一样。"},
        {field: "javaType",miaoshu: "一个 Java 类的全限定名，或一个类型别名（关于内置的类型别名，可以参考上面的表格）。 如果你映射到一个 JavaBean，MyBatis 通常可以推断类型。然而，如果你映射到的是 HashMap，那么你应该明确地指定 javaType 来保证行为与期望的相一致。"},
        {field: "jdbcType",miaoshu: "JDBC 类型，所支持的 JDBC 类型参见这个表格之后的“支持的 JDBC 类型”。 只需要在可能执行插入、更新和删除的且允许空值的列上指定 JDBC 类型。这是 JDBC 的要求而非 MyBatis 的要求。如果你直接面向 JDBC 编程，你需要对可以为空值的列指定这个类型。"},
        {field: "typeHandler",miaoshu: "我们在前面讨论过默认的类型处理器。使用这个属性，你可以覆盖默认的类型处理器。 这个属性值是一个类型处理器实现类的全限定名，或者是类型别名。"},
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