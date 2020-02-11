<template>
  <div class="container">
    <Header :leftImg="leftImg" :title="title">
      <template v-slot:right>
        <div class="header-right-div display_flex justify-content_flex-center align-items_center">
          <img src="@/../images/back.png" @click="backClick" />
        </div>
      </template>
    </Header>
    <el-row>
      <el-col :span="24" class="margin-top-50">
        <div class="form-container">
          <el-card class="box-card">
            <el-form :model="formLabelAlign" ref="formLabelAlign" status-icon :rules="rules">
              <div v-if="step == 1">
                <el-form-item label="所属医院：" label-width="100px" prop="hosipital" >
                  <el-select v-model="formLabelAlign.hosipital" filterable  placeholder="请选择医院" value-key="id"  @change="initdepartment">
                    <el-option
                       v-for="item in hosipitalsData"
                    :key="item.name"
                    :label="item.name"
                    :value="item"
                    :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属科室：" label-width="100px" prop="department">
                  <el-select v-model="formLabelAlign.department" placeholder="请选择科室">
                    <el-option
                      v-for="item in departmentsData"
                    :key="item.name"
                    :label="item.name"
                    :value="item"
                    :id="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工号：" label-width="100px" prop="jobnumber">
                  <el-input placeholder="请输入工号" v-model="formLabelAlign.jobnumber"></el-input>
                </el-form-item>
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="姓名：" label-width="100px" prop="name">
                  <el-input placeholder="请输入姓名" v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号：" label-width="100px" prop="phone">
                  <el-input placeholder="请输入手机号" v-model="formLabelAlign.phone"></el-input>
                  <el-link :underline="false" v-show="verShow" @click="handleClick()">发送验证码</el-link>
                  <el-link :underline="false" v-show="!verShow">
                    <span>{{timer}}</span>秒后重新获取
                  </el-link>
                </el-form-item>
                <el-form-item label="验证码：" label-width="100px" prop="verificationCode">
                  <el-input placeholder="请输入验证码" v-model="formLabelAlign.verificationCode"></el-input>
                </el-form-item>
                <el-form-item label="密码：" label-width="100px" prop="password">
                  <el-input placeholder="请输入密码" show-password v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop="confirmPassword">
                  <el-input placeholder="请确认密码" show-password v-model="formLabelAlign.confirmPassword"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="margin-top-50">
                <el-button class="purple" @click="nextClick()">{{buttonTxt}}</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import { apiHospitallist,apiDepartment,apiPhoneCode,apiRegister } from '@/request/api.js';


export default {
  name: "register",
  components: {
    Header
  },

  data() {
    return {
      title: "医生注册信息填写",
      buttonTxt: "",
      leftImg: "",
      step: "",
      verShow: true,
      timer: 60,
      formLabelAlign: {
        name: "",
        phone: "",
        verificationCode: "",
        password: "",
        confirmPassword: "",
        hosipital:'',
        department:'',
        jobnumber:''
      },
      hosipitalsData: [],
      departmentsData: [],
      rules: {
        hosipital: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        jobnumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }, {
        min: 8,
        max: 16,
        message: '长度在 8 到 16 个字符'
    }, {
        pattern: /^(\w){8,16}$/,
        message: '只能输入8-16个字母、数字、下划线'
    }],confirmPassword: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
    }, {
        min: 8,
        max: 16,
        message: '长度在 8 到 16 个字符'
    }, {
        pattern: /^(\w){8,16}$/,
        message: '只能输入8-16个字母、数字、下划线'
    }]
      }
    };
  },
  created() {
    window.vue=this;
    this.leftImg = require("../../../images/logo.png");
    this.step = this.$route.query.step;
    console.log("step == " + this.step);

    this.initHosipital(); 
  },
  methods: {
     initHosipital(){
      apiHospitallist().then(res => {   
        this.hosipitalsData  =res.data;              
      })      
    }, 
    initdepartment(item){
      this.formLabelAlign.department = '';
      var params={
        'hospitalid':item.id
      }
      apiDepartment(params).then(res => {   
        this.departmentsData =   res.data          
      }) 
    
    },   
    //点击获取短信验证码
    handleClick() {
      var params={
          'phone':this.formLabelAlign.phone.trim()
        }
        //获取短信验证码
      apiPhoneCode(params).then(res => {   
        if(res.data.status =='T'){ 
          this.handleClickCallback();     
        }else{
          this.$message({
          message: res.data.msg,
          type: 'warning'
        });
        }
        })       
    },
    
    handleClickCallback(){
       this.verShow = false;
      this.timer = 60;
      clearInterval(this.auth_timer);
      this.auth_timer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.verShow = true;
          clearInterval(this.auth_timer);
        }
      }, 1000);

    },
    
    nextClick() {
      this.$refs["formLabelAlign"].validate(valid => {
          if (valid) {
                  if (this.step == 1) {
        this.step = 2;
      } else {
          this.register();
      }

          }
      })
    },
    register(){
        var params={          
          'hospitalid':this.formLabelAlign.hosipital.id,
          'department':this.formLabelAlign.department.id,
          'jobnumber':this.formLabelAlign.jobnumber.trim(),
          'phone':this.formLabelAlign.phone.trim(),
          'name':this.formLabelAlign.name.trim(),
          'code':this.formLabelAlign.verificationCode.trim(),
          'password':this.formLabelAlign.password.trim(),
        }
        apiRegister(params).then(res => {                 
               this.registerCallback(res.message)                     
        })
    }, 
    registerCallback(message){
       if (message=="success") {
          this.$router.push({
            path: "/result",
            name: "result",
            query: { type: "success", message: "注册成功！" }
          });
        } else {
          this.$router.push({
            path: "/result",
            name: "result",
            query: { type: "fail", message: "注册失败！", failReason: message }
          });
        }

    },
    backClick() {
      if (this.step == 2) {
        this.step = 1;
      } else {
        this.$router.go(-1); //返回上一层
      }
    }
  },
  watch: {
    step(newVal, oldVal) {
      if (newVal == 1) {
        this.title = "医生注册信息填写";
        this.buttonTxt = "下一步";
      } else if (newVal == 2) {
        this.title = "医生注册详细信息填写";
        this.buttonTxt = "确认";
      }
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .header-middle {
  color: $purpleFontColor;
}

.header-right-div {
  img {
    width: 60px;
  }
}

.form-container {
  width: 800px;
  margin: 0 auto;
  .el-form {
    width: 432px;
    margin: 70px auto;
    .title {
      font-size: 18px;
    }
    .el-input,
    .el-select {
      width: 230px;
      float: left;
    }
    .el-button {
      width: 230px;
    }
    .el-link {
      float: right;
      color: $purpleFontColor;
    }
  }
}
</style>
