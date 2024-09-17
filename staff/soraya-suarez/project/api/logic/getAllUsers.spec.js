import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import getAllUsers from './getAllUsers.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('getAllUsers', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on get all users', () =>
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
                .then(() => getAllUsers(user.id)))
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
                    expect(users[1]).to.be.an.instanceOf(Object)
                    expect(users[1].name).to.be.equal('Agustin')
                    expect(users[1].surname).to.be.equal('Suarez')
                    expect(users[1].email).to.be.equal('agustin@suarez.com')
                    expect(users[1].phone).to.be.equal('')
                    expect(users[1].avatar).to.be.equal('')
                    expect(users[1].role).to.be.equal('user')
                    expect(users[1].manager).to.be.a.string
                    expect(users[1].available).to.be.equal(false)
                })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return getAllUsers(new ObjectId().toString())
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            getAllUsers(1234)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})