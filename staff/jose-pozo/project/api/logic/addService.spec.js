import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { ContentError, NotFoundError, DuplicityError } from 'com/errors.js'

import { expect } from 'chai'

import { User, Service } from '../data/index.js'

import addService from './addService.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('add service', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Service.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Service.deleteMany()]))

    it('succeeds on add service', () =>
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            }))
            .then(user => addService(user.id, 'Brazos', 'Depilacion laser brazos', 'Laser treatments', 30, 60))
            .then(() => Service.findOne({ name: 'Brazos' }))
            .then(service => {
                expect(service.name).to.be.an('string')
                expect(service.name).to.equal('Brazos')
                expect(service.description).to.be.an('string')
                expect(service.description).to.equal('Depilacion laser brazos')
                expect(service.category).to.be.an('string')
                expect(service.category).to.equal('Laser treatments')
                expect(service.duration).to.be.an('number')
                expect(service.duration).to.equal(30)
                expect(service.price).to.be.an('number')
                expect(service.price).to.equal(60)
            })

    )

    it('fails on non-existing user', () => {
        let errorThrown

        return addService(new ObjectId().toString(), 'Brazos', 'Depilacion laser brazos', 'Laser treatments', 30, 60)
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('fails on duplicity service', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: '1234',
                role: 'provider',
            })
                .then(user => Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60,
                    provider: user.id
                })
                    .then(() => addService(user.id, 'Brazos', 'Depilacion laser brazos', 'Laser treatments', 30, 60))
                    .catch(error => {
                        errorThrown = error
                    })
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                        expect(errorThrown.message).to.equal('Service already exists')
                    })
                )
            )
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            addService(1234, 'Brazos', 'Depilacion laser brazos', 'Laser treatments', 30, 60)
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
            addService(new ObjectId().toString(), 1234, 'Depilacion laser brazos', 'Laser treatments', 30, 60)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            addService(new ObjectId().toString(), 'Brazos', 1234, 'Laser treatments', 30, 60)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    it('fails on invalid category', () => {
        let errorThrown

        try {
            addService(new ObjectId().toString(), 'Brazos', 'Depilacion laser brazos', 1234, 30, 60)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('category is not valid')
        }
    })

    it('fails on invalid duration', () => {
        let errorThrown

        try {
            addService(new ObjectId().toString(), 'Brazos', 'Depilacion laser brazos', 'Laser treatments', '30', 60)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('duration is not valid')
        }
    })

    it('fails on invalid price', () => {
        let errorThrown

        try {
            addService(new ObjectId().toString(), 'Brazos', 'Depilacion laser brazos', 'Laser treatments', 30, '60')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('price is not valid')
        }
    })
    after(() => Promise.all([User.deleteMany(), Service.deleteMany()]).then(() => mongoose.disconnect()))
})