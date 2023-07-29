require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const config = require('./config');
const cors = require('./middlewares/cors');
const errorHandler = require('./errors/errorHandler');
const router = require('./routes');
const limiter = require('./middlewares/rateLimite');

const app = express();

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Успешное подключение к MongoDB');
    await app.listen(config.PORT);
    console.log(`Сервер запущен, PORT = ${config.PORT}`);
  } catch (err) {
    console.log('Ошибка подключение', err);
  }
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

startServer();
