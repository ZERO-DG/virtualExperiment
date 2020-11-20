<template>
  <div class="main-content">
    <h1>token后台解析</h1>
    <el-form
      v-show="updateState"
      :model="userInfoAsync"
      :rules="phoneRlues"
      ref="userInfoAsync"
      status-icon
      label-width="66px"
      @keyup.enter.native="updateInfo"
    >
      <el-form-item label="手机号" prop="user_phone">
        <el-input
          v-model.trim="userInfoAsync.user_phone"
          placeholder="请输入手机号"
        >
          <i slot="prefix" class="el-icon-phone"></i>
        </el-input>
      </el-form-item>
      <el-button @click="updateInfo" type="primary" style="width: 100%">
        更新
      </el-button>
    </el-form>
  </div>
</template>
<script>
// import Qs from "qs";
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      userInfoAsync: { user_phone: "" }, //用户信息同步
      phoneRlues: {
        user_phone: [
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
      },
      updateState: false, //是否显示更新手机号框和按钮
    };
  },
  mounted() {
    // let router_path = this.$route.fullPath;
    // console.log(router_path, this.$route); // 输出当前页面的路由，如：/home
    this.sendToken(this.$route);
  },
  methods: {
    //token后台解析
    sendToken(val) {
      this.axios
        .get(
          "/api/DoExp/" +
            val.params.pathMatch +
            "?token=" +
            encodeURIComponent(val.query.token),
          { withCredentials: false }
        )
        .then((res) => {
          // console.log(res);
          // let token = res.data;
          // token = token.replace(/"\{/g, "{");
          // token = token.replace(/\}"/g, "}");
          // token = JSON.parse(token);

          console.log(res.data);

          if (res.data.status == 0) {
            this.$message.success("用户更新成功，欢迎访问");
            //登录信息修改
            if (res.data.message.user_gender == "male") {
              res.data.message.user_gender = "0";
            } else {
              res.data.message.user_gender = "1";
            }
            this.$store.dispatch("UserLogin", res.data.message);
            this.$store.dispatch("UserName", res.data.message.user_name);
            //跳转到首页
            this.$router.push("/");
          } else if (res.data.status == 1) {
            this.$message.info("请绑定手机号...");
            let user = res.data.message;
            if (user.user_name !== null) {
              this.userInfoAsync.user_name = user.user_name;
            }
            if (user.user_ilabId !== null) {
              this.userInfoAsync.user_ilabId = user.user_ilabId;
            }
            if (user.user_numberId !== null) {
              this.userInfoAsync.user_numberId = user.user_numberId;
            }
            this.updateState = true;
          } else if (res.data.status == 11) {
            this.$message.error("秘钥解析出错，请使用正确的秘钥");
          } else if (res.data.status == 3) {
            this.$message.error("用户更新失败！请登录！");
          } else {
            this.$message.error("异常情况，请联系管理员！");
          }
        });
    },
    //更新手机号
    updateInfo() {
      this.$refs.userInfoAsync.validate((valid) => {
        if (valid) {
          this.$message.info("提交更新...");
          this.synchronizeUsers();
        } else {
          this.$message.error("请输入正确的手机号!");
        }
      });
    },
    //同步用户信息
    synchronizeUsers() {
      console.log(this.userInfoAsync);

      this.axios
        .post("/api/USER/USEROPERATE/UpdateUserInfo", this.userInfoAsync)
        .then((res) => {
          //完成对接
          console.log(res);

          if (res.data.status == 0) {
            this.$message.success(
              "您是本地用户，已完成ilab对接更新了用户信息。"
            );
            //登录信息修改
            if (res.data.message.user_gender == "male") {
              res.data.message.user_gender = "0";
            } else {
              res.data.message.user_gender = "1";
            }
            this.$store.dispatch("UserLogin", res.data.message);
            this.$store.dispatch("UserName", res.data.message.user_name);
            //更新手机号的框消失
            this.updateState = false;
            //跳转到首页
            this.$router.push("/");
          } else if (res.data.status == 2) {
            this.$message.success("新建用户成功，默认密码6个0（000000）！");
            //登录信息修改
            if (res.data.message.user_gender == "male") {
              res.data.message.user_gender = "0";
            } else {
              res.data.message.user_gender = "1";
            }
            this.$store.dispatch("UserLogin", res.data.message);
            this.$store.dispatch("UserName", res.data.message.user_name);
            //更新手机号的框消失
            this.updateState = false;
            //跳转到首页
            this.$router.push("/");
          } else if (res.data.status == 3) {
            this.$message.error("用户更新失败，请联系管理员！");
          } else if (res.data.status == 4) {
            this.$message.error("插入新用户失败，请联系管理员！");
          } else if (res.data.status == 7) {
            this.$message.success(
              "更新成功，已存在ilabid，不存在手机号，默认密码6个0（000000）！"
            );
            //登录信息修改
            if (res.data.message.user_gender == "male") {
              res.data.message.user_gender = "0";
            } else {
              res.data.message.user_gender = "1";
            }
            this.$store.dispatch("UserLogin", res.data.message);
            this.$store.dispatch("UserName", res.data.message.user_name);
            //更新手机号的框消失
            this.updateState = false;
            //跳转到首页
            this.$router.push("/");
          } else {
            //没有部署完成前（2是无法触发的 所以是新建用户在这里出现可能）
            this.$message.error("未知错误！");
          }
        });
    },
  },
};
</script>
