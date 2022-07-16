<template>
  <ul>
    <li v-for="(levelOne, i) in $page.headers" :key="i">
      <a :href="$page.path + '#' + levelOne.slug" class="level-1">{{levelOne.title}}</a>
      <ul v-if="levelOne.children.length !== 0">
        <li v-for="(levelTwo, j) in levelOne.children" :key="j">
          <a :href="$page.path + '#' + levelTwo.slug">{{levelTwo.title}}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TocItem",
  props: [
    "href",
    "text"
  ]
}
</script>

<style scoped>
a {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-left: none;
  font-weight: 300;
  color: #2c3e50;
}
.level-1 {
  font-weight: 400;
}
</style>