
let http = require('http')
let fs = require('fs')
let url = require('url')
let template = require('art-template')

let comments = [
    {name:'张三1',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三2',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三3',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三4',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三5',message:'今天天气真好',dateTime:'2018-02-23'}
]

http
    .createServer((req,res)=>{
        //http://localhost:9000/comments?name=jlsdal&message=djfklal%3Bfja
        //表单get请求,会带有用户动态输入的内容,这时不能使用url路径来处理这个请求
        //使用url.parse方法将路径解析为一个方便操作的对象,第二个参数为 true 表示直接将查询字符串转为一个对象 (通过 query 属性来访问)
        let parseObj = url.parse(req.url,true)
        //let url = req.url

        //单独获取不包含查询字符串的路径部分(该路径不包含 ? 之后的内容)
        let pathName = parseObj.pathname

        if (pathName === '/') {//首页
            fs.readFile('./views/index.html',(err,data)=>{
                if (err) {
                    return res.end('404 Not Fount')
                }
                data = template.render(data.toString(),{
                    comments : comments
                })
                res.end(data)
            })
        } else if (pathName.indexOf('/static/') === 0){//处理静态资源
            //统一处理:如果请求路径是以 /static/ 开头的,则我认为你要获取 static 中的某个资源
            //所以我们就直接可以把请求路径当作文件路径来直接进行读取
            fs.readFile('.' + pathName,(err,data)=>{
                if (err) {
                    return res.end('404 Not Fount')
                }
                res.end(data)
            })
        } else if (pathName === '/post') {//表单页面
            fs.readFile('./views/post.html',(err,data)=>{
                if (err) {
                    return res.end('404 Not Fount')
                }
                res.end(data)
            })
        } else if (pathName === '/comments') {//提交表单
            //console.log('收到表单请求了',parseObj.query)
            //res.end(JSON.stringify(parseObj.query))

            let comment = parseObj.query
            comment.dateTime = '2018-03-24'
            comments.push(comment)

            //服务器让客户端重定向:状态码设置为 302 临时重定向 , 在响应头中通过 location 告诉客户端往哪儿重定向
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
        }else {
            fs.readFile('./views/error.html',(err,data)=>{
                if (err) {
                    return res.end('404 Not Fount')
                }
                res.end(data)
            })
        }
    })
    .listen(9000,()=>{
        console.log('running...')
    })