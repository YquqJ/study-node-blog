const path = require("path")
let PORT = 777

module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASS: 'root',
  DB_NAME: 'cpts',

  PORT,
  HTTP_ROOT: `http://localhost:${PORT}`,
  UPLOAD_DIR: path.resolve(__dirname, "static/upload")
}