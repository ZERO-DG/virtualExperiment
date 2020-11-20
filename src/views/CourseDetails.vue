<template>
  <div class="main-content">
    <el-container>
      <el-tabs class="side-list" :tab-position="tabPosition">
        <el-tab-pane>
          <span slot="label"> <i class="el-icon-s-order"></i>申报书 </span>
          <iframe
            :src="obj.experience_notification"
            style="width: 1200px; height: 600px; border: none; margin: 10px"
          ></iframe>
        </el-tab-pane>
        <el-tab-pane label="简介视频">
          <span slot="label"> <i class="el-icon-video-play"></i>简介视频 </span>
          <video
            :src="obj.experience_intro_video"
            controls="controls"
            class="video_style "
          ></video>
        </el-tab-pane>
        <el-tab-pane label="引导视频">
          <span slot="label">
            <i class="el-icon-video-camera"></i>引导视频
          </span>
          <video
            :src="obj.experience_lead_video"
            controls="controls"
            class="video_style "
          ></video>
        </el-tab-pane>
        <el-tab-pane label="实验简介">
          <span slot="label"> <i class="el-icon-s-order"></i>实验简介 </span>
          <!-- 实验简介 experience_introduction -->
          <p v-html="obj.experience_introduction" style="margin-left: 10px"></p>
        </el-tab-pane>
        <el-tab-pane label="开始实验">
          <span slot="label"> <i class="el-icon-s-platform"></i>开始实验 </span>

          <el-button style="margin:50px;" primary @click="experimentalize()">
            点击开始实验
          </el-button>
        </el-tab-pane>
        <el-tab-pane label="实验要求">
          <span slot="label"> <i class="el-icon-s-claim"></i>实验要求 </span>
          <!-- experience_required  -->
          <el-link
            :href="obj.experience_required"
            type="primary"
            :underline="false"
            target="_blank"
            icon="el-icon-folder"
            style="margin: 10px;font-size:20px;"
          >
            下载实验要求
          </el-link>
        </el-tab-pane>
        <el-tab-pane label="操作手册">
          <span slot="label"> <i class="el-icon-reading"></i>操作手册 </span>
          <!-- {{ obj.experience_required }} -->
        </el-tab-pane>
        <el-tab-pane label="实验评价">
          <span slot="label"> <i class="el-icon-s-comment"></i>实验评价 </span>

          <div>
            <el-input
              type="textarea"
              :cols="150"
              :autosize="{ minRows: 4, maxRows: 6 }"
              resize="none"
              placeholder="请输入内容..."
              v-model="textarea"
              class="el_input"
            ></el-input>
            <el-button type="primary" @click="onSubmit">填写评价</el-button>
          </div>
          <div class="comment">
            <el-card shadow="hover">
              <el-divider content-position="left">用户信息 时间</el-divider>
              <p>yigeiwoligiaogiao</p>
              <hr />
              <p>(用户名)回复：？？？</p>
            </el-card>
            <el-card shadow="hover">
              <el-divider content-position="left">用户信息 时间</el-divider>
              <p>yigeiwoligiaogiao</p>
              &nbsp;&nbsp;
              <hr />
              <p>(用户名)回复：？？？</p>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="实验统计">
          <span slot="label" @click="toMap(obj.experStatisEntity)">
            <i class="el-icon-s-marketing"></i>实验统计
          </span>
        </el-tab-pane>
      </el-tabs>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {}, //整个实验对象
      tabPosition: "left",
      textarea: "", //输入框
    };
  },
  mounted() {
    // console.log(this.$route.query.experId);
    //接收一个课程id
    this.axios
      .get(
        "/api/EXPERIENCES/USEROPERATE/getExperienceById/" +
          this.$route.query.experId //这个是课程ID
      )
      .then((res) => {
        console.log(res);
        // console.log(res.data.message.experience_notification);
        this.obj = res.data.message;
      });
  },
  components: {},
  methods: {
    //地图页跳转
    toMap(val) {
      this.$router.push({
        path: "",
        name: "VistMap", // 要跳转的路径的 name,可在 router 文件夹下的 index.js 文件内找
        query: { mapData: val },
      });
    },
    //进入虚拟实验页面
    experimentalize() {
      this.$router.push({
        path: "",
        name: "Experiment",
        query: {
          experience: this.obj.experience_id,
          lab: window.btoa(this.obj.experience_lab),
        },
      });
    },
    //填写评价
    onSubmit() {
      this.axios
        .get("/api/EXPERIENCES/GetComment/e7f795f0850541e896d8a510e81d74cb")
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style scoped>
.main {
  min-height: 600px;
}

.video_style {
  height: 600px;
  margin: 10px auto 0;
  border: none;
  width: 100%;
}

.el_input {
  margin: 10px 0;
}

.comment .el-card {
  margin: 10px 0;
}

.side-list span {
  padding: 20px 0;
  font-size: 16px;
}
</style>
