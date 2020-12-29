// 引入vue
import Vue from 'vue'
// 引入app出口文件
import App from './App'
// 引入路由
import router from './router'
// 引入重置css
import  "./assests/css/reset.css"
// 引入状态管理层
import store from "./store"
// 引入过滤器
import "./filters/index"
// 引入公共组件
import "./components/index"
// 引入element ul
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
