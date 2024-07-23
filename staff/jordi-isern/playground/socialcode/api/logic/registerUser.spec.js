import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'

import {User } from '../data/models/index.js'

import { ContentError, DuplicityError, MatchError} from 'com/errors.js'
import registerUser from './registerUser.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succes on user registered',() =>
        registerUser('test', 'teando','test@teando.com','testeando','123123123', '123123123')
            .then(User.findOne()
                .then(user => {
                    expect(user.name).to.equal('test')
                    expect(user.surname).to.equal('teando')
                    expect(user.email).to.equal('test@teando.com')
                    return bcrypt.compare('123123123', user.password)
                })
                .then(match => expect(match).to.be.true)
            )

    )

    it('fails on user already exist', ()=> {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'test@teando.com', username: 'testeando', password: hash }))
            .then(
                registerUser('test', 'teando','test@teando.com','testeando','123123123', '123123123')
                .catch(error => errorThrown = error)
                .finally(() => {
                    expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                    expect(errorThrown).to.equal('user already exists')
                })
            )
    })

    it('fails on invalid name',() => {
        let errorThrown

        try {
            registerUser(432423, 'teando','test@teando.com','testeando','123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('name is not valid')
        }
    })

    it('fails on invalid surname',() => {
        let errorThrown

        try {
            registerUser('test', 5432,'test@teando.com','testeando','123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('surname is not valid')
        }
    })

    it('fails on invalid email',() => {
        let errorThrown

        try {
            registerUser('test', 'teando',65434,'testeando','123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    })

    it('fails on invalid username',() => {
        let errorThrown

        try {
            registerUser('test', 'teando','test@teando.com',5432,'123123123', '123123123')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    })

    it('fails on invalid password',() => {
        let errorThrown

        try {
            registerUser('test', 'teando','test@teando.com','testeando',123123123, '123123123')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('password is not valid')
        }
    })

    it('fails on pasword and pasword repeat don\'t match',() => {
        let errorThrown

        try {
            registerUser('test', 'teando','test@teando.com','testeando','123123123', '156432653452')
        } catch (error) {
            errorThrown = error
        } finally{
            expect(errorThrown).to.be.instanceOf(MatchError)
            expect(errorThrown.message).to.equal('passwords don\'t match')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})