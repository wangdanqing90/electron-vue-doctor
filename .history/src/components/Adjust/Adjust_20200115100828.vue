//调节器组件
<template>
  <div :class="active?colorClass:''" :style="{width:width}">
    <div class="top" @click="select">
      <img :src=" active?selectedImg:unselectedImg" />
      <div>{{title}}</div>
    </div>

    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "Adjust",
  props: {
    selectedImg: {
      type: String,
      default: ""
    },
    unselectedImg: {
      type: String,
      default: ""
    },
    title: { String, default: "" },
    width: { String, default: "210px" },
    active: { Boolean, default: false }
  },

  data() {
    return {
      leftImg: require(this.selectedImg)
    };
  },

  created() {},
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {
    select() {}
  }
};
</script>

<style scoped lang="scss">
.adjust {
  padding: 50px 20px;
  font-size: 20px;
  img {
    width: 40%;
  }
}
</style>
