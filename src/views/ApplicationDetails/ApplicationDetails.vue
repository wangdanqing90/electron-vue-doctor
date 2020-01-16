<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <div class="inform-container"></div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";

export default {
  name: "ApplicationDetails",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      vm: "",
      leftImg: ""
    };
  },
  created() {
    this.vm = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的申请详情";
    this.titleName = "刘邦";
  },
  methods: {
    okClick() {
      this.$confirm("您是否确认信息？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          this.okNextClick();
        })
        .catch(() => {});
    },
    backClick() {
      this.$router.go(-1);
    }
  },

  watch: {}
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
