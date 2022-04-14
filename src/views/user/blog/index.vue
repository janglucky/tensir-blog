<template>
  <div>
    <article-box
      article_title="第一篇文章的标题"
      article_abstract="摘要"
      article_cover="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
    ></article-box>
    <article-box></article-box>
    <article-box></article-box>
    <article-box></article-box>
  </div>
</template>

<script>
import ArticleBox from "@/components/ArticleBox";
export default {
  components: { ArticleBox },
  data() {
    return {
      curr_song: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    nextSong() {},
  },
};
</script>

