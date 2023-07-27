const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');

// const { NODE_ENV, JWT_SECRET } = process.env;

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
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      name,
      { new: true, runValidators: true },
    );
    if (!user) {
      next(new NotFound('Пользователь не найден'));
    }
    res.send(user);
  } catch (err) {
    if (err instanceof (mongoose.Error.ValidationError)) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
