import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import cate from "./modules/cate"
import specs from "./modules/specs"
import goods from "./modules/goods"
import seckill from "./modules/seckill"
import { actions } from "./actions"
import { state, getters, mutations } from "./mutations"
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        // 2.引入 注册
        goods,
        cate,
        specs,
        seckill
    }
})