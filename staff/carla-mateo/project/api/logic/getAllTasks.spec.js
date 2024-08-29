import 'dotenv/config'
import { mongoose, Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import getAllTasks from './getAllTasks.js'
import { User, Task } from '../data/index.js'

import { expect } from 'chai'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('getAllTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany().then(() => Task.deleteMany())))

    beforeEach(() => User.deleteMany().then(() => Task.deleteMany()))

    it('succeeds on get all Tasks', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                return Task.create({
                    family: 'casa',
                    assignee: user._id.toString(),
                    title: 'test',
                    description: 'test',
                    date: new Date()
                })
                    .then(() => Task.create({
                        family: 'casa',
                        assignee: user._id.toString(),
                        title: 'test2',
                        description: 'test2',
                        date: new Date()
                    }))
                    .then(() => getAllTasks(user._id.toString()))
                    .then((tasks) => {
                        expect(tasks).to.be.an('array')
                        expect(tasks.length).to.equal(2)

                        tasks.forEach(task => {
                            expect(task.id).to.be.a('string')
                            expect(task.family).to.be.a('string')
                            expect(task.assignee).to.be.a('object')
                            expect(task.assignee.id).to.be.a('undefined')
                            expect(task.assignee.name).to.be.a('string')
                            expect(task.assignee.username).to.be.a('string')
                            expect(task.assignee.email).to.be.a('string')
                            expect(task.assignee.family).to.be.a('string')
                            expect(task.done).to.be.false
                            expect(task.title).to.be.a('string')
                            expect(task.description).to.be.a('string')
                            expect(task.date).to.be.an.instanceOf(Date)
                        })
                    })
            })
    )

    it('succeeds on get all tasks when assignee is null', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'CASA',
                username: 'carla',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then(user => {
                return Task.create({
                    family: 'casa',
                    title: 'test',
                    description: 'test',
                    date: new Date()
                })
                    .then(() => Task.create({
                        family: 'casa',
                        title: 'test2',
                        description: 'test2',
                        date: new Date()
                    }))
                    .then(() => getAllTasks(user._id.toString()))
                    .then((tasks) => {
                        expect(tasks).to.be.an('array')
                        expect(tasks.length).to.equal(2)

                        tasks.forEach(task => {
                            expect(task.id).to.be.a('string')
                            expect(task.family).to.be.a('string')
                            expect(task.assignee).to.be.null
                            expect(task.done).to.be.false
                            expect(task.title).to.be.a('string')
                            expect(task.description).to.be.a('string')
                            expect(task.date).to.be.an.instanceOf(Date)
                        })
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getAllTasks(new ObjectId().toString())
            .catch((error) => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllTasks(12345)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})