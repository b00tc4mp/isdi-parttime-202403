import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { NotFoundError, ContentError } from 'com/errors.js'
import { expect } from 'chai'
import { User, Service, Appointment } from '../data/index.js'
import getAllAppointments from './getAllAppointments.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env

describe('get all appointments', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Appointment.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Appointment.deleteMany()]))

    it('succeeds on get all appointments', () => {
        let user, customer, service

        return bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow',
                    password: hash,
                    role: 'provider',
                })
                    .then((userCreated) => {
                        user = userCreated

                        return User.create({
                            name: 'Alfa',
                            surname: 'Beto',
                            email: 'alfa@beto',
                            role: 'customer',
                            phone: '+34699123456'
                        })
                            .then((customerCreated) => {
                                customer = customerCreated

                                return Service.create({
                                    name: 'Brazos',
                                    description: 'Depilacion laser brazos',
                                    category: 'Laser treatments',
                                    duration: 30,
                                    price: 60,
                                    provider: user.id
                                })
                                    .then((serviceCreated) => {
                                        service = serviceCreated

                                        return Appointment.create({
                                            customer: customer.id,
                                            service: service.id,
                                            provider: user.id,
                                            startDate: '2024-10-23',
                                            endDate: '2024-10-23',
                                            status: 'confirmed'
                                        })
                                    })
                                    .then(() => getAllAppointments(user.id))
                                    .then(appointments => {
                                        expect(appointments).to.be.an('array')
                                        expect(appointments).to.have.lengthOf(1)
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown, user, customer, service

        return bcrypt.hash('1234', 8)
            .then(hash => {
                return User.create({
                    name: 'Jon',
                    surname: 'Snow',
                    email: 'jon@snow',
                    password: hash,
                    role: 'provider',
                })
                    .then((userCreated) => {
                        user = userCreated

                        return User.create({
                            name: 'Alfa',
                            surname: 'Beto',
                            email: 'alfa@beto',
                            role: 'customer',
                            phone: '+34699123456'
                        })
                            .then((customerCreated) => {
                                customer = customerCreated

                                return Service.create({
                                    name: 'Brazos',
                                    description: 'Depilacion laser brazos',
                                    category: 'Laser treatments',
                                    duration: 30,
                                    price: 60,
                                    provider: user.id
                                })
                                    .then((serviceCreated) => {
                                        service = serviceCreated

                                        return Appointment.create({
                                            customer: customer.id,
                                            service: service.id,
                                            provider: user.id,
                                            startDate: '2024-10-23',
                                            endDate: '2024-10-23',
                                            status: 'confirmed'
                                        })
                                    })
                                    .then(() => getAllAppointments(new ObjectId().toString()))
                                    .catch(error => errorThrown = error)
                                    .finally(() => {
                                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                        expect(errorThrown.message).to.equal('User not found')
                                    })
                            })
                    })
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown

        try {
            getAllAppointments(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceof(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })
})



