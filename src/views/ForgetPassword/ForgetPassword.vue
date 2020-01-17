<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </Header>
    <el-row>
      <el-col :span="24" class="margin-top-50">
        <div class="form-container">
          <el-card class="box-card">
            <el-form :model="formLabelAlign" ref="formLabelAlign" status-icon :rules="rules">
              <div v-if="step == 1">
                <el-form-item label="手机号：" label-width="100px" prop="phone">
                  <el-input placeholder="请输入手机号" v-model="formLabelAlign.phone"></el-input>
                  <el-link :underline="false" v-show="verShow" @click="handleClick()">发送验证码</el-link>
                  <el-link :underline="false" v-show="!verShow">
                    <span>{{timer}}</span>秒后重新获取
                  </el-link>
                </el-form-item>
                <el-form-item label="验证码：" label-width="100px" prop="verificationCode">
                  <el-input placeholder="请输入验证码" v-model="formLabelAlign.verificationCode"></el-input>
                </el-form-item>
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="新密码：" label-width="100px" prop="newPassword">
                  <el-input placeholder="请输入新密码" v-model="formLabelAlign.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop="confirmPassword">
                  <el-input placeholder="请确认密码" v-model="formLabelAlign.confirmPassword"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="margin-top-70">
                <el-button class="purple" @click="nextClick()">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";

export default {
  name: "forgetPassword",
  components: {
    Header
  },

  data() {
    return {
      title: "用户密码重置",
      leftImg: "",
      step: "",
      timer: 60,
      verShow: true,
      auth_timer: "",
      formLabelAlign: {
        phone: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.step = this.$route.query.step;
    console.log("step == " + this.step);
  },
  methods: {
    //点击获取短信验证码
    handleClick() {
      this.verShow = false;
      this.timer = 60;
      clearInterval(this.auth_timer);
      this.auth_timer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.verShow = true;
          clearInterval(this.auth_timer);
        }
      }, 1000);
    },

    nextClick() {
      if (this.step == 1) {
        this.$refs["formLabelAlign"].validate(valid => {
          if (valid) {
            this.step = 2;
            this.verShow = true;
            clearInterval(this.auth_timer);
          }
        });
      } else {
        this.$refs["formLabelAlign"].validate(valid => {
          if (valid) {
            if (false) {
              this.$router.push({
                path: "/result",
                name: "result",
                query: { type: "success", message: "重设成功！" }
              });
            } else {
              this.$router.push({
                path: "/result",
                name: "result",
                query: {
                  type: "fail",
                  message: "重设失败！",
                  failReason: "xxxxx"
                }
              });
            }
          }
        });
      }
    },
    backClick() {
      if (this.step == 2) {
        this.step = 1;
      } else {
        this.$router.go(-1); //返回上一层
      }
    }
  },
  watch: {
    step(newVal, oldVal) {
      // if (newVal == 1) {
      //   this.title = "用户密码找回";
      // } else if (newVal == 2) {
      //   this.title = "用户密码重置";
      // }
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .header-middle {
  color: $purpleFontColor;
}

.header-right-div {
  img {
    width: 60px;
  }
}

.form-container {
  width: 800px;
  margin: 0 auto;
  .el-form {
    width: 432px;
    margin: 70px auto;
    .title {
      font-size: 18px;
    }
    .el-input {
      width: 230px;
      float: left;
    }
    .el-button {
      width: 230px;
    }
    .el-link {
      float: right;
      color: $purpleFontColor;
    }
  }
}
</style>
