import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { ContentError, NotFoundError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import getAllCustomers from './getAllCustomers.js'

const { MONGODB_URL_TEST } = process.env

describe('get all customers', () => {

    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get all customers', () =>
        bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow.com',
                    password: hash,
                    role: 'provider'
                })
                    .then(user => {
                        return User.create({

                            name: 'Alfa',
                            surname: 'Beto',
                            email: 'alfa@beto.com',
                            role: 'customer',
                            manager: user.id.toString()
                        })


                            .then(() => getAllCustomers(user.id))
                            .then(customers => {
                                expect(customers).to.be.an('array')
                                expect(customers.length).to.equal(1)
                                expect(customers[0]).to.be.an('object')
                                expect(customers[0].id).to.be.a('string')
                                expect(customers[0].id).to.have.lengthOf(24)
                                expect(customers[0].name).to.equal('Alfa')
                                expect(customers[0].surname).to.equal('Beto')
                                expect(customers[0].email).to.equal('alfa@beto.com')
                                expect(customers[0].role).to.equal('customer')
                                expect(customers[0].phone).to.be.undefined
                                expect(customers[0].manager).to.be.an.instanceOf(ObjectId)
                                expect(customers[0].providers).to.be.an('array')
                                expect(customers[0].providers.length).to.equal(0)
                                expect(customers[0].appointments).to.be.an('array')
                                expect(customers[0].appointments.length).to.equal(0)
                                expect(customers[0].notes).to.be.an('array')
                                expect(customers[0].notes.length).to.equal(0)
                                expect(customers[0].services).to.be.an('array')
                                expect(customers[0].services.length).to.equal(0)
                            })
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getAllCustomers(new ObjectId().toString())
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found') //TODO change alert and fix spec
            })
    })

    it('fails on non-existing customer', () => {
        let errorThrown
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))
            .then(user => getAllCustomers(user.id))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('Customers not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllCustomers(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})

