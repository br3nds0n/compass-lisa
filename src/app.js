<<<<<<< HEAD
const express = require('express');

const routes = require('./routes');
require('./infra/database/mongo');
const erroModify = require('./app/error/erroModify');

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
		this.server.use(express.json());
	}

	erroModify() {
		this.server.use(erroModify);
	}
}

module.exports = new App().server;
=======
const express = require('express');

const routes = require('./routes');
require('./infra/database/mongo');

const erroModify = require('./app/error/erroModify');

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
		this.server.use(express.json());
	}

	erroModify() {
		this.server.use(erroModify);
		
	}
}

module.exports = new App().server;
>>>>>>> 257b521b1b6ed4b76a410ea6c166959688568964
