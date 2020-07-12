<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8" :offset="3">
                <el-card shadow="hover" class="mgb20">
                                        <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>

                    <el-form label-width="80px">
                        <el-form-item label="姓名">
                            <el-input >123</el-input>
                        </el-form-item>

                        <el-form-item label="成绩">
                            <el-input >123</el-input>
                        </el-form-item>
                        <el-form-item label="评语">
                            <el-input type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <a class='download' :href='downloadhttp' download="" title="下载">下载</a>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">保存</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {

        computed: {
            homework() {
                return this.data
            }
        }
    }
</script>

<style lang="scss" scoped="scoped"></style>