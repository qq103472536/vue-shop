<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-list :info="info" :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add" @init="init"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqBannerlist } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: false,
      },
      list: [],
    };
  },
  methods: {
    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 获取列表
    init() {
      reqBannerlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    // 点击编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
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