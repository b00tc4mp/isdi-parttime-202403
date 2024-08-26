import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity, Exercise } from '../../data/index.js'

import { NotFoundError, ContentError } from 'com/errors.js'

import editExercise from './editExercise.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe('editExercise', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany()]))

    it('succeeds on editing exercise', () => {
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(exercise => editExercise(user.id, exercise.id, 'ich (habe) es gesagt')
                        .then(() => Exercise.findById(exercise.id)))))

            .then(exerciseResult => {
                expect(exerciseResult.sentence).to.equal('ich (habe) es gesagt')
                expect(exerciseResult.answer).to.equal('habe')
                expect(exerciseResult.index).to.be.a('number').and.to.equal(0)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => ({ user, activity })))
            .then(({ user, activity }) => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 }))
            .then(exercise => editExercise(new ObjectId().toString(), exercise.id, 'ich (habe) es gesagt'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing exercise', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => ({ user, activity })))
            .then(({ user, activity }) => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                .then(() => user))
            .then(user => editExercise(user.id, new ObjectId().toString(), 'ich (habe) es gesagt'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('exercise not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            editExercise(123, new ObjectId().toString(), 'ich (habe) es gesagt')
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
            editExercise(new ObjectId().toString(), 123, 'ich (habe) es gesagt')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('exerciseId is not valid')
        }
    })

    it('fails on invalid sentence', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => ({ user, activity })))
            .then(({ user, activity }) => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                .then(exercise => ({ user, exercise })))
            .then(({ user, exercise }) => editExercise(user.id, exercise.id, 12345))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(ContentError)
                expect(errorThrown.message).to.equal('sentence is not valid')
            })
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany()]).then(() => mongoose.disconnect()))
})