<template>
  <div class="card">
    <a :href="site" target="_blank">
      <div class="my-nav-item">
        <div :title="title" class="cc-nav-title"><img :src="img" class="nozoom" style="height: 35px;" :alt="title">
          <div style="height: 40px; float: right;">{{ title }}</div>
        </div>
        <div :title="desc" class="cc-nav-des">{{ desc }}</div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: [
    "site",
    "img",
    "title",
    "desc"
  ]
}
</script>

<style scoped>
.card {
  box-sizing: border-box;
  float: left;
  display: block;
  width: 240px;
  height: 130px;
  padding-left: 10px;
  padding-right: 10px;
  margin: 2px;
  margin-top: 10px;
}

a {
  color: #3eaf7c;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

.my-nav-item {
  min-height: 76px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .1);
}

.cc-nav-des,
.cc-nav-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.cc-nav-des {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 37px;
  margin-bottom: 5px;
  text-decoration: none;
}
</style>