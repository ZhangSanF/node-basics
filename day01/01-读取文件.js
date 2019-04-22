
let fs = require('fs')

fs.readFile('./data/hello.text',(error,data)=>{
    //console.log(data.toString())

    if(error){
        console.log('读取文件失败')
    }else{
        console.log(data.toString())
    }
})