const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getModel = require('./model_cache')

// const ReviewSchema = new Schema({
//     title: {
//         type: String,
//         required: [true, "A Review needs a title"]
//     },
//     review: {
//         type: String,
//         required: [true, "A Review needs a review"]
//     },
//     rating: {
//         type: Number,
//         required: [true, 'A review needs a rating']
//     },
//     userId: {
//         type: Schema.Types.ObjectId,
//         required: [true, 'A user needs to be attached to a Album.'],
//         ref: 'user'
//     },


// })

const AlbumSchema = new Schema({
    // a user needs to have a name
    name: {
        type: String,
        required: [true, 'A album needs a name.'],
    },

    description: {
        type: String,
        required: [true, 'A album needs a description'],
    },
    releaseDate: {
        type: String,
        required: [true, 'album needs a releaseDate'],
    },
    genre: {
        type: String,
        required: [true, 'A album needs a genre'],
    },
    language: {
        type: String,
        required: [true, 'A album needs a genre'],
    },
    coverImg: {
        type: String,
        required: [true, 'A artist needs a coverImg'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a Album.'],
        ref: 'user'
    },
    artistId: {
        type: Schema.Types.ObjectId,
        ref: 'artist'
    },
    reviews: [{
        title: {
            type: String,
            required: [true, "A Review needs a title"]
        },
        review: {
            type: String,
            required: [true, "A Review needs a review"]
        },
        rating: {
            type: Number,
            required: [true, 'A review needs a rating']
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'A user needs to be attached to a Album.'],
            ref: 'user'
        },
    }]

})
module.exports = getModel('Album', AlbumSchema)
// module.exports = getModel('Review', ReviewSchema)