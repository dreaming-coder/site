<template>
  <table>
    <caption>{{ caption }}</caption>
    <thead>
    <tr>
      <th class="head">注解</th>
      <th class="head">用法</th>
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
  name: "Jackson-Annotation",
  data(){
    return {
      caption: "Jackson 常用注解",
      items: [
        {field:"@JsonProperty", miaoshu: "用于属性，把属性的名称序列化时转换为另外一个名称。"},
        {field: "@JsonIgnore",miaoshu: "可用于字段、getter/setter、构造函数参数上，作用相同，都会对相应的字段产生影响。使相应字段不参与序列化和反序列化。"},
        {field: "@JsonIgnoreProperties",miaoshu: "该注解是类注解。该注解在 Java 类和 JSON 不完全匹配的时候使用。"},
        {field: "@JsonFormat",miaoshu: "用于属性或者方法，把属性的格式序列化时转换成指定的格式。"},
        {field: "@JsonPropertyOrder",miaoshu: "用于类， 和 @JsonProperty 的 index 属性类似，指定属性在序列化时 JSON 中的顺序。"},
        {field: "@JsonCreator",miaoshu: "用于构造方法，和 @JsonProperty 配合使用，适用有参数的构造方法。"},
        {field: "@JsonAnySetter",miaoshu: "用于属性或者方法，设置未反序列化的属性名和值作为键值存储到 map 中。 "},
        {field: "@JsonAnyGetter",miaoshu: "用于方法 ，获取所有未序列化的属性。"},
        {field: "@JsonNaming",miaoshu: "类注解。序列化的时候该注解可将驼峰命名的字段名转换为下划线分隔的小写字母命名方式。反序列化的时候可以将下划线分隔的小写字母转换为驼峰命名的字段名。"},
        {field: "@JsonRootName",miaoshu: "类注解，用于序列化时输出带有根属性名称的 JSON 串，但不支持该 JSON 串反序列化。"},
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