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
              </div>
              <div v-else-if="step == 2">
                <el-form-item label="新密码：" label-width="100px" prop="newPassword">
                  <el-input placeholder="请输入新密码" show-password v-model="formLabelAlign.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认密码：" label-width="100px" prop="confirmPassword">
                  <el-input placeholder="请确认密码" show-password v-model="formLabelAlign.confirmPassword"></el-input>
                </el-form-item>
              </div>

              <el-form-item class="margin-top-70">
                <el-button class="purple" @click="nextClick()">下一步</el-button>
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
import { apiPhoneCode,apiVerifyCode,apiModifypassword } from '@/request/api.js';

export default {
  name: "forgetPassword",
  components: {
    Header
  },

  data() {
    return {
      title: "用户密码重置",
      leftImg: "",
      step: "",
      timer: 60,
      verShow: true,
      auth_timer: "",
      formLabelAlign: {
        phone: "",
        verificationCode: "",
        newPassword: "",
        confirmPassword: ""
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        verificationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        newPassword: [{
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
    this.leftImg = require("../../../images/logo.png");
    this.step = this.$route.query.step;
    console.log("step == " + this.step);
  },
  methods: {
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
      if (this.step == 1) {       
        this.$refs["formLabelAlign"].validate(valid => {
          if (valid) {
            //验证短信验证码
            var params={
          'phone':this.formLabelAlign.phone.trim(),
          'code':this.formLabelAlign.verificationCode.trim()
        }
             apiVerifyCode(params).then(res => {    
               if(res.data.status =='T'){
                  this.nextClickCallback(); 
               } else{
                  this.$message({
                     message: res.data.msg,
                     type: 'warning'
                  });

               }             
        })   
          }
        });
      } else {
        this.$refs["formLabelAlign"].validate(valid => {
          if (valid) {
            if(this.formLabelAlign.newPassword == this.formLabelAlign.confirmPassword){
                             //修改密码
             var params={
          'phone':this.formLabelAlign.phone.trim(),
          'code':this.formLabelAlign.verificationCode.trim(),
           'password':this.formLabelAlign.newPassword.trim()
        }
              apiModifypassword(params).then(res => {               
                this.nextPage(res.data.status,res.data.msg);       
        })  
            }else{
                this.$message({
                     message: '密码输入不一致',
                     type: 'warning'
                  });
            }

          }
        });
      }
    },
    nextClickCallback(){
      this.step = 2;
      this.verShow = true;
      clearInterval(this.auth_timer);
    },
    nextPage(status,msg){
            if (status == 'T') {
              this.$router.push({
                path: "/result",
                name: "result",
                query: { type: "success", message: "重设成功！" }
              });
            } else {
              this.$router.push({
                path: "/result",
                name: "result",
                query: {
                  type: "fail",
                  message: "重设失败！",
                  failReason: msg
                }
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
      // if (newVal == 1) {
      //   this.title = "用户密码找回";
      // } else if (newVal == 2) {
      //   this.title = "用户密码重置";
      // }
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
    .el-input {
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
