const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../config');

module.exports.registrationValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlRegex).required(),
    trailerLink: Joi.string().regex(urlRegex).required(),
    thumbnail: Joi.string().regex(urlRegex).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object({
    _id: Joi.string().length(24).hex().required(),
  }),
});
