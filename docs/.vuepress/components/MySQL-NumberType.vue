<template>
  <table>
    <thead>
    <tr>
      <th>分类</th>
      <th>类型</th>
      <th>大小</th>
      <th>有符号(SIGNED)范围</th>
      <th>无符号(UNSIGNED)范围</th>
      <th>描述</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td rowspan="8">数值类型</td>
      <td>TINYINT</td>
      <td>1 byte</td>
      <td>(-128, 127)</td>
      <td>(0, 255)</td>
      <td>小整数值</td>
    </tr>
    <tr>
      <td>SMALLINT</td>
      <td>2 bytes</td>
      <td>(-32768, 32767)</td>
      <td>(0, 65535)</td>
      <td>大整数值</td>
    </tr>
    <tr>
      <td>MEDIUMINT</td>
      <td>3 bytes</td>
      <td>(-2<sup>23</sup>, 2<sup>23</sup>-1)</td>
      <td>(0, 2<sup>24</sup>-1)</td>
      <td>大整数值</td>
    </tr>
    <tr>
      <td>INT 或 INTEGER</td>
      <td>4 bytes</td>
      <td>(-2<sup>31</sup>, 2<sup>31</sup>-1)</td>
      <td>(0, 2<sup>32</sup>-1)</td>
      <td>大整数值</td>
    </tr>
    <tr>
      <td>BIGINT</td>
      <td>8 bytes</td>
      <td>(-2<sup>63</sup>, 2<sup>63</sup>-1)</td>
      <td>(0, 2<sup>64</sup>-1)</td>
      <td>极大整数值</td>
    </tr>
    <tr>
      <td>FLOAT</td>
      <td>4 bytes</td>
      <td>(-23.402823466 E+38, 3.402823466351 E+38)</td>
      <td>0 和 (1.175494351 E-38, 3.402823466 E+38)</td>
      <td>单精度浮点数值</td>
    </tr>
    <tr>
      <td>DOUBLE</td>
      <td>8 bytes</td>
      <td>(-1.7976931348623157 E+308, 1.7976931348623157 E+308)</td>
      <td>0 和 (2.2250738585072014 E-308, 1.7976931348623157 E+308)</td>
      <td>双精度浮点数值</td>
    </tr>
    <tr>
      <td>DECIMAL</td>
      <td></td>
      <td>依赖于M(精度)和D(标度)的值</td>
      <td>依赖于M(精度)和D(标度)的值</td>
      <td>小数值(精确定点数)</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "MySQL-NumberType"
}
</script>

<style scoped>
table {
  margin-top: 20px;
  font-size: 0.9em;
  text-align: center;
}
</style>