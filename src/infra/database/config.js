require('dotenv').config()
const config = {
  drive: process.env.DB_DRIVE || 'mongodb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
}

module.exports = config
