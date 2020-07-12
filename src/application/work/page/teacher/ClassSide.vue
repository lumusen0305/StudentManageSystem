<template>
    <div  style="width:120px;padding-left: 0;
    padding-right: 0;
    line-height: 1.5;
    font-size: 14px;
    background-color: #fff;overflow:auto" >
        <el-row>
            <el-col :span="24">
        <div style="    color: #737373;
    font-size: 13px;
    background-color: #fff;
    padding-top: 20px;">
            <router-link class="el-icon-tickets" style="display: block;
    font-size: 16px;
    margin: 10px 0;
    padding-left: 10px;
    
    line-height: 35px;
    border-radius: 17px;" to="/Sidebar"><i>
        
        </i><span>
            作业查看
        </span></router-link>
        </div>
        </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
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