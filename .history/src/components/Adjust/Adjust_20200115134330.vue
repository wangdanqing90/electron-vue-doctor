// 调节组件
<template>
  <div class="adjust">
    <img class="adjustLeft" src="@/../images/add_1.png" />
    <img class="adjustMiddle" src="@/../images/blue_5.png" />
    <img class="adjustRight" src="@/../images/add_1.png" />
    <div class="inform">
      <span>减重:</span>15kg
    </div>
  </div>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    adjusts: {
      type: Array,
      default: []
    }
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
  position: relative;
  padding: 20px 0;
  .adjustLeft,
  .adjustRight {
    width: 20px;
  }
  .adjustMiddle {
    width: 100px;
    margin: 0 10px;
  }
  .inform {
    font-size: 12px;
    position: absolute;
    top: 10px;
    left: 54px;
    span {
      color: black;
    }
  }
}
</style>
