<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <!-- <img src="@/../images/certain.png" @click="okClick()" /> -->
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <el-card class="box-card main">
      <!-- <div class="left">
        <el-calendar>
          <template slot="dateCell" slot-scope="{date, data}">
            <p
              @click="calendarSelect(data)"
              :class="data.isSelected ? 'is-selected' : ''"
            >{{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}</p>
          </template>
        </el-calendar>
        <div class="top">
          <div>
            <span></span>
            <span>不可预约</span>
            <span></span>
            <span>可预约</span>
          </div>

          <div>设备使用情况：可预约/总设备数</div>
        </div>
      </div>-->
      <el-row :gutter="5" class="margin-bottom-20">
        <el-col :span="10" class="text-left">
          <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            @change="getMyDateTime(dateValue)"
          ></el-date-picker>
        </el-col>

        <el-col :span="14" class="text-right">
          <div class="top">
            <div>
              <span class="red"></span>
              <span>不可预约</span>
              <span class="white"></span>
              <span>可预约</span>
              <span class="yellow"></span>
              <span>未完成</span>
              <span class="green"></span>
              <span>待完成</span>
              <span class="purple"></span>
              <span>完成</span>
            </div>
            <div class="text-left">设备使用情况：可预约/总设备数</div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <div
            class="right-table-title"
            style="border-top: 1px solid #EEE; border-left: 1px solid #EEE; border-bottom: 1px solid #EEE;"
          >
            <el-row :span="24">
              <el-col :span="3" class="title cell">
                <div>时间</div>
              </el-col>
              <el-col :span="3" v-for="(item,index) in tableData" :key="index">
                <div class="title cell">
                  <div v-if="index == 0">周一</div>
                  <div v-if="index == 1">周二</div>
                  <div v-if="index == 2">周三</div>
                  <div v-if="index == 3">周四</div>
                  <div v-if="index == 4">周五</div>
                  <div v-if="index == 5">周六</div>
                  <div v-if="index == 6">周日</div>
                  <div>{{tableData[index].day}}</div>
                </div>
              </el-col>
            </el-row>

            <el-row :span="24">
              <el-col :span="3" class>
                <el-row :span="24" class="cell2">08:00-08:30</el-row>
                <el-row :span="24" class="cell2">08:30-09:00</el-row>
                <el-row :span="24" class="cell2">09:00-09:30</el-row>
                <el-row :span="24" class="cell2">09:30-10:00</el-row>
                <el-row :span="24" class="cell2">10:00-10:30</el-row>
                <el-row :span="24" class="cell2">10:30-11:00</el-row>
                <el-row :span="24" class="cell2">11:00-11:30</el-row>
                <el-row :span="24" class="cell2">11:30-12:00</el-row>
                <el-row :span="24" class="cell2">12:00-12:30</el-row>
                <el-row :span="24" class="cell2">12:30-13:00</el-row>
                <el-row :span="24" class="cell2">13:00-13:30</el-row>
                <el-row :span="24" class="cell2">13:30-14:00</el-row>
                <el-row :span="24" class="cell2">14:00-14:30</el-row>
                <el-row :span="24" class="cell2">14:30-15:00</el-row>
                <el-row :span="24" class="cell2">15:00-15:30</el-row>
                <el-row :span="24" class="cell2">15:30-16:00</el-row>
                <el-row :span="24" class="cell2">16:00-16:30</el-row>
                <el-row :span="24" class="cell2">16:30-17:00</el-row>
              </el-col>

              <el-col :span="3" v-for="(item1,index1) in tableData" :key="index1" :day="item1.day">
                <el-row
                  :span="24"
                  v-for="(item,index) in tableData[index1].list"
                  :key="index"
                  class="cell2"
                  :timeID="item.timeID"
                  :day="item1.day"
                >
                  <div
                    v-if="item.able>0||(item.timeID==lastTimeId&&tableData[index1].day == lastDate)"
                    :class="(item.timeID==lastTimeId&&tableData[index1].day == lastDate)?'lastselect':''"
                    @click="cellClick($event,item)"
                  >{{item.able}}/{{total}}</div>
                  <div v-else class="pinkBackColor"></div>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiGetplanlist, apiGetplaninfo } from "@/request/api.js";

