import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/application/work/page/index.vue'
import classTable from '@/application/work/page/classTable.vue'
import chooseClasses from '@/application/work/page/chooseClasses'
import classDetail from '@/application/work/page/classDetail'
import discuss from '@/application/work/page/discuss'
import homeWorkDetail from '@/application/work/page/homeWorkDetail'
<<<<<<< HEAD


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
=======
import competition from '@/application/work/page/discussBar'
import recruit from '@/application/work/page/recruit'
<<<<<<< HEAD
>>>>>>> master

=======
import remind from '@/application/work/page/remind'
import remindOther from '@/application/work/page/remindOther'
>>>>>>> d4ab6aa1b7f1cc3aef33bb9eb6a5e9738fcd5202
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
                    path: '/discussBar',
                    component: competition,
                    meta: { title: '討論區' }
                },
                {
                    path: '/recruit',
                    component: recruit,
                    meta: { title: '招募隊友' }
                },
                {
                    path: '/discuss',
                    component: discuss,
                    meta: { title: '討論' }
                },
                {
<<<<<<< HEAD
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
=======
                    path: '/remind',
                    component: remind,
                    meta: { title: '提醒' }
                },
                {
                    path: '/remindOther',
                    component: remindOther,
                    meta: { title: '發送提醒' }
>>>>>>> d4ab6aa1b7f1cc3aef33bb9eb6a5e9738fcd5202
                },
            ]
        },
    ]
});