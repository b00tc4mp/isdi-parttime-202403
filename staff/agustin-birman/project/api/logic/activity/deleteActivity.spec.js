import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User, Activity } from '../../data/index.js'

import deleteActivity from './deleteActivity.js'
import { ContentError, MatchError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deleteActivity', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeeds on deleting activity', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => ({ user, activity })))
            .then(({ user, activity }) => deleteActivity(user.id, activity.id)
                .then(() => Activity.findById(activity.id)))
            .then(activity => {
                expect(activity).to.be.null
            })
    })

    it('fails on non-matching user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
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
            .then(([user1, user2]) => Activity.create({ teacher: user1.id, title: 'title', description: 'description' })
                .then(activity => ({ user1, user2, activity })))
            .then(({ user2, activity }) => deleteActivity(user2.id, activity.id)
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(MatchError)
                    expect(errorThrown.message).to.equal('you are not the owner of the activity')
                }))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => deleteActivity(new ObjectId().toString(), activity.id))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('user not found')
                }))
    })

    it('fails on invalid user', () => {
        let errorThrown
        try {
            deleteActivity(123, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on non-existing activity', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(() => deleteActivity(user.id, new ObjectId().toString()))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('activity not found')
                }))
    })

    it('fails on invalid activity', () => {
        let errorThrown
        try {
            deleteActivity(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })



    after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
})