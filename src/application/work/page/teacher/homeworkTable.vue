<template>
    <div>
        <el-row>
            <el-button @click="getHomeworkList(1)">加载数据</el-button>
            <el-col :span="16" :offset="3">
                <el-card shadow="hover" class="mgb10" style="height:120px;">
                    <el-col :span="18">
                        <el-row class="class-info-cont">
                            <div>
                                <div class="class-info-name">
                                    SSD7
                                </div>
                            </div>
                            <div class="classIntroduce">2019-2020 2019-2020第二学期 建筑与艺术学院(教学)
                            </div>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="teacher_box">
                        <span>授課教師：</span>
                        <el-tooltip class="item" effect="dark" content="隔壁老王" placement="top">
                            <a style="border-radius:100%">
                                <img src="../../../../assets/img/1049843.png" class="user-avator" alt="alt"/>
                            </a>
                        </el-tooltip>
                    </el-col>
                </el-card>
                <el-card>
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>
                    <el-table :data="studentWorks" border="border" style="width: 100%">
                        <el-table-column type="index" :index="indexMethod"></el-table-column>
                        <el-table-column prop="studentId" label="序号" width="120px"></el-table-column>
                        <el-table-column prop="studentName" label="姓名" width="120px"></el-table-column>
                        <!-- <el-table-column label="状态" width="120px">
                            <template slot-scope="scope">
                                <span
                                    v-if="homeworkLists[scope.$index].status!==true"
                                    style="margin-left:10px;color:red">未交</span>
                                <span v-else style="margin-left: 10px;color:green">已交</span>

                            </template>
                        </el-table-column> -->
                        <el-table-column prop="grade" label="成绩" width="150px"></el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope" >
                                <a class="class-info-name" href="/work#/studentHomework" @click="setCurrentStudentWork(scope.$index)">
                                    <el-button  size="small">批阅</el-button>
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible">
            <studentHomework></studentHomework>
        </el-dialog>
    </div>
</template>

<script>
    const studentHomework = () => import ("./studentHomework");

    export default {
        components: {
            studentHomework
        },

        data() {
            return {dialogVisible: false, currentRow: null,
            studentWorks: [
            {
                // studentId: "account",
                // studentName: "name",
                // courseId: "01",
                // courseName: "cc",
                // workId: "01",
                // url: "test",
                // grade: 90,
                // viewText: "12314"
            },
            
            ]
            }

        },
        computed: {
            homeworkLists() {
                return this.$store.state.homeworkLists
            }
        },
        methods: {
            
            //更改当前currentStudentWork,让studentHomeWork页面能够请求相应的数据
            setCurrentStudentWork(val){
                this.$store.commit('setCurrentStudentWork',this.studentWorks[val]);
            },

            //得到某次布置作业中所有学生的作业情况
            getHomeworkList(val) {

                this
                    .$http
                    .get('http://139.186.71.42:8080/works/studentWorks', {params:{
                        courseId:"01",
                        workId:"01"
                    }})
                    .then(res => {
            
                        res = res.data
                        if (true) {
                            //遇到问题
                            this
                                .$store
                                .commit('setHomeworkLists', res.data);
                            // setThisWorks();
                            this.studentWorks = res.data.studentWorks;
               
                            // this.$store.works
                        } else {
                            // this     .$message     .warning(res.data.message)
                        }
                    })
            },

            handleEdit(index, row) {
                console.log(index, row);
            },
            indexMethod(index) {
                return index;
            }
        },
        created() {
            this.getHomeworkList(this.$store.state.checkWorkId);

        }
    }
</script>

<style lang="scss" scoped="scoped">
    .homework_detail div {
        text-align: left;
        line-height: 100%;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .homework_detail nav {
        text-align: left;
        line-height: 100%;
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
    .homework_title {
        padding-left: 20px;
    }
    .class_box {
        /*align-items: center;*/
        padding-bottom: 15px;
        border-bottom: 3px solid #ccc;
        margin-bottom: 20px;
    }
    .teacher_box {
        padding-top: 3.5%;
    }
    a {
        color: black;
    }
    a:hover {
        color: #20a0ff;
    }
    .class-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 16px;
        color: #999;
    }
    .class-info-cont div:first-child {
        padding-left: 0;
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
    .homework-info-name {
        padding-top: 3%;
        padding-bottom: 1%;
        font-size: 20px;
    }
</style>


