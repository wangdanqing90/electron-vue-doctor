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
    <el-card class="box-card">
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
            <div class="gou" v-if="type!='doctor'">
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
                  <el-radio :label="1" v-model="formLabelAlign.sex"  value="1">男</el-radio>
                  <el-radio :label="0" v-model="formLabelAlign.sex" value="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄" prop="age">
                <el-input v-model="formLabelAlign.age" placeholder="请输入年龄"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="IDNumber">
                <el-input v-model="formLabelAlign.IDNumber" placeholder="请输入身份证号"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="jobNumber" v-if="type=='doctor'">
                <el-input v-model="formLabelAlign.jobNumber" placeholder="请输入工号"></el-input>
              </el-form-item>
              <el-form-item label="手机号"  prop="phone" >
                <el-input v-model="formLabelAlign.phone" placeholder="请输入手机号" :disabled="type != 'patient'"></el-input>
              </el-form-item>
              <el-form-item label="所属医院" prop="hospital">
                  <el-select v-model="formLabelAlign.hospital" filterable  placeholder="请选择医院" value-key="id"  @change="initdepartment"  :disabled="type == 'patient'" >
                    <el-option
                       v-for="item in hospitalsData"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                    :id="item.id"
                    ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="所属科室" prop="department">
                <el-select v-model="formLabelAlign.department" placeholder="请选择所属科室" value-key="id" @change="initdoctor" :disabled="type == 'patient'">
                  <el-option
                    v-for="item in departmentsData"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                    :id="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="办公电话" prop="officePhone" v-if="type=='doctor'">
                <el-input v-model="formLabelAlign.officePhone" placeholder="请输入办公电话"></el-input>
              </el-form-item>
            
              <el-form-item label="邮箱" prop="email" v-if="type=='doctor'">
                <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
              </el-form-item>

            
              <el-form-item label="所属医生" prop="department">
                <el-select v-model="formLabelAlign.doctor" placeholder="请选择所属医生" value-key="id"  v-if="type=='patientModify'||type=='patient'||type=='examine'"  :disabled="type == 'patient'">
                  <el-option
                    v-for="item in doctorsData"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                    :id="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

                <!-- <el-form-item
                label="所属医生"
                prop="doctor"
                v-if="type=='patientModify'||type=='patient'||type=='examine'" 
              >
                <el-input v-model="formLabelAlign.doctor" placeholder="请输入所属医生"  :disabled="type == 'patient'"></el-input>
              </el-form-item> -->
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
                <el-input v-model="formLabelAlign.weight" placeholder="请输入体重"></el-input>
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
                  <el-radio :label="1" v-model="formLabelAlign.hemiplegiaSide" value="1">左</el-radio>
                  <el-radio :label="0" v-model="formLabelAlign.hemiplegiaSide" value="0">右</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template> 

<script>
import HeaderDoctor from "@/components/HeaderDoctor/HeaderDoctor.vue";
import { apiHospitallist,apiDepartment,apiDoctorinfo,apichangeDoctorinfo,apigetUserInfo,apiGetPatientinfo,apiAddPatientinfo,apiChangePatientinfo,apiDoctorlist } from '@/request/api.js';

