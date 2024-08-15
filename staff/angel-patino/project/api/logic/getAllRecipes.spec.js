import mongoose from "mongoose"

describe('getAllRecipes', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([Recipe.deleteMany(), User.deleteMany()])))





})