<template>
  <div class="from">
    <el-dialog
      :title="info.isadd?'添加商品':'编辑商品'"
      :visible.sync="info.isshow"
      @closed="cancel"
      @opened="opened"
    >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" placeholder="请选择活动区域">
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
          <el-select v-model="user.second_cateid" placeholder="请选择活动区域">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option label="" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
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
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsid" multiple>
            <el-option label="———请选择————" value disabled></el-option>
            <el-option :label="user.specsattr" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">备选项</el-radio>
          <el-radio v-model="user.isnew" :label="2">备选项</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">备选项</el-radio>
          <el-radio v-model="user.ishot" :label="2">备选项</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isshow"></div>
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
import E from "wangeditor";
import {
  reqcatelist,
  reqGoodsadd,
  reqGoodsinfo,
  reqGoodsedit,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import path from "path";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //3.1 分类的list
      cateList: "cate/list",
      //7.1 规格的list
      specsList: "specs/list",
    }),
  },
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        (this.imgUrl = "");
      // (this.attrsArr = [{ value: "" }]);
    },
    // 点击添加
    add() {
      //   this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqGoodsadd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          //   清除数据
          this.cancel();
          this.empty();
          this.$emit("init");
        } else {
          successalert(res.data.msg);
        }
      });
    },
    // 点了编辑
    getOne(id) {
      reqGoodsinfo(id).then((res) => {
        this.user = res.data.list[0];
        this.user.attrs = JSON.parse(this.user.attrs); //['红色','绿色','黄色']

        this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
      });
    },
    // 修改数据
    uppdata() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqGoodsedit(this.user).then((res) => {
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
    //创建富文本编辑器
    opened() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //赋值
      this.editor.txt.html(this.user.description);
    },
    // 上传图片
    changeImg2(file) {
      console.log(file);
      // 判断文件类型
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      const isJPG = arr;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        return this.$message.error("上传文件类型不正确");
      }
      if (!isLt2M) {
        return this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.imgUrl = URL.createObjectURL(file.raw);
    },
   
    // 处理2级分类

  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
  },
};
</script>

<style scoped lang="stylus">
.line {
  display: flex;
}

.line el-button {
  width: auto;
}

.line el-input {
  flex: 1;
}

.from>>>.avatar-uploader .el-upload {
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