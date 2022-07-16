<script lang="ts">
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'

export default {
  data() {
    return {
      isActive: (!this.$frontmatter || !this.$frontmatter.home) && this.$page.headers.length !== 0,
      withoutToc: 'page-with-toc',
      withToc: 'page-without-toc-sidebar',
      page: 'page'
    }
  }
}
</script>

<template>
  <main :class="[page, isActive ? withoutToc : withToc]">
    <slot name="top"/>

    <div class="theme-default-content">
      <slot name="content-top"/>

      <Content/>

      <slot name="content-bottom"/>
    </div>

    <PageMeta/>

    <PageNav/>

    <slot name="bottom"/>
  </main>
</template>
