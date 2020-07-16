<template>
    <div id="commitHomework">

        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20" style="height:80px;">
                    <el-row :gutter="20">
                        <el-col :span="3">
                            <div>
                                <el-button  type="primary" @click="dialogFormVisible = true">添加課堂</el-button>
                                <el-dialog title="添加課堂" :visible.sync="dialogFormVisible"   width="25%" center>
                                    <el-form :model="form">
                                        <el-form-item label="課堂號">
                                            <el-input v-model="form.classId" autocomplete="off" class="classInput"></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="dialogFormVisible = false">確定添加</el-button>
                                    </div>
                                </el-dialog>
                            </div>

                        </el-col>
                        <el-col :span="6" :offset="12">
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
                    <div slot="header" class="clearfix">
                        <el-row :gutter="20">

                            <el-col :span="6">
                                <div class="topBox">
                                    <span >学年</span>
                                    <el-select v-model="chooseSchoolYear" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">

                                        <el-option
                                                v-for="item in schoolYears"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                            </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="topBox">
                                    <span>学期</span>
                                   <el-select v-model="chooseSemester" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in semesters"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                            </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="topBox">
                                    <span>状态</span>
                                    <el-select v-model="chooseStatus" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in status"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                            </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="topBox">
                                    <span>角色</span>
                                    <el-select v-model="chooseRole" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in roles"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                            </div>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">

                            <el-col :span="6">
                                <div class="topBox">
                                    <span>院系</span>

                                   <el-select v-model="chooseSemester" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="topBox">
                                    <span>年级</span>
                                   <el-select v-model="chooseGrade" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in grades"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="6">
                                <div class="topBox">
                                    <span>班级</span>
                                   <el-select v-model="chooseClass" collapse-tags multiple placeholder="请选择"  style="width:80% ;display: flex;">
                                        <el-option
                                                v-for="item in classes"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
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
                                            <a class="class-info-name"  @click="jumptoClass(i)" >
                                                {{i.courseName}}
                                            </a>
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
    </div>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import axios from "axios";

    export default {
        name: 'commitHomework',
        data: function () {
            return {
                dialogFormVisible: false,
                defaultSrc: require('../../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                form: {
                    classId: '',
                },
                formLabelWidth: '60px',
                schoolYears: [{
                    value: '选项1',
                    label: '2018~20119'
                }, {
                    value: '选项2',
                    label: '2019~2020'
                }],
                chooseSchoolYear: [],
                semesters: [{
                    value: '选项1',
                    label: '上學期'
                }, {
                    value: '选项2',
                    label: '下學期'
                }],
                chooseSemester: [],
                status: [{
                    value: '选项1',
                    label: '進行中'
                },
                    {
                        value: '选项2',
                        label: '以結束'
                    }
                ],
                chooseStatus: [],
                roles:[
                    {
                    value: '选项1',
                    label: '學生'
                    },
                    {
                        value: '选项2',
                        label: '老師'
                    }],
                chooseRole:[],
                grades:[
                    {
                        value: '选项1',
                        label: '大一'
                    }, {
                        value: '选项2',
                        label: '大二'
                    }, {
                        value: '选项3',
                        label: '大三'
                    }, {
                        value: '选项4',
                        label: '大四'
                    }
                ],
                chooseGrade:[],
                classes:[
                    {
                        value: '选项1',
                        label: '1801'
                    },
                    {
                        value: '选项2',
                        label: '1802'
                    },
                    {
                        value: '选项3',
                        label: '1803'
                    },
                    {
                        value: '选项4',
                        label: '1804'
                    },
                    {
                        value: '选项5',
                        label: '1805'
                    },
                ],
                chooseClass:[],
                myClass:[
                    {
                        courseId : "课程id",
                        courseName : "SSD1",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "SSD7",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "計算機網路",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "算法",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "數據結構",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "計算機組成原理",
                        credit : "课程学分"
                    },
                    {
                        courseId : "课程id",
                        courseName : "java",
                        credit : "课程学分"
                    },
                ],
                classCount:10,
            }
        },
        components: {
            VueCropper
        },
        methods: {
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
            },
            jumptoClass(item){
                this.$store.state.studentHomeWorks=item
                console.log(this.$store.state.studentHomeWorks.courseName)
                document.location.href = "/work#/classDetail";
            },
            getClasses(){
                let jwt_tocken = localStorage.getItem('token')
                axios({
                    method: 'get',
                    baseURL: 'http://139.186.71.42:8080',
                    url: '/courses/getCourseByStuId',
                    data: {
                        'postId': this.$store.postId,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                    },
                }).then((response) => {
                    console.log(response.data.data)
                    let item;
                    for (item in response.data.data){
                        this.myClass.push(
                            {
                                courseId : item.courseId,
                                courseName : item.courseeName,
                                credit :item.courseId.credit
                            })
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.cropImg = this.defaultSrc;
            this.getClasses();
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
        margin-bottom: 0px;
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
