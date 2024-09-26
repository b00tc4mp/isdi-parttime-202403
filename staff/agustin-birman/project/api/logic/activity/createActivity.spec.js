import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User, Activity } from '../../data/index.js'
import { ContentError } from 'com/errors.js'

import createActivity from './createActivity.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createActivity', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST))

    beforeEach(() => Promise.all([User.deleteMany(), Activity.deleteMany()]))

    it('succeds on creating activity', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash, userType: 'teacher' }))
            .then(user =>
                createActivity(user.id, 'Hola', 'Pepe')
                    .then(() => Activity.findOne())
                    .then(activity => {
                        expect(activity.title).to.equal('Hola')
                        expect(activity.description).to.equal('Pepe')
                    })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        createActivity(new ObjectId().toString(), 'title', 'description')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createActivity(12345, 'title', 'description')
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid title', () => {
        let errorThrown

        try {
            createActivity(new ObjectId().toString(), 1234, 'description')
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    it('fails on invalid description', () => {
        let errorThrown

        try {
            createActivity(new ObjectId().toString(), 'title', 123)
        } catch (error) {
            errorThrown = error

        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})