<template>
  <div>
    <el-dialog :specsname="info.isadd?'添加规格':'编辑规格'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
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
import { reqSpecsadd, reqSpecsinfo, reqSpecsedit } from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import path, { resolve } from "path";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  methods: {
    ...mapActions({
      reqlist: "specs/reqSpecslist",
      reqTotal: "specs/reqSpecscount",
    }),

    //新增属性
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    //删除属性
    delAttr(index) {
      this.attrsArr.splice(index, 1);
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
        specsname: "",
        attrs: "[]",
        status: 1,
      }),
        (this.attrsArr = [{ value: "" }]);
    },
    // 验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.specsname === "") {
          erroralert("内容不能为空");
          return;
        }
        if (this.attrsArr.some((item) => item.value === "")) {
          erroralert("规格不能为空");
        }
        return;
        resolve();
      });
    },

    // 点击添加
    add() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqSpecsadd(this.user).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            //   清除数据

            this.cancel();
            this.empty();
            // 刷新页面
            this.reqlist();
            this.reqTotal();
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    // 点了编辑
    getOne(id) {
      reqSpecsinfo(id).then((res) => {
        this.user = res.data.list[0];
        this.user.attrs = JSON.parse(this.user.attrs); //['红色','绿色','黄色']

        this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
      });
    },
    // 修改数据
    uppdata() {
      this.checkProps().then(() => {
        this.user.attrs = JSON.stringify(
          this.attrsArr.map((item) => item.value)
        );
        reqSpecsedit(this.user).then((res) => {
          if ((res.data.code = 200)) {
            successalert(res.data.msg);
            // 清空数据 弹窗关闭
            this.cancel();
            //数据清空
            this.empty();
            // 刷新页面
            this.reqlist();
            this.reqTotal();
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