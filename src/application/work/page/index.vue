<template>
    <div id="Index">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../../assets/img/1049843.png" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>

                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>各年PR值</span>
                    </div>大一
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>大二
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>大三
                    <el-progress :percentage="13.7"></el-progress>大四
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>以取得學分</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>掛科科數量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                        <div class="user-info">
                            <div class="shoup-info-cont">
                                <div class="user-info-name">每日一雞湯，溫暖你我心</div>
                            </div>
                        </div>
                        <div>
                            <div class="user-info-list">
                              {{chickenSoup}}
                            </div>
                        </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">

            <el-col :span="24">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import Schart from 'vue-schart';
    import axios from "axios";
    export default {
        name: 'Index',
        data() {
            return {
                chickenSoup:"宁愿不说话看起来像个傻子，也不要，开口证明自己的确如此。",
                name:this.$cookie.get('ms_username'),

                // name: localStorage.getItem('user-info-name'),
                options: {
                    type: 'line',
                    title: {
                        text: '各年平均'
                    },
                    labels: ['大一','大二','大三','大四'],
                    datasets: [
                        {
                            label: 'User',
                            data: [80,90,40,100]
                        }
                    ]
                }
            };
        },
        components: {
            Schart
        },
        computed: {
        },
        methods: {
            changeDate() {
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                });
            },
            // handleListener() {
            //     bus.$on('collapse', this.handleBus);
            //     // 调用renderChart方法对图表进行重新渲染
            //     window.addEventListener('resize', this.renderChart);
            // },
            // handleBus(msg) {
            //     setTimeout(() => {
            //         this.renderChart();
            //     }, 200);
            // },
            // renderChart() {
            //     this.$refs.bar.renderChart();
            //     this.$refs.line.renderChart();
            // }
            getSoup(){
                axios({
                    method: 'get',
                    url: 'http://api.tianapi.com/txapi/dujitang/index',
                    data:{},
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        key:'95f3103398a0a3217e75e3c1c04c313e'
            }
                }).then((response) => {

                    this.chickenSoup =JSON.parse(JSON.stringify(response.data))['newslist'][0].content
                    console.log(response.data)

                })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        created() {
            //     this.handleListener();
            //     this.changeDate();
            // },
            // activated() {
            //     this.handleListener();
            // },
            // deactivated() {
            //     window.removeEventListener('resize', this.renderChart);
            //     bus.$off('collapse', this.handleBus);
            this.getSoup();
        },
    };
</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }
    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }
    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }
    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }
    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }
    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }
    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }
    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }
    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }
    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }
    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }
    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .shoup-info-cont {
        padding-left: 10px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }
    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }
    .shoup-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }
    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }
    .user-info-list span {
        margin-left: 70px;
    }
    .mgb20 {
        margin-bottom: 20px;
    }
    .todo-item {
        font-size: 14px;
    }
    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }
    .schart {
        width: 100%;
        height: 300px;
    }
</style>