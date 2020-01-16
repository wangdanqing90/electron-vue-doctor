// 调节组件
<template>
  <div class="adjust-container">
    <div class="top">
      <img />
      <div>{{item.title}}</div>
    </div>
    <div class="bottom">
      <Adjust :class="item.colorClass"></Adjust>
      <Adjust :class="item.colorClass"></Adjust>
      <Adjust :class="item.colorClass"></Adjust>
    </div>
  </div>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    msg: String
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
.adjust-container {
  width: 210px;
  padding: 50px 20px;
  .purpleFontColor {
    color: $purpleFontColor;
  }

  .pinkFontColor {
    color: $pinkFontColor;
  }

  .greenFontColor {
    color: $greenFontColor;
  }

  .yellowFontColor {
    color: $yellowFontColor;
  }
  .top {
    font-size: 20px;
    img {
      width: 80px;
    }
  }
}
</style>
          
          
         