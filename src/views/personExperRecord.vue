<template>
  <div class="main-content">
    <h1 v-show="exeDo">你还未做过实验</h1>
    <div v-show="!exeDo">
      <el-table
        :data="perExperList"
        stripe
        style="width: 100%;margin-top:28px;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column label="实验序号">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="experience_record_startexp"
          sortable
          label="开始时间"
        >
        </el-table-column>
        <el-table-column
          prop="experience_record_endexp"
          sortable
          label="结束时间"
        >
        </el-table-column>
        <el-table-column prop="experience_record_result" sortable label="总分">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="toScroeView(scope.row.experience_record_id)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      perExperList: [], //实验列表list
      exeDo: true, //提示消息
    };
  },
  methods: {
    toScroeView(val) {
      //   console.log(val);
      this.$router.push({
        path: "/ScoreView",
        name: "ScoreView",
        query: { ecid: val },
      });
    },
    // 查询个人的试验记录 /EXPERIENCES/USEROPERATE/getUserFinishExperienceList
    //post请求 实验experience_userid  experience_id
    getPerRecord(uid, eid) {
      this.axios
        .get(
          "/api/EXPERIENCES/USEROPERATE/getUserFinishExperienceList/" +
            uid +
            "/" +
            eid
        )
        .then((res) => {
          console.log(res);
          let ary = res.data.message;
          if (res.data.status == 0) {
            if (ary.length == 0) {
              this.$message.info("你没有做过实验！");
              this.exeDo = true;
            } else {
              this.perExperList = ary;
              this.exeDo = false;
            }
          } else {
            this.$message.error("未知错误！");
          }
        });
    },
  },
  created() {
    // console.log(this.$store.state.token.user_id);
    // console.log(this.$route.query.expeId);
    let uid = this.$store.state.token.user_id; //如果带参数是老师查看，不带是个人查看
    this.getPerRecord(uid, this.$route.query.expeId);
  },
  mounted() {},
};
</script>
<style scoped>
.el-col {
  margin-bottom: 6px;
}
</style>
