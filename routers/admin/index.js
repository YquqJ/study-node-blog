const fs = require("await-fs")
const path = require("path")
const common = require("../../libs/common")

let Router = require("koa-router")
let router = new Router()

//登录界面
router.get("/login", async ctx => {
  await ctx.render("/admin/login", {
    HTTP_ROOT: ctx.config.HTTP_ROOT,
    errmsg: ctx.query.errmsg
  })
})
//提交登录
router.post("/login", async ctx => {
  const {
    HTTP_ROOT
  } = ctx.config
  let {
    username,
    password
  } = ctx.request.fields
  let adminInfo = JSON.parse(await fs.readFile(
    path.resolve(__dirname, "../../admin.json")
  ))
  // console.log(adminInfo)
  let status = 0 //0:不存在 1：密码错误 2：密码正确
  adminInfo.forEach(item => {
    if (item.username === username) {
      status = 1
      if (item.password === common.md5(password)) {
        status = 2
      }
    }
  })
  if (status === 0) {
    ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent("用户不存在")}`)
  } else if (status === 1) {
    ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent("密码错误")}`)
  } else {
    ctx.session['admin'] = username
    ctx.redirect(`${HTTP_ROOT}/admin/`)
  }
})
//
router.get("/", async ctx => {
  const {
    HTTP_ROOT
  } = ctx.config
  ctx.redirect(`${HTTP_ROOT}/admin/banner`)
})
//权限，验证是否是管理员
router.all("*", async (ctx, next) => {
  const {
    HTTP_ROOT
  } = ctx.config
  if (ctx.session['admin']) {
    await next()
  } else {
    ctx.redirect(`${HTTP_ROOT}/admin/login`)
  }
})

router.use("/banner", require("./banner"))
router.use("/catalog", require("./catalog"))
router.use("/article", require("./article"))

module.exports = router.routes()