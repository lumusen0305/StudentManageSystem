import Vue from 'vue';
import Vuex from 'vuex';
import teacher from './teacher'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //关于作业
        works:[],
        homeworkLists:[],
        currentWork:{
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
        },
        //当前的workid,为当前课程的id,如果id为-1,那么说明当前为新增homework功能
        workid:-1,

        //关于学生
        currentStudent:{},
        studentid:{},
    },
    getters:{
        newCurrentWork(state){
            return state.currentWork;
        }
    },
    mutations: {
        setWorkId(state,val){
            state.workid = val;
            console.log('问题在拿')

            console.log(val)
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
        }
        ,
        setWorks(state,val) {
            state.works = val;
            console.log(val)
            console.log(state.works)

        },
        setHomeworkLists(state,val){
            state.homeworkLists=val;
            console.log(state.homeworkLists)
        },
        setCurrentWork(state,val){
            state.currentWork=val;
            console.log("setCurrentWork")
            //我知道了,我给它原本的currentWork={currentWork:{...}},早成了currenWork对象只有一个内容,这个内容的key是currentWork,我afadkjngwiosadfnqj(广西粗话)
            var keys = Object.keys(state.currentWork.currentWork)
            console.log(keys)
            console.log(state.currentWork)

        },
        
        setCurrentStudent(state,val){
            state.currentStudent=val;
            console.log(state.currentStudent)

        },
        setStudentId(state,val){
            state.studentid=val;
        }

    },
    // modules:{
    //     teacher
    // }
});