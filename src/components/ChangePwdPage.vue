<template>
  <div class="changePwd">
    <h1>修改密码</h1>
    <el-form :model="changePwdForm" :rules="rules" ref="changePwdForm" label-width="100px" class="changePwdForm">
      <el-form-item label="原密码" prop="oldPwd">
        <el-input type="password" v-model="changePwdForm.oldPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input type="password" v-model="changePwdForm.newPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkNewPwd">
        <el-input type="password" v-model="changePwdForm.checkNewPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit('changePwdForm')">提交</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validateOldPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        if (this.changePwdForm.newPwd !== '') {
          this.$refs.changePwdForm.validateField('newPwd')
        }
        callback()
      }
    }
    var validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.changePwdForm.oldPwd === value) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        if (this.changePwdForm.checkNewPwd !== '') {
          this.$refs.changePwdForm.validateField('checkNewPwd')
        }
        callback()
      }
    }
    var validateCheckNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.changePwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      changePwdForm: {
        oldPwd: '',
        newPwd: '',
        checkNewPwd: ''
      },
      rules: {
        oldPwd: [
          { validator: validateOldPwd, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        checkNewPwd: [
          { validator: validateCheckNewPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (formName) {
      var vueInstance = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.post('/api/changePwd', {
            username: this.$cookies.get('username'),
            oldpwd: this.$getcode(this.changePwdForm.oldPwd),
            newpwd: this.$getcode(this.changePwdForm.newPwd)
          })
            .then(function (response) {
              console.log(response.data)
              if (response.data.code === 0) {
                vueInstance.$cookies.remove('islogin')
                vueInstance.$cookies.remove('username')
                vueInstance.$router.push({path: '/login'})
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
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
