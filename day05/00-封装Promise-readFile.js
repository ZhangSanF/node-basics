
const fs = require('fs')

const ReadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

ReadFile('./data/a.txt')
    .then((data) => {
        console.log(data)
        return ReadFile('./data/b.txt')
    })
    .then((data) => {
        console.log(data)
        return ReadFile('./data/c.txt')
    })
    .then((data) => {
        console.log(data)
    })