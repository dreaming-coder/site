<template>
  <a class="item" :href="href">
    <div class="pattern-image">
      <img @click.stop :src="src" :alt="patternName">
    </div>
    <div class="pattern-name">{{patternName}}</div>
    <div class="pattern-english-name">{{patternEnName}}</div>
  </a>
</template>

<script>
export default {
  name: "Item",
  props:[
      "href",
      "src",
      "patternName",
      "patternEnName"
  ]
}
</script>

<style scoped>
.item {
  display: block;
  height: 180px;
  width: 140px;
  color: #e74c3c;
  text-decoration: none;
  border: solid 1px #f5f5f5;
  box-sizing: border-box;
  margin: 5px;
}

a.item:hover {
  border: solid 1px #e74c3c;
  text-decoration: none;
}

.pattern-image {
  margin: 20px 10px 20px 10px;
  text-align: center;
  vertical-align: middle;
}

.pattern-image img {
  width: 100px;
  vertical-align: middle;
  border-style: none;
  cursor: pointer;
}



.pattern-name,
.pattern-english-name {
  margin: 5px auto;
  width: 80%;
  text-align: center;
  font-size: .75rem;
  color: black;
}

.pattern-name {
  font-weight: 700;
  font-size: 1rem;
}
</style>