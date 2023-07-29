const router = require('express').Router();

const { login } = require('../controllers/auth');
const { loginValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);

module.exports = router;
