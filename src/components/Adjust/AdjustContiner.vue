// 调节组件
<template>
  <div class="adjust-container" :class="disable?'':config.fontColor">
    <div
      class="top hand"
      :class="(type==8||type==9||type==10||type==11)?'small':''"
      @click="selectClick()"
    >
      <img :src="disable==true?config.imgsrcGray:config.imgsrc" />
      <div>{{config.title}}</div>
    </div>

    <!-- 下面的加减按钮 -->
    <div class="bottom" v-if="type!=6&&type!=7">
      <Adjust
        v-for="(item,index) in config.adjusts"
        :key="index"
        :disable="disable"
        :adjust="config.adjusts[index]"
        :fontColor="config.fontColor"
      ></Adjust>
      <div class="switch-continar" v-if="type==2">
        <div>
          <span>方向限定</span>
          <el-switch v-model="config.switch"  active-color="#8da1f2">></el-switch>
        </div>
        <div class="direction " :class="{'disable':config.switch}">
           <span
            :style="{color:(config.tabActive == 0) ? '#8da1f2':'black'}"
            @click="config.tabActive = 0"
          >全向</span>
           <span
            :style="{color:(config.tabActive == 1) ? '#8da1f2':'black'}"
            @click="config.tabActive = 1"
          >直行+后退</span>
          <span
            :style="{color:(config.tabActive == 2) ? '#8da1f2':'black'}"
            @click="config.tabActive = 2"
          >直行</span>        
        </div>
      </div>
    </div>
    <div v-else>
      <el-radio-group v-model="config.radio">
        <el-radio :label="0" text-color="#E6A23C" fill="#E6A23C">易</el-radio>
        <el-radio :label="1">中</el-radio>
        <el-radio :label="2">难</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import Adjust from "@/components/Adjust/Adjust.vue";
