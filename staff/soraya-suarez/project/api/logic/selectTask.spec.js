import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import releaseTask from './releaseTask.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'
import selectTask from './selectTask.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('releaseTask', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on select task', () =>
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
                    creator: new ObjectId().toString(),
                    owner: null,
                    name: 'Nombre tarea',
                    description: 'describiendo',
                    status: 'toDo', 
                    priority: 'medium', 
                    visible: true,
                    observations: '',
                    completionTime: 0
                })
                .then((task) => ({ user, task }))
            )
            .then(({ user, task }) => 
                selectTask(user.id, task.id)
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

        return selectTask(new ObjectId().toString(), new ObjectId().toString())
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
          .then((user) => selectTask(user.id, new ObjectId().toString())))
          .catch(error => errorThrown = error)
          .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('task not found')
          })
    })

    it('fails on non-permitted select task whith owner', () => {
        let errorThrown

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
                selectTask(user.id, task.id)
            )
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('task already have a owner')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            selectTask(1234, new ObjectId().toString())
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
            releaseTask(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})