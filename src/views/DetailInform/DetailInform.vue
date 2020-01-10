<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/certain.png" @click="onSubmit('formLabelAlign')" />
          <img v-if="type == 'patientModify'" src="@/../images/close.png" @click="deleteClick" />
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </HeaderDoctor>

    <el-row class="body-container" :gutter="40">
      <el-col :span="6">
        <div class="left">
          <img class="head" :src="imgsrc" />
          <div>注：</div>
          <div>
            标注
            <i>*</i>号的为必填项，其他为选填项，您可以在此进行修改与完善。
          </div>
          <div class="gou">
            修改完成请点击
            <img src="@/../images/certain.png" />键。
          </div>
          <div class="gou">
            删除患者信息请点击
            <img src="@/../images/close.png" />键。
          </div>
          <div class="back">
            返回请点击
            <img src="@/../images/back.png" />键。
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right">
          <el-form
            :disabled=" type=='examine'"
            label-position="top"
            :inline="true"
            :model="formLabelAlign"
            :rules="rules"
            ref="formLabelAlign"
            class="demo-form-inline text-left"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formLabelAlign.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="formLabelAlign.sex">
                <el-radio label="男" value="男"></el-radio>
                <el-radio label="女" value="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="formLabelAlign.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="ID" prop="ID">
              <el-input v-model="formLabelAlign.ID" placeholder="请输入ID"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="IDNumber">
              <el-input v-model="formLabelAlign.IDNumber" placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="所属医院" prop="hosipital">
              <el-select v-model="formLabelAlign.hosipital" placeholder="请选择所属医院">
                <el-option
                  v-for="item in hosipitalsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科室" prop="department">
              <el-select v-model="formLabelAlign.department" placeholder="请选择所属科室">
                <el-option
                  v-for="item in departmentsData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工号" prop="jobNumber" v-if="type=='doctor'">
              <el-select v-model="formLabelAlign.jobNumber" placeholder="请选择工号">
                <el-option
                  v-for="item in jobNumbersData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="办公电话" prop="officePhone" v-if="type=='doctor'">
              <el-input v-model="formLabelAlign.officePhone" placeholder="请输入办公电话"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone" v-if="type=='doctor'">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" v-if="type=='doctor'">
              <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>

            <el-form-item
              label="所属医生"
              prop="doctor"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.doctor" placeholder="请输入所属医生"></el-input>
            </el-form-item>
            <el-form-item
              label="身高（cm）"
              prop="height"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.height" placeholder="请输入身高"></el-input>
            </el-form-item>
            <el-form-item
              label="体重（kg）"
              prop="weight"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.height" placeholder="请输入体重"></el-input>
            </el-form-item>
            <el-form-item
              label="联系信息"
              prop="inform"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.inform" placeholder="请输入联系信息"></el-input>
            </el-form-item>
            <el-form-item
              label="骨盆高度（cm）"
              prop="PelvicHeight"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.PelvicHeight" placeholder="请输入骨盆高度"></el-input>
            </el-form-item>
            <el-form-item
              label="减重值（kg）"
              prop="lossWeight"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-input v-model="formLabelAlign.lossWeight" placeholder="请输入减重值"></el-input>
            </el-form-item>
            <el-form-item
              label="偏瘫侧"
              prop="hemiplegiaSide"
              v-if="type=='patientModify'||type=='patient'||type=='examine'"
            >
              <el-radio-group v-model="formLabelAlign.hemiplegiaSide">
                <el-radio label="左" value="左"></el-radio>
                <el-radio label="右" value="右"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";

export default {
  name: "home",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "",
      titleName: "",
      type: "", // doctor：医生，patientModify：患者修改，patient：患者新增，examine:患者审核
      imgsrc: require("@/../images/doctor.png"),
      hosipitalsData: [
        {
          value: "医院1",
          name: "医院1"
        },
        {
          value: "医院2",
          name: "医院2"
        }
      ],
      departmentsData: [
        {
          value: "科室1",
          name: "科室1"
        },
        {
          value: "科室2",
          name: "科室2"
        }
      ],
      jobNumbersData: [
        {
          value: "工号1",
          name: "工号1"
        },
        {
          value: "工号2",
          name: "工号2"
        }
      ],
      formLabelAlign: {
        user: "",
        sex: "",
        age: "",
        ID: "",
        password: "",
        IDNumber: "",
        hosipital: "",
        department: "",
        jobNumber: "",
        officePhone: "",
        phone: "",
        email: "",
        doctor: "",
        height: "",
        weight: "",
        inform: "",
        PelvicHeight: "",
        lossWeight: "",
        hemiplegiaSide: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        ID: [{ required: true, message: "请输入ID", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        hosipital: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        jobNumber: [
          { required: true, message: "请选择工号", trigger: "change" }
        ],
        doctor: [{ required: true, message: "请输入所属医生", trigger: "blur" }]
      }
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.type = this.$route.query.type;
    console.log(this.type);
    if (this.type == "doctor") {
      //医生
      this.title = "编辑我的基本信息";
    } else if (this.type == "patient") {
      //新建病人
      this.title = "请您填写患者信息";
      this.titleName = "您好，";
    } else if (this.type == "patientModify") {
      //修改病人
      this.title = "的基本信息";
      this.titleName = "刘邦";
    }
  },
  methods: {
    //删除患者信息
    deleteClick() {},
    backClick() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    showResult() {
      this.$confirm("您已成功添加该患者？", "", {
        confirmButtonText: "回工作台",
        cancelButtonText: "制定计划",
        confirmButtonClass: "el-button purple"
      })
        .then(() => {
          this.$router.push({
            path: "/",
            name: "home",
            query: {}
          });
        })
        .catch(() => {
          this.$router.push({
            path: "/",
            name: "home",
            query: {}
          });
        });
    },
    examine() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    onSubmit(formName) {
      if (this.type == "examine") {
        this.$confirm("您是否确认审核通过？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          confirmButtonClass: "el-button purple"
        })
          .then(() => {
            this.examine();
          })
          .catch(() => {});
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
            if (this.type == "doctor") {
              this.$confirm("您是否确认修改？", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                  this.$router.push({
                    path: "/",
                    name: "home",
                    query: {}
                  });
                })
                .catch(() => {});
            } else if (this.type == "patient") {
              this.$confirm("您是否添加该患者？", "", {
                confirmButtonText: "确认添加",
                cancelButtonText: "暂不添加",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                  this.showResult();
                })
                .catch(() => {});
            } else if (this.type == "patientModify") {
              this.$confirm("您是否确认修改？", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                  this.$router.push({
                    path: "/",
                    name: "home",
                    query: {}
                  });
                })
                .catch(() => {});
            }
          }
        });
      }
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.$router.go(0);
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

.body-container {
  padding: 100px 150px;
  .left {
    text-align: left;
    .head {
      width: 100%;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    div:nth-of-type(1) {
      font-size: 16px;
      margin: 15px auto;
    }
    div:nth-of-type(2) {
      margin-bottom: 20px;
      font-size: 12px;
      width: 140px;
      i {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
    .gou,
    .back {
      font-size: 12px;
      img {
        width: 20px;
        vertical-align: middle;
        margin: auto 5px;
      }
    }
  }

  .right {
    ::v-deep .el-form-item__content {
      width: 200px !important;
      margin-right: 10px;
    }
    ::v-deep .el-form-item__label {
      padding: 0;
    }
    ::v-deep .el-radio-group {
      margin: 10px auto;
    }
  }
}
</style>

<style lang="scss">
</style>

