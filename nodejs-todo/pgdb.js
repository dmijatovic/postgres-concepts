const { Pool } = require('pg')

const pool = new Pool({
  user:"postgres",
  password: "changeme",
  host: "localhost",
  port: 5432,
  database:"pern_todo"
})

module.exports = pool