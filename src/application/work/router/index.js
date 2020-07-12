import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/application/work/page/index.vue'
import classTable from '@/application/work/page/classTable.vue'
import chooseClasses from '@/application/work/page/chooseClasses'
import classDetail from '@/application/work/page/classDetail'
import complete from '@/application/work/page/complete'
import homeWorkDetail from '@/application/work/page/homeWorkDetail'


//teacher模块
//路由懒加载
const manageClasses = () => import('@/application/work/page/teacher/manageClasses')
const classHome = () => import('@/application/work/common/ClassHome')
const classSide = () => import('@/application/work/common/ClassSide')
const manageWorks = () => import('@/application/work//page/teacher/manageWorks')
const homeworkTable = () => import('@/application/work/page/teacher/homeworkTable') 
const issueWorks = () => import('@/application/work/page/teacher/issueWorks') 
const studentHomework = () => import('@/application/work/page/teacher/studentHomework') 
const workHome = () => import('@/application/work/common/WorkHome')
const announcement = () => import('@/application/work/page/teacher/announcement')

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
                {
                    path: '/manageClasses',
                    component: manageClasses,
                    meta: { title: '课程管理' }
                },
                {
                    path: '/classHome',
                    component: classHome,
                    meta: { title: '课程主页' }
                },
                {
                    path: '/classSide',
                    component: classSide,
                    meta: { title: '课程目录' }
                },
                {
                    path: '/manageWorks',
                    component: manageWorks,
                    meta: { title: '作业发布' },
                },
                {
                    path: '/homeworkTable',
                    component: homeworkTable,
                    meta: { title: '作业查看' },
                },
                {
                    path: '/issueWorks',
                    component: issueWorks,
                    meta: { title: '作业发布' },
                },
                {
                    path: '/studentHomework',
                    component: studentHomework,
                    meta: { title: '作业批改' },
                },
                {
                    path: '/workHome',
                    component: workHome,
                    meta: { title: '作业页面' },
                },
                {
                    path: '/announcement',
                    component: announcement,
                    meta: { title: '公告页面' },
                },
            ]
        },
    ]
});