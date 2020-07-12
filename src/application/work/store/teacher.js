//放置teacher模块的数据
//此处不用引入vuex,因为这里是被store的indeximport的
//我1现在很想知道这个export default是怎么作用的
export default {
    state:{
        works:[],
    },
    getters:{
        
    },
    mutations: {
        setWorks(state,val) {
            state.works = val;
            console.log(val)
            console.log(state.works)

        }

    },

}