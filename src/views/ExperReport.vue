<!--
 * @Author: your name
 * @Date: 2020-12-20 08:24:14
 * @LastEditTime: 2020-12-22 19:00:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \virtualExperiment\src\views\ExperReport.vue
-->
<template>
  <div
    v-loading="loading"
    element-loading-text="文档生成中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="main-content">
      <h2>{{ experName }}</h2>
      <iframe
        :src="pdfUrl"
        style="width: 100%; height: 600px; border: none; margin: 10px"
      ></iframe>
      <el-button
        style="margin:10px auto;display:block;"
        type="primary"
        @click="upReport"
      >
        {{upState? '返回实验主页面':'上传成绩和报告到ilab-x平台'}}
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pdfUrl: "", //pdfURL
      loading: true, //等待加载文档
      upState: false, //上传按钮只能传一次，避免重复
      experName: "", //实验名字
    };
  },
  created() {
    this.getReportPdf(this.$route.query.recordId);
  },
  mounted() {
    this.experName = this.$route.query.experName;
  },
  methods: {
    //上传到ilab，信息实验记录id、实验id、用户id
    upReport() {
      if (this.upState)
      {
        this.$router.push({
                name: "CourseDetails",
                query: { experId: this.$route.query.experId },
              });
      }
      else
      {
        let data = {
          experience_record_id: this.$route.query.recordId,
          experience_record_virtualexperiment: this.$route.query.experId,
          experience_record_userid: this.$store.state.token.user_id,
        };
        this.axios
          .post("/api/REPORT/USEROPERATE/BackResult", data)
          .then((res) => {
            console.log(res);
            if (res.data.status == 0) {
              if (res.data.message == "true") {
                this.upState = true;
                this.$message.success("上传到ilab-x成功！");
              } else if (res.data.message == "false") {
                this.$message.error("上传ilab-x失败！");
              } else {
                this.$message.error(`上传有误，错误：${res}`);
              }
            } else {
              this.$message.error(`其他错误，错误代码：${res.status}`);
            }
          });
      }
    },
    getReportPdf(val) {
      this.axios
        .get("/api/EXPERIENCES/USEROPERATE/ExperienceFinished/" + val)
        .then((res) => {
          console.log(res);
          this.pdfUrl = res.data.message;
          //延时显示，加载文档
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    },
  },
};
</script>
<style scoped></style>
