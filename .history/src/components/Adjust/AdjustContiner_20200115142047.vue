// 调节组件
<template>
  <div class="adjust-container" :class="config.disable?'':config.fontColor">
    <div class="top">
      <img :src="config.disable? config.imgsrcGray:config.imgsrc" />
      <div>{{config.title}}</div>
    </div>

    <!-- 下面的加减按钮 -->
    <div class="bottom">
      <Adjust :disable="true" :adjust="config.adjusts[0]" :fontColor="config.fontColor"></Adjust>
      <Adjust :disable="false" :adjust="config.adjusts[0]" :fontColor="config.fontColor"></Adjust>
    </div>
  </div>
</template>

<script>
import Adjust from "@/components/Adjust/Adjust.vue";
export default {
  name: "AdjustContiner",
  components: {
    Adjust
  },
  props: {
    type: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      config: {}
    };
  },

  created() {
    if (this.type === 1) {
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
            total: 0,
            unit: "KG"
          },
          {
            name: "定距",
            step: 10,
            total: 0,
            unit: "M"
          },
          {
            name: "速度",
            step: 100,
            total: 0,
            unit: "MM/s"
          }
        ]
      };
    } else if (this.type === 2) {
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
            total: 0,
            unit: "KG"
          },
          {
            name: "定距",
            step: 10,
            total: 0,
            unit: "M"
          },
          {
            name: "速度",
            step: 100,
            total: 0,
            unit: "MM/s"
          }
        ]
      };
    } else if (this.type === 3) {
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
            total: 0,
            unit: "KG"
          },
          {
            name: "定距",
            step: 10,
            total: 0,
            unit: "M"
          },
          {
            name: "速度",
            step: 100,
            total: 0,
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
          
          
         