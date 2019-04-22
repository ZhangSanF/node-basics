
let fs = require('fs')

//在文件操作的相对路径中 ./可以省略
//    ./data/a.txt   相当于当前目录
//    data/a.txt     相当于当前目录
//    /data/a.txt    绝对路径,当前文件模块所处磁盘根目录
//    c:/xx/xx...    绝对路径
fs.readFile('./data/a.txt',(err,data)=>{
    if (err) {
        console.log(err)
        return console.log('读取失败')
    }
    console.log(data.toString())
})

//在模块加载中,相对路径中的 ./不能省略
//    ./data/foo   相当于当前目录
//    /data/foo    磁盘根目录
require('./data/foo')('hello world')