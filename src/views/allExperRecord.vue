<template>
  <div class="main-content">
    <h1>{{ experName }}</h1>
    <el-table
      :data="scoreList"
      stripe
      style="width: 100%;margin-top:28px;"
      :default-sort="{ prop: 'date', order: 'descending' }"
      empty-text="还未有人做过实验"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="uName" label="姓名"></el-table-column>
      <el-table-column prop="firstTime" sortable label="第一次实验开始时间">
        <template slot-scope="scope">
          {{ timestampToTime(scope.row.firstTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="lastTime" sortable label="上次实验开始时间">
        <template slot-scope="scope">
          {{ timestampToTime(scope.row.lastTime) }}
        </template>
      </el-table-column>
      <el-table-column prop="maxScore" sortable label="历史最高分">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toScroeView(scope.row)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      scoreList: [], //所有实验的记录
      experName: "", //实验名字
    };
  },
  created() {
    this.getAllScore(this.$route.query.expeId);
    this.experName = this.$route.query.experName;
  },
  mounted() {},
  methods: {
    //跳转到分数查看页面
    toScroeView(row) {
      this.$router.push({
        path: "/personExperRecord",
        name: "personExperRecord", // 要跳转的路径的 name,可在 router 文件夹下的 index.js 文件内找
        query: {
          expeId: this.$route.query.expeId,
          uid: row.uid,
          name: row.uName,
          experName: this.experName,
        },
      });
    },
    // 查询所有的试验记录 /EXPERIENCES/USEROPERATE/ExperienceDoneUserInfo/+exeid
    getAllScore(eid) {
      this.axios
        .get("/api/EXPERIENCES/USEROPERATE/ExperienceDoneUserInfo/" + eid)
        .then((res) => {
          // console.log(res);
          if (res.data.status == 0) {
            let ary = res.data.message;
            if (ary.length == 0) {
              this.$message.info("没有人做过实验！");
            } else {
              // console.log(ary);
              // 做个数据结构分组，计算最高分，最后一次实验时间，第一次实验时间
              let userInfo = {};
              ary.forEach((itm) => {
                let uid = itm.experience_record_userid;
                // let ecid = itm.experience_record_id;
                if (userInfo[uid] == undefined) {
                  userInfo[uid] = new Array();
                }
                userInfo[uid].push(itm);
              });

              for (let m in userInfo) {
                // console.log(userInfo[m]);
                let startTime = Number.MAX_SAFE_INTEGER;
                let endTime = Number.MIN_SAFE_INTEGER;
                let maxScore = Number.MIN_SAFE_INTEGER;
                let username = "";
                userInfo[m].forEach((itm) => {
                  let num = Number(itm.experience_record_startexp);
                  let score = Number(itm.experience_record_result);
                  startTime = Math.min(startTime, num);
                  endTime = Math.max(endTime, num);
                  maxScore = Math.max(maxScore, score);
                  username = itm.experience_record_username;
                });
                this.scoreList.push({
                  uid: m, //用户uid
                  firstTime: startTime, //最早实验的时间
                  lastTime: endTime, //最后一次实验的时间
                  uName: username, //用户名
                  maxScore: maxScore, //用户所有成绩中的最高成绩
                });
              }
              // console.log(this.scoreList);
            }
          } else {
            this.$message.error("未知错误");
          }
        });
    },
    //时间戳转换
    timestampToTime(time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
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
  },
};
</script>
<style scoped></style>
