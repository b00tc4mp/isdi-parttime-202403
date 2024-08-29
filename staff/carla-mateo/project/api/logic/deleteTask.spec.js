import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import deleteTask from './deleteTask.js'
import { User, Task } from '../data/index.js'

import { expect } from 'chai'
import { MatchError, NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('deleteTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeds on delete task', () =>
        bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: 'carla',
                    username: 'CASA',
                    email: 'carla@email.es',
                    password: hash,
                    family: 'casa'
                })
                const task = new Task({
                    family: 'casa',
                    title: 'test',
                    description: 'test',
                    date: new Date()
                })
                return Promise.all([user.save(), task.save()])
            })
            .then(([user, task]) => deleteTask(user.id, task.id))

            .then(taskIdDeleted => Task.findById(taskIdDeleted))

            .then((taskIdDeleted) => {
                expect(taskIdDeleted).to.be.equal(null)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Task.create({
            family: 'casa',
            title: 'test',
            description: 'test',
            date: new Date()
        })
            .then((task) => {
                return deleteTask(new ObjectId().toString(), task.id)
            })
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing task', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'carla',
                username: 'CASA',
                email: 'carla@email.es',
                password: hash,
                family: 'casa'
            }))
            .then((user) => {
                return deleteTask(user.id.toString(), new ObjectId().toString())
            })
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('task not found')
            })
    })

    it('fails on task dont match user', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then((hash) => {
                const user = new User({
                    name: 'carla',
                    username: 'CASA',
                    email: 'carla@email.es',
                    password: hash,
                    family: 'casa'
                })
                const task = new Task({
                    family: 'mapa',
                    title: 'Prueba',
                    description: 'Vivan los test',
                    date: new Date()
                })
                return Promise.all([user.save(), task.save()])
            })
            .then(([user, task]) => deleteTask(user.id, task.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('task does not match user')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteTask(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid taskId', () => {
        let errorThrown

        try {
            deleteTask(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('taskId is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})