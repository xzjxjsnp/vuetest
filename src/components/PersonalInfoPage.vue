<template>
  <div class="personalInfo">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="22">
              <div class="grid-content bg-purple">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>个人信息</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="grid-content bg-purple-light">
                <el-dropdown id="unameDrop" v-if="iflogin" @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="pInformation">个人信息</el-dropdown-item>
                    <el-dropdown-item>待定1</el-dropdown-item>
                    <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="PinfoRow">
            <el-row class="infoRow" v-if="!isClickEdit">
              <span class="info-name">人员名称：</span>
              <span>{{ username }}</span>
            </el-row>
            <el-row class="infoRow" v-if="!isClickEdit">
              <span class="info-name">性别： </span>
              <span>{{ sex }}</span>
            </el-row>
            <el-row class="infoRow" v-if="isClickEdit">
              <span>性别: </span>
              <el-radio-group v-model="newSex">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-row>
            <el-row class="infoRow" v-if="!isClickEdit">
              <span class="info-name">年龄：</span>
              <span>{{ age }}</span>
            </el-row>
            <el-row class="infoRow" v-if="isClickEdit">
              <span>年龄: </span>
              <el-input v-model="newAge"></el-input>
            </el-row>
            <el-row class="infoRow" v-if="!isClickEdit">
              <span class="info-name">出生日期：</span>
              <span>{{ birthday }}</span>
            </el-row>
            <el-row class="infoRow" v-if="isClickEdit">
              <el-date-picker v-model="newBirthday" type="date" placeholder="选择出生日期"></el-date-picker>
            </el-row>
            <el-row class="infoRow">
              <el-button type="primary" v-if="!isClickEdit" round @click="edit()">编辑</el-button>
              <el-button type="primary" v-if="isClickEdit" round @click="submit()">提交</el-button>
              <el-button v-if="isClickEdit" round @click="cancel()">取消</el-button>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iflogin: this.$cookies.get('islogin') === 'true',
      username: this.$cookies.get('username'),
      sex: '',
      age: '',
      birthday: '',
      isClickEdit: false
    }
  },
  mounted () {
    var vueInstance = this
    this.axios.get('/api/getUserInfo/' + this.$cookies.get('username'))
      .then(function (response) {
        console.log(response.data)
        if (response.data.code === 0) {
          vueInstance.sex = response.data.data.sex
          vueInstance.age = response.data.data.age
          vueInstance.birthday = response.data.data.birthday.split('T')[0]
        } else {
          vueInstance.$message({
            message: response.data.msg,
            type: 'error',
            center: true
          })
          console.log('获取个人信息失败！')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    edit () {
      this.isClickEdit = true
    },
    submit () {
      var vueInstance = this
      this.axios.post('/api/updateUserInfo', {
        username: this.$cookies.get('username'),
        sex: vueInstance.newSex,
        age: vueInstance.newAge,
        birthday: vueInstance.newBirthday
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.code === 0) {
            vueInstance.isClickEdit = false
            vueInstance.sex = response.data.data.sex
            vueInstance.age = response.data.data.age
            vueInstance.birthday = response.data.data.birthday.split('T')[0]
          } else {
            vueInstance.$message({
              message: response.data.msg,
              type: 'error',
              center: true
            })
            console.log('更新个人信息失败！')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    cancel () {
      this.isClickEdit = false
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$message(command + '：已成功登出')
        this.$cookies.remove('islogin')
        this.$cookies.remove('username')
        this.$router.push({path: '/login'})
      }
      if (command === 'pInformation') {
        this.$router.push({path: '/personalInfo'})
      }
      if (command === 'changePwd') {
        this.$router.push({path: '/changePwd'})
      }
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #EBEEF5;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-left: 5px;
    padding-right: 5px;
  }
  .el-aside {
    background-color: rgb(92, 102, 255);
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
    height: 800px;
    /* line-height: 700px; */
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .infoRow {
    height: 100px;
    text-align: center;
    border-color: black;
    border-style: dotted;
    border-width: 1px;
  }
  .el-breadcrumb {
    height: 60px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
    height: 60px;
  }
  .bg-purple-light {
    background: #e5e9f2;
    height: 60px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
