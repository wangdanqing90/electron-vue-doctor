// 调节组件
<template>
  <div class="adjust-container">
    <div class="top">
      <img />
      <div>{{item.title}}</div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "AdjustContiner",
  props: {
    type: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      config: {}
    };
  },

  created() {
    if (this.type == "follow") {
      //跟随模式
      this.comfig = {
        imgsrc: require("@/../images/followmode_1.png"),
        imgsrc: require("@/../images/followmode_2.png")
      };
    }
  },
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
  //   .purpleFontColor {
  //     color: $purpleFontColor;
  //   }

  //   .pinkFontColor {
  //     color: $pinkFontColor;
  //   }

  //   .greenFontColor {
  //     color: $greenFontColor;
  //   }

  //   .yellowFontColor {
  //     color: $yellowFontColor;
  //   }
  .top {
    font-size: 20px;
    img {
      width: 80px;
    }
  }
}
</style>
          
          
         