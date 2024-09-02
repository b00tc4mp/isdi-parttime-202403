import 'dotenv/config'

import mongoose, { connect, Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import updateCustomer from './updateCustomer.js'

const { MONGODB_URL_TEST } = process.env


describe('update customer', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on update customer', () => {
        let user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(createdUser => {
                user1 = createdUser

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(createdUser => {
                customer = createdUser

                return updateCustomer(user1.id, customer.id, { name: 'Alfa', surname: 'Numerico', email: 'alfa@beto.com', phone: '+34699654321' })
            })
            .then(() => User.findOne(customer))
            .then(updateCustomer => {
                expect(updateCustomer).to.be.an('object')
                expect(updateCustomer.name).to.equal('Alfa')
                expect(updateCustomer.surname).to.equal('Numerico')
                expect(updateCustomer.email).to.equal('alfa@beto.com')
                expect(updateCustomer.phone).to.equal('+34699654321')
            })
    })


    it('fails on non-existing user', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated

                return updateCustomer(new ObjectId.toString(), customer.id, { name: 'Alfa', surname: 'Numerico', email: 'alfa@beto.com', phone: '+34699654321' })
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('User not found')
                    })
            })

    })

    it('fails on non-existing customer', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated

                return updateCustomer(user1.id, new ObjectId.toString(), { name: 'Alfa', surname: 'Numerico', email: 'alfa@beto.com', phone: '+34699654321' })
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('Customer not found')
                    })
            })

    })

    it('fails on ivalid name', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated
                try {
                    updateCustomer(user1.id, customer.id, { name: 1234, surname: 'Numerico', email: 'alfa@beto.com', phone: '+34699654321' })
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('Name is not valid')
                }
            })
    })

    it('fails on ivalid surname', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated
                try {
                    updateCustomer(user1.id, customer.id, { name: 'Alfa', surname: 1234, email: 'alfa@beto.com', phone: '+34699654321' })
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('Surname is not valid')
                }
            })
    })

    it('fails on ivalid email', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated
                try {
                    updateCustomer(user1.id, customer.id, { name: 'Alfa', surname: 'Numerico', email: 'alfabeto.com', phone: '+34699654321' })
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('Email is not valid')
                }
            })
    })

    it('fails on ivalid phone', () => {
        let errorThrown, user1, customer

        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(userCreated => {
                user1 = userCreated

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto',
                    role: 'customer',
                    phone: '+34699123456'
                })
            })
            .then(userCreated => {
                customer = userCreated
                try {
                    updateCustomer(user1.id, customer.id, { name: 'Alfa', surname: 'Numerico', email: 'alfa@beto.com', phone: 34699654321 })
                } catch (error) {
                    errorThrown = error
                } finally {
                    expect(errorThrown).to.be.an.instanceOf(ContentError)
                    expect(errorThrown.message).to.equal('Phone is not valid')
                }
            })
    })



    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})





