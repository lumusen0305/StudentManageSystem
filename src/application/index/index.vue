<template>
    <div class="background">
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="2">
                        <div>
                            <img src="../../assets/img/game-controller.png" class="top_icon" alt="Girl in a jacket" width="70" height="70">
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" class="top_btn"><span class="top_text">下載</span></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" class="top_btn"><span class="top_text">使用</span></el-button>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="text" class="top_btn"><span class="top_text">贊助</span></el-button>
                    </el-col>
                    <el-col :span="1" :offset="14">
                        <el-button round type="primary" plain @click="login">登入</el-button>
                        <el-dialog title="登入" :visible.sync="dialogFormVisible" :append-to-body="true">
                            <el-form :model="form">
                                <el-form-item label="帳號" :label-width="formLabelWidth">
                                    <el-input v-model="form.username" placeholder="请输入内容"></el-input>
                                </el-form-item>
                                <el-form-item label="密碼" :label-width="formLabelWidth">
                                    <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="submit">确 定</el-button>
                            </div>
                        </el-dialog>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <div>
                    <div style="display: flex; margin-top: 20px; height: 100px;" class="main_font">
                        <transition name="el-zoom-in-center">
                            <div v-show="show2" class="transition-box">Welcome to golang chat</div>
                        </transition>
                    </div>
                </div>
            </el-main>
            <el-footer>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="grid-content bg-purple">
                            <el-dropdown>
                              <span class="el-dropdown-link" style="color: white">
                                  下拉菜单<i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
                                 </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <el-col :span="6">

                        <div class="grid-content bg-purple">
                            <el-dropdown>
                              <span class="el-dropdown-link" style="color: white">
                                  下拉菜单<i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
                                 </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <el-col :span="6">

                        <div class="grid-content bg-purple">
                            <el-dropdown>
                              <span class="el-dropdown-link" style="color: white">
                                  下拉菜单<i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
                                 </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <el-col :span="6">

                        <div class="grid-content bg-purple">
                            <el-dropdown>
                              <span class="el-dropdown-link" style="color: white">
                                  下拉菜单<i class="el-icon-arrow-down el-icon--right" style="color: white;"></i>
                                 </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>
<style>
    .top_icon{
        margin-top: -25px;
    }
    .main_font {
        position: absolute;
        top: 40%;
        width: 100%;
        margin-top: -100px;
        margin-left: -100px;
    }

    .transition-box {
        position: absolute;
        /*margin-left:-100px;*/
        width: 50%;
        left: 28%;
        height: 100px;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        padding: 40px 40px;
        box-sizing: border-box;
        font-size: 80px;
    }

    .el-main {
        background: url("../../assets/img/index_backgrounf.jpg") no-repeat;
        height: 800px;
        text-align: center;
        position: relative;


    }

    .top_text {
        color: #D0D0D0;
        font-size: 15px;
    }

    .top_btn:hover .top_text {
        color: #F0F0F0;
    }

    .el-icon-platform-eleme {
        height: 100%;
        font-size: 45px;
    }

    html, body {
        background-color: #303133;
        margin: 0;
        padding: 0;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        background-color: #303133;
        height: 100%;
    }

    .el-header, .el-footer {
        text-align: center;
        transform: translateY(20%);

    }

</style>

<script>
    import axios from 'axios'
    export default {

        data: () => ({
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: '50px',
            form: {
                username: '',
                password: ''
            },
            show2: false
        }),
        methods: {
            login(){
                let jwt_tocken = localStorage.getItem('token')
                axios({
                    method: 'post',
                    baseURL: 'http://localhost:12345',
                    url: '/account/member/profile',
                    data:{},
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+jwt_tocken
                    },
                }).then((response) => {
                    if(JSON.parse(JSON.stringify(response.data))['code']==200){
                        console.log(response.data)
                        document.location.href = "/channel";
                    }
                })
                    .catch((err) => {
                        this.dialogFormVisible=true
                    })

            },
            submit() {
                axios({
                    method: 'post',
                    baseURL: 'http://localhost:12345',
                    url: '/account/login',
                    headers: { 'Content-Type': 'application/json'},
                    data: {
                        account: this.form.username,
                        password: this.form.password
                    }
                })
                    .then((response) => {
                        localStorage.setItem('token',JSON.parse(JSON.stringify(response.data))['token'])
                        // console.log(localStorage.getItem('token'))
                        this.dialogFormVisible=false
                    })
                    .catch((err) => { console.log() })
            },
            onSuccess() {
                console.log("Success verity");
                this.dialog = false;
                /*axios
                  .get("http://localhost:8081/account/setCookies", {
                    params: {
                      username: this.name
                    }
                  })
                  .then(response => {
                    console.log(response);
                  });*/
                // 登入狀態存 cookie 7 天 存 username 或是 email
                // Cookies.set('userStatus', this.name, { expires: 7 })
                document.location.href = "/work/Home";
            },
        },

        created() {
            setTimeout(() => {
                this.show2 = true;
            }, 500);
        },
        updated() {
            // 讓我們可以知道組件有被更新
        },
        computed: {}
    }

</script>
