<template>
    <div>
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
                        <el-button round>標籤</el-button>
                        <el-button round>標籤</el-button>
                        <el-button round>標籤</el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" :offset="1" style="padding-top: 20px" >
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="i in classCount"  class="mgb20"  >
                <div class="theme_title">
                HelloWorld
                </div>
                <el-card>
                    <div class="theme_post_date">
                        Post on 2020年3月5號 20：20
                    </div>
                    <div style="padding-top: 15px">
                        <el-tag style="margin-right: 10px"
                                v-for="item in items"
                                :key="item.label"
                                effect="dark">
                            {{ item.label }}
                        </el-tag>
                    </div>
                    <div style="padding-top: 15px">
                        Some thing about des...
                    </div>
                    <div style="padding-top: 20px">
                        <el-button  class="el-icon-search" style="width: 200px; height: 40px;font-size: 17px;padding-bottom: 10px" @click="jumpToDiscuss">
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
    export default {
        name: "competition",
        data() {
            return {
                classCount:5,
                items: [
                    { label: '标签一' },
                    { label: '标签二' },
                    { label: '标签三' },
                    { label: '标签四' },
                    { label: '标签五' }
                ]
            }
        },
        methods:{
            jumpToDiscuss(){
                document.location.href = "/work#/discuss";
            }
        }
    }
</script>

<style scoped>
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