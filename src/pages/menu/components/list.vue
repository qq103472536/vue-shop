<template>
  <div>
    <!-- 遍历list -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="120"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <!-- 为什么scope？？？   scope 是表格的item  scope.row内存放数据 -->
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>

      <!-- 为什么scope？？？ -->
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
import { reqMenuDelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 接受menulist
  props: ["list"],
  data() {
    return {};
    list: list;
    dialogVisible: false;
  },
  methods: {
    // 删除
    del(id) {
      // 删除弹窗
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqMenuDelete(id).then((res) => {
            successalert(res.data.msg);
            this.$emit("init");
          });
        })
        .catch(() => {});
    },
    editList(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style>
</style>