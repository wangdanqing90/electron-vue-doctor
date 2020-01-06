<template>
  <div class="home">
    <Login msg="Welcome to Your Vue.js App1111111" />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login/Login.vue";
//import { demo } from '@/api/test'

export default {
  name: "home",
  components: {
    Login
  },

  data() {
    return {};
  },
  created() {
    //this.$hello.hi()
    //alert(addon.hello())
    //demo()
    //var fs = require('fs')
    //var path = './hello.node'
    //var path = require('path')
    /*
		fs.readFile(path,function(err,data){
			if(err){
				console.log(err);
			}else{
       // console.log(data.toString());	
        
			}
		});
*/
    //console.log(path.dirname(__filename) + '\\hello.node' )
    //var addon = require('bindings')('@/views/hello');
    //alert(addon.hello())
    //console.log(addon.hello()); // 'world'
  }
};
</script>
