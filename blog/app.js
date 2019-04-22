
const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

// path.join(__dirname, 'xx')  文件操作路径把相对路径变为动态绝对路径
app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) //默认就是 ./views 目录,可不用写,如果需要改就可以写
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    // 配置加密字符串,它会在原有加密的基础上和这个字符串拼接起来加密
    // 目的是为了增加安全性,防止客户端恶意伪造
    secret: 'dylan blog',
    resave: false,
    saveUninitialized: true // 无论你是否使用 Session ,我都默认直接给你分配一把钥匙,默认为 true
  }))

app.use(router)

// 配置 404 页面
app.use((req, res) => {
    res.render('404.html')
})

// 配置全局错误处理--四个参数,第一个是错误
app.use((err, req, res, next) => {
    res.status(500).json({
        code: 500,
        message: err.message
    })
})

app.listen('9000', () => {
    console.log('running...')
})

// Express 这个框架中,默认不支持 Session 和 Cookie
// 可以通过第三方中间件  express-session  来解决  https://www.npmjs.com/package/express-session
// 1  npm install express-session
// 2  配置
    //  const session = require('express-session')
    // app.use(session({
           // 配置加密字符串,它会在原有加密的基础上和这个字符串拼接起来加密 (任意的特殊字符)
           // 目的是为了增加安全性,防止客户端恶意伪造
    //     secret: 'keyboard cat',
    //     resave: false,
    //     saveUninitialized: true // 无论你是否使用 Session ,我都默认直接给你分配一把钥匙,默认为 true
    //   }))
// 3  使用
    //  添加 Session 数据   req.session.foo = 'bar'
    //  访问 Session 数据   req.session.foo

// 提示:
    // 默认 Session 数据是内存存储的,服务器一旦重启就会丢失,真正的生产环境会把 Session 进行持久化存储