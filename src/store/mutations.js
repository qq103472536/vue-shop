export let state = {
    userInfo: sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}


}
// 初始化数据

export let mutations = {

    

}
//    添加数据，修改数据


export let getters = {

    userInfo(state) {
        return state.userInfo
    }
}
//    导出数据


