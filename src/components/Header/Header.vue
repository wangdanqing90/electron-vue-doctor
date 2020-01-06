<template>
  <el-row>
    <el-col :span="24" class="header">
      <div class="header-left f-left">
        <img :src="leftImg" />
      </div>
      <div class="header-middle f-left">main</div>
      <div class="header-right f-right">main</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
    leftImg: String
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
  .header-left {
  }
  .header-middle {
  }
  .header-right {
  }
}
</style>
