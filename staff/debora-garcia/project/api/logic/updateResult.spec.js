import "dotenv/config"
import mongoose, { Types } from "mongoose"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import { Post, User, Result } from "../data/index.js"

import updateResult from "./updateResult.js"
import { NotFoundError, MatchError, ContentError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("updateResult", () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Result.deleteMany(), Post.deleteMany()])))
    beforeEach(() => Promise.all([User.deleteMany(), Result.deleteMany(), Post.deleteMany()]))

    it("succeds on updating result", () => {
        return bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const result = new Result({
                    workout: new ObjectId().toString(),
                    athlete: user.id,
                    time: 10,
                    repetitions: 10,
                    weight: 10,
                    active: true
                })
                return Promise.all([user.save(), result.save()])
            })
            .then(([user, result]) => {
                return updateResult(user.id, result.id, 20, 20, 20)
                    .then(() => Result.findById(result.id).lean())
            })
            .then(resultUpdated => {
                expect(resultUpdated).to.be.an.instanceof(Object)
                expect(resultUpdated.time).to.equal(20)
                expect(resultUpdated.repetitions).to.equal(20)
                expect(resultUpdated.weight).to.equal(20)
                expect(resultUpdated.active).to.be.true
            })

    })

    it("succeds on updating result when optional parameters are empty ", () => {
        return bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const result = new Result({
                    workout: new ObjectId().toString(),
                    athlete: user.id,
                    time: 10,
                    repetitions: 10,
                    weight: 10,
                    active: true
                })
                return Promise.all([user.save(), result.save()])
            })
            .then(([user, result]) => {
                return updateResult(user.id, result.id, null, null, null)
                    .then(() => Result.findById(result.id).lean())
            })
            .then(resultUpdated => {
                expect(resultUpdated).to.be.an.instanceof(Object)
                expect(resultUpdated.time).to.equal(10)
                expect(resultUpdated.repetitions).to.equal(10)
                expect(resultUpdated.weight).to.equal(10)
                expect(resultUpdated.active).to.be.true
            })

    })

    it("succeds on updating result when optional parameters are 0", () => {
        return bcrypt.hash("1234", 8)
            .then(hash => {
                const user = new User({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                })
                const result = new Result({
                    workout: new ObjectId().toString(),
                    athlete: user.id,
                    time: 10,
                    repetitions: 10,
                    weight: 10,
                    active: true
                })
                return Promise.all([user.save(), result.save()])
            })
            .then(([user, result]) => {
                return updateResult(user.id, result.id, null, 0, 0)
                    .then(() => Result.findById(result.id).lean())
            })
            .then(resultUpdated => {
                expect(resultUpdated).to.be.an.instanceof(Object)
                expect(resultUpdated.time).to.equal(10)
                expect(resultUpdated.repetitions).to.equal(0)
                expect(resultUpdated.weight).to.equal(0)
                expect(resultUpdated.active).to.be.true
            })
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return updateResult(new ObjectId().toString(), new ObjectId().toString(), 10, 10, 10)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("user not found")
            })
    })

    it("fails on non-existing result", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => updateResult(user.id, new ObjectId().toString(), 20, 20, 20))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal("result not found")
            })
    })

    it("fails on non-matching user with result", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => {
                return Result.create({
                    workout: new ObjectId().toString(),
                    athlete: new ObjectId().toString(),
                    time: 10,
                    repetitions: 10,
                    weight: 10
                })
                    .then(result => ({ user, result }));
            })
            .then(({ user, result }) => {
                return updateResult(user.id.toString(), result.id.toString(), 20, 20, 20);
            })
            .catch(error => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(MatchError);
                expect(errorThrown.message).to.equal("result doesn't match user");
            })

    })

    it("fails on invalid userId", () => {
        let errorThrown

        try {
            updateResult(1234, new ObjectId().toString(), 10, 10, 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("userId is not valid")
        }
    })

    it("fails on invalid resultId", () => {
        let errorThrown

        try {
            updateResult(new ObjectId().toString(), 1234, 10, 10, 10)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("resultId is not valid")
        }
    })

    it("fails on invalid time", () => { 
        let errorThrown
        try {
            updateResult(new ObjectId().toString(), new ObjectId().toString(), "30", 30, 30)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("time is not valid")
        }
    })

    it("fails on invalid repetitions", () => { 
        let errorThrown
        try {
            updateResult(new ObjectId().toString(), new ObjectId().toString(), 30, "30", 30)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("repetitions is not valid")
        }
    })
    it("fails on invalid weight", () => { 
        let errorThrown
        try {
            updateResult(new ObjectId().toString(), new ObjectId().toString(), 30, 30, "30")
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("weight is not valid")
        }
    })
        

    after(() => Promise.all([User.deleteMany(), Result.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
})