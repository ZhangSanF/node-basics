
let http = require('http')
let fs = require('fs')

let server = http.createServer()

server.on('request',(req,res)=>{
    let url = req.url
    if(url === '/'){
        
        //res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body><h1>hello</h1></body></html>')
        
        fs.readFile('./resource/index.html',(err,data)=>{
            if(err){
                res.setHeader('Content-type','text/plain;charset=utf-8')
                res.end('文件读取失败')
            }else{
                res.setHeader('Content-type','text/html;charset=utf-8')
                res.end(data)
            }
        })
    }else if(url === '/img'){
        fs.readFile('./resource/14.jpg',(err,data)=>{
            if(err){
                res.setHeader('Content-type','text/plain;charset=utf-8')
                res.end('文件读取失败')
            }else{
                res.setHeader('Content-type','image/jpeg')
                res.end(data)
            }
        })
    }
    
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})