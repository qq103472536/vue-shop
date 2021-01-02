<template>
  <div>
    <el-button type="primary" @click="addTab">添加</el-button>
    <v-list :info="info"  @edit="edit"></v-list>
    <v-add :info="info" ref="add"></v-add>
    
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqGoodslist, reqGoodscount } from "../../utils/http";
import { successalert } from "../../utils/alert";
import { mapGetters, mapActions } from "vuex";
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
      pager: 1,
      total: 0,
      size: 5,
      fid: "",
      sid: "",
    };
  },
  //
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  mounted() {
    //  发cata请求 请fid
    this.reqCateList();


  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
    }),
    getSecondId() {
      this.fid = reqCateList.data.list.id;
    },

    addTab() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    // 商品规格列表（分页）
    reqGoodslist() {
      reqGoodslist({ page: this.pager, size: this.size }).then((res) => {
        if (res.data.list.length == 0 && this.pager > 1) {
          console.log(111);
          this.pager--;
          this.reqGoodslist();
          return;
        }

        this.list = res.data.list;
        this.list.forEach((item) => {
          item.attrs = JSON.parse(item.attrs);
        });
      });
    },
    // *2.商品规格总数（用于计算分页）
    reqGoodscount() {
      reqGoodscount().then((res) => {
        if (res.data.code == 200) {
          this.total = res.data.list[0].total;
        }
      });
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
      this.reqGoodslist();
    },
  },
};
</script>

<style scoped>
.el-button {
  margin: 20px;
}
</style>