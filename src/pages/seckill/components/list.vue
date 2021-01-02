<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editList(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSeckdelete } from "../../../utils/http";
import { mapGetters, mapActions } from "vuex";
import { successalert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
     list: "seckill/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqlist: "seckill/reqList",
    }),
    //   点击删除
    del(id) {
      reqSeckdelete(id).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          // 刷新页面
          this.reqlist();
        } else {
          successalert(res.data.msg);
        }
      });
    },
    // 点击编辑
    editList(id) {
      this.$emit("edit", id);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>