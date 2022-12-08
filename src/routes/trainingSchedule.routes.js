const express = require('express')
const router = express.Router()

const TrainingSchedule = require('../models/trainingSchedule.model')()

const CrudController = require('../controllers/crud')
const TrainingCrudController = require('../controllers/training.controller')

const TrainingScheduleCrudController = new CrudController(TrainingSchedule);
const TrainingControllerCrud = new TrainingCrudController(TrainingSchedule)

// create a user
router.post('/', TrainingScheduleCrudController.create)

// get all users
router.get('/', TrainingScheduleCrudController.getAll)

// get a user
router.get('/:id', TrainingScheduleCrudController.getOne)

// update a user
router.put('/:id', TrainingScheduleCrudController.update)

// remove a user
router.delete('/:id', TrainingScheduleCrudController.delete)

router.post('/:id/addTraining', TrainingControllerCrud.addTraining)

module.exports = router