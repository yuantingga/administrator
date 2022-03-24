<template>
  <div class="home">
    <el-container style="height: 100%">
      <el-header>
        <div>
          <img src="@/assets/426e1f3b1d240b85452a8aa6b6c216da.jpeg" alt="" />
          <h1>后台管理系统</h1>
        </div>
        <div><el-button type="info" @click="open">退出</el-button></div>
      </el-header>

      <el-container>

        <el-aside ref="aside"  :span="12" :width="bool?'64px':'200px'" style="background: #333" >
        <div class="menu-toggle"><i class="el-icon-s-unfold" @click="toggle"> </i ></div>
          <el-menu router="true" collapse-transition="false" :collapse="bool" default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
          @close="handleClose" background-color="#333" text-color="#fff" active-text-color="#409EFF" :unique-opened='true'>

            <el-submenu   v-for="(item) in list" :key="item.id"   :index="item['id']+''">
              <template slot="title" >

                <i :class="iconName[item.id]" style="margin-right:20px"></i>

                <span>{{item.authName}}</span>
              </template>

              <el-menu-item-group v-for="(iii) in item.children" :key="iii.id">
                <el-menu-item :index="'/home/'+iii.path">

                 <i class="el-icon-menu"></i>{{iii.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>

        </el-aside>

        <el-main>
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

      bool: false,
      list: '',
      iconName: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-release',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-ticket',
        145: 'el-icon-s-data'
      }
    }
  },
  created () {
    this.menu()
  },
  mounted () {},
  methods: {
    toggle () {
      this.bool = !this.bool
    },
    loginOut () {
      sessionStorage.clear()
      this.$router.replace('/login')
    },
    open () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$router.replace('/login')
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async menu () {
      console.log(1111)
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.list = res.data
      console.log(this.list)
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
