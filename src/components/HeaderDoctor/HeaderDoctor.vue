// 头部组件
<template>
  <el-row>
    <el-col :span="24" class="header">
      <div
        @click="jumpDoctorInform"
        class="header-left f-left display_flex justify-content_flex-center align-items_center"
      >
        <el-avatar
          :size="70"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <div
          class="display_flex flex-direction_column justify-content_flex-center align-items_center margin-left-10"
        >
          <div class="name">李某某</div>
          <div class="job">医生</div>
        </div>
      </div>
      <div class="header-middle-name f-left">{{titleName}}</div>
      <div class="header-middle f-left">{{title}}</div>

      <div class="header-right f-right">
        <slot name="right"></slot>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HeaderDoctor",
  props: {
    msg: String,
    leftImg: {
      type: String,
      default: "../../../images/logo.png"
    },
    title: { String, default: "" },
    titleName: { String, default: "" }
  },

  data() {
    return {};
  },

  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    jumpDoctorInform() {
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "doctor" }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 100px;
  line-height: 100px;
  .header-left {
    height: 100%;
    text-align: left;
    margin-right: 30px;
    img {
      width: 150px;
    }
    .name {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
    }
    .job {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #b0b3b9;
    }
  }
  .header-middle-name {
    font-size: 25px;

    color: $yellowFontColor;
  }
  .header-middle {
    font-size: 25px;

    color: $purpleFontColor;
  }
  .header-right {
    height: 100%;
  }
}

::v-deep .header-right-div {
  height: 100%;
}
</style>
