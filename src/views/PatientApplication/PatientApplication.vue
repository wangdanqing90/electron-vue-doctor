<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card">
      <div class="application-container">
        <div class="top display_flex justify-content_flex-start align-items_center">
          <el-avatar
            :size="70"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <div
            class="display_flex flex-direction_column justify-content_flex-center align-items_flex-start margin-left-10"
          >
            <div class="name">修改训练申请</div>
            <div class="job">发送时间{{inform.sendtime}}</div>
          </div>
        </div>
        <div class="middle">
          <el-card class="box-card">
            <div class="display_flex justify-content_flex-center align-items_center"></div>
            <div class="display_flex justify-content_flex-center align-items_center">
              <div class="left">
                <div class="title">修改前</div>
                <div class="time">
                  时间:
                  <span class="yellowFontColor">{{inform.before}}</span>
                </div>
                <div class="imgs">
                  项目:
                  <span v-if="inform.content&&inform.content.indexOf('1')!= -1">
                    <img src="@/../images/walkingtraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('2')!= -1">
                    <img src="@/../images/stationtraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('3')!= -1">
                    <img src="@/../images/gametraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('4')!= -1">
                    <img src="@/../images/balancedetermination_a.png" />
                  </span>
                </div>
              </div>
              <div class="middle">
                <img src="@/../images/jiantou.png" />
              </div>
              <div class="right">
                <div class="title">修改后</div>
                <div class="time">
                  时间:
                  <span class="yellowFontColor">{{inform.after}}</span>
                </div>
                <div class="imgs">
                  项目:
                  <span v-if="inform.content&&inform.content.indexOf('1')!= -1">
                    <img src="@/../images/walkingtraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('2')!= -1">
                    <img src="@/../images/stationtraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('3')!= -1">
                    <img src="@/../images/gametraining_a.png" />
                  </span>
                  <span v-if="inform.content&&inform.content.indexOf('4')!= -1">
                    <img src="@/../images/balancedetermination_a.png" />
                  </span>
                </div>
              </div>
            </div>
            <div
              class="button-container display_flex justify-content_flex-justify align-items_center"
            >
              <div class="reason">
                <div>修改理由:</div>
                <div>{{inform.reson}}</div>
              </div>
              <div class="reason">
                <div>所选时间可否修改:</div>
                <div v-if="inform.status == 0">可以修改</div>
                <div v-else>不可修改</div>
              </div>
              <div>
                <el-button class="purple" v-if="inform.status == 0" @click="passClick()">通过</el-button>
                <el-button @click="refuseClick()">拒绝</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <!-- <div class="bottom">
          <el-card class="box-card">
            <div>
              <div class="margin-bottom-5">请填写医嘱或备注:</div>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
            </div>
          </el-card>
        </div>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiGetModifyplan, apiVerifyplaninfo } from "@/request/api.js";
let _this;

export default {
  name: "PatientApplication",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      patientid: this.$store.state.patientInfo.id,
      planid: this.$route.query.planid,
      time: "2019/12/12 12:12:12",
      reason: "子女探望，希望能延迟一天",
      textarea: "",
      inform: {}
    };
  },
  created() {
    _this = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的申请详情";
    this.titleName = this.$store.state.patientInfo.name;
    this.initModifyplan();
  },
  methods: {
    next() {
      this.$router.push({
        path: "/trainingList",
        name: "trainingList"
      });
    },
    backClick() {
      this.$router.go(-1);
    },
    initModifyplan() {
      var params = {
        planid: this.planid
      };
      apiGetModifyplan(params).then(res => {
        this.inform = res.data;
      });
    },
    passClick() {
      this.$confirm("您确定要通过申请？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          _this.passClickCallback();
        })
        .catch(() => {});
    },
    refuseClick() {
      this.$confirm("您确定要拒绝申请？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          _this.refuseClickCallback();
        })
        .catch(() => {});
    },
    //通过
    passClickCallback() {
      var params = {
        planid: this.planid,
        plandate: this.inform.after.substring(0, 10),
        timeid: this.inform.timeid,
        type: 1
      };
      apiVerifyplaninfo(params).then(res => {
        if (res.message == "success") {
          this.$alert("操作成功", "", {
            confirmButtonText: "确定",
            showClose: false,
            callback: action => {
              this.next();
            }
          });
        } else {
          this.$alert(res.message, "", {
            confirmButtonText: "确定",
            showClose: false
          });
        }
      });
    },
    //拒绝
    refuseClickCallback() {
      var params = {
        planid: this.planid,
        plandate: this.inform.after.substring(0, 10),
        timeid: this.inform.timeid,
        type: 2
      };
      apiVerifyplaninfo(params).then(res => {
        if (res.message == "success") {
          this.$alert("操作成功", "", {
            confirmButtonText: "确定",
            showClose: false,
            callback: action => {
              this.next();
            }
          });
        } else {
          this.$alert(res.message, "", {
            confirmButtonText: "确定",
            showClose: false
          });
        }
      });
    }
  }
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

.application-container {
  padding: 0 250px;
  margin: 100px auto 100px auto;
  font-size: 12px;
  .top {
    height: 100%;
    text-align: left;
    margin-right: 30px;
    img {
      width: 150px;
    }
    .name {
      height: 20px;
      line-height: 20px;
      font-size: 18px;
    }
    .job {
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #b0b3b9;
    }
  }
  .middle {
    margin-top: 20px;
    .left,
    .right {
      .title {
        font-size: 20px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
      }
      .time,
      .imgs {
        font-size: 16px;
        text-align: left;
        height: 30px;
        line-height: 30px;

        img {
          width: 25px;
          height: 25px;
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .left .title::before {
      content: "";
      background: $yellowFontColor;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      left: -7px;
      top: -1px;
      display: inline-block;
    }
    .right .title::before {
      content: "";
      background: $pinkFontColor;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      left: -7px;
      top: -1px;
      display: inline-block;
    }
    .middle {
      img {
        width: 50px;
        margin: 30px 50px 0 50px;
      }
    }
    .button-container {
      margin: 20px 0 0 0;
      text-align: left;
      border-top: 2px dashed #eee;
      padding: 20px 0 0 0;
      .reason {
        font-size: 16px;
      }
    }
  }
  .bottom {
    margin-top: 20px;
    font-size: 16px;

    text-align: left;
    div {
      color: #b0b3b9;
    }
  }
}
</style>
