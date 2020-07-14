<template>
    <div>
        <el-row>
            <el-button @click="getStudents(1)">加载数据</el-button>
             <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb10" style="margin-bottom:10px">
                    <div>
                        <a class="class-info-name" @click="reloadStudentId" href="/work#/studentInfo">

                            <el-button>新增学生</el-button>
                        </a>
                        <!-- <el-button @click="getWorks">获得mock</el-button> -->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16" :offset="3">
                <el-card>
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>
                    <el-table :data="studentList" border="border" style="width: 100%">
                        <el-table-column type="index" :index="indexMethod"></el-table-column>
                        <el-table-column prop="studentid" label="序号" width="120px"></el-table-column>
                        <!-- <el-table-column prop="studentname" label="姓名" width="120px"></el-table-column>
                        <el-table-column label="状态" width="120px">
                            <template slot-scope="scope">
                                <span
                                    v-if="homeworkLists[scope.$index].status!==true"
                                    style="margin-left:10px;color:red">未交</span>
                                <span v-else style="margin-left: 10px;color:green">已交</span>

                            </template>
                        </el-table-column> -->
                        
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope" >
                                <a class="class-info-name"  href="/work#/studentInfo">
                                    <el-button size="small">修改</el-button>
                                </a>
                                <a class="class-info-name" >
                                    <el-button size="small">删除</el-button>
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
    const studentInfo = () => import ("./studentInfo");

    export default {
   
        data() {
            return {dialogVisible: false, currentRow: null}
        },
        computed: {
            
            studentList() {
                return this.$store.state.studentList
            }
        },
        methods: {
             reloadStudentId() {
                console.log("我在这")
                this
                    .$store
                    .commit('setStudentId', -1);
                this
                    .$store
                    .commit('clearStudentInfo');
            },
            getStudents(val) {
                console.log(val)
                this
                    .$http
                    .get('api/works/students')
                    .then(res => {
                        res = res.data
                        // console .log(res.data)
                        if (true) {
                            //遇到问题
                            this
                                .$store
                                .commit('setStudentList', res.data.studentList);

                            console.log(this.$store.state.studentList)
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
            this.getStudents();
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


