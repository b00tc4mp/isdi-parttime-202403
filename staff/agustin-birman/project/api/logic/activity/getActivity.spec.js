import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity } from '../../data/index.js'
import getActivity from './getActivity.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types

const { MONGODB_URL_TEST } = process.env

describe('getActivity', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeeds on getting activity', () => {

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => getActivity(user.id, activity.id)
                    .then(activityInfo => {
                        expect(activityInfo.teacher.toString()).to.equal(activity.teacher.toString())
                        expect(activityInfo.title).to.equal('title')
                        expect(activityInfo.description).to.equal('description')
                    })))
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => getActivity(new ObjectId().toString(), activity.id))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('user not found')
                }))
    })

    it('fails on non-existing activity', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(() => getActivity(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('activity not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getActivity(123, new ObjectId().toString())
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
            getActivity(new ObjectId().toString(), 123)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('activityId is not valid')
        }
    })



    after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
})