const express = require('express')
const router = express.Router()

const User = require('../models/user.model')() // note we need to call the model caching function

const CrudController = require('../controllers/crud')
const controllerAuthentication = require('../controllers/controllerAuthentication')

const UserCrudController = new CrudController(User)
const AuthController = new controllerAuthentication(User)


// create a user
router.post('/', AuthController.validate, UserCrudController.create)

// get all users
router.get('/', UserCrudController.getAll)

// get a user
router.get('/:id', UserCrudController.getOne)

// update a user

router.put('/:id', UserCrudController.update)


// remove a user
router.delete('/:id', UserCrudController.delete)

// router.delete('/:id', AuthController.validate, UserCrudController.delete)
//login
router.post('/login', AuthController.login)
//register
router.post('/register', AuthController.register)

//friends
// router.get('/friends/:currentUser', function (req, res, next) {
//     AuthController.getFriends(req, res, next);
// });
// router.post('/friends', function (req, res, next) {
//     AuthController.addFriend(req, res, next);
// });



module.exports = router