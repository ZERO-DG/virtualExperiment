<template>
  <div>
    <!-- <div class="home_bg"></div> -->
    <el-carousel class="horse_race" height="50vh">
      <el-carousel-item v-for="item in imgSrc" :key="item">
        <el-image :src="item" style="width:100%;height:120%;top:-10vh;">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="main-content">
      <div class="header_font">| 实验列表</div>
      <el-row :gutter="16">
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      imgSrc: [
        require("../assets/p1.jpg"),
        require("../assets/p2.jpg"),
        require("../assets/p3.jpg"),
        require("../assets/p4.jpg"),
        // require("../assets/p5.jpg"),
        require("../assets/p6.jpg"),
        require("../assets/p7.jpg"),
        require("../assets/p8.jpg"),
      ], //侧边图
      experList: [], //实验列表集合{ experience_name: "", experience_collegeName: "" }
    };
  },
  components: {},
  mounted() {
    //异步获取到全局函数的后台接口地址
    this.getList(1);
  },
  methods: {
    //获得页数的列表信息
    getList(page) {
      // console.log(this.apiUrl);
      this.axios
        .get("/api/EXPERIENCES/GetExperienceList/" + page)
        .then((res) => {
          this.experList = res.data.message;
        });
    },
    //跳转课程详情页
    toCourse(experId) {
      // console.log(experId);
      this.$router.push({
        name: "CourseDetails",
        query: { experId: experId },
      });
    },
  },
};
</script>

<style>
.img_border {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
  transition: transform 1s;
}

.image:hover {
  transform: scale(1.2, 1.2);
}

.card {
  margin: 16px 0;
  height: 310px;
  /* background-image: radial-gradient(
    circle,
    rgba(255, 0, 0, 1),
    rgba(255, 165, 0, 0.9),
    rgba(255, 255, 0, 0.8),
    rgba(0, 255, 0, 0.7),
    rgba(0, 127, 255, 0.6),
    rgba(0, 0, 255, 0.5),
    rgba(139, 0, 255, 0.4)
  ); */
}

.card:hover {
  color: #409eff;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.horse_race {
  /* width: 1400px;
  min-width: 1200px; */
  width: 80%;
  margin: 0px auto 10px;
}

.text_over {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 5px 20px 0 20px;
  padding: 0;
}

.header_font {
  font-size: 20px;
  font-weight: 600;
  margin: 2rem 0;
}

.home_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../public/homeBg.jpg") no-repeat center;
  z-index: -1;
}
</style>
