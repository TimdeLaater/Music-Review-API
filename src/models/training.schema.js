const mongoose = require('mongoose');
const Exercise = require('./exercise.schema');
const Schema = mongoose.Schema;


const getModel = require('./model_cache')

const TrainingSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A exercise needs to have a name.']
    },

    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'A user needs to be attached to a exercise.'],
        ref: 'user'
    },

    // finished: boolean
    finished: {
        type: Boolean,
        default: false

    },
    excercises: [{
        type: Schema.Types.ObjectId,
        ref: 'Exercise'
    }]
},
);
// TransactionSchema.method('getNotebook', function (cb) {
//     Notebook.findById(this.notebookId, function (err, notebook) {
//         cb(notebook);
//     })
// });

// TrainingSchema.virtual('totalCal', function (cb) {
//     if (this.excercises.length === 0) {
//         cb("no Exercises")
//     } else {
//         let sum = 0
//         for (let exerciseId of this.excercises) {
//             let exercise = Exercise.findById(exerciseId);
//             sum += exercise.calories
//         }
//         cd(sum)
//     }
// })

// TrainingSchema.virtual('totalCal').get(function () {
//     // if there are no reviews we give back a message
//     if (this.excercises.length === 0) {
//         return "no Exercises" 
//     } else {

//         let sum = 0
//         for (let exerciseId of this.excercises) {

//             sum += exerciseId.calories
//         }
//         return sum
//     }
// })



module.exports = getModel('Training', TrainingSchema)