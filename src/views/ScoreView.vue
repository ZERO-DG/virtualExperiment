<template>
  <div class="main-content">
    <el-page-header class="title" @back="goBack" v-bind:content="userName == null ? experName:userName + '-' + experName">
    </el-page-header>
    <!-- <h1>{{ experName }}</h1> -->
    <!-- <h1 v-show="expeCom">没有完成实验，无法获取成绩单！</h1> -->
    <div v-show="!expeCom">
      <h2>
        实验总成绩：<font style="color:red;">{{ experScore }} </font>分
      </h2>
      <el-table
        :data="topicList"
        stripe
        style="width: 100%;margin-top:28px;"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          prop="topic_title"
          width="350"
          label="实验题目"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="submit_time" sortable label="提交时间">
          <template slot-scope="scope">
            {{ timestampToTime(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column prop="topic_answer" label="正确答案">
        </el-table-column>
        <el-table-column prop="topic_score" label="题目分数"> </el-table-column>
        <el-table-column prop="topic_user_answer" label="你的答案">
          <template slot-scope="scope">
            <div v-if="scope.row.topic_answer === scope.row.topic_user_answer">
              <font style="color:green;">{{
                scope.row.topic_user_answer
              }}</font>
            </div>
            <div v-else>
              <font style="color:red;">{{ scope.row.topic_user_answer }}</font>
            </div>
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
      topicList: [], //步骤对象实体
      expeCom: true, //是否完成了实验，有步骤成绩
      experScore: "", //实验成绩
      experName: "", //实验名字
    };
  },
  created() {
    this.getStepScore(this.$route.query.ecid);
  },
  mounted() {
    this.experName = this.$route.query.experName;
  },
  methods: {
    // 时间戳转换成时间
    // 使用element table组件中的formatter属性，传入一个函数
    timestampToTime(row) {
      var date = new Date(row.submit_time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    // 查询成绩步骤分数 /EXPERIENCES/USEROPERATE/getRecordByRecordId/610812d9cb7b430a8689ed53f301b910
    getStepScore(val) {
      this.axios
        .get("/api/EXPERIENCES/USEROPERATE/getRecordByRecordId/" + val)
        .then((res) => {
          // console.log(res);
          let ary = res.data.message;
          if (res.data.status == 0) {
            if (ary.length == 0) {
              this.$message.error("没有完成实验或中途退出了实验！");
              this.expeCom = true;
            } else {
              this.experScore = ary[0].experience_record_result; //实验总分
              this.topicList = ary[0].steps;
              this.expeCom = false;
            }
          } else {
            this.$message.error("未知错误！");
          }
        });
    },
    //返回上一级
    goBack() {
      history.go(-1);
    },
  },
};
</script>
<style scoped></style>