export default {
  name: "home",
  components: {
    HeaderDoctor
  },

  data() {
    return {
      leftImg: "",
      title: "",
      titleName: this.$store.state.patientInfo.name,
      type: "", // doctor：医生，patientModify：患者修改，patient：患者新增，examine:患者审核
      imgsrc: require("@/../images/doctor.png"),
      patientid:'',
      hospitalsData: [],
      departmentsData: [],
      doctorsData: [],
      formLabelAlign: {
        name: "",
        sex: "",
        age: "",
        password: "",
        IDNumber: "",
        hospital: "",
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
        IDNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        hospital: [
          { required: true, message: "请选择医院", trigger: "change" }
        ],
        department: [
          { required: true, message: "请选择科室", trigger: "change" }
        ],
        jobNumber: [
          { required: true, message: "请选择工号", trigger: "change" }
        ],
        doctor: [{ required: true, message: "请选择所属医生", trigger: "change" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      doctorinfo:[]
    };
  },
  created() {
    window.vue=this;
    this.leftImg = require("../../../images/logo.png");
    this.type = this.$route.query.type;
    console.log(this.type);
    if (this.type == "doctor") {
      //医生
      this.title = "编辑我的基本信息";
      this.initDoctorinfo();
      this.inithospital(); 
    } else if (this.type == "patient") {
      //新建病人
      this.title = "请您填写患者信息";
      this.titleName = "您好，";
      this.initNewPatient();
      this.inithospital(); 
    } else if (this.type == "patientModify") {
      //修改病人
      this.title = "的基本信息";
      this.patientid=this.$store.state.patientInfo.id;
      this.initOldPatient();
      this.inithospital();
    }
  },
  
  methods: {
    //获取医生信息
    initDoctorinfo(){
       apiDoctorinfo().then(res => {    
         this.doctorinfo = res.data;
         this.formLabelAlign.age=res.data.age;
         this.formLabelAlign.email=res.data.email;
         this.formLabelAlign.IDNumber=res.data.identitycard;
         this.formLabelAlign.jobNumber=res.data.jobnumber;
         this.formLabelAlign.name=res.data.name;
         this.formLabelAlign.officePhone=res.data.officephone;
         this.formLabelAlign.phone=res.data.phone;
         this.formLabelAlign.sex=res.data.sex;
         this.formLabelAlign.hospital={
           'id':res.data.hospitalid,
           'name':res.data.hospital
         };
         this.formLabelAlign.department={
           'id':res.data.departmentid,
           'name':res.data.department
         }

      //初始化科室下拉框
      var params={'hospitalid':res.data.hospitalid}
      this.updatadepartment(params)
      })  
    },
    //删除患者信息
    deleteClick() {

    },
    backClick() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    inithospital(){
      apiHospitallist().then(res => {   
        this.hospitalsData  =res.data;              
      })      
    }, 
    //选择医院调用
    initdepartment(item){
      this.formLabelAlign.department = '';
      this.formLabelAlign.doctor = '';
      this.doctorsData=[];
      var params={
        'hospitalid':item.id
      }
      apiDepartment(params).then(res => {   
        this.departmentsData =   res.data          
      }) 
    }, 
    updatadepartment(params){
        apiDepartment(params).then(res => {   
        this.departmentsData =   res.data          
      }) 
      
    },
    //选择科室
    initdoctor(){
      this.formLabelAlign.doctor = '';
      var params={
         "hospitalid":this.formLabelAlign.hospital.id,
         "departmentid":this.formLabelAlign.department.id
      }
      console.log(this.formLabelAlign.hospital.id+'  '+this.formLabelAlign.department.id)
      apiDoctorlist(params).then(res => {   
        this.doctorsData =   res.data          
      }) 
    }, 
    updatadoctor(){
       var params={
         "hospitalid":this.formLabelAlign.hospital.id,
         "departmentid":this.formLabelAlign.department.id
       }
        apiDoctorlist(params).then(res => {   
        this.doctorsData =   res.data          
      }) 
    },

    initNewPatient(){
       apiDoctorinfo().then(res => {    
         this.formLabelAlign.doctor=res.data.name;  
         this.formLabelAlign.hospital={
           'id':res.data.hospitalid,
           'name':res.data.hospital
         };
         this.formLabelAlign.department={
           'id':res.data.departmentid,
           'name':res.data.department
         }
      //初始化科室下拉框
       var params={'hospitalid':res.data.hospitalid}
      this.updatadepartment(params)
      })  
    },
    //获取以前的患者信息
    initOldPatient(){
      var params={
        'patientid':this.patientid
      }
      apiGetPatientinfo(params).then(res => { 
         this.formLabelAlign.age=res.data.age;
         this.formLabelAlign.height=res.data.height;
         this.formLabelAlign.weight=res.data.weight;
         this.formLabelAlign.inform=res.data.contactinfo;
         this.formLabelAlign.IDNumber=res.data.identitycard;
         this.formLabelAlign.name=res.data.name;
         this.formLabelAlign.phone=res.data.phone;
         this.formLabelAlign.sex=res.data.sex;
         this.formLabelAlign.doctor = res.data.doctor;
         this.formLabelAlign.PelvicHeight= res.data.pelv;
         this.formLabelAlign.hemiplegiaSide = res.data.hemi;
         this.formLabelAlign.lossWeight = res.data.loss;
         this.formLabelAlign.contactinfo= res.data.contactinfo;
         this.formLabelAlign.hospital={
           'id':res.data.hospitalid,
           'name':res.data.hospital
         };
         this.formLabelAlign.department={
           'id':res.data.departmentid,
           'name':res.data.department
         }
          this.formLabelAlign.doctor={
           'id':res.data.doctorid,
           'name':res.data.doctor
         }

      //初始化科室下拉框
       var params={'hospitalid':res.data.hospitalid}
      this.updatadepartment(params)
      this.updatadoctor()
      })  
    },
    // showResult() {
    //   this.$confirm("您已成功添加该患者", "", {
    //     confirmButtonText: "回工作台",
    //     cancelButtonText: "制定计划",
    //     confirmButtonClass: "el-button purple"
    //   })
    //     .then(() => {
    //       this.$router.push({
    //         path: "/",
    //         name: "home",
    //         query: {}
    //       });
    //     })
    //     .catch(() => {
    //       this.$router.push({
    //         path: "/",
    //         name: "home",
    //         query: {}
    //       });
    //     });
    // },
    examine() {
      this.$router.push({
        path: "/",
        name: "home",
        query: {}
      });
    },
    onSubmit(formName) {
      let _this = this;
      //examine:患者审核
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
            //修改医生信息
            if (this.type == "doctor") {
              this.$confirm("您是否确认修改？", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                  this.changeDoctor();
                })
                .catch(() => {});
            }
            //patient：患者新增 
            else if (this.type == "patient") {
              this.$confirm("您是否添加该患者？", "", {
                confirmButtonText: "确认添加",
                cancelButtonText: "暂不添加",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                  _this.addPatient();
                })
                .catch(() => {});
            }
            //患者修改 
            else if (this.type == "patientModify") {
              this.$confirm("您是否确认修改？", "", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonClass: "el-button purple"
              })
                .then(() => {
                   _this.changePatient();
                 
                })
                .catch(() => {});
            }
          }
        });
      }
    },
    changeDoctor(){
    var params={
         'password':this.formLabelAlign.password,
         'sex':this.formLabelAlign.sex,
         'age': this.formLabelAlign.age,
         'name':this.formLabelAlign.name,
         'identitycard':this.formLabelAlign.IDNumber,
         'email':this.formLabelAlign.email,
         'jobnumber':this.formLabelAlign.jobNumber,
         'officephone':this.formLabelAlign.officePhone,
         "hospitalid":this.formLabelAlign.hospital.id,
         "departmentid":this.formLabelAlign.department.id
      }
    apichangeDoctorinfo(params).then(res => {    
      this.getUserInfo();  
      this.$alert('修改成功', '', {
          confirmButtonText: '确定',
          callback: action => {
            this.getUserInfo();
            this.changeDoctorCallback();
          }
        });
    })  
    
  },
  changeDoctorCallback(){
     this.$router.push({
                    path: "/",
                    name: "home",
                    query: {}
                  });
    
  },
  //更新vuex医生信息
   getUserInfo(){
      apigetUserInfo(this.$store.state.token).then(res => {               
            this.$store.commit('saveUserInfo',res.data); 
        })        
    },
    //新增患者
  addPatient(){
     var params={
        'name':this.formLabelAlign.name,
        'sex'	:this.formLabelAlign.sex,
        'age'	:this.formLabelAlign.age,
        'phone'	:this.formLabelAlign.phone,
        'password':this.formLabelAlign.password,	
        'identifycard'	:this.formLabelAlign.IDNumber,
        'height'	:this.formLabelAlign.height,
        'weight'	:this.formLabelAlign.weight,
        'contactinfo'	:this.formLabelAlign.inform,
        'pelv':this.formLabelAlign.PelvicHeight,//	骨盆高度
        'loss':this.formLabelAlign.lossWeight,//	减重
        'hemi':this.formLabelAlign.hemiplegiaSide,//	偏瘫
      }
    apiAddPatientinfo(params).then(res => {    
        this.$alert('新增成功', '', {
          confirmButtonText: '确定',
          showClose:false,
          callback: action => {
            this.changeDoctorCallback();
          }
        });
    })  
  },
   //修改患者
  changePatient(){
     var params={
        'patientid':this.patientid,
        'name':this.formLabelAlign.name,
        'sex'	:this.formLabelAlign.sex,
        'age'	:this.formLabelAlign.age,
        'phone'	:this.formLabelAlign.phone,
        'password':this.formLabelAlign.password,	
        'identifycard'	:this.formLabelAlign.IDNumber,
        'height'	:this.formLabelAlign.height,
        'weight'	:this.formLabelAlign.weight,
        'contactinfo'	:this.formLabelAlign.inform,
        'pelv':this.formLabelAlign.PelvicHeight,//	骨盆高度
        'loss':this.formLabelAlign.lossWeight,//	减重
        'hemi':this.formLabelAlign.hemiplegiaSide,//	偏瘫
        "hospitalid":this.formLabelAlign.hospital.id,
         "departmentid":this.formLabelAlign.department.id,
         "doctorid":this.formLabelAlign.doctor.id
      }
      debugger;
    apiChangePatientinfo(params).then(res => {    
        this.$alert('修改成功', '', {
          confirmButtonText: '确定',
          showClose:false,
          callback: action => {
            this.changeDoctorCallback();
          }
        });
    })  
  },
   //删除患者
  removePatient(){
    var params={
    }
    apichangeDoctorinfo(params).then(res => {    
        this.$alert('删除成功', '', {
          confirmButtonText: '确定',
          showClose:false,
          callback: action => {
            this.changeDoctorCallback();
          }
        });
    })  
  },
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
  padding: 100px 110px;
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

