// 调节组件
<template>
  <div class="adjust">
    <img class="adjustLeft" src="@/../images/add_1.png" />
    <img class="adjustMiddle" :src="this.imgArry[0]" />
    <img class="adjustRight" src="@/../images/add_1.png" />
    <div class="inform">
      <span>减重:</span>15kg
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
    }
    disable:{
         type: Boolean,
      default: "purpleFontColor"
    }
  },

  data() {
    return {
      addDisableImg: require("@/../images/add_3.png"),
      addImg: "",
      imgArry: []
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
    }
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
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
    left: 54px;
    span {
      color: black;
    }
  }
}
</style>
