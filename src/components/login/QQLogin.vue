<template>
<!-- 登陆界面 -->
  <div class="login">
    <div class="login-box">
    <!-- 头部logo -->
      <div class="demo-type">
        <el-avatar shape="circle" :size="80">
          <img src="@/assets/logo.png" />
        </el-avatar>
      </div>
      <!-- 表单区域 -->
      <div class="logon-form">
        <el-form ref="loginFormRef" :model="ruleForm" status-icon  :rules="loginFromRoules " label-width="65px" class="demo-ruleForm">
          <el-form-item label="登陆：" prop="username">
            <el-input prefix-icon="el-icon-s-custom" v-model.trim="ruleForm.username"  ></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
          <el-input prefix-icon="el-icon-unlock"  type="password"  placeholder="请输入密码" v-model="ruleForm.password"  autocomplete="off" show-password></el-input>

            <!-- <el-input prefix-icon="el-icon-unlock"  type="password" v-model="ruleForm.password" autocomplete="off"></el-input> -->
          </el-form-item>

          <el-form-item class="btn">
            <el-button type="primary" @click="login">登陆</el-button>
            <el-button @click="reset" >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data () {
    // 校验规则，离开表单出现加载效果
    const checkAge = (rule, value, callback) => {
      console.log(rule)
      setTimeout(() => {
        if (!value) {
          return callback(new Error('请重新输入'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      // data数据
      ruleForm: {
        username: '',
        password: ''
      },
      // 表单校验规则，通过的是rules属性进行绑定表单校验规则
      loginFromRoules: {
        // 登陆的校验规则
        username: [
          { validator: checkAge, trigger: 'blur' },
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
        ],
        // 密码的校验规则
        password: [
          { validator: checkAge, trigger: 'blur' },
          {
            required: true, message: '请输入密码', trigger: 'blur'
          },
          { min: 5, max: 10, message: '请输入6-10位字符', trigger: 'blur' }
        ]
        // required 必填项， message提示信息，trigger触发校验事件
      }
    }
  },
  methods: {
    // 重置按钮拿到表单对象进行重置resetFields
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登陆的按钮，validate对整个表单的校验方法，
    // 参数是一个函数，函数中的参数1 valid 代表的是表单校验结果
    // 为true 校验成功
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // 表单校验失败，返回
        if (!valid) return this.open3()
        const { data: res } = await this.$http.post('/api/login', this.ruleForm)

        if (res.meta.status === 200) {
          this.open2()
          sessionStorage.setItem('token', res.data.token)
          this.$router.replace('/home')
        } else if (res.meta.status === 400) {
          this.open4()
        }
      })
    },
    // 提示框成功
    open2 () {
      this.$message({
        message: '登陆成功',
        type: 'success'
      })
    },
    // 提示框失败
    open4 () {
      this.$message.error('登陆失败，请重新输入用户名密码')
    },
    // 当密码校验失败，弹出提示
    open3 () {
      this.$message.error('请重新输入用户名密码')
    }

  }

}
</script>

<style lang="less" scoped>
.login {
  background: black;

  height: 100%;
  h1 {
    margin: 0;
    padding: 0;
  }
  .login-box {
    width: 400px;
    height: 250px;
    background: white;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    .el-avatar {
      border: 3px solid #f1f1f1;
      margin-left: 50%;
      transform: translateX(-50%);
      margin-top: -40px;
      margin-bottom: 20px;
    }
    .el-input{
      box-sizing: border-box;
      width: 100%;
    }

    .btn{
      display: flex;
      justify-content: flex-end;
    }
  }
}
.el-form-item__content{
  margin-left: 30px;
}
</style>
