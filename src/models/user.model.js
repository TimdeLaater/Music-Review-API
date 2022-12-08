const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const UserSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A user needs to have a firstname.'],
    },

    // users email needs be a email
    //TODO: Add email validation
    email: {
        type: String,
        required: [true, 'A user needs to have a Emailadress'],
        unique: [true, 'A user needs to have a unique Emailadress'],
    },
    //TODO: Add birthday is in the past validation
    password: {
        type: String,
        required: [true, 'A user needs to have a Password'],
    },

})


// export the user model through a caching function
module.exports = getModel('User', UserSchema)