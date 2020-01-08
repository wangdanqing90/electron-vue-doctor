<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center"></div>
      </template>
    </Header>
    <el-row>
      <el-col :span="24">
        <div class="form-container">
          <el-form :model="formLabelAlign">
            <el-form-item label="手机号" label-width="84px">
              <el-input placeholder="请输入手机号" v-model="formLabelAlign.name"></el-input>
              <el-link :underline="false">发送验证码</el-link>
            </el-form-item>
            <el-form-item label="验证码" label-width="84px">
              <el-input placeholder="请输入验证码" v-model="formLabelAlign.password" show-password></el-input>
            </el-form-item>
            <el-form-item class="margin-top-50">
              <el-button>下一步</el-button>
            </el-form-item>
          </el-form>
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
      title: "用户密码找回",
      leftImg: "",
      step: "",
      formLabelAlign: {
        name: "",
        password: ""
      }
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.step = this.$route.params.step;
  }
};
</script>

<style scoped lang="scss">
::v-deep .header-middle {
  color: $purpleFontColor;
}

.form-container {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  .el-form {
    width: 400px;
    margin: 50px auto;
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
