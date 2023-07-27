const mongoose = require('mongoose');

const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    const movie = await Movie.create({ movieData, owner: req.user._id });
    res.status(201).send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequest('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      next(new NotFound('Фильм не найден'));
    }
    if (movie.owner.toString() !== req.user._id) {
      next(new ForbiddenError('Это фильм другого пользователя'));
    }
    await movie.deleteOne();
    res.send(movie);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequest('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};
