<template>
    <div style="height:100%">
    <el-row style="margin-bottom: 15px">
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-card class="box-card">
          <el-col>
            <el-button type="primary" style="margin-bottom: 15px" @click="AddProductEvent">添加分类</el-button>
            <el-dialog title="添加分类" :visible.sync="AddProduct" width="50%" >
              <el-col>
                <el-form ref="ProductClassify" :model="AddProductForm" :rules="AddProductRules" label-width="80px">
                  <el-form-item label="分类名称" prop="cat_name">
                    <el-input :hide-required-asterisk="true" v-model.trim="AddProductForm.cat_name"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-cascader ref="elcascader" :change-on-select="true" :options="AddProductList" :props="props" v-model="SelectProductList" :clearable="true"></el-cascader>
                  </el-form-item>
                </el-form>
              </el-col>
              <span slot="footer" class="dialog-footer">
                <el-button @click="CancelAdd">取 消</el-button>
                <el-button type="primary" @click="affirmBtn()">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>
          <el-col>
            <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="cat_id" border :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
              <el-table-column prop="cat_name" label="分类名称" sortable width="180"> </el-table-column>
              <el-table-column prop="cat_deleted" label="状态" sortable width="180">
                <template slot-scope="scope">
                  <svg v-if="scope.row.cat_deleted === false" t="1647691298522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2254" width="20" height="20">
                    <path
                      d="M512 22C241.38 22 22 241.38 22 512s219.38 490 490 490 490-219.38 490-490S782.62 22 512 22z m259.66 369.85L481.12 682.38c-13.87 13.87-36.36 13.87-50.23 0L252.34 503.83c-13.87-13.87-13.87-36.36 0-50.23 13.87-13.87 36.36-13.87 50.23 0l153.44 153.44 265.42-265.42c13.87-13.87 36.36-13.87 50.23 0 13.87 13.87 13.87 36.36 0 50.23z"
                      p-id="2255"
                      fill="#359724"
                    ></path>
                  </svg>

                  <svg v-else t="1647691594543" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3334" width="20" height="20">
                    <path
                      d="M827.392 195.584q65.536 65.536 97.792 147.456t32.256 167.936-32.256 167.936-97.792 147.456-147.456 98.304-167.936 32.768-168.448-32.768-147.968-98.304-98.304-147.456-32.768-167.936 32.768-167.936 98.304-147.456 147.968-97.792 168.448-32.256 167.936 32.256 147.456 97.792zM720.896 715.776q21.504-21.504 18.944-49.152t-24.064-49.152l-107.52-107.52 107.52-107.52q21.504-21.504 24.064-49.152t-18.944-49.152-51.712-21.504-51.712 21.504l-107.52 106.496-104.448-104.448q-21.504-20.48-49.152-23.04t-49.152 17.92q-21.504 21.504-21.504 52.224t21.504 52.224l104.448 104.448-104.448 104.448q-21.504 21.504-21.504 51.712t21.504 51.712 49.152 18.944 49.152-24.064l104.448-104.448 107.52 107.52q21.504 21.504 51.712 21.504t51.712-21.504z"
                      p-id="3335"
                      fill="#d81e06"
                    ></path>
                  </svg>
                </template>
              </el-table-column>
              <el-table-column prop="cat_level" label="级别">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.cat_level === 0" type="">一级</el-tag>
                  <el-tag v-if="scope.row.cat_level === 1" type="">二级</el-tag>
                  <el-tag v-if="scope.row.cat_level === 2" type="">三级</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
               <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="EditProduct(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="DeleteProduct(scope.row.cat_id)">删除</el-button>

               </template>
              </el-table-column>
            </el-table>
          </el-col>
          <!-- 编辑功能弹窗 -->
          <el-col>
            <!-- 编辑按钮弹窗 -->
            <el-dialog @close="editClose" title="编辑分类"  :visible.sync="editDialog" width="50%" >
              <el-form :model="EditProductName" :rules="editDialogRules"
              ref="editDialogForm" :hide-required-asterisk="true" label-width="100px" class="demo-ruleForm">
                 <el-form-item  label="原分类名称"  >
                  <el-input v-model="rawEditName" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item  label="新分类名称" prop="cat_name">
                  <el-input v-model="EditProductName.cat_name"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="CancelEditor">取 消</el-button>
                <el-button type="primary" @click="EditCategoryAffim">确 定</el-button>
              </span>
            </el-dialog>
          </el-col>

          <!-- 分页 -->
          <el-col style="margin: 15px 0">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="DropMenu" :page-size="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
    <el-row> </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {

      // 级联列表的props属性的值
      props: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },

      AddProductForm: {
        cat_name: ''
      },
      editDialogForm: {
        cat_name: ''
      },
      // 编辑分类名称
      // 编辑表单的校验规则
      editDialogRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 添加表单的校验规则
      AddProductRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 级联选择器选中节点
      SelectProductList: [],

      // 级联选择器渲染的数据
      AddProductList: [],
      // 添加分类弹框
      AddProduct: false,
      // 表格渲染的数据
      tableData: [],
      // 分页一共有多少条数据
      total: 0,
      // 当前页面码
      currentPage4: 1,
      DropMenu: [10, 20, 30],
      // 显示数据条树
      currentPage: 10,
      // 编辑分类弹窗
      editDialog: false,
      rawEditName: '',
      EditProductName: {
        cat_name: '',
        cat_id: ''
      }
    }
  },
  created () {
    setTimeout(() => {
      this.ProductList()
    }, 1000)
  },

  methods: {
    CancelEditor () {
      this.$message({
        type: 'info',
        message: '已取消修改'
      })
      this.editDialog = false
    },
    // 监听编辑弹窗关闭事件
    editClose () {
      this.editDialogForm.cat_name = ''
      this.$refs.editDialogForm.resetFields()
    },
    // 分类编辑点击确认按钮
    async EditCategoryAffim () {
      const formVerify = await this.$refs.editDialogForm.validate()
      if (!formVerify) {
        this.$message.error('分类名称不能为空')
      } else {
        console.log(this.EditProductName)
        const { data: res } = await this.$http.put(`categories/${this.EditProductName.cat_id}`, { cat_name: this.EditProductName.cat_name })
        console.log(res)
        if (res.meta.status !== 200) return

        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // this.EditProductName.cat_name = ''

        this.editDialog = false
        this.ProductList()
      }
    },

    // 分类编辑取消按钮
    // 分类编辑
    EditProduct (scope) {
      this.editDialog = true
      this.rawEditName = scope.cat_name

      this.EditProductName.cat_id = scope.cat_id
    },
    DeleteProduct (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(id)
          const { data: res } = await this.$http.delete(`categories/${id}`)
          console.log(res)
          if (res.meta.status !== 200) return this.$message.error('删除失败')
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.ProductList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },

    // 获取下拉选项的数据，也就是添加按钮的级联菜单
    async AddProductEvent (scope) {
      this.AddProduct = true
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2, pagenum: this.currentPage4, pagesize: this.currentPage }
      })
      this.AddProductList = res.data.result
    },
    // 添加分类确认按钮的点击
    async affirmBtn () {
      const formVerify = await this.$refs.ProductClassify.validate()
      console.log(formVerify)
      if (formVerify === false) return this.$message.error('请输入正确的信息')

      const fathid = this.$refs.elcascader.getCheckedNodes().length === 0 ? 0 : this.$refs.elcascader.getCheckedNodes()[0].value

      const level = this.SelectProductList.length

      const obj = {
        cat_name: this.AddProductForm.cat_name,
        // 父节点id
        cat_pid: fathid,
        // 分类级别
        cat_level: level
      }

      console.log(obj)
      const { data: res } = await this.$http.post('categories', obj)
      console.log(res)
      if (res.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '创建成功'
        })
        this.ProductList()

        this.AddProduct = false
        this.AddProductForm.cat_name = ''
        this.SelectProductList = []
        this.$refs.elcascader.clearCheckedNodes()
      }
    },
    // 添加取消按钮
    CancelAdd () {
      this.AddProduct = false
      this.$message({
        type: 'info',
        message: '已取消添加'
      })
      this.type = 0
    },

    // 获取分类数据，进行渲染表格
    async ProductList () {
      const { data: res } = await this.$http.get('categories', {
        params: { pagenum: this.currentPage4, pagesize: this.currentPage }
      })
      this.tableData = res.data.result
      this.total = res.data.total
      return res.data.result
    },
    // 分页组件的页码改变
    handleSizeChange (val) {
      this.currentPage = val
      this.ProductList()
    },
    // 分页组件的每页显示多少条数据
    handleCurrentChange (val) {
      this.currentPage4 = val
      this.ProductList()
    }
  }
}
</script>

<style></style>
