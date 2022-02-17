const express = require('express');

const routes = require('../../src/routes');
require('./connection');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use('/api/', routes);
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }
}

module.exports = new App().server;
