const chai = require('chai')
const expect = chai.expect
const jwt = require('node-jsonwebtoken');


const requester = require('../../requester.spec')
const Schedule = require('../models/trainingSchedule.model')()

const User = require('../models/user.model')() // note we need to call the model caching function


describe('trainingSchedule endpoints', async function () {
    this.beforeEach(async () => {
        // drop both collections before each test
        await Promise.all([Schedule.deleteMany()])
    })
    describe('integration tests', async function () {
        //Post
        it('(POST /schedule) succesfully post a schedule', async function () {
            const res = await requester.post('/schedule').send({
                startDate: "2002-01-01",
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            expect(res).to.have.status(201)


            const schedule = await Schedule.findOne({ name: "squad" })
            expect(schedule).to.have.property('name', "squad")
        })

        //get
        it('(get /schedule) succesfully get a schedule', async function () {
            const req = await requester.post('/schedule').send({
                finished: true,
                startDate: "2002-01-01",
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })

            const res = await requester.get('/schedule')
            expect(res).to.have.status(200)


            const schedule = await Schedule.findOne({ name: "squad" })
            expect(schedule).to.have.property('name', "squad")
        })

        //getById
        it('(get /training) succesfully get a training', async function () {
            const req = await requester.post('/schedule').send({
                startDate: "2002-01-01",
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.get('/schedule/' + id)
            expect(res).to.have.status(200)


            const schedule = await Schedule.findOne({ name: "squad" })
            expect(schedule).to.have.property('name', "squad")
        })


        //Delete
        it('(get /schedule) succesfully get a schedule', async function () {
            const req = await requester.post('/schedule').send({
                startDate: "2002-01-01",
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.delete('/schedule/' + id)
            expect(res).to.have.status(204)
        })
        //Put
        it('(get /schedule) succesfully get a schedule', async function () {
            const req = await requester.post('/schedule').send({
                startDate: "2002-01-01",
                name: "squad",
                userId: "61a7742f1218f624582dc902"
            })
            console.log('id log', req.body.id)
            const id = req.body.id
            const res = await requester.put('/schedule/' + id).send({
                startDate: "2002-01-01",
                name: "testnaam",
                userId: "61a7742f1218f624582dc902"
            })
            expect(res).to.have.status(204)
        })
    })
})