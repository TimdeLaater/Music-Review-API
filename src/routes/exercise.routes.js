const express = require('express')
const router = express.Router()

const Exercise = require('../models/exercise.schema')()// note we need to call the model caching function
const ExerciseController = require('../controllers/crud')
const ExerciseCrudController = new ExerciseController(Exercise)


// create a exercise
router.post('/', ExerciseCrudController.create)

// get all exercise
router.get('/', ExerciseCrudController.getAll)

// get a exercise
router.get('/:id', ExerciseCrudController.getOne)

// update a exercise
router.put('/:id', ExerciseCrudController.update)

// remove a exercise
router.delete('/:id', ExerciseCrudController.delete)

module.exports = router