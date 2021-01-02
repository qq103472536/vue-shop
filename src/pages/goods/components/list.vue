<template>
  <div>
    <el-table :data="list" border style="width: 100%">
    <el-table-column prop="id" label="商品编号" width="80"></el-table-column>
    <el-table-column prop="goodsname" label="商品名称" width="80"></el-table-column>
    <el-table-column prop="price" label="商品价格" width="80"></el-table-column>
    <el-table-column prop="market_price" label="市场价格" width="80"></el-table-column>
    <el-table-column prop="name" label="照片" width="80">
      <template slot-scope="scope">
        <img :src="$pre+scope.row.img" alt />
      </template>
    </el-table-column>
    <el-table-column prop="isnew" label="是否新品" width="80">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
        <el-button type="info" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="ishot" label="是否热卖" width="80">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
        <el-button type="info" v-else>否</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="操作">
      <template slot-scope="status">
        <el-button type="primary" @click="edit(status.row.id)">编辑</el-button>
        <el-button type="danger" @click="deluser(status.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="changePage"
      ></el-pagination>
  </div>
</template>

<script>
import { reqGoodsdelete } from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      //总数
      total: "goods/total",
      //一页的数量
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqlist: "goods/reqList",
      reqtotal: "goods/reqtotal",
      changePage:"specs/changePage"
    }),
    deluser(id) {
      reqGoodsdelete(id).then((res) => {
        if (res.data.code == 200) {
          this.reqlist();
          this.reqtotal();
        }
      });
    },
    edit(id) {
      this.$emit("edit",id)
    },
  },
  mounted() {
    this.reqlist();
    this.reqtotal();
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>