const crypto = require("crypto")
const fs = require("fs")

module.exports = {
  //md加密
  md5(password) {
    let obj = crypto.createHash('md5')
    obj.update(password)
    return obj.digest("hex")
  },
  //删除文件
  unlink(path) {
    return new Promise((resolve, reject) => {
      fs.unlink(path, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}