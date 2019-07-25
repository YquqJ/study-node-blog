const tableFun = require("../../libs/table")

const table = "banner_table"
const page_type = "banner"
const fields = [{
    title: '标题',
    name: 'title',
    type: 'text'
  },
  {
    title: '图片',
    name: 'src',
    type: 'file'
  },
  {
    title: '链接',
    name: 'href',
    type: 'text'
  },
  {
    title: '序号',
    name: 'serial',
    type: 'number'
  },
]

module.exports = tableFun(fields, table, page_type)