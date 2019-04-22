
require('./a')

//优先从缓存加载
//由于在 a 中已经加载过 b 了,所以这里不会重复加载,只会拿到其中的接口对象,这样做的目的是为了避免重复加载,提高模块加载效率
let fn = require('./b')
console.log(fn)