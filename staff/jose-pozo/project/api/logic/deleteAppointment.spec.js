import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { NotFoundError, ContentError } from 'com/errors.js'
import { expect } from 'chai'
import { Service, User, Appointment } from '../data/index.js'
import deleteAppointment from './deleteAppointment.js'

const { ObjectId } = Types
const { MONGODB_URL_TEST } = process.env


describe('delete appointment', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Appointment.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Appointment.deleteMany()]))

    it('succeeds on delete appointment', () => {
        let user, customer, service

        bcrypt.hash('1234', 8)
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
                                    .then((appointment) => deleteAppointment(user.id, appointment.id))
                                    .then((appointment) => {
                                        expect(appointment).to.be.an('object')
                                        expect(appointment._id).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.id).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.id).to.have.lengthOf(24)
                                        expect(appointment.customer).to.equal(customer.id)
                                        expect(appointment.customer).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.customer).to.have.lengthOf(24)
                                        expect(appointment.service).to.equal(service.id)
                                        expect(appointment.service).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.service).to.have.lengthOf(24)
                                        expect(appointment.provider).to.equal(user.id)
                                        expect(appointment.provider).to.be.an.instanceOf(ObjectId)
                                        expect(appointment.provider).to.have.lengthOf(24)
                                        expect(appointment.startDate).to.equal('2024-10-23')
                                        expect(appointment.startDate).to.be.an.instanceOf(Date)
                                        expect(appointment.endDate).to.equal('2024-10-23')
                                        expect(appointment.endDate).to.be.an.instanceOf(Date)
                                        expect(appointment.status).to.equal('confirmed')
                                    })


                            })
                    })
            })
    })

    it('fails on non-existing user', () => {
        let errorThrown, user, customer, service

        bcrypt.hash('1234', 8)
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
                                    .then((appointment) => deleteAppointment(new ObjectId.toString(), appointment.id))
                                    .catch(error => errorThrown = error)
                                    .finally(() => {
                                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                        expect(errorThrown.message).to.equal('User not found')
                                    })
                            })
                    })
            })
    })

    it('fails on non-existing appointment', () => {
        let errorThrown, user, customer, service

        bcrypt.hash('1234', 8)
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
                                    .then((appointment) => deleteAppointment(user.id, new ObjectId.toString()))
                                    .catch(error => errorThrown = error)
                                    .finally(() => {
                                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                                        expect(errorThrown.message).to.equal('Appointment not found')
                                    })
                            })
                    })
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            deleteAppointment(1234, new ObjectId().toString())
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid appointmentId', () => {
        let errorThrown

        try {
            deleteAppointment(new ObjectId().toString(), 1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('appointmentId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Service.deleteMany(), Appointment.deleteMany()]).then(() => mongoose.disconnect()))
})