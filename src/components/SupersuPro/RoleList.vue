<template>
  <div >
    <!-- 面包屑 -->
    <el-row style="margin-bottom: 15px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/rights' }">权限列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/roles' }">角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <!-- 卡片 -->
      <el-card class="box-card">
        <!-- a按钮 -->
        <el-row>
          <el-button type="primary" style="margin: 10px 0" @click="AddroleEvent">添加角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-row>
          <!-- 表格 -->

          <el-table :data="list" style="width: 100%" border lazy>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <div class="drop-down">
                  <!-- 一级权限 -->
                  <div class="oneList" v-for="item in scope.row.children" :key="item.id">
                    <el-tag closable @close="RemovePermissions(scope.row, item.id)">{{ item.authName }} </el-tag><i class="el-icon-caret-right"></i>

                    <!-- 二级权限 -->
                    <div class="twolist">
                      <div v-for="two in item.children" :key="two.id">
                        <div class="two">
                          <el-tag type="success" closable @close="RemovePermissions(scope.row, two.id)">{{ two.authName }}</el-tag
                          ><i class="el-icon-caret-right"></i>
                        </div>
                        <!-- 三级权限 -->
                        <div class="threeList">
                          <div v-for="three in two.children" :key="three.id">
                            <el-tag type="warning" closable @close="RemovePermissions(scope.row, three.id)"> {{ three.authName }}</el-tag
                            ><i class="el-icon-caret-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"> </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
            <el-table-column prop="address" label="操作" width="300">
              <template slot-scope="scope">
                <el-button style="margin: 2px 5px" size="mini" type="primary" icon="el-icon-edit" @click='editBtn(scope.row)'>编辑</el-button>
                <el-button style="margin: 2px 5px" size="mini" type="danger" icon="el-icon-delete" @click="deletecole(scope.row)">删除</el-button>
                <el-button style="margin: 2px 5px" size="mini" type="warning" icon="el-icon-share" @click="dialog(scope.row)">分配权限</el-button>
                <slot name="popup" mes="scope.row"></slot>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- 分配用户权限 -->
        <el-dialog title="分配权限" @close="closeDefKeys" :visible.sync="dialogVisible" width="50%"
       >
          <el-tree ref="treeRef" :data="TreeStructuredData" show-checkbox node-key="id"
          :default-expand-all="true" :default-checked-keys="defKeys" :props="defaultProps"> </el-tree>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="affirm(defKeys)">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 添加角色 -->
        <el-dialog @close="closeform" title="添加角色" :visible.sync="Addrole" width="50%" >
          <!-- 角色表单 -->

          <div>
            <el-form :hide-required-asterisk="true" :model="ruleForm"
            status-icon :rules="roleRules" ref="rolefrom" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="ruleForm.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" >
                <el-input v-model="ruleForm.roleDesc"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="Addrole = false">取 消</el-button>
            <el-button type="primary" @click="affirmrole">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 编辑角色弹窗 -->

        <el-dialog title="编辑角色" @close="editClose" :visible.sync="compileRoles"
         width="50%" >

          <div>
            <el-form :hide-required-asterisk="true" :model="compile"
             status-icon :rules="compilerules" ref="compileRoles" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="compile.roleName"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="compile.roleDesc"></el-input>
              </el-form-item>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button @click="compileRoles = false">取 消</el-button>
            <el-button type="primary"  @click="EditConfirmation">确 定</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 添加角色弹窗
      Addrole: false,
      // 接收角色列表数据
      list: [],

      // 树型结构渲染选项数据
      TreeStructuredData: '',
      // 分配权限弹窗
      dialogVisible: false,

      defaultProps: {
        // 渲染的数组
        children: 'children',
        // 渲染数据的属性名称
        label: 'authName'
      },
      compilerules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
        ]
      },
      // 添加按钮的表单数据
      ruleForm: {
        roleDesc: '',
        roleName: ''
      },

      // 表单校验规则
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
        ]
      },
      // 树结构选中状态的数组
      defKeys: '',
      compile: {
        roleName: '',
        roleDesc: ''
      },
      // 编辑弹窗数据
      compileRoles: false,
      edit: ''
    }
  },
  created () {
    this.Rokleslist()
  },
  methods: {
    // 删除确定
    async  deletecole (scope) {
      try {
        // eslint-disable-next-line no-var
        var promis = await this.$confirm('是否确认删除该角色?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (e) {
        this.$message.error('已取消删除')
      }
      console.log(promis)
      if (promis === 'confirm') {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        const { data: res } = await this.$http.delete(`/api/roles/${scope.id}`)
        console.log(res)
        this.Rokleslist()
      }
    },
    // 编辑点击事件
    editBtn (scope) {
      this.compileRoles = true
      this.edit = scope
      this.compile.roleName = scope.roleName
    },
    // 编辑的确认按钮
    async EditConfirmation () {
      const { data: res } = await this.$http.put(`/api/roles/${this.edit.id}`, this.compile)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改失败')
      this.$message({
        type: 'success',
        message: '修改成功'
      })

      this.compileRoles = false
      this.Rokleslist()
      this.$refs.compileRoles.validate()
    },
    // 编辑角色，关闭弹窗
    editClose () {
      this.$refs.compileRoles.resetFields()
    },
    // 添加角色 确认按钮
    async affirmrole () {
      // 表单预校验
      console.log(1111)
      const verify = await this.$refs.rolefrom.validate()
      // 添加角色数据
      if (!verify) return
      const { data: res } = await this.$http.post('/api/roles', this.ruleForm)

      if (res.meta.status !== 201) return this.$message.error('添加失败')
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.Addrole = false
      this.Rokleslist()
    },

    // 点击添加角色
    async AddroleEvent () {
      this.Addrole = true
    },

    // 添加角色后表单进行去除数据
    closeform () {
      this.$refs.rolefrom.resetFields()
    },

    // 关闭弹窗去除内容
    closeDefKeys () {
      this.defKeys = []
    },
    // 获取角色列表
    async Rokleslist () {
      const { data: res } = await this.$http.get('/api/roles')
      this.list = res.data
    },

    // 展开项内容的删除功能
    async RemovePermissions (rolesID, rightsId) {
      console.log(rolesID.children[0])
      console.log(rightsId)
      try {
        // eslint-disable-next-line no-var
        var confimdata = await this.$confirm('是否删除该权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      if (confimdata === 'confirm') {
        const { data: res } = await this.$http.delete(`/api/roles/${rolesID.id}/rights/${rightsId}`)

        if (res.meta.status !== 200) return
        rolesID.children = res.data
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },

    // 树结构渲染选中状态
    async dialog (list) {
      function getlist (list, arr) {
        if (Array.isArray(list)) {
          Array.prototype.reduce.call(
            list,
            (a, ele) => {
              if (ele.children === undefined) {
                arr.push(ele.id)
              }
              getlist(ele.children, arr)
            },
            0
          )
        }
        return arr
      }
      // 选中预不选中的修改
      const { data: res } = await this.$http.get('/api/rights/tree')
      // 用于点击删除都选项的消失而不是直接刷新
      this.roles = list
      this.defKeys = getlist(list.children, [])
      this.TreeStructuredData = res.data
      this.dialogVisible = true
    },
    // 添加分配选项
    async affirm () {
      this.dialogVisible = false
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]

      const { data: res } = await this.$http.post(`/api/roles/${this.roles.id}/rights/`, { rids: keys.join(',') })

      if (res.meta.status !== 200) return this.$message(new Error('分配失败'))
      this.$message({
        type: 'success',
        message: '分配成功！'
      })
      this.Rokleslist()
      this.dialog()
    }

  }
}
</script>

<style lang="less" scoped>
.cell {
  box-sizing: border-box;
}
.drop-down {
  display: flex;
  flex-direction: column;

  .oneList {
    display: flex;
    margin-bottom: 10px;
    margin-left: 30px;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
  }
  .twolist {
    margin-left: 30px;
    > div {
      border-bottom: 1px solid #f1f1f1;
      &:last-of-type {
        border-bottom: none;
      }
    }
    div {
      margin: 10px;
      display: flex;
      align-items: center;

      .two {
        margin-right: 30px;
      }
      .threeList {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>
