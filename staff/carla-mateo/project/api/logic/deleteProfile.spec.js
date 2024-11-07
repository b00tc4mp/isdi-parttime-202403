import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import deleteProfile from './deleteProfile.js'
import { User } from '../data/index.js'

import { expect } from 'chai'
import { MatchError, NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('deleteTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succeeds on delete user', () => {
        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'ana',
                username: 'maria',
                email: 'ana@email.es',
                password: hash,
                role: 'admin',
                family: 'Casa'
            }))
            .then(user => {
                return bcrypt.hash('1234', 8)
                    .then(hash => User.create({
                        name: 'ojo',
                        username: 'alcon',
                        email: 'ojo@email.es',
                        password: hash,
                        role: 'user',
                        family: 'Casa'
                    }))
                    .then(secondUser => ({ user, secondUser }))
            })
            .then(({ user, secondUser }) => deleteProfile(user.id, secondUser.id)
                .then(() => User.findById(secondUser.id))
            )
            .then(deletedUser => {
                expect(deletedUser).to.exist
                expect(deletedUser.active).to.be.undefined
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return deleteProfile(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteProfile(6666, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})