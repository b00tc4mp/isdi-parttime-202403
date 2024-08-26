import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from 'mongoose'
import { expect } from 'chai'

import { User, Activity } from '../../data/index.js'
import getTeachersActivities from './getTeachersActivities.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { ObjectId } = Types

const { MONGODB_URL_TEST } = process.env

describe('getTeachersActivities', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeeds on getting activity', () => {
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
            .then(([teacher, student]) => {
                teacher.student.push(student._id)
                return teacher.save()
                    .then(() => Activity.create({ teacher: teacher.id, title: 'title', description: 'description' }))
                    .then(() => getTeachersActivities(student.id))
                    .then(activities => {
                        expect(activities).to.be.an('array').that.is.not.empty
                        const activityInfo = activities[0]
                        expect(activityInfo.title).to.equal('title')
                        expect(activityInfo.description).to.equal('description')
                    })
            })
    })


    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({ name: 'Mocha', surname: 'Chai', email: 'mocha@chai.es', username: 'mochachai', password: hash, userType: 'teacher' }))
            .then(user => Activity.create({ teacher: user.id, title: 'title', description: 'description' })
                .then(activity => getTeachersActivities(new ObjectId().toString(), activity.id))
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                    expect(errorThrown.message).to.equal('user not found')
                }))
    })



    it('fails on invalid userId', () => {
        let errorThrown
        try {
            getTeachersActivities(123, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })





    after(() => Promise.all([User.deleteMany(), Activity.deleteMany()]).then(() => mongoose.disconnect()))
})