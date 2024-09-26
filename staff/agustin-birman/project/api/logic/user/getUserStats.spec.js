import 'dotenv/config'
import mongoose, { Types } from 'mongoose'

import bcrypt from 'bcryptjs'

import getUserStats from './getUserStats.js'
import { Activity, Answer, User } from '../../data/index.js'
import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'
import { CompleteSentenceExercise, OrderSentenceExercise, VocabularyExercise } from '../../data/Exercise.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('getUserStats', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds get userName from existing user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Mocha',
                surname: 'Chai',
                email: 'Mocha@Chai.com',
                username: 'MochaChai',
                password: hash,
                userType: 'teacher'
            }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => CompleteSentenceExercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise1 => OrderSentenceExercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan hat es gegessen', translate: 'alan hat es gegessen', index: 0 })
                        .then(exercise2 => VocabularyExercise.create({ teacher: user.id, activity: activity.id, word: 'laufen', answer: ['hat'], index: 0 })
                            .then(exercise3 => Answer.create({ student: user.id, exercise: exercise1.id, activity: activity.id, answer: 'hat' })
                                .then(() => Answer.create({ student: user.id, exercise: exercise2.id, activity: activity.id, answer: 'alan hat es gegessen' })
                                    .then(() => Answer.create({ student: user.id, exercise: exercise3.id, activity: activity.id, answer: 'hat' })
                                        .then(() => getUserStats(user.id, user.id)))))))))
            .then(stats => {
                expect(stats.countActivities).to.equal(1)
                expect(stats.countExercises).to.equal(3)
                expect(stats.countCorrectExercises).to.equal(3)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(targetUser => getUserStats(new ObjectId().toString(), targetUser.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing targetUser', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => getUserStats(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('targetUser not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getUserStats(12345, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetUserId', () => {
        let errorThrown

        try {
            getUserStats(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('targetUserId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})