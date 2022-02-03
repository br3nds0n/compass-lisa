<<<<<<< HEAD
const mongoose = require('mongoose');
require('dotenv').config();

class Database {
	constructor () {
		this.connect();
	}

	connect () {
		return mongoose
			.connect(process.env.DB_HOST)
			.catch((error) => console.long(error));
	}
}

module.exports = new Database().connect();
=======
const mongoose = require('mongoose');
require('dotenv').config();

class Database {
	constructor () {
		this.connect();
	}

	connect () {
		return mongoose
			.connect(process.env.DB_HOST)
			.catch((error) => console.log(error));
	}
}

module.exports = new Database().connect();
>>>>>>> 257b521b1b6ed4b76a410ea6c166959688568964
