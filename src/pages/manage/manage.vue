<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-userlist :list="list" @init="init" @edit="edit($event)"></v-userlist>
    <v-useradd :info="info" ref="useradd" :list="list" @init="init"></v-useradd>
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
import vUserlist from "./components/userlist";
import vUseradd from "./components/useradd";
import { reqUserlist, reqUsercount } from "../../utils/http";
export default {
  components: {
    vUserlist,
    vUseradd,
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
    add() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 获取数据分页
    getList() {
      reqUserlist({ page: this.pager, size: this.pageSize }).then((res) => {
        if (res.data.code == 200) {
          /*
          如果删除了最后一页的最后一条，那么当前页就会取到空数组；
          这个时候如果有上一页的话，就应该取上一页
          */
          if (res.data.list.length == 0 && this.pager > 1) {
            this.pager--;
            this.getList();
            return;
          }

          this.list = res.data.list;
        }
      });
    },
    // 获取总数
    getTotal() {
      reqUsercount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    // 获取一条数据
    edit(uid) {
      this.info.isshow = true;

      // 编辑
      this.info.isadd = false;

      // 通知add渲染数据
      this.$refs.useradd.getOne(uid);
    },
    init() {
      //四、获取总数
      this.getTotal();

      //获取列表
      this.getList();
    },
    currentPage(e) {
      this.pager = e;
      this.getList();
    },
  },
  mounted() {
    // 获取数据
    this.init();
    //
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>