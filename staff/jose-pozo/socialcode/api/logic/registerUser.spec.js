import 'dotenv'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import registerUser from '../logic/registerUser.js'
import { User } from '../data/index.js'
import { DuplicityError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on register user', () =>

        it("succeeds on new user", () =>
            registerUser("Jon", "Snow", "jon@snow.com", "jonsnow", "1234", "1234")
                .then(() => User.findOne())
                .then(user => {
                    expect(user.name).to.equal("Mocha")
                    expect(user.surname).to.equal("Chai")
                    expect(user.email).to.equal("Mocha@Chai.com")
                    expect(user.username).to.equal("MochaChai")

                    return bcrypt.compare("1234", user.password)
                })
                .then((match) => expect(match).to.be.true)
        )



        // bcrypt.hash('1234', 8)
        //     .then(hash => User.create({
        //         name: 'Jon',
        //         surname: 'Snow',
        //         email: 'jon@snow.com',
        //         username: 'JonSnow',
        //         password: hash
        //     }))
        //     .then(user => registerUser(user.name, user.surname, user.email, user.username, '1234', '1234'))
        //     .then(user => {
        //         expect(user).to.be.an.object
        //         expect(user).to.be.a.string
        //     })
    )

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})