export default {
  name: "AdjustContiner",
  components: {
    Adjust
  },
  props: {
    type: {
      type: Number,
      default: 0
    },
    disable: {
      type: Boolean,
      default: true
    }, 
//     stepData: {
//       type: Object,
//       default: function () {
//         return {
// WFollowing_Speed:70,
// WInitiative_Force:5,
// WResistance_Force:5,
// WFollowing_FixedDistance:20,
// WInitiative_FixedDistance:20,
// WResistance_FixedDistance:20,
// WFollowing_Imponderability:10,
// WInitiative_Imponderability:10,
// WResistance_Imponderability:10,
// SFollowing_Count:10,
// SFollowing_Speed:70,
// SInitiative_Imponderability:10,
// SInitiative_Count:10,
// BFRT_Imponderability:10,
// BBoth_Imponderability:10,
// BLeft_Imponderability:10,
// BRight_Imponderability:10

//         }
//     }
//     }
  },

  data() {
    return {
      config: {},
      stepData: {
     
WFollowing_Speed:70,
WInitiative_Force:5,
WResistance_Force:5,
WFollowing_FixedDistance:20,
WInitiative_FixedDistance:20,
WResistance_FixedDistance:20,
WFollowing_Imponderability:10,
WInitiative_Imponderability:10,
WResistance_Imponderability:10,
SFollowing_Count:10,
SFollowing_Speed:70,
SInitiative_Imponderability:10,
SInitiative_Count:10,
BFRT_Imponderability:10,
BBoth_Imponderability:10,
BLeft_Imponderability:10,
BRight_Imponderability:10

    }
    };
  },

  created() {
    this.initData();
     console.log(this.stepData)
  },
  updated(){
    //console.log(this.stepData)
  },

  methods: {
    selectClick() {
      if (!this.disable) return;
      this.$emit("selectRightClick", this.type);
    },
   
    initData() {
      if (this.type === 1) {
        this.config = {
          title: "行走跟随模式",
          imgsrc: require("@/../images/followmode_1.png"),
          imgsrcGray: require("@/../images/followmode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.WFollowing_Imponderability,
              total: 0,
              unit: "KG"
            },
            {
              name: "定距",
              step: this.stepData.WFollowing_FixedDistance,
              total: 0,
              unit: "M"
            },
            {
              name: "速度",
              step: this.stepData.WFollowing_Speed,
              total: 0,
              unit: "MM/s"
            }
          ]
        };
      } else if (this.type === 2) {
        this.config = {
          title: "行走主动模式",
          imgsrc: require("@/../images/activemode_1.png"),
          imgsrcGray: require("@/../images/activemode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          switchswitch: true, //方向限定
          tabActive: 0, //方向
          adjusts: [
            {
              name: "减重",
              step: this.stepData.WInitiative_Imponderability,
              total: 0,
              unit: "KG"
            },
            {
              name: "阻力",
              step:  this.stepData.WInitiative_Force,
              total: 0,
              unit: "N"
            },
            {
              name: "定距",
              step: this.stepData.WInitiative_FixedDistance,
              total: 0,
              unit: "M"
            }
          ]
        };
      } else if (this.type === 3) {
        this.config = {
          title: "行走阻力模式",
          imgsrc: require("@/../images/resistancemode_1.png"),
          imgsrcGray: require("@/../images/resistancemode_2.png"),
          width: "120px",
          fontColor: "purpleFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.WResistance_Imponderability,
              total: 0,
              unit: "KG"
            },
            {
              name: "阻力",
              step: this.stepData.WResistance_Force,
              total: 0,
              unit: "N"
            },
            {
              name: "定距",
              step: this.stepData.WResistance_FixedDistance,
              total: 0,
              unit: "M"
            }
          ]
        };
      } else if (this.type === 4) {
        this.config = {
          title: "坐站跟随模式",
          imgsrc: require("@/../images/followmode_0.png"),
          imgsrcGray: require("@/../images/followmode_2.png"),
          width: "120px",
          fontColor: "pinkFontColor",
          adjusts: [
            {
              name: "速度",
              step: this.stepData.SFollowing_Speed,
              total: 0,
              unit: "MM/s"
            },
            {
              name: "计数",
              step: this.stepData.SFollowing_Count,
              total: 0,
              unit: "次"
            }
          ]
        };
      } else if (this.type === 5) {
        this.config = {
          title: "坐站主动模式",
          imgsrc: require("@/../images/activemode_0.png"),
          imgsrcGray: require("@/../images/activemode_2.png"),
          width: "120px",
          fontColor: "pinkFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.SInitiative_Imponderability,
              total: 0,
              unit: "KG"
            },
            {
              name: "计数",
              step: this.stepData.SInitiative_Count,
              total: 0,
              unit: "次"
            }
          ]
        };
      } else if (this.type === 6) {
        this.config = {
          title: "游戏七巧板",
          imgsrc: require("@/../images/Tangram_1.png"),
          imgsrcGray: require("@/../images/Tangram_2.png"),
          fontColor: "pinkFontColor",
          radio: 0
        };
      } else if (this.type === 7) {
        this.config = {
          title: "游戏太空飞行",
          imgsrc: require("@/../images/Spaceflight_1.png"),
          imgsrcGray: require("@/../images/Spaceflight_2.png"),
          fontColor: "greenFontColor",
          radio: 0
        };
      } else if (this.type === 8) {
        this.config = {
          title: "平衡左脚减重",
          imgsrc: require("@/../images/leftfoot_01.png"),
          imgsrcGray: require("@/../images/leftfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.BLeft_Imponderability,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 9) {
        this.config = {
          title: "平衡右脚减重",
          imgsrc: require("@/../images/rightfoot_01.png"),
          imgsrcGray: require("@/../images/rightfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.BRight_Imponderability,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 10) {
        this.config = {
          title: "平衡双脚减重",
          imgsrc: require("@/../images/bothfoot_01.png"),
          imgsrcGray: require("@/../images/bothfoot_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.BBoth_Imponderability,
              total: 0,
              unit: "KG"
            }
          ]
        };
      } else if (this.type === 11) {
        this.config = {
          title: "平衡FRT减重",
          imgsrc: require("@/../images/frtmode_01.png"),
          imgsrcGray: require("@/../images/frtmode_02.png"),
          width: "120px",
          fontColor: "greenFontColor",
          adjusts: [
            {
              name: "减重",
              step: this.stepData.BFRT_Imponderability,
              total: 0,
              unit: "KG"
            }
          ]
        };
      }
    }
  },
  computed: {
switch() {
return this.config.switch
}
},
  watch: {
   switch(newValue, oldValue) {
       if(newValue){
         this.config.tabActive=0;
       }
    }
  },
  stepData(newValue, oldValue){
    alert(newValue)
    console.log(newValue)

  }
};
</script>

<style scoped lang="scss">
.adjust-container.large {
  width: 178px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .bottom {
    position: relative;
  }

  .switch-continar {
    position: absolute;
    bottom: -35px;
    left: 0;
    color: black;
    font-size: 12px;
    .direction {
      margin-top: 10px;
      span {
        cursor: pointer;
        margin: 0 10px;
      }
    }
  }
}

//小控件样式
.adjust-container.small {
  width: 130px;
  padding: 20px 20px;
  .top {
    padding: 0 0 30px 0;
    font-size: 20px;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>

<style  lang="scss">
.adjust-container {
  .el-radio__label {
    position: absolute;
    left: 0;
    top: -20px;
    padding-left: 0;
  }
  .el-radio-group {
    margin-top: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .disable {
    pointer-events: none;
   }
}
</style>
          
          
         