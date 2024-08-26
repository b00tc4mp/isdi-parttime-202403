import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'
import getUserInfo from './getUserInfo.js'
import { User } from '../../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('getUserInfo', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds get userName from existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => Promise.all([User.create({
                name: 'Mocha',
                surname: 'Chai',
                email: 'Mocha@Chai.com',
                username: 'MochaChai',
                password: hash,
                userType: 'teacher'
            }), User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })]))
            .then(([user, targetUser]) => getUserInfo(user.id, targetUser.id)
                .then(userInfo => {
                    expect(userInfo).to.have.property('name').that.equals('Test');
                    expect(userInfo).to.have.property('surname').that.equals('User');
                    expect(userInfo).to.have.property('email').that.equals('test@user.com');
                    expect(userInfo).to.have.property('username').that.equals('testuser');
                })
            ))

    it('fails on non-existing user', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(userInfo => getUserInfo(new ObjectId().toString(), userInfo.id)))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Test',
                surname: 'User',
                email: 'test@user.com',
                username: 'testuser',
                password: hash,
                userType: 'teacher'
            })
                .then(user => getUserInfo(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('userInfo not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getUserInfo(12345, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid userInfo', () => {
        let errorThrown

        try {
            getUserInfo(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userInfoId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})