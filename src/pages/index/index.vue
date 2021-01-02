<template>
  <div>
    <el-container class="index">
      <el-aside width="220px">
        <!--   @open="handleOpen"
        @close="handleClose"-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in userInfo.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
                <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <h3>{{userInfo.username}}</h3>
          <button @click="loginout()">退出</button>
        </el-header>
        <!-- 面包屑导航 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  mounted() {},
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    loginout() {
      this.changeUser({});
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
.index {
  height: 100vh;
}
.el-header {
  background: #b3c0d1;
}
.el-aside {
  background: #20222a;
}
.el-aside ul li {
  width: 220px;
}
</style>