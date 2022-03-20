const { filterObj } = require('../util/filterObj');

const { Actor } = require('../models/actor-model');

const { catchAsync } = require('../util/catchAsync');

const { AppError } = require('../util/appError');

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: 'active' }
  });
  res.status(200).json({
    status: 'success',
    data: {
      actors
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({ where: { id } });

  if (!actor) {
    return next(new AppError(404, 'actor not founts'));
  }

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, age, rating, profilePic } = req.body;

  if (!name || !country || !age || !rating || !profilePic) {
    return next(
      new AppError(
        400,
        'Must provide a valid name, country, age and profilePic'
      )
    );
  }

  const newActor = await Actor.create({
    name,
    country,
    age,
    rating,
    profilePic
  });

  res.status(201).json({
    status: 'success',
    data: { newActor }
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'name', 'country', 'age');

  const actor = await Actor.findOne({ where: { id, status: 'active' } });

  await actor.update({ ...data });

  res.status(204).json({ status: 'success ' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = Actor.findOne({ where: { id, status: 'active' } });

  await actor.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
