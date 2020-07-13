<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>

                    <el-form >
                        <el-form-item label="名称">
                                <el-input v-model="currentStudent.studentid"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <span>说明</span>
                                <div >
                                    <mavon-editor/>

                                </div>

                            </el-form-item>
                            
                                <el-form-item >
                                    <el-button type="primary" @click="onSubmit">保存</el-button>
                                    <el-button>取消</el-button>
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
                        
                        value1: [
                            new Date(2000, 10, 10, 10, 10),
                            new Date(2000, 10, 11, 10, 10)
                        ],
                        value2: '',
                        dialogImageUrl: '',
                        dialogVisible: false,
                        disabled: false,
                    };
                },

                computed: {





                    currentStudent: {
                        get() {
                            return this.$store.state.currentStudent;

                        },
                        set(value) {
                            this
                                .$store
                                .commit('setCurrentStudent', value);
                        }
                    },
                    currentStudentId() {
                        return this.$store.state.currentStudentId;
                    },
                    ...mapGetters(['newCurrentWork'])
                },

                methods: {
                    handleRemove(file, fileList) {
                        console.log(file, fileList);
                        for (let i = 0; i < this.fileList.length; i++) {
                            if (file.name === this.fileList[i].name) {
                                this
                                    .fileList
                                    .splice(i, i);
                            }
                        }
                    },
                    handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                    },
                    handleDownload(file) {
                        console.log(file);
                    },

                    onSubmit() {

                    },
                    handleChange(file, fileList) {
                        this.fileList = fileList.slice(-3);
                    },
                    getWorkById(val) {
                        console.log(val)
                        this
                            .$http
                            .get('api/works/student', val)
                            .then(res => {
                                res = res.data
                                if (true) {
                                    this.$store.commit('setWorkId',res.data.currentWork.workid)
                                    console.log(res.data.currentWork);
                                    this
                                        .$store
                                        .commit('setCurrentWork', res.data.currentWork);
                                } else {
                                    // this     .$message     .warning(res.data.message)
                                }
                            })
                    }
                },

                created() {
                    if(this.$store.state.workid!==-1){
                        console.log(this.$store.state.workid);
                         this.getWorkById(this.$store.state.workid);
                    }
                     console.log(this.$store.state.workid);

                    // 我上面的axois是一个异步操作,可能我在执行下面的fileList初始化代码的时候,异步操作还没完成,
                    // 所以只有undefined,等axois完成的时候,这条语句已经跳过了
                    // this.fileList=this.$store.state.currentWork.currentWork.fileList;
                    // console.log(this.fileList)
                }

            };
        </script>

        <style lang="scss" scoped="scoped"></style>