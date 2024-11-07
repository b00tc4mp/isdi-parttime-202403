import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import getAvailableUsers from './getAvailableUsers.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getAvailableUsers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get available users', () =>
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'admin',
                manager: null,
                available: true,
                password: hash 
            })
            .then(user =>
                User.create({
                    name: 'Agustin', 
                    surname: 'Suarez', 
                    email: 'agustin@suarez.com',
                    phone: '',
                    avatar: '',
                    role: 'user',
                    manager: user.id,
                    available: false,
                    password: hash 
                })
                .then(() => getAvailableUsers(user.id)))
                .then((users) => {
                    expect(users).to.be.an.instanceOf(Array)
                    expect(users[0]).to.be.an.instanceOf(Object)
                    expect(users[0].name).to.be.equal('Soraya')
                    expect(users[0].surname).to.be.equal('Suarez')
                    expect(users[0].email).to.be.equal('soraya@suarez.com')
                    expect(users[0].phone).to.be.equal('')
                    expect(users[0].avatar).to.be.equal('')
                    expect(users[0].role).to.be.equal('admin')
                    expect(users[0].manager).to.be.null
                    expect(users[0].available).to.be.equal(true)
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getAvailableUsers(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            getAvailableUsers(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})