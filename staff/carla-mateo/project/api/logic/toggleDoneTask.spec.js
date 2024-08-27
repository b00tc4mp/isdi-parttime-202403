import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { User, Task } from "../data/index.js"
import toggleDoneTask from "./toggleDoneTask.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

debugger

describe("toggleDoneTask", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()).then(() => Task.deleteMany()))

    beforeEach(() => Promise.all([User.deleteMany(), Task.deleteMany()]))

    it("succeeds on non assignee done task", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "Mocha",
                    username: "MochaChai",
                    email: "Mocha@Chai.com",
                    password: hash,
                    family: "Chai"
                });

                const task = new Task({
                    title: "Hello world",
                    description: "hello description",
                    done: false,
                    date: new Date()
                })

                return Promise.all([user.save(), task.save()])
            })
            .then(([user, task]) =>
                toggleDoneTask(user.id, task.id)
                    .then(() => Task.findById(task.id))
                    .then(task => {
                        expect(task.done).to.be.true
                    })
            )
    )

    it("succeeds on assignee done task", () =>
        bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "Mocha",
                    username: "MochaChai",
                    email: "Mocha@Chai.com",
                    password: hash,
                    family: "Chai"
                })

                const task = new Task({
                    title: "Hello world",
                    description: "hello description",
                    done: false,
                    date: new Date()
                })

                task.assignee = user.id

                return Promise.all([user.save(), task.save()])
            })
            .then(([user, task]) =>
                toggleDoneTask(user.id, task.id)
                    .then(() => Task.findById(task.id))
                    .then(task => {
                        expect(task.done).to.be.true
                    })
            )
    )

    it("fails on non-exsiting user", () => {
        let errorThrown

        return Task.create({ title: "Hello world", description: "hello description", done: false, date: new Date() })
            .then((task) => toggleDoneTask(new ObjectId().toString(), task.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on non-existing task", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then((hash) => User.create({
                name: "Mocha",
                username: "Chai",
                email: "Mocha@Chai.com",
                password: hash,
                family: "Chai"
            })
                .then((user) => toggleDoneTask(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("task not found")
            })
    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            toggleDoneTask(12345, new ObjectId().toString())
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid taskId", () => {
        let errorThrown

        try {
            toggleDoneTask(new ObjectId().toString(), 12345)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal("taskId is not valid")
        }
    })

    after(() => Task.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})