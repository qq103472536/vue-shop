import { reqCatelist } from "../../utils/http"

let state = {
    // 存放数据
    list: []
}
// "cate/list"
let mutations = {
// 添加数据,修改数据

// 修改list
    changeList(state, arr) {
        state.list = arr
    }
}
let getters = {
// 导出数据
    list(state) {
        return state.list
    }
}
let actions = {
    // 写逻辑
    reqList(context) {
        reqCatelist({ istree: true }).then(res => {
            if (res.data.code == 200) {
                context.commit("changeList", res.data.list)
            }
        })
    }
}

export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced: true

}