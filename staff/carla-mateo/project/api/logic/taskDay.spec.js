import 'dotenv/config'
import { mongoose, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import taskDay from './taskDay.js'
import { User, Task } from '../data/index.js'

import { expect } from 'chai'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('taskDay', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany().then(() => Task.deleteMany())))

    beforeEach(() => User.deleteMany().then(() => Task.deleteMany()))

    it('succeeds on getting days with tasks for a given month', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                const selectedDate = new Date(2023, 7, 15)
                return Task.create({
                    family: 'casa',
                    assignee: user._id.toString(),
                    title: 'test',
                    description: 'test',
                    date: new Date(2023, 7, 10)
                })
                    .then(() => Task.create({
                        family: 'casa',
                        assignee: user._id.toString(),
                        title: 'test2',
                        description: 'test2',
                        date: new Date(2023, 7, 20)
                    }))
                    .then(() => taskDay(user._id.toString(), selectedDate))
                    .then(daysWithTasks => {
                        expect(daysWithTasks).to.be.an('array')
                        expect(daysWithTasks.length).to.equal(2)
                        expect(daysWithTasks).to.include.members([10, 20])
                    })
            })
    )

    it('succeeds on getting days with tasks when multiple tasks are on the same day', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                const selectedDate = new Date(2023, 7, 15)
                return Task.create({
                    family: 'casa',
                    assignee: user._id.toString(),
                    title: 'test',
                    description: 'test',
                    date: new Date(2023, 7, 15)
                })
                    .then(() => Task.create({
                        family: 'casa',
                        assignee: user._id.toString(),
                        title: 'test2',
                        description: 'test2',
                        date: new Date(2023, 7, 15)
                    }))
                    .then(() => taskDay(user._id.toString(), selectedDate))
                    .then(daysWithTasks => {
                        expect(daysWithTasks).to.be.an('array')
                        expect(daysWithTasks.length).to.equal(1)
                        expect(daysWithTasks).to.include(15)
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return taskDay(new ObjectId().toString(), new Date())
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            taskDay(12345, new Date())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})