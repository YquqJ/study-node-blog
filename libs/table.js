const fs = require("await-fs")
const path = require("path")
const common = require("./common")
const Router = require("koa-router")

module.exports = function (fields, table, page_type) {

  let router = new Router()

  const page_types = {
    'banner': 'banner管理',
    'catalog': '类目管理',
    'article': '文章管理',
  }

  //通用
  router.get("/", async (ctx, next) => {
    const {
      HTTP_ROOT
    } = ctx.config
    fields.forEach(async (field) => {
      if (field.type === 'select' && (typeof (field.from) === 'string')) {
        field.items = await ctx.db.query(field.from)
        // console.log(field.items)
      }
    })
    let datas = await ctx.db.query(`SELECT * FROM ${table}`)
    await ctx.render("/admin/table", {
      page_type,
      page_types,
      datas,
      HTTP_ROOT,
      action: `${HTTP_ROOT}/admin/${page_type}`,
      fields
    })
  })
  //接收数据并添加
  router.post("/", async (ctx, next) => {
    const {
      HTTP_ROOT
    } = ctx.config
    let postData = ctx.request.fields

    let keys = []
    let vals = []
    fields.forEach(field => {
      const {
        name,
        type
      } = field
      keys.push(name)
      if (type === 'file') {
        vals.push(path.basename(postData[name][0].path))
      } else if (type === 'date') {
        vals.push(new Date(postData[name]).getTime() / 1000)
      } else {
        vals.push(postData[name])
      }
    })
    console.log(keys, vals)
    await ctx.db.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES(${keys.map(key=>'?')})`, vals)
    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}/`)
  })
  //删除操作
  router.get("/delete/:id", async ctx => {
    const {
      HTTP_ROOT,
      UPLOAD_DIR
    } = ctx.config
    const {
      id
    } = ctx.params
    let result = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
    if (result && result.length) {
      fields.forEach(async ({
        name,
        type
      }) => {
        if (type === 'file') {
          try {
            await common.unlink(path.resolve(UPLOAD_DIR, result[0][name]))
          } catch (e) {
            console.log(e)
          }
        }
      })
      await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id])
    }
    console.log(result)
    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}`)
  })
  //查询是否存在数据
  router.get("/get/:id", async ctx => {
    const {
      id
    } = ctx.params
    if (!isNaN(id)) {
      let rows = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
      if (rows.length) {
        ctx.body = {
          err: 0,
          msg: 'success',
          data: rows[0]
        }
      } else {
        ctx.body = {
          err: 1,
          msg: '未找到该数据'
        }
      }
    }
  })
  //post修改
  router.post("/modify/:id", async ctx => {
    const {
      id
    } = ctx.params
    const postData = ctx.request.fields
    const {
      HTTP_ROOT,
      UPLOAD_DIR
    } = ctx.config
    // console.log(post)
    //获取旧数据
    let rows = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
    ctx.assert(rows.length, 400, '未找到数据')
    let paths = {} //暂存旧文件数据
    let keys = []
    let vals = []
    let src_changed = {}
    fields.forEach(async ({
      name,
      type
    }) => {
      if (type === 'file') {
        if (postData[name] && postData[name].length && postData[name][0].size) {
          keys.push(name)
          src_changed[name] = true
          vals.push(path.basename(postData[name][0].path))
          paths[name] = rows[0][name]
          //删除upload中旧文件
          try {
            await common.unlink(path.resolve(UPLOAD_DIR, paths[name]))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (type === 'date') {
        keys.push(name)
        vals.push(new Date(postData[name]).getTime() / 1000)
      } else {
        keys.push(name)
        vals.push(postData[name])
      }
    })
    // console.log(keys)
    // console.log(vals)
    // 数据库修改操作
    await ctx.db.query(`UPDATE ${table} SET ${
    keys.map(key=>(
      `${key}=?`
    )).join(",")
  } WHERE ID=?`, [...vals, id])

    ctx.redirect(`${HTTP_ROOT}/admin/${page_type}`)
  })

  return router.routes()
}