<template>
    <div class="register">
        <h1>注册</h1>
        <el-form :model="registerForm" :rules="rules" :label-position="right" label-width="80px" ref="registerForm" class="registerForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPwd">
                <el-input type="password" v-model="registerForm.confirmPwd"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="registerForm.sex">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="registerForm.age"></el-input>
            </el-form-item>
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker v-model="registerForm.birthday" type="date" placeholder="选择出生日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-button type="primary" @click="register('registerForm')">注册</el-button>
                    <el-button type="primary" plain @click="returnLogin()">返回登录</el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data () {
    var validatePsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          this.$refs.registerForm.validateField('confirmPwd')
        }
        callback()
      }
    }
    var validateConfirmPsw = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPwd: '',
        sex: '',
        age: '',
        birthday: ''
      },
      rules: {
        username: [
          {required: 'true', message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 20, message: '用户名长度不能短于3字符，不能长于20字符', trigger: 'blur'}
        ],
        password: [
          {validator: validatePsw, trigger: 'blur'},
          {min: 4, max: 20, message: '密码长度不能短于4字符，不能长于20字符', trigger: 'blur'}
        ],
        confirmPwd: [
          {validator: validateConfirmPsw, trigger: 'blur'}
        ],
        sex: [
          {required: 'true', message: '请选择性别', trigger: 'blur'}
        ],
        age: [
          {required: 'true', message: '请输入年龄', trigger: 'blur'}
        ],
        birthday: [
          {required: 'true', message: '请输入出生日期', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    register (formName) {
      // 先把vue实例保存下来
      var vueInstance = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('/api/register', {
            id: '',
            username: this.registerForm.username,
            password: this.$getcode(this.registerForm.password),
            sex: this.registerForm.sex,
            age: this.registerForm.age,
            birthday: this.registerForm.birthday
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data.code === 0) {
                vueInstance.$router.push({path: '/login'})
                vueInstance.$message({
                  message: response.data.msg,
                  type: 'success',
                  center: true
                })
              } else if (response.data.code === 2) {
                vueInstance.$message({
                  message: response.data.msg,
                  type: 'error',
                  center: true
                })
              } else {
                console.log(response.data.msg)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('注册失败！')
          return false
        }
      })
    },
    returnLogin () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>
