const chai = require('chai')
const expect = chai.expect
const jwt = require('node-jsonwebtoken');


const requester = require('../../requester.spec')

const User = require('../models/user.model')() // note we need to call the model caching function


describe('user endpoints', async function () {
    this.beforeEach(async () => {
        // drop both collections before each test
        await Promise.all([User.deleteMany()])
    })
    let testUserId
    let token
    // drop both collections before each test
    const res = await requester.post('/user/register').send({
        name: "test",
        password: "password",
        email: "test@testmail2.mail",
        birthday: "2009-01-15"
    })
    token = res.body.token
    testUserId = res.body.user._id

    //post
    describe('integration tests', async function () {
        it('(POST /user) should create a new user', async function () {
            const testName = 'Joe'
            const res = await requester.post('/user').set({
                "Authorization": `Bearer ${token}`
            }).send({
                name: testName,
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            expect(res).to.have.status(201)
            expect(res.body).to.have.property('id')

            const user = await User.findOne({ name: testName })
            expect(user).to.have.property('name', testName)
        })
        it('(POST /user) should get validation error', async function () {
            const res = await requester.post('/user').set({
                "Authorization": `Bearer ${token}`
            }).send({

                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })
            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message', 'User validation failed: name: A user needs to have a firstname.')
        })
        it('(POST /user) Unauthorized error', async function () {
            const testName = 'Joe'
            const res = await requester.post('/user').send({
                name: testName,
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'You are not signed in')
        })
        //get

        it('(GET /user) schould get al users', async function () {
            const testNameA = 'Joe'
            const testNameB = 'Jane'
            await new User({ name: testNameA, email: "testNameA@mail.com", password: "password", birthday: "2000-01-01" }).save()
            await new User({ name: testNameB, email: "testNameB@mail.com", password: "password", birthday: "2000-01-01" }).save()
            const res = await requester.get('/user')
            expect(res).to.have.status(200)
            const users = res.body
            users.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : 1)
            expect(users).to.have.length(2)
            expect(users[0]).to.have.property('name', testNameB)

            expect(users[1]).to.have.property('name', testNameA)

        })
        //get by id 
        it('(GET /user/:id) should give a user', async function () {
            const pre = await requester.post('/user/register').send(
                { name: "testNameA", email: "testNameA@mail.com", password: "password", birthday: "2000-01-01" }
            )
            const preId = pre.body.user._id
            console.log("Dit is de logging", preId)
            const res = await requester.get('/user/' + preId)

            expect(res).to.have.status(200)
            expect(res.body).to.have.property('_id')

            const user = await User.findById(preId)
            expect(user).to.have.property('id', user.id)

        })
        //Failed get by ID
        it('(GET /user/:id) should give a error invalide _id', async function () {

            const res = await requester.get('/user/' + 1)

            expect(res).to.have.status(400)
            expect(res.body).to.have.property('message', 'Invalid resource id: 1')


        })
        it('(GET /user/:id) should give no response', async function () {

            const res = await requester.get('/user/' + "61b363b947cbb6517420cde5")

            expect(res).to.have.status(404)
            expect(res.body).to.have.property('message', 'There were no objects found')


        })


        //register
        it('(POST /register) should create a new user', async function () {
            const testName = 'Joe'
            const res = await requester.post('/user/register').set({
            }).send({
                name: testName,
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })



            expect(res).to.have.status(200)
            expect(res.body.user).to.have.property('_id')

            const user = await User.findOne({ name: testName })
            expect(user).to.have.property('name', testName)
        })
        it('(POST /register) should get a vallidation eroor', async function () {
            const testName = 'Joe'
            const res = await requester.post('/user/register').set({
            }).send({
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })



            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'The registration was not succesfull')
        })

        //login
        it('(POST /user/login) Should be loged in succesfull', async function () {
            const testName = 'Joe'
            const prep = await requester.post('/user/register').set({
            }).send({
                name: testName,
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            const res = await requester.post('/user/login').set({
            }).send({
                password: "password",
                email: "test@testmail1.mail",
            })
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('token')
        })
        it('(POST /user/login) should get a user not found error', async function () {

            const res = await requester.post('/user/login').set({
            }).send({
                password: "password",
                email: "test@.mail",
            })
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'User with this Email does not exist')
        })
        it('(POST /user/login) should get a validation error', async function () {

            const res = await requester.post('/user/login').set({
            }).send({
                password: "password"

            })
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('message', 'User with this Email does not exist')
        })
        //Put
        it('(PUT /user/:id) should get a not found error', async function () {

            const res = await requester.put('/user/' + "123").set({
                "Authorization": `Bearer ${token}`
            }).set({
            }).send({
                password: "password"

            })
            expect(res).to.have.status(400)
        })
        it('(PUT /user/:id) Succesfull edit', async function () {
            const prep = await requester.post('/user/register').set({
            }).send({
                name: "testName",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            const res = await requester.put('/user/' + prep.body.user._id).set({
            }).set({
                "Authorization": `Bearer ${token}`
            }).send({
                name: "testName2",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"

            })
            expect(res).to.have.status(204)
        })
        it('(PUT /user/:id) not authorized', async function () {
            const prep = await requester.post('/user/register').set({
            }).send({
                name: "testName",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            const res = await requester.put('/user/' + prep.body.user._id).set({
            }).send({
                name: "testName2",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"

            })
            expect(res).to.have.status(401)
        })

        //Delete
        it('(DELETE /user/:id) should get a not found error', async function () {

            const res = await requester.delete('/user/' + "123").set({
                "Authorization": `Bearer ${token}`
            }).set({
            }).send({
                password: "password"

            })
            expect(res).to.have.status(400)
        })
        it('(DELETE /user/:id) Succesfull deleted', async function () {
            const prep = await requester.post('/user/register').set({
            }).send({
                name: "testName",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            const res = await requester.delete('/user/' + prep.body.user._id).set({
            }).set({
                "Authorization": `Bearer ${token}`
            })
            expect(res).to.have.status(204)
        })
        it('(PUT /user/:id) not authorized', async function () {
            const prep = await requester.post('/user/register').set({
            }).send({
                name: "testName",
                password: "password",
                email: "test@testmail1.mail",
                birthday: "2009-01-15"
            })

            const res = await requester.delete('/user/' + prep.body.user._id).set({
            })
            expect(res).to.have.status(401)
        })
    })
})