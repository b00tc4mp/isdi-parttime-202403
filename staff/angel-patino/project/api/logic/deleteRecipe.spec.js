import 'dotenv/config'
import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcryptjs'

import { expect } from 'chai'

import deleteRecipe from './deleteRecipe.js'
import { Recipe, User } from '../data/index.js'

import { MatchError, NotFoundError } from 'com/errors.js'
const { ObjectId } = Types

const { MONGODB_URL_TEST } = process.env


describe('deleteRecipe', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => {
        return Promise.all([User.deleteMany(), Recipe.deleteMany()])
    }))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))

    it('succeeds on delete recipe', () => {
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
                .then(recipe => ({ user, recipe }))
            )
            .then(({ user, recipe }) =>
                deleteRecipe(user.id, recipe.id)
            )
            .then(recipeId =>
                Recipe.findById(recipeId).then(deleteRecipe => {
                    expect(deleteRecipe).to.be.null
                })
            )
    })

    it('fails on non-existing user', () => {
        let errorThrown

        return Recipe.create({
            author: new ObjectId().toString(),
            title: 'Tortela',
            thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
            cookTime: 55,
            ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
            description: 'mix',
            rating: 3,
            liked: []
        })
            .then(recipe => deleteRecipe(new ObjectId().toString(), recipe.id))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('user not found')
            })
    })

    it('fails on non-existing recipe', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then((hash) => User.create({
                name: 'Master',
                surname: 'Chef',
                email: 'master@chef.com',
                username: 'MasterChef',
                password: hash
            })
                .then((user) => deleteRecipe(user.id, new ObjectId().toString())))
            .catch(error => errorThrown = error)
            .finally(() => {
                expect(errorThrown).to.be.instanceOf(NotFoundError)
                expect(errorThrown.message).to.equal('recipe not found')
            })
    })

    it('fails on non-match user', () => {
        let errorThrown

        return bcrypt.hash('123123123', 8)
            .then(hash => {
                const user = new User({
                    name: 'Master',
                    surname: 'Chef',
                    email: 'master@chef.com',
                    username: 'MasterChef',
                    password: hash
                })
                const recipe = new Recipe({
                    author: new ObjectId(),
                    title: 'Tortela',
                    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Tortilla-de-patatas.jpg',
                    cookTime: 55,
                    ingredients: [{ name: 'huevos', quantity: 2, unit: 'ml' }],
                    description: 'mix',
                    rating: 3,
                })
                return Promise.all([user.save(), recipe.save()])
                    .then(([savedUser, savedRecipe]) => {
                        return deleteRecipe(savedUser.id.toString(), savedRecipe.id.toString())
                    })
                    .catch(error => errorThrown = error)
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(MatchError)
                expect(errorThrown.message).to.equal('recipe author does not match user')
            })

    })
    after(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]).then(() => mongoose.disconnect()))
})
