const chai = require('chai')
const expect = chai.expect

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const User = require('./user.model')() // note we need to call the model caching function

describe('user model', function () {
    describe('unit tests', function () {
        it('should reject a missing user name', async function () {
            const user = new User({})

            await expect(user.save()).to.be.rejectedWith(Error)
        })


        it('should not create duplicate emails names', async function () {
            await new User({ email: 'Joe', name: 'joe', password: 'joe', birthday: '2002-02-01' }).save()
            const user = new User({ email: 'Joe', name: 'joe', password: 'joe', birthday: '2002-01-01' })

            await expect(user.save()).to.be.rejectedWith(Error)

            let count = await User.find().countDocuments()
            expect(count).to.equal(1)
        })
        it('should reject a missing user email', async function () {
            const user = new User({ name: "test" })

            await expect(user.save()).to.be.rejectedWith(Error)

        })
        it('should reject a missing user birthday', async function () {
            const user = new User({ name: "test", email: "mail" })

            await expect(user.save()).to.be.rejectedWith(Error)

        })
        it('should reject a missing user password', async function () {
            const user = new User({ name: "test", email: "mail", birthday: '2002-01-01' })

            await expect(user.save()).to.be.rejectedWith(Error)

        })
        it('should save the user', async function () {
            const test = new User({ name: "test", email: "mail", birthday: '2002-01-01', password: "password" })
            await test.save()
            const user = await User.findOne({ name: "test" })
            expect(user).to.have.property('name', "test")

        })
    })
})