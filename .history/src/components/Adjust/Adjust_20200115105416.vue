// 调节组件
<template>
  <el-row>
    <el-col :span="24" class="adjust">
      <div class="header-left f-left display_flex justify-content_flex-center align-items_center"></div>
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
</style>
