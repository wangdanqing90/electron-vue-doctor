
//import hello from '@/api/hello'

export function demo() {
  const path = require('path')
  console.log(__filename)
  console.log(__dirname)

  var addon = require(path.join(__dirname, '/hello'))
  // console.log(addon.hello()); // 'world'
  alert(addon.hello())

}


