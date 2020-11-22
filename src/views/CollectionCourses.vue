<template>
  <div class="main-content">
    <el-row>
      <el-col :span="16" :offset="4">
        <div class="header_font">| 收藏列表</div>
      </el-col>
      <!-- 收藏的试验列表 -->
      <el-col :span="16" :offset="4" v-for="s in 4" :key="s">
        <el-card>
          <div v-for="o in 4" :key="o">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>

    <br />
    <br />
    这是课程收藏页面
    <el-button @click="exper">
      shiyan
    </el-button>

    <p
      v-html="experienceInfo.experience_record_reporttemplate"
      style="margin-left: 10px"
    ></p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {}, //用户信息
      experienceInfo: {},
    };
  },
  mounted() {
    // //转化用户信息
    // this.userInfo = this.$store.state.token;
    // this.userInfo.user_birthday =
    //   this.userInfo.user_birthday == null
    //     ? null
    //     : new Date(this.userInfo.user_birthday);
    // this.userInfo.user_province = this.checkChange(this.userInfo.user_province);
    // this.userInfo.user_school = this.checkChange(this.userInfo.user_school);
    // this.userInfo.user_industry = this.checkChange(this.userInfo.user_industry);
    // console.log(this.userInfo);
  },
  methods: {
    //判断是否为空，不为空转换为数字
    checkChange(val) {
      return val == null ? null : val - 0;
    },
    //实验开始
    exper() {
      this.axios
        .get(
          "/api/EXPERIENCES/USEROPERATE/ExperienceDoneUserInfo/" +
            "e7f795f0850541e896d8a510e81d7465"
        )
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped>
.el-col {
  margin-bottom: 16px;
}
</style>
