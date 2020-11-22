<template>
  <div
    v-loading="loading"
    element-loading-text="文档生成中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="main-content">
      <iframe
        :src="pdfUrl"
        style="width: 100%; height: 600px; border: none; margin: 10px"
      ></iframe>
      <el-button
        style="margin:10px auto;display:block;"
        type="primary"
        @click="upReport"
      >
        上传到ilab平台
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
    };
  },
  created() {
    this.getReportPdf(this.$route.query.recordId);
  },
  mounted() {},
  methods: {
    //上传到ilab，信息实验记录id、实验id、用户id
    upReport() {
      let data = {
        experience_record_id: this.$route.query.recordId,
        experience_record_virtualexperiment: this.$route.query.experId,
        experience_record_userid: this.$store.state.token.user_id,
      };
      this.axios
        .post("/api/REPORT/USEROPERATE/BackResult", data)
        .then((res) => {
          console.log(res);
        });
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
