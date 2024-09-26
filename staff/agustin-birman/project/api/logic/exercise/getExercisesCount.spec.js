import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity, Exercise, Answer } from '../../data/index.js'
import getExercisesCount from './getExercisesCount.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('getExercisesCount', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]))

    it('succeeds on getting exercisesCount', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 })
                        .then(() => getExercisesCount(user.id, activity.id)
                            .then(count => {

                                expect(count).to.be.a('number')

                                expect(count).to.be.equal(2)


                            })))))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => getExercisesCount(new ObjectId().toString(), activity.id)))
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
                .then(activity => getExercisesCount(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getExercisesCount(123, new ObjectId().toString())
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
            getExercisesCount(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]).then(() => mongoose.disconnect()))
})

