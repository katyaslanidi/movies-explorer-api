const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { TOKEN_ERROR_MESSAGE, UNAUTHORIZED_ERROR_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError(TOKEN_ERROR_MESSAGE));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, config.JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE));
  }
  req.user = payload;
  return next();
};
