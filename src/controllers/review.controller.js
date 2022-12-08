
const { async } = require("rxjs");
const errors = require("../errors")

// the schema is supplied by injection
class ReviewController {
    constructor(model) {
        console.log(model);
        this.model = model
    }

    addReview = async (req, res, next) => {
        console.log(req.body);
        console.log(req.params.id);
        const album = await this.model.findById(req.params.id);
        album.reviews.push(req.body.review);
        await training.save();
        res.status(201).json();
    }
    removeReview = async (req, res, next) => {
        console.log(req.body);
        console.log(req.params.id);
        const album = await this.model.findById(req.params.id);
        album.reviews.id(req.body.reviewId).remove();
        album.save();

    }
}

module.exports = ReviewController;