<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left"  href="javascript:history.go(-1)">返回</a>

                    <!-- <el-form v-if="currentWork !== -1"> <el-form-item label="标题"> <el-input
                    ></el-input> </el-form-item> <el-form-item label="作业描述"> <el-input
                    type="textarea"></el-input> </el-form-item> <el-form-item label="上传文件">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false"> <i
                    slot="default" class="el-icon-plus"></i> <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt=""> <span
                    class="el-upload-list__item-actions"> <span class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"> <i class="el-icon-zoom-in"></i> </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete"
                    @click="handleDownload(file)"> <i class="el-icon-download"></i> </span> <span
                    v-if="!disabled" class="el-upload-list__item-delete"
                    @click="handleRemove(file)"> <i class="el-icon-delete"></i> </span> </span>
                    </div> </el-upload> </el-form-item> <el-form-item label="作业时间"> <div
                    class="block"> <span class="demonstration">带快捷选项</span> <el-date-picker
                    v-model="value2" type="datetimerange" :picker-options="pickerOptions"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    align="right"></el-date-picker> </div> </el-form-item> <el-form-item> <el-button
                    type="primary" @click="onSubmit">立即创建</el-button> <el-button>取消</el-button>
                    </el-form-item> </el-form> -->

                    <el-form >
                        <el-form-item label="标题">
                            <el-input v-model="currentWork.title"></el-input>
                        </el-form-item>
                        <el-form-item label="作业描述">
                            <el-input type="textarea" v-model="currentWork.description"></el-input>
                        </el-form-item>
                        <el-form-item label="作业附件">
                            <el-upload action="#" list-type="picture-card" :auto-upload="false">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                        <span class="el-upload-list__item-actions">
                                            <span
                                                class="el-upload-list__item-preview"
                                                @click="handlePictureCardPreview(file)">
                                                <i class="el-icon-zoom-in"></i>
                                            </span>
                                            <span
                                                v-if="!disabled"
                                                class="el-upload-list__item-delete"
                                                @click="handleDownload(file)">
                                                <i class="el-icon-download"></i>
                                            </span>
                                            <span
                                                v-if="!disabled"
                                                class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <i class="el-icon-delete"></i>
                                            </span>
                                        </span>
                                    </div>
                                </el-upload>

                            </el-form-item>
                            <el-form-item label="作业时间">
                                <div class="block">
                                    <el-date-picker
                                        v-model="value2"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right"></el-date-picker>
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
            data() {
                return {
                    pickerOptions: {
                        shortcuts: [
                            {
                                text: '最近一周',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                    picker.$emit('pick', [start, end]);
                                }
                            }, {
                                text: '最近一个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                    picker.$emit('pick', [start, end]);
                                }
                            }, {
                                text: '最近三个月',
                                onClick(picker) {
                                    const end = new Date();
                                    const start = new Date();
                                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                    picker.$emit('pick', [start, end]);
                                }
                            }
                        ]
                    },
                    value1: [
                        new Date(2000, 10, 10, 10, 10),
                        new Date(2000, 10, 11, 10, 10)
                    ],
                    value2: ''
                };
            },

            computed: {
                currentWork: {
                    get() {
                        return this.$store.state.currentWork;

                    },
                    set(value) {
                         this
                            .$store
                            .commit('setCurrentWork', value);
                    }
                },
                currentWorkId() {
                    return this.$store.state.workid;
                }
            },

            methods: {
                handleRemove(file) {
                    console.log(file);
                },
                handlePictureCardPreview(file) {
                    this.dialogImageUrl = file.url;
                    this.dialogVisible = true;
                },
                handleDownload(file) {
                    console.log(file);
                },

                onSubmit() {
                    this.getWorkById(1);

                },
                getWorkById(val) {
                    console.log(val)
                    this
                        .$http
                        .get('api/works/currentWork', val)
                        .then(res => {
                            res = res.data

                            if (true) {
                                //遇到问题
                                this
                                    .$store
                                    .commit('setCurrentWork', res.data);

                                console.log(this.$store.state.currentWork.title)
                            } else {
                                // this     .$message     .warning(res.data.message)
                            }
                        })
                }
            },

            created() {
                this.getWorkById(1);
            }

        };
    </script>

    <style lang="scss" scoped="scoped"></style>