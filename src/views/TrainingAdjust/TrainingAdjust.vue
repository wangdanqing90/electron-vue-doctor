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

    <el-card class="box-card">
      <div class="inform-container">
        <div class="inform-inner display_flex justify-content_flex-start align-items_center">
          <!-- 左边tab -->
          <div
            class="left display_inline-flex flex-direction_column justify-content_flex-start align-items_center hand"
          >
            <div
              class="left-inner"
              :class="activeClass == 0 ? 'active':''"
              @click="getItem(0)"
              v-if="tagList[0].visible"
            >
              <div
                class="left-inner-inner display_flex justify-content_flex-around align-items_center"
              >
                <img :src="tagList[0].imgsrc" />
                <div :class="tagList[0].colorClass">
                  <div>{{tagList[0].name}}</div>
                  <div>{{tagList[0].namebottom}}</div>
                </div>
              </div>
            </div>
            <div
              class="left-inner"
              :class="activeClass == 1 ? 'active':''"
              @click="getItem(1)"
              v-if="tagList[1].visible"
            >
              <div
                class="left-inner-inner display_flex justify-content_flex-around align-items_center"
              >
                <img :src="tagList[1].imgsrc" />
                <div :class="tagList[1].colorClass">
                  <div>{{tagList[1].name}}</div>
                  <div>{{tagList[1].namebottom}}</div>
                </div>
              </div>
            </div>

            <div
              class="left-inner"
              :class="activeClass == 2 ? 'active':''"
              @click="getItem(2)"
              v-if="tagList[2].visible"
            >
              <div
                class="left-inner-inner display_flex justify-content_flex-around align-items_center"
              >
                <img :src="tagList[2].imgsrc" />
                <div :class="tagList[2].colorClass">
                  <div>{{tagList[2].name}}</div>
                  <div>{{tagList[2].namebottom}}</div>
                </div>
              </div>
            </div>

            <div
              class="left-inner"
              :class="activeClass == 3 ? 'active':''"
              :key="3"
              @click="getItem(3)"
              v-if="tagList[3].visible"
            >
              <div
                class="left-inner-inner display_flex justify-content_flex-around align-items_center"
              >
                <img :src="tagList[3].imgsrc" />
                <div :class="tagList[3].colorClass">
                  <div>{{tagList[3].name}}</div>
                  <div>{{tagList[3].namebottom}}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- 行走训练右边 -->
          <div
            v-show="this.activeClass == 0"
            class="right display_flex justify-content_flex-start align-items_center"
          >
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type1"
              :type="1"
              :disable="active1Right!=1"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type2"
              :type="2"
              :disable="active1Right!=2"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type3"
              :type="3"
              :disable="active1Right!=3"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
          </div>

          <!-- 坐站训练右边 -->
          <div
            v-show="this.activeClass == 1"
            class="right display_flex justify-content_flex-start align-items_center"
          >
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type4"
              :type="4"
              :disable="active2Right!=4"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type5"
              :type="5"
              :disable="active2Right!=5"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
          </div>

          <!-- 游戏训练右边 -->
          <div
            v-show="this.activeClass == 2"
            class="right display_flex justify-content_flex-start align-items_center"
          >
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type6"
              :type="6"
              :disable="active3Right!=6"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type7"
              :type="7"
              :disable="active3Right!=7"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="large"
            ></AdjustContiner>
          </div>

          <!-- 平衡测定右边 -->
          <div
            v-show="this.activeClass == 3"
            class="right display_flex justify-content_flex-justify align-items_center"
          >
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type8"
              :type="8"
              :disable="active4Right!=8"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="small"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type9"
              :type="9"
              :disable="active4Right!=9"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="small"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type10"
              :type="10"
              :disable="active4Right!=10"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="small"
            ></AdjustContiner>
            <AdjustContiner
              v-if="flag&&flag1"
              ref="type11"
              :type="11"
              :disable="active4Right!=11"
              :stepData="this.stepData"
              :lastPlanData="this.lastPlanData"
              @selectRightClick="selectRightClick"
              class="small"
            ></AdjustContiner>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import AdjustContiner from "@/components/Adjust/AdjustContiner.vue";
