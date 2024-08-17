import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User } from '../data/index.js'
import registerUser from './registerUser.js'
import { DuplicityError, ContentError, MatchError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succeeds in registering a new user', () => {
        return registerUser('Juan', 'Desconocido', 'juan@desconocido.com', 'juandesconocido', '12345678', '12345678')
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('Juan')
                expect(user.surname).to.equal('Desconocido')
                expect(user.email).to.equal('juan@desconocido.com')
                expect(user.username).to.equal('juandesconocido')
                expect(bcrypt.compareSync('12345678', user.password)).to.be.true
            })
    })

    it('fails when the username already exists', () => {
        let errorThrown;

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Juan',
                surname: 'Desconocido',
                email: 'juan@desconocido.com',
                username: 'juandesconocido',
                password: hash
            }))
            .then(() => registerUser('Juan', 'Desconocido', 'juan@desconocido.com', 'juandesconocido', '12345678', '12345678'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('User already exists')
            });
    });

    it('fails when the email already exists', () => {
        let errorThrown;

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Juan',
                surname: 'Desconocido',
                email: 'juan@desconocido.com',
                username: 'juandesconocido',
                password: hash
            }))
            .then(() => registerUser('Juan', 'Desconocido', 'juan@desconocido.com', 'juandesconocido', '12345678', '12345678'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('User already exists')
            });
    });

    it('fails when passwords do not match', () => {
        let errorThrown;

        try {
            registerUser('Juan', 'Desconocido', 'juan@desconocido.com', 'juandesconocido', '12345678', '67812345')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(MatchError)
            expect(errorThrown.message).to.equal("passwords don't match")
        }
    });

    it('fails with an invalid email', () => {
        let errorThrown;

        try {
            registerUser('Juan', 'Desconocido', 'juan-desconocido.com', 'juandesconocido', '12345678', '67812345')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('email is not valid')
        }
    });

    it('fails with an invalid username', () => {
        let errorThrown

        try {

            registerUser('Juan', 'Desconocido', 'juan@desconocido.com', 12, '12345678', '67812345')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('username is not valid')
        }
    });

    after(() => User.deleteMany().then(() => mongoose.disconnect()))
});
