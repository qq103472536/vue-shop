<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-list :info="info" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add"></v-add>
    <div class="block">
     
    </div>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { mapGetters, mapActions } from "vuex";
import { successalert } from "../../utils/alert";
export default {
  components: {
    vList,
    vAdd,
  },
  computed: {
    ...mapGetters({
      list: "specs/list",

    }),
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: false,
      },
    };
  },
  methods: {
    ...mapActions({
      reqlist: "specs/reqSpecslist",
      reqTotal:"specs/reqSpecscount"
    }),

    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },

    // 点击编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },

  mounted() {
    // 刷新页面
    this.reqlist();
    this.reqTotal();
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>