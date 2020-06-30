import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/application/sign/page/Login.vue'
import Register from '@/application/sign/page/Register.vue'

//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [{
        name: 'Login', //元件呈現的名稱
        path: '/Login', //對應的路徑
        component: Login //對應的元件
    },
        {
            name: 'Register',
            path: '/Register',
            component: Register
        }
    ]
})