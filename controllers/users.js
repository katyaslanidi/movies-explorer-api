const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(console.log('Пользователь не найден'));
      }
      return res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name } = req.body;
  User.findByIdAndUpdate(req.user._id, name, { new: true, runValidators: true})
    .then((data) => {
      if(!data) {
        return next(console.log('Пользователь не найден'));
      } return res.send(data);
    })
    .catch((err) => {
      if(err instanceof (mongoose.Error.ValidationError)) {
        return next(console.log('переданы некорректные данные'));
      } return next(err);
    });
};
