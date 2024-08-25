import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User, Service } from '../data/index.js'

import deleteService from './deleteService.js'

const { MONGODB_URL_TEST } = process.env

describe('delete service', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Service.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Service.deleteMany()]))



    it('succeeds on delete service', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider'
            })
                .then(user => Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60,
                    provider: user.id
                })
                    .then((service) => deleteService(user.id, service.id))
                    .then(serviceIdDeleted => Service.findById(serviceIdDeleted))
                    .then((serviceIdDeleted) => {
                        expect(serviceIdDeleted).to.be.null
                    }))
            )
    )


    it('fails on non-existing user', () => {
        let errorThrown

        return deleteService(new ObjectId().toString(), new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })


    it('fails on non-existing service', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider'
            }))
            .then(user => deleteService(user.id, new ObjectId().toString()))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                expect(errorThrown.message).to.equal('Service not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteService(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid serviceId', () => {
        let errorThrown

        try {
            deleteService(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('serviceId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Service.deleteMany()]).then(() => mongoose.disconnect()))
})