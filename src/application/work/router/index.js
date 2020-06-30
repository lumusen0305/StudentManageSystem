import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/application/work/page/index.vue'

//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [{
        name: 'Index', //元件呈現的名稱
        path: '/Index', //對應的路徑
        component: Index //對應的元件
    }
    ]
})