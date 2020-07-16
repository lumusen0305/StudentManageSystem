<template>
    <el-row>
    <el-col :span="18" :offset="3">
        <el-card shadow="hover" class="mgb10" style="margin-bottom:10px">
            <div>
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>
            </div>
        </el-card>
        <div v-for="(person,index) in studentsName">
        <el-col :span="6" :offset="1" style="padding-top: 20px">
            <el-card :body-style="{ padding: '0px' }" style="height: 350px">
                <img src="https://image.cache.storm.mg/styles/smg-800x533-fp/s3/media/image/2019/09/02/20190902-090103_U16633_M547859_f7ae.jpg?itok=15006Gpg" class="image">
                <div style="text-align: center">
                    <span style="padding-top: 20px">{{person.name}}</span>
                    <div style="padding-top: 20px">
                        <el-button type="primary" style="width: 300px;height: 40px" @click="showCommite=true" >修改操作</el-button>
                        <el-dialog title="更改個資" :visible.sync="showCommite"   width="20%" center>
                            <div>
                                <el-form>
                                    <el-form-item prop="學生姓名">
                                        <el-input v-model="person.name" placeholder="學生姓名">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item prop="學生學號">
                                        <el-input v-model="person.id" placeholder="學生學號">
                                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                                        </el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div slot="footer" >

                                <el-button @click="showCommite = false">取 消</el-button>
                                <el-button type="primary" @click="submitChange">確定發送</el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <div style="padding-top: 10px">
                        <el-button type="danger" v-on:click="deleteInfo(index)" style="width: 300px;height: 40px" >讓它退學</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
        </div>
    </el-col>
    </el-row>
</template>

<script>
    
   const studentTable = () =>import ("../manager/studentTable");
    export default {
        data() {
            return {
                username:'',
                userId:'',
                showCommite :false,
                isShow: false,
                studentsName:[
                    {
                      name:'夜貓刑警' ,
                        id:'12345'
                    },
                    {
                        name:'小貓超人' ,
                        id:'123405'
                    },
                    {
                        name:'發大財專家' ,
                        id:'123405'
                    },
                    {
                        name:'愛情摩天輪' ,
                        id:'123405'
                    },
                    {
                        name:'人出的去,錢進得來' ,
                        id:'123405'
                    },
                    {
                        name:'高雄發大財' ,
                        id:'123405'
                    },
                    {
                        name:'傻眼貓咪' ,
                        id:'123405'
                    },
                    {
                        name:'是在哈摟？' ,
                        id:'123405'
                    }
                ]

            }
        },
        components: {
            studentTable
        },
        methods:{
            deleteInfo(index){
                this.studentsName.splice(index,1);
                this.$message.error("已遣送回家")
            },
            submitChange(){
                this.showCommite = false;
                this.$message.success("修改成功")
            }
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>