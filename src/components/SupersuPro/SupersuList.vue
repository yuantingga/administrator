<template>
   <div >
    <!-- 面包屑导航 -->
    <el-row style="margin-bottom: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <!-- 权限列表 -->
    <el-row>
      <el-card class="box-card" lazy>
        <template >
          <el-table class=" table" height="600"   :data="list.data" border style="width: 100%">
            <el-table-column type="index" label="#" > </el-table-column>

            <el-table-column prop="authName" label="权限名称" > </el-table-column>
            <el-table-column prop="path" label="路径"> </el-table-column>
            <el-table-column prop="level" label="权限等级">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level == 0" type="">等级零</el-tag>
                <el-tag v-if="scope.row.level == 1" type="success">等级一</el-tag>
                <el-tag v-if="scope.row.level == 2" type="warning">等级二</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ''

    }
  },
  // 获取数据
  created () {
    setTimeout(() => {
      this.SupersuLis()
    }, 1000)
  },
  methods: {
    // 发送请求获取数据
    async SupersuLis () {
      const { data: res } = await this.$http.get('/api//rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }

      this.list = res
    }
  }
}
</script>

<style>

</style>
