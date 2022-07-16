<script setup lang="ts">
import PageMeta from '@theme/PageMeta.vue'
import PageNav from '@theme/PageNav.vue'

import {usePageData, usePageFrontmatter} from "@vuepress/client";
import {DefaultThemePageFrontmatter} from "@vuepress/theme-default/lib/shared";

const page = usePageData()
const frontmatter = usePageFrontmatter<DefaultThemePageFrontmatter>()

const isActive = (!frontmatter || !frontmatter.value.home) && page.value.headers.length !== 0
const withToc = 'page-with-toc'
const withoutToc = 'page-without-toc-sidebar'
const pageBasicClass = 'page'
</script>

<template>
  <main :class="[pageBasicClass, isActive ? withToc : withoutToc]">
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
