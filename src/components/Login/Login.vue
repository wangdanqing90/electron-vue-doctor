<template>
  <div>
    <!-- form表单 -->
    <el-row>
      <el-col :span="24">
        <div class="form-container">
          <el-card class="box-card">
            <el-form :model="formLabelAlign">
              <el-form-item>
                <div class="title">账号登录</div>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="账号" v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="密码" v-model="formLabelAlign.password" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="purple">登录</el-button>
              </el-form-item>
              <el-form-item>
                <div
                  class="header-right-div display_flex justify-content_flex-center align-items_center"
                >
                  <el-link :underline="false" @click="jumpForgetPassword">忘记密码</el-link>
                  <span class="vertaicl-line"></span>
                  <el-link :underline="false" @click="jumpRegister">用户注册</el-link>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
export default {
  name: "Login",
  components: {},
  props: {},

  data() {
    return {
      formLabelAlign: {
        name: "",
        password: ""
      }
    };
  },
  beforeCreate() {},
  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    //跳转忘记密码
    jumpForgetPassword() {
      this.$router.push({
        path: "/forgetPassword",
        name: "forgetPassword",
        query: { step: 1 }
      });
    },
    jumpRegister() {
      this.$router.push({
        path: "/register",
        name: "register",
        query: { step: 1 }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.form-container {
  width: 800px;
  height: 800px;
  margin: 30px auto 0 auto;
  .el-card,
  .el-message {
    border-radius: 10px;
  }
  .el-form {
    width: 300px;
    margin: 50px auto;
    .title {
      font-size: 18px;
    }
    .el-button {
      width: 100%;
    }
    .vertaicl-line {
      display: inline-block;
      width: 1px;
      height: 15px;
      background: #000;
    }
    a {
      height: 30px;
      line-height: 30px;
      padding: 5px 10px;
      font-size: 14px;
      color: #101012;
    }
  }
}
</style>


