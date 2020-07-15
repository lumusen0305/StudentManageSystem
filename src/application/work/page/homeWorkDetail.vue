<template>
    <div id="homeWorkDetail">
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
                    <div class="homework-info-name" >
                        练习2
                    </div>
                    <div style="padding-top: 1%;
">
                    <el-alert
                            title="已交付"
                            type="success"
                            show-icon
                            style="height: 50px;"
                    >
                    </el-alert>
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick"style="padding-top: 20px">
                        <el-tab-pane label="作業要求" name="first">
                            <el-row :gutter="20">
                                <el-col :span="22" :offset="1">
                                    <el-card shadow="never"  style="background-color:rgba(245, 232, 213,0.5);"  class="mgb20">
                                        <el-row justify="center" class="homework_detail">
                                            <el-col :span="3" :offset="1">
                                                <div style="height: 25px;">占成绩比例</div>
                                            </el-col>
                                            <el-col :span="1" :offset="1">
                                                <nav style="height: 25px;">5.0%</nav>
                                            </el-col>
                                            <el-col :span="4" :offset="6">
                                                <div style="height: 25px;">公布成绩时间</div>
                                            </el-col>
                                            <el-col :span="7" :offset="1">
                                                <nav style="height: 25px;">不公布</nav>
                                            </el-col>
                                        </el-row>

                                        <el-row justify="center" class="homework_detail" style="padding-top: 20px">
                                            <el-col :span="3" :offset="1">
                                                <div style="height: 25px;">开放时间</div>
                                            </el-col>
                                            <el-col :span="6" :offset="1">
                                                <nav style="height: 25px;">2020.03.28 00:28</nav>
                                            </el-col>
                                            <el-col :span="4" :offset="1">
                                                <div style="height: 25px;">作业交付截止</div>
                                            </el-col>
                                            <el-col :span="6" :offset="1">
                                                <nav style="height: 25px;">{{this.$store.state.classHomeWorkId.closeTime}}</nav>
                                            </el-col>
                                        </el-row>

                                        <el-row justify="center" class="homework_detail" style="padding-top: 20px">
                                            <el-col :span="3" :offset="1">
                                                <div style="height: 25px;">作业形式</div>
                                            </el-col>
                                            <el-col :span="3" :offset="1">
                                                <nav style="height: 25px;">个人作业</nav>
                                            </el-col>
                                            <el-col :span="3" :offset="4">
                                                <div style="height: 25px;">完成指标</div>
                                            </el-col>
                                            <el-col :span="3" :offset="2">
                                                <nav style="height: 25px;">提交作业</nav>
                                            </el-col>
                                        </el-row>
                                    </el-card>
                                    <el-card shadow="never"  style="background-color:rgba(245, 232, 213,0.5);"  class="mgb20">
                                    <div class="second_box">
                                        <span >评分方式 ( 教师评阅 100.0% )</span>
                                    </div>
                                        <div>
                                            <div class="row-index-border"></div>
                                            <span style="font-size: 17px"> 教师评阅</span>
                                            <div class="second_box_instructions" style="padding-bottom: 10px">
                                                <el-row>
                                                    <el-col :span="4">
                                                        <span>占成绩比例</span>
                                                    </el-col>
                                                    <el-col :span="4" >
                                                        <span>100%</span>
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </div>
                                    </el-card>
                                    <div class="thrid_box">
                                        <el-row class="table_titile">
                                            <el-col :span="18">
                                                <span>附件名</span>
                                            </el-col>
                                            <el-col :span="6">
                                                <span>大小</span>
                                            </el-col>
                                        </el-row>
                                        <ul class="infinite-list" v-infinite-scroll="load" >
                                            <ol v-for="i in classCount" class="attachment-row " >
                                                <div @click="jump" >
                                                    <el-row style="padding-top:12px">
                                                        <el-col :span="18">
                                                            <span class="el-icon-document"></span>
                                                            <span style="padding-left: 10px">
                                                                {{fileName}}
                                                            </span>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <span>15 KB</span>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </ol>
                                        </ul>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="我的作業" name="second">
                            <div v-if="homeworkLog">
                                <div class="thrid_box">
                                    <el-row class="homework_log_titile">
                                        <el-col :span="18">
                                            <span>交付历史与批改记录</span>
                                        </el-col>
                                    </el-row>
                                    <ul class="infinite-list" v-infinite-scroll="load" style="padding-bottom: 200px">
                                        <ol v-for="i in classCount" class="attachment-row " >
                                            <div @click="jump" >
                                                <el-row style="padding-top:12px">
                                                    <el-col :span="18">
                                                        <span class="el-icon-document"></span>
                                                        <span style="padding-left: 10px">2020.06.25 04:08</span>
                                                    </el-col>
                                                    <el-col :span="6">
                                                    </el-col>
                                                </el-row>
                                            </div>
                                        </ol>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                <el-row style="padding-top:20px;padding-bottom: 200px">
                                    <el-col :span="18">
                                        <span style="padding-left: 12px;">你尚未交付该作业，请尽快交付</span>
                                    </el-col>
                                    <el-col :span="3" :offset="3">
                                        <el-button type="primary" icon="el-icon-edit" circle  @click="commitPage = true"></el-button>
                                        <el-dialog title="提交做業" :visible.sync="commitPage"   width="500px" center>
                                            <div class="commit_fork">
                                                <el-upload
                                                        class="upload-demo"
                                                        drag
                                                        action="https://jsonplaceholder.typicode.com/posts/"
                                                        :file-list="modeList"
                                                        :http-request="modeUpload"
                                                        multiple>
                                                    <i class="el-icon-upload"></i>
                                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                                    <div class="el-upload__tip" slot="tip" style="color: #ccc">只能上传jpg/png文件，且不超过500kb</div>

                                                </el-upload>
                                            </div>
                                            <div slot="footer" class="dialog-footer">
                                                <el-button @click="commitPage = false">取 消</el-button>
                                                <el-button type="primary" @click="submitBtn">確定提交</el-button>
                                            </div>
                                        </el-dialog>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "homeWorkDetail",
        data() {
            return {
                fileName:'',
                activeName: 'first',
                classCount:1,
                homeworkLog: false,
                commitPage:false,
                mode: {}
            };
            },
        methods :{
            modeUpload(item){
                this.mode = item.file
            },
            jump() {
            },
            submitBtn(){
                this.commitPage=false;
                let fd = new FormData()
                fd.append('templateFile', this.mode)
                axios.post(this.GLOBAL.BASE_URL+'/SubmitHomeWork', fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    console.log(response.data);
                })
            },
            getDetail(){
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

        },
        created() {
            const vm = this
            this.fileName=vm.$store.state.classHomeWorkId.workText;
            // this.getDetail();
        }
    }
