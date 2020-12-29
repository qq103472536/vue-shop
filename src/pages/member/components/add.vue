<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow=false">取 消</el-button>
        <el-button type="primary" @click="uppdata">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqMemberinfo, reqMemberdit } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      },
    };
  },
  methods: {
    // 编辑清空数据
    cancel() {
      this.empty();
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.user = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: "",
      };
    },
    // 点了编辑
    getOne(id) {
      reqMemberinfo(id).then((res) => {
        console.log(res);
        this.user = res.data.list;
        this.user.password = "";
        // //补id
        // this.user.id = id;
      });
    },
    // 修改数据
    uppdata() {
      reqMemberdit(this.user).then((res) => {
        if ((res.data.code = 200)) {
          successalert(res.data.msg);
          // 清空数据 弹窗关闭
          this.cancel();
          //数据清空
          this.empty();
          //   刷新页面
          this.$emit("init");
        } else {
          successalert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style>
</style>