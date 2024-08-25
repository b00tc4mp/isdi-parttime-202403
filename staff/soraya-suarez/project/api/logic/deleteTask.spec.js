import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import deleteTask from './deleteTask.js'
import { NotFoundError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('deleteTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))
    
    it('succeeds on delete task', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'user',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then(user =>
                Task.create({
                    creator: user.id,
                    owner: user.id,
                    name: 'Nombre tarea',
                    description: 'describiendo',
                    status: 'toDo', 
                    priority: 'medium', 
                    visible: false,
                    observations: '',
                    completionTime: 0
                })
                .then((task) => ({ user, task }))
            )
            .then(({ user, task }) => 
                deleteTask(user.id, task.id)
            )
            .then(taskId => 
                Task.findById(taskId).then(deletedTask => {
                    expect(deletedTask).to.be.null
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return Task.create({
            creator: new ObjectId().toString(),
            owner: new ObjectId().toString(),
            name: 'Nombre tarea',
            description: 'describiendo',
            status: 'toDo', 
            priority: 'medium', 
            visible: false,
            observations: '',
            completionTime: 0
        })
            .then((task) => deleteTask(new ObjectId().toString(), task.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing task', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
          .then((hash) => User.create({
            name: 'Soraya', 
            surname: 'Suarez', 
            email: 'soraya@suarez.com', 
            role: 'user',
            manager: new ObjectId().toString(),
            password: hash 
          })
          .then((user) => deleteTask(user.id, new ObjectId().toString())))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('task not found')
          })
    })

    it('fails on non-match user and task creator', () => {
        let errorThrown
        
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'user',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then(user =>
                Task.create({
                    creator: new ObjectId().toString(),
                    owner: user.id,
                    name: 'Nombre tarea',
                    description: 'describiendo',
                    status: 'toDo', 
                    priority: 'medium', 
                    visible: false,
                    observations: '',
                    completionTime: 0
                })
                .then((task) => ({ user, task }))
            )
            .then(({ user, task }) => deleteTask(user.id, task.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('task creator does not match userId')
            })
    })

    it('fails on invalid user id', () => {
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

    it('fails on invalid task id', () => {
        let errorThrown
        
        try {
            deleteTask(new ObjectId().toString(), 1234 )
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('taskId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})