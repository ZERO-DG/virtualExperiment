<template>
  <div class="main-content">
    <div v-show="searchRes" class="error_notfind">
      <div style="font-size:30px;margin-left:70px;">
        <i slot="prefix" class="el-icon-error"></i>未搜索到内容...
      </div>
      <el-image :src="abonmalImg"></el-image>
    </div>

    <el-row :gutter="12">
      <div v-show="!searchRes" class="header_font">| 搜索结果</div>
      <el-col :span="6" :key="idx" v-for="(itm, idx) in experList">
        <div @click="toCourse(itm.experience_id)">
          <el-card shadow="hover" class="card" body-style="padding:0px">
            <div class="img_border">
              <img :src="itm.experience_piclink" class="image" />
            </div>
            <h3 class="text_over">{{ itm.experience_name }}</h3>
            <p class="text_over" style="color:gray;">
              {{ itm.experience_collegeName }}
            </p>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      experList: [],
      searchRes: false,
      abonmalImg: require("../assets/abnormal.png"),
    };
  },
  mounted() {
    // console.log(this.$route.query.searchContent);
    this.searchExper(this.$route.query.searchContent);
  },
  methods: {
    //跳转课程详情页
    toCourse(experId) {
      // console.log(experId);
      this.$router.push({
        name: "CourseDetails",
        query: { experId: experId },
      });
    },
    //查找实验
    searchExper(val) {
      this.axios
        .get("/api/EXPERIENCES/USEROPERATE/GetExperienceMohu/" + val)
        .then((res) => {
          console.log(res, res.data.message.length);
          //搜索结果展示
          this.experList = res.data.message;
          if (res.data.message.length == 0) {
            this.searchRes = true;
          } else {
            this.searchRes = false;
          }
          //   console.log("???" + this.searchRes);
        });
    },
  },
  computed: {
    searchContent() {
      //   console.log(this.$route.query.searchContent);
      return this.$route.query.searchContent;
    },
  },
  watch: {
    searchContent(curVal) {
      //   console.log(curVal);
      this.searchExper(curVal);
    },
  },
};
</script>

<style scoped>
.error_notfind {
  position: absolute;
  width: 400px;
  height: 200px;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* background-color: blue; */
}
</style>
