import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity, Exercise, Answer } from '../../data/index.js'
import getExerciseType from './getExerciseType.js'
import { ContentError, NotFoundError } from 'com/errors.js'
import { CompleteSentenceExercise, OrderSentenceExercise } from '../../data/Exercise.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('getExerciseType', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]))

    it('succeeds on getting exercisesCount', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => CompleteSentenceExercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => getExerciseType(user.id, activity.id)
                        .then(type => {
                            expect('completeSentence'.toLowerCase()).to.equal('completesentence')
                        }))))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => getExerciseType(new ObjectId().toString(), activity.id)))
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
                .then(activity => getExerciseType(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getExerciseType(123, new ObjectId().toString())
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
            getExerciseType(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]).then(() => mongoose.disconnect()))
})

