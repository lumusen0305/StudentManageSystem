//这是对于mock拦截的分发

import Mock from 'mockjs'
import manageClassAPi from './manageClasses'
//设置后端返回的延时
Mock.setup({
    timeout:'200-1000'
})




//教师的课程管理
Mock.mock(/\/works\/getClasses/,'get',manageClassAPi.getWorkByClassId)
Mock.mock(/\/works\/homeworkLists/,'get',manageClassAPi.homeworkLists)
Mock.mock(/\/works\/currentWork/,'get',manageClassAPi.currentWork)
