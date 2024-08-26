import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import addTask from './addTask.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('addTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))
    
    it('succeeds on existing user with owner', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: null,
                available: true,
                password: hash 
            }))
            .then(user =>
                addTask(user.id, user.id, 'Nombre tarea', 'describiendo', 'toDo', 'medium', true)
                    .then(() => Task.findOne())
                    .then(task => {
                        expect(task.creator.toString()).to.equal(user.id)
                        expect(task.owner.toString()).to.equal(user.id)
                        expect(task.name).to.equal('Nombre tarea')
                        expect(task.description).to.equal('describiendo')
                        expect(task.status).to.equal('toDo')
                        expect(task.priority).to.equal('medium')
                        expect(task.visible).to.equal(true)
                    })
            )
    )

    it('succeeds on existing user without owner', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: null,
                available: true,
                password: hash 
            }))
            .then(user =>
                addTask(user.id, null, 'Nombre tarea', 'describiendo', 'toDo', 'medium', true)
                    .then(() => Task.findOne())
                    .then(task => {
                        expect(task.creator.toString()).to.equal(user.id)
                        expect(task.owner).to.be.null
                        expect(task.name).to.equal('Nombre tarea')
                        expect(task.description).to.equal('describiendo')
                        expect(task.status).to.equal('toDo')
                        expect(task.priority).to.equal('medium')
                        expect(task.visible).to.equal(true)
                    })
            )
    )

    it('succeeds on existing user with visibility false', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: null,
                available: true,
                password: hash 
            }))
            .then(user =>
                addTask(user.id, user.id, 'Nombre tarea', 'describiendo', 'toDo', 'medium', false)
                    .then(() => Task.findOne())
                    .then(task => {
                        expect(task.creator.toString()).to.equal(user.id)
                        expect(task.owner.toString()).to.equal(user.id)
                        expect(task.name).to.equal('Nombre tarea')
                        expect(task.description).to.equal('describiendo')
                        expect(task.status).to.equal('toDo')
                        expect(task.priority).to.equal('medium')
                        expect(task.visible).to.equal(false)
                    })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return addTask(new ObjectId().toString(), null, 'Nombre tarea', 'describiendo', 'toDo', 'medium', false)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid creator id', () => {
        let errorThrown
        
        try {
            addTask(1234, null, 'Nombre tarea', 'describiendo', 'toDo', 'medium', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid owner id', () => {
        let errorThrown
        
        try {
            addTask(new ObjectId().toString(), 1234, 'Nombre tarea', 'describiendo', 'toDo', 'medium', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid name', () => {
        let errorThrown
    
        try {
            addTask(new ObjectId().toString(), new ObjectId().toString(), 1234, 'describiendo', 'toDo', 'medium', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown
        
        try {
            addTask(new ObjectId().toString(), new ObjectId().toString(), 'Nombre tarea', 12345, 'toDo', 'medium', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    it('fails on invalid status', () => {
        let errorThrown
        
        try {
            addTask(new ObjectId().toString(), new ObjectId().toString(), 'Nombre tarea', 'describiendo', 'loquemedelagana', 'medium', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('status is not valid')
        }
    })

    it('fails on invalid priority', () => {
        let errorThrown
        
        try {
            addTask(new ObjectId().toString(), new ObjectId().toString(), 'Nombre tarea', 'describiendo', 'toDo', 'important', false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('priority is not valid')
        }
    })

    it('fails on invalid visible value', () => {
        let errorThrown
        
        try {
            addTask(new ObjectId().toString(), new ObjectId().toString(), 'Nombre tarea', 'describiendo', 'toDo', 'medium', 'false')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('is not boolean')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})