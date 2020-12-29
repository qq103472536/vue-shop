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
      <el-table-column prop="id" label="分类编号" sortable width="120"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="图片">
        <!-- 为什么scope？？？   scope 是表格的item  scope.row内存放数据 -->
        <template slot-scope="scope">
          <img v-if="scope.row.img!=='null'" :src="$pre+scope.row.img" alt />
        </template>
      </el-table-column>

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
import { reqCatedelete } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
export default {
  // // 接受menulist
  // props: ["list"],

  data() {
    return {};
    dialogVisible: false;
  },

  mounted() {
    this.reqList();
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    // vuex 获取列表
    ...mapActions({
      reqList: "cate/reqList",
    }),

    // 删除
    del(id) {
      // 删除弹窗
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqCatedelete(id).then((res) => {
            successalert(res.data.msg);
            console.log("_____________")
             this.reqList();
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

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>