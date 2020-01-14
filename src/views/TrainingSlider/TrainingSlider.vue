/* eslint-disable vue/no-unused-vars */
<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <vue-slider
      v-model="value"
      tooltip="none"
      :process="process"
      :min-range="0"
      :contained="true"
      :enable-cross="false"
      :height="100"
    >
      <template v-slot:process="{ start, end, style, index }">
        <div class="vue-slider-process" :style="style">
          <div
            :class="[
              'merge-tooltip',
              'vue-slider-dot-tooltip-inner',
              'vue-slider-dot-tooltip-inner-top'
            ]"
          >{{ value[index + 1]-value[index] }}%</div>
        </div>
      </template>
    </vue-slider>

    <el-row>
      <el-col :span="24" class="inform-container"></el-col>
    </el-row>
  </div>
</template>

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "trainingPlan",
  components: {
    HeaderDoctor,
    VueSlider
  },

  data() {
    return {
      leftImg: "",
      value: [0, 25, 50, 75, 100],
      process: val => [
        [val[0], val[1], { backgroundColor: "#8da1f2" }],
        [val[1], val[2], { backgroundColor: "#fd8dad" }],
        [val[2], val[3], { backgroundColor: "#fec85a" }],
        [val[3], val[4], { backgroundColor: "#a6e3dd" }]
      ]
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.title = "的本次训练计划（2019.7.16）";
    this.titleName = "患者刘邦";
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    }
  },
  watch: {}
};
</script>

<style  lang="scss">
.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}
.inform-container {
}

.merge-tooltip {
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, -15px);
}
.vue-slider-dot-handle {
  position: relative;
  top: 60px;
}
.vue-slider-process {
  border-radius: 0;
}
.vue-slider-process:nth-child(1) {
  border-radius: 15px 0 0 15px;
}
.vue-slider-process:nth-child(4) {
  border-radius: 0 15px 15px 0;
}
.custom-dot {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background-color: pink;
  transition: all 0.3s;
}
.custom-dot:hover {
  transform: rotateZ(45deg);
}
.custom-dot.focus {
  border-radius: 50%;
}
</style>
