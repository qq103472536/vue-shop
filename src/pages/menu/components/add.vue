<template>
  <div>
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option :value="0" label="顶级菜单"></el-option>
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <template>
            <el-radio v-model="user.type" :label="1" disabled>目录</el-radio>
            <el-radio v-model="user.type" :label="2" disabled>菜单</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="菜单图标" label-width="100px" v-if="user.type==1">
          <el-select v-model="user.icon" label-width="100px">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url" label-width="100px">
            <el-option
              v-for="i in indexRoutes"
              :key="i.path"
              :value="'/'+i.path"
              :label="i.name+'/'+i.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>



<script>
import { indexRoutes } from "../../../router/index";
import { reqMenuAdd, reqMenuInfo, reqMenuUpdata } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  // 2.menu传的添加
  props: ["info", "list"],

  data() {
    return {
      // 初始化user 表单填入
      user: {
        pid: 0,
        title: "",
        type: 1,
        url: "",
        status: 1,
        icon: "",
      },
      //   自定义icon图
      icons: [
        "el-icon-message-solid",
        "el-icon-setting",
        "el-icon-camera-solid",
        "el-icon-s-platform",
      ],
      //   全局二级路径 菜单地址
      indexRoutes,
    };
  },
  methods: {
    // 编辑的时候清除数据    //   关闭弹窗
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    add() {
      console.log(this.user);
      // 添加完成发axios请求
      reqMenuAdd(this.user).then((res) => {
        //   弹窗添加成功
        successalert(res.data.msg);
        // 清除内容
        this.empty();
        // 关闭弹窗
        this.cancel();
        // 绑定自定义事件
        this.$emit("init");
      });
    },
    // 清除弹窗内容
    empty() {
      this.user = {
        pid: 0,
        title: "",
        type: 1,
        url: "",
        status: 1,
        icon: "",
      };
    },
    // change事件  目录改变
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    // 获取一条数据
    getOne(id) {
      reqMenuInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    // 数据更新
    updata() {
      reqMenuUpdata(this.user).then((res) => {
        // 提示弹窗
        successalert(res.data.msg);
        // 清除弹窗
        this.cancel();
        // 清空数据
        this.empty();
        // 刷新页面
        this.$emit("init");
      });
    },
  },
};
</script>

<style>
</style>