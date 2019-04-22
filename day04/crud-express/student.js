/**
 * student.js
 * 数据操作文件模块
 * 职责:操作文件中的数据,只处理数据,不关心业务
 */
let fs = require('fs')

const dbPath = './db.json'

 /**
  * 获取所有学生列表
  * callback 中的参数
  *     第一个参数是 err
  *         成功是 null
  *         失败是 错误对象
  *     第二个参数 data
  *         成功是 数组
  *         失败是 undefined
  * return []
  */
exports.find = (callback)=>{
    fs.readFile(dbPath,'utf8', (err, data)=>{
        if(err){
            return callback(err)
        }
        callback(null,JSON.parse(data).students)
    })
}

 /**
  * 根据 id 查找一条数据
  */
exports.findById = (id, callback)=>{
    fs.readFile(dbPath,'utf8', (err, data)=>{
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students

        let ret = students.find((item)=>{
            return item.id === parseInt(id)
        })
        callback(null,ret)
    })
}

  /**
  * 添加保存学生
  */
exports.save = (student, callback)=>{
    fs.readFile(dbPath,'utf8', (err, data)=>{
        if(err){
            return callback(err)
        }
        let students = JSON.parse(data).students
        //处理 id 唯一的,不重复
        student.id = students[students.length - 1].id + 1
        //把用户传递的对象保存到数组中
        students.push(student)
        //把对象数据转换为字符串
        let fileData = JSON.stringify({students: students})
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, (err)=>{
            if (err) {
                return callback(err)
            }
            //成功就是没错,所以错误对象是 null
            callback(null)
        })
    })
}

  /**
  * 更新学生
  */
exports.updataById = (student,callback)=>{
    fs.readFile(dbPath, 'utf8', (err, data)=>{
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students
        student.id = parseInt(student.id)
        // es6 中的一个数组方法 find
        // 需要接收一个函数作为参数
        //当某个遍历项符合 item.id === student.id 条件的时候, find 会终止遍历,同时返回遍历项
        let stu = students.find((item)=>{
            return item.id === student.id
        })
        
        //更新
        for (let key in student) {
            stu[key] = student[key]
        }

        //把对象数据转换为字符串
        let fileData = JSON.stringify({students: students})
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, (err)=>{
            if (err) {
                return callback(err)
            }
            //成功就是没错,所以错误对象是 null
            callback(null)
        })
    })
}

  /**
  * 删除学生
  */
exports.deleteById = (id, callback)=>{
    fs.readFile(dbPath , 'utf8', (err,data)=>{
        if (err) {
            return callback(err)
        }
        let students = JSON.parse(data).students

        // es6的方法 findIndex 专门用来根据条件查找元素的下标
        let deleteId = students.findIndex((item)=>{
            return item.id === parseInt(id)
        })

        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId, 1)

        //把对象数据转换为字符串
        let fileData = JSON.stringify({students: students})
        //把字符串保存到文件中
        fs.writeFile(dbPath, fileData, (err)=>{
            if (err) {
                return callback(err)
            }
            //成功就是没错,所以错误对象是 null
            callback(null)
        })
    })
}