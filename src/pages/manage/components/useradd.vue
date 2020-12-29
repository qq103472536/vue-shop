<template>
  <div>
    <el-dialog :title="info.isadd?'用户添加':'用户修改'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
          <span>留空则不修改</span>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd==true">添 加</el-button>
        <el-button type="primary" @click="edit" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successalert } from "../../../utils/alert";
import {
  reqUseradd,
  reqRolelist,
  reqUserinfo,
  reqUseredit,
} from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      roleList: [],
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    // 获取角色数据
    reqRolelist().then((res) => {
      this.roleList = res.data.list;
    });
  },
  methods: {
    //   添加管理员
    add() {
      reqUseradd(this.user).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          successalert(res.data.msg);
          //   关闭弹窗
          this.cancel();

          //5.清空user
          this.empty();

          this.$emit("init");
        } else {
          successalert(res.data.msg);
        }
      });
    },
    // 清除弹窗内容
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    // 关闭弹窗
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    getOne(uid) {
      reqUserinfo(uid).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //密码置空
          this.user.password = "";
        }
      });
    },
    // 数据更新
    edit() {
      reqUseredit(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          // 清除数据
          this.cancel();
          //数据清空
          this.empty();

          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>