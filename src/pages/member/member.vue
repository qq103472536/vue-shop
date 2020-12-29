<template>
  <div>
    <v-list :info="info" :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add" @init="init"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add"
import { reqMemberlist } from "../../utils/http";
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
      },
      list: [],
    };
  },
  methods: {
    // 获取列表
    init() {
      reqMemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    // 点击编辑
    edit(id) {
      this.info.isshow = true;
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