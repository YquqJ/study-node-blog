const static = require("koa-static")

module.exports = function (router, option) {
  option = option || {}
  option.image = option.image || 3
  option.script = option.script || 7
  option.style = option.style || 5
  option.html = option.html || 10
  option.other = option.other || 30

  const {
    image,
    script,
    style,
    html,
    other
  } = option

  router.all(/((\.jpg)|(\.png)|(\.gif))$/i, static('./static', {
    maxage: image * 86400 * 1000
  }))
  router.all(/((\.js)|(\.jsx))$/i, static('./static', {
    maxage: script * 86400 * 1000
  }))
  router.all(/(\.css)$/i, static('./static', {
    maxage: style * 86400 * 1000
  }))
  router.all(/(\.html)$/i, static('./static', {
    maxage: html * 86400 * 1000
  }))
  router.all('*', static('./static', {
    maxage: other * 86400 * 1000
  }))
}