<template>
    <div id="classDetail">
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover"  class="mgb10"  style="height:120px;">
                    <el-col :span="18">
                        <el-row class="class-info-cont">
                            <div>
                                <div class="class-info-name" >
                                    SSD7
                                </div>
                            </div>
                            <div class="classIntroduce">2019-2020 2019-2020第二学期 建筑与艺术学院(教学)
                            </div>
                        </el-row>
                    </el-col>
                    <el-col :span="6" class="teacher_box">
                        <span>授課教師：</span><el-tooltip class="item" effect="dark" content="隔壁老王" placement="top">
                        <a style="border-radius:100%">
                            <img src="../../../assets/img/1049843.png" class="user-avator" alt />
                        </a>
                        </el-tooltip>
                    </el-col>
                </el-card>
                    <el-card shadow="hover" class="mgb20">
                        <a class="el-icon-caret-left"  href="javascript:history.go(-1)">返回</a>

                        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                        <li v-for="i in classCount" class="infinite-list-item">
                            <el-row class="class_box" justify="around" style=" font-size:20px; padding-left: 15px">
                                <el-col :span="5">
                                    <div  class="el-icon-edit">
                                        <a class="homework_title" href="work#/homeWorkDetail">第一次作業</a>
                                    </div>
                                </el-col>
                                <el-col :span="5" :offset="19" class="el-icon-check
">
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
    export default {
        name: "classDetail",
        data: function () {
            return {
                defaultSrc: require('../../../assets/img/img.jpg'),
                classCount:10,
            }
        },
    }
</script>

<style scoped>
    .mgb20 {
        margin-bottom: 20px;
    }
    .mgb10 {
        margin-bottom: 10px;
    }
    .homework_title{
        padding-left: 20px;
    }
    .class_box{
        /*align-items: center;*/
        padding-bottom: 15px;
        border-bottom: 3px solid #ccc;
        margin-bottom: 20px;
    }
    .teacher_box{
        padding-top: 3.5%;
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
        font-size: 16px;
        color: #999;
    }
    .class-info-cont div:first-child {
        padding-left: 0%;
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

</style>