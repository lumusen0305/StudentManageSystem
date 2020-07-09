import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/application/work/page/index.vue'
import classTable from '@/application/work/page/classTable.vue'
import chooseClasses from '@/application/work/page/chooseClasses'
import classDetail from '@/application/work/page/classDetail'
import complete from '@/application/work/page/complete'
import homeWorkDetail from '@/application/work/page/homeWorkDetail'
//使用 vue-router
Vue.use(VueRouter)

//匯出vue-router 設置
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/Index'
    },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../common/Home.vue'),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/Index',
                    component: Index,
                    meta: {title: '系统首页'}
                },
                {
                    path: '/classTable',
                    component: classTable,
                    meta: { title: '基础表格' }
                },
                {
                    path: '/chooseClasses',
                    component: chooseClasses,
                    meta: { title: '提交作業' },

                },
                {
                    path: '/classDetail',
                    component: classDetail,
                    meta: {title: '課程介紹'}
                },
                {
                    path: '/homeWorkDetail',
                    component: homeWorkDetail,
                    meta: {title: '作業提交'}
                },
                {
                    path: '/complete',
                    component: complete,
                    meta: { title: '賽事' }
                },
            ]
        },
    ]
});