// 调节组件
const follow="follow"
<template>
  <div class="adjust-container">
    <div class="top">
      <img :src="config.imgsrc" />
      <div>{{config.title}}</div>
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
      this.config = {
        title: "跟随模式",
        imgsrc: require("@/../images/followmode_1.png"),
        imgsrcGray: require("@/../images/followmode_2.png"),
        width: "120px",
        fontColor: "purpleFontColor",
        adjusts: [
          {
            name: "减重",
            step: 1,
            unit: "KG"
          },
          {
            name: "定距",
            step: 10,
            unit: "M"
          },
          {
            name: "速度",
            step: 100,
            unit: "MM/s"
          }
        ]
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
          
          
         