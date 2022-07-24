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
      <tr  v-for="(item,index) of items" :key="index">
        <td class="column-1">{{item.field}}</td>
        <td>{{item.miaoshu}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Mybatis-ResultMap",
  data(){
    return {
      caption: "resultMap 属性列表",
      items: [
        {field:"id", miaoshu: "当前命名空间中的一个唯一标识，用于标识一个结果映射。"},
        {field: "type",miaoshu: "类的完全限定名, 或者一个类型别名（关于内置的类型别名，可以参考上面的表格）。"},
        {field: "autoMapping",miaoshu: "如果设置这个属性，MyBatis 将会为本结果映射开启或者关闭自动映射。 这个属性会覆盖全局的属性 autoMappingBehavior。默认值：未设置（unset）。"},
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