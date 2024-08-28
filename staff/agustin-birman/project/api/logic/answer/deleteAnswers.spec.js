import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import deleteAnswers from './deleteAnswers.js'
import { expect } from 'chai'
import { User, Activity, Exercise, Answer } from '../../data/index.js'
import { ContentError, CredentialsError, NotFoundError } from 'com/errors.js'
const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types


describe('deleteAnswers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]))

    it('suceeds on deleting answers', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise1 => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                        .then(exercise2 => Answer.create({ student: user.id, exercise: exercise1.id, activity: activity.id, answer: 'hat' })
                            .then(answer1 => Answer.create({ student: user.id, exercise: exercise2.id, activity: activity.id, answer: 'haben' })
                                .then(answer2 => deleteAnswers(user.id, activity.id)
                                    .then(() => Answer.find({ activity: activity.id })
                                        .then(answers => expect(answers).to.be.an('array').that.is.empty))))))))
    })

    it('fails non-same user', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => Promise.all([
                User.create({
                    name: 'Mocha',
                    surname: 'Chai',
                    email: 'Mocha@Chai.com',
                    username: 'MochaChai',
                    password: hash,
                    userType: 'teacher'
                }),
                User.create({
                    name: 'Test',
                    surname: 'User',
                    email: 'test@user.com',
                    username: 'testuser',
                    password: hash,
                    userType: 'student'
                })
            ]))
            .then(([user, fakeUser]) => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise1 => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                        .then(exercise2 => Answer.create({ student: user.id, exercise: exercise1.id, activity: activity.id, answer: 'hat' })
                            .then(answer1 => Answer.create({ student: user.id, exercise: exercise2.id, activity: activity.id, answer: 'haben' })
                                .then(answer2 => deleteAnswers(fakeUser.id, activity.id))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                                    expect(errorThrown.message).to.equal('you cannot delete this answer')
                                }))))))
    })

    it('fails non-existing user', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise1 => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                        .then(exercise2 => Answer.create({ student: user.id, exercise: exercise1.id, activity: activity.id, answer: 'hat' })
                            .then(answer1 => Answer.create({ student: user.id, exercise: exercise2.id, activity: activity.id, answer: 'haben' })
                                .then(answer2 => deleteAnswers(new ObjectId().toString(), activity.id))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                    expect(errorThrown.message).to.equal('user not found')
                                }))))))
    })

    it('fails non-existing activity', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise1 => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                        .then(exercise2 => Answer.create({ student: user.id, exercise: exercise1.id, activity: activity.id, answer: 'hat' })
                            .then(answer1 => Answer.create({ student: user.id, exercise: exercise2.id, activity: activity.id, answer: 'haben' })
                                .then(answer2 => deleteAnswers(user.id, new ObjectId().toString()))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                    expect(errorThrown.message).to.equal('activity not found')
                                }))))))
    })

    it('fails non-existing exercise', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => deleteAnswers(user.id, activity.id))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('exercise not found')
                }))
    })

    it('fails non-existing answer', () => {
        let errorThrown
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => deleteAnswers(user.id, activity.id))
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('answer not found')
                    })))
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            deleteAnswers(123, new ObjectId().toString())
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
            deleteAnswers(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })
    after(() => () => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]).then(() => mongoose.disconnect()))
})