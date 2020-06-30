<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">中難大學教務系統</div>
            <el-form :model="param" :rules="rules" ref="register" label-width="0px" class="ms-content">
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

                <el-form-item prop="email">
                    <el-row >
                        <el-col :span="15">
                            <el-input v-model="param.email" placeholder="email">
                            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary" plain>發送驗證碼</el-button>
                        </el-col>
                    </el-row>


                </el-form-item>

                <el-form-item prop="phone">
                    <el-input v-model="param.phone" placeholder="phone">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">註冊</el-button>
                </div>
                <a class="login-tips" href="/sign#/Login">登入</a>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {isPhone,isEmail} from "../static/validate";

    export default {
        data: function() {
            return {
                param: {
                    username: '',
                    password: '',
                    email : '',
                    phone:''
                },
                rules: {
                    username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
                    password: [{ required: true, message: '請輸入密碼', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密碼不可<6', trigger: 'blur' },
                    ],
                    email: [{ required: true, message: '請輸入Email', trigger: 'blur' },
                        { validator: isEmail, trigger: 'blur'},
                    ],
                    phone: [{ type: 'string', min: 11, message: '手機號不能小於11位', trigger: 'blur' },
                        { validator: isPhone, trigger: 'blur'},
                    ],
                },
            };
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$message.success('登入成功');
                        localStorage.setItem('ms_username', this.param.username);
                        this.$router.push('/');
                    } else {
                        this.$message.error('請輸入帳密');
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../../assets/img/1049843.png);
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