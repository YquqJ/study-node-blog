const tableFun = require("../../libs/table")

const table = "catalog_table"
const page_type = "catalog"
const fields = [{
  title: '标题',
  name: 'title',
  type: 'text'
}]

module.exports = tableFun(fields, table, page_type)