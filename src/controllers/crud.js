// this contains all basic CRUD endpoints on a schema

const errors = require("../errors")

// the schema is supplied by injection
class CrudController {
    constructor(model) {
        this.model = model
    }

    // we HAVE to use lambda functions here, as they have
    // lexical scope for 'this'
    create = async (req, res, next) => {
        console.log(req.body);
        const entity = new this.model(req.body)
        console.log(entity);
        await entity.save()
        res.status(201).json({ id: entity.id })
    }

    getAll = async (req, res, next) => {
        const entities = await this.model.find()
        res.status(200).send(entities)
    }

    getOne = async (req, res, next) => {
        const entity = await this.model.findById(req.params.id)
        console.log(entity)
        if (entity) {
            res.status(200).send(entity)
        } else {
            res.status(404).send({
                code: 404,
                error: 'Not found ',
                message: 'There were no objects found',
            });
        }

    }

    update = async (req, res, next) => {
        await this.model.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).end()
    }

    delete = async (req, res, next) => {
        // this happens in two steps to make mongoose middleware run
        const entity = await this.model.findById(req.params.id)
        await entity.delete()
        res.status(204).end()
    }
}

module.exports = CrudController