<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 我的課表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-select v-model="query.address" placeholder="學年" class="handle-select mr10">
                    <el-option key="1" label="2020" value="2020"></el-option>
                    <el-option key="2" label="2019" value="2019"></el-option>
                </el-select>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                    :data="timeData"
                    stripe
                    style="width: 100%">
                <el-table-column label="周" prop="label" align="center"></el-table-column>

                <el-table-column label="上午" align="center">
                    <el-table-column
                            v-for="(v,i) in titleData" :key="i"
                            v-if="v.label==='上午'" align="center">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">
                                第{{v.count}}节 <br/>
                                {{v.startTime}}-{{v.endTime}}
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div >
                                <div v-if="timeShow">
                                    {{scope.row[sbjectKey[i]]}}<br/>
                                    {{scope.row[teacherKey[i]]}}
                                </div>
                                <div v-else>
                                    <el-input
                                            size="mini"
                                            placeholder="科目"
                                            suffix-icon="el-icon-date"
                                            v-model="scope.row[sbjectKey[i]]">
                                    </el-input>
                                    <el-select
                                            clearable
                                            v-model="scope.row[teacherKey[i]]"
                                            size="mini"
                                            placeholder="任课老师">
                                        <el-option
                                                v-for="(val,ind) in teachers"
                                                :key="ind"
                                                :label="val.teacherName"
                                                :value="val.id"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="下午" align="center">
                    <el-table-column
                            v-for="(v,i) in titleData" :key="i"
                            v-if="v.label==='下午'" align="center">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">
                                第{{v.count}}节 <br/>
                                {{v.startTime}}-{{v.endTime}}
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div >
                                <div v-if="timeShow">
                                    {{scope.row[sbjectKey[i]]}}<br/>
                                    {{scope.row[teacherKey[i]]}}
                                </div>
                                <div v-else>
                                    <el-input
                                            size="mini"
                                            placeholder="科目"
                                            suffix-icon="el-icon-date"
                                            v-model="scope.row[sbjectKey[i]]">
                                    </el-input>
                                    <el-select
                                            clearable
                                            v-model="scope.row[teacherKey[i]]"
                                            size="mini"
                                            placeholder="任课老师">
                                        <el-option
                                                v-for="(val,ind) in teachers"
                                                :key="ind"
                                                :label="val.teacherName"
                                                :value="val.id"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column label="晚上" align="center">
                    <el-table-column
                            v-for="(v,i) in titleData" :key="i"
                            v-if="v.label==='晚上'"
                            align="center">
                        <template slot="header" slot-scope="scope">
                            <div class="tabletitle-timeline">
                                第{{v.count}}节 <br/>
                                {{v.startTime}}-{{v.endTime}}
                            </div>
                        </template>
                        <template slot-scope="scope">
                            <div >
                                <div v-if="timeShow">
                                    {{scope.row[sbjectKey[i]]}}<br/>
                                    {{scope.row[teacherKey[i]]}}
                                </div>
                                <div v-else>
                                    <el-input
                                            size="mini"
                                            placeholder="科目"
                                            suffix-icon="el-icon-date"
                                            v-model="scope.row[sbjectKey[i]]">
                                    </el-input>
                                    <el-select
                                            clearable
                                            v-model="scope.row[teacherKey[i]]"
                                            size="mini"
                                            placeholder="任课老师">
                                        <el-option
                                                v-for="(val,ind) in teachers"
                                                :key="ind"
                                                :label="val.teacherName"
                                                :value="val.id"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'classTable',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                timeShow:true,//编辑表与展示表
                teachers:[],//全部教师


                sbjectKey:['oneS','twoS','threeS','fourS','fiveS','sixS','sevenS','eightS','nineS'],//科目key值
                teacherKey:['oneT','twoT','threeT','fourT','fiveT','sixT','sevenT','eightT','nineT'],//老师key值
                //每天的课表
                timeData:[
                    {
                        id:'1',
                        label:'周一',
                        oneS:'java教程1',
                        oneT:'郑老师',
                        twoS:'语文',
                        twoT:'张老师',
                        threeS:'心理辅导',
                        threeT:'杨老师',
                        fourS:'音乐',
                        fourT:'巩老师',
                        fiveS:'网络',
                        fiveT:'征老师',
                        sixS:'舞蹈',
                        sixT:'程老师',
                        sevenS:'ppt教程',
                        sevenT:'翟老师',
                        eightS:'职业规划',
                        eightT:'郝老师',
                        nineS:'就业指导',
                        nineT:'曹老师'
                    },
                    {
                        id:'2',
                        label:'周二',
                        oneS:'java教程2',
                        oneT:'郑老师',
                        twoS:'语文',
                        twoT:'张老师',
                        threeS:'心理辅导',
                        threeT:'杨老师',
                        fourS:'音乐',
                        fourT:'巩老师',
                        fiveS:'网络',
                        fiveT:'征老师',
                        sixS:'舞蹈',
                        sixT:'程老师',
                        sevenS:'ppt教程',
                        sevenT:'翟老师',
                        eightS:'职业规划',
                        eightT:'郝老师',
                        nineS:'就业指导',
                        nineT:'曹老师'
                    },
                    {
                        id:'3',
                        label:'周三',
                        oneS:'java教程3',
                        oneT:'郑老师',
                        twoS:'语文',
                        twoT:'张老师',
                        threeS:'心理辅导',
                        threeT:'杨老师',
                        fourS:'音乐',
                        fourT:'巩老师',
                        fiveS:'网络',
                        fiveT:'征老师',
                        sixS:'舞蹈',
                        sixT:'程老师',
                        sevenS:'ppt教程',
                        sevenT:'翟老师',
                        eightS:'职业规划',
                        eightT:'郝老师',
                        nineS:'就业指导',
                        nineT:'曹老师'
                    },
                    {
                        id:'4',
                        label:'周四',
                        oneS:'java教程',
                        oneT:'郑老师',
                        twoS:'语文',
                        twoT:'张老师',
                        threeS:'心理辅导',
                        threeT:'杨老师',
                        fourS:'音乐',
                        fourT:'巩老师',
                        fiveS:'网络',
                        fiveT:'征老师',
                        sixS:'舞蹈',
                        sixT:'程老师',
                        sevenS:'ppt教程',
                        sevenT:'翟老师',
                        eightS:'职业规划',
                        eightT:'郝老师',
                        nineS:'就业指导',
                        nineT:'曹老师'
                    },
                    {
                        id:'5',
                        label:'周五',
                        oneS:'java教程',
                        oneT:'郑老师',
                        twoS:'语文',
                        twoT:'张老师',
                        threeS:'心理辅导',
                        threeT:'杨老师',
                        fourS:'音乐',
                        fourT:'巩老师',
                        fiveS:'网络',
                        fiveT:'征老师',
                        sixS:'舞蹈',
                        sixT:'程老师',
                        sevenS:'ppt教程',
                        sevenT:'翟老师',
                        eightS:'职业规划',
                        eightT:'郝老师',
                        nineS:'就业指导',
                        nineT:'曹老师'
                    },
                    {
                        id:'',
                        label:'周六',
                    },
                    {
                        id:'',
                        label:'周天',
                    },
                ],
                //课节数据---标题
                titleData:[
                    {
                        id:'1',
                        count:1,
                        label:'上午',
                        startTime:'08:00',
                        endTime:'08:30'
                    },
                    {
                        id:'2',
                        count:2,
                        label:'上午',
                        startTime:'09:00',
                        endTime:'09:30'
                    },
                    {
                        id:'3',
                        count:3,
                        label:'下午',
                        startTime:'12:05',
                        endTime:'12:35'
                    },
                    {
                        id:'4',
                        count:4,
                        label:'下午',
                        startTime:'14:00',
                        endTime:'14:30'
                    },
                    {
                        id:'5',
                        count:5,
                        label:'下午',
                        startTime:'16:00',
                        endTime:'16:30'
                    },
                    {
                        id:'6',
                        count:6,
                        label:'下午',
                        startTime:'17:00',
                        endTime:'17:30'
                    },
                    {
                        id:'7',
                        count:7,
                        label:'晚上',
                        startTime:'19:00',
                        endTime:'19:30'
                    },
                    {
                        id:'8',
                        count:8,
                        label:'晚上',
                        startTime:'20:00',
                        endTime:'20:30'
                    },
                    {
                        id:'9',
                        count:9,
                        label:'晚上',
                        startTime:'21:00',
                        endTime:'21:30'
                    },
                ],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            // getData() {
            //     fetchData(this.query).then(res => {
            //         console.log(res);
            //         this.tableData = res.list;
            //         this.pageTotal = res.pageTotal || 50;
            //     });
            // },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }
    .handle-select {
        width: 120px;
    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }

    .tabletitle-timeline{
        line-height: 18px!important;
    }
</style>