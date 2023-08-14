const moviesRoutes = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', createMovieValidation, createMovie);
moviesRoutes.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRoutes;
