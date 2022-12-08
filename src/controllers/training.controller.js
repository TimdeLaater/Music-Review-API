
const errors = require("../errors")

// the schema is supplied by injection
class TrainingCrudController {
    constructor(model) {
        console.log(model);
        this.model = model
    }

    addTraining = async (req, res, next) => {
        console.log(req.body);
        console.log(req.params.id);
        const trainingSchedule = await this.model.findById(req.params.id);
        trainingSchedule.workouts.push(req.body.id);
        await trainingSchedule.save();
        res.status(201).json();
    }
}

module.exports = TrainingCrudController;