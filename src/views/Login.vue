<template>
  <div class="main-content">
    <el-container style="margin-top: 100px">
      <el-aside width="350px">
        <!-- <el-card>
          <el-image :src="imgSrc" class="aside-img">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-card> -->
      </el-aside>
      <el-main>
        <el-tabs v-model="activeName" class="main_login">
          <el-tab-pane label="用户登录" name="first">
            <el-form
              :model="loginRuleForm"
              :rules="loginRules"
              ref="loginRuleForm"
              status-icon
              label-width="66px"
              @keyup.enter.native="login"
            >
              <el-form-item label="用户名" prop="phone">
                <el-input
                  v-model.trim="loginRuleForm.phone"
                  placeholder="请输入手机号"
                >
                  <i slot="prefix" class="el-icon-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model.trim="loginRuleForm.password"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                >
                  <i slot="prefix" class="el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <el-button @click="login" type="primary" style="width: 100%">
                登录
              </el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <el-form
              :model="registerForm"
              :rules="registerRules"
              ref="registerForm"
              status-icon
              label-width="70px"
              class="demo-ruleForm"
              @keyup.enter.native="regInfo ? null : register"
            >
              <el-form-item label="昵称" prop="user_nickname">
                <el-input
                  v-model="registerForm.user_nickname"
                  placeholder="请输入昵称"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="user_name">
                <el-input
                  v-model="registerForm.user_name"
                  placeholder="请输入真实姓名"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="user_phone">
                <el-input
                  v-model="registerForm.user_phone"
                  placeholder="请输入手机号"
                >
                  <i slot="prefix" class="el-icon-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="user_password">
                <el-input
                  type="password"
                  v-model.trim="registerForm.user_password"
                  autocomplete="off"
                  show-password
                  placeholder="请输入密码"
                >
                  <i slot="prefix" class="el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <!-- 用户的身份？？ -->
              <!-- <el-form-item label="用户身份" prop="user_identity">
                <el-input
                  type="email"
                  v-model="registerForm.user_identity"
                  placeholder="？？？？"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item> -->
              <el-form-item label="性别">
                <el-radio-group
                  v-model="registerForm.user_gender"
                  size="medium"
                >
                  <el-radio border label="0">男</el-radio>
                  <el-radio border label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="邮箱" prop="user_email">
                <el-input
                  type="email"
                  v-model="registerForm.user_email"
                  placeholder="请输入邮箱"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item prop="verifyCode">
                <el-row :gutter="18">
                  <el-col :span="12">
                    <el-input
                      placeholder="请输入邮箱验证码"
                      v-model="registerForm.verifyCode"
                    >
                      <i slot="prefix" class="el-icon-tickets"></i>
                    </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-button
                      type="primary"
                      plain
                      @click="sendCode"
                      :disabled="disabled"
                      >{{ btnText }}</el-button
                    >
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-button
                  @click="register"
                  type="primary"
                  style="width: 48%"
                  :disabled="regInfo"
                >
                  注册
                </el-button>
                <el-button
                  @click="resetForm('registerForm')"
                  style="width: 48%"
                >
                  重置
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside width="350px"> </el-aside>
    </el-container>
  </div>
