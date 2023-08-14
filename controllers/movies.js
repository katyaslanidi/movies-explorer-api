const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  STATUS_CREATED,
  VALIDATION_ERROR,
  CAST_ERROR,
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_MOVIE_ERROR_MESSAGE,
  FORBIDDEN_MOVIE_ERROR_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    res.status(STATUS_CREATED).send(movie);
  } catch (err) {
    if (err instanceof VALIDATION_ERROR) {
      next(new BadRequest(INVALID_DATA_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      next(new NotFound(NOT_FOUND_MOVIE_ERROR_MESSAGE));
    }
    if (movie.owner.toString() !== req.user._id) {
      next(new ForbiddenError(FORBIDDEN_MOVIE_ERROR_MESSAGE));
    }
    await movie.deleteOne();
    res.send(movie);
  } catch (err) {
    if (err instanceof CAST_ERROR) {
      next(new BadRequest(INVALID_DATA_ERROR_MESSAGE));
    } else {
      next(err);
    }
  }
};
