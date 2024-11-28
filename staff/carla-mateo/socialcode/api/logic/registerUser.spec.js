import "dotenv/config"
import mongoose from "mongoose"

import bcrypt from "bcryptjs"

import registerUser from "./registerUser.js"
import { User } from "../data/index.js"
import { DuplicityError, ContentError } from "com/errors.js"

import { expect } from "chai"

const { MONGODB_URL_TEST } = process.env

debugger

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it("succeeds on new user", () =>
        registerUser("Ger", "tru", "Ger@tru.com", "Gertru", "1234", "1234")
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal("Ger")
                expect(user.surname).to.equal("tru")
                expect(user.email).to.equal("Ger@tru.com")
                expect(user.username).to.equal("Gertru")

                return bcrypt.compare("1234", user.password)
            })
        // .then((match) => expect(match).to.be.true)
    )

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})
