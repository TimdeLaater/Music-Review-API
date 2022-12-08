const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
const Exercise = require('./exercise.schema')();
chai.use(chaiAsPromised);

const User = require('./user.model')() // note we need to call the model caching function

describe('exercise model', async function () {
    this.beforeEach(async () => {
        // drop both collections before each test
        await Promise.all([User.deleteMany()])
    })
    describe('unit tests', function () {

        it('should reject a missing exercise name', async function () {
            const exercise = new Exercise({})

            await expect(exercise.save()).to.be.rejectedWith(Error)
        })

        it('should reject a missing userId', async function () {
            const exercise = new Exercise({ name: "test" })

            await expect(exercise.save()).to.be.rejectedWith(Error)

        })


        it('should save the exercise', async function () {
            const test = new Exercise({
                name: "squad",
                reps: "6",
                sets: "4",
                calories: "200",
                targetedMuscles: "quads, glutes",
                equipmentNeeded: true,
                userId: "61a7742f1218f624582dc902"
            })
            test.save()
            const exercise = await Exercise.findOne({ name: "squad" })
            expect(exercise).to.have.property('name', "squad")

        })
    })
})