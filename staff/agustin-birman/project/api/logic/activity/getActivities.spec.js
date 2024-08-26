import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity } from '../../data/index.js'
import getActivities from './getActivities.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types

const { MONGODB_URL_TEST } = process.env

describe('getActivities', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeeds on getting activities', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user =>
                Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                    .then(() => Activity.create({ teacher: user.id, title: 'title2', description: 'description2' }))
                    .then(() => getActivities(user.id)))
            .then(activities => {
                expect(activities).to.be.an('array')
                expect(activities).to.have.lengthOf(2)

                expect(activities[0].teacher).to.equal(activities[0].teacher)
                expect(activities[0].title).to.equal('title')
                expect(activities[0].description).to.equal('description')

                expect(activities[1].teacher).to.equal(activities[1].teacher)
                expect(activities[1].title).to.equal('title2')
                expect(activities[1].description).to.equal('description2')
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Promise.all([
                Activity.create({ teacher: user.id, title: 'title', description: 'description' }),
                Activity.create({ teacher: user.id, title: 'title2', description: 'description2' })
            ]))
            .then(() => getActivities(new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getActivities(123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
})