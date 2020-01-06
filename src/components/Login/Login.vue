<template>
  <div>
    <Header :leftImg="leftImg"></Header>
    <el-row>
      <el-col :span="24">
        <div>main</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "@/components/Header/Header.vue";

export default {
  name: "Login",
  components: {
    Header
  },
  props: {
    msg: String
  },

  data() {
    return {
      leftImg: ""
    };
  },
  beforeCreate() {},
  created() {
    this.leftImg = require("../../../images/logo.png");
  },
  beforeDestroy() {},
  beforeMount() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
