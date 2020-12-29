import { reqSpecslist } from "../../utils/http"

let state = {
    // 初始化数据
    list: [],
    total: 10,
    page: 1,
    size: 2,
}
let mutations = {
    //    添加数据，修改数据

    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, num) {
        state.page = num
    }

}
let getters = {
    //    导出数据
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
let actions = {
    //    页面逻辑
    // 获取分页


}

export default {
    state,
    mutations,
    getters,
    actions,
    //命名空间
    namespaced: true

}