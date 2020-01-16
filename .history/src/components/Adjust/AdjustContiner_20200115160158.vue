// 调节组件
<template>
  <div class="adjust-container" :class="disable?'':config.fontColor">
    <div class="top" @click="selectClick()">
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
    console.log(this.type + "   " + this.disable);
    this.initData();
  },

  methods: {
    selectClick() {
      if (!this.disable) return;
      this.$emit("selectRightClick", this.type);
      resetData();
    },
    resetData() {
      this.adjusts.forEach((item, key) => {
        this.$set(item.total, 0);
      });
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
      }
    }
  }
};
</script>

<style scoped lang="scss">
.adjust-container {
  width: 210px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    img {
      width: 80px;
    }
  }
}
</style>
          
          
         