import { apiGetStepdetails, apiGetplaninfo } from "@/request/api.js";
export default {
  name: "trainingPlan",
  components: {
    HeaderDoctor,
    AdjustContiner
  },
  data() {
    return {
      vm: "",
      leftImg: "",
      planid: this.$route.query.planid,
      patientid: this.$store.state.patientInfo.id,
      activeClass: 0,
      active1Right: 1,
      active2Right: 4,
      active3Right: 6,
      active4Right: 8,
      lastPlanData: {},
      stepData: {},
      flag: false, //解决props异步问题
      flag1: false,
      tagList: [
        {
          name: "行走",
          namebottom: "训练",
          id: 1,
          imgsrc: require("@/../images/walkingtraining.png"),
          colorClass: "purpleFontColor",
          visible: false
        },
        {
          name: "坐站",
          namebottom: "训练",
          id: 2,
          imgsrc: require("@/../images/stationtraining.png"),
          colorClass: "pinkFontColor",
          visible: false
        },
        {
          name: "游戏",
          namebottom: "训练",
          id: 3,
          imgsrc: require("@/../images/gametraining.png"),
          colorClass: "yellowFontColor",
          visible: false
        },
        {
          name: "平衡",
          namebottom: "测定",
          id: 4,
          imgsrc: require("@/../images/balancedetermination.png"),
          colorClass: "greenFontColor",
          visible: false
        }
      ]
    };
  },
  created() {
    window.vue = this;
    this.vm = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的训练控件数字调节";
    this.titleName = this.$store.state.patientInfo.name;

    if (!this.common.isNullOrBlank(this.planid)) {
      this.initLastPlan();
    } else {
      this.flag1 = true;
    }
    this.initStep();
    this.initLeft();
  },
  methods: {
    initLeft() {
      let planInfo = this.$store.state.planInfo;
      if (planInfo.Walk_Time != 0) this.tagList[0].visible = true;
      if (planInfo.SitAndStand_Time != 0) this.tagList[1].visible = true;
      if (planInfo.Gaming_Time != 0) this.tagList[2].visible = true;
      if (planInfo.Balance_Time != 0) this.tagList[3].visible = true;

      if (this.tagList[0].visible) {
        this.activeClass = 0;
      } else if (this.tagList[1].visible) {
        this.activeClass = 1;
      } else if (this.tagList[2].visible) {
        this.activeClass = 2;
      } else {
        this.activeClass = 3;
      }
    },
    //获取之前的计划
    initLastPlan() {
      var params = {
        planid: this.planid,
        patientid: this.patientid
      };
      apiGetplaninfo(params).then(res => {
        this.lastPlanData = res.data.details;
        let data = res.data;

        if (res.data.details.Walk_Mode == 0) this.active1Right = 1;
        else if (res.data.details.Walk_Mode == 2) this.active1Right = 2;
        else if (res.data.details.Walk_Mode == 1) this.active1Right = 3;
        if (res.data.details.SitAndStand_Mode == 0) this.active2Right = 4;
        else if (res.data.details.SitAndStand_Mode == 2) this.active2Right = 5;
        if (res.data.details.Gaming_Mode == 3) this.active3Right = 6;
        else if (res.data.details.Gaming_Mode == 4) this.active3Right = 7;
        if (res.data.details.Balance_Mode == 5) this.active4Right = 8;
        else if (res.data.details.Balance_Mode == 6) this.active4Right = 9;
        else if (res.data.details.Balance_Mode == 7) this.active4Right = 10;
        else if (res.data.details.Balance_Mode == 8) this.active4Right = 11;
        this.flag1 = true;
      });
    },
    initStep() {
      apiGetStepdetails().then(res => {
        this.stepData = res.data;
        this.flag = true;
      });
    },
    okClick() {
      let obj = {};
      this.$refs.type1.config.adjusts.forEach((item, index) => {
        console.log("行走训练：跟随模式：" + item.name + item.total);
        if (index == 0)
          obj["WFollowing_Imponderability"] =
            item.total * this.stepData.WFollowing_Imponderability;
        if (index == 1)
          obj["WFollowing_FixedDistance"] =
            item.total * this.stepData.WFollowing_FixedDistance;
        if (index == 2)
          obj["WFollowing_Speed"] = item.total * this.stepData.WFollowing_Speed;
      });
      this.$refs.type2.config.adjusts.forEach((item, index) => {
        console.log("行走训练：主动模式：" + item.name + item.total);
        if (index == 0)
          obj["WInitiative_Imponderability"] =
            item.total * this.stepData.WInitiative_Imponderability;
        if (index == 1)
          obj["WInitiative_Force"] =
            item.total * this.stepData.WInitiative_Force;
        if (index == 2)
          obj["WInitiative_FixedDistance"] =
            item.total * this.stepData.WInitiative_FixedDistance;
      });

      console.log("方向限定" + this.$refs.type2.config.switch);
      console.log("方向" + this.$refs.type2.config.tabActive);
      obj["WInitiative_Direction"] = this.$refs.type2.config.tabActive;

      this.$refs.type3.config.adjusts.forEach((item, index) => {
        console.log("行走训练：阻力模式：" + item.name + item.total);
        if (index == 0)
          obj["WResistance_Imponderability"] =
            item.total * this.stepData.WResistance_Imponderability;
        if (index == 1)
          obj["WResistance_Force"] =
            item.total * this.stepData.WResistance_Force;
        if (index == 2)
          obj["WResistance_FixedDistance"] =
            item.total * this.stepData.WResistance_FixedDistance;
      });
      this.$refs.type4.config.adjusts.forEach((item, index) => {
        console.log("坐站训练：跟随模式：" + item.name + item.total);
        if (index == 0)
          obj["SFollowing_Speed"] = item.total * this.stepData.SFollowing_Speed;
        if (index == 1)
          obj["SFollowing_Count"] = item.total * this.stepData.SFollowing_Count;
      });
      this.$refs.type5.config.adjusts.forEach((item, index) => {
        console.log("坐站训练：主动模式：" + item.name + item.total);
        if (index == 0)
          obj["SInitiative_Imponderability"] =
            item.total * this.stepData.SInitiative_Imponderability;
        if (index == 1)
          obj["SInitiative_Count"] =
            item.total * this.stepData.SInitiative_Count;
      });
      console.log("七巧板" + this.$refs.type6.config.radio);
      obj["GWall_Intensity"] = this.$refs.type6.config.radio;
      console.log("太空飞行" + this.$refs.type7.config.radio);
      obj["GPlane_Intensity"] = this.$refs.type7.config.radio;
      this.$refs.type8.config.adjusts.forEach((item, index) => {
        console.log("平衡训练：左脚：" + item.name + item.total);
        obj["BLeft_Imponderability"] =
          item.total * this.stepData.BLeft_Imponderability;
      });
      this.$refs.type9.config.adjusts.forEach((item, index) => {
        console.log("平衡训练：右脚：" + item.name + item.total);
        obj["BRight_Imponderability"] =
          item.total * this.stepData.BRight_Imponderability;
      });
      this.$refs.type10.config.adjusts.forEach((item, index) => {
        console.log("平衡训练：双脚：" + item.name + item.total);
        obj["BBoth_Imponderability"] =
          item.total * this.stepData.BBoth_Imponderability;
      });
      this.$refs.type11.config.adjusts.forEach((item, index) => {
        console.log("平衡训练：FRT：" + item.name + item.total);
        obj["BFRT_Imponderability"] =
          item.total * this.stepData.BFRT_Imponderability;
      });

      if (this.active1Right == 1) {
        obj["Walk_Mode"] = 0;
      } else if (this.active1Right == 2) {
        obj["Walk_Mode"] = 2;
      } else if (this.active1Right == 3) {
        obj["Walk_Mode"] = 1;
      }
      if (this.active2Right == 4) {
        obj["SitAndStand_Mode"] = 0;
      } else if (this.active2Right == 5) {
        obj["SitAndStand_Mode"] = 2;
      }
      if (this.active3Right == 6) {
        obj["Gaming_Mode"] = 3;
      } else if (this.active3Right == 7) {
        obj["Gaming_Mode"] = 4;
      }
      if (this.active4Right == 8) {
        obj["Balance_Mode"] = 5;
      } else if (this.active4Right == 9) {
        obj["Balance_Mode"] = 6;
      } else if (this.active4Right == 10) {
        obj["Balance_Mode"] = 7;
      } else if (this.active4Right == 11) {
        obj["Balance_Mode"] = 8;
      }
      // debugger;
      this.$store.commit("savePlanInfo", obj);
      this.$router.push({
        path: "/trainingPlan",
        name: "trainingPlan",
        query: { planid: this.planid }
      });
    },
    backClick() {
      this.$router.go(-1);
    },
    getItem(index) {
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
    },
    selectRightClick(index) {
      console.log(index);
      if (this.activeClass == 0) {
        //第一行
        this.active1Right = index;
        this.$refs.type1.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type2.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type3.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
      } else if (this.activeClass == 1) {
        //第二行
        this.active2Right = index;
        this.$refs.type4.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type5.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
      } else if (this.activeClass == 2) {
        //第三行
        this.vm.$set(this.$refs.type7.config, "radio", 1);
        this.vm.$set(this.$refs.type6.config, "radio", 1);
        this.active3Right = index;
      } else if (this.activeClass == 3) {
        //第四行
        this.active4Right = index;
        this.$refs.type8.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type9.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type10.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
        this.$refs.type11.config.adjusts.forEach((item, index) => {
          this.vm.$set(item, "total", 0);
        });
      }
    }
  },
  computed: {},
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
  height: 450px;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  width: 820px;
  position: relative;
  .next {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
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
        margin-bottom: 9px;
        .left-inner-inner {
          height: 80px;
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
        // width: 156px;
        // margin-right: -6px;
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
      color: #dcdcdc;
    }
  }
}
</style>
