import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import modifyUser from './modifyUser.js'
import { NotFoundError, MatchError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('modifyUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds on modify user', () =>
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
            modifyUser(user.id, 'Soraya', 'Srz', 'soraya@srz.com', '677584932', '', '321321321', '321321321')
        ))
        .then(() => User.find())
        .then(users => {
            expect(users).to.be.an.instanceOf(Array)
            expect(users[0]).to.be.an.instanceOf(Object)
            expect(users[0].name).to.be.equal('Soraya')
            expect(users[0].surname).to.be.equal('Srz')
            expect(users[0].email).to.be.equal('soraya@srz.com')
            expect(users[0].phone).to.be.equal('677584932')
            expect(users[0].avatar).to.be.equal('')
            expect(users[0].role).to.be.equal('admin')
            expect(users[0].manager).to.be.a.string
            expect(users[0].available).to.be.equal(true)
            return bcrypt.compare('321321321', users[0].password)
        })
)

    it('fails on non-existing user', () => {
        let errorThrown

        return modifyUser(new ObjectId().toString(), 'Soraya', 'Srz', 'soraya@srz.com', '677584932', '', '321321321', '321321321')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid user id', () => {
        let errorThrown
        
        try {
            modifyUser(1234, 'Soraya', 'Suarez', 'soraya@suarez.com', '673445678', '', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid name', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 1234, 'Suarez', 'soraya@suarez.com', '673445678', '', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 1234, 'soraya@suarez.com', '673445678', '', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('surname is not valid')
        }
    })

    it('fails on invalid email', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 'Suarez', 1234, '673445678', '', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid phone', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 'Suarez', 'soraya@suarez.com', 673445678, '', '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('phone is not valid')
        }
    })

    it('fails on invalid avatar', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 'Suarez', 'soraya@suarez.com', '673445678', 1234, '321321321', '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('url is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 'Suarez', 'soraya@suarez.com', '673445678', '', 321321321, '321321321')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    it('fails on not match passwords', () => {
        let errorThrown
        
        try {
            modifyUser(new ObjectId().toString(), 'Soraya', 'Suarez', 'soraya@suarez.com', '673445678', '', '321321321', '3213213213')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('passwords don\'t match')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})