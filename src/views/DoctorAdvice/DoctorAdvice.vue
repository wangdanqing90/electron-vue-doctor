<template>
  <div>
    <div class="application-container">
      <div class="bottom">
        <el-card class="box-card">
          <div>
            <div class="margin-bottom-5">医嘱或备注:</div>
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="textarea"
              :disabled="selectInfo.status!=0"
            ></el-input>
            <el-button v-if="selectInfo.status==0" class="purple f-right" @click="okClick()">确认</el-button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiGetaskinfo, apiPostaskinfo } from "@/request/api.js";
let _this;

export default {
  name: "DoctorAdvice",
  components: {},

  data() {
    return {
      textarea: "",
      planid: ""
    };
  },
  props: {
    selectInfo: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    _this = this;
    this.planid = this.selectInfo.planid;
    this.show = false;
    this.initaskinfo();
  },
  methods: {
    initaskinfo() {
      var params = {
        planid: this.planid
      };
      apiGetaskinfo(params).then(res => {
        if (
          res.message == "success" &&
          !this.common.isNullOrBlank(res.data.content)
        ) {
          this.textarea = res.data.content;
        }
      });
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
        content: this.textarea.trim()
      };
      apiPostaskinfo(params).then(res => {
        if (res.message == "success") {
          this.$alert("设置医嘱成功", "", {
            confirmButtonText: "确定",
            showClose: false,
            callback: action => {
              this.$emit("closeAdvice");
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
  // watch: {
  //   "selectInfo.status": function() {
  //     // your code
  //     alert("111");
  //   }
  // }
};
</script>

<style scoped lang="scss">
.mycontainer {
  width: 880px;
  min-height: 100%;
  margin: 0 auto;
  background: #fcfcfe;
  padding: 0 20px;
}
.application-container {
  font-size: 12px;

  .bottom {
    margin-top: 20px;
    font-size: 16px;

    text-align: left;
    div {
      color: #b0b3b9;
    }
    .el-button {
      margin: 20px 0;
    }
  }
}
</style>
