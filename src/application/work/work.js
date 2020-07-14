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
Vue.prototype.GLOBAL = global_;
axios.defaults.baseURL=global_.BASE_URL;
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')