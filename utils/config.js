const {
  NODE_ENV,
  JWT_SECRET,
  MONGODB_URI,
  PORT,
} = process.env;

const config = {
  MONGODB_URI: NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT: NODE_ENV === 'production' ? PORT : 3000,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};

module.exports = config;
