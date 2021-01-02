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
          <el-select v-model="user.second_cateid">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
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
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="———请选择————" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="———请选择————" value disabled></el-option>
            <el-option v-for="item in specsattrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
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
  reqCatelist,
  reqGoodsadd,
  reqGoodsinfo,
  reqGoodsedit,
} from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
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
      // 图片
      imgUrl: "",
      // 二级分类的列表
      secondCateList: [],
      specsattrList: [],
    };
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqSpecslist",
      reqlist: "goods/reqList",
      reqtotal: "goods/reqtotal",
    }),

    // 上传图片
    changeImg2(e) {
      let file = e.raw;
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
        return this.$message.error("上传图片大小不能超过 2MB!");
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
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

    // 商品规格改变
    changeSpecsId() {
      //将之前的规格属性清空
      this.user.specsattr = [];

      //计算出规格属性展示的所有选项的列表
      this.getspecsattrList();
    },

    // 商品规格
    getspecsattrList() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid); //找到了，返回哪条数据，没找到，返回undefined
      this.specsattrList = obj ? obj.attrs : [];
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
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      }),
        (this.imgUrl = ""),
        (this.specsattrList = []),
        (this.secondCateList = []);
    },
    // 验证
    checkProps() {
      return new Promise((resolve) => {
        if (this.user.first_cateid === "") {
          erroralert("请选择分类");
          return;
        }
        if (this.user.second_cateid === "") {
          erroralert("请选择分类");
          return;
        }
        if (this.user.goodsname === "") {
          erroralert("请输入产品名称");
          return;
        }
        let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        if (this.user.price === "" && !priceReg.test(this.user.price)) {
          erroralert("请输入价格");
          return;
        }
        if (
          this.user.market_price === "" &&
          !priceReg.test(this.user.market_price)
        ) {
          erroralert("请输入价格");
          return;
        }
        if (!this.user.img) {
          erroralert("请上传商品图片");
          return;
        }
        if (this.user.img === "") {
          erroralert("请上传商品图片");
          return;
        }
        if (this.user.description === "") {
          erroralert("请输入商品描述");
          return;
        }
        if (this.user.specsid === "") {
          erroralert("请选择商品规格");
          return;
        }

        resolve();
      });
    },

    // 点击添加
    add() {
      this.checkProps().then(() => {
        //取出富文本编辑器的内容，赋值给user
        this.user.description = this.editor.txt.html();

        let data = {
          ...this.user,
          // 由于后端要的specsattr是数组字符串，前端需要是数组，所以要拷贝、处理一下，再发送；
          // 但是由于有对象（img）,所以不能使用JSON.parse(JSON.stringify())拷贝，需要使用...
          specsattr: JSON.stringify(this.user.specsattr),
        };

        //   this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
        reqGoodsadd(data).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            //   清除数据
            this.cancel();
            this.empty();
            // 刷新页面
            this.reqlist();
            this.reqtotal();
          } else {
            successalert(res.data.msg);
          }
        });
      });
    },
    // 点了编辑
    getOne(id) {
      reqGoodsinfo(id).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //  获取二级分类列表
          this.getreqCatelist();
          // 图片
          this.imgUrl = this.$pre + this.user.img;
          // 获取规格列表
          this.getspecsattrList();
          this.user.specsattr = JSON.parse(this.user.specsattr);
          this.user.id = id;

          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    // 修改数据
    uppdata() {
      this.checkProps().then(() => {
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqGoodsedit(this.user).then((res) => {
          if ((res.data.code = 200)) {
            successalert(res.data.msg);
            // 清空数据 弹窗关闭
            this.cancel();
            //数据清空
            this.empty();
            //   刷新页面
            this.reqlist();
            this.reqtotal();
          } else {
            successalert(res.data.msg);
          }
        });
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
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    this.reqSpecsList(true);

    console.log(this.specsList);
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