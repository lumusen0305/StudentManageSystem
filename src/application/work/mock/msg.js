//处理来自于前段axios的数据
import Mock from 'mockjs'


export default{
    getMsgById:(val) =>{
        return{
            code:200,
            data:[ {
                "msg" : "消息信息",
                "msgDate" : "日期",
                "msgId" : "1",
                "msgStatus" : "0"
              } ,
              {
                "msg" : "香蕉军",
                "msgDate" : "日期",
                "msgId" : "2",
                "msgStatus" : "0"
              } ,{
                "msg" : "比利王",
                "msgDate" : "日期",
                "msgId" : "3",
                "msgStatus" : "1"
              } ,]
        }
    }
}