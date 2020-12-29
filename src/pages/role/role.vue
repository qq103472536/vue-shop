<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-rolelist :list="list" @addtolelist="addtolelist" @edit="edit"></v-rolelist>
    <v-roleadd :info="info" @addtolelist="addtolelist" ref="roleadd"></v-roleadd>
  </div>
</template>

<script>
import vRolelist from "./compoents/rolelist";
import vRoleadd from "./compoents/roleadd";
import { reqRolelist } from "../../utils/http";
export default {
  components: {
    vRolelist,
    vRoleadd,
  },
  data() {
    return {
      info: { isshow: false, isadd: false },
      list: [],
    };
  },
  methods: {
    // 点击添加
    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 请求列表
    addtolelist() {
      reqRolelist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    // 点击编辑
    edit(id) {
      this.info.isshow = true;
      // 发送请求
      this.$refs.roleadd.getOne(id);
      this.info.isadd = false;
    },
  },
  mounted() {
    this.addtolelist();
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>