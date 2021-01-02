<template>
  <div class="login">
    <div class="con">
      <div class="center">
        <h2>登录</h2>
      </div>

      <div class="ipt">
        <el-input placeholder="请输入内容" v-model="user.username" clearable></el-input>
      </div>
      <div class="ipt">
        <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      </div>
      <el-row>
        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {reqLogin} from "../../utils/http"

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed:{
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    login() {
      reqLogin(this.user).then(res=>{
        if(res.data.code===200){
          // 登录成功
          this.changeUser(res.data.list)
            this.$router.push("/");
        }
      })
    
    },
  },
};
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553544, #433a52, #303d60);
}
.con {
  width: 400px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.ipt {
  margin: 10px;
}
.center {
  margin: 10px;
}
</style>