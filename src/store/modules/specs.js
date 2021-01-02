import { reqSpecscount, reqSpecslist } from "../../utils/http"

let state = {
    // 初始化数据
    list: [],
    total: 0,
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
    // 获取数据
    reqSpecslist(context, bool) {
        //商品规格是要分页的，商品管理，是不要分页的。所以多给一个参数，bool.
        //bool是true,就要全部；否则，就做分页
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        //发请求
        reqSpecslist(params).then(res => {
            if (res.data.code) {
                //删除的是最后一页的最后一条
                if (res.data.list.length === 0 && context.state.page > 1) {
                    context.commit("changePage", context.state.page - 1)
                    context.dispatch("reqSpecslist")
                    return;
                }


                let list = res.data.list
                list.forEach(item => {
                    item.attrs = JSON.parse(item.attrs)
                });
                context.commit("changeList", res.data.list)
            }

        })
    },
    reqSpecscount(context) {
        reqSpecscount().then(res => {

            if (res.data.code == 200) {
                context.commit("changeTotal", res.data.list[0].total)
            }
        })
    },

    changePage(context, num) {
        context.commit("changePage", num)
        //重新请求list
        context.dispatch("reqSpecslist")
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