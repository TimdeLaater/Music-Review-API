const express = require('express')
const ReviewController = require('../controllers/review.controller')
const router = express.Router()

const Album = require('../models/Album.schema')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')
const AlbumCrudController = new CrudController(Album)
const AlbumReviewController = new ReviewController(Album)

router.post('/', AlbumCrudController.create)

// get all exercise
router.get('/', AlbumCrudController.getAll)

// get a exercise
router.get('/:id', AlbumCrudController.getOne)

// update a exercise
router.put('/:id', AlbumCrudController.update)

// remove a exercise
router.delete('/:id', AlbumCrudController.delete)

// add a review
router.post('/:id/add/review', AlbumReviewController.addReview)

module.exports = router