<template>
  <table>
    <thead>
    <tr>
      <th>分类</th>
      <th>类型</th>
      <th>大小</th>
      <th>范围</th>
      <th>格式</th>
      <th>描述</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td rowspan="5">日期类型</td>
      <td>DATE</td>
      <td>3 bytes</td>
      <td>1000-01-01 至 9999-12-31</td>
      <td>YYYY-MM-DD</td>
      <td>日期值</td>
    </tr>
    <tr>
      <td>TIME</td>
      <td>3 bytes</td>
      <td>-838:59:59 至 838:59:59</td>
      <td>HH:MM:SS</td>
      <td>时间值或持续时间</td>
    </tr>
    <tr>
      <td>YEAR</td>
      <td>1 byte</td>
      <td>1901 至 2155</td>
      <td>YYYY</td>
      <td>年份值</td>
    </tr>
    <tr>
      <td>DATETIME</td>
      <td>8 bytes</td>
      <td>1000-01-01 00:00:00 至 9999-12-31 23:59:59</td>
      <td>YYYY-MM-DD HH:MM:SS</td>
      <td>混合日期和时间值</td>
    </tr>
    <tr>
      <td>TIMESTAMP</td>
      <td>84 bytes</td>
      <td>1970-01-01 00:00:01 至 2038-12-31 23:59:59</td>
      <td>YYYY-MM-DD HH:MM:SS</td>
      <td>混合日期和时间值，时间戳</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MySQL-DateType"
}
</script>

<style scoped>
table {
  margin-top: 20px;
  font-size: 0.9em;
  text-align: center;
}

</style>