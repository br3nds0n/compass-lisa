const HttpError = require('./httpError');

class BadRequest extends HttpError {
  constructor(payload) {
    super();

    this.statusCode = 400;
    this.name = 'Bad Request';
    this.description = 'Bad Request';
    this.message = `${payload}`;
    this.body = { payload };
  }
}

module.exports = BadRequest;
