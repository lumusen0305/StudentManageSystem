<template>
    <div class="wrapper">
        <div>
            <!-- <homeworkBar style="position:relative;margin-left:0"></homeworkBar> -->
          <!-- <manageWorks style="display:block;position:relative;top:-80px"></manageWorks> -->
          
            <homeworkTable style="display:block;position:relative;"></homeworkTable>
            <!-- <issueHomework></issueHomework> -->
            <!-- <studentHomework></studentHomework> -->
            <!-- <announcement style="display:block;position:relative;"></announcement> -->
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './ClassSide';
    
    const manageWorks = () => import("../page/teacher/manageWorks");
    const homeworkBar = () => import("../page/teacher/ClassSide");
    const homeworkTable = () => import("../page/teacher/homeworkTable")
    const issueHomework = () => import("../page/teacher/issueWorks")
    const studentHomework = () => import("../page/teacher/studentHomework")
    const announcement = () => import("../page/teacher/announcement")
    export default {
        components: {
            vHead,
            homeworkBar,
            manageWorks,
            homeworkTable,
            issueHomework,
            studentHomework,
            announcement,
        },
        
    }
</script>

<style lang="scss" scoped>

</style>