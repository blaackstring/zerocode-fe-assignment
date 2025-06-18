import express, { Router } from 'express';
import { login, logout, signup, verify } from '../controllers/authController';

import asyncHandler from 'express-async-handler';
import { authMiddleware } from '../middleware/authMiddleware';

const authroute:Router = express.Router();

authroute.post('/login', asyncHandler(login));
authroute.post('/signup',signup);
authroute.delete('/logout', asyncHandler(logout));
authroute.get('/verify', authMiddleware, asyncHandler(verify));

export default authroute;
