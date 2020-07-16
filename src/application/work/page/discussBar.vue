<template>
    <div>
        <div>
            <el-button type="primary" icon="el-icon-edit" class="select_top_button" circle  @click="discussDialog = true"></el-button>
            <el-dialog title="新增帖子" :visible.sync="discussDialog"   width="30%"  center>
                <el-form :model="form">
                    <el-form-item label="輸入主題">
                        <el-input v-model="title" autocomplete="off" class="classInput"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button class="editor-btn" type="primary" @click="submit">發布主題</el-button>
                </div>
            </el-dialog>
<!--            </el-dialog>-->
<!--            <el-dialog title="填寫內文" :visible.sync="dialogFormVisible"   width="80%" center>-->
<!--                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>-->
<!--                <div slot="footer" class="dialog-footer">-->
<!--                    <el-button @click="dialogFormVisible = false">取 消</el-button>-->
<!--                    <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>-->
<!--                    &lt;!&ndash;                    <el-button type="primary" @click="dialogFormVisible = false">確定添加</el-button>&ndash;&gt;-->
<!--                </div>-->
<!--            </el-dialog>-->
        </div>
        <el-row style="padding-top: 30px">
                <el-col :span="3" :offset="17">
                    <div>
                        <el-input v-model="input" placeholder="搜尋帖子"></el-input>
                    </div>
                </el-col>
                <el-col :span="1" >
                    <div>
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </div>
                </el-col>
        </el-row>
        <el-row>
            <el-col :span="5" :offset="3" style="padding-top: 20px">
                <el-card class="mgb20">
                    <div class="tag_title">
                        Tag
                    </div>
                    <div style="padding-top: 15px">
                        <el-button round v-for="item in tag" ref="tagBtn"  v-on:click="serchTag($event,item)">{{item.module}}</el-button>

