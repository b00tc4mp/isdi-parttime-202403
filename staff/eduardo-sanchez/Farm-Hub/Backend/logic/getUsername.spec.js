import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getUsername from './getUsername.js'
import { User, Ad } from '../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe('logic - getUsername', () => {
    before(() =>
        mongoose
            .connect(MONGODB_URL_TEST)
            .then(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))
    )

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

    it('succeeds on getting Username from an existing user', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => Promise.all([
                User.create({
                    name: 'Li',
                    surname: 'Nux',
                    email: 'li@nux.com',
                    username: 'linux',
                    password: hash
                }),
                User.create({
                    name: "Soy",
                    surname: "Untest",
                    email: "soy@untest.com",
                    username: "soyuntest",
                    password: hash
                })
            ])
            )

            .then(([user, targetUser]) => getUsername(user.id, targetUser.id))
            .then(username => {
                console.log(username)
                expect(username.username).to.equal('soyuntest')
                // expect(username).to.equal('soyuntest')
                expect(username.username).to.be.a('string')
            })
    )

    after(() =>
        Ad.deleteMany()
            .then(() => User.deleteMany())
            .then(() => mongoose.disconnect())
    );
})


