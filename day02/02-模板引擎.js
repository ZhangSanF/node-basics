
//npm install art-template

// 服务端渲染和客户端渲染的区别
// 客户端渲染不利于 SEO 搜索引擎优化
// 服务端渲染是可以被爬虫抓取到的,客户端异步渲染是很难被爬虫抓取到的

//服务端渲染一般使用模板引擎

let http = require('http')
let template = require('art-template')
let fs = require('fs')

let server = http.createServer()

let wwwDir = 'E:/www'
server.on('request',(req,res)=>{
    let url = req.url

    fs.readFile('./template-apache.html', (err,data)=>{
        if(err){
            return res.end('404 Not Found')
        }
        fs.readdir(wwwDir,(err,files)=>{
            if(err){
                return res.end('Can not find www dir')
            }
            
            data = template.render(data.toString(),{
                files: files,
                title: '哈哈'
            })
            res.end(data)
        })
    })
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})


