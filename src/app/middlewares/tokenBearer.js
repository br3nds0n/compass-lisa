const jwt = require('jsonwebtoken');
const auth = require('../config/authenticate.json');

const Unauthorized = require('../error/http/Unauthorized');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, auth.secret);
    req.people = decode;
    return next();
  } catch (error) {
    throw new Unauthorized(error.name);
  }
};
