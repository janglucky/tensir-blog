<template>
  <div class="article-box">
    <h1>{{ article_title }}</h1>
    <p>{{ article_abstract }}</p>
    <el-image :src="article_cover" lazy>
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
    </el-image>
    <div>
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleBox",
  props: {
    article_title: "",
    article_abstract: "",
    article_cover: "",
  },
  computed: {},
};
</script>

<style scoped>
</style>
