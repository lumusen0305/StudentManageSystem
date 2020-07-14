<template>
    <div>

        <!-- <el-card v-for="work in newWorks.homework" :key="work.workid"> <el-row
        :gutter="1" > <el-col :span="18"> <div > <h4>{{work.workid}}</h4> </div> <div>
        </div> </el-col> </el-row> <el-row> <el-col :span="18"> <div :display="inline" >
        <span :border="5">开放:{{work.opentime}}</span> <span>截至:{{work.closetime}}</span>
        </div> </el-col> <el-col :span="6"> <el-button>修改</el-button>
        <el-button>批阅</el-button> <el-button>删除</el-button> </el-col> </el-row>
        </el-card> -->

        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb10" style="margin-bottom:10px">
                    <div>
                        <a class="class-info-name" @click="reloadWorkId" href="/work#/issueWorks">

                            <el-button>新增作业</el-button>
                        </a>
                        <!-- <el-button @click="getWorks">获得mock</el-button> -->
                    </div>
                </el-card>

            </el-col>
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb10" style="height:120px;margin-bottom:10px">
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
                                <img
                                    src="../../../../assets/img/1049843.png"
                                    class="user-avator"
                                    alt="alt"
                                    style="width:50px;height:50px;border-radius:50%"/>
                            </a>
                        </el-tooltip>
                    </el-col>
                </el-card>

                <el-card shadow="hover" class="mgb20">
                    <ul class="infinite-list" style="overflow:auto">
                        <li v-for="i in newWorks.homework" class="infinite-list-item" :key="i.workid">
                            <div
                                style="padding-bottom: 15px;
    border-bottom: 3px solid #ccc;
    margin-bottom: 20px;">
                                <el-row
                                    class="class_box"
                                    justify="around"
                                    style=" font-size:20px; padding-left: 15px">
                                    <el-col :span="5">
                                        <div class="el-icon-edit">
                                            <a class="homework_title" href="work#/workHome">{{i.workid}}</a>
                                        </div>
                                    </el-col>

                                </el-row>
                                <el-row>

                                    <el-col :span="19" style="display:inline">

                                        <span :border="5">开放:{{i.opentime}}</span>

                                        <span>截至:{{i.closetime}}</span>
                                    </el-col>
                                    <el-col :span="5" style="display:inline">
                                        <a class="class-info-name" href="/work#/issueWorks">
                                            <el-button type="primary" icon="el-icon-edit" @click="changeWorkId(i.workid)">修改</el-button>
                                        </a>
                                        <el-button type="danger" icon="el-icon-delete">删除</el-button>
                                    </el-col>

                                </el-row>
                            </div>

                        </li>
                    </ul>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    export default {
        data() {
            return {works: []}
        },
        computed: {
            newWorks() {
                return this.$store.state.works
            }
        },
        methods: {
            reloadWorkId() {
                console.log("我在这")
                this
                    .$store
                    .commit('setWorkId', -1);
                this
                    .$store
                    .commit('clearCurrentWork');
            },
            changeWorkId(val) {
                console.log(val);
                this
                    .$store
                    .commit('setWorkId', val);
            },
            getWorks() {
                this
                    .$http
                    .get('api/works/getClasses')
                    .then(res => {
                        res = res
                            .data
                            console
                            .log(res.data)
                        if (res.code == 20000) {
                            //遇到问题
                            this
                                .$store
                                .commit('setWorks', res.data);

                            // setThisWorks();

                            console.log(this.$store.state.works)
                            // this.$store.works
                        } else {
                            this
                                .$message
                                .warning(res.data.message)
                        }
                    })
            }
        },
        created() {
            this.getWorks();
        }
    }
</script>

<style lang="scss" scoped="scoped">
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>