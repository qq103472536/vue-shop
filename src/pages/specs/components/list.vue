<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>

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
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import { reqSpecsdelete } from "../../../utils/http";
import { mapGetters, mapActions } from "vuex";
import { successalert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      //一页的数量
      size: "specs/size",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqlist: "specs/reqSpecslist",
      reqTotal: "specs/reqSpecscount",
      changePage: "specs/changePage",
    }),
    //   点击删除
    del(id) {
      reqSpecsdelete(id).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          // 刷新页面
          this.reqlist();
          this.reqTotal();
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
  mounted(){
    console.log(this.size)
    console.log(this.total)//0

  }
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>