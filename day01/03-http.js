
let http = require('http')

//创建web服务器
let server = http.createServer()

server.on('request',(req,res)=>{
    //console.log('收到客户端的请求了')
    //console.log('收到请求了,路径是'+req.url)

    //res.end('hello')

    let url = req.url
    let products = [{name:'苹果X',price:8888},{name:'小辣椒X',price:1999},{name:'华为X',price:3000}]
    
    if(url === '/'){
        res.end('index page')
    }else if(url === '/login'){
        res.end('login page')
    }else if(url === '/products'){
        res.end(JSON.stringify(products))
    }else{
        res.end('404 Not Found')
    }
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})