import { User, Post } from '../data/index.js'
import { NotFoundError, SystemError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deletePost = (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(post => {
                    if (!post) throw new NotFoundError('post not found')

                    if (post.author.toString() !== userId)
                        throw new MatchError('post author does not match user & cannot be deleted')

                    return Post.deleteOne({ _id: new ObjectId(postId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deletePost

// import 'dotenv/config'
// import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'
// import { expect } from 'chai'

// import { User, Post } from '../data/index.js'
// import deletePost from '../logic/deletePost.js'
// import { NotFoundError, SystemError, MatchError } from 'com/errors.js'

// const { MONGODB_URL_TEST } = process.env

// describe('deletePost', () => {
//     before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

//     beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

//     it('succeeds on deleting an existing post by the correct user', () =>
//         bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
//             .then(user =>
//                 Post.create({ author: user._id, title: 'Hola', image: 'https://example.com/image.jpg', description: 'funcionará el test?' })
//                     .then(post => deletePost(user._id.toString(), post._id.toString())
//                         .then(() => Post.findById(post._id))
//                         .then(post => {
//                             expect(post).to.be.null
//                         })
//                     )
//             )
//     )

//     it('fails on non-existing user', () => {
//         let errorThrown

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Amigo', surname: 'Mio', email: 'amigo@mio.com', username: 'amigomio', password: hash }))
//             .then(() => deletePost(new mongoose.Types.ObjectId().toString(), new mongoose.Types.ObjectId().toString()))
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal('user not found')
//             })
//     )

//     it('fails on non-existing post', () => {
//         let errorThrown

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Amigo', surname: 'Mio', email: 'amigo@mio.com', username: 'amigomio', password: hash }))
//             .then(user => deletePost(user._id.toString(), new mongoose.Types.ObjectId().toString()))
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal('post not found')
//             })
//     )

//     it('fails on mismatching post author', () => {
//         let errorThrown

//         return Promise.all([
//             bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User1', surname: 'One', email: 'user1@one.com', username: 'user1', password: hash })),
//             bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User2', surname: 'Two', email: 'user2@two.com', username: 'user2', password: hash }))
//         ])
//             .then(([user1, user2]) =>
//                 Post.create({ author: user1._id, title: 'Hola', image: 'https://example.com/image.jpg', description: 'funcionará el test?' })
//                     .then(post => deletePost(user2._id.toString(), post._id.toString()))
//             )
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(MatchError)
//                 expect(errorThrown.message).to.equal('post author does not match user')
//             })
//     })

//     after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
// })


// ///////////////////////////////

// import 'dotenv/config'
// import mongoose from 'mongoose'
// import bcrypt from 'bcryptjs'

// import { expect } from 'chai'

// import { Post, User } from '../data/index.js'
// import deletePost from './deletePost.js'
// import { NotFoundError, MatchError } from 'com/errors.js'

// const { MONGODB_URL_TEST } = process.env
// const { ObjectId } = mongoose.Types

// describe('deletePost', () => {
//     before(() => mongoose.connect(MONGODB_URL_TEST).then(() => Promise.all([User.deleteMany(), Post.deleteMany()])))

//     beforeEach(() => Promise.all([User.deleteMany(), Post.deleteMany()]))

//     it('succeeds on deleting a post from an existing user', () =>
//         bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Mac', surname: 'Book', email: 'mac@book.com', username: 'macbook', password: hash }))
//             .then(user =>
//                 Post.create({ author: user._id, title: 'Hola', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'funcionará el test?' })
//                     .then(post => deletePost(user.id, post.id).then(() => post.id))
//             )
//             .then(postId => Post.findById(postId))
//             .then(deletedPost => {
//                 expect(deletedPost).to.be.null
//             })
//     )

//     // it('fails on non-existing user', () => {
//     //     let errorThrown

//     //     return bcrypt.hash('123123123', 8)
//     //         .then(hash => User.create({ name: 'Amigo', surname: 'Mio', email: 'amigo@mio.com', username: 'amigomio', password: hash }))
//     //         .then(user =>
//     //             Post.create({ author: user._id, title: 'Test Post', image: 'https://example.com/image.jpg', description: 'Test description' })
//     //                 .then(post => deletePost(new ObjectId().toString(), post.id))
//     //                 .catch(error => errorThrown = error)
//     //                 .finally(() => {
//     //                     expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//     //                     expect(errorThrown.message).to.equal('user not found')
//     //                 })
//     //         )
//     // )

//     it('fails on non-existing user', () => {
//         let errorThrown

//         return bcrypt.hash("123123123", 8)
//             .then(hash => User.create({ name: "Amigo", surname: "Mio", email: "amigo@mio.com", username: "amigomio", password: hash }))
//             .then(() => Post.create({ author: new ObjectId().toString(), title: 'Bye', image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdqbG9tN2hhd3g2NjEybG00bGM1b21hNW03cG12eDBsYjJpNmZkYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/PNlNcLUSK5tbE5a973/giphy.gif', description: 'test funcionando...', date: new Date(), likes: [] })
//                 .then((post) => deletePost(new ObjectId().toString(), post.id))
//             )
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal("user not found")
//             })
//     })

//     it('fails on non-existing post', () => {
//         let errorThrown

//         return bcrypt.hash('123123123', 8)
//             .then(hash => User.create({ name: 'Amigo', surname: 'Mio', email: 'amigo@mio.com', username: 'amigomio', password: hash }))
//             .then(user => deletePost(user.id, new ObjectId().toString()))
//             .catch(error => errorThrown = error)
//             .finally(() => {
//                 expect(errorThrown).to.be.an.instanceOf(NotFoundError)
//                 expect(errorThrown.message).to.equal('post not found')
//             })
//     )

//     it('fails on mismatched post author', () => {
//         let errorThrown

//         return Promise.all([
//             bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User1', surname: 'One', email: 'user1@one.com', username: 'user1', password: hash })),
//             bcrypt.hash('123123123', 8).then(hash => User.create({ name: 'User2', surname: 'Two', email: 'user2@two.com', username: 'user2', password: hash }))
//         ])
//             .then(([user1, user2]) =>
//                 Post.create({ author: user1._id, title: 'Test Post', image: 'https://example.com/image.jpg', description: 'Test description' })
//                     .then(post => deletePost(user2.id, post.id))
//                     .catch(error => errorThrown = error)
//                     .finally(() => {
//                         expect(errorThrown).to.be.an.instanceOf(MatchError)
//                         expect(errorThrown.message).to.equal('post author does not match user')
//                     })
//             )
//     )

//     after(() => Promise.all([User.deleteMany(), Post.deleteMany()]).then(() => mongoose.disconnect()))
// })


