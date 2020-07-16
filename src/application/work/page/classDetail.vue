<template>
    <div id="classDetail">
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover"  class="mgb10"  style="height:120px;">
                    <el-col :span="18">
                        <el-row class="class-info-cont">
                            <div>
                                <div class="class-info-name" >
                                    {{this.$store.state.studentHomeWorks.courseName}}
                                </div>
                            </div>
                            <div class="classIntroduce">2019-2020 2019-2020第二学期 建筑与艺术学院(教学)
                            </div>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="teacher_box">
                        <span>授課教師：</span><el-tooltip class="item" effect="dark" content="隔壁老王" placement="top">
                        <a style="border-radius:100%">
                            <img src="../../../assets/img/1049843.png" class="user-avator" alt />
                        </a>
                        </el-tooltip>
                    </el-col>
                </el-card>
                    <el-card shadow="hover" class="mgb20">
                        <a class="el-icon-caret-left"  href="javascript:history.go(-1)">返回</a>

                        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                            <li v-for="i in classHomeWork" class="infinite-list-item">
                                <el-row class="class_box" justify="around" style=" font-size:20px; padding-left: 15px">
                                    <el-col :span="5">
                                        <div  class="el-icon-edit">
                                            <a class="homework_title" @click="jumpToHomeWorkDetail(i)" >{{i.workRequire}}</a>
                                        </div>
                                    </el-col>
                                    <el-col :span="5" :offset="19" class="el-icon-check
">
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>
                    </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "classDetail",
        data: function () {
            return {
                classCount:10,
                classHomeWork:[
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "作業一",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "作業二",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "大作業",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "專門刁難學生的作業",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "cpu設計",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                ]
            }
        },
        computed: {
            newWorks() {
                return this.$store.state.studentHomeWorks
            }
        },
        methods:{

            jumpToHomeWorkDetail(item){
                this.$store.state.classHomeWorkId=item
                document.location.href = "/work#/homeWorkDetail";

                axios({
                    method: 'get',
                    url: this.GLOBAL.BASE_URL+'/getSingleWork',
                    data: {
                        'workId': item.workId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+jwt_tocken
                    },
                }).then((response) => {

                })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            getAllHomeWork(){
                axios({
                    method: 'get',
                    baseURL: 'http://139.186.71.42:8080',
                    url: '/getAllWorkByCourseId',
                    data: {
                        'courseId': this.$store.studentHomeWorks.courseId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    },
                }).then((response) => {
                    let item;
                    for (item in response.data.data){
                        this.classHomeWork.push(
                            {
                                closeTime : item.closeTime,
                                url : item.url,
                                workId : item.workId,
                                workRequire : item.workRequire,
                                workText : item.workText,

                            })
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.getAllHomeWork();
            console.log(this.$store.studentHomeWorks.courseName)

        }

    }
</script>

<style scoped>
    .mgb20 {
        margin-bottom: 20px;
    }
    .mgb10 {
        margin-bottom: 10px;
    }
    .homework_title{
        padding-left: 20px;
    }
    .class_box{
        /*align-items: center;*/
        padding-bottom: 15px;
        border-bottom: 3px solid #ccc;
        margin-bottom: 20px;
    }
    .teacher_box{
        padding-top: 3.5%;
    }
    a {
        color: black;
    }
    a:hover
    {
        color:#20a0ff;
    }
    .class-info-cont{
        padding-left: 10px;
        flex: 1;
        font-size: 16px;
        color: #999;
    }
    .class-info-cont div:first-child {
        padding-left: 0%;
        font-size: 28px;
        color: black;
        /*padding-bottom: px;*/
        /*margin-bottom: 20px;*/
    }
    .user-avator {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

</style>