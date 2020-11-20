<template>
  <div class="main-content">
    <iframe
      src=""
      style="width: 100%; height: 600px; border: none; margin: 10px"
    ></iframe>
    <el-button style="margin:10px auto;display:block;" type="primary">
      上传实验报告
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getReportPdf(this.$route.query.experId);
  },
  mounted() {},
  methods: {
    getReportPdf(val) {
      this.axios
        .get("/api/EXPERIENCES/USEROPERATE/ExperienceFinished/" + val)
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style scoped></style>
