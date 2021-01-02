<template>
  <div>
    <el-dialog :title="info.isadd?'添加轮播图':'编辑轮播图'" :visible.sync="info.isshow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img v-if="imgUrl" class="img" :src="imgUrl" alt />
            <input v-if="info.isshow" type="file" class="ipt" @change="changeImg" />
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
import {
  reqBanneradd,
  reqBannerinfo,
  reqBanneredit,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        img: "",
        status: "",
      },
      imgUrl: "",
    };
  },
  methods: {
    //   js原生的文件上传
    changeImg(e) {
      let file = e.target.files[0];

      // 文件大小验证

      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //   let extname = file.name.slice(file.name.lastIndexOf("."));

      let extname = path.extname(file.name);

      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item == extname)) {
        erroralert("请上传图片");
        return;
      }

      // 判断文件类型
      if (name == arr) {
      }

      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
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
      this.user = {
        title: "",
        img: "",
        status: "",
      };
    },

    // 验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          erroralert("请输入标题");
          return;
        }
        if (this.user.img === "") {
          erroralert("请上传图片");
          return;
        }
        resolve();
      });
    },

    // 点击添加
    add() {
      this.checkProps().then(() => {
        reqBanneradd(this.user).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);

            //   清除数据
            this.cancel();
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    // 点了编辑
    getOne(id) {
  
      reqBannerinfo(id).then((res) => {
        this.user = res.data.list;
        //补id
        this.user.id = id;
        //处理图片
        this.imgUrl = this.$pre + this.user.img;
      });
    },
    // 修改数据
    uppdata() {
         
      this.checkProps().then(() => {
        reqBanneredit(this.user).then((res) => {
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
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}

.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}

.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>