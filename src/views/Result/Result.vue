<template>
  <div class="container">
    <Header :leftImg="leftImg"></Header>
    <el-row>
      <el-col :span="24" class="inform-container">
        <div v-if="type=='success'">
          <div class="informSuccess">{{message}}</div>
        </div>
        <div v-else-if="type=='fail'">
          <div class="informFail">{{message}}</div>
          <div class="failReason">原因：{{failReason}}</div>
        </div>

        <div class="timer">页面将在{{count}}秒后跳转回登录页面</div>
      </el-col>
      <el-col :span="24" class="margin-top-80 confirm-button">
        <el-button @click="backClick">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";

export default {
  name: "result",
  components: {
    Header
  },

  data() {
    return {
      leftImg: "",
      type: "",
      message: "",
      failReason: "",
      count: "",
      timer: null
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.type = this.$route.query.type;
    console.log("type == " + this.type);

    if (!this.common.isNullOrBlank(this.$route.query.message)) {
      this.message = this.$route.query.message;
    }
    if (!this.common.isNullOrBlank(this.$route.query.failReason)) {
      this.failReason = this.$route.query.failReason;
    }
    this.getCode();
  },
  methods: {
    getCode() {
      const TIME_COUNT = 10;
      if (!this.timer) {
        this.count = TIME_COUNT;

        this.timer = setInterval(() => {
          console.log(this.count);
          if (this.count > 1 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.backClick();
          }
        }, 1000);
      }
    },
    backClick() {
      clearInterval(this.timer);
      this.timer = null;

      this.$router.push({
        path: "/",
        name: "home"
      });
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.inform-container {
  margin: 100px auto 50px auto;
  .informSuccess {
    color: $purpleFontColor;
    font-size: 30px;
    padding: 20px;
  }
  .informFail {
    color: #fa8caa;
    font-size: 30px;
    padding: 20px;
  }
  .timer {
    font-size: 18px;
  }
  .failReason {
    font-size: 16px;
    color: #959595;
    padding-bottom: 20px;
  }
}

.confirm-button {
  .el-button {
    width: 230px;
  }
}
</style>
