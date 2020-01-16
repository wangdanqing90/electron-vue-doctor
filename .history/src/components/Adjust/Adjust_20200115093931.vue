//调节器组件
<template>
  <el-row>
    <el-col :span="24" class="header">
      <div class="top">
        <img :src="selectedImg" />
        <div>{{title}}</div>
      </div>

      <div class="bottom"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    selectedImg: {
      type: String,
      default: ""
    },
    unselectedImg: {
      type: String,
      default: ""
    },
    title: { String, default: "" },
    width: { Number, default: 210 }
  },

  data() {
    return {
      leftImg: require(this.selectedImg)
    };
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
