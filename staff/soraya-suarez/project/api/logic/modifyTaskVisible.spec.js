import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import modifyTaskVisible from './modifyTaskVisible.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyTaskVisible', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on modify task visible', () =>
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
                modifyTaskVisible(user.id, task.id, true)
            )
            .then(() => Task.findOne())
            .then(task => {
                expect(task.creator).to.be.a.string
                expect(task.owner).to.be.a.string
                expect(task.name).to.equal('Nombre tarea')
                expect(task.description).to.equal('describiendo')
                expect(task.status).to.equal('toDo')
                expect(task.priority).to.equal('medium')
                expect(task.visible).to.equal(true)
                expect(task.observations).to.equal('')
                expect(task.completionTime).to.equal(0)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyTaskVisible(new ObjectId().toString(), new ObjectId().toString(), true)
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
          .then((user) => modifyTaskVisible(user.id, new ObjectId().toString(), true)))
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
                modifyTaskVisible(user.id, task.id, false)
            )
            .catch(error => errorThrown = error)
            .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('you are not the creator')
            })
    })

    it('fails on non-match user and task owner', () => {
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
                modifyTaskVisible(user.id, task.id, false)
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
            modifyTaskVisible(1234, new ObjectId().toString(), true)
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
            modifyTaskVisible(new ObjectId().toString(), 1234, true)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid visible', () => {
        let errorThrown
        
        try {
            modifyTaskVisible(new ObjectId().toString(), new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('is not boolean')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})