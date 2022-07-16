<template>
  <table>
    <thead>
    <tr>
      <th>分类</th>
      <th class="type">类型</th>
      <th class="store">大小</th>
      <th class="desc">描述</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td rowspan="10">字符串类型</td>
      <td>CHAR</td>
      <td>0-255 bytes</td>
      <td>定长字符串</td>
    </tr>
    <tr>
      <td>VARCHAR</td>
      <td>0-65535 bytes</td>
      <td>变长字符串</td>
    </tr>
    <tr>
      <td>TINYBLOB</td>
      <td>0-255 bytes</td>
      <td>不超过255个字符的二进制数据</td>
    </tr>
    <tr>
      <td>TINYTEXT</td>
      <td>0-255 bytes</td>
      <td>短文本字符串</td>
    </tr>
    <tr>
      <td>BLOB</td>
      <td>0-65535 bytes</td>
      <td>二进制形式的长文本数据</td>
    </tr>
    <tr>
      <td>TEXT</td>
      <td>0-65535 bytes</td>
      <td>长文本数据</td>
    </tr>
    <tr>
      <td>MEDIUMBLOB</td>
      <td>0-16 777 215 bytes</td>
      <td>二进制形式的中等长度文本数据</td>
    </tr>
    <tr>
      <td>MEDIUMTEXT</td>
      <td>0-16 777 215 bytes</td>
      <td>中等长度文本数据</td>
    </tr>
    <tr>
      <td>LONGBLOB</td>
      <td>0-4 294 967 295 bytes</td>
      <td>二进制形式的极大文本数据</td>
    </tr>
    <tr>
      <td>LONGTEXTB</td>
      <td>0-4 294 967 295 bytes</td>
      <td>极大文本数据</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MySQL-StringType"
}
</script>

<style scoped>
table {
  margin-top: 20px;
  font-size: 0.9em;
  text-align: center;
}

.type, .store {
  width: 200px;
}

.desc {
  width: 400px;
}
</style>