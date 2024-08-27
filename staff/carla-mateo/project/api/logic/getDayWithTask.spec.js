import 'dotenv/config'
import { mongoose, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getDayWithTask from './getDayWithTask.js'
import { User, Task } from '../data/index.js'

import { expect } from 'chai'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('taskDay', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany().then(() => Task.deleteMany())))

    beforeEach(() => User.deleteMany().then(() => Task.deleteMany()))

    it('succeeds on get task day', () =>
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
                    .then(() => getDayWithTask(user._id.toString(), 'casa', selectedDate))
                    .then(daysWithTasks => {
                        expect(daysWithTasks).to.be.false
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getDayWithTask(new ObjectId().toString(), new Date())
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getDayWithTask(12345, new Date())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})