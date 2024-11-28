import express from "express"
import routes from './handlers/index.js'

const jsonBodyParser = express.json({ strict: true, type: 'application/json' })

const router = express.Router()

router.post('/users', jsonBodyParser, routes.registerUserHandler)

router.post('/users/auth', jsonBodyParser, routes.authenticateUserHandler)

router.get('/users/:targetUserId', routes.getUserNameHandler)

router.get('/posts', routes.getAllPostsHandler)

router.post('/posts', jsonBodyParser, routes.createPostHandler)

router.delete('/posts/:postId', routes.deletePostHandler)

router.patch('/posts/:postId/likes', routes.toggleLikePostHandler)

router.patch('posts/:postId/comments', jsonBodyParser, routes.createPostCommentHandler)

export default router