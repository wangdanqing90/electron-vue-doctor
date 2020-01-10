<template>
  <div class="container">
    <HeaderDoctor :leftImg="leftImg" :title="title" :titleName="titleName">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/certain.png" @click="onSubmit('formLabelAlign')" />
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
          <div class="back">
            返回请点击
            <img src="@/../images/back.png" />键。
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="right">
          <el-form
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
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
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
            <el-form-item label="工号" prop="jobNumber">
              <el-select v-model="formLabelAlign.jobNumber" placeholder="请选择工号">
                <el-option
                  v-for="item in jobNumbersData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="办公电话" prop="officePhone">
              <el-input v-model="formLabelAlign.officePhone" placeholder="请输入办公电话"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <el-dialog title :visible.sync="okDialogVisible" width="30%">
      <span class="purple">您是否确认修改？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="leaveDialogVisible = false">取 消</el-button>
        <el-button class="purple" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
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
      type: "",
      okDialogVisible: false,
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
        email: ""
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
        officePhone: [
          { required: true, message: "请输入办公电话", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入ID", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      }
    };
  },
  created() {
    this.leftImg = require("../../../images/logo.png");
    this.type = this.$route.query.type;
    console.log(this.type);
    if (this.type == "doctor") {
      this.title = "编辑我的基本信息";
    } else if (this.type == "patient") {
      this.title = "请您填写患者信息";
      this.titleName = "您好，";
    }
  },
  methods: {
    backClick() {
      this.okDialogVisible = true;
    },
    okClick() {},
    confirmClick() {
      this.okDialogVisible = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          if (this.type == "doctor") {
            this.$router.push({
              path: "/",
              name: "home",
              query: {}
            });
          } else {
            this.$router.push({
              path: "/",
              name: "home",
              query: {}
            });
          }
        }
      });
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

