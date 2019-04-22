
// npm i mongoose

const mongoose = require('mongoose');

//连接 MongoDB 数据库  -- test 数据库名称
mongoose.connect('mongodb://localhost/test');

//创建一个模型---就是在设计数据库 -- 生成一个小写复数表名  cats(集合(数组))
const Cat = mongoose.model('Cat', { name: String });

//实例化一个 Cat
const kitty = new Cat({ name: 'Zildjian' });

//持久化保存 Kitty 实例
kitty.save().then(() => console.log('meow'));