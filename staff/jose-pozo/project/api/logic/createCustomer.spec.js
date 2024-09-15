import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { ContentError, NotFoundError, DuplicityError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import createCustomer from './createCustomer.js'

const { MONGODB_URL_TEST } = process.env


describe('create customer', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on create customer', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider',
            }))
            .then(user => createCustomer(user.id, 'Alfa', 'Beto', 'alfa@beto.com'))
            .then(() => User.findOne({ email: 'alfa@beto.com' }))
            .then(customer => {
                expect(customer.name).to.be.an('string')
                expect(customer.name).to.equal('Alfa')
                expect(customer.surname).to.be.an('string')
                expect(customer.surname).to.equal('Beto')
                expect(customer.email).to.be.an('string')
                expect(customer.email).to.equal('alfa@beto.com')
                expect(customer.role).to.equal('customer')
                expect(customer.manager).to.be.an.instanceOf(ObjectId)
                expect(customer.providers).to.be.an('array')
                expect(customer.providers.length).to.equal(0)
                expect(customer.appointments).to.be.an('array')
                expect(customer.appointments.length).to.equal(0)
                expect(customer.notes).to.be.an('array')
                expect(customer.notes.length).to.equal(0)
                expect(customer.services).to.be.an('array')
                expect(customer.services.length).to.equal(0)
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return createCustomer(new ObjectId().toString(), 'Alfa', 'Beto', 'alfa@beto.com')
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on duplicity customer', () => {
        let errorThrown, user1

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider',
            }))
            .then(createdUser => {
                user1 = createdUser

                return User.create({
                    name: 'Alfa',
                    surname: 'Beto',
                    email: 'alfa@beto.com',
                    role: 'customer',
                    manager: user1.id
                })
            })
            .then(() => createCustomer(user1.id, 'Alfa', 'Beto', 'alfa@beto.com'))
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('Customer already exists')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createCustomer(1234, 'Alfa', 'Beto', 'alfa@beto.com')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid name', () => {
        let errorThrown

        try {
            createCustomer(new ObjectId().toString(), '1234', 'Beto', 'alfa@beto.com')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname', () => {
        let errorThrown

        try {
            createCustomer(new ObjectId().toString(), 'Alfa', 1234, 'alfa@beto.com')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('surname is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown

        try {
            createCustomer(new ObjectId().toString(), 'Alfa', 'Beto', 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))

})






