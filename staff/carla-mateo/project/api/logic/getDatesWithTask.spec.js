import 'dotenv/config'
import { mongoose, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getDatesWithTask from './getDatesWithTask.js'
import { User, Task } from '../data/index.js'

import { expect } from 'chai'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('get dates with task', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany().then(() => Task.deleteMany())))

    beforeEach(() => User.deleteMany().then(() => Task.deleteMany()))

    it('succeeds on get get dates with task', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                const selectedDate = new Date(2024, 7, 15)
                return Task.create({
                    family: 'casa',
                    assignee: user._id.toString(),
                    title: 'test',
                    description: 'test',
                    date: new Date(2024, 7, 15)
                })
                    .then(() => getDatesWithTask(user._id.toString(), selectedDate))
                    .then(daysWithTasks => {
                        expect(daysWithTasks).to.be.an('array').that.is.not.empty
                        expect(daysWithTasks[0].toISOString()).to.equal('2024-08-14T22:00:00.000Z')
                        expect(daysWithTasks).to.be.an('array')
                        expect(daysWithTasks).to.have.lengthOf(1)

                        const firstDate = new Date(daysWithTasks[0])
                        expect(firstDate.getMonth()).to.equal(7)
                        expect(firstDate.getFullYear()).to.equal(2024)
                    })
            })
    )

    it('return unique dates when there are duplicate dates', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                const fechaComun = new Date(2024, 7, 15)
                return Promise.all([
                    Task.create({ family: 'casa', assignee: user._id.toString(), title: 'test1', description: 'test1', date: fechaComun }),
                    Task.create({ family: 'casa', assignee: user._id.toString(), title: 'test2', description: 'test2', date: fechaComun }),
                    Task.create({ family: 'casa', assignee: user._id.toString(), title: 'test3', description: 'test3', date: new Date(2024, 7, 16) })
                ])
                    .then(() => getDatesWithTask(user._id.toString(), fechaComun))
                    .then(datesWithTasks => {
                        expect(datesWithTasks).to.be.an('array').that.is.not.empty
                        expect(datesWithTasks).to.have.lengthOf(2)
                        expect(datesWithTasks[0].toISOString()).to.equal('2024-08-15T22:00:00.000Z')
                        expect(datesWithTasks[1].toISOString()).to.equal('2024-08-14T22:00:00.000Z')
                    })
            })
    )

    it('return ordered dates when there are different dates', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                const dates = [new Date(2024, 7, 15), new Date(2024, 7, 14), new Date(2024, 7, 16)]
                return Promise.all(dates.map(fecha =>
                    Task.create({ family: 'casa', assignee: user._id.toString(), title: 'test', description: 'test', date: fecha })
                ))
                    .then(() => getDatesWithTask(user._id.toString(), new Date()))
                    .then(datesWithTasks => {
                        expect(datesWithTasks).to.be.an('array').that.is.not.empty
                        expect(datesWithTasks).to.have.lengthOf(3)
                        expect(datesWithTasks[0].toISOString()).to.equal('2024-08-15T22:00:00.000Z')
                        expect(datesWithTasks[1].toISOString()).to.equal('2024-08-14T22:00:00.000Z')
                        expect(datesWithTasks[2].toISOString()).to.equal('2024-08-13T22:00:00.000Z')
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getDatesWithTask(new ObjectId().toString(), new Date())
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getDatesWithTask(12345, new Date())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid date', () => {
        let errorThrown
        try {
            getDatesWithTask(new ObjectId().toString(), 'ivalid-Date')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('selectedDate is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})