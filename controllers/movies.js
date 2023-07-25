const mongoose = require('mongoose');

const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const movieData = req.body;
  Movie.create({ movieData, owner: req.user._id })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        return next(new NotFound('Пользователь не найден'));
      }
      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== req.user._id) {
        return next(new ForbiddenError('Это фильм другого пользователя'));
      }
      return Movie.findByIdAndDelete(_id);
    })
    .then((deletedMovie) => {
      if (!deletedMovie) {
        next(new NotFound('Фильм уже удален'));
      }
      res.send(deletedMovie);
    })
    .catch(next);
};
