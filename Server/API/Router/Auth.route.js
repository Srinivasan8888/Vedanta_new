import express from 'express'
import { register, login, refreshToken, logout, withRateLimiters } from '../Controller/Auth.Controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', withRateLimiters(login))
router.post('/refresh-token', refreshToken)
router.delete('/logout', logout)

export default router;