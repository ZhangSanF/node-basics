
const express = require('express')
const User = require('./models/user')
const md5 = require('blueimp-md5')

const router = express.Router()

// 渲染首页
router.get('/', (req, res, next) => { 
    //console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})

// 渲染登录页面
router.get('/login', (req, res, next) => { 
    res.render('login.html')
})

// 处理登录数据
router.post('/login', async (req, res, next) => { 
    let body = req.body

    try {
        await User.findOne({ email: body.email, password: md5(md5(body.password)) })
            .then((user) => {
                if (!user) {
                    return res.status(200).json({
                        code: 1,
                        message: 'Email or password is invalid'
                    })
                }
                // 登录成功,使用 Session 记录用户的登录状态
                req.session.user = user
                res.status(200).json({
                    code: 0,
                    message: 'OK'
                })
            })
    } catch (err) {
        return next(err)
    }
})

// 渲染注册页面
router.get('/register', (req, res, next) => { 
    res.render('register.html')
})

//处理注册数据
router.post('/register', async (req, res, next) => { 
    let body = req.body

    try {
        if (await User.findOne({ email: body.email })) {
            return res.status(200).json({
                code: 1,
                message: 'Email aleady exists'
            })
        }
        if (await User.findOne({ nickname: body.nickname })) {
            return res.status(200).json({
                code: 2,
                message: 'Nickname aleady exists'
            })
        }

        //对密码 md5 重复加密
        body.password = md5(md5(body.password))

        await new User(body).save()
            .then((user) => {
                // 注册成功,使用 Session 记录用户的登录状态
                req.session.user = user
                // Express 提供了一个响应方法 json()  该方法会把对象转换为字符串发送给浏览器
                res.status(200).json({
                    code: 0,
                    message: 'OK'
                })
            })
    } catch (err) {
        return next(err)
    }
})

// 退出处理
router.get('/logout', (req, res, next) => {
    // 清除登录状态
    req.session.user = null
    // 重定向到登录页
    res.redirect('/login')
})

module.exports = router