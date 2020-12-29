<template>
  <el-table :data="list" border style="width: 100%">
    <el-table-column prop="name" label="商品编号" width="80"></el-table-column>
    <el-table-column prop="name" label="商品名称" width="80"></el-table-column>
    <el-table-column prop="name" label="商品价格" width="80"></el-table-column>
    <el-table-column prop="name" label="市场价格" width="80"></el-table-column>
    <el-table-column prop="name" label="照片" width="80"></el-table-column>
    <el-table-column prop="name" label="是否新品" width="80"></el-table-column>
    <el-table-column prop="name" label="是否热卖" width="80"></el-table-column>
    <el-table-column prop="name" label="是否热卖" width="80"></el-table-column>
    <el-table-column prop="name" label="是否热卖" width="80"></el-table-column>
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
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "",
        },
      ],
    };
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>