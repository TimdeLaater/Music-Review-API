const express = require('express')
const router = express.Router()

const Artist = require('../models/Artist.schema')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')
const ArtistCrudController = new CrudController(Artist)

router.post('/add', ArtistCrudController.create)

// get all exercise
router.get('/', ArtistCrudController.getAll)

// get a exercise
router.get('/:id', ArtistCrudController.getOne)

// update a exercise
router.put('/:id', ArtistCrudController.update)

// remove a exercise
router.delete('/:id', ArtistCrudController.delete)

module.exports = router