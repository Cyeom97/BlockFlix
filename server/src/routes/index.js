const Express = require('express')
import userRoute from './user.route.js'

const router = Express.Router()

router.use('/users', userRoute)

export default router
