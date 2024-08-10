import "dotenv/config"
import { mongoose, Types } from "mongoose"
import bcrypt from "bcryptjs"

import { expect } from "chai"

import { User, DeliveryNote } from "../model/index.js"

import createDeliveryNote from "./createDeliveryNote.js"
import { ContentError, NotFoundError } from "com/errors.js"

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe("createDeliveryNote", () => {
  before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

  beforeEach(() => User.deleteMany().then(() => DeliveryNote.deleteMany()))

  it("succeeds on new delivery note", () => {

    return bcrypt.hash("1234", 10)
      .then((hash) => {
        const user = new User({
          username: "Bruce",
          email: "bruce@wayne.es",
          password: hash
        })
        const customer = new User({
          username: "Clark",
          email: "clark@kent.es",
          password: hash
        })

        return Promise.all([user.save(), customer.save()])
          .then(() => createDeliveryNote(user.id, customer.id))
          .then(() => DeliveryNote.findOne())
          .then(deliveryNote => {
            expect(deliveryNote.date).to.be.a("date")
            expect(deliveryNote.number).to.be.a("string")
            expect(deliveryNote.company.toString()).to.equal(user.id.toString())
            expect(deliveryNote.customer.toString()).to.equal(customer.id).toString()
            expect(deliveryNote.observations).to.be.a("string")
            expect(deliveryNote.works).to.be.an("array")
          })
      })
  })

  it("fails on existing user", () => {
    let errorThrown

    return createDeliveryNote(new ObjectId().toString(), new ObjectId().toString())
      .catch(error => errorThrown = error)
      .finally(() => {
        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        expect(errorThrown.message).to.equal("User not found")
      })
  })

  it("fails on invalid user", () => {
    let errorThrown
    try {
      createDeliveryNote(1234, new ObjectId().toString())
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("userId is not valid")
    }
  })

  it("fails on invalid customer", () => {
    let errorThrown
    try {
      createDeliveryNote(new ObjectId().toString(), 1234)
    } catch (error) {
      errorThrown = error
    } finally {
      expect(errorThrown).to.be.instanceOf(ContentError)
      expect(errorThrown.message).to.equal("customerId is not valid")
    }
  })

  after(() => User.deleteMany().then(() => DeliveryNote.deleteMany()).then(() => mongoose.disconnect()))
})