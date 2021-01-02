<template>
  <div>
    <el-dialog :title="info.isadd?'角色添加':'角色编辑'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="list"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="obj"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow=false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" v-else @click="roleUppdata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqMenuList,
  reqRoleadd,
  reqRoleGetone,
  ReqRoleUpdata,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import { resolve } from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1, //状态1正常2禁用---
      },
      // 树形下拉框的数据
      list: [],
      obj: {
        children: "children",
        label: "title",
      },
      value: false,
    };
  },
  mounted() {
    // 请求页面数据
    this.init();
  },
  methods: {
    // 验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.rolename === "") {
          erroralert("请输入角色名称");
          return;
        }
        // 角色权限验证
        // if (this.user.menus.length === 0) {
        //   erroralert("请选择角色权限");
        //   return;
        // }
        resolve();
      });
    },

    //  添加角色
    add() {
      this.checkProps().then(() => {
        // 转化成后端要的数据
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        reqRoleadd(this.user).then((res) => {
          //   弹窗添加成功
          if (res.data.code == 200) {
            // 转化成后端要的数据
            this.$refs.tree.setCheckedKeys([]);
            // 弹框弹出
            successalert(res.data.msg);
            //  清除内容
            this.empty();
            // 弹框关闭
            this.info.isshow = false;

            // 刷新页面
            this.$emit("addtolelist");

            console.log(this.user);
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    // 清除弹窗内容
    empty() {
      this.user = {
        rolename: "",
        menus: [],
        status: 1,
      };
    },
    // 点击添加发送请求
    init() {
      reqMenuList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    // 获取一条数据
    getOne(id) {
      reqRoleGetone(id).then((res) => {
        if (res.data.code == 200) {
          let menus = JSON.parse(res.data.list.menus);
          this.$refs.tree.setCheckedKeys(menus);
          this.user = res.data.list;

          // 因为没有id，所以需要手动赋值
          this.user.id = id;
        }
      });
    },
    // 点击修改
    roleUppdata() {
      this.checkProps().then(() => {
        // 转化成后端要的数据
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        ReqRoleUpdata(this.user).then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.user = res.data.list;
            successalert(res.data.msg);
            // 清空数据
            this.cancel();
            // 关闭弹框
            this.info.isshow = false;
            // 刷新页面
            this.$emit("addtolelist");
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    cancel() {
      if (!this.info.isAdd) {
        // 如果是编辑，就清空数据
        // 让选中的菜单置空
        this.$refs.tree.setCheckedKeys([]);
        this.empty();
      }
      this.info.isshow = false;
    },
  },
};
</script>

<style>
</style>