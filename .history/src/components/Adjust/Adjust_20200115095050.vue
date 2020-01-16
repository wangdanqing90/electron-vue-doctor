//调节器组件
<template>
  <div class="adjust" :style="{width:width}">
    <div class="top">
      <img :src="selectedImg" />
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
    width: { String, default: "210px" }
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
  methods: {}
};
</script>

<style scoped lang="scss">
.adjust {
  padding: 50px 20px;
  img {
    width: 40%;
  }
}
</style>
