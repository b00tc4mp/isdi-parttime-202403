import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import editActivity from './editActivity.js'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { Activity, User } from '../../data/index.js'
import { ContentError, NotFoundError } from 'com/errors.js'
const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('editActivity', () => {

    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeeds on editing activity', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => editActivity(user.id, activity.id, 'title2', 'description2')
                    .then(() => Activity.findById(activity.id))))
            .then(activityEditted => {
                expect(activityEditted.title).to.equal('title2')
                expect(activityEditted.description).to.equal('description2')
            })
    })


    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' }))
            .then(activity => editActivity(new ObjectId().toString(), activity.id, 'title2', 'description2'))
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
                .then(() => editActivity(user.id, new ObjectId().toString(), 'title2', 'description2')))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            editActivity(123, new ObjectId().toString(), 'title2', 'description2')
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
            editActivity(new ObjectId().toString(), 123, 'title2', 'description2')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown
        try {
            editActivity(new ObjectId().toString(), new ObjectId().toString(), 123, 'description2')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown
        try {
            editActivity(new ObjectId().toString(), new ObjectId().toString(), 'title', 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
})

