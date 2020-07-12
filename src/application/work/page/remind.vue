<template>
    <el-row :gutter="20">
        <el-col :span="18" :offset="3">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="i in classCount"  class="mgb20"  >
                    <el-card>
                        <div class="classes_title">
                            <span>課程：</span>
                            <span>SSD7</span>
                        </div>
                        <div style="padding-top: 20px;padding-left: 10px;padding-bottom: 50px">
                            <span>
                                貼心小學委提醒你記得交
                            </span>
                            <span>
                                作業5
                            </span>
                        </div>
                        <div>

                        </div>
                    </el-card>
                </li>
            </ul>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "remind",
        data() {
            return {
                dialogFormVisible:false,
                classCount:5,
            }
        },
    }
</script>

<style scoped>
.classes_title{
    font-size: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

}
.mgb20 {
    margin-bottom: 50px;
}
</style>