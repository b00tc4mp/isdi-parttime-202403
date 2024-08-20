import "dotenv/config"
import { mongoose, Types } from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"
import { User } from "../model/index.js"

import registerCustomer from "./registerCustomer.js"
import { NotFoundError, ContentError } from "com/errors.js"

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe("registerCustomer", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany())

  it("succeeds on new customer", () =>
    bcrypt.hash("1234", 10)
      .then((hash) => User.create({ username: "Jack", email: "jack@email.es", password: hash }))
      .then((user) =>
        registerCustomer(user.id, "Pepito", "Pepito Grillo, S.L", "pepito@grillo.es", "1234", "B03413222", "Calle falsa 123", "666555444")
          .then(() => User.findOne({ email: "pepito@grillo.es" }))
          .then(customer => {
            expect(customer._id).to.be.instanceOf(ObjectId)
            expect(customer.username).to.equal("Pepito")
            expect(customer.email).to.equal("pepito@grillo.es")
            expect(customer.companyName).to.equal("Pepito Grillo, S.L")
            expect(customer.taxId).to.equal("B03413222")
            expect(customer.address).to.equal("Calle falsa 123")
            expect(customer.phone).to.equal("666555444")

            return bcrypt.compare("1234", customer.password)
          })
          .then((match) => expect(match).to.be.true)
      )
  )

  it("fails on non-existing customer user", () => {
    let errorThrown

    return registerCustomer(new ObjectId().toString(), "Jack", "Pepito Enterprise, Inc.", "jack@email.es", "1234", "B03413111", "Calle falsa 123", "666555443")
      .catch((error) => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("User not found")
      })
  })

  it("fails on invalid username", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, 1234, "Pepito Enterprise, Inc.", "jack@email.es", "1234", "B03413111", "Calle falsa 123", "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("username is not valid")
      })
  })

  it("fails on invalid companyName", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", 1234, "jack@email.es", "1234", "B03413111", "Calle falsa 123", "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("company name is not valid")
      })
  })

  it("fails on invalid email", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", "Pepito Enterprise, Inc.", "jackemail.es", "1234", "B03413111", "Calle falsa 123", "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("email is not valid")
      })
  })

  it("fails on invalid password", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", "Pepito Enterprise, Inc.", "jack@email.es", "12", "B03413111", "Calle falsa 123", "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("Password is not valid")
      })
  })

  it("fails on invalid taxId", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", "Pepito Enterprise, Inc.", "jack@email.es", "1234", "B03", "Calle falsa 123", "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("NIF/CIF is not valid")
      })
  })

  it("fails on invalid address", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", "Pepito Enterprise, Inc.", "jack@email.es", "1234", "B03413111", 1234, "666555443")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("address is not valid")
      })
  })

  it("fails on invalid phone", () => {
    let errorThrown

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        return User.create({ username: "Jack", email: "jack@email.es", password: hash })
      })
      .then((user) => {
        return registerCustomer(user.id, "Jack", "Pepito Enterprise, Inc.", "jack@email.es", "1234", "B03413111", "Calle falsa 123", "66655")
      })
      .catch((error) => {
        errorThrown = error
      })
      .finally(() => {
        expect(errorThrown).to.be.instanceOf(ContentError)
        expect(errorThrown.message).to.equal("phone number is not valid")
      })
  })

  after(() => User.deleteMany().then(() => mongoose.disconnect()))
})
