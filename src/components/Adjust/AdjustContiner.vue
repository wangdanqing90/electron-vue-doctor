// 调节组件
<template>
  <div class="adjust-container" :class="disable?'':config.fontColor">
    <div
      class="top"
      :class="(type==8||type==9||type==10||type==11)?'small':''"
      @click="selectClick()"
    >
      <img :src="disable==true?config.imgsrcGray:config.imgsrc" />
      <div>{{config.title}}</div>
    </div>

    <!-- 下面的加减按钮 -->
    <div class="bottom">
      <Adjust
        v-for="(item,index) in config.adjusts"
        :key="index"
        :disable="disable"
        :adjust="config.adjusts[index]"
        :fontColor="config.fontColor"
      ></Adjust>
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
    },
    disable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      config: {}
    };
  },

  created() {
    this.initData();
  },

  methods: {
    selectClick() {
      if (!this.disable) return;
      this.$emit("selectRightClick", this.type);
    },
    initData() {
      if (this.type === 1) {
        this.config = {
          title: "跟随模式",
          imgsrc: require("@/../images/followmode_1.png"),
          imgsrcGray: require("@/../images/followmode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            },
            {
              name: "定距",
              step: 70,
              total: 0,
              unit: "M"
            },
            {
              name: "速度",
              step: 20,
              total: 0,
              unit: "MM/s"
            }
          ]
        };
      } else if (this.type === 2) {
        this.config = {
          title: "主动模式",
          imgsrc: require("@/../images/activemode_1.png"),
          imgsrcGray: require("@/../images/activemode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            },
            {
              name: "阻力",
              step: 6,
              total: 0,
              unit: "N"
            },
            {
              name: "定距",
              step: 20,
              total: 0,
              unit: "M"
            }
          ]
        };
      } else if (this.type === 3) {
        this.config = {
          title: "阻力模式",
          imgsrc: require("@/../images/resistancemode_1.png"),
          imgsrcGray: require("@/../images/resistancemode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            },
            {
              name: "阻力",
              step: 6,
              total: 0,
              unit: "N"
            },
            {
              name: "定距",
              step: 20,
              total: 0,
              unit: "M"
            }
          ]
        };
      } else if (this.type === 4) {
        this.config = {
          title: "跟随模式",
          imgsrc: require("@/../images/followmode_0.png"),
          imgsrcGray: require("@/../images/followmode_2.png"),
          width: "120px",
          fontColor: "pinkFontColor",
          adjusts: [
            {
              name: "速度",
              step: 20,
              total: 0,
              unit: "MM/s"
            },
            {
              name: "计数",
              step: 1,
              total: 0,
              unit: "次"
            }
          ]
        };
      } else if (this.type === 5) {
        this.config = {
          title: "主动模式",
          imgsrc: require("@/../images/activemode_0.png"),
          imgsrcGray: require("@/../images/activemode_2.png"),
          width: "120px",
          fontColor: "pinkFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            },
            {
              name: "计数",
              step: 1,
              total: 0,
              unit: "次"
            }
          ]
        };
      } else if (this.type === 8) {
        this.config = {
          title: "左脚站立",
          imgsrc: require("@/../images/leftfoot_01.png"),
          imgsrcGray: require("@/../images/leftfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 9) {
        this.config = {
          title: "右脚站立",
          imgsrc: require("@/../images/rightfoot_01.png"),
          imgsrcGray: require("@/../images/rightfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 10) {
        this.config = {
          title: "双脚站立",
          imgsrc: require("@/../images/bothfoot_01.png"),
          imgsrcGray: require("@/../images/bothfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 11) {
        this.config = {
          title: "FRT模式",
          imgsrc: require("@/../images/frtmode_01.png"),
          imgsrcGray: require("@/../images/frtmode_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: 10,
              total: 0,
              unit: "KG"
            }
          ]
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
.adjust-container.large {
  width: 178px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    img {
      width: 80px;
    }
  }
}

//小控件样式
.adjust-container.small {
  width: 130px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
          
          
         