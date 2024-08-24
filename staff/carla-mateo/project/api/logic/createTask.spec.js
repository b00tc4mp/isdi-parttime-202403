import "dotenv/config"
import { mongoose, Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { ContentError, NotFoundError, SystemError } from "com/errors.js"
import { User, Task } from "../data/index.js"
import createTask from "./createTask.js"

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

debugger

describe("createTask", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Task.deleteMany()])
    }))
    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it('succeeds on create task', () =>
        bcrypt.hash('1234', 8)
            .then((hash) =>
                User.create({
                    name: 'carla',
                    username: 'CASA',
                    email: 'carla@email.es',
                    password: hash,
                    family: 'casa'
                }))
            .then((user) => {
                return createTask(user._id.toString(), user._id.toString(), 'title', 'description', new Date())
            })
            .then(() => Task.findOne())
            .then((task) => {
                expect(task).to.not.be.null
                expect(task._id).to.be.an.instanceOf(ObjectId)
                expect(task.family).to.equal('casa')
                expect(task.title).to.equal('title')
                expect(task.description).to.equal('description')
                expect(task.date).to.be.an.instanceOf(Date)
            })
    )

    it('succeeds on create task whith assignee null', () =>
        bcrypt.hash('1234', 8)
            .then((hash) =>
                User.create({
                    name: 'carla',
                    username: 'CASA',
                    email: 'carla@email.es',
                    password: hash,
                    family: 'casa'
                }))
            .then((user) => {
                return createTask(user._id.toString(), null, 'title', 'description', new Date())
            })
            .then(() => Task.findOne())
            .then((task) => {
                expect(task).to.not.be.null
                expect(task.family).to.equal('casa')
                expect(task.assignee).to.be.undefined
                expect(task.title).to.equal('title')
                expect(task.description).to.equal('description')
                expect(task.date).to.be.an.instanceOf(Date)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return createTask(new ObjectId().toString(), new ObjectId().toString(), 'title', 'description', new Date())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing assignee', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then((hash) =>
                User.create({
                    name: 'carla',
                    username: 'CASA',
                    email: 'carla@email.es',
                    password: hash,
                    family: 'casa'
                })
            )
            .then((user) => {
                return createTask(user._id.toString(), new ObjectId().toString(), 'title', 'description', new Date())
            })
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('assignee not found')
            })
    })

    it('fails on invalid date', () => {
        let errorThrown
        try {
            createTask(new ObjectId().toString(), new ObjectId().toString(), 'title', 'description', 'new Date')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('invalid date format')
        }
    })

    it('fails on invalid userId', () => {
        let errorThrown
        try {
            createTask(1234, new ObjectId().toString(), 'title', 'description', 'new Date')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown
        try {
            createTask(new ObjectId().toString(), new ObjectId().toString(), 1111, 'description', 'new Date')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown
        try {
            createTask(new ObjectId().toString(), new ObjectId().toString(), 'title', 3333, new Date())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })





    after(() => Promise.all([User.deleteMany(), Task.deleteMany()]).then(() => mongoose.disconnect()))
})