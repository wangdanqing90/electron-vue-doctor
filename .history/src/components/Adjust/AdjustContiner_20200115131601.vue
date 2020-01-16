// 调节组件
<template>
  <div class="adjust-container">
    <div class="top">
      <img :src />
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
          
          
         