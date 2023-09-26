const mongoose = require('mongoose');

const JWT_SECRET_DEV = 'some-secret-key';

const VALIDATION_ERROR = mongoose.Error.ValidationError;
const CAST_ERROR = mongoose.Error.CastError;
const DUPLICATE_KEY_ERROR = 11000;

const STATUS_CREATED = 201;

const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;

const INVALID_DATA_ERROR_MESSAGE = 'Переданы некорректные данные';
const DUPLICATE_ERROR_MESSAGE = 'Пользователь с таким email уже существует';
const UNAUTHORIZED_ERROR_MESSAGE = 'Неправильные почта или пароль';
const NOT_FOUND_USER_ERROR_MESSAGE = 'Пользователь не найден';
const NOT_FOUND_MOVIE_ERROR_MESSAGE = 'Фильм не найден';
const FORBIDDEN_MOVIE_ERROR_MESSAGE = 'Это фильм другого пользователя';
const TOKEN_ERROR_MESSAGE = 'Ошибка авторизации. JWT-токен не передан или передан в некорректном формате.';
const NOT_FOUND_ROUTE_ERROR_MESSAGE = 'Такого роута не существует';
const INTERNAL_SERVER_ERROR_MESSAGE = 'На сервере произошла ошибка';

module.exports = {
  JWT_SECRET_DEV,
  VALIDATION_ERROR,
  CAST_ERROR,
  DUPLICATE_KEY_ERROR,
  STATUS_CREATED,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  DUPLICATE_ERROR_MESSAGE,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_USER_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  FORBIDDEN_MOVIE_ERROR_MESSAGE,
  TOKEN_ERROR_MESSAGE,
  NOT_FOUND_ROUTE_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
};
