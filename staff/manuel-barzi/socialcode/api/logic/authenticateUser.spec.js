import 'dotenv/config'
import mongoose from 'mongoose'

import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env

debugger

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL))

    it('succeeds when user already exists', () =>
        authenticateUser('wendydarling', '123123123')
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    after(() => mongoose.disconnect())
})