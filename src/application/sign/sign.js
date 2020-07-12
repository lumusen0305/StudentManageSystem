import Vue from 'vue'
import App from './sign.vue'
import ElementUI from 'element-ui';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie'
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookie)   // 掛在在全域性了

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')