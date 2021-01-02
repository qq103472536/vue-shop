import { reqGoodscount, reqGoodslist } from "../../utils/http"
let state = {
    list: [],
    total: 0,
    page: 1,
    size: 5
}
// 初始化数据

let mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changetotal(state, num) {
        state.total = num
    },
    changepage(state, num) {
        state.page = num
    }
}
//    添加数据，修改数据

let getters = {
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
//    导出数据

let actions = {
    //获取list的action
    reqList(context, bool) {
        //商品规格是要分页的，商品管理，是不要分页的。所以多给一个参数，bool.
        //bool是true,就要全部；否则，就做分页
        let params = bool ? {} : { page: context.state.page, size: context.state.size }
        //发请求
        reqGoodslist(params).then(res => {
            if (res.data.code) {
                //删除的是最后一页的最后一条
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("reqList")
                    return;
                }


                //修改list
                context.commit("changeList", res.data.list)
            }
        })
    },
    reqtotal(context) {
        reqGoodscount().then(res => {
            context.commit("changetotal", res.data.list[0].total)
        })
    },
    changePage(context, num) {
        //修改页码
        context.commit("changePage", num)
        //重新请求list
        context.dispatch("reqList")
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