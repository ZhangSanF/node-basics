
//在 express 中使用 art-template
// 1 npm install art-template express-art-template --save
// 2 配置
// app.engine('art', require('express-art-template'));
// app.set('view options', {
//     debug: process.env.NODE_ENV !== 'production'
// });
// 3 使用 第一个参数不能写路径,默认会去项目中 views 目录中查找该文件
// res.render('html模板名',{模板数据})

//在 express 中是 post 请求时获取参数, express 中没有封装方法,可以通过第三方包来实现 body-parser
// 1 npm install body-parser --save
// 2 配置
//  let bodyParser = require('body-parser')
//  app.use(bodyParser.urlencoded({extended: false}))
//  app.use(bodyParser.json())
// 3 使用
//  req.body 拿到参数

let express = require('express')
let bodyParser = require('body-parser')

let app = express()

//配置 art-template 模板引擎
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});

// 配置 body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/static/',express.static('./static/'))

let comments = [
    {name:'张三1',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三2',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三3',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三4',message:'今天天气真好',dateTime:'2018-02-23'},
    {name:'张三5',message:'今天天气真好',dateTime:'2018-02-23'}
]

app.get('/',(req,res)=>{
    //使用 art-template 的 render
    res.render('index.html',{
        comments : comments
    })
})

app.get('/post',(req,res)=>{
    res.render('post.html')
})

// app.get('/comments',(req,res)=>{
//     let comment = req.query
//     //console.log(comment)
//     comment.dateTime = '2018-03-14'
//     comments.unshift(comment)
//     //重定向
//     res.redirect('/')
// })

//使用 post 请求
app.post('/comments',(req,res)=>{
    let comment = req.body

    comment.dateTime = '2018-03-14'
    comments.unshift(comment)
    //重定向
    res.redirect('/')
})

app.listen(9000,()=>{
    console.log('running...')
})