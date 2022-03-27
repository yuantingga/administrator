<template>
  <div>
    <el-row>
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row style="margin: 15px 0">
      <el-card class="box-card">
        <el-row>
          <el-col>
            <el-form class="form">
              <el-input placeholder="请输入内容" clearable v-model="queryinput">
                <template  slot="append" >
                 <i @click="SearchProduct" class="el-icon-search"></i>
                </template>

              </el-input>
              <el-button type="primary" @click="$router.push('/home/AddProduct')"> 添加商品</el-button>
            </el-form>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-table :data="tableData"  border style="width: 100%">
              <el-table-column prop="goods_name" label="商品名称" width="400"> </el-table-column>
              <el-table-column prop="goods_price" label="商品价格(元)" width="180"> </el-table-column>
              <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
              <el-table-column prop="upd_time"  label="创建时间">
                  <template slot-scope="scope">
                   {{scope.row.add_time |DateFun}}
                  </template>
              </el-table-column>
              <el-table-column label="操作">
              <template slot-scope="scope">
              <el-button type="primary" size="mini"  icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteProduct(scope.row)"></el-button>
              </template>
               </el-table-column>
            </el-table>
          </el-col>
        </el-row>

        <el-row style="margin: 15px 0">
          <el-pagination background @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="handleSizeList"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="total"> </el-pagination>

        </el-row>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  created () {
    setTimeout(() => {
      this.getGoodsList()
    }, 1000)
  },
  data () {
    return {
      queryinput: '',
      tableData: [],
      currentPage4: 1,
      handleSizeList: [30, 40, 50, 60],
      pageSize: 30,
      total: 0

    }
  },
  methods: {

    // 删除商品
    deleteProduct (scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`goods/${scope.goods_id}`)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('删除失败')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getGoodsList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    SearchProduct () {
      // this.queryinput = ''
      this.getGoodsList()
    },
    // 当前页
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.getGoodsList()
    },
    // 每页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getGoodsList()
    },
    async getGoodsList () {
      const obj = {
        query: this.queryinput,
        pagenum: this.currentPage4,
        pagesize: this.pageSize
      }
      console.log(obj)

      const { data: res } = await this.$http.get('goods', {
        params: obj
      })
      console.log(res)
      if (res.meta.status !== 200) return
      this.total = res.data.total
      this.tableData = res.data.goods
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin: 15px 0;
  width: 500px;
  display: flex;
  button {
    margin-left: 15px;
  }
}
</style>
