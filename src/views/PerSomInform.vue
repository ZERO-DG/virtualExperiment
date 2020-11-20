<template>
  <div>
    <div class="main-content">
      <el-container>
        <el-aside width="350px"> </el-aside>
        <el-main style="boder:1px solid red">
          <el-card class="box-card">
            <el-form
              :model="modiForm"
              :rules="modiRules"
              ref="modiForm"
              status-icon
              label-width="80px"
              @keyup.enter.native="modiInfo"
            >
              <el-form-item label="用户账号" prop="user_account">
                <el-input
                  v-model.trim="modiForm.user_account"
                  placeholder="账号..."
                  disabled
                >
                  <i slot="prefix" class="el-icon-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="user_email">
                <el-input
                  type="email"
                  v-model="modiForm.user_email"
                  placeholder="请输入邮箱"
                  disabled
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="user_phone">
                <el-input
                  v-model.trim="modiForm.user_phone"
                  placeholder="请输入手机号"
                  disabled
                >
                  <i slot="prefix" class="el-icon-phone"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="user_nickname">
                <el-input
                  v-model="modiForm.user_nickname"
                  placeholder="请输入昵称"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="user_name">
                <el-input
                  v-model="modiForm.user_name"
                  placeholder="请输入真实姓名"
                >
                  <i slot="prefix" class="el-icon-user-solid"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="性别" prop="user_gender">
                <el-radio-group v-model="modiForm.user_gender" size="medium">
                  <el-radio border label="0">男</el-radio>
                  <el-radio border label="1">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="更新密码" prop="user_password">
                <el-input
                  type="password"
                  v-model.trim="modiForm.user_password"
                  autocomplete="off"
                  show-password
                  placeholder="请输入新的密码"
                >
                  <i slot="prefix" class="el-icon-lock"></i>
                </el-input>
              </el-form-item>
              <el-form-item label="选择省份" prop="user_province">
                <el-select
                  v-model="modiForm.user_province"
                  filterable
                  placeholder="请选择省份"
                >
                  <el-option
                    v-for="item in province_data"
                    :key="item.province_id"
                    :label="item.province_name"
                    :value="item.province_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所在学校" prop="user_school">
                <el-select
                  v-model="modiForm.user_school"
                  filterable
                  placeholder="请先选择省份"
                >
                  <el-option
                    v-for="item in school_data"
                    :key="item.school_id"
                    :label="item.school_name"
                    :value="item.school_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="学历水平" prop="user_school_education">
                <el-select
                  v-model="modiForm.user_school_education"
                  placeholder="请选择学历"
                >
                  <el-option
                    v-for="item in education_data"
                    :key="item[0]"
                    :label="item[1]"
                    :value="item[0]"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职业" prop="user_industry">
                <el-select
                  v-model="modiForm.user_industry"
                  filterable
                  placeholder="请选择职业"
                >
                  <el-option
                    v-for="item in position_data"
                    :key="item.industry_id"
                    :label="item.industry_name"
                    :value="item.industry_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生日" prop="user_birthday">
                <el-date-picker
                  v-model="modiForm.user_birthday"
                  type="date"
                  placeholder="选择生日"
                  :editable="false"
                >
                </el-date-picker>
              </el-form-item>
              <!-- user_intro -->
              <el-form-item label="自我介绍" prop="user_intro">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入内容...."
                  v-model="modiForm.user_intro"
                  resize="none"
                >
                </el-input>
              </el-form-item>
              <el-button @click="modiInfo" type="primary" style="width: 100%">
                修改
              </el-button>
              <!-- <el-button @click="resetForm('modiForm')" style="width: 48%">
                恢复
              </el-button> -->
            </el-form>
          </el-card>
        </el-main>
        <el-aside width="350px"> </el-aside>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      province_data: [], //省份列表数据
      school_data: [], //学校列表数据
      position_data: [], //职位列表
      education_data: [
        [0, "小学"],
        [1, "初中"],
        [2, "高中"],
        [3, "大专"],
        [4, "本科"],
        [5, "硕士"],
        [6, "博士"],
        [7, "其他"],
      ], //教育水平
      modiForm: {
        user_account: "",
        user_email: "",
        user_phone: "",
        user_nickname: "",
        user_name: "",
        user_gender: "0",
        user_password: "",
        user_province: "", //3
        user_school: "", //150
        user_school_education: "",
        user_industry: "",
        user_birthday: "",
        user_intro: "",
      },
      modiRules: {
        user_nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 1, max: 20, message: "昵称在1-20个字符之间" },
        ],
        user_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" },
          { min: 1, max: 10, message: "姓名在1-10个字符之间" },
        ],
        user_password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "密码在6-15个字符之间" },
        ],
        user_province: [
          { required: true, message: "省份不能为空", trigger: "change" },
        ],
        user_school: [
          { required: true, message: "学校不能为空", trigger: "change" },
        ],
        user_school_education: [
          { required: true, message: "学历不能为空", trigger: "change" },
        ],
        user_industry: [
          { required: true, message: "职业不能为空", trigger: "change" },
        ],
        user_birthday: [
          {
            type: "date",
            required: true,
            message: "生日不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  beforeCreate() {},
  beforeDestroy() {
    //离开抹去背景图层
    this.$store.dispatch("ModiPersonBg", false);
  },
  created() {
    //显示背景图层
    this.$store.dispatch("ModiPersonBg", true);
    //获取省份数据
    this.axios.get("/api/USER/GetProvince").then((res) => {
      // console.log(res);
      this.province_data = res.data.message;
    });
    //可以根据发来的省份获取
    this.getSchool(1);
    //获取职业
    this.axios.get("/api/USER/GetIndustries").then((res) => {
      // console.log(res);
      this.position_data = res.data.message;
    });
  },
  mounted() {
    //获取到token里面的所有用户信息,并显示
    // console.log(this.$store.state.token);
    this.modiForm = this.$store.state.token;
    this.modiForm.user_birthday =
      this.modiForm.user_birthday == null
        ? null
        : new Date(this.modiForm.user_birthday);
    this.modiForm.user_province = this.checkChange(this.modiForm.user_province);
    this.modiForm.user_school = this.checkChange(this.modiForm.user_school);
    this.modiForm.user_industry = this.checkChange(this.modiForm.user_industry);
  },
  methods: {
    //判断是否为空，不为空转换为数字
    checkChange(val) {
      return val == null ? null : val - 0;
    },
    //修改表单提交
    modiInfo() {
      this.$refs.modiForm.validate((valid) => {
        if (valid) {
          this.$message.info("修改中...");
          this.axios
            .post("/api/USER/USEROPERATE/UpdateUser", {
              user_phone: this.modiForm.user_phone, //根据手机号修改
              user_nickname: this.modiForm.user_nickname,
              user_name: this.modiForm.user_name,
              user_gender: this.modiForm.user_gender,
              user_password: this.modiForm.user_password,
              user_province: this.modiForm.user_province,
              user_school: this.modiForm.user_school,
              user_school_education: this.modiForm.user_school_education,
              user_industry: this.modiForm.user_industry,
              user_birthday: this.modiForm.user_birthday.getTime(),
              user_intro: this.modiForm.user_intro,
            })
            .then((res) => {
              if (res.data.status == 0) {
                this.$message.success("修改成功");
                //登录信息修改
                if (res.data.message.user_gender == "male") {
                  res.data.message.user_gender = "0";
                } else {
                  res.data.message.user_gender = "1";
                }
                this.$store.dispatch("UserLogin", res.data.message);
                this.$store.dispatch("UserName", res.data.message.user_name);
                //修改成功跳转至首页
                this.$router.push("/");
              } else {
                this.$message.error("修改失败，请联系管理员...");
              }
              // console.log(res.data);
            });
        } else {
          this.$message.error("表单填写有误！");
        }
      });
    },

    //获取学校
    getSchool(val) {
      this.axios.get("/api/USER/GetSchools?ProvinceId=" + val).then((res) => {
        // console.log(res);
        this.school_data = res.data.message;
      });
    },
  },
  watch: {
    //深度监听
    "modiForm.user_province": {
      deep: true,
      handler(curlVal, oldVul) {
        // console.log(curlVal, oldVul);
        if (curlVal != oldVul) {
          this.getSchool(curlVal);
        }
      },
    },
  },
};
</script>

<style>
.person_bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: url("../../public/modiPerson.jpg") no-repeat center;
  background-size: 100% 100%;
  z-index: -50;
  opacity: 0.7;
  filter: blur(1px);
}

.person_mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -49;
}
</style>
