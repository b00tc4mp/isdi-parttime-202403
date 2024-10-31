import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { NotFoundError, ContentError } from 'com/errors.js'

import { expect } from 'chai'

import { Service, User, Appointment } from '../data/index.js'

import makeAppointment from './makeAppointment.js'

const { MONGODB_URL_TEST } = process.env


describe('make appointment', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Service.deleteMany, Appointment.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Service.deleteMany(), Appointment.deleteMany()]))

    it('succeeds on make appointment', () =>

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
                        return User.create({
                            name: 'Alfa',
                            surname: 'Beto',
                            email: 'alfa@beto',
                            role: 'customer',
                            phone: '+34699123456'
                        })
                            .then(customer => {
                                return Service.create({
                                    name: 'Brazos',
                                    description: 'Depilacion laser brazos',
                                    category: 'Laser treatments',
                                    duration: 30,
                                    price: 60,
                                    provider: user.id
                                })
                                    .then((service) => makeAppointment(user.id, customer.id, service.id, '2024-10-23', '20:00', 'confirmed'))
                                    .then(appointment => {
                                        expect(appointment).to.be.an('object')
                                        expect(appointment._id).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.id).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.provider).to.equal(user.id)
                                        expect(appointment.customer).to.equal(customer.id)
                                        expect(appointment.service).to.equal(service.id)
                                        expect(appointment.date).to.equal('2024-10-23')
                                        expect(appointment.time).to.equal('20:00')
                                        expect(appointment.status).to.equal('confirmed')
                                    })
                            })
                    })
            })
    )

    it('fails on appointment not available ', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            })
                .then(user => {
                    User.create({
                        name: 'Alfa',
                        surname: 'Beto',
                        email: 'alfa@beto',
                        role: 'customer',
                        phone: '+34699123456'
                    })
                        .then(customer => {
                            Service.create({
                                name: 'Brazos',
                                description: 'Depilacion laser brazos',
                                category: 'Laser treatments',
                                duration: 30,
                                price: 60,
                                provider: user.id
                            })
                                .then((service) => {
                                    Appointment.create({
                                        provider: user.id,
                                        customer: customer.id,
                                        service: service.id,
                                        date: '2024-10-23',
                                        time: '20:00',
                                        status: 'confirmed'
                                    })

                                        .then(() => makeAppointment(user.id, customer.id, service.id, '2024-10-23', '20:00', 'confirmed'))
                                        .catch(error => errorThrown = error)
                                        .finally(() => {
                                            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                            expect(errorThrown.message).to.equal('Appointment not available')
                                        })
                                })
                        })
                })
            )
    })


    it('fails on non-existing user', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            })
                .then(user => {
                    User.create({
                        name: 'Alfa',
                        surname: 'Beto',
                        email: 'alfa@beto',
                        role: 'customer',
                        phone: '+34699123456'
                    })
                        .then(customer => {
                            Service.create({
                                name: 'Brazos',
                                description: 'Depilacion laser brazos',
                                category: 'Laser treatments',
                                duration: 30,
                                price: 60,
                                provider: user.id
                            })
                                .then((service) => makeAppointment(new ObjectId().toString(), customer.id, service.id, '2024-10-23', '20:00', 'confirmed'))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                    expect(errorThrown.message).to.equal('User not found')
                                })
                        })
                })
            )
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
            })
                .then(user => {
                    User.create({
                        name: 'Alfa',
                        surname: 'Beto',
                        email: 'alfa@beto',
                        role: 'customer',
                        phone: '+34699123456'
                    })
                        .then(customer => {
                            Service.create({
                                name: 'Brazos',
                                description: 'Depilacion laser brazos',
                                category: 'Laser treatments',
                                duration: 30,
                                price: 60,
                                provider: user.id
                            })
                                .then(() => makeAppointment(user.id, new ObjectId().toString(), service.id, '2024-10-23', '20:00', 'confirmed'))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                    expect(errorThrown.message).to.equal('User not found')
                                })
                        })
                })
            )
    })

    it('fails on non-existing service', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow',
                password: hash,
                role: 'provider',
            })
                .then(user => {
                    return User.create({
                        name: 'Alfa',
                        surname: 'Beto',
                        email: 'alfa@beto',
                        role: 'customer',
                        phone: '+34699123456'
                    })
                        .then(customer => {
                            return Service.create({
                                name: 'Brazos',
                                description: 'Depilacion laser brazos',
                                category: 'Laser treatments',
                                duration: 30,
                                price: 60,
                                provider: user.id
                            })
                                .then(() => makeAppointment(user.id, customer.id, new ObjectId().toString(), '2024-10-23', '20:00', 'confirmed'))
                                .catch(error => errorThrown = error)
                                .finally(() => {
                                    expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                    expect(errorThrown.message).to.equal('Service not found')
                                })
                        })
                })
            )
    })

    it('fails on invalid date', () => {
        let errorThrown

        try {
            makeAppointment(new ObjectId().toString(), new ObjectId().toString(), new ObjectId().toString(), 1234, '20:00', 'confirmed')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('date is not valid')
        }

    })

    it('fails on invalid time', () => {
        let errorThrown

        try {
            makeAppointment(new ObjectId().toString(), new ObjectId().toString(), new ObjectId().toString(), '2024-10-23', 1234, 'confirmed')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('time is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Service.deleteMany(), Appointment.deleteMany()]).then(() => mongoose.disconnect()))
})