</script>

<style scoped>
    .commit_fork{
        padding-left: 10%;
    }
    .attachment-row:hover {
        background-color:#ccc;
    }
    .attachment-row {
        align-items: center;
        line-height:20px;
        cursor: pointer;
        height: 40px;
    }
    .homework_log_titile{
        padding-top: 20px;
        padding-bottom: 5px;
        border-bottom: 1px solid #ccc;
    }
    .homework_log_titile span{
        padding-left: 10px;
        flex: 1;
        font-size: 12px;
        color: #999;
    }
    .table_titile{
        padding-top: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
    }
    .table_titile span{
        padding-left: 10px;
        flex: 1;
        font-size: 16px;
        color: #999;
    }
    .second_box_instructions{
        padding-top: 12px;
    }
    .second_box_instructions span{
        padding-left: 10px;
        flex: 1;
        font-size: 16px;
        color: #999;
    }
    .row-index-border {
        display: inline-block;
        height: 16px;
        width: 5px;
        margin-right: 5px;
        background-color: #00bbbd;
        vertical-align: middle;
    }
    .second_box{
        font-size: 18px;
        padding-bottom: 15px;
        padding-left: 2%;
        border-bottom: 1.5px solid #ccc;
        margin-bottom: 20px;
    }
    .homework_detail div{
        text-align: left;
        line-height:100%;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .homework_detail nav{
        text-align: left;
        line-height:100%;
        flex: 1;
        font-size: 14px;
        color: black;
    }
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
    .homework-info-name{
        padding-top: 3%;
        padding-bottom: 1%;
        font-size: 20px;
    }
</style>