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

    <div class="inform-container clearfix">
      <div class="left">
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
      </div>
      <div class="right">
        <div
          class="right-table-title display_flex justify-content_flex-justify align-items_flex-start"
        >
          <div>
            <div class="cell">时间</div>
          </div>
          <div v-for="(item,index) in tableData" :key="index">
            <div class="title cell">
              <div v-if="index == 0">Monday</div>
              <div v-if="index == 1">Tuesday</div>
              <div v-if="index == 2">Wednesday</div>
              <div v-if="index == 3">Thursday</div>
              <div v-if="index == 4">Friday</div>
              <div v-if="index == 5">Saturday</div>
              <div v-if="index == 6">Sunday</div>
              <div>{{tableData[index].day}}</div>
            </div>
          </div>
          <div style="width:9px;height:100%"></div>
        </div>
        <div class="right-table display_flex justify-content_flex-justify align-items_flex-start">
          <div id="time">
            <div class="cell">08:00-08:30</div>
            <div class="cell">08:30-09:00</div>
            <div class="cell">09:00-09:30</div>
            <div class="cell">09:30-10:00</div>
            <div class="cell">10:00-10:30</div>
            <div class="cell">10:30-11:00</div>
            <div class="cell">11:00-11:30</div>
            <div class="cell">11:30-12:00</div>
            <div class="cell">12:00-12:30</div>
            <div class="cell">12:30-13:00</div>
            <div class="cell">13:00-13:30</div>
            <div class="cell">13:30-14:00</div>
            <div class="cell">14:00-14:30</div>
            <div class="cell">14:30-15:00</div>
            <div class="cell">15:00-15:30</div>
            <div class="cell">15:30-16:00</div>
            <div class="cell">16:00-16:30</div>
            <div class="cell">16:30-17:00</div>
          </div>

          <div v-for="(item1,index1) in tableData" :key="index1" :day="item1.day">
            <div
              v-for="(item,index) in tableData[index1].list"
              :key="index"
              class="cell"
              :timeID="item.timeID"
              :day="item1.day"
            >
              <div
                v-if="item.able>0||(item.timeID==lastTimeId&&tableData[index1].day == lastDate)"
                @click="cellClick($event,item)"
              >{{item.able}}/{{total}}</div>
              <div v-else class="pinkBackColor"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      dateValue: new Date(),
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
    //this.initList(this.common.getNowFormatDate());

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
    calendarSelect(data) {
      this.initList(data.day);
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

.inform-container {
  box-sizing: border-box;
  margin: 0 auto;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  width: 100%;
  position: relative;
  padding: 10px;
  .top {
    background: #ededed;
    display: inline-block;
    padding: 10px 20px;
    width: 220px;
    margin: 10px auto;
    span {
      display: inline-block;
    }
    span:nth-child(1) {
      width: 30px;
      height: 30px;
      background: $pinkFontColor;
      vertical-align: middle;
      margin-right: 10px;
    }
    span:nth-child(2),
    span:nth-child(4) {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      vertical-align: middle;
    }
    span:nth-child(3) {
      width: 30px;
      height: 30px;
      background: white;
      margin-left: 20px;
      vertical-align: middle;
      margin-right: 10px;
    }
    div:nth-child(2) {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      vertical-align: middle;
    }
  }
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
  }
}
.el-button-group button:nth-child(1) {
  display: none;
}
</style>
