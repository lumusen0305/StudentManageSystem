<template>
    <div >
        <div>
            <!-- <homeworkBar style="position:relative;margin-left:0"></homeworkBar> -->
            <studentTable style="display:block;position:relative;"></studentTable>
        </div>
    </div>
</template>

<script>
    
   const studentTable = () =>import ("../page/manager/studentTable");
    export default {
        data() {
            return {isShow: false,
            
            
            }
        },
        components: {
            studentTable
        }
    }
</script>

<style lang="scss" scoped="scoped"></style>