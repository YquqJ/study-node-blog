const Koa = require("koa")
const Router = require("koa-router")
const static = require("./routers/static")
const body = require("koa-better-body")
const path = require("path")
const session = require("koa-session")
const fs = require("fs")
const cmmon = require("./libs/common")
const ejs = require("koa-ejs")
const config = require("./config")

const server = new Koa()
server.listen(config.PORT)
console.log(`server start at ${config.PORT}`)

/**
 * 数据库
 */
server.context.db = require("./libs/database")
server.context.config = config

/**
 * 中间件
 */
server.use(body({
  uploadDir: config.UPLOAD_DIR
}))
server.keys = fs.readFileSync('./keys.txt').toString().split('\n')
server.use(session({
  maxAge: 20 * 60 * 1000,
  renew: true
}, server))

/**
 * 渲染
 */
ejs(server, {
  root: path.resolve(__dirname, "./template"),
  layout: false,
  viewExt: "ejs",
  cache: false,
  debug: false
})

server.use(async (ctx, next) => {
  const {
    HTTP_ROOT
  } = ctx.config
  try {
    await next()
    if (!ctx.body) {
      await ctx.render("www/404", {
        HTTP_ROOT
      })
    }
  } catch (e) {
    await ctx.render("www/404", {
      HTTP_ROOT
    })
  }
})

/**
 * 路由和static
 */
let router = new Router()
/**
 * 统一处理
 */
// router.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (e) {
//     ctx.throw(500, '服务器内部出错')
//   }
// })
router.use('/admin', require("./routers/admin/index"))
router.use('/', require("./routers/www/index"))
static(router, {
  image: 10
})

// console.log(cmmon.md5("12345"))
server.use(router.routes())