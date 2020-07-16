<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>

                    <el-form label-width="80px">
                        <el-form-item label="姓名">
                            {{checkHomeWork.studentName}}
                        </el-form-item>

                        <el-form-item label="成绩" required="">
                            <el-input style="width:100px" v-model="checkHomeWork.grade"></el-input>
                        </el-form-item>
                        <el-form-item label="评语" required="">
                            <mavon-editor v-model="checkHomeWork.viewText"/>
                        </el-form-item>
                        <el-form-item>
                            <i class="el-icon-download"></i>

                            <a class='download' title="下载">作业下载</a>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="patchSubmit">保存</el-button>
                            <el-button>重设</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                checkHomeWork: {
                    studentId: "account",
                studentName: "name",
                courseId: "01",
                courseName: "cc",
                workId: "01",
                url: "test",
                grade: 90,
                viewText: "12314"
                }
            }
        },

        computed: {
            homework() {
                return this.data
            },
            currentStudentWork: {
                get() {
                    return this.$store.state.currentStudentWork;

                },
                set(value) {
                    this
                        .$store
                        .commit('setCurrenStudenttWork', value);
                }
            },
            ...mapGetters(['newCurrentWork'])
        },
        methods: {
            patchSubmit(){
                this.$http.put("http://139.186.71.42:8080/works/studentWork",{
                    studentId: this.checkHomeWork.studentId,
                studentName: this.checkHomeWork.studentName,
                courseId: this.checkHomeWork.courseId,
                courseName: this.checkHomeWork.courseName,
                workId: this.checkHomeWork.workId,
                url: this.checkHomeWork.url,
                grade:this.checkHomeWork.grade,
                viewText:this.checkHomeWork.viewText
                }).then(res=>{
                    res = res.data;
                    if(res.code==200){
                this.$message.success("修改成功")

                    }
                    else{
                        alert("错误");
                    }
                })
            },
            getStudentWorkById(workid) {
                console.log(studentid)
                this
                    .$http
                    .get('http://139.186.71.42:8080/getSingleWork',{params:{
                        workId:"02"
                    }})
                    .then(res => {

                        //这里的res.code有点奇葩
                         res = res.data
                        console.log(res.code);
                        if (res.code ===200) {
                           
                            console.log(res.data.currentStudentWork);
                            this
                                .$store
                                .commit('setCurrentStudentWork', res.data.currentStudentWork);
                            console.log("12356");
                            this.checkHomeWork.studentname = this.$store.state.currentStudentWork.studentname;
                            console.log(this.checkHomeWork.studentname)
                        } else {
                            // this     .$message     .warning(res.data.message)
                        }
                    })
            }
        },
        created() {
            // this.getStudentWorkById(1, 1);
            this.checkHomeWork=this.$store.state.currentStudentWork;
        }

        
    }
</script>

<style lang="scss" scoped="scoped"></style>