const moviesRoutes = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

moviesRoutes.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
moviesRoutes.post('/', createMovie); // создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
moviesRoutes.delete('/:_id', deleteMovie); // удаляет сохранённый фильм по id

module.exports = moviesRoutes;
