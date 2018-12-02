// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { JSEncrypt } from 'jsencrypt'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.use(VueCookies)

Vue.prototype.$getcode = function (password) {
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJuCVT0gtxlK9dHiOdj9Ha1YcmL6k5Ls0ohZrDQDXXlLKw23P4XIdFyqUxDcBfArjvKNjtAm8FM6vVryrUDIl/cCAwEAAQ==-----END PUBLIC KEY-----')
  let data = encrypt.encrypt(password)
  return data
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