<!--                        <el-button round>標籤</el-button>-->
<!--                        <el-button round>標籤</el-button>-->
<!--                        <el-button round>標籤</el-button>-->
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" :offset="1" style="padding-top: 20px" >
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in theme" v-if="i.label===BtnChooses" class="mgb20"  >
                <div class="theme_title">
                {{i.subject}}
                </div>
                <el-card>
                    <div class="theme_post_date">
                        {{i.postDate}}
                    </div>

                    <div style="padding-top: 15px">
                        Some thing about des...
                    </div>
                    <div style="padding-top: 20px">
                        <el-button  class="el-icon-search" style="width: 200px; height: 40px;font-size: 17px;padding-bottom: 10px" v-on:click="jumpToDiscuss(i)">
                            READ ME
                        </el-button>
                    </div>
                </el-card>
                    </li>
                </ul>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import $ from 'jquery'
    import axios from "axios";

    export default {
        name: "competition",

        data() {
            return {
                title:'',
                discussDialog:false,
                dialogFormVisible:false,
                classCount:5,
                BtnChooses:'',
                items: [
                    { label: '标签一' },
                    { label: '标签二' },
                    { label: '标签三' },
                    { label: '标签四' },
                    { label: '标签五' }
                ],
                tag:[


                ],

                theme:[
                    {
                        account : "string",
                        subject : "互連網路競招募隊友",
                        postDate : '2020/1/1',
                        postId : "HelloWorld",
                        postStatus : "string",
                        moduleId:'竞赛',
                        label: '竞赛',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "問掛怎麼學好數學",
                        postDate : '2020/1/1',
                        postId : "HelloWorld1",
                        postStatus : "string",
                        moduleId: '学习',
                        label: '学习',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "大一男生懷孕了怎麼辦",
                        postDate : '2020/1/1',
                        postId : "HelloWorld1",
                        postStatus : "string",
                        moduleId: '讨论',
                        label: '讨论',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "問掛怎麼學好英文",
                        postDate : '2020/1/1',
                        postId : "HelloWorld1",
                        postStatus : "string",
                        moduleId:'学习',
                        label: '学习',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "大創競招募隊友",
                        postDate : '2020/1/1',
                        postId : "HelloWorld",
                        postStatus : "string",
                        moduleId: '竞赛',
                        label: '竞赛',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "大胃王競招募隊友",
                        postDate : '2020/1/1',
                        postId : "HelloWorld",
                        postStatus : "string",
                        moduleId: '竞赛',
                        label: '竞赛',
                        postTime:'2020/1/1',
                    },
                    {
                        account : "string",
                        subject : "我想吃蛇",
                        postDate : '2020/1/1',
                        postId : "HelloWorld",
                        postStatus : "string",
                        moduleId:  '竞赛',
                        label: '讨论',
                        postTime:'2020/1/1',
                    },
                ],
            }
        },
        computed: {
            getDiscuss() {
                return this.$store.state.postId
            }
        },
        methods:{
            serchTag :function(event,item){
              console.log(item.id);
              this.BtnChooses=event.target.innerText;

                axios({
                    method: 'get',
                    baseURL: 'http://139.186.71.42:8080',
                    url: '/getAllPostOfSingleModule',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                        // 'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTk0ODkxNjk0LCJ1c2VySWQiOiJhY2NvdW50IiwiaWF0IjoxNTk0ODg0NDk0fQ.vaoRng0IG_DAlWnzOgRyOjv-pTz3lrjdZNOeVSMI3q0'
                    },
                    params: {
                        'moduleId':item.id
                    }
                }).then((response) => {
                    let index;
                    for (index in response.data.data.moduleList){
                        console.log(response.data.data)
                        this.theme.push(
                            {
                            postId: response.data.data.moduleList[index].postId,
                            account: response.data.data.moduleList[index].account,
                            moduleId:response.data.data.moduleList[index].moduleId,
                            postDate:response.data.data.moduleList[index].postDate,
                            label:event.target.innerText,
                            postStatus: response.data.data.moduleList[index].postStatus,
                            subject:response.data.data.moduleList[index].subject,
                        }
                        )
                    }
                })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            jumpToDiscuss(event){
                this.$store.state.Floor=event
                this.$store.commit('setDiscuss', event.postId)
                this.$store.commit('setdiscussTitle', event.subject)
                console.log(this.$store.state.discussTitle)
                document.location.href = "/work#/discuss";
            },
            submit(){
                this.theme.push(
                    {
                        subject:this.title,
                        label: '竞赛',
                        moduleId: [
                            { label: '竞赛' },
                        ],
                        postDate : '2020/1/1',
                    })
                console.log(this.title);
                this.discussDialog = false;
                this.$message.success('提交成功！');
            },
            getAlltag(){
                axios({
                    method: 'get',
                    baseURL: 'http://139.186.71.42:8080',
                    url:'/getPostModuleList',
                    headers: {
                        'Content-Type': 'application/json',
                        'token': localStorage.getItem('token')
                        // 'token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTk0ODkxNjk0LCJ1c2VySWQiOiJhY2NvdW50IiwiaWF0IjoxNTk0ODg0NDk0fQ.vaoRng0IG_DAlWnzOgRyOjv-pTz3lrjdZNOeVSMI3q0'
                    },
                      }).then((response) => {
                    let item;

                    for (item in response.data.data.moduleList){
                        this.tag.push(
                            {
                                module:response.data.data.moduleList[item].module,
                                postSum:response.data.data.moduleList[item].postSum,
                                setDate:response.data.data.moduleList[item].setDate,
                                id:response.data.data.moduleList[item].id
                        })
                        }
                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.getAlltag();
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
    .theme_post_date{
        color: #ccc;
        font-size: 20px;
    }
    .mgb20 {
        margin-bottom: 50px;
    }
    .theme_title{
        background-color: #2e7fa6;
        height: 50px;
        text-align: left;
        font-size: 27px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        color:white;
    }
    .theme_update_time{
        background-color: #2e7fa6;
        height: 35px;
        text-align: left;
        font-size: 15px;
        display: flex;
        align-items: center;
        padding-left: 13px;
        color:white;
    }
    .tag_title{
        text-align: left;
        font-size: 36px;
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
    }
</style>