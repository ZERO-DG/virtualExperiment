<template>
  <div id="app">
    <!-- 个人注册页面背景 -->
    <div v-show="personBg" class="person_mask"></div>
    <div v-show="personBg" class="person_bg"></div>
    <!-- 登录背景 -->
    <div v-show="!login" class="login_bg"></div>
    <back-top>
      <div class="nav-bar">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          v-show="login"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <!-- <el-menu-item index="/CourseDetails">课程详情页</el-menu-item> -->
          <!-- <el-menu-item index="/About">关于</el-menu-item> -->
          <!-- 搜索框 -->
          <el-menu-item style="background: #545c64">
            <el-input
              placeholder="请输入内容"
              v-model.trim="searchInput"
              class="input-with-select"
              @keyup.enter.native="search(searchInput)"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search(searchInput)"
              ></el-button>
            </el-input>
          </el-menu-item>
          <!-- 登录 -->
          <!-- <el-menu-item
            index="/Login"
            v-show="!loginState"
            style="float: right; right: 2%"
          >
            登录/注册
          </el-menu-item> -->
          <!-- 登录后的显示 -->
          <el-menu-item
            v-show="loginState"
            style="float: right;background:#545c64;"
          >
            <el-button type="warning" @click="logout()">
              退出登录
            </el-button>
          </el-menu-item>

          <!-- <el-menu-item
            index="PerSomInform"
            v-show="loginState"
            style="float:right;"
          >
            {{ userName }}
          </el-menu-item> -->
          <el-menu-item v-show="loginState" style="float:right;">
            {{ userName }}
          </el-menu-item>
          <!-- <el-menu-item
            index="/CollectionCourses"
            v-show="loginState"
            style="float:right;"
          >
            收藏课程
          </el-menu-item> -->
        </el-menu>
      </div>

      <div>
        <router-view />
      </div>

      <!-- <el-footer >Footer</el-footer> -->
    </back-top>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "/",
      searchInput: "",
    };
  },
  methods: {
    logout() {
      //清除token，退出登录
      this.$store.dispatch("UserLogout");
      if (!this.$store.state.token) {
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "注销成功",
        });
        this.activeIndex = "/";
      } else {
        this.$message({
          type: "info",
          message: "注销失败",
        });
      }
    },
    search(val) {
      // console.log(this.searchInput);
      this.searchInput = "";
      if (val == "") {
        this.$message.error("请输入内容后搜索！");
        return;
      }
      this.$router.push({
        path: "/SearchPage",
        name: "SearchPage",
        query: { searchContent: val },
      });
    },
  },
  watch: {
    // loginState(curVal,oldVal){
    //   console.log(curVal,oldVal);
    //   this.isLogin = curVal;
    // }
  },
  computed: {
    loginState() {
      //获取改变后的值
      return this.$store.state.isLogin;
    },
    userName() {
      return this.$store.state.token ? this.$store.state.token.user_ilabId : "";
    },
    login() {
      return this.$store.state.loginBar;
    },
    personBg() {
      return this.$store.state.modiPersonBg;
    },
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
#app .main-content,
#app .el-menu-demo {
  width: 1210px;
  min-width: 980px;
  min-height: 100%;
  margin: auto;
}

.nav-bar {
  /* white */
  background: #545c64;
}

a {
  text-decoration: none;
}

.login_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../public/loginBg1.jpg") no-repeat center;
  background-size: 100% 100%;
  /* filter: blur(20px); */
  /*高斯模糊*/
  z-index: -1;
  /*置底层*/
  /* border: 6px solid red; */
}
</style>
