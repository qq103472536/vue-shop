export let state = {
    userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}


}
// 初始化数据

export let mutations = {
    changeUserInfo(state, obj) {
        state.userInfo = obj
        if (obj.username) {
            sessionStorage.setItem("userInfo", JSON.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo", JSON.stringify(obj))
        }

    }


}
//    添加数据，修改数据


export let getters = {

    userInfo(state) {
        return state.userInfo
    }
}
//    导出数据


