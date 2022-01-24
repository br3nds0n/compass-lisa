const mongoose = require('mongoose')
const config = require('./config.js')

class Database {
  constructor () {
    this.connect()
  }

  connect () {
    return mongoose.connect(config)
  }
}

module.exports = new Database().connect()
