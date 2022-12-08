const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const getModel = require('./model_cache')

const ExerciseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A exercise needs to have a name.']
    },
    reps: {
        type: Number,
    },
    sets: {
        type: Number
    },
    calories: {
        type: Number,
    },
    targetedMuscles: {
        type: String,
    },
    equipmentNeeded: {
        type: Boolean,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a exercise.'],
        ref: 'user'
    }
})



module.exports = getModel('Exercise', ExerciseSchema)