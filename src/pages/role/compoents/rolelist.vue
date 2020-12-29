<template>
  <div>
    <el-table
      :data="list"
      height="250"
      border
      style="width: 100%"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="角色编号" width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editRole(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="roledelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqRoledelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import roleVue from "../role.vue";
export default {
  props: ["list"],
  data() {
    return {
      user: [],
    };
  },
  mounted() {},
  methods: {
    // 删除
    roledelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqRoledelete(id).then((res) => {
            successalert(res.data.msg);
            this.$emit("addtolelist");
          });
        })
        .catch(() => {});
    },
    editRole(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>