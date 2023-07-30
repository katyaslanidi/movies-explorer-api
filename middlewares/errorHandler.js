const { INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
  const message = statusCode === INTERNAL_SERVER_ERROR
    ? INTERNAL_SERVER_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  return next();
};

module.exports = errorHandler;
