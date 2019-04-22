
let http = require('http')

let server = http.createServer()

server.on('request',(req,res)=>{

    let url = req.url
    //http://tool.oschina.net/commons   content-type对照表
    if(url === '/plain'){
        //text/plain就是普通文本
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.end('hello 世界')
    }else if(url === '/html'){
        //text/html就是html
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end('<p>hello html <a href="">点我</a></p>')
    }
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})