const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');

const User = require('../models/user');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError ');
const BadRequest = require('../errors/BadRequestError');
const {
  STATUS_CREATED,
  DUPLICATE_KEY_ERROR,
  VALIDATION_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.registration = async (req, res, next) => {
  try {
    const {
      email, password, name,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, password: hashPassword, name,
    });
    res.status(STATUS_CREATED).send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === DUPLICATE_KEY_ERROR) {
      next(new ConflictError(DUPLICATE_ERROR_MESSAGE));
    } else if (err instanceof VALIDATION_ERROR) {
      next(new BadRequest(INVALID_DATA_ERROR_MESSAGE));
    } else next(err.array());
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
    }
    const token = jwt.sign(
      { _id: user._id },
      config.JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};
