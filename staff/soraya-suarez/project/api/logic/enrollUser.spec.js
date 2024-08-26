import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'
import { User } from '../data/index.js'
import enrollUser from './enrollUser.js'
import { NotFoundError, CredentialsError, DuplicityError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('enrollUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())
    
    it('succeeds on enroll user', () =>
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
            }))
            .then((user) => enrollUser('Agustin', 'Suarez', 'agustin@suarez.com', 'user', user.id, '123123123', '123123123'))
                .then(() => User.findOne({ email:'agustin@suarez.com' }))
                .then(user => {
                    expect(user._id).to.be.instanceOf(ObjectId)
                    expect(user.name).to.equal('Agustin')
                    expect(user.surname).to.equal('Suarez')
                    expect(user.email).to.equal('agustin@suarez.com')
                    expect(user.phone).to.equal('')
                    expect(user.avatar).to.equal('')
                    expect(user.role).to.equal('user')
                    expect(user.manager).instanceOf(ObjectId)
                    expect(user.available).to.equal(true)
                    return bcrypt.compare('123123123', user.password)
                })
                .then((match) => {
                    expect(match).to.be.true
                })
    )

    it('fails on non-existing user', () => {
        let errorThrown

        return enrollUser('Poca', 'Hontas', 'poca@hontas.com', 'user', new ObjectId().toString(), '123123123', '123123123')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-permiting role user to enroll', () => {
        let errorThrown

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ 
                name: 'Soraya', 
                surname: 'Suarez', 
                email: 'soraya@suarez.com',
                phone: '',
                avatar: '',
                role: 'user',
                manager: new ObjectId().toString(),
                available: true,
                password: hash 
            }))
            .then((user) => enrollUser('Poca', 'Hontas', 'poca@hontas.com', 'user', user.id, '123123123', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(CredentialsError)
                expect(errorThrown.message).to.equal('role not permited')
            })
    })

    it('fails on-existing user to enroll', () => {
        let errorThrown

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
            }))
            .then(user => enrollUser('sor', 'aya', 'soraya@suarez.com', 'user', user.id, '123123123', '123123123'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('user to enroll already exists')
            })
    })

    it('fails on invalid name', () => {
        let errorThrown
    
        try {
            enrollUser(1234, 'aya', 'soraya@suarez.com', 'user', new ObjectId().toString(), '123123123', '123123123')
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
            enrollUser('sor', 1234, 'soraya@suarez.com', 'user', new ObjectId().toString(), '123123123', '123123123')
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
            enrollUser('sor', 'aya', 'sorayasuarez.com', 'user', new ObjectId().toString(), '123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid role', () => {
        let errorThrown
    
        try {
            enrollUser('sor', 'aya', 'soraya@suarez.com', 'usr', new ObjectId().toString(), '123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('role is not valid')
        }
    })

    it('fails on invalid manager id', () => {
        let errorThrown
        
        try {
            enrollUser('sor', 'aya', 'soraya@suarez.com', 'user', 12334, '123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('id is not valid')
        }
    })

    it('fails on invalid password', () => {
        let errorThrown
        
        try {
            enrollUser('sor', 'aya', 'soraya@suarez.com', 'user', new ObjectId().toString(), 123123123, '123123123')
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
            enrollUser('sor', 'aya', 'soraya@suarez.com', 'user', new ObjectId().toString(), '123123123', '1231231234')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('passwords don\'t match')
        }
    })

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})