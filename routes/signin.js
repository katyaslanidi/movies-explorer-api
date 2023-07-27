const router = require('express').Router();

const { login } = require('../controllers/auth');

router.post('/signin', login);

module.exports = router;
