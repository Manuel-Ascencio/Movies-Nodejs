const { filterObj } = require('../util/filterObj');

const { Movie } = require('../models/movie-model');

const { catchAsync } = require('../util/catchAsync');

const { AppError } = require('../util/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: { status: 'active' }
  });
  res.status(200).json({
    status: 'success',
    data: {
      movies
    }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  if (!movie) {
    return next(new AppError(404, 'movie not founts'));
  }

  res.status(200).json({
    status: 'success',
    data: { movie }
  });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;

  if (!title || !description || !duration || !rating || !genre) {
    return next(
      new AppError(
        400,
        'Must provide a valid title, description, duration and genre'
      )
    );
  }

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    genre
  });

  res.status(201).json({
    status: 'success',
    data: { newMovie }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'title', 'description', 'duration', 'genre');

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  await movie.update({ ...data });

  res.status(204).json({ status: 'success ' });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: 'active' } });

  await movie.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
