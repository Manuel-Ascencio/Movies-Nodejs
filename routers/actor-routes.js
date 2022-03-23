const express = require('express');

const {
  getAllActors,
  getActorById,
  createNewActor,
  updateActor,
  deleteActor
} = require('../controllers/actors-controllers');

const { validateSession } = require('../middlewares/auth-middleware');

const router = express.Router();

router.get('/', validateSession, getAllActors);

router.get('/:id', getActorById);

router.post('/', createNewActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
