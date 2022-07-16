<template>
  <div class="container">
    <div class="left">
      <table>
        <thead>
        <tr>
          <th>比较运算符</th>
          <th>功能</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>&gt;</td>
          <td>大于</td>
        </tr>
        <tr>
          <td>&gt;=</td>
          <td>大于等于</td>
        </tr>
        <tr>
          <td>&lt;</td>
          <td>小于</td>
        </tr>
        <tr>
          <td>&lt;=</td>
          <td>小于等于</td>
        </tr>
        <tr>
          <td>=</td>
          <td>等于</td>
        </tr>
        <tr>
          <td>&lt;&gt; 或 !=</td>
          <td>不等于</td>
        </tr>
        <tr>
          <td>BETWEEN ... AND ...</td>
          <td>在某个范围之间(含最小最大值)</td>
        </tr>
        <tr>
          <td>IN ( ... )</td>
          <td>在 in 之后列表中的值，多选一</td>
        </tr>
        <tr>
          <td>LIKE</td>
          <td>模糊匹配</td>
        </tr>
        <tr>
          <td>IS NULL</td>
          <td>为 NULL</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="right">
      <table>
        <thead>
        <tr>
          <th>逻辑运算符</th>
          <th>功能</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>AND 或 &&</td>
          <td>并且(多个条件同时成立)</td>
        </tr>
        <tr>
          <td>OR 或 ||</td>
          <td>或者(多个条件任意一个成立)</td>
        </tr>
        <tr>
          <td>NOT 或 !</td>
          <td>非，不是</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MySQL-Condition"
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

table {
  text-align: center;
}
</style>