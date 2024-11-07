import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import modifyUserAvailable from './modifyUserAvailable.js'
import { NotFoundError, CredentialsError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyUserAvailable', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on modify user available', () =>
    bcrypt.hash('123123123', 8)
        .then(hash => User.create({ 
            name: 'Soraya', 
            surname: 'Suarez', 
            email: 'soraya@suarez.com',
            phone: '',
            avatar: '',
            role: 'admin',
            manager: new ObjectId().toString(),
            available: true,
            password: hash 
        })
        .then(user =>
            User.create({
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@srz.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: user.id,
                available: true,
                password: hash 
            })
            .then((userUser) => ({ user, userUser }))
        ))
        .then(({ user, userUser }) => 
            modifyUserAvailable(user.id, userUser.id, false)
        )
        .then(() => User.find())
        .then(users => {
            expect(users).to.be.an.instanceOf(Array)
            expect(users[1]).to.be.an.instanceOf(Object)
            expect(users[1].name).to.be.equal('Soraya')
            expect(users[1].surname).to.be.equal('Suarez')
            expect(users[1].email).to.be.equal('soraya@srz.com')
            expect(users[1].phone).to.be.equal('')
            expect(users[1].avatar).to.be.equal('')
            expect(users[1].role).to.be.equal('user')
            expect(users[1].manager).to.be.a.string
            expect(users[1].available).to.be.equal(false)
            return bcrypt.compare('123123123', users[1].password)
        })
)

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyUserAvailable(new ObjectId().toString(), new ObjectId().toString(), false)
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-match user role', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
        .then((hash) => User.create({
            name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: new ObjectId().toString(),
                available: true,
                password: hash 
        })
        .then((user) => modifyUserAvailable(user.id, new ObjectId().toString(), false)))
        .catch(error => errorThrown = error)
        .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(CredentialsError)
            expect(errorThrown.message).to.equal('role not permited')
        })
    })

    it('fails on non-existing user to modify', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
        .then((hash) => User.create({
            name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'admin',
                manager: new ObjectId().toString(),
                available: true,
                password: hash 
        })
        .then((user) => modifyUserAvailable(user.id, new ObjectId().toString(), false)))
        .catch(error => errorThrown = error)
        .finally(() => {
            expect(errorThrown).to.be.an.instanceOf(NotFoundError)
            expect(errorThrown.message).to.equal('user not found')
        })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            modifyUserAvailable(1234, new ObjectId().toString(), false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid user id to modify', () => {
        let errorThrown
        
        try {
            modifyUserAvailable(new ObjectId().toString(), 1234, false)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid available', () => {
        let errorThrown
        
        try {
            modifyUserAvailable(new ObjectId().toString(), new ObjectId().toString(), 'false')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('is not boolean')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})