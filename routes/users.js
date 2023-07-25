const usersRoutes = require('express').Router();

const { getMyUser, updateUserInfo } = require('../controllers/users');

usersRoutes.get('/me', getMyUser); // возвращает информацию о пользователе (email и имя)
usersRoutes.patch('/me', updateUserInfo); // обновляет информацию о пользователе (email и имя)

module.exports = usersRoutes;
