const jwt = require('jsonwebtoken');

const config = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};
