<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

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
        <el-table :data="tableData" stripe max-height="700" style="width: 100%;">
          <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
              <img v-if="scope.row.state" src="@/../images/touxiang_01.png" class="stateImg" />
              <img v-else src="@/../images/touxiang_03.png" class="stateImg" />
            </template>
          </el-table-column>
          <el-table-column prop="number" label="序号">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ID" label="ID">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.ID}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.sex}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.age}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="illness" label="病症">
            <template slot-scope="scope">
              <span
                :class="scope.row.state? 'purpleFontColor':'pinkFontColor'"
              >{{scope.row.illness}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="添加日期">
            <template slot-scope="scope">
              <span :class="scope.row.state? 'purpleFontColor':'pinkFontColor'">{{scope.row.date}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="inform" label="患者信息">
            <template slot-scope="scope">
              <span v-if="!scope.row.inform" class="pinkFontColor">
                <el-button @click="examineClick(scope.$index, scope.row)">审核</el-button>
              </span>
              <span v-else class="purpleFontColor">
                <el-button @click="checkClick(scope.$index, scope.row)">查看</el-button>
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="message" label="消息">
            <template slot-scope="scope">
              <img v-if="scope.row.state" src="@/../images/xinxi.png" class="meaasgeImg" />
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
      title: "刘邦的训练信息",
      leaveDialogVisible: false,
      search: "",
      currentPage: 1,
      pageSize: 10,
      totalSize: 100,
      tableData: [
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: false,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: false,
          plan: false,
          message: false
        },
        {
          state: false,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        },
        {
          state: true,
          number: "11",
          ID: "100",
          name: "王小虎",
          sex: "男",
          age: 10,
          illness: "右侧偏瘫",
          date: "2016-05-03",
          inform: true,
          plan: true,
          message: true
        }
      ]
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
  },
  methods: {
    backClick() {},
    confirmClick() {},
    //翻页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //审核
    examineClick(index, row) {
      console.log(index, row);
      this.$router.push({
        path: "/detailInform",
        name: "detailInform",
        query: { type: "examine" }
      });
    },
    //查看
    checkClick(index, row) {
      console.log(index, row);
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

