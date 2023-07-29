const mongoose = require('mongoose');

const User = require('../models/user');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');

module.exports.getMyUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      next(new NotFound('Пользователь не найден'));
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
      next(new NotFound('Пользователь не найден'));
    }
    res.send({
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err instanceof (mongoose.Error.ValidationError)) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
