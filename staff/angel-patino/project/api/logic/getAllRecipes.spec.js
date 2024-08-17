import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose, { Types } from "mongoose"
import { User, Recipe } from "../data/index.js"
import { expect } from "chai"

import getAllRecipes from './getAllRecipes.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env
const { ObjectId } = Types


describe('getAllRecipes', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Recipe.deleteMany(), User.deleteMany()])))
    beforeEach(() => Promise.all([Recipe.deleteMany(), User.deleteMany()]))

    it('succeeds on get all recipes', () => {
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: 'Master',
                surname: 'Chef',
                email: 'master@chef.com',
                username: 'MasterChef',
                password: hash
            }))
            .then(user => Recipe.create({
                author: user.id,
                title: 'Tortela',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                cookTime: 55,
                ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
                description: 'mix',
                rating: 3
            })
                .then(() => user)
            )
            .then(user => getAllRecipes(user.id))
            .then(recipes => {
                expect(recipes).to.be.an('array')
                expect(recipes).to.have.lengthOf(1)
                expect(recipes[0].title).to.equal('Tortela')
            })
    })

    it('fails on invalid userId', () => {
        let errorThrown

        try {
            getAllRecipes(123456)
        } catch (error) {
            errorThrown = error
        } finally {
            expect(errorThrown).to.be.an.instanceOf(ContentError)
            expect(errorThrown.message).to.equal('userId is not valid')
        }
    })

    it('fails on non-existing user', () => {
        return getAllRecipes(new mongoose.Types.ObjectId().toString())
            .catch(error => {
                expect(error).to.be.an.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    })

    it('returns an empty array if no recipes exits', () => {
        bcrypt.hash('123123123', 8)
            .then(hash => User.create({
                name: 'Master',
                surname: 'Chef',
                email: 'master@chef.com',
                username: 'MasterChef',
                password: hash
            }))
            .then(user => Recipe.create({
                author: user.id,
                title: 'Tortela',
                thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                cookTime: 55,
                ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
                description: 'mix',
                rating: 3
            })
                .then(() => user)
            )
            .then(user => getAllRecipes(user.id))
            .then(recipes => {
                expect(recipes).to.be.an('array')
                expect(recipes).to.have.lengthOf(0)
            })
    })


    after(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]).then(() => mongoose.disconnect()))
})
