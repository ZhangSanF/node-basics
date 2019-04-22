
//require('./b')

//console.log(foo)
//foo is not defined  导入 b.js 模块后不能直接使用 b.js 内的成员

//使用变量接收 b.js 内导出的 add 方法
let fooExports = require('./b')

//console.log(fooExports.add)

//当 b.js 只用导出 add 方法时,这时接收的就是 add 这个方法
console.log(fooExports)