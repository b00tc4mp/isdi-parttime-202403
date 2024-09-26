import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { Activity, Answer, Exercise, User } from '../../data/index.js'
import { ContentError, NotFoundError } from 'com/errors.js'
import getAnswers from './getAnswers.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types

describe('getAnswers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]))

    it('succeds on getting answers', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise => Answer.create({ student: user.id, exercise: exercise.id, activity: activity.id, answer: 'hat' })
                        .then(() => getAnswers(user.id, exercise.id)
                            .then(answers => {
                                const answer = answers[0]
                                expect(answer).to.be.an('object').that.is.not.empty
                                expect(answer.student.toString()).to.equal(user.id)
                                expect(answer.exercise.toString()).to.equal(exercise.id)
                                expect(answer.activity.toString()).to.equal(activity.id)
                                expect(answer.answer.toString()).to.equal('hat')
                            })))))
    })

    it('fails on non-existing user', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise => Answer.create({ student: user.id, exercise: exercise.id, activity: activity.id, answer: 'hat' })
                        .then(() => getAnswers(new ObjectId().toString(), exercise.id))
                        .catch(error => errorThrown = error)
                        .finally(() => {
                            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                            expect(errorThrown.message).to.equal('user not found')
                        }))))
    })

    it('fails on non-existing exercise', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise => Answer.create({ student: user.id, exercise: exercise.id, activity: activity.id, answer: 'hat' })
                        .then(() => getAnswers(user.id, new ObjectId().toString()))
                        .catch(error => errorThrown = error)
                        .finally(() => {
                            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                            expect(errorThrown.message).to.equal('exercise not found')
                        }))))
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getAnswers(123, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid exerciseId', () => {
        let errorThrown
        try {
            getAnswers(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('exerciseId is not valid')
        }
    })
})