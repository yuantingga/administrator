<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 表单控件 -->
      <el-row :gutter="20">
        <!-- 表单输入框 -->
        <el-col :span="8">
          <div style="">
            <el-input clearable placeholder="请输入内容" v-model.trim="input2" @clear="inputaxios">
              <template slot="append"><div class="el-icon-search" @click="search" style="padding: 0"></div></template>
            </el-input>
          </div>
        </el-col>
        <!-- 添加用户按钮 -->
        <el-col :span="3">
          <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格控件 -->
      <el-row>
        <el-table :data="listDate.users" border style="width: 100%; margin-top: 15px">
          <el-table-column type="index" label="#" width=""> </el-table-column>
          <el-table-column prop="username" label="姓名" width="150"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="Changestatus(scope.row)" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" icon="el-icon-edit" @click="UsersModify(scope.row)" style="margin-right: 10px"></el-button>

              <el-dialog title="编辑用户信息" @close="AmendClose" :visible.sync="Users" width="50%" >
                <el-form ref="AmendForm" :model="Modify" :rules="AddUsersRules" status-icon>
                  <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="Modify.username" :disabled="true" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="emall" :label-width="formLabelWidth">
                    <el-input v-model="Modify.emall" autocomplete="off"></el-input>
                  </el-form-item>

                  <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
                    <el-input v-model="Modify.mobile" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item class="btn">
                    <div>
                      <el-button @click="Users = false">取 消</el-button>
                      <el-button type="primary" @click="ModifAffirm">确 定</el-button>
                    </div>
                  </el-form-item>
                </el-form>
              </el-dialog>

              <!-- <template slot-scope="scope"> -->
              <el-button type="danger" @click="open(scope.row)" size="mini" icon="el-icon-delete"></el-button>

              <!-- </template> -->

              <el-tooltip class="item" effect="dark" content="分享角色" placement="top" :enterable="false">
                <el-button type="warning" size="mini" icon="el-icon-share" @click="rolepupup(scope.row)"> </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!-- 分页控件 -->
      <el-row style="margin-top: 15px">
        <el-pagination ref="yemian" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="arr" :page-size="4" layout="total, sizes, prev, pager, next, jumper" :total="listDate.total"> </el-pagination>
      </el-row>
      <!-- 添加用户的弹出框 -->

      <el-row>
        <el-dialog title="添加" :before-close="AddUserClose" @close="AddUserClose" :visible.sync="dialogFormVisible">
          <el-form :hide-required-asterisk="true" ref="loginFormRef" :model="adduser" :rules="AddUsersRules" status-icon>
            <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
              <el-input v-model="adduser.username" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="adduser.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="emall" :label-width="formLabelWidth">
              <el-input v-model="adduser.emall" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
              <el-input v-model="adduser.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="UsersReset">取 消</el-button>
            <el-button type="primary" @click="UsersAffirm">确 定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const checkAge = (rule, value, callback) => {
      const regex = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/

      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的电话号码'))
      }
    }
    const Mailbox = (rule, value, callback) => {
      const regex = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/
      if (regex.test(value)) {
        callback()
      } else {
        callback(new Error('请重新输入邮箱'))
      }
    }

    return {
      rolename: '',
      role: false,
      roleValue: '',
      // 用于接收获取到的用户数据
      listDate: '',
      // 当前显示的页码
      currentPage4: 1,
      // 页码显示数字
      arr: [1, 2, 3, 4],
      // 默认显示每页多少条数据
      DateNum: 4,
      // 表单输入的值
      input2: '',
      // dialogFormVisible: true
      dialogFormVisible: false,
      Users: false,
      ruleForm: {
        select: [],
        region: ''
      },
      adduser: {
        username: '',
        password: '',
        mobile: '',
        emall: ''
      },
      Modify: {
        id: '',
        username: '',
        emall: '',
        mobile: ''
      },

      formLabelWidth: '120px',
      AddUsersRules: {
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 13, message: '请输入2-10位字符', trigger: 'blur' }
        ],
        mobile: [{ validator: checkAge, trigger: 'blur' }],
        emall: [{ validator: Mailbox, trigger: 'blur' }]
      }
    }
  },
  // 获取用户数据生命周期
  created () {
    setTimeout(() => {
      this.DateList()
    }, 1000)
  },
  methods: {
    rolepupup () {
      console.log(11111)
    },
    // 修改用户按钮
    UsersModify (scope) {
      this.Users = true
      console.log(scope)
      this.Modify.username = scope.username
      this.Modify.emall = scope.email
      this.Modify.mobile = scope.mobile
      this.Modify.id = scope.id
    },
    // 修改用户取消按钮

    // 修改用户确认按钮
    async ModifAffirm () {
      const aa = await this.$refs.AmendForm.validate()
      console.log(aa)
      if (!aa) return
      console.log(this.Modify)
      delete this.Modify.username
      console.log(this.Modify)
      console.log(this.Modify.id)
      const { data: res } = await this.$http.put(`users/${this.Modify.id}`, this.Modify)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改失败')
      this.$message({
        type: 'success',
        message: '修改成功'
      })
      this.Users = false
      this.DateList()
    },

    // 编辑弹框消失
    AmendClose () {
      this.$refs.AmendForm.resetFields()
    },
    //  添加用户取消按钮
    UsersReset () {
      this.dialogFormVisible = false
      this.$refs.loginFormRef.resetFields()
    },
    // 添加用户确认按钮
    async UsersAffirm () {
      // this.$refs.loginFormRef.resetFields()
      const aa = await this.$refs.loginFormRef.validate()
      console.log(aa)

      if (!aa) {
        this.$message.error('请重新输入')
      }
      const { data: res } = await this.$http.post('users', this.adduser)
      console.log(res)
      console.log(res.meta.status)
      if (res.meta.status !== 201) {
        this.$message.error('添加用户失败')
      } else {
        this.DateList()
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      }
      this.$refs.loginFormRef.resetFields()
      this.dialogFormVisible = false
    },
    // 点击改变每页显示多少条数据
    handleSizeChange (val) {
      this.DateNum = val
      this.DateList()
    },
    // 点击修改页码
    handleCurrentChange (val) {
      this.currentPage4 = parseInt(val)
      this.DateList()
    },
    // 获取用户数据函数
    async DateList () {
      const { data: res } = await this.$http.get('users', {
        params: {
          query: this.input2,
          // pagenum: 1,
          // pagesize: 4// 最多数据
          // 当前页码
          pagenum: this.currentPage4,
          // 每页显示多少条数据
          pagesize: this.DateNum
        }
      })
      console.log(res)
      if (res.meta.status !== 200) return
      const arr = res.data
      this.listDate = arr
    },
    // 修改用户状态函数
    async Changestatus (scorp) {
      console.log(scorp)
      console.log(scorp.id)
      // 发起请求
      const { data: res } = await this.$http.put(`users/${scorp.id}/state/${scorp.mg_state}`)
      if (res.meta.status !== 200) {
        this.open4()
        setTimeout(() => {
          scorp.mg_state = !scorp.mg_state
        }, 1000)
      } else {
        this.open2()
      }
    },
    // 查找用户
    search () {
      this.DateList()
    },
    // 去除表单数据后，显示原本的用户数据
    inputaxios () {
      this.DateList()
    },

    // 修改状态成功与失败提示框
    open4 () {
      this.$message.error('修改失败')
    },
    open2 () {
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
    // 删除弹框
    async open (scope) {
      try {
        const inquiry = this.$confirm('此操作将永久删除该用户, 是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        var kk = await inquiry
      } catch (e) {
        console.log(1111)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      if (kk === 'confirm') {
        const { data: res } = await this.$http.delete(`users/${scope.id}`)

        if (res.meta.status === 200) {
          console.log(11111)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.DateList()
        } else {
          console.log(222)
        }
      }
    },
    closeRole () {
      this.$refs.selectForm.resetFields()
    },
    AddUserClose () {
      this.dialogFormVisible = false
      this.$refs.loginFormRef.resetFields()
    },
    // 分配角色函数

    // 确认按钮
    async affirmrole () {
      this.role = false
      console.log(this.rolename)
      if (this.ruleForm.region === '') {
        this.$message.error('请输入角色')
      }
      console.log(this.ruleForm.region)
      const { data: res } = await this.$http.put(`users/${this.rolename.id}/role`, {
        rid: this.ruleForm.region
      })
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('更新失败')
      this.$message({
        type: 'success',
        message: '更新成功'
      })
      this.DateList()
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  margin-bottom: 30px;
}
.el-breadcrumb {
  margin-bottom: 15px;
}
.box-card {
  overflow: hidden;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
</style>
