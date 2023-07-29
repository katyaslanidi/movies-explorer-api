const router = require('express').Router();

const { registration } = require('../controllers/auth');
const { registrationValidation } = require('../middlewares/validation');

router.post('/signup', registrationValidation, registration);

module.exports = router;
