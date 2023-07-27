const router = require('express').Router();

const { registration } = require('../controllers/auth');

router.post('/signup', registration);

module.exports = router;
