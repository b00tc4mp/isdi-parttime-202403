import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import modifyTaskPriority from './modifyTaskPriority.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyTaskPriority', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on modify task priority', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'admin',
                manager: new ObjectId().toString(),
                available: true,
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
                modifyTaskPriority(user.id, task.id, 'high')
            )
            .then(() => Task.findOne())
            .then(task => {
                expect(task.creator).to.be.a.string
                expect(task.owner).to.be.a.string
                expect(task.name).to.equal('Nombre tarea')
                expect(task.description).to.equal('describiendo')
                expect(task.status).to.equal('toDo')
                expect(task.priority).to.equal('high')
                expect(task.visible).to.equal(false)
                expect(task.observations).to.equal('')
                expect(task.completionTime).to.equal(0)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyTaskPriority(new ObjectId().toString(), new ObjectId().toString(), 'high')
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
                phone: '',
                avatar: '',
                role: 'admin',
                manager: new ObjectId().toString(),
                available: true,
                password: hash 
          })
          .then((user) => modifyTaskPriority(user.id, new ObjectId().toString(), 'high')))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('task not found')
          })
    })

    it('fails on non-match user and task creator', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'admin',
                manager: new ObjectId().toString(),
                available: true,
                password: hash 
            }))
            .then(user =>
                Task.create({
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
                .then((task) => ({ user, task }))
            )
            .then(({ user, task }) => 
                modifyTaskPriority(user.id, task.id, 'high')
            )
            .catch(error => errorThrown = error)
            .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('you are not the creator')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            modifyTaskPriority(1234, new ObjectId().toString(), 'high')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid task id', () => {
        let errorThrown
        
        try {
            modifyTaskPriority(new ObjectId().toString(), 1234, 'high')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid priority', () => {
        let errorThrown
        
        try {
            modifyTaskPriority(new ObjectId().toString(), new ObjectId().toString(),'lowerrrr')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('priority is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})