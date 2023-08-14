const User = require('../models/user');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError ');
const {
  VALIDATION_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  DUPLICATE_KEY_ERROR,
  DUPLICATE_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getMyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFound(NOT_FOUND_USER_ERROR_MESSAGE));
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFound(NOT_FOUND_USER_ERROR_MESSAGE));
    }
    res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.code === DUPLICATE_KEY_ERROR) {
      next(new ConflictError(DUPLICATE_ERROR_MESSAGE));
    } else if (err instanceof VALIDATION_ERROR) {
      next(new BadRequest(INVALID_DATA_ERROR_MESSAGE));
    } else next(err);
  }
};
