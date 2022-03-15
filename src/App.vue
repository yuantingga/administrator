<template>
  <div id="app">
<!-- 路由组件 -->
    <router-link to="/login"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'

}
</script>
<style lang="less" scoped>
#app {
  margin: 0;
  padding: 0;
  h1 {
    margin: 0;
    padding: 0;
  }
}
</style>
