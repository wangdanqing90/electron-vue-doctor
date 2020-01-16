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
  },

  methods: {
    selectClick() {
      if (!this.disable) return;
      this.$emit("selectRightClick", this.type);
    },
    resetData() {}
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
          
          
         