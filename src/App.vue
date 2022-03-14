<template>
  <div id="app">

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
