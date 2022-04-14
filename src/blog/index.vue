<template>
  <div>
    <el-container>
      <el-header style="height: 320px; background-color: #73cad3">
       <navbar/>
      </el-header>
      <el-main style="background-color: #88c379">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6"
            ><div class="grid-content bg-purple">
              <router-view :key="key" /></div
          ></el-col>
        </el-row>
      </el-main>
      <el-footer
        >Footer</el-footer
      >
    </el-container>
  </div>
</template>

<script>
import Navbar from "@/blog/components/Navbar";
// import Navbar from '@/layout/components/Navbar.vue';
export default {
  name: "Blog",
  components: {Navbar},
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0; 
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-footer {
  height: 320px!important;
  background-color: #040f2c;
  height: 276px;
}
</style>
