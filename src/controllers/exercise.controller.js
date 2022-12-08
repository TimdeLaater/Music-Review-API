
const errors = require("../errors")

// the schema is supplied by injection
class ExerciseCrudController {
    constructor(model) {
        console.log(model);
        this.model = model
    }

    addExcercise = async (req, res, next) => {
        console.log(req.body);
        console.log(req.params.id);
        const training = await this.model.findById(req.params.id);
        training.excercises.push(req.body.id);
        await training.save();
        res.status(201).json();
    }
}

module.exports = ExerciseCrudController;