<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作">
        <template slot-scope="status">
          <el-button type="primary" @click="edit(status.row.uid)">编辑</el-button>
          <el-button type="danger" @click="deluser(status.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqUserdelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    // 删除
    deluser(uid) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqUserdelete({uid:uid}).then((res) => {
            successalert(res.data.msg);
            this.$emit("init");
          });
        })
        .catch(() => {});
    },
    edit(uid) {
    //   告诉父元素点击了编辑
      this.$emit("edit",uid)
    },
  },
};
</script>

<style>
</style>