<template>
  <div class="home">
    <el-container style="height: 100%">
    <!-- 标题头部区域 -->
      <el-header>
        <div>
          <img src="@/assets/426e1f3b1d240b85452a8aa6b6c216da.jpeg" alt="" />
          <h1>后台管理系统</h1>
        </div>
        <div><el-button type="info" v-loading.fullscreen.lock="outbtn" element-loading-text="正在退出"
        @click="open">退出</el-button></div>
      </el-header>

      <el-container>
  <!-- 侧边栏 -->
        <el-aside ref="aside"  :span="12" :width="bool?'64px':'200px'" style="background: #333" >
        <div class="menu-toggle"><i class="el-icon-s-unfold" @click="toggle"> </i ></div>
          <!-- 一级菜单，使用的是menu组件,双重for循环进行遍历，拿到的列表数据
          进行渲染侧边栏导航区域，for循环外层是一级菜单，for里层是二级菜单，
          需要注意在el-submenu 组件开始循环，，以及index属性的值不能进行重复

           -->
          <el-menu router="true" collapse-transition="false" :collapse="bool" :default-active="userrouer" class="el-menu-vertical-demo"
          @open="handleOpen" @close="handleClose"
          background-color="#333" text-color="#fff" active-text-color="#409EFF" :unique-opened='true'>

            <el-submenu   v-for="(item) in list" :key="item.id"   :index="item['id']+''">
              <template slot="title" >

                <i :class="iconName[item.id]" style="margin-right:20px"></i>

                <span>{{item.authName}}</span>
              </template>
                <!-- 二级菜单循环,当点击时需要修改路由实现跳转  -->
              <el-menu-item-group v-for="(iii) in item.children" :key="iii.id">
                <el-menu-item v-loading.fullscreen.lock="fullscreenLoading"  element-loading-text="拼命加载中"
                 @click="KeepState('/home/'+iii.path)" :index="'/home/'+iii.path">

                 <i class="el-icon-menu"></i>{{iii.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>

        <el-main >
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fullscreenLoading: false,
      outbtn: false,
      // 实现侧边栏的切换
      bool: false,
      // 用于存储axios中的数据
      list: '',
      // 路由的留存，使刷新页码选中状态不会进行丢失
      userrouer: '',
      // 用于以及菜单图标的渲染
      iconName: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-release',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-ticket',
        145: 'el-icon-s-data'
      }
    }
  },
  // 生命周期函数created不能操作dom元素，可以操作data，props，数据
  created () {
    this.menu()
    this.userrouer = sessionStorage.getItem('keepstate')
  },
  mounted () {
    this.KeepState()
  },
  methods: {
    // 用于侧边栏的切换
    toggle () {
      this.bool = !this.bool
    },
    // 退出按钮
    loginOut () {
      sessionStorage.clear()
      this.$router.replace('/login')
    },
    // 退出按钮确认弹窗
    open () {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.outbtn = true

          setTimeout(() => {
            this.outbtn = false
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            this.$router.replace('/login')
          }, 2000)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // 获取列表数据axios请求
    async menu () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.list = res.data
    },
    // 点击选项保持选项选中状态，刷新也不会进行丢失
    KeepState (val) {
      this.fullscreenLoading = true

      setTimeout(() => {
        this.fullscreenLoading = false
      }, 2000)
      // 将val的值存储在本地缓存中，此时刷新也不会丢失状态否则关闭窗口
      sessionStorage.setItem('keepstate', val)
      this.userrouer = sessionStorage.getItem('keepstate')
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  background: black;
  padding-left: 0;
  div {
    &:first-of-type {
      display: flex;
      img {
        width: 70px;
      }
      h1 {
        font-size: 20px;
        font-weight: 400;
        padding: 0;
        margin: 0;
        color: white;
      }
    }
  }
}
.el-submenu__title {
  color: white;
}
.el-menu{
border: none;
}
.el-aside {
  color: white;
  background: #333;
}
.menu-toggle{
  height: 40px;
  display: flex;
  align-items: center;
  i{
  margin-left: 20px;
  font-size: 20px;
  }
}

</style>
