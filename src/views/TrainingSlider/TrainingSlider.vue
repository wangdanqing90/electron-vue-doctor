/* eslint-disable vue/no-unused-vars */
<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/certain.png" @click="okClick()" />
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <div class="inform-container">
      <div class="title">手动选择</div>
      <div class="tips display_flex justify-content_flex-around align-items_center">
        <div class="display_flex justify-content_flex-start align-items_center">
          <div class="tip1"></div>
          <div class="tipName">行走训练</div>
        </div>
        <div class="display_flex justify-content_flex-start align-items_center">
          <div class="tip2"></div>
          <div class="tipName">坐站训练</div>
        </div>
        <div class="display_flex justify-content_flex-start align-items_center">
          <div class="tip3"></div>
          <div class="tipName">游戏训练</div>
        </div>
        <div class="display_flex justify-content_flex-start align-items_center">
          <div class="tip4"></div>
          <div class="tipName">平衡测定</div>
        </div>
      </div>
      <vue-slider
        v-model="value"
        tooltip="none"
        :process="process"
        :min-range="0"
        :contained="true"
        :enable-cross="false"
        :height="100"
        :dot-options="dotOptions"
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
    </div>
    <span class="demoSpan1"></span>

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
      ],
      dotOptions: [
        {
          disabled: true
        },
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: false
        },
        {
          disabled: true
        }
      ]
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.title = "的训练模式选择";
    this.titleName = "刘邦";
  },
  computed: {
    walkValue: function() {
      return this.value[1];
    },
    sitValue: function() {
      return this.value[2] - this.value[1];
    },
    gameValue: function() {
      return this.value[3] - this.value[2];
    },
    balanceValue: function() {
      return this.value[4] - this.value[3];
    }
  },
  methods: {
    okClick() {
      console.log(this.walkValue);
      console.log(this.sitValue);
      console.log(this.gameValue);
      console.log(this.balanceValue);
    },
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
  padding: 0 250px;
  margin: 50px auto 50px auto;
  font-size: 12px;
  .title {
    font-size: 24px;
  }
  .tips {
    height: 100px;
    margin-bottom: 50px;
    .tipName {
      margin-left: 10px;
      font-size: 16px;
    }
    .tip1,
    .tip2,
    .tip3,
    .tip4 {
      display: inline-block;
      width: 30px;
      height: 40px;
      border-radius: 5px;
    }
    .tip1 {
      background: $purpleFontColor;
    }
    .tip2 {
      background: $pinkFontColor;
    }
    .tip3 {
      background: $yellowFontColor;
    }
    .tip4 {
      background: $greenFontColor;
    }
  }
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
.vue-slider-process {
  border-radius: 0;
}

.vue-slider-rail .vue-slider-process:nth-child(1) .merge-tooltip {
  border-color: #8da1f2;
  background-color: #8da1f2;
}
.vue-slider-rail .vue-slider-process:nth-child(2) .merge-tooltip {
  border-color: #fd8dad;
  background-color: #fd8dad;
}
.vue-slider-rail .vue-slider-process:nth-child(3) .merge-tooltip {
  border-color: #fec85a;
  background-color: #fec85a;
}
.vue-slider-rail .vue-slider-process:nth-child(4) .merge-tooltip {
  border-color: #a6e3dd;
  background-color: #a6e3dd;
}

.vue-slider-rail .vue-slider-dot-handle-disabled {
  display: none;
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

.vue-slider-dot-handle {
  height: 40px;
  width: 26px;
  display: block;
  position: relative;
}

.vue-slider-dot-handle {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: none;
  background-color: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.vue-slider-dot-handle:before {
  content: "";
  height: 12px;
  width: 12px;
  border: 5px solid #d8d8da;
  display: block;
  position: absolute;
  top: 2px;
  left: -4px;
  z-index: 1;
  line-height: 26px;
  border-radius: 40px;
  -webkit-border-radius: 40px;
  -moz-border-radius: 40px;

  background-color: #d8d8da;
  text-align: center;
}

.vue-slider-dot-handle:after {
  content: "";
  height: 0px;
  width: 0px;
  display: block;
  position: absolute;
  top: -3px;
  left: -3px;
  border: 10px transparent solid;
  border-top-width: 0;
  border-bottom-color: #d8d8da;
}
</style>
