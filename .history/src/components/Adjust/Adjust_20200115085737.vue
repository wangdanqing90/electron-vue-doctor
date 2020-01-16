//调节器组件
<template>
  <el-row>
    <el-col :span="24" class="header">
      <div class="top">
        <img src="leftImg" />
      </div>

      <div class="bottom">{{title}}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    msg: String,
    leftImg: {
      type: String,
      default: "../../../images/logo.png"
    },
    title: { String, default: "" }
  },

  data() {
    return {};
  },

  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.header {
  height: 100px;
  line-height: 100px;
  .header-left {
    height: 100%;
    img {
      width: 150px;
    }
  }
  .header-middle {
    font-size: 25px;
    padding-left: 20px;
  }
  .header-right {
    height: 100%;
  }
}

::v-deep .header-right-div {
  height: 100%;
}
</style>
