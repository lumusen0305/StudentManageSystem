<template>
    <div>
        <div>
            <el-button type="primary" icon="el-icon-edit" class="select_top_button" circle  @click="dialogFormVisible = true"></el-button>
            <el-dialog title="新增留言" :visible.sync="dialogFormVisible"   width="80%" center>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
                    <!--                    <el-button type="primary" @click="dialogFormVisible = false">確定添加</el-button>-->
                </div>
            </el-dialog>
        </div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <div style="padding-bottom: 20px">
                    <el-card shadow="hover"  class="mgb10"  style="height:120px;">

                        <el-col :span="2" >
                            <el-row class="class-info-cont">

                                <el-tooltip class="item" effect="dark" content="隔壁老王" placement="top">
                                    <a style="border-radius:100%">
                                        <img src="../../../assets/img/1049843.png" class="user-avator" alt />
                                    </a>
                                </el-tooltip>
                            </el-row>
                        </el-col>
                        <el-col :span="5"  :offset="1" class="username_info" >
                            <span>{{this.$store.state.Floor.account}}</span>
                        </el-col>

                    </el-card>
                </div>
                <div class="post_discuss">
                    <div class="post_title">
                        {{this.$store.state.discussTitle}}
                    </div>
                    <div style="        padding-top: 50px; padding-left: 20px  ;      padding-bottom:200px;">
                    <span class="post_des">
                {{this.$store.state.discussTitle}}
                    </span>
                    </div>
                </div>
                <div class="discuss">
                    <div style="padding-top: 30px;padding-left: 50px;font-size: 20px;color: #9e9e9e;border-bottom: 1px solid #ccc;        padding-bottom: 20px;">
                        熱門回應
                    </div>
                    <div class="responnse_disscu" style="padding-top:25px">
                        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                            <li v-for="i in responsesDiscuss"  class="mgb20"  >
                                <el-row style=" border-bottom: 1px solid #ccc;">
                                    <el-col :span="1.8" :offset="1">
                                        <img src="../../../assets/img/1049843.png" class="response_user-avator" alt />
                                    </el-col>
                                    <el-col :span="10">
                                        <div style="font-size:30px">
                                            {{i.account}}
                                        </div>
                                        <div class="responnse_disscu_detail">
                                            <v-html>
                                            {{i.floorText}}
                                            </v-html>
                                        </div>
                                    </el-col>
                                </el-row>
                            </li>
                        </ul>

                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "discuss",
        data() {
            return {
                dialogFormVisible:false,
                classCount:5,
                responsesDiscuss:[
                    {
                        account : "路人",
                        floorId : "string",
                        floorText : "吃瓜ing",
                        postId : "string"
                    },
                    {
                        account : "乂煞氣a豬豬乂",
                        floorId : "string",
                        floorText : "老鼠藥,藥到病除",
                        postId : "string"
                    }
                ]
            }
        },
        methods:{

            getDiscuss(){
                axios({
                    method: 'get',
                    baseURL: 'http://139.186.71.42:8080',
                    url:'/getAllFloorOfSinglePost',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                        // 'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTk0ODkxNjk0LCJ1c2VySWQiOiJhY2NvdW50IiwiaWF0IjoxNTk0ODg0NDk0fQ.vaoRng0IG_DAlWnzOgRyOjv-pTz3lrjdZNOeVSMI3q0'
                    },
                    params: {
                        'postId':this.$store.state.Floor.postId
                    }
                }).then((response) => {
                    console.log(response.data.data)
                    let item;

                    for (item in response.data.data.moduleList){
                        this.responsesDiscuss.push(
                            {
                                floorId:response.data.data.moduleList[item].floorId,
                                postId:response.data.data.moduleList[item].postId,
                                account:response.data.data.moduleList[item].account,
                                floorText:response.data.data.moduleList[item].floorText
                            })
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            submit(){

                this.responsesDiscuss.push(
                    {
                        account :this.$cookie.get('ms_username'),
                        floorText : this.content,

                    })
                this.dialogFormVisible=false;
                axios({
                    method: 'post',
                    baseURL: 'http://139.186.71.42:8080',
                    url:'/createFloor',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                        // 'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTk0ODkxNjk0LCJ1c2VySWQiOiJhY2NvdW50IiwiaWF0IjoxNTk0ODg0NDk0fQ.vaoRng0IG_DAlWnzOgRyOjv-pTz3lrjdZNOeVSMI3q0'
                    },
                    params: {
                        'postId':this.$store.state.Floor.postId,
                        'floorText':this.content
                    }
                }).then((response) => {
                })
                    .catch((err) => {
                        console.log(err)
                    })
                console.log(this.content)

                //     axios({
                //     method: 'post',
                //     url: this.GLOBAL.BASE_URL+'/createFloor',
                //     data: {
                //         'postId': this.$store.postId,
                //         'floorText':this.content
                //     }
                // }).then((response) => {
                //     console.log('success')
                // })
                //     .catch((err) => {
                //         console.log(err)
                //     })
            }
        },
        created() {

            this.getDiscuss();
        }
    }
</script>

<style scoped>

    .select_top_button {
        position: fixed; /*固定位置*/
        z-index: 99; /*设置优先级显示，保证不会被覆盖*/
        right: 5%;
        top: 20%;
        width: 50px;
        height: 50px;
        font-size: 20px;
    }
    .responnse_disscu_detail{
        padding-top: 30px;
        padding-bottom: 80px;

    }
    .responnse_disscu{

    }
    .discuss{
        background-color: #f5f5f5;
    }
    .post_des{
        font-size: 20px;
    }
    .post_title{
        padding-bottom: 20px;
        padding-left: 20px;
        font-size: 40px;
        border-bottom: 1px solid #ccc;

    }
    .post_discuss{
        width: 100%;
        background-color: white;
    }
    .username_info{
        margin-bottom: 50px;
        padding-top: 4px;
        font-size: 40px;
    }
    .user-avator {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .mgb20 {
        margin-bottom: 50px;
    }
    .response_user-avator {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>