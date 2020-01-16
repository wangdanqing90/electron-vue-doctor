// 调节组件
<template>
  <el-row>
    <el-col :span="24" class="adjust">
      <div class>
        <img class="adjustLeft" src="@/../images/add_1.png" />
        <img class="adjustMiddle" src="@/../images/blue_5.png" />
        <img class="adjustRight" src="@/../images/add_1.png" />
      </div>
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
.adjust {
  .adjustLeft .adjustRight {
    width: 50px;
  }
  .adjustMiddle {
    width: 150px;
  }
}
</style>
