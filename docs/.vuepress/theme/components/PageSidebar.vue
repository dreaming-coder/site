<template>
  <div class="toc-container-sidebar">
    <div class="scroll-box">
      <div class="toc-title">
        {{ $page.title }}
      </div>
      <hr>
      <div class="toc-box">
        <TocItem></TocItem>
      </div>
    </div>
  </div>
</template>

<script>
import TocItem from './TocItem.vue'

export default {
  name: "PageSidebar",
  components: {
    TocItem
  },

}
</script>

<style scoped>
@media screen and (min-width: 1200px) {
  .toc-container-sidebar {
    display: block;
    position: fixed;
    right: 10px;
    top: 70px !important;
    width: 15rem;
    padding: 16px;
    font-size: 12px;
    background: #fff;
  }
  .scroll-box {
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .toc-title {
    font-size: small;
    font-weight: bolder;
    text-align: center;
  }

  hr {
    border: 0;
    border-top: 1px solid #eaecef;
    margin-top: 0.5rem;
  }

  ul {
    margin: 0;
    line-height: 1.7;
  }

}

</style>