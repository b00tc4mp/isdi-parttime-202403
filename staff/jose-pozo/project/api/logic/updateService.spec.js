import 'dotenv/config'

import mongoose, { connect, Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { User, Service } from '../data/index.js'

import updateService from './updateService.js'

const { MONGODB_URL_TEST } = process.env


describe('update service', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Service.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Service.deleteMany()]))

    it('succeeds on update service', () =>

        bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow',
                    password: hash,
                    role: 'provider',
                })
                    .then(user => {
                        return Service.create({
                            name: 'Brazos',
                            description: 'Depilacion laser Brazos',
                            category: 'Laser treatments',
                            duration: 30,
                            price: 60
                        })
                            .then(service => updateService(user.id, service.id, { name: 'Espalda', description: 'Depilacion Espalda', category: 'Laser treatments', duration: 30, price: 60 }))
                            .then(service => {
                                expect(service).to.be.an('object')
                                expect(service.name).to.equal('Espalda')
                                expect(service.description).to.equal('Depilacion Espalda')
                                expect(service.category).to.equal('Laser treatments')
                                expect(service.duration).to.equal(30)
                                expect(service.price).to.equal(60)
                            })
                    })
            })
    )



    it('fails on non-existing user', () => {
        let errorThrown

        bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow',
                    password: hash,
                    role: 'provider',
                })
                    .then(user => {
                        return Service.create({
                            name: 'Brazos',
                            description: 'Depilacion laser Brazos',
                            category: 'Laser treatments',
                            duration: 30,
                            price: 60
                        })
                            .then((user, service) => updateService(new ObjectId.toString(), service.id, { name: 'Espalda', description: 'Depilacion Espalda', category: 'Laser treatments', duration: 30, price: 60 }))
                            .catch(error => errorThrown = error)
                            .finally(() => {
                                expect(errorThrown).to.be.an.instanceof(NotFoundError)
                                expect(errorThrown.message).to.equal('User not found')
                            })
                    })
            })
    })

    it('fails on non-existing service', () => {
        let errorThrown

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService

                return updateService(user1.id, new ObjectId.toString(), { name: 'Brazos', description: 'Depilacion laser Brazos', category: 'Laser treatments', duration: 30, price: 60 })
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceof(NotFoundError)
                        expect(errorThrown.message).to.equal('Service not found')
                    })
            })
    })

    it('fails on invalid name', () => {
        let errorThrown, user1, service

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService
                try {
                    updateService(user1.id, service.id, { name: 123, description: 'Depilacion laser Brazos', category: 'Laser treatments', duration: 30, price: 60 })
                } catch (error) {
                    errorThrown = error
                }
                finally {
                    expect(errorThrown).to.be.an.instanceof(ContentError)
                    expect(errorThrown.message).to.equal('Name is not valid')
                }
            })
    })

    it('fails on invalid description', () => {
        let errorThrown, user1, service

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService
                try {
                    updateService(user1.id, service.id, { name: 'Brazos', description: 123, category: 'Laser treatments', duration: 30, price: 60 })
                } catch (error) {
                    errorThrown = error
                }
                finally {
                    expect(errorThrown).to.be.an.instanceof(ContentError)
                    expect(errorThrown.message).to.equal('Description is not valid')
                }
            })
    })

    it('fails on invalid category', () => {
        let errorThrown, user1, service

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService
                try {
                    updateService(user1.id, service.id, { name: 'Brazos', description: 'Depilacion laser Brazos', category: 123, duration: 30, price: 60 })
                } catch (error) {
                    errorThrown = error
                }
                finally {
                    expect(errorThrown).to.be.an.instanceof(ContentError)
                    expect(errorThrown.message).to.equal('Category is not valid')
                }
            })
    })

    it('fails on invalid duration', () => {
        let errorThrown, user1, service

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService
                try {
                    updateService(user1.id, service.id, { name: 'Brazos', description: 'Depilacion laser Brazos', category: 'Laser treatments', duration: '30', price: 60 })
                } catch (error) {
                    errorThrown = error
                }
                finally {
                    expect(errorThrown).to.be.an.instanceof(ContentError)
                    expect(errorThrown.message).to.equal('Duration is not valid')
                }
            })
    })

    it('fails on invalid price', () => {
        let errorThrown, user1, service

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

                return Service.create({
                    name: 'Brazos',
                    description: 'Depilacion laser Brazos',
                    category: 'Laser treatments',
                    duration: 30,
                    price: 60
                })
            })
            .then(createdService => {
                service = createdService
                try {
                    updateService(user1.id, service.id, { name: 'Brazos', description: 'Depilacion laser Brazos', category: 'Laser treatments', duration: 30, price: '60' })
                } catch (error) {
                    errorThrown = error
                }
                finally {
                    expect(errorThrown).to.be.an.instanceof(ContentError)
                    expect(errorThrown.message).to.equal('Price is not valid')
                }
            })
    })

    after(() => Promise.all([User.deleteMany(), Service.deleteMany()]).then(() => mongoose.disconnect()))
})