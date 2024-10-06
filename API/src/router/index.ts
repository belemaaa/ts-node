import express from 'express'
import authenticationRouter from './authentication'
import userRouter from './users'

const router = express.Router()

router.use(authenticationRouter)
router.use(userRouter)

export default router