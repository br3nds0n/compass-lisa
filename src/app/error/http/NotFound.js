const HttpError = require('./httpError');

class NotFound extends HttpError {
  constructor(payload) {
    super();

    this.statusCode = 404;
    this.description = 'Not Found';
    this.message = `id: ${payload} was not found`;
  }
}

module.exports = NotFound;
