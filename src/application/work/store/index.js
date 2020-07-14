import Vue from 'vue';
import Vuex from 'vuex';
import teacher from './teacher'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //关于作业
        works:{
            
        },
        homeworkLists:[{
            studentid:"",
            studentname:"",
            workid:"",
            courseid:"",
            homeworkid:12389,
            status:"",
            date:"",
        }],
        //教师进行的作业的修改和发布
        currentWork:{
            title:"",
            courseid:"",
            workid:-1,
            description:"",
            opentime:"",
            closetime:"",
            filelist:[{
                name:"-1",
                url:"-1",
            }]
        },
        //当前的workid,为当前课程的id,如果id为-1,那么说明当前为新增homework功能,这里是给予教师的发布修改作业
        workid:-1,
        //通过checkWorkId得到某一次作业中所有同学的提交
        checkWorkId:-1,
        //学生的提交的具体的作业
        currentStudentWork:{
                    studentid:"",
                    studentname:"",
                    workid:"",
                    courseid:"",
                    homeworkId:"",
                    workurl:"",
        },


        //关于学生
        studentList:[],
        currentStudent:{},
        studentid:-1,

        //帖子
        postId:'',
        discussTitle:'',

        //學生提交作業
        studentHomeWorks:{

        },
        classHomeWorkId:{

        },
        classHomeWork:{

        }
    },
    getters:{
        newCurrentWork(state){
            return state.currentWork;
        },
        getpostId(state){
            return state.postId;
        }
    },
    mutations: {
        //作业管理
        setWorkId(state,val){
            state.workid = val;  
        },
        setCheckWorkId(state,val){
            state.checkWorkId=val;
        },
        setCurrentStudentWork(state,val){
            state.currentStudentWork=val;
        },
        clearCurrentWork(state){
            state.currentWork = {
                title:"",
                studentid:"",
                workid:"",
                description:"",
                fileList:"",
                opentime:"",
                closetime:"",
                filelist:[{
                    name:"-1",
                    url:"-1",
                }]
            }
        },
        setWorks(state,val) {
            state.works = val;
           

        },
        setHomeworkLists(state,val){
            state.homeworkLists=val;
           
        },
        setCurrentWork(state,val){
            state.currentWork=val;
           

            //我知道了,我给它原本的currentWork={currentWork:{...}},早成了currenWork对象只有一个内容,这个内容的key是currentWork,我afadkjngwiosadfnqj(广西粗话)
            var keys = Object.keys(state.currentWork)
            console.log(keys)
            console.log(state.currentWork)

        },  

        setCurrentWorkTitle(state,val){
            state.currentWork.title=val;
            val.console.log(val);
        },
        //设置currentStudentWork的workid
        setCurrentStudentWorkId(state,val){
            state.currentStudentWork.homeworkId=val;
            console.log(val);
        },


        //学生管理
        setStudentList(state,val){
            state.studentList=val;
        },
        setCurrentStudent(state,val){
            state.currentStudent=val;
            console.log(state.currentStudent)

        },
        setStudentId(state,val){
            state.studentid=val;
        },
        clearStudentInfo(state){
            state.currentStudent="";
        },
        //帖子
        setDiscuss(state,val){
            state.postId=val;
        },
        setdiscussTitle(state,val){
            state.discussTitle=val;
        },
    },
   
});