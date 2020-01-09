<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/gou.png" @click="okClick" />
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <el-row>
      <el-col :span="24"></el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog title :visible.sync="okDialogVisible" width="30%">
      <span class="purple">您是否确认修改？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leaveDialogVisible = false">取 消</el-button>
        <el-button class="purple" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";

export default {
  name: "home",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "",
      titleName: "",
      type: "",
      okDialogVisible: false
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.type = this.$route.query.type;
    console.log(this.type);
    if (this.type == "doctor") {
      this.title = "编辑我的基本信息";
    } else if (this.type == "patient") {
      this.title = "请您填写患者信息";
      this.titleName = "您好，";
    }
  },
  methods: {
    backClick() {
      this.okDialogVisible = true;
    },
    okClick() {},
    confirmClick() {
      this.okDialogVisible = false;
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal.query.type == "doctor") {
        this.title = "编辑我的基本信息";
        this.titleName = "";
      } else if (newVal.query.type == "patient") {
        this.title = "请您填写患者信息";
        this.titleName = "您好，";
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}
</style>

<style lang="scss">
</style>

