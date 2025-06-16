import express, { Router } from 'express';
import { login, logout, signup, verify } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddlewre';
import asyncHandler from 'express-async-handler';


const authroute: Router = express.Router();

authroute.post('/login', asyncHandler(login));
authroute.post('/signup', asyncHandler(signup));
authroute.delete('/logout', asyncHandler(logout));
authroute.get('/verify', authMiddleware, asyncHandler(verify));

export default authroute;
