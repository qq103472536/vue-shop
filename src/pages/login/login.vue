<template>
  <div class="login">
    <div class="con">
      <div class="center">
        <h2>登录</h2>
      </div>

      <div class="ipt">
        <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
      </div>
      <div class="ipt">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
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
export default {
  data() {
    return {
      input: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push("/");
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