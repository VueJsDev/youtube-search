import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import firebase from 'firebase'
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import vueNumeralFilterInstaller from 'vue-numeral-filter';

import * as uiv from 'uiv'

Vue.use(uiv)

Vue.use(vueNumeralFilterInstaller);

Vue.filter('formatDate', function (value) {
  if (!value) return ''
  return moment(value.toString()).format('DD-MM-YYYY')
})

Vue.use(VueToast, {
  position: "bottom"
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')