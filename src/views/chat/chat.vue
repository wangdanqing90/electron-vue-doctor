<template>
<div>
	<div class="sidebar">
      <mycard></mycard>
    </div>
</div>

	
</template>

<script>

import mycard from '../../components/mycard/mycard'
import { mapActions } from 'vuex'

export default {
   components: {
	mycard
   }
}
</script>

<style lang="stylus" scoped>
.content
  display: flex
  width: 800px
  .msglist
    width: 250px
    background: rgb(230,230,230)
  .chatbox
    flex: 1
</style>
