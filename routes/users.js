const usersRoutes = require('express').Router();

const { getMyUser, updateUserInfo } = require('../controllers/users');
const { updateUserInfoValidation } = require('../middlewares/validation');

usersRoutes.get('/me', getMyUser);
usersRoutes.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = usersRoutes;
