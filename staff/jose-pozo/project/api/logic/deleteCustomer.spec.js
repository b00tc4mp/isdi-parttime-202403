import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { ContentError, NotFoundError } from 'com/errors.js'

import { expect } from 'chai'

import { User } from '../data/index.js'

import deleteCustomer from './deleteCustomer.js'

const { MONGODB_URL_TEST } = process.env



describe('delete customer', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on delete user', () =>
        bcrypt.hash('1234', 8)
            .then(hash => Promise.all([User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }), User.create({
                name: 'Alfa',
                surname: 'Beto',
                email: 'alfa@beto',
                role: 'customer'
            })]))
            .then(([user, customer]) => deleteCustomer(user.id, customer.id))
            .then(customerIdDeleted => User.findById(customerIdDeleted))
            .then((customerIdDeleted) => {
                expect(customerIdDeleted).to.be.null
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return deleteCustomer(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on non-existing customer', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(user => deleteCustomer(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal('Customer not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteCustomer(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid customerId', () => {
        let errorThrown

        try {
            deleteCustomer(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('Customer is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})






