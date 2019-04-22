
let foo = 'bar'

function add (x,y) {
    return x + y
}

//想让 a.js 使用 add 该成员,需要使用 exports 导出
//exports.add = add

//当 b.js 只用导出一个方法时,不用导出其他东西可以使用 module.exports
module.exports = add



//exports 和 module.exports 的区别
//1  首页在 node 底层 会有一句话  exports = module.exports
//     所以 exports.foo 和 module.exports.foo 是一样的
//     exports === module.exports 为 true
//2  在代码的最后会有一句  return module.exports
//      也就是说当我们在中间给 exports 重新赋值时没有用,因为重新赋值后会导致 exports 的引用和 module.exports 的引用分开,导致不是指向的同一个对象

// var dx = {}
// var dx1 = dx
// dx1.foo = 'bar'
// console.log(dx.foo) //bar
// console.log(dx1.foo) //bar
// dx.foo = 'hello'
// console.log(dx1.foo) //hello
// console.log(dx.foo) //hello
// dx1 = {}
// dx1.foo = 'world'
// console.log(dx.foo) //hello
// console.log(dx1.foo) //world
