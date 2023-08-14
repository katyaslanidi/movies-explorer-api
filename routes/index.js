const router = require('express').Router();

const auth = require('../middlewares/auth');

const registrationRouter = require('./signup');
const loginRouter = require('./signin');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const NotFound = require('../errors/NotFoundError');

router.use('/', registrationRouter);
router.use('/', loginRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFound('Такого роута не существует'));
});

module.exports = router;
