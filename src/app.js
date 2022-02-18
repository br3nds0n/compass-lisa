const express = require('express');

const routes = require('./routes');
require('./infra/database/mongo');

const cors = require('cors');
const erroModify = require('./app/middlewares/erroModify');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.erroModify();
  }

  routes() {
    this.server.use('/api/', routes);
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(express.json());
  }

  erroModify() {
    this.server.use(erroModify);
  }
}

module.exports = new App().server;
