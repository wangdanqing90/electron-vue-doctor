<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <!-- <el-link :underline="false" @click="setClick">设置</el-link>
          <span class="vertaicl-line"></span>-->
          <el-link :underline="false" @click="aboutClick">关于我们</el-link>
        </div>
      </template>
    </Header>
    <Login />

    <!-- 弹窗 -->
    <el-dialog title="设置" :visible.sync="setDialogVisible" width="600px" center class="setDialog">
      <div class="setDialogBody">
        <div class="display_flex justify-content_flex-around align-items_center">
          <div>前超声波</div>
          <el-switch
            v-model="frontUltrasonic"
            active-color="#8ba0f1"
            inactive-color="#dcdcdc"
            :width="50"
          ></el-switch>
        </div>
        <div class="display_flex justify-content_flex-around align-items_center">
          <div>后超声波</div>
          <el-switch
            v-model="backUltrasonic"
            active-color="#8ba0f1"
            inactive-color="#dcdcdc"
            :width="50"
          ></el-switch>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="关于我们"
      :visible.sync="aboutDialogVisible"
      width="600px"
      center
      class="aboutDialog"
    >
      <div class="aboutDialogBody">
        <img src="../../../images/logo.png" />
        <div>版本信息：IREGO 2.2.1</div>
        <div>上海机器人产业研究院</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import Login from "@/components/Login/Login.vue";

export default {
  name: "login",
  components: {
    Header,
    Login
  },

  data() {
    return {
      leftImg: "",
      title: "医生管理平台",
      aboutDialogVisible: false,
      setDialogVisible: false,
      frontUltrasonic: false,
      backUltrasonic: false
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
  },
  methods: {
    aboutClick() {
      this.aboutDialogVisible = true;
    },
    setClick() {
      this.setDialogVisible = true;
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  .vertaicl-line {
    display: inline-block;
    width: 1px;
    height: 15px;
    background: #000;
  }
  .header-right-div {
    height: 100%;
    a {
      height: 30px;
      line-height: 30px;
      padding: 5px 10px;
      font-size: 14px;
      color: #101012;
      text-decoration: underline;
    }
  }
}
.aboutDialogBody {
  text-align: center;
  :nth-child(1) {
    width: 120px;
  }
  :nth-child(2) {
    margin-top: 20px;
    font-size: 20px;
  }
  :nth-child(3) {
    font-size: 12px;
    margin-top: 50px;
  }
}
</style>

<style lang="scss">
.aboutDialog,
.setDialog {
  .el-dialog__header {
    padding-top: 40px;
    .el-dialog__title {
      font-size: 25px;
    }
  }
}
.setDialog {
  .setDialogBody > div {
    width: 200px;
    margin: 20px auto;
    font-size: 20px;
  }
}
</style>

