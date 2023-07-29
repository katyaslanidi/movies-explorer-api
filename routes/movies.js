const moviesRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovieValidation, createMovie);
moviesRoutes.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRoutes;
