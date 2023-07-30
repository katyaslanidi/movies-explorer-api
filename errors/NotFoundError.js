const { NOT_FOUND_ERROR } = require('../utils/constants');

module.exports = class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_ERROR;
  }
};
