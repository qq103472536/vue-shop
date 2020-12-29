<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 3.menu传info给add，控制add的隐藏， -->
    <!-- 绑定init -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqCatelist } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      // 1.初始化add，传送json对象是为了add和menu都可以修改json状态
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    //  2.点击添加，add显示
    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 获取列表
    init() {
      
      reqCatelist({ istree: true }).then((res) => {
        console.log("#########1##")
        if (res.data.code == 200) {
          console.log("######22#####")
          this.list = res.data.list;
console.log(this.list);
        }
      });
    },
    // 点击编辑
    edit(id) {
      // 弹窗弹出
      this.addTab();
      // 发送ajax请求
      this.$refs.add.getOne(id);
      this.info.isadd = false;
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>