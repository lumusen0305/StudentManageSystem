import Vue from 'vue';
import Vuex from 'vuex';
import teacher from './teacher'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        works:[],
        homeworkLists:[],

        currentWork:{},
        workid:-1,
        currentStudent:{},
        studentid:{},
    },
    getters:{
        
    },
    mutations: {
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

            console.log(state.currentWork.title)

        },
        setWorkId(state,val){
            state.workid=val;

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