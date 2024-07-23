import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User } from "../data/index.js"

import registerUser from "./registerUser.js"
import { ContentError, CredentialsError, DuplicityError, MatchError } from "com/errors.js"

const { MONGODB_URL_TEST } = process.env


describe("registerUser", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it("succeeds on new user", () =>
    registerUser("Mac", "Pollo", "mac@pollo.com", "MacPollo", "123", "123")
      .then(() => User.findOne())
      .then(user => {
        expect(user.name).to.equal("Mac")
        expect(user.surname).to.equal("Pollo")
        expect(user.email).to.equal("mac@pollo.com")
        expect(user.username).to.equal("MacPollo")

        return bcrypt.compare("123", user.password)
      })
      .then((match) => expect(match).to.be.true)
  )


  it("fails on existing user", () => {
    let errorThrown

    return bcrypt.hash("123", 8)
      .then(hash => User.create({ name: "Mac", surname: "Pollo", email: "mac@pollo.com", username: "MacPollo", password: hash }))
      .then(() => registerUser("Mac", "Pollo", "mac@pollo.com", "MacPollo", "123", "123"))
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(DuplicityError)
        expect(errorThrown.message).to.equal("user already exists ❌")
      })
  })

  it("fails on invalid name", () => {
    let errorThrown
    try {
      registerUser(123, "Pollo", "mac@pollo.com", "MacPollo", "123", "123")
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("name is not valid ❌")
    }
  })

  it("fails on invalid surname", () => {
    let errorThrown
    try {
      registerUser("Mac", 123, "mac@pollo.com", "MacPollo", "123", "123")
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("surname is not valid ❌")
    }
  })

  it("fails on invalid email", () => {
    let errorThrown
    try {
      registerUser("Mac", "Pollo", 123, "MacPollo", "123", "123")
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("email is not valid ❌")
    }
  })

  it("fails on invalid username", () => {
    let errorThrown
    try {
      registerUser("Mac", "Pollo", "mac@pollo.com", 123, "123", "123")
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("username is not valid ❌")
    }
  })

  it("fails on invalid password", () => {
    let errorThrown
    try {
      registerUser("Mac", "Pollo", "mac@pollo.com", "MacPollo", 123, "123")
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("password is not valid ❌")
    }
  })

  it("fails on non-matching password repeat", () => {
    let errorThrown
    try {
      registerUser("Mac", "Pollo", "mac@pollo.com", "MacPollo", "123", 123)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(MatchError)
      expect(errorThrown.message).to.equal("passwords don\'t match ❌")
    }
  })



  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})











