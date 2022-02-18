const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect('mongodb://localhost:27017/_test').catch((error) => console.log(error));
  }
}

module.exports = new Database().connect();
