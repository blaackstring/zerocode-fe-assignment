import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { log } from 'console';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      res.status(400).send({ success: false, message: 'Please provide email and password' });
      return;
    }

    const user = await User.findOne({ email }) as IUser | null;
    if (!user) {
      res.status(404).send({ success: false, message: 'User not Found' });
      return;
    }

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (!isSamePassword) {
      res.status(400).send({ success: false, message: 'Enter mail or password correctly' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.SECKEY as string, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send({
      success: true,
      message: 'Authentication successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Authentication failed' });
  }
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  
  try {
    const { email, username, password } = req.body as { email?: string; username?: string; password?: string };
    console.log(email,password,username,'hoo');
    
    if (!email || !password || !username) {
      res.status(400).send({ success: false, message: 'Please provide email, username, and password' });
      return;
    }

    const existingUser = await User.findOne({ email }) as IUser | null;
    if (existingUser) {
      res.status(400).send({ success: false, message: 'User exists with this mail' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ email, username, password: hashedPassword });
   

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Server error, please try again later' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token');
    res.status(200).send({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error while Logout' });
  }
};

export const verify = async (req: AuthRequest, res: Response): Promise<void> => {
  try {

    console.log(req.user);
    
    if (!req.user || !req.user.id) {
      res.status(401).send({ success: false, message: 'Unauthorized' });
      return;
    }
console.log('hii');

    const user = await User.findById(req.user.id).select('-password') as IUser | null;
    if (!user) {
      res.status(404).send({ success: false, message: 'User not Found' });
      return;
    }

    res.status(200).send({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error while Verifying' });
  }
};
