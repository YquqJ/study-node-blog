const fs = require("fs")

const KEY_LENGTH = 30
const KEY_COUNT = 10
const CHARS = "abcdefghijklmnopqrestuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ/*-+_"

let arr = []
for (let i = 0; i < KEY_COUNT; i++) {
  let key = ''
  for (let j = 0; j < KEY_LENGTH; j++) {
    key += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  arr.push(key)
}

fs.writeFileSync('./keys.txt',arr.join('\n'))
console.log(`已生成${arr.length}key`)