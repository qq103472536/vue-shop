import axios from "axios"
import qs from "qs"
import Vue from "vue"

// 开发环境使用8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 生产环境打包
// let baseUrl=""
// Vue.prototype.$pre=""

// 响应拦截
axios.interceptors.response.use(res => {
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    if (!res.data.list) {
        res.data.list = []
    }
    console.group("本次请求地址是：" + res.config.url)
    console.log(res)
    console.groupEnd()
    return res
})
// 处理失败

axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    //18.统一处理失败
    if (res.data.code !== 200) {
        erroralert(res.data.msg)
    }
    return res
})


// post 带有文件，参数转换
function dataToFromData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}

// ********************************菜单管理*********************************//
// 菜单添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
}

// 菜单列表请求
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 菜单删除
export const reqMenuDelete = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}

// 获取一条数据
export const reqMenuInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: obj
    })
}

// 菜单更新

export const reqMenuUpdata = (list) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: 'post',
        data: qs.stringify(list)
    })
}


// *********************************菜单管理结束******************

//***********************************角色管理******** */ 
// 获取添加
export const reqRoleadd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 获取列表
export const reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
        params: {

        }
    })
}
// 角色删除

export const reqRoledelete = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 获取一条数据
export const reqRoleGetone = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 修改数据
export const ReqRoleUpdata = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: qs.stringify(user)
    })
}
// *********************************角色管理结束******************

// *********************************用户管理***************************
// 管理员添加
export const reqUseradd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: 'post',
        data: qs.stringify(user)
    })
}
// 获取分页
export const reqUserlist = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: 'get',
        params: obj

    })
}
// 获取列表总数
export const reqUsercount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: 'get',
        params: {
        }
    })
}

//管理删除

export const reqUserdelete = (user) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 获取一条数据
export const reqUserinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: { uid: uid }
    })
}

// 修改数据

export const reqUseredit = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}
// *********************************用户管理End***************************
// *****************************商品分类start*******

// 商品分类获取添加
export const reqcateAdd = (user) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: 'post',
        data: dataToFromData(user)
    })
}

// 商品分类获取列表
export const reqCatelist = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}
// 商品分类删除

export const reqCatedelete = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 商品分类获取一条数据
export const reqCateinfo = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 商品分类修改数据
export const reqCateedit = (user) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: 'post',
        data: dataToFromData(user)
    })
}
// *************************************轮播图管理***********

//1.轮播图添加
export const reqBanneradd = (user) => {
    return axios({
        url: baseUrl + "/api/banneradd",
        method: "post",
        data: dataToFromData(user)
    })
}

// 轮播图列表请求
export const reqBannerlist = () => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
    })
}
// 轮播图删除
export const reqBannerdelete = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}

// 轮播图获取一条数据
export const reqBannerinfo = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

// 轮播图更新

export const reqBanneredit = (user) => {
    return axios({
        url: baseUrl + "/api/banneredit",
        method: 'post',
        data: dataToFromData(user)
    })
}

// **********************************************************会员管理*************************************
// 会员列表
export const reqMemberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist",
        method: 'get',
        params: {
        }
    })
}

// 会员获取（一条）
export const reqMemberinfo = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: 'get',
        params: {
            uid: uid
        }
    })
}
// 会员修改
export const reqMemberdit = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: 'post',
        data: qs.stringify(user)

    })
}
//*************************商品规格**************

// 1.商品规格添加** 
export const reqSpecsadd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: 'post',
        data: qs.stringify(user)
    })
}


// *2.商品规格总数（用于计算分页）

export const reqSpecscount = () => {
    return axios({
        url: baseUrl + "/api/specscount",
        method: 'get',
        params: {
        }
    })
}


// 3.商品规格列表（分页）** 

export const reqSpecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}

// 4.商品规格获取（一条）


export const reqSpecsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 5.商品规格修改

export const reqSpecsedit = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: 'post',
        data: qs.stringify(user)
    })
}
// 6.商品规格删除
export const reqSpecsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// ***********************商品管理*******
// 1.商品添加** 
export const reqGoodsadd = (user) => {
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: 'post',
        data: qs.stringify(user)
    })
}


// 2.商品总数（用于计算分页）

export const reqGoodscount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: 'get',
        params: {
        }
    })
}


//3.商品列表（分页）** 

export const reqGoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}

// 4.商品获取（一条）


export const reqGoodsinfo = (id) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 5.商品修改

export const reqGoodsedit = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: 'post',
        data: qs.stringify(user)
    })
}
//6.商品删除
export const reqGoodsdelete = (id) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}

