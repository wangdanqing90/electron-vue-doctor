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

    <div class="inform-container">
      <div class="inform-inner display_flex justify-content_flex-justify align-items_center">
        <div
          class="left display_inline-flex flex-direction_column justify-content_flex-justify align-items_center"
        >
          <div
            class="left-inner"
            :class="activeClass == index ? 'active':''"
            v-for="(item,index) in tagList"
            :key="index"
            @click="getItem(index)"
          >
            <div
              class="left-inner-inner display_flex justify-content_flex-around align-items_center"
            >
              <img :src="item.imgsrc" />
              <div :class="item.colorClass">
                <div>{{item.name}}</div>
                <div>{{item.namebottom}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <Adjust
            selectedImg=require("@/../images/images/followmode_0.png")
            unselectedImg="@/../images/images/followmode_2.png"
            title="跟随模式"
          ></Adjust>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import Adjust from "@/components/Adjust/Adjust.vue";

export default {
  name: "trainingPlan",
  components: {
    HeaderDoctor,
    Adjust
  },

  data() {
    return {
      leftImg: "",
      activeClass: 0,
      tagList: [
        {
          name: "行走",
          namebottom: "训练",
          id: 1,
          imgsrc: require("@/../images/walkingtraining.png"),
          colorClass: "purpleFontColor"
        },
        {
          name: "坐站",
          namebottom: "训练",
          id: 2,
          imgsrc: require("@/../images/stationtraining.png"),
          colorClass: "pinkFontColor"
        },
        {
          name: "游戏",
          namebottom: "训练",
          id: 3,
          imgsrc: require("@/../images/gametraining.png"),
          colorClass: "yellowFontColor"
        },
        {
          name: "平衡",
          namebottom: "测定",
          id: 4,
          imgsrc: require("@/../images/balancedetermination.png"),
          colorClass: "greenFontColor"
        }
      ]
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.title = "的训练控件数字调节";
    this.titleName = "刘邦";
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    getItem(index) {
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.header {
  .header-right {
    img {
      width: 50px;
      margin-left: 20px;
    }
  }
}
.inform-container {
  box-sizing: border-box;
  margin: 100px auto;
  height: 500px;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  width: 820px;

  .inform-inner {
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    font-size: 18px;
    .left {
      width: 150px;
      background: white;
      height: 100%;
      z-index: 10;
      .left-inner {
        width: 100%;
        border-radius: 10px 0 0 10px;
        background: #eeeeee;
        .left-inner-inner {
          height: 90px;
          margin: 10px 0 10px 10px;
        }
        img {
          width: 40px;
        }
      }
      .active {
        background: white;
        border-top: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        width: 156px;
        margin-right: -6px;
        .left-inner-inner {
          border-right: 1px solid #e7e7e7;
        }
      }
    }
    .right {
      width: 640px;

      height: 100%;
      border-top: 1px solid #e7e7e7;
      border-right: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      border-left: 1px solid #e7e7e7;
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>
