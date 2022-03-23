const express = require('express');

const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  loginUser
} = require('../controllers/users-controllers');

const { validateSession } = require('../middlewares/auth-middleware');

const router = express.Router();

router.get('/', validateSession, getAllUsers);

router.get('/:id', validateSession, getUserById);

router.post('/', validateSession, createNewUser);

router.patch('/:id', validateSession, updateUser);

router.delete('/:id', validateSession, deleteUser);

router.post('/login', loginUser);

module.exports = { usersRouter: router };
