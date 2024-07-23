import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

import { Types } from 'mongoose'

const { ObjectId } = Types

import { expect } from 'chai'

import { Post, User } from '../data/models/index.js'

import toggleLikePost from './toggleLikePost.js'
import { ContentError, NotFoundError } from 'com/errors.js'

const { MONGODB_URL_TEST } = process.env

debugger

describe('createPost', () => {
    before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Post.deleteMany()).then(() => User.deleteMany()))

    beforeEach(() => Post.deleteMany().then(() => User.deleteMany()))

    it('succes put like in a post',()=>
        User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: '123123123' })
        .then(user => Post.create({author:user.id, title:'Hola', image:'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'funcionará el test?'})
            .then(post => {
                toggleLikePost(user.id, post.id)
            })
            .then(() =>{
                Post.findOne()
                    .then(post => console.log(post))
            })
        )

    )

    //TODO no hace los likes pero desde la app si...

    // TODO unhappis
    
    
    
    

})