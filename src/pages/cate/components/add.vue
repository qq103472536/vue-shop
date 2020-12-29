<template>
  <div class="from">
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>

            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <div>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-change="changeImg2"
            >
              <img v-if="imgUrl" :src="imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
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
import { reqcateAdd, reqCateedit, reqCateinfo } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import path from "path";
import { mapActions, mapGetters } from "vuex";
export default {
  // 2.menu传的添加

  // props: ["info", "list"],
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  data() {
    return {
      imgUrl: "",
      // 初始化user 表单填入
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      // 图片
    };
  },
  methods: {
    // 上传文件
    changeImg2(e) {
      let file = e.raw;
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      //   let extname=file.name.slice(file.name.lastIndexOf("."));
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
//添加
    add() {
      reqcateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          // 封装了成功弹框
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //5.清空user
          this.empty();
          //25.列表刷新
          // this.$emit("init");
          this.reqList()
        }
      });
    },
    // 编辑的时候清除数据    //   关闭弹窗
    cancel() {
      //45.编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //清空user
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    // 获取一条数据
    getOne(id) {
      reqCateinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    // 数据更新
    updata() {
      reqCateedit(this.user).then((res) => {
        // 提示弹窗
        successalert(res.data.msg);
        // 清除弹窗
        this.cancel();
        // 清空数据
        this.empty();
        // 刷新页面
        // this.$emit("init");
        this.reqList()
      });
    },
    // 状态层数据
    ...mapActions({
      reqList: "cate/reqList",
    }),
  },
};
</script>

<style scoped lang="stylus">
.from >>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>