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
      </div>
      <div class="right">
        <div
          class="right-table-title display_flex justify-content_flex-justify align-items_flex-start"
        >
          <div>
            <div class="cell">时间</div>
          </div>
          <div>
            <div class="title cell">
              <div>Sunday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Monday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Tuesday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Wednesday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Thursday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Friday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div>
            <div class="title cell">
              <div>Saturday</div>
              <div>{{tableData[0].data}}</div>
            </div>
          </div>
          <div style="width:10px;height:100%"></div>
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
          <div id="Sunday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Monday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Tuesday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Wednesday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Thursday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Friday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
            </div>
          </div>
          <div id="Saturday">
            <div v-for="(item,index) in tableData[0].list" :key="index" class="cell">
              <div v-if="item.able<item.all">{{item.able}}/{{item.all}}</div>
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

export default {
  name: "Appointment",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      vm: "",
      leftImg: "",
      dateValue: new Date(),

      tableData: [
        {
          type: "sun",
          data: "01",
          list: [
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 5
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            },
            {
              id: 1,
              all: 5,
              able: 1
            }
          ]
        }
      ]
    };
  },
  created() {
    this.vm = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的时间预约计划表";
    this.titleName = "刘邦";
  },
  methods: {
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
    backClick() {
      this.$router.go(-1);
    },
    calendarSelect(data) {
      console.log(data.day);
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
  margin: 50px auto;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid #e7e7e7;
  width: 100%;
  position: relative;
  .left {
    float: left;
    width: 300px;
    .el-calendar-table .el-calendar-day {
      height: 40px;
    }
  }
  .right {
    float: right;
    width: 890px;
    .right-table {
      height: 500px;
      overflow: scroll;
    }
    .cell {
      font-size: 14px;
      width: 108px;
      height: 50px;
      line-height: 50px;
      border: 1px solid #ebeef5;
    }
    .title {
      div:nth-child(1) {
        height: 20px;
        line-height: 20px;
      }

      div:nth-child(2) {
        height: 30px;
        line-height: 30px;
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