export default {
  name: "Appointment",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      vm: "",
      leftImg: "",
      planid: this.$route.query.planid,
      patientid: this.$store.state.patientInfo.id,
      dateValue: "",
      total: 0,
      tableData: [],
      lastTimeId: "",
      lastDate: ""
    };
  },
  created() {
    this.vm = this;
    window.vue = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的时间预约计划表";
    this.titleName = this.$store.state.patientInfo.name;

    if (!this.common.isNullOrBlank(this.planid)) {
      this.initLastPlan();
    } else {
      this.initList(this.common.getNowFormatDate());
    }
  },
  methods: {
    initLastPlan() {
      let _this = this;
      var params = {
        planid: this.planid,
        patientid: this.patientid
      };
      apiGetplaninfo(params).then(res => {
        let data = res.data;
        this.lastTimeId = res.data.timeid;
        this.lastDate = res.data.plandate;

        _this.initList(this.common.getNowFormatDate());
      });
    },
    initList(day) {
      this.tableData = [];
      var params = {
        plandate: day
      };
      apiGetplanlist(params).then(res => {
        this.total = res.data.total;
        var items = res.data.items;
        for (let item in items) {
          var newObj = {};
          newObj.day = item;
          var list = [];
          var objs = JSON.parse(items[item]);
          for (let item1 in objs) {
            var re = {};
            re.timeID = item1;
            re.able = this.total - objs[item1];
            list.push(re);
          }
          newObj.list = list;
          this.tableData.push(newObj);
        }
        console.log(this.tableData);
      });
    },
    backClick() {
      this.$router.go(-1);
    },
    //选择日期
    getMyDateTime(day) {
      this.initList(day);
    },
    cellClick(event, item) {
      var _this = this;
      let day = event.target.parentNode.getAttribute("day");

      if (this.compareDate(day)) {
        this.$confirm("您是否确认预约该时间？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          confirmButtonClass: "el-button purple"
        })
          .then(() => {
            var info = {};
            info["timeid"] = item.timeID;
            info["plandate"] = day;

            _this.$store.commit("savePlanInfo", info);

            if (!this.common.isNullOrBlank(this.planid)) {
              this.$router.push({
                path: "/trainingSlider",
                name: "trainingSlider",
                query: { planid: this.planid }
              });
            } else {
              this.$router.push({
                path: "/trainingSlider",
                name: "trainingSlider"
              });
            }
          })
          .catch(() => {});
      } else {
        this.$alert("请选择今天以后的日期", "", {
          confirmButtonText: "确定",
          showClose: false
        });
      }
    },
    //比较日期
    compareDate(day) {
      var oDate1 = new Date(day);
      let now = new Date();
      if (oDate1 >= now) {
        return true;
      } else {
        return false;
      }
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

.main {
  .top {
    background: #ededed;
    display: inline-block;
    padding: 10px 20px;
    span {
      display: inline-block;
    }
    .red {
      width: 30px;
      height: 30px;
      background: $pinkFontColor;
      vertical-align: middle;
      margin-right: 10px;
    }
    .white {
      width: 30px;
      height: 30px;
      background: white;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .green {
      width: 30px;
      height: 30px;
      background: #a6e3dd;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .yellow {
      width: 30px;
      height: 30px;
      background: #fec85a;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    .purple {
      width: 30px;
      height: 30px;
      background: #8da1f2;
      vertical-align: middle;
      margin-right: 10px;
      margin-left: 20px;
    }
    div:nth-child(2) {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
  .cell {
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    cursor: pointer;
  }

  .pinkBackColor {
    width: 100%;
    height: 100%;
    cursor: default;
  }
  .lastselect {
    background: $purpleFontColor;
  }
  .right-table-title {
    .cell {
      height: 52px;
      line-height: 52px;
      background: #ededed;
    }
    .cell2 {
      height: 40px;
      line-height: 40px;
      background: #fff;
      font-size: 14px;
      text-align: center;
      border-top: 1px solid #eee;
      border-right: 1px solid #eee;
      cursor: pointer;
    }
    .title {
      div {
        height: 20px;
        line-height: 30px;
      }
    }
  }
}

.inform-container {
  box-sizing: border-box;
  margin: 0 auto;
  font-size: 12px;
  border-radius: 10px;
  width: 100%;
  position: relative;
  padding: 10px;

  .left {
    float: left;
    width: 300px;
    position: absolute;
    border: 1px solid #e7e7e7;
    .el-calendar-table .el-calendar-day {
      height: 40px;
    }
  }
  #Saturday {
    border-right: 1px solid #ebeef5;
  }
  .right {
    float: right;
    width: 866px;

    .right-table-title {
      .cell {
        height: 60px;
        line-height: 60px;
        background: #ededed;
      }
      .title {
        div {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    .right-table {
      height: 600px;
      overflow: scroll;
    }
    .right-table > div .cell:nth-last-child(1) {
      border-bottom: 1px solid #ebeef5;
    }
    .cell {
      font-size: 14px;
      width: 105px;
      height: 40px;
      line-height: 40px;
      border-left: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
      cursor: pointer;
      .pinkBackColor {
        width: 100%;
        height: 100%;
        cursor: default;
      }
    }
  }
}
</style>

<style lang="scss">
.el-calendar-table .el-calendar-day {
  box-sizing: border-box;
  padding: 0;
  height: 40px;
  p {
    width: 100%;
    height: 100%;
    line-height: 40px;
    text-align: center;
  }
}
.el-button-group button:nth-child(1) {
  display: none;
}
</style>
