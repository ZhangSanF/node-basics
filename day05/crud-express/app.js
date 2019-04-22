/**
 * app.js 入口模块
 * 职责:
 *      创建服务
 *      做一些服务相关的配置
 *          模板引擎
 *          body-parser 解析表单 post 请求体
 *          提供静态资源服务
 *      挂载路由
 *      监听端口启动服务
 */

let express = require('express')
let router = require('./router')
let bodyParser = require('body-parser')

let app = express()

app.use('/node_modules/',express.static('./node_modules'))
app.use('/static/',express.static('./static'))

//配置模板引擎和配置 body-parser 一定要在 app.use(router) 挂载路由之前
app.engine('html', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//把路由容器挂载到 app 服务中
app.use(router)
//处理 404
app.use((req, res)=>{
    res.send('404')
})
// router(app)

app.listen(9000,()=>{
    console.log('running 9000...')
})