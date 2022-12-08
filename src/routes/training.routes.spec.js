const chai = require('chai')
const expect = chai.expect
const jwt = require('node-jsonwebtoken');


const requester = require('../../requester.spec')
const Training = require('../models/training.schema')()

const User = require('../models/user.model')() // note we need to call the model caching function


describe('training endpoints', async function () {
    this.beforeEach(async () => {
        // drop both collections before each test
        await Promise.all([Training.deleteMany()])
    })
    describe('integration tests', async function () {
        //Post
        it('(POST /training) succesfully post a training', async function () {
            const res = await requester.post('/training').send({
                finished: true,
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            expect(res).to.have.status(201)


            const training = await Training.findOne({ name: "squad" })
            expect(training).to.have.property('name', "squad")
        })

        //get
        it('(get /training) succesfully get a training', async function () {
            const req = await requester.post('/training').send({
                finished: true,
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })

            const res = await requester.get('/training')
            expect(res).to.have.status(200)


            const training = await Training.findOne({ name: "squad" })
            expect(training).to.have.property('name', "squad")
        })

        //getById
        it('(get /training) succesfully get a training', async function () {
            const req = await requester.post('/training').send({
                finished: true,
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.get('/training/' + id)
            expect(res).to.have.status(200)


            const training = await Training.findOne({ name: "squad" })
            expect(training).to.have.property('name', "squad")
        })


        //Delete
        it('(get /training) succesfully get a training', async function () {
            const req = await requester.post('/training').send({
                finished: true,
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.delete('/training/' + id)
            expect(res).to.have.status(204)
        })
        //Put
        it('(get /training) succesfully get a training', async function () {
            const req = await requester.post('/training').send({
                finished: true,
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.put('/training/' + id).send({
                finished: true,
                name: "testnaam",
                userId: "61a7742f1218f624582dc902"
            })
            expect(res).to.have.status(204)
        })
    })
})