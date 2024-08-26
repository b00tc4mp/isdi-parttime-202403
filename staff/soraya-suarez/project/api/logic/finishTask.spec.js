import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import finishTask from './finishTask.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('finishTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on finish task', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'admin',
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
                finishTask(user.id, task.id, 2)
            )
            .then(() => Task.findOne())
            .then(task => {
                expect(task.status).to.equal('finished')
                expect(task.completionTime).to.equal(2)
            })
    )

    it('fails on non-existing user with task', () => {
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
            .then((task) => finishTask(new ObjectId().toString(), task.id, 2))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing user without task', () => {
        let errorThrown

        return finishTask(new ObjectId().toString(), new ObjectId().toString(), 2)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
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
            role: 'admin',
            manager: new ObjectId().toString(),
            password: hash 
          })
          .then((user) => finishTask(user.id, new ObjectId().toString(), 2)))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('task not found')
          })
    })

    it('fails on non-match user and task owner', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com', 
                role: 'admin',
                manager: new ObjectId().toString(),
                password: hash 
            }))
            .then(user =>
                Task.create({
                    creator: user.id,
                    owner: new ObjectId().toString(),
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
                finishTask(user.id, task.id, 2)
            )
            .catch(error => errorThrown = error)
            .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('you are not the owner')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            finishTask(1234, new ObjectId().toString(), 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid task id to finish', () => {
        let errorThrown
        
        try {
            finishTask(new ObjectId().toString(), 1234, 2)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid completion time', () => {
        let errorThrown
        
        try {
            finishTask(new ObjectId().toString(), new ObjectId().toString(), '2')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('number is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})