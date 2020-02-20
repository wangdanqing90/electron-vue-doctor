<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <!-- <el-button class="purple" @click="addClick()">添加训练</el-button>
          <el-button class="purple" @click="headModifyClick()">修改患者</el-button>-->
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card">
      <!-- table表格 -->
      <el-row class="tableContainer">
        <el-col :span="24">
          <el-table :data="tableData" stripe max-height="700" style="width: 100%;" align="center">
            <!-- <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="number" label="序号" width="80" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >{{(page - 1) * limit + scope.$index + 1}}</span>
              </template>
            </el-table-column>-->
            <el-table-column prop="plandate" label="日期" sortable align="center" width="300">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >{{scope.row.plandate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="训练内容" align="center">
              <template slot-scope="scope">
                <img
                  v-if="scope.row.content.indexOf('1')!= -1"
                  src="@/../images/walkingtraining_a.png"
                  class="statusImg"
                />
                <img
                  v-if="scope.row.content.indexOf('2')!= -1"
                  src="@/../images/stationtraining_a.png"
                  class="statusImg"
                />
                <img
                  v-if="scope.row.content.indexOf('3')!= -1"
                  src="@/../images/gametraining_a.png"
                  class="statusImg"
                />
                <img
                  v-if="scope.row.content.indexOf('4')!= -1"
                  src="@/../images/balancedetermination_a.png"
                  class="statusImg"
                />
              </template>
            </el-table-column>
            <el-table-column prop="status" label="完成状态" sortable align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status==0" class="greenFontColor">待完成</span>
                <span v-else-if="scope.row.status==1" class="purpleFontColor">完成</span>
                <span v-else-if="scope.row.status==2" class="pinkFontColor">未完成</span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="status" label="当次报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==1"
                    @click="reportClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="月份报告" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==1"
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
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    class="hand margin-right-10"
                    @click="deleteClick(scope.$index, scope.row)"
                  >删除</span>
                </span>
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.status==0"
                    class="hand"
                    @click="modifyClick(scope.$index, scope.row)"
                  >修改</span>
                  <span v-else class="margin-left-15">--</span>
                </span>
              </template>
            </el-table-column>-->

            <el-table-column prop="askfor" label="申请" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.askfor==1"
                    @click="applyClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else>--</span>
                </span>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="advice" label="医嘱（备注）" align="center">
              <template slot-scope="scope">
                <span
                  :class="{'greenFontColor':scope.row.status==0,'purpleFontColor':scope.row.status==1,'pinkFontColor':scope.row.status==2}"
                >
                  <span
                    v-if="scope.row.advice==1"
                    @click="adviceClick(scope.$index, scope.row)"
                    class="hand"
                  >查看</span>
                  <span v-else class="hand" @click="adviceClick(scope.$index, scope.row)">填写</span>
                </span>
              </template>
            </el-table-column>-->
          </el-table>
        </el-col>
      </el-row>

      <!-- 翻页 -->
      <el-row class="paginationContainer">
        <el-pagination
          layout=" prev, pager, next"
          :total="totalSize"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="limit"
        ></el-pagination>
      </el-row>

      <!-- <el-row class="text-left padding-bottom-50">
        <el-button class="purple" @click="generateReportClick()">生成汇总报告</el-button>
      </el-row>-->
    </el-card>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiPatientplanlist, apiDeleteplaninfo } from "@/request/api.js";

export default {
  name: "trainingList",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "的消息列表",
      titleName: this.$store.state.patientInfo.name,
      leaveDialogVisible: false,
      search: "",
      page: 1,
      limit: 10,
      totalSize: 0,
      tableData: []
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.titleName = this.$store.state.patientInfo.name;
    this.patientid = this.$store.state.patientInfo.id;
    this.initPatientplanlist();
  },
  methods: {
    backClick() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    initPatientplanlist() {
      var params = {
        patientid: this.patientid,
        page: this.page,
        limit: this.limit
      };
      apiPatientplanlist(params).then(res => {
        this.tableData = res.data.items;
        this.totalSize = res.data.total;
      });
    },
    confirmClick() {},
    //翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.initPatientplanlist();
    },
    //当次报告
    reportClick(index, row) {
      this.$router.push({
        path: "/summaryReport",
        name: "summaryReport",
        query: { planid: row.planid }
      });
    },
    //月份报告
    monthReportClick(index, row) {
      console.log(index, row);
    },
    //医嘱
    adviceClick(index, row) {
      this.$router.push({
        path: "/doctorAdvice",
        name: "doctorAdvice",
        query: { planid: row.planid }
      });
    },
    //申请
    applyClick(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/patientApplication",
        name: "patientApplication",
        query: { planid: row.planid }
      });
    },
    //修改
    modifyClick(index, row) {
      this.$router.push({
        path: "/appointment",
        name: "appointment",
        query: { planid: row.planid }
      });
    },
    //删除
    deleteClick(index, row) {
      this.$confirm("您确定要删除该计划？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      }).then(() => {
        this.deleteClickCallback(row.planid);
      });
    },
    deleteClickCallback(planid) {
      var params = {
        planid: planid
      };
      apiDeleteplaninfo(params).then(res => {
        if (res.message == "success") {
          this.$alert("删除成功", "", {
            confirmButtonText: "确定",
            showClose: false,
            callback: action => {
              this.page = 1;
              this.initPatientplanlist();
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
    //生成汇总报告
    generateReportClick() {
      // this.$router.push({
      //   path: "/summaryReport",
      //   name: "summaryReport"
      // });
    },
    //修改患者
    headModifyClick() {
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "patientModify" }
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
  .statusImg {
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

