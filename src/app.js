const express = require('express')

const routes = require('./routes')
const Database = require('./infra/database')

class App {
  static async init (env) {
    if (!this._app) {
      this._app = new App()
      this._app.express = express()

      await Database.init(env)

      this._app.routes()
      this._app.middlewares()
    }

    return this._app.express
  }

  routes () {
    this.express.use('/api/', routes)
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(express.json())
  }
}

module.exports = App
