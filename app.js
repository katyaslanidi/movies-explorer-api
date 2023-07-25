require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('celebrate');
const { errors } = require('celebrate');

const { PORT } = require('./config');
const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

const app = express();

// mongoose.connect( url, { useNewUrlParser: true })
//   .then(() => console.log('Успешное подключение к MongoDB'))
//   .catch((err) => console.log('Ошибка подключение:', err));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
