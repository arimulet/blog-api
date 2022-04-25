import express from 'express'
import posts from '../../database/mocks/posts.json'
import users from '../../database/mocks/users.json'
const router = express.Router()



router.get('/', (req, res) => {
    res.send({
        posts: posts.map(post => {
            const user = users.find(p => p.id == post.user)
            return {
                ...post,
                user
            }
        })
    }) 
})

export default router