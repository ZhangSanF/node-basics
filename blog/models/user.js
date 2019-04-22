
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blog')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, required: true},
    nickname: {type: String, required: true},
    password: {type: String, required: true},
    created_time: {type: Date, default: Date.now}, //不要写 Date.now() 因为会即刻调用
    last_modified_time: {type: Date, default: Date.now},
    avatar: {type: String, default: '/public/img/download.gif'},
    bio: {type: String, default: ''},
    gender: {type: Number, eunm: [-1, 0, 1], default: -1}, //-1 保密 , 0 男, 1 女
    birthday: {type : Date},
    status: {type: Number, enum: [0, 1, 2], default: 0} //0 没有权限限制, 1 不可以评论, 2 不可以登录
})

module.exports = mongoose.model('User', userSchema)