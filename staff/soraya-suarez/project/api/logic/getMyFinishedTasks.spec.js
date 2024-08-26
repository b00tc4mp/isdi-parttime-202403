import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User, Task } from '../data/index.js'
import getMyFinishedTasks from './getMyFinishedTasks.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getMyFinishedTasks', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on get my finished tasks', () =>
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
                    status: 'finished', 
                    priority: 'medium', 
                    visible: true,
                    observations: '',
                    completionTime: 2
                })
                .then(() => getMyFinishedTasks(user.id)))
                .then((tasks) => {
                    expect(tasks).to.be.an.instanceOf(Array)
                    expect(tasks[0]).to.be.an.instanceOf(Object)
                    expect(tasks[0].creator).to.be.a.string
                    expect(tasks[0].owner).to.be.a.string
                    expect(tasks[0].description).to.be.equal('describiendo')
                    expect(tasks[0].status).to.be.equal('finished')
                    expect(tasks[0].priority).to.be.equal('medium')
                    expect(tasks[0].visible).to.be.equal(true)
                    expect(tasks[0].observations).to.be.equal('')
                    expect(tasks[0].completionTime).to.be.equal(2)
                })
            )  
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getMyFinishedTasks(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            getMyFinishedTasks(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})