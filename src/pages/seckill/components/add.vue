<template>
  <div>
    <el-dialog :specsname="info.isadd?'添加活动':'编辑活动'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </div>
        </el-form-item>
        {{user}}
        {{value1}}
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeList">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changegoods">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option
              v-for="item in goodsidList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow=false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="uppdata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqSeckadd,
  reqSeckinfo,
  reqSeckedit,
  reqCatelist,
  reqGoodslist,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import path from "path";
import { resolve } from "url";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "seckill/list",
      //3.1 分类的list
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      // 获取二级分类
      secondCateList: [],
      // 获取商品
      goodsidList: [],

      // 时间戳
      value1: "",
    };
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    if (this.goodsList.length === 0) {
      this.reqGoodslist();
    }
  },
  methods: {
    ...mapActions({
      reqlist: "seckill/reqList",
      reqCateList: "cate/reqList",
      reqGoodslist: "goods/reqList",
    }),
    // 处理2级分类
    changeList() {
      (this.user.second_cateid = ""), this.getreqCatelist();
    },
    // 获取二级分类
    getreqCatelist() {
      reqCatelist({ pid: this.user.first_cateid }).then((res) => {
        this.secondCateList = res.data.list;
      });
    },
    // 获取三级列表
    changegoods() {
      console.log("_______________");
      (this.user.goodsid = ""), this.getGoodList();
    },
    getGoodList() {
      reqGoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        this.goodsidList = res.data.list;
      });
    },
    // 编辑清空数据
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      (this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      }),
        (this.secondCateList = []);
      // 获取商品
      this.goodsidList = [];
      this.value1 = "";
    },

    // 验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          erroralert("请输入活动名称");
        }
        if (this.user.begintime === "") {
          erroralert("请输入活动开始时间");
        }
        if (this.user.endtime === "") {
          erroralert("请输入活动结束时间");
        }
        if (this.user.first_cateid === "") {
          erroralert("请选择产品类型");
        }
        if (this.user.second_cateid === "") {
          erroralert("请选择产品类型");
        }
        if (this.user.goodsid === "") {
          erroralert("请选择产品类型");
        }
      });
      resolve;
    },

    // 点击添加
    add() {
      this.checkProps().then(() => {
        this.user.begintime = this.value1[0];
        this.user.endtime = this.value1[1];
        console.log(this.user);
        reqSeckadd(this.user).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            //   清除数据

            this.cancel();
            this.empty();
            // 刷新页面
            this.reqlist();
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    // 点了编辑
    getOne(id) {
      reqSeckinfo(id).then((res) => {
        this.user = res.data.list;
        this.value1 = [this.user.begintime * 1, this.user.endtime * 1];
        // 获取二级分类
        console.log(this.value1);
        // 获取时间戳
        this.getreqCatelist();
        // 获取三级分类
        this.getGoodList();

        this.user.id = id;
      });
    },
    // 修改数据
    uppdata() {
      this.checkProps().then(() => {
        this.user.begintime = this.value1[0] * 1;
        this.user.endtime = this.value1[1] * 1;
        reqSeckedit(this.user).then((res) => {
          if ((res.data.code = 200)) {
            successalert(res.data.msg);
            // 清空数据 弹窗关闭
            this.cancel();
            //数据清空
            this.empty();
            // 刷新页面
            this.reqlist();
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
  },
};
</script>

<style scoped >
.line {
  display: flex;
}
.line el-button {
  width: auto;
}
.line el-input {
  flex: 1;
}
</style>