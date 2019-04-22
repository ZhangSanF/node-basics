
let fs = require('fs')

fs.writeFile('./data/你好.md','大家好,我是Node.js',(error)=>{
    if(error){
        console.log('文件写入失败')
    }else{
        console.log('文件写入成功')
    }
})