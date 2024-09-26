import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import createVocabulary from './createVocabulary.js'

import { User, Activity, Exercise } from '../../data/index.js'

import { expect } from 'chai'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createVocabulary', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany()]))

    it('succeeds on creating exercise', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => createVocabulary(user.id, activity.id, 'laufen', ['run', 'go', 'walk'])))
            .then(() => Exercise.findOne())
            .then(exercise => {
                expect(exercise.word).to.equal('laufen')
                expect(exercise.answer).to.deep.equal(['run', 'go', 'walk'])
                expect(exercise.index).to.be.a('number').and.to.equal(0)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => createVocabulary(new ObjectId().toString(), activity.id, 'laufen', ['run', 'go', 'walk'])))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing activity', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(() => createVocabulary(user.id, new ObjectId().toString(), 'laufen', ['run', 'go', 'walk'])))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            createVocabulary(123, new ObjectId().toString(), 'laufen', ['run', 'go', 'walk'])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid activityId', () => {
        let errorThrown
        try {
            createVocabulary(new ObjectId().toString(), 123, 'laufen', ['run', 'go', 'walk'])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })

    it('fails on invalid word', () => {
        let errorThrown
        try {
            createVocabulary(new ObjectId().toString(), new ObjectId().toString(), 123, ['run', 'go', 'walk'])
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('word is not valid')
        }
    })

    it('fails on invalid answer', () => {
        let errorThrown
        try {
            createVocabulary(new ObjectId().toString(), new ObjectId().toString(), '123213', 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('answers is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany()]).then(() => mongoose.disconnect()))
})