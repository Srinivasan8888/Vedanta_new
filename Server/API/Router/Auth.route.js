import express from 'express'
import { register, login, refreshToken, verifyToken, logout, withRateLimiters } from '../Controller/Auth.Controller.js'
import { verifyAccessToken } from '../../Helpers/jwt_helper.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', withRateLimiters(login))
router.post('/refresh-token', refreshToken)
router.delete('/logout', logout)


//JWT Helper
router.get('/access-token', verifyAccessToken, verifyToken);

router.get('/verify', verifyAccessToken, (req, res) => {
  res.json({ 
    success: true,
    accessToken: req.accessToken
  });
});

export default router;