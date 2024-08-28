import "dotenv/config"
import bcrypt from "bcryptjs"
import { expect } from "chai"
import mongoose from "mongoose"

import { Types } from "mongoose"

import { User, Result } from "../data/index.js"
import deleteResult from "./deleteResult.js"
import { ContentError, MatchError, NotFoundError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe("deleteResult", () => {

    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => { return Promise.all([User.deleteMany(), Result.deleteMany()]) }))

    beforeEach(() => Promise.all([User.deleteMany(), Result.deleteMany()]))

    it("suceeds on deleting result", () => {

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({
                name: "nameTest",
                surname: "surnameTest",
                email: "test@gmail.com",
                username: "usernameTest",
                password: hash
            }))
            .then(user => Result.create({
                workout: new ObjectId().toString(),
                athlete: user.id,
                time: 10,
                repetitions: 10,
                weight: 10,
            })
                .then(result => ({ user, result }))
            )

            .then(({ user, result }) => deleteResult(user.id, result.id)
                .then(() => Result.findById(result.id))
                .then(deletedResult => {
                    expect(deletedResult).to.exist
                    expect(deletedResult.active).to.be.false
                })
            )
    })

    it("fails on non-existing user", () => {
        let errorThrown

        return Result.create({
            workout: new ObjectId().toString(),
            athlete: new ObjectId().toString(),
            time: 10,
            repetitions: 10,
            weight: 10,
            active: true
        })
            .then(result => deleteResult(new ObjectId().toString(), result.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
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
            .then(user => deleteResult(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal("result not found")
            })
    })

    it("fails on non-matching user with result", () => {
        let errorThrown;

        return bcrypt.hash("1234", 8)
            .then(hash => {
                return User.create({
                    name: "nameTest",
                    surname: "surnameTest",
                    email: "test@gmail.com",
                    username: "usernameTest",
                    password: hash
                });
            })
            .then(user => {
                return Result.create({
                    workout: new ObjectId().toString(),
                    athlete: new ObjectId().toString(),  
                    time: 10,
                    repetitions: 10,
                    weight: 10,
                    active: true
                })
                    .then(result => ({ user, result })); 
            })
            .then(({ user, result }) => {
                return deleteResult(user.id.toString(), result.id.toString());
            })
            .catch(error => {
                errorThrown = error;
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(MatchError);
                expect(errorThrown.message).to.equal("result doesn't match user");
            });
    });


    it("fails on invalid userId", () => {
        let errorThrown

        try {
            deleteResult(1234, new ObjectId().toString())
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
            deleteResult(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal("resultId is not valid")
        }
    })

    after(() => Result.deleteMany().then(() => User.deleteMany().then(() => mongoose.disconnect())))
})