<template>
  <div class="navbar">
      <router-link class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
      <div class="nav-menu">
        <ul>
          <li ><a href="#">首页</a></li>
          <li :class="{'curr-page': path=='/blog'}"><a href="#">首页</a></li>
          <li><a href="#">首页</a></li>
          <li><a href="#/login">登录</a></li>
        </ul>
      </div>
  </div>
</template>
 
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      path: this.$route.path,
      title: 'Vue Element Admin',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  },
  created() {
    console.log(this.path)
  }
}
</script>
 
<style lang="scss" scoped>
.navbar {
  height: 60px;
  background-color: #fff;
}
.sidebar-logo {
  float: left;
  height: 50px;
  margin: 5px 10px;
}
.sidebar-title {
  float: left;
  line-height: 60px;
  margin: 0;
  font-size: 18px;
}
.sidebar-logo-link {
  float: left;
  height: 60px;
}
.nav-menu {
  float: left;
  text-align: center;
}
.curr-page {
  border-bottom: 3px #000 solid;
  color: rgb(136 195 121);
  font-weight: bold;
}
.nav-menu li{
  line-height: 60px;
  list-style: none;
  display: inline-block;
  width: 100px;
}
 
</style>