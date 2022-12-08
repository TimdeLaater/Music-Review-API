// this contains all basic CRUD endpoints on a schema

const errors = require("../errors")
const jwt = require('node-jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');
const neo = require('../../neo');
const { ObjectId } = require('mongodb');
const RSA_PRIVATE_KEY = fs.readFileSync('jwtRS256.key');

// the schema is supplied by injection
class controllerAuthentication {
    constructor(model) {
        this.model = model
    }

    // we HAVE to use lambda functions here, as they have
    // lexical scope for 'this'
    login = async (req, res, next) => {
        const user = await this.model.findOne({ email: req.body.email })

        if (user == null) {
            return res.status(401).json({
                message: 'User with this Email does not exist'
            });
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(await user.toJSON(), RSA_PRIVATE_KEY);
            return res.status(200).json({
                message: 'Login succesful',
                user,
                token,
            });
        } else {
            return res.status(401).json({
                message: 'invalid password',
            });
        }
    }
    register = async (req, res, next) => {
        delete req.body._id;
        let user = new this.model(req.body);

        user.password = await bcrypt.hash(req.body.password, 10);

        try {
            await user.save();
        } catch (error) {
            console.log(error);
            return res.status(401).send({
                code: 401,
                error: 'invalid registration ',
                message: 'The registration was not succesfull',
            });

        }

        console.log("saving user", user);
        if (user) {
            console.log("if user", user);
            const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
                expiresIn: '1d',
                subject: user._id.toString(),
            });

            const today = new Date();
            const date = new Date();
            date.setDate(today.getDate() + 1);

            // Add the user in the neo db
            // const session = neo.session();

            // console.log(user._id.toString());
            // await session.run(neo.addUser, {
            //     userId: user._id.toString(),
            //     userName: user.name,
            // });

            res.status(200).json({
                token: jwtBearerToken,
                expires: date,
                user,
            });
        }
    };
    validate = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const secret = RSA_PRIVATE_KEY;
            console.log(secret);
            console.log(token);
            jwt.verify(token, secret);
            req.user = jwt.decode(token);
            next();
        } catch (e) {
            return res.status(401).send({
                code: 401,
                error: 'Unauthorized ',
                message: 'You are not signed in',
            });
        }
    };
    addFriend = async (req, res, next) => {
        const session = neo.session();

        console.log(req.body.friendUser);
        const friendToAdd = await this.model.findById(req.body.friendUser);
        console.log(friendToAdd);
        await session.run(neo.addFriend, {
            friendUser: friendToAdd.name,
            friendUserId: friendToAdd._id.toString(),
            currentUserId: req.body.currentUser,
        });
        res.status(201).send("Succes");
    };

    getFriends = async (req, res) => {
        const session = neo.session();
        let result = '';
        let users = [];

        try {
            result = await session.run(neo.getFriends, {
                currentUser: req.params.currentUser,
            });
        } catch (error) {
            console.log('TEST', error);
        }

        for (let i = 0; i < result.records.length; i++) {
            users.push(await this.model.findById(result.records[i].get('yourFriends').properties.id));
        }

        res.status(200).json(users);
    };

}

module.exports = controllerAuthentication