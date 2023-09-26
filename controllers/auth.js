const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('../utils/config');
const User = require('../models/user');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError ');
const BadRequest = require('../errors/BadRequestError');
const {
  STATUS_CREATED,
  DUPLICATE_KEY_ERROR,
  VALIDATION_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  // UNAUTHORIZED_ERROR_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET_DEV } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.registration = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.code === DUPLICATE_KEY_ERROR) {
        next(new ConflictError(DUPLICATE_ERROR_MESSAGE));
      } else if (err instanceof VALIDATION_ERROR) {
        next(new BadRequest(INVALID_DATA_ERROR_MESSAGE));
      } else next(err);
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
