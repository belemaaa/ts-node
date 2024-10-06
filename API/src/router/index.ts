import express from 'express'
import authenticationRouter from './authentication'

const router = express.Router()

router.use(authenticationRouter)

export default router