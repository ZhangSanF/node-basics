/**
 * router.js 路由模块
 * 职责:
 *      处理路由
 *      根据不同的请求方法+请求路径设置具体的请求处理函数
 * 模块职责要单一
 * 划分模块的目的就是为了增强项目代码的可维护性,提升开发效率
 */

// express 提供了一种更好的方式,专门用来包装路由
let express = require('express')
let Student = require('./student')

//创建一个路由容器
let router = express.Router()

//把路由挂载到 router 路由容器中
//响应首页
router.get('/students',(req,res)=>{
    Student.find((err,students)=>{
        if (err) {
            return res.status(500).send('Server error')
        }
        res.render('index.html',{
            fruits : ['苹果','香蕉','橘子'],
            students : students
        })
    })
})

//响应 form 表单页面
router.get('/students/new',(req,res)=>{
    res.render('new.html')
})

//处理 from 表单数据
router.post('/students/new',(req,res)=>{
    //console.log(req.body)
    new Student(req.body).save((err)=>{
        if (err) {
            return res.status(500).send('Server error')
        }
        //重定向首页
        res.redirect('/students')
    })
})

//响应编辑学生页面
router.get('/students/edit',(req,res)=>{
    Student.findById(req.query.id, (err, student)=>{
        if (err) {
            return res.status(500).send('Server error')
        }
        //console.log(student)
        res.render('edit.html', {
            student : student
        })
    })
})

//更新
router.post('/students/edit',(req,res)=>{
    //console.log(req.body)
    Student.findByIdAndUpdate(req.body.id,req.body, (err)=>{
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

router.get('/students/delete',(req,res)=>{
    Student.findByIdAndRemove(req.query.id, (err)=>{
        if (err) {
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
})

//把 router 导出
module.exports = router