</template>
<script>
import Qs from "qs";
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
      imgSrc: require("../assets/login-aside.jpg"), //侧边图
      regInfo: true, //获取验证码后才能注册
      activeName: "first", //注册容器和登录容器切换标识
      stepActive: 0, //注册步骤
      disabled: false,
      btnText: "发送验证码",
      time: 60,
      loginRuleForm: {
        phone: "", //17340790971
        password: "", //000000
      },
      registerForm: {
        user_nickname: "", //昵称
        user_name: "", //真实姓名
        user_phone: "",
        user_password: "",
        user_gender: "0",
        user_email: "",
        verifyCode: "",
      },
      loginRules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "密码在6-15个字符之间",
            trigger: "blur",
          },
        ],
      },
      registerRules: {
        user_nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "昵称在1-20个字符之间" },
        ],
        user_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 1, max: 10, message: "姓名在1-10个字符之间" },
        ],
        user_phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: ["blur", "change"],
          },
        ],
        user_password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "密码在6-15个字符之间" },
        ],
        user_email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        verifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    //让导航栏消失
    this.$store.dispatch("CheckLoginBar", false);
  },
  mounted() {
    if (this.$route.query.redirect !== undefined) {
      this.$message.info("请先登录");
    }
  },
  beforeDestroy() {
    //离开登录注册页，显示导航栏
    this.$store.dispatch("CheckLoginBar", true);
  },
  methods: {
    login() {
      this.$refs.loginRuleForm.validate((valid) => {
        // console.log(this.loginRuleForm),valid;
        if (valid) {
          this.axios({
            headers: {
              deviceCode: "A95ZEF1-47B5-AC90BF3",
            },
            method: "post",
            url: "/api/USER/LoginByPhone",
            data: Qs.stringify(this.loginRuleForm),
            withCredentials: false, //不携带cookie
          }).then((res) => {
            console.log(res);
            // console.log(res.config.data, res.data);
            if (res.data.status == 0) {
              this.$message({
                type: "success",
                message: "登录成功",
              });
              //拿到返回的token和username，并存到store
              let token = res.data.message; //data.token
              if (token.user_gender == "male") {
                token.user_gender = "0";
              } else {
                token.user_gender = "1";
              }
              let username = res.data.message.user_name; //data.username
              this.$store.dispatch("UserLogin", token);
              this.$store.dispatch("UserName", username);

              //登录成功跳转到之前打开的页面或者进入首页
              let nextUrl =
                this.$route.query.redirect == undefined
                  ? "/"
                  : this.$route.query.redirect;
              this.$router.push(nextUrl);
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("输入有误，请重新输入！");
        }
      });
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.axios.post("/api/USER/Regist", this.registerForm).then((res) => {
            console.log(res);
            if (res.data.status == 0) {
              //注册成功
              this.$message.success("注册成功，请登录！");
              //注册成功切换至登录，清空注册表单
              this.activeName = "first";
              this.$refs["registerForm"].resetFields();
              //注册只能点一次，重置验证码的发送
              this.regInfo = true;
              this.time = 1;
            } else {
              //注册失败返回，状态status为1
              this.$message.error(res.data.message);
              this.regInfo = true;
            }
          });
        } else {
          this.$message.error("请检查表单输入是否有误！");
        }
      });
    },
    sendCode() {
      this.$message.info("已发送...");
      //1.邮箱必须正确，不正确则提示
      this.$refs.registerForm.validateField("user_email", (errorMessage) => {
        if (errorMessage) {
          this.$message.error(errorMessage);
        } else {
          //发送验证码
          this.axios
            .get(
              "/api/USER/getVerifyCode?mailLocation=" +
                this.registerForm.user_email,
              { withCredentials: false }
            )
            .then((res) => {
              //验证码发送结果回传控制台演示
              // console.log(res);
              if (res.data.status == 1) {
                //提示消息
                this.$message.error(res.data.message);
                this.regInfo = true;
              } else {
                this.$message.success("发送成功！");
                //验证码发送成功，可以注册
                this.regInfo = false;
                //1.时间开始倒数
                //2.按钮进入禁用状态
                //3.如果倒计时结束 按钮恢复可用状态 按钮文字变成重新发送
                //4.倒计时的过程中 按钮文字为 多少s后重新发送
                let timer = setInterval(() => {
                  this.time--;
                  this.btnText = `${this.time}s后重新发送`;
                  this.disabled = true;
                  if (this.time === 0) {
                    this.disabled = false;
                    this.btnText = "重新发送";
                    this.time = 60;
                    clearInterval(timer);
                  }
                }, 1000);
              }
            });
        }
      });
    },
    //注册表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.main_login {
  background: white;
  padding: 20px;
  border-radius: 6px;
  /* margin-top: 100px; */
  opacity: 0.6;
}

.main_login:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.aside-img {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 500px;
}
</style>
