//处理来自于前段axios的数据
import Mock from 'mockjs'


export default{
    students:() =>{
        return{
            code:20000,
            data:{
                studentList:[
                    {
                        studnetid:Mock.Random.integer(1,10000),

                    }
                ]
            }
        }
    }
}