const allowedCors = [
  'https://katyaslanidi.movies.nomoredomainsicu.ru',
  'http://katyaslanidi.movies.nomoredomainsicu.ru',
  // 'https://api.katyaslanidi.movies.nomoreparties.co',
  // 'http://api.katyaslanidi.movies.nomoreparties.co',
  // 'https://127.0.0.1:3000',
  // 'http://127.0.0.1:3000',
  // 'https://localhost:3000',
  // 'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
