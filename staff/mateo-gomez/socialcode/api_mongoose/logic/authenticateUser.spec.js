import 'dotenv/config'
import mongoose, { disconnect } from 'mongoose'

import { expect } from 'chai'

import authenticateUser from './authenticateUser.js'

const { MONGODB_URL } = process.env

describe('authenticateUser', () => {
    before(() => mongoose.connect(MONGODB_URL))

    it('succeds when user already exists', () =>
        authenticateUser('doncic', '123123123')
            .then(userId => {
                expect(userId).to.be.a.string
                expect(userId).to.have.lengthOf(24)

            })
    )

    after(() => mongoose.disconnect())

})
