<template>
  <div class="icon-item">
      <i class="el-icon-document" />
      <span>{{ filename }}</span>
  </div>
</template>

<script>
export default {
  name: "FileDisplay",
  props: {
    is_dir: 1,
    filename: "log.txt",
  },
};
</script>


<style scoped>
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 100px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: default;
}
span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}
</style>
