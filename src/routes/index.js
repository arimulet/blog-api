import express from 'express'
import userRoutes from './user/index.js'
import postsRoutes from './posts'

const router = express.Router()

router.use('/user', userRoutes)
router.use('/posts', postsRoutes)

export default router