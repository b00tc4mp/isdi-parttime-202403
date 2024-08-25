import 'dotenv/config'

import mongoose, { Types } from 'mongoose'

const { ObjectId } = Types

import bcrypt from 'bcryptjs'

import { ContentError, NotFoundError } from 'com/errors.js'

import { expect } from 'chai'

import { User, Service } from '../data/index.js'

import getAllServices from './getAllServices.js'

const { MONGODB_URL_TEST } = process.env

describe('get all services', () => {

    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Service.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Service.deleteMany()]))

    it('succeeds on get all services', () =>
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
                            description: 'Depilacion laser brazos',
                            category: 'Laser treatments',
                            duration: 30,
                            price: 60,
                            provider: user.id.toString()
                        })
                            .then(() => getAllServices(user.id))
                            .then(services => {
                                expect(services).to.be.an('array')
                                expect(services.length).to.equal(1)
                                expect(services[0]).to.be.an('object')
                                expect(services[0].id).to.be.a('string')
                                expect(services[0].id).to.have.lengthOf(24)
                                expect(services[0].name).to.equal('Brazos')
                                expect(services[0].description).to.equal('Depilacion laser brazos')
                                expect(services[0].category).to.equal('Laser treatments')
                                expect(services[0].duration).to.equal(30)
                                expect(services[0].price).to.equal(60)
                            })
                    })
            })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getAllServices(new ObjectId().toString())
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('User not found')
            })
    })

    it('returns an empty array when there are no services', () => {
        bcrypt.hash('1234', 8)
            .then(hash => User.create({
                name: 'Jon',
                surname: 'Snow',
                email: 'jon@snow.com',
                password: hash,
                role: 'provider'
            }))

            .then(user => {
                return getAllServices(user.id)
                    .then(services => {
                        expect(services).to.be.an('array').that.is.empty
                    })

            })

    })

    it('fails om invalid user id', () => {
        let errorThrown

        try {
            getAllServices(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => Promise.all([User.deleteMany(), Service.deleteMany()]).then(() => mongoose.disconnect()))
})