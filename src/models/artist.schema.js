const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

const ArtistSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A artist needs a name.'],
    },

    description: {
        type: String,
        required: [true, 'A Artist needs a description'],
    },
    birthday: {
        type: String,
        required: [true, 'Artist needs a birthday'],
    },
    genre: {
        type: String,
        required: [true, 'A artist needs a genre'],
    },
    coverImg: {
        type: String,
        required: [true, 'A artist needs a coverImg'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a Artist.'],
        ref: 'user'
    },

})


// export the user model through a caching function
module.exports = getModel('Artist', ArtistSchema)