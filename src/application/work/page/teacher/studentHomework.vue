<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>

                    <el-form label-width="80px">
                        <el-form-item label="姓名">
                            {{checkHomeWork.studentname}}
                        </el-form-item>

                        <el-form-item label="成绩" required="">
                            <el-input style="width:100px" v-model="checkHomeWork.score"></el-input>
                        </el-form-item>
                        <el-form-item label="评语" required="">
                            <mavon-editor v-model="checkHomeWork.description"/>
                        </el-form-item>
                        <el-form-item>
                            <i class="el-icon-download"></i>

                            <a class='download' title="下载">作业下载</a>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">保存</el-button>
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
                    studentid: "",
                    studentname: "",
                    workurl: "",
                    workname:"",
                    score: "",
                    description: ""
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
            getStudentWorkById(workid, studentid) {
                console.log(studentid)
                this
                    .$http
                    .get('api/works/currentStudentWork', workid)
                    .then(res => {

                        //这里的res.code有点奇葩
                         res = res.data
                        console.log(res.code);
                        if (res.code ===20000) {
                           
                            console.log(res.data.currentStudentWork);
                            this
                                .$store
                                .commit('setCurrentStudentWork', res.data.currentStudentWork);
                            console.log("12356");
                            this.checkHomeWork.studentname = this.$store.state.currentStudentWork.studentname;
                            console.log(this.checkHomeWork.studentname)
                        } else {
                            this.$message.warning(res.data.message)
                        }
                    })
            }
        },
        created() {
            this.getStudentWorkById(1, 1);
        }

        // rules: {    name: [      { required: true, message: '请输入活动名称', trigger:
        // 'blur' },      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ], }
    }
</script>

<style lang="scss" scoped="scoped"></style>