//处理来自于前段axios的数据
import Mock from 'mockjs'


export default{
    
    //教师管理作业,通过课程的id,得到这个课程下所有教师已经发布的作业
    getWorkByClassId: (classId) =>{
        return {
            code:20000,
            data:{
                homework:[{
                    //这次作业的ID
                    workid: Mock.Random.integer(1,1000),
                   worktitle:Mock.Random.ctitle(),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    //作业的文件url
                    url:Mock.Random.image()
                },
                {
                    //这次作业的ID
                    workid: Mock.Random.integer(1,1000),
                   worktitle:Mock.Random.ctitle(),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    //作业的文件url
                    url:Mock.Random.image()
                },{
                    //这次作业的ID
                    workid: Mock.Random.integer(1,1000),
                   worktitle:Mock.Random.ctitle(),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    //作业的文件url
                    url:Mock.Random.image()
                },
            ]
            }
        }

        

    },
    
    //通过给予的课程的某一次作业id,得到这次作业下所有同学提交的作业
    homeworkLists:(val) =>{
        return {
            code:2000,
            data:[
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            //这次教师发布的作业的id
            workid:Mock.Random.integer(),
            //课程的id
            courseid:Mock.Random.integer(),
            //同学提交的作业本身的id
            homeworkid:Mock.Random.integer(1,1000),
            //该同学是否已经提交作业,若已经提交作业,为true,未提交为false
            status:Mock.Random.boolean(),
            //同学提交的时间
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            workid:Mock.Random.integer(),
            courseid:Mock.Random.integer(),
            homeworkid:Mock.Random.integer(1,1000),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            workid:Mock.Random.integer(),
            courseid:Mock.Random.integer(),
            homeworkid:Mock.Random.integer(1,1000),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            workid:Mock.Random.integer(),
            courseid:Mock.Random.integer(),
            homeworkid:Mock.Random.integer(1,1000),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            workid:Mock.Random.integer(),
            courseid:Mock.Random.integer(),
            homeworkid:Mock.Random.integer(1,1000),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            workid:Mock.Random.integer(),
            courseid:Mock.Random.integer(),
            homeworkid:Mock.Random.integer(1,1000),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                
            ]

        }
        // if(val === '1')
        // else
        // {
        //     return{
        //         code:40400,
        //     data:{
        //         message:"学生编号错误"
        //     }
        //     }
        // }
    },

    //教师当前修改的作业
    currentWork:(val) =>{
        return {
            code:20000,
            data:{
                currentWork:{
                    workid:Mock.Random.integer(),
                    courseid:Mock.Random.integer(),
                    title:Mock.Random.ctitle(),
                    description:Mock.Random.csentence(),
                    fileList:[{
                        name:Mock.Random.name(),
                        url:Mock.Random.image(),
                    }],
                    opentime:Mock.Random.datetime('T'),
                    closetime:Mock.Random.datetime('T')
                },
            }
    }

    },


    //教师批改的学生作业
    currentStudentWork:(workid,studentid) => {
        return{
            code:20000,
            data:{
                currentStudentWork:{
                    studentid:Mock.Random.integer(1,1000),
                    studentname:Mock.Random.cname(),
                    //教师发布的作业的id
                    workid:Mock.Random.integer(1,1000),
                    courseid:Mock.Random.integer(),
                    //学生提交作业附件的1url
                    workurl:Mock.Random.image(),
                    //学生提交作业附件的名称
                    homeworkname:Mock.Random.ctitle(),
                    studentWork:{
                        name:Mock.Random.name(),
                        url:Mock.Random.image(),
                    },
                }
            }
        }
    }
}

