const bcryp = require('bcryptjs');

const { User } = require('../models/user-model');

const { filterObj } = require('../util/filterObj');
const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: 'active' }
  });

  users.password = undefined;

  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id, status: 'active' } });

  if (!user) {
    return next(new AppError(404, 'user not founts'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      new AppError(400, 'Must provide a valid username, email and password')
    );
  }

  const salt = await bcryp.genSalt(12);

  const hashedPassword = await bcryp.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword
  });

  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    data: { newUser }
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, 'username', 'email');

  const user = await User.findOne({ where: { id, status: 'active' } });

  await user.update({ ...data });

  res.status(204).json({ status: 'success ' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id, status: 'active' } });

  await user.update({ status: 'deleted' });

  res.status(204).json({ status: 'success' });
});
