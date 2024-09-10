import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'
import { expect } from 'chai'

import { User, Ad } from '../data/index.js'
import createAd from './createAd.js'
import { NotFoundError, ContentError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

const { ObjectId } = Types

describe('createAd', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Ad.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Ad.deleteMany()]))

    it('succeeds on creating an ad from an existing user', () =>

        bcrypt.hash('123123123', 8)
            .then(hash => User.create({ name: 'Li', surname: 'Nux', email: 'li@nux.com', username: 'linux', password: hash }))
            .then(user =>
                createAd(user.id, 'Limones', 'Luneros', '8.5 €/Kg')
                    .then(() => Ad.findOne())
                    .then(ad => {
                        expect(ad.author.toString()).to.equal(user.id.toString())
                        expect(ad.title).to.equal('Limones')
                        expect(ad.description).to.equal('Luneros')
                        expect(ad.price).to.equal('8.5 €/Kg')
                        expect(ad.date).to.be.a('date')
                        expect(ad.adcomments).to.be.an('array') //.that.is.empty 
                    })
            )
    )

    it('fails on non-existing user', () => {
        let errorThrown

        // return bcrypt.hash("123123123", 8)
        //     .then(hash => User.create({ name: "Amigo", surname: "Mio", email: "amigo@mio.com", username: "amigomio", password: hash }))
        //     .then(() => createAd(new ObjectId().toString(), 'Test', 'Funcionando', '8.5 €/Kg', []))
        //     .catch(error => errorThrown = error)
        //     .finally(() => {
        //         expect(errorThrown).to.be.an.instanceOf(NotFoundError)
        //         expect(errorThrown.message).to.equal("user not found")
        //     })

        return createAd(new ObjectId().toString(), 'Ad Title', 'Ad Description', '8.5 €/Kg')
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            createAd('invalid-id', 'Ad Title', 'Ad Description', '8.5 €/Kg')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    // it('fails on invalid userId', () => {
    //     expect(() => createAd('invalid-id', 'Ad Title', 'Ad Description', '8.5 €/Kg'))
    //         .to.throw(ContentError, 'userId is not valid')
    // })


    it('fails on invalid title', () => {
        let errorThrown


        try {
            createAd(new ObjectId().toString(), '', 'Ad Description', '8.5 €/Kg')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('title is not valid')
        }
    })

    // it('fails on invalid title', () => {
    //     return createAd(new ObjectId().toString(), '', 'Ad Description', '8.5 €/Kg')
    //         .catch(error => {
    //             expect(error).to.be.instanceOf(ContentError)
    //             expect(error.message).to.equal('title is not valid')
    //         })
    // })


    it('fails on invalid description', () => {
        let errorThrown

        // return User.create({ name: 'John', surname: 'Doe', email: 'john@doe.com', username: 'johndoe', password: '12345678' })
        // .then(user => {
        try {
            createAd(new ObjectId().toString(), 'Ad Title', '', '8.5 €/Kg')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('description is not valid')
        }
    })

    it('fails on invalid price', () => {
        let errorThrown

        // return User.create({ name: 'John', surname: 'Doe', email: 'john@doe.com', username: 'johndoe', password: '12345678' })
        //     .then(user => {
        try {
            createAd(new ObjectId().toString(), 'Ad Title', 'Ad Description', '8.5')
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('price is not valid. It must be in the format "number €/Kg", e.g., "3.20 €/Kg".');
        }
        // });
    })

    after(() => Promise.all([User.deleteMany(), Ad.deleteMany()]).then(() => mongoose.disconnect()))
})