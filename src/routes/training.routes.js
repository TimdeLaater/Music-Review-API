const express = require('express')
const router = express.Router()

const Training = require('../models/training.schema')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')
const ExerciseCrudController = require('../controllers/exercise.controller')


const TrainingrudController = new CrudController(Training);
const ExerciseControllerCrud = new ExerciseCrudController(Training);

// create a user
router.post('/', TrainingrudController.create)

// get all users
router.get('/', TrainingrudController.getAll)

// get a user
router.get('/:id', TrainingrudController.getOne)

// update a user
router.put('/:id', TrainingrudController.update)

// remove a user
router.delete('/:id', TrainingrudController.delete)

router.post('/:id/addExercise', ExerciseControllerCrud.addExcercise)

module.exports = router