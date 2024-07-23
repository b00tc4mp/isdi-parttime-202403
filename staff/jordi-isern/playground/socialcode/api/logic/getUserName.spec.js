import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { Types } from 'mongoose'

const { ObjectId} = Types

import { expect } from 'chai'

import {User} from '../data/models/index.js'
import getUserName from './getUserName.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('getUserName',() => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => User.deleteMany()))

    beforeEach(() => User.deleteMany())

    it('succes on get name', () =>
        bcrypt.hash('123123123', 8)
        .then(hash => {
            return Promise.all([
            User.create({ name: 'user', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }),
            User.create({ name: 'targetUser', surname: 'Book', email: 'maac@book.com', username: 'maacbook', password: hash })
        ])})
        .then((users) =>
            getUserName(users[0].id, users[1].id)
                .then((username) => {
                    expect(username).to.be.an('string').that.is.equal('targetUser')
                })
        )
    )

    it('fails on not found User', () =>{
        let errorThrown
        return bcrypt.hash('123123123', 8)
            .then(hash => {
            return User.create({ name: 'targetUser', surname: 'Book', email: 'maac@book.com', username: 'maacbook', password: hash })
            })
            .then((targetUser) =>
                getUserName(new ObjectId().toString(), targetUser.id)
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('user not found')
                    })
            )
    })

    it('fails on not found targetUser', () =>{
        let errorThrown
        return bcrypt.hash('123123123', 8)
            .then(hash => {
            return User.create({ name: 'user', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash })
            })
            .then((user) =>
                getUserName(user.id, new ObjectId().toString())
                    .catch(error => errorThrown = error)
                    .finally(() => {
                        expect(errorThrown).to.be.an.instanceOf(NotFoundError)
                        expect(errorThrown.message).to.equal('targetUser not found')
                    })
            )
    })

    it('fails on invalid user Id',() => {
        let errorThrown

        try{
            getUserName(14322, new ObjectId().toString())
        }catch(error){
            errorThrown = error
        }finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on invalid targetUser Id',() => {
        let errorThrown

        try{
            getUserName(new ObjectId().toString(), 1454321)
        }catch(error){
            errorThrown = error
        }finally{
            expect(errorThrown).to.be.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('targetUser is not valid')
        }
    })


    after(() => User.deleteMany().then(() => mongoose.disconnect()))
})