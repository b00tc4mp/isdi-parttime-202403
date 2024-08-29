import 'dotenv/config'
import mongoose, { Types } from "mongoose"
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { Game, User } from '../data/index.js'

import editUsername from './editUsername.js'
import { ContentError, NotFoundError, DuplicityError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

// npm run test-inspect

describe('succeeds editUsername', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succeds on existing user', () => {
        bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('Mocha')
                expect(user.username).to.equal('MochaChai')
                expect(user.email).to.equal('Mocha@Chai.com')
                expect(user.password).to.equal('123132123')
            })
    })

    it('succeeds in editing the username', () => {
        return bcrypt.hash('123132123', 8)
            .then(hash => User.create({ name: 'Mocha', username: 'MochaChai', email: 'Mocha@Chai.com', password: hash }))
            .then(user => {
                return editUsername(user._id, 'Adrian')
                    .then(updatedUser => {

                        expect(updatedUser.name).to.equal('Mocha')
                        expect(updatedUser.username).to.equal('Adrian')
                        expect(updatedUser.email).to.equal('Mocha@Chai.com')

                        return bcrypt.compare('123132123', updatedUser.password)
                            .then(isMatch => {
                                expect(isMatch).to.be.true
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        return editUsername(new ObjectId().toString(), 'Adrian')
            .then(() => {
                throw new Error('Expected NotFoundError was not thrown')
            })
            .catch(error => {
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })


    it('fails on duplicate username', () => {
        const username = 'ExistingUser';
        let user;

        return bcrypt.hash('password123', 8)
            .then(hash => User.create({ name: 'User', username: username, email: 'user@example.com', password: hash }))
            .then(createdUser => {
                user = createdUser;

                return bcrypt.hash('anotherpassword123', 8)
                    .then(hash => User.create({ name: 'AnotherUser', username: username, email: 'anotheruser@example.com', password: hash }))
                    .catch(() => {
                    });
            })
            .then(() => {
                return editUsername(user._id, username);
            })
            .then(() => {
                throw new Error('Expected DuplicityError was not thrown');
            })
            .catch(error => {
                expect(error).to.be.an.instanceOf(DuplicityError);
                expect(error.message).to.equal('Username already exists');
            });
    });


    it('fail on invalid userId', () => {
        let errorThrown

        try {
            editUsername('iñaki', 'Adrian')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fail on invalid username', () => {
        let errorThrown

        try {
            editUsername(new ObjectId().toString(), 'iñaki')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })


    after(() => Promise.all([User.deleteMany()]).then(() => mongoose.disconnect()))
})