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
        <div class="bottom">
          <el-card class="box-card">
            <div>
              <div class="margin-bottom-5">请填写医嘱或备注:</div>
              <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="textarea"></el-input>
              <el-button class="purple f-right " @click="okClick()">确认</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiGetaskinfo,apiPostaskinfo } from "@/request/api.js";
let _this;

export default {
  name: "PatientApplication",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      textarea: "",
      planid: this.$route.query.planid,
    };
  },
  created() {
    _this = this;
    this.leftImg = require("../../../images/logo.png");
    this.title = "的医嘱";
    this.titleName = this.$store.state.patientInfo.name;
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
    passClick() {
      this.$confirm("请确认医嘱。", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          _this.okClick();
        })
        .catch(() => {});
    }, //通过

    okClick() {
        var params = {
        planid: this.planid,
        content:this.textarea.trim()
      };
      apiPostaskinfo(params).then(res => {
        if(res.message=='success'){
          this.$alert('设置医嘱成功', '', {
          confirmButtonText: '确定',
          showClose:false,
          callback: action => {
            this.next();
          }
        });
        } else{
          this.$alert(res.message, '', {
          confirmButtonText: '确定',
          showClose:false,
        });
        }    
      });
    },
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

  .bottom {
    margin-top: 20px;
    font-size: 16px;

    text-align: left;
    div {
      color: #b0b3b9;
    }
    .el-button{
      margin: 20px 0;
    }
  }
}
</style>
