<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">中難大學教務系統</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登入</el-button>
                </div>
                <a class="login-tips" href="/sign#/Register">註冊</a>
            </el-form>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                param: {
                    username: 'account',
                    password: 'pass',
                },
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        axios({
                            method: 'post',
                            baseURL: 'http://139.186.71.42:8080',
                            url: '/login',
                            headers: { 'Content-Type': 'application/json'},
                            params: {
                                username: this.param.username,
                                                                password: this.param.password,
                            },
                        })
                            .then((response) => {
                                
                                this.$cookie.set('menber',response.data.data.identity, 1);
                                localStorage.setItem('token',response.data.data.token)
                                this.$message.success('登录成功');
                                this.$cookie.set('ms_username',response.data.data.userId, 1);
                                localStorage.setItem('ms_username', response.data.data.userId);
                                console.log(response.data.data)
                                document.location.href = "/work";

                            })
                            .catch((err) => {
                                // this.$message.error('登录失敗');                             this.$message.error('登录失敗');
                                this.$cookie.set('menber', 'sutdent', 1);
                                this.$cookie.set('ms_username',this.param.username, 1);
                                // document.location.href = "/work";

                            })

                    } else {
                        this.$message.error('请输入账号和密码');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            login(){
                // document.location.href = "/work";
            }
        },
        created() {
            this.$cookie.set('menber', 'sutdent', 1);
            console.log(this.$cookie.get('menber'));
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/img/1057195.png);
        background-size: 100%;
    }
    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }
    .ms-content {
        padding: 30px 30px;
    }
    .login-btn {
        text-align: center;
    }
    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }
    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>