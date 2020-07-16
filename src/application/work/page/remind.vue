<template>
<div>
    <ul class="infinite-list"  style="overflow:auto">
                <li class="mgb20">
    <el-row :gutter="20">
        <el-col :span="18" :offset="3"  v-for="i in message" :key="i.msgId">
         
            
                    <el-card style="margin-bottom:30px">
                        <div class="classes_title">
                            <span>課程：</span>
                            <span>{{message.course}}</span>
                        </div>
                        <div style="padding-top: 20px;padding-left: 10px;padding-bottom: 50px">
                            <span>
                                {{i.msg}}
                            </span>

                        </div>
                        <div style="padding-left: 10px;">
                            <span>
                                日期:
                            </span>
                            <span>
                                {{i.msgDate}}
                            </span>
                            <div style="float:right;right:20px">
                                <el-button type="primary"  size="small" v-if="i.msgStatus==0" @click="updateStatus(i.msgId)">收到</el-button>
                            </div>
                        </div>
                        <div></div>
                    </el-card>
               
                
        </el-col>
        
    </el-row>
     </li>
            </ul>

    </div>
</template>

<script>
    export default {
        name: "remind",
        data() {
            return {
                dialogFormVisible: false,
                classCount: 5,
                message: [
                    {
                        msg: "123",
                        msgDate: "",
                        msgId: "",
                        msgStatus: ""
                    }
                ]
            }
        },
        methods: {
            initializeMsg(val) {
                console.log("初始化");

                this
                    .$http
                    .get("api//Message/getMsgById", val)
                    .then(res => {
                        res = res.data;
                        if (res.code === 200) {
                            console.log(res.data);
                            for (let i = 0; i < res.data.length; i++) {
                                this.message=res.data;
                            }
                        }
                    })
            },

            updateStatus(val){
                var formdata=new FormData();
                        formdata.append("msgId",val),
                        formdata.append("msgStatus",1),
                        formdata.append("account","123");
                this.$http.post("api//Message/updateMsgStatus",formdata).then(res =>{
                    res=res.data
                    if(res.code==200)
                    {
                        for(let i =0;i < this.message.length;i++){
                            if(this.message[i].msgId == val){
                                this.message[i].msgStatus =1;
                            }
                        }
                    }
                })
            }

        },
        created() {
            this.initializeMsg(1);
        }
    }
</script>

<style scoped="scoped">
    .classes_title {
        font-size: 25px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;

    }
    .mgb20 {
        margin-bottom: 50px;
    }
</style>