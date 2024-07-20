import 'dotenv/config'
import registerUser from './registerUser.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import { User } from '../data/index.js'
import { ContentError, CredentialError, DuplicityError } from 'com/error.js'

const { MONGODB_URL_TEST } = process.env

debugger // npm run test-inspect

describe('registerUser', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))
    beforeEach(() => User.deleteMany())

    it('succceds on register user', () => {
        registerUser('Esme', 'Ralda', 'esme@ralda.com', 'esmeralda', '123123123', '123123123')
            .then(() => User.findOne())
            .then(user => {
                expect(user.name).to.equal('Esme')
                expect(user.surname).to.equal('Ralda')
                expect(user.email).to.equal('esme@ralda.com')
                expect(user.username).to.equal('esmeralda')
                expect(user.password).to.equal('123123123')

                return bcrypt.compare('123123123', user.password)
            })
            .then((match) => expect(match).to.be.true)
    })

    it('fails on existing user', () => {
        let errorThrown

        return bcrypt.hash('1234', 8)
            .then(hash => User.create({ name: 'Esme', surname: 'Ralda', email: 'esme@ralda.com', username: 'esmeralda', password: hash }))
            .then(() => registerUser('Esme', 'Ralda', 'esme@ralda.com', 'esmeralda', '1234', '1234'))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal('user already exists')
            })
    })

    it("fails on existing user", () => {
        let errorThrown

        return bcrypt.hash("1234", 8)
            .then(hash => User.create({ name: "Mocha", surname: "Chai", email: "Mocha@Chai.com", username: "MochaChai", password: hash }))
            .then(() => registerUser("Mocha", "Chai", "Mocha@Chai.com", "MochaChai", "1234", "1234"))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(DuplicityError)
                expect(errorThrown.message).to.equal("❌ Users already exists ❌")
            })
    })
    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})


