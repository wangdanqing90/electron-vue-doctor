<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <el-button class="purple" @click="addClick()">添加训练</el-button>
          <el-button class="purple" @click="headModifyClick()">修改患者</el-button>
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card">
      <el-row>
        <el-col :span="24">
          <div class="search">
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-row class="tableContainer">
        <el-col :span="24">
          <el-table :data="tableData" stripe max-height="700" style="width: 100%;" align="center">
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="number" label="序号" width="80" align="center">
              <template slot-scope="scope">
                <span
                  :class="scope.row.state? 'purpleFontColor':'pinkFontColor'"
                >{{scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" sortable align="center">
              <template slot-scope="scope">
                <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.date}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="state" label="训练内容" align="center">
              <template slot-scope="scope">
                <img v-if="scope.row" src="@/../images/walkingtraining_a.png" class="stateImg" />
                <img v-if="scope.row" src="@/../images/balancedetermination_a.png" class="stateImg" />
                <img v-if="scope.row" src="@/../images/gametraining_a.png" class="stateImg" />
                <img v-if="scope.row" src="@/../images/stationtraining_a.png" class="stateImg" />
              </template>
            </el-table-column>
            <el-table-column prop="state" label="完成状态" sortable align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.state==1" class="purpleFontColor">待完成</span>
                <span v-else-if="scope.row.state==2" class="pinkFontColor">未完成</span>
                <span v-else-if="scope.row.state==3" class="greenFontColor">已完成</span>
              </template>
            </el-table-column>
            <el-table-column prop="report" label="当次报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.report"
                    @click="reportClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="monthReport" label="月份报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.monthReport"
                    @click="monthReportClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="inform" label="操作" width="180" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.delete"
                    class="hand margin-right-10"
                    @click="deleteClick(scope.$index, scope.row)"
                  >删除</span>
                  <span v-else class="margin-right-15">--</span>
                </span>
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.delete"
                    class="hand"
                    @click="modifyClick(scope.$index, scope.row)"
                  >修改</span>
                  <span v-else class="margin-left-15">--</span>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="apply" label="申请" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.apply"
                    @click="applyClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="advice" label="医嘱（备注）" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'purpleFontColor':scope.row.state==1,'pinkFontColor':scope.row.state==2,'greenFontColor':scope.row.state==3}"
                >
                  <span
                    v-if="scope.row.advice"
                    @click="adviceClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else @click="adviceClick(scope.$index, scope.row)">填写</span>
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- 翻页 -->
      <el-row class="paginationContainer">
        <el-pagination
          layout=" prev, pager, next"
          :total="totalSize"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
        ></el-pagination>
      </el-row>

      <el-row class="text-left padding-bottom-50">
        <el-button class="purple" @click="generateReportClick()">生成汇总报告</el-button>
      </el-row>
    </el-card>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";

export default {
  name: "trainingList",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "的训练信息",
      titleName: "刘邦",
      leaveDialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      totalSize: 100,
      tableData: [
        {
          state: 1,
          number: "11",
          apply: true,
          date: "2016-05-01",
          report: false,
          monthReport: false,
          advice: true,
          delete: true,
          modify: true
        },
        {
          state: 2,
          number: "11",
          apply: true,
          date: "2016-05-01",
          report: false,
          monthReport: false,
          advice: true,
          delete: true,
          modify: true
        },
        {
          state: 3,
          number: "11",
          apply: true,
          date: "2016-05-01",
          report: false,
          monthReport: false,
          advice: true,
          delete: true,
          modify: true
        },
        {
          state: 1,
          number: "11",
          apply: false,
          date: "2016-05-01",
          report: true,
          monthReport: true,
          advice: false,
          delete: false,
          modify: false
        },
        {
          state: 1,
          number: "11",
          apply: true,
          date: "2016-05-01",
          report: false,
          monthReport: false,
          advice: true,
          delete: true,
          modify: true
        },
        {
          state: 1,
          number: "11",
          apply: true,
          date: "2016-05-01",
          report: false,
          monthReport: false,
          advice: true,
          delete: true,
          modify: true
        }
      ]
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
  },
  methods: {
    backClick() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    confirmClick() {},
    //翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    //当次报告
    reportClick(index, row) {
      console.log(index, row);
    },
    //月份报告
    monthReportClick(index, row) {
      console.log(index, row);
    },
    //医嘱
    adviceClick(index, row) {
      console.log(index, row);
    },
    //申请
    applyClick(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/patientApplication",
        name: "patientApplication"
      });
    },
    //修改
    modifyClick(index, row) {},
    //删除
    deleteClick(index, row) {
      this.$confirm("您确定要删除该计划？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {})
        .catch(() => {});
    },
    //生成汇总报告
    generateReportClick() {},
    //修改患者
    headModifyClick() {
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "patientModify", patientid:this.$route.query.patientid}
      });
    },
    //添加训练
    addClick() {
      this.$router.push({
        path: "/appointment",
        name: "appointment"
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

.search {
  margin-top: 15px;
  width: 200px;
}

.tableContainer {
  margin-top: 20px;
  .stateImg {
    vertical-align: middle;
    width: 16px;
    margin: 0 2px;
  }
  .meaasgeImg {
    vertical-align: middle;
    width: 25px;
  }

  .purpleFontColor .el-button--text {
    color: $purpleFontColor;
  }

  .pinkFontColor .el-button--text {
    color: $pinkFontColor;
  }
}

.paginationContainer {
  margin-top: 30px;
  padding-bottom: 10px;
}
</style>

<style lang="scss">
</style>

