
let http = require('http')
let fs = require('fs')

let server = http.createServer()

let wwwDir = 'E:/www'
server.on('request',(req,res)=>{
    let url = req.url
    
    let filePath = '/index.html'
    if(url !== '/'){
        filePath = url
    }

    //console.log(filePath, wwwDir + filePath)

    fs.readFile(wwwDir + filePath, (err,data)=>{
        if(err){
            return res.end('404 Not Found')
        }
        res.end(data)
    })
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})