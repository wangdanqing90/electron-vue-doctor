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
            <el-form :model="formLabelAlign">
              <div v-if="step == 1">
                <el-form-item label="所属医院：" label-width="100px">
                  <el-select v-model="value" placeholder="请选择医院">
                    <el-option
                      v-for="item in hospitalsList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属科室：" label-width="100px">
                  <el-select v-model="value" placeholder="请选择科室">
                    <el-option
                      v-for="item in departmentsList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工号：" label-width="100px">
                  <el-input placeholder="请输入工号" v-model="formLabelAlign.verificationCode"></el-input>
                </el-form-item>
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="姓名：" label-width="100px">
                  <el-input placeholder="请输入姓名" v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" label-width="100px">
                  <el-input placeholder="请输入手机号" v-model="formLabelAlign.phone"></el-input>
                  <el-link :underline="false" v-show="verShow" @click="handleClick()">发送验证码</el-link>
                  <el-link :underline="false" v-show="!verShow">
                    <span>{{timer}}</span>秒后重新获取
                  </el-link>
                </el-form-item>
                <el-form-item label="验证码：" label-width="100px">
                  <el-input placeholder="请输入验证码" v-model="formLabelAlign.verificationCode"></el-input>
                </el-form-item>
                <el-form-item label="密码：" label-width="100px">
                  <el-input placeholder="请输入密码" v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px">
                  <el-input placeholder="请确认密码" v-model="formLabelAlign.confirmPassword"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="margin-top-50">
                <el-button class="purple" @click="nextClick()">{{buttonTxt}}</el-button>
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
  name: "register",
  components: {
    Header
  },

  data() {
    return {
      title: "医生注册信息填写",
      buttonTxt: "",
      leftImg: "",
      step: "",
      verShow: true,
      timer: 60,
      formLabelAlign: {
        name: "",
        phone: "",
        verificationCode: "",
        password: "",
        confirmPassword: ""
      },
      hospitalsList: [
        {
          value: "医院1",
          label: "医院1"
        },
        {
          value: "医院2",
          label: "医院2"
        },
        {
          value: "医院3",
          label: "医院3"
        },
        {
          value: "医院4",
          label: "医院4"
        },
        {
          value: "医院5",
          label: "医院5"
        }
      ],
      departmentsList: [
        {
          value: "科室1",
          label: "科室1"
        },
        {
          value: "科室2",
          label: "科室2"
        },
        {
          value: "科室3",
          label: "科室3"
        },
        {
          value: "科室4",
          label: "科室4"
        },
        {
          value: "科室5",
          label: "科室5"
        }
      ]
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
      var auth_timer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.verShow = true;
          clearInterval(auth_timer);
        }
      }, 1000);
    },
    nextClick() {
      if (this.step == 1) {
        this.step = 2;
      } else {
        if (false) {
          this.$router.push({
            path: "/result",
            name: "result",
            query: { type: "success", message: "注册成功！" }
          });
        } else {
          this.$router.push({
            path: "/result",
            name: "result",
            query: { type: "fail", message: "注册失败！", failReason: "xxxxx" }
          });
        }
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
      if (newVal == 1) {
        this.title = "医生注册信息填写";
        this.buttonTxt = "下一步";
      } else if (newVal == 2) {
        this.title = "医生注册详细信息填写";
        this.buttonTxt = "确认";
      }
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
    .el-input,
    .el-select {
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
