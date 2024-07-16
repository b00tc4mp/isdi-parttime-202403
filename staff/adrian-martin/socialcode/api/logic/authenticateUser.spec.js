import 'dotenv/config'
import authenticateUser from './authenticateUser.js'
import mongoose from 'mongoose'

import { expect } from 'chai'

const { MONGODB_URL } = process.env

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL))

    it('succeeds when user already exists', () =>
        authenticateUser('Cafeleche', '123123123')
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)
            })
    )

    after(() => mongoose.disconnect())
})