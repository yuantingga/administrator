<template>
<div>
  <h1>home</h1>
  <button @click="loginOut">退出登陆</button>
</div>

</template>

<script>
export default {
  methods: {
    loginOut () {
      sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style></style>
