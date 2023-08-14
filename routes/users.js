const usersRoutes = require('express').Router();

const { updateUserInfoValidation } = require('../middlewares/validation');
const { getMyUser, updateUserInfo } = require('../controllers/users');

usersRoutes.get('/me', getMyUser);
usersRoutes.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = usersRoutes;
