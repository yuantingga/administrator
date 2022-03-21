<template>
  <div>
    <el-row style="margin-bottom: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <el-col>
          <el-alert title="只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon> </el-alert>
        </el-col>
        <el-col style="margin: 15px 0"> 选择商品分类： <el-cascader :options="SortingList" v-model="SortSelection" :props="props" @change="MerchandiseLedger"></el-cascader> </el-col>
        <el-col>
          <el-tabs v-model="activeName">
            <el-tab-pane label="动态参数" name="many">
              <el-button type="primary" @click="AddDialog = true" :disabled="isDisabled">添加参数</el-button>

              <el-table :data="dynamicTable" border style="width: 100%; margin: 15px 0">
                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="attr_name" label="属性名称"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="SortListAmend(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="SortListDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="静态属性" name="only">
              <el-button type="primary" @click="AddDialog = true" :disabled="isDisabled">添加属性</el-button>
              <el-table :data="staticTable" border style="width: 100%; margin: 15px 0">
                <el-table-column type="expand">
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="attr_name" label="属性名称"> </el-table-column>
                <el-table-column>
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="SortListAmend(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="SortListDelete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>

        <el-col>
          <!-- 编辑弹窗 -->

          <el-dialog @close="editClose" :title="editForm.TitleName" :visible.sync="editDialog" width="50%" >
            <!-- TitleName -->
            <el-form :hide-required-asterisk="true" :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-ruleForm">
              <el-form-item :label="AddName + ' :'">
                <el-input v-model="editMetadata" disabled></el-input>
              </el-form-item>
              <el-form-item :label="editForm.TitleName + ' :'" prop="attr_name">
                <el-input v-model="editForm.attr_name"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialog = false">取 消</el-button>
              <el-button type="primary" @click="editConfirm">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
        <!-- 添加弹窗 -->
        <el-col>
          <el-dialog @close="removalForm" :title="dialogTitle" :visible.sync="AddDialog" width="50%" >
            <el-form :hide-required-asterisk="true" :model="AddDialogForm" :rules="AddDialogRules" ref="AdddialogForm" label-width="100px" class="demo-ruleForm">
              <el-form-item :label="AddName" prop="attr_name">
                <el-input v-model="AddDialogForm.attr_name"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="AddDialog = false">取 消</el-button>
              <el-button type="primary" @click="Addbtn">确 定</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  created () {
    this.SortingParameterList()
  },
  computed: {
    isDisabled () {
      return this.SortSelection.length !== 3
    }
  },

  data () {
    return {

      // 用于编辑按钮点击确认的请求数据
      editDate: '',
      // 编辑弹窗，显示原来的数据，下面进行修改上面进行显示原来的数据
      editMetadata: '',
      // 编辑弹窗
      editDialog: false,
      // 编辑弹窗的弹窗标题，使用的是同一共弹窗， 在请求axios数据进行区分该参数的值
      dialogTitle: '添加参数',
      AddName: '参数名称',
      // 编辑表单的数据
      editForm: {
        TitleName: '修改参数',
        attr_name: ''
        // 编辑修改新的数据
      },
      // 添加按钮弹窗
      AddDialog: false,
      // tabs选项选择
      activeName: 'many',
      // 分类选择
      SortSelection: [],
      // 级联选择器分类列表
      SortingList: [],

      // 动态表格数据
      dynamicTable: [],
      // 静态表格数据
      staticTable: [],
      // 级联选择器数据
      props: {
        // 触发级联选择器事件
        expandTrigger: 'click',
        // 每一个选项标识符
        value: 'cat_id',
        // 选项显示文本
        label: 'cat_name'
      },
      // 添加按钮表单输入数据
      AddDialogForm: {
        attr_name: ''
      },
      // 编辑弹窗检索表单
      editFormRules: {
        attr_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      // 添加按钮检索表单
      AddDialogRules: {
        attr_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleOpen () {

    },
    // 编辑弹窗关闭事件，对表单进行重置
    editClose () {
      this.$refs.editForm.resetFields()
    },
    // 编辑确认按钮 进行添加参数或是属性
    async editConfirm () {
      if (!(await this.$refs.editForm.validate())) return
      const { data: res } = await this.$http.put(`categories/${this.SortSelection[2]}/attributes/${this.editDate.attr_id}`, { attr_name: this.editForm.attr_name, attr_sel: this.activeName })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改失败')
      this.$message({
        type: 'success',
        message: '修改成功'
      })

      this.editDialog = false
      this.MerchandiseLedger()
    },
    // 编辑按钮点击函数，编辑弹窗的显示， 使用editDate进行存储数据用于后续编辑确认按钮
    // 发送请求的参数
    // editMetadata 表单显示修改前原数据
    SortListAmend (scope) {
      this.editDate = scope
      this.editDialog = true
      this.editMetadata = scope.attr_name
    },
    // 删除按钮
    SortListDelete (scope) {
      console.log(scope)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          const { data: res } = await this.$http.delete(`categories/${this.SortSelection[2]}/attributes/${scope.attr_id}`)
          console.log(res)
          this.MerchandiseLedger()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加按钮弹窗消失后对表单进行清空
    removalForm () {
      this.$refs.AdddialogForm.resetFields()
    },
    // 添加参数/属性的确认按钮
    async Addbtn () {
      if (!this.$refs.AdddialogForm.validate()) return
      const obj = {
        attr_name: this.AddDialogForm.attr_name,
        attr_sel: this.activeName
      }
      const { data: res } = await this.$http.post(`categories/${this.SortSelection[2]}/attributes`, obj)
      console.log(res)
      this.CategoryList()
      this.AddDialog = false
    },
    // 最初渲染表格的数据
    async CategoryList () {
      const { data: res } = await this.$http.get(`categories/${this.SortSelection[2]}/attributes`, {
        params: { sel: this.activeName }
      })
      console.log(res)
      // for (const i in res.data) {
      //   const arr = res.data[i].attr_vals.split(',')
      //   console.log(arr);
      // }
      if (this.activeName === 'only') {
        this.staticTable = res.data
        this.dialogTitle = '添加属性'
        this.AddName = '属性名称'
        this.editForm.TitleName = '修改属性'
      } else {
        this.dynamicTable = res.data
        this.AddName = '参数名称'
        this.dialogTitle = '添加参数'
        this.editForm.TitleName = '修改参数'
      }
    },
    // 用于控制级联选择器只能选择第三季选项
    MerchandiseLedger () {
      if (this.SortSelection.length !== 3) {
        this.SortSelection = []
      } else {
        this.CategoryList()
      }
    },
    // 用于获取级联选择器的分类
    async SortingParameterList () {
      const { data: res } = await this.$http.get('categories')
      this.SortingList = res.data
    }
  },
  watch: {
    activeName (val) {
      this.CategoryList()
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
}
</style>
