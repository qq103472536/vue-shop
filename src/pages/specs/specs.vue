<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-list :info="info" :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" ref="add" @init="init"></v-add>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqSpecslist, reqSpecscount } from "../../utils/http";
import { successalert } from "../../utils/alert";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: false,
      },
      list: [],
      pager: 1,
      total: 0,
      pageSize: 5,
    };
  },
  methods: {
    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 商品规格列表（分页）
    reqSpecslist() {
      reqSpecslist({ page: this.pager, size: this.pageSize }).then((res) => {
        if (res.data.list.length == 0 && this.pager > 1) {
          console.log(111);
          this.pager--;
          this.reqSpecslist();
          return;
        }

        this.list = res.data.list;
        this.list.forEach((item) => {
          item.attrs = JSON.parse(item.attrs);
        });
      });
    },
    // *2.商品规格总数（用于计算分页）
    reqSpecscount() {
      reqSpecscount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
    },
    // 获取列表
    init() {
      this.reqSpecscount();
      this.reqSpecslist();
    },
    // 点击编辑
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
    // 五.修改了页码
    currentPage(e) {
      this.pager = e;
      this.reqSpecslist();
    },
  },

  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>