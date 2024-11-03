import { User, Recipe } from '../data/index.js'
import searchRecipes from './searchRecipes.js'
import { expect } from 'chai'
import mongoose from 'mongoose'
import { SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'

const { MONGODB_URL_TEST } = process.env


describe('searchRecipes', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])))

    beforeEach(() => Promise.all([User.deleteMany(), Recipe.deleteMany()]))

    it('should find a recipe by title', () => {
        let user, recipe;

        return bcrypt.hash('12345678', 8)
            .then(hash => {
                return User.create({
                    name: 'Pepe',
                    surname: 'Luis',
                    email: 'pepe@luis.com',
                    username: 'pepeluis',
                    password: hash
                })
                    .then(createdUser => {
                        user = createdUser;
                        return Recipe.create({
                            author: user._id,
                            title: 'Macarrones Carbonara',
                            thumbnail: 'https://ejemplo.com/macarrones.jpg',
                            cookTime: 30,
                            ingredients: [{ name: 'pasta', quantity: 250, unit: 'grams' }],
                            description: 'Delicious carbonara pasta'
                        })
                    })
                    .then(createdRecipe => {
                        recipe = createdRecipe;
                        return searchRecipes('Carbonara');
                    })
                    .then(foundRecipes => {
                        expect(foundRecipes).to.have.length(1);
                        expect(foundRecipes[0]._id.toString()).to.equal(recipe._id.toString());
                    })
            })
    })

    it('should find a recipe by ingredient', () => {
        let user, recipe
        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Pepe',
                surname: 'Luis',
                email: 'pepe@luis.com',
                username: 'pepeluis',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser
                return Recipe.create({
                    author: user._id,
                    title: 'pan ajo',
                    thumbnail: 'https://ejemplo.com/panajo.jpg',
                    cookTime: 15,
                    ingredients: [{ name: 'ajo', quantity: 3, unit: 'unit' }],
                    description: 'Pan crujiente de ajo'

                })
            })
            .then(createdRecipe => {
                recipe = createdRecipe
                return searchRecipes('ajo')
            })

            .then(foundRecipes => {
                expect(foundRecipes).to.have.length(1)
                expect(foundRecipes[0]._id.toString()).to.equal(recipe._id.toString())
            })
    })
    it('should return an empty array if no recipes match the query', () => {
        let user

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Juan',
                surname: 'Martinez',
                email: 'juan@martinez.com',
                username: 'juanmartinez',
                password: hash
            }))
            .then(createdUser => {
                user = createdUser
                return Recipe.create({
                    author: user._id,
                    title: 'Tomato Soup',
                    thumbnail: 'https://example.com/tomatosoup.jpg',
                    cookTime: 25,
                    ingredients: [{ name: 'tomato', quantity: 500, unit: 'grams' }],
                    description: 'A warm tomato soup'
                })
            })
            .then(() => searchRecipes('pasta'))
            .then(foundRecipes => {
                expect(foundRecipes).to.have.length(0)
            })
    })

    it('should throw a SystemError if there is a database issue', () => {
        let errorThrown

        return bcrypt.hash('12345678', 8)
            .then(hash => User.create({
                name: 'Laura',
                surname: 'Gonzalez',
                email: 'laura@gonzalez.com',
                username: 'lauragonzalez',
                password: hash
            }))
            .then(createdUser => {
                return Recipe.create({
                    author: createdUser._id,
                    title: 'Chocolate Cake',
                    thumbnail: 'https://example.com/chocolatecake.jpg',
                    cookTime: 60,
                    ingredients: [{ name: 'chocolate', quantity: 200, unit: 'grams' }],
                    description: 'Rich and moist chocolate cake'
                })
            })
            .then(() => {
                mongoose.disconnect() // Simulate a database disconnection
                return searchRecipes('Chocolate')
            })
            .catch(error => {
                errorThrown = error
            })
            .finally(() => {
                expect(errorThrown).to.be.an.instanceOf(SystemError)
            })
    })

    after(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Recipe.deleteMany()])).then(() => mongoose.disconnect()))
})
