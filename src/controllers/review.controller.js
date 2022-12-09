
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
        album.reviews.push(req.body);
        await album.save();
        res.status(201).json();
    }
    removeReview = async (req, res, next) => {
        console.log(req.params.id);
        console.log(req.params.reviewId);
        const album = await this.model.findById(req.params.id);
        console.log(album)
        album.reviews.id(req.params.reviewId).remove();
        album.save();
        res.status(204).json();

    }
    //get all met populate

}

module.exports = ReviewController;