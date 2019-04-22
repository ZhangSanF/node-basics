
let http = require('http')
let fs = require('fs')

let server = http.createServer()

let wwwDir = 'E:/www'
server.on('request',(req,res)=>{
    let url = req.url

    fs.readFile('./template.html', (err,data)=>{
        if(err){
            return res.end('404 Not Found')
        }
        //fs.readdir 可以读出路径内的所有文件
        fs.readdir(wwwDir,(err,files)=>{
            if(err){
                return res.end('Can not find www dir')
            }
            let content = ''
            files.forEach((item)=>{
                content += `
                <tr>
                    <td data-value="apple/"><a class="icon dir" href="/E:/www/apple/">${item}/</a></td>
                    <td class="detailsColumn" data-value="0"></td><td class="detailsColumn" data-value="1539844963">2018/10/18 下午2:42:43</td>
                </tr>
                `
            })
            data = data.toString()

            data = data.replace('^_^',content)
            res.end(data)
        })
    })
})

//绑定端口号,启动服务器
server.listen(9000,()=>{
    console.log('服务器启动成功了')
})