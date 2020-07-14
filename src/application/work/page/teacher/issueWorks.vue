<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="18" :offset="3">
                <el-card shadow="hover" class="mgb20">
                    <a class="el-icon-caret-left" href="javascript:history.go(-1)">返回</a>

                    <el-form v-if="this.$store.state.workid === -1">
                        <el-form-item label="标题">
                                <el-input v-model="currentWork.title"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <span>作业说明</span>
                                <div >
                                    <mavon-editor v-model="currentWork.description"/>

                                </div>

                            </el-form-item>
                            <el-form-item label="作业附件">
                                <el-upload
                                    action="#"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-remove="handleRemove"
                                    :file-list="newCurrentWork.fileList">
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
                                <el-form-item >
                                    <el-button type="primary" @click="onSubmit">保存</el-button>
                                    <el-button>取消</el-button>
                                </el-form-item>
                        </el-form>

                        <el-form v-else>
                            <el-form-item label="标题" >
                                <el-input v-model="currentWork.title"></el-input>
                            </el-form-item>
                            <el-form-item >
                                <span>作业说明</span>
                                <div >
                                    <mavon-editor v-model="currentWork.description"/>

                                </div>

                            </el-form-item>
                            <el-form-item label="作业附件">
                                <el-upload
                                    action="#"
                                    list-type="picture-card"
                                    :auto-upload="false"
                                    :on-remove="handleRemove"
                                    :file-list="newCurrentWork.fileList">
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
                                <el-form-item >
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

            import {mapGetters} from 'vuex'

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
                        value2: '',
                        dialogImageUrl: '',
                        dialogVisible: false,
                        disabled: false,
                        fileList: [
                            {
                                name: 'food.jpeg',
                                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageM' +
                                        'ogr2/thumbnail/360x360/format/webp/quality/100'
                            }, {
                                name: 'food2.jpeg',
                                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageM' +
                                        'ogr2/thumbnail/360x360/format/webp/quality/100'
                            }
                        ]
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
                    },
                    ...mapGetters(['newCurrentWork'])
                },

                methods: {
                    handleRemove(file, fileList) {
                        console.log(file, fileList);
                        for (let i = 0; i < this.fileList.length; i++) {
                            if (file.name === this.fileList[i].name) {
                                this
                                    .fileList
                                    .splice(i, i);
                            }
                        }
                    },
                    handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                    },
                    handleDownload(file) {
                        console.log(file);
                    },

                    onSubmit() {

                    },
                    handleChange(file, fileList) {
                        this.fileList = fileList.slice(-3);
                    },
                    getWorkById(val) {
                        console.log(val)
                        this
                            .$http
                            .get('api/works/currentWork', val)
                            .then(res => {
                                res = res.data
                                if (true) {
                                    this.$store.commit('setWorkId',res.data.currentWork.workid)
                                    console.log(res.data.currentWork);
                                    this
                                        .$store
                                        .commit('setCurrentWork', res.data.currentWork);
                                } else {
                                    // this     .$message     .warning(res.data.message)
                                }
                            })
                    }
                },

                created() {
                    if(this.$store.state.workid!==-1){
                        console.log(this.$store.state.workid);
                         this.getWorkById(this.$store.state.workid);
                    }
                     console.log(this.$store.state.workid);

                    // 我上面的axois是一个异步操作,可能我在执行下面的fileList初始化代码的时候,异步操作还没完成,
                    // 所以只有undefined,等axois完成的时候,这条语句已经跳过了
                    // this.fileList=this.$store.state.currentWork.currentWork.fileList;
                    // console.log(this.fileList)
                }

            };
        </script>

        <style lang="scss" scoped="scoped"></style>