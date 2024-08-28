import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity, Exercise, Answer } from '../../data/index.js'
import getExercises from './getExercises.js'
import { ContentError, NotFoundError } from 'com/errors.js'
import { CompleteSentenceExercise } from '../../data/Exercise.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('getExercises', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]))

    it('succeeds on getting exercises', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => CompleteSentenceExercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => CompleteSentenceExercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 })
                        .then(() => getExercises(user.id, activity.id)
                            .then(result => {
                                const { exercises, count } = result
                                expect(exercises).to.be.an('array')
                                expect(count).to.be.a('number')

                                expect(exercises).to.have.lengthOf(2)

                                expect(exercises[0].activity.toString()).to.equal(activity.id)
                                expect(exercises[0].sentence).to.equal('alan (hat) es gegessen')
                                expect(exercises[0].answer).to.equal('hat')
                                expect(exercises[0].index).to.equal(0)

                                expect(exercises[1].activity.toString()).to.equal(activity.id)
                                expect(exercises[1].sentence).to.equal('pepe (hat) es gesagt')
                                expect(exercises[1].answer).to.equal('hat')
                                expect(exercises[1].index).to.equal(1)
                            })))))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 })
                        .then(() => getExercises(new ObjectId().toString(), activity.id)))))
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
                .then(activity => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
                    .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 })
                        .then(() => getExercises(user.id, new ObjectId().toString())))))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getExercises(123, new ObjectId().toString())
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
            getExercises(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany(), Exercise.deleteMany(), Answer.deleteMany()]).then(() => mongoose.disconnect()))
})


// import 'dotenv/config'
// import bcrypt from 'bcryptjs'
// import mongoose, { Types } from 'mongoose'
// import { expect } from 'chai'

// import { User, Activity, Exercise } from '../../data/index.js'
// import getExercises from './getExercises.js'
// import { NotFoundError } from 'com/errors.js'

// const { ObjectId } = Types

// const { MONGODB_URL_TEST } = process.env

// describe('getExercises', () => {
//     before(() => mongoose.connect(MONGODB_URL_TEST))

//     beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

//     it('succeeds on getting exercises', () => {

//         return bcrypt.hash('12345678', 8)
//             .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
//             .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
//                 .then(activity => ({ user, activity })))
//             .then(({ user, activity }) =>
//                 Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
//                     .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 }))
//                     .then(() => ({ user, activity })))
//             .then(({ user, activity }) => getExercises(user.id, activity.id)
//                 .then(result => ({ user, activity, result })))
//             .then(({ result, user, activity }) => {
//                 const { exercises, count } = result

//                 expect(exercises).to.be.an('array')
//                 expect(count).to.be.a('number')

//                 expect(exercises[0].teacher).to.equal(user.id)
//                 expect(exercises[0].activity).to.equal(activity.id)
//                 expect(exercises[0].sentence).to.equal('alan (hat) es gegessen')
//                 expect(exercises[0].answer).to.equal('hat')
//                 expect(exercises[0].index).to.equal(0)

//                 expect(exercises[1].teacher).to.equal(user.id)
//                 expect(exercises[1].activity).to.equal(activity.id)
//                 expect(exercises[1].sentence).to.equal('pepe (hat) es gesagt')
//                 expect(exercises[1].answer).to.equal('hat')
//                 expect(exercises[1].index).to.equal(1)
//             })
//     })

//     it('fails on non-existing user', () => {
//         let errorThrown

//         return bcrypt.hash('12345678', 8)
//             .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
//             .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
//                 .then(activity => ({ user, activity })))
//             .then(({ user, activity }) =>
//                 Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
//                     .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 }))
//                     .then(() => activity))
//             .then(activity => getExercises(new ObjectId().toString(), activity.id))
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal('user not found')
//             })
//     })

//     it('fails on non-existing activity', () => {
//         let errorThrown

//         return bcrypt.hash('12345678', 8)
//             .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
//             .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
//                 .then(activity => ({ user, activity })))
//             .then(({ user, activity }) =>
//                 Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'alan (hat) es gegessen', answer: 'hat', index: 0 })
//                     .then(() => Exercise.create({ teacher: user.id, activity: activity.id, sentence: 'pepe (hat) es gesagt', answer: 'hat', index: 1 }))
//                     .then(() => user))
//             .then(user => getExercises(user.id, new ObjectId().toString()))
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal('activity not found')
//             })
//     })


//     after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
// })