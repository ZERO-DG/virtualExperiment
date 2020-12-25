<template>
  <div class="main-content">
    <h2>{{experName}}</h2>
    <iframe
      id="childFrame"
      frameborder="0"
      width="1200"
      height="650"
      class="expIframe"
      allowfullscreen="true"
      :src="webLabUrl"
      style="border: 1px solid gray"
    ></iframe>
    <el-button
      v-show="experOverBtn"
      style="margin:10px auto;display:block;"
      type="primary"
      @click="generateExperimentReport"
    >
      生成实验报告
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      webLabUrl: "", //webGL实验url地址
      eid: "", //发给webGL的实验记录id
      experOverBtn: false, //实验结束后置位true，可以生成报告跳转查看报告
      experName: "", //实验名字
    };
  },
  created() {
    // console.log(window.atob(this.$route.query.lab));
    // this.webLabUrl = window.atob(this.$route.query.lab);
    // console.log(this.$store.state.token.user_id);
    //开始实验
    this.getExperRcord(
      this.$store.state.token.user_id, //用户id
      this.$route.query.experience //实验id
    );

    // 获取ip统计做实验的人数及其所在地
    this.getUserIP(this.$route.query.experId);
  },
  mounted() {
    this.experName = this.$route.query.experName;
    //获取到iframe子窗口对象
    let childNode = document.getElementById("childFrame").contentWindow;
    //监听子窗口的请求
    window.addEventListener("message", (event) => {
      //箭头上下文，
      if (event.data === "getUserInfo") {
        let data = {
          eid: this.eid,
          username: this.$store.state.token.user_ilabId,
          usernickname: this.$store.state.token.user_name,
        };
        childNode.postMessage(data, "*");
      }
      //实验结束
      if (event.data === "ExpermentOver") {
        //显示按钮
        this.experOverBtn = true;
        //消息提示
        // this.$alert(
        //   "<font style='color:red;'>点击下方按钮生成实验报告！</font>",
        //   "实验结束",
        //   {
        //     confirmButtonText: "确定",
        //     dangerouslyUseHTMLString: true,
        //   }
        // );
      }
    });
  },
  methods: {
    //说
    generateExperimentReport() {
      /* console.log("生成实验报告，跳转到查看页面并选择是否上传；");
      console.log(this.eid); */

      this.$router.push({
        path: "/ExperReport",
        name: "ExperReport",
        query: {
           recordId: this.eid,
           experName: this.$route.query.experName,
           experId: this.$route.query.experience
           },
      });
    },
    //获取开始实验，告知后端开始实验，返回一条开始实验的id，变为同步请求
    getExperRcord(userId, expId) {
      this.axios
        .get(
          "/api/EXPERIENCES/USEROPERATE/StartExperienceTwo/" +
            userId +
            "/" +
            expId
        )
        .then((res) => {
          if (res.data.status == 0) {
            this.eid = res.data.message;
            console.log(this.eid);
            //修改访问路径，显示webGl
            this.webLabUrl = window.atob(this.$route.query.lab);
          }
        });
    },
    //根据实验id记录访问者的ip地址以及解析返回
    getUserIP(val) {
      this.axios
        .get("/api/EXPERIENCES/IpAddress?experience_id=" + val)
        .then((res) => {
          let str = "";
          if (res.data.message.area !== undefined) {
            str = res.data.message.ip + "——" + res.data.message.area;
          } else {
            str = res.data.message;
          }
          console.log(
            "%c" +
              [
              ].join("\n") +
              "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n%c  您的访问地址为：%c" +
              str,
            "color:rgba(255,215,0,1);",
            "color:green;",
            "color:blue;font-weight:bold;"
          );
        });
    },
  },
};
</script>
