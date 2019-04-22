
//npm init 初始化项目,生成 package.json 文件
//npm install express --save

//node框架 express
let express = require('express')

//创建服务器应用程序,也就是原来的 http.createServer
let app = express()

//公开指定目录,可以通过 /static/xx 的方式访问 static 目录中的所有资源
//app.use(express.static('./static')) 当省略第一个参数时,则可以通过省略 /static 的方式来访问
app.use('/static/',express.static('./static'))

//当服务器收到 get 请求 / 的时候,执行回调处理函数
app.get('/',(req,res)=>{
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>hello Express 你好</h1>
    </body>
    </html>
    `)
})

//当服务器收到 get 请求 /about 的时候,执行回调处理函数
app.get('/about',(req,res)=>{
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.end('hello about 关于')
})

app.listen(9000,()=>{
    console.log('app is runing at port 9000')
})