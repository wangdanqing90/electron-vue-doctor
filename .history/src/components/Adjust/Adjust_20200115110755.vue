// 调节组件
<template>
  <div class="adjust">
    <img class="adjustLeft" src="@/../images/add_1.png" />
    <img class="adjustMiddle" src="@/../images/blue_5.png" />
    <img class="adjustRight" src="@/../images/add_1.png" />
  </div>
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
  width: 100px;
  .adjustLeft,
  .adjustRight {
    width: 50px;
  }
  .adjustMiddle {
    width: 150px;
  }
}
</style>
