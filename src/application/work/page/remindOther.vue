<template>
    <el-row :gutter="20">
        <el-col :span="18" :offset="3">
            <el-card shadow="hover" class="mgb20" style="height:80px;">
                <el-row :gutter="20">
                    <el-col :span="3">

                    </el-col>
                    <el-col :span="6" :offset="15">
                        <div>
                            <el-input v-model="input" placeholder="搜尋課堂"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="3" :offset="0">
                        <div>
                            <el-button type="primary" icon="el-icon-search">搜索</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-card shadow="hover">
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in myClass" class="infinite-list-item">
                        <el-row class="class_box" justify="around">
                            <el-col :span="5">
                                <div>
                                    <img src="../../../assets/img/1049843.png" class="user-avator" alt />
                                </div>
                            </el-col>
                            <el-col :span="18">
                                <el-row class="class-info-cont">
                                    <div>
                                        <a class="class-info-name" @click="jumpToCommit" >
                                            {{i.courseName}}
                                        </a>
                                        <el-dialog title="發送提醒" :visible.sync="showCommite"   width="20%" center>
                                            <el-select v-model="value" placeholder="请选择作業">
                                                <el-option
                                                        v-for="item in classHomeWork"
                                                        :key="item.workRequire"
                                                        :label="item.workRequire"
                                                        :value="item.workRequire">
                                                </el-option>
                                            </el-select>
                                            <div slot="footer" >
                                                <el-button @click="showCommite = false">取 消</el-button>
                                                <el-button type="primary" @click="showCommite = false">確定發送</el-button>
                                            </div>
                                        </el-dialog>
                                    </div>
                                    <div class="classIntroduce">软件工程系 开课: 2019.11.13  － 课程结束日期: 2020.01.01</div>
                                    <div>授课班级: 软件工程1801-06 必选修别: 必修 学分数: 2.0 授课教师:    <el-tooltip class="item" effect="dark" content="隔壁老王" placement="top">
                                        <a class="el-icon-user-solid" style="border-radius:100%"></a>
                                    </el-tooltip></div>
                                </el-row>
                            </el-col>
                        </el-row>

                    </li>
                </ul>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import axios from "axios";

    export default {
        name: 'remindOther',
        data: function () {
            return {
                classHomeWork:[
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "要求",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                    {
                        closeTime : "关闭时间",
                        url : "附带文件下载",
                        workId : "教师设置的作业id",
                        workRequire : "要求",
                        workText : "作业大致内容",
                        workTime : "开放时间"
                    },
                ],
                showCommite :false,
                defaultSrc: require('../../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                options: [{
                    label: '黄金糕'
                }, {
                    label: '双皮奶'
                }, {
                    label: '蚵仔煎'
                }, {
                    label: '龙须面'
                }, {
                    label: '北京烤鸭'
                }],
                value:{},
                myClass:[
                    {
                        courseId : "课程id",
                        courseName : "课程名1",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "课程名2",
                        credit : "课程学分"
                    },

                ],
                dialogVisible: false,
                form: {
                    classId: '',
                },
                formLabelWidth: '60px',
                classCount:10,
            }
        },
        components: {
            VueCropper
        },
        methods: {
            jumpToCommit(){
                let courseId='';
                axios({
                    method: 'get',
                    url: this.GLOBAL.BASE_URL+'/courses/getCourseByStuId',
                    data: {
                        'postId': this.$store.postId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '+jwt_tocken
                    },
                }).then((response) => {
                    let item;
                    for (item in response.data){
                        this.myClass.push(
                            {
                                courseId : JSON.parse(JSON.stringify(item.data))['courseId']
                            })
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
                axios({
                    method: 'get',
                    url: this.GLOBAL.BASE_URL+'/getAllWorkByCourseId',
                    data: {
                        'courseId':courseId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer '+jwt_tocken
                    },
                }).then((response) => {
                    let item;
                    for (item in response.data){
                        this.classHomeWork.push(
                            {
                                closeTime : JSON.parse(JSON.stringify(item.data))['closeTime'],
                                workId : JSON.parse(JSON.stringify(item.data))['workId'],
                                workRequire : JSON.parse(JSON.stringify(item.data))['workRequire'],
                                workText : JSON.parse(JSON.stringify(item.data))['workText'],
                                workTime : JSON.parse(JSON.stringify(item.data))['workTime'],

                            })
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })

                this.showCommite = true
            },
            setImage(e) {
                const file = e.target.files[0];
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.imgSrc = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            },
            cropImage() {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop() {
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },
            handleError() {
                this.$notify.error({
                    title: '上传失败',
                    message: '图片上传接口上传失败，可更改为自己的服务器接口'
                });
            }

        },
        created() {
            this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .topBox{
        margin: 3px;
    }
    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .class_box{
        /*align-items: center;*/
        padding-bottom: 15px;
        border-bottom: 3px solid #ccc;
        margin-bottom: 20px;
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
        font-size: 14px;
        color: #999;
    }
    .class-info-cont div:first-child {
        padding-left: 0%;
        font-size: 35px;
        color: black;
        /*padding-bottom: px;*/
        border-bottom: 1px solid #ccc;
        /*margin-bottom: 20px;*/
    }
    .classIntroduce{
        flex: 1;
        font-size: 17px;
        color:black;
    }
    .user-avator {
        width: 150px;
        height: 130px;
        border-radius: 0%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .shoup-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {

        font-size: 30px;
        color: #222;
    }

    .shoup-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 15px;
    }


    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }
    .classInput{
        width: 50%;
    }
</style>
