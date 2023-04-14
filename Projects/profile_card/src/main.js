import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import { sync } from 'vuex-router-sync'
import router from './router'

import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// sync(router)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');