import { reqSecklist } from "../../utils/http"
let state = {
    list: []
}
// 初始化数据

let mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
//    添加数据，修改数据

let getters = {

    list(state) {
        return state.list
    }

}
//    导出数据

let actions = {
    reqList(context) {
        reqSecklist().then(res=>{
            if(res.data.code==200){
               context.commit("changeList",res.data.list)
            }
        })
    }
}
//    页面逻辑


export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced: true
}