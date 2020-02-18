// 调节组件
<template>
  <div class="adjust">
    <img
      class="adjustLeft"
      :src="this.disable?this.reduceDisableImg:this.reduceImg"
      @click="reduceClick"
    />
    <img class="adjustMiddle" :src="this.imgSrc" />
    <img class="adjustRight" :src="this.disable?this.addDisableImg:this.addImg" @click="addClick" />
    <div class="inform">
      <span>{{adjust.name}}:</span>
      {{adjust.total*this.adjust.step}} {{adjust.unit}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    adjust: {
      type: Object,
      default: () => {}
    },
    fontColor: {
      type: String,
      default: "purpleFontColor"
    },
    disable: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      reduceDisableImg: require("@/../images/subtract_3.png"),
      reduceImg: "",
      addDisableImg: require("@/../images/add_3.png"),
      addImg: "",
      imgArry: [],
      imgSrc: ""
    };
  },

  created() {
    if (this.fontColor == "purpleFontColor") {
      this.reduceImg = require("@/../images/subtract_1.png");
      this.addImg = require("@/../images/add_1.png");
      this.imgArry = [
        require("@/../images/blue_0.png"),
        require("@/../images/blue_1.png"),
        require("@/../images/blue_2.png"),
        require("@/../images/blue_3.png"),
        require("@/../images/blue_4.png"),
        require("@/../images/blue_5.png")
      ];
      this.imgSrc = this.imgArry[this.adjust.total];
    } else if (this.fontColor == "pinkFontColor") {
      this.reduceImg = require("@/../images/subtract_2.png");
      this.addImg = require("@/../images/add_2.png");
      this.imgArry = [
        require("@/../images/blue_0.png"),
        require("@/../images/pink_1.png"),
        require("@/../images/pink_2.png"),
        require("@/../images/pink_3.png"),
        require("@/../images/pink_4.png"),
        require("@/../images/pink_5.png")
      ];
      this.imgSrc = this.imgArry[this.adjust.total];
    } else if (this.fontColor == "greenFontColor") {
      this.reduceImg = require("@/../images/subtract_01_1.png");
      this.addImg = require("@/../images/add_01_1.png");
      this.imgArry = [
        require("@/../images/blue_0.png"),
        require("@/../images/green_1.png"),
        require("@/../images/green_2.png"),
        require("@/../images/green_3.png"),
        require("@/../images/green_4.png"),
        require("@/../images/green_5.png")
      ];
      this.imgSrc = this.imgArry[this.adjust.total];
    }
  },
  methods: {
    reduceClick() {
      if (this.disable || this.adjust.total <= 0) return;
      this.adjust.total--;
    },
    addClick() {
      if (this.disable || this.adjust.total >= 5) return;
      this.adjust.total++;
    }
  },

  watch: {
    //监听total，变化修改三角图
    "adjust.total": {
      handler(val, oldVal) {
        this.imgSrc = this.imgArry[this.adjust.total];
      }
    }
  }
};
</script>

<style scoped lang="scss">
.adjust {
  position: relative;
  padding: 20px 0;
  .adjustLeft,
  .adjustRight {
    width: 20px;
  }
  .adjustMiddle {
    width: 100px;
    margin: 0 10px;
  }
  .inform {
    font-size: 12px;
    position: absolute;
    top: 10px;
    left: 37px;
    span {
      color: black;
    }
  }
}

//小控件样式
.small .adjust {
  position: relative;
  padding: 20px 0;
  .adjustLeft,
  .adjustRight {
    width: 15px;
  }
  .adjustMiddle {
    width: 70px;
    margin: 0 10px;
  }
  .inform {
    font-size: 12px;
    position: absolute;
    top: 5px;
    left: 30px;
    span {
      color: black;
    }
  }
}
</style>
