<template>
  <div class="home">
    <el-container>
        <el-header>
          <span>首页</span>
          <el-row id="homeRow" v-if="!iflogin">
            <el-button type="text" @click="tologin()">登录</el-button>
            <el-button type="text" @click="toregister()">注册</el-button>
          </el-row>
          <el-row id="homeRow" v-if="iflogin">
            <el-dropdown id="unameDrop" @command="handleCommand">
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
          </el-row>
        </el-header>
        <el-main>主页</el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iflogin: this.$cookies.get('islogin') === 'true',
      username: this.$cookies.get('username')
    }
  },
  methods: {
    tologin () {
      this.$router.push({path: '/login'})
    },
    toregister () {
      this.$router.push({path: '/register'})
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: rgb(92, 102, 255);
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 700px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  #homeRow {
    background-color: #B3FFFF;
    color: #333;
    text-align: right;
    line-height: 40px;
  }
</style>
