import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User, Task } from '../data/index.js'
import updateTaskDescription from './updateTaskDescription.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe('update Task Description', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST)
        .then(() => {
            return Promise.all([User.deleteMany(), Task.deleteMany()])
        }))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('sucede correctamente al actualizar la descripción de la tarea', () => {
        let user
        let taskId

        return bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'ana',
                    username: 'ana',
                    email: 'ana@email.com',
                    password: hash,
                    avatar: 'avatars/.jpg',
                    family: 'Casa'
                })
            })
            .then(createdUser => {
                user = createdUser
                return Task.create({
                    title: 'title',
                    description: 'description',
                    done: false,
                    date: new Date(),
                })
            })
            .then(createdTask => {
                taskId = createdTask._id
                return updateTaskDescription(user._id.toString(), taskId.toString(), 'nuevadescripcion')
            })
            .then(() => Task.findOne({ _id: taskId }))
            .then(updatedTask => {
                expect(updatedTask.title).to.equal('title')
                expect(updatedTask.description).to.equal('nuevadescripcion')
                expect(updatedTask.done).to.be.false;
                expect(updatedTask.date).to.be.an.instanceOf(Date)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return updateTaskDescription(new ObjectId().toString(), new ObjectId().toString(), 'ana')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing task', () => {
        let errorThrown

        return User.create({
            name: 'ana',
            username: 'ana',
            email: 'ana@email.com',
            password: 1234,
            avatar: 'avatars/.jpg',
            family: 'Casa'
        })
            .then(user => updateTaskDescription(user.id, new ObjectId().toString(), 'ana'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('task not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            updateTaskDescription(12345, new ObjectId().toString(), 'ana')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid taskId', () => {
        let errorThrown

        try {
            updateTaskDescription(new ObjectId().toString(), 12345, 'ana')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('taskId is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            updateTaskDescription(new ObjectId().toString(), new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(() => mongoose.disconnect()))

})