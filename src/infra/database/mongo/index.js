const mongoose = require('mongoose');
require('dotenv').config();

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(process.env.DB_HOST).catch((error) => console.log(error));
  }
}

module.exports = new Database().connect();
