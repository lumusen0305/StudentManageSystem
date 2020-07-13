//处理来自于前段axios的数据
import Mock from 'mockjs'


export default{
    
    getWorkByClassId: (classId) =>{
        return {
            code:20000,
            data:{
                homework:[{
                    workid: Mock.Random.integer(1,1000),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    url:Mock.Random.url()
                },
                {
                    workid: Mock.Random.integer(1,1000),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    url:Mock.Random.url()
                },
                {
                    workid: Mock.Random.integer(1,1000),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    url:Mock.Random.url()
                },
                {
                    workid: Mock.Random.integer(1,1000),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    url:Mock.Random.url()
                },
                {
                    workid: Mock.Random.integer(1,1000),
                    worktext:Mock.Random.csentence(),
                    workrequire:Mock.Random.csentence(),
                    opentime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                    url:Mock.Random.url()
                },
            ]
            }
        }

        

    },
    homeworkLists:(val) =>{
        console.log(val)
       
        return {
            code:2000,
            data:[
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
            status:Mock.Random.boolean(),
            date:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                },
                {
                    studentid:Mock.Random.integer(1,1000),
            studentname:Mock.Random.cname(),
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
    currentWork:(val) =>{
        return {
            code:20000,
            data:{
                currentWork:{
                    title:Mock.Random.ctitle(),
                    description:Mock.Random.csentence(),
                    fileList:[{
                        name:Mock.Random.name(),
                        url:Mock.Random.image(),
                    }],
                    opentime:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss'),
                    closetime:Mock.Random.datetime('yyyy/MM/dd HH:mm:ss')
                },
            }
    }

    },


    currentStudentWork:(workid,studentid) => {
        return{
            code:20000,
            data:{
                currentStudentWork:{
                    studentid:Mock.Random.integer(1,1000),
                    workid:Mock.Random.integer(1,1000),
                    studentWork:{
                        name:Mock.Random.name(),
                        url:Mock.Random.image(),
                    },
                }
            }
        }
    }
}

