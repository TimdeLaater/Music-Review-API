const chai = require('chai')
const expect = chai.expect
const jwt = require('node-jsonwebtoken');


const requester = require('../../requester.spec')
const Exercise = require('../models/exercise.schema')()

const User = require('../models/user.model')() // note we need to call the model caching function


describe('exercise endpoints', async function () {
    this.beforeEach(async () => {
        // drop both collections before each test
        await Promise.all([Exercise.deleteMany()])
    })
    describe('integration tests', async function () {
        //Post
        it('(POST /exercise) Succesfull post exercise', async function () {
            const testName = 'squad'
            const res = await requester.post('/exercise').send({
                name: testName,
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })

            expect(res).to.have.status(201)
            expect(res.body).to.have.property('id')

            const exercise = await Exercise.findOne({ name: testName })
            expect(exercise).to.have.property('name', testName)
        })
        //Get
        it('(GET /exercise) should get exercises', async function () {
            const testName = 'squad'

            await requester.post('/exercise').send({
                name: testName,
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            const res = await requester.get('/get')
            const exercise = await Exercise.findOne({ name: testName })
            expect(exercise).to.have.property('name', testName)

        })
        //GetById
        it('(GET /exercise/:id) get a exercise by id ', async function () {
            const testName = 'squad'

            const pre = await requester.post('/exercise').send({
                name: testName,
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            console.log('HEEEEe', pre.body.id)
            const res = await requester.get('/exercise/' + pre.body.id)
            expect(res).to.have.status(200)
            const exercise = await Exercise.findOne({ name: testName })

            expect(exercise).to.have.property('name', testName)

        })
        //Put
        it('(Put /exercise/:id) ', async function () {
            const testName = 'squad'

            const pre = await requester.post('/exercise').send({
                name: testName,
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            const res = await requester.put('/exercise/' + pre.body.id).send({
                name: "NewName",
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            expect(res).to.have.status(204)

        })
        //Delete
        it('(Delete /exercise/:id) ', async function () {
            const testName = 'squad'

            const pre = await requester.post('/exercise').send({
                name: testName,
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            const res = await requester.delete('/exercise/' + pre.body.id)
            expect(res).to.have.status(204)

        })

    })

})