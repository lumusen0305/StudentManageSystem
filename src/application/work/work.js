import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import App from './work.vue'
import ElementUI from 'element-ui';
import router from './router';
import './assets/css/icon.css';
import './common/directives';
import 'babel-polyfill';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookie from 'vue-cookie'
import global_ from './Base.vue'
import axios from 'axios'
Vue.prototype.$ajax = axios

Vue.config.productionTip = false
Vue.use(VueQuillEditor)
Vue.use(VueCookie)   // 掛在在全域性了


//hgl的配置
import store from './store'
import http from './api/config';
import './mock/index';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
//使得我们可以使用axiod
Vue.prototype.$http = http


Vue.config.productionTip = false


Vue.use(ElementUI, {
    size: 'small'
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')