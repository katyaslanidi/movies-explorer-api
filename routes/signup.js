const router = require('express').Router();

const { registrationValidation } = require('../middlewares/validation');
const { registration } = require('../controllers/auth');

router.post('/signup', registrationValidation, registration);

module.exports = router;
