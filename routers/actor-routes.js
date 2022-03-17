const express = require('express');

const {
  getAllActors,
  getActorById,
  createActor,
  updateActor,
  deleteActor
} = require('../controllers/actors-controllers');

const router = express.Router();

router.get('/', getAllActors);

router.get('/:id', getActorById);

router.post('/', createActor);

router.patch('/:id', updateActor);

router.delete('/:id', deleteActor);

module.exports = { actorsRouter: router };
