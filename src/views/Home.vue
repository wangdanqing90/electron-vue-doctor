<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <el-button class="purple" @click="addClick()">添加患者</el-button>
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>
    <el-card class="box-card">
      <el-row>
        <el-col :span="24">
          <div class="search">
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
      <!-- table表格 -->
      <el-row class="tableContainer">
        <el-col :span="24">
          <el-table :data="tableData" stripe max-height="700" style="width: 100%;">
            <el-table-column
        label="序号"
        type="index"
        width="100"
        align="center">
         <!-- 红1未审核 蓝0已审核 -->
            <template slot-scope="scope">
                     <span :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">{{(page - 1) * limit + scope.$index + 1}}</span>
                 </template>
            </el-table-column>
            <el-table-column prop="status" label="状态"  align="center">
              <template slot-scope="scope">
                <img v-if="!scope.row.status" src="@/../images/touxiang_01.png" class="stateImg" />
                <img v-else src="@/../images/touxiang_03.png" class="stateImg" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
              <template slot-scope="scope">
                <span :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
              <template slot-scope="scope">
                <span :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.sex}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center">
              <template slot-scope="scope">
                <span :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.age}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="illness" label="病症" align="center">
              <template slot-scope="scope">
                <span
                  :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'"
                >{{scope.row.illness}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="regdate" label="添加日期" align="center">
              <template slot-scope="scope">
                <span :class="!scope.row.status? 'purpleFontColor':'pinkFontColor'">{{scope.row.regdate}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operate1" label="患者信息" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.status" class="pinkFontColor">
                  <el-button @click="examineClick(scope.$index, scope.row)">审核</el-button>
                </span>
                <span v-else class="purpleFontColor" align="center">
                  <el-button @click="checkClick(scope.$index, scope.row)">查看</el-button>
                </span>
              </template>
            </el-table-column>

            <el-table-column prop="message" label="消息" align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.message" src="@/../images/xinxi.png" class="meaasgeImg" />
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
          :current-page="page"
          :page-size="limit"
        ></el-pagination>
      </el-row>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title :visible.sync="leaveDialogVisible" width="30%">
      <span class="purple">您是否确认退出？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leaveDialogVisible = false">取 消</el-button>
        <el-button class="purple" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiPatientlist } from '@/request/api.js';

export default {
  name: "home",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "康复训练工作台",
      leaveDialogVisible: false,
      search: "",
      page: 1,
      limit: 10,
      totalSize: 0,
      tableData: []
    };
  },
  created() {
     window.vue = this;
    this.leftImg = require("../../images/logo.png");

    console.log(this.$store.state.userInfo);
    this.initPatientlist()
  },
  methods: {
    backClick() {
      this.leaveDialogVisible = true;
    },
    confirmClick() {
      this.leaveDialogVisible = false;
      this.$store.commit('clearAll')
       this.$router.push({
        path: "/login",
        name: "login"
      });
    },
    //翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.initPatientlist();
    },
    //初始化患者列表
    initPatientlist(){
      var params={
         'page': this.page,
         'limit': this.limit,
         'search':this.search
      }
      apiPatientlist(params).then(res => {               
          this.tableData = res.data.items;  
          this.totalSize = res.data.total ;
      })  
    },
    searchClick(){
      this.page = 1;
      this.initPatientlist();
    },
    //审核
    examineClick(index, row) {
      var patientInfo =row;
      this.$store.commit('savePatientInfo',row)
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "examine" }
      });
    },
    //查看
    checkClick(index, row) {
      var patientInfo =row;
      this.$store.commit('savePatientInfo',row)
      this.$router.push({
        path: "/trainingList",
        name: "trainingList",
      });
    },

    addClick() {
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "patient" }
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

.el-card {
  margin-bottom: 30px;
}

.tableContainer {
  margin-top: 20px;
  .stateImg {
    vertical-align: middle;
    width: 16px;
  }
  .meaasgeImg {
    vertical-align: middle;
    width: 25px;
  }
  .purpleFontColor {
    color: $purpleFontColor;
  }
  .pinkFontColor {
    color: $pinkFontColor;
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
  padding-bottom: 30px;
}
</style>

<style lang="scss">
</style>

