const { BAD_REQUEST_ERROR } = require('../utils/constants');

module.exports = class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR;
  }
};
