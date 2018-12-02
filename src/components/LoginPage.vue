<template>
    <div class="login-page">
        <h1>登录</h1>
        <el-form :model="login" ref="login">
            <el-form-item prop="username" label="用户名：">
                <el-input placeholder="请输入用户名" v-model="login.username" clearable></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
                <el-input type="password" placeholder="请输入密码" v-model="login.password" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-button type="primary" @click="submit()">登录</el-button>
                    <el-button type="primary" plain @click="toRegister()">注册</el-button>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit () {
      // 先把vue实例保存下来
      var vueInstance = this
      this.axios.post('/api/login', {
        id: '',
        username: this.login.username,
        password: this.$getcode(this.login.password)
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === 0) {
            vueInstance.$cookies.set('islogin', 'true')
            vueInstance.$cookies.set('username', response.data.data.username)
            vueInstance.$router.push({path: '/'})
            vueInstance.$message({
              message: response.data.msg,
              type: 'success',
              center: true
            })
          } else {
            vueInstance.$message({
              message: response.data.msg,
              type: 'error',
              center: true
            })
            console.log('登录失败！')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toRegister () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>
