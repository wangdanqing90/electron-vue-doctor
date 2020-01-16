// 调节组件
<template>
  <div class="adjust">
    <img class="adjustLeft" :src="this.disable?this.addDisableImg:this.addImg" @click="reduceClick" />
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
      addDisableImg: require("@/../images/add_3.png"),
      addImg: "",
      imgArry: [],
      imgSrc: ""
    };
  },

  created() {
    console.log(this.adjust);
    if (this.fontColor == "purpleFontColor") {
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
    }
  },
  methods: {
    reduceClick() {
      if (this.disable || this.adjust.total <= 0) return;
      this.adjust.total--;
      console.log(this.adjust.total);
    },
    addClick() {
      if (this.disable || this.adjust.total >= 5) return;
      this.adjust.total++;
      console.log(this.adjust.total);
    }
  },
  watch: {
    total(newName, oldName) {
      console.log("newName" + newName);
      this.imgSrc = this.imgArry[this.adjust.total];
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
</style>
