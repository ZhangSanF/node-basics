
const mongoose = require('mongoose')

const Schema = mongoose.Schema

// 连接数据库
mongoose.connect('mongodb://localhost/itcast')

// 设计文档结构(表结构)
const userSchema = new Schema({
    username: {type: String, required: true}, //required 必须有的约束
    password: {type: String, required: true},
    email: {type: String}
})

// 将文档结构发布为模型 User-->users
const User = mongoose.model('User', userSchema)

// 对 users 集合中的数据(增删改查)

// 增******************************************************************************************************
// const admin = new User(
//     {username: 'ray', password: '123456', email: 'admin@123.com'}
// )

// admin.save()
//     .then(() => {
//         console.log('保存成功')
//     })

// 查******************************************************************************************************
// 查所有
User.find()
    .then((data) => {
        console.log(data)
    })

// 条件查询(条件可以多个)
// User.find({username: 'ls'})
//     .then((data) => {
//         console.log(data)
//     })

// 查找符合条件的第一个
// User.findOne({username: 'ls'})
//     .then((data) => {
//         console.log(data)
//     })

// 删******************************************************************************************************
// User.findOneAndRemove()  根据条件删除一个
// User.findByIdAndRemove() 根据id删除一个
// 根据条件删除所有
// User.remove({username: 'ray'})
//     .then(() => {
//         console.log('删除成功')
//     })

// 改******************************************************************************************************
// User.findByIdAndUpdate('5bd6acfaa6d6b104cc56eabc', {password: '3333333333'})
//     .then(() => {
//         console.log('更新成功')
//     })