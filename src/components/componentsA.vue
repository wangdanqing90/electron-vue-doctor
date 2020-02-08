<template>
<div class="store">
  <p>
    {{$store.state.count}}
  </p>
  <el-button @click="handleIncrement"><strong>+</strong></el-button>
  <el-button @click="handleDecrement"><strong>-</strong></el-button>
  <hr>
  <h3>{{$store.state.show}}</h3>
  <el-input
    placeholder="请输入内容"
    v-model="obj"
    @change="changObj"
    clearable>
  </el-input>
</div>
</template>
<script>
export default {
  data () {
    return {
      obj: ''
    }
  },
  methods: {
    handleIncrement () {
      this.$store.commit('increment')
    },
    handleDecrement () {
      this.$store.commit('decrement')
    },
    changObj () {
      this.$store.commit('changTxt', this.obj)
    }
  }
}
</script>