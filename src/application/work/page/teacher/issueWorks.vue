<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>
                    <el-form v-if="this.$store.state.workid === -1">
                        <el-form-item label="标题">
                            <el-input v-model="currentWork.title"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <span>作业说明</span>
                            <div >
                                <mavon-editor v-model="currentWork.description"/>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="block">
                                <span class="demonstration">开始时间</span>
                                <el-date-picker
                                    v-model="currentWork.opentime"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间"></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="block">
                                <span class="demonstration">结束时间</span>
                                <el-date-picker
                                    v-model="currentWork.closetime"
                                    type="datetime"
                                    value-format="timestamp"
                                    placeholder="选择日期时间"></el-date-picker>
                            </div>
                        </el-form-item>
                        <el-form-item label="作业附件">
                            <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="currentWork.fileList"
  :on-success="appendFile"
  :on-preview="handleDownload"
  :limit="1"
    :multiple="false">

  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

                            </el-form-item>

                            <el-form-item >
                                <el-button type="primary" @click="onPostSubmit">保存</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>

                        <el-form v-else>
                            <el-form-item label="标题">
                                <el-input v-model="currentWork.title"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <span>作业说明</span>
                                <div >
                                    <mavon-editor v-model="currentWork.description"/>

                                </div>

                            </el-form-item>
                            <el-form-item>
                                <div class="block">
                                    <span class="demonstration">开始时间</span>
                                    <el-date-picker
                                        v-model="currentWork.opentime"
                                        type="datetime"
                                        value-format="timestamp"
                                        placeholder="选择日期时间"></el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <div class="block">
                                    <span class="demonstration">结束时间</span>
                                    <el-date-picker
                                        v-model="currentWork.closetime"
                                        type="datetime"
                                        value-format="timestamp"
                                        placeholder="选择日期时间"></el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item label="作业附件">
                                <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="currentWork.fileList"
    :on-preview="handleDownload"

    :on-success="appendFile"

  :limit="1"
  :multiple="false">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

                                </el-form-item>

                                <el-form-item >
                                    <el-button type="primary" @click="onPutSubmit">保存</el-button>
                                    <el-button>取消</el-button>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
</template>

        <script>

            import {mapGetters, mapState} from 'vuex'

            export default {
                data() {
                    return {
                        //教师对于
                        currentWork: {
                            title: "",
                            workid: -1,
                            description: "",
                            opentime: "",
                            closetime: "",
                            fileList: [
                                {
                                    name: "",
                                url: ""
                                   
                                }
                            ]
                        },

                        dialogImageUrl: '',
                        dialogVisible: false,
                        disabled: false,
                        fileList: [
                            {
                                name: "-1",
                                    url: "-1"
                            }
                        ]
                    };
                },

                computed: {
                    // currentWork: {     get() {         return this.$store.state.currentWork; },
                    // set(value) {         this             .$store .commit('setCurrentWork',
                    // value);     } },
                    currentWorkId() {
                        return this.$store.state.workid;
                    },

                    //currentWork的绑定工作

                    ...mapGetters(['newCurrentWork']),
                    ...mapState({})
                },

                methods: {

                    //Post进行作业的添加
                    onPostSubmit(){
                        var formdata=new FormData();
                        formdata.append("courseId",this.$store.state.currentClass),
                        formdata.append("work",this.currentWork.description);
                        formdata.append("url",this.currentWork.fileUrl);
                        formdata.append("worktime",this.currentWork.opentime);
                        formdata.append("closetime",this.currentWork.closetime);
                        formdata.append("title",this.currentWork.title);

                        this.$http.post("api/works/work",formdata).then(
                            res => {
                                res = res.data;
                                if(res.code ===200)
                                {
                                    alert("成功");
                                }
                                else{
                                    alert(res.code);
                                }
                            }
                        )
                    },
                    onPutSubmit(){

                    },


                    //文件进行下载
                    handleDownload(file){
                        console.log(file);
                    },
                    onPutSubmit(){
                        this.$http.put('api/');
                    },
                    //教师的作业要求文件上传后得到response回应,获得url
                    appendFile(response,file,fileList){
                        console.log("laila")
                        this.currentWork.fileList[0].name=response.data.fileName;
                        this.currentWork.fileList[0].url=response.data.fileUrl;
                    },

                    //教师进行作业的设置
                    setTitle(e) {
                        this
                            .$store
                            .commit('updateMessagesetCurrentWorkTitle', e.target.value)
                    },

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

                    onSubmit() {},
                    handleChange(file, fileList) {
                        this.fileList = fileList.slice(-3);
                    },
                    getWorkById(val) {
                        this
                            .$http
                            .get('api/works/currentWork', val)
                            .then(res => {
                                res = res.data
                                if (true) {
                                    console.log(res.data.currentWork);

                                    this
                                        .$store
                                        .commit('setCurrentWork', res.data.currentWork);

                                    this.currentWork.title = this.$store.state.currentWork.title;
                                    console.log(this.currentWork.title);
                                    this.currentWork.description = this.$store.state.currentWork.description;
                                    this.currentWork.opentime = this.$store.state.currentWork.opentime;
                                    this.currentWork.closetime = this.$store.state.currentWork.closetime;
                                    this.currentWork.fileList[0].name=this.$store.state.currentWork.filename;
                                    this.currentWork.fileList[0].url=this.$store.state.currentWork.fileurl;
                                    console.log("我来了");
                                    console.log(this.currentWork.fileList[0].name)
                                } else {
                                    // this     .$message     .warning(res.data.message)
                                }
                            })
                    }
                },

                created() {

                    console.log("zaizhe")
                    console.log(this.$store.state.workid)
                    if (this.$store.state.workid !== -1) {
                        this.getWorkById(this.$store.state.workid);

                        //!!!!!!!!!!!!!!!!!!!!!!又是同步问题,前面的getWorkById是一个异步操作,如果它在赋值后完成就会出问题.
                        console.log(this.$store.state.currentWork);

                    }

                    // 我上面的axois是一个异步操作,可能我在执行下面的fileList初始化代码的时候,异步操作还没完成,
                    // 所以只有undefined,等axois完成的时候,这条语句已经跳过了
                    // this.fileList=this.$store.state.currentWork.currentWork.fileList;
                    // console.log(this.fileList)
                }

            };
        </script>

        <style lang="scss" scoped="scoped"></style>