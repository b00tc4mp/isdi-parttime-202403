import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import getMyTasks from './getMyTasks.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getMyTasks', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on get my tasks', () =>
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
            })
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
                .then(() => getMyTasks(user.id)))
                .then((tasks) => {
                    expect(tasks).to.be.an.instanceOf(Array)
                    expect(tasks[0]).to.be.an.instanceOf(Object)
                    expect(tasks[0].creator).to.be.a.string
                    expect(tasks[0].owner).to.be.a.string
                    expect(tasks[0].name).to.be.equal('Nombre tarea')
                    expect(tasks[0].description).to.be.equal('describiendo')
                    expect(tasks[0].status).to.be.equal('toDo')
                    expect(tasks[0].priority).to.be.equal('medium')
                    expect(tasks[0].visible).to.be.equal(false)
                    expect(tasks[0].observations).to.be.equal('')
                    expect(tasks[0].completionTime).to.be.equal(0)
                })
            )  
    )

    it('succeeds on get my tasks with no repeat tasks', () => {
        let user
    
        return bcrypt.hash('123123123', 8)
            .then(hash => {
                return User.create({ 
                    name: 'Soraya', 
                    surname: 'Suarez', 
                    email: 'soraya@suarez.com',
                    phone: '',
                    avatar: '',
                    role: 'admin',
                    manager: new ObjectId().toString(),
                    available: true,
                    password: hash 
                });
            })
            .then(createdUser => {
                user = createdUser
                
                return Promise.all([
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
                    }),
                    Task.create({
                        creator: new ObjectId().toString(),
                        owner: user.id,
                        name: 'Otra tarea',
                        description: 'describiendo',
                        status: 'toDo', 
                        priority: 'low', 
                        visible: false,
                        observations: '',
                        completionTime: 0
                    })
                ])
            })
            .then(() => getMyTasks(user.id))
            .then(tasks => {
                expect(tasks).to.be.an('array').that.has.lengthOf(2)
                expect(tasks).to.be.an.instanceOf(Array)
                
                expect(tasks[0]).to.be.an.instanceOf(Object)
                expect(tasks[0].creator).to.be.a.string
                expect(tasks[0].owner).to.be.a.string
                expect(tasks[0].name).to.be.equal('Nombre tarea')
                expect(tasks[0].description).to.be.equal('describiendo')
                expect(tasks[0].status).to.be.equal('toDo')
                expect(tasks[0].priority).to.be.equal('medium')
                expect(tasks[0].visible).to.be.equal(false)
                expect(tasks[0].observations).to.be.equal('')
                expect(tasks[0].completionTime).to.be.equal(0)

                expect(tasks[1]).to.be.an.instanceOf(Object)
                expect(tasks[1].creator).to.be.a.string
                expect(tasks[1].owner).to.be.a.string
                expect(tasks[1].name).to.be.equal('Otra tarea')
                expect(tasks[1].description).to.be.equal('describiendo')
                expect(tasks[1].status).to.be.equal('toDo')
                expect(tasks[1].priority).to.be.equal('low')
                expect(tasks[1].visible).to.be.equal(false)
                expect(tasks[1].observations).to.be.equal('')
                expect(tasks[1].completionTime).to.be.equal(0)
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return getMyTasks(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            getMyTasks(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})