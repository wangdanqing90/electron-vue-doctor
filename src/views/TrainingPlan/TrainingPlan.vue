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

    <el-row>
      <el-card class="box-card">
        <el-col :span="24" class="inform-container">
          <div v-for="item in planData" :key="item.value">
            <div
              class="inform display_flex justify-content_flex-justify align-items_center"
              :class="{'purpleFontColor':item.type==1,'pinkFontColor':item.type==2,'yellowFontColor':item.type==3,'greenFontColor':item.type==4}"
            >
              <div
                class="left display_inline-flex flex-direction_column justify-content_flex-around align-items_center"
              >
                <img v-if="item.type==1" src="@/../images/walkingtraining.png" />
                <img v-if="item.type==2" src="@/../images/stationtraining.png" />
                <img v-if="item.type==3" src="@/../images/gametraining.png" />
                <img v-if="item.type==4" src="@/../images/balancedetermination.png" />
                <div v-if="item.type==1">行走训练</div>
                <div v-if="item.type==2">坐站训练</div>
                <div v-if="item.type==3">游戏训练</div>
                <div v-if="item.type==4">平衡测定</div>
              </div>
              <div class="middle display_inline-flex flex-direction_column align-items_center">
                <div class="margin-top-10">时段</div>
                <div class="margin-top-40">{{item.time}}</div>
              </div>
              <div
                class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center"
              >
                <div>路程(m)</div>
                <div>{{item.distance}}</div>
              </div>
              <div
                class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center"
              >
                <div>减重（n）</div>
                <div>{{item.weight}}</div>
              </div>
              <div
                class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center"
              >
                <div>速度（m/s）</div>
                <div>{{item.speed}}</div>
              </div>
              <div
                class="right display_inline-flex flex-direction_column justify-content_flex-around align-items_center"
              >
                <div>助力（n）</div>
                <div>{{item.assistance}}</div>
              </div>
            </div>
          </div>
        </el-col>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";

export default {
  name: "trainingPlan",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      planData: [
        {
          type: 1,
          time: "07:00-07:30",
          distance: 30,
          weight: 10,
          speed: 10,
          assistance: 30
        },
        {
          type: 2,
          time: "07:00-07:30",
          distance: 30,
          weight: 10,
          speed: 10,
          assistance: 30
        },
        {
          type: 3,
          time: "07:00-07:30",
          distance: 30,
          weight: 10,
          speed: 10,
          assistance: 30
        },
        {
          type: 4,
          time: "07:00-07:30",
          distance: 30,
          weight: 10,
          speed: 10,
          assistance: 30
        }
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
    },
    okClick() {
      this.$confirm("您是否确认信息？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          this.okNextClick();
        })
        .catch(() => {});
    },
    okNextClick() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
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
  padding: 0 250px;
  margin: 100px auto 100px auto;
  font-size: 12px;
  .inform {
    height: 100px;
    border-bottom: 1px solid #e7e7e7;

    .left {
      height: 100%;
      font-size: 16px;
      img {
        width: 28px;
      }
    }
    .middle {
      height: 100%;
      div:nth-child(1) {
        color: #2c3e50;
      }
      div:nth-child(2) {
        font-size: 16px;
      }
    }
    .right {
      height: 100%;
      div:nth-child(1) {
        color: #2c3e50;
      }
      div:nth-child(2) {
        font-size: 40px;
      }
    }
  }
}
</style>
