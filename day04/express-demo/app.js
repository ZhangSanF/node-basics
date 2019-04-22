
//修改完代码自动重启服务器,第三方工具 npm install nodemon -g
//使用:之前是 node app.js 
//     现在是 nodemon app.js

let express = require('express')

let app = express()

app.get('/',(req,res)=>{

    //res.end('你好')
    res.send('你好')
})

app.listen(9000,()=>{
    console.log('express app is running ...')